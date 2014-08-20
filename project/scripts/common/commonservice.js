/**
 * service公共方法 
 */
define(function(require,exports,module){
	var appUtils = require("appUtils");
	var layerUtils = require("layerUtils");
	var service = require("serviceImp").getInstance();
	
	// 获取账户收益
	function getAccountProfit(fund_account, fund_code, trade_date_from, trade_date_to,numPerPage,curPage)
	{
		var resultProcess;
		var jsonParam = {"fund_account":fund_account,"fund_code":fund_code,"trade_date_from":trade_date_from,"trade_date_to":trade_date_to,"page_size":numPerPage,"page_no":curPage};
		var dailyinfoComplate = function(resultVo){
			if(resultVo.error_no == 0)
			{
				var resultDataJson = resultVo["results"][0];
				resultProcess = JSON.parse(resultDataJson["result"]);
			}
			else
			{
				layerUtils.iMsg(-1,resultVo.error_info);
				return false;
			}
		};
		service.dailyinfo(jsonParam,dailyinfoComplate);
		return resultProcess;
	}
	
	// 将yyyy-MM-dd 字符串格式化为date
	function formateStrToDate(str)
	{
		var changeStr = str.replace(/-/g,"/");
		var date = Date.parse(changeStr);
		return date;
	}
	
	// 针对金额的数字添加","
	function addCommas(nStr)
	{
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
		    x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	}
	
	function setSsoPassword(app_id,passport_id,fund_account,fund_pwd,cipher_type,weixinpk,openid)
	{
		var date = new Date();
	    var app_uuid = date.getTime()+Math.random();
	    var cipher_content = fund_pwd; // 密码字段
	    var cipher_type = cipher_type;
	    
		var jsonParam = {"app_id":app_id,"passport_id":passport_id,"account":fund_account,"cipher_content":fund_pwd,"cipher_type":cipher_type,"key_info":app_uuid};
		var registerOnlineUsersSessionComplate = function(resultVo){
			if(resultVo.error_no == 0)
			{
				var resultDataJson = resultVo["results"][0];
				if(resultDataJson != null)
				{
					var resultProcess = JSON.parse(resultDataJson["result"]);
					
					var durable_token = resultProcess["durable_token"];
					var expired_time = resultProcess["expired_time"];
					if(expired_time != null)
					{
						// durable_token 换取密码令牌
						var jsonParam = {"durable_token":durable_token};
						var getCipherTokenByDurableTokenComplate = function(resultVo){
							if(resultVo.error_no == 0)
							{
								var resultDataJson = resultVo["results"][0];
								if(resultDataJson != null)
								{
									var resultProcess = JSON.parse(resultDataJson["result"]);
									cipherToken = resultProcess["cipherToken"];
									appUtils.setLStorageInfo("cipherToken",cipherToken);
									// 设置当前时间为放置日期
									// 分别计算出已存放时间和距过期时间
									/*
									var currentDate = new Date();
									var longDate = currentDate.getTime();
									var duration_longtime = parseFloat(duration_hours * 60 * 60 * 1000);
									var expires_longtime = longDate + duration_longtime;
									appUtils.setLStorageInfo("expires_longtime",expires_longtime);
									*/
									
									var expires_longtime_sso = expired_time;
									
									// 从ups获取密码过期时间
									var expires_longtime = "";
									var jsonParam2 = {"cipher_token":cipherToken};
									var getExpiredTimeComplate = function(resultVo){
										if(resultVo["results"] != null)
										{
											var results = JSON.parse(resultVo["results"][0]["result"]);
											expires_longtime = results["expireTime"];
										}
									};
									service.getExpiredTime(jsonParam2,getExpiredTimeComplate);
									
									// 存储带数据库
									var jsonParam = {"weixinpk":weixinpk,"openid":openid,"fund_account":fund_account,"cipher_token":cipherToken,"expires_longtime":expires_longtime,"durable_token":durable_token,"expires_longtime_sso":expires_longtime_sso};
									var saveLocalPasswordComplate = function(resultVo){
										if(resultVo.error_no == 0)
										{
										}
										else
										{
											layerUtils.iMsg(-1,resultVo.error_info);
											return false;
										}
									};
									service.saveLocalPassword(jsonParam,saveLocalPasswordComplate);
								}
							}
							else
							{
								layerUtils.iMsg(-1,resultVo.error_info);
								return false;
							}
						};
						service.getCipherTokenByDurableToken(jsonParam,getCipherTokenByDurableTokenComplate);
					}
					else
					{
						layerUtils.iMsg(-1,"系统繁忙，请返回微信界面稍后重试");
						return false;
					}
					
				}
			}
			else
			{
				layerUtils.iMsg(-1,resultVo.error_info);
				return false;
			}
		};
		service.registerOnlineUsersSession(jsonParam,registerOnlineUsersSessionComplate);
	}
	
	function setPassword(app_id,fund_pwd,cipher_type,duration_hours,fund_account,weixinpk,openid)
	{
		var date = new Date();
	    var app_uuid = date.getTime()+Math.random();
	    var cipher_content = fund_pwd; // 密码字段
	    var cipher_type = cipher_type;
		var jsonParam = {"app_id":app_id,"app_uuid":app_uuid,"cipher_content":cipher_content,"cipher_type":cipher_type,"duration_hours":duration_hours};
		var savePWDstrComplate = function(resultVo){
			if(resultVo.error_no == 0)
			{
				var resultDataJson = resultVo["results"][0];
				resultProcess = JSON.parse(resultDataJson["result"]);
				
				if(resultDataJson != null)
				{
					cipherToken = resultProcess["cipherToken"];
					appUtils.setLStorageInfo("cipherToken",cipherToken);
					// 设置当前时间为放置日期
					// 分别计算出已存放时间和距过期时间
					var currentDate = new Date();
					var longDate = currentDate.getTime();
					var duration_longtime = parseFloat(duration_hours * 60 * 60 * 1000);
					var expires_longtime = longDate + duration_longtime;
					appUtils.setLStorageInfo("expires_longtime",expires_longtime);
					
					// 存储带数据库
					var jsonParam = {"weixinpk":weixinpk,"openid":openid,"fund_account":fund_account,"cipher_token":cipherToken,"expires_longtime":expires_longtime};
					var saveLocalPasswordComplate = function(resultVo){
						if(resultVo.error_no == 0)
						{
						}
						else
						{
							layerUtils.iMsg(-1,resultVo.error_info);
							return false;
						}
					};
					service.saveLocalPassword(jsonParam,saveLocalPasswordComplate);
				}
			}
			else
			{
				layerUtils.iMsg(-1,resultVo.error_info);
				return false;
			}
		};
		service.savePWDstr(jsonParam,savePWDstrComplate);
	}
	
	function getIsValid()
	{
		var currentDate = new Date();
		var longDate = currentDate.getTime();
		var expires_longtime = 0;
		// 从数据库取值
		var weixinpk = appUtils.getLStorageInfo("weixinpk");
		var openid = appUtils.getLStorageInfo("openid");
		var jsonParam = {"weixinpk":weixinpk,"openid":openid};
		var getLocalPasswordComplate = function(resultVo){
			if(resultVo.error_no == 0)
			{
				if(resultVo["results"] != null)
				{
					expires_longtime = resultVo["results"][0]["expires_longtime"];
				}
				else
				{
					expires_longtime = null;
				}
			}
			else
			{
				layerUtils.iMsg(-1,resultVo.error_info);
				return false;
			}
		};
		service.getLocalPassword(jsonParam, getLocalPasswordComplate);
		if(expires_longtime != null && expires_longtime != 0 && longDate - expires_longtime < 0)
		{
			// 是否需要续期
			// ……
			
			return true;
		}
		else
		{
			appUtils.clearLStorage("cipherToken");
			appUtils.clearLStorage("expires_longtime");
			return false;
		}
		
	}
	
	var commonservice = {
		"getAccountProfit": getAccountProfit,
		"formateStrToDate": formateStrToDate,
		"addCommas": addCommas,
		"setPassword": setPassword,
		"getIsValid": getIsValid,
		"setSsoPassword": setSsoPassword,
	};
	
	module.exports = commonservice;
});
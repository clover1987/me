define("project/scripts/bind",function(require,exports,module){
	var appUtils = require("appUtils"),
		layerUtils = require("layerUtils"),
		service = require("serviceImp").getInstance(),  //业务层接口，请求数据
	   _pageId = "#bind";
	   
	var captchaData = "";
	var verifyCode = "";
	
	var gconfig = require("gconfig");
	var global = gconfig.global;
	var captchaPath = global.captchaPath;
	var account_type = global.account_type;
	
	var fund_code = appUtils.getLStorageInfo("fund_code");
	var duration_hours = global.ups_duration_hours;
	var app_id = global.ups_app_id;
	var cipher_type = global.ups_cipher_type;
	var commonservice = require("project/scripts/common/commonservice");
	
	var captchaId = "";
	var isValid = false;
	/**
	 * 初始化
	 * */
	function init(){
		layerUtils.iLoading(true,"请等待...",true);
		if(iBrowser.ios)
		{
			$(_pageId + " #username1").show();
			$(_pageId + " #checkcode1").show();
		}
		else
		{
			$(_pageId + " #username2").show();
			$(_pageId + " #checkcode2").show();
		}
		loadImgCode();
	}
	
	function loadImgCode()
	{
		/*
		var url = captchaPath;
		var param = "";
		var isLastReq = true;
		var isAsync = true;
		var isShowWait = false;
		var isShowOverLay = false;
		var tipsWords = null;
		var timeOutFunc = null;
		var dataType = "";
 		var callBackImageFunc = function(resultVo){
			if(resultVo.errorNo == 0)
			{
				var resultDataJson = resultVo["results"];
				var resultData = JSON.parse(resultDataJson);
				captchaData = resultData["imageData"];
				verifyCode = resultData["VerifyCode"];
				$(_pageId + " #checkcodeImg").attr("src", "data:image/jpeg;base64," + captchaData);
			}
			else
			{
				// 初始化失败
			}
		};
		appUtils.invokeServer(url,param,callBackImageFunc,isLastReq, isAsync, isShowWait, isShowOverLay, tipsWords, timeOutFunc);
		*/
		var len = 4;
		var complex_random = 0;
		var char_len = 0;
		var int_len = 4;
		var jsonParam = {"len":len,"complex_random":complex_random,"char_len":char_len,"int_len":int_len};
		var applyCodeComplate = function(resultVo){
			if(resultVo.error_no == 0)
			{
				var resultDataJson = resultVo["results"][0];
				var resultProcess = JSON.parse(resultDataJson["result"]);
				captchaId = resultProcess["captchaId"];
				var width = 70;
				var height = 38;
				var font_size = 25;
				var jsonParam = {"captcha_id":captchaId,"width":width,"height":height,"font_size":font_size};
				var getCaptchaImageBase64Complate = function(resultVo){
					layerUtils.iLoading(false);
					if(resultVo.error_no == 0)
					{
						var resultDataJson = resultVo["results"][0];
						var resultProcess = JSON.parse(resultDataJson["result"]);
						var base64 = resultProcess["base64"];
						$(_pageId + " #checkcodeImg").attr("src", "data:image/jpeg;base64," + base64);
					}
					else
					{
						layerUtils.iMsg(-1,resultVo.error_info);
						return false;
					}
				};
				service.getCaptchaImageBase64(jsonParam,getCaptchaImageBase64Complate);
			}
			else
			{
				layerUtils.iMsg(-1,resultVo.error_info);
				return false;
			}
		};
		service.applyCode(jsonParam,applyCodeComplate);
	}
	
	
	/**
	 * 事件绑定
	 * */
	function bindPageEvent(){
		appUtils.bindEvent($(_pageId+" #nextBtn"),function(){
			checkIsValibelUser();
		});
		
		appUtils.bindEvent($(_pageId+" #checkcodeImg"),function(){
			 loadImgCode();
		});
	}
	//检验输入框
	function checkInput(){
		var fund_account = "";//资金账户
		var checkcode = "";//验证码
		if(iBrowser.ios)
		{
			fund_account = $(_pageId + " #username1").val();
			checkcode = $(_pageId + " #checkcode1").val();
		}
		else
		{
			fund_account = $(_pageId + " #username2").val();
			checkcode = $(_pageId + " #checkcode2").val();
		}
		$(_pageId + " #username").val(fund_account);
		$(_pageId + " #checkcode").val(checkcode);
		var password = $(_pageId + " #password").val();//自己密码
		
		if(fund_account.trim().length <= 0){
			layerUtils.iMsg(-1,"请填写资金帐号");
			return false;
		}
		if(password.trim().length <= 0){
			layerUtils.iMsg(-1,"请填写资金密码");
			return false;
		}
		if(checkcode.trim().length <= 0){
			layerUtils.iMsg(-1,"请填写验证码");
			return false;
		}
		if(checkcode.trim().length != 4){
			layerUtils.iMsg(-1,"请输入正确验证码");
			return false;
		}
		checkVerifyCode(checkcode);
		if(checkcode.trim().length > 0 && !isValid){
			layerUtils.iMsg(-1,"请输入正确验证码");
			return false;
		}
		return true;
	}
	
	function checkVerifyCode(captcha_code)
	{
		var jsonParam = {"captcha_id":captchaId,"captcha_code":captcha_code,"expire_now":0};
		var checkMessageCodeComplate = function(resultVo){
			if(resultVo.error_no == 0)
			{
				var resultDataJson = resultVo["results"][0];
				var resultProcess = JSON.parse(resultDataJson["result"]);
				var base64 = resultProcess["base64"];
				isValid = resultProcess["isValid"];
			}
			else
			{
				layerUtils.iMsg(-1,resultVo.error_info);
				return false;
			}
		};
		service.checkMessageCode(jsonParam,checkMessageCodeComplate);
	}

	//资金账户校验
	function checkAccount(){
		var fund_account = $(_pageId + " #username").val();
		var fund_pwd = $(_pageId + " #password").val();
		
		// 绑定+登录需要统一认证服务 待流程理清再做
		//资金账户校验
		var jsonParam = {"fund_account":fund_account,"fund_pwd":fund_pwd};
		var fundAuthComplate = function(resultVo){
				if(resultVo.error_no == "0")
				{
					var pageKind = appUtils.getPageParam("pageKind");
					
					var weixinpk = appUtils.getLStorageInfo("weixinpk");
					var openid = appUtils.getLStorageInfo("openid");
					
					var resultDataJson = resultVo["results"][0];
					var resultProcess = JSON.parse(resultDataJson["result"]);
					var accountBizType = resultProcess["accountBizType"];
					
					// 1执行绑定
					var jsonParam = {"fund_account":$.trim(fund_account),"account_type":account_type,"account_id":openid,"token":weixinpk};
					var userAcctBindComplate = function(resultVo){
						if(resultVo.error_no == 0)
						{
							appUtils.setLStorageInfo("fund_account",fund_account);
							appUtils.setLStorageInfo("fund_code",fund_code);
							
							
							// 绑定成功，查询通行证
							var jsonParam = {"accountId":openid,"accountType":account_type};
							var getPassportComplate = function(resultVo){
								if(resultVo.error_no == 0)
								{
									var resultDataJson = resultVo["results"][0];
									var resultProcess = JSON.parse(resultDataJson["result"]);
									var passport_id = resultProcess["passportId"];
									
									// 密码服务
									// commonservice.setPassword(app_id,fund_pwd,cipher_type,duration_hours,fund_account,weixinpk,openid);
									commonservice.setSsoPassword(app_id,passport_id,fund_account,fund_pwd,accountBizType,weixinpk,openid);
									
									if(pageKind == "mine")
									{
										appUtils.pageInit("bind","mine/iHasBind",{});
										return false;
									}
						
									// 2查询是否开通金腾通 如果已经开通则直接跳转到已开通页
									// 现金产品登记查询
									var jsonParam = {"fund_account":fund_account,"fund_code":fund_code};
									var currentinfoComplate = function(resultVo){
										if(resultVo.error_no == 0)
										{
											var resultDataJson = resultVo["results"][0];
											var resultProcess = JSON.parse(resultDataJson["result"]);
											
											if(resultDataJson != null)
											{
												// curPage = results[0].page;			//当前页
												// totalPage = results[0].totalPage;	//总页数
												
												var fund_account = resultProcess["fund_account"];
												var fund_code = resultProcess["fund_code"];
												
												appUtils.setLStorageInfo("fund_account",fund_account);
												appUtils.setLStorageInfo("fund_code",fund_code);
												
												
												
												if(pageKind == "cash")
												{
													appUtils.pageInit("bind","cash/cashhasopened",{});
												}
												else if(pageKind == "mine")
												{
													appUtils.pageInit("bind","mine/iHasBind",{});
												}
												return false;
											}
										}
										else if(resultVo.error_no == 2030001)
										{
											// 其他error_no认为未登记跳到开通页面
											if(pageKind == "cash")
											{
												appUtils.pageInit("bind","cash/cashnotopen",{});
											}
											else if(pageKind == "mine")
											{
												appUtils.pageInit("bind","mine/iHasBind",{});
											}
											return false;
										}
										else if(resultVo.error_no == 2030015){
											//已登记，正在处理
											var jsonParam = {"pageKind":"openning"};
											appUtils.pageInit("bind","cash/cashnotbind",jsonParam);
											return false;
										}
										else if(resultVo.error_no == 2030006){
											//已登记，开通失败
											var jsonParam = {"pageKind":"openfail"};
											appUtils.pageInit("bind","cash/hasBindOpenFail",jsonParam);
											return false;
										}
										else
										{
											loadImgCode();
											layerUtils.iMsg(-1,resultVo.error_info);
											return false;
										}
									};
									service.currentinfo(jsonParam,currentinfoComplate);
									return false;
								}
								else
								{
									layerUtils.iMsg(-1,resultVo.error_info);
									return false;
								}
							};
							service.getPassport(jsonParam,getPassportComplate);
						}
						else
						{
							loadImgCode();
							layerUtils.iMsg(-1,resultVo.error_info);
							return false;
						}
					};
					service.userAcctBind(jsonParam, userAcctBindComplate);
				}
				else
				{
					loadImgCode();
					layerUtils.iMsg(-1,resultVo.error_info);
					return false;
				}
		};
		service.fundAuth(jsonParam,fundAuthComplate);
		
	}
	function checkIsValibelUser(){
		var fund_account = "";//资金账户
		if(iBrowser.ios)
		{
			fund_account = $(_pageId + " #username1").val();
		}
		else
		{
			fund_account = $(_pageId + " #username2").val();
		}
		var param = {
			"fund_account":fund_account
		};
		if(!checkInput())//检验输入框
		{
			return false;
		}
		//查询个人信息
		service.userInfoQuery(param,function(data){
			var error_no = data.error_no,
			error_info = data.error_info;
			if(error_no == "0"){
				var results = JSON.parse(data["results"][0]["result"]);//数据结果
				var client_type = results["client_type"];
				if(client_type == 0){
					checkAccount();
				}else{
					loadImgCode();
					layerUtils.iMsg(-1,"亲，宝宝发现您不是佣金宝客户，请您使用国金证券官方微信提供的服务哦！");
					return false;
				}
			}else{
				loadImgCode();
				layerUtils.iMsg(-1,error_info);
				return false;
			}
		});
	}
	/**
	 * 销毁
	 * */
	function destroy(){
		loadImgCode();
		$(_pageId + " #username").val("");
		$(_pageId + " #password").val("");
		$(_pageId + " #checkcode").val("");
		service.destroy();
	}
	
	var login = {
		"init" : init,
		"bindPageEvent" : bindPageEvent,
		"destroy" : destroy
		
	};
	
	module.exports = login;
});
define("project/scripts/login",function(require,exports,module){
	var appUtils = require("appUtils"),
		layerUtils = require("layerUtils"),
		service = require("serviceImp").getInstance(),  //业务层接口，请求数据
	   _pageId = "#login";
	   
	var captchaData = "";
	var verifyCode = "";
	var gconfig = require("gconfig");
	var global = gconfig.global;
	var captchaPath = global.captchaPath;

//	var fund_code = appUtils.getLStorageInfo("fund_code");
    var user=require("project/scripts/common/user");
	var duration_hours = global.ups_duration_hours;
	var app_id = global.ups_app_id;
	var cipher_type = global.ups_cipher_type;
	var commonservice = require("project/scripts/common/commonservice");
	/**
	 * 初始化
	 * */
	function init(){
		loadImgCode();
	}
	
	function loadImgCode()
	{
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
	}
	
	
	/**
	 * 事件绑定
	 * */
	function bindPageEvent(){
		appUtils.bindEvent($(_pageId+" .m0-25"),function(){
			 checkAccount();//资金账户校验
		});
		
		appUtils.bindEvent($(_pageId+" #checkcodeImg"),function(){
			 loadImgCode();
		});
	}
	//检验输入框
	function checkInput(){
		var fund_account = $(_pageId + " #username").val(),//资金账户
			password = $(_pageId + " #password").val();//自己密码
			checkcode = $(_pageId + " #checkcode").val();//验证码
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
		if(checkcode.trim().length > 0 && verifyCode != null && checkcode.toUpperCase() != verifyCode){
			layerUtils.iMsg(-1,"请输入正确验证码");
			return false;
		}
		
		if(appUtils.getLStorageInfo("fund_account") != null && fund_account != appUtils.getLStorageInfo("fund_account"))
		{
			layerUtils.iMsg(-1,"您输入的资金账号与您之前绑定的资金账号不符，请重新输入");
			return false;
		}
		return true;
	}

	//资金账户校验
	function checkAccount(){
		if(!checkInput())//检验输入框
		{
			return false;
		}
		var fund_account = $(_pageId + " #username").val(),
		fund_pwd = $(_pageId + " #password").val();
		
		// 绑定+登录需要统一认证服务 待流程理清再做
		var param = {
			"fund_account":fund_account,
			"fund_pwd":fund_pwd
		};
		//资金账户校验
		service.fundAuth(param,function(data){
			var error_no = data.error_no,
				error_info = data.error_info;
				if(error_no == "0")
				{
					var pageKind = appUtils.getPageParam("pageKind");
					// appUtils.setLStorageInfo("fund_account",fund_account);
					
					var weixinpk = appUtils.getLStorageInfo("weixinpk");
					var openid = appUtils.getLStorageInfo("openid");
					// 密码服务
					commonservice.setPassword(app_id,fund_pwd,cipher_type,duration_hours,fund_account,weixinpk,openid);
					
					if(pageKind == "mine")
					{
						appUtils.pageInit("login","mine/iHasBind",{});
						return false;
					}
					
					// 2查询是否开通金腾通 如果已经开通则直接跳转到已开通页
					// 现金产品登记查询
					var jsonParam = {"fund_account":fund_account,"fund_code":user.fund_code};
					var currentinfoComplate = function(resultVo){
						if(resultVo.error_no == 0)
						{
							var resultDataJson = resultVo["results"][0];
							resultProcess = JSON.parse(resultDataJson["result"]);
							
							if(resultDataJson != null)
							{
								// curPage = results[0].page;			//当前页
								// totalPage = results[0].totalPage;	//总页数
								
								var fund_account = resultProcess["fund_account"];
								
								appUtils.setLStorageInfo("fund_account",fund_account);
								
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
						else if(resultVo.error_no == -10)
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
						else
						{
							loadImgCode();
							layerUtils.iMsg(-1,resultVo.error_info);
							return false;
						}
					};
					service.currentinfo(jsonParam,currentinfoComplate);
						
				}
				else
				{
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
		service.destroy();
	}
	
	var login = {
		"init" : init,
		"bindPageEvent" : bindPageEvent,
		"destroy" : destroy
		
	};
	
	module.exports = login;
});
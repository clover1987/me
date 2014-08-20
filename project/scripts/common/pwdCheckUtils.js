define(function(require,exports,module){
	var appUtils = require("appUtils"),
		service = require("serviceImp").getInstance(),  // 业务层接口，请求数据;
		global = require("gconfig").global,
		commonservice = require("project/scripts/common/commonservice"),
		canCheckPwd = true;
    var user=require("project/scripts/common/user");
	var pwdChecked = function(_pageId,submitbtn_id){
		setTimeout( function() {
			$(_pageId + " #expiredWindow #password").focus();
		},500);
		appUtils.bindEvent(_pageId + " #expiredWindow #nextBtn",function(){
			$(_pageId + " #expiredWindow #failtext").html("");
//			var fund_account = appUtils.getLStorageInfo("fund_account");
            var fund_account=user.fund_account;
			var fund_pwd = $(_pageId+" #expiredWindow #password").val();
            if(fund_pwd == null || fund_pwd == "")
            {
                $(_pageId +" #expiredWindow #errorTips").html("密码不能为空");
                return false;
            }
			checkfundAuth(_pageId,fund_account,fund_pwd,submitbtn_id);  // 临时写死

		});

	};
	
	/**
	 * 资金密码校验
	 */
	function checkfundAuth(_pageId,fund_account,fund_pwd,submitbtn_id)
	{
		var jsonParam = {"fund_account":fund_account,"fund_pwd":fund_pwd};
		var fundAuthComplate = function(resultVo){
			if(resultVo.error_no == 0)
			{
				canCheckPwd = true;
				if(canCheckPwd){
                //注册全局会话  DT_001
//				var weixinpk = appUtils.getLStorageInfo("weixinpk");
//				var openid = appUtils.getLStorageInfo("openid");
//				var app_id = global.ups_app_id;
//
//				var resultDataJson = resultVo["results"][0];
//				var resultProcess = JSON.parse(resultDataJson["result"]);
//				var accountBizType = resultProcess["accountBizType"];
//				var passport_id = resultProcess["passportID"];
//				commonservice.setSsoPassword(app_id,passport_id,fund_account,fund_pwd,accountBizType,weixinpk,openid);
				$(_pageId + " #hiddenflag").val(0);
				$(_pageId + " #" + submitbtn_id).click();
				}
			}
			else if(resultVo.error_no == 1022014){
				$(_pageId+" #expiredWindow #errorTips").html(resultVo.error.error_info);
				$(this).attr("style","background-color:#D5D5D5");
				$(_pageId + " #expiredWindow #password").hide();
				canCheckPwd = false;
			}
			else
			{
				$(_pageId+" #expiredWindow #errorTips").html("亲，密码错误！");
			}
		};
		service.fundAuth(jsonParam, fundAuthComplate);
	}
	var pwdCheckUtils = {

			"pwdChecked":pwdChecked
	};
	module.exports  = pwdCheckUtils;
});
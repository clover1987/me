define("project/scripts/cash/rechargefailure",function(require,exports,module){
	var appUtils = require("appUtils"),
		layerUtils = require("layerUtils"),
		service = require("serviceImp").getInstance(),  //业务层接口，请求数据
	    _pageId = "#cash_rechargefailure";
	var pwdCheckUtils = require("project/scripts/common/pwdCheckUtils");
	
	var fund_account = "";
	var user = require("project/scripts/include/user");
	var serialNO = appUtils.getSStorageInfo("serialNO");
    var utils=require("project/scripts/common/utils");
//    $(".click_back").click(function(){
//        appUtils.pageInit("cash/rechargefailure", "cash/cashhasopened", {});
//    });

	/**
	 * 初始化
	 * */
	function init(){
//        utils.clickBack(_pageId);
		//var userInfo = user.getUserInfo();//用户信息

		layerUtils.iLoading(true,"请等待...",true);
        $("#header_message").html("充值失败");
		//if(userInfo != null)
		//{
			var jsonParam={"serialNO":serialNO};
			var queryBalanceFromFundLogComplate=function(resultVo){
				if(resultVo.error_no == 0)
				{
					var resultDataJson = resultVo["results"][0];
					if(resultDataJson != null)
					{
						var resultProcess = JSON.parse(resultDataJson["result"]);
						var errorCode = resultProcess["errorCode"];
						if(errorCode == 2040006){
							$(_pageId +" #reason").html("银行卡余额不足，请您检查账户余额后重新充值！");
						}
						else if(errorCode == 2040007)
						{
							$(_pageId +" #reason").html("银行卡密码错误，请检查密码后重新充值！");
						}
						else    //errorCode == 2040008
						{
							$(_pageId +" #reason").html("银行端错误，您可拨打客服电话4001-600109咨询相关问题。");
						}
					}
				}
				else
				{
					layerUtils.iMsg(-1,resultVo.error_info);
					return false;
				}
			};
            //console.log("here");
			service.queryBalanceFromFundLog (jsonParam,queryBalanceFromFundLogComplate);
		//}
	}


	/**
	 * 事件绑定
	 * */
	function bindPageEvent(){
		
	}

	/**
	 * 销毁
	 * */
	function destroy(){
		appUtils.setSStorageInfo("failure","failure");
		service.destroy();
	}
	
	var rechargefailure = {
		"init" : init,
		"bindPageEvent" : bindPageEvent,
		"destroy" : destroy
	};

	module.exports = rechargefailure;
});
define("project/scripts/cash/rechargeinactive",function(require,exports,module){
	var appUtils = require("appUtils"),
		layerUtils = require("layerUtils"),
		service = require("serviceImp").getInstance(),  //业务层接口，请求数据
	    _pageId = "#cash_rechargeinactive";

    var user_=require("project/scripts/common/user");
	var dictionary = require("dictionary");
    var fund_account = user_.fund_account;
    var password = user_.password;
//    var utils=require("project/scripts/common/utils");
//    $(".click_back").click(function(){
//        appUtils.pageInit("cash/rechargeinactive", "cash/cashhasopened", {});
//    });

    function init(){
        $("#header_message").html("未激活");
//        utils.clickBack(_pageId);
        var jsonParam = {"fund_account":fund_account,"password":password};
        var bankAccountInfoComplate = function(resultVo){
            if(resultVo.error_no == 0)
            {
                var resultDataJson = resultVo["results"][0];
                var resultData = JSON.parse(resultDataJson["result"]);
                var bankNo = resultData["bankNo"];
                var bankNameShow = dictionary.getBankNameMap().get(bankNo);
                var bankClass = dictionary.getBankClassMap().get(bankNo);
                $(_pageId + " #bank_logo").removeClass().addClass("bk_logo mt20 lklg_"+ bankClass);
                $(_pageId + " #bank-name").html(bankNameShow);
            }
            else
            {
                layerUtils.iMsg(-1,resultVo.error_info);
                return false;
            }
        };
        service.bankAccountInfo(jsonParam,bankAccountInfoComplate);
    };


		
	/**
	 * 事件绑定
	 * */
	function bindPageEvent(){
		
	}

	/**
	 * 销毁
	 * */
	function destroy(){
		service.destroy();
	}
	
	var rechargeinactive = {
		"init" : init,
		"bindPageEvent" : bindPageEvent,
		"destroy" : destroy
	};
	
	module.exports = rechargeinactive;
});
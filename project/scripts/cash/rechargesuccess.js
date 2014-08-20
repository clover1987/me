define("project/scripts/cash/rechargesuccess",function(require,exports,module){
	var appUtils = require("appUtils"),
		layerUtils = require("layerUtils"),
		service = require("serviceImp").getInstance(),  //业务层接口，请求数据
	    _pageId = "#cash_rechargesuccess";

    var user=require("project/scripts/common/user");
	var ifSkip = true;
	var nextN = 0;

    var utils=require("project/scripts/common/utils");

//    $(".click_back").click(function(){
//        appUtils.pageInit("cash/rechargesuccess", "cash/cashhasopened", {});
//    });
    /**
     * 初始化
     */
    function init() {
//        utils.clickBack(_pageId);
        layerUtils.iLoading(true,"请等待...",true);
        $("#header_message").html("充值成功");
        //在rechargeutil.js中，存入storage的
        var serialNO = appUtils.getSStorageInfo("serialNO");

        var calculateTradeDayComplete = function(resultVo){
            if (resultVo.error_no == 0) {
                var resultDataJson = resultVo["results"][0];
                if(resultDataJson != null)
                {
                    //T
                    var resultProcess = JSON.parse(resultDataJson["result"]);
                    var tDay = $.trim(resultProcess["T"]);
                    var monthStr = parseInt(tDay.substring(4, 6));
                    var dayStr = parseInt(tDay.substring(6, 8));
                    var tradeDateStr ="<span>" + monthStr +"</span>月<span>"+ dayStr + "</span>日";
                    $(_pageId +" #TradeDay").html(tradeDateStr);
                    $(_pageId +" #TradeDay3").html(tradeDateStr + "16:00");
                    //T+1
                    var t1Day = $.trim(resultProcess["T+1"]);
                    monthStr = parseInt(t1Day.substring(4, 6));
                    dayStr = parseInt(t1Day.substring(6, 8));
                    tradeDateStr ="<span>" + monthStr +"</span>月<span>"+ dayStr + "</span>日";
                    $(_pageId +" #TradeDay1").html(tradeDateStr);
                    //T+2
                    var t2Day = $.trim(resultProcess["T+2"]);
                    monthStr = parseInt(t2Day.substring(4, 6));
                    dayStr = parseInt(t2Day.substring(6, 8));
                    tradeDateStr ="<span>" + monthStr +"</span>月<span>"+ dayStr + "</span>日";
                    $(_pageId +" #TradeDay2").html(tradeDateStr);
                }
            }
            else
            {
                layerUtils.iMsg(-1, resultVo.error_info);
                return false;
            }

        };
        //查询充值相关日期
        service.calculateTradeDay({serialNO: serialNO}, calculateTradeDayComplete);
    }

		
	/**
	 * 事件绑定
	 */
	function bindPageEvent(){
		appUtils.bindEvent($(_pageId + " #successBtn"),function(){
			var jsonParam = {};
			//appUtils.pageInit("cash/rechargesuccess","cash/rechargehistory",jsonParam);
            appUtils.pageInit("cash/index","cash/rechargehistory",jsonParam);
			return false;
		});
	}

	/**
	 * 销毁
	 */
	function destroy(){
		appUtils.setSStorageInfo("success","success");
		service.destroy();
	}
	
	var rechargesuccess = {
		"init" : init,
		"bindPageEvent" : bindPageEvent,
		"destroy" : destroy
	};
	
	module.exports = rechargesuccess;
});
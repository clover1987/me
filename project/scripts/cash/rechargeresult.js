define("project/scripts/cash/rechargeresult",function(require,exports,module){
	var appUtils = require("appUtils"),
		layerUtils = require("layerUtils"),
		service = require("serviceImp").getInstance(),  //业务层接口，请求数据
		validatorUtil = require("validatorUtil"),
		_pageId = "#cash_rechargeresult";
		
	var serialNO = "";
	var startCountDown = null;
	var clearCountDown = null;

    var utils=require("project/scripts/common/utils");
//    $(".click_back").click(function(){
//        appUtils.pageInit("cash/rechargeresult", "cash/cashhasopened", {});
//    });
	/**
	 * 初始化
	 * */
	function init(){
        $("#header_message").html("充值结果");
//        utils.clickBack(_pageId);
		serialNO = appUtils.getSStorageInfo("serialNO");
	//	alert("888888:" + appUtils.getSStorageInfo("success"));
		if(appUtils.getSStorageInfo("success") != null && appUtils.getSStorageInfo("success") != "" && appUtils.getSStorageInfo("success") != undefined )
		{
		//	alert("111111:" + appUtils.getSStorageInfo("success"));
//			$("body #bodyContent").remove("#cash_index");
//			appUtils.pageInit("cash/rechargeresult","cash/index",{});
//			appUtils.pageBack();
			window.history.go(-3);
			return false;
		}else if(appUtils.getSStorageInfo("failure") != null && appUtils.getSStorageInfo("failure") != "" && appUtils.getSStorageInfo("failure") != undefined)
		{
			
//			$("body #bodyContent").remove("#cash_index");
//			appUtils.pageInit("cash/rechargeresult","cash/index",{});
			window.history.go(-2);
			return false;
		}else if(appUtils.getSStorageInfo("inprogress") != null && appUtils.getSStorageInfo("inprogress") != "" && appUtils.getSStorageInfo("inprogress") != undefined)
		{
//			$("body #bodyContent").remove("#cash_index");
//			appUtils.pageInit("cash/rechargeresult","cash/index",{});
////			appUtils.pageBack();
			window.history.go(-3);
			return false;
		}
		
		//layerUtils.iLoading(true,"请等待...",true);
		var sumTime = 10;
		//处理时发生的动作
		var handleCount = function(){
			// 显示倒计时
			$(_pageId + " #time").show();
			$(_pageId + " #time").text(sumTime--);
		};
		handleCount();

		startCountDown = window.setInterval(function(){
			handleCount();
		}, 1000);
		// 15 秒之后清除计时器
		clearCountDown = setTimeout(function(){
			// 隐藏倒计时
			window.clearInterval(startCountDown);
			//var serialNO = appUtils.getSStorageInfo("serialNO");
			queryRechargeResult(serialNO);
			
		},6000);

//		setTimeout(function(){
//			appUtils.pageInit("cash/rechargeresult","cash/rechargesuccess",{});
//		}, 2000);
	}
	
	/**
	 * 事件绑定
	 * */
	function bindPageEvent(){
		
	}
	
	function queryRechargeResult(serialNO)
	{
		var jsonParam = {"serialNO":serialNO};
		var queryBalanceFromFundLogComplate=function(resultVo){
			if(resultVo.error_no == 0)
			{
				var resultDataJson = resultVo["results"][0];
				if(resultDataJson != null)
				{
					var resultProcess = JSON.parse(resultDataJson["result"]);
					var status = resultProcess["status"];
					// 如果接口明确返回成功或者失败，则跳转，否则查询
					if(status == 0)  //0 --成功
					{
						appUtils.pageInit("cash/rechargeresult","cash/rechargesuccess",{});
						return false;
					}
					else if(status == 1) // 1--失败
					{
						appUtils.pageInit("cash/rechargeresult","cash/rechargefailure",{});
						return false;
					}
					else if(status == 2)  //  2 --处理中
					{
						var sumTime = 5;
						var handleCount = function(){
							$(_pageId + " #time").show();
							$(_pageId + " #time").text(sumTime--);
						};
						handleCount();
						startCountDown = window.setInterval(function(){
							handleCount();
						}, 1000);
						// 5 秒之后清除计时器
						clearCountDown = setTimeout(function(){
							window.clearInterval(startCountDown);
						//	var serialNO = appUtils.getSStorageInfo("serialNO");
							queryRechargeResultagain(serialNO);
							
						},6000);
					}
				}
			}
			else
			{
				layerUtils.iMsg(-1,resultVo.error_info);
				return false;
			}
		};
		service.queryBalanceFromFundLog(jsonParam,queryBalanceFromFundLogComplate);
	}
	
	function queryRechargeResultagain(serialNO)
	{
		var jsonParam = {"serialNO":serialNO};
		var queryBalanceFromFundLogComplate=function(resultVo){
			if(resultVo.error_no == 0)
			{
				var resultDataJson = resultVo["results"][0];
				if(resultDataJson != null)
				{
					var resultProcess = JSON.parse(resultDataJson["result"]);
					var status = resultProcess["status"];
					// 如果接口明确返回成功或者失败，则跳转，否则
					if(status == 0)  //0 --成功
					{
						appUtils.pageInit("cash/rechargeresult","cash/rechargesuccess",{});
						return false;
					}
					else if(status == 1) // 1--失败
					{
						appUtils.pageInit("cash/rechargeresult","cash/rechargefailure",{});
						return false;
					}
					else//指定页 或充值记录页
					{
						appUtils.pageInit("cash/rechargeresult","cash/rechargehistory",{});
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
        //从基金日志中获取余额
		service.queryBalanceFromFundLog(jsonParam,queryBalanceFromFundLogComplate);
	}
	/**
	 * 销毁
	 * */
	function destroy(){
		if(startCountDown!=null){
			window.clearInterval(startCountDown);
			startCountDown = null;
		}
		if(clearCountDown!=null){
			window.clearTimeout(clearCountDown);
			clearCountDown = null;
		}
		service.destroy();
	}
	
	var rechargeresult = {
		"init" : init,
		"bindPageEvent" : bindPageEvent,
		"destroy" : destroy
	};
	
	module.exports = rechargeresult;
});
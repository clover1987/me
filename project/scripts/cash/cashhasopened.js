define("project/scripts/cash/cashhasopened",function(require,exports,module){
	var appUtils = require("appUtils"),
		layerUtils = require("layerUtils"),
		service = require("serviceImp").getInstance(),  //业务层接口，请求数据
	   _pageId = "#cash_cashhasopened";
    var user_=require("project/scripts/common/user");

	var gconfig = require("gconfig").global;
	
	var user = require("project/scripts/include/user");
	var userInfo = "";//用户信息
	   
	var commonservice = require("project/scripts/common/commonservice");
	var common = require("project/scripts/common/common");
    var utils= require("utils");
//    var utils=require("project/scripts/common/utils");



	var numPerPage;
	var curPage;


	/**
	 * 初始化
	 * */
	function init(){

        layerUtils.iLoading(true);

        $("#header_message").html("我的金腾通");

       	var trade_date_from = "";
		var trade_date_to = "";
		numPerPage = 1;
		curPage = 1;
		// 现金产品登记查询
		// 给予申请中的客户，提示信息
		try
		{
			var resultProcess = commonservice.getAccountProfit(user_.fund_account, user_.fund_code, trade_date_from, trade_date_to,numPerPage,curPage);
			// var resultData = resultProcess[resultProcess.length-1];
			var busiInfoData = resultProcess["busiInfo"];
			var pageInfoData = resultProcess["pageInfo"];
			
			var resultData = busiInfoData[0];
			// fund_account fund_code trade_date apply_amount redeem_amount daily_return total_return daily_profit latestweekly_yield next_settle_date
			// 资金账户 基金代码 交易日期(yyyy-mm-dd) 当日参与金额（元） 当日赎回金额（元） 当日收益（元） 截止当日的累计收益（元） 每万份基金单位当日收益(元) 最近7日折算年收益率 下一个结算日期(yyyy-mm-dd)
			var trade_date = resultData["trade_date"]; //交易日期
			var redeem_amount = resultData["redeem_amount"];
			
			var next_settle_date = resultData["next_settle_date"];
			var daily_return = resultData["daily_return"]; // 当日收益（元）
			var apply_amount = resultData["apply_amount"]; // 当日参与金额
			var total_return = resultData["total_return"]; // 截止当日的累计收益（元）
			// var latestweekly_yield = resultData["latestweekly_yield"]; // 每万份基金单位当日收益(元)
			// var daily_profit = resultData["daily_profit"]; // 最近7日折算年收益率
			
			var next_settle_date_str = commonservice.formateStrToDate(next_settle_date + " 00:00:00");
			next_settle_date_str = new Date().format("yyyy年MM月dd日");
			var next_settle_date_show = "下一笔收益" + next_settle_date_str.substring(next_settle_date_str.length - 5, next_settle_date_str.length) + "到账";

			$(_pageId + " #next_settle_date").html(next_settle_date_show);
			if(daily_return == null || daily_return == 0 || daily_return == '0')
			{
				$(_pageId + " #daily_return").html("暂无收益");
			}
			else
			{
				utils.moveNum(common.fmoney(daily_return,2),_pageId + " #daily_return");
//				$(_pageId + " #daily_return").html(common.fmoney(daily_return,2));
			}
			//utils.moveNum(common.fmoney(apply_amount,2),_pageId + " #apply_amount");
			//utils.moveNum(common.fmoney(total_return,2),_pageId + " #total_return");
            utils.moveNum(common.fmoney((apply_amount==""||apply_amount=="undefined")?0:apply_amount, 2),_pageId + " #apply_amount");
            utils.moveNum(common.fmoney((total_return==""||total_return=="undefined")?0:total_return, 2),_pageId + " #total_return");
			
			
			// 设置默认基金代码，目前一只 多只放集合
			/*
			if(resultData["fund_code"] != null && resultData["fund_code"] != "")
			{
				appUtils.setLStorageInfo("fund_code",resultData["fund_code"]);
			}
			*/
		}
		catch(e)
		{
			console.log("exception occurred");
		}
		
		var jsonParam = {"fund_code":user_.fund_code,"trade_date_from":trade_date_from,"trade_date_to":trade_date_to,"page_size":numPerPage,"page_no":curPage};
		var fundPerformanceInfoComplate = function(resultVo){
			if(resultVo.error_no == 0)
			{
				// var currentDate = new Date(user.getCurrentDate());
				// var longDate = currentDate.getTime();
				// appUtils.setLStorageInfo("fundPerformanceInfoFirstCache",longDate + "^" + JSON.stringify(resultVo));
				
				var resultDataJson = resultVo["results"][0];
				resultProcess = JSON.parse(resultDataJson["result"]);
				
				if(resultDataJson != null)
				{
					// curPage = results[0].page;			//当前页
					// totalPage = results[0].totalPage;	//总页数
					
					var busiInfoDataInner = resultProcess["busiInfo"];
					var pageInfoDataInner = resultProcess["pageInfo"];
		
					var latestweekly_yield = busiInfoDataInner[0]["latestweekly_yield"]; // 最近7日折算年收益率
					var daily_profit = busiInfoDataInner[0]["daily_profit"]; // 每万份基金单位当日收益(元)
					$(_pageId + " #daily_profit").html(common.fmoney(daily_profit + 0,4));
					$(_pageId + " #latestweekly_yield").html((latestweekly_yield * 100).toFixed(2) + "%");
				}
			}
			else
			{
				layerUtils.iMsg(-1,resultVo.error_info);
				return false;
			}

		};
		service.fundPerformanceInfo(jsonParam,fundPerformanceInfoComplate);


//        layerUtils.iLoading(false);
	}
			
	
	/**
	 * 事件绑定
	 * */
	function bindPageEvent(){
		appUtils.bindEvent($(_pageId + " #autorechargeBtn"),function(){


			var jsonParam = {};
			appUtils.pageInit("cash/cashhasopened","cash/autorecharge",jsonParam);
			return false;
		});

        //我要取款逻辑  jyc
		appUtils.bindEvent($(_pageId + " #takenbackBtn"),function(){
			
			//交易时间的判断
			// 判断是否是交易时间
			var isTradeTimeNow = false;
			var type = "2";
			var exchange_type = "76";
			var time_kind = "1";
			var date = "";
			var time = "";
			var jsonParam = {"type":type,"exchange_type":exchange_type,"time_kind":time_kind,"date":date,"time":time};
			var checkTransactionTimeComplate = function(resultVo){
//				if(resultVo.error_no == 0)   测试临时注释
                if(resultVo.error_no == 0)
				{
					var jsonParam = {};
					appUtils.pageInit("cash/cashhasopened","cash/takenback",jsonParam);
//					return false;
				}
				else
				{
//                    var jsonParam = {};
//                    appUtils.pageInit("cash/cashhasopened","cash/takenback",jsonParam);
					layerUtils.iMsg(-1,"亲，请在交易日9:00-15:00提交取款申请！");    //临时注释
					return false;
				}
			};
//           没有在service中找到该方法
			service.checkTransactionTime(jsonParam,checkTransactionTimeComplate);
		});

		// 昨日交易明细
		appUtils.bindEvent($(_pageId + " #apply_amount_span"),function(){
			var jsonParam = {};
			appUtils.pageInit("cash/cashhasopened","cash/applyamount",jsonParam);
			return false;
		});
		// 累计收益
		appUtils.bindEvent($(_pageId + " #total_return_span"),function(){
			var jsonParam = {};
			appUtils.pageInit("cash/cashhasopened","cash/totalreturn",jsonParam);
			return false;
		});
		// 万份收益
		appUtils.bindEvent($(_pageId + " #daily_profit_span"),function(){
			var jsonParam = {};
			appUtils.pageInit("cash/cashhasopened","cash/dailyprofit",jsonParam);
			return false;
		});
		// 七日年化
		appUtils.bindEvent($(_pageId + " #latestweekly_yield_span"),function(){
			var jsonParam = {};
			appUtils.pageInit("cash/cashhasopened","cash/latestweeklyyield",jsonParam);
			return false;
		});
		// 常见问题
		appUtils.bindEvent($(_pageId + " #commonquestion"),function(){
            var jsonParam = {};
            appUtils.pageInit("cash/cashhasopened","yjb/yjb_i_jtt_commonProblem",jsonParam);
			return false;
		});
		//取现记录
		appUtils.bindEvent($(_pageId + " #takenbackHistoryBtn"),function(){
			var jsonParam = {};
			appUtils.pageInit("cash/cashhasopened","cash/takenbackhistory",jsonParam);
			return false;
		});
		//充值
		appUtils.bindEvent($(_pageId + " #rechargeBtn"),function(){
            /*
			//交易时间的判断
			// 判断是否是交易时间
			var isTradeTimeNow = false;
			var type = "1";
			var exchange_type = "";
			var time_kind = "1";
			var date = "";
			var time = "";
			var bankNo = "";
			
			var jsonParam = {"fund_account":fund_account,"password":"111111"};
			var bankAccountInfoComplate = function(resultVo){
				if(resultVo.error_no == 0)
				{
					var resultDataJson = resultVo["results"][0];
					var resultData = JSON.parse(resultDataJson["result"]);
					bankNo = resultData["bankNo"];
					var bkaccount_status = resultData["bkaccount_status"];// 0-未指定   1-预指定   2-已指定
					
					// 根据银行编号查询银行交易时间
					var jsonParam = {"type":type,"exchange_type":bankNo,"time_kind":time_kind,"date":date,"time":time};
					var checkTransactionTimeComplate = function(resultVo){
						if(resultVo.error_no == 0)
						{
							if(bkaccount_status == 0)//银行三方存管        0--未指定     1--预指定       2--已指定
							{
								appUtils.pageInit("cash/rechargeresult","cash/rechargeinactive",{});
								return false;
							}
							
							var jsonParam = {};
							appUtils.pageInit("cash/cashhasopened","cash/recharge",jsonParam);
							return false;
						}
						else
						{
							// layerUtils.iMsg(-1,resultVo.error_info);
							layerUtils.iMsg(-1,"亲，请在交易日9:00-16:00提交充值申请！");
							return false;
						}
					};
					service.checkTransactionTime(jsonParam,checkTransactionTimeComplate);
				}
				else
				{
					layerUtils.iMsg(-1,resultVo.error_info);
					return false;
				}
			};
			service.bankAccountInfo(jsonParam,bankAccountInfoComplate);
			*/
            var jsonParam = {};
            appUtils.pageInit("cash/cashhasopened","cash/recharge",jsonParam);
		});
		//充值记录
		appUtils.bindEvent($(_pageId + " #rechargeHistoryBtn"),function(){
			var jsonParam = {};
			appUtils.pageInit("cash/cashhasopened","cash/rechargehistory",jsonParam);
			return false;
		});
	}
	
	/**
	 * 页面切换的后退，返回到前一个page
	 */
	function pageBack()
	{
		var ua = navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i)=="micromessenger")
		{
			WeixinJSBridge.call('closeWindow');
		}
	}
	
	/**
	 * 销毁
	 * */
	function destroy(){
		service.destroy();
	}
	
	var cashhasopened = {
		"init" : init,
		"bindPageEvent" : bindPageEvent,
		"destroy" : destroy
	};
	
	module.exports = cashhasopened;
});
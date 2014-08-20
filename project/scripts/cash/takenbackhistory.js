define("project/scripts/cash/takenbackhistory",function(require,exports,module){
	var appUtils = require("appUtils"),
	layerUtils = require("layerUtils"),
	service = require("serviceImp").getInstance(),  //业务层接口，请求数据
   _pageId = "#cash_takenbackhistory";

    var user_=require("project/scripts/common/user");

	var myLayerUtils= require("project/scripts/common/myLayerUtils");
	var validatorUtil = require("validatorUtil");
	var commonservice = require("project/scripts/common/commonservice");

	var global = require("gconfig").global;

    var utils=require("project/scripts/common/utils");

//    $(".click_back").click(function(){
//        appUtils.pageInit("cash/takenbackhistory", "cash/cashhasopened", {});
//    });

	/*
	 * 分页加载元素初始化开始
	 */
	var common = require("project/scripts/common/common");
	var atricleVIscroll = {"scroll":null, "_init":false};
	var curPage;				//当前页面
	var isShowWaitFlag = true;		//是否显示等待层标识
	var isAppendFlag = false;		//是否累加标识
	var numPerPage;
	var totalPage;
	var flagFirst = true;

	var user = require("project/scripts/include/user");
	
	function init(){
        $("#header_message").html("取款记录");
//        utils.clickBack(_pageId);
		/*
		 * <li>
					<span class="date">2014-05-08</span>
					<span class="time">15:00</span>
					<span class="money">1500</span>
					<a href="#" class="revoke">撤销</a>
				</li>
				<li>
					<span class="date">2014-05-08</span>
					<span class="time">15:00</span>
					<span class="money">1500</span>
					<a href="#" class="fail">提现失败</a>
				</li>
				<li>
					<span class="date">2014-05-08</span>
					<span class="time">15:00</span>
					<span class="money">1500</span>
					<span class="finish">已成功</span>
				</li>

		 */
		
		//var userInfo = user.getUserInfo();//用户信息
		//if(userInfo != null)
		//{
			// 查询当日万份收益
			// 测试数据
			
		//	fund_account = "39264775"; // 111111110
			numPerPage = 15;
			curPage = 1;
			
			var jsonParam = {"fund_account":user_.fund_account};
			var redeemTotalAmountComplate = function(resultVo){
				if(resultVo.error_no == 0)
				{
					var resultDataJson = resultVo["results"][0];
					var resultData = JSON.parse(resultDataJson["result"]);
					var totalAmount = resultData["totalAmount"];
					if(totalAmount != null)
					{
						totalAmount = common.fmoney(totalAmount,2);
					}
					$(_pageId + " #takenbackhistoryall").html(totalAmount);
				}
				else
				{
					layerUtils.iMsg(-1,resultVo.error_info);
					return false;
				}
			};
			service.redeemTotalAmount(jsonParam,redeemTotalAmountComplate);
			layerUtils.iLoading(false);

			
			
			flagFirst = true;
			queryPage(_pageId, "takenbackhistory", "takenbackhistory_ul",curPage,numPerPage,isAppendFlag,isShowWaitFlag);
		//}
	}
	
	function queryPage(_pageId,pageSimpleId,ulElementId,curPage,numPerPage,isAppendFlag,isShowWaitFlag)
	{
		var jsonParam = {"fund_account":user_.fund_account,"fund_code":user.fund_code,"trade_date_from":'',"trade_date_to":'',"page_size":numPerPage,"page_no":curPage};
		var takenbackhistoryComplate = function(resultVo){
			if(resultVo.error_no == 0)
			{
				var resultDataJson = resultVo["results"][0];
				resultProcess = JSON.parse(resultDataJson["result"]);
				
				isShowWaitFlag = false;
				var innerHtml = "";
				if(resultDataJson != null)
				{
					var busiInfoDataInner = resultProcess["busiInfo"];
					var pageInfoDataInner = resultProcess["pageInfo"];
		
					totalPage = pageInfoDataInner["totalPage"];
					

					for(var i = 0; i < busiInfoDataInner.length; i++)
					{
						var resultData = busiInfoDataInner[i];
						var withdraw_id = resultData["withdraw_id"];
						var time = resultData["time"];//返回的毫秒数
						
						var newTime = new Date(time);
						
						var timeStr = newTime.format("yyyy-MM-dd hh:mm:ss");
						var trade_date = timeStr.substring(0,10);
						var trade_time = timeStr.substring(11,16);
						
						var trade_amount = resultData["redeem_amount"];
						var trade_status = resultData["status"]; 
						var can_undo = resultData["can_undo"];
						
						innerHtml += '<li '+(i%2==0 ? ' class="even"': 'class="odd"')+'><span class="date">'+trade_date+'</span><span class="time">'+trade_time+'</span>';
						// 如果不可撤销  --0:未处理  1成功  2失败 --3处理 4已撤销)
						if(trade_status == 1 || trade_status == 2 || trade_status == 4)
						{
							if(trade_status == 1)
							{
								innerHtml += '<span class="finish">已成功</span>';
							}
							else if(trade_status == 2)
							{
								innerHtml += '<span class="finish" style="color: #FF1414">提现失败</span>';
                                //innerHtml += '<span class="finish" style="background-color:green;>提现失败</span>';
							}
							else if(trade_status == 4)
							{
								innerHtml += '<span class="finish">已撤销</span>';
							}
						}
						else if(trade_status == 0 || trade_status == 3)	
						{
							// 此状态下也需区分是否可撤销 0 不可撤销
							if(can_undo == 0)
							{
								if(trade_status == 0)
								{
									innerHtml += '<span class="finish">未处理</span>';
								}
								else if(trade_status == 3)
								{
									innerHtml += '<span class="finish" style="background-color:#2C8EE3;">处理中</span>';
								}
							}
							else if(can_undo == 1)
							{
								innerHtml += '<a href="javascript:void(0);" class="revoke" withdraw_id=' + withdraw_id + '>撤销</a>';
							}
						}
						innerHtml += '<span class="money" style="float:right;"> '+ common.fmoney(trade_amount,2) + '</span></li>';
					}
				}
				if(isAppendFlag)
				{
					$(_pageId + " #" + ulElementId).append(innerHtml);
				}
				else
				{ 
					$(_pageId + " #" + ulElementId).html(innerHtml);
				}
				//加载滑动组件
				common.loadInitVIscroll(_pageId,pageSimpleId,ulElementId,atricleVIscroll,curPage,numPerPage,totalPage,isShowWaitFlag,queryPage,"暂无取款记录","110");
			}
			else
			{
				layerUtils.iAlert(resultVo.error_info,-1);
				return false;
			}
		};
		service.redeemHistory(jsonParam,takenbackhistoryComplate);
	}
	
	/**
	 * 事件绑定
	 * */
	function bindPageEvent(){
		// 往上拉 展示更多，默认显示10条，按照时间倒序排列
	}
	
	
	//点击撤销
	$(_pageId + " #takenbackhistory_ul a").live("click",function(){
	// appUtils.preBindEvent(_pageId, "#takenbackhistory_ul", function(){
		var withdraw_id = $(this).attr("withdraw_id");
		var currentElement = $(this);
		
		//判断是否是交易时间
		var isTradeTimeNow = false;
		var jsonParam = {"fund_company":user.fund_company};
		var checkFundTradeTimeComplate = function(resultVo){
			if(resultVo.error_no == 0)
			{
				var resultDataJson = resultVo["results"][0];
				if(resultDataJson != null)
				{
					var resultProcess = JSON.parse(resultDataJson["result"]);
					isTradeTimeNow = resultProcess["isTradeTimeNow"];
				}
			}
			else
			{
				layerUtils.iMsg(-1,resultVo.error_info);
				return false;
			}
		};
		service.checkFundTradeTime(jsonParam,checkFundTradeTimeComplate);
		
		if(!isTradeTimeNow)
		{
			layerUtils.iMsg(-1,"亲，请在交易日9:00-15:00办理取款手续哦！");
			return false;
		}
		
		
		myLayerUtils.iConfirm(_pageId,"亲，确定要撤销取款请求？",function(){
			var jsonParam = {"withdraw_id":withdraw_id,"fund_account":user_.fund_account};
			var redeemUndoComplate = function(resultVo){
				if(resultVo.error_no == 0)
				{
					var resultData = resultVo["results"][0];
					//var resultProcess = JSON.parse(resultDataJson["result"]);
					currentElement.after('<span class="finish">已撤销</span>');
					currentElement.hide();
				}
				else
				{
					layerUtils.iMsg(-1,resultVo.error_info);
					return false;
				}
			};
			service.redeemUndo(jsonParam,redeemUndoComplate);
			layerUtils.iLoading(false);
		});
		
		//弹出框
//		appUtils.bindEvent($(_pageId+" #ok"),function(){
//			if($(_pageId+" #phone-btn").hasClass("phone-btn-box")){
//				var jsonParam = {"withdraw_id":withdraw_id,"fund_account":fund_account};
//				var redeemUndoComplate = function(resultVo){
//					if(resultVo.error_no == 0)
//					{
//						var resultData = resultVo["results"][0];
//						//var resultProcess = JSON.parse(resultDataJson["result"]);
//						currentElement.after('<span class="finish">已撤销</span>');
//						currentElement.hide();
//					}
//					else
//					{
//						layerUtils.iMsg(-1,resultVo.error_info);
//						return false;
//					}
//				};
//				service.redeemUndo(jsonParam,redeemUndoComplate);
//				layerUtils.iLoading(false);
//			}
//		});
//		//取消
//		appUtils.bindEvent($(_pageId+" #cancel"),function(){
//			cleanDiv();
//			$(_pageId + " #windows").removeClass("show");
//			
//		});
		
		
		
		
//		//是交易时间弹确认框
//		layerUtils.iConfirm("亲，确定要撤销取款请求？",function(){
//			var jsonParam = {"withdraw_id":withdraw_id,"fund_account":fund_account};
//			var redeemUndoComplate = function(resultVo){
//				if(resultVo.error_no == 0)
//				{
//					var resultData = resultVo["results"][0];
//					//var resultProcess = JSON.parse(resultDataJson["result"]);
//					currentElement.after('<span class="finish">已撤销</span>');
//					currentElement.hide();
//				}
//				else
//				{
//					layerUtils.iMsg(-1,resultVo.error_info);
//					return false;
//				}
//			};
//			service.redeemUndo(jsonParam,redeemUndoComplate);
//			layerUtils.iLoading(false);
//		});
//		
		
	});
	/**
	 * 销毁
	 * */
	function destroy(){
		service.destroy();
	}
	var takenbackhistory = {
			"init" : init,
			"bindPageEvent" : bindPageEvent,
			"destroy" : destroy
		};
		
		module.exports = takenbackhistory;
});
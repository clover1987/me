define("project/scripts/cash/applyamount",function(require,exports,module){
	var appUtils = require("appUtils"),
		layerUtils = require("layerUtils"),
		service = require("serviceImp").getInstance(),  //业务层接口，请求数据
	   _pageId = "#cash_applyamount";

	var validatorUtil = require("validatorUtil");
    var utils=require("project/scripts/common/utils");

	var user = require("project/scripts/include/user");
	//var userInfo = user.getUserInfo();//用户信息
    var user_=require("project/scripts/common/user");
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

	var trade_date_from = "";
	var trade_date_to = "";
	
	var commonservice = require("project/scripts/common/commonservice");
	/**
	 * 初始化
	 * */

//    $(".click_back").click(function(){
//        appUtils.pageInit("cash/applyamount", "cash/cashhasopened", {});
//    });

 	function init(){
        $("#header_message").html("参与明细");
//        _pageId = "#cash_applyamount";
//        utils.clickBack(_pageId);
	/*
		<li class="trade-item">
			<div class="trade-item-out">
				<p class="trade-money"><strong class="blue">-10000</strong>元</p>
				<span class="trade-state yellow">未处理</span>
				<span class="trade-date">2014-04-10</span>
			</div>
		</li>
		<li class="trade-item">
			<div class="trade-item-in">
				<p class="trade-money"><strong class="red">+10000</strong>元</p>
				<span class="trade-date">2014-04-10</span>
				<span class="trade-state ">确认成功</span>
			</div>
		</li>
		*/
		layerUtils.iLoading(true,"请等待...",true);
		
		
		trade_date_from = ""; // 2014-05-06
		trade_date_to = ""; // 2014-05-20
		numPerPage = 10;
		curPage = 1;
		
		// 查询昨日参与金额
		try
		{
		
			var resultProcess = commonservice.getAccountProfit(user_.fund_account,user_.fund_code,trade_date_from,trade_date_to,numPerPage,curPage);
			
			// var resultData = resultProcess[resultProcess.length-1];
			var busiInfoData = resultProcess["busiInfo"];
			var pageInfoData = resultProcess["pageInfo"];
			
			var resultData = busiInfoData[0];
			
			var apply_amount = resultData["apply_amount"];
			$(_pageId + " #trade_amount").html(common.fmoney(apply_amount,2));
		}
		catch(e)
		{
			
		}
		
		queryPage(_pageId, "applyamount", "applyamount_ul",curPage,numPerPage,isAppendFlag,isShowWaitFlag);
		layerUtils.iLoading(false);
	}
	
	function queryPage(_pageId,pageSimpleId,ulElementId,curPage,numPerPage,isAppendFlag,isShowWaitFlag)
	{
		// serviceResults
		// 方式一 将service返回包装成对象
		
		// 方式二 直接在该方法调用service
		// 测试数据
		var jsonParam = {"fund_account":user_.fund_account,"fund_code":user_.fund_code,"trade_date_from":trade_date_from,"trade_date_to":trade_date_to,"page_size":numPerPage,"page_no":curPage};
		var tradeinfoComplate = function(resultVo){
			if(resultVo.error_no == 0)
			{
				var resultDataJson = resultVo["results"][0];
				resultProcess = JSON.parse(resultDataJson["result"]);
				
				isShowWaitFlag = false;
				var innerHtml = "";
				if(resultDataJson != null)
				{
					// curPage = results[0].page;			//当前页
					// totalPage = results[0].totalPage;	//总页数
					
					var busiInfoDataInner = resultProcess["busiInfo"];
					var pageInfoDataInner = resultProcess["pageInfo"];
		
					// curPage = pageInfoDataInner["pageNo"]+1;
					// curPage +=1;
					totalPage = pageInfoDataInner["totalPage"];
					/*
					if(curPage == 1){
						//$(_pageId + " #trade_amount").html(busiInfoDataInner[0]["trade_amount"]);
						$(_pageId + " #trade_amount").html(common.fmoney(busiInfoDataInner[0]["trade_amount"],2));
					}
					*/
					for(var i = 0; i < busiInfoDataInner.length; i++)
					{
						var resultData = busiInfoDataInner[i];
						
						var trade_date = resultData["trade_time"];
						var trade_amount = resultData["trade_amount"];
						var trade_status = resultData["trade_status"];
						var trade_type = resultData["trade_type"];
						
						trade_date = new Date(trade_date).format("yyyy-MM-dd");
						
						// 假设0为成功，1为失败 
						var trade_status_span = "";
						// 交易处理状态(8:已成交,目前只包含该状态的记录)
						/**
						0	未报
						1	待报
						2	已报
						3	已报待撤
						4	部成待撤
						5	部撤
						6	已撤
						7	部成
						8	已成
						*/
						if(trade_status == "8")
						{
							trade_status_span = '<span class="trade-state">确认成功</span>';
						}
						else if(trade_status == "2")
						{
							trade_status_span = '<span class="trade-state">已报</span>';
						}
						else if(trade_status == "0")
						{
							trade_status_span = '<span class="trade-state">未报</span>';
						}
						else if(trade_status == "1")
						{
							trade_status_span = '<span class="trade-state">待报</span>';
						}
						else if(trade_status == "3")
						{
							trade_status_span = '<span class="trade-state">已报待撤</span>';
						}
						else if(trade_status == "4")
						{
							trade_status_span = '<span class="trade-state">部成待撤</span>';
						}
						else if(trade_status == "5")
						{
							trade_status_span = '<span class="trade-state">部撤</span>';
						}
						else if(trade_status == "6")
						{
							trade_status_span = '<span class="trade-state">已撤</span>';
						}
						else if(trade_status == "7")
						{
							trade_status_span = '<span class="trade-state">部成</span>';
						}
						// ……
						
						if(trade_type == "22" || trade_type == "交易类型")
						{
							innerHtml += '<li class="trade-item"><div class="trade-item-in"><p class="trade-money"><strong class="red">+' + common.fmoney(trade_amount,2) + '</strong>元</p>'
							+ '<span class="trade-date">' + trade_date + '</span></div></li>';
						}
						else if(trade_type == "24" || trade_type == "交易类型2" || trade_type == "53")// 53仅测试不应该出现在这里
						{
							innerHtml += '<li class="trade-item"><div class="trade-item-out"><p class="trade-money"><strong class="blue">' + common.fmoney(trade_amount,2) + '</strong>元</p>'
							+ '<span class="trade-date">' + trade_date + '</span></div></li>';
						}
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
				common.loadInitVIscroll(_pageId,pageSimpleId,ulElementId,atricleVIscroll,curPage,numPerPage,totalPage,isShowWaitFlag,queryPage,"暂无参与明细",112);
			}
			else
			{
				layerUtils.iMsg(-1,resultVo.error_info);
				return false;
			}
		};
		service.tradeinfo(jsonParam,tradeinfoComplate);
	}
	
	/**
	 * 事件绑定
	 * */
	function bindPageEvent(){
//        utils.clickBack(_pageId);
		// 往上拉 展示更多，默认显示10条，按照时间倒序排列
	}
	/**
	 * 销毁
	 * */
	function destroy(){
		service.destroy();
		$(_pageId + " #applyamount_input").val("");
		$(_pageId + " #applyamount_input").attr("placeholder","");
	}
	
	var applyamount = {
		"init" : init,
		"bindPageEvent" : bindPageEvent,
		"destroy" : destroy
	};
	
	module.exports = applyamount;
});
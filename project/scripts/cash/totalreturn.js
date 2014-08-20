define("project/scripts/cash/totalreturn",function(require,exports,module){
	var appUtils = require("appUtils"),
		layerUtils = require("layerUtils"),
		service = require("serviceImp").getInstance(),  //业务层接口，请求数据
	   _pageId = "#cash_totalreturn";

	var validatorUtil = require("validatorUtil");
	var commonservice = require("project/scripts/common/commonservice");
    var utils=require("project/scripts/common/utils");

    /*
    $(".mod-scale").css({
        position: "fixed",
        top: "45px",
        width: "100%",
        "z-index": 10000
    });
    $("#v_container_totalreturn").css({
        top: "155px"
    });
    */


	var user = require("project/scripts/include/user");

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
	var flagFirst = true;

//    $(".click_back").click(function(){
//        appUtils.pageInit("cash/totalreturn", "cash/cashhasopened", {});
//    });
	/**
	 * 初始化
	 * */
	function init(){

        $("#header_message").html("累计收益");

//        utils.clickBack(_pageId);
	/*
		<li class="income-list-item odd">
			<div class="date">2014-04-16</div>
			<div class="money">156.85</div>
		</li>
		<li class="income-list-item even">
			<div class="date">2014-04-15</div>
			<div class="money">126.85</div>
		</li>
		*/
		
		layerUtils.iLoading(true,"请等待...",true);
		// 测试数据
		// fund_account = "33005822"; // 11111111
		// fund_code = "000540"; // 222222
		trade_date_from = ""; // 2014-05-06
		trade_date_to = ""; // 2014-05-20
		numPerPage = 15;
		curPage = 1;
		
		// $(_pageId+" #totalreturn_ul").html("");
		//查询列表
		flagFirst = true;
		queryPage(_pageId, "totalreturn", "totalreturn_ul",curPage,numPerPage,isAppendFlag,isShowWaitFlag);
		layerUtils.iLoading(false);
	}
	
	function queryPage(_pageId,pageSimpleId,ulElementId,curPage,numPerPage,isAppendFlag,isShowWaitFlag)
	{
		// serviceResults
		// 方式一 将service返回包装成对象
		
		// 方式二 直接在该方法调用service
		// 测试数据
		var jsonParam = {"fund_account":user_.fund_account,"fund_code":user_.fund_code,"trade_date_from":trade_date_from,"trade_date_to":trade_date_to,"page_size":numPerPage,"page_no":curPage,"dailyflag":0};
		var fundReturnInfoComplate = function(resultVo){
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
					
					// 首次加载页面元素
					if(flagFirst)
					{
						var trade_date = busiInfoDataInner[0]["trade_date"];
						// var trade_date_show = "每万元收益（" + trade_date + "）";
						var trade_date_show = "累计收益（元）";
						
						$(_pageId + " #trade_date_show").html(trade_date_show);
						var total_return_simple = busiInfoDataInner[0]["total_return"];
						//$(_pageId + " #totalreturn").html(total_return_simple.toFixed(2));
						$(_pageId + " #totalreturn").html(common.fmoney(total_return_simple,2));
						flagFirst = false;
					}
					
					for(var i = 0; i < busiInfoDataInner.length; i++)
					{
						var resultData = busiInfoDataInner[i];
						var trade_date = resultData["trade_date"]; //交易日期
				
						// fund_account fund_code trade_date apply_amount redeem_amount daily_return total_return daily_profit latestweekly_yield next_settle_date
						// 资金账户 基金代码 交易日期(yyyy-mm-dd) 当日参与金额（元） 当日赎回金额（元） 当日收益（元） 截止当日的累计收益（元） 每万份基金单位当日收益(元) 最近7日折算年收益率 下一个结算日期(yyyy-mm-dd)
						var trade_date = resultData["trade_date"]; //交易日期
						trade_date = new Date(trade_date).format("yyyy-MM-dd");
						var daily_return = resultData["daily_return"];
						if(curPage == 1 && i == 0)
						{
							innerHtml += '<li class="income-list-item odd blue-bg"><div class="date">' + trade_date + '</div><div class="money red">' +"+"+ common.fmoney(daily_return,2) + '</div></li>';
						}
						else
						{
							if(i % 2 == 0)
							{
								innerHtml += '<li class="income-list-item odd"><div class="date">' + trade_date + '</div><div class="money red">' +"+"+ common.fmoney(daily_return,2) + '</div></li>';
							}
							else
							{
							innerHtml += '<li class="income-list-item even"><div class="date">' + trade_date + '</div><div class="money red">' +"+"+ common.fmoney(daily_return,2) + '</div></li>';
							}
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
				common.loadInitVIscroll(_pageId,pageSimpleId,ulElementId,atricleVIscroll,curPage,numPerPage,totalPage,isShowWaitFlag,queryPage,"暂无累计收益",110);
			}
			else
			{
				layerUtils.iMsg(-1,resultVo.error_info);
				return false;
			}
		};
		service.fundReturnInfo(jsonParam,fundReturnInfoComplate);
	}
	
	/**
	 * 事件绑定
	 * */
	function bindPageEvent(){
		// 往上拉 展示更多，默认显示10条，按照时间倒序排列
	}
	/**
	 * 销毁
	 * */
	function destroy(){
		service.destroy();
		$(_pageId + " #totalreturn_input").val("");
		$(_pageId + " #totalreturn_input").attr("placeholder","");
	}
	
	var totalreturn = {
		"init" : init,
		"bindPageEvent" : bindPageEvent,
		"destroy" : destroy
		
	};
	
	module.exports = totalreturn;
});
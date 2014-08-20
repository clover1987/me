define("project/scripts/cash/rechargehistory",function(require,exports,module){
    var appUtils = require("appUtils"),
        layerUtils = require("layerUtils"),
        service = require("serviceImp").getInstance(),  //业务层接口，请求数据
        _pageId = "#cash_rechargehistory";

    var myLayerUtils= require("project/scripts/common/myLayerUtils");
    var validatorUtil = require("validatorUtil");


    var global = require("gconfig").global;
    var utils=require("project/scripts/common/utils");


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
    var user_=require("project/scripts/common/user");

//    $(".click_back").click(function(){
//        appUtils.pageInit("cash/rechargehistory", "cash/cashhasopened", {});
//    });
    function init(){
        layerUtils.iLoading(true,"请等待...",true);
        $("#header_message").html("充值记录");
//        utils.clickBack(_pageId);
        //var userInfo = user.getUserInfo();//用户信息
        //if(userInfo != null)
        //{

            //	var jsonParam = {"fund_account":fund_account};
            flagFirst = true;
            queryPage(_pageId, "rechargehistory", "rechargehistory_ul",curPage,numPerPage,isAppendFlag,isShowWaitFlag);
        //}
    }

    function queryPage(_pageId,pageSimpleId,ulElementId,curPage,numPerPage,isAppendFlag,isShowWaitFlag)
    {
        var jsonParam = {"fund_account":user_.fund_account,"fund_code":user_.fund_code,"trade_date_from":'',"trade_date_to":'',"page_size":numPerPage,"page_no":curPage};
        var rechargehistoryComplate = function(resultVo){
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
                    var summaryAmount = busiInfoDataInner["summaryAmount"];
                    if(summaryAmount == null || summaryAmount == "")
                    {
                        summaryAmount = 0;
                    }
                    summaryAmount = common.fmoney(summaryAmount,2);
                    $(_pageId + " #rechargehistoryall").html(summaryAmount);

                    totalPage = pageInfoDataInner["totalPage"];
                    var record = busiInfoDataInner["record"];

                    for(var i = 0; i < record.length; i++)
                    {
                        var resultData = record[i];
                        var time = resultData["trade_time"];//返回的毫秒数
                        var newTime = new Date(time);
                        var timeStr = newTime.format("yyyy-MM-dd hh:mm:ss");
                        var trade_date = timeStr.substring(0,10);
                        var trade_time = timeStr.substring(11,16);
                        var trade_amt = resultData["trade_amt"];
                        var trade_status = resultData["status"];

                        innerHtml += '<li '+(i%2==0 ? ' class="even"': 'class="odd"')+'><span class="date">'+trade_date+'</span><span class="time">'+trade_time+'</span>';
                        // 如果不可撤销  --0:成功  1失败 )
                        if(trade_status == 0)
                        {
                            innerHtml += '<span class="finish" style="color:#2a8ee4;width:84px;">充值成功</span>';
                        }
                        else if(trade_status == 1)
                        {
                            innerHtml += '<span class="finish" style="color:#666666;width:84px;">充值失败</span>';
                        }
                        else if(trade_status == 2)
                        {
                            innerHtml += '<span class="finish" style="color:#ffb518;width:84px;">等待银行返回</span>';
                        }
                        innerHtml += '<span class="money" style="float:right;"> '+ common.fmoney(trade_amt,2)+ '</span></li>';
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
                common.loadInitVIscroll(_pageId,pageSimpleId,ulElementId,atricleVIscroll,curPage,numPerPage,totalPage,isShowWaitFlag,queryPage,"暂无充值记录","110");
            }
            else
            {
                layerUtils.iAlert(resultVo.error_info,-1);
                return false;
            }
        };
        service.history(jsonParam,rechargehistoryComplate);
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
    }
    var rechargehistory = {
        "init" : init,
        "bindPageEvent" : bindPageEvent,
        "destroy" : destroy
    };

    module.exports = rechargehistory;
});
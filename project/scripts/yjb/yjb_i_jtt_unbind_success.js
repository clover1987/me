/**
 * Created by user on 2014/7/25.
 */
define("project/scripts/yjb/yjb_i_jtt_unbind_success",function(require,exports,module){

    var service = require("serviceImp").getInstance(); //业务层接口，请求数据
    var appUtils=require("appUtils");
    var layerUtils = require("layerUtils");
    var _pageId="#yjb_yjb_i_jtt_unbind_success";
    var user=require("project/scripts/include/user");
    //require("jQuery");
    var utils=require("utils");
    var global = require("gconfig").global;
    var user_=require("project/scripts/common/user");
    var utils=require("project/scripts/common/utils");

    /**
     * 初始化
     * */


//    $(".click_back").click(function(){
//        appUtils.pageInit("yjb/yjb_i_jtt_unbind_success", "mine/iHasBind", {});
//    });

    function init(){
        $("#header_message").html("绑定金腾通成功");
//        utils.clickBack(_pageId);
        //调用(理财产品首个收益日期接口 （待添加、修改的接口。。）  查看 T+1 状态
        /**
         * 金腾通开户交易时间查询(1000333)
         * @param fund_account	String	资金账户	Y
         * @param fund_code	String	基金代码	Y
         * @param fund_company	String	基金公司	Y
         **/

        var jsonParam={
            "fund_account":user_.fund_account,
            "fund_code":user_.fund_code,
            "fund_company":user_.fund_company
        };
        var htmlArea="";
        var handleDate=function(num){
            str=num.toString();
            var month=str.substr(4,2);
            var day=str.substr(6,2);
            var dateFormat={
                month:month,
                day:day
            }
            return dateFormat;
        }

        service.accountTransactionTime(jsonParam,function(data){
            //错误信息
            var error_info=data.error_info;
            if(data.error_no==0){
               // alert("金腾通开户交易时间查询接口调用成功 ");
                var results = JSON.parse(data["results"][0]["result"]);

                var account_status="",commit_account_time="",confirm_account_time="",transfer_fund_time="",apply_fund_time="",benefits_time="",benefits_to_account_time="";
                var account_status_b="",commit_account_time_b="",confirm_account_time_b="",transfer_fund_time_b="",apply_fund_time_b="",benefits_time_b="",benefits_to_account_time_b="";

                commit_account_time=results.commit_account_time;       //提交金腾通账户开通申请
                account_status=results.account_status;                 //账户状态  0 提交申请状态   1 确认账户开通状态
                confirm_account_time=results.confirm_account_time;   //确认金腾通账户开户状态
                transfer_fund_time=results.transfer_fund_time;       //可转入资金
                apply_fund_time=results.apply_fund_time;              //自动申请金腾通货币基金
                benefits_time=results.benefits_time;                   //开始计算了收益
                benefits_to_account_time=results.benefits_to_account_time;   //收益到账


                var date_today=utils.getLocalTime2();

//                if(account_status){
//                    //已开通， 则不会进入申请这块了， 所以做处理异常处理即可
//                }else{
                    if(confirm_account_time==undefined||transfer_fund_time==undefined){

                        //更换图片.attr("src","/project/images/"+"left3"+".png");
                        $(_pageId+" .img_success").attr("src","/me/project/images/"+"left_3"+".png");
                        //则显示只有4个状态的页面
                        commit_account_time_b=handleDate(commit_account_time);
                        apply_fund_time_b=handleDate(apply_fund_time);
                        benefits_time_b=handleDate(benefits_time);
                        benefits_to_account_time_b=handleDate(benefits_to_account_time);

                        $(_pageId+" #month_1").html(Number(commit_account_time_b.month));
                        $(_pageId+" #day_1").html(Number(commit_account_time_b.day));
                        //................................................................

                        $(_pageId+" #month_2").html(Number(apply_fund_time_b.month));
                        $(_pageId+" #day_2").html(Number(apply_fund_time_b.day));
                        if(date_today.localeCompare(apply_fund_time)>= 0){
                            $("#t1111").attr("src","/me/project/images/"+"tt1"+".png");
                            $(_pageId+" #change_text_1").html("<span class='type_font'>自动申购金腾通货币基金<br/>申购金额=账户余额-保留金额</span>");
                            $(_pageId+" #item-span-1").css("color","#2a8ee3");
                        }else{
                            $("#t1111").attr("src","/me/project/images/"+"tt4"+".png");
                            $(_pageId+" #change_text_1").html("<span class='type_font_1'>自动申购金腾通货币基金<br/>申购金额=账户余额-保留金额</span>");
                        }

                        $(_pageId+" #month_3").html(Number(benefits_time_b.month));
                        $(_pageId+" #day_3").html(Number(benefits_time_b.day));
                        if(date_today.localeCompare(benefits_time)>= 0){
                            $("#t2222").attr("src","/me/project/images/"+"tt1"+".png");
                            $(_pageId+" #change_text_2").html("<span class='type_font'>开始计算收益</span>");
                            $(_pageId+" #item-span-2x").css("color","#2a8ee3");
                        }else{
                            $("#t2222").attr("src","/me/project/images/"+"tt5"+".png");
                            $(_pageId+" #change_text_2").html("<span class='type_font_1'>开始计算收益</span>");
                        }

                        $(_pageId+" #month_4").html(Number(benefits_to_account_time_b.month));
                        $(_pageId+" #day_4").html(Number(benefits_to_account_time_b.day));
                        if(date_today.localeCompare(benefits_to_account_time)>= 0){
                            $("#t3333").attr("src","/me/project/images/"+"tt1"+".png");
                            $(_pageId+" #change_text_3").html("<span class='type_font'>收益到账</span>");
                            $(_pageId+" #item-span-2y").css("color","#2a8ee3");
                        }else{
                            $("#t3333").attr("src","/me/project/images/"+"tt6"+".png");
                            $(_pageId+" #change_text_3").html("<span class='type_font_1'>收益到账</span>");
                        }
                        //最后将  t3 t4  还有 item-span-3  item-span-4 删除
                        document.getElementById('t3').innerHTML=""
                        document.getElementById('t4').innerHTML=""
                        document.getElementById('item-span-3').innerHTML=""
                        document.getElementById('item-span-4').innerHTML=""

                        $("div[ID='t3']").remove();
                        $("div[ID='t4']").remove();
                        $("div[ID='item-span-3']").remove();
                        $("div[ID='item-span-4']").remove();
                    }else{
                        //则显示有6个状态的页面
                        commit_account_time_b=handleDate(commit_account_time);
                        confirm_account_time_b=handleDate(confirm_account_time);
                        transfer_fund_time_b=handleDate(transfer_fund_time);
                        apply_fund_time_b=handleDate(apply_fund_time);
                        benefits_time_b=handleDate(benefits_time);
                        benefits_to_account_time_b=handleDate(benefits_to_account_time);

                        $(_pageId+" #month_1").html(Number(commit_account_time_b.month));
                        $(_pageId+" #day_1").html(Number(commit_account_time_b.day));

                        $(_pageId+" #month_2").html(Number(confirm_account_time_b.month));
                        $(_pageId+" #day_2").html(Number(confirm_account_time_b.day));
                        if(date_today.localeCompare(commit_account_time)>= 0){
                            $(_pageId+" #t1111").attr("src","/me/project/images/"+"tt1"+".png");
                            $(_pageId+" #item-span-1").css("color","#2a8ee3");
                        }

                        $(_pageId+" #month_3").html(Number(transfer_fund_time_b.month));
                        $(_pageId+" #day_3").html(Number(transfer_fund_time_b.day));
                        if(date_today.localeCompare(commit_account_time)>= 0){
                            $(_pageId+" #t2222").attr("src","/me/project/images/"+"tt1"+".png");
                            $(_pageId+" #item-span-2x").css("color","#2a8ee3");
                        }

                        $(_pageId+" #month_4").html(Number(apply_fund_time_b.month));
                        $(_pageId+" #day_4").html(Number(apply_fund_time_b.day));
                        if(date_today.localeCompare(commit_account_time)>= 0){
                            $(_pageId+" #t3333").attr("src","/me/project/images/"+"tt1"+".png");
                            $(_pageId+" #item-span-2y").css("color","#2a8ee3");
                        }

                        $(_pageId+" #month_5").html(Number(benefits_time_b.month));
                        $(_pageId+" #day_5").html(Number(benefits_time_b.day));
                        if(date_today.localeCompare(commit_account_time)>= 0){
                            $(_pageId+" #t4444").attr("src","/me/project/images/"+"tt1"+".png");
                            $(_pageId+" #item-span-3").css("color","#2a8ee3");
                        }

                        $(_pageId+" #month_6").html(Number(benefits_to_account_time_b.month));
                        $(_pageId+" #day_6").html(Number(benefits_to_account_time_b.day));
                        if(date_today.localeCompare(commit_account_time)>= 0){
                            $(_pageId+" #t5555").attr("src","/me/project/images/"+"tt1"+".png");
                            $(_pageId+" #item-span-4").css("color","#2a8ee3");
                        }
                    }
                document.getElementById("left").style.display='block';
                document.getElementById("right").style.display='block' ;

//                }
            }else{
                layerUtils.iMsg(-1,error_info);
                return false;
            }

        },true,true,function(){
            layerUtils.iMsg(-1,"获取交易时间信息失败");
        });
        }
        /**
     * 事件绑定
     * */
    function bindPageEvent(){
        //点击完成按钮， 跳转。
        $(_pageId+" .down_1").click(function(){

            var jsonParam = {};
            appUtils.pageInit("yjb/yjb_i_jtt_unbind_success", "mine/iHasBind", jsonParam);
        });
    }
    /**
     * 销毁
     * */
    function destroy(){

    }

    var yjb_i_jtt_unbind_success = {
        "init" : init,
        "bindPageEvent" : bindPageEvent,
        "destroy" : destroy
    };

    module.exports = yjb_i_jtt_unbind_success;
});
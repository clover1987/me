/**
 * Created with JetBrains RubyMine.
 * User: apple
 * Date: 14-7-22
 * Time: 下午1:25
 * To change this template use File | Settings | File Templates.
 */
define("project/scripts/yjb/yjb_i_menu",function(require,exports,module){

    var _pageId = "#yjb_yjb_i_menu";
    require("colorbox");
    var menu=require("project/scripts/common/yjb/Menu");
    var popup=require("project/scripts/common/yjb/Popup");
    var ring=require("project/scripts/common/yjb/Ring");
    var validate=require("project/scripts/common/yjb/Validate");
    var	service = require("serviceImp").getInstance();
    var layerUtils=require("layerUtils");
    var user=require("project/scripts/common/user");
    var appUtils=require("appUtils");
    var user=require("project/scripts/common/user");


    /**
     * 初始化
     * */

    var mobile ="";
    var tel = "";
    var address = "";
    //$("#yjb_yjb_i_menu").height($(window).height());
    function init(){

        $(function(){

            //问候语
            queryPersonInfo();
            //鼠标聚焦input
            $("#mobile").focus(function(){
                if(($("#tel").attr("readonly")==="readonly")&&($("#address").attr("readonly")==="readonly")){
                    $("#mobile").removeAttr("readonly");
                    $("#mobile_b").show();
                    $("#mobile_e").hide();
                    $(".menu-item-getCaptcha").hide();
                    $(".modifyMobile").addClass("menu_item_blue");
                    $(".modifyMobile .menu-item-left").addClass("menu_item_left_blue");
                }else{
                    layerUtils.iMsg(-1,"请完成正在编辑的信息！");
                }
            });
            $("#tel").focus(function(){
                if(($("#mobile").attr("readonly")==="readonly")&&($("#address").attr("readonly")==="readonly")){
                    $("#tel").removeAttr("readonly");
                    $("#tel_b").show();
                    $("#tel_e").hide();
                    //menu-item-getCaptcha
                    $(".modifyTel").addClass("menu_item_blue");
                    $(".modifyTel .menu-item-left").addClass("menu_item_left_blue");
                }else{
                    layerUtils.iMsg(-1,"请完成正在编辑的信息！");
                }
            });
            $("#address").focus(function(){
                if(($("#mobile").attr("readonly")==="readonly")&&($("#tel").attr("readonly")==="readonly")){
                    $("#address").removeAttr("readonly");
                    $("#address_b").show();
                    $("#address_e").hide();
                    //menu-item-getCaptcha
                    $(".modifyAddress").addClass("menu_item_blue");
                    $(".modifyAddress .menu-item-left").addClass("menu_item_left_blue");
                }else{
                    layerUtils.iMsg(-1,"请完成正在编辑的信息！");
                }
            });
            //鼠标移出input
            $("#mobile").blur(function(){
                $("#mobile_b").hide();
                $("#mobile_e").show();
                $(".modifyMobile").removeClass("menu_item_blue");
                $(".modifyMobile .menu-item-left").removeClass("menu_item_left_blue");
                var inputVal = $.trim($("#mobile").val());
                var result = "";
                result = validate.checkMobile(inputVal);
                if(result.code<1){
                    layerUtils.iMsg(-1,"您的移动电话格式错误");
                    $("#mobile").removeAttr("readonly");
                    $("#mobile_b").show();
                    $("#mobile_e").hide();
                    //menu-item-getCaptcha
                    $(".modifyMobile").addClass("menu_item_blue");
                    $(".modifyMobile .menu-item-left").addClass("menu_item_left_blue");
                }else{
                    if (inputVal != mobile)
                    {
                        $(".menu-item-getCaptcha").show();
                        updatePersonInfo();
                        $("#mobile").attr("readonly","readonly");
                    }else{
                        $("#mobile").attr("readonly","readonly");
                    }
                }
            });
            $("#tel").blur(function(){
                $("#tel_b").hide();
                $("#tel_e").show();
                //menu-item-getCaptcha
                $(".modifyTel").removeClass("menu_item_blue");
                $(".modifyTel .menu-item-left").removeClass("menu_item_left_blue");
                var inputVal = $.trim($("#tel").val());
                var result = "";
                result = validate.checkTel(inputVal);
                if(result.code<1){
                    layerUtils.iMsg(-1,"您的电话号码格式错误");
                    $("#tel").removeAttr("readonly");
                    $("#tel_b").show();
                    $("#tel_e").hide();
                    //menu-item-getCaptcha
                    $(".modifyTel").addClass("menu_item_blue");
                    $(".modifyTel .menu-item-left").addClass("menu_item_left_blue");
                }else{
                    if (inputVal != tel)
                    {
                        updatePersonInfo();
                        $("#tel").attr("readonly","readonly");
                    }else{
                        $("#tel").attr("readonly","readonly");
                    }
                }
            });
            $("#address").blur(function(){
                $("#address_b").hide();
                $("#address_e").show();
                //menu-item-getCaptcha
                $(".modifyAddress").removeClass("menu_item_blue");
                $(".modifyAddress .menu-item-left").removeClass("menu_item_left_blue");
                var inputVal = $.trim($("#address").val());
                var result = "";
                result = validate.checkAddress(inputVal);
                if(result.code<1){
                    layerUtils.iMsg(-1,"您的地址格式错误");
                    $("#address").removeAttr("readonly");
                    $("#address_b").show();
                    $("#address_e").hide();
                    //menu-item-getCaptcha
                    $(".modifyAddress").addClass("menu_item_blue");
                    $(".modifyAddress .menu-item-left").addClass("menu_item_left_blue");
                }else{
                    if (inputVal != address)
                    {
                        updatePersonInfo();
                        $("#address").attr("readonly","readonly");
                    }else{
                        $("#address").attr("readonly","readonly");
                    }
                }
            });
            $("#menu .menu-item-edit").click(function(e){
                $(this).parent().find("input").focus();
            });
        });
    }
    function greetHtml(){
        var hour = new Date().getHours(),
            minute = new Date().getMinutes(),
            greet = "";//问候
        if(hour >= 5 && hour <= 9){
            greet = "早上好！记得吃早餐，一天才有精神哦！";
        }
        else if(hour >= 9 && hour < 10){
            greet = "一日之计在于晨，读下宝宝的微资讯吧！";
        }
        else if(hour >= 10 && hour <= 11||(hour == 11 &&  minute <= 30)){
            greet = "盘中跌宕起伏，宝宝陪您一起股海掘金！";
        }
        else if((hour > 11 && hour < 13)||(hour == 11 && minute > 30)){
            greet = "休息一下，尽情享受午后慵懒的小憩吧！";
        }
        else if(hour >= 13 && hour < 15){
            greet = "为了生活中的美好，宝宝陪您一起努力!";
        }
        else if(hour >= 15 && hour < 17){
            greet = "收盘啦，宝宝为您闲置资金理财不停歇！";
        }
        else if(hour >= 17 && hour < 20){
            greet = "晚餐时间，和家人朋友一起尽情欢乐吧！";
        }
        else if(hour >= 20 && hour < 23){
            greet = "夜幕降临，与宝宝一起共度精彩夜生活！";
        }
        else if(hour >= 23){
            greet = "夜深了，宝宝伴您一同入眠，好梦哦！";
        }
        else if(hour >= 0 && hour < 1){
            greet = "夜深了，宝宝伴您一同入眠，祝好梦哦！";
        }
        else if(hour >= 1 && hour < 5){
            greet = "凌晨了，宝宝伴您一同入眠，祝好梦哦！";
        }
        return greet;
    }
    //获取用户信息
    function queryPersonInfo(){
        var param = {
            "fund_account":user.fund_account
        };
        //查询个人信息 （方案1 直接查询接口）
        service.userInfoQuery(param,function(data){
            var error_no = data.error_no,
                error_info = data.error_info;
            if(error_no == "0"){
                var results = JSON.parse(data["results"][0]["result"]);//数据结果
                //客户姓名
                if(results["client_name"] != undefined&& results["client_name"].length > 0){
                    //填充姓名和问候内容
                    $(_pageId + " #username").html("<strong>"+results["client_name"]+"</strong>");
                    $(_pageId + " .menu-title-text").html(greetHtml());
                }
                //手机号码
                if(results["mobile"] != undefined&& results["mobile"].length > 0){
                    //$("#pingfen").val(title);
                    $(_pageId+" #mobile").val(results["mobile"]);//填充手机号码
                }
                //联系电话
                if(results["tel"] != undefined&& results["tel"].length > 0){
                    $(_pageId+" #tel").val(results["tel"]);//填充手机号码
                }
                //联系地址
                if(results["address"] != undefined&& results["address"].length > 0){
                    $(_pageId+" #address").val(results["address"]);
                }

                mobile = $.trim($(_pageId+" #mobile").val());
                tel = $.trim($(_pageId+" #tel").val());
                address = $.trim($(_pageId+" #address").val());

            }else{
                layerUtils.iMsg(-1,error_info);
                return false;
            }
        },true,true,function(){
            layerUtils.iMsg(-1,"获取个人信息失败");
        });
    }
    //fund_account	String	资金账户	Y	　
    //mobile	String	手机号码	N	　
    //tel	String	联系电话	N	　
    //address	String	联系地址	N	　
    //password	String	用户密码	Y
    function updatePersonInfo(){
        tel=$("#tel").val();
        mobile=$("#mobile").val();
        address=$("#address").val();
        var param = {
            "fund_account":user.fund_account,
            "password":user.password,
            "tel":tel,
            "mobile":mobile,
            "address":address
        };
        service.userInfoUpdate(param,function(data){
            var error_no = data.error_no,
                error_info = data.error_info;
            if(error_no == "0"){
               //layerUtils.iMsg(-1,"用户信息更新成功！");
            }else{
                layerUtils.iMsg(-1,error_info);
                var jsonParam = {};
                appUtils.pageInit("yjb/yjb_i_menu","mine/iHasBind",jsonParam);
                return false;
            }
        },true,true,function(){
            layerUtils.iMsg(-1,"获取个人信息失败");
        });

    }
    /**
     * 事件绑定
     * */
    function bindPageEvent(){
        $("#remindset").click(function(){
            var jsonParam={};
            appUtils.pageInit("yjb/yjb_i_menu", "yjb/yjb_i_remind_set", jsonParam);
        });
        $("#changePass_j").click(function(){
            $(_pageId+" #nextBtn").attr("data","2");
            $(_pageId+" .text").html("修改交易密码");
            $(_pageId + " #expiredPwdWindow").show();
        });

        $(_pageId+" #changePass_z").click(function(){
            $(_pageId+" #nextBtn").attr("data","1");
            $(_pageId+" .text").html("修改资金密码");
            $(_pageId + " #expiredPwdWindow").show();
        });
        $(".window").click(function(e){
            //判断鼠标位置
            var div = document.getElementById("expiredPwdWindow-in");
            var x=event.clientX;
            var y=event.clientY;
            var divx1 = div.offsetLeft;
            var divy1 = div.offsetTop;
            var divx2 = div.offsetLeft + div.offsetWidth;
            var divy2 = div.offsetTop + div.offsetHeight;
            if( x < divx1 || x > divx2 || y < divy1 || y > divy2) {
                //如果离开，则执行。。
                $(_pageId + " #expiredPwdWindow").hide();
                $(_pageId + " #errorTips").html("");
                $(_pageId+" #password").val("");
                $(_pageId+" #newPassword").val("");
                $(_pageId+" #reNewPassword").val("");
            }
         });
        $("#nextBtn").click(function(){
            if($(_pageId + " #errorTips").html()!=""){
                $(_pageId + " #expiredPwdWindow").hide();
                $(_pageId + " #errorTips").html("");
                $(_pageId+" #password").val("");
                $(_pageId+" #newPassword").val("");
                $(_pageId+" #reNewPassword").val("");
                return false;
            }
            var passwordType=$(_pageId+" #nextBtn").attr("data");
            var password;
            var newPassword;
            var reNewPassword;
            password=$(_pageId+" #password").val();
            newPassword=$(_pageId+" #newPassword").val();
            reNewPassword=$(_pageId+" #reNewPassword").val();
            //验证初始密码正确
            //验证两次输入密码一致
            /**
             * //修改资金密码、修改交易密码(112)
             * @param MobileCode        String 手机号（手机取）
             * @param Token             String 时间戳（手机取）
             * @param Reqno             Number 请求标示
             * @param PASSWORDTYPE      Number 密码类型 ('1'：资金密码  '2'：交易密码)
             * @param PassWord          String 老密码
             * @param NewPassword       String 新密码
             **/
            var jsonParam={
                "MobileCode":user.MobileCode,
                "Token":user.Token,
                "Reqno":user.Reqno,
                "PASSWORDTYPE":passwordType,
                "PassWord":password,
                "NewPassword":reNewPassword
            };
            service.modifyPassword(jsonParam,function(data){
                var error_no = data.ERRORNO,
                    error_info = data.ERRORMESSAGE;
                if(error_no == "0"){
                    $(_pageId + " #expiredPwdWindow").hidden();
                    layerUtils.iMsg(-1,"密码修改成功！");
                }else{
                    if(error_info==""){
                        $(_pageId + " #errorTips").html("出现未知错误");
                    }else{
                        $(_pageId + " #errorTips").html(error_info);
                    }
                    return false;
                }
            },true,true,function(){
                $(_pageId + " #errorTips").html("密码修改失败");
            });
        });
    }
    /**
     * 销毁
     * */
    function destroy(){
    }
    var yjb_i_menu={

        "init":init,
        "bindPageEvent":bindPageEvent,
        "destroy":destroy


    }
    module.exports= yjb_i_menu;

});
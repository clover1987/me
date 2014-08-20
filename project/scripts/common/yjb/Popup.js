/**
 * Created by jyc on 14-7-21.
 *  colorbox弹出框
 * (需要配合jquery和colorbox使用)
 */
define(function(require,exports,module){
    require("project/scripts/common/yjb/jquery.colorbox-min");
    require("project/scripts/common/yjb/raphael");
    function createPopupTp(triggerClass, closeCallback){
        if (closeCallback == "" || closeCallback == "undefined") {
            closeCallback = function(){};
        }

        //交易密码弹出框html
        var htmlStr =
            '<div class="window-in">' +
                '<div class="win_title">' +
                '<div class="pic">' +
                '<img src="images/icon12.png" width="32" height="32">' +
                '</div>' +
                '<div class="text">您的密码已过期</div>' +
                '</div>' +
                '<div id="textbtn">' +
                '<input type="password" class="pwd_input" placeholder="重新输入交易密码" id="password" maxlength="6">' +
                '</div>' +
                '<div id="failtext" style="display: none;">' +
                '<p class="open-account-p" style="color: black;">为确保您的账户安全，请休息10分钟后重试</p>' +
                '</div>' +
                '<p class="pwd_p" id="errorTips" style="margin: 0 10%;color: red;"></p>' +
                '<a href="javascript:void(0);" class="pwd_btn mt10" id="nextBtn">确定</a>' +
                '</div>';

        //colorbox配置参数
        var config = {
            width: 300,
            height: 320,
            opacity:0.5,
            //iframe: false,
            scrolling: false,
            overlayClose: false, //点击空白不关闭
            //href:"popup_tradePassword.html",
            html: htmlStr,
            onClosed: closeCallback
        }

        $("."+triggerClass).colorbox(config);
    }
    function popupTp(triggerClass){
        $("." + triggerClass).click();
        Popup.validTp();
    }
    function validTp(){
        //密码长度验证
        //点击确定
        $("#nextBtn").click(function(){
            //密码长度验证
            var pwd = $("#password").val();
            if (pwd.length < 6) {
                $("#errorTips").html("密码长度有错误");
            } else {
                $("#errorTips").html("");

                //回调中显示密码有误
                $("#textbtn").hide();
                $("#failtext").show();
                $(".pwd_btn").css({background:"#D5D5D5"});

                //通过，调用
                //$.colorbox.close();
            }
        });
    }
    function createPopupTip(triggerClass, tipStr, closeCallback){

        if (closeCallback == "" || closeCallback == "undefined") {
            closeCallback = function(){};
        }

        //弹出框html

        var htmlStr =
            "<div class='popupTip'>" +
                "<div class='popupTip-left'></div>" +
                "<div class='popupTip-right'>" + tipStr + "</div>" +
                "</div>";

        //colorbox配置参数
        var config = {
            transition: "fade",
            width: "96%",
            top:"20%",
            left: "0%",
            height: 40,
            opacity:0.5,
            //iframe: false,
            scrolling: false,
            open: true, //自动弹出
            overlayClose: true, //点击空白关闭
            //href:"popup_tradePassword.html",
            html: htmlStr,
            onClosed: closeCallback,
            onComplete: function(){
                //显示调整
                $("#cboxLoadedContent").css("height", 40);
            }
        }
        $("." + triggerClass).colorbox(config);
    }
    function generatePopupTip(triggerClass, tipStr, closeCallback){
        if (closeCallback == "" || closeCallback == "undefined") {
            closeCallback = function(){};
        }

        //弹出框html

        var htmlStr =
            "<div class='popupTip'>" +
                "<div class='popupTip-left'></div>" +
                "<div class='popupTip-right'>" + tipStr + "</div>" +
                "</div>";

        //colorbox配置参数
        var config = {
            transition: "fade",
            width: "96%",
            top:"40%",
            /*left: "-85%",*/
            height: 40,
            opacity:0.5,
            //iframe: false,
            scrolling: false,
            open: true, //自动弹出
            overlayClose: true, //点击空白关闭
            //href:"popup_tradePassword.html",
            html: htmlStr,
            onClosed: closeCallback,
            onComplete: function(){
                //显示调整
                $("#cboxLoadedContent").css("height", 40);
            }
        }
        $("." + triggerClass).colorbox(config);
    }

    var Popup={
        "createPopupTp":createPopupTp,
        "popupTp":popupTp,
        "validTp":validTp,
        "createPopupTip":createPopupTip,
        "generatePopupTip":generatePopupTip
    };

    module.exports=Popup;
});



/**
 * Created by jhl on 14-6-25.
 * colorbox弹出框
 * (需要配合jquery和colorbox使用)
 */
//this.YJB = this.YJB || {};
//(function(){
//    var Popup = function(){};
//    var p = Popup.prototype;
//
//
//    /**
//     * 创建交易密码弹出框
//     * @param triggerClass string 触发元素class
//     */
//    Popup.createPopupTp = function(triggerClass, closeCallback){
//
//        if (closeCallback == "" || closeCallback == "undefined") {
//            closeCallback = function(){};
//        }
//
//        //交易密码弹出框html
//        var htmlStr =
//            '<div class="window-in">' +
//                '<div class="win_title">' +
//                    '<div class="pic">' +
//                        '<img src="images/icon12.png" width="32" height="32">' +
//                    '</div>' +
//                '<div class="text">您的密码已过期</div>' +
//                '</div>' +
//                    '<div id="textbtn">' +
//                        '<input type="password" class="pwd_input" placeholder="重新输入交易密码" id="password" maxlength="6">' +
//                    '</div>' +
//                '<div id="failtext" style="display: none;">' +
//                    '<p class="open-account-p" style="color: black;">为确保您的账户安全，请休息10分钟后重试</p>' +
//                '</div>' +
//                '<p class="pwd_p" id="errorTips" style="margin: 0 10%;color: red;"></p>' +
//                '<a href="javascript:void(0);" class="pwd_btn mt10" id="nextBtn">确定</a>' +
//            '</div>';
//
//        //colorbox配置参数
//        var config = {
//            width: 300,
//            height: 320,
//            opacity:0.5,
//            //iframe: false,
//            scrolling: false,
//            overlayClose: false, //点击空白不关闭
//            //href:"popup_tradePassword.html",
//            html: htmlStr,
//            onClosed: closeCallback
//        }
//
//        $("." + triggerClass).colorbox(config);
//    };
//
//    //弹出交易密码框
//    Popup.popupTp = function(triggerClass){
//        $("." + triggerClass).click();
//        Popup.validTp();
//    };
//
//    //验证交易密码框
//    Popup.validTp = function(){
//        //密码长度验证
//        //点击确定
//        $("#nextBtn").click(function(){
//            //密码长度验证
//            var pwd = $("#password").val();
//            if (pwd.length < 6) {
//                $("#errorTips").html("密码长度有错误");
//            } else {
//                $("#errorTips").html("");
//
//                //回调中显示密码有误
//                $("#textbtn").hide();
//                $("#failtext").show();
//                $(".pwd_btn").css({background:"#D5D5D5"});
//
//                //通过，调用
//                //$.colorbox.close();
//            }
//        });
//    }
//
//
//
//    //菜单上的错误提示
//    Popup.createPopupTip = function(triggerClass, tipStr, closeCallback){
//        if (closeCallback == "" || closeCallback == "undefined") {
//            closeCallback = function(){};
//        }
//
//        //弹出框html
//
//        var htmlStr =
//            "<div class='popupTip'>" +
//                "<div class='popupTip-left'></div>" +
//                "<div class='popupTip-right'>" + tipStr + "</div>" +
//            "</div>";
//
//        //colorbox配置参数
//        var config = {
//            transition: "fade",
//            width: "96%",
//            top:"40%",
//            left: "-85%",
//            height: 40,
//            opacity:0.5,
//            //iframe: false,
//            scrolling: false,
//            open: true, //自动弹出
//            overlayClose: true, //点击空白关闭
//            //href:"popup_tradePassword.html",
//            html: htmlStr,
//            onClosed: closeCallback,
//            onComplete: function(){
//                //显示调整
//                $("#cboxLoadedContent").css("height", 40);
//            }
//        }
//        $("." + triggerClass).colorbox(config);
//    };
//
//    //菜单上的错误提示
//    Popup.generatePopupTip = function(triggerClass, tipStr, closeCallback){
//        if (closeCallback == "" || closeCallback == "undefined") {
//            closeCallback = function(){};
//        }
//
//        //弹出框html
//
//        var htmlStr =
//            "<div class='popupTip'>" +
//                "<div class='popupTip-left'></div>" +
//                "<div class='popupTip-right'>" + tipStr + "</div>" +
//                "</div>";
//
//        //colorbox配置参数
//        var config = {
//            transition: "fade",
//            width: "96%",
//            top:"40%",
//            /*left: "-85%",*/
//            height: 40,
//            opacity:0.5,
//            //iframe: false,
//            scrolling: false,
//            open: true, //自动弹出
//            overlayClose: true, //点击空白关闭
//            //href:"popup_tradePassword.html",
//            html: htmlStr,
//            onClosed: closeCallback,
//            onComplete: function(){
//                //显示调整
//                $("#cboxLoadedContent").css("height", 40);
//            }
//        }
//        $("." + triggerClass).colorbox(config);
//    };
//
//    YJB.Popup = Popup;
//})();
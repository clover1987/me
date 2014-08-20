define("project/scripts/yjb/yjb_i_remind_set",function(require,exports,module){

//    <script type="text/javascript" src="../../scripts_yjb/jquery1.11.1.min.js"></script>
//    <script type="text/javascript" src="../../scripts_yjb/common/General.js"></script>
//    <script type="text/javascript" src="../../scripts_yjb/common/Select.js"></script>

    require("jquery");
    var general=require("project/scripts/common/yjb/General");
    var select=require("project/scripts/common/yjb/Select");
    select.bindClick();
    var _pageId="#yjb_yjb_i_remind_set";
    var utils=require("project/scripts/common/utils");


    /**
     * 初始化
     * */


//    $(".click_back").click(function(){
//        appUtils.pageInit("yjb/yjb_i_remind_set", "mine/iHasBind", {});
//    });

    function init(){
        $("#header_message").html("提醒设置");
//        utils.clickBack(_pageId);
            general.initialize();
           // select.bindClick();

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

    }

    var yjb_i_remind_set = {
        "init" : init,
        "bindPageEvent" : bindPageEvent,
        "destroy" : destroy
    };

    module.exports = yjb_i_remind_set;
});
/**
 * Created by user on 2014/7/26.
 */
define("project/scripts/yjb/yjb_i_jtt_unbind_fail",function(require,exports,module){

    var _pageId="#yjb_yjb_i_jtt_unbind_fail";
    var utils=require("project/scripts/common/utils");

    /**
     * 初始化
     * */


//    $(".click_back").click(function(){
//        appUtils.pageInit("yjb/yjb_i_jtt_unbind_fail", "mine/iHasBind", {});
//    });

    function init(){
        $("#header_message").html("绑定金腾通失败");
//        utils.clickBack(_pageId);
    }

    /**
     * 事件绑定
     * */
    function bindPageEvent(){

    }

    /**
     * 销毁
     * */
    function destroy(){

    }

    var yjb_i_jtt_unbind_fail = {
        "init" : init,
        "bindPageEvent" : bindPageEvent,
        "destroy" : destroy
    };

    module.exports = yjb_i_jtt_unbind_fail;
});
define("project/scripts/mine/iUnBind",function(require, exports, module){

    //var Format = require("project/scripts/common/yjb/Format");
    var _pageId = "#mine_iUnBind";
    var service = require("serviceImp").getInstance(); //业务层接口，请求数据
    var layerUtils = require("layerUtils");
    var appUtils = require("appUtils");
    var user=require("project/scripts/common/user");
    var utils=require("project/scripts/common/utils");




    /**
     * 初始化
     * */
    function init(){
//        _pageId = "#mine_iUnBind";
        appUtils.isLoginInInit();
    }

    /**
     * 事件绑定
     * */
    function bindPageEvent(){



        //点击现金理财
        $(_pageId+" #cashManagement").click(function(){
            appUtils.isLoginIn();
//            appUtils.pageInit("mine/iUnBind", "mine/iHasBind", {});
        });
        $(_pageId+" #myAcount").click(function(){
            appUtils.isLoginIn();
        });
        $(_pageId+" #myRemind").click(function(){
            appUtils.isLoginIn();
        });

        $(_pageId+" .btn-bind").click(function(){
            appUtils.isLoginIn();
        });
    }
    /**
     * 销毁
     * */
    function destroy(){

    }

    var iUnBind = {
        "init" : init,
        "bindPageEvent" : bindPageEvent,
        "destroy" : destroy
    };

    module.exports = iUnBind;
 });
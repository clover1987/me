/**
 * Created by jyc on 14-7-21.
 * 通用
 */
define(function(require,exports,module){

    function initialize(){
        var ht=$("body").height();
        $("body").height((ht+49));
    }

    var General={
        "initialize":initialize
    };

    module.exports=General;
});

//this.YJB = this.YJB || {};
//(function(){
//    var General = function(){};
//    var p = General.prototype;
//
//    //页面加载时下菜单遮挡部分内容的解决(在横屏时页面高度小，经常遮挡导致最下一排看不到)
//    General.initialize = function(){
//        var ht = $("body").height();
//        $("body").height((ht + 49));
//    };
//
//    YJB.General = General;
//})();
/**
 * Created by jyc on 14-7-21.
 * 选择框
 */
define(function(require,exports,module){

    function bindClick(){
        $(".li-switch").click(function(){
            if($(this).hasClass("on")) {
                $(this).removeClass("on");
                $(this).addClass("off");
            } else {
                $(this).removeClass("off");
                $(this).addClass("on");
            }
        });
    };

    function bindProtocolClick(){
        $(".checkWrapper-check").click(function(){
            if($(this).hasClass("chked")) {
                $(this).removeClass("chked");
            } else {
                $(this).addClass("chked");
            }
        });
    };
    var Select={

        "bindClick":bindClick,
        "bindProtocolClick":bindProtocolClick
    };

    module.exports=Select;

});
/**
 * Created by jhl on 14-6-25.
 * 选择框
 */
//this.YJB = this.YJB || {};
//(function(){
//    var Select = function(){};
//    var p = Select.prototype;
//
//    Select.bindClick = function(){
//        $(".li-switch").click(function(){
//            if($(this).hasClass("on")) {
//                $(this).removeClass("on");
//                $(this).addClass("off");
//            } else {
//                $(this).removeClass("off");
//                $(this).addClass("on");
//            }
//        });
//    };
//
//    Select.bindProtocolClick = function(){
//        $(".checkWrapper-check").click(function(){
//            if($(this).hasClass("chked")) {
//                $(this).removeClass("chked");
//            } else {
//                $(this).addClass("chked");
//            }
//        });
//    };
//
//
//    YJB.Select = Select;
//})();
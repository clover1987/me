define("project/scripts/yjb/yjb_i_jtt_commonProblem",function(require,exports,module){


    var _pageId="#yjb_yjb_i_jtt_commonProblem";
    var utils=require("project/scripts/common/utils");
    var general=require("project/scripts/common/yjb/General");
    require("jquery");

    /**
     * 初始化
     * */



    function init(){

        $("#header_message").html("帮助");

        $(function(){
            general.initialize();

            //显示隐藏的几条信息
            $("#more_problem").click(function(){
                $(this).hide();
                $("#problem_list li:hidden").show();
            });

            //展开具体信息
            $("#problem_list li a").click(function(){
                if($(this).parent().hasClass("on")) {
                    $(this).parent().removeClass("on");
                } else {
                    $(this).parent().addClass("on");
                }
            });


        });
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

    var yjb_yjb_i_jtt_commonProblem = {
        "init" : init,
        "bindPageEvent" : bindPageEvent,
        "destroy" : destroy
    };

    module.exports = yjb_yjb_i_jtt_commonProblem;

});
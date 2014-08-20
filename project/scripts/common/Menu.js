/**
 * Created by jhl on 14-6-26.
 * 菜单
 */
this.YJB = this.YJB || {};
(function(){
    var Menu = function(){};
    var p = Menu.prototype;

    //创建菜单
    Menu.createMenu = function(){
        //左上菜单和菜单弹出收起效果
        var webHeight = document.documentElement.clientHeight;
        var webWidth = document.documentElement.clientWidth;
        //console.log("webHeight=" + webHeight);
        $(".header .menu").height(webHeight );

        $(".header-menu").click(function(){
            //console.log("left=" + $(".moveBody").css("left"));
            if(typeof($(".moveBody").css("left")) == "undefined" || $(".moveBody").css("left") == "auto" || $(".moveBody").css("left")== 0 || $(".moveBody").css("left") == "0px") {
                $(".moveBody").animate({
                    left: "86%"
                    //position: "fixed"
                });
                $(".footer").animate({
                    left: "86%"
                });
                $(".moveBody").css("position", "fixed");
                //document.ontouchmove = function(e){ e.preventDefault(); }; //文档禁止 touchmove事件
                //var moveBody = document.getElementById("moveBody");
                //moveBody.ontouchmove = function(e){ e.preventDefault(); }; //文档禁止 touchmove事件
            } else {
                $(".moveBody").animate({
                    left: 0
                    //position: "relative"
                });
                $(".footer").animate({
                    left: 0
                });
                $(".moveBody").css("position", "relative");
                document.ontouchmove = function(e){  }; //文档恢复拖动
            }

        });
    }

	
	//创建菜单
    Menu.createMenu2 = function(){
        //左上菜单和菜单弹出收起效果
        var webHeight = document.documentElement.clientHeight;
        var webWidth = document.documentElement.clientWidth;
        //console.log("webHeight=" + webHeight);
        $(".header .menu").height(webHeight );

        $(".header-menu").click(function(){
            //console.log("left=" + $(".moveBody").css("left"));
            if(typeof($(".moveBody").css("left")) == "undefined" || $(".moveBody").css("left") == "auto" || $(".moveBody").css("left")== 0 || $(".moveBody").css("left") == "0px") {
                $(".moveBody").animate({
                    left: "86%"
                    //position: "fixed"
                });
                $(".footer").animate({
                    left: "86%"
                });
                $(".moveBody").css("position", "fixed");
                //document.ontouchmove = function(e){ e.preventDefault(); }; //文档禁止 touchmove事件
                //var moveBody = document.getElementById("moveBody");
                //moveBody.ontouchmove = function(e){ e.preventDefault(); }; //文档禁止 touchmove事件
            } else {
                $(".moveBody").animate({
                    left: 0
                    //position: "relative"
                });
                $(".footer").animate({
                    left: 0
                });
                $(".moveBody").css("position", "relative");
                document.ontouchmove = function(e){  }; //文档恢复拖动
            }

        });
    }
	
	
    YJB.Menu = Menu;
})();



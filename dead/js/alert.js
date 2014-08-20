/*
 * @params width: 弹出窗口的宽度
 * @params height: 弹出窗口的高度
 * @params id: 新建弹出窗的DOM ID名
 * @params type：弹出窗类型,分为alert、confirm和prompt三种,默认为alert 
 * @params content: 显示内容
 * @params okCallback: 确定按钮回调函数
 * @params cancelCallback: 取消回调函数
 * @params isAgainCreate: 是否允许同时存在两个弹出窗,true为允许,false为不允许，默认为false
 */
var Popup = function (options) {
	this.setting = {
		id: "alert",
		type: "alert", // 弹出框类型
		width : '80%',  //弹出框的默认的宽
		height : 'auto', //弹出框的默认的高
		title : '<h2 class="alert_top">提示标题</h2>',
		content : '提示内容',
		bottom : '<input type="button" class="alert_okBtn" value="确定">',
		isAgainCreate: false,
		alertCallback : function(){}, //弹出框弹出后的回调函数
		okCallback : function(){}, //确定回调函数
		cancelCallback : function(){} //取消回调函数
	};
	this.init(options);
};
Popup.prototype = {
	init: function (options) {
		this.copyObj(this.setting,options);
		switch(this.setting.type) {
			case "confirm":
				this.setting.bottom = '<input class="alert_okBtn" type="button" value="确定"><input type="button" class="alert_cancelBtn" value="取消">';
				break;
			case "prompt":
				this.setting.bottom = '<input class="alert_okBtn" type="button" value="确定"><input type="button" class="alert_cancelBtn" value="取消">';
				this.setting.content = this.setting.content + '</br><input type="text" class="alert_input">';
		}
		this.createPopup();
	},
	
	copyObj: function ( obj1 ,obj2 ) {
        for( var attr in obj2 ){
            if( obj2.hasOwnProperty( attr )){
                obj1[ attr ] = obj2[ attr ];
            }
        }
        return obj1;
    },
	
	createPopup: function () {
		var _this = this;
		var _h = $( 'html' ); //html对象
        var _w = $( window ); //windown
        var _b = $( 'body' ); //body对象
        var _head = $( 'head' ); //head
		var _clientH=_w.height(); //可视区高度
		var _clientW=_w.width();  //可视区宽度
		var _dH=Math.max(parseInt($('body').css('height')),_clientH); //取可视区和文档之间的最高度
		
		//创建弹窗并显示在页面
        if(!$('#' + this.setting.id)[0] || this.setting.isAgainCreate){ //如果页面上没有弹出框就创建弹出框和遮罩层
            //创建并添加到文档页面
            $('body').append($('<div class="alert" id="' + this.setting.id + '" style="width:'+this.setting.width+'">'+this.setting.title+'<div class="alert_close" id="alert_close"></div><div class="alert_content" style=height:'+this.setting.height+'><p class="alert_tips">'+this.setting.content+'</p></div><div class="alert_ok">'+this.setting.bottom+'</div></div>'));
            //遮罩层高度
			if (!this.setting.isAgainCreate) {
				$('body').append($('<div id="alertMark"></div>'));
				$('#alertMark').css({'height':_dH,'width':_clientW});
			}
			this.setting.alertCallback && this.setting.alertCallback();
        }else{
            //如果有就显示并替换内容
			//定位弹出层
			var _t=(_clientH - parseInt($('#' + this.setting.id).css('height')))/2;  //弹出框的top值
			$('#' + this.setting.id).css({
				'top':_t
			});
            $('#' + this.setting.id +' .alert_content').html('<p class="alert_tips">' + this.setting.content + '</p>');
			$('#' + this.setting.id +' .alert_ok').html(this.setting.bottom);
            $('#' + this.setting.id +',#alertMark').css('display','block');
			this.setting.alertCallback && this.setting.alertCallback();
        }
      
        var _t=(_clientH-parseInt($('#' + this.setting.id).css('height')))/2;  //弹出框的top值
        var _l=(_clientW-parseInt($('#' + this.setting.id).css('width')))/2;   //弹出框的left值
        
		//定位弹出层
        $('#' + this.setting.id).css({
            'top':0,//_t + document.body.scrollTop,
            'left':_l + document.body.scrollLeft,
			'height':document.documentElement.clientHeight - 20,
			'overflow-y':'scroll'
        });
		 //点击确定之后的操作
        $('#' + this.setting.id + ' .alert_okBtn').click(function(ev){
           // 隐藏弹出层  以便后面调用
		   $(document).unbind("touchmove", defaultFn);
			$('#' + _this.setting.id +',#alertMark').css({'display':'none'});
			_this.setting.okCallback($('#' + _this.setting.id + ' .alert_input').val());
        	ev.preventDefault();
			ev.stopPropagation();
		});
		
		$(document).bind("touchmove", defaultFn);
		
		function defaultFn(e) {
			e.preventDefault();
		}
        //点击取消
        $('#' + this.setting.id + ' .alert_cancelBtn').click(function(ev){
              //隐藏弹出层  以便后面调用
			$(document).unbind("touchmove", defaultFn);
            _this.setting.cancelCallback();
			$('#' + _this.setting.id +',#alertMark').css({'display':'none'});
			ev.preventDefault();
			ev.stopPropagation();
        });
		
		//点击关闭
        $('#' + this.setting.id + ' .alert_close').click(function(ev){
              //隐藏弹出层  以便后面调用
			$(document).unbind("touchmove", defaultFn);
			$('#' + _this.setting.id +',#alertMark').css({'display':'none'});
			ev.preventDefault();
			ev.stopPropagation();
        });
	}
};
var popup = function (options) {
	return new Popup(options);
}

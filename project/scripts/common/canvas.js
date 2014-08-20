define(function(require,exports,module){
	var staticPic = function(){
		/**
		 * 静态图
		 */
		 var cxt;  
		 var c=document.getElementById("myCanvas");
//		 var width = document.body.clientWidth;
//		 var height = $(window).get(0).innerHeight;
		  c.width = 800;
		  c.height = 800;
		  c.style.position = 'fixed';//可以解决位置错乱的兼容性问题
	      cxt=c.getContext("2d");
	      for(var i = 85*2;i>=50*2;i=i-10*2){
	    	//最外层圆环  
	          cxt.fillStyle="#E5E5E5";
	          cxt.lineWidth=10;
	          cxt.beginPath();
	          cxt.arc(80*2,80*2,i-10,0,Math.PI*2,true);
	          cxt.closePath();
	          cxt.fill();
	          
	    	  //白色间隔
	          cxt.fillStyle="white";
	          cxt.beginPath();
	          cxt.lineWidth=1;
	          cxt.arc(80*2,80*2,i-9.8*2-10,0,Math.PI*2,true);
	          cxt.closePath();
	          cxt.fill();
	      }
		
	  var moveX =140*2,//直线起点横坐标
      	  moveY = 125*2,//直线起点纵坐标
      	  lineX = 168*2,//直线终点横坐标
      	  lineY = 105*2,//直线终点纵坐标
          colors = new Array("#CF393A","#E56250","#F7A05D","#F3CC4B");//颜色十六进制
      for(var i =1;i<4;i++){
    	  moveX -= 7*2;
    	  moveY -= 6*2;
    	  lineY -= 23*2;
    	  //画斜线
    	  cxt.beginPath();
	      cxt.lineWidth=1;
	      cxt.strokeStyle = colors[i];
	      cxt.moveTo(moveX,moveY);
	      cxt.lineTo(lineX,lineY);
	      cxt.stroke();
	      //画圆点
	      cxt.fillStyle= colors[i];
          cxt.beginPath();
          cxt.lineWidth=1;
          cxt.arc(lineX,lineY,4*2,0,Math.PI*2,true);
          cxt.closePath();
          cxt.fill();
      }
          var cxt;  
		  var c=document.getElementById("myCanvas5");
		  cxt=c.getContext("2d");
		 //画竖线
		  cxt.beginPath();
	      cxt.lineWidth=1;
	      cxt.strokeStyle = "#CF393A";
	      cxt.moveTo(85*2,10*2);
	      cxt.lineTo(85*2,60*2);
	      cxt.stroke();
	      //画竖线圆点
	      cxt.beginPath();
	      cxt.lineWidth=1;
	      cxt.fillStyle = "#CF393A";
	      cxt.arc(85*2,60*2,4*2,0,Math.PI*2,true);
	      cxt.closePath();
	      cxt.fill();
	};
	var movePic =function(){ (function( $ ) {  
	      /**
	       * 动画。。。
	       */
	        $.fn.circliful = function(options) {
	        	 /**
	  	       * 动态画图安卓兼容性解决
	  	       */
	  	      window.requestAnimFrame = (function(){
	  	    	  return window.requestAnimationFrame      ||
	  	    	  		  window.webkitRequestAnimationFrame ||
	  	    	          window.mozRequestAnimationFrame    ||
	  	    	    	  window.oRequestAnimationFrame || 
		  	    		  window.msRequestAnimationFrame ||
	  	    	          function( callback , element){
	  	    	            window.setTimeout(callback, 1000 / this.fps);
	  	    	          };
	  	    	})();
	            var settings = $.extend({
	                // These are the defaults.
	                foregroundColor: "#556b2f",
	                backgroundColor: "#eee",
	                fillColor: false,
	                width: 15,
	                dimension: 200,
	               size: 15, 
	    			percent: 50,
	                animationStep: 1.0,
	                x:100,
	                y:100,
	                radius : 50
	            }, options );
	             return this.each(function() {
	                    var dimension = '';
	                    var text = '';
	    				var info = '';
	                    var width = '';
	                    var size = 0;
	    				var percent = 0;
	    				var endPercent = 100;
	    				var fgcolor = '';
	    				var bgcolor = '';
	    				var icon = '';
	                    var animationstep = 0.0;
	                    var x ="";//x坐标
	                    var y ="";//y坐标
	                    var radius = "";//圆大小
	                    $(this).addClass('circliful');
	                    
	                    if($(this).data('x') != undefined) {
	                        x = $(this).data('x');
	                    } else {
	                        x = settings.x;
	                    }
	                    if($(this).data('y') != undefined) {
	                        y = $(this).data('y');
	                    } else {
	                        y = settings.y;
	                    }
	                    if($(this).data('radius') != undefined) {
	                    	radius = $(this).data('radius');
	                    } else {
	                    	radius = settings.radius;
	                    }
	                    
	                    
	                    if($(this).data('dimension') != undefined) {
	                        dimension = $(this).data('dimension');
	                    } else {
	                        dimension = settings.dimension;
	                    }
	        
	                    if($(this).data('width') != undefined) {
	                        width = $(this).data('width');
	                    } else {
	                        width = settings.width;
	                    }
	        
	                    if($(this).data('fontsize') != undefined) {
	                        size = $(this).data('fontsize');
	                    } else {
	                        size = settings.size;
	                    }
	    				
	    				if($(this).data('percent') != undefined) {
	                        percent = $(this).data('percent') / 100;
	    					endPercent = $(this).data('percent');
	                    } else {
	                        percent = settings.percent / 100;
	                    }
	    				
	    				if($(this).data('fgcolor') != undefined) {
	                        fgcolor = $(this).data('fgcolor');
	                    } else {
	                        fgcolor = settings.foregroundColor;
	                    }
	    				
	    				if($(this).data('bgcolor') != undefined) {
	                        bgcolor = $(this).data('bgcolor');
	                    } else {
	                        bgcolor = settings.backgroundColor;
	                    }
	    				
	                    if($(this).data('animation-step') != undefined) {
	                        animationstep = parseFloat($(this).data('animation-step'));
	                    } else {
	                        animationstep = settings.animationStep;
	                    }
	                    if($(this).data('text') != undefined) {
	                        text = $(this).data('text');
	    					
	    					if($(this).data('icon') != undefined) {
	    						icon = '<i class="fa ' + $(this).data('icon') + '"></i>';
	    					}
	    					
	    					 if($(this).data('type') != undefined) {
	    						type = $(this).data('type');
	    					
	    						if(type == 'half') {
	    							$(this).append('<span class="circle-text-half">' +  icon  + text + '</span>');
	    							$(this).find('.circle-text-half').css({'line-height': (dimension / 1.45) + 'px', 'font-size' : size + 'px' });
	    						} else {
	    							$(this).append('<span class="circle-text">' + icon + text + '</span>');
	    							$(this).find('.circle-text').css({'line-height': dimension + 'px', 'font-size' : size + 'px' });
	    						}
	    					} else {
	    						$(this).append('<span class="circle-text">' + icon + text + '</span>');
	    						$(this).find('.circle-text').css({'line-height': dimension + 'px', 'font-size' : size + 'px' });
	    					}
	                    } else if($(this).data('icon') != undefined) {
	    				
	    				}
	    				
	    				if($(this).data('info') != undefined) {
	                        info = $(this).data('info');
	    					
	    					if($(this).data('type') != undefined) {
	    						type = $(this).data('type');
	    					
	    						if(type == 'half') { 
	    							$(this).append('<span class="circle-info-half">' + info + '</span>');
	    							$(this).find('.circle-info-half').css({'line-height': (dimension * 0.9) + 'px', });
	    						} else {
	    							$(this).append('<span class="circle-info">' + info + '</span>');
	    							$(this).find('.circle-info').css({'line-height': (dimension * 1.25) + 'px', });
	    						}
	    					} else {
	    						$(this).append('<span class="circle-info">' + info + '</span>');
	    						$(this).find('.circle-info').css({'line-height': (dimension * 1.25) + 'px', });
	    					}
	                    }
	        
	                    $(this).width(dimension + 'px');
	    				
	                  var canvas = $('<canvas></canvas>').attr({ width: dimension, height: dimension }).appendTo($(this)).get(0);
	                  canvas.style.position = 'fixed';//可以解决位置错乱的兼容性问题
	                  canvas.style.width = '400px';
	                  canvas.style.height = '400px';
	                  var context = canvas.getContext('2d');
	    			  var degrees = percent * 360.0;
	    			  var radians = degrees * (Math.PI / 180);
	                  var startAngle = 2.3 * Math.PI;
	                  var endAngle = 0;
	                  var counterClockwise = false;
	                  var curPerc = animationstep === 0.0 ? endPercent : 0.0;
	                  var curStep = Math.max(animationstep, 0.0);
	    			  var circ = Math.PI * 2;
	    			  var quart = Math.PI / 2;
	    			  var type = '';
	    			  var fill = false;
	    			  
	    			  if($(this).data('type') != undefined) {
	                        type = $(this).data('type');
	    					
	    					if(type == 'half') {
	    						var startAngle = 2.0 * Math.PI;
	    						var endAngle = 3.13;
	    						var circ = Math.PI * 1.0;
	    						var quart = Math.PI / 0.996;
	    					}
	                    }
	    				
	    				if($(this).data('fill') != undefined) {
	    					fill = $(this).data('fill');
	    				} else {
	    					fill = settings.fillColor;
	    				}
	    			  //animate foreground circle
	    			  function animate(current) {
	    				context.clearRect(0, 0, canvas.width, canvas.height);
	    				 
	    				context.beginPath();
	    				context.arc(x, y, radius, endAngle, startAngle, false);
	    			
	    				// line color
	    				context.strokeStyle = bgcolor;
	    	            context.lineWidth = (width - 1)*1.5;			
	    	            context.stroke();

	    				if(fill) {
	    					context.fillStyle = fill;
	    					context.fill();
	    				}
	    				 
	    				context.beginPath();
	    				context.arc(x, y, radius, -(quart)+2.2, ((circ) * current) - quart+2.2, false);
	    				context.lineWidth = width;
	    				// line color
	    				context.strokeStyle = fgcolor;
	    				context.stroke();

	    				if (curPerc < endPercent) {
	      				     curPerc += curStep;
	      				   requestAnimFrame(function () {
	    						 animate(Math.min(curPerc, endPercent) / 100);
	    					 });
	    				}
	    			 }

	    			 animate(curPerc / 100);

	            });
	     
	        }
	    }( jQuery ));};
	var canvas = {
			"staticPic":staticPic,
			"movePic":movePic
	};
	module.exports = canvas;
});
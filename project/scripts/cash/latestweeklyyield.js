define("project/scripts/cash/latestweeklyyield",function(require,exports,module){
	var appUtils = require("appUtils"),
		layerUtils = require("layerUtils"),
		service = require("serviceImp").getInstance(),  //业务层接口，请求数据
	   _pageId = "#cash_latestweeklyyield";

	var user = require("project/scripts/include/user");

    var user_=require("project/scripts/common/user");

	
	var validatorUtil = require("validatorUtil");
	var commonservice = require("project/scripts/common/commonservice");
    var utils=require("project/scripts/common/utils");

    /*
    //added by jhl 2017-07-17
    $(".mod-scale").css({
        position: "fixed",
        top: "45px",
        width: "100%",
        "z-index": 10000
    });
    */

    /*
    $(".page").css({
       height: (appHeight-94) + "px",
        overflow: "scroll"
    });
    */

	var ichart = require("plugins/charts/scripts/ichart.1.2.min");
	var appWidth = require("gconfig").appWidth;
	var appHeight = require("gconfig").appHeight;
	/**
	 * 初始化
	 * */

//    $(".click_back").click(function(){
//        appUtils.pageInit("cash/latestweeklyyield", "cash/cashhasopened", {});
//    });
    function init(){
        $("#header_message").html("7日年化收益率");
//        utils.clickBack(_pageId);
		// 查询当日万份收益
		// 测试数据
		// fund_account = "33005822"; // 11111111
		// fund_code = "000540"; // 222222
		trade_date_from = ""; // 2014-05-06
		trade_date_to = ""; // 2014-05-20
		numPerPage = 7;
		curPage = 1;
		var jsonParam = {"fund_code":user_.fund_code,"trade_date_from":trade_date_from,"trade_date_to":trade_date_to,"page_size":numPerPage,"page_no":curPage};
		var fundPerformanceInfoComplate = function(resultVo){
			if(resultVo.error_no == 0)
			{
				var resultDataJson = resultVo["results"][0];
				resultProcess = JSON.parse(resultDataJson["result"]);
				
				if(resultDataJson != null)
				{
					// curPage = results[0].page;			//当前页
					// totalPage = results[0].totalPage;	//总页数
					
					var busiInfoDataInner = resultProcess["busiInfo"];
					var pageInfoDataInner = resultProcess["pageInfo"];
		
					totalPage = pageInfoDataInner["totalPage"];
					
					// 头部收益率展示
					var latestweekly_yield = busiInfoDataInner[0]["latestweekly_yield"];
					var latestweekly_yield_p = (latestweekly_yield*100).toFixed(2) + '%';
					$(_pageId + " #latestweeklyyield_p").html(latestweekly_yield_p);
					
					var labels = new Array(busiInfoDataInner.length);
					var data_value = new Array(busiInfoDataInner.length);
					for(var i = 0; i < busiInfoDataInner.length; i++)
					{
						var resultData = busiInfoDataInner[i];
						var trade_date = resultData["trade_date"]; //交易日期
						trade_date = new Date(trade_date).format("yyyy-MM-dd");
						var latestweekly_yield = resultData["latestweekly_yield"]; // 最近7日折算年收益率
						
						if(trade_date.length == 10)
						{
							trade_date = trade_date.substring(5,10);
						}
						labels[i] = trade_date;
						data_value[i] = (latestweekly_yield*100).toFixed(2);
					}
					labels.reverse();
					data_value.reverse();
					createChart(labels,data_value);

                    /*
                    //added by jhl
                    $(".mode_server-tableContainer").css({
                        top: "155px"
                    });
                    console.log("appHeight=" + require("gconfig").appHeight);
                    var chartHeight = appHeight > 200 ?  appWidth*382/640 : 200;
                    console.log();
                    $("#latestweeklyyield_div").css({
                        //110的标题栏高 + header的45
                        "margin-top": 155 + "px"
                    });
                    */
                    console.log("ht=" + $(_pageId + " #latestweeklyyield_div").height());

                    //?1 地下显示不全，被遮住
                    /*
                    $("#latestweeklyyield_div .sever-list-item p").css({
                        "padding-bottom": "20px"
                    });
                    */

                }
			}
			else
			{
				layerUtils.iMsg(-1,resultVo.error_info);
				return false;
			}
		};
		service.fundPerformanceInfo(jsonParam,fundPerformanceInfoComplate);
	}
	
	function createChart(labels,data_value)
	{
		// labels = ["05-15","05-15","05-15","05-15","05-15","05-15","05-15"];
		// data_value = ['5.21' ,'5.22' ,'5.25' ,'5.32' ,'5.62' ,'5.72' ,'5.22'];
		 var start_value = parseInt(Math.min.apply(null, data_value));
		 if(start_value > 2){
			 start_value = start_value - 1;  
		 }else{
			 start_value = 0;
		 }
		//创建数据
		var data = [
        	{
        		name : labels,
        		value: data_value,
        		color:'#2C8EE3', // #01acb6
        		line_width:1
        	}
       ];

		//创建x轴标签文本   
	   
		var chart = new iChart.Area2D({
				render : 'canvasDiv',
				align : 'center',
				data: data,
				title:{
					text:'',
					color:'#eff4f8',
					background_color:'#1c4156',
					height:40,
					border:{
						enable:true,
						width:[0,0,4,0],//只显示下边框
						color:'#173a4e'
					}
				},
				subtitle:{
					text:'单位:%',//利用副标题设置单位信息
					fontsize:12,
					color:'#eff4f8',
					textAlign:'left',
					padding:'0 40',
					height:20
				},
				footnote:{
				/*
					text:'数据来源:企业ERP数据中心',
					color:'#708794',
					padding:'0 20',
					background_color:'#102c3c',
					height:30,
					border:{
						enable:true,
						width:[3,0,0,0],//只显示上边框
						color:'#0f2b3a'
					}
				*/
				},

				padding:'5 1',//设置padding,以便title能占满x轴
				sub_option:{
					label:false,
					hollow_inside: false,//设置一个点的亮色在外环的效果
					point_size:10,
					hollow_color:'#FFFFFF', // 白色 #FFFFFF    红色 #FE4D25
					gradient:true,
					gradient_mode:'LinearGradientUpDown',
					area_color:'',// 
					background_color:'#FFFFFF',
					point_size: 8
				},

				tip:{
					enable:true,
					listeners:{
						 //tip:提示框对象、name:数据名称、value:数据值、text:当前文本、i:数据点的索引
						parseText:function(tip,name,value,text,i){
							return "<span style='color:red;'>"+value+"%</span>";
						}
					}
				},
				width : appWidth > 300 ? appWidth : 300,
				height : appHeight > 200 ?  appWidth*382/640 : 200,
				background_color:'',
				gradient:true,
				/*
				shadow:true,
				shadow_blur:1,
				shadow_color:'#1D0CB6',// 蓝色 #000CC #FF33FF粉色
				shadow_offsetx:0,
				shadow_offsety:0,
				*/
				gradient_mode:'LinearGradientUpDown', //上-下
				border:{
					enable : false,
					color : '#999999',
					radius:5
				},
				z_index : 300,
				color_factor : 0.4,
				coordinate:{
					color_factor : 0.4,
					z_index : 200,
					width : appWidth > 310 ? appWidth - 65 : 310,
					height : appHeight > 170 ?  appWidth*382/640 - 50 : 170,
					grid_color:'#ccc',// #999999 灰色
					grids:{
						vertical:{
							way:'share_alike',
							value:1
						},
						horizontal:{
							way:'share_alike',
							value:5
						}
					},
					gridVStyle:{
						width:0
					},
					border:{
						enable : false,
						color : '#BCBCBC',
						radius:5
					},
					background_color: null,//设置坐标系为透明背景 #FEFEFE #CCFFFF 设置该值自动striped隔行换色
					scale:[{
						 position:'left',	
						 label:{
							 color:'#474747',
							 fontsize:10,
							 fontweight:600
						 },
						 start_scale:start_value,
						 scale_enable : false//是否显示刻度
						 /*
						 start_scale:0,
						 end_scale:8.00,
						 scale_space:0
						 */
					},{
						 position:'bottom',
						 label:{
							 color:'#666666',
							 fontsize:10,
							 fontweight:600
						 },
						 scale_enable : false,//是否显示刻度
						 labels:labels
					}],
					gradient: true,
					gradient_mode: 'LinearGradientUpDown',
					axis:{
						enable: true,
						width: [0,0,0,0],
						color: '#999999'
					}
				}
			});
		chart.drawChart();
	}
	
	/**
	 * 事件绑定
	 * */
	function bindPageEvent(){
		// 往上拉 展示更多，默认显示10条，按照时间倒序排列
		appUtils.bindEvent($(_pageId + " #latestweeklyyield_div h2"),function(){
			if($(this).parent().hasClass("on"))
			{
				$(_pageId + " #latestweeklyyield_div").find("li").removeClass("on");
			}
			else
			{
				$(_pageId + " #latestweeklyyield_div").find("li").removeClass("on");
				$(this).parent().addClass("on");
                //midify by jhl
                //$(_pageId + " #latestweeklyyield_div").attr("style","margin-bottom:30px;");

			}
		});
		
		
	}
	/**
	 * 销毁
	 * */
	function destroy(){
		service.destroy();
		$(_pageId + " #latestweeklyyield_input").val("");
		$(_pageId + " #latestweeklyyield_input").attr("placeholder","");
	}
	
	var latestweeklyyield = {
		"init" : init,
		"bindPageEvent" : bindPageEvent,
		"destroy" : destroy
		
	};
	
	module.exports = latestweeklyyield;
});
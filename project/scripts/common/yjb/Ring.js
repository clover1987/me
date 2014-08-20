/**
 * Created by jyc on 14-7-21.
 * 圆环图表
 * (配合raphael, jquery使用)
 */

define(function(require,exports,module){

        function createRing(json){

            var asset_amount = json.results[0].result[0].asset_amount;
            var stock_marketvalue = json.results[0].result[0].stock_marketvalue;
            var asset_available_balance = json.results[0].result[0].asset_available_balance;
            var asset_balance = json.results[0].result[0].asset_balance;

            var archtype = Raphael("raphael_canvas", 170, 162);
            //去除背景图片
            $("#raphael_canvas").css({"background-image": "none"});
            $("#raphael_canvas .map-value-top").empty();
            $("#raphael_canvas .map-value-top").append(
                '<div class="item">可取余额<span class="item-value">2500<span class="moneyUnit">元</span></span></div>' +
                    '<div class="item">可用余额<span class="item-value">300.25<span class="moneyUnit">万元</span></span></div>' +
                    '<div class="item">总市值<span class="item-value">2189<span class="moneyUnit">万元</span></span></div>'
            );


            //var svg = document.getElementsByTagName("svg")[0];
            //svg.setAttribute("viewBox", "0 0 340 324");
            //绘制图表中的标示
            archtype.drawReferenceLine = function(lineStartX, lineStartY, lineSpanX, lineSpanY, color){
                this.path("M " + lineStartX + " " + lineStartY +  " l " + lineSpanX + " " + lineSpanY).attr({
                    stroke: color,
                    "stroke-width": 0.5
                });
                this.circle(lineStartX + lineSpanX, lineStartY + lineSpanY, 4).attr({fill: color, "stroke-width": 0});
            };

            archtype.customAttributes.arc = function (xloc, yloc, value, total, R) {
                var alpha = 360 / total * value,
                    a = (90 - alpha) * Math.PI / 180,
                    x = xloc + R * Math.cos(a),
                    y = yloc - R * Math.sin(a),
                    path;
                if (total == value) {
                    path = [
                        ["M", xloc, yloc - R],
                        ["A", R, R, 0, 1, 1, xloc - 0.01, yloc - R]
                    ];
                } else {
                    path = [
                        ["M", xloc, yloc - R],
                        ["A", R, R, 0, +(alpha > 180), 1, x, y]
                    ];
                }
                return {
                    path: path
                };
            };

            //绘制圆环图表
            archtype.drawArc = function(centreX, centreY, radius, value, total, color, speed){
                value = 3 / 4 * value;
                if ((value/total) < 0.05) {
                    value = total * 0.05;
                }
                var arc = this.path().attr({
                    "stroke": color,
                    "stroke-width": 10.9,
                    //"stroke-width": 10,
                    arc: [centreX, centreY, 0, total, radius]
                });

                arc.rotate(135, centreX, centreY).animate({ arc: [centreX, centreY, value, total, radius]}, speed);

                return arc;
            };

            archtype.circle(81, 81, 75).attr({"stroke": "#e5e5e5", "stroke-width": 10});
            archtype.circle(81, 81, 64.5).attr({"stroke": "#e5e5e5", "stroke-width": 10});
            archtype.circle(81, 81, 54).attr({"stroke": "#e5e5e5", "stroke-width": 10});
            archtype.circle(81, 81, 43.5).attr({"stroke": "#e5e5e5", "stroke-width": 10});

            archtype.drawArc(81, 81, 75, asset_amount, asset_amount, "#cf393a", 700);
            archtype.drawArc(81, 81, 64.5, stock_marketvalue, asset_amount, "#e56350", 700);
            archtype.drawArc(81, 81, 54, asset_available_balance, asset_amount, "#f8a05e", 700);
            archtype.drawArc(81, 81, 43.5, asset_balance, asset_amount, "#f3cc4b", 700);

            archtype.drawReferenceLine(81, 10, 0, 50, "#cf393a");
            archtype.drawReferenceLine(128, 128, 37, -46, "#e56350");
            archtype.drawReferenceLine(120, 120, 45, -60, "#f8a05e");
            archtype.drawReferenceLine(112, 112, 52, -77, "#f3cc4b");
        }

        var Ring={

              "createRing":createRing

        };

        module.exports=Ring;
    }

);

/**
 * Created by jhl on 14-6-26.
 * 圆环图表
 * (配合raphael, jquery使用)
 */
//this.YJB = this.YJB || {};
//(function(){
//    var Ring = function(){};
//    var p = Ring.prototype;
//
//    /*
//    //数据格式
//    var data = {
//        "error_no": "0",
//        "results": [{
//            "result": [{
//                "money_type": "0",  //0 rmb
//                "asset_amount": 166182.38, //总资产
//                "asset_balance": 109446.38, //总余额(可取余额)
//                "asset_available_balance": 109446.38, //可用余额
//                "asset_return": -153088.84, //盈亏
//                "stock_marketvalue": 56736, //持仓市值
//                "secu_marketvalue": 115936.08 //总市值
//            }]
//        }],
//        "dsName": ["results"],
//        "error_info": ""
//    }
//    */
//
//
//    //画出圆环，及圆环周边的指示线
//    Ring.createRing = function(json){
//
//        var asset_amount = json.results[0].result[0].asset_amount;
//        var stock_marketvalue = json.results[0].result[0].stock_marketvalue;
//        var asset_available_balance = json.results[0].result[0].asset_available_balance;
//        var asset_balance = json.results[0].result[0].asset_balance;
//
//        var archtype = Raphael("raphael_canvas", 170, 162);
//        //去除背景图片
//        $("#raphael_canvas").css({"background-image": "none"});
//        $("#raphael_canvas .map-value-top").empty();
//        $("#raphael_canvas .map-value-top").append(
//            '<div class="item">可取余额<span class="item-value">2500<span class="moneyUnit">元</span></span></div>' +
//                '<div class="item">可用余额<span class="item-value">300.25<span class="moneyUnit">万元</span></span></div>' +
//                '<div class="item">总市值<span class="item-value">2189<span class="moneyUnit">万元</span></span></div>'
//        );
//
//
//        //var svg = document.getElementsByTagName("svg")[0];
//        //svg.setAttribute("viewBox", "0 0 340 324");
//        //绘制图表中的标示
//        archtype.drawReferenceLine = function(lineStartX, lineStartY, lineSpanX, lineSpanY, color){
//            this.path("M " + lineStartX + " " + lineStartY +  " l " + lineSpanX + " " + lineSpanY).attr({
//                stroke: color,
//                "stroke-width": 0.5
//            });
//            this.circle(lineStartX + lineSpanX, lineStartY + lineSpanY, 4).attr({fill: color, "stroke-width": 0});
//        };
//
//        archtype.customAttributes.arc = function (xloc, yloc, value, total, R) {
//            var alpha = 360 / total * value,
//                a = (90 - alpha) * Math.PI / 180,
//                x = xloc + R * Math.cos(a),
//                y = yloc - R * Math.sin(a),
//                path;
//            if (total == value) {
//                path = [
//                    ["M", xloc, yloc - R],
//                    ["A", R, R, 0, 1, 1, xloc - 0.01, yloc - R]
//                ];
//            } else {
//                path = [
//                    ["M", xloc, yloc - R],
//                    ["A", R, R, 0, +(alpha > 180), 1, x, y]
//                ];
//            }
//            return {
//                path: path
//            };
//        };
//
//        //绘制圆环图表
//        archtype.drawArc = function(centreX, centreY, radius, value, total, color, speed){
//            value = 3 / 4 * value;
//            if ((value/total) < 0.05) {
//                value = total * 0.05;
//            }
//            var arc = this.path().attr({
//                "stroke": color,
//                "stroke-width": 10.9,
//                //"stroke-width": 10,
//                arc: [centreX, centreY, 0, total, radius]
//            });
//
//            arc.rotate(135, centreX, centreY).animate({ arc: [centreX, centreY, value, total, radius]}, speed);
//
//            return arc;
//        };
//
//        archtype.circle(81, 81, 75).attr({"stroke": "#e5e5e5", "stroke-width": 10});
//        archtype.circle(81, 81, 64.5).attr({"stroke": "#e5e5e5", "stroke-width": 10});
//        archtype.circle(81, 81, 54).attr({"stroke": "#e5e5e5", "stroke-width": 10});
//        archtype.circle(81, 81, 43.5).attr({"stroke": "#e5e5e5", "stroke-width": 10});
//
//        archtype.drawArc(81, 81, 75, asset_amount, asset_amount, "#cf393a", 700);
//        archtype.drawArc(81, 81, 64.5, stock_marketvalue, asset_amount, "#e56350", 700);
//        archtype.drawArc(81, 81, 54, asset_available_balance, asset_amount, "#f8a05e", 700);
//        archtype.drawArc(81, 81, 43.5, asset_balance, asset_amount, "#f3cc4b", 700);
//
//        archtype.drawReferenceLine(81, 10, 0, 50, "#cf393a");
//        archtype.drawReferenceLine(128, 128, 37, -46, "#e56350");
//        archtype.drawReferenceLine(120, 120, 45, -60, "#f8a05e");
//        archtype.drawReferenceLine(112, 112, 52, -77, "#f3cc4b");
//    };
//
//    YJB.Ring = Ring;
//})();
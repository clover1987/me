define(function(require, exports, module) {
    var a = function(a, b, c, d) {
            var e = Raphael("canvas", 170, 162);
            e.drawReferenceLine = function(a, b, c, d, e) {
                this.path("M " + a + " " + b + " l " + c + " " + d).attr({
                    stroke: e,
                    "stroke-width": .5
                }),
                    this.circle(a + c, b + d, 4).attr({
                        fill: e,
                        "stroke-width": 0
                    })
            },
                e.customAttributes.arc = function(a, b, c, d, e) {
                    var f, g = 360 / d * c,
                        h = (90 - g) * Math.PI / 180,
                        i = a + e * Math.cos(h),
                        j = b - e * Math.sin(h);
                    return f = d == c ? [["M", a, b - e], ["A", e, e, 0, 1, 1, a - .01, b - e]] : [["M", a, b - e], ["A", e, e, 0, +(g > 180), 1, i, j]],
                    {
                        path: f
                    }
                },
                e.drawArc = function(a, b, c, d, e, f, g) {
                    d / e > 1.3333 && (d = 1.3333 * e),
                        d = .75 * d,
                        .05 > d / e && (d = .05 * e);
                    var h = this.path().attr({
                        stroke: f,
                        "stroke-width": 10.9,
                        arc: [a, b, 0, e, c]
                    });
                    return h.rotate(135, a, b).animate({
                            arc: [a, b, d, e, c]
                        },
                        g),
                        h
                },
                e.circle(81, 81, 75).attr({
                    stroke: "#e5e5e5",
                    "stroke-width": 10
                }),
                e.circle(81, 81, 64.5).attr({
                    stroke: "#e5e5e5",
                    "stroke-width": 10
                }),
                e.circle(81, 81, 54).attr({
                    stroke: "#e5e5e5",
                    "stroke-width": 10
                }),
                e.circle(81, 81, 43.5).attr({
                    stroke: "#e5e5e5",
                    "stroke-width": 10
                }),
                e.drawArc(81, 81, 75, a, a, "#cf393a", 700),
                e.drawArc(81, 81, 64.5, b, a, "#e56350", 700),
                e.drawArc(81, 81, 54, d, a, "#f8a05e", 700),
                e.drawArc(81, 81, 43.5, c, a, "#f3cc4b", 700),
                e.drawReferenceLine(81, 10, 0, 50, "#cf393a"),
                e.drawReferenceLine(128, 128, 37, -26, "#e56350"),
                e.drawReferenceLine(120, 120, 45, -41, "#f8a05e"),
                e.drawReferenceLine(112, 112, 52, -55, "#f3cc4b")
        },
        b = {
            chartCircle: a
        };
    module.exports = b
});
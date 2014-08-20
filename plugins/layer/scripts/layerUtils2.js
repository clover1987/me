define(function(require, exports, module) {
    function a(a) {
        a && a.preventDefault ? a.preventDefault() : window.event.returnValue = !1
    }
    function b(b, c, d, e) {
        if ("default" != o) {
            var f = '<div class="pop_tip' + (0 == c ? " right": " error") + '" id="pop_tip_alert"><span class="icon"></span><p><span style="display:block;text-align:center;padding:0 16px;font-size:16px">' + b + '</span></p><div class="btn"><a href="javascript:void(0);" id="pop_tip_alert_btn">' + (e || "确  定") + "</a></div></div>",
                g = function() {
                    return l.layer({
                        type: 1,
                        title: !1,
                        closeBtn: !1,
                        shade: [iBrowser.ios ? 0 : .5, "#000", !0],
                        border: [5, .5, "", !0],
                        area: ["310px", "auto"],
                        offset: [.3 * n.appHeight + "px", ""],
                        page: {
                            html: f
                        },
                        success: function() {
                            window.ontouchmove = a;
                            var b = n.triggerEventName;
                            $x("pop_tip_alert", "pop_tip_alert_btn").off(b),
                                $x("pop_tip_alert", "pop_tip_alert_btn").on(b,
                                    function() {
                                        d && d(),
                                            m.close(p),
                                            p = -9999
                                    }),
                                l("#pop_tip_alert").css("margin-top", "-" + l("#pop_tip_alert").height() / 2 + "px")
                        },
                        end: function() {
                            window.ontouchmove = null
                        }
                    })
                }; - 9999 == p ? p = g() : (m.close(p), p = g())
        } else {
            var h = 0 == c ? 1 : 3;
            p = l.layer({
                area: ["310px", "auto"],
                offset: [.3 * n.appHeight + "px", ""],
                dialog: {
                    btn: [e || "确  定"],
                    msg: b,
                    type: h,
                    yes: function(a) {
                        m.close(a),
                            d && d()
                    }
                },
                title: "提示信息",
                border: [0, 0, "", !1],
                shade: [iBrowser.ios ? 0 : .5, "#000", !0],
                success: function() {
                    window.ontouchmove = a
                },
                end: function() {
                    window.ontouchmove = null
                }
            })
        }
    }
    function c(b, c, d, e, f) {
        if ("default" != o) {
            var g = '<div class="pop_tip notice" id="pop_tip_confirm"><span class="icon"></span><p><span style="display:block;text-align:center;padding:0 16px;font-size:16px">' + b + '</span></p><div class="btn"><a href="javascript:void(0);" id="pop_tip_confirm_yes">' + (e || "确 定") + '</a><a href="javascript:void(0);" id="pop_tip_confirm_no">' + (f || "取消") + "</a></div></div>",
                h = function() {
                    return l.layer({
                        type: 1,
                        title: !1,
                        closeBtn: !1,
                        shade: [iBrowser.ios ? 0 : .5, "#000", !0],
                        border: [5, .5, "", !0],
                        area: ["310px", "auto"],
                        offset: [.3 * n.appHeight + "px", ""],
                        page: {
                            html: g
                        },
                        success: function() {
                            window.ontouchmove = a;
                            var b = n.triggerEventName;
                            $x("pop_tip_confirm", "pop_tip_confirm_yes").off(b),
                                $x("pop_tip_confirm", "pop_tip_confirm_yes").on(b,
                                    function() {
                                        c && c(),
                                            m.close(q),
                                            q = -9999
                                    }),
                                $x("pop_tip_confirm", "pop_tip_confirm_no").off(b),
                                $x("pop_tip_confirm", "pop_tip_confirm_no").on(b,
                                    function() {
                                        d && d(),
                                            m.close(q),
                                            q = -9999
                                    }),
                                l("#pop_tip_confirm").css("margin-top", "-" + l("#pop_tip_confirm").height() / 2 + "px")
                        },
                        end: function() {
                            window.ontouchmove = null
                        }
                    })
                }; - 9999 == q ? q = h() : (m.close(q), q = h())
        } else q = l.layer({
            area: ["310px", "auto"],
            offset: [.3 * n.appHeight + "px", ""],
            dialog: {
                btns: 2,
                btn: [e || "确 定", f || "取消"],
                msg: b,
                type: 4,
                yes: function(a) {
                    m.close(a),
                        c && c()
                },
                no: function(a) {
                    m.close(a),
                        d && d()
                }
            },
            title: "提示信息",
            border: [0, 0, "", !1],
            shade: [iBrowser.ios ? 0 : .5, "#000", !0],
            success: function() {
                window.ontouchmove = a
            },
            end: function() {
                window.ontouchmove = null
            }
        })
    }
    function d(b, c, d) {
        if (null != v && (clearTimeout(v), v = null), d = d > 0 ? d: 2, "default" != o) {
            var e = '<div class="pop_tip' + (0 == b ? " right": " error") + '" id="pop_tip_msg"><span class="icon"></span><p><span style="display:block;text-align:center;padding:0 16px;font-size:16px">' + c + "</span></p></div>",
                f = function() {
                    var b = l.layer({
                        type: 1,
                        title: !1,
                        closeBtn: !1,
                        shadeClose: !0,
                        shade: [iBrowser.ios ? 0 : .5, "#000", !0],
                        border: [5, .5, "", !0],
                        area: ["310px", "auto"],
                        offset: [.3 * n.appHeight + "px", ""],
                        page: {
                            html: e
                        },
                        success: function() {
                            window.ontouchmove = a,
                                l("#pop_tip_msg").css("margin-top", "-" + l("#pop_tip_msg").height() / 2 + "px")
                        },
                        end: function() {
                            window.ontouchmove = null
                        }
                    });
                    return v = setTimeout(function() {
                            m.close(r),
                                r = -9999
                        },
                        1e3 * d),
                        b
                }; - 9999 == r ? r = f() : (m.close(r), r = f())
        } else {
            var g = 0 == b ? 1 : 3;
            r = l.layer({
                area: ["310px", "auto"],
                offset: [.4 * n.appHeight + "px", ""],
                closeBtn: [0, !1],
                shadeClose: !0,
                time: d,
                dialog: {
                    btns: 0,
                    msg: c,
                    type: g
                },
                title: !1,
                border: [0, 0, "", !1],
                shade: [iBrowser.ios ? 0 : .5, "#000", !0],
                success: function() {
                    window.ontouchmove = a
                },
                end: function() {
                    window.ontouchmove = null
                }
            })
        }
    }
    function e(a, b) {
        s = m.tips(a, l(b), 0, 200, 0, ["background-color:#CC0000; color:#fff", "#CC0000"]),
            l(b).ScrollTo(200)
    }
    function f() { - 9999 != s && (m.close(s), s = -9999)
    }
    function g() { - 9999 != u && (m.close(u), u = -9999)
    }
    function h() { - 9999 != p && (m.close(p), p = -9999),
        -9999 != q && (m.close(q), q = -9999),
        -9999 != s && (m.close(s), s = -9999),
        -9999 != u && (m.close(u), u = -9999)
    }
    function i(b, c, d) {
        if (b) {
            c = c || "请等待...";
            var e = "undefined" != typeof d ? d ? "block": "none": "block",
                f = '<div id="iLoading_overlay" class="iLoading_overlay" style="display: ' + e + ';"></div><div class="iLoading_showbox" style="display: block; opacity: 1;"><div class="iLoading_loading_pic"></div><p>' + c + "</p></div>";
            loadingLayer = function() {
                return l.layer({
                    type: 1,
                    title: !1,
                    closeBtn: !1,
                    shade: [.5, "#000", !1],
                    border: [0, 0, "#fff", !0],
                    area: ["auto", "auto"],
                    offset: ["0px", "0px"],
                    page: {
                        html: f
                    },
                    success: function() {
                        n.isClickShadeHide && l("#iLoading_overlay").click(function() {
                            l(this).hide()
                        })
                    }
                })
            },
                window.ontouchmove = a,
                -9999 == t ? t = loadingLayer() : (m.close(t), t = loadingLayer())
        } else window.ontouchmove = null,
            m.close(t),
            t = -9999
    }
    function j(a) {
        return u = l.layer({
            type: 1,
            title: !1,
            closeBtn: !1,
            border: [5, .5, "", !0],
            area: ["310px", "auto"],
            offset: [.3 * n.appHeight + "px", ""],
            page: {
                html: a
            }
        })
    }
    function k(a) {
        var b = 0;
        switch (a += "") {
            case "0":
                b = u;
                break;
            case "1":
                b = p;
                break;
            case "2":
                b = q;
                break;
            case "3":
                b = r;
                break;
            case "4":
                b = s;
                break;
            case "5":
                b = t;
                break;
            default:
                b = -9999
        }
        return b
    }
    var l = jQuery = require("jquery"),
        m = require("layer"),
        n = require("gconfig"),
        o = n.layerTheme,
        p = -9999,
        q = -9999,
        r = -9999,
        s = -9999,
        t = -9999,
        u = -9999,
        v = null,
        w = {
            iAlert: b,
            iConfirm: c,
            iMsg: d,
            iTips: e,
            iTipsClose: f,
            iCustomClose: g,
            iLayerClose: h,
            iLoading: i,
            layerCustom: j,
            getLayerIdx: k
        };
    module.exports = w
});
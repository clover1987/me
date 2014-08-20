define(function(require, exports, module) {; !
    function(a, b) {
        var e, f, h, i, c = !1,
        //是否采用自动获取绝对路径。!1(即false, 将采用下述变量中的配置),!0为true  用sea之后取相对路径会出问题，暂时不知何原因
            d = "",
        //当前js所在路径，上述变量为!0才有效
            g = {
                iE6: !-[1, ] && !a.XMLHttpRequest,
                times: 0
            };
        g.getPath = function() {
            var a = document.scripts || e("script"),
                b = a[a.length - 1].src;
            return b.substring(0, b.lastIndexOf("/") + 1)
        },
            g.load = function() {
                //根据配置加载不同的弹出层主题样式
                require("../css/layer.css");
                var layerTheme = require("gconfig").layerTheme;
                if (layerTheme != "default") {
                    require.async("../css/theme/" + layerTheme + ".css",
                        function() {});
                }
                //	c&&(d=this.getPath());var a=e("head")[0],b=document.createElement("link");b.setAttribute("type","text/css"),b.setAttribute("rel","stylesheet"),b.setAttribute("href",d+"skin/layer.css"),a.appendChild(b)
            },
            this.layer = {
                v: "1.6.0",
                ready: function(a) {
                    var b = "#layerCss";
                    return e(b).ready(function() {
                        a()
                    })
                },
                alert: function(a, b, c, d) {
                    return e.layer({
                        dialog: {
                            msg: a,
                            type: b,
                            yes: d
                        },
                        title: c,
                        area: ["auto", "auto"]
                    })
                },
                confirm: function(a, b, c, d) {
                    return e.layer({
                        dialog: {
                            msg: a,
                            type: 4,
                            btns: 2,
                            yes: b,
                            no: d
                        },
                        title: c
                    })
                },
                msg: function(a, c, d, f) {
                    return ("" == a || a == b) && (a = "&nbsp;"),
                        c === b && (c = 2),
                        e.layer({
                            dialog: {
                                msg: a,
                                type: d
                            },
                            time: c,
                            title: ["", !1],
                            closeBtn: ["", !1],
                            end: function() {
                                f && f()
                            }
                        })
                },
                tips: function(a, b, c, d, f, g) {
                    return e.layer({
                        type: 4,
                        shade: !1,
                        time: c,
                        maxWidth: d,
                        tips: {
                            msg: a,
                            guide: f,
                            follow: b,
                            style: g
                        }
                    })
                },
                load: function(a, b, c) {
                    var d = !0;
                    return 3 === b && (d = !1),
                        e.layer({
                            time: a,
                            shade: c,
                            loading: {
                                type: b
                            },
                            border: [10, .3, "#000", d],
                            type: 3,
                            title: ["", !1],
                            closeBtn: [0, !1]
                        })
                }
            },
            h = function(a) {
                g.times++,
                    this.index = g.times;
                var b = this.config;
                this.config = e.extend({},
                    b, a),
                    this.config.dialog = e.extend({},
                        b.dialog, a.dialog),
                    this.config.page = e.extend({},
                        b.page, a.page),
                    this.config.iframe = e.extend({},
                        b.iframe, a.iframe),
                    this.config.loading = e.extend({},
                        b.loading, a.loading),
                    this.config.tips = e.extend({},
                        b.tips, a.tips),
                    this.creat()
            },
            h.pt = h.prototype,
            h.pt.config = {
                type: 0,
                shade: [.3, "#000", !0],
                shadeClose: !1,
                fix: !0,
                move: [".xubox_title", !0],
                moveOut: !1,
                title: ["信息", !0],
                offset: ["200px", "50%"],
                area: ["310px", "auto"],
                closeBtn: [0, !0],
                time: 0,
                bgcolor: "#fff",
                border: [8, .3, "#000", !0],
                zIndex: 19891014,
                maxWidth: 400,
                dialog: {
                    btns: 1,
                    btn: ["确定", "取消"],
                    type: 3,
                    msg: "",
                    yes: function(a) {
                        layer.close(a)
                    },
                    no: function(a) {
                        layer.close(a)
                    }
                },
                page: {
                    dom: "#xulayer",
                    html: "",
                    url: ""
                },
                iframe: {
                    src: "http://sentsin.com"
                },
                loading: {
                    type: 0
                },
                tips: {
                    msg: "",
                    follow: "",
                    guide: 0,
                    isGuide: !0,
                    style: ["background-color:#FF9900; color:#fff;", "#FF9900"]
                },
                success: function() {},
                close: function(a) {
                    layer.close(a)
                },
                end: function() {}
            },
            h.pt.type = ["dialog", "page", "iframe", "loading", "tips"],
            h.pt.space = function(a) {
                var b, c, d, e, f, g, h, i, j, k, l, m, n, o;
                return a = a || "",
                    b = this.index,
                    c = this.config,
                    d = c.dialog,
                    e = this.dom,
                    f = -1 === d.type ? "": '<span class="xubox_msg xulayer_png32 xubox_msgico xubox_msgtype' + d.type + '"></span>',
                    g = ['<div class="xubox_dialog">' + f + '<span class="xubox_msg xubox_text" style="' + (f ? "": "padding-left:20px") + '">' + d.msg + "</span></div>", '<div class="xubox_page">' + a + "</div>", '<iframe allowtransparency="true" id="' + e.ifr + b + '" name="' + e.ifr + b + '" onload="$(this).removeClass(\'xubox_load\');" class="' + e.ifr + '" frameborder="0" src="' + c.iframe.src + '"></iframe>', '<span class="xubox_loading xubox_loading_' + c.loading.type + '"></span>', '<div class="xubox_tips" style="' + c.tips.style[0] + '"><div class="xubox_tipsMsg">' + c.tips.msg + '</div><i class="layerTipsG"></i></div>'],
                    h = "",
                    i = "",
                    j = c.zIndex + b,
                    k = "z-index:" + j + "; background-color:" + c.shade[1] + "; opacity:" + c.shade[0] + "; filter:alpha(opacity=" + 100 * c.shade[0] + ");",
                    c.shade[2] && (h = '<div times="' + b + '" id="xubox_shade' + b + '" class="xubox_shade" style="' + k + '"></div>'),
                    c.zIndex = j,
                    l = "",
                    m = "",
                    n = "z-index:" + (j - 1) + ";  background-color: " + c.border[2] + "; opacity:" + c.border[1] + "; filter:alpha(opacity=" + 100 * c.border[1] + "); top:-" + c.border[0] + "px; left:-" + c.border[0] + "px;",
                    c.border[3] && (i = '<div id="xubox_border' + b + '" class="xubox_border" style="' + n + '"></div>'),
                    c.closeBtn[1] && (m = '<a class="xubox_close xulayer_png32 xubox_close' + c.closeBtn[0] + '" href="javascript:;"></a>'),
                    c.title[1] && (l = '<h2 class="xubox_title"><em>' + c.title[0] + "</em></h2>"),
                    o = '<div times="' + b + '" showtime="' + c.time + '" style="z-index:' + j + '" id="' + e.lay + b + '" class="' + e.lay + '">' + '<div style="background-color:' + c.bgcolor + "; z-index:" + j + '" class="xubox_main">' + g[c.type] + l + m + '<span class="xubox_botton"></span>' + "</div>" + i + "</div>",
                    [h, o]
            },
            h.pt.dom = {
                lay: "xubox_layer",
                ifr: "xubox_iframe"
            },
            h.pt.creat = function() {
                var j, k, l, m, n, o, a = this,
                    b = "",
                    c = this.config,
                    d = c.dialog,
                    h = a.config.title,
                    i = a.dom;
                switch (h.constructor === Array || (a.config.title = [h, !0]), h === !1 && (a.config.title = [h, !1]), j = c.page, k = e("body"), l = function(c) {
                    var c = c || "";
                    b = a.space(c),
                        k.append(b[0])
                },
                    c.type) {
                    case 1:
                        if ("" !== j.html) l('<div class="xuboxPageHtml">' + j.html + "</div>"),
                            k.append(b[1]);
                        else if ("" !== j.url) l('<div class="xuboxPageHtml" id="xuboxPageHtml' + a.index + '">' + j.html + "</div>"),
                            k.append(b[1]),
                            e.get(j.url,
                                function(b) {
                                    e("#xuboxPageHtml" + a.index).html(b),
                                        j.ok && j.ok(b)
                                });
                        else {
                            if (0 != e(j.dom).parents(".xubox_page").length) return;
                            l(),
                                e(j.dom).show().wrap(b[1])
                        }
                        break;
                    case 2:
                        l(),
                            k.append(b[1]);
                        break;
                    case 3:
                        c.title = ["", !1],
                            c.area = ["auto", "auto"],
                            c.closeBtn = ["", !1],
                            e(".xubox_loading")[0] && layer.close(e(".xubox_loading").parents("." + i.lay).attr("times")),
                            l(),
                            k.append(b[1]);
                        break;
                    case 4:
                        c.title = ["", !1],
                            c.area = ["auto", "auto"],
                            c.fix = !1,
                            c.border = !1,
                            e(".xubox_tips")[0] && layer.close(e(".xubox_tips").parents("." + i.lay).attr("times")),
                            l(),
                            k.append(b[1]),
                            e("#" + i.lay + g.times).find(".xubox_close").css({
                                top: 5,
                                right: 5
                            });
                        break;
                    default:
                        c.title[1] || (c.area = ["auto", "auto"]),
                            e(".xubox_dialog")[0] && layer.close(e(".xubox_dialog").parents("." + i.lay).attr("times")),
                            l(),
                            k.append(b[1])
                }
                if (m = g.times, this.layerS = e("#xubox_shade" + m), this.layerB = e("#xubox_border" + m), this.layerE = e("#" + i.lay + m), n = this.layerE, this.layerMian = n.find(".xubox_main"), this.layerTitle = n.find(".xubox_title"), this.layerText = n.find(".xubox_text"), this.layerPage = n.find(".xubox_page"), this.layerBtn = n.find(".xubox_botton"), o = -1 != c.offset[1].indexOf("px") ? parseInt(c.offset[1]) : "50%" == c.offset[1] ? c.offset[1] : parseInt(c.offset[1]) / 100 * f.width(), n.css({
                    left: o + c.border[0],
                    width: c.area[0],
                    height: c.area[1]
                }), c.fix ? n.css({
                    top: parseInt(c.offset[0]) + c.border[0]
                }) : n.css({
                    top: parseInt(c.offset[0]) + f.scrollTop() + c.border[0],
                    position: "absolute"
                }), 0 == c.type && c.title[1]) switch (d.btns) {
                    case 0:
                        a.layerBtn.html("").hide();
                        break;
                    case 2:
                        a.layerBtn.html('<a href="javascript:;" class="xubox_yes xubox_botton2">' + d.btn[0] + "</a>" + '<a href="javascript:;" class="xubox_no xubox_botton3">' + d.btn[1] + "</a>");
                        break;
                    default:
                        a.layerBtn.html('<a href="javascript:;" class="xubox_yes xubox_botton1">' + d.btn[0] + "</a>")
                }
                "auto" === n.css("left") ? (n.hide(), setTimeout(function() {
                        n.show(),
                            a.set(m)
                    },
                    500)) : a.set(m),
                    c.time <= 0 || a.autoclose(),
                    this.callback()
            },
            h.pt.set = function(a) {
                var k, l, m, n, o, p, q, r, s, t, u, v, b = this,
                    c = this.layerE,
                    d = this.config,
                    i = (d.dialog, d.page),
                    j = b.dom;
                switch (b.autoArea(a), d.title[1] ? g.iE6 && b.layerTitle.css({
                    width: c.outerWidth()
                }) : 4 != d.type && c.find(".xubox_close").addClass("xubox_close1"), c.attr({
                    type: b.type[d.type]
                }), d.type) {
                    case 1:
                        c.find(i.dom).addClass("layer_pageContent"),
                            d.shade[2] && c.css({
                                zIndex: d.zIndex + 1
                            }),
                            d.title[1] && b.layerPage.css({
                                top: b.layerTitle.outerHeight()
                            });
                        break;
                    case 2:
                        k = c.find("." + j.ifr),
                            l = c.height(),
                            k.addClass("xubox_load").css({
                                width: c.width()
                            }),
                            d.title[1] ? k.css({
                                top: b.layerTitle.height(),
                                height: l - b.layerTitle.height()
                            }) : k.css({
                                top: 0,
                                height: l
                            }),
                            g.iE6 && k.attr("src", d.iframe.src);
                        break;
                    case 4:
                        m = e(d.tips.follow),
                            n = m.offset().top,
                            o = n - c.outerHeight(),
                            p = m.offset().left,
                            q = p,
                            r = d.tips.style[1],
                            s = c.outerHeight(),
                            t = c.outerWidth(),
                            u = c.find(".layerTipsG"),
                            t > d.maxWidth && c.width(d.maxWidth),
                            1 === d.tips.guide ? (v = f.width() - q - t - c.outerWidth() - 10, o = n, v > 0 ? (q = q + m.outerWidth() + 10, u.removeClass("layerTipsL").addClass("layerTipsR").css({
                                "border-right-color": r
                            })) : (q = q - c.outerWidth() - 10, u.removeClass("layerTipsR").addClass("layerTipsL").css({
                                "border-left-color": r
                            }))) : o - f.scrollTop() - 12 <= 0 ? (o = n + s + 10, u.removeClass("layerTipsT").addClass("layerTipsB").css({
                                "border-bottom-color": r
                            })) : (o -= 10, u.removeClass("layerTipsB").addClass("layerTipsT").css({
                                "border-top-color": r
                            })),
                            d.tips.isGuide || u.remove(),
                            c.css({
                                top: o,
                                left: q
                            });
                        break;
                    default:
                        this.layerMian.css({
                            "background-color":
                                "#fff"
                        }),
                            d.title[1] ? this.layerText.css({
                                paddingTop: 18 + b.layerTitle.outerHeight()
                            }) : (c.find(".xubox_msgico").css({
                                top: "10px"
                            }), b.layerText.css({
                                marginTop: 12
                            }))
                }
                this.move()
            },
            h.pt.autoArea = function() {
                var m, n, o, p, q, b = this,
                    c = b.layerE,
                    d = b.config,
                    f = d.page,
                    h = b.layerMian,
                    i = b.layerBtn,
                    j = b.layerText,
                    k = b.layerPage,
                    l = b.layerB;
                switch ("auto" === d.area[0] && h.outerWidth() >= d.maxWidth && c.css({
                    width: d.maxWidth
                }), m = d.title[1] ? b.layerTitle.innerHeight() : 0, d.type) {
                    case 0:
                        n = i.find("a"),
                            o = j.outerHeight() + 20,
                            p = n.length > 0 ? n.outerHeight() + 20 : 0;
                        break;
                    case 1:
                        p = 0,
                            o = e(f.dom).outerHeight(),
                            "auto" === d.area[0] && c.css({
                                width: k.outerWidth()
                            }),
                            "" !== f.html && (o = k.outerHeight());
                        break;
                    case 3:
                        q = e(".xubox_loading"),
                            p = 0,
                            o = q.outerHeight(),
                            h.css({
                                width: q.width()
                            })
                }
                "auto" === d.area[1] && h.css({
                    height: m + o + p
                }),
                    l.css({
                        width: c.outerWidth() + 2 * d.border[0],
                        height: c.outerHeight() + 2 * d.border[0]
                    }),
                    g.iE6 && "auto" != d.area[0] && h.css({
                        width: c.outerWidth()
                    }),
                    "50%" !== d.offset[1] && "" != d.offset[1] || 4 === d.type ? c.css({
                        marginLeft: 0
                    }) : c.css({
                        marginLeft: -c.outerWidth() / 2
                    })
            },
            h.pt.move = function() {
                var d, g, i, j, k, a = this,
                    b = this.config,
                    c = a.layerE.find(b.move[0]),
                    h = a.dom,
                    l = 0,
                    m = 0;
                b.move[1] && c.attr("move", "ok"),
                    b.move[1] ? a.layerE.find(b.move[0]).css({
                        cursor: "move"
                    }) : a.layerE.find(b.move[0]).css({
                        cursor: "auto"
                    }),
                    e(b.move[0]).on("mousedown",
                        function(a) {
                            if (a.preventDefault(), "ok" === e(this).attr("move")) {
                                g = !0,
                                    d = e(this).parents("." + h.lay);
                                var b = d.offset().left,
                                    c = d.offset().top,
                                    n = d.width() - 6,
                                    o = d.height() - 6;
                                e("#xubox_moves")[0] || e("body").append('<div id="xubox_moves" class="xubox_moves" style="left:' + b + "px; top:" + c + "px; width:" + n + "px; height:" + o + 'px; z-index:2147483584"></div>'),
                                    k = e("#xubox_moves"),
                                    i = a.pageX - k.position().left,
                                    j = a.pageY - k.position().top,
                                    l = f.scrollLeft(),
                                    "fixed" !== d.css("position") || (m = f.scrollTop())
                            }
                        }),
                    e(document).mousemove(function(a) {
                        var c, e, h, l, m;
                        g && (a.preventDefault(), c = a.pageX - i, e = "fixed" === d.css("position") ? a.pageY - j: a.pageY - j, b.moveOut || (h = f.width() - k.outerWidth() - b.border[0], l = f.scrollTop(), m = b.border[0] + l, c < b.border[0] && (c = b.border[0]), c > h && (c = h), m > e && (e = m), e > f.height() - k.outerHeight() - b.border[0] + l && (e = f.height() - k.outerHeight() - b.border[0] + l)), k.css({
                            left: c,
                            top: e
                        }))
                    }).mouseup(function() {
                            var a;
                            try {
                                g && (a = 0 == parseInt(d.css("margin-left")) ? parseInt(k.css("left")) : parseInt(k.css("left")) + -parseInt(d.css("margin-left")), "fixed" === d.css("position") || (a -= d.parent().offset().left), d.css({
                                    left: a,
                                    top: parseInt(k.css("top")) - m
                                }), k.remove()),
                                    g = !1
                            } catch(c) {
                                g = !1
                            }
                            b.moveEnd && b.moveEnd()
                        })
            },
            h.pt.autoclose = function() {
                var a = this,
                    b = this.config.time,
                    c = function() {
                        b--,
                            0 === b && (layer.close(a.index), clearInterval(a.autotime))
                    };
                this.autotime = setInterval(c, 1e3)
            },
            g.config = {
                end: {}
            },
            h.pt.callback = function() {
                this.openLayer();
                var a = this,
                    b = this.layerE,
                    c = this.config,
                    d = c.dialog;
                this.config.success(b),
                    g.iE6 && this.IE6(),
                    b.find(".xubox_close").off("click").on("click",
                        function(b) {
                            b.preventDefault(),
                                c.close(a.index)
                        }),
                    b.find(".xubox_yes").off("click").on("click",
                        function(b) {
                            b.preventDefault(),
                                d.yes(a.index)
                        }),
                    b.find(".xubox_no").off("click").on("click",
                        function(b) {
                            b.preventDefault(),
                                d.no(a.index)
                        }),
                    this.layerS.off("click").on("click",
                        function(b) {
                            b.preventDefault(),
                                a.config.shadeClose && layer.close(a.index)
                        }),
                    g.config.end[this.index] = c.end
            },
            h.pt.IE6 = function() {
                var h, a = this,
                    b = this.layerE,
                    c = e("select"),
                    d = a.dom,
                    g = b.offset().top;
                h = this.config.fix ?
                    function() {
                        b.css({
                            top: e(document).scrollTop() + g
                        })
                    }: function() {
                    b.css({
                        top: g
                    })
                },
                    h(),
                    f.scroll(h),
                    e.each(c,
                        function() {
                            var c = e(this);
                            c.parents("." + d.lay)[0] || "none" == c.css("display") || c.attr({
                                layer: "1"
                            }).hide()
                        }),
                    this.reselect = function() {
                        e.each(c,
                            function() {
                                var c = e(this);
                                c.parents("." + d.lay)[0] || 1 == c.attr("layer") && e("." + d.lay).length < 1 && c.removeAttr("layer").show()
                            })
                    }
            },
            h.pt.openLayer = function() {
                var a = this,
                    b = a.dom;
                layer.index = g.times,
                    layer.autoArea = function(b) {
                        return a.autoArea(b)
                    },
                    layer.getIndex = function(a) {
                        return e(a).parents("." + b.lay).attr("times")
                    },
                    layer.getChildFrame = function(a, c) {
                        return c = c || e("." + b.ifr).parents("." + b.lay).attr("times"),
                            e("#" + b.lay + c).find("." + b.ifr).contents().find(a)
                    },
                    layer.getFrameIndex = function(a) {
                        return e(a ? "#" + a: "." + b.ifr).parents("." + b.lay).attr("times")
                    },
                    layer.iframeAuto = function(a) {
                        var c, d, f, g, h;
                        a = a || e("." + b.ifr).parents("." + b.lay).attr("times"),
                            c = this.getChildFrame("body", a).outerHeight(),
                            d = e("#" + b.lay + a),
                            f = d.find(".xubox_title"),
                            g = 0,
                            !f || (g = f.height()),
                            d.css({
                                height: c + g
                            }),
                            h = -parseInt(e("#xubox_border" + a).css("top")),
                            e("#xubox_border" + a).css({
                                height: c + 2 * h + g
                            }),
                            e("#" + b.ifr + a).css({
                                height: c
                            })
                    },
                    layer.close = function(c) {
                        var h, d = e("#" + b.lay + c),
                            f = e("#xubox_moves, #xubox_shade" + c);
                        if (d.attr("type") == a.type[1]) if (d.find(".xuboxPageHtml")[0]) d.remove();
                        else for (d.find(".xubox_close,.xubox_botton,.xubox_title,.xubox_border").remove(), h = 0; 3 > h; h++) d.find(".layer_pageContent").unwrap().hide();
                        else document.all && d.find("#" + b.ifr + c).remove(),
                            d.remove();
                        f.remove(),
                            g.iE6 && a.reselect(),
                            "function" == typeof g.config.end[c] && g.config.end[c](),
                            delete g.config.end[c]
                    },
                    layer.loadClose = function() {
                        var a = e(".xubox_loading").parents("." + b.lay),
                            c = a.attr("times");
                        layer.close(c)
                    },
                    layer.shift = function(b, c) {
                        var l, d = a.config,
                            e = g.iE6,
                            h = a.layerE,
                            i = 0,
                            j = f.width(),
                            k = f.height();
                        switch (i = "50%" == d.offset[1] || "" == d.offset[1] ? h.outerWidth() / 2 : h.outerWidth(), l = {
                            t: {
                                top: d.border[0]
                            },
                            b: {
                                top: k - h.outerHeight() - d.border[0]
                            },
                            cl: i + d.border[0],
                            ct: -h.outerHeight(),
                            cr: j - i - d.border[0],
                            fn: function() {
                                e && a.IE6()
                            }
                        },
                            b) {
                            case "left-top":
                                h.css({
                                    left:
                                        l.cl,
                                    top: l.ct
                                }).animate(l.t, c, l.fn);
                                break;
                            case "right-top":
                                h.css({
                                    left:
                                        l.cr,
                                    top: l.ct
                                }).animate(l.t, c, l.fn);
                                break;
                            case "left-bottom":
                                h.css({
                                    left:
                                        l.cl,
                                    top: k
                                }).animate(l.b, c, l.fn);
                                break;
                            case "right-bottom":
                                h.css({
                                    left:
                                        l.cr,
                                    top: k
                                }).animate(l.b, c, l.fn)
                        }
                    },
                    layer.setMove = function() {
                        return a.move()
                    },
                    layer.area = function(c, d) {
                        var j, f = [e("#" + b.lay + c), e("#xubox_border" + c)],
                            g = f[0].attr("type"),
                            h = f[0].find(".xubox_main"),
                            i = f[0].find(".xubox_title"); (g === a.type[1] || g === a.type[2]) && (f[0].css(d), f[1][0] && f[1].css({
                            width: d.width - 2 * parseInt(f[1].css("left")),
                            height: d.height - 2 * parseInt(f[1].css("top"))
                        }), h.css({
                            height: d.height
                        }), g === a.type[2] && (j = f[0].find("iframe"), j.css({
                            width: d.width,
                            height: i ? d.height - i.outerHeight() : d.height
                        })), "0px" !== f[0].css("margin-left") && (d.hasOwnProperty("top") && f[0].css({
                            top: d.top - (f[1][0] && parseInt(f[1].css("top")))
                        }), d.hasOwnProperty("left") && f[0].css({
                            left: d.left + f[0].outerWidth() / 2 - (f[1][0] && parseInt(f[1].css("left")))
                        }), f[0].css({
                            marginLeft: -f[0].outerWidth() / 2
                        })))
                    },
                    layer.closeAll = function() {
                        var a = e("." + b.lay);
                        e.each(a,
                            function() {
                                var a = e(this).attr("times");
                                layer.close(a)
                            })
                    },
                    layer.zIndex = a.config.zIndex,
                    layer.setTop = function(a) {
                        return layer.zIndex = parseInt(a[0].style.zIndex),
                            setZindex = function() {
                                layer.zIndex++,
                                    a.css("z-index", layer.zIndex + 1)
                            },
                            a.on("mousedown", setZindex),
                            layer.zIndex
                    }
            },
            g.run = function() {
                e = jQuery,
                    f = e(a),
                    this.load(),
                    e.layer = function(a) {
                        var b = new h(a);
                        return b.index
                    }
            };
        //i="../../lib/jquery/jquery",this.seajs?define([i],function(b,c){g.run(),c.layer=[a.layer,a.$.layer]}):g.run()
        if (typeof exports !== "undefined") {
            module.exports = layer
        } else {
            a.layer = layer
        };
        g.run();
    } (window);
});
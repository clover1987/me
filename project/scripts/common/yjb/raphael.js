!function (e) {
    var t, n, r = "0.4.2", i = "hasOwnProperty", s = /[\.\/]/, o = "*", u = function () {
    }, a = function (e, t) {
        return e - t
    }, f = {n: {}}, l = function (e, r) {
        e = String(e);
        var i, s = n, o = Array.prototype.slice.call(arguments, 2), u = l.listeners(e), f = 0, h = [], p = {}, d = [], v = t;
        t = e, n = 0;
        for (var m = 0, g = u.length; g > m; m++)"zIndex"in u[m] && (h.push(u[m].zIndex), u[m].zIndex < 0 && (p[u[m].zIndex] = u[m]));
        for (h.sort(a); h[f] < 0;)if (i = p[h[f++]], d.push(i.apply(r, o)), n)return n = s, d;
        for (m = 0; g > m; m++)if (i = u[m], "zIndex"in i)if (i.zIndex == h[f]) {
            if (d.push(i.apply(r, o)), n)break;
            do if (f++, i = p[h[f]], i && d.push(i.apply(r, o)), n)break; while (i)
        } else p[i.zIndex] = i; else if (d.push(i.apply(r, o)), n)break;
        return n = s, t = v, d.length ? d : null
    };
    l._events = f, l.listeners = function (e) {
        var t, n, r, i, u, a, l, c, h = e.split(s), p = f, d = [p], v = [];
        for (i = 0, u = h.length; u > i; i++) {
            for (c = [], a = 0, l = d.length; l > a; a++)for (p = d[a].n, n = [p[h[i]], p[o]], r = 2; r--;)t = n[r], t && (c.push(t), v = v.concat(t.f || []));
            d = c
        }
        return v
    }, l.on = function (e, t) {
        if (e = String(e), "function" != typeof t)return function () {
        };
        for (var n = e.split(s), r = f, i = 0, o = n.length; o > i; i++)r = r.n, r = r.hasOwnProperty(n[i]) && r[n[i]] || (r[n[i]] = {n: {}});
        for (r.f = r.f || [], i = 0, o = r.f.length; o > i; i++)if (r.f[i] == t)return u;
        return r.f.push(t), function (e) {
            +e == +e && (t.zIndex = +e)
        }
    }, l.f = function (e) {
        var t = [].slice.call(arguments, 1);
        return function () {
            l.apply(null, [e, null].concat(t).concat([].slice.call(arguments, 0)))
        }
    }, l.stop = function () {
        n = 1
    }, l.nt = function (e) {
        return e ? (new RegExp("(?:\\.|\\/|^)" + e + "(?:\\.|\\/|$)")).test(t) : t
    }, l.nts = function () {
        return t.split(s)
    }, l.off = l.unbind = function (e, t) {
        if (!e)return void (l._events = f = {n: {}});
        var n, r, u, a, c, h, p, d = e.split(s), v = [f];
        for (a = 0, c = d.length; c > a; a++)for (h = 0; h < v.length; h += u.length - 2) {
            if (u = [h, 1], n = v[h].n, d[a] != o)n[d[a]] && u.push(n[d[a]]); else for (r in n)n[i](r) && u.push(n[r]);
            v.splice.apply(v, u)
        }
        for (a = 0, c = v.length; c > a; a++)for (n = v[a]; n.n;) {
            if (t) {
                if (n.f) {
                    for (h = 0, p = n.f.length; p > h; h++)if (n.f[h] == t) {
                        n.f.splice(h, 1);
                        break
                    }
                    !n.f.length && delete n.f
                }
                for (r in n.n)if (n.n[i](r) && n.n[r].f) {
                    var m = n.n[r].f;
                    for (h = 0, p = m.length; p > h; h++)if (m[h] == t) {
                        m.splice(h, 1);
                        break
                    }
                    !m.length && delete n.n[r].f
                }
            } else {
                delete n.f;
                for (r in n.n)n.n[i](r) && n.n[r].f && delete n.n[r].f
            }
            n = n.n
        }
    }, l.once = function (e, t) {
        var n = function () {
            return l.unbind(e, n), t.apply(this, arguments)
        };
        return l.on(e, n)
    }, l.version = r, l.toString = function () {
        return"You are running Eve " + r
    }, "undefined" != typeof module && module.exports ? module.exports = l : "undefined" != typeof define ? define("eve", [], function () {
        return l
    }) : e.eve = l
}(window || this), function (e, t) {
    "function" == typeof define && define.amd ? define(["eve"], function (n) {
        return t(e, n)
    }) : t(e, e.eve)
}(this, function (e, t) {
    function n(e) {
        if (n.is(e, "function"))return w ? e() : t.on("raphael.DOMload", e);
        if (n.is(e, $))return n._engine.create[A](n, e.splice(0, 3 + n.is(e[0], X))).add(e);
        var r = Array.prototype.slice.call(arguments, 0);
        if (n.is(r[r.length - 1], "function")) {
            var i = r.pop();
            return w ? i.call(n._engine.create[A](n, r)) : t.on("raphael.DOMload", function () {
                i.call(n._engine.create[A](n, r))
            })
        }
        return n._engine.create[A](n, arguments)
    }

    function r(e) {
        if ("function" == typeof e || Object(e) !== e)return e;
        var t = new e.constructor;
        for (var n in e)e[N](n) && (t[n] = r(e[n]));
        return t
    }

    function i(e, t) {
        for (var n = 0, r = e.length; r > n; n++)if (e[n] === t)return e.push(e.splice(n, 1)[0])
    }

    function s(e, t, n) {
        function r() {
            var s = Array.prototype.slice.call(arguments, 0), o = s.join("␀"), u = r.cache = r.cache || {}, a = r.count = r.count || [];
            return u[N](o) ? (i(a, o), n ? n(u[o]) : u[o]) : (a.length >= 1e3 && delete u[a.shift()], a.push(o), u[o] = e[A](t, s), n ? n(u[o]) : u[o])
        }

        return r
    }

    function o() {
        return this.hex
    }

    function u(e, t) {
        for (var n = [], r = 0, i = e.length; i - 2 * !t > r; r += 2) {
            var s = [
                {x: +e[r - 2], y: +e[r - 1]},
                {x: +e[r], y: +e[r + 1]},
                {x: +e[r + 2], y: +e[r + 3]},
                {x: +e[r + 4], y: +e[r + 5]}
            ];
            t ? r ? i - 4 == r ? s[3] = {x: +e[0], y: +e[1]} : i - 2 == r && (s[2] = {x: +e[0], y: +e[1]}, s[3] = {x: +e[2], y: +e[3]}) : s[0] = {x: +e[i - 2], y: +e[i - 1]} : i - 4 == r ? s[3] = s[2] : r || (s[0] = {x: +e[r], y: +e[r + 1]}), n.push(["C", (-s[0].x + 6 * s[1].x + s[2].x) / 6, (-s[0].y + 6 * s[1].y + s[2].y) / 6, (s[1].x + 6 * s[2].x - s[3].x) / 6, (s[1].y + 6 * s[2].y - s[3].y) / 6, s[2].x, s[2].y])
        }
        return n
    }

    function a(e, t, n, r, i) {
        var s = -3 * t + 9 * n - 9 * r + 3 * i, o = e * s + 6 * t - 12 * n + 6 * r;
        return e * o - 3 * t + 3 * n
    }

    function f(e, t, n, r, i, s, o, u, f) {
        null == f && (f = 1), f = f > 1 ? 1 : 0 > f ? 0 : f;
        for (var l = f / 2, c = 12, h = [-0.1252, .1252, -0.3678, .3678, -0.5873, .5873, -0.7699, .7699, -0.9041, .9041, -0.9816, .9816], p = [.2491, .2491, .2335, .2335, .2032, .2032, .1601, .1601, .1069, .1069, .0472, .0472], d = 0, v = 0; c > v; v++) {
            var m = l * h[v] + l, g = a(m, e, n, i, o), y = a(m, t, r, s, u), b = g * g + y * y;
            d += p[v] * I.sqrt(b)
        }
        return l * d
    }

    function l(e, t, n, r, i, s, o, u, a) {
        if (!(0 > a || f(e, t, n, r, i, s, o, u) < a)) {
            var l, c = 1, h = c / 2, p = c - h, d = .01;
            for (l = f(e, t, n, r, i, s, o, u, p); U(l - a) > d;)h /= 2, p += (a > l ? 1 : -1) * h, l = f(e, t, n, r, i, s, o, u, p);
            return p
        }
    }

    function c(e, t, n, r, i, s, o, u) {
        if (!(q(e, n) < R(i, o) || R(e, n) > q(i, o) || q(t, r) < R(s, u) || R(t, r) > q(s, u))) {
            var a = (e * r - t * n) * (i - o) - (e - n) * (i * u - s * o), f = (e * r - t * n) * (s - u) - (t - r) * (i * u - s * o), l = (e - n) * (s - u) - (t - r) * (i - o);
            if (l) {
                var c = a / l, h = f / l, p = +c.toFixed(2), d = +h.toFixed(2);
                if (!(p < +R(e, n).toFixed(2) || p > +q(e, n).toFixed(2) || p < +R(i, o).toFixed(2) || p > +q(i, o).toFixed(2) || d < +R(t, r).toFixed(2) || d > +q(t, r).toFixed(2) || d < +R(s, u).toFixed(2) || d > +q(s, u).toFixed(2)))return{x: c, y: h}
            }
        }
    }

    function h(e, t, r) {
        var i = n.bezierBBox(e), s = n.bezierBBox(t);
        if (!n.isBBoxIntersect(i, s))return r ? 0 : [];
        for (var o = f.apply(0, e), u = f.apply(0, t), a = q(~~(o / 5), 1), l = q(~~(u / 5), 1), h = [], p = [], d = {}, v = r ? 0 : [], m = 0; a + 1 > m; m++) {
            var g = n.findDotsAtSegment.apply(n, e.concat(m / a));
            h.push({x: g.x, y: g.y, t: m / a})
        }
        for (m = 0; l + 1 > m; m++)g = n.findDotsAtSegment.apply(n, t.concat(m / l)), p.push({x: g.x, y: g.y, t: m / l});
        for (m = 0; a > m; m++)for (var y = 0; l > y; y++) {
            var b = h[m], w = h[m + 1], E = p[y], S = p[y + 1], x = U(w.x - b.x) < .001 ? "y" : "x", T = U(S.x - E.x) < .001 ? "y" : "x", N = c(b.x, b.y, w.x, w.y, E.x, E.y, S.x, S.y);
            if (N) {
                if (d[N.x.toFixed(4)] == N.y.toFixed(4))continue;
                d[N.x.toFixed(4)] = N.y.toFixed(4);
                var C = b.t + U((N[x] - b[x]) / (w[x] - b[x])) * (w.t - b.t), k = E.t + U((N[T] - E[T]) / (S[T] - E[T])) * (S.t - E.t);
                C >= 0 && 1.001 >= C && k >= 0 && 1.001 >= k && (r ? v++ : v.push({x: N.x, y: N.y, t1: R(C, 1), t2: R(k, 1)}))
            }
        }
        return v
    }

    function p(e, t, r) {
        e = n._path2curve(e), t = n._path2curve(t);
        for (var i, s, o, u, a, f, l, c, p, d, v = r ? 0 : [], m = 0, g = e.length; g > m; m++) {
            var y = e[m];
            if ("M" == y[0])i = a = y[1], s = f = y[2]; else {
                "C" == y[0] ? (p = [i, s].concat(y.slice(1)), i = p[6], s = p[7]) : (p = [i, s, i, s, a, f, a, f], i = a, s = f);
                for (var b = 0, w = t.length; w > b; b++) {
                    var E = t[b];
                    if ("M" == E[0])o = l = E[1], u = c = E[2]; else {
                        "C" == E[0] ? (d = [o, u].concat(E.slice(1)), o = d[6], u = d[7]) : (d = [o, u, o, u, l, c, l, c], o = l, u = c);
                        var S = h(p, d, r);
                        if (r)v += S; else {
                            for (var x = 0, T = S.length; T > x; x++)S[x].segment1 = m, S[x].segment2 = b, S[x].bez1 = p, S[x].bez2 = d;
                            v = v.concat(S)
                        }
                    }
                }
            }
        }
        return v
    }

    function d(e, t, n, r, i, s) {
        null != e ? (this.a = +e, this.b = +t, this.c = +n, this.d = +r, this.e = +i, this.f = +s) : (this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.e = 0, this.f = 0)
    }

    function v() {
        return this.x + D + this.y + D + this.width + " × " + this.height
    }

    function m(e, t, n, r, i, s) {
        function o(e) {
            return((c * e + l) * e + f) * e
        }

        function u(e, t) {
            var n = a(e, t);
            return((d * n + p) * n + h) * n
        }

        function a(e, t) {
            var n, r, i, s, u, a;
            for (i = e, a = 0; 8 > a; a++) {
                if (s = o(i) - e, U(s) < t)return i;
                if (u = (3 * c * i + 2 * l) * i + f, U(u) < 1e-6)break;
                i -= s / u
            }
            if (n = 0, r = 1, i = e, n > i)return n;
            if (i > r)return r;
            for (; r > n;) {
                if (s = o(i), U(s - e) < t)return i;
                e > s ? n = i : r = i, i = (r - n) / 2 + n
            }
            return i
        }

        var f = 3 * t, l = 3 * (r - t) - f, c = 1 - f - l, h = 3 * n, p = 3 * (i - n) - h, d = 1 - h - p;
        return u(e, 1 / (200 * s))
    }

    function g(e, t) {
        var n = [], r = {};
        if (this.ms = t, this.times = 1, e) {
            for (var i in e)e[N](i) && (r[Z(i)] = e[i], n.push(Z(i)));
            n.sort(ct)
        }
        this.anim = r, this.top = n[n.length - 1], this.percents = n
    }

    function y(e, r, i, s, o, u) {
        i = Z(i);
        var a, f, l, c, h, p, v = e.ms, g = {}, y = {}, b = {};
        if (s)for (E = 0, x = fn.length; x > E; E++) {
            var w = fn[E];
            if (w.el.id == r.id && w.anim == e) {
                w.percent != i ? (fn.splice(E, 1), l = 1) : f = w, r.attr(w.totalOrigin);
                break
            }
        } else s = +y;
        for (var E = 0, x = e.percents.length; x > E; E++) {
            if (e.percents[E] == i || e.percents[E] > s * e.top) {
                i = e.percents[E], h = e.percents[E - 1] || 0, v = v / e.top * (i - h), c = e.percents[E + 1], a = e.anim[i];
                break
            }
            s && r.attr(e.anim[e.percents[E]])
        }
        if (a) {
            if (f)f.initstatus = s, f.start = new Date - f.ms * s; else {
                for (var T in a)if (a[N](T) && (rt[N](T) || r.paper.customAttributes[N](T)))switch (g[T] = r.attr(T), null == g[T] && (g[T] = nt[T]), y[T] = a[T], rt[T]) {
                    case X:
                        b[T] = (y[T] - g[T]) / v;
                        break;
                    case"colour":
                        g[T] = n.getRGB(g[T]);
                        var C = n.getRGB(y[T]);
                        b[T] = {r: (C.r - g[T].r) / v, g: (C.g - g[T].g) / v, b: (C.b - g[T].b) / v};
                        break;
                    case"path":
                        var k = Bt(g[T], y[T]), L = k[1];
                        for (g[T] = k[0], b[T] = [], E = 0, x = g[T].length; x > E; E++) {
                            b[T][E] = [0];
                            for (var A = 1, M = g[T][E].length; M > A; A++)b[T][E][A] = (L[E][A] - g[T][E][A]) / v
                        }
                        break;
                    case"transform":
                        var _ = r._, D = Rt(_[T], y[T]);
                        if (D)for (g[T] = D.from, y[T] = D.to, b[T] = [], b[T].real = !0, E = 0, x = g[T].length; x > E; E++)for (b[T][E] = [g[T][E][0]], A = 1, M = g[T][E].length; M > A; A++)b[T][E][A] = (y[T][E][A] - g[T][E][A]) / v; else {
                            var B = r.matrix || new d, j = {_: {transform: _.transform}, getBBox: function () {
                                return r.getBBox(1)
                            }};
                            g[T] = [B.a, B.b, B.c, B.d, B.e, B.f], It(j, y[T]), y[T] = j._.transform, b[T] = [(j.matrix.a - B.a) / v, (j.matrix.b - B.b) / v, (j.matrix.c - B.c) / v, (j.matrix.d - B.d) / v, (j.matrix.e - B.e) / v, (j.matrix.f - B.f) / v]
                        }
                        break;
                    case"csv":
                        var F = P(a[T])[H](S), I = P(g[T])[H](S);
                        if ("clip-rect" == T)for (g[T] = I, b[T] = [], E = I.length; E--;)b[T][E] = (F[E] - g[T][E]) / v;
                        y[T] = F;
                        break;
                    default:
                        for (F = [][O](a[T]), I = [][O](g[T]), b[T] = [], E = r.paper.customAttributes[T].length; E--;)b[T][E] = ((F[E] || 0) - (I[E] || 0)) / v
                }
                var q = a.easing, R = n.easing_formulas[q];
                if (!R)if (R = P(q).match(G), R && 5 == R.length) {
                    var U = R;
                    R = function (e) {
                        return m(e, +U[1], +U[2], +U[3], +U[4], v)
                    }
                } else R = pt;
                if (p = a.start || e.start || +(new Date), w = {anim: e, percent: i, timestamp: p, start: p + (e.del || 0), status: 0, initstatus: s || 0, stop: !1, ms: v, easing: R, from: g, diff: b, to: y, el: r, callback: a.callback, prev: h, next: c, repeat: u || e.times, origin: r.attr(), totalOrigin: o}, fn.push(w), s && !f && !l && (w.stop = !0, w.start = new Date - v * s, 1 == fn.length))return cn();
                l && (w.start = new Date - w.ms * s), 1 == fn.length && ln(cn)
            }
            t("raphael.anim.start." + r.id, r, e)
        }
    }

    function b(e) {
        for (var t = 0; t < fn.length; t++)fn[t].el.paper == e && fn.splice(t--, 1)
    }

    n.version = "2.1.2", n.eve = t;
    var w, E, S = /[, ]+/, x = {circle: 1, rect: 1, path: 1, ellipse: 1, text: 1, image: 1}, T = /\{(\d+)\}/g, N = "hasOwnProperty", C = {doc: document, win: e}, k = {was: Object.prototype[N].call(C.win, "Raphael"), is: C.win.Raphael}, L = function () {
        this.ca = this.customAttributes = {}
    }, A = "apply", O = "concat", M = "ontouchstart"in C.win || C.win.DocumentTouch && C.doc instanceof DocumentTouch, _ = "", D = " ", P = String, H = "split", B = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[H](D), j = {mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend"}, F = P.prototype.toLowerCase, I = Math, q = I.max, R = I.min, U = I.abs, z = I.pow, W = I.PI, X = "number", V = "string", $ = "array", J = Object.prototype.toString, K = (n._ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i, /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i), Q = {NaN: 1, Infinity: 1, "-Infinity": 1}, G = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/, Y = I.round, Z = parseFloat, et = parseInt, tt = P.prototype.toUpperCase, nt = n._availableAttrs = {"arrow-end": "none", "arrow-start": "none", blur: 0, "clip-rect": "0 0 1e9 1e9", cursor: "default", cx: 0, cy: 0, fill: "#fff", "fill-opacity": 1, font: '10px "Arial"', "font-family": '"Arial"', "font-size": "10", "font-style": "normal", "font-weight": 400, gradient: 0, height: 0, href: "http://raphaeljs.com/", "letter-spacing": 0, opacity: 1, path: "M0,0", r: 0, rx: 0, ry: 0, src: "", stroke: "#000", "stroke-dasharray": "", "stroke-linecap": "butt", "stroke-linejoin": "butt", "stroke-miterlimit": 0, "stroke-opacity": 1, "stroke-width": 1, target: "_blank", "text-anchor": "middle", title: "Raphael", transform: "", width: 0, x: 0, y: 0}, rt = n._availableAnimAttrs = {blur: X, "clip-rect": "csv", cx: X, cy: X, fill: "colour", "fill-opacity": X, "font-size": X, height: X, opacity: X, path: "path", r: X, rx: X, ry: X, stroke: "colour", "stroke-opacity": X, "stroke-width": X, transform: "transform", width: X, x: X, y: X}, it = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/, st = {hs: 1, rg: 1}, ot = /,?([achlmqrstvxz]),?/gi, ut = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi, at = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi, ft = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/gi, lt = (n._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/, {}), ct = function (e, t) {
        return Z(e) - Z(t)
    }, ht = function () {
    }, pt = function (e) {
        return e
    }, dt = n._rectPath = function (e, t, n, r, i) {
        return i ? [
            ["M", e + i, t],
            ["l", n - 2 * i, 0],
            ["a", i, i, 0, 0, 1, i, i],
            ["l", 0, r - 2 * i],
            ["a", i, i, 0, 0, 1, -i, i],
            ["l", 2 * i - n, 0],
            ["a", i, i, 0, 0, 1, -i, -i],
            ["l", 0, 2 * i - r],
            ["a", i, i, 0, 0, 1, i, -i],
            ["z"]
        ] : [
            ["M", e, t],
            ["l", n, 0],
            ["l", 0, r],
            ["l", -n, 0],
            ["z"]
        ]
    }, vt = function (e, t, n, r) {
        return null == r && (r = n), [
            ["M", e, t],
            ["m", 0, -r],
            ["a", n, r, 0, 1, 1, 0, 2 * r],
            ["a", n, r, 0, 1, 1, 0, -2 * r],
            ["z"]
        ]
    }, mt = n._getPath = {path: function (e) {
        return e.attr("path")
    }, circle: function (e) {
        var t = e.attrs;
        return vt(t.cx, t.cy, t.r)
    }, ellipse: function (e) {
        var t = e.attrs;
        return vt(t.cx, t.cy, t.rx, t.ry)
    }, rect: function (e) {
        var t = e.attrs;
        return dt(t.x, t.y, t.width, t.height, t.r)
    }, image: function (e) {
        var t = e.attrs;
        return dt(t.x, t.y, t.width, t.height)
    }, text: function (e) {
        var t = e._getBBox();
        return dt(t.x, t.y, t.width, t.height)
    }, set: function (e) {
        var t = e._getBBox();
        return dt(t.x, t.y, t.width, t.height)
    }}, gt = n.mapPath = function (e, t) {
        if (!t)return e;
        var n, r, i, s, o, u, a;
        for (e = Bt(e), i = 0, o = e.length; o > i; i++)for (a = e[i], s = 1, u = a.length; u > s; s += 2)n = t.x(a[s], a[s + 1]), r = t.y(a[s], a[s + 1]), a[s] = n, a[s + 1] = r;
        return e
    };
    if (n._g = C, n.type = C.win.SVGAngle || C.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML", "VML" == n.type) {
        var yt, bt = C.doc.createElement("div");
        if (bt.innerHTML = '<v:shape adj="1"/>', yt = bt.firstChild, yt.style.behavior = "url(#default#VML)", !yt || "object" != typeof yt.adj)return n.type = _;
        bt = null
    }
    n.svg = !(n.vml = "VML" == n.type), n._Paper = L, n.fn = E = L.prototype = n.prototype, n._id = 0, n._oid = 0, n.is = function (e, t) {
        return t = F.call(t), "finite" == t ? !Q[N](+e) : "array" == t ? e instanceof Array : "null" == t && null === e || t == typeof e && null !== e || "object" == t && e === Object(e) || "array" == t && Array.isArray && Array.isArray(e) || J.call(e).slice(8, -1).toLowerCase() == t
    }, n.angle = function (e, t, r, i, s, o) {
        if (null == s) {
            var u = e - r, a = t - i;
            return u || a ? (180 + 180 * I.atan2(-a, -u) / W + 360) % 360 : 0
        }
        return n.angle(e, t, s, o) - n.angle(r, i, s, o)
    }, n.rad = function (e) {
        return e % 360 * W / 180
    }, n.deg = function (e) {
        return 180 * e / W % 360
    }, n.snapTo = function (e, t, r) {
        if (r = n.is(r, "finite") ? r : 10, n.is(e, $)) {
            for (var i = e.length; i--;)if (U(e[i] - t) <= r)return e[i]
        } else {
            e = +e;
            var s = t % e;
            if (r > s)return t - s;
            if (s > e - r)return t - s + e
        }
        return t
    }, n.createUUID = function (e, t) {
        return function () {
            return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(e, t).toUpperCase()
        }
    }(/[xy]/g, function (e) {
        var t = 16 * I.random() | 0, n = "x" == e ? t : 3 & t | 8;
        return n.toString(16)
    }), n.setWindow = function (e) {
        t("raphael.setWindow", n, C.win, e), C.win = e, C.doc = C.win.document, n._engine.initWin && n._engine.initWin(C.win)
    };
    var wt = function (e) {
        if (n.vml) {
            var t, r = /^\s+|\s+$/g;
            try {
                var i = new ActiveXObject("htmlfile");
                i.write("<body>"), i.close(), t = i.body
            } catch (o) {
                t = createPopup().document.body
            }
            var u = t.createTextRange();
            wt = s(function (e) {
                try {
                    t.style.color = P(e).replace(r, _);
                    var n = u.queryCommandValue("ForeColor");
                    return n = (255 & n) << 16 | 65280 & n | (16711680 & n) >>> 16, "#" + ("000000" + n.toString(16)).slice(-6)
                } catch (i) {
                    return"none"
                }
            })
        } else {
            var a = C.doc.createElement("i");
            a.title = "Raphaël Colour Picker", a.style.display = "none", C.doc.body.appendChild(a), wt = s(function (e) {
                return a.style.color = e, C.doc.defaultView.getComputedStyle(a, _).getPropertyValue("color")
            })
        }
        return wt(e)
    }, Et = function () {
        return"hsb(" + [this.h, this.s, this.b] + ")"
    }, St = function () {
        return"hsl(" + [this.h, this.s, this.l] + ")"
    }, xt = function () {
        return this.hex
    }, Tt = function (e, t, r) {
        if (null == t && n.is(e, "object") && "r"in e && "g"in e && "b"in e && (r = e.b, t = e.g, e = e.r), null == t && n.is(e, V)) {
            var i = n.getRGB(e);
            e = i.r, t = i.g, r = i.b
        }
        return(e > 1 || t > 1 || r > 1) && (e /= 255, t /= 255, r /= 255), [e, t, r]
    }, Nt = function (e, t, r, i) {
        e *= 255, t *= 255, r *= 255;
        var s = {r: e, g: t, b: r, hex: n.rgb(e, t, r), toString: xt};
        return n.is(i, "finite") && (s.opacity = i), s
    };
    n.color = function (e) {
        var t;
        return n.is(e, "object") && "h"in e && "s"in e && "b"in e ? (t = n.hsb2rgb(e), e.r = t.r, e.g = t.g, e.b = t.b, e.hex = t.hex) : n.is(e, "object") && "h"in e && "s"in e && "l"in e ? (t = n.hsl2rgb(e), e.r = t.r, e.g = t.g, e.b = t.b, e.hex = t.hex) : (n.is(e, "string") && (e = n.getRGB(e)), n.is(e, "object") && "r"in e && "g"in e && "b"in e ? (t = n.rgb2hsl(e), e.h = t.h, e.s = t.s, e.l = t.l, t = n.rgb2hsb(e), e.v = t.b) : (e = {hex: "none"}, e.r = e.g = e.b = e.h = e.s = e.v = e.l = -1)), e.toString = xt, e
    }, n.hsb2rgb = function (e, t, n, r) {
        this.is(e, "object") && "h"in e && "s"in e && "b"in e && (n = e.b, t = e.s, e = e.h, r = e.o), e *= 360;
        var i, s, o, u, a;
        return e = e % 360 / 60, a = n * t, u = a * (1 - U(e % 2 - 1)), i = s = o = n - a, e = ~~e, i += [a, u, 0, 0, u, a][e], s += [u, a, a, u, 0, 0][e], o += [0, 0, u, a, a, u][e], Nt(i, s, o, r)
    }, n.hsl2rgb = function (e, t, n, r) {
        this.is(e, "object") && "h"in e && "s"in e && "l"in e && (n = e.l, t = e.s, e = e.h), (e > 1 || t > 1 || n > 1) && (e /= 360, t /= 100, n /= 100), e *= 360;
        var i, s, o, u, a;
        return e = e % 360 / 60, a = 2 * t * (.5 > n ? n : 1 - n), u = a * (1 - U(e % 2 - 1)), i = s = o = n - a / 2, e = ~~e, i += [a, u, 0, 0, u, a][e], s += [u, a, a, u, 0, 0][e], o += [0, 0, u, a, a, u][e], Nt(i, s, o, r)
    }, n.rgb2hsb = function (e, t, n) {
        n = Tt(e, t, n), e = n[0], t = n[1], n = n[2];
        var r, i, s, o;
        return s = q(e, t, n), o = s - R(e, t, n), r = 0 == o ? null : s == e ? (t - n) / o : s == t ? (n - e) / o + 2 : (e - t) / o + 4, r = (r + 360) % 6 * 60 / 360, i = 0 == o ? 0 : o / s, {h: r, s: i, b: s, toString: Et}
    }, n.rgb2hsl = function (e, t, n) {
        n = Tt(e, t, n), e = n[0], t = n[1], n = n[2];
        var r, i, s, o, u, a;
        return o = q(e, t, n), u = R(e, t, n), a = o - u, r = 0 == a ? null : o == e ? (t - n) / a : o == t ? (n - e) / a + 2 : (e - t) / a + 4, r = (r + 360) % 6 * 60 / 360, s = (o + u) / 2, i = 0 == a ? 0 : .5 > s ? a / (2 * s) : a / (2 - 2 * s), {h: r, s: i, l: s, toString: St}
    }, n._path2string = function () {
        return this.join(",").replace(ot, "$1")
    }, n._preload = function (e, t) {
        var n = C.doc.createElement("img");
        n.style.cssText = "position:absolute;left:-9999em;top:-9999em", n.onload = function () {
            t.call(this), this.onload = null, C.doc.body.removeChild(this)
        }, n.onerror = function () {
            C.doc.body.removeChild(this)
        }, C.doc.body.appendChild(n), n.src = e
    }, n.getRGB = s(function (e) {
        if (!e || (e = P(e)).indexOf("-") + 1)return{r: -1, g: -1, b: -1, hex: "none", error: 1, toString: o};
        if ("none" == e)return{r: -1, g: -1, b: -1, hex: "none", toString: o};
        !st[N](e.toLowerCase().substring(0, 2)) && "#" != e.charAt() && (e = wt(e));
        var t, r, i, s, u, a, f = e.match(K);
        return f ? (f[2] && (i = et(f[2].substring(5), 16), r = et(f[2].substring(3, 5), 16), t = et(f[2].substring(1, 3), 16)), f[3] && (i = et((u = f[3].charAt(3)) + u, 16), r = et((u = f[3].charAt(2)) + u, 16), t = et((u = f[3].charAt(1)) + u, 16)), f[4] && (a = f[4][H](it), t = Z(a[0]), "%" == a[0].slice(-1) && (t *= 2.55), r = Z(a[1]), "%" == a[1].slice(-1) && (r *= 2.55), i = Z(a[2]), "%" == a[2].slice(-1) && (i *= 2.55), "rgba" == f[1].toLowerCase().slice(0, 4) && (s = Z(a[3])), a[3] && "%" == a[3].slice(-1) && (s /= 100)), f[5] ? (a = f[5][H](it), t = Z(a[0]), "%" == a[0].slice(-1) && (t *= 2.55), r = Z(a[1]), "%" == a[1].slice(-1) && (r *= 2.55), i = Z(a[2]), "%" == a[2].slice(-1) && (i *= 2.55), ("deg" == a[0].slice(-3) || "°" == a[0].slice(-1)) && (t /= 360), "hsba" == f[1].toLowerCase().slice(0, 4) && (s = Z(a[3])), a[3] && "%" == a[3].slice(-1) && (s /= 100), n.hsb2rgb(t, r, i, s)) : f[6] ? (a = f[6][H](it), t = Z(a[0]), "%" == a[0].slice(-1) && (t *= 2.55), r = Z(a[1]), "%" == a[1].slice(-1) && (r *= 2.55), i = Z(a[2]), "%" == a[2].slice(-1) && (i *= 2.55), ("deg" == a[0].slice(-3) || "°" == a[0].slice(-1)) && (t /= 360), "hsla" == f[1].toLowerCase().slice(0, 4) && (s = Z(a[3])), a[3] && "%" == a[3].slice(-1) && (s /= 100), n.hsl2rgb(t, r, i, s)) : (f = {r: t, g: r, b: i, toString: o}, f.hex = "#" + (16777216 | i | r << 8 | t << 16).toString(16).slice(1), n.is(s, "finite") && (f.opacity = s), f)) : {r: -1, g: -1, b: -1, hex: "none", error: 1, toString: o}
    }, n), n.hsb = s(function (e, t, r) {
        return n.hsb2rgb(e, t, r).hex
    }), n.hsl = s(function (e, t, r) {
        return n.hsl2rgb(e, t, r).hex
    }), n.rgb = s(function (e, t, n) {
        return"#" + (16777216 | n | t << 8 | e << 16).toString(16).slice(1)
    }), n.getColor = function (e) {
        var t = this.getColor.start = this.getColor.start || {h: 0, s: 1, b: e || .75}, n = this.hsb2rgb(t.h, t.s, t.b);
        return t.h += .075, t.h > 1 && (t.h = 0, t.s -= .2, t.s <= 0 && (this.getColor.start = {h: 0, s: 1, b: t.b})), n.hex
    }, n.getColor.reset = function () {
        delete this.start
    }, n.parsePathString = function (e) {
        if (!e)return null;
        var t = Ct(e);
        if (t.arr)return Lt(t.arr);
        var r = {a: 7, c: 6, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, z: 0}, i = [];
        return n.is(e, $) && n.is(e[0], $) && (i = Lt(e)), i.length || P(e).replace(ut, function (e, t, n) {
            var s = [], o = t.toLowerCase();
            if (n.replace(ft, function (e, t) {
                t && s.push(+t)
            }), "m" == o && s.length > 2 && (i.push([t][O](s.splice(0, 2))), o = "l", t = "m" == t ? "l" : "L"), "r" == o)i.push([t][O](s)); else for (; s.length >= r[o] && (i.push([t][O](s.splice(0, r[o]))), r[o]););
        }), i.toString = n._path2string, t.arr = Lt(i), i
    }, n.parseTransformString = s(function (e) {
        if (!e)return null;
        var t = [];
        return n.is(e, $) && n.is(e[0], $) && (t = Lt(e)), t.length || P(e).replace(at, function (e, n, r) {
            var i = [];
            F.call(n), r.replace(ft, function (e, t) {
                t && i.push(+t)
            }), t.push([n][O](i))
        }), t.toString = n._path2string, t
    });
    var Ct = function (e) {
        var t = Ct.ps = Ct.ps || {};
        return t[e] ? t[e].sleep = 100 : t[e] = {sleep: 100}, setTimeout(function () {
            for (var n in t)t[N](n) && n != e && (t[n].sleep--, !t[n].sleep && delete t[n])
        }), t[e]
    };
    n.findDotsAtSegment = function (e, t, n, r, i, s, o, u, a) {
        var f = 1 - a, l = z(f, 3), c = z(f, 2), h = a * a, p = h * a, d = l * e + 3 * c * a * n + 3 * f * a * a * i + p * o, v = l * t + 3 * c * a * r + 3 * f * a * a * s + p * u, m = e + 2 * a * (n - e) + h * (i - 2 * n + e), g = t + 2 * a * (r - t) + h * (s - 2 * r + t), y = n + 2 * a * (i - n) + h * (o - 2 * i + n), b = r + 2 * a * (s - r) + h * (u - 2 * s + r), w = f * e + a * n, E = f * t + a * r, S = f * i + a * o, x = f * s + a * u, T = 90 - 180 * I.atan2(m - y, g - b) / W;
        return(m > y || b > g) && (T += 180), {x: d, y: v, m: {x: m, y: g}, n: {x: y, y: b}, start: {x: w, y: E}, end: {x: S, y: x}, alpha: T}
    }, n.bezierBBox = function (e, t, r, i, s, o, u, a) {
        n.is(e, "array") || (e = [e, t, r, i, s, o, u, a]);
        var f = Ht.apply(null, e);
        return{x: f.min.x, y: f.min.y, x2: f.max.x, y2: f.max.y, width: f.max.x - f.min.x, height: f.max.y - f.min.y}
    }, n.isPointInsideBBox = function (e, t, n) {
        return t >= e.x && t <= e.x2 && n >= e.y && n <= e.y2
    }, n.isBBoxIntersect = function (e, t) {
        var r = n.isPointInsideBBox;
        return r(t, e.x, e.y) || r(t, e.x2, e.y) || r(t, e.x, e.y2) || r(t, e.x2, e.y2) || r(e, t.x, t.y) || r(e, t.x2, t.y) || r(e, t.x, t.y2) || r(e, t.x2, t.y2) || (e.x < t.x2 && e.x > t.x || t.x < e.x2 && t.x > e.x) && (e.y < t.y2 && e.y > t.y || t.y < e.y2 && t.y > e.y)
    }, n.pathIntersection = function (e, t) {
        return p(e, t)
    }, n.pathIntersectionNumber = function (e, t) {
        return p(e, t, 1)
    }, n.isPointInsidePath = function (e, t, r) {
        var i = n.pathBBox(e);
        return n.isPointInsideBBox(i, t, r) && p(e, [
            ["M", t, r],
            ["H", i.x2 + 10]
        ], 1) % 2 == 1
    }, n._removedFactory = function (e) {
        return function () {
            t("raphael.log", null, "Raphaël: you are calling to method “" + e + "” of removed object", e)
        }
    };
    var kt = n.pathBBox = function (e) {
        var t = Ct(e);
        if (t.bbox)return r(t.bbox);
        if (!e)return{x: 0, y: 0, width: 0, height: 0, x2: 0, y2: 0};
        e = Bt(e);
        for (var n, i = 0, s = 0, o = [], u = [], a = 0, f = e.length; f > a; a++)if (n = e[a], "M" == n[0])i = n[1], s = n[2], o.push(i), u.push(s); else {
            var l = Ht(i, s, n[1], n[2], n[3], n[4], n[5], n[6]);
            o = o[O](l.min.x, l.max.x), u = u[O](l.min.y, l.max.y), i = n[5], s = n[6]
        }
        var c = R[A](0, o), h = R[A](0, u), p = q[A](0, o), d = q[A](0, u), v = p - c, m = d - h, g = {x: c, y: h, x2: p, y2: d, width: v, height: m, cx: c + v / 2, cy: h + m / 2};
        return t.bbox = r(g), g
    }, Lt = function (e) {
        var t = r(e);
        return t.toString = n._path2string, t
    }, At = n._pathToRelative = function (e) {
        var t = Ct(e);
        if (t.rel)return Lt(t.rel);
        n.is(e, $) && n.is(e && e[0], $) || (e = n.parsePathString(e));
        var r = [], i = 0, s = 0, o = 0, u = 0, a = 0;
        "M" == e[0][0] && (i = e[0][1], s = e[0][2], o = i, u = s, a++, r.push(["M", i, s]));
        for (var f = a, l = e.length; l > f; f++) {
            var c = r[f] = [], h = e[f];
            if (h[0] != F.call(h[0]))switch (c[0] = F.call(h[0]), c[0]) {
                case"a":
                    c[1] = h[1], c[2] = h[2], c[3] = h[3], c[4] = h[4], c[5] = h[5], c[6] = +(h[6] - i).toFixed(3), c[7] = +(h[7] - s).toFixed(3);
                    break;
                case"v":
                    c[1] = +(h[1] - s).toFixed(3);
                    break;
                case"m":
                    o = h[1], u = h[2];
                default:
                    for (var p = 1, d = h.length; d > p; p++)c[p] = +(h[p] - (p % 2 ? i : s)).toFixed(3)
            } else {
                c = r[f] = [], "m" == h[0] && (o = h[1] + i, u = h[2] + s);
                for (var v = 0, m = h.length; m > v; v++)r[f][v] = h[v]
            }
            var g = r[f].length;
            switch (r[f][0]) {
                case"z":
                    i = o, s = u;
                    break;
                case"h":
                    i += +r[f][g - 1];
                    break;
                case"v":
                    s += +r[f][g - 1];
                    break;
                default:
                    i += +r[f][g - 2], s += +r[f][g - 1]
            }
        }
        return r.toString = n._path2string, t.rel = Lt(r), r
    }, Ot = n._pathToAbsolute = function (e) {
        var t = Ct(e);
        if (t.abs)return Lt(t.abs);
        if (n.is(e, $) && n.is(e && e[0], $) || (e = n.parsePathString(e)), !e || !e.length)return[
            ["M", 0, 0]
        ];
        var r = [], i = 0, s = 0, o = 0, a = 0, f = 0;
        "M" == e[0][0] && (i = +e[0][1], s = +e[0][2], o = i, a = s, f++, r[0] = ["M", i, s]);
        for (var l, c, h = 3 == e.length && "M" == e[0][0] && "R" == e[1][0].toUpperCase() && "Z" == e[2][0].toUpperCase(), p = f, d = e.length; d > p; p++) {
            if (r.push(l = []), c = e[p], c[0] != tt.call(c[0]))switch (l[0] = tt.call(c[0]), l[0]) {
                case"A":
                    l[1] = c[1], l[2] = c[2], l[3] = c[3], l[4] = c[4], l[5] = c[5], l[6] = +(c[6] + i), l[7] = +(c[7] + s);
                    break;
                case"V":
                    l[1] = +c[1] + s;
                    break;
                case"H":
                    l[1] = +c[1] + i;
                    break;
                case"R":
                    for (var v = [i, s][O](c.slice(1)), m = 2, g = v.length; g > m; m++)v[m] = +v[m] + i, v[++m] = +v[m] + s;
                    r.pop(), r = r[O](u(v, h));
                    break;
                case"M":
                    o = +c[1] + i, a = +c[2] + s;
                default:
                    for (m = 1, g = c.length; g > m; m++)l[m] = +c[m] + (m % 2 ? i : s)
            } else if ("R" == c[0])v = [i, s][O](c.slice(1)), r.pop(), r = r[O](u(v, h)), l = ["R"][O](c.slice(-2)); else for (var y = 0, b = c.length; b > y; y++)l[y] = c[y];
            switch (l[0]) {
                case"Z":
                    i = o, s = a;
                    break;
                case"H":
                    i = l[1];
                    break;
                case"V":
                    s = l[1];
                    break;
                case"M":
                    o = l[l.length - 2], a = l[l.length - 1];
                default:
                    i = l[l.length - 2], s = l[l.length - 1]
            }
        }
        return r.toString = n._path2string, t.abs = Lt(r), r
    }, Mt = function (e, t, n, r) {
        return[e, t, n, r, n, r]
    }, _t = function (e, t, n, r, i, s) {
        var o = 1 / 3, u = 2 / 3;
        return[o * e + u * n, o * t + u * r, o * i + u * n, o * s + u * r, i, s]
    }, Dt = function (e, t, n, r, i, o, u, a, f, l) {
        var c, h = 120 * W / 180, p = W / 180 * (+i || 0), d = [], v = s(function (e, t, n) {
            var r = e * I.cos(n) - t * I.sin(n), i = e * I.sin(n) + t * I.cos(n);
            return{x: r, y: i}
        });
        if (l)T = l[0], N = l[1], S = l[2], x = l[3]; else {
            c = v(e, t, -p), e = c.x, t = c.y, c = v(a, f, -p), a = c.x, f = c.y;
            var m = (I.cos(W / 180 * i), I.sin(W / 180 * i), (e - a) / 2), g = (t - f) / 2, y = m * m / (n * n) + g * g / (r * r);
            y > 1 && (y = I.sqrt(y), n = y * n, r = y * r);
            var b = n * n, w = r * r, E = (o == u ? -1 : 1) * I.sqrt(U((b * w - b * g * g - w * m * m) / (b * g * g + w * m * m))), S = E * n * g / r + (e + a) / 2, x = E * -r * m / n + (t + f) / 2, T = I.asin(((t - x) / r).toFixed(9)), N = I.asin(((f - x) / r).toFixed(9));
            T = S > e ? W - T : T, N = S > a ? W - N : N, 0 > T && (T = 2 * W + T), 0 > N && (N = 2 * W + N), u && T > N && (T -= 2 * W), !u && N > T && (N -= 2 * W)
        }
        var C = N - T;
        if (U(C) > h) {
            var k = N, L = a, A = f;
            N = T + h * (u && N > T ? 1 : -1), a = S + n * I.cos(N), f = x + r * I.sin(N), d = Dt(a, f, n, r, i, 0, u, L, A, [N, k, S, x])
        }
        C = N - T;
        var M = I.cos(T), _ = I.sin(T), D = I.cos(N), P = I.sin(N), B = I.tan(C / 4), j = 4 / 3 * n * B, F = 4 / 3 * r * B, q = [e, t], R = [e + j * _, t - F * M], z = [a + j * P, f - F * D], X = [a, f];
        if (R[0] = 2 * q[0] - R[0], R[1] = 2 * q[1] - R[1], l)return[R, z, X][O](d);
        d = [R, z, X][O](d).join()[H](",");
        for (var V = [], $ = 0, J = d.length; J > $; $++)V[$] = $ % 2 ? v(d[$ - 1], d[$], p).y : v(d[$], d[$ + 1], p).x;
        return V
    }, Pt = function (e, t, n, r, i, s, o, u, a) {
        var f = 1 - a;
        return{x: z(f, 3) * e + 3 * z(f, 2) * a * n + 3 * f * a * a * i + z(a, 3) * o, y: z(f, 3) * t + 3 * z(f, 2) * a * r + 3 * f * a * a * s + z(a, 3) * u}
    }, Ht = s(function (e, t, n, r, i, s, o, u) {
        var a, f = i - 2 * n + e - (o - 2 * i + n), l = 2 * (n - e) - 2 * (i - n), c = e - n, h = (-l + I.sqrt(l * l - 4 * f * c)) / 2 / f, p = (-l - I.sqrt(l * l - 4 * f * c)) / 2 / f, d = [t, u], v = [e, o];
        return U(h) > "1e12" && (h = .5), U(p) > "1e12" && (p = .5), h > 0 && 1 > h && (a = Pt(e, t, n, r, i, s, o, u, h), v.push(a.x), d.push(a.y)), p > 0 && 1 > p && (a = Pt(e, t, n, r, i, s, o, u, p), v.push(a.x), d.push(a.y)), f = s - 2 * r + t - (u - 2 * s + r), l = 2 * (r - t) - 2 * (s - r), c = t - r, h = (-l + I.sqrt(l * l - 4 * f * c)) / 2 / f, p = (-l - I.sqrt(l * l - 4 * f * c)) / 2 / f, U(h) > "1e12" && (h = .5), U(p) > "1e12" && (p = .5), h > 0 && 1 > h && (a = Pt(e, t, n, r, i, s, o, u, h), v.push(a.x), d.push(a.y)), p > 0 && 1 > p && (a = Pt(e, t, n, r, i, s, o, u, p), v.push(a.x), d.push(a.y)), {min: {x: R[A](0, v), y: R[A](0, d)}, max: {x: q[A](0, v), y: q[A](0, d)}}
    }), Bt = n._path2curve = s(function (e, t) {
        var n = !t && Ct(e);
        if (!t && n.curve)return Lt(n.curve);
        for (var r = Ot(e), i = t && Ot(t), s = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null}, o = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null}, u = function (e, t, n) {
            var r, i, s = {T: 1, Q: 1};
            if (!e)return["C", t.x, t.y, t.x, t.y, t.x, t.y];
            switch (!(e[0]in s) && (t.qx = t.qy = null), e[0]) {
                case"M":
                    t.X = e[1], t.Y = e[2];
                    break;
                case"A":
                    e = ["C"][O](Dt[A](0, [t.x, t.y][O](e.slice(1))));
                    break;
                case"S":
                    "C" == n || "S" == n ? (r = 2 * t.x - t.bx, i = 2 * t.y - t.by) : (r = t.x, i = t.y), e = ["C", r, i][O](e.slice(1));
                    break;
                case"T":
                    "Q" == n || "T" == n ? (t.qx = 2 * t.x - t.qx, t.qy = 2 * t.y - t.qy) : (t.qx = t.x, t.qy = t.y), e = ["C"][O](_t(t.x, t.y, t.qx, t.qy, e[1], e[2]));
                    break;
                case"Q":
                    t.qx = e[1], t.qy = e[2], e = ["C"][O](_t(t.x, t.y, e[1], e[2], e[3], e[4]));
                    break;
                case"L":
                    e = ["C"][O](Mt(t.x, t.y, e[1], e[2]));
                    break;
                case"H":
                    e = ["C"][O](Mt(t.x, t.y, e[1], t.y));
                    break;
                case"V":
                    e = ["C"][O](Mt(t.x, t.y, t.x, e[1]));
                    break;
                case"Z":
                    e = ["C"][O](Mt(t.x, t.y, t.X, t.Y))
            }
            return e
        }, a = function (e, t) {
            if (e[t].length > 7) {
                e[t].shift();
                for (var n = e[t]; n.length;)e.splice(t++, 0, ["C"][O](n.splice(0, 6)));
                e.splice(t, 1), c = q(r.length, i && i.length || 0)
            }
        }, f = function (e, t, n, s, o) {
            e && t && "M" == e[o][0] && "M" != t[o][0] && (t.splice(o, 0, ["M", s.x, s.y]), n.bx = 0, n.by = 0, n.x = e[o][1], n.y = e[o][2], c = q(r.length, i && i.length || 0))
        }, l = 0, c = q(r.length, i && i.length || 0); c > l; l++) {
            r[l] = u(r[l], s), a(r, l), i && (i[l] = u(i[l], o)), i && a(i, l), f(r, i, s, o, l), f(i, r, o, s, l);
            var h = r[l], p = i && i[l], d = h.length, v = i && p.length;
            s.x = h[d - 2], s.y = h[d - 1], s.bx = Z(h[d - 4]) || s.x, s.by = Z(h[d - 3]) || s.y, o.bx = i && (Z(p[v - 4]) || o.x), o.by = i && (Z(p[v - 3]) || o.y), o.x = i && p[v - 2], o.y = i && p[v - 1]
        }
        return i || (n.curve = Lt(r)), i ? [r, i] : r
    }, null, Lt), jt = (n._parseDots = s(function (e) {
        for (var t = [], r = 0, i = e.length; i > r; r++) {
            var s = {}, o = e[r].match(/^([^:]*):?([\d\.]*)/);
            if (s.color = n.getRGB(o[1]), s.color.error)return null;
            s.color = s.color.hex, o[2] && (s.offset = o[2] + "%"), t.push(s)
        }
        for (r = 1, i = t.length - 1; i > r; r++)if (!t[r].offset) {
            for (var u = Z(t[r - 1].offset || 0), a = 0, f = r + 1; i > f; f++)if (t[f].offset) {
                a = t[f].offset;
                break
            }
            a || (a = 100, f = i), a = Z(a);
            for (var l = (a - u) / (f - r + 1); f > r; r++)u += l, t[r].offset = u + "%"
        }
        return t
    }), n._tear = function (e, t) {
        e == t.top && (t.top = e.prev), e == t.bottom && (t.bottom = e.next), e.next && (e.next.prev = e.prev), e.prev && (e.prev.next = e.next)
    }), Ft = (n._tofront = function (e, t) {
        t.top !== e && (jt(e, t), e.next = null, e.prev = t.top, t.top.next = e, t.top = e)
    }, n._toback = function (e, t) {
        t.bottom !== e && (jt(e, t), e.next = t.bottom, e.prev = null, t.bottom.prev = e, t.bottom = e)
    }, n._insertafter = function (e, t, n) {
        jt(e, n), t == n.top && (n.top = e), t.next && (t.next.prev = e), e.next = t.next, e.prev = t, t.next = e
    }, n._insertbefore = function (e, t, n) {
        jt(e, n), t == n.bottom && (n.bottom = e), t.prev && (t.prev.next = e), e.prev = t.prev, t.prev = e, e.next = t
    }, n.toMatrix = function (e, t) {
        var n = kt(e), r = {_: {transform: _}, getBBox: function () {
            return n
        }};
        return It(r, t), r.matrix
    }), It = (n.transformPath = function (e, t) {
        return gt(e, Ft(e, t))
    }, n._extractTransform = function (e, t) {
        if (null == t)return e._.transform;
        t = P(t).replace(/\.{3}|\u2026/g, e._.transform || _);
        var r = n.parseTransformString(t), i = 0, s = 0, o = 0, u = 1, a = 1, f = e._, l = new d;
        if (f.transform = r || [], r)for (var c = 0, h = r.length; h > c; c++) {
            var p, v, m, g, y, b = r[c], w = b.length, E = P(b[0]).toLowerCase(), S = b[0] != E, x = S ? l.invert() : 0;
            "t" == E && 3 == w ? S ? (p = x.x(0, 0), v = x.y(0, 0), m = x.x(b[1], b[2]), g = x.y(b[1], b[2]), l.translate(m - p, g - v)) : l.translate(b[1], b[2]) : "r" == E ? 2 == w ? (y = y || e.getBBox(1), l.rotate(b[1], y.x + y.width / 2, y.y + y.height / 2), i += b[1]) : 4 == w && (S ? (m = x.x(b[2], b[3]), g = x.y(b[2], b[3]), l.rotate(b[1], m, g)) : l.rotate(b[1], b[2], b[3]), i += b[1]) : "s" == E ? 2 == w || 3 == w ? (y = y || e.getBBox(1), l.scale(b[1], b[w - 1], y.x + y.width / 2, y.y + y.height / 2), u *= b[1], a *= b[w - 1]) : 5 == w && (S ? (m = x.x(b[3], b[4]), g = x.y(b[3], b[4]), l.scale(b[1], b[2], m, g)) : l.scale(b[1], b[2], b[3], b[4]), u *= b[1], a *= b[2]) : "m" == E && 7 == w && l.add(b[1], b[2], b[3], b[4], b[5], b[6]), f.dirtyT = 1, e.matrix = l
        }
        e.matrix = l, f.sx = u, f.sy = a, f.deg = i, f.dx = s = l.e, f.dy = o = l.f, 1 == u && 1 == a && !i && f.bbox ? (f.bbox.x += +s, f.bbox.y += +o) : f.dirtyT = 1
    }), qt = function (e) {
        var t = e[0];
        switch (t.toLowerCase()) {
            case"t":
                return[t, 0, 0];
            case"m":
                return[t, 1, 0, 0, 1, 0, 0];
            case"r":
                return 4 == e.length ? [t, 0, e[2], e[3]] : [t, 0];
            case"s":
                return 5 == e.length ? [t, 1, 1, e[3], e[4]] : 3 == e.length ? [t, 1, 1] : [t, 1]
        }
    }, Rt = n._equaliseTransform = function (e, t) {
        t = P(t).replace(/\.{3}|\u2026/g, e), e = n.parseTransformString(e) || [], t = n.parseTransformString(t) || [];
        for (var r, i, s, o, u = q(e.length, t.length), a = [], f = [], l = 0; u > l; l++) {
            if (s = e[l] || qt(t[l]), o = t[l] || qt(s), s[0] != o[0] || "r" == s[0].toLowerCase() && (s[2] != o[2] || s[3] != o[3]) || "s" == s[0].toLowerCase() && (s[3] != o[3] || s[4] != o[4]))return;
            for (a[l] = [], f[l] = [], r = 0, i = q(s.length, o.length); i > r; r++)r in s && (a[l][r] = s[r]), r in o && (f[l][r] = o[r])
        }
        return{from: a, to: f}
    };
    n._getContainer = function (e, t, r, i) {
        var s;
        return s = null != i || n.is(e, "object") ? e : C.doc.getElementById(e), null != s ? s.tagName ? null == t ? {container: s, width: s.style.pixelWidth || s.offsetWidth, height: s.style.pixelHeight || s.offsetHeight} : {container: s, width: t, height: r} : {container: 1, x: e, y: t, width: r, height: i} : void 0
    }, n.pathToRelative = At, n._engine = {}, n.path2curve = Bt, n.matrix = function (e, t, n, r, i, s) {
        return new d(e, t, n, r, i, s)
    }, function (e) {
        function t(e) {
            return e[0] * e[0] + e[1] * e[1]
        }

        function r(e) {
            var n = I.sqrt(t(e));
            e[0] && (e[0] /= n), e[1] && (e[1] /= n)
        }

        e.add = function (e, t, n, r, i, s) {
            var o, u, a, f, l = [
                [],
                [],
                []
            ], c = [
                [this.a, this.c, this.e],
                [this.b, this.d, this.f],
                [0, 0, 1]
            ], h = [
                [e, n,
                    i],
                [t, r, s],
                [0, 0, 1]
            ];
            for (e && e instanceof d && (h = [
                [e.a, e.c, e.e],
                [e.b, e.d, e.f],
                [0, 0, 1]
            ]), o = 0; 3 > o; o++)for (u = 0; 3 > u; u++) {
                for (f = 0, a = 0; 3 > a; a++)f += c[o][a] * h[a][u];
                l[o][u] = f
            }
            this.a = l[0][0], this.b = l[1][0], this.c = l[0][1], this.d = l[1][1], this.e = l[0][2], this.f = l[1][2]
        }, e.invert = function () {
            var e = this, t = e.a * e.d - e.b * e.c;
            return new d(e.d / t, -e.b / t, -e.c / t, e.a / t, (e.c * e.f - e.d * e.e) / t, (e.b * e.e - e.a * e.f) / t)
        }, e.clone = function () {
            return new d(this.a, this.b, this.c, this.d, this.e, this.f)
        }, e.translate = function (e, t) {
            this.add(1, 0, 0, 1, e, t)
        }, e.scale = function (e, t, n, r) {
            null == t && (t = e), (n || r) && this.add(1, 0, 0, 1, n, r), this.add(e, 0, 0, t, 0, 0), (n || r) && this.add(1, 0, 0, 1, -n, -r)
        }, e.rotate = function (e, t, r) {
            e = n.rad(e), t = t || 0, r = r || 0;
            var i = +I.cos(e).toFixed(9), s = +I.sin(e).toFixed(9);
            this.add(i, s, -s, i, t, r), this.add(1, 0, 0, 1, -t, -r)
        }, e.x = function (e, t) {
            return e * this.a + t * this.c + this.e
        }, e.y = function (e, t) {
            return e * this.b + t * this.d + this.f
        }, e.get = function (e) {
            return+this[P.fromCharCode(97 + e)].toFixed(4)
        }, e.toString = function () {
            return n.svg ? "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" : [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join()
        }, e.toFilter = function () {
            return"progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) + ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) + ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')"
        }, e.offset = function () {
            return[this.e.toFixed(4), this.f.toFixed(4)]
        }, e.split = function () {
            var e = {};
            e.dx = this.e, e.dy = this.f;
            var i = [
                [this.a, this.c],
                [this.b, this.d]
            ];
            e.scalex = I.sqrt(t(i[0])), r(i[0]), e.shear = i[0][0] * i[1][0] + i[0][1] * i[1][1], i[1] = [i[1][0] - i[0][0] * e.shear, i[1][1] - i[0][1] * e.shear], e.scaley = I.sqrt(t(i[1])), r(i[1]), e.shear /= e.scaley;
            var s = -i[0][1], o = i[1][1];
            return 0 > o ? (e.rotate = n.deg(I.acos(o)), 0 > s && (e.rotate = 360 - e.rotate)) : e.rotate = n.deg(I.asin(s)), e.isSimple = !(+e.shear.toFixed(9) || e.scalex.toFixed(9) != e.scaley.toFixed(9) && e.rotate), e.isSuperSimple = !+e.shear.toFixed(9) && e.scalex.toFixed(9) == e.scaley.toFixed(9) && !e.rotate, e.noRotation = !+e.shear.toFixed(9) && !e.rotate, e
        }, e.toTransformString = function (e) {
            var t = e || this[H]();
            return t.isSimple ? (t.scalex = +t.scalex.toFixed(4), t.scaley = +t.scaley.toFixed(4), t.rotate = +t.rotate.toFixed(4), (t.dx || t.dy ? "t" + [t.dx, t.dy] : _) + (1 != t.scalex || 1 != t.scaley ? "s" + [t.scalex, t.scaley, 0, 0] : _) + (t.rotate ? "r" + [t.rotate, 0, 0] : _)) : "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)]
        }
    }(d.prototype);
    var Ut = navigator.userAgent.match(/Version\/(.*?)\s/) || navigator.userAgent.match(/Chrome\/(\d+)/);
    E.safari = "Apple Computer, Inc." == navigator.vendor && (Ut && Ut[1] < 4 || "iP" == navigator.platform.slice(0, 2)) || "Google Inc." == navigator.vendor && Ut && Ut[1] < 8 ? function () {
        var e = this.rect(-99, -99, this.width + 99, this.height + 99).attr({stroke: "none"});
        setTimeout(function () {
            e.remove()
        })
    } : ht;
    for (var zt = function () {
        this.returnValue = !1
    }, Wt = function () {
        return this.originalEvent.preventDefault()
    }, Xt = function () {
        this.cancelBubble = !0
    }, Vt = function () {
        return this.originalEvent.stopPropagation()
    }, $t = function (e) {
        var t = C.doc.documentElement.scrollTop || C.doc.body.scrollTop, n = C.doc.documentElement.scrollLeft || C.doc.body.scrollLeft;
        return{x: e.clientX + n, y: e.clientY + t}
    }, Jt = function () {
        return C.doc.addEventListener ? function (e, t, n, r) {
            var i = function (e) {
                var t = $t(e);
                return n.call(r, e, t.x, t.y)
            };
            if (e.addEventListener(t, i, !1), M && j[t]) {
                var s = function (t) {
                    for (var i = $t(t), s = t, o = 0, u = t.targetTouches && t.targetTouches.length; u > o; o++)if (t.targetTouches[o].target == e) {
                        t = t.targetTouches[o], t.originalEvent = s, t.preventDefault = Wt, t.stopPropagation = Vt;
                        break
                    }
                    return n.call(r, t, i.x, i.y)
                };
                e.addEventListener(j[t], s, !1)
            }
            return function () {
                return e.removeEventListener(t, i, !1), M && j[t] && e.removeEventListener(j[t], i, !1), !0
            }
        } : C.doc.attachEvent ? function (e, t, n, r) {
            var i = function (e) {
                e = e || C.win.event;
                var t = C.doc.documentElement.scrollTop || C.doc.body.scrollTop, i = C.doc.documentElement.scrollLeft || C.doc.body.scrollLeft, s = e.clientX + i, o = e.clientY + t;
                return e.preventDefault = e.preventDefault || zt, e.stopPropagation = e.stopPropagation || Xt, n.call(r, e, s, o)
            };
            e.attachEvent("on" + t, i);
            var s = function () {
                return e.detachEvent("on" + t, i), !0
            };
            return s
        } : void 0
    }(), Kt = [], Qt = function (e) {
        for (var n, r = e.clientX, i = e.clientY, s = C.doc.documentElement.scrollTop || C.doc.body.scrollTop, o = C.doc.documentElement.scrollLeft || C.doc.body.scrollLeft, u = Kt.length; u--;) {
            if (n = Kt[u], M && e.touches) {
                for (var a, f = e.touches.length; f--;)if (a = e.touches[f], a.identifier == n.el._drag.id) {
                    r = a.clientX, i = a.clientY, (e.originalEvent ? e.originalEvent : e).preventDefault();
                    break
                }
            } else e.preventDefault();
            var l, c = n.el.node, h = c.nextSibling, p = c.parentNode, d = c.style.display;
            C.win.opera && p.removeChild(c), c.style.display = "none", l = n.el.paper.getElementByPoint(r, i), c.style.display = d, C.win.opera && (h ? p.insertBefore(c, h) : p.appendChild(c)), l && t("raphael.drag.over." + n.el.id, n.el, l), r += o, i += s, t("raphael.drag.move." + n.el.id, n.move_scope || n.el, r - n.el._drag.x, i - n.el._drag.y, r, i, e)
        }
    }, Gt = function (e) {
        n.unmousemove(Qt).unmouseup(Gt);
        for (var r, i = Kt.length; i--;)r = Kt[i], r.el._drag = {}, t("raphael.drag.end." + r.el.id, r.end_scope || r.start_scope || r.move_scope || r.el, e);
        Kt = []
    }, Yt = n.el = {}, Zt = B.length; Zt--;)!function (e) {
        n[e] = Yt[e] = function (t, r) {
            return n.is(t, "function") && (this.events = this.events || [], this.events.push({name: e, f: t, unbind: Jt(this.shape || this.node || C.doc, e, t, r || this)})), this
        }, n["un" + e] = Yt["un" + e] = function (t) {
            for (var r = this.events || [], i = r.length; i--;)r[i].name != e || !n.is(t, "undefined") && r[i].f != t || (r[i].unbind(), r.splice(i, 1), !r.length && delete this.events);
            return this
        }
    }(B[Zt]);
    Yt.data = function (e, r) {
        var i = lt[this.id] = lt[this.id] || {};
        if (0 == arguments.length)return i;
        if (1 == arguments.length) {
            if (n.is(e, "object")) {
                for (var s in e)e[N](s) && this.data(s, e[s]);
                return this
            }
            return t("raphael.data.get." + this.id, this, i[e], e), i[e]
        }
        return i[e] = r, t("raphael.data.set." + this.id, this, r, e), this
    }, Yt.removeData = function (e) {
        return null == e ? lt[this.id] = {} : lt[this.id] && delete lt[this.id][e], this
    }, Yt.getData = function () {
        return r(lt[this.id] || {})
    }, Yt.hover = function (e, t, n, r) {
        return this.mouseover(e, n).mouseout(t, r || n)
    }, Yt.unhover = function (e, t) {
        return this.unmouseover(e).unmouseout(t)
    };
    var en = [];
    Yt.drag = function (e, r, i, s, o, u) {
        function a(a) {
            (a.originalEvent || a).preventDefault();
            var f = a.clientX, l = a.clientY, c = C.doc.documentElement.scrollTop || C.doc.body.scrollTop, h = C.doc.documentElement.scrollLeft || C.doc.body.scrollLeft;
            if (this._drag.id = a.identifier, M && a.touches)for (var p, d = a.touches.length; d--;)if (p = a.touches[d], this._drag.id = p.identifier, p.identifier == this._drag.id) {
                f = p.clientX, l = p.clientY;
                break
            }
            this._drag.x = f + h, this._drag.y = l + c, !Kt.length && n.mousemove(Qt).mouseup(Gt), Kt.push({el: this, move_scope: s, start_scope: o, end_scope: u}), r && t.on("raphael.drag.start." + this.id, r), e && t.on("raphael.drag.move." + this.id, e), i && t.on("raphael.drag.end." + this.id, i), t("raphael.drag.start." + this.id, o || s || this, a.clientX + h, a.clientY + c, a)
        }

        return this._drag = {}, en.push({el: this, start: a}), this.mousedown(a), this
    }, Yt.onDragOver = function (e) {
        e ? t.on("raphael.drag.over." + this.id, e) : t.unbind("raphael.drag.over." + this.id)
    }, Yt.undrag = function () {
        for (var e = en.length; e--;)en[e].el == this && (this.unmousedown(en[e].start), en.splice(e, 1), t.unbind("raphael.drag.*." + this.id));
        !en.length && n.unmousemove(Qt).unmouseup(Gt), Kt = []
    }, E.circle = function (e, t, r) {
        var i = n._engine.circle(this, e || 0, t || 0, r || 0);
        return this.__set__ && this.__set__.push(i), i
    }, E.rect = function (e, t, r, i, s) {
        var o = n._engine.rect(this, e || 0, t || 0, r || 0, i || 0, s || 0);
        return this.__set__ && this.__set__.push(o), o
    }, E.ellipse = function (e, t, r, i) {
        var s = n._engine.ellipse(this, e || 0, t || 0, r || 0, i || 0);
        return this.__set__ && this.__set__.push(s), s
    }, E.path = function (e) {
        e && !n.is(e, V) && !n.is(e[0], $) && (e += _);
        var t = n._engine.path(n.format[A](n, arguments), this);
        return this.__set__ && this.__set__.push(t), t
    }, E.image = function (e, t, r, i, s) {
        var o = n._engine.image(this, e || "about:blank", t || 0, r || 0, i || 0, s || 0);
        return this.__set__ && this.__set__.push(o), o
    }, E.text = function (e, t, r) {
        var i = n._engine.text(this, e || 0, t || 0, P(r));
        return this.__set__ && this.__set__.push(i), i
    }, E.set = function (e) {
        !n.is(e, "array") && (e = Array.prototype.splice.call(arguments, 0, arguments.length));
        var t = new pn(e);
        return this.__set__ && this.__set__.push(t), t.paper = this, t.type = "set", t
    }, E.setStart = function (e) {
        this.__set__ = e || this.set()
    }, E.setFinish = function () {
        var e = this.__set__;
        return delete this.__set__, e
    }, E.setSize = function (e, t) {
        return n._engine.setSize.call(this, e, t)
    }, E.setViewBox = function (e, t, r, i, s) {
        return n._engine.setViewBox.call(this, e, t, r, i, s)
    }, E.top = E.bottom = null, E.raphael = n;
    var tn = function (e) {
        var t = e.getBoundingClientRect(), n = e.ownerDocument, r = n.body, i = n.documentElement, s = i.clientTop || r.clientTop || 0, o = i.clientLeft || r.clientLeft || 0, u = t.top + (C.win.pageYOffset || i.scrollTop || r.scrollTop) - s, a = t.left + (C.win.pageXOffset || i.scrollLeft || r.scrollLeft) - o;
        return{y: u, x: a}
    };
    E.getElementByPoint = function (e, t) {
        var n = this, r = n.canvas, i = C.doc.elementFromPoint(e, t);
        if (C.win.opera && "svg" == i.tagName) {
            var s = tn(r), o = r.createSVGRect();
            o.x = e - s.x, o.y = t - s.y, o.width = o.height = 1;
            var u = r.getIntersectionList(o, null);
            u.length && (i = u[u.length - 1])
        }
        if (!i)return null;
        for (; i.parentNode && i != r.parentNode && !i.raphael;)i = i.parentNode;
        return i == n.canvas.parentNode && (i = r), i = i && i.raphael ? n.getById(i.raphaelid) : null
    }, E.getElementsByBBox = function (e) {
        var t = this.set();
        return this.forEach(function (r) {
            n.isBBoxIntersect(r.getBBox(), e) && t.push(r)
        }), t
    }, E.getById = function (e) {
        for (var t = this.bottom; t;) {
            if (t.id == e)return t;
            t = t.next
        }
        return null
    }, E.forEach = function (e, t) {
        for (var n = this.bottom; n;) {
            if (e.call(t, n) === !1)return this;
            n = n.next
        }
        return this
    }, E.getElementsByPoint = function (e, t) {
        var n = this.set();
        return this.forEach(function (r) {
            r.isPointInside(e, t) && n.push(r)
        }), n
    }, Yt.isPointInside = function (e, t) {
        var r = this.realPath = mt[this.type](this);
        return this.attr("transform") && this.attr("transform").length && (r = n.transformPath(r, this.attr("transform"))), n.isPointInsidePath(r, e, t)
    }, Yt.getBBox = function (e) {
        if (this.removed)return{};
        var t = this._;
        return e ? ((t.dirty || !t.bboxwt) && (this.realPath = mt[this.type](this), t.bboxwt = kt(this.realPath), t.bboxwt.toString = v, t.dirty = 0), t.bboxwt) : ((t.dirty || t.dirtyT || !t.bbox) && ((t.dirty || !this.realPath) && (t.bboxwt = 0, this.realPath = mt[this.type](this)), t.bbox = kt(gt(this.realPath, this.matrix)), t.bbox.toString = v, t.dirty = t.dirtyT = 0), t.bbox)
    }, Yt.clone = function () {
        if (this.removed)return null;
        var e = this.paper[this.type]().attr(this.attr());
        return this.__set__ && this.__set__.push(e), e
    }, Yt.glow = function (e) {
        if ("text" == this.type)return null;
        e = e || {};
        var t = {width: (e.width || 10) + (+this.attr("stroke-width") || 1), fill: e.fill || !1, opacity: e.opacity || .5, offsetx: e.offsetx || 0, offsety: e.offsety || 0, color: e.color || "#000"}, n = t.width / 2, r = this.paper, i = r.set(), s = this.realPath || mt[this.type](this);
        s = this.matrix ? gt(s, this.matrix) : s;
        for (var o = 1; n + 1 > o; o++)i.push(r.path(s).attr({stroke: t.color, fill: t.fill ? t.color : "none", "stroke-linejoin": "round", "stroke-linecap": "round", "stroke-width": +(t.width / n * o).toFixed(3), opacity: +(t.opacity / n).toFixed(3)}));
        return i.insertBefore(this).translate(t.offsetx, t.offsety)
    };
    var nn = function (e, t, r, i, s, o, u, a, c) {
        return null == c ? f(e, t, r, i, s, o, u, a) : n.findDotsAtSegment(e, t, r, i, s, o, u, a, l(e, t, r, i, s, o, u, a, c))
    }, rn = function (e, t) {
        return function (r, i, s) {
            r = Bt(r);
            for (var o, u, a, f, l, c = "", h = {}, p = 0, d = 0, v = r.length; v > d; d++) {
                if (a = r[d], "M" == a[0])o = +a[1], u = +a[2]; else {
                    if (f = nn(o, u, a[1], a[2], a[3], a[4], a[5], a[6]), p + f > i) {
                        if (t && !h.start) {
                            if (l = nn(o, u, a[1], a[2], a[3], a[4], a[5], a[6], i - p), c += ["C" + l.start.x, l.start.y, l.m.x, l.m.y, l.x, l.y], s)return c;
                            h.start = c, c = ["M" + l.x, l.y + "C" + l.n.x, l.n.y, l.end.x, l.end.y, a[5], a[6]].join(), p += f, o = +a[5], u = +a[6];
                            continue
                        }
                        if (!e && !t)return l = nn(o, u, a[1], a[2], a[3], a[4], a[5], a[6], i - p), {x: l.x, y: l.y, alpha: l.alpha}
                    }
                    p += f, o = +a[5], u = +a[6]
                }
                c += a.shift() + a
            }
            return h.end = c, l = e ? p : t ? h : n.findDotsAtSegment(o, u, a[0], a[1], a[2], a[3], a[4], a[5], 1), l.alpha && (l = {x: l.x, y: l.y, alpha: l.alpha}), l
        }
    }, sn = rn(1), on = rn(), un = rn(0, 1);
    n.getTotalLength = sn, n.getPointAtLength = on, n.getSubpath = function (e, t, n) {
        if (this.getTotalLength(e) - n < 1e-6)return un(e, t).end;
        var r = un(e, n, 1);
        return t ? un(r, t).end : r
    }, Yt.getTotalLength = function () {
        var e = this.getPath();
        if (e)return this.node.getTotalLength ? this.node.getTotalLength() : sn(e)
    }, Yt.getPointAtLength = function (e) {
        var t = this.getPath();
        if (t)return on(t, e)
    }, Yt.getPath = function () {
        var e, t = n._getPath[this.type];
        if ("text" != this.type && "set" != this.type)return t && (e = t(this)), e
    }, Yt.getSubpath = function (e, t) {
        var r = this.getPath();
        if (r)return n.getSubpath(r, e, t)
    };
    var an = n.easing_formulas = {linear: function (e) {
        return e
    }, "<": function (e) {
        return z(e, 1.7)
    }, ">": function (e) {
        return z(e, .48)
    }, "<>": function (e) {
        var t = .48 - e / 1.04, n = I.sqrt(.1734 + t * t), r = n - t, i = z(U(r), 1 / 3) * (0 > r ? -1 : 1), s = -n - t, o = z(U(s), 1 / 3) * (0 > s ? -1 : 1), u = i + o + .5;
        return 3 * (1 - u) * u * u + u * u * u
    }, backIn: function (e) {
        var t = 1.70158;
        return e * e * ((t + 1) * e - t)
    }, backOut: function (e) {
        e -= 1;
        var t = 1.70158;
        return e * e * ((t + 1) * e + t) + 1
    }, elastic: function (e) {
        return e == !!e ? e : z(2, -10 * e) * I.sin(2 * (e - .075) * W / .3) + 1
    }, bounce: function (e) {
        var t, n = 7.5625, r = 2.75;
        return 1 / r > e ? t = n * e * e : 2 / r > e ? (e -= 1.5 / r, t = n * e * e + .75) : 2.5 / r > e ? (e -= 2.25 / r, t = n * e * e + .9375) : (e -= 2.625 / r, t = n * e * e + .984375), t
    }};
    an.easeIn = an["ease-in"] = an["<"], an.easeOut = an["ease-out"] = an[">"], an.easeInOut = an["ease-in-out"] = an["<>"], an["back-in"] = an.backIn, an["back-out"] = an.backOut;
    var fn = [], ln = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function (e) {
        setTimeout(e, 16)
    }, cn = function () {
        for (var e = +(new Date), r = 0; r < fn.length; r++) {
            var i = fn[r];
            if (!i.el.removed && !i.paused) {
                var s, o, u = e - i.start, a = i.ms, f = i.easing, l = i.from, c = i.diff, h = i.to, p = (i.t, i.el), d = {}, v = {};
                if (i.initstatus ? (u = (i.initstatus * i.anim.top - i.prev) / (i.percent - i.prev) * a, i.status = i.initstatus, delete i.initstatus, i.stop && fn.splice(r--, 1)) : i.status = (i.prev + (i.percent - i.prev) * (u / a)) / i.anim.top, !(0 > u))if (a > u) {
                    var m = f(u / a);
                    for (var g in l)if (l[N](g)) {
                        switch (rt[g]) {
                            case X:
                                s = +l[g] + m * a * c[g];
                                break;
                            case"colour":
                                s = "rgb(" + [hn(Y(l[g].r + m * a * c[g].r)), hn(Y(l[g].g + m * a * c[g].g)), hn(Y(l[g].b + m * a * c[g].b))].join(",") + ")";
                                break;
                            case"path":
                                s = [];
                                for (var b = 0, w = l[g].length; w > b; b++) {
                                    s[b] = [l[g][b][0]];
                                    for (var E = 1, S = l[g][b].length; S > E; E++)s[b][E] = +l[g][b][E] + m * a * c[g][b][E];
                                    s[b] = s[b].join(D)
                                }
                                s = s.join(D);
                                break;
                            case"transform":
                                if (c[g].real)for (s = [], b = 0, w = l[g].length; w > b; b++)for (s[b] = [l[g][b][0]], E = 1, S = l[g][b].length; S > E; E++)s[b][E] = l[g][b][E] + m * a * c[g][b][E]; else {
                                    var x = function (e) {
                                        return+l[g][e] + m * a * c[g][e]
                                    };
                                    s = [
                                        ["m", x(0), x(1), x(2), x(3), x(4), x(5)]
                                    ]
                                }
                                break;
                            case"csv":
                                if ("clip-rect" == g)for (s = [], b = 4; b--;)s[b] = +l[g][b] + m * a * c[g][b];
                                break;
                            default:
                                var T = [][O](l[g]);
                                for (s = [], b = p.paper.customAttributes[g].length; b--;)s[b] = +T[b] + m * a * c[g][b]
                        }
                        d[g] = s
                    }
                    p.attr(d), function (e, n, r) {
                        setTimeout(function () {
                            t("raphael.anim.frame." + e, n, r)
                        })
                    }(p.id, p, i.anim)
                } else {
                    if (function (e, r, i) {
                        setTimeout(function () {
                            t("raphael.anim.frame." + r.id, r, i), t("raphael.anim.finish." + r.id, r, i), n.is(e, "function") && e.call(r)
                        })
                    }(i.callback, p, i.anim), p.attr(h), fn.splice(r--, 1), i.repeat > 1 && !i.next) {
                        for (o in h)h[N](o) && (v[o] = i.totalOrigin[o]);
                        i.el.attr(v), y(i.anim, i.el, i.anim.percents[0], null, i.totalOrigin, i.repeat - 1)
                    }
                    i.next && !i.stop && y(i.anim, i.el, i.next, null, i.totalOrigin, i.repeat)
                }
            }
        }
        n.svg && p && p.paper && p.paper.safari(), fn.length && ln(cn)
    }, hn = function (e) {
        return e > 255 ? 255 : 0 > e ? 0 : e
    };
    Yt.animateWith = function (e, t, r, i, s, o) {
        var u = this;
        if (u.removed)return o && o.call(u), u;
        var a = r instanceof g ? r : n.animation(r, i, s, o);
        y(a, u, a.percents[0], null, u.attr());
        for (var f = 0, l = fn.length; l > f; f++)if (fn[f].anim == t && fn[f].el == e) {
            fn[l - 1].start = fn[f].start;
            break
        }
        return u
    }, Yt.onAnimation = function (e) {
        return e ? t.on("raphael.anim.frame." + this.id, e) : t.unbind("raphael.anim.frame." + this.id), this
    }, g.prototype.delay = function (e) {
        var t = new g(this.anim, this.ms);
        return t.times = this.times, t.del = +e || 0, t
    }, g.prototype.repeat = function (e) {
        var t = new g(this.anim, this.ms);
        return t.del = this.del, t.times = I.floor(q(e, 0)) || 1, t
    }, n.animation = function (e, t, r, i) {
        if (e instanceof g)return e;
        (n.is(r, "function") || !r) && (i = i || r || null, r = null), e = Object(e), t = +t || 0;
        var s, o, u = {};
        for (o in e)e[N](o) && Z(o) != o && Z(o) + "%" != o && (s = !0, u[o] = e[o]);
        return s ? (r && (u.easing = r), i && (u.callback = i), new g({100: u}, t)) : new g(e, t)
    }, Yt.animate = function (e, t, r, i) {
        var s = this;
        if (s.removed)return i && i.call(s), s;
        var o = e instanceof g ? e : n.animation(e, t, r, i);
        return y(o, s, o.percents[0], null, s.attr()), s
    }, Yt.setTime = function (e, t) {
        return e && null != t && this.status(e, R(t, e.ms) / e.ms), this
    }, Yt.status = function (e, t) {
        var n, r, i = [], s = 0;
        if (null != t)return y(e, this, -1, R(t, 1)), this;
        for (n = fn.length; n > s; s++)if (r = fn[s], r.el.id == this.id && (!e || r.anim == e)) {
            if (e)return r.status;
            i.push({anim: r.anim, status: r.status})
        }
        return e ? 0 : i
    }, Yt.pause = function (e) {
        for (var n = 0; n < fn.length; n++)fn[n].el.id != this.id || e && fn[n].anim != e || t("raphael.anim.pause." + this.id, this, fn[n].anim) !== !1 && (fn[n].paused = !0);
        return this
    }, Yt.resume = function (e) {
        for (var n = 0; n < fn.length; n++)if (fn[n].el.id == this.id && (!e || fn[n].anim == e)) {
            var r = fn[n];
            t("raphael.anim.resume." + this.id, this, r.anim) !== !1 && (delete r.paused, this.status(r.anim, r.status))
        }
        return this
    }, Yt.stop = function (e) {
        for (var n = 0; n < fn.length; n++)fn[n].el.id != this.id || e && fn[n].anim != e || t("raphael.anim.stop." + this.id, this, fn[n].anim) !== !1 && fn.splice(n--, 1);
        return this
    }, t.on("raphael.remove", b), t.on("raphael.clear", b), Yt.toString = function () {
        return"Raphaël’s object"
    };
    var pn = function (e) {
        if (this.items = [], this.length = 0, this.type = "set", e)for (var t = 0, n = e.length; n > t; t++)!e[t] || e[t].constructor != Yt.constructor && e[t].constructor != pn || (this[this.items.length] = this.items[this.items.length] = e[t], this.length++)
    }, dn = pn.prototype;
    dn.push = function () {
        for (var e, t, n = 0, r = arguments.length; r > n; n++)e = arguments[n], !e || e.constructor != Yt.constructor && e.constructor != pn || (t = this.items.length, this[t] = this.items[t] = e, this.length++);
        return this
    }, dn.pop = function () {
        return this.length && delete this[this.length--], this.items.pop()
    }, dn.forEach = function (e, t) {
        for (var n = 0, r = this.items.length; r > n; n++)if (e.call(t, this.items[n], n) === !1)return this;
        return this
    };
    for (var vn in Yt)Yt[N](vn) && (dn[vn] = function (e) {
        return function () {
            var t = arguments;
            return this.forEach(function (n) {
                n[e][A](n, t)
            })
        }
    }(vn));
    return dn.attr = function (e, t) {
        if (e && n.is(e, $) && n.is(e[0], "object"))for (var r = 0, i = e.length; i > r; r++)this.items[r].attr(e[r]); else for (var s = 0, o = this.items.length; o > s; s++)this.items[s].attr(e, t);
        return this
    }, dn.clear = function () {
        for (; this.length;)this.pop()
    }, dn.splice = function (e, t) {
        e = 0 > e ? q(this.length + e, 0) : e, t = q(0, R(this.length - e, t));
        var n, r = [], i = [], s = [];
        for (n = 2; n < arguments.length; n++)s.push(arguments[n]);
        for (n = 0; t > n; n++)i.push(this[e + n]);
        for (; n < this.length - e; n++)r.push(this[e + n]);
        var o = s.length;
        for (n = 0; n < o + r.length; n++)this.items[e + n] = this[e + n] = o > n ? s[n] : r[n - o];
        for (n = this.items.length = this.length -= t - o; this[n];)delete this[n++];
        return new pn(i)
    }, dn.exclude = function (e) {
        for (var t = 0, n = this.length; n > t; t++)if (this[t] == e)return this.splice(t, 1), !0
    }, dn.animate = function (e, t, r, i) {
        (n.is(r, "function") || !r) && (i = r || null);
        var s, o, u = this.items.length, a = u, f = this;
        if (!u)return this;
        i && (o = function () {
            !--u && i.call(f)
        }), r = n.is(r, V) ? r : o;
        var l = n.animation(e, t, r, o);
        for (s = this.items[--a].animate(l); a--;)this.items[a] && !this.items[a].removed && this.items[a].animateWith(s, l, l), this.items[a] && !this.items[a].removed || u--;
        return this
    }, dn.insertAfter = function (e) {
        for (var t = this.items.length; t--;)this.items[t].insertAfter(e);
        return this
    }, dn.getBBox = function () {
        for (var e = [], t = [], n = [], r = [], i = this.items.length; i--;)if (!this.items[i].removed) {
            var s = this.items[i].getBBox();
            e.push(s.x), t.push(s.y), n.push(s.x + s.width), r.push(s.y + s.height)
        }
        return e = R[A](0, e), t = R[A](0, t), n = q[A](0, n), r = q[A](0, r), {x: e, y: t, x2: n, y2: r, width: n - e, height: r - t}
    }, dn.clone = function (e) {
        e = this.paper.set();
        for (var t = 0, n = this.items.length; n > t; t++)e.push(this.items[t].clone());
        return e
    }, dn.toString = function () {
        return"Raphaël‘s set"
    }, dn.glow = function (e) {
        var t = this.paper.set();
        return this.forEach(function (n) {
            var r = n.glow(e);
            null != r && r.forEach(function (e) {
                t.push(e)
            })
        }), t
    }, dn.isPointInside = function (e, t) {
        var n = !1;
        return this.forEach(function (r) {
            return r.isPointInside(e, t) ? (n = !0, !1) : void 0
        }), n
    }, n.registerFont = function (e) {
        if (!e.face)return e;
        this.fonts = this.fonts || {};
        var t = {w: e.w, face: {}, glyphs: {}}, n = e.face["font-family"];
        for (var r in e.face)e.face[N](r) && (t.face[r] = e.face[r]);
        if (this.fonts[n] ? this.fonts[n].push(t) : this.fonts[n] = [t], !e.svg) {
            t.face["units-per-em"] = et(e.face["units-per-em"], 10);
            for (var i in e.glyphs)if (e.glyphs[N](i)) {
                var s = e.glyphs[i];
                if (t.glyphs[i] = {w: s.w, k: {}, d: s.d && "M" + s.d.replace(/[mlcxtrv]/g, function (e) {
                    return{l: "L", c: "C", x: "z", t: "m", r: "l", v: "c"}[e] || "M"
                }) + "z"}, s.k)for (var o in s.k)s[N](o) && (t.glyphs[i].k[o] = s.k[o])
            }
        }
        return e
    }, E.getFont = function (e, t, r, i) {
        if (i = i || "normal", r = r || "normal", t = +t || {normal: 400, bold: 700, lighter: 300, bolder: 800}[t] || 400, n.fonts) {
            var s = n.fonts[e];
            if (!s) {
                var o = new RegExp("(^|\\s)" + e.replace(/[^\w\d\s+!~.:_-]/g, _) + "(\\s|$)", "i");
                for (var u in n.fonts)if (n.fonts[N](u) && o.test(u)) {
                    s = n.fonts[u];
                    break
                }
            }
            var a;
            if (s)for (var f = 0, l = s.length; l > f && (a = s[f], a.face["font-weight"] != t || a.face["font-style"] != r && a.face["font-style"] || a.face["font-stretch"] != i); f++);
            return a
        }
    }, E.print = function (e, t, r, i, s, o, u, a) {
        o = o || "middle", u = q(R(u || 0, 1), -1), a = q(R(a || 1, 3), 1);
        var f, l = P(r)[H](_), c = 0, h = 0, p = _;
        if (n.is(i, "string") && (i = this.getFont(i)), i) {
            f = (s || 16) / i.face["units-per-em"];
            for (var d = i.face.bbox[H](S), v = +d[0], m = d[3] - d[1], g = 0, y = +d[1] + ("baseline" == o ? m + +i.face.descent : m / 2), b = 0, w = l.length; w > b; b++) {
                if ("\n" == l[b])c = 0, x = 0, h = 0, g += m * a; else {
                    var E = h && i.glyphs[l[b - 1]] || {}, x = i.glyphs[l[b]];
                    c += h ? (E.w || i.w) + (E.k && E.k[l[b]] || 0) + i.w * u : 0, h = 1
                }
                x && x.d && (p += n.transformPath(x.d, ["t", c * f, g * f, "s", f, f, v, y, "t", (e - v) / f, (t - y) / f]))
            }
        }
        return this.path(p).attr({fill: "#000", stroke: "none"})
    }, E.add = function (e) {
        if (n.is(e, "array"))for (var t, r = this.set(), i = 0, s = e.length; s > i; i++)t = e[i] || {}, x[N](t.type) && r.push(this[t.type]().attr(t));
        return r
    }, n.format = function (e, t) {
        var r = n.is(t, $) ? [0][O](t) : arguments;
        return e && n.is(e, V) && r.length - 1 && (e = e.replace(T, function (e, t) {
            return null == r[++t] ? _ : r[t]
        })), e || _
    }, n.fullfill = function () {
        var e = /\{([^\}]+)\}/g, t = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g, n = function (e, n, r) {
            var i = r;
            return n.replace(t, function (e, t, n, r, s) {
                t = t || r, i && (t in i && (i = i[t]), "function" == typeof i && s && (i = i()))
            }), i = (null == i || i == r ? e : i) + ""
        };
        return function (t, r) {
            return String(t).replace(e, function (e, t) {
                return n(e, t, r)
            })
        }
    }(), n.ninja = function () {
        return k.was ? C.win.Raphael = k.is : delete Raphael, n
    }, n.st = dn, function (e, t, r) {
        function i() {
            /in/.test(e.readyState) ? setTimeout(i, 9) : n.eve("raphael.DOMload")
        }

        null == e.readyState && e.addEventListener && (e.addEventListener(t, r = function () {
            e.removeEventListener(t, r, !1), e.readyState = "complete"
        }, !1), e.readyState = "loading"), i()
    }(document, "DOMContentLoaded"), t.on("raphael.DOMload", function () {
        w = !0
    }), function () {
        if (n.svg) {
            var e = "hasOwnProperty", t = String, r = parseFloat, i = parseInt, s = Math, o = s.max, u = s.abs, a = s.pow, f = /[, ]+/, l = n.eve, c = "", h = " ", p = "http://www.w3.org/1999/xlink", d = {block: "M5,0 0,2.5 5,5z", classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z", diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z", open: "M6,1 1,3.5 6,6", oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"}, v = {};
            n.toString = function () {
                return"Your browser supports SVG.\nYou are running Raphaël " + this.version
            };
            var m = function (r, i) {
                if (i) {
                    "string" == typeof r && (r = m(r));
                    for (var s in i)i[e](s) && ("xlink:" == s.substring(0, 6) ? r.setAttributeNS(p, s.substring(6), t(i[s])) : r.setAttribute(s, t(i[s])))
                } else r = n._g.doc.createElementNS("http://www.w3.org/2000/svg", r), r.style && (r.style.webkitTapHighlightColor = "rgba(0,0,0,0)");
                return r
            }, g = function (e, i) {
                var f = "linear", l = e.id + i, h = .5, p = .5, d = e.node, v = e.paper, g = d.style, y = n._g.doc.getElementById(l);
                if (!y) {
                    if (i = t(i).replace(n._radial_gradient, function (e, t, n) {
                        if (f = "radial", t && n) {
                            h = r(t), p = r(n);
                            var i = 2 * (p > .5) - 1;
                            a(h - .5, 2) + a(p - .5, 2) > .25 && (p = s.sqrt(.25 - a(h - .5, 2)) * i + .5) && .5 != p && (p = p.toFixed(5) - 1e-5 * i)
                        }
                        return c
                    }), i = i.split(/\s*\-\s*/), "linear" == f) {
                        var b = i.shift();
                        if (b = -r(b), isNaN(b))return null;
                        var w = [0, 0, s.cos(n.rad(b)), s.sin(n.rad(b))], E = 1 / (o(u(w[2]), u(w[3])) || 1);
                        w[2] *= E, w[3] *= E, w[2] < 0 && (w[0] = -w[2], w[2] = 0), w[3] < 0 && (w[1] = -w[3], w[3] = 0)
                    }
                    var S = n._parseDots(i);
                    if (!S)return null;
                    if (l = l.replace(/[\(\)\s,\xb0#]/g, "_"), e.gradient && l != e.gradient.id && (v.defs.removeChild(e.gradient), delete e.gradient), !e.gradient) {
                        y = m(f + "Gradient", {id: l}), e.gradient = y, m(y, "radial" == f ? {fx: h, fy: p} : {x1: w[0], y1: w[1], x2: w[2], y2: w[3], gradientTransform: e.matrix.invert()}), v.defs.appendChild(y);
                        for (var x = 0, T = S.length; T > x; x++)y.appendChild(m("stop", {offset: S[x].offset ? S[x].offset : x ? "100%" : "0%", "stop-color": S[x].color || "#fff"}))
                    }
                }
                return m(d, {fill: "url(#" + l + ")", opacity: 1, "fill-opacity": 1}), g.fill = c, g.opacity = 1, g.fillOpacity = 1, 1
            }, y = function (e) {
                var t = e.getBBox(1);
                m(e.pattern, {patternTransform: e.matrix.invert() + " translate(" + t.x + "," + t.y + ")"})
            }, b = function (r, i, s) {
                if ("path" == r.type) {
                    for (var o, u, a, f, l, h = t(i).toLowerCase().split("-"), p = r.paper, g = s ? "end" : "start", y = r.node, b = r.attrs, w = b["stroke-width"], E = h.length, S = "classic", x = 3, T = 3, N = 5; E--;)switch (h[E]) {
                        case"block":
                        case"classic":
                        case"oval":
                        case"diamond":
                        case"open":
                        case"none":
                            S = h[E];
                            break;
                        case"wide":
                            T = 5;
                            break;
                        case"narrow":
                            T = 2;
                            break;
                        case"long":
                            x = 5;
                            break;
                        case"short":
                            x = 2
                    }
                    if ("open" == S ? (x += 2, T += 2, N += 2, a = 1, f = s ? 4 : 1, l = {fill: "none", stroke: b.stroke}) : (f = a = x / 2, l = {fill: b.stroke, stroke: "none"}), r._.arrows ? s ? (r._.arrows.endPath && v[r._.arrows.endPath]--, r._.arrows.endMarker && v[r._.arrows.endMarker]--) : (r._.arrows.startPath && v[r._.arrows.startPath]--, r._.arrows.startMarker && v[r._.arrows.startMarker]--) : r._.arrows = {}, "none" != S) {
                        var C = "raphael-marker-" + S, k = "raphael-marker-" + g + S + x + T;
                        n._g.doc.getElementById(C) ? v[C]++ : (p.defs.appendChild(m(m("path"), {"stroke-linecap": "round", d: d[S], id: C})), v[C] = 1);
                        var L, A = n._g.doc.getElementById(k);
                        A ? (v[k]++, L = A.getElementsByTagName("use")[0]) : (A = m(m("marker"), {id: k, markerHeight: T, markerWidth: x, orient: "auto", refX: f, refY: T / 2}), L = m(m("use"), {"xlink:href": "#" + C, transform: (s ? "rotate(180 " + x / 2 + " " + T / 2 + ") " : c) + "scale(" + x / N + "," + T / N + ")", "stroke-width": (1 / ((x / N + T / N) / 2)).toFixed(4)}), A.appendChild(L), p.defs.appendChild(A), v[k] = 1), m(L, l);
                        var O = a * ("diamond" != S && "oval" != S);
                        s ? (o = r._.arrows.startdx * w || 0, u = n.getTotalLength(b.path) - O * w) : (o = O * w, u = n.getTotalLength(b.path) - (r._.arrows.enddx * w || 0)), l = {}, l["marker-" + g] = "url(#" + k + ")", (u || o) && (l.d = n.getSubpath(b.path, o, u)), m(y, l), r._.arrows[g + "Path"] = C, r._.arrows[g + "Marker"] = k, r._.arrows[g + "dx"] = O, r._.arrows[g + "Type"] = S, r._.arrows[g + "String"] = i
                    } else s ? (o = r._.arrows.startdx * w || 0, u = n.getTotalLength(b.path) - o) : (o = 0, u = n.getTotalLength(b.path) - (r._.arrows.enddx * w || 0)), r._.arrows[g + "Path"] && m(y, {d: n.getSubpath(b.path, o, u)}), delete r._.arrows[g + "Path"], delete r._.arrows[g + "Marker"], delete r._.arrows[g + "dx"], delete r._.arrows[g + "Type"], delete r._.arrows[g + "String"];
                    for (l in v)if (v[e](l) && !v[l]) {
                        var M = n._g.doc.getElementById(l);
                        M && M.parentNode.removeChild(M)
                    }
                }
            }, w = {"": [0], none: [0], "-": [3, 1], ".": [1, 1], "-.": [3, 1, 1, 1], "-..": [3, 1, 1, 1, 1, 1], ". ": [1, 3], "- ": [4, 3], "--": [8, 3], "- .": [4, 3, 1, 3], "--.": [8, 3, 1, 3], "--..": [8, 3, 1, 3, 1, 3]}, E = function (e, n, r) {
                if (n = w[t(n).toLowerCase()]) {
                    for (var i = e.attrs["stroke-width"] || "1", s = {round: i, square: i, butt: 0}[e.attrs["stroke-linecap"] || r["stroke-linecap"]] || 0, o = [], u = n.length; u--;)o[u] = n[u] * i + (u % 2 ? 1 : -1) * s;
                    m(e.node, {"stroke-dasharray": o.join(",")})
                }
            }, S = function (r, s) {
                var a = r.node, l = r.attrs, h = a.style.visibility;
                a.style.visibility = "hidden";
                for (var d in s)if (s[e](d)) {
                    if (!n._availableAttrs[e](d))continue;
                    var v = s[d];
                    switch (l[d] = v, d) {
                        case"blur":
                            r.blur(v);
                            break;
                        case"title":
                            var w = a.getElementsByTagName("title");
                            if (w.length && (w = w[0]))w.firstChild.nodeValue = v; else {
                                w = m("title");
                                var S = n._g.doc.createTextNode(v);
                                w.appendChild(S), a.appendChild(w)
                            }
                            break;
                        case"href":
                        case"target":
                            var x = a.parentNode;
                            if ("a" != x.tagName.toLowerCase()) {
                                var N = m("a");
                                x.insertBefore(N, a), N.appendChild(a), x = N
                            }
                            "target" == d ? x.setAttributeNS(p, "show", "blank" == v ? "new" : v) : x.setAttributeNS(p, d, v);
                            break;
                        case"cursor":
                            a.style.cursor = v;
                            break;
                        case"transform":
                            r.transform(v);
                            break;
                        case"arrow-start":
                            b(r, v);
                            break;
                        case"arrow-end":
                            b(r, v, 1);
                            break;
                        case"clip-rect":
                            var C = t(v).split(f);
                            if (4 == C.length) {
                                r.clip && r.clip.parentNode.parentNode.removeChild(r.clip.parentNode);
                                var k = m("clipPath"), L = m("rect");
                                k.id = n.createUUID(), m(L, {x: C[0], y: C[1], width: C[2], height: C[3]}), k.appendChild(L), r.paper.defs.appendChild(k), m(a, {"clip-path": "url(#" + k.id + ")"}), r.clip = L
                            }
                            if (!v) {
                                var A = a.getAttribute("clip-path");
                                if (A) {
                                    var O = n._g.doc.getElementById(A.replace(/(^url\(#|\)$)/g, c));
                                    O && O.parentNode.removeChild(O), m(a, {"clip-path": c}), delete r.clip
                                }
                            }
                            break;
                        case"path":
                            "path" == r.type && (m(a, {d: v ? l.path = n._pathToAbsolute(v) : "M0,0"}), r._.dirty = 1, r._.arrows && ("startString"in r._.arrows && b(r, r._.arrows.startString), "endString"in r._.arrows && b(r, r._.arrows.endString, 1)));
                            break;
                        case"width":
                            if (a.setAttribute(d, v), r._.dirty = 1, !l.fx)break;
                            d = "x", v = l.x;
                        case"x":
                            l.fx && (v = -l.x - (l.width || 0));
                        case"rx":
                            if ("rx" == d && "rect" == r.type)break;
                        case"cx":
                            a.setAttribute(d, v), r.pattern && y(r), r._.dirty = 1;
                            break;
                        case"height":
                            if (a.setAttribute(d, v), r._.dirty = 1, !l.fy)break;
                            d = "y", v = l.y;
                        case"y":
                            l.fy && (v = -l.y - (l.height || 0));
                        case"ry":
                            if ("ry" == d && "rect" == r.type)break;
                        case"cy":
                            a.setAttribute(d, v), r.pattern && y(r), r._.dirty = 1;
                            break;
                        case"r":
                            "rect" == r.type ? m(a, {rx: v, ry: v}) : a.setAttribute(d, v), r._.dirty = 1;
                            break;
                        case"src":
                            "image" == r.type && a.setAttributeNS(p, "href", v);
                            break;
                        case"stroke-width":
                            (1 != r._.sx || 1 != r._.sy) && (v /= o(u(r._.sx), u(r._.sy)) || 1), r.paper._vbSize && (v *= r.paper._vbSize), a.setAttribute(d, v), l["stroke-dasharray"] && E(r, l["stroke-dasharray"], s), r._.arrows && ("startString"in r._.arrows && b(r, r._.arrows.startString), "endString"in r._.arrows && b(r, r._.arrows.endString, 1));
                            break;
                        case"stroke-dasharray":
                            E(r, v, s);
                            break;
                        case"fill":
                            var M = t(v).match(n._ISURL);
                            if (M) {
                                k = m("pattern");
                                var _ = m("image");
                                k.id = n.createUUID(), m(k, {x: 0, y: 0, patternUnits: "userSpaceOnUse", height: 1, width: 1}), m(_, {x: 0, y: 0, "xlink:href": M[1]}), k.appendChild(_), function (e) {
                                    n._preload(M[1], function () {
                                        var t = this.offsetWidth, n = this.offsetHeight;
                                        m(e, {width: t, height: n}), m(_, {width: t, height: n}), r.paper.safari()
                                    })
                                }(k), r.paper.defs.appendChild(k), m(a, {fill: "url(#" + k.id + ")"}), r.pattern = k, r.pattern && y(r);
                                break
                            }
                            var D = n.getRGB(v);
                            if (D.error) {
                                if (("circle" == r.type || "ellipse" == r.type || "r" != t(v).charAt()) && g(r, v)) {
                                    if ("opacity"in l || "fill-opacity"in l) {
                                        var P = n._g.doc.getElementById(a.getAttribute("fill").replace(/^url\(#|\)$/g, c));
                                        if (P) {
                                            var H = P.getElementsByTagName("stop");
                                            m(H[H.length - 1], {"stop-opacity": ("opacity"in l ? l.opacity : 1) * ("fill-opacity"in l ? l["fill-opacity"] : 1)})
                                        }
                                    }
                                    l.gradient = v, l.fill = "none";
                                    break
                                }
                            } else delete s.gradient, delete l.gradient, !n.is(l.opacity, "undefined") && n.is(s.opacity, "undefined") && m(a, {opacity: l.opacity}), !n.is(l["fill-opacity"], "undefined") && n.is(s["fill-opacity"], "undefined") && m(a, {"fill-opacity": l["fill-opacity"]});
                            D[e]("opacity") && m(a, {"fill-opacity": D.opacity > 1 ? D.opacity / 100 : D.opacity});
                        case"stroke":
                            D = n.getRGB(v), a.setAttribute(d, D.hex), "stroke" == d && D[e]("opacity") && m(a, {"stroke-opacity": D.opacity > 1 ? D.opacity / 100 : D.opacity}), "stroke" == d && r._.arrows && ("startString"in r._.arrows && b(r, r._.arrows.startString), "endString"in r._.arrows && b(r, r._.arrows.endString, 1));
                            break;
                        case"gradient":
                            ("circle" == r.type || "ellipse" == r.type || "r" != t(v).charAt()) && g(r, v);
                            break;
                        case"opacity":
                            l.gradient && !l[e]("stroke-opacity") && m(a, {"stroke-opacity": v > 1 ? v / 100 : v});
                        case"fill-opacity":
                            if (l.gradient) {
                                P = n._g.doc.getElementById(a.getAttribute("fill").replace(/^url\(#|\)$/g, c)), P && (H = P.getElementsByTagName("stop"), m(H[H.length - 1], {"stop-opacity": v}));
                                break
                            }
                            ;
                        default:
                            "font-size" == d && (v = i(v, 10) + "px");
                            var B = d.replace(/(\-.)/g, function (e) {
                                return e.substring(1).toUpperCase()
                            });
                            a.style[B] = v, r._.dirty = 1, a.setAttribute(d, v)
                    }
                }
                T(r, s), a.style.visibility = h
            }, x = 1.2, T = function (r, s) {
                if ("text" == r.type && (s[e]("text") || s[e]("font") || s[e]("font-size") || s[e]("x") || s[e]("y"))) {
                    var o = r.attrs, u = r.node, a = u.firstChild ? i(n._g.doc.defaultView.getComputedStyle(u.firstChild, c).getPropertyValue("font-size"), 10) : 10;
                    if (s[e]("text")) {
                        for (o.text = s.text; u.firstChild;)u.removeChild(u.firstChild);
                        for (var f, l = t(s.text).split("\n"), h = [], p = 0, d = l.length; d > p; p++)f = m("tspan"), p && m(f, {dy: a * x, x: o.x}), f.appendChild(n._g.doc.createTextNode(l[p])), u.appendChild(f), h[p] = f
                    } else for (h = u.getElementsByTagName("tspan"), p = 0, d = h.length; d > p; p++)p ? m(h[p], {dy: a * x, x: o.x}) : m(h[0], {dy: 0});
                    m(u, {x: o.x, y: o.y}), r._.dirty = 1;
                    var v = r._getBBox(), g = o.y - (v.y + v.height / 2);
                    g && n.is(g, "finite") && m(h[0], {dy: g})
                }
            }, N = function (e, t) {
                this[0] = this.node = e, e.raphael = !0, this.id = n._oid++, e.raphaelid = this.id, this.matrix = n.matrix(), this.realPath = null, this.paper = t, this.attrs = this.attrs || {}, this._ = {transform: [], sx: 1, sy: 1, deg: 0, dx: 0, dy: 0, dirty: 1}, !t.bottom && (t.bottom = this), this.prev = t.top, t.top && (t.top.next = this), t.top = this, this.next = null
            }, C = n.el;
            N.prototype = C, C.constructor = N, n._engine.path = function (e, t) {
                var n = m("path");
                t.canvas && t.canvas.appendChild(n);
                var r = new N(n, t);
                return r.type = "path", S(r, {fill: "none", stroke: "#000", path: e}), r
            }, C.rotate = function (e, n, i) {
                if (this.removed)return this;
                if (e = t(e).split(f), e.length - 1 && (n = r(e[1]), i = r(e[2])), e = r(e[0]), null == i && (n = i), null == n || null == i) {
                    var s = this.getBBox(1);
                    n = s.x + s.width / 2, i = s.y + s.height / 2
                }
                return this.transform(this._.transform.concat([
                    ["r", e, n, i]
                ])),
                    this
            }, C.scale = function (e, n, i, s) {
                if (this.removed)return this;
                if (e = t(e).split(f), e.length - 1 && (n = r(e[1]), i = r(e[2]), s = r(e[3])), e = r(e[0]), null == n && (n = e), null == s && (i = s), null == i || null == s)var o = this.getBBox(1);
                return i = null == i ? o.x + o.width / 2 : i, s = null == s ? o.y + o.height / 2 : s, this.transform(this._.transform.concat([
                    ["s", e, n, i, s]
                ])), this
            }, C.translate = function (e, n) {
                return this.removed ? this : (e = t(e).split(f), e.length - 1 && (n = r(e[1])), e = r(e[0]) || 0, n = +n || 0, this.transform(this._.transform.concat([
                    ["t", e, n]
                ])), this)
            }, C.transform = function (t) {
                var r = this._;
                if (null == t)return r.transform;
                if (n._extractTransform(this, t), this.clip && m(this.clip, {transform: this.matrix.invert()}), this.pattern && y(this), this.node && m(this.node, {transform: this.matrix}), 1 != r.sx || 1 != r.sy) {
                    var i = this.attrs[e]("stroke-width") ? this.attrs["stroke-width"] : 1;
                    this.attr({"stroke-width": i})
                }
                return this
            }, C.hide = function () {
                return!this.removed && this.paper.safari(this.node.style.display = "none"), this
            }, C.show = function () {
                return!this.removed && this.paper.safari(this.node.style.display = ""), this
            }, C.remove = function () {
                if (!this.removed && this.node.parentNode) {
                    var e = this.paper;
                    e.__set__ && e.__set__.exclude(this), l.unbind("raphael.*.*." + this.id), this.gradient && e.defs.removeChild(this.gradient), n._tear(this, e), "a" == this.node.parentNode.tagName.toLowerCase() ? this.node.parentNode.parentNode.removeChild(this.node.parentNode) : this.node.parentNode.removeChild(this.node);
                    for (var t in this)this[t] = "function" == typeof this[t] ? n._removedFactory(t) : null;
                    this.removed = !0
                }
            }, C._getBBox = function () {
                if ("none" == this.node.style.display) {
                    this.show();
                    var e = !0
                }
                var t = {};
                try {
                    t = this.node.getBBox()
                } catch (n) {
                } finally {
                    t = t || {}
                }
                return e && this.hide(), t
            }, C.attr = function (t, r) {
                if (this.removed)return this;
                if (null == t) {
                    var i = {};
                    for (var s in this.attrs)this.attrs[e](s) && (i[s] = this.attrs[s]);
                    return i.gradient && "none" == i.fill && (i.fill = i.gradient) && delete i.gradient, i.transform = this._.transform, i
                }
                if (null == r && n.is(t, "string")) {
                    if ("fill" == t && "none" == this.attrs.fill && this.attrs.gradient)return this.attrs.gradient;
                    if ("transform" == t)return this._.transform;
                    for (var o = t.split(f), u = {}, a = 0, c = o.length; c > a; a++)t = o[a], u[t] = t in this.attrs ? this.attrs[t] : n.is(this.paper.customAttributes[t], "function") ? this.paper.customAttributes[t].def : n._availableAttrs[t];
                    return c - 1 ? u : u[o[0]]
                }
                if (null == r && n.is(t, "array")) {
                    for (u = {}, a = 0, c = t.length; c > a; a++)u[t[a]] = this.attr(t[a]);
                    return u
                }
                if (null != r) {
                    var h = {};
                    h[t] = r
                } else null != t && n.is(t, "object") && (h = t);
                for (var p in h)l("raphael.attr." + p + "." + this.id, this, h[p]);
                for (p in this.paper.customAttributes)if (this.paper.customAttributes[e](p) && h[e](p) && n.is(this.paper.customAttributes[p], "function")) {
                    var d = this.paper.customAttributes[p].apply(this, [].concat(h[p]));
                    this.attrs[p] = h[p];
                    for (var v in d)d[e](v) && (h[v] = d[v])
                }
                return S(this, h), this
            }, C.toFront = function () {
                if (this.removed)return this;
                "a" == this.node.parentNode.tagName.toLowerCase() ? this.node.parentNode.parentNode.appendChild(this.node.parentNode) : this.node.parentNode.appendChild(this.node);
                var e = this.paper;
                return e.top != this && n._tofront(this, e), this
            }, C.toBack = function () {
                if (this.removed)return this;
                var e = this.node.parentNode;
                return"a" == e.tagName.toLowerCase() ? e.parentNode.insertBefore(this.node.parentNode, this.node.parentNode.parentNode.firstChild) : e.firstChild != this.node && e.insertBefore(this.node, this.node.parentNode.firstChild), n._toback(this, this.paper), this.paper, this
            }, C.insertAfter = function (e) {
                if (this.removed)return this;
                var t = e.node || e[e.length - 1].node;
                return t.nextSibling ? t.parentNode.insertBefore(this.node, t.nextSibling) : t.parentNode.appendChild(this.node), n._insertafter(this, e, this.paper), this
            }, C.insertBefore = function (e) {
                if (this.removed)return this;
                var t = e.node || e[0].node;
                return t.parentNode.insertBefore(this.node, t), n._insertbefore(this, e, this.paper), this
            }, C.blur = function (e) {
                var t = this;
                if (0 !== +e) {
                    var r = m("filter"), i = m("feGaussianBlur");
                    t.attrs.blur = e, r.id = n.createUUID(), m(i, {stdDeviation: +e || 1.5}), r.appendChild(i), t.paper.defs.appendChild(r), t._blur = r, m(t.node, {filter: "url(#" + r.id + ")"})
                } else t._blur && (t._blur.parentNode.removeChild(t._blur), delete t._blur, delete t.attrs.blur), t.node.removeAttribute("filter");
                return t
            }, n._engine.circle = function (e, t, n, r) {
                var i = m("circle");
                e.canvas && e.canvas.appendChild(i);
                var s = new N(i, e);
                return s.attrs = {cx: t, cy: n, r: r, fill: "none", stroke: "#000"}, s.type = "circle", m(i, s.attrs), s
            }, n._engine.rect = function (e, t, n, r, i, s) {
                var o = m("rect");
                e.canvas && e.canvas.appendChild(o);
                var u = new N(o, e);
                return u.attrs = {x: t, y: n, width: r, height: i, r: s || 0, rx: s || 0, ry: s || 0, fill: "none", stroke: "#000"}, u.type = "rect", m(o, u.attrs), u
            }, n._engine.ellipse = function (e, t, n, r, i) {
                var s = m("ellipse");
                e.canvas && e.canvas.appendChild(s);
                var o = new N(s, e);
                return o.attrs = {cx: t, cy: n, rx: r, ry: i, fill: "none", stroke: "#000"}, o.type = "ellipse", m(s, o.attrs), o
            }, n._engine.image = function (e, t, n, r, i, s) {
                var o = m("image");
                m(o, {x: n, y: r, width: i, height: s, preserveAspectRatio: "none"}), o.setAttributeNS(p, "href", t), e.canvas && e.canvas.appendChild(o);
                var u = new N(o, e);
                return u.attrs = {x: n, y: r, width: i, height: s, src: t}, u.type = "image", u
            }, n._engine.text = function (e, t, r, i) {
                var s = m("text");
                e.canvas && e.canvas.appendChild(s);
                var o = new N(s, e);
                return o.attrs = {x: t, y: r, "text-anchor": "middle", text: i, font: n._availableAttrs.font, stroke: "none", fill: "#000"}, o.type = "text", S(o, o.attrs), o
            }, n._engine.setSize = function (e, t) {
                return this.width = e || this.width, this.height = t || this.height, this.canvas.setAttribute("width", this.width), this.canvas.setAttribute("height", this.height), this._viewBox && this.setViewBox.apply(this, this._viewBox), this
            }, n._engine.create = function () {
                var e = n._getContainer.apply(0, arguments), t = e && e.container, r = e.x, i = e.y, s = e.width, o = e.height;
                if (!t)throw new Error("SVG container not found.");
                var u, a = m("svg"), f = "overflow:hidden;";
                return r = r || 0, i = i || 0, s = s || 512, o = o || 342, m(a, {height: o, version: 1.1, width: s, xmlns: "http://www.w3.org/2000/svg"}), 1 == t ? (a.style.cssText = f + "position:absolute;left:" + r + "px;top:" + i + "px", n._g.doc.body.appendChild(a), u = 1) : (a.style.cssText = f + "position:relative", t.firstChild ? t.insertBefore(a, t.firstChild) : t.appendChild(a)), t = new n._Paper, t.width = s, t.height = o, t.canvas = a, t.clear(), t._left = t._top = 0, u && (t.renderfix = function () {
                }), t.renderfix(), t
            }, n._engine.setViewBox = function (e, t, n, r, i) {
                l("raphael.setViewBox", this, this._viewBox, [e, t, n, r, i]);
                var s, u, a = o(n / this.width, r / this.height), f = this.top, c = i ? "xMidYMid meet" : "xMinYMin";
                for (null == e ? (this._vbSize && (a = 1), delete this._vbSize, s = "0 0 " + this.width + h + this.height) : (this._vbSize = a, s = e + h + t + h + n + h + r), m(this.canvas, {viewBox: s, preserveAspectRatio: c}); a && f;)u = "stroke-width"in f.attrs ? f.attrs["stroke-width"] : 1, f.attr({"stroke-width": u}), f._.dirty = 1, f._.dirtyT = 1, f = f.prev;
                return this._viewBox = [e, t, n, r, !!i], this
            }, n.prototype.renderfix = function () {
                var e, t = this.canvas, n = t.style;
                try {
                    e = t.getScreenCTM() || t.createSVGMatrix()
                } catch (r) {
                    e = t.createSVGMatrix()
                }
                var i = -e.e % 1, s = -e.f % 1;
                (i || s) && (i && (this._left = (this._left + i) % 1, n.left = this._left + "px"), s && (this._top = (this._top + s) % 1, n.top = this._top + "px"))
            }, n.prototype.clear = function () {
                n.eve("raphael.clear", this);
                for (var e = this.canvas; e.firstChild;)e.removeChild(e.firstChild);
                this.bottom = this.top = null, (this.desc = m("desc")).appendChild(n._g.doc.createTextNode("Created with Raphaël " + n.version)), e.appendChild(this.desc), e.appendChild(this.defs = m("defs"))
            }, n.prototype.remove = function () {
                l("raphael.remove", this), this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
                for (var e in this)this[e] = "function" == typeof this[e] ? n._removedFactory(e) : null
            };
            var k = n.st;
            for (var L in C)C[e](L) && !k[e](L) && (k[L] = function (e) {
                return function () {
                    var t = arguments;
                    return this.forEach(function (n) {
                        n[e].apply(n, t)
                    })
                }
            }(L))
        }
    }(), function () {
        if (n.vml) {
            var e = "hasOwnProperty", t = String, r = parseFloat, i = Math, s = i.round, o = i.max, u = i.min, a = i.abs, f = "fill", l = /[, ]+/, c = n.eve, h = " progid:DXImageTransform.Microsoft", p = " ", d = "", v = {M: "m", L: "l", C: "c", Z: "x", m: "t", l: "r", c: "v", z: "x"}, m = /([clmz]),?([^clmz]*)/gi, g = / progid:\S+Blur\([^\)]+\)/g, y = /-?[^,\s-]+/g, b = "position:absolute;left:0;top:0;width:1px;height:1px", w = 21600, E = {path: 1, rect: 1, image: 1}, S = {circle: 1, ellipse: 1}, x = function (e) {
                var r = /[ahqstv]/gi, i = n._pathToAbsolute;
                if (t(e).match(r) && (i = n._path2curve), r = /[clmz]/g, i == n._pathToAbsolute && !t(e).match(r)) {
                    var o = t(e).replace(m, function (e, t, n) {
                        var r = [], i = "m" == t.toLowerCase(), o = v[t];
                        return n.replace(y, function (e) {
                            i && 2 == r.length && (o += r + v["m" == t ? "l" : "L"], r = []), r.push(s(e * w))
                        }), o + r
                    });
                    return o
                }
                var u, a, f = i(e);
                o = [];
                for (var l = 0, c = f.length; c > l; l++) {
                    u = f[l], a = f[l][0].toLowerCase(), "z" == a && (a = "x");
                    for (var h = 1, g = u.length; g > h; h++)a += s(u[h] * w) + (h != g - 1 ? "," : d);
                    o.push(a)
                }
                return o.join(p)
            }, T = function (e, t, r) {
                var i = n.matrix();
                return i.rotate(-e, .5, .5), {dx: i.x(t, r), dy: i.y(t, r)}
            }, N = function (e, t, n, r, i, s) {
                var o = e._, u = e.matrix, l = o.fillpos, c = e.node, h = c.style, d = 1, v = "", m = w / t, g = w / n;
                if (h.visibility = "hidden", t && n) {
                    if (c.coordsize = a(m) + p + a(g), h.rotation = s * (0 > t * n ? -1 : 1), s) {
                        var y = T(s, r, i);
                        r = y.dx, i = y.dy
                    }
                    if (0 > t && (v += "x"), 0 > n && (v += " y") && (d = -1), h.flip = v, c.coordorigin = r * -m + p + i * -g, l || o.fillsize) {
                        var b = c.getElementsByTagName(f);
                        b = b && b[0], c.removeChild(b), l && (y = T(s, u.x(l[0], l[1]), u.y(l[0], l[1])), b.position = y.dx * d + p + y.dy * d), o.fillsize && (b.size = o.fillsize[0] * a(t) + p + o.fillsize[1] * a(n)), c.appendChild(b)
                    }
                    h.visibility = "visible"
                }
            };
            n.toString = function () {
                return"Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël " + this.version
            };
            var C = function (e, n, r) {
                for (var i = t(n).toLowerCase().split("-"), s = r ? "end" : "start", o = i.length, u = "classic", a = "medium", f = "medium"; o--;)switch (i[o]) {
                    case"block":
                    case"classic":
                    case"oval":
                    case"diamond":
                    case"open":
                    case"none":
                        u = i[o];
                        break;
                    case"wide":
                    case"narrow":
                        f = i[o];
                        break;
                    case"long":
                    case"short":
                        a = i[o]
                }
                var l = e.node.getElementsByTagName("stroke")[0];
                l[s + "arrow"] = u, l[s + "arrowlength"] = a, l[s + "arrowwidth"] = f
            }, k = function (i, a) {
                i.attrs = i.attrs || {};
                var c = i.node, h = i.attrs, v = c.style, m = E[i.type] && (a.x != h.x || a.y != h.y || a.width != h.width || a.height != h.height || a.cx != h.cx || a.cy != h.cy || a.rx != h.rx || a.ry != h.ry || a.r != h.r), g = S[i.type] && (h.cx != a.cx || h.cy != a.cy || h.r != a.r || h.rx != a.rx || h.ry != a.ry), y = i;
                for (var b in a)a[e](b) && (h[b] = a[b]);
                if (m && (h.path = n._getPath[i.type](i), i._.dirty = 1), a.href && (c.href = a.href), a.title && (c.title = a.title), a.target && (c.target = a.target), a.cursor && (v.cursor = a.cursor), "blur"in a && i.blur(a.blur), (a.path && "path" == i.type || m) && (c.path = x(~t(h.path).toLowerCase().indexOf("r") ? n._pathToAbsolute(h.path) : h.path), "image" == i.type && (i._.fillpos = [h.x, h.y], i._.fillsize = [h.width, h.height], N(i, 1, 1, 0, 0, 0))), "transform"in a && i.transform(a.transform), g) {
                    var T = +h.cx, k = +h.cy, A = +h.rx || +h.r || 0, O = +h.ry || +h.r || 0;
                    c.path = n.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", s((T - A) * w), s((k - O) * w), s((T + A) * w), s((k + O) * w), s(T * w)), i._.dirty = 1
                }
                if ("clip-rect"in a) {
                    var _ = t(a["clip-rect"]).split(l);
                    if (4 == _.length) {
                        _[2] = +_[2] + +_[0], _[3] = +_[3] + +_[1];
                        var D = c.clipRect || n._g.doc.createElement("div"), P = D.style;
                        P.clip = n.format("rect({1}px {2}px {3}px {0}px)", _), c.clipRect || (P.position = "absolute", P.top = 0, P.left = 0, P.width = i.paper.width + "px", P.height = i.paper.height + "px", c.parentNode.insertBefore(D, c), D.appendChild(c), c.clipRect = D)
                    }
                    a["clip-rect"] || c.clipRect && (c.clipRect.style.clip = "auto")
                }
                if (i.textpath) {
                    var H = i.textpath.style;
                    a.font && (H.font = a.font), a["font-family"] && (H.fontFamily = '"' + a["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, d) + '"'), a["font-size"] && (H.fontSize = a["font-size"]), a["font-weight"] && (H.fontWeight = a["font-weight"]), a["font-style"] && (H.fontStyle = a["font-style"])
                }
                if ("arrow-start"in a && C(y, a["arrow-start"]), "arrow-end"in a && C(y, a["arrow-end"], 1), null != a.opacity || null != a["stroke-width"] || null != a.fill || null != a.src || null != a.stroke || null != a["stroke-width"] || null != a["stroke-opacity"] || null != a["fill-opacity"] || null != a["stroke-dasharray"] || null != a["stroke-miterlimit"] || null != a["stroke-linejoin"] || null != a["stroke-linecap"]) {
                    var B = c.getElementsByTagName(f), j = !1;
                    if (B = B && B[0], !B && (j = B = M(f)), "image" == i.type && a.src && (B.src = a.src), a.fill && (B.on = !0), (null == B.on || "none" == a.fill || null === a.fill) && (B.on = !1), B.on && a.fill) {
                        var F = t(a.fill).match(n._ISURL);
                        if (F) {
                            B.parentNode == c && c.removeChild(B), B.rotate = !0, B.src = F[1], B.type = "tile";
                            var I = i.getBBox(1);
                            B.position = I.x + p + I.y, i._.fillpos = [I.x, I.y], n._preload(F[1], function () {
                                i._.fillsize = [this.offsetWidth, this.offsetHeight]
                            })
                        } else B.color = n.getRGB(a.fill).hex, B.src = d, B.type = "solid", n.getRGB(a.fill).error && (y.type in{circle: 1, ellipse: 1} || "r" != t(a.fill).charAt()) && L(y, a.fill, B) && (h.fill = "none", h.gradient = a.fill, B.rotate = !1)
                    }
                    if ("fill-opacity"in a || "opacity"in a) {
                        var q = ((+h["fill-opacity"] + 1 || 2) - 1) * ((+h.opacity + 1 || 2) - 1) * ((+n.getRGB(a.fill).o + 1 || 2) - 1);
                        q = u(o(q, 0), 1), B.opacity = q, B.src && (B.color = "none")
                    }
                    c.appendChild(B);
                    var R = c.getElementsByTagName("stroke") && c.getElementsByTagName("stroke")[0], U = !1;
                    !R && (U = R = M("stroke")), (a.stroke && "none" != a.stroke || a["stroke-width"] || null != a["stroke-opacity"] || a["stroke-dasharray"] || a["stroke-miterlimit"] || a["stroke-linejoin"] || a["stroke-linecap"]) && (R.on = !0), ("none" == a.stroke || null === a.stroke || null == R.on || 0 == a.stroke || 0 == a["stroke-width"]) && (R.on = !1);
                    var z = n.getRGB(a.stroke);
                    R.on && a.stroke && (R.color = z.hex), q = ((+h["stroke-opacity"] + 1 || 2) - 1) * ((+h.opacity + 1 || 2) - 1) * ((+z.o + 1 || 2) - 1);
                    var W = .75 * (r(a["stroke-width"]) || 1);
                    if (q = u(o(q, 0), 1), null == a["stroke-width"] && (W = h["stroke-width"]), a["stroke-width"] && (R.weight = W), W && 1 > W && (q *= W) && (R.weight = 1), R.opacity = q, a["stroke-linejoin"] && (R.joinstyle = a["stroke-linejoin"] || "miter"), R.miterlimit = a["stroke-miterlimit"] || 8, a["stroke-linecap"] && (R.endcap = "butt" == a["stroke-linecap"] ? "flat" : "square" == a["stroke-linecap"] ? "square" : "round"), "stroke-dasharray"in a) {
                        var X = {"-": "shortdash", ".": "shortdot", "-.": "shortdashdot", "-..": "shortdashdotdot", ". ": "dot", "- ": "dash", "--": "longdash", "- .": "dashdot", "--.": "longdashdot", "--..": "longdashdotdot"};
                        R.dashstyle = X[e](a["stroke-dasharray"]) ? X[a["stroke-dasharray"]] : d
                    }
                    U && c.appendChild(R)
                }
                if ("text" == y.type) {
                    y.paper.canvas.style.display = d;
                    var V = y.paper.span, $ = 100, J = h.font && h.font.match(/\d+(?:\.\d*)?(?=px)/);
                    v = V.style, h.font && (v.font = h.font), h["font-family"] && (v.fontFamily = h["font-family"]), h["font-weight"] && (v.fontWeight = h["font-weight"]), h["font-style"] && (v.fontStyle = h["font-style"]), J = r(h["font-size"] || J && J[0]) || 10, v.fontSize = J * $ + "px", y.textpath.string && (V.innerHTML = t(y.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
                    var K = V.getBoundingClientRect();
                    y.W = h.w = (K.right - K.left) / $, y.H = h.h = (K.bottom - K.top) / $, y.X = h.x, y.Y = h.y + y.H / 2, ("x"in a || "y"in a) && (y.path.v = n.format("m{0},{1}l{2},{1}", s(h.x * w), s(h.y * w), s(h.x * w) + 1));
                    for (var Q = ["x", "y", "text", "font", "font-family", "font-weight", "font-style", "font-size"], G = 0, Y = Q.length; Y > G; G++)if (Q[G]in a) {
                        y._.dirty = 1;
                        break
                    }
                    switch (h["text-anchor"]) {
                        case"start":
                            y.textpath.style["v-text-align"] = "left", y.bbx = y.W / 2;
                            break;
                        case"end":
                            y.textpath.style["v-text-align"] = "right", y.bbx = -y.W / 2;
                            break;
                        default:
                            y.textpath.style["v-text-align"] = "center", y.bbx = 0
                    }
                    y.textpath.style["v-text-kern"] = !0
                }
            }, L = function (e, s, o) {
                e.attrs = e.attrs || {};
                var u = (e.attrs, Math.pow), a = "linear", f = ".5 .5";
                if (e.attrs.gradient = s, s = t(s).replace(n._radial_gradient, function (e, t, n) {
                    return a = "radial", t && n && (t = r(t), n = r(n), u(t - .5, 2) + u(n - .5, 2) > .25 && (n = i.sqrt(.25 - u(t - .5, 2)) * (2 * (n > .5) - 1) + .5), f = t + p + n), d
                }), s = s.split(/\s*\-\s*/), "linear" == a) {
                    var l = s.shift();
                    if (l = -r(l), isNaN(l))return null
                }
                var c = n._parseDots(s);
                if (!c)return null;
                if (e = e.shape || e.node, c.length) {
                    e.removeChild(o), o.on = !0, o.method = "none", o.color = c[0].color, o.color2 = c[c.length - 1].color;
                    for (var h = [], v = 0, m = c.length; m > v; v++)c[v].offset && h.push(c[v].offset + p + c[v].color);
                    o.colors = h.length ? h.join() : "0% " + o.color, "radial" == a ? (o.type = "gradientTitle", o.focus = "100%", o.focussize = "0 0", o.focusposition = f, o.angle = 0) : (o.type = "gradient", o.angle = (270 - l) % 360), e.appendChild(o)
                }
                return 1
            }, A = function (e, t) {
                this[0] = this.node = e, e.raphael = !0, this.id = n._oid++, e.raphaelid = this.id, this.X = 0, this.Y = 0, this.attrs = {}, this.paper = t, this.matrix = n.matrix(), this._ = {transform: [], sx: 1, sy: 1, dx: 0, dy: 0, deg: 0, dirty: 1, dirtyT: 1}, !t.bottom && (t.bottom = this), this.prev = t.top, t.top && (t.top.next = this), t.top = this, this.next = null
            }, O = n.el;
            A.prototype = O, O.constructor = A, O.transform = function (e) {
                if (null == e)return this._.transform;
                var r, i = this.paper._viewBoxShift, s = i ? "s" + [i.scale, i.scale] + "-1-1t" + [i.dx, i.dy] : d;
                i && (r = e = t(e).replace(/\.{3}|\u2026/g, this._.transform || d)), n._extractTransform(this, s + e);
                var o, u = this.matrix.clone(), a = this.skew, f = this.node, l = ~t(this.attrs.fill).indexOf("-"), c = !t(this.attrs.fill).indexOf("url(");
                if (u.translate(1, 1), c || l || "image" == this.type)if (a.matrix = "1 0 0 1", a.offset = "0 0", o = u.split(), l && o.noRotation || !o.isSimple) {
                    f.style.filter = u.toFilter();
                    var h = this.getBBox(), v = this.getBBox(1), m = h.x - v.x, g = h.y - v.y;
                    f.coordorigin = m * -w + p + g * -w, N(this, 1, 1, m, g, 0)
                } else f.style.filter = d, N(this, o.scalex, o.scaley, o.dx, o.dy, o.rotate); else f.style.filter = d, a.matrix = t(u), a.offset = u.offset();
                return r && (this._.transform = r), this
            }, O.rotate = function (e, n, i) {
                if (this.removed)return this;
                if (null != e) {
                    if (e = t(e).split(l), e.length - 1 && (n = r(e[1]), i = r(e[2])), e = r(e[0]), null == i && (n = i), null == n || null == i) {
                        var s = this.getBBox(1);
                        n = s.x + s.width / 2, i = s.y + s.height / 2
                    }
                    return this._.dirtyT = 1, this.transform(this._.transform.concat([
                        ["r", e, n, i]
                    ])), this
                }
            }, O.translate = function (e, n) {
                return this.removed ? this : (e = t(e).split(l), e.length - 1 && (n = r(e[1])), e = r(e[0]) || 0, n = +n || 0, this._.bbox && (this._.bbox.x += e, this._.bbox.y += n), this.transform(this._.transform.concat([
                    ["t", e, n]
                ])), this)
            }, O.scale = function (e, n, i, s) {
                if (this.removed)return this;
                if (e = t(e).split(l), e.length - 1 && (n = r(e[1]), i = r(e[2]), s = r(e[3]), isNaN(i) && (i = null), isNaN(s) && (s = null)), e = r(e[0]), null == n && (n = e), null == s && (i = s), null == i || null == s)var o = this.getBBox(1);
                return i = null == i ? o.x + o.width / 2 : i, s = null == s ? o.y + o.height / 2 : s, this.transform(this._.transform.concat([
                    ["s", e, n, i, s]
                ])), this._.dirtyT = 1, this
            }, O.hide = function () {
                return!this.removed && (this.node.style.display = "none"), this
            }, O.show = function () {
                return!this.removed && (this.node.style.display = d), this
            }, O._getBBox = function () {
                return this.removed ? {} : {x: this.X + (this.bbx || 0) - this.W / 2, y: this.Y - this.H, width: this.W, height: this.H}
            }, O.remove = function () {
                if (!this.removed && this.node.parentNode) {
                    this.paper.__set__ && this.paper.__set__.exclude(this), n.eve.unbind("raphael.*.*." + this.id), n._tear(this, this.paper), this.node.parentNode.removeChild(this.node), this.shape && this.shape.parentNode.removeChild(this.shape);
                    for (var e in this)this[e] = "function" == typeof this[e] ? n._removedFactory(e) : null;
                    this.removed = !0
                }
            }, O.attr = function (t, r) {
                if (this.removed)return this;
                if (null == t) {
                    var i = {};
                    for (var s in this.attrs)this.attrs[e](s) && (i[s] = this.attrs[s]);
                    return i.gradient && "none" == i.fill && (i.fill = i.gradient) && delete i.gradient, i.transform = this._.transform, i
                }
                if (null == r && n.is(t, "string")) {
                    if (t == f && "none" == this.attrs.fill && this.attrs.gradient)return this.attrs.gradient;
                    for (var o = t.split(l), u = {}, a = 0, h = o.length; h > a; a++)t = o[a], u[t] = t in this.attrs ? this.attrs[t] : n.is(this.paper.customAttributes[t], "function") ? this.paper.customAttributes[t].def : n._availableAttrs[t];
                    return h - 1 ? u : u[o[0]]
                }
                if (this.attrs && null == r && n.is(t, "array")) {
                    for (u = {}, a = 0, h = t.length; h > a; a++)u[t[a]] = this.attr(t[a]);
                    return u
                }
                var p;
                null != r && (p = {}, p[t] = r), null == r && n.is(t, "object") && (p = t);
                for (var d in p)c("raphael.attr." + d + "." + this.id, this, p[d]);
                if (p) {
                    for (d in this.paper.customAttributes)if (this.paper.customAttributes[e](d) && p[e](d) && n.is(this.paper.customAttributes[d], "function")) {
                        var v = this.paper.customAttributes[d].apply(this, [].concat(p[d]));
                        this.attrs[d] = p[d];
                        for (var m in v)v[e](m) && (p[m] = v[m])
                    }
                    p.text && "text" == this.type && (this.textpath.string = p.text), k(this, p)
                }
                return this
            }, O.toFront = function () {
                return!this.removed && this.node.parentNode.appendChild(this.node), this.paper && this.paper.top != this && n._tofront(this, this.paper), this
            }, O.toBack = function () {
                return this.removed ? this : (this.node.parentNode.firstChild != this.node && (this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild), n._toback(this, this.paper)), this)
            }, O.insertAfter = function (e) {
                return this.removed ? this : (e.constructor == n.st.constructor && (e = e[e.length - 1]), e.node.nextSibling ? e.node.parentNode.insertBefore(this.node, e.node.nextSibling) : e.node.parentNode.appendChild(this.node), n._insertafter(this, e, this.paper), this)
            }, O.insertBefore = function (e) {
                return this.removed ? this : (e.constructor == n.st.constructor && (e = e[0]), e.node.parentNode.insertBefore(this.node, e.node), n._insertbefore(this, e, this.paper), this)
            }, O.blur = function (e) {
                var t = this.node.runtimeStyle, r = t.filter;
                return r = r.replace(g, d), 0 !== +e ? (this.attrs.blur = e, t.filter = r + p + h + ".Blur(pixelradius=" + (+e || 1.5) + ")", t.margin = n.format("-{0}px 0 0 -{0}px", s(+e || 1.5))) : (t.filter = r, t.margin = 0, delete this.attrs.blur), this
            }, n._engine.path = function (e, t) {
                var n = M("shape");
                n.style.cssText = b, n.coordsize = w + p + w, n.coordorigin = t.coordorigin;
                var r = new A(n, t), i = {fill: "none", stroke: "#000"};
                e && (i.path = e), r.type = "path", r.path = [], r.Path = d, k(r, i), t.canvas.appendChild(n);
                var s = M("skew");
                return s.on = !0, n.appendChild(s), r.skew = s, r.transform(d), r
            }, n._engine.rect = function (e, t, r, i, s, o) {
                var u = n._rectPath(t, r, i, s, o), a = e.path(u), f = a.attrs;
                return a.X = f.x = t, a.Y = f.y = r, a.W = f.width = i, a.H = f.height = s, f.r = o, f.path = u, a.type = "rect", a
            }, n._engine.ellipse = function (e, t, n, r, i) {
                var s = e.path();
                return s.attrs, s.X = t - r, s.Y = n - i, s.W = 2 * r, s.H = 2 * i, s.type = "ellipse", k(s, {cx: t, cy: n, rx: r, ry: i}), s
            }, n._engine.circle = function (e, t, n, r) {
                var i = e.path();
                return i.attrs, i.X = t - r, i.Y = n - r, i.W = i.H = 2 * r, i.type = "circle", k(i, {cx: t, cy: n, r: r}), i
            }, n._engine.image = function (e, t, r, i, s, o) {
                var u = n._rectPath(r, i, s, o), a = e.path(u).attr({stroke: "none"}), l = a.attrs, c = a.node, h = c.getElementsByTagName(f)[0];
                return l.src = t, a.X = l.x = r, a.Y = l.y = i, a.W = l.width = s, a.H = l.height = o, l.path = u, a.type = "image", h.parentNode == c && c.removeChild(h), h.rotate = !0, h.src = t, h.type = "tile", a._.fillpos = [r, i], a._.fillsize = [s, o], c.appendChild(h), N(a, 1, 1, 0, 0, 0), a
            }, n._engine.text = function (e, r, i, o) {
                var u = M("shape"), a = M("path"), f = M("textpath");
                r = r || 0, i = i || 0, o = o || "", a.v = n.format("m{0},{1}l{2},{1}", s(r * w), s(i * w), s(r * w) + 1), a.textpathok = !0, f.string = t(o), f.on = !0, u.style.cssText = b, u.coordsize = w + p + w, u.coordorigin = "0 0";
                var l = new A(u, e), c = {fill: "#000", stroke: "none", font: n._availableAttrs.font, text: o};
                l.shape = u, l.path = a, l.textpath = f, l.type = "text", l.attrs.text = t(o), l.attrs.x = r, l.attrs.y = i, l.attrs.w = 1, l.attrs.h = 1, k(l, c), u.appendChild(f), u.appendChild(a), e.canvas.appendChild(u);
                var h = M("skew");
                return h.on = !0, u.appendChild(h), l.skew = h, l.transform(d), l
            }, n._engine.setSize = function (e, t) {
                var r = this.canvas.style;
                return this.width = e, this.height = t, e == +e && (e += "px"), t == +t && (t += "px"), r.width = e, r.height = t, r.clip = "rect(0 " + e + " " + t + " 0)", this._viewBox && n._engine.setViewBox.apply(this, this._viewBox), this
            }, n._engine.setViewBox = function (e, t, r, i, s) {
                n.eve("raphael.setViewBox", this, this._viewBox, [e, t, r, i, s]);
                var u, a, f = this.width, l = this.height, c = 1 / o(r / f, i / l);
                return s && (u = l / i, a = f / r, f > r * u && (e -= (f - r * u) / 2 / u), l > i * a && (t -= (l - i * a) / 2 / a)), this._viewBox = [e, t, r, i, !!s], this._viewBoxShift = {dx: -e, dy: -t, scale: c}, this.forEach(function (e) {
                    e.transform("...")
                }), this
            };
            var M;
            n._engine.initWin = function (e) {
                var t = e.document;
                t.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
                try {
                    !t.namespaces.rvml && t.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"), M = function (e) {
                        return t.createElement("<rvml:" + e + ' class="rvml">')
                    }
                } catch (n) {
                    M = function (e) {
                        return t.createElement("<" + e + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
                    }
                }
            }, n._engine.initWin(n._g.win), n._engine.create = function () {
                var e = n._getContainer.apply(0, arguments), t = e.container, r = e.height, i = e.width, s = e.x, o = e.y;
                if (!t)throw new Error("VML container not found.");
                var u = new n._Paper, a = u.canvas = n._g.doc.createElement("div"), f = a.style;
                return s = s || 0, o = o || 0, i = i || 512, r = r || 342, u.width = i, u.height = r, i == +i && (i += "px"), r == +r && (r += "px"), u.coordsize = 1e3 * w + p + 1e3 * w, u.coordorigin = "0 0", u.span = n._g.doc.createElement("span"), u.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;", a.appendChild(u.span), f.cssText = n.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", i, r), 1 == t ? (n._g.doc.body.appendChild(a), f.left = s + "px", f.top = o + "px", f.position = "absolute") : t.firstChild ? t.insertBefore(a, t.firstChild) : t.appendChild(a), u.renderfix = function () {
                }, u
            }, n.prototype.clear = function () {
                n.eve("raphael.clear", this), this.canvas.innerHTML = d, this.span = n._g.doc.createElement("span"), this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;", this.canvas.appendChild(this.span), this.bottom = this.top = null
            }, n.prototype.remove = function () {
                n.eve("raphael.remove", this), this.canvas.parentNode.removeChild(this.canvas);
                for (var e in this)this[e] = "function" == typeof this[e] ? n._removedFactory(e) : null;
                return!0
            };
            var _ = n.st;
            for (var D in O)O[e](D) && !_[e](D) && (_[D] = function (e) {
                return function () {
                    var t = arguments;
                    return this.forEach(function (n) {
                        n[e].apply(n, t)
                    })
                }
            }(D))
        }
    }(), k.was ? C.win.Raphael = n : Raphael = n, n
})
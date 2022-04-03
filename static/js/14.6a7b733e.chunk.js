(this["webpackJsonppancake-frontend"] = this["webpackJsonppancake-frontend"] || []).push([
    [14], {
        1978: function(e, t, n) {
            "use strict";
            n.r(t), n.d(t, "default", (function() {
                return q
            }));
            var i, c, o, r = n(10),
                l = n(9),
                u = n(0),
                d = n(5),
                a = n(2),
                j = n(117),
                s = n(14),
                b = n(22),
                x = n(216),
                h = n(580),
                O = n(125),
                f = n(139),
                p = n(58),
                m = n(330),
                v = n(281),
                g = n(1),
                k = Object(d.e)(a.t)(i || (i = Object(l.a)(["\n  background-color: ", ";\n"])), (function(e) {
                    return e.theme.colors.dropdownDeep
                })),
                y = d.e.div(c || (c = Object(l.a)(["\n  min-height: calc(100vh - 600px);\n"])));
            d.e.div(o || (o = Object(l.a)(["\n  min-height: calc(100vh - 64px);\n"])));

            function q() {
                var e = Object(b.a)().account,
                    t = Object(s.b)().t,
                    n = Object(p.l)(),
                    i = Object(u.useMemo)((function() {
                        return n.map((function(e) {
                            return {
                                liquidityToken: Object(p.a)(e),
                                tokens: e
                            }
                        }))
                    }), [n]),
                    c = Object(u.useMemo)((function() {
                        return i.map((function(e) {
                            return e.liquidityToken
                        }))
                    }), [i]),
                    o = Object(O.f)(null !== e && void 0 !== e ? e : void 0, c),
                    l = Object(r.a)(o, 2),
                    d = l[0],
                    q = l[1],
                    w = Object(u.useMemo)((function() {
                        return i.filter((function(e) {
                            var t, n = e.liquidityToken;
                            return null === (t = d[n.address]) || void 0 === t ? void 0 : t.greaterThan("0")
                        }))
                    }), [i, d]),
                    T = Object(f.c)(w.map((function(e) {
                        return e.tokens
                    }))),
                    A = q || (null === T || void 0 === T ? void 0 : T.length) < w.length || (null === T || void 0 === T ? void 0 : T.some((function(e) {
                        return !e
                    }))),
                    D = T.map((function(e) {
                        return Object(r.a)(e, 2)[1]
                    })).filter((function(e) {
                        return Boolean(e)
                    }));
                return Object(g.jsx)(g.Fragment, {
                    children: Object(g.jsxs)(x.a, {
                        bgType: "meerkat_half",
                        children: [Object(g.jsx)(a.R, {
                            justifyContent: "space-between",
                            pt: "24px",
                            flexDirection: ["column", null, null, "row"],
                            children: Object(g.jsx)(a.R, {
                                flex: "1",
                                height: "fit-content",
                                justifyContent: "center",
                                alignItems: "center",
                                mt: ["24px", null, "0"],
                                children: Object(g.jsxs)(v.a, {
                                    children: [Object(g.jsx)(v.b, {
                                        title: t("Your Liquidity"),
                                        subtitle: t("Remove liquidity to receive tokens back")
                                    }), Object(g.jsxs)(k, {
                                        children: [e ? A ? Object(g.jsx)(a.Kb, {
                                            color: "textSubtle",
                                            textAlign: "center",
                                            children: Object(g.jsx)(m.a, {
                                                children: t("Loading")
                                            })
                                        }) : (null === D || void 0 === D ? void 0 : D.length) > 0 ? D.map((function(e, t) {
                                            return Object(g.jsx)(h.b, {
                                                pair: e,
                                                mb: t < D.length - 1 ? "16px" : 0
                                            }, e.liquidityToken.address)
                                        })) : Object(g.jsx)(a.Kb, {
                                            color: "textSubtle",
                                            textAlign: "center",
                                            children: t("No liquidity found.")
                                        }) : Object(g.jsx)(a.Kb, {
                                            color: "textSubtle",
                                            textAlign: "center",
                                            children: t("Connect to a wallet to view your liquidity.")
                                        }), e && !A && Object(g.jsxs)(a.R, {
                                            flexDirection: "column",
                                            alignItems: "center",
                                            mt: "24px",
                                            children: [Object(g.jsx)(a.Kb, {
                                                color: "textSubtle",
                                                mb: "8px",
                                                children: t("Don't see a pool you joined?")
                                            }), Object(g.jsx)(a.o, {
                                                id: "import-pool-link",
                                                variant: "secondary",
                                                scale: "sm",
                                                as: j.a,
                                                to: "/find",
                                                children: t("Find other LP tokens")
                                            })]
                                        })]
                                    }), Object(g.jsx)(a.u, {
                                        style: {
                                            textAlign: "center"
                                        },
                                        children: Object(g.jsx)(a.o, {
                                            id: "join-pool-button",
                                            as: j.a,
                                            to: "/add",
                                            width: "100%",
                                            startIcon: Object(g.jsx)(a.a, {
                                                color: "white"
                                            }),
                                            children: t("Add Liquidity")
                                        })
                                    })]
                                })
                            })
                        }), Object(g.jsx)(y, {})]
                    })
                })
            }
        }
    }
]);
//# sourceMappingURL=14.6a7b733e.chunk.js.map
import fe, { createContext as pe, useState as A, useContext as he, useRef as F, useCallback as O, useEffect as L, useMemo as K } from "react";
var J = { exports: {} }, U = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ne;
function me() {
  if (ne) return U;
  ne = 1;
  var r = Symbol.for("react.transitional.element"), t = Symbol.for("react.fragment");
  function s(a, n, c) {
    var d = null;
    if (c !== void 0 && (d = "" + c), n.key !== void 0 && (d = "" + n.key), "key" in n) {
      c = {};
      for (var b in n)
        b !== "key" && (c[b] = n[b]);
    } else c = n;
    return n = c.ref, {
      $$typeof: r,
      type: a,
      key: d,
      ref: n !== void 0 ? n : null,
      props: c
    };
  }
  return U.Fragment = t, U.jsx = s, U.jsxs = s, U;
}
var X = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var se;
function ge() {
  return se || (se = 1, process.env.NODE_ENV !== "production" && function() {
    function r(e) {
      if (e == null) return null;
      if (typeof e == "function")
        return e.$$typeof === i ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case R:
          return "Fragment";
        case u:
          return "Profiler";
        case l:
          return "StrictMode";
        case M:
          return "Suspense";
        case D:
          return "SuspenseList";
        case p:
          return "Activity";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case z:
            return "Portal";
          case y:
            return (e.displayName || "Context") + ".Provider";
          case f:
            return (e._context.displayName || "Context") + ".Consumer";
          case B:
            var m = e.render;
            return e = e.displayName, e || (e = m.displayName || m.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case k:
            return m = e.displayName || null, m !== null ? m : r(e.type) || "Memo";
          case j:
            m = e._payload, e = e._init;
            try {
              return r(e(m));
            } catch {
            }
        }
      return null;
    }
    function t(e) {
      return "" + e;
    }
    function s(e) {
      try {
        t(e);
        var m = !1;
      } catch {
        m = !0;
      }
      if (m) {
        m = console;
        var E = m.error, N = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return E.call(
          m,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          N
        ), t(e);
      }
    }
    function a(e) {
      if (e === R) return "<>";
      if (typeof e == "object" && e !== null && e.$$typeof === j)
        return "<...>";
      try {
        var m = r(e);
        return m ? "<" + m + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function n() {
      var e = h.A;
      return e === null ? null : e.getOwner();
    }
    function c() {
      return Error("react-stack-top-frame");
    }
    function d(e) {
      if (_.call(e, "key")) {
        var m = Object.getOwnPropertyDescriptor(e, "key").get;
        if (m && m.isReactWarning) return !1;
      }
      return e.key !== void 0;
    }
    function b(e, m) {
      function E() {
        V || (V = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          m
        ));
      }
      E.isReactWarning = !0, Object.defineProperty(e, "key", {
        get: E,
        configurable: !0
      });
    }
    function o() {
      var e = r(this.type);
      return Q[e] || (Q[e] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), e = this.props.ref, e !== void 0 ? e : null;
    }
    function v(e, m, E, N, Y, I, q, H) {
      return E = I.ref, e = {
        $$typeof: x,
        type: e,
        key: m,
        props: I,
        _owner: Y
      }, (E !== void 0 ? E : null) !== null ? Object.defineProperty(e, "ref", {
        enumerable: !1,
        get: o
      }) : Object.defineProperty(e, "ref", { enumerable: !1, value: null }), e._store = {}, Object.defineProperty(e._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(e, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(e, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: q
      }), Object.defineProperty(e, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: H
      }), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
    }
    function w(e, m, E, N, Y, I, q, H) {
      var T = m.children;
      if (T !== void 0)
        if (N)
          if (P(T)) {
            for (N = 0; N < T.length; N++)
              C(T[N]);
            Object.freeze && Object.freeze(T);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else C(T);
      if (_.call(m, "key")) {
        T = r(e);
        var W = Object.keys(m).filter(function(de) {
          return de !== "key";
        });
        N = 0 < W.length ? "{key: someKey, " + W.join(": ..., ") + ": ...}" : "{key: someKey}", re[T + N] || (W = 0 < W.length ? "{" + W.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          N,
          T,
          W,
          T
        ), re[T + N] = !0);
      }
      if (T = null, E !== void 0 && (s(E), T = "" + E), d(m) && (s(m.key), T = "" + m.key), "key" in m) {
        E = {};
        for (var Z in m)
          Z !== "key" && (E[Z] = m[Z]);
      } else E = m;
      return T && b(
        E,
        typeof e == "function" ? e.displayName || e.name || "Unknown" : e
      ), v(
        e,
        T,
        I,
        Y,
        n(),
        E,
        q,
        H
      );
    }
    function C(e) {
      typeof e == "object" && e !== null && e.$$typeof === x && e._store && (e._store.validated = 1);
    }
    var S = fe, x = Symbol.for("react.transitional.element"), z = Symbol.for("react.portal"), R = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), u = Symbol.for("react.profiler"), f = Symbol.for("react.consumer"), y = Symbol.for("react.context"), B = Symbol.for("react.forward_ref"), M = Symbol.for("react.suspense"), D = Symbol.for("react.suspense_list"), k = Symbol.for("react.memo"), j = Symbol.for("react.lazy"), p = Symbol.for("react.activity"), i = Symbol.for("react.client.reference"), h = S.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, _ = Object.prototype.hasOwnProperty, P = Array.isArray, $ = console.createTask ? console.createTask : function() {
      return null;
    };
    S = {
      "react-stack-bottom-frame": function(e) {
        return e();
      }
    };
    var V, Q = {}, ee = S["react-stack-bottom-frame"].bind(
      S,
      c
    )(), te = $(a(c)), re = {};
    X.Fragment = R, X.jsx = function(e, m, E, N, Y) {
      var I = 1e4 > h.recentlyCreatedOwnerStacks++;
      return w(
        e,
        m,
        E,
        !1,
        N,
        Y,
        I ? Error("react-stack-top-frame") : ee,
        I ? $(a(e)) : te
      );
    }, X.jsxs = function(e, m, E, N, Y) {
      var I = 1e4 > h.recentlyCreatedOwnerStacks++;
      return w(
        e,
        m,
        E,
        !0,
        N,
        Y,
        I ? Error("react-stack-top-frame") : ee,
        I ? $(a(e)) : te
      );
    };
  }()), X;
}
var oe;
function be() {
  return oe || (oe = 1, process.env.NODE_ENV === "production" ? J.exports = me() : J.exports = ge()), J.exports;
}
var g = be();
const ve = {
  board: {
    className: "",
    columns: 4,
    height: 500,
    rows: 5,
    scatterArea: 0,
    showBoardSlotOutlines: !0,
    snapThreshold: 20,
    width: 400
  },
  checkLocalStorage: !1,
  onComplete: () => {
  },
  onRefresh: () => {
  },
  puzzlePiece: {
    strokeColor: "gold",
    strokeEnabled: !0
  },
  puzzle: {
    className: "",
    responsive: !1,
    timer: {
      className: "",
      enabled: !1
    },
    refreshButton: {
      className: "",
      enabled: !1
    },
    rowsAndColumns: {
      className: "",
      enabled: !1
    }
  }
}, we = "react-jigsaw", ce = 2, ie = pe(void 0), ze = (r) => {
  if (typeof window < "u" && r) {
    const t = localStorage.getItem(we);
    if (t) {
      const s = JSON.parse(t);
      if (typeof s.rows == "number" && typeof s.columns == "number")
        return { rows: s.rows, columns: s.columns };
    }
  }
  return {};
}, Se = (r) => {
  const { rows: t, columns: s } = ze(
    r.checkLocalStorage
  ), [a, n] = A(s ?? r.columns), [c, d] = A(t ?? r.rows), [b, o] = A(!0), [v, w] = A(0), C = c * a, z = {
    columns: a,
    numPieces: C,
    refreshCount: v,
    rows: c,
    timerIsRunning: b,
    setBoardGrid: (R, l) => {
      d(R), n(l), o(!1), setTimeout(() => o(!0), 10);
    },
    refreshBoard: () => {
      o(!1), w((R) => R + 1), setTimeout(() => o(!0), 10);
    },
    setTimerIsRunning: o
  };
  return /* @__PURE__ */ g.jsx(ie.Provider, { value: z, children: r.children });
}, Re = () => {
  const r = he(ie);
  if (!r)
    throw new Error("usePuzzleContext must be used within a PuzzleProvider");
  return r;
}, xe = (r, t) => t ? {
  board: {
    className: t.board?.className ?? r.board.className,
    columns: t.board?.columns ?? r.board.columns,
    height: t.board?.height ?? r.board.height,
    rows: t.board?.rows ?? r.board.rows,
    scatterArea: t.board?.scatterArea ?? r.board.scatterArea,
    showBoardSlotOutlines: t.board?.showBoardSlotOutlines ?? r.board.showBoardSlotOutlines,
    snapThreshold: t.board?.snapThreshold ?? r.board.snapThreshold,
    width: t.board?.width ?? r.board.width
  },
  checkLocalStorage: t.checkLocalStorage ?? r.checkLocalStorage,
  onComplete: t.onComplete ?? r.onComplete,
  onRefresh: t.onRefresh ?? r.onRefresh,
  puzzlePiece: {
    strokeColor: t.puzzlePiece?.strokeColor ?? r.puzzlePiece.strokeColor,
    strokeEnabled: t.puzzlePiece?.strokeEnabled ?? r.puzzlePiece.strokeEnabled
  },
  puzzle: {
    className: t.puzzle?.className ?? r.puzzle.className,
    responsive: t.puzzle?.responsive ?? r.puzzle.responsive,
    timer: {
      className: t.puzzle?.timer?.className ?? r.puzzle.timer.className,
      enabled: t.puzzle?.timer?.enabled ?? r.puzzle.timer.enabled
    },
    refreshButton: {
      className: t.puzzle?.refreshButton?.className ?? r.puzzle.refreshButton.className,
      enabled: t.puzzle?.refreshButton?.enabled ?? r.puzzle.refreshButton.enabled
    },
    rowsAndColumns: {
      className: t.puzzle?.rowsAndColumns?.className ?? r.puzzle.rowsAndColumns.className,
      enabled: t.puzzle?.rowsAndColumns?.enabled ?? r.puzzle.rowsAndColumns.enabled
    }
  }
} : r;
function _e({
  initialX: r,
  initialY: t,
  boardRef: s,
  targetX: a,
  targetY: n,
  snapThreshold: c,
  onSnap: d
}) {
  const b = F(null), [o, v] = A({
    isDragging: !1,
    x: r,
    y: t
  }), [w, C] = A(!1), S = F(null), x = F(null), z = O(
    (p, i) => {
      const h = s.current;
      if (!h) return { x: p, y: i };
      const _ = h.createSVGPoint();
      _.x = p, _.y = i;
      const P = _.matrixTransform(h.getScreenCTM()?.inverse());
      return { x: P.x, y: P.y };
    },
    [s]
  ), R = O(
    (p, i) => Math.hypot(p - a, i - n) <= c ? (C(!0), v((_) => ({ ..._, x: a, y: n, isDragging: !1 })), d?.(), !0) : !1,
    [a, n, c, d]
  ), l = O(
    (p) => {
      const i = S.current;
      if (!i || !i.isDragging || p.pointerId !== i.pointerId) return;
      const h = z(p.clientX, p.clientY), _ = h.x - i.offsetX, P = h.y - i.offsetY;
      v(($) => ({ ...$, x: _, y: P })), p.preventDefault();
    },
    [z]
  );
  x.current = l;
  const u = O(
    (p) => {
      const i = S.current;
      if (!i || !i.isDragging || p.pointerId !== i.pointerId) return;
      i.isDragging = !1, x.current && window.removeEventListener("pointermove", x.current), window.removeEventListener("pointerup", u), window.removeEventListener("pointercancel", u);
      const h = b.current;
      h && h.hasPointerCapture(p.pointerId) && h.releasePointerCapture(p.pointerId);
      const _ = z(p.clientX, p.clientY), P = _.x - i.offsetX, $ = _.y - i.offsetY;
      S.current = null, R(P, $) || v((V) => ({ ...V, isDragging: !1 })), p.preventDefault();
    },
    [z, R]
  ), f = O(
    (p) => {
      if (w || !p.isPrimary) return;
      const i = b.current;
      if (!i) return;
      const h = z(p.clientX, p.clientY), _ = h.x - o.x, P = h.y - o.y;
      S.current = {
        offsetX: _,
        offsetY: P,
        pointerId: p.pointerId,
        isDragging: !0
      }, i.setPointerCapture(p.pointerId), x.current && window.addEventListener("pointermove", x.current, { passive: !1 }), window.addEventListener("pointerup", u, { passive: !1 }), window.addEventListener("pointercancel", u, { passive: !1 }), v(($) => ({ ...$, isDragging: !0 })), p.preventDefault();
    },
    [w, o.x, o.y, z, u]
  ), y = O((p) => {
    p.preventDefault();
  }, []), B = O((p) => {
    p.preventDefault();
  }, []), M = O(
    (p) => {
      u(p.nativeEvent);
    },
    [u]
  ), D = O(
    (p, i) => {
      w || v((h) => ({ ...h, x: p, y: i }));
    },
    [w]
  ), k = O(
    (p, i) => {
      w || v((h) => ({ ...h, x: h.x + p, y: h.y + i }));
    },
    [w]
  ), j = O(() => w ? !1 : R(o.x, o.y), [w, o.x, o.y, R]);
  return {
    ref: b,
    dragState: o,
    isSnapped: w,
    moveTo: D,
    moveBy: k,
    trySnap: j,
    handlers: {
      onPointerDown: f,
      onPointerMove: y,
      onPointerUp: B,
      onPointerCancel: M,
      style: {
        touchAction: "none",
        cursor: w ? "default" : o.isDragging ? "grabbing" : "grab"
      }
    }
  };
}
const Ee = "_puzzlePiece_10f4h_1", Ce = {
  puzzlePiece: Ee
}, Pe = 10, $e = ({
  boardHeight: r,
  boardWidth: t,
  image: s,
  pieceIndex: a,
  initialX: n,
  initialY: c,
  path: d,
  snapThreshold: b,
  boardRef: o,
  targetX: v,
  targetY: w,
  puzzlePieceOptions: C,
  onSnap: S,
  onSnapWithKeyboard: x,
  registerPieceRef: z,
  boardSlotKey: R
}) => {
  const { ref: l, dragState: u, isSnapped: f, moveBy: y, trySnap: B, handlers: M } = _e({
    initialX: n,
    initialY: c,
    snapThreshold: b,
    boardRef: o,
    targetX: v,
    targetY: w,
    onSnap: S
  });
  L(() => (z && z(R, l.current), () => {
    z && z(R, null);
  }), [l, z, R]);
  const D = (k) => {
    if (f) return;
    const j = Pe;
    switch (k.key) {
      case "ArrowUp":
        k.preventDefault(), y(0, -j);
        break;
      case "ArrowDown":
        k.preventDefault(), y(0, j);
        break;
      case "ArrowLeft":
        k.preventDefault(), y(-j, 0);
        break;
      case "ArrowRight":
        k.preventDefault(), y(j, 0);
        break;
      case "Enter":
      case " ": {
        k.preventDefault(), B() && x && x();
        break;
      }
    }
  };
  return L(() => {
    u.isDragging && l.current && l.current.parentNode && !f && l.current.parentNode.appendChild(l.current);
  }, [l, u.isDragging, f]), L(() => {
    if (!u.isDragging && f && l.current && l.current.parentNode) {
      const k = l.current.parentNode;
      k.firstChild !== l.current && k.insertBefore(l.current, k.firstChild);
    }
  }, [l, u.isDragging, f]), /* @__PURE__ */ g.jsxs(
    "g",
    {
      ref: l,
      transform: f ? "" : `translate(${u.x},${u.y})`,
      ...M,
      className: Ce.puzzlePiece,
      tabIndex: f ? -1 : 0,
      onKeyDown: D,
      children: [
        /* @__PURE__ */ g.jsx("defs", { children: /* @__PURE__ */ g.jsx("clipPath", { id: `piece-clip-${a}`, children: /* @__PURE__ */ g.jsx("path", { d }) }) }),
        /* @__PURE__ */ g.jsx(
          "image",
          {
            href: s,
            x: 0,
            y: 0,
            width: t,
            height: r,
            clipPath: `url(#piece-clip-${a})`,
            preserveAspectRatio: "xMidYMid slice"
          }
        ),
        /* @__PURE__ */ g.jsx(
          "path",
          {
            d,
            fill: "none",
            stroke: f || !C.strokeEnabled ? "" : C.strokeColor,
            strokeWidth: C.strokeEnabled ? ce : 0
          }
        )
      ]
    }
  );
}, ke = ({
  columns: r,
  rows: t
}) => {
  const s = [];
  for (let a = 0; a < t; a++) {
    s[a] = [];
    for (let n = 0; n < r; n++) {
      const c = n === r - 1 ? 0 : (a + n) % 2 === 0 ? 1 : -1, d = a === t - 1 ? 0 : (a + n) % 2 === 0 ? 1 : -1, b = n === 0 ? 0 : -s[a][n - 1][1], o = a === 0 ? 0 : -s[a - 1][n][2];
      s[a][n] = [o, c, d, b];
    }
  }
  return s;
}, ue = ({
  col: r,
  row: t,
  options: s
}) => {
  const { boardWidth: a, boardHeight: n, rows: c, columns: d, edgeMap: b } = s, o = a / d, v = n / c, w = r * o, C = t * v, [S, x, z, R] = b[t][r], l = Math.min(o, v) / 3, u = l / 2;
  let f = `M${w},${C}`;
  return S === 0 ? f += ` h${o}` : (f += ` h${(o - l) / 2}`, f += ` a${u},${u} 0 0 ${S === 1 ? 1 : 0} ${l},0`, f += ` h${(o - l) / 2}`), x === 0 ? f += ` v${v}` : (f += ` v${(v - l) / 2}`, f += ` a${u},${u} 0 0 ${x === 1 ? 1 : 0} 0,${l}`, f += ` v${(v - l) / 2}`), z === 0 ? f += ` h-${o}` : (f += ` h-${(o - l) / 2}`, f += ` a${u},${u} 0 0 ${z === 1 ? 1 : 0} -${l},0`, f += ` h-${(o - l) / 2}`), R === 0 ? f += ` v-${v}` : (f += ` v-${(v - l) / 2}`, f += ` a${u},${u} 0 0 ${R === 1 ? 1 : 0} 0,-${l}`, f += ` v-${(v - l) / 2}`), f += " Z", f;
}, Ne = "_boardSlotOutline_1x34h_1", Te = "_snapped_1x34h_7", ae = {
  boardSlotOutline: Ne,
  snapped: Te
}, ye = (r) => {
  const { boardPathOptions: t, boardSlots: s, showBoardSlotOutlines: a, snappedPieceIds: n } = r;
  return a ? /* @__PURE__ */ g.jsx("g", { "data-testid": "board-outlines", children: s.map(({ pieceRow: c, pieceCol: d }) => {
    const b = `${c}-${d}`, o = n.has(b);
    return /* @__PURE__ */ g.jsx(
      "path",
      {
        "data-testid": `outline-${c}-${d}`,
        className: `${ae.boardSlotOutline} ${o ? ae.snapped : ""}`,
        d: ue({ row: c, col: d, options: t })
      },
      `outline-${c}-${d}`
    );
  }) }) : null;
}, je = (r, t) => Array.from({ length: r * t }, (s, a) => ({
  // Math.floor(i / columns) gives us the row number (0, 1, 2, ...)
  // i % columns gives us the column number (0, 1, 2, ..., columns-1)
  pieceRow: Math.floor(a / t),
  pieceCol: a % t
})), Oe = (r) => {
  const t = [...r];
  for (let s = t.length - 1; s > 0; s--) {
    const a = Math.floor(Math.random() * (s + 1));
    [t[s], t[a]] = [t[a], t[s]];
  }
  return t;
}, Ae = ({
  boardWidth: r,
  boardHeight: t,
  boardSlots: s,
  pieceHeight: a,
  pieceWidth: n,
  scatterArea: c
}) => {
  const d = Oe(s), b = r + c * 2, o = t + c * 2, v = -c, w = -c;
  return d.map(({ pieceRow: C, pieceCol: S }) => {
    const x = v + Math.random() * (b - n), z = w + Math.random() * (o - a), R = S * n, l = C * a, u = x - R, f = z - l;
    return { pieceRow: C, pieceCol: S, x: u, y: f };
  });
}, Ie = "_board_srrvi_1", De = {
  board: Ie
}, Be = (r) => {
  const {
    boardHeight: t,
    boardWidth: s,
    className: a,
    columns: n,
    image: c,
    onPuzzleComplete: d,
    puzzlePieceOptions: b,
    rows: o,
    showBoardSlotOutlines: v,
    snapThreshold: w,
    scatterArea: C
  } = r, S = t / o, x = s / n, [z, R] = A([]), [l, u] = A(/* @__PURE__ */ new Set()), f = F(null), y = F(/* @__PURE__ */ new Map()), B = K(() => ke({ rows: o, columns: n }), [o, n]), M = K(
    () => ({
      boardHeight: t,
      boardWidth: s,
      columns: n,
      edgeMap: B,
      rows: o
    }),
    [t, s, n, B, o]
  ), D = K(() => je(o, n), [o, n]);
  L(() => {
    const i = Ae({
      boardHeight: t,
      boardWidth: s,
      boardSlots: D,
      pieceHeight: S,
      pieceWidth: x,
      scatterArea: C
    });
    R(i), u(/* @__PURE__ */ new Set()), y.current.clear();
  }, [t, s, D, S, x, C]), L(() => {
    const i = o * n;
    l.size === i && d?.();
  }, [l.size, o, n, d]);
  const k = (i) => {
    const { pieceRow: h, pieceCol: _ } = z[i], P = `${h}-${_}`;
    u(($) => /* @__PURE__ */ new Set([...$, P]));
  }, j = (i) => {
    const h = z.find((_, P) => {
      const $ = `${_.pieceRow}-${_.pieceCol}`;
      return P !== i && !l.has($);
    });
    if (h) {
      const _ = `${h.pieceRow}-${h.pieceCol}`, P = y.current.get(_);
      P && P.focus();
    }
  }, p = (i, h) => {
    h ? y.current.set(i, h) : y.current.delete(i);
  };
  return /* @__PURE__ */ g.jsxs(
    "svg",
    {
      ref: f,
      className: `${De.board} ${a}`,
      "data-testid": "board",
      height: t,
      width: s,
      viewBox: `0 0 ${s} ${t}`,
      children: [
        /* @__PURE__ */ g.jsx(
          ye,
          {
            boardPathOptions: M,
            boardSlots: D,
            showBoardSlotOutlines: v,
            snappedPieceIds: l
          }
        ),
        z.map(({ pieceRow: i, pieceCol: h, x: _, y: P }, $) => /* @__PURE__ */ g.jsx(
          $e,
          {
            boardHeight: t,
            boardWidth: s,
            boardSlotKey: `${i}-${h}`,
            image: c,
            pieceIndex: $,
            initialX: _,
            initialY: P,
            onSnap: () => k($),
            onSnapWithKeyboard: () => j($),
            path: ue({ col: h, row: i, options: M }),
            puzzlePieceOptions: b,
            registerPieceRef: p,
            snapThreshold: w,
            boardRef: f,
            targetX: h * x / 100,
            targetY: i * S / 100
          },
          `${i}-${h}`
        ))
      ]
    }
  );
}, Me = "_editRowsColumns_1gi2i_1", Ye = "_inlineNote_1gi2i_51", le = {
  editRowsColumns: Me,
  inlineNote: Ye
}, Le = (r) => {
  const { className: t, currentColumns: s, currentRows: a, onBoardSlotChange: n } = r, [c, d] = A(a.toString()), [b, o] = A(s.toString()), v = parseInt(c) !== a || parseInt(b) !== s, w = parseInt(c) >= 2 && parseInt(c) <= 10, C = parseInt(b) >= 2 && parseInt(b) <= 10, S = w && C && v;
  L(() => {
    d(a.toString()), o(s.toString());
  }, [a, s]);
  const x = (l) => {
    const u = l.target.value;
    (u === "" || /^\d+$/.test(u)) && d(u);
  }, z = (l) => {
    const u = l.target.value;
    (u === "" || /^\d+$/.test(u)) && o(u);
  }, R = (l) => {
    l.preventDefault(), S && (localStorage.setItem(
      "react-jigsaw",
      JSON.stringify({
        rows: parseFloat(c),
        columns: parseFloat(b)
      })
    ), n(parseInt(c), parseInt(b)));
  };
  return /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
    /* @__PURE__ */ g.jsxs(
      "form",
      {
        "data-testid": "edit-rows-columns",
        className: `${le.editRowsColumns} ${t}`,
        onSubmit: R,
        children: [
          /* @__PURE__ */ g.jsxs("label", { children: [
            "Rows:",
            /* @__PURE__ */ g.jsx("input", { type: "text", value: c, onChange: x, placeholder: "2-10" })
          ] }),
          /* @__PURE__ */ g.jsxs("label", { children: [
            "Cols:",
            /* @__PURE__ */ g.jsx("input", { type: "text", value: b, onChange: z, placeholder: "2-10" })
          ] }),
          /* @__PURE__ */ g.jsx("input", { type: "submit", value: "Ok", disabled: !S })
        ]
      }
    ),
    /* @__PURE__ */ g.jsx("span", { className: le.inlineNote, children: "(Valid numbers: 2-10)" })
  ] });
}, We = "_refreshButton_17b0p_1", Fe = {
  refreshButton: We
}, Ue = (r) => {
  const { className: t, onRefresh: s } = r;
  return /* @__PURE__ */ g.jsx(
    "button",
    {
      "data-testid": "refresh-button",
      className: `${Fe.refreshButton} ${t}`,
      onClick: s,
      title: "Refresh puzzle",
      children: /* @__PURE__ */ g.jsxs(
        "svg",
        {
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: ce,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            /* @__PURE__ */ g.jsx("path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }),
            /* @__PURE__ */ g.jsx("path", { d: "M21 3v5h-5" }),
            /* @__PURE__ */ g.jsx("path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }),
            /* @__PURE__ */ g.jsx("path", { d: "M3 21v-5h5" })
          ]
        }
      )
    }
  );
}, Xe = "_timer_thvwo_1", Ge = {
  timer: Xe
}, Ve = (r) => {
  const { className: t, isRunning: s, onTimeUpdate: a } = r, [n, c] = A(0), d = F(null);
  L(() => (s ? d.current = setInterval(() => {
    c((o) => {
      const v = o + 1;
      return a?.(v), v;
    });
  }, 1e3) : d.current && (clearInterval(d.current), d.current = null), () => {
    d.current && clearInterval(d.current);
  }), [s, a]), L(() => {
    s && c(0);
  }, [s]);
  const b = (o) => {
    const v = Math.floor(o / 60), w = o % 60;
    return `${v.toString().padStart(2, "0")}:${w.toString().padStart(2, "0")}`;
  };
  return /* @__PURE__ */ g.jsx("div", { "data-testid": "timer", className: `${Ge.timer} ${t}`, children: b(n) });
}, Je = "_puzzle_c9hl6_1", qe = "_responsive_c9hl6_5", He = "_settingsContainer_c9hl6_13", G = {
  puzzle: Je,
  responsive: qe,
  settingsContainer: He
}, Ze = (r) => {
  const { image: t, onComplete: s, onRefresh: a, options: n } = r, {
    columns: c,
    refreshBoard: d,
    refreshCount: b,
    rows: o,
    setBoardGrid: v,
    setTimerIsRunning: w,
    timerIsRunning: C
  } = Re(), S = (f, y) => {
    v(f, y);
  }, x = () => {
    a?.(), d();
  }, z = () => {
    w(!1), s?.();
  }, R = n.board.width / n.board.height, l = n.puzzle.responsive ? `${G.puzzle} ${G.responsive}` : G.puzzle, u = n.puzzle.responsive ? { "--puzzle-aspect-ratio": R.toString() } : {};
  return /* @__PURE__ */ g.jsxs("div", { "data-testid": "puzzle-content", className: l, style: { ...u }, children: [
    n.puzzle.timer.enabled || n.puzzle.refreshButton.enabled ? /* @__PURE__ */ g.jsxs("div", { className: G.settingsContainer, children: [
      n.puzzle.timer.enabled && /* @__PURE__ */ g.jsx(Ve, { className: n.puzzle.timer.className, isRunning: C }),
      n.puzzle.refreshButton.enabled && /* @__PURE__ */ g.jsx(
        Ue,
        {
          className: n.puzzle.refreshButton.className,
          onRefresh: x
        }
      )
    ] }) : null,
    /* @__PURE__ */ g.jsx(
      Be,
      {
        boardHeight: n.board.height,
        boardWidth: n.board.width,
        className: n.board.className,
        columns: c,
        image: t,
        onPuzzleComplete: z,
        puzzlePieceOptions: n.puzzlePiece,
        rows: o,
        scatterArea: n.board.scatterArea,
        showBoardSlotOutlines: n.board.showBoardSlotOutlines,
        snapThreshold: n.board.snapThreshold
      },
      `${o}-${c}-${b}`
    ),
    n.puzzle.rowsAndColumns.enabled && /* @__PURE__ */ g.jsx("div", { className: G.settingsContainer, children: /* @__PURE__ */ g.jsx(
      Le,
      {
        className: n.puzzle.rowsAndColumns.className,
        currentRows: o,
        currentColumns: c,
        onBoardSlotChange: S
      }
    ) })
  ] });
}, Qe = (r) => {
  const { options: t } = r, s = xe(ve, t);
  return /* @__PURE__ */ g.jsx(
    Se,
    {
      checkLocalStorage: s.checkLocalStorage,
      columns: s.board.columns,
      rows: s.board.rows,
      children: /* @__PURE__ */ g.jsx(Ze, { ...r, options: s })
    }
  );
};
export {
  ve as DEFAULT_PUZZLE_OPTIONS,
  Qe as Puzzle
};

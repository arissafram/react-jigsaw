import fe, { createContext as pe, useState as I, useContext as me, useRef as U, useCallback as A, useEffect as W, useMemo as K } from "react";
var J = { exports: {} }, X = {};
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
function he() {
  if (ne) return X;
  ne = 1;
  var r = Symbol.for("react.transitional.element"), t = Symbol.for("react.fragment");
  function o(s, n, l) {
    var f = null;
    if (l !== void 0 && (f = "" + l), n.key !== void 0 && (f = "" + n.key), "key" in n) {
      l = {};
      for (var g in n)
        g !== "key" && (l[g] = n[g]);
    } else l = n;
    return n = l.ref, {
      $$typeof: r,
      type: s,
      key: f,
      ref: n !== void 0 ? n : null,
      props: l
    };
  }
  return X.Fragment = t, X.jsx = o, X.jsxs = o, X;
}
var G = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var oe;
function be() {
  return oe || (oe = 1, process.env.NODE_ENV !== "production" && function() {
    function r(e) {
      if (e == null) return null;
      if (typeof e == "function")
        return e.$$typeof === R ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case z:
          return "Fragment";
        case u:
          return "Profiler";
        case c:
          return "StrictMode";
        case M:
          return "Suspense";
        case Y:
          return "SuspenseList";
        case m:
          return "Activity";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case w:
            return "Portal";
          case y:
            return (e.displayName || "Context") + ".Provider";
          case p:
            return (e._context.displayName || "Context") + ".Consumer";
          case D:
            var h = e.render;
            return e = e.displayName, e || (e = h.displayName || h.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case $:
            return h = e.displayName || null, h !== null ? h : r(e.type) || "Memo";
          case O:
            h = e._payload, e = e._init;
            try {
              return r(e(h));
            } catch {
            }
        }
      return null;
    }
    function t(e) {
      return "" + e;
    }
    function o(e) {
      try {
        t(e);
        var h = !1;
      } catch {
        h = !0;
      }
      if (h) {
        h = console;
        var _ = h.error, N = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return _.call(
          h,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          N
        ), t(e);
      }
    }
    function s(e) {
      if (e === z) return "<>";
      if (typeof e == "object" && e !== null && e.$$typeof === O)
        return "<...>";
      try {
        var h = r(e);
        return h ? "<" + h + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function n() {
      var e = d.A;
      return e === null ? null : e.getOwner();
    }
    function l() {
      return Error("react-stack-top-frame");
    }
    function f(e) {
      if (S.call(e, "key")) {
        var h = Object.getOwnPropertyDescriptor(e, "key").get;
        if (h && h.isReactWarning) return !1;
      }
      return e.key !== void 0;
    }
    function g(e, h) {
      function _() {
        j || (j = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          h
        ));
      }
      _.isReactWarning = !0, Object.defineProperty(e, "key", {
        get: _,
        configurable: !0
      });
    }
    function a() {
      var e = r(this.type);
      return Q[e] || (Q[e] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), e = this.props.ref, e !== void 0 ? e : null;
    }
    function i(e, h, _, N, L, B, q, H) {
      return _ = B.ref, e = {
        $$typeof: x,
        type: e,
        key: h,
        props: B,
        _owner: L
      }, (_ !== void 0 ? _ : null) !== null ? Object.defineProperty(e, "ref", {
        enumerable: !1,
        get: a
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
    function v(e, h, _, N, L, B, q, H) {
      var T = h.children;
      if (T !== void 0)
        if (N)
          if (P(T)) {
            for (N = 0; N < T.length; N++)
              E(T[N]);
            Object.freeze && Object.freeze(T);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else E(T);
      if (S.call(h, "key")) {
        T = r(e);
        var F = Object.keys(h).filter(function(de) {
          return de !== "key";
        });
        N = 0 < F.length ? "{key: someKey, " + F.join(": ..., ") + ": ...}" : "{key: someKey}", re[T + N] || (F = 0 < F.length ? "{" + F.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          N,
          T,
          F,
          T
        ), re[T + N] = !0);
      }
      if (T = null, _ !== void 0 && (o(_), T = "" + _), f(h) && (o(h.key), T = "" + h.key), "key" in h) {
        _ = {};
        for (var Z in h)
          Z !== "key" && (_[Z] = h[Z]);
      } else _ = h;
      return T && g(
        _,
        typeof e == "function" ? e.displayName || e.name || "Unknown" : e
      ), i(
        e,
        T,
        B,
        L,
        n(),
        _,
        q,
        H
      );
    }
    function E(e) {
      typeof e == "object" && e !== null && e.$$typeof === x && e._store && (e._store.validated = 1);
    }
    var C = fe, x = Symbol.for("react.transitional.element"), w = Symbol.for("react.portal"), z = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), u = Symbol.for("react.profiler"), p = Symbol.for("react.consumer"), y = Symbol.for("react.context"), D = Symbol.for("react.forward_ref"), M = Symbol.for("react.suspense"), Y = Symbol.for("react.suspense_list"), $ = Symbol.for("react.memo"), O = Symbol.for("react.lazy"), m = Symbol.for("react.activity"), R = Symbol.for("react.client.reference"), d = C.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, S = Object.prototype.hasOwnProperty, P = Array.isArray, k = console.createTask ? console.createTask : function() {
      return null;
    };
    C = {
      "react-stack-bottom-frame": function(e) {
        return e();
      }
    };
    var j, Q = {}, ee = C["react-stack-bottom-frame"].bind(
      C,
      l
    )(), te = k(s(l)), re = {};
    G.Fragment = z, G.jsx = function(e, h, _, N, L) {
      var B = 1e4 > d.recentlyCreatedOwnerStacks++;
      return v(
        e,
        h,
        _,
        !1,
        N,
        L,
        B ? Error("react-stack-top-frame") : ee,
        B ? k(s(e)) : te
      );
    }, G.jsxs = function(e, h, _, N, L) {
      var B = 1e4 > d.recentlyCreatedOwnerStacks++;
      return v(
        e,
        h,
        _,
        !0,
        N,
        L,
        B ? Error("react-stack-top-frame") : ee,
        B ? k(s(e)) : te
      );
    };
  }()), G;
}
var se;
function ge() {
  return se || (se = 1, process.env.NODE_ENV === "production" ? J.exports = he() : J.exports = be()), J.exports;
}
var b = ge();
const ve = {
  board: {
    className: "",
    columns: 4,
    height: 500,
    outlineStrokeColor: "#bbb",
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
      const o = JSON.parse(t);
      if (typeof o.rows == "number" && typeof o.columns == "number")
        return { rows: o.rows, columns: o.columns };
    }
  }
  return {};
}, Se = (r) => {
  const { rows: t, columns: o } = ze(
    r.checkLocalStorage
  ), [s, n] = I(o ?? r.columns), [l, f] = I(t ?? r.rows), [g, a] = I(!0), [i, v] = I(0), E = l * s, w = {
    columns: s,
    numPieces: E,
    refreshCount: i,
    rows: l,
    timerIsRunning: g,
    setBoardGrid: (z, c) => {
      f(z), n(c), a(!1), setTimeout(() => a(!0), 10);
    },
    refreshBoard: () => {
      a(!1), v((z) => z + 1), setTimeout(() => a(!0), 10);
    },
    setTimerIsRunning: a
  };
  return /* @__PURE__ */ b.jsx(ie.Provider, { value: w, children: r.children });
}, Re = () => {
  const r = me(ie);
  if (!r)
    throw new Error("usePuzzleContext must be used within a PuzzleProvider");
  return r;
}, Ce = (r, t) => t ? {
  board: {
    className: t.board?.className ?? r.board.className,
    columns: t.board?.columns ?? r.board.columns,
    height: t.board?.height ?? r.board.height,
    outlineStrokeColor: t.board?.outlineStrokeColor ?? r.board.outlineStrokeColor,
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
function xe({
  initialX: r,
  initialY: t,
  boardRef: o,
  targetX: s,
  targetY: n,
  snapThreshold: l,
  onSnap: f
}) {
  const g = U(null), [a, i] = I({
    isDragging: !1,
    x: r,
    y: t
  }), [v, E] = I(!1), C = U(null), x = U(null), w = A(
    (m, R) => {
      const d = o.current;
      if (!d) return { x: m, y: R };
      const S = d.createSVGPoint();
      S.x = m, S.y = R;
      const P = S.matrixTransform(d.getScreenCTM()?.inverse());
      return { x: P.x, y: P.y };
    },
    [o]
  ), z = A(
    (m, R) => Math.hypot(m - s, R - n) <= l ? (E(!0), i((S) => ({ ...S, x: s, y: n, isDragging: !1 })), f?.(), !0) : !1,
    [s, n, l, f]
  ), c = A(
    (m) => {
      const R = C.current;
      if (!R || !R.isDragging || m.pointerId !== R.pointerId) return;
      const d = w(m.clientX, m.clientY), S = d.x - R.offsetX, P = d.y - R.offsetY;
      i((k) => ({ ...k, x: S, y: P })), m.preventDefault();
    },
    [w]
  );
  x.current = c;
  const u = A(
    (m) => {
      const R = C.current;
      if (!R || !R.isDragging || m.pointerId !== R.pointerId) return;
      R.isDragging = !1, x.current && window.removeEventListener("pointermove", x.current), window.removeEventListener("pointerup", u), window.removeEventListener("pointercancel", u);
      const d = g.current;
      d && d.hasPointerCapture(m.pointerId) && d.releasePointerCapture(m.pointerId);
      const S = w(m.clientX, m.clientY), P = S.x - R.offsetX, k = S.y - R.offsetY;
      C.current = null, z(P, k) || i((j) => ({ ...j, isDragging: !1 })), m.preventDefault();
    },
    [w, z]
  ), p = A(
    (m) => {
      if (v || !m.isPrimary) return;
      const R = g.current;
      if (!R) return;
      const d = w(m.clientX, m.clientY), S = d.x - a.x, P = d.y - a.y;
      C.current = {
        offsetX: S,
        offsetY: P,
        pointerId: m.pointerId,
        isDragging: !0
      }, R.setPointerCapture(m.pointerId), x.current && window.addEventListener("pointermove", x.current, { passive: !1 }), window.addEventListener("pointerup", u, { passive: !1 }), window.addEventListener("pointercancel", u, { passive: !1 }), i((k) => ({ ...k, isDragging: !0 })), m.preventDefault();
    },
    [v, a.x, a.y, w, u]
  ), y = A((m) => {
    m.preventDefault();
  }, []), D = A((m) => {
    m.preventDefault();
  }, []), M = A(
    (m) => {
      u(m.nativeEvent);
    },
    [u]
  ), Y = A(
    (m, R) => {
      v || i((d) => ({ ...d, x: m, y: R }));
    },
    [v]
  ), $ = A(
    (m, R) => {
      v || i((d) => ({ ...d, x: d.x + m, y: d.y + R }));
    },
    [v]
  ), O = A(() => v ? !1 : z(a.x, a.y), [v, a.x, a.y, z]);
  return {
    ref: g,
    dragState: a,
    isSnapped: v,
    moveTo: Y,
    moveBy: $,
    trySnap: O,
    handlers: {
      onPointerDown: p,
      onPointerMove: y,
      onPointerUp: D,
      onPointerCancel: M,
      style: {
        touchAction: "none",
        cursor: v ? "default" : a.isDragging ? "grabbing" : "grab"
      }
    }
  };
}
const _e = "_puzzlePiece_10f4h_1", Ee = {
  puzzlePiece: _e
}, Pe = 10, $e = ({
  boardHeight: r,
  boardWidth: t,
  image: o,
  pieceIndex: s,
  initialX: n,
  initialY: l,
  path: f,
  snapThreshold: g,
  boardRef: a,
  targetX: i,
  targetY: v,
  puzzlePieceOptions: E,
  onSnap: C,
  onSnapWithKeyboard: x,
  registerPieceRef: w,
  boardSlotKey: z
}) => {
  const { ref: c, dragState: u, isSnapped: p, moveBy: y, trySnap: D, handlers: M } = xe({
    initialX: n,
    initialY: l,
    snapThreshold: g,
    boardRef: a,
    targetX: i,
    targetY: v,
    onSnap: C
  });
  W(() => (w && w(z, c.current), () => {
    w && w(z, null);
  }), [c, w, z]);
  const Y = ($) => {
    if (p) return;
    const O = Pe;
    switch ($.key) {
      case "ArrowUp":
        $.preventDefault(), y(0, -O);
        break;
      case "ArrowDown":
        $.preventDefault(), y(0, O);
        break;
      case "ArrowLeft":
        $.preventDefault(), y(-O, 0);
        break;
      case "ArrowRight":
        $.preventDefault(), y(O, 0);
        break;
      case "Enter":
      case " ": {
        $.preventDefault(), D() && x && x();
        break;
      }
    }
  };
  return W(() => {
    u.isDragging && c.current && c.current.parentNode && !p && c.current.parentNode.appendChild(c.current);
  }, [c, u.isDragging, p]), W(() => {
    if (!u.isDragging && p && c.current && c.current.parentNode) {
      const $ = c.current.parentNode;
      $.firstChild !== c.current && $.insertBefore(c.current, $.firstChild);
    }
  }, [c, u.isDragging, p]), /* @__PURE__ */ b.jsxs(
    "g",
    {
      ref: c,
      transform: p ? "" : `translate(${u.x},${u.y})`,
      ...M,
      className: Ee.puzzlePiece,
      tabIndex: p ? -1 : 0,
      onKeyDown: Y,
      children: [
        /* @__PURE__ */ b.jsx("defs", { children: /* @__PURE__ */ b.jsx("clipPath", { id: `piece-clip-${s}`, children: /* @__PURE__ */ b.jsx("path", { d: f }) }) }),
        /* @__PURE__ */ b.jsx(
          "image",
          {
            href: o,
            x: 0,
            y: 0,
            width: t,
            height: r,
            clipPath: `url(#piece-clip-${s})`,
            preserveAspectRatio: "xMidYMid slice"
          }
        ),
        /* @__PURE__ */ b.jsx(
          "path",
          {
            d: f,
            fill: "none",
            stroke: p || !E.strokeEnabled ? "" : E.strokeColor,
            strokeWidth: E.strokeEnabled ? ce : 0
          }
        )
      ]
    }
  );
}, ke = ({
  columns: r,
  rows: t
}) => {
  const o = [];
  for (let s = 0; s < t; s++) {
    o[s] = [];
    for (let n = 0; n < r; n++) {
      const l = n === r - 1 ? 0 : (s + n) % 2 === 0 ? 1 : -1, f = s === t - 1 ? 0 : (s + n) % 2 === 0 ? 1 : -1, g = n === 0 ? 0 : -o[s][n - 1][1], a = s === 0 ? 0 : -o[s - 1][n][2];
      o[s][n] = [a, l, f, g];
    }
  }
  return o;
}, ue = ({
  col: r,
  row: t,
  options: o
}) => {
  const { boardWidth: s, boardHeight: n, rows: l, columns: f, edgeMap: g } = o, a = s / f, i = n / l, v = r * a, E = t * i, [C, x, w, z] = g[t][r], c = Math.min(a, i) / 3, u = c / 2;
  let p = `M${v},${E}`;
  return C === 0 ? p += ` h${a}` : (p += ` h${(a - c) / 2}`, p += ` a${u},${u} 0 0 ${C === 1 ? 1 : 0} ${c},0`, p += ` h${(a - c) / 2}`), x === 0 ? p += ` v${i}` : (p += ` v${(i - c) / 2}`, p += ` a${u},${u} 0 0 ${x === 1 ? 1 : 0} 0,${c}`, p += ` v${(i - c) / 2}`), w === 0 ? p += ` h-${a}` : (p += ` h-${(a - c) / 2}`, p += ` a${u},${u} 0 0 ${w === 1 ? 1 : 0} -${c},0`, p += ` h-${(a - c) / 2}`), z === 0 ? p += ` v-${i}` : (p += ` v-${(i - c) / 2}`, p += ` a${u},${u} 0 0 ${z === 1 ? 1 : 0} 0,-${c}`, p += ` v-${(i - c) / 2}`), p += " Z", p;
}, Ne = "_boardSlotOutline_mbtg0_1", Te = "_snapped_mbtg0_6", ae = {
  boardSlotOutline: Ne,
  snapped: Te
}, ye = (r) => {
  const { boardPathOptions: t, boardSlots: o, showBoardSlotOutlines: s, snappedPieceIds: n } = r;
  return s ? /* @__PURE__ */ b.jsx("g", { "data-testid": "board-outlines", children: o.map(({ pieceRow: l, pieceCol: f }) => {
    const g = `${l}-${f}`, a = n.has(g);
    return /* @__PURE__ */ b.jsx(
      "path",
      {
        "data-testid": `outline-${l}-${f}`,
        className: `${ae.boardSlotOutline} ${a ? ae.snapped : ""}`,
        d: ue({ row: l, col: f, options: t }),
        stroke: t.outlineStrokeColor
      },
      `outline-${l}-${f}`
    );
  }) }) : null;
}, je = (r, t) => Array.from({ length: r * t }, (o, s) => ({
  // Math.floor(i / columns) gives us the row number (0, 1, 2, ...)
  // i % columns gives us the column number (0, 1, 2, ..., columns-1)
  pieceRow: Math.floor(s / t),
  pieceCol: s % t
})), Oe = (r) => {
  const t = [...r];
  for (let o = t.length - 1; o > 0; o--) {
    const s = Math.floor(Math.random() * (o + 1));
    [t[o], t[s]] = [t[s], t[o]];
  }
  return t;
}, Ae = ({
  boardWidth: r,
  boardHeight: t,
  boardSlots: o,
  pieceHeight: s,
  pieceWidth: n,
  scatterArea: l
}) => {
  const f = Oe(o), g = r + l * 2, a = t + l * 2, i = -l, v = -l;
  return f.map(({ pieceRow: E, pieceCol: C }) => {
    const x = i + Math.random() * (g - n), w = v + Math.random() * (a - s), z = C * n, c = E * s, u = x - z, p = w - c;
    return { pieceRow: E, pieceCol: C, x: u, y: p };
  });
}, Ie = "_board_srrvi_1", De = {
  board: Ie
}, Be = (r) => {
  const {
    boardHeight: t,
    boardWidth: o,
    className: s,
    columns: n,
    image: l,
    onPuzzleComplete: f,
    outlineStrokeColor: g,
    puzzlePieceOptions: a,
    rows: i,
    showBoardSlotOutlines: v,
    snapThreshold: E,
    scatterArea: C
  } = r, x = t / i, w = o / n, [z, c] = I([]), [u, p] = I(/* @__PURE__ */ new Set()), y = U(null), D = U(/* @__PURE__ */ new Map()), M = K(() => ke({ rows: i, columns: n }), [i, n]), Y = K(
    () => ({
      boardHeight: t,
      boardWidth: o,
      columns: n,
      edgeMap: M,
      outlineStrokeColor: g,
      rows: i
    }),
    [t, o, n, M, g, i]
  ), $ = K(() => je(i, n), [i, n]);
  W(() => {
    const d = Ae({
      boardHeight: t,
      boardWidth: o,
      boardSlots: $,
      pieceHeight: x,
      pieceWidth: w,
      scatterArea: C
    });
    c(d), p(/* @__PURE__ */ new Set()), D.current.clear();
  }, [t, o, $, x, w, C]), W(() => {
    const d = i * n;
    u.size === d && f?.();
  }, [u.size, i, n, f]);
  const O = (d) => {
    const { pieceRow: S, pieceCol: P } = z[d], k = `${S}-${P}`;
    p((j) => /* @__PURE__ */ new Set([...j, k]));
  }, m = (d) => {
    const S = z.find((P, k) => {
      const j = `${P.pieceRow}-${P.pieceCol}`;
      return k !== d && !u.has(j);
    });
    if (S) {
      const P = `${S.pieceRow}-${S.pieceCol}`, k = D.current.get(P);
      k && k.focus();
    }
  }, R = (d, S) => {
    S ? D.current.set(d, S) : D.current.delete(d);
  };
  return /* @__PURE__ */ b.jsxs(
    "svg",
    {
      ref: y,
      className: `${De.board} ${s}`,
      "data-testid": "board",
      height: t,
      width: o,
      viewBox: `0 0 ${o} ${t}`,
      children: [
        /* @__PURE__ */ b.jsx(
          ye,
          {
            boardPathOptions: Y,
            boardSlots: $,
            showBoardSlotOutlines: v,
            snappedPieceIds: u
          }
        ),
        z.map(({ pieceRow: d, pieceCol: S, x: P, y: k }, j) => /* @__PURE__ */ b.jsx(
          $e,
          {
            boardHeight: t,
            boardWidth: o,
            boardSlotKey: `${d}-${S}`,
            image: l,
            pieceIndex: j,
            initialX: P,
            initialY: k,
            onSnap: () => O(j),
            onSnapWithKeyboard: () => m(j),
            path: ue({ col: S, row: d, options: Y }),
            puzzlePieceOptions: a,
            registerPieceRef: R,
            snapThreshold: E,
            boardRef: y,
            targetX: S * w / 100,
            targetY: d * x / 100
          },
          `${d}-${S}`
        ))
      ]
    }
  );
}, Me = "_editRowsColumns_1gi2i_1", Ye = "_inlineNote_1gi2i_51", le = {
  editRowsColumns: Me,
  inlineNote: Ye
}, Le = (r) => {
  const { className: t, currentColumns: o, currentRows: s, onBoardSlotChange: n } = r, [l, f] = I(s.toString()), [g, a] = I(o.toString()), i = parseInt(l) !== s || parseInt(g) !== o, v = parseInt(l) >= 2 && parseInt(l) <= 10, E = parseInt(g) >= 2 && parseInt(g) <= 10, C = v && E && i;
  W(() => {
    f(s.toString()), a(o.toString());
  }, [s, o]);
  const x = (c) => {
    const u = c.target.value;
    (u === "" || /^\d+$/.test(u)) && f(u);
  }, w = (c) => {
    const u = c.target.value;
    (u === "" || /^\d+$/.test(u)) && a(u);
  }, z = (c) => {
    c.preventDefault(), C && (localStorage.setItem(
      "react-jigsaw",
      JSON.stringify({
        rows: parseFloat(l),
        columns: parseFloat(g)
      })
    ), n(parseInt(l), parseInt(g)));
  };
  return /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
    /* @__PURE__ */ b.jsxs(
      "form",
      {
        "data-testid": "edit-rows-columns",
        className: `${le.editRowsColumns} ${t}`,
        onSubmit: z,
        children: [
          /* @__PURE__ */ b.jsxs("label", { children: [
            "Rows:",
            /* @__PURE__ */ b.jsx("input", { type: "text", value: l, onChange: x, placeholder: "2-10" })
          ] }),
          /* @__PURE__ */ b.jsxs("label", { children: [
            "Cols:",
            /* @__PURE__ */ b.jsx("input", { type: "text", value: g, onChange: w, placeholder: "2-10" })
          ] }),
          /* @__PURE__ */ b.jsx("input", { type: "submit", value: "Ok", disabled: !C })
        ]
      }
    ),
    /* @__PURE__ */ b.jsx("span", { className: le.inlineNote, children: "(Valid numbers: 2-10)" })
  ] });
}, We = "_refreshButton_17b0p_1", Fe = {
  refreshButton: We
}, Ue = (r) => {
  const { className: t, onRefresh: o } = r;
  return /* @__PURE__ */ b.jsx(
    "button",
    {
      "data-testid": "refresh-button",
      className: `${Fe.refreshButton} ${t}`,
      onClick: o,
      title: "Refresh puzzle",
      children: /* @__PURE__ */ b.jsxs(
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
            /* @__PURE__ */ b.jsx("path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }),
            /* @__PURE__ */ b.jsx("path", { d: "M21 3v5h-5" }),
            /* @__PURE__ */ b.jsx("path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }),
            /* @__PURE__ */ b.jsx("path", { d: "M3 21v-5h5" })
          ]
        }
      )
    }
  );
}, Xe = "_timer_thvwo_1", Ge = {
  timer: Xe
}, Ve = (r) => {
  const { className: t, isRunning: o, onTimeUpdate: s } = r, [n, l] = I(0), f = U(null);
  W(() => (o ? f.current = setInterval(() => {
    l((a) => {
      const i = a + 1;
      return s?.(i), i;
    });
  }, 1e3) : f.current && (clearInterval(f.current), f.current = null), () => {
    f.current && clearInterval(f.current);
  }), [o, s]), W(() => {
    o && l(0);
  }, [o]);
  const g = (a) => {
    const i = Math.floor(a / 60), v = a % 60;
    return `${i.toString().padStart(2, "0")}:${v.toString().padStart(2, "0")}`;
  };
  return /* @__PURE__ */ b.jsx("div", { "data-testid": "timer", className: `${Ge.timer} ${t}`, children: g(n) });
}, Je = "_puzzle_c9hl6_1", qe = "_responsive_c9hl6_5", He = "_settingsContainer_c9hl6_13", V = {
  puzzle: Je,
  responsive: qe,
  settingsContainer: He
}, Ze = (r) => {
  const { image: t, onComplete: o, onRefresh: s, options: n } = r, {
    columns: l,
    refreshBoard: f,
    refreshCount: g,
    rows: a,
    setBoardGrid: i,
    setTimerIsRunning: v,
    timerIsRunning: E
  } = Re(), C = (p, y) => {
    i(p, y);
  }, x = () => {
    s?.(), f();
  }, w = () => {
    v(!1), o?.();
  }, z = n.board.width / n.board.height, c = n.puzzle.responsive ? `${V.puzzle} ${V.responsive}` : V.puzzle, u = n.puzzle.responsive ? { "--puzzle-aspect-ratio": z.toString() } : {};
  return /* @__PURE__ */ b.jsxs("div", { "data-testid": "puzzle-content", className: c, style: { ...u }, children: [
    n.puzzle.timer.enabled || n.puzzle.refreshButton.enabled ? /* @__PURE__ */ b.jsxs("div", { className: V.settingsContainer, children: [
      n.puzzle.timer.enabled && /* @__PURE__ */ b.jsx(Ve, { className: n.puzzle.timer.className, isRunning: E }),
      n.puzzle.refreshButton.enabled && /* @__PURE__ */ b.jsx(
        Ue,
        {
          className: n.puzzle.refreshButton.className,
          onRefresh: x
        }
      )
    ] }) : null,
    /* @__PURE__ */ b.jsx(
      Be,
      {
        boardHeight: n.board.height,
        boardWidth: n.board.width,
        className: n.board.className,
        columns: l,
        image: t,
        onPuzzleComplete: w,
        outlineStrokeColor: n.board.outlineStrokeColor,
        puzzlePieceOptions: n.puzzlePiece,
        rows: a,
        scatterArea: n.board.scatterArea,
        showBoardSlotOutlines: n.board.showBoardSlotOutlines,
        snapThreshold: n.board.snapThreshold
      },
      `${a}-${l}-${g}`
    ),
    n.puzzle.rowsAndColumns.enabled && /* @__PURE__ */ b.jsx("div", { className: V.settingsContainer, children: /* @__PURE__ */ b.jsx(
      Le,
      {
        className: n.puzzle.rowsAndColumns.className,
        currentRows: a,
        currentColumns: l,
        onBoardSlotChange: C
      }
    ) })
  ] });
}, Qe = (r) => {
  const { options: t } = r, o = Ce(ve, t);
  return /* @__PURE__ */ b.jsx(
    Se,
    {
      checkLocalStorage: o.checkLocalStorage,
      columns: o.board.columns,
      rows: o.board.rows,
      children: /* @__PURE__ */ b.jsx(Ze, { ...r, options: o })
    }
  );
};
export {
  ve as DEFAULT_PUZZLE_OPTIONS,
  Qe as Puzzle
};

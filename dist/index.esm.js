import fe, { createContext as pe, useState as I, useContext as he, useRef as X, useCallback as D, useEffect as Y, useMemo as Z } from "react";
var H = { exports: {} }, G = {};
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
  if (ne) return G;
  ne = 1;
  var r = Symbol.for("react.transitional.element"), t = Symbol.for("react.fragment");
  function o(s, n, a) {
    var f = null;
    if (a !== void 0 && (f = "" + a), n.key !== void 0 && (f = "" + n.key), "key" in n) {
      a = {};
      for (var v in n)
        v !== "key" && (a[v] = n[v]);
    } else a = n;
    return n = a.ref, {
      $$typeof: r,
      type: s,
      key: f,
      ref: n !== void 0 ? n : null,
      props: a
    };
  }
  return G.Fragment = t, G.jsx = o, G.jsxs = o, G;
}
var V = {};
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
function ge() {
  return oe || (oe = 1, process.env.NODE_ENV !== "production" && function() {
    function r(e) {
      if (e == null) return null;
      if (typeof e == "function")
        return e.$$typeof === M ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case z:
          return "Fragment";
        case w:
          return "Profiler";
        case u:
          return "StrictMode";
        case y:
          return "Suspense";
        case O:
          return "SuspenseList";
        case T:
          return "Activity";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case C:
            return "Portal";
          case _:
            return (e.displayName || "Context") + ".Provider";
          case l:
            return (e._context.displayName || "Context") + ".Consumer";
          case P:
            var h = e.render;
            return e = e.displayName, e || (e = h.displayName || h.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case W:
            return h = e.displayName || null, h !== null ? h : r(e.type) || "Memo";
          case B:
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
        var x = h.error, j = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return x.call(
          h,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          j
        ), t(e);
      }
    }
    function s(e) {
      if (e === z) return "<>";
      if (typeof e == "object" && e !== null && e.$$typeof === B)
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
    function a() {
      return Error("react-stack-top-frame");
    }
    function f(e) {
      if (c.call(e, "key")) {
        var h = Object.getOwnPropertyDescriptor(e, "key").get;
        if (h && h.isReactWarning) return !1;
      }
      return e.key !== void 0;
    }
    function v(e, h) {
      function x() {
        k || (k = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          h
        ));
      }
      x.isReactWarning = !0, Object.defineProperty(e, "key", {
        get: x,
        configurable: !0
      });
    }
    function i() {
      var e = r(this.type);
      return N[e] || (N[e] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), e = this.props.ref, e !== void 0 ? e : null;
    }
    function p(e, h, x, j, F, L, K, Q) {
      return x = L.ref, e = {
        $$typeof: $,
        type: e,
        key: h,
        props: L,
        _owner: F
      }, (x !== void 0 ? x : null) !== null ? Object.defineProperty(e, "ref", {
        enumerable: !1,
        get: i
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
        value: K
      }), Object.defineProperty(e, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: Q
      }), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
    }
    function S(e, h, x, j, F, L, K, Q) {
      var A = h.children;
      if (A !== void 0)
        if (j)
          if (b(A)) {
            for (j = 0; j < A.length; j++)
              R(A[j]);
            Object.freeze && Object.freeze(A);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else R(A);
      if (c.call(h, "key")) {
        A = r(e);
        var U = Object.keys(h).filter(function(de) {
          return de !== "key";
        });
        j = 0 < U.length ? "{key: someKey, " + U.join(": ..., ") + ": ...}" : "{key: someKey}", re[A + j] || (U = 0 < U.length ? "{" + U.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          j,
          A,
          U,
          A
        ), re[A + j] = !0);
      }
      if (A = null, x !== void 0 && (o(x), A = "" + x), f(h) && (o(h.key), A = "" + h.key), "key" in h) {
        x = {};
        for (var ee in h)
          ee !== "key" && (x[ee] = h[ee]);
      } else x = h;
      return A && v(
        x,
        typeof e == "function" ? e.displayName || e.name || "Unknown" : e
      ), p(
        e,
        A,
        L,
        F,
        n(),
        x,
        K,
        Q
      );
    }
    function R(e) {
      typeof e == "object" && e !== null && e.$$typeof === $ && e._store && (e._store.validated = 1);
    }
    var g = fe, $ = Symbol.for("react.transitional.element"), C = Symbol.for("react.portal"), z = Symbol.for("react.fragment"), u = Symbol.for("react.strict_mode"), w = Symbol.for("react.profiler"), l = Symbol.for("react.consumer"), _ = Symbol.for("react.context"), P = Symbol.for("react.forward_ref"), y = Symbol.for("react.suspense"), O = Symbol.for("react.suspense_list"), W = Symbol.for("react.memo"), B = Symbol.for("react.lazy"), T = Symbol.for("react.activity"), M = Symbol.for("react.client.reference"), d = g.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, c = Object.prototype.hasOwnProperty, b = Array.isArray, E = console.createTask ? console.createTask : function() {
      return null;
    };
    g = {
      "react-stack-bottom-frame": function(e) {
        return e();
      }
    };
    var k, N = {}, q = g["react-stack-bottom-frame"].bind(
      g,
      a
    )(), te = E(s(a)), re = {};
    V.Fragment = z, V.jsx = function(e, h, x, j, F) {
      var L = 1e4 > d.recentlyCreatedOwnerStacks++;
      return S(
        e,
        h,
        x,
        !1,
        j,
        F,
        L ? Error("react-stack-top-frame") : q,
        L ? E(s(e)) : te
      );
    }, V.jsxs = function(e, h, x, j, F) {
      var L = 1e4 > d.recentlyCreatedOwnerStacks++;
      return S(
        e,
        h,
        x,
        !0,
        j,
        F,
        L ? Error("react-stack-top-frame") : q,
        L ? E(s(e)) : te
      );
    };
  }()), V;
}
var se;
function be() {
  return se || (se = 1, process.env.NODE_ENV === "production" ? H.exports = me() : H.exports = ge()), H.exports;
}
var m = be();
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
    responsive: !0,
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
  ), [s, n] = I(o ?? r.columns), [a, f] = I(t ?? r.rows), [v, i] = I(!0), [p, S] = I(0), R = a * s, C = {
    columns: s,
    numPieces: R,
    refreshCount: p,
    rows: a,
    timerIsRunning: v,
    setBoardGrid: (z, u) => {
      f(z), n(u), i(!1), setTimeout(() => i(!0), 10);
    },
    refreshBoard: () => {
      i(!1), S((z) => z + 1), setTimeout(() => i(!0), 10);
    },
    setTimerIsRunning: i
  };
  return /* @__PURE__ */ m.jsx(ie.Provider, { value: C, children: r.children });
}, Ce = () => {
  const r = he(ie);
  if (!r)
    throw new Error("usePuzzleContext must be used within a PuzzleProvider");
  return r;
}, Re = (r, t) => t ? {
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
function Ee({
  initialX: r,
  initialY: t,
  boardRef: o,
  targetX: s,
  targetY: n,
  snapThreshold: a,
  onSnap: f,
  onDragStart: v,
  onDragEnd: i
}) {
  const p = X(null), [S, R] = I({
    isDragging: !1,
    x: r,
    y: t
  }), [g, $] = I(!1), C = X(null), z = X(null), u = D(
    (d, c) => {
      const b = o.current;
      if (!b) return { x: d, y: c };
      const E = b.createSVGPoint();
      E.x = d, E.y = c;
      const k = E.matrixTransform(b.getScreenCTM()?.inverse());
      return { x: k.x, y: k.y };
    },
    [o]
  ), w = D(
    (d, c) => Math.hypot(d - s, c - n) <= a ? ($(!0), R((E) => ({ ...E, x: s, y: n, isDragging: !1 })), f?.(), !0) : !1,
    [s, n, a, f]
  ), l = D(
    (d) => {
      const c = C.current;
      if (!c || !c.isDragging || d.pointerId !== c.pointerId) return;
      const b = u(d.clientX, d.clientY), E = b.x - c.offsetX, k = b.y - c.offsetY;
      R((N) => ({ ...N, x: E, y: k })), d.preventDefault();
    },
    [u]
  );
  z.current = l;
  const _ = D(
    (d) => {
      const c = C.current;
      if (!c || !c.isDragging || d.pointerId !== c.pointerId) return;
      c.isDragging = !1, z.current && window.removeEventListener("pointermove", z.current), window.removeEventListener("pointerup", _), window.removeEventListener("pointercancel", _);
      const b = p.current;
      b && b.hasPointerCapture(d.pointerId) && b.releasePointerCapture(d.pointerId);
      const E = u(d.clientX, d.clientY), k = E.x - c.offsetX, N = E.y - c.offsetY;
      C.current = null, w(k, N) || R((q) => ({ ...q, isDragging: !1 })), i(), d.preventDefault();
    },
    [u, w, i]
  ), P = D(
    (d) => {
      if (g || !d.isPrimary) return;
      const c = p.current;
      if (!c) return;
      const b = u(d.clientX, d.clientY), E = b.x - S.x, k = b.y - S.y;
      C.current = {
        offsetX: E,
        offsetY: k,
        pointerId: d.pointerId,
        isDragging: !0
      }, c.setPointerCapture(d.pointerId), z.current && window.addEventListener("pointermove", z.current, { passive: !1 }), window.addEventListener("pointerup", _, { passive: !1 }), window.addEventListener("pointercancel", _, { passive: !1 }), R((N) => ({ ...N, isDragging: !0 })), v(), d.preventDefault();
    },
    [g, S.x, S.y, u, _, v]
  ), y = D((d) => {
    d.preventDefault();
  }, []), O = D((d) => {
    d.preventDefault();
  }, []), W = D(
    (d) => {
      _(d.nativeEvent);
    },
    [_]
  ), B = D(
    (d, c) => {
      g || R((b) => ({ ...b, x: d, y: c }));
    },
    [g]
  ), T = D(
    (d, c) => {
      g || R((b) => ({ ...b, x: b.x + d, y: b.y + c }));
    },
    [g]
  ), M = D(() => g ? !1 : w(S.x, S.y), [g, S.x, S.y, w]);
  return {
    ref: p,
    dragState: S,
    isSnapped: g,
    moveTo: B,
    moveBy: T,
    trySnap: M,
    handlers: {
      onPointerDown: P,
      onPointerMove: y,
      onPointerUp: O,
      onPointerCancel: W,
      style: {
        touchAction: "none",
        cursor: g ? "default" : S.isDragging ? "grabbing" : "grab"
      }
    }
  };
}
const xe = "_puzzlePiece_10f4h_1", _e = {
  puzzlePiece: xe
}, Pe = 10, $e = ({
  boardHeight: r,
  boardWidth: t,
  image: o,
  pieceIndex: s,
  initialX: n,
  initialY: a,
  path: f,
  snapThreshold: v,
  boardRef: i,
  targetX: p,
  targetY: S,
  puzzlePieceOptions: R,
  onSnap: g,
  onSnapWithKeyboard: $,
  registerPieceRef: C,
  boardSlotKey: z,
  onDragStart: u,
  onDragEnd: w
}) => {
  const { ref: l, dragState: _, isSnapped: P, moveBy: y, trySnap: O, handlers: W } = Ee({
    initialX: n,
    initialY: a,
    snapThreshold: v,
    boardRef: i,
    targetX: p,
    targetY: S,
    onSnap: g,
    onDragStart: u,
    onDragEnd: w
  });
  Y(() => (C && C(z, l.current), () => {
    C && C(z, null);
  }), [l, C, z]);
  const B = (T) => {
    if (P) return;
    const M = Pe;
    switch (T.key) {
      case "ArrowUp":
        T.preventDefault(), y(0, -M);
        break;
      case "ArrowDown":
        T.preventDefault(), y(0, M);
        break;
      case "ArrowLeft":
        T.preventDefault(), y(-M, 0);
        break;
      case "ArrowRight":
        T.preventDefault(), y(M, 0);
        break;
      case "Enter":
      case " ": {
        T.preventDefault(), O() && $ && $();
        break;
      }
    }
  };
  return Y(() => {
    _.isDragging && l.current && l.current.parentNode && !P && l.current.parentNode.appendChild(l.current);
  }, [l, _.isDragging, P]), Y(() => {
    if (!_.isDragging && P && l.current && l.current.parentNode) {
      const T = l.current.parentNode;
      T.firstChild !== l.current && T.insertBefore(l.current, T.firstChild);
    }
  }, [l, _.isDragging, P]), /* @__PURE__ */ m.jsxs(
    "g",
    {
      ref: l,
      transform: P ? "" : `translate(${_.x},${_.y})`,
      ...W,
      className: _e.puzzlePiece,
      tabIndex: P ? -1 : 0,
      onKeyDown: B,
      children: [
        /* @__PURE__ */ m.jsx("defs", { children: /* @__PURE__ */ m.jsx("clipPath", { id: `piece-clip-${s}`, children: /* @__PURE__ */ m.jsx("path", { d: f }) }) }),
        /* @__PURE__ */ m.jsx(
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
        /* @__PURE__ */ m.jsx(
          "path",
          {
            d: f,
            fill: "none",
            stroke: P || !R.strokeEnabled ? "" : R.strokeColor,
            strokeWidth: R.strokeEnabled ? ce : 0
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
      const a = n === r - 1 ? 0 : (s + n) % 2 === 0 ? 1 : -1, f = s === t - 1 ? 0 : (s + n) % 2 === 0 ? 1 : -1, v = n === 0 ? 0 : -o[s][n - 1][1], i = s === 0 ? 0 : -o[s - 1][n][2];
      o[s][n] = [i, a, f, v];
    }
  }
  return o;
}, ue = ({
  col: r,
  row: t,
  options: o
}) => {
  const { boardWidth: s, boardHeight: n, rows: a, columns: f, edgeMap: v } = o, i = s / f, p = n / a, S = r * i, R = t * p, [g, $, C, z] = v[t][r], u = Math.min(i, p) / 3, w = u / 2;
  let l = `M${S},${R}`;
  return g === 0 ? l += ` h${i}` : (l += ` h${(i - u) / 2}`, l += ` a${w},${w} 0 0 ${g === 1 ? 1 : 0} ${u},0`, l += ` h${(i - u) / 2}`), $ === 0 ? l += ` v${p}` : (l += ` v${(p - u) / 2}`, l += ` a${w},${w} 0 0 ${$ === 1 ? 1 : 0} 0,${u}`, l += ` v${(p - u) / 2}`), C === 0 ? l += ` h-${i}` : (l += ` h-${(i - u) / 2}`, l += ` a${w},${w} 0 0 ${C === 1 ? 1 : 0} -${u},0`, l += ` h-${(i - u) / 2}`), z === 0 ? l += ` v-${p}` : (l += ` v-${(p - u) / 2}`, l += ` a${w},${w} 0 0 ${z === 1 ? 1 : 0} 0,-${u}`, l += ` v-${(p - u) / 2}`), l += " Z", l;
}, ye = "_boardSlotOutline_mbtg0_1", Te = "_snapped_mbtg0_6", ae = {
  boardSlotOutline: ye,
  snapped: Te
}, Ne = (r) => {
  const { boardPathOptions: t, boardSlots: o, showBoardSlotOutlines: s, snappedPieceIds: n } = r;
  return s ? /* @__PURE__ */ m.jsx("g", { "data-testid": "board-outlines", children: o.map(({ pieceRow: a, pieceCol: f }) => {
    const v = `${a}-${f}`, i = n.has(v);
    return /* @__PURE__ */ m.jsx(
      "path",
      {
        "data-testid": `outline-${a}-${f}`,
        className: `${ae.boardSlotOutline} ${i ? ae.snapped : ""}`,
        d: ue({ row: a, col: f, options: t }),
        stroke: t.outlineStrokeColor
      },
      `outline-${a}-${f}`
    );
  }) }) : null;
}, je = (r, t) => Array.from({ length: r * t }, (o, s) => ({
  // Math.floor(i / columns) gives us the row number (0, 1, 2, ...)
  // i % columns gives us the column number (0, 1, 2, ..., columns-1)
  pieceRow: Math.floor(s / t),
  pieceCol: s % t
})), Ae = (r) => {
  const t = [...r];
  for (let o = t.length - 1; o > 0; o--) {
    const s = Math.floor(Math.random() * (o + 1));
    [t[o], t[s]] = [t[s], t[o]];
  }
  return t;
}, Oe = ({
  boardWidth: r,
  boardHeight: t,
  boardSlots: o,
  pieceHeight: s,
  pieceWidth: n,
  scatterArea: a
}) => {
  const f = Ae(o), v = r + a * 2, i = t + a * 2, p = -a, S = -a;
  return f.map(({ pieceRow: R, pieceCol: g }) => {
    const $ = p + Math.random() * (v - n), C = S + Math.random() * (i - s), z = g * n, u = R * s, w = $ - z, l = C - u;
    return { pieceRow: R, pieceCol: g, x: w, y: l };
  });
}, Ie = "_board_13b9q_1", De = {
  board: Ie
}, Be = (r) => {
  const {
    boardHeight: t,
    boardWidth: o,
    className: s,
    columns: n,
    image: a,
    onPuzzleComplete: f,
    outlineStrokeColor: v,
    puzzlePieceOptions: i,
    rows: p,
    showBoardSlotOutlines: S,
    snapThreshold: R,
    scatterArea: g,
    onAnyPieceActiveChange: $
  } = r, C = t / p, z = o / n, [u, w] = I([]), [l, _] = I(/* @__PURE__ */ new Set()), P = X(null), y = X(/* @__PURE__ */ new Map()), O = Z(() => ke({ rows: p, columns: n }), [p, n]), W = Z(
    () => ({
      boardHeight: t,
      boardWidth: o,
      columns: n,
      edgeMap: O,
      outlineStrokeColor: v,
      rows: p
    }),
    [t, o, n, O, v, p]
  ), B = Z(() => je(p, n), [p, n]);
  Y(() => {
    const c = Oe({
      boardHeight: t,
      boardWidth: o,
      boardSlots: B,
      pieceHeight: C,
      pieceWidth: z,
      scatterArea: g
    });
    w(c), _(/* @__PURE__ */ new Set()), y.current.clear();
  }, [t, o, B, C, z, g]), Y(() => {
    const c = p * n;
    l.size === c && f?.();
  }, [l.size, p, n, f]);
  const T = (c) => {
    const { pieceRow: b, pieceCol: E } = u[c], k = `${b}-${E}`;
    _((N) => /* @__PURE__ */ new Set([...N, k]));
  }, M = (c) => {
    const b = u.find((E, k) => {
      const N = `${E.pieceRow}-${E.pieceCol}`;
      return k !== c && !l.has(N);
    });
    if (b) {
      const E = `${b.pieceRow}-${b.pieceCol}`, k = y.current.get(E);
      k && k.focus();
    }
  }, d = (c, b) => {
    b ? y.current.set(c, b) : y.current.delete(c);
  };
  return /* @__PURE__ */ m.jsxs(
    "svg",
    {
      ref: P,
      className: `${De.board} ${s}`,
      "data-testid": "board",
      height: t,
      width: o,
      viewBox: `0 0 ${o} ${t}`,
      children: [
        /* @__PURE__ */ m.jsx(
          Ne,
          {
            boardPathOptions: W,
            boardSlots: B,
            showBoardSlotOutlines: S,
            snappedPieceIds: l
          }
        ),
        u.map(({ pieceRow: c, pieceCol: b, x: E, y: k }, N) => /* @__PURE__ */ m.jsx(
          $e,
          {
            boardHeight: t,
            boardWidth: o,
            boardSlotKey: `${c}-${b}`,
            image: a,
            pieceIndex: N,
            initialX: E,
            initialY: k,
            onSnap: () => T(N),
            onSnapWithKeyboard: () => M(N),
            path: ue({ col: b, row: c, options: W }),
            puzzlePieceOptions: i,
            registerPieceRef: d,
            snapThreshold: R,
            boardRef: P,
            targetX: b * z / 100,
            targetY: c * C / 100,
            onDragStart: () => $?.(!0),
            onDragEnd: () => $?.(!1)
          },
          `${c}-${b}`
        ))
      ]
    }
  );
}, Me = "_editRowsColumns_1gi2i_1", Le = "_inlineNote_1gi2i_51", le = {
  editRowsColumns: Me,
  inlineNote: Le
}, Ye = (r) => {
  const { className: t, currentColumns: o, currentRows: s, onBoardSlotChange: n } = r, [a, f] = I(s.toString()), [v, i] = I(o.toString()), p = parseInt(a) !== s || parseInt(v) !== o, S = parseInt(a) >= 2 && parseInt(a) <= 10, R = parseInt(v) >= 2 && parseInt(v) <= 10, g = S && R && p;
  Y(() => {
    f(s.toString()), i(o.toString());
  }, [s, o]);
  const $ = (u) => {
    const w = u.target.value;
    (w === "" || /^\d+$/.test(w)) && f(w);
  }, C = (u) => {
    const w = u.target.value;
    (w === "" || /^\d+$/.test(w)) && i(w);
  }, z = (u) => {
    u.preventDefault(), g && (localStorage.setItem(
      "react-jigsaw",
      JSON.stringify({
        rows: parseFloat(a),
        columns: parseFloat(v)
      })
    ), n(parseInt(a), parseInt(v)));
  };
  return /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
    /* @__PURE__ */ m.jsxs(
      "form",
      {
        "data-testid": "edit-rows-columns",
        className: `${le.editRowsColumns} ${t}`,
        onSubmit: z,
        children: [
          /* @__PURE__ */ m.jsxs("label", { children: [
            "Rows:",
            /* @__PURE__ */ m.jsx("input", { type: "text", value: a, onChange: $, placeholder: "2-10" })
          ] }),
          /* @__PURE__ */ m.jsxs("label", { children: [
            "Cols:",
            /* @__PURE__ */ m.jsx("input", { type: "text", value: v, onChange: C, placeholder: "2-10" })
          ] }),
          /* @__PURE__ */ m.jsx("input", { type: "submit", value: "Ok", disabled: !g })
        ]
      }
    ),
    /* @__PURE__ */ m.jsx("span", { className: le.inlineNote, children: "(Valid numbers: 2-10)" })
  ] });
}, We = "_refreshButton_17b0p_1", Fe = {
  refreshButton: We
}, Ue = (r) => {
  const { className: t, onRefresh: o } = r;
  return /* @__PURE__ */ m.jsx(
    "button",
    {
      "data-testid": "refresh-button",
      className: `${Fe.refreshButton} ${t}`,
      onClick: o,
      title: "Refresh puzzle",
      children: /* @__PURE__ */ m.jsxs(
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
            /* @__PURE__ */ m.jsx("path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }),
            /* @__PURE__ */ m.jsx("path", { d: "M21 3v5h-5" }),
            /* @__PURE__ */ m.jsx("path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }),
            /* @__PURE__ */ m.jsx("path", { d: "M3 21v-5h5" })
          ]
        }
      )
    }
  );
}, Xe = "_timer_thvwo_1", Ge = {
  timer: Xe
}, Ve = (r) => {
  const { className: t, isRunning: o, onTimeUpdate: s } = r, [n, a] = I(0), f = X(null);
  Y(() => (o ? f.current = setInterval(() => {
    a((i) => {
      const p = i + 1;
      return s?.(p), p;
    });
  }, 1e3) : f.current && (clearInterval(f.current), f.current = null), () => {
    f.current && clearInterval(f.current);
  }), [o, s]), Y(() => {
    o && a(0);
  }, [o]);
  const v = (i) => {
    const p = Math.floor(i / 60), S = i % 60;
    return `${p.toString().padStart(2, "0")}:${S.toString().padStart(2, "0")}`;
  };
  return /* @__PURE__ */ m.jsx("div", { "data-testid": "timer", className: `${Ge.timer} ${t}`, children: v(n) });
}, Je = "_puzzle_c9hl6_1", qe = "_responsive_c9hl6_5", He = "_settingsContainer_c9hl6_13", J = {
  puzzle: Je,
  responsive: qe,
  settingsContainer: He
}, Ze = (r) => {
  const { image: t, onComplete: o, onRefresh: s, options: n } = r, {
    columns: a,
    refreshBoard: f,
    refreshCount: v,
    rows: i,
    setBoardGrid: p,
    setTimerIsRunning: S,
    timerIsRunning: R
  } = Ce(), [g, $] = I(!1);
  Y(() => {
    if (!g) return;
    const P = (O) => {
      O.preventDefault();
    }, y = (O) => {
      O.preventDefault();
    };
    return window.addEventListener("touchmove", P, { passive: !1 }), window.addEventListener("gesturestart", y, { passive: !1 }), () => {
      window.removeEventListener("touchmove", P), window.removeEventListener("gesturestart", y);
    };
  }, [g]);
  const C = (P, y) => {
    p(P, y);
  }, z = () => {
    s?.(), f();
  }, u = () => {
    S(!1), o?.();
  }, w = n.board.width / n.board.height, l = n.puzzle.responsive ? `${J.puzzle} ${J.responsive}` : J.puzzle, _ = Z(() => ({
    ...n.puzzle.responsive ? { "--puzzle-aspect-ratio": w.toString() } : {},
    touchAction: g ? "none" : void 0,
    overscrollBehavior: g ? "none" : void 0
  }), [n.puzzle.responsive, w, g]);
  return /* @__PURE__ */ m.jsxs("div", { "data-testid": "puzzle-content", className: l, style: _, children: [
    n.puzzle.timer.enabled || n.puzzle.refreshButton.enabled ? /* @__PURE__ */ m.jsxs("div", { className: J.settingsContainer, children: [
      n.puzzle.timer.enabled && /* @__PURE__ */ m.jsx(Ve, { className: n.puzzle.timer.className, isRunning: R }),
      n.puzzle.refreshButton.enabled && /* @__PURE__ */ m.jsx(
        Ue,
        {
          className: n.puzzle.refreshButton.className,
          onRefresh: z
        }
      )
    ] }) : null,
    /* @__PURE__ */ m.jsx(
      Be,
      {
        boardHeight: n.board.height,
        boardWidth: n.board.width,
        className: n.board.className,
        columns: a,
        image: t,
        onPuzzleComplete: u,
        outlineStrokeColor: n.board.outlineStrokeColor,
        puzzlePieceOptions: n.puzzlePiece,
        rows: i,
        scatterArea: n.board.scatterArea,
        showBoardSlotOutlines: n.board.showBoardSlotOutlines,
        snapThreshold: n.board.snapThreshold,
        onAnyPieceActiveChange: $
      },
      `${i}-${a}-${v}`
    ),
    n.puzzle.rowsAndColumns.enabled && /* @__PURE__ */ m.jsx("div", { className: J.settingsContainer, children: /* @__PURE__ */ m.jsx(
      Ye,
      {
        className: n.puzzle.rowsAndColumns.className,
        currentRows: i,
        currentColumns: a,
        onBoardSlotChange: C
      }
    ) })
  ] });
}, Qe = (r) => {
  const { options: t } = r, o = Re(ve, t);
  return /* @__PURE__ */ m.jsx(
    Se,
    {
      checkLocalStorage: o.checkLocalStorage,
      columns: o.board.columns,
      rows: o.board.rows,
      children: /* @__PURE__ */ m.jsx(Ze, { ...r, options: o })
    }
  );
};
export {
  ve as DEFAULT_PUZZLE_OPTIONS,
  Qe as Puzzle
};

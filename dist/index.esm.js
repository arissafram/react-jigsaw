import fe, { createContext as pe, useState as I, useContext as he, useRef as V, useCallback as D, useEffect as Y, useMemo as Q } from "react";
var K = { exports: {} }, q = {};
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
  if (ne) return q;
  ne = 1;
  var r = Symbol.for("react.transitional.element"), t = Symbol.for("react.fragment");
  function o(a, n, c) {
    var m = null;
    if (c !== void 0 && (m = "" + c), n.key !== void 0 && (m = "" + n.key), "key" in n) {
      c = {};
      for (var b in n)
        b !== "key" && (c[b] = n[b]);
    } else c = n;
    return n = c.ref, {
      $$typeof: r,
      type: a,
      key: m,
      ref: n !== void 0 ? n : null,
      props: c
    };
  }
  return q.Fragment = t, q.jsx = o, q.jsxs = o, q;
}
var H = {};
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
        case p:
          return "StrictMode";
        case T:
          return "Suspense";
        case W:
          return "SuspenseList";
        case N:
          return "Activity";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case C:
            return "Portal";
          case P:
            return (e.displayName || "Context") + ".Provider";
          case i:
            return (e._context.displayName || "Context") + ".Consumer";
          case y:
            var h = e.render;
            return e = e.displayName, e || (e = h.displayName || h.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case F:
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
        var _ = h.error, j = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return _.call(
          h,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          j
        ), t(e);
      }
    }
    function a(e) {
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
      var e = l.A;
      return e === null ? null : e.getOwner();
    }
    function c() {
      return Error("react-stack-top-frame");
    }
    function m(e) {
      if (s.call(e, "key")) {
        var h = Object.getOwnPropertyDescriptor(e, "key").get;
        if (h && h.isReactWarning) return !1;
      }
      return e.key !== void 0;
    }
    function b(e, h) {
      function _() {
        R || (R = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          h
        ));
      }
      _.isReactWarning = !0, Object.defineProperty(e, "key", {
        get: _,
        configurable: !0
      });
    }
    function u() {
      var e = r(this.type);
      return $[e] || ($[e] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), e = this.props.ref, e !== void 0 ? e : null;
    }
    function f(e, h, _, j, U, L, ee, te) {
      return _ = L.ref, e = {
        $$typeof: k,
        type: e,
        key: h,
        props: L,
        _owner: U
      }, (_ !== void 0 ? _ : null) !== null ? Object.defineProperty(e, "ref", {
        enumerable: !1,
        get: u
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
        value: ee
      }), Object.defineProperty(e, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: te
      }), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
    }
    function S(e, h, _, j, U, L, ee, te) {
      var A = h.children;
      if (A !== void 0)
        if (j)
          if (d(A)) {
            for (j = 0; j < A.length; j++)
              x(A[j]);
            Object.freeze && Object.freeze(A);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else x(A);
      if (s.call(h, "key")) {
        A = r(e);
        var G = Object.keys(h).filter(function(de) {
          return de !== "key";
        });
        j = 0 < G.length ? "{key: someKey, " + G.join(": ..., ") + ": ...}" : "{key: someKey}", J[A + j] || (G = 0 < G.length ? "{" + G.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          j,
          A,
          G,
          A
        ), J[A + j] = !0);
      }
      if (A = null, _ !== void 0 && (o(_), A = "" + _), m(h) && (o(h.key), A = "" + h.key), "key" in h) {
        _ = {};
        for (var re in h)
          re !== "key" && (_[re] = h[re]);
      } else _ = h;
      return A && b(
        _,
        typeof e == "function" ? e.displayName || e.name || "Unknown" : e
      ), f(
        e,
        A,
        L,
        U,
        n(),
        _,
        ee,
        te
      );
    }
    function x(e) {
      typeof e == "object" && e !== null && e.$$typeof === k && e._store && (e._store.validated = 1);
    }
    var v = fe, k = Symbol.for("react.transitional.element"), C = Symbol.for("react.portal"), z = Symbol.for("react.fragment"), p = Symbol.for("react.strict_mode"), w = Symbol.for("react.profiler"), i = Symbol.for("react.consumer"), P = Symbol.for("react.context"), y = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), W = Symbol.for("react.suspense_list"), F = Symbol.for("react.memo"), B = Symbol.for("react.lazy"), N = Symbol.for("react.activity"), M = Symbol.for("react.client.reference"), l = v.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, s = Object.prototype.hasOwnProperty, d = Array.isArray, E = console.createTask ? console.createTask : function() {
      return null;
    };
    v = {
      "react-stack-bottom-frame": function(e) {
        return e();
      }
    };
    var R, $ = {}, O = v["react-stack-bottom-frame"].bind(
      v,
      c
    )(), X = E(a(c)), J = {};
    H.Fragment = z, H.jsx = function(e, h, _, j, U) {
      var L = 1e4 > l.recentlyCreatedOwnerStacks++;
      return S(
        e,
        h,
        _,
        !1,
        j,
        U,
        L ? Error("react-stack-top-frame") : O,
        L ? E(a(e)) : X
      );
    }, H.jsxs = function(e, h, _, j, U) {
      var L = 1e4 > l.recentlyCreatedOwnerStacks++;
      return S(
        e,
        h,
        _,
        !0,
        j,
        U,
        L ? Error("react-stack-top-frame") : O,
        L ? E(a(e)) : X
      );
    };
  }()), H;
}
var se;
function be() {
  return se || (se = 1, process.env.NODE_ENV === "production" ? K.exports = me() : K.exports = ge()), K.exports;
}
var g = be();
const ve = {
  board: {
    className: "",
    columns: 3,
    height: 500,
    outlineStrokeColor: "#000",
    rows: 4,
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
  puzzle: {
    className: "",
    responsive: !0,
    timer: {
      className: "",
      enabled: !0
    },
    refreshButton: {
      className: "",
      enabled: !0
    },
    rowsAndColumns: {
      className: "",
      enabled: !1
    }
  },
  puzzlePiece: {
    strokeColor: "gold",
    strokeEnabled: !0
  }
}, we = "react-jigsaw", ce = 2, ie = pe(void 0), Se = (r) => {
  if (typeof window < "u" && r) {
    const t = localStorage.getItem(we);
    if (t) {
      const o = JSON.parse(t);
      if (typeof o.rows == "number" && typeof o.columns == "number")
        return { rows: o.rows, columns: o.columns };
    }
  }
  return {};
}, ze = (r) => {
  const { rows: t, columns: o } = Se(
    r.checkLocalStorage
  ), [a, n] = I(o ?? r.columns), [c, m] = I(t ?? r.rows), [b, u] = I(!0), [f, S] = I(0), x = c * a, C = {
    columns: a,
    numPieces: x,
    refreshCount: f,
    rows: c,
    timerIsRunning: b,
    setBoardGrid: (z, p) => {
      m(z), n(p), u(!1), setTimeout(() => u(!0), 10);
    },
    refreshBoard: () => {
      u(!1), S((z) => z + 1), setTimeout(() => u(!0), 10);
    },
    setTimerIsRunning: u
  };
  return /* @__PURE__ */ g.jsx(ie.Provider, { value: C, children: r.children });
}, Ee = () => {
  const r = he(ie);
  if (!r)
    throw new Error("usePuzzleContext must be used within a PuzzleProvider");
  return r;
}, xe = (r, t) => t ? {
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
} : r, Ce = 0.5;
function Re({
  initialX: r,
  initialY: t,
  boardRef: o,
  targetX: a,
  targetY: n,
  snapThreshold: c,
  onSnap: m,
  onDragStart: b,
  onDragEnd: u
}) {
  const f = V(null), [S, x] = I({
    isDragging: !1,
    x: r,
    y: t
  }), [v, k] = I(!1), C = V(null), z = V(null), p = D(
    (l, s) => {
      const d = o.current;
      if (!d) return { x: l, y: s };
      const E = d.createSVGPoint();
      E.x = l, E.y = s;
      const R = E.matrixTransform(d.getScreenCTM()?.inverse());
      return { x: R.x, y: R.y };
    },
    [o]
  ), w = D(
    (l, s) => Math.hypot(l - a, s - n) <= c ? (k(!0), x((E) => ({ ...E, x: a, y: n, isDragging: !1 })), m?.(), !0) : !1,
    [a, n, c, m]
  ), i = D(
    (l) => {
      const s = C.current;
      if (!s || !s.isDragging || l.pointerId !== s.pointerId) return;
      const d = p(l.clientX, l.clientY), E = d.x - s.offsetX, R = d.y - s.offsetY;
      x(($) => ({ ...$, x: E, y: R })), l.preventDefault();
    },
    [p]
  );
  z.current = i;
  const P = D(
    (l) => {
      const s = C.current;
      if (!s || !s.isDragging || l.pointerId !== s.pointerId) return;
      s.isDragging = !1, z.current && window.removeEventListener("pointermove", z.current), window.removeEventListener("pointerup", P), window.removeEventListener("pointercancel", P);
      const d = f.current;
      d && d.hasPointerCapture(l.pointerId) && d.releasePointerCapture(l.pointerId);
      const E = p(l.clientX, l.clientY), R = E.x - s.offsetX, $ = E.y - s.offsetY;
      C.current = null, l.type === "pointercancel" ? x((O) => ({
        ...O,
        x: s.startX,
        y: s.startY,
        isDragging: !1
      })) : w(R, $) || x((O) => ({ ...O, isDragging: !1 })), u(), l.preventDefault();
    },
    [p, w, u]
  ), y = D(
    (l) => {
      if (v || !l.isPrimary) return;
      const s = f.current;
      if (!s) return;
      const d = p(l.clientX, l.clientY), E = d.x - S.x, R = d.y - S.y;
      C.current = {
        offsetX: E,
        offsetY: R,
        pointerId: l.pointerId,
        isDragging: !0,
        startX: S.x,
        startY: S.y
      }, s.setPointerCapture(l.pointerId), z.current && window.addEventListener("pointermove", z.current, { passive: !1 }), window.addEventListener("pointerup", P, { passive: !1 }), window.addEventListener("pointercancel", P, { passive: !1 }), x(($) => ({ ...$, isDragging: !0 })), b(), l.preventDefault();
    },
    [v, S.x, S.y, p, P, b]
  ), T = D((l) => {
    l.preventDefault();
  }, []), W = D((l) => {
    l.preventDefault();
  }, []), F = D(
    (l) => {
      P(l.nativeEvent);
    },
    [P]
  );
  Y(() => {
    const l = f.current;
    if (!l) return;
    let s = null, d = !1;
    const E = (O) => {
      if (O.touches.length !== 1) {
        s = null;
        return;
      }
      const X = O.touches[0];
      s = { x: X.clientX, y: X.clientY, time: O.timeStamp }, d = !1;
    }, R = (O) => {
      if (s) {
        if (!d) {
          const X = O.touches[0], J = X.clientX - s.x, e = X.clientY - s.y, h = Math.hypot(J, e) / Math.max(O.timeStamp - s.time, 1);
          if (Math.abs(e) > Math.abs(J) && h >= Ce) {
            s = null;
            return;
          }
          d = !0;
        }
        O.cancelable && O.preventDefault();
      }
    }, $ = () => {
      s = null, d = !1;
    };
    return l.addEventListener("touchstart", E, { passive: !0 }), l.addEventListener("touchmove", R, { passive: !1 }), l.addEventListener("touchend", $), l.addEventListener("touchcancel", $), () => {
      l.removeEventListener("touchstart", E), l.removeEventListener("touchmove", R), l.removeEventListener("touchend", $), l.removeEventListener("touchcancel", $);
    };
  }, []);
  const B = D(
    (l, s) => {
      v || x((d) => ({ ...d, x: l, y: s }));
    },
    [v]
  ), N = D(
    (l, s) => {
      v || x((d) => ({ ...d, x: d.x + l, y: d.y + s }));
    },
    [v]
  ), M = D(() => v ? !1 : w(S.x, S.y), [v, S.x, S.y, w]);
  return {
    ref: f,
    dragState: S,
    isSnapped: v,
    moveTo: B,
    moveBy: N,
    trySnap: M,
    handlers: {
      onPointerDown: y,
      onPointerMove: T,
      onPointerUp: W,
      onPointerCancel: F,
      style: {
        // Not 'none': see the touch handling above.
        touchAction: "manipulation",
        cursor: v ? "default" : S.isDragging ? "grabbing" : "grab"
      }
    }
  };
}
const _e = "_puzzlePiece_1ov7n_1", Pe = {
  puzzlePiece: _e
}, ye = 10, $e = ({
  boardHeight: r,
  boardWidth: t,
  image: o,
  pieceIndex: a,
  initialX: n,
  initialY: c,
  path: m,
  snapThreshold: b,
  boardRef: u,
  targetX: f,
  targetY: S,
  puzzlePieceOptions: x,
  onSnap: v,
  onSnapWithKeyboard: k,
  registerPieceRef: C,
  boardSlotKey: z,
  onDragStart: p,
  onDragEnd: w
}) => {
  const { ref: i, dragState: P, isSnapped: y, moveBy: T, trySnap: W, handlers: F } = Re({
    initialX: n,
    initialY: c,
    snapThreshold: b,
    boardRef: u,
    targetX: f,
    targetY: S,
    onSnap: v,
    onDragStart: p,
    onDragEnd: w
  });
  Y(() => (C && C(z, i.current), () => {
    C && C(z, null);
  }), [i, C, z]);
  const B = (N) => {
    if (y) return;
    const M = ye;
    switch (N.key) {
      case "ArrowUp":
        N.preventDefault(), T(0, -M);
        break;
      case "ArrowDown":
        N.preventDefault(), T(0, M);
        break;
      case "ArrowLeft":
        N.preventDefault(), T(-M, 0);
        break;
      case "ArrowRight":
        N.preventDefault(), T(M, 0);
        break;
      case "Enter":
      case " ": {
        N.preventDefault(), W() && k && k();
        break;
      }
    }
  };
  return Y(() => {
    P.isDragging && i.current && i.current.parentNode && !y && i.current.parentNode.appendChild(i.current);
  }, [i, P.isDragging, y]), Y(() => {
    if (!P.isDragging && y && i.current && i.current.parentNode) {
      const N = i.current.parentNode;
      N.firstChild !== i.current && N.insertBefore(i.current, N.firstChild);
    }
  }, [i, P.isDragging, y]), /* @__PURE__ */ g.jsxs(
    "g",
    {
      ref: i,
      transform: y ? "" : `translate(${P.x},${P.y})`,
      ...F,
      className: Pe.puzzlePiece,
      tabIndex: y ? -1 : 0,
      onKeyDown: B,
      children: [
        /* @__PURE__ */ g.jsx("defs", { children: /* @__PURE__ */ g.jsx("clipPath", { id: `piece-clip-${a}`, children: /* @__PURE__ */ g.jsx("path", { d: m }) }) }),
        /* @__PURE__ */ g.jsx(
          "image",
          {
            href: o,
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
            d: m,
            fill: "none",
            stroke: y || !x.strokeEnabled ? "" : x.strokeColor,
            strokeWidth: x.strokeEnabled ? ce : 0
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
  for (let a = 0; a < t; a++) {
    o[a] = [];
    for (let n = 0; n < r; n++) {
      const c = n === r - 1 ? 0 : (a + n) % 2 === 0 ? 1 : -1, m = a === t - 1 ? 0 : (a + n) % 2 === 0 ? 1 : -1, b = n === 0 ? 0 : -o[a][n - 1][1], u = a === 0 ? 0 : -o[a - 1][n][2];
      o[a][n] = [u, c, m, b];
    }
  }
  return o;
}, ue = ({
  col: r,
  row: t,
  options: o
}) => {
  const { boardWidth: a, boardHeight: n, rows: c, columns: m, edgeMap: b } = o, u = a / m, f = n / c, S = r * u, x = t * f, [v, k, C, z] = b[t][r], p = Math.min(u, f) / 3, w = p / 2;
  let i = `M${S},${x}`;
  return v === 0 ? i += ` h${u}` : (i += ` h${(u - p) / 2}`, i += ` a${w},${w} 0 0 ${v === 1 ? 1 : 0} ${p},0`, i += ` h${(u - p) / 2}`), k === 0 ? i += ` v${f}` : (i += ` v${(f - p) / 2}`, i += ` a${w},${w} 0 0 ${k === 1 ? 1 : 0} 0,${p}`, i += ` v${(f - p) / 2}`), C === 0 ? i += ` h-${u}` : (i += ` h-${(u - p) / 2}`, i += ` a${w},${w} 0 0 ${C === 1 ? 1 : 0} -${p},0`, i += ` h-${(u - p) / 2}`), z === 0 ? i += ` v-${f}` : (i += ` v-${(f - p) / 2}`, i += ` a${w},${w} 0 0 ${z === 1 ? 1 : 0} 0,-${p}`, i += ` v-${(f - p) / 2}`), i += " Z", i;
}, Te = "_boardSlotOutline_mbtg0_1", Ne = "_snapped_mbtg0_6", ae = {
  boardSlotOutline: Te,
  snapped: Ne
}, je = (r) => {
  const { boardPathOptions: t, boardSlots: o, showBoardSlotOutlines: a, snappedPieceIds: n } = r;
  return a ? /* @__PURE__ */ g.jsx("g", { "data-testid": "board-outlines", children: o.map(({ pieceRow: c, pieceCol: m }) => {
    const b = `${c}-${m}`, u = n.has(b);
    return /* @__PURE__ */ g.jsx(
      "path",
      {
        "data-testid": `outline-${c}-${m}`,
        className: `${ae.boardSlotOutline} ${u ? ae.snapped : ""}`,
        d: ue({ row: c, col: m, options: t }),
        stroke: t.outlineStrokeColor
      },
      `outline-${c}-${m}`
    );
  }) }) : null;
}, Ae = (r, t) => Array.from({ length: r * t }, (o, a) => ({
  // Math.floor(i / columns) gives us the row number (0, 1, 2, ...)
  // i % columns gives us the column number (0, 1, 2, ..., columns-1)
  pieceRow: Math.floor(a / t),
  pieceCol: a % t
})), Oe = (r) => {
  const t = [...r];
  for (let o = t.length - 1; o > 0; o--) {
    const a = Math.floor(Math.random() * (o + 1));
    [t[o], t[a]] = [t[a], t[o]];
  }
  return t;
}, Ie = ({
  boardWidth: r,
  boardHeight: t,
  boardSlots: o,
  pieceHeight: a,
  pieceWidth: n,
  scatterArea: c
}) => {
  const m = Oe(o), b = r + c * 2, u = t + c * 2, f = -c, S = -c;
  return m.map(({ pieceRow: x, pieceCol: v }) => {
    const k = f + Math.random() * (b - n), C = S + Math.random() * (u - a), z = v * n, p = x * a, w = k - z, i = C - p;
    return { pieceRow: x, pieceCol: v, x: w, y: i };
  });
}, De = "_board_13b9q_1", Be = {
  board: De
}, Me = (r) => {
  const {
    boardHeight: t,
    boardWidth: o,
    className: a,
    columns: n,
    image: c,
    onPuzzleComplete: m,
    outlineStrokeColor: b,
    puzzlePieceOptions: u,
    rows: f,
    showBoardSlotOutlines: S,
    snapThreshold: x,
    scatterArea: v,
    onAnyPieceActiveChange: k
  } = r, C = t / f, z = o / n, [p, w] = I([]), [i, P] = I(/* @__PURE__ */ new Set()), y = V(null), T = V(/* @__PURE__ */ new Map()), W = Q(() => ke({ rows: f, columns: n }), [f, n]), F = Q(
    () => ({
      boardHeight: t,
      boardWidth: o,
      columns: n,
      edgeMap: W,
      outlineStrokeColor: b,
      rows: f
    }),
    [t, o, n, W, b, f]
  ), B = Q(() => Ae(f, n), [f, n]);
  Y(() => {
    const s = Ie({
      boardHeight: t,
      boardWidth: o,
      boardSlots: B,
      pieceHeight: C,
      pieceWidth: z,
      scatterArea: v
    });
    w(s), P(/* @__PURE__ */ new Set()), T.current.clear();
  }, [t, o, B, C, z, v]), Y(() => {
    const s = f * n;
    i.size === s && m?.();
  }, [i.size, f, n, m]);
  const N = (s) => {
    const { pieceRow: d, pieceCol: E } = p[s], R = `${d}-${E}`;
    P(($) => /* @__PURE__ */ new Set([...$, R]));
  }, M = (s) => {
    const d = p.find((E, R) => {
      const $ = `${E.pieceRow}-${E.pieceCol}`;
      return R !== s && !i.has($);
    });
    if (d) {
      const E = `${d.pieceRow}-${d.pieceCol}`, R = T.current.get(E);
      R && R.focus();
    }
  }, l = (s, d) => {
    d ? T.current.set(s, d) : T.current.delete(s);
  };
  return /* @__PURE__ */ g.jsxs(
    "svg",
    {
      ref: y,
      className: `${Be.board} ${a}`,
      "data-testid": "board",
      height: t,
      width: o,
      viewBox: `0 0 ${o} ${t}`,
      children: [
        /* @__PURE__ */ g.jsx(
          je,
          {
            boardPathOptions: F,
            boardSlots: B,
            showBoardSlotOutlines: S,
            snappedPieceIds: i
          }
        ),
        p.map(({ pieceRow: s, pieceCol: d, x: E, y: R }, $) => /* @__PURE__ */ g.jsx(
          $e,
          {
            boardHeight: t,
            boardWidth: o,
            boardSlotKey: `${s}-${d}`,
            image: c,
            pieceIndex: $,
            initialX: E,
            initialY: R,
            onSnap: () => N($),
            onSnapWithKeyboard: () => M($),
            path: ue({ col: d, row: s, options: F }),
            puzzlePieceOptions: u,
            registerPieceRef: l,
            snapThreshold: x,
            boardRef: y,
            targetX: d * z / 100,
            targetY: s * C / 100,
            onDragStart: () => k?.(!0),
            onDragEnd: () => k?.(!1)
          },
          `${s}-${d}`
        ))
      ]
    }
  );
}, Le = "_editRowsColumns_1gi2i_1", Ye = "_inlineNote_1gi2i_51", le = {
  editRowsColumns: Le,
  inlineNote: Ye
}, We = (r) => {
  const { className: t, currentColumns: o, currentRows: a, onBoardSlotChange: n } = r, [c, m] = I(a.toString()), [b, u] = I(o.toString()), f = parseInt(c) !== a || parseInt(b) !== o, S = parseInt(c) >= 2 && parseInt(c) <= 10, x = parseInt(b) >= 2 && parseInt(b) <= 10, v = S && x && f;
  Y(() => {
    m(a.toString()), u(o.toString());
  }, [a, o]);
  const k = (p) => {
    const w = p.target.value;
    (w === "" || /^\d+$/.test(w)) && m(w);
  }, C = (p) => {
    const w = p.target.value;
    (w === "" || /^\d+$/.test(w)) && u(w);
  }, z = (p) => {
    p.preventDefault(), v && (localStorage.setItem(
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
        onSubmit: z,
        children: [
          /* @__PURE__ */ g.jsxs("label", { children: [
            "Rows:",
            /* @__PURE__ */ g.jsx("input", { type: "text", value: c, onChange: k, placeholder: "2-10" })
          ] }),
          /* @__PURE__ */ g.jsxs("label", { children: [
            "Cols:",
            /* @__PURE__ */ g.jsx("input", { type: "text", value: b, onChange: C, placeholder: "2-10" })
          ] }),
          /* @__PURE__ */ g.jsx("input", { type: "submit", value: "Ok", disabled: !v })
        ]
      }
    ),
    /* @__PURE__ */ g.jsx("span", { className: le.inlineNote, children: "(Valid numbers: 2-10)" })
  ] });
}, Fe = "_refreshButton_17b0p_1", Xe = {
  refreshButton: Fe
}, Ue = (r) => {
  const { className: t, onRefresh: o } = r;
  return /* @__PURE__ */ g.jsx(
    "button",
    {
      "data-testid": "refresh-button",
      className: `${Xe.refreshButton} ${t}`,
      onClick: o,
      title: "Refresh puzzle",
      children: /* @__PURE__ */ g.jsxs(
        "svg",
        {
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "#000000",
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
}, Ge = "_timer_1vcjo_1", Ve = {
  timer: Ge
}, Je = (r) => {
  const { className: t, isRunning: o, onTimeUpdate: a } = r, [n, c] = I(0), m = V(null);
  Y(() => (o ? m.current = setInterval(() => {
    c((u) => {
      const f = u + 1;
      return a?.(f), f;
    });
  }, 1e3) : m.current && (clearInterval(m.current), m.current = null), () => {
    m.current && clearInterval(m.current);
  }), [o, a]), Y(() => {
    o && c(0);
  }, [o]);
  const b = (u) => {
    const f = Math.floor(u / 60), S = u % 60;
    return `${f.toString().padStart(2, "0")}:${S.toString().padStart(2, "0")}`;
  };
  return /* @__PURE__ */ g.jsx("div", { "data-testid": "timer", className: `${Ve.timer} ${t}`, children: b(n) });
}, qe = "_puzzle_c9hl6_1", He = "_responsive_c9hl6_5", Ze = "_settingsContainer_c9hl6_13", Z = {
  puzzle: qe,
  responsive: He,
  settingsContainer: Ze
}, Ke = (r) => {
  const { image: t, onComplete: o, onRefresh: a, options: n } = r, {
    columns: c,
    refreshBoard: m,
    refreshCount: b,
    rows: u,
    setBoardGrid: f,
    setTimerIsRunning: S,
    timerIsRunning: x
  } = Ee(), [v, k] = I(!1);
  Y(() => {
    if (!v) return;
    const y = (T) => {
      T.preventDefault();
    };
    return window.addEventListener("gesturestart", y, { passive: !1 }), () => {
      window.removeEventListener("gesturestart", y);
    };
  }, [v]);
  const C = (y, T) => {
    f(y, T);
  }, z = () => {
    a?.(), m();
  }, p = () => {
    S(!1), o?.();
  }, w = n.board.width / n.board.height, i = n.puzzle.responsive ? `${Z.puzzle} ${Z.responsive}` : Z.puzzle, P = Q(() => n.puzzle.responsive ? { "--puzzle-aspect-ratio": w.toString() } : {}, [n.puzzle.responsive, w]);
  return /* @__PURE__ */ g.jsxs("div", { "data-testid": "puzzle-content", className: i, style: P, children: [
    n.puzzle.timer.enabled || n.puzzle.refreshButton.enabled ? /* @__PURE__ */ g.jsxs("div", { className: Z.settingsContainer, children: [
      n.puzzle.timer.enabled && /* @__PURE__ */ g.jsx(Je, { className: n.puzzle.timer.className, isRunning: x }),
      n.puzzle.refreshButton.enabled && /* @__PURE__ */ g.jsx(
        Ue,
        {
          className: n.puzzle.refreshButton.className,
          onRefresh: z
        }
      )
    ] }) : null,
    /* @__PURE__ */ g.jsx(
      Me,
      {
        boardHeight: n.board.height,
        boardWidth: n.board.width,
        className: n.board.className,
        columns: c,
        image: t,
        onPuzzleComplete: p,
        outlineStrokeColor: n.board.outlineStrokeColor,
        puzzlePieceOptions: n.puzzlePiece,
        rows: u,
        scatterArea: n.board.scatterArea,
        showBoardSlotOutlines: n.board.showBoardSlotOutlines,
        snapThreshold: n.board.snapThreshold,
        onAnyPieceActiveChange: k
      },
      `${u}-${c}-${b}`
    ),
    n.puzzle.rowsAndColumns.enabled && /* @__PURE__ */ g.jsx("div", { className: Z.settingsContainer, children: /* @__PURE__ */ g.jsx(
      We,
      {
        className: n.puzzle.rowsAndColumns.className,
        currentRows: u,
        currentColumns: c,
        onBoardSlotChange: C
      }
    ) })
  ] });
}, et = (r) => {
  const { options: t } = r, o = xe(ve, t);
  return /* @__PURE__ */ g.jsx(
    ze,
    {
      checkLocalStorage: o.checkLocalStorage,
      columns: o.board.columns,
      rows: o.board.rows,
      children: /* @__PURE__ */ g.jsx(Ke, { ...r, options: o })
    }
  );
};
export {
  ve as DEFAULT_PUZZLE_OPTIONS,
  et as Puzzle
};

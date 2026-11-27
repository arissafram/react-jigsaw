import fe, { createContext as pe, useState as D, useContext as he, useRef as V, useCallback as B, useEffect as W, useMemo as Q } from "react";
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
  function o(a, n, i) {
    var m = null;
    if (i !== void 0 && (m = "" + i), n.key !== void 0 && (m = "" + n.key), "key" in n) {
      i = {};
      for (var p in n)
        p !== "key" && (i[p] = n[p]);
    } else i = n;
    return n = i.ref, {
      $$typeof: r,
      type: a,
      key: m,
      ref: n !== void 0 ? n : null,
      props: i
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
        return e.$$typeof === L ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case E:
          return "Fragment";
        case z:
          return "Profiler";
        case d:
          return "StrictMode";
        case k:
          return "Suspense";
        case I:
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
          case y:
            return (e.displayName || "Context") + ".Provider";
          case c:
            return (e._context.displayName || "Context") + ".Consumer";
          case T:
            var f = e.render;
            return e = e.displayName, e || (e = f.displayName || f.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case F:
            return f = e.displayName || null, f !== null ? f : r(e.type) || "Memo";
          case M:
            f = e._payload, e = e._init;
            try {
              return r(e(f));
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
        var f = !1;
      } catch {
        f = !0;
      }
      if (f) {
        f = console;
        var _ = f.error, j = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return _.call(
          f,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          j
        ), t(e);
      }
    }
    function a(e) {
      if (e === E) return "<>";
      if (typeof e == "object" && e !== null && e.$$typeof === M)
        return "<...>";
      try {
        var f = r(e);
        return f ? "<" + f + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function n() {
      var e = l.A;
      return e === null ? null : e.getOwner();
    }
    function i() {
      return Error("react-stack-top-frame");
    }
    function m(e) {
      if (s.call(e, "key")) {
        var f = Object.getOwnPropertyDescriptor(e, "key").get;
        if (f && f.isReactWarning) return !1;
      }
      return e.key !== void 0;
    }
    function p(e, f) {
      function _() {
        R || (R = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          f
        ));
      }
      _.isReactWarning = !0, Object.defineProperty(e, "key", {
        get: _,
        configurable: !0
      });
    }
    function g() {
      var e = r(this.type);
      return $[e] || ($[e] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), e = this.props.ref, e !== void 0 ? e : null;
    }
    function h(e, f, _, j, U, Y, ee, te) {
      return _ = Y.ref, e = {
        $$typeof: P,
        type: e,
        key: f,
        props: Y,
        _owner: U
      }, (_ !== void 0 ? _ : null) !== null ? Object.defineProperty(e, "ref", {
        enumerable: !1,
        get: g
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
    function v(e, f, _, j, U, Y, ee, te) {
      var A = f.children;
      if (A !== void 0)
        if (j)
          if (u(A)) {
            for (j = 0; j < A.length; j++)
              S(A[j]);
            Object.freeze && Object.freeze(A);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else S(A);
      if (s.call(f, "key")) {
        A = r(e);
        var G = Object.keys(f).filter(function(de) {
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
      if (A = null, _ !== void 0 && (o(_), A = "" + _), m(f) && (o(f.key), A = "" + f.key), "key" in f) {
        _ = {};
        for (var re in f)
          re !== "key" && (_[re] = f[re]);
      } else _ = f;
      return A && p(
        _,
        typeof e == "function" ? e.displayName || e.name || "Unknown" : e
      ), h(
        e,
        A,
        Y,
        U,
        n(),
        _,
        ee,
        te
      );
    }
    function S(e) {
      typeof e == "object" && e !== null && e.$$typeof === P && e._store && (e._store.validated = 1);
    }
    var w = fe, P = Symbol.for("react.transitional.element"), C = Symbol.for("react.portal"), E = Symbol.for("react.fragment"), d = Symbol.for("react.strict_mode"), z = Symbol.for("react.profiler"), c = Symbol.for("react.consumer"), y = Symbol.for("react.context"), T = Symbol.for("react.forward_ref"), k = Symbol.for("react.suspense"), I = Symbol.for("react.suspense_list"), F = Symbol.for("react.memo"), M = Symbol.for("react.lazy"), N = Symbol.for("react.activity"), L = Symbol.for("react.client.reference"), l = w.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, s = Object.prototype.hasOwnProperty, u = Array.isArray, x = console.createTask ? console.createTask : function() {
      return null;
    };
    w = {
      "react-stack-bottom-frame": function(e) {
        return e();
      }
    };
    var R, $ = {}, O = w["react-stack-bottom-frame"].bind(
      w,
      i
    )(), X = x(a(i)), J = {};
    H.Fragment = E, H.jsx = function(e, f, _, j, U) {
      var Y = 1e4 > l.recentlyCreatedOwnerStacks++;
      return v(
        e,
        f,
        _,
        !1,
        j,
        U,
        Y ? Error("react-stack-top-frame") : O,
        Y ? x(a(e)) : X
      );
    }, H.jsxs = function(e, f, _, j, U) {
      var Y = 1e4 > l.recentlyCreatedOwnerStacks++;
      return v(
        e,
        f,
        _,
        !0,
        j,
        U,
        Y ? Error("react-stack-top-frame") : O,
        Y ? x(a(e)) : X
      );
    };
  }()), H;
}
var se;
function be() {
  return se || (se = 1, process.env.NODE_ENV === "production" ? K.exports = me() : K.exports = ge()), K.exports;
}
var b = be();
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
  ), [a, n] = D(o ?? r.columns), [i, m] = D(t ?? r.rows), [p, g] = D(!0), [h, v] = D(0), S = i * a, C = {
    columns: a,
    numPieces: S,
    refreshCount: h,
    rows: i,
    timerIsRunning: p,
    setBoardGrid: (E, d) => {
      m(E), n(d), g(!1), setTimeout(() => g(!0), 10);
    },
    refreshBoard: () => {
      g(!1), v((E) => E + 1), setTimeout(() => g(!0), 10);
    },
    setTimerIsRunning: g
  };
  return /* @__PURE__ */ b.jsx(ie.Provider, { value: C, children: r.children });
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
  snapThreshold: i,
  onSnap: m,
  onDragStart: p,
  onDragEnd: g
}) {
  const h = V(null), [v, S] = D({
    isDragging: !1,
    x: r,
    y: t
  }), [w, P] = D(!1), C = V(null), E = V(null), d = B(
    (l, s) => {
      const u = o.current;
      if (!u) return { x: l, y: s };
      const x = u.createSVGPoint();
      x.x = l, x.y = s;
      const R = x.matrixTransform(u.getScreenCTM()?.inverse());
      return { x: R.x, y: R.y };
    },
    [o]
  ), z = B(
    (l, s) => Math.hypot(l - a, s - n) <= i ? (P(!0), S((x) => ({ ...x, x: a, y: n, isDragging: !1 })), m?.(), !0) : !1,
    [a, n, i, m]
  ), c = B(
    (l) => {
      const s = C.current;
      if (!s || !s.isDragging || l.pointerId !== s.pointerId) return;
      const u = d(l.clientX, l.clientY), x = u.x - s.offsetX, R = u.y - s.offsetY;
      S(($) => ({ ...$, x, y: R })), l.preventDefault();
    },
    [d]
  );
  E.current = c;
  const y = B(
    (l) => {
      const s = C.current;
      if (!s || !s.isDragging || l.pointerId !== s.pointerId) return;
      s.isDragging = !1, E.current && window.removeEventListener("pointermove", E.current), window.removeEventListener("pointerup", y), window.removeEventListener("pointercancel", y);
      const u = h.current;
      u && u.hasPointerCapture(l.pointerId) && u.releasePointerCapture(l.pointerId);
      const x = d(l.clientX, l.clientY), R = x.x - s.offsetX, $ = x.y - s.offsetY;
      C.current = null, l.type === "pointercancel" ? S((O) => ({
        ...O,
        x: s.startX,
        y: s.startY,
        isDragging: !1
      })) : z(R, $) || S((O) => ({ ...O, isDragging: !1 })), g(), l.preventDefault();
    },
    [d, z, g]
  ), T = B(
    (l) => {
      if (w || !l.isPrimary) return;
      const s = h.current;
      if (!s) return;
      const u = d(l.clientX, l.clientY), x = u.x - v.x, R = u.y - v.y;
      C.current = {
        offsetX: x,
        offsetY: R,
        pointerId: l.pointerId,
        isDragging: !0,
        startX: v.x,
        startY: v.y
      }, s.setPointerCapture(l.pointerId), E.current && window.addEventListener("pointermove", E.current, { passive: !1 }), window.addEventListener("pointerup", y, { passive: !1 }), window.addEventListener("pointercancel", y, { passive: !1 }), S(($) => ({ ...$, isDragging: !0 })), p(), l.preventDefault();
    },
    [w, v.x, v.y, d, y, p]
  ), k = B((l) => {
    l.preventDefault();
  }, []), I = B((l) => {
    l.preventDefault();
  }, []), F = B(
    (l) => {
      y(l.nativeEvent);
    },
    [y]
  );
  W(() => {
    const l = h.current;
    if (!l) return;
    let s = null, u = !1;
    const x = (O) => {
      if (O.touches.length !== 1) {
        s = null;
        return;
      }
      const X = O.touches[0];
      s = { x: X.clientX, y: X.clientY, time: O.timeStamp }, u = !1;
    }, R = (O) => {
      if (s) {
        if (!u) {
          const X = O.touches[0], J = X.clientX - s.x, e = X.clientY - s.y, f = Math.hypot(J, e) / Math.max(O.timeStamp - s.time, 1);
          if (Math.abs(e) > Math.abs(J) && f >= Ce) {
            s = null;
            return;
          }
          u = !0;
        }
        O.cancelable && O.preventDefault();
      }
    }, $ = () => {
      s = null, u = !1;
    };
    return l.addEventListener("touchstart", x, { passive: !0 }), l.addEventListener("touchmove", R, { passive: !1 }), l.addEventListener("touchend", $), l.addEventListener("touchcancel", $), () => {
      l.removeEventListener("touchstart", x), l.removeEventListener("touchmove", R), l.removeEventListener("touchend", $), l.removeEventListener("touchcancel", $);
    };
  }, []);
  const M = B(
    (l, s) => {
      w || S((u) => ({ ...u, x: l, y: s }));
    },
    [w]
  ), N = B(
    (l, s) => {
      w || S((u) => ({ ...u, x: u.x + l, y: u.y + s }));
    },
    [w]
  ), L = B(() => w ? !1 : z(v.x, v.y), [w, v.x, v.y, z]);
  return {
    ref: h,
    dragState: v,
    isSnapped: w,
    moveTo: M,
    moveBy: N,
    trySnap: L,
    handlers: {
      onPointerDown: T,
      onPointerMove: k,
      onPointerUp: I,
      onPointerCancel: F,
      style: {
        // Not 'none': see the touch handling above.
        touchAction: "manipulation",
        cursor: w ? "default" : v.isDragging ? "grabbing" : "grab"
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
  initialY: i,
  path: m,
  snapThreshold: p,
  boardRef: g,
  targetX: h,
  targetY: v,
  puzzlePieceOptions: S,
  onSnap: w,
  onSnapWithKeyboard: P,
  registerPieceRef: C,
  boardSlotKey: E,
  onDragStart: d,
  onDragEnd: z
}) => {
  const { ref: c, dragState: y, isSnapped: T, moveBy: k, trySnap: I, handlers: F } = Re({
    initialX: n,
    initialY: i,
    snapThreshold: p,
    boardRef: g,
    targetX: h,
    targetY: v,
    onSnap: w,
    onDragStart: d,
    onDragEnd: z
  });
  W(() => (C && C(E, c.current), () => {
    C && C(E, null);
  }), [c, C, E]);
  const M = (N) => {
    if (T) return;
    const L = ye;
    switch (N.key) {
      case "ArrowUp":
        N.preventDefault(), k(0, -L);
        break;
      case "ArrowDown":
        N.preventDefault(), k(0, L);
        break;
      case "ArrowLeft":
        N.preventDefault(), k(-L, 0);
        break;
      case "ArrowRight":
        N.preventDefault(), k(L, 0);
        break;
      case "Enter":
      case " ": {
        N.preventDefault(), I() && P && P();
        break;
      }
    }
  };
  return W(() => {
    y.isDragging && c.current && c.current.parentNode && !T && c.current.parentNode.appendChild(c.current);
  }, [c, y.isDragging, T]), W(() => {
    if (!y.isDragging && T && c.current && c.current.parentNode) {
      const N = c.current.parentNode;
      N.firstChild !== c.current && N.insertBefore(c.current, N.firstChild);
    }
  }, [c, y.isDragging, T]), /* @__PURE__ */ b.jsxs(
    "g",
    {
      ref: c,
      transform: T ? "" : `translate(${y.x},${y.y})`,
      ...F,
      className: Pe.puzzlePiece,
      tabIndex: T ? -1 : 0,
      onKeyDown: M,
      children: [
        /* @__PURE__ */ b.jsx("defs", { children: /* @__PURE__ */ b.jsx("clipPath", { id: `piece-clip-${a}`, children: /* @__PURE__ */ b.jsx("path", { d: m }) }) }),
        /* @__PURE__ */ b.jsx(
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
        /* @__PURE__ */ b.jsx(
          "path",
          {
            d: m,
            fill: "none",
            stroke: T || !S.strokeEnabled ? "" : S.strokeColor,
            strokeWidth: S.strokeEnabled ? ce : 0
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
      const i = n === r - 1 ? 0 : (a + n) % 2 === 0 ? 1 : -1, m = a === t - 1 ? 0 : (a + n) % 2 === 0 ? 1 : -1, p = n === 0 ? 0 : -o[a][n - 1][1], g = a === 0 ? 0 : -o[a - 1][n][2];
      o[a][n] = [g, i, m, p];
    }
  }
  return o;
}, ue = ({
  col: r,
  row: t,
  options: o
}) => {
  const { boardWidth: a, boardHeight: n, rows: i, columns: m, edgeMap: p } = o, g = a / m, h = n / i, v = r * g, S = t * h, [w, P, C, E] = p[t][r], d = Math.min(g, h) / 3, z = d / 2;
  let c = `M${v},${S}`;
  return w === 0 ? c += ` h${g}` : (c += ` h${(g - d) / 2}`, c += ` a${z},${z} 0 0 ${w === 1 ? 1 : 0} ${d},0`, c += ` h${(g - d) / 2}`), P === 0 ? c += ` v${h}` : (c += ` v${(h - d) / 2}`, c += ` a${z},${z} 0 0 ${P === 1 ? 1 : 0} 0,${d}`, c += ` v${(h - d) / 2}`), C === 0 ? c += ` h-${g}` : (c += ` h-${(g - d) / 2}`, c += ` a${z},${z} 0 0 ${C === 1 ? 1 : 0} -${d},0`, c += ` h-${(g - d) / 2}`), E === 0 ? c += ` v-${h}` : (c += ` v-${(h - d) / 2}`, c += ` a${z},${z} 0 0 ${E === 1 ? 1 : 0} 0,-${d}`, c += ` v-${(h - d) / 2}`), c += " Z", c;
}, Te = "_boardSlotOutline_mbtg0_1", Ne = "_snapped_mbtg0_6", ae = {
  boardSlotOutline: Te,
  snapped: Ne
}, je = (r) => {
  const { boardPathOptions: t, boardSlots: o, showBoardSlotOutlines: a, snappedPieceIds: n } = r;
  return a ? /* @__PURE__ */ b.jsx("g", { "data-testid": "board-outlines", children: o.map(({ pieceRow: i, pieceCol: m }) => {
    const p = `${i}-${m}`, g = n.has(p);
    return /* @__PURE__ */ b.jsx(
      "path",
      {
        "data-testid": `outline-${i}-${m}`,
        className: `${ae.boardSlotOutline} ${g ? ae.snapped : ""}`,
        d: ue({ row: i, col: m, options: t }),
        stroke: t.outlineStrokeColor
      },
      `outline-${i}-${m}`
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
  scatterArea: i
}) => {
  const m = Oe(o), p = r + i * 2, g = t + i * 2, h = -i, v = -i;
  return m.map(({ pieceRow: S, pieceCol: w }) => {
    const P = h + Math.random() * (p - n), C = v + Math.random() * (g - a), E = w * n, d = S * a, z = P - E, c = C - d;
    return { pieceRow: S, pieceCol: w, x: z, y: c };
  });
}, De = "_board_13b9q_1", Be = {
  board: De
}, Me = (r) => {
  const {
    boardHeight: t,
    boardWidth: o,
    className: a,
    columns: n,
    image: i,
    onPuzzleComplete: m,
    outlineStrokeColor: p,
    puzzlePieceOptions: g,
    rows: h,
    showBoardSlotOutlines: v,
    snapThreshold: S,
    scatterArea: w,
    onAnyPieceActiveChange: P
  } = r, C = t / h, E = o / n, [d, z] = D([]), [c, y] = D(/* @__PURE__ */ new Set()), T = V(null), k = V(/* @__PURE__ */ new Map()), I = Q(() => ke({ rows: h, columns: n }), [h, n]), F = Q(
    () => ({
      boardHeight: t,
      boardWidth: o,
      columns: n,
      edgeMap: I,
      outlineStrokeColor: p,
      rows: h
    }),
    [t, o, n, I, p, h]
  ), M = Q(() => Ae(h, n), [h, n]);
  W(() => {
    const s = Ie({
      boardHeight: t,
      boardWidth: o,
      boardSlots: M,
      pieceHeight: C,
      pieceWidth: E,
      scatterArea: w
    });
    z(s), y(/* @__PURE__ */ new Set()), k.current.clear();
  }, [t, o, M, C, E, w]), W(() => {
    const s = h * n;
    c.size === s && m?.();
  }, [c.size, h, n, m]);
  const N = (s) => {
    const { pieceRow: u, pieceCol: x } = d[s], R = `${u}-${x}`;
    y(($) => /* @__PURE__ */ new Set([...$, R]));
  }, L = (s) => {
    const u = d.find((x, R) => {
      const $ = `${x.pieceRow}-${x.pieceCol}`;
      return R !== s && !c.has($);
    });
    if (u) {
      const x = `${u.pieceRow}-${u.pieceCol}`, R = k.current.get(x);
      R && R.focus();
    }
  }, l = (s, u) => {
    u ? k.current.set(s, u) : k.current.delete(s);
  };
  return /* @__PURE__ */ b.jsxs(
    "svg",
    {
      ref: T,
      className: `${Be.board} ${a}`,
      "data-testid": "board",
      height: t,
      width: o,
      viewBox: `0 0 ${o} ${t}`,
      children: [
        /* @__PURE__ */ b.jsx(
          je,
          {
            boardPathOptions: F,
            boardSlots: M,
            showBoardSlotOutlines: v,
            snappedPieceIds: c
          }
        ),
        d.map(({ pieceRow: s, pieceCol: u, x, y: R }, $) => /* @__PURE__ */ b.jsx(
          $e,
          {
            boardHeight: t,
            boardWidth: o,
            boardSlotKey: `${s}-${u}`,
            image: i,
            pieceIndex: $,
            initialX: x,
            initialY: R,
            onSnap: () => N($),
            onSnapWithKeyboard: () => L($),
            path: ue({ col: u, row: s, options: F }),
            puzzlePieceOptions: g,
            registerPieceRef: l,
            snapThreshold: S,
            boardRef: T,
            targetX: u * E / 100,
            targetY: s * C / 100,
            onDragStart: () => P?.(!0),
            onDragEnd: () => P?.(!1)
          },
          `${s}-${u}`
        ))
      ]
    }
  );
}, Le = "_editRowsColumns_1gi2i_1", Ye = "_inlineNote_1gi2i_51", le = {
  editRowsColumns: Le,
  inlineNote: Ye
}, We = (r) => {
  const { className: t, currentColumns: o, currentRows: a, onBoardSlotChange: n } = r, [i, m] = D(a.toString()), [p, g] = D(o.toString()), h = parseInt(i) !== a || parseInt(p) !== o, v = parseInt(i) >= 2 && parseInt(i) <= 10, S = parseInt(p) >= 2 && parseInt(p) <= 10, w = v && S && h;
  W(() => {
    m(a.toString()), g(o.toString());
  }, [a, o]);
  const P = (d) => {
    const z = d.target.value;
    (z === "" || /^\d+$/.test(z)) && m(z);
  }, C = (d) => {
    const z = d.target.value;
    (z === "" || /^\d+$/.test(z)) && g(z);
  }, E = (d) => {
    d.preventDefault(), w && (localStorage.setItem(
      "react-jigsaw",
      JSON.stringify({
        rows: parseFloat(i),
        columns: parseFloat(p)
      })
    ), n(parseInt(i), parseInt(p)));
  };
  return /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
    /* @__PURE__ */ b.jsxs(
      "form",
      {
        "data-testid": "edit-rows-columns",
        className: `${le.editRowsColumns} ${t}`,
        onSubmit: E,
        children: [
          /* @__PURE__ */ b.jsxs("label", { children: [
            "Rows:",
            /* @__PURE__ */ b.jsx("input", { type: "text", value: i, onChange: P, placeholder: "2-10" })
          ] }),
          /* @__PURE__ */ b.jsxs("label", { children: [
            "Cols:",
            /* @__PURE__ */ b.jsx("input", { type: "text", value: p, onChange: C, placeholder: "2-10" })
          ] }),
          /* @__PURE__ */ b.jsx("input", { type: "submit", value: "Ok", disabled: !w })
        ]
      }
    ),
    /* @__PURE__ */ b.jsx("span", { className: le.inlineNote, children: "(Valid numbers: 2-10)" })
  ] });
}, Fe = "_refreshButton_17b0p_1", Xe = {
  refreshButton: Fe
}, Ue = (r) => {
  const { className: t, onRefresh: o } = r;
  return /* @__PURE__ */ b.jsx(
    "button",
    {
      "data-testid": "refresh-button",
      className: `${Xe.refreshButton} ${t}`,
      onClick: o,
      title: "Refresh puzzle",
      children: /* @__PURE__ */ b.jsxs(
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
            /* @__PURE__ */ b.jsx("path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }),
            /* @__PURE__ */ b.jsx("path", { d: "M21 3v5h-5" }),
            /* @__PURE__ */ b.jsx("path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }),
            /* @__PURE__ */ b.jsx("path", { d: "M3 21v-5h5" })
          ]
        }
      )
    }
  );
}, Ge = "_timer_1vcjo_1", Ve = {
  timer: Ge
}, Je = (r) => {
  const { className: t, isRunning: o, onTimeUpdate: a, paused: n = !1 } = r, [i, m] = D(0), p = V(null), g = o && !n;
  W(() => (g ? p.current = setInterval(() => {
    m((v) => {
      const S = v + 1;
      return a?.(S), S;
    });
  }, 1e3) : p.current && (clearInterval(p.current), p.current = null), () => {
    p.current && clearInterval(p.current);
  }), [g, a]), W(() => {
    o && m(0);
  }, [o]);
  const h = (v) => {
    const S = Math.floor(v / 60), w = v % 60;
    return `${S.toString().padStart(2, "0")}:${w.toString().padStart(2, "0")}`;
  };
  return /* @__PURE__ */ b.jsx("div", { "data-testid": "timer", className: `${Ve.timer} ${t}`, children: h(i) });
}, qe = "_puzzle_c9hl6_1", He = "_responsive_c9hl6_5", Ze = "_settingsContainer_c9hl6_13", Z = {
  puzzle: qe,
  responsive: He,
  settingsContainer: Ze
}, Ke = (r) => {
  const { image: t, onComplete: o, onRefresh: a, options: n, paused: i = !1 } = r, {
    columns: m,
    refreshBoard: p,
    refreshCount: g,
    rows: h,
    setBoardGrid: v,
    setTimerIsRunning: S,
    timerIsRunning: w
  } = Ee(), [P, C] = D(!1);
  W(() => {
    if (!P) return;
    const k = (I) => {
      I.preventDefault();
    };
    return window.addEventListener("gesturestart", k, { passive: !1 }), () => {
      window.removeEventListener("gesturestart", k);
    };
  }, [P]);
  const E = (k, I) => {
    v(k, I);
  }, d = () => {
    a?.(), p();
  }, z = () => {
    S(!1), o?.();
  }, c = n.board.width / n.board.height, y = n.puzzle.responsive ? `${Z.puzzle} ${Z.responsive}` : Z.puzzle, T = Q(() => n.puzzle.responsive ? { "--puzzle-aspect-ratio": c.toString() } : {}, [n.puzzle.responsive, c]);
  return /* @__PURE__ */ b.jsxs("div", { "data-testid": "puzzle-content", className: y, style: T, children: [
    n.puzzle.timer.enabled || n.puzzle.refreshButton.enabled ? /* @__PURE__ */ b.jsxs("div", { className: Z.settingsContainer, children: [
      n.puzzle.timer.enabled && /* @__PURE__ */ b.jsx(
        Je,
        {
          className: n.puzzle.timer.className,
          isRunning: w,
          paused: i
        }
      ),
      n.puzzle.refreshButton.enabled && /* @__PURE__ */ b.jsx(
        Ue,
        {
          className: n.puzzle.refreshButton.className,
          onRefresh: d
        }
      )
    ] }) : null,
    /* @__PURE__ */ b.jsx(
      Me,
      {
        boardHeight: n.board.height,
        boardWidth: n.board.width,
        className: n.board.className,
        columns: m,
        image: t,
        onPuzzleComplete: z,
        outlineStrokeColor: n.board.outlineStrokeColor,
        puzzlePieceOptions: n.puzzlePiece,
        rows: h,
        scatterArea: n.board.scatterArea,
        showBoardSlotOutlines: n.board.showBoardSlotOutlines,
        snapThreshold: n.board.snapThreshold,
        onAnyPieceActiveChange: C
      },
      `${h}-${m}-${g}`
    ),
    n.puzzle.rowsAndColumns.enabled && /* @__PURE__ */ b.jsx("div", { className: Z.settingsContainer, children: /* @__PURE__ */ b.jsx(
      We,
      {
        className: n.puzzle.rowsAndColumns.className,
        currentRows: h,
        currentColumns: m,
        onBoardSlotChange: E
      }
    ) })
  ] });
}, et = (r) => {
  const { options: t } = r, o = xe(ve, t);
  return /* @__PURE__ */ b.jsx(
    ze,
    {
      checkLocalStorage: o.checkLocalStorage,
      columns: o.board.columns,
      rows: o.board.rows,
      children: /* @__PURE__ */ b.jsx(Ke, { ...r, options: o })
    }
  );
};
export {
  ve as DEFAULT_PUZZLE_OPTIONS,
  et as Puzzle
};

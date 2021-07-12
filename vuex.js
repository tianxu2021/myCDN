/*!
 * vuex v3.6.2
 * (c) 2021 Evan You
 * @license MIT
 */
!(function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = e())
    : 'function' == typeof define && define.amd
    ? define(e)
    : ((t = 'undefined' != typeof globalThis ? globalThis : t || self).Vuex =
        e())
})(this, function () {
  'use strict'
  var t = (
    'undefined' != typeof window
      ? window
      : 'undefined' != typeof global
      ? global
      : {}
  ).__VUE_DEVTOOLS_GLOBAL_HOOK__
  function e(t, n) {
    if ((void 0 === n && (n = []), null === t || 'object' != typeof t)) return t
    var o,
      r =
        ((o = function (e) {
          return e.original === t
        }),
        n.filter(o)[0])
    if (r) return r.copy
    var i = Array.isArray(t) ? [] : {}
    return (
      n.push({ original: t, copy: i }),
      Object.keys(t).forEach(function (o) {
        i[o] = e(t[o], n)
      }),
      i
    )
  }
  function n(t, e) {
    Object.keys(t).forEach(function (n) {
      return e(t[n], n)
    })
  }
  function o(t) {
    return null !== t && 'object' == typeof t
  }
  var r = function (t, e) {
      ;(this.runtime = e),
        (this._children = Object.create(null)),
        (this._rawModule = t)
      var n = t.state
      this.state = ('function' == typeof n ? n() : n) || {}
    },
    i = { namespaced: { configurable: !0 } }
  ;(i.namespaced.get = function () {
    return !!this._rawModule.namespaced
  }),
    (r.prototype.addChild = function (t, e) {
      this._children[t] = e
    }),
    (r.prototype.removeChild = function (t) {
      delete this._children[t]
    }),
    (r.prototype.getChild = function (t) {
      return this._children[t]
    }),
    (r.prototype.hasChild = function (t) {
      return t in this._children
    }),
    (r.prototype.update = function (t) {
      ;(this._rawModule.namespaced = t.namespaced),
        t.actions && (this._rawModule.actions = t.actions),
        t.mutations && (this._rawModule.mutations = t.mutations),
        t.getters && (this._rawModule.getters = t.getters)
    }),
    (r.prototype.forEachChild = function (t) {
      n(this._children, t)
    }),
    (r.prototype.forEachGetter = function (t) {
      this._rawModule.getters && n(this._rawModule.getters, t)
    }),
    (r.prototype.forEachAction = function (t) {
      this._rawModule.actions && n(this._rawModule.actions, t)
    }),
    (r.prototype.forEachMutation = function (t) {
      this._rawModule.mutations && n(this._rawModule.mutations, t)
    }),
    Object.defineProperties(r.prototype, i)
  var c,
    a = function (t) {
      this.register([], t, !1)
    }
  ;(a.prototype.get = function (t) {
    return t.reduce(function (t, e) {
      return t.getChild(e)
    }, this.root)
  }),
    (a.prototype.getNamespace = function (t) {
      var e = this.root
      return t.reduce(function (t, n) {
        return t + ((e = e.getChild(n)).namespaced ? n + '/' : '')
      }, '')
    }),
    (a.prototype.update = function (t) {
      !(function t(e, n, o) {
        if ((n.update(o), o.modules))
          for (var r in o.modules) {
            if (!n.getChild(r)) return
            t(e.concat(r), n.getChild(r), o.modules[r])
          }
      })([], this.root, t)
    }),
    (a.prototype.register = function (t, e, o) {
      var i = this
      void 0 === o && (o = !0)
      var c = new r(e, o)
      0 === t.length
        ? (this.root = c)
        : this.get(t.slice(0, -1)).addChild(t[t.length - 1], c)
      e.modules &&
        n(e.modules, function (e, n) {
          i.register(t.concat(n), e, o)
        })
    }),
    (a.prototype.unregister = function (t) {
      var e = this.get(t.slice(0, -1)),
        n = t[t.length - 1],
        o = e.getChild(n)
      o && o.runtime && e.removeChild(n)
    }),
    (a.prototype.isRegistered = function (t) {
      var e = this.get(t.slice(0, -1)),
        n = t[t.length - 1]
      return !!e && e.hasChild(n)
    })
  var s = function (e) {
      var n = this
      void 0 === e && (e = {}),
        !c && 'undefined' != typeof window && window.Vue && v(window.Vue)
      var o = e.plugins
      void 0 === o && (o = [])
      var r = e.strict
      void 0 === r && (r = !1),
        (this._committing = !1),
        (this._actions = Object.create(null)),
        (this._actionSubscribers = []),
        (this._mutations = Object.create(null)),
        (this._wrappedGetters = Object.create(null)),
        (this._modules = new a(e)),
        (this._modulesNamespaceMap = Object.create(null)),
        (this._subscribers = []),
        (this._watcherVM = new c()),
        (this._makeLocalGettersCache = Object.create(null))
      var i = this,
        s = this.dispatch,
        u = this.commit
      ;(this.dispatch = function (t, e) {
        return s.call(i, t, e)
      }),
        (this.commit = function (t, e, n) {
          return u.call(i, t, e, n)
        }),
        (this.strict = r)
      var f = this._modules.root.state
      p(this, f, [], this._modules.root),
        h(this, f),
        o.forEach(function (t) {
          return t(n)
        }),
        (void 0 !== e.devtools ? e.devtools : c.config.devtools) &&
          (function (e) {
            t &&
              ((e._devtoolHook = t),
              t.emit('vuex:init', e),
              t.on('vuex:travel-to-state', function (t) {
                e.replaceState(t)
              }),
              e.subscribe(
                function (e, n) {
                  t.emit('vuex:mutation', e, n)
                },
                { prepend: !0 }
              ),
              e.subscribeAction(
                function (e, n) {
                  t.emit('vuex:action', e, n)
                },
                { prepend: !0 }
              ))
          })(this)
    },
    u = { state: { configurable: !0 } }
  function f(t, e, n) {
    return (
      e.indexOf(t) < 0 && (n && n.prepend ? e.unshift(t) : e.push(t)),
      function () {
        var n = e.indexOf(t)
        n > -1 && e.splice(n, 1)
      }
    )
  }
  function l(t, e) {
    ;(t._actions = Object.create(null)),
      (t._mutations = Object.create(null)),
      (t._wrappedGetters = Object.create(null)),
      (t._modulesNamespaceMap = Object.create(null))
    var n = t.state
    p(t, n, [], t._modules.root, !0), h(t, n, e)
  }
  function h(t, e, o) {
    var r = t._vm
    ;(t.getters = {}), (t._makeLocalGettersCache = Object.create(null))
    var i = t._wrappedGetters,
      a = {}
    n(i, function (e, n) {
      ;(a[n] = (function (t, e) {
        return function () {
          return t(e)
        }
      })(e, t)),
        Object.defineProperty(t.getters, n, {
          get: function () {
            return t._vm[n]
          },
          enumerable: !0,
        })
    })
    var s = c.config.silent
    ;(c.config.silent = !0),
      (t._vm = new c({ data: { $$state: e }, computed: a })),
      (c.config.silent = s),
      t.strict &&
        (function (t) {
          t._vm.$watch(
            function () {
              return this._data.$$state
            },
            function () {},
            { deep: !0, sync: !0 }
          )
        })(t),
      r &&
        (o &&
          t._withCommit(function () {
            r._data.$$state = null
          }),
        c.nextTick(function () {
          return r.$destroy()
        }))
  }
  function p(t, e, n, o, r) {
    var i = !n.length,
      a = t._modules.getNamespace(n)
    if (
      (o.namespaced &&
        (t._modulesNamespaceMap[a], (t._modulesNamespaceMap[a] = o)),
      !i && !r)
    ) {
      var s = d(e, n.slice(0, -1)),
        u = n[n.length - 1]
      t._withCommit(function () {
        c.set(s, u, o.state)
      })
    }
    var f = (o.context = (function (t, e, n) {
      var o = '' === e,
        r = {
          dispatch: o
            ? t.dispatch
            : function (n, o, r) {
                var i = m(n, o, r),
                  c = i.payload,
                  a = i.options,
                  s = i.type
                return (a && a.root) || (s = e + s), t.dispatch(s, c)
              },
          commit: o
            ? t.commit
            : function (n, o, r) {
                var i = m(n, o, r),
                  c = i.payload,
                  a = i.options,
                  s = i.type
                ;(a && a.root) || (s = e + s), t.commit(s, c, a)
              },
        }
      return (
        Object.defineProperties(r, {
          getters: {
            get: o
              ? function () {
                  return t.getters
                }
              : function () {
                  return (function (t, e) {
                    if (!t._makeLocalGettersCache[e]) {
                      var n = {},
                        o = e.length
                      Object.keys(t.getters).forEach(function (r) {
                        if (r.slice(0, o) === e) {
                          var i = r.slice(o)
                          Object.defineProperty(n, i, {
                            get: function () {
                              return t.getters[r]
                            },
                            enumerable: !0,
                          })
                        }
                      }),
                        (t._makeLocalGettersCache[e] = n)
                    }
                    return t._makeLocalGettersCache[e]
                  })(t, e)
                },
          },
          state: {
            get: function () {
              return d(t.state, n)
            },
          },
        }),
        r
      )
    })(t, a, n))
    o.forEachMutation(function (e, n) {
      !(function (t, e, n, o) {
        ;(t._mutations[e] || (t._mutations[e] = [])).push(function (e) {
          n.call(t, o.state, e)
        })
      })(t, a + n, e, f)
    }),
      o.forEachAction(function (e, n) {
        var o = e.root ? n : a + n,
          r = e.handler || e
        !(function (t, e, n, o) {
          ;(t._actions[e] || (t._actions[e] = [])).push(function (e) {
            var r,
              i = n.call(
                t,
                {
                  dispatch: o.dispatch,
                  commit: o.commit,
                  getters: o.getters,
                  state: o.state,
                  rootGetters: t.getters,
                  rootState: t.state,
                },
                e
              )
            return (
              ((r = i) && 'function' == typeof r.then) ||
                (i = Promise.resolve(i)),
              t._devtoolHook
                ? i.catch(function (e) {
                    throw (t._devtoolHook.emit('vuex:error', e), e)
                  })
                : i
            )
          })
        })(t, o, r, f)
      }),
      o.forEachGetter(function (e, n) {
        !(function (t, e, n, o) {
          if (t._wrappedGetters[e]) return
          t._wrappedGetters[e] = function (t) {
            return n(o.state, o.getters, t.state, t.getters)
          }
        })(t, a + n, e, f)
      }),
      o.forEachChild(function (o, i) {
        p(t, e, n.concat(i), o, r)
      })
  }
  function d(t, e) {
    return e.reduce(function (t, e) {
      return t[e]
    }, t)
  }
  function m(t, e, n) {
    return (
      o(t) && t.type && ((n = e), (e = t), (t = t.type)),
      { type: t, payload: e, options: n }
    )
  }
  function v(t) {
    ;(c && t === c) ||
      (function (t) {
        if (Number(t.version.split('.')[0]) >= 2) t.mixin({ beforeCreate: n })
        else {
          var e = t.prototype._init
          t.prototype._init = function (t) {
            void 0 === t && (t = {}),
              (t.init = t.init ? [n].concat(t.init) : n),
              e.call(this, t)
          }
        }
        function n() {
          var t = this.$options
          t.store
            ? (this.$store = 'function' == typeof t.store ? t.store() : t.store)
            : t.parent && t.parent.$store && (this.$store = t.parent.$store)
        }
      })((c = t))
  }
  ;(u.state.get = function () {
    return this._vm._data.$$state
  }),
    (u.state.set = function (t) {}),
    (s.prototype.commit = function (t, e, n) {
      var o = this,
        r = m(t, e, n),
        i = r.type,
        c = r.payload,
        a = { type: i, payload: c },
        s = this._mutations[i]
      s &&
        (this._withCommit(function () {
          s.forEach(function (t) {
            t(c)
          })
        }),
        this._subscribers.slice().forEach(function (t) {
          return t(a, o.state)
        }))
    }),
    (s.prototype.dispatch = function (t, e) {
      var n = this,
        o = m(t, e),
        r = o.type,
        i = o.payload,
        c = { type: r, payload: i },
        a = this._actions[r]
      if (a) {
        try {
          this._actionSubscribers
            .slice()
            .filter(function (t) {
              return t.before
            })
            .forEach(function (t) {
              return t.before(c, n.state)
            })
        } catch (t) {}
        var s =
          a.length > 1
            ? Promise.all(
                a.map(function (t) {
                  return t(i)
                })
              )
            : a[0](i)
        return new Promise(function (t, e) {
          s.then(
            function (e) {
              try {
                n._actionSubscribers
                  .filter(function (t) {
                    return t.after
                  })
                  .forEach(function (t) {
                    return t.after(c, n.state)
                  })
              } catch (t) {}
              t(e)
            },
            function (t) {
              try {
                n._actionSubscribers
                  .filter(function (t) {
                    return t.error
                  })
                  .forEach(function (e) {
                    return e.error(c, n.state, t)
                  })
              } catch (t) {}
              e(t)
            }
          )
        })
      }
    }),
    (s.prototype.subscribe = function (t, e) {
      return f(t, this._subscribers, e)
    }),
    (s.prototype.subscribeAction = function (t, e) {
      return f(
        'function' == typeof t ? { before: t } : t,
        this._actionSubscribers,
        e
      )
    }),
    (s.prototype.watch = function (t, e, n) {
      var o = this
      return this._watcherVM.$watch(
        function () {
          return t(o.state, o.getters)
        },
        e,
        n
      )
    }),
    (s.prototype.replaceState = function (t) {
      var e = this
      this._withCommit(function () {
        e._vm._data.$$state = t
      })
    }),
    (s.prototype.registerModule = function (t, e, n) {
      void 0 === n && (n = {}),
        'string' == typeof t && (t = [t]),
        this._modules.register(t, e),
        p(this, this.state, t, this._modules.get(t), n.preserveState),
        h(this, this.state)
    }),
    (s.prototype.unregisterModule = function (t) {
      var e = this
      'string' == typeof t && (t = [t]),
        this._modules.unregister(t),
        this._withCommit(function () {
          var n = d(e.state, t.slice(0, -1))
          c.delete(n, t[t.length - 1])
        }),
        l(this)
    }),
    (s.prototype.hasModule = function (t) {
      return 'string' == typeof t && (t = [t]), this._modules.isRegistered(t)
    }),
    (s.prototype.hotUpdate = function (t) {
      this._modules.update(t), l(this, !0)
    }),
    (s.prototype._withCommit = function (t) {
      var e = this._committing
      ;(this._committing = !0), t(), (this._committing = e)
    }),
    Object.defineProperties(s.prototype, u)
  var g = M(function (t, e) {
      var n = {}
      return (
        w(e).forEach(function (e) {
          var o = e.key,
            r = e.val
          ;(n[o] = function () {
            var e = this.$store.state,
              n = this.$store.getters
            if (t) {
              var o = $(this.$store, 'mapState', t)
              if (!o) return
              ;(e = o.context.state), (n = o.context.getters)
            }
            return 'function' == typeof r ? r.call(this, e, n) : e[r]
          }),
            (n[o].vuex = !0)
        }),
        n
      )
    }),
    y = M(function (t, e) {
      var n = {}
      return (
        w(e).forEach(function (e) {
          var o = e.key,
            r = e.val
          n[o] = function () {
            for (var e = [], n = arguments.length; n--; ) e[n] = arguments[n]
            var o = this.$store.commit
            if (t) {
              var i = $(this.$store, 'mapMutations', t)
              if (!i) return
              o = i.context.commit
            }
            return 'function' == typeof r
              ? r.apply(this, [o].concat(e))
              : o.apply(this.$store, [r].concat(e))
          }
        }),
        n
      )
    }),
    _ = M(function (t, e) {
      var n = {}
      return (
        w(e).forEach(function (e) {
          var o = e.key,
            r = e.val
          ;(r = t + r),
            (n[o] = function () {
              if (!t || $(this.$store, 'mapGetters', t))
                return this.$store.getters[r]
            }),
            (n[o].vuex = !0)
        }),
        n
      )
    }),
    b = M(function (t, e) {
      var n = {}
      return (
        w(e).forEach(function (e) {
          var o = e.key,
            r = e.val
          n[o] = function () {
            for (var e = [], n = arguments.length; n--; ) e[n] = arguments[n]
            var o = this.$store.dispatch
            if (t) {
              var i = $(this.$store, 'mapActions', t)
              if (!i) return
              o = i.context.dispatch
            }
            return 'function' == typeof r
              ? r.apply(this, [o].concat(e))
              : o.apply(this.$store, [r].concat(e))
          }
        }),
        n
      )
    })
  function w(t) {
    return (function (t) {
      return Array.isArray(t) || o(t)
    })(t)
      ? Array.isArray(t)
        ? t.map(function (t) {
            return { key: t, val: t }
          })
        : Object.keys(t).map(function (e) {
            return { key: e, val: t[e] }
          })
      : []
  }
  function M(t) {
    return function (e, n) {
      return (
        'string' != typeof e
          ? ((n = e), (e = ''))
          : '/' !== e.charAt(e.length - 1) && (e += '/'),
        t(e, n)
      )
    }
  }
  function $(t, e, n) {
    return t._modulesNamespaceMap[n]
  }
  function C(t, e, n) {
    var o = n ? t.groupCollapsed : t.group
    try {
      o.call(t, e)
    } catch (n) {
      t.log(e)
    }
  }
  function E(t) {
    try {
      t.groupEnd()
    } catch (e) {
      t.log('—— log end ——')
    }
  }
  function O() {
    var t = new Date()
    return (
      ' @ ' +
      j(t.getHours(), 2) +
      ':' +
      j(t.getMinutes(), 2) +
      ':' +
      j(t.getSeconds(), 2) +
      '.' +
      j(t.getMilliseconds(), 3)
    )
  }
  function j(t, e) {
    return (
      (n = '0'), (o = e - t.toString().length), new Array(o + 1).join(n) + t
    )
    var n, o
  }
  return {
    Store: s,
    install: v,
    version: '3.6.2',
    mapState: g,
    mapMutations: y,
    mapGetters: _,
    mapActions: b,
    createNamespacedHelpers: function (t) {
      return {
        mapState: g.bind(null, t),
        mapGetters: _.bind(null, t),
        mapMutations: y.bind(null, t),
        mapActions: b.bind(null, t),
      }
    },
    createLogger: function (t) {
      void 0 === t && (t = {})
      var n = t.collapsed
      void 0 === n && (n = !0)
      var o = t.filter
      void 0 === o &&
        (o = function (t, e, n) {
          return !0
        })
      var r = t.transformer
      void 0 === r &&
        (r = function (t) {
          return t
        })
      var i = t.mutationTransformer
      void 0 === i &&
        (i = function (t) {
          return t
        })
      var c = t.actionFilter
      void 0 === c &&
        (c = function (t, e) {
          return !0
        })
      var a = t.actionTransformer
      void 0 === a &&
        (a = function (t) {
          return t
        })
      var s = t.logMutations
      void 0 === s && (s = !0)
      var u = t.logActions
      void 0 === u && (u = !0)
      var f = t.logger
      return (
        void 0 === f && (f = console),
        function (t) {
          var l = e(t.state)
          void 0 !== f &&
            (s &&
              t.subscribe(function (t, c) {
                var a = e(c)
                if (o(t, l, a)) {
                  var s = O(),
                    u = i(t),
                    h = 'mutation ' + t.type + s
                  C(f, h, n),
                    f.log(
                      '%c prev state',
                      'color: #9E9E9E; font-weight: bold',
                      r(l)
                    ),
                    f.log(
                      '%c mutation',
                      'color: #03A9F4; font-weight: bold',
                      u
                    ),
                    f.log(
                      '%c next state',
                      'color: #4CAF50; font-weight: bold',
                      r(a)
                    ),
                    E(f)
                }
                l = a
              }),
            u &&
              t.subscribeAction(function (t, e) {
                if (c(t, e)) {
                  var o = O(),
                    r = a(t),
                    i = 'action ' + t.type + o
                  C(f, i, n),
                    f.log('%c action', 'color: #03A9F4; font-weight: bold', r),
                    E(f)
                }
              }))
        }
      )
    },
  }
})

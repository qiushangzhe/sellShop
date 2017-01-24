/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var _vue = __webpack_require__(1);

	var _vue2 = _interopRequireDefault(_vue);

	var _vueRouter = __webpack_require__(3);

	var _vueRouter2 = _interopRequireDefault(_vueRouter);

	var _vueResource = __webpack_require__(4);

	var _vueResource2 = _interopRequireDefault(_vueResource);

	var _router = __webpack_require__(5);

	var _router2 = _interopRequireDefault(_router);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// The Vue build version to load with the `import` command
	// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
	__webpack_require__(50);
	__webpack_require__(51);
	__webpack_require__(52);
	__webpack_require__(53);
	__webpack_require__(59);
	var app = {
	  initialize: function initialize() {
	    this.bindEvents();
	    this.setupVue();
	  },
	  bindEvents: function bindEvents() {
	    document.addEventListener('deviceready', this.onDeviceReady, false);
	  },
	  onDeviceReady: function onDeviceReady() {
	    app.receivedEvent('deviceready');
	  },
	  receivedEvent: function receivedEvent(id) {
	    console.log('Received Event: ' + id);
	  },
	  setupVue: function setupVue() {
	    _vue2.default.use(_vueRouter2.default);
	    _vue2.default.use(_vueResource2.default);
	    var router = new _vueRouter2.default({
	      base: __dirname,
	      routes: _router2.default
	    });
	    var vue = new _vue2.default({
	      el: '#qiuApp',
	      router: router
	    });
	  }
	};

	app.initialize();
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {/*!
	 * Vue.js v2.1.10
	 * (c) 2014-2017 Evan You
	 * Released under the MIT License.
	 */
	'use strict';

	/*  */

	/**
	 * Convert a value to a string that is actually rendered.
	 */
	function _toString (val) {
	  return val == null
	    ? ''
	    : typeof val === 'object'
	      ? JSON.stringify(val, null, 2)
	      : String(val)
	}

	/**
	 * Convert a input value to a number for persistence.
	 * If the conversion fails, return original string.
	 */
	function toNumber (val) {
	  var n = parseFloat(val);
	  return isNaN(n) ? val : n
	}

	/**
	 * Make a map and return a function for checking if a key
	 * is in that map.
	 */
	function makeMap (
	  str,
	  expectsLowerCase
	) {
	  var map = Object.create(null);
	  var list = str.split(',');
	  for (var i = 0; i < list.length; i++) {
	    map[list[i]] = true;
	  }
	  return expectsLowerCase
	    ? function (val) { return map[val.toLowerCase()]; }
	    : function (val) { return map[val]; }
	}

	/**
	 * Check if a tag is a built-in tag.
	 */
	var isBuiltInTag = makeMap('slot,component', true);

	/**
	 * Remove an item from an array
	 */
	function remove$1 (arr, item) {
	  if (arr.length) {
	    var index = arr.indexOf(item);
	    if (index > -1) {
	      return arr.splice(index, 1)
	    }
	  }
	}

	/**
	 * Check whether the object has the property.
	 */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function hasOwn (obj, key) {
	  return hasOwnProperty.call(obj, key)
	}

	/**
	 * Check if value is primitive
	 */
	function isPrimitive (value) {
	  return typeof value === 'string' || typeof value === 'number'
	}

	/**
	 * Create a cached version of a pure function.
	 */
	function cached (fn) {
	  var cache = Object.create(null);
	  return (function cachedFn (str) {
	    var hit = cache[str];
	    return hit || (cache[str] = fn(str))
	  })
	}

	/**
	 * Camelize a hyphen-delimited string.
	 */
	var camelizeRE = /-(\w)/g;
	var camelize = cached(function (str) {
	  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
	});

	/**
	 * Capitalize a string.
	 */
	var capitalize = cached(function (str) {
	  return str.charAt(0).toUpperCase() + str.slice(1)
	});

	/**
	 * Hyphenate a camelCase string.
	 */
	var hyphenateRE = /([^-])([A-Z])/g;
	var hyphenate = cached(function (str) {
	  return str
	    .replace(hyphenateRE, '$1-$2')
	    .replace(hyphenateRE, '$1-$2')
	    .toLowerCase()
	});

	/**
	 * Simple bind, faster than native
	 */
	function bind$1 (fn, ctx) {
	  function boundFn (a) {
	    var l = arguments.length;
	    return l
	      ? l > 1
	        ? fn.apply(ctx, arguments)
	        : fn.call(ctx, a)
	      : fn.call(ctx)
	  }
	  // record original fn length
	  boundFn._length = fn.length;
	  return boundFn
	}

	/**
	 * Convert an Array-like object to a real Array.
	 */
	function toArray (list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret
	}

	/**
	 * Mix properties into target object.
	 */
	function extend (to, _from) {
	  for (var key in _from) {
	    to[key] = _from[key];
	  }
	  return to
	}

	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 */
	function isObject (obj) {
	  return obj !== null && typeof obj === 'object'
	}

	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 */
	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';
	function isPlainObject (obj) {
	  return toString.call(obj) === OBJECT_STRING
	}

	/**
	 * Merge an Array of Objects into a single Object.
	 */
	function toObject (arr) {
	  var res = {};
	  for (var i = 0; i < arr.length; i++) {
	    if (arr[i]) {
	      extend(res, arr[i]);
	    }
	  }
	  return res
	}

	/**
	 * Perform no operation.
	 */
	function noop () {}

	/**
	 * Always return false.
	 */
	var no = function () { return false; };

	/**
	 * Return same value
	 */
	var identity = function (_) { return _; };

	/**
	 * Generate a static keys string from compiler modules.
	 */
	function genStaticKeys (modules) {
	  return modules.reduce(function (keys, m) {
	    return keys.concat(m.staticKeys || [])
	  }, []).join(',')
	}

	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 */
	function looseEqual (a, b) {
	  var isObjectA = isObject(a);
	  var isObjectB = isObject(b);
	  if (isObjectA && isObjectB) {
	    return JSON.stringify(a) === JSON.stringify(b)
	  } else if (!isObjectA && !isObjectB) {
	    return String(a) === String(b)
	  } else {
	    return false
	  }
	}

	function looseIndexOf (arr, val) {
	  for (var i = 0; i < arr.length; i++) {
	    if (looseEqual(arr[i], val)) { return i }
	  }
	  return -1
	}

	/*  */

	var config = {
	  /**
	   * Option merge strategies (used in core/util/options)
	   */
	  optionMergeStrategies: Object.create(null),

	  /**
	   * Whether to suppress warnings.
	   */
	  silent: false,

	  /**
	   * Whether to enable devtools
	   */
	  devtools: process.env.NODE_ENV !== 'production',

	  /**
	   * Error handler for watcher errors
	   */
	  errorHandler: null,

	  /**
	   * Ignore certain custom elements
	   */
	  ignoredElements: [],

	  /**
	   * Custom user key aliases for v-on
	   */
	  keyCodes: Object.create(null),

	  /**
	   * Check if a tag is reserved so that it cannot be registered as a
	   * component. This is platform-dependent and may be overwritten.
	   */
	  isReservedTag: no,

	  /**
	   * Check if a tag is an unknown element.
	   * Platform-dependent.
	   */
	  isUnknownElement: no,

	  /**
	   * Get the namespace of an element
	   */
	  getTagNamespace: noop,

	  /**
	   * Parse the real tag name for the specific platform.
	   */
	  parsePlatformTagName: identity,

	  /**
	   * Check if an attribute must be bound using property, e.g. value
	   * Platform-dependent.
	   */
	  mustUseProp: no,

	  /**
	   * List of asset types that a component can own.
	   */
	  _assetTypes: [
	    'component',
	    'directive',
	    'filter'
	  ],

	  /**
	   * List of lifecycle hooks.
	   */
	  _lifecycleHooks: [
	    'beforeCreate',
	    'created',
	    'beforeMount',
	    'mounted',
	    'beforeUpdate',
	    'updated',
	    'beforeDestroy',
	    'destroyed',
	    'activated',
	    'deactivated'
	  ],

	  /**
	   * Max circular updates allowed in a scheduler flush cycle.
	   */
	  _maxUpdateCount: 100
	};

	/*  */

	/**
	 * Check if a string starts with $ or _
	 */
	function isReserved (str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F
	}

	/**
	 * Define a property.
	 */
	function def (obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}

	/**
	 * Parse simple path.
	 */
	var bailRE = /[^\w.$]/;
	function parsePath (path) {
	  if (bailRE.test(path)) {
	    return
	  } else {
	    var segments = path.split('.');
	    return function (obj) {
	      for (var i = 0; i < segments.length; i++) {
	        if (!obj) { return }
	        obj = obj[segments[i]];
	      }
	      return obj
	    }
	  }
	}

	/*  */
	/* globals MutationObserver */

	// can we use __proto__?
	var hasProto = '__proto__' in {};

	// Browser environment sniffing
	var inBrowser = typeof window !== 'undefined';
	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIE = UA && /msie|trident/.test(UA);
	var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	var isEdge = UA && UA.indexOf('edge/') > 0;
	var isAndroid = UA && UA.indexOf('android') > 0;
	var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);

	// this needs to be lazy-evaled because vue may be required before
	// vue-server-renderer can set VUE_ENV
	var _isServer;
	var isServerRendering = function () {
	  if (_isServer === undefined) {
	    /* istanbul ignore if */
	    if (!inBrowser && typeof global !== 'undefined') {
	      // detect presence of vue-server-renderer and avoid
	      // Webpack shimming the process
	      _isServer = global['process'].env.VUE_ENV === 'server';
	    } else {
	      _isServer = false;
	    }
	  }
	  return _isServer
	};

	// detect devtools
	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

	/* istanbul ignore next */
	function isNative (Ctor) {
	  return /native code/.test(Ctor.toString())
	}

	/**
	 * Defer a task to execute it asynchronously.
	 */
	var nextTick = (function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc;

	  function nextTickHandler () {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks.length = 0;
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }

	  // the nextTick behavior leverages the microtask queue, which can be accessed
	  // via either native Promise.then or MutationObserver.
	  // MutationObserver has wider support, however it is seriously bugged in
	  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
	  // completely stops working after triggering a few times... so, if native
	  // Promise is available, we will use it:
	  /* istanbul ignore if */
	  if (typeof Promise !== 'undefined' && isNative(Promise)) {
	    var p = Promise.resolve();
	    var logError = function (err) { console.error(err); };
	    timerFunc = function () {
	      p.then(nextTickHandler).catch(logError);
	      // in problematic UIWebViews, Promise.then doesn't completely break, but
	      // it can get stuck in a weird state where callbacks are pushed into the
	      // microtask queue but the queue isn't being flushed, until the browser
	      // needs to do some other work, e.g. handle a timer. Therefore we can
	      // "force" the microtask queue to be flushed by adding an empty timer.
	      if (isIOS) { setTimeout(noop); }
	    };
	  } else if (typeof MutationObserver !== 'undefined' && (
	    isNative(MutationObserver) ||
	    // PhantomJS and iOS 7.x
	    MutationObserver.toString() === '[object MutationObserverConstructor]'
	  )) {
	    // use MutationObserver where native Promise is not available,
	    // e.g. PhantomJS IE11, iOS7, Android 4.4
	    var counter = 1;
	    var observer = new MutationObserver(nextTickHandler);
	    var textNode = document.createTextNode(String(counter));
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function () {
	      counter = (counter + 1) % 2;
	      textNode.data = String(counter);
	    };
	  } else {
	    // fallback to setTimeout
	    /* istanbul ignore next */
	    timerFunc = function () {
	      setTimeout(nextTickHandler, 0);
	    };
	  }

	  return function queueNextTick (cb, ctx) {
	    var _resolve;
	    callbacks.push(function () {
	      if (cb) { cb.call(ctx); }
	      if (_resolve) { _resolve(ctx); }
	    });
	    if (!pending) {
	      pending = true;
	      timerFunc();
	    }
	    if (!cb && typeof Promise !== 'undefined') {
	      return new Promise(function (resolve) {
	        _resolve = resolve;
	      })
	    }
	  }
	})();

	var _Set;
	/* istanbul ignore if */
	if (typeof Set !== 'undefined' && isNative(Set)) {
	  // use native Set when available.
	  _Set = Set;
	} else {
	  // a non-standard Set polyfill that only works with primitive keys.
	  _Set = (function () {
	    function Set () {
	      this.set = Object.create(null);
	    }
	    Set.prototype.has = function has (key) {
	      return this.set[key] === true
	    };
	    Set.prototype.add = function add (key) {
	      this.set[key] = true;
	    };
	    Set.prototype.clear = function clear () {
	      this.set = Object.create(null);
	    };

	    return Set;
	  }());
	}

	var warn = noop;
	var formatComponentName;

	if (process.env.NODE_ENV !== 'production') {
	  var hasConsole = typeof console !== 'undefined';

	  warn = function (msg, vm) {
	    if (hasConsole && (!config.silent)) {
	      console.error("[Vue warn]: " + msg + " " + (
	        vm ? formatLocation(formatComponentName(vm)) : ''
	      ));
	    }
	  };

	  formatComponentName = function (vm) {
	    if (vm.$root === vm) {
	      return 'root instance'
	    }
	    var name = vm._isVue
	      ? vm.$options.name || vm.$options._componentTag
	      : vm.name;
	    return (
	      (name ? ("component <" + name + ">") : "anonymous component") +
	      (vm._isVue && vm.$options.__file ? (" at " + (vm.$options.__file)) : '')
	    )
	  };

	  var formatLocation = function (str) {
	    if (str === 'anonymous component') {
	      str += " - use the \"name\" option for better debugging messages.";
	    }
	    return ("\n(found in " + str + ")")
	  };
	}

	/*  */


	var uid$1 = 0;

	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 */
	var Dep = function Dep () {
	  this.id = uid$1++;
	  this.subs = [];
	};

	Dep.prototype.addSub = function addSub (sub) {
	  this.subs.push(sub);
	};

	Dep.prototype.removeSub = function removeSub (sub) {
	  remove$1(this.subs, sub);
	};

	Dep.prototype.depend = function depend () {
	  if (Dep.target) {
	    Dep.target.addDep(this);
	  }
	};

	Dep.prototype.notify = function notify () {
	  // stablize the subscriber list first
	  var subs = this.subs.slice();
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};

	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;
	var targetStack = [];

	function pushTarget (_target) {
	  if (Dep.target) { targetStack.push(Dep.target); }
	  Dep.target = _target;
	}

	function popTarget () {
	  Dep.target = targetStack.pop();
	}

	/*
	 * not type checking this file because flow doesn't play well with
	 * dynamically accessing methods on Array prototype
	 */

	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto);[
	  'push',
	  'pop',
	  'shift',
	  'unshift',
	  'splice',
	  'sort',
	  'reverse'
	]
	.forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator () {
	    var arguments$1 = arguments;

	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments$1[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break
	      case 'unshift':
	        inserted = args;
	        break
	      case 'splice':
	        inserted = args.slice(2);
	        break
	    }
	    if (inserted) { ob.observeArray(inserted); }
	    // notify change
	    ob.dep.notify();
	    return result
	  });
	});

	/*  */

	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

	/**
	 * By default, when a reactive property is set, the new value is
	 * also converted to become reactive. However when passing down props,
	 * we don't want to force conversion because the value may be a nested value
	 * under a frozen data structure. Converting it would defeat the optimization.
	 */
	var observerState = {
	  shouldConvert: true,
	  isSettingProps: false
	};

	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 */
	var Observer = function Observer (value) {
	  this.value = value;
	  this.dep = new Dep();
	  this.vmCount = 0;
	  def(value, '__ob__', this);
	  if (Array.isArray(value)) {
	    var augment = hasProto
	      ? protoAugment
	      : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	};

	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 */
	Observer.prototype.walk = function walk (obj) {
	  var keys = Object.keys(obj);
	  for (var i = 0; i < keys.length; i++) {
	    defineReactive$$1(obj, keys[i], obj[keys[i]]);
	  }
	};

	/**
	 * Observe a list of Array items.
	 */
	Observer.prototype.observeArray = function observeArray (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};

	// helpers

	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 */
	function protoAugment (target, src) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src;
	  /* eslint-enable no-proto */
	}

	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 */
	/* istanbul ignore next */
	function copyAugment (target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    def(target, key, src[key]);
	  }
	}

	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 */
	function observe (value, asRootData) {
	  if (!isObject(value)) {
	    return
	  }
	  var ob;
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if (
	    observerState.shouldConvert &&
	    !isServerRendering() &&
	    (Array.isArray(value) || isPlainObject(value)) &&
	    Object.isExtensible(value) &&
	    !value._isVue
	  ) {
	    ob = new Observer(value);
	  }
	  if (asRootData && ob) {
	    ob.vmCount++;
	  }
	  return ob
	}

	/**
	 * Define a reactive property on an Object.
	 */
	function defineReactive$$1 (
	  obj,
	  key,
	  val,
	  customSetter
	) {
	  var dep = new Dep();

	  var property = Object.getOwnPropertyDescriptor(obj, key);
	  if (property && property.configurable === false) {
	    return
	  }

	  // cater for pre-defined getter/setters
	  var getter = property && property.get;
	  var setter = property && property.set;

	  var childOb = observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter () {
	      var value = getter ? getter.call(obj) : val;
	      if (Dep.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if (Array.isArray(value)) {
	          dependArray(value);
	        }
	      }
	      return value
	    },
	    set: function reactiveSetter (newVal) {
	      var value = getter ? getter.call(obj) : val;
	      /* eslint-disable no-self-compare */
	      if (newVal === value || (newVal !== newVal && value !== value)) {
	        return
	      }
	      /* eslint-enable no-self-compare */
	      if (process.env.NODE_ENV !== 'production' && customSetter) {
	        customSetter();
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = observe(newVal);
	      dep.notify();
	    }
	  });
	}

	/**
	 * Set a property on an object. Adds the new property and
	 * triggers change notification if the property doesn't
	 * already exist.
	 */
	function set$1 (obj, key, val) {
	  if (Array.isArray(obj)) {
	    obj.length = Math.max(obj.length, key);
	    obj.splice(key, 1, val);
	    return val
	  }
	  if (hasOwn(obj, key)) {
	    obj[key] = val;
	    return
	  }
	  var ob = obj.__ob__;
	  if (obj._isVue || (ob && ob.vmCount)) {
	    process.env.NODE_ENV !== 'production' && warn(
	      'Avoid adding reactive properties to a Vue instance or its root $data ' +
	      'at runtime - declare it upfront in the data option.'
	    );
	    return
	  }
	  if (!ob) {
	    obj[key] = val;
	    return
	  }
	  defineReactive$$1(ob.value, key, val);
	  ob.dep.notify();
	  return val
	}

	/**
	 * Delete a property and trigger change if necessary.
	 */
	function del (obj, key) {
	  var ob = obj.__ob__;
	  if (obj._isVue || (ob && ob.vmCount)) {
	    process.env.NODE_ENV !== 'production' && warn(
	      'Avoid deleting properties on a Vue instance or its root $data ' +
	      '- just set it to null.'
	    );
	    return
	  }
	  if (!hasOwn(obj, key)) {
	    return
	  }
	  delete obj[key];
	  if (!ob) {
	    return
	  }
	  ob.dep.notify();
	}

	/**
	 * Collect dependencies on array elements when the array is touched, since
	 * we cannot intercept array element access like property getters.
	 */
	function dependArray (value) {
	  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
	    e = value[i];
	    e && e.__ob__ && e.__ob__.dep.depend();
	    if (Array.isArray(e)) {
	      dependArray(e);
	    }
	  }
	}

	/*  */

	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 */
	var strats = config.optionMergeStrategies;

	/**
	 * Options with restrictions
	 */
	if (process.env.NODE_ENV !== 'production') {
	  strats.el = strats.propsData = function (parent, child, vm, key) {
	    if (!vm) {
	      warn(
	        "option \"" + key + "\" can only be used during instance " +
	        'creation with the `new` keyword.'
	      );
	    }
	    return defaultStrat(parent, child)
	  };
	}

	/**
	 * Helper that recursively merges two data objects together.
	 */
	function mergeData (to, from) {
	  if (!from) { return to }
	  var key, toVal, fromVal;
	  var keys = Object.keys(from);
	  for (var i = 0; i < keys.length; i++) {
	    key = keys[i];
	    toVal = to[key];
	    fromVal = from[key];
	    if (!hasOwn(to, key)) {
	      set$1(to, key, fromVal);
	    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to
	}

	/**
	 * Data
	 */
	strats.data = function (
	  parentVal,
	  childVal,
	  vm
	) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal
	    }
	    if (typeof childVal !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn(
	        'The "data" option should be a function ' +
	        'that returns a per-instance value in component ' +
	        'definitions.',
	        vm
	      );
	      return parentVal
	    }
	    if (!parentVal) {
	      return childVal
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn () {
	      return mergeData(
	        childVal.call(this),
	        parentVal.call(this)
	      )
	    }
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn () {
	      // instance merge
	      var instanceData = typeof childVal === 'function'
	        ? childVal.call(vm)
	        : childVal;
	      var defaultData = typeof parentVal === 'function'
	        ? parentVal.call(vm)
	        : undefined;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData)
	      } else {
	        return defaultData
	      }
	    }
	  }
	};

	/**
	 * Hooks and param attributes are merged as arrays.
	 */
	function mergeHook (
	  parentVal,
	  childVal
	) {
	  return childVal
	    ? parentVal
	      ? parentVal.concat(childVal)
	      : Array.isArray(childVal)
	        ? childVal
	        : [childVal]
	    : parentVal
	}

	config._lifecycleHooks.forEach(function (hook) {
	  strats[hook] = mergeHook;
	});

	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */
	function mergeAssets (parentVal, childVal) {
	  var res = Object.create(parentVal || null);
	  return childVal
	    ? extend(res, childVal)
	    : res
	}

	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});

	/**
	 * Watchers.
	 *
	 * Watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */
	strats.watch = function (parentVal, childVal) {
	  /* istanbul ignore if */
	  if (!childVal) { return parentVal }
	  if (!parentVal) { return childVal }
	  var ret = {};
	  extend(ret, parentVal);
	  for (var key in childVal) {
	    var parent = ret[key];
	    var child = childVal[key];
	    if (parent && !Array.isArray(parent)) {
	      parent = [parent];
	    }
	    ret[key] = parent
	      ? parent.concat(child)
	      : [child];
	  }
	  return ret
	};

	/**
	 * Other object hashes.
	 */
	strats.props =
	strats.methods =
	strats.computed = function (parentVal, childVal) {
	  if (!childVal) { return parentVal }
	  if (!parentVal) { return childVal }
	  var ret = Object.create(null);
	  extend(ret, parentVal);
	  extend(ret, childVal);
	  return ret
	};

	/**
	 * Default strategy.
	 */
	var defaultStrat = function (parentVal, childVal) {
	  return childVal === undefined
	    ? parentVal
	    : childVal
	};

	/**
	 * Validate component names
	 */
	function checkComponents (options) {
	  for (var key in options.components) {
	    var lower = key.toLowerCase();
	    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
	      warn(
	        'Do not use built-in or reserved HTML elements as component ' +
	        'id: ' + key
	      );
	    }
	  }
	}

	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 */
	function normalizeProps (options) {
	  var props = options.props;
	  if (!props) { return }
	  var res = {};
	  var i, val, name;
	  if (Array.isArray(props)) {
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        name = camelize(val);
	        res[name] = { type: null };
	      } else if (process.env.NODE_ENV !== 'production') {
	        warn('props must be strings when using array syntax.');
	      }
	    }
	  } else if (isPlainObject(props)) {
	    for (var key in props) {
	      val = props[key];
	      name = camelize(key);
	      res[name] = isPlainObject(val)
	        ? val
	        : { type: val };
	    }
	  }
	  options.props = res;
	}

	/**
	 * Normalize raw function directives into object format.
	 */
	function normalizeDirectives (options) {
	  var dirs = options.directives;
	  if (dirs) {
	    for (var key in dirs) {
	      var def = dirs[key];
	      if (typeof def === 'function') {
	        dirs[key] = { bind: def, update: def };
	      }
	    }
	  }
	}

	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 */
	function mergeOptions (
	  parent,
	  child,
	  vm
	) {
	  if (process.env.NODE_ENV !== 'production') {
	    checkComponents(child);
	  }
	  normalizeProps(child);
	  normalizeDirectives(child);
	  var extendsFrom = child.extends;
	  if (extendsFrom) {
	    parent = typeof extendsFrom === 'function'
	      ? mergeOptions(parent, extendsFrom.options, vm)
	      : mergeOptions(parent, extendsFrom, vm);
	  }
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      var mixin = child.mixins[i];
	      if (mixin.prototype instanceof Vue$3) {
	        mixin = mixin.options;
	      }
	      parent = mergeOptions(parent, mixin, vm);
	    }
	  }
	  var options = {};
	  var key;
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField (key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options
	}

	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 */
	function resolveAsset (
	  options,
	  type,
	  id,
	  warnMissing
	) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return
	  }
	  var assets = options[type];
	  // check local registration variations first
	  if (hasOwn(assets, id)) { return assets[id] }
	  var camelizedId = camelize(id);
	  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
	  var PascalCaseId = capitalize(camelizedId);
	  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
	  // fallback to prototype chain
	  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
	  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
	    warn(
	      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
	      options
	    );
	  }
	  return res
	}

	/*  */

	function validateProp (
	  key,
	  propOptions,
	  propsData,
	  vm
	) {
	  var prop = propOptions[key];
	  var absent = !hasOwn(propsData, key);
	  var value = propsData[key];
	  // handle boolean props
	  if (isType(Boolean, prop.type)) {
	    if (absent && !hasOwn(prop, 'default')) {
	      value = false;
	    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
	      value = true;
	    }
	  }
	  // check default value
	  if (value === undefined) {
	    value = getPropDefaultValue(vm, prop, key);
	    // since the default value is a fresh copy,
	    // make sure to observe it.
	    var prevShouldConvert = observerState.shouldConvert;
	    observerState.shouldConvert = true;
	    observe(value);
	    observerState.shouldConvert = prevShouldConvert;
	  }
	  if (process.env.NODE_ENV !== 'production') {
	    assertProp(prop, key, value, vm, absent);
	  }
	  return value
	}

	/**
	 * Get the default value of a prop.
	 */
	function getPropDefaultValue (vm, prop, key) {
	  // no default, return undefined
	  if (!hasOwn(prop, 'default')) {
	    return undefined
	  }
	  var def = prop.default;
	  // warn against non-factory defaults for Object & Array
	  if (isObject(def)) {
	    process.env.NODE_ENV !== 'production' && warn(
	      'Invalid default value for prop "' + key + '": ' +
	      'Props with type Object/Array must use a factory function ' +
	      'to return the default value.',
	      vm
	    );
	  }
	  // the raw prop value was also undefined from previous render,
	  // return previous default value to avoid unnecessary watcher trigger
	  if (vm && vm.$options.propsData &&
	    vm.$options.propsData[key] === undefined &&
	    vm[key] !== undefined) {
	    return vm[key]
	  }
	  // call factory function for non-Function types
	  return typeof def === 'function' && prop.type !== Function
	    ? def.call(vm)
	    : def
	}

	/**
	 * Assert whether a prop is valid.
	 */
	function assertProp (
	  prop,
	  name,
	  value,
	  vm,
	  absent
	) {
	  if (prop.required && absent) {
	    warn(
	      'Missing required prop: "' + name + '"',
	      vm
	    );
	    return
	  }
	  if (value == null && !prop.required) {
	    return
	  }
	  var type = prop.type;
	  var valid = !type || type === true;
	  var expectedTypes = [];
	  if (type) {
	    if (!Array.isArray(type)) {
	      type = [type];
	    }
	    for (var i = 0; i < type.length && !valid; i++) {
	      var assertedType = assertType(value, type[i]);
	      expectedTypes.push(assertedType.expectedType || '');
	      valid = assertedType.valid;
	    }
	  }
	  if (!valid) {
	    warn(
	      'Invalid prop: type check failed for prop "' + name + '".' +
	      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
	      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
	      vm
	    );
	    return
	  }
	  var validator = prop.validator;
	  if (validator) {
	    if (!validator(value)) {
	      warn(
	        'Invalid prop: custom validator check failed for prop "' + name + '".',
	        vm
	      );
	    }
	  }
	}

	/**
	 * Assert the type of a value
	 */
	function assertType (value, type) {
	  var valid;
	  var expectedType = getType(type);
	  if (expectedType === 'String') {
	    valid = typeof value === (expectedType = 'string');
	  } else if (expectedType === 'Number') {
	    valid = typeof value === (expectedType = 'number');
	  } else if (expectedType === 'Boolean') {
	    valid = typeof value === (expectedType = 'boolean');
	  } else if (expectedType === 'Function') {
	    valid = typeof value === (expectedType = 'function');
	  } else if (expectedType === 'Object') {
	    valid = isPlainObject(value);
	  } else if (expectedType === 'Array') {
	    valid = Array.isArray(value);
	  } else {
	    valid = value instanceof type;
	  }
	  return {
	    valid: valid,
	    expectedType: expectedType
	  }
	}

	/**
	 * Use function string name to check built-in types,
	 * because a simple equality check will fail when running
	 * across different vms / iframes.
	 */
	function getType (fn) {
	  var match = fn && fn.toString().match(/^\s*function (\w+)/);
	  return match && match[1]
	}

	function isType (type, fn) {
	  if (!Array.isArray(fn)) {
	    return getType(fn) === getType(type)
	  }
	  for (var i = 0, len = fn.length; i < len; i++) {
	    if (getType(fn[i]) === getType(type)) {
	      return true
	    }
	  }
	  /* istanbul ignore next */
	  return false
	}



	var util = Object.freeze({
		defineReactive: defineReactive$$1,
		_toString: _toString,
		toNumber: toNumber,
		makeMap: makeMap,
		isBuiltInTag: isBuiltInTag,
		remove: remove$1,
		hasOwn: hasOwn,
		isPrimitive: isPrimitive,
		cached: cached,
		camelize: camelize,
		capitalize: capitalize,
		hyphenate: hyphenate,
		bind: bind$1,
		toArray: toArray,
		extend: extend,
		isObject: isObject,
		isPlainObject: isPlainObject,
		toObject: toObject,
		noop: noop,
		no: no,
		identity: identity,
		genStaticKeys: genStaticKeys,
		looseEqual: looseEqual,
		looseIndexOf: looseIndexOf,
		isReserved: isReserved,
		def: def,
		parsePath: parsePath,
		hasProto: hasProto,
		inBrowser: inBrowser,
		UA: UA,
		isIE: isIE,
		isIE9: isIE9,
		isEdge: isEdge,
		isAndroid: isAndroid,
		isIOS: isIOS,
		isServerRendering: isServerRendering,
		devtools: devtools,
		nextTick: nextTick,
		get _Set () { return _Set; },
		mergeOptions: mergeOptions,
		resolveAsset: resolveAsset,
		get warn () { return warn; },
		get formatComponentName () { return formatComponentName; },
		validateProp: validateProp
	});

	/* not type checking this file because flow doesn't play well with Proxy */

	var initProxy;

	if (process.env.NODE_ENV !== 'production') {
	  var allowedGlobals = makeMap(
	    'Infinity,undefined,NaN,isFinite,isNaN,' +
	    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
	    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
	    'require' // for Webpack/Browserify
	  );

	  var warnNonPresent = function (target, key) {
	    warn(
	      "Property or method \"" + key + "\" is not defined on the instance but " +
	      "referenced during render. Make sure to declare reactive data " +
	      "properties in the data option.",
	      target
	    );
	  };

	  var hasProxy =
	    typeof Proxy !== 'undefined' &&
	    Proxy.toString().match(/native code/);

	  if (hasProxy) {
	    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
	    config.keyCodes = new Proxy(config.keyCodes, {
	      set: function set (target, key, value) {
	        if (isBuiltInModifier(key)) {
	          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
	          return false
	        } else {
	          target[key] = value;
	          return true
	        }
	      }
	    });
	  }

	  var hasHandler = {
	    has: function has (target, key) {
	      var has = key in target;
	      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
	      if (!has && !isAllowed) {
	        warnNonPresent(target, key);
	      }
	      return has || !isAllowed
	    }
	  };

	  var getHandler = {
	    get: function get (target, key) {
	      if (typeof key === 'string' && !(key in target)) {
	        warnNonPresent(target, key);
	      }
	      return target[key]
	    }
	  };

	  initProxy = function initProxy (vm) {
	    if (hasProxy) {
	      // determine which proxy handler to use
	      var options = vm.$options;
	      var handlers = options.render && options.render._withStripped
	        ? getHandler
	        : hasHandler;
	      vm._renderProxy = new Proxy(vm, handlers);
	    } else {
	      vm._renderProxy = vm;
	    }
	  };
	}

	/*  */

	var VNode = function VNode (
	  tag,
	  data,
	  children,
	  text,
	  elm,
	  context,
	  componentOptions
	) {
	  this.tag = tag;
	  this.data = data;
	  this.children = children;
	  this.text = text;
	  this.elm = elm;
	  this.ns = undefined;
	  this.context = context;
	  this.functionalContext = undefined;
	  this.key = data && data.key;
	  this.componentOptions = componentOptions;
	  this.componentInstance = undefined;
	  this.parent = undefined;
	  this.raw = false;
	  this.isStatic = false;
	  this.isRootInsert = true;
	  this.isComment = false;
	  this.isCloned = false;
	  this.isOnce = false;
	};

	var prototypeAccessors = { child: {} };

	// DEPRECATED: alias for componentInstance for backwards compat.
	/* istanbul ignore next */
	prototypeAccessors.child.get = function () {
	  return this.componentInstance
	};

	Object.defineProperties( VNode.prototype, prototypeAccessors );

	var createEmptyVNode = function () {
	  var node = new VNode();
	  node.text = '';
	  node.isComment = true;
	  return node
	};

	function createTextVNode (val) {
	  return new VNode(undefined, undefined, undefined, String(val))
	}

	// optimized shallow clone
	// used for static nodes and slot nodes because they may be reused across
	// multiple renders, cloning them avoids errors when DOM manipulations rely
	// on their elm reference.
	function cloneVNode (vnode) {
	  var cloned = new VNode(
	    vnode.tag,
	    vnode.data,
	    vnode.children,
	    vnode.text,
	    vnode.elm,
	    vnode.context,
	    vnode.componentOptions
	  );
	  cloned.ns = vnode.ns;
	  cloned.isStatic = vnode.isStatic;
	  cloned.key = vnode.key;
	  cloned.isCloned = true;
	  return cloned
	}

	function cloneVNodes (vnodes) {
	  var res = new Array(vnodes.length);
	  for (var i = 0; i < vnodes.length; i++) {
	    res[i] = cloneVNode(vnodes[i]);
	  }
	  return res
	}

	/*  */

	var hooks = { init: init, prepatch: prepatch, insert: insert, destroy: destroy$1 };
	var hooksToMerge = Object.keys(hooks);

	function createComponent (
	  Ctor,
	  data,
	  context,
	  children,
	  tag
	) {
	  if (!Ctor) {
	    return
	  }

	  var baseCtor = context.$options._base;
	  if (isObject(Ctor)) {
	    Ctor = baseCtor.extend(Ctor);
	  }

	  if (typeof Ctor !== 'function') {
	    if (process.env.NODE_ENV !== 'production') {
	      warn(("Invalid Component definition: " + (String(Ctor))), context);
	    }
	    return
	  }

	  // async component
	  if (!Ctor.cid) {
	    if (Ctor.resolved) {
	      Ctor = Ctor.resolved;
	    } else {
	      Ctor = resolveAsyncComponent(Ctor, baseCtor, function () {
	        // it's ok to queue this on every render because
	        // $forceUpdate is buffered by the scheduler.
	        context.$forceUpdate();
	      });
	      if (!Ctor) {
	        // return nothing if this is indeed an async component
	        // wait for the callback to trigger parent update.
	        return
	      }
	    }
	  }

	  // resolve constructor options in case global mixins are applied after
	  // component constructor creation
	  resolveConstructorOptions(Ctor);

	  data = data || {};

	  // extract props
	  var propsData = extractProps(data, Ctor);

	  // functional component
	  if (Ctor.options.functional) {
	    return createFunctionalComponent(Ctor, propsData, data, context, children)
	  }

	  // extract listeners, since these needs to be treated as
	  // child component listeners instead of DOM listeners
	  var listeners = data.on;
	  // replace with listeners with .native modifier
	  data.on = data.nativeOn;

	  if (Ctor.options.abstract) {
	    // abstract components do not keep anything
	    // other than props & listeners
	    data = {};
	  }

	  // merge component management hooks onto the placeholder node
	  mergeHooks(data);

	  // return a placeholder vnode
	  var name = Ctor.options.name || tag;
	  var vnode = new VNode(
	    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
	    data, undefined, undefined, undefined, context,
	    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
	  );
	  return vnode
	}

	function createFunctionalComponent (
	  Ctor,
	  propsData,
	  data,
	  context,
	  children
	) {
	  var props = {};
	  var propOptions = Ctor.options.props;
	  if (propOptions) {
	    for (var key in propOptions) {
	      props[key] = validateProp(key, propOptions, propsData);
	    }
	  }
	  // ensure the createElement function in functional components
	  // gets a unique context - this is necessary for correct named slot check
	  var _context = Object.create(context);
	  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
	  var vnode = Ctor.options.render.call(null, h, {
	    props: props,
	    data: data,
	    parent: context,
	    children: children,
	    slots: function () { return resolveSlots(children, context); }
	  });
	  if (vnode instanceof VNode) {
	    vnode.functionalContext = context;
	    if (data.slot) {
	      (vnode.data || (vnode.data = {})).slot = data.slot;
	    }
	  }
	  return vnode
	}

	function createComponentInstanceForVnode (
	  vnode, // we know it's MountedComponentVNode but flow doesn't
	  parent, // activeInstance in lifecycle state
	  parentElm,
	  refElm
	) {
	  var vnodeComponentOptions = vnode.componentOptions;
	  var options = {
	    _isComponent: true,
	    parent: parent,
	    propsData: vnodeComponentOptions.propsData,
	    _componentTag: vnodeComponentOptions.tag,
	    _parentVnode: vnode,
	    _parentListeners: vnodeComponentOptions.listeners,
	    _renderChildren: vnodeComponentOptions.children,
	    _parentElm: parentElm || null,
	    _refElm: refElm || null
	  };
	  // check inline-template render functions
	  var inlineTemplate = vnode.data.inlineTemplate;
	  if (inlineTemplate) {
	    options.render = inlineTemplate.render;
	    options.staticRenderFns = inlineTemplate.staticRenderFns;
	  }
	  return new vnodeComponentOptions.Ctor(options)
	}

	function init (
	  vnode,
	  hydrating,
	  parentElm,
	  refElm
	) {
	  if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
	    var child = vnode.componentInstance = createComponentInstanceForVnode(
	      vnode,
	      activeInstance,
	      parentElm,
	      refElm
	    );
	    child.$mount(hydrating ? vnode.elm : undefined, hydrating);
	  } else if (vnode.data.keepAlive) {
	    // kept-alive components, treat as a patch
	    var mountedNode = vnode; // work around flow
	    prepatch(mountedNode, mountedNode);
	  }
	}

	function prepatch (
	  oldVnode,
	  vnode
	) {
	  var options = vnode.componentOptions;
	  var child = vnode.componentInstance = oldVnode.componentInstance;
	  child._updateFromParent(
	    options.propsData, // updated props
	    options.listeners, // updated listeners
	    vnode, // new parent vnode
	    options.children // new children
	  );
	}

	function insert (vnode) {
	  if (!vnode.componentInstance._isMounted) {
	    vnode.componentInstance._isMounted = true;
	    callHook(vnode.componentInstance, 'mounted');
	  }
	  if (vnode.data.keepAlive) {
	    vnode.componentInstance._inactive = false;
	    callHook(vnode.componentInstance, 'activated');
	  }
	}

	function destroy$1 (vnode) {
	  if (!vnode.componentInstance._isDestroyed) {
	    if (!vnode.data.keepAlive) {
	      vnode.componentInstance.$destroy();
	    } else {
	      vnode.componentInstance._inactive = true;
	      callHook(vnode.componentInstance, 'deactivated');
	    }
	  }
	}

	function resolveAsyncComponent (
	  factory,
	  baseCtor,
	  cb
	) {
	  if (factory.requested) {
	    // pool callbacks
	    factory.pendingCallbacks.push(cb);
	  } else {
	    factory.requested = true;
	    var cbs = factory.pendingCallbacks = [cb];
	    var sync = true;

	    var resolve = function (res) {
	      if (isObject(res)) {
	        res = baseCtor.extend(res);
	      }
	      // cache resolved
	      factory.resolved = res;
	      // invoke callbacks only if this is not a synchronous resolve
	      // (async resolves are shimmed as synchronous during SSR)
	      if (!sync) {
	        for (var i = 0, l = cbs.length; i < l; i++) {
	          cbs[i](res);
	        }
	      }
	    };

	    var reject = function (reason) {
	      process.env.NODE_ENV !== 'production' && warn(
	        "Failed to resolve async component: " + (String(factory)) +
	        (reason ? ("\nReason: " + reason) : '')
	      );
	    };

	    var res = factory(resolve, reject);

	    // handle promise
	    if (res && typeof res.then === 'function' && !factory.resolved) {
	      res.then(resolve, reject);
	    }

	    sync = false;
	    // return in case resolved synchronously
	    return factory.resolved
	  }
	}

	function extractProps (data, Ctor) {
	  // we are only extracting raw values here.
	  // validation and default values are handled in the child
	  // component itself.
	  var propOptions = Ctor.options.props;
	  if (!propOptions) {
	    return
	  }
	  var res = {};
	  var attrs = data.attrs;
	  var props = data.props;
	  var domProps = data.domProps;
	  if (attrs || props || domProps) {
	    for (var key in propOptions) {
	      var altKey = hyphenate(key);
	      checkProp(res, props, key, altKey, true) ||
	      checkProp(res, attrs, key, altKey) ||
	      checkProp(res, domProps, key, altKey);
	    }
	  }
	  return res
	}

	function checkProp (
	  res,
	  hash,
	  key,
	  altKey,
	  preserve
	) {
	  if (hash) {
	    if (hasOwn(hash, key)) {
	      res[key] = hash[key];
	      if (!preserve) {
	        delete hash[key];
	      }
	      return true
	    } else if (hasOwn(hash, altKey)) {
	      res[key] = hash[altKey];
	      if (!preserve) {
	        delete hash[altKey];
	      }
	      return true
	    }
	  }
	  return false
	}

	function mergeHooks (data) {
	  if (!data.hook) {
	    data.hook = {};
	  }
	  for (var i = 0; i < hooksToMerge.length; i++) {
	    var key = hooksToMerge[i];
	    var fromParent = data.hook[key];
	    var ours = hooks[key];
	    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
	  }
	}

	function mergeHook$1 (one, two) {
	  return function (a, b, c, d) {
	    one(a, b, c, d);
	    two(a, b, c, d);
	  }
	}

	/*  */

	function mergeVNodeHook (def, hookKey, hook, key) {
	  key = key + hookKey;
	  var injectedHash = def.__injected || (def.__injected = {});
	  if (!injectedHash[key]) {
	    injectedHash[key] = true;
	    var oldHook = def[hookKey];
	    if (oldHook) {
	      def[hookKey] = function () {
	        oldHook.apply(this, arguments);
	        hook.apply(this, arguments);
	      };
	    } else {
	      def[hookKey] = hook;
	    }
	  }
	}

	/*  */

	var normalizeEvent = cached(function (name) {
	  var once = name.charAt(0) === '~'; // Prefixed last, checked first
	  name = once ? name.slice(1) : name;
	  var capture = name.charAt(0) === '!';
	  name = capture ? name.slice(1) : name;
	  return {
	    name: name,
	    once: once,
	    capture: capture
	  }
	});

	function createEventHandle (fn) {
	  var handle = {
	    fn: fn,
	    invoker: function () {
	      var arguments$1 = arguments;

	      var fn = handle.fn;
	      if (Array.isArray(fn)) {
	        for (var i = 0; i < fn.length; i++) {
	          fn[i].apply(null, arguments$1);
	        }
	      } else {
	        fn.apply(null, arguments);
	      }
	    }
	  };
	  return handle
	}

	function updateListeners (
	  on,
	  oldOn,
	  add,
	  remove$$1,
	  vm
	) {
	  var name, cur, old, event;
	  for (name in on) {
	    cur = on[name];
	    old = oldOn[name];
	    event = normalizeEvent(name);
	    if (!cur) {
	      process.env.NODE_ENV !== 'production' && warn(
	        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
	        vm
	      );
	    } else if (!old) {
	      if (!cur.invoker) {
	        cur = on[name] = createEventHandle(cur);
	      }
	      add(event.name, cur.invoker, event.once, event.capture);
	    } else if (cur !== old) {
	      old.fn = cur;
	      on[name] = old;
	    }
	  }
	  for (name in oldOn) {
	    if (!on[name]) {
	      event = normalizeEvent(name);
	      remove$$1(event.name, oldOn[name].invoker, event.capture);
	    }
	  }
	}

	/*  */

	// The template compiler attempts to minimize the need for normalization by
	// statically analyzing the template at compile time.
	//
	// For plain HTML markup, normalization can be completely skipped because the
	// generated render function is guaranteed to return Array<VNode>. There are
	// two cases where extra normalization is needed:

	// 1. When the children contains components - because a functional component
	// may return an Array instead of a single root. In this case, just a simple
	// nomralization is needed - if any child is an Array, we flatten the whole
	// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
	// because functional components already normalize their own children.
	function simpleNormalizeChildren (children) {
	  for (var i = 0; i < children.length; i++) {
	    if (Array.isArray(children[i])) {
	      return Array.prototype.concat.apply([], children)
	    }
	  }
	  return children
	}

	// 2. When the children contains constrcuts that always generated nested Arrays,
	// e.g. <template>, <slot>, v-for, or when the children is provided by user
	// with hand-written render functions / JSX. In such cases a full normalization
	// is needed to cater to all possible types of children values.
	function normalizeChildren (children) {
	  return isPrimitive(children)
	    ? [createTextVNode(children)]
	    : Array.isArray(children)
	      ? normalizeArrayChildren(children)
	      : undefined
	}

	function normalizeArrayChildren (children, nestedIndex) {
	  var res = [];
	  var i, c, last;
	  for (i = 0; i < children.length; i++) {
	    c = children[i];
	    if (c == null || typeof c === 'boolean') { continue }
	    last = res[res.length - 1];
	    //  nested
	    if (Array.isArray(c)) {
	      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
	    } else if (isPrimitive(c)) {
	      if (last && last.text) {
	        last.text += String(c);
	      } else if (c !== '') {
	        // convert primitive to vnode
	        res.push(createTextVNode(c));
	      }
	    } else {
	      if (c.text && last && last.text) {
	        res[res.length - 1] = createTextVNode(last.text + c.text);
	      } else {
	        // default key for nested array children (likely generated by v-for)
	        if (c.tag && c.key == null && nestedIndex != null) {
	          c.key = "__vlist" + nestedIndex + "_" + i + "__";
	        }
	        res.push(c);
	      }
	    }
	  }
	  return res
	}

	/*  */

	function getFirstComponentChild (children) {
	  return children && children.filter(function (c) { return c && c.componentOptions; })[0]
	}

	/*  */

	var SIMPLE_NORMALIZE = 1;
	var ALWAYS_NORMALIZE = 2;

	// wrapper function for providing a more flexible interface
	// without getting yelled at by flow
	function createElement (
	  context,
	  tag,
	  data,
	  children,
	  normalizationType,
	  alwaysNormalize
	) {
	  if (Array.isArray(data) || isPrimitive(data)) {
	    normalizationType = children;
	    children = data;
	    data = undefined;
	  }
	  if (alwaysNormalize) { normalizationType = ALWAYS_NORMALIZE; }
	  return _createElement(context, tag, data, children, normalizationType)
	}

	function _createElement (
	  context,
	  tag,
	  data,
	  children,
	  normalizationType
	) {
	  if (data && data.__ob__) {
	    process.env.NODE_ENV !== 'production' && warn(
	      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
	      'Always create fresh vnode data objects in each render!',
	      context
	    );
	    return createEmptyVNode()
	  }
	  if (!tag) {
	    // in case of component :is set to falsy value
	    return createEmptyVNode()
	  }
	  // support single function children as default scoped slot
	  if (Array.isArray(children) &&
	      typeof children[0] === 'function') {
	    data = data || {};
	    data.scopedSlots = { default: children[0] };
	    children.length = 0;
	  }
	  if (normalizationType === ALWAYS_NORMALIZE) {
	    children = normalizeChildren(children);
	  } else if (normalizationType === SIMPLE_NORMALIZE) {
	    children = simpleNormalizeChildren(children);
	  }
	  var vnode, ns;
	  if (typeof tag === 'string') {
	    var Ctor;
	    ns = config.getTagNamespace(tag);
	    if (config.isReservedTag(tag)) {
	      // platform built-in elements
	      vnode = new VNode(
	        config.parsePlatformTagName(tag), data, children,
	        undefined, undefined, context
	      );
	    } else if ((Ctor = resolveAsset(context.$options, 'components', tag))) {
	      // component
	      vnode = createComponent(Ctor, data, context, children, tag);
	    } else {
	      // unknown or unlisted namespaced elements
	      // check at runtime because it may get assigned a namespace when its
	      // parent normalizes children
	      vnode = new VNode(
	        tag, data, children,
	        undefined, undefined, context
	      );
	    }
	  } else {
	    // direct component options / constructor
	    vnode = createComponent(tag, data, context, children);
	  }
	  if (vnode) {
	    if (ns) { applyNS(vnode, ns); }
	    return vnode
	  } else {
	    return createEmptyVNode()
	  }
	}

	function applyNS (vnode, ns) {
	  vnode.ns = ns;
	  if (vnode.tag === 'foreignObject') {
	    // use default namespace inside foreignObject
	    return
	  }
	  if (vnode.children) {
	    for (var i = 0, l = vnode.children.length; i < l; i++) {
	      var child = vnode.children[i];
	      if (child.tag && !child.ns) {
	        applyNS(child, ns);
	      }
	    }
	  }
	}

	/*  */

	function initRender (vm) {
	  vm.$vnode = null; // the placeholder node in parent tree
	  vm._vnode = null; // the root of the child tree
	  vm._staticTrees = null;
	  var parentVnode = vm.$options._parentVnode;
	  var renderContext = parentVnode && parentVnode.context;
	  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
	  vm.$scopedSlots = {};
	  // bind the createElement fn to this instance
	  // so that we get proper render context inside it.
	  // args order: tag, data, children, normalizationType, alwaysNormalize
	  // internal version is used by render functions compiled from templates
	  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
	  // normalization is always applied for the public version, used in
	  // user-written render functions.
	  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
	}

	function renderMixin (Vue) {
	  Vue.prototype.$nextTick = function (fn) {
	    return nextTick(fn, this)
	  };

	  Vue.prototype._render = function () {
	    var vm = this;
	    var ref = vm.$options;
	    var render = ref.render;
	    var staticRenderFns = ref.staticRenderFns;
	    var _parentVnode = ref._parentVnode;

	    if (vm._isMounted) {
	      // clone slot nodes on re-renders
	      for (var key in vm.$slots) {
	        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
	      }
	    }

	    if (_parentVnode && _parentVnode.data.scopedSlots) {
	      vm.$scopedSlots = _parentVnode.data.scopedSlots;
	    }

	    if (staticRenderFns && !vm._staticTrees) {
	      vm._staticTrees = [];
	    }
	    // set parent vnode. this allows render functions to have access
	    // to the data on the placeholder node.
	    vm.$vnode = _parentVnode;
	    // render self
	    var vnode;
	    try {
	      vnode = render.call(vm._renderProxy, vm.$createElement);
	    } catch (e) {
	      /* istanbul ignore else */
	      if (config.errorHandler) {
	        config.errorHandler.call(null, e, vm);
	      } else {
	        if (process.env.NODE_ENV !== 'production') {
	          warn(("Error when rendering " + (formatComponentName(vm)) + ":"));
	        }
	        throw e
	      }
	      // return previous vnode to prevent render error causing blank component
	      vnode = vm._vnode;
	    }
	    // return empty vnode in case the render function errored out
	    if (!(vnode instanceof VNode)) {
	      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
	        warn(
	          'Multiple root nodes returned from render function. Render function ' +
	          'should return a single root node.',
	          vm
	        );
	      }
	      vnode = createEmptyVNode();
	    }
	    // set parent
	    vnode.parent = _parentVnode;
	    return vnode
	  };

	  // toString for mustaches
	  Vue.prototype._s = _toString;
	  // convert text to vnode
	  Vue.prototype._v = createTextVNode;
	  // number conversion
	  Vue.prototype._n = toNumber;
	  // empty vnode
	  Vue.prototype._e = createEmptyVNode;
	  // loose equal
	  Vue.prototype._q = looseEqual;
	  // loose indexOf
	  Vue.prototype._i = looseIndexOf;

	  // render static tree by index
	  Vue.prototype._m = function renderStatic (
	    index,
	    isInFor
	  ) {
	    var tree = this._staticTrees[index];
	    // if has already-rendered static tree and not inside v-for,
	    // we can reuse the same tree by doing a shallow clone.
	    if (tree && !isInFor) {
	      return Array.isArray(tree)
	        ? cloneVNodes(tree)
	        : cloneVNode(tree)
	    }
	    // otherwise, render a fresh tree.
	    tree = this._staticTrees[index] = this.$options.staticRenderFns[index].call(this._renderProxy);
	    markStatic(tree, ("__static__" + index), false);
	    return tree
	  };

	  // mark node as static (v-once)
	  Vue.prototype._o = function markOnce (
	    tree,
	    index,
	    key
	  ) {
	    markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
	    return tree
	  };

	  function markStatic (tree, key, isOnce) {
	    if (Array.isArray(tree)) {
	      for (var i = 0; i < tree.length; i++) {
	        if (tree[i] && typeof tree[i] !== 'string') {
	          markStaticNode(tree[i], (key + "_" + i), isOnce);
	        }
	      }
	    } else {
	      markStaticNode(tree, key, isOnce);
	    }
	  }

	  function markStaticNode (node, key, isOnce) {
	    node.isStatic = true;
	    node.key = key;
	    node.isOnce = isOnce;
	  }

	  // filter resolution helper
	  Vue.prototype._f = function resolveFilter (id) {
	    return resolveAsset(this.$options, 'filters', id, true) || identity
	  };

	  // render v-for
	  Vue.prototype._l = function renderList (
	    val,
	    render
	  ) {
	    var ret, i, l, keys, key;
	    if (Array.isArray(val) || typeof val === 'string') {
	      ret = new Array(val.length);
	      for (i = 0, l = val.length; i < l; i++) {
	        ret[i] = render(val[i], i);
	      }
	    } else if (typeof val === 'number') {
	      ret = new Array(val);
	      for (i = 0; i < val; i++) {
	        ret[i] = render(i + 1, i);
	      }
	    } else if (isObject(val)) {
	      keys = Object.keys(val);
	      ret = new Array(keys.length);
	      for (i = 0, l = keys.length; i < l; i++) {
	        key = keys[i];
	        ret[i] = render(val[key], key, i);
	      }
	    }
	    return ret
	  };

	  // renderSlot
	  Vue.prototype._t = function (
	    name,
	    fallback,
	    props,
	    bindObject
	  ) {
	    var scopedSlotFn = this.$scopedSlots[name];
	    if (scopedSlotFn) { // scoped slot
	      props = props || {};
	      if (bindObject) {
	        extend(props, bindObject);
	      }
	      return scopedSlotFn(props) || fallback
	    } else {
	      var slotNodes = this.$slots[name];
	      // warn duplicate slot usage
	      if (slotNodes && process.env.NODE_ENV !== 'production') {
	        slotNodes._rendered && warn(
	          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
	          "- this will likely cause render errors.",
	          this
	        );
	        slotNodes._rendered = true;
	      }
	      return slotNodes || fallback
	    }
	  };

	  // apply v-bind object
	  Vue.prototype._b = function bindProps (
	    data,
	    tag,
	    value,
	    asProp
	  ) {
	    if (value) {
	      if (!isObject(value)) {
	        process.env.NODE_ENV !== 'production' && warn(
	          'v-bind without argument expects an Object or Array value',
	          this
	        );
	      } else {
	        if (Array.isArray(value)) {
	          value = toObject(value);
	        }
	        for (var key in value) {
	          if (key === 'class' || key === 'style') {
	            data[key] = value[key];
	          } else {
	            var type = data.attrs && data.attrs.type;
	            var hash = asProp || config.mustUseProp(tag, type, key)
	              ? data.domProps || (data.domProps = {})
	              : data.attrs || (data.attrs = {});
	            hash[key] = value[key];
	          }
	        }
	      }
	    }
	    return data
	  };

	  // check v-on keyCodes
	  Vue.prototype._k = function checkKeyCodes (
	    eventKeyCode,
	    key,
	    builtInAlias
	  ) {
	    var keyCodes = config.keyCodes[key] || builtInAlias;
	    if (Array.isArray(keyCodes)) {
	      return keyCodes.indexOf(eventKeyCode) === -1
	    } else {
	      return keyCodes !== eventKeyCode
	    }
	  };
	}

	function resolveSlots (
	  children,
	  context
	) {
	  var slots = {};
	  if (!children) {
	    return slots
	  }
	  var defaultSlot = [];
	  var name, child;
	  for (var i = 0, l = children.length; i < l; i++) {
	    child = children[i];
	    // named slots should only be respected if the vnode was rendered in the
	    // same context.
	    if ((child.context === context || child.functionalContext === context) &&
	        child.data && (name = child.data.slot)) {
	      var slot = (slots[name] || (slots[name] = []));
	      if (child.tag === 'template') {
	        slot.push.apply(slot, child.children);
	      } else {
	        slot.push(child);
	      }
	    } else {
	      defaultSlot.push(child);
	    }
	  }
	  // ignore single whitespace
	  if (defaultSlot.length && !(
	    defaultSlot.length === 1 &&
	    (defaultSlot[0].text === ' ' || defaultSlot[0].isComment)
	  )) {
	    slots.default = defaultSlot;
	  }
	  return slots
	}

	/*  */

	function initEvents (vm) {
	  vm._events = Object.create(null);
	  vm._hasHookEvent = false;
	  // init parent attached events
	  var listeners = vm.$options._parentListeners;
	  if (listeners) {
	    updateComponentListeners(vm, listeners);
	  }
	}

	var target;

	function add$1 (event, fn, once) {
	  if (once) {
	    target.$once(event, fn);
	  } else {
	    target.$on(event, fn);
	  }
	}

	function remove$2 (event, fn) {
	  target.$off(event, fn);
	}

	function updateComponentListeners (
	  vm,
	  listeners,
	  oldListeners
	) {
	  target = vm;
	  updateListeners(listeners, oldListeners || {}, add$1, remove$2, vm);
	}

	function eventsMixin (Vue) {
	  var hookRE = /^hook:/;
	  Vue.prototype.$on = function (event, fn) {
	    var vm = this;(vm._events[event] || (vm._events[event] = [])).push(fn);
	    // optimize hook:event cost by using a boolean flag marked at registration
	    // instead of a hash lookup
	    if (hookRE.test(event)) {
	      vm._hasHookEvent = true;
	    }
	    return vm
	  };

	  Vue.prototype.$once = function (event, fn) {
	    var vm = this;
	    function on () {
	      vm.$off(event, on);
	      fn.apply(vm, arguments);
	    }
	    on.fn = fn;
	    vm.$on(event, on);
	    return vm
	  };

	  Vue.prototype.$off = function (event, fn) {
	    var vm = this;
	    // all
	    if (!arguments.length) {
	      vm._events = Object.create(null);
	      return vm
	    }
	    // specific event
	    var cbs = vm._events[event];
	    if (!cbs) {
	      return vm
	    }
	    if (arguments.length === 1) {
	      vm._events[event] = null;
	      return vm
	    }
	    // specific handler
	    var cb;
	    var i = cbs.length;
	    while (i--) {
	      cb = cbs[i];
	      if (cb === fn || cb.fn === fn) {
	        cbs.splice(i, 1);
	        break
	      }
	    }
	    return vm
	  };

	  Vue.prototype.$emit = function (event) {
	    var vm = this;
	    var cbs = vm._events[event];
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      var args = toArray(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        cbs[i].apply(vm, args);
	      }
	    }
	    return vm
	  };
	}

	/*  */

	var activeInstance = null;

	function initLifecycle (vm) {
	  var options = vm.$options;

	  // locate first non-abstract parent
	  var parent = options.parent;
	  if (parent && !options.abstract) {
	    while (parent.$options.abstract && parent.$parent) {
	      parent = parent.$parent;
	    }
	    parent.$children.push(vm);
	  }

	  vm.$parent = parent;
	  vm.$root = parent ? parent.$root : vm;

	  vm.$children = [];
	  vm.$refs = {};

	  vm._watcher = null;
	  vm._inactive = false;
	  vm._isMounted = false;
	  vm._isDestroyed = false;
	  vm._isBeingDestroyed = false;
	}

	function lifecycleMixin (Vue) {
	  Vue.prototype._mount = function (
	    el,
	    hydrating
	  ) {
	    var vm = this;
	    vm.$el = el;
	    if (!vm.$options.render) {
	      vm.$options.render = createEmptyVNode;
	      if (process.env.NODE_ENV !== 'production') {
	        /* istanbul ignore if */
	        if (vm.$options.template && vm.$options.template.charAt(0) !== '#') {
	          warn(
	            'You are using the runtime-only build of Vue where the template ' +
	            'option is not available. Either pre-compile the templates into ' +
	            'render functions, or use the compiler-included build.',
	            vm
	          );
	        } else {
	          warn(
	            'Failed to mount component: template or render function not defined.',
	            vm
	          );
	        }
	      }
	    }
	    callHook(vm, 'beforeMount');
	    vm._watcher = new Watcher(vm, function updateComponent () {
	      vm._update(vm._render(), hydrating);
	    }, noop);
	    hydrating = false;
	    // manually mounted instance, call mounted on self
	    // mounted is called for render-created child components in its inserted hook
	    if (vm.$vnode == null) {
	      vm._isMounted = true;
	      callHook(vm, 'mounted');
	    }
	    return vm
	  };

	  Vue.prototype._update = function (vnode, hydrating) {
	    var vm = this;
	    if (vm._isMounted) {
	      callHook(vm, 'beforeUpdate');
	    }
	    var prevEl = vm.$el;
	    var prevVnode = vm._vnode;
	    var prevActiveInstance = activeInstance;
	    activeInstance = vm;
	    vm._vnode = vnode;
	    // Vue.prototype.__patch__ is injected in entry points
	    // based on the rendering backend used.
	    if (!prevVnode) {
	      // initial render
	      vm.$el = vm.__patch__(
	        vm.$el, vnode, hydrating, false /* removeOnly */,
	        vm.$options._parentElm,
	        vm.$options._refElm
	      );
	    } else {
	      // updates
	      vm.$el = vm.__patch__(prevVnode, vnode);
	    }
	    activeInstance = prevActiveInstance;
	    // update __vue__ reference
	    if (prevEl) {
	      prevEl.__vue__ = null;
	    }
	    if (vm.$el) {
	      vm.$el.__vue__ = vm;
	    }
	    // if parent is an HOC, update its $el as well
	    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
	      vm.$parent.$el = vm.$el;
	    }
	    // updated hook is called by the scheduler to ensure that children are
	    // updated in a parent's updated hook.
	  };

	  Vue.prototype._updateFromParent = function (
	    propsData,
	    listeners,
	    parentVnode,
	    renderChildren
	  ) {
	    var vm = this;
	    var hasChildren = !!(vm.$options._renderChildren || renderChildren);
	    vm.$options._parentVnode = parentVnode;
	    vm.$vnode = parentVnode; // update vm's placeholder node without re-render
	    if (vm._vnode) { // update child tree's parent
	      vm._vnode.parent = parentVnode;
	    }
	    vm.$options._renderChildren = renderChildren;
	    // update props
	    if (propsData && vm.$options.props) {
	      observerState.shouldConvert = false;
	      if (process.env.NODE_ENV !== 'production') {
	        observerState.isSettingProps = true;
	      }
	      var propKeys = vm.$options._propKeys || [];
	      for (var i = 0; i < propKeys.length; i++) {
	        var key = propKeys[i];
	        vm[key] = validateProp(key, vm.$options.props, propsData, vm);
	      }
	      observerState.shouldConvert = true;
	      if (process.env.NODE_ENV !== 'production') {
	        observerState.isSettingProps = false;
	      }
	      vm.$options.propsData = propsData;
	    }
	    // update listeners
	    if (listeners) {
	      var oldListeners = vm.$options._parentListeners;
	      vm.$options._parentListeners = listeners;
	      updateComponentListeners(vm, listeners, oldListeners);
	    }
	    // resolve slots + force update if has children
	    if (hasChildren) {
	      vm.$slots = resolveSlots(renderChildren, parentVnode.context);
	      vm.$forceUpdate();
	    }
	  };

	  Vue.prototype.$forceUpdate = function () {
	    var vm = this;
	    if (vm._watcher) {
	      vm._watcher.update();
	    }
	  };

	  Vue.prototype.$destroy = function () {
	    var vm = this;
	    if (vm._isBeingDestroyed) {
	      return
	    }
	    callHook(vm, 'beforeDestroy');
	    vm._isBeingDestroyed = true;
	    // remove self from parent
	    var parent = vm.$parent;
	    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
	      remove$1(parent.$children, vm);
	    }
	    // teardown watchers
	    if (vm._watcher) {
	      vm._watcher.teardown();
	    }
	    var i = vm._watchers.length;
	    while (i--) {
	      vm._watchers[i].teardown();
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (vm._data.__ob__) {
	      vm._data.__ob__.vmCount--;
	    }
	    // call the last hook...
	    vm._isDestroyed = true;
	    callHook(vm, 'destroyed');
	    // turn off all instance listeners.
	    vm.$off();
	    // remove __vue__ reference
	    if (vm.$el) {
	      vm.$el.__vue__ = null;
	    }
	    // invoke destroy hooks on current rendered tree
	    vm.__patch__(vm._vnode, null);
	  };
	}

	function callHook (vm, hook) {
	  var handlers = vm.$options[hook];
	  if (handlers) {
	    for (var i = 0, j = handlers.length; i < j; i++) {
	      handlers[i].call(vm);
	    }
	  }
	  if (vm._hasHookEvent) {
	    vm.$emit('hook:' + hook);
	  }
	}

	/*  */


	var queue = [];
	var has$1 = {};
	var circular = {};
	var waiting = false;
	var flushing = false;
	var index = 0;

	/**
	 * Reset the scheduler's state.
	 */
	function resetSchedulerState () {
	  queue.length = 0;
	  has$1 = {};
	  if (process.env.NODE_ENV !== 'production') {
	    circular = {};
	  }
	  waiting = flushing = false;
	}

	/**
	 * Flush both queues and run the watchers.
	 */
	function flushSchedulerQueue () {
	  flushing = true;
	  var watcher, id, vm;

	  // Sort queue before flush.
	  // This ensures that:
	  // 1. Components are updated from parent to child. (because parent is always
	  //    created before the child)
	  // 2. A component's user watchers are run before its render watcher (because
	  //    user watchers are created before the render watcher)
	  // 3. If a component is destroyed during a parent component's watcher run,
	  //    its watchers can be skipped.
	  queue.sort(function (a, b) { return a.id - b.id; });

	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (index = 0; index < queue.length; index++) {
	    watcher = queue[index];
	    id = watcher.id;
	    has$1[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if (process.env.NODE_ENV !== 'production' && has$1[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > config._maxUpdateCount) {
	        warn(
	          'You may have an infinite update loop ' + (
	            watcher.user
	              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
	              : "in a component render function."
	          ),
	          watcher.vm
	        );
	        break
	      }
	    }
	  }

	  // call updated hooks
	  index = queue.length;
	  while (index--) {
	    watcher = queue[index];
	    vm = watcher.vm;
	    if (vm._watcher === watcher && vm._isMounted) {
	      callHook(vm, 'updated');
	    }
	  }

	  // devtool hook
	  /* istanbul ignore if */
	  if (devtools && config.devtools) {
	    devtools.emit('flush');
	  }

	  resetSchedulerState();
	}

	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 */
	function queueWatcher (watcher) {
	  var id = watcher.id;
	  if (has$1[id] == null) {
	    has$1[id] = true;
	    if (!flushing) {
	      queue.push(watcher);
	    } else {
	      // if already flushing, splice the watcher based on its id
	      // if already past its id, it will be run next immediately.
	      var i = queue.length - 1;
	      while (i >= 0 && queue[i].id > watcher.id) {
	        i--;
	      }
	      queue.splice(Math.max(i, index) + 1, 0, watcher);
	    }
	    // queue the flush
	    if (!waiting) {
	      waiting = true;
	      nextTick(flushSchedulerQueue);
	    }
	  }
	}

	/*  */

	var uid$2 = 0;

	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 */
	var Watcher = function Watcher (
	  vm,
	  expOrFn,
	  cb,
	  options
	) {
	  this.vm = vm;
	  vm._watchers.push(this);
	  // options
	  if (options) {
	    this.deep = !!options.deep;
	    this.user = !!options.user;
	    this.lazy = !!options.lazy;
	    this.sync = !!options.sync;
	  } else {
	    this.deep = this.user = this.lazy = this.sync = false;
	  }
	  this.cb = cb;
	  this.id = ++uid$2; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = [];
	  this.newDeps = [];
	  this.depIds = new _Set();
	  this.newDepIds = new _Set();
	  this.expression = process.env.NODE_ENV !== 'production'
	    ? expOrFn.toString()
	    : '';
	  // parse expression for getter
	  if (typeof expOrFn === 'function') {
	    this.getter = expOrFn;
	  } else {
	    this.getter = parsePath(expOrFn);
	    if (!this.getter) {
	      this.getter = function () {};
	      process.env.NODE_ENV !== 'production' && warn(
	        "Failed watching path: \"" + expOrFn + "\" " +
	        'Watcher only accepts simple dot-delimited paths. ' +
	        'For full control, use a function instead.',
	        vm
	      );
	    }
	  }
	  this.value = this.lazy
	    ? undefined
	    : this.get();
	};

	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */
	Watcher.prototype.get = function get () {
	  pushTarget(this);
	  var value = this.getter.call(this.vm, this.vm);
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  popTarget();
	  this.cleanupDeps();
	  return value
	};

	/**
	 * Add a dependency to this directive.
	 */
	Watcher.prototype.addDep = function addDep (dep) {
	  var id = dep.id;
	  if (!this.newDepIds.has(id)) {
	    this.newDepIds.add(id);
	    this.newDeps.push(dep);
	    if (!this.depIds.has(id)) {
	      dep.addSub(this);
	    }
	  }
	};

	/**
	 * Clean up for dependency collection.
	 */
	Watcher.prototype.cleanupDeps = function cleanupDeps () {
	    var this$1 = this;

	  var i = this.deps.length;
	  while (i--) {
	    var dep = this$1.deps[i];
	    if (!this$1.newDepIds.has(dep.id)) {
	      dep.removeSub(this$1);
	    }
	  }
	  var tmp = this.depIds;
	  this.depIds = this.newDepIds;
	  this.newDepIds = tmp;
	  this.newDepIds.clear();
	  tmp = this.deps;
	  this.deps = this.newDeps;
	  this.newDeps = tmp;
	  this.newDeps.length = 0;
	};

	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 */
	Watcher.prototype.update = function update () {
	  /* istanbul ignore else */
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync) {
	    this.run();
	  } else {
	    queueWatcher(this);
	  }
	};

	/**
	 * Scheduler job interface.
	 * Will be called by the scheduler.
	 */
	Watcher.prototype.run = function run () {
	  if (this.active) {
	    var value = this.get();
	    if (
	      value !== this.value ||
	      // Deep watchers and watchers on Object/Arrays should fire even
	      // when the value is the same, because the value may
	      // have mutated.
	      isObject(value) ||
	      this.deep
	    ) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      if (this.user) {
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          /* istanbul ignore else */
	          if (config.errorHandler) {
	            config.errorHandler.call(null, e, this.vm);
	          } else {
	            process.env.NODE_ENV !== 'production' && warn(
	              ("Error in watcher \"" + (this.expression) + "\""),
	              this.vm
	            );
	            throw e
	          }
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	  }
	};

	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */
	Watcher.prototype.evaluate = function evaluate () {
	  this.value = this.get();
	  this.dirty = false;
	};

	/**
	 * Depend on all deps collected by this watcher.
	 */
	Watcher.prototype.depend = function depend () {
	    var this$1 = this;

	  var i = this.deps.length;
	  while (i--) {
	    this$1.deps[i].depend();
	  }
	};

	/**
	 * Remove self from all dependencies' subscriber list.
	 */
	Watcher.prototype.teardown = function teardown () {
	    var this$1 = this;

	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed.
	    if (!this.vm._isBeingDestroyed) {
	      remove$1(this.vm._watchers, this);
	    }
	    var i = this.deps.length;
	    while (i--) {
	      this$1.deps[i].removeSub(this$1);
	    }
	    this.active = false;
	  }
	};

	/**
	 * Recursively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 */
	var seenObjects = new _Set();
	function traverse (val) {
	  seenObjects.clear();
	  _traverse(val, seenObjects);
	}

	function _traverse (val, seen) {
	  var i, keys;
	  var isA = Array.isArray(val);
	  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
	    return
	  }
	  if (val.__ob__) {
	    var depId = val.__ob__.dep.id;
	    if (seen.has(depId)) {
	      return
	    }
	    seen.add(depId);
	  }
	  if (isA) {
	    i = val.length;
	    while (i--) { _traverse(val[i], seen); }
	  } else {
	    keys = Object.keys(val);
	    i = keys.length;
	    while (i--) { _traverse(val[keys[i]], seen); }
	  }
	}

	/*  */

	function initState (vm) {
	  vm._watchers = [];
	  var opts = vm.$options;
	  if (opts.props) { initProps(vm, opts.props); }
	  if (opts.methods) { initMethods(vm, opts.methods); }
	  if (opts.data) {
	    initData(vm);
	  } else {
	    observe(vm._data = {}, true /* asRootData */);
	  }
	  if (opts.computed) { initComputed(vm, opts.computed); }
	  if (opts.watch) { initWatch(vm, opts.watch); }
	}

	var isReservedProp = { key: 1, ref: 1, slot: 1 };

	function initProps (vm, props) {
	  var propsData = vm.$options.propsData || {};
	  var keys = vm.$options._propKeys = Object.keys(props);
	  var isRoot = !vm.$parent;
	  // root instance props should be converted
	  observerState.shouldConvert = isRoot;
	  var loop = function ( i ) {
	    var key = keys[i];
	    /* istanbul ignore else */
	    if (process.env.NODE_ENV !== 'production') {
	      if (isReservedProp[key]) {
	        warn(
	          ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
	          vm
	        );
	      }
	      defineReactive$$1(vm, key, validateProp(key, props, propsData, vm), function () {
	        if (vm.$parent && !observerState.isSettingProps) {
	          warn(
	            "Avoid mutating a prop directly since the value will be " +
	            "overwritten whenever the parent component re-renders. " +
	            "Instead, use a data or computed property based on the prop's " +
	            "value. Prop being mutated: \"" + key + "\"",
	            vm
	          );
	        }
	      });
	    } else {
	      defineReactive$$1(vm, key, validateProp(key, props, propsData, vm));
	    }
	  };

	  for (var i = 0; i < keys.length; i++) loop( i );
	  observerState.shouldConvert = true;
	}

	function initData (vm) {
	  var data = vm.$options.data;
	  data = vm._data = typeof data === 'function'
	    ? data.call(vm)
	    : data || {};
	  if (!isPlainObject(data)) {
	    data = {};
	    process.env.NODE_ENV !== 'production' && warn(
	      'data functions should return an object:\n' +
	      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
	      vm
	    );
	  }
	  // proxy data on instance
	  var keys = Object.keys(data);
	  var props = vm.$options.props;
	  var i = keys.length;
	  while (i--) {
	    if (props && hasOwn(props, keys[i])) {
	      process.env.NODE_ENV !== 'production' && warn(
	        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
	        "Use prop default value instead.",
	        vm
	      );
	    } else {
	      proxy(vm, keys[i]);
	    }
	  }
	  // observe data
	  observe(data, true /* asRootData */);
	}

	var computedSharedDefinition = {
	  enumerable: true,
	  configurable: true,
	  get: noop,
	  set: noop
	};

	function initComputed (vm, computed) {
	  for (var key in computed) {
	    /* istanbul ignore if */
	    if (process.env.NODE_ENV !== 'production' && key in vm) {
	      warn(
	        "existing instance property \"" + key + "\" will be " +
	        "overwritten by a computed property with the same name.",
	        vm
	      );
	    }
	    var userDef = computed[key];
	    if (typeof userDef === 'function') {
	      computedSharedDefinition.get = makeComputedGetter(userDef, vm);
	      computedSharedDefinition.set = noop;
	    } else {
	      computedSharedDefinition.get = userDef.get
	        ? userDef.cache !== false
	          ? makeComputedGetter(userDef.get, vm)
	          : bind$1(userDef.get, vm)
	        : noop;
	      computedSharedDefinition.set = userDef.set
	        ? bind$1(userDef.set, vm)
	        : noop;
	    }
	    Object.defineProperty(vm, key, computedSharedDefinition);
	  }
	}

	function makeComputedGetter (getter, owner) {
	  var watcher = new Watcher(owner, getter, noop, {
	    lazy: true
	  });
	  return function computedGetter () {
	    if (watcher.dirty) {
	      watcher.evaluate();
	    }
	    if (Dep.target) {
	      watcher.depend();
	    }
	    return watcher.value
	  }
	}

	function initMethods (vm, methods) {
	  for (var key in methods) {
	    vm[key] = methods[key] == null ? noop : bind$1(methods[key], vm);
	    if (process.env.NODE_ENV !== 'production' && methods[key] == null) {
	      warn(
	        "method \"" + key + "\" has an undefined value in the component definition. " +
	        "Did you reference the function correctly?",
	        vm
	      );
	    }
	  }
	}

	function initWatch (vm, watch) {
	  for (var key in watch) {
	    var handler = watch[key];
	    if (Array.isArray(handler)) {
	      for (var i = 0; i < handler.length; i++) {
	        createWatcher(vm, key, handler[i]);
	      }
	    } else {
	      createWatcher(vm, key, handler);
	    }
	  }
	}

	function createWatcher (vm, key, handler) {
	  var options;
	  if (isPlainObject(handler)) {
	    options = handler;
	    handler = handler.handler;
	  }
	  if (typeof handler === 'string') {
	    handler = vm[handler];
	  }
	  vm.$watch(key, handler, options);
	}

	function stateMixin (Vue) {
	  // flow somehow has problems with directly declared definition object
	  // when using Object.defineProperty, so we have to procedurally build up
	  // the object here.
	  var dataDef = {};
	  dataDef.get = function () {
	    return this._data
	  };
	  if (process.env.NODE_ENV !== 'production') {
	    dataDef.set = function (newData) {
	      warn(
	        'Avoid replacing instance root $data. ' +
	        'Use nested data properties instead.',
	        this
	      );
	    };
	  }
	  Object.defineProperty(Vue.prototype, '$data', dataDef);

	  Vue.prototype.$set = set$1;
	  Vue.prototype.$delete = del;

	  Vue.prototype.$watch = function (
	    expOrFn,
	    cb,
	    options
	  ) {
	    var vm = this;
	    options = options || {};
	    options.user = true;
	    var watcher = new Watcher(vm, expOrFn, cb, options);
	    if (options.immediate) {
	      cb.call(vm, watcher.value);
	    }
	    return function unwatchFn () {
	      watcher.teardown();
	    }
	  };
	}

	function proxy (vm, key) {
	  if (!isReserved(key)) {
	    Object.defineProperty(vm, key, {
	      configurable: true,
	      enumerable: true,
	      get: function proxyGetter () {
	        return vm._data[key]
	      },
	      set: function proxySetter (val) {
	        vm._data[key] = val;
	      }
	    });
	  }
	}

	/*  */

	var uid = 0;

	function initMixin (Vue) {
	  Vue.prototype._init = function (options) {
	    var vm = this;
	    // a uid
	    vm._uid = uid++;
	    // a flag to avoid this being observed
	    vm._isVue = true;
	    // merge options
	    if (options && options._isComponent) {
	      // optimize internal component instantiation
	      // since dynamic options merging is pretty slow, and none of the
	      // internal component options needs special treatment.
	      initInternalComponent(vm, options);
	    } else {
	      vm.$options = mergeOptions(
	        resolveConstructorOptions(vm.constructor),
	        options || {},
	        vm
	      );
	    }
	    /* istanbul ignore else */
	    if (process.env.NODE_ENV !== 'production') {
	      initProxy(vm);
	    } else {
	      vm._renderProxy = vm;
	    }
	    // expose real self
	    vm._self = vm;
	    initLifecycle(vm);
	    initEvents(vm);
	    initRender(vm);
	    callHook(vm, 'beforeCreate');
	    initState(vm);
	    callHook(vm, 'created');
	    if (vm.$options.el) {
	      vm.$mount(vm.$options.el);
	    }
	  };
	}

	function initInternalComponent (vm, options) {
	  var opts = vm.$options = Object.create(vm.constructor.options);
	  // doing this because it's faster than dynamic enumeration.
	  opts.parent = options.parent;
	  opts.propsData = options.propsData;
	  opts._parentVnode = options._parentVnode;
	  opts._parentListeners = options._parentListeners;
	  opts._renderChildren = options._renderChildren;
	  opts._componentTag = options._componentTag;
	  opts._parentElm = options._parentElm;
	  opts._refElm = options._refElm;
	  if (options.render) {
	    opts.render = options.render;
	    opts.staticRenderFns = options.staticRenderFns;
	  }
	}

	function resolveConstructorOptions (Ctor) {
	  var options = Ctor.options;
	  if (Ctor.super) {
	    var superOptions = Ctor.super.options;
	    var cachedSuperOptions = Ctor.superOptions;
	    var extendOptions = Ctor.extendOptions;
	    if (superOptions !== cachedSuperOptions) {
	      // super option changed
	      Ctor.superOptions = superOptions;
	      extendOptions.render = options.render;
	      extendOptions.staticRenderFns = options.staticRenderFns;
	      extendOptions._scopeId = options._scopeId;
	      options = Ctor.options = mergeOptions(superOptions, extendOptions);
	      if (options.name) {
	        options.components[options.name] = Ctor;
	      }
	    }
	  }
	  return options
	}

	function Vue$3 (options) {
	  if (process.env.NODE_ENV !== 'production' &&
	    !(this instanceof Vue$3)) {
	    warn('Vue is a constructor and should be called with the `new` keyword');
	  }
	  this._init(options);
	}

	initMixin(Vue$3);
	stateMixin(Vue$3);
	eventsMixin(Vue$3);
	lifecycleMixin(Vue$3);
	renderMixin(Vue$3);

	/*  */

	function initUse (Vue) {
	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return
	    }
	    // additional parameters
	    var args = toArray(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else {
	      plugin.apply(null, args);
	    }
	    plugin.installed = true;
	    return this
	  };
	}

	/*  */

	function initMixin$1 (Vue) {
	  Vue.mixin = function (mixin) {
	    this.options = mergeOptions(this.options, mixin);
	  };
	}

	/*  */

	function initExtend (Vue) {
	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */
	  Vue.cid = 0;
	  var cid = 1;

	  /**
	   * Class inheritance
	   */
	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var SuperId = Super.cid;
	    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
	    if (cachedCtors[SuperId]) {
	      return cachedCtors[SuperId]
	    }
	    var name = extendOptions.name || Super.options.name;
	    if (process.env.NODE_ENV !== 'production') {
	      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	        warn(
	          'Invalid component name: "' + name + '". Component names ' +
	          'can only contain alphanumeric characters and the hyphen, ' +
	          'and must start with a letter.'
	        );
	      }
	    }
	    var Sub = function VueComponent (options) {
	      this._init(options);
	    };
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(
	      Super.options,
	      extendOptions
	    );
	    Sub['super'] = Super;
	    // allow further extension/mixin/plugin usage
	    Sub.extend = Super.extend;
	    Sub.mixin = Super.mixin;
	    Sub.use = Super.use;
	    // create asset registers, so extended classes
	    // can have their private assets too.
	    config._assetTypes.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }
	    // keep a reference to the super options at extension time.
	    // later at instantiation we can check if Super's options have
	    // been updated.
	    Sub.superOptions = Super.options;
	    Sub.extendOptions = extendOptions;
	    // cache constructor
	    cachedCtors[SuperId] = Sub;
	    return Sub
	  };
	}

	/*  */

	function initAssetRegisters (Vue) {
	  /**
	   * Create asset registration methods.
	   */
	  config._assetTypes.forEach(function (type) {
	    Vue[type] = function (
	      id,
	      definition
	    ) {
	      if (!definition) {
	        return this.options[type + 's'][id]
	      } else {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          if (type === 'component' && config.isReservedTag(id)) {
	            warn(
	              'Do not use built-in or reserved HTML elements as component ' +
	              'id: ' + id
	            );
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          definition.name = definition.name || id;
	          definition = this.options._base.extend(definition);
	        }
	        if (type === 'directive' && typeof definition === 'function') {
	          definition = { bind: definition, update: definition };
	        }
	        this.options[type + 's'][id] = definition;
	        return definition
	      }
	    };
	  });
	}

	/*  */

	var patternTypes = [String, RegExp];

	function getComponentName (opts) {
	  return opts && (opts.Ctor.options.name || opts.tag)
	}

	function matches (pattern, name) {
	  if (typeof pattern === 'string') {
	    return pattern.split(',').indexOf(name) > -1
	  } else {
	    return pattern.test(name)
	  }
	}

	function pruneCache (cache, filter) {
	  for (var key in cache) {
	    var cachedNode = cache[key];
	    if (cachedNode) {
	      var name = getComponentName(cachedNode.componentOptions);
	      if (name && !filter(name)) {
	        pruneCacheEntry(cachedNode);
	        cache[key] = null;
	      }
	    }
	  }
	}

	function pruneCacheEntry (vnode) {
	  if (vnode) {
	    if (!vnode.componentInstance._inactive) {
	      callHook(vnode.componentInstance, 'deactivated');
	    }
	    vnode.componentInstance.$destroy();
	  }
	}

	var KeepAlive = {
	  name: 'keep-alive',
	  abstract: true,

	  props: {
	    include: patternTypes,
	    exclude: patternTypes
	  },

	  created: function created () {
	    this.cache = Object.create(null);
	  },

	  destroyed: function destroyed () {
	    var this$1 = this;

	    for (var key in this.cache) {
	      pruneCacheEntry(this$1.cache[key]);
	    }
	  },

	  watch: {
	    include: function include (val) {
	      pruneCache(this.cache, function (name) { return matches(val, name); });
	    },
	    exclude: function exclude (val) {
	      pruneCache(this.cache, function (name) { return !matches(val, name); });
	    }
	  },

	  render: function render () {
	    var vnode = getFirstComponentChild(this.$slots.default);
	    var componentOptions = vnode && vnode.componentOptions;
	    if (componentOptions) {
	      // check pattern
	      var name = getComponentName(componentOptions);
	      if (name && (
	        (this.include && !matches(this.include, name)) ||
	        (this.exclude && matches(this.exclude, name))
	      )) {
	        return vnode
	      }
	      var key = vnode.key == null
	        // same constructor may get registered as different local components
	        // so cid alone is not enough (#3269)
	        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
	        : vnode.key;
	      if (this.cache[key]) {
	        vnode.componentInstance = this.cache[key].componentInstance;
	      } else {
	        this.cache[key] = vnode;
	      }
	      vnode.data.keepAlive = true;
	    }
	    return vnode
	  }
	};

	var builtInComponents = {
	  KeepAlive: KeepAlive
	};

	/*  */

	function initGlobalAPI (Vue) {
	  // config
	  var configDef = {};
	  configDef.get = function () { return config; };
	  if (process.env.NODE_ENV !== 'production') {
	    configDef.set = function () {
	      warn(
	        'Do not replace the Vue.config object, set individual fields instead.'
	      );
	    };
	  }
	  Object.defineProperty(Vue, 'config', configDef);
	  Vue.util = util;
	  Vue.set = set$1;
	  Vue.delete = del;
	  Vue.nextTick = nextTick;

	  Vue.options = Object.create(null);
	  config._assetTypes.forEach(function (type) {
	    Vue.options[type + 's'] = Object.create(null);
	  });

	  // this is used to identify the "base" constructor to extend all plain-object
	  // components with in Weex's multi-instance scenarios.
	  Vue.options._base = Vue;

	  extend(Vue.options.components, builtInComponents);

	  initUse(Vue);
	  initMixin$1(Vue);
	  initExtend(Vue);
	  initAssetRegisters(Vue);
	}

	initGlobalAPI(Vue$3);

	Object.defineProperty(Vue$3.prototype, '$isServer', {
	  get: isServerRendering
	});

	Vue$3.version = '2.1.10';

	/*  */

	// attributes that should be using props for binding
	var acceptValue = makeMap('input,textarea,option,select');
	var mustUseProp = function (tag, type, attr) {
	  return (
	    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
	    (attr === 'selected' && tag === 'option') ||
	    (attr === 'checked' && tag === 'input') ||
	    (attr === 'muted' && tag === 'video')
	  )
	};

	var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

	var isBooleanAttr = makeMap(
	  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
	  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
	  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
	  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
	  'required,reversed,scoped,seamless,selected,sortable,translate,' +
	  'truespeed,typemustmatch,visible'
	);

	var xlinkNS = 'http://www.w3.org/1999/xlink';

	var isXlink = function (name) {
	  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
	};

	var getXlinkProp = function (name) {
	  return isXlink(name) ? name.slice(6, name.length) : ''
	};

	var isFalsyAttrValue = function (val) {
	  return val == null || val === false
	};

	/*  */

	function genClassForVnode (vnode) {
	  var data = vnode.data;
	  var parentNode = vnode;
	  var childNode = vnode;
	  while (childNode.componentInstance) {
	    childNode = childNode.componentInstance._vnode;
	    if (childNode.data) {
	      data = mergeClassData(childNode.data, data);
	    }
	  }
	  while ((parentNode = parentNode.parent)) {
	    if (parentNode.data) {
	      data = mergeClassData(data, parentNode.data);
	    }
	  }
	  return genClassFromData(data)
	}

	function mergeClassData (child, parent) {
	  return {
	    staticClass: concat(child.staticClass, parent.staticClass),
	    class: child.class
	      ? [child.class, parent.class]
	      : parent.class
	  }
	}

	function genClassFromData (data) {
	  var dynamicClass = data.class;
	  var staticClass = data.staticClass;
	  if (staticClass || dynamicClass) {
	    return concat(staticClass, stringifyClass(dynamicClass))
	  }
	  /* istanbul ignore next */
	  return ''
	}

	function concat (a, b) {
	  return a ? b ? (a + ' ' + b) : a : (b || '')
	}

	function stringifyClass (value) {
	  var res = '';
	  if (!value) {
	    return res
	  }
	  if (typeof value === 'string') {
	    return value
	  }
	  if (Array.isArray(value)) {
	    var stringified;
	    for (var i = 0, l = value.length; i < l; i++) {
	      if (value[i]) {
	        if ((stringified = stringifyClass(value[i]))) {
	          res += stringified + ' ';
	        }
	      }
	    }
	    return res.slice(0, -1)
	  }
	  if (isObject(value)) {
	    for (var key in value) {
	      if (value[key]) { res += key + ' '; }
	    }
	    return res.slice(0, -1)
	  }
	  /* istanbul ignore next */
	  return res
	}

	/*  */

	var namespaceMap = {
	  svg: 'http://www.w3.org/2000/svg',
	  math: 'http://www.w3.org/1998/Math/MathML'
	};

	var isHTMLTag = makeMap(
	  'html,body,base,head,link,meta,style,title,' +
	  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
	  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
	  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
	  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
	  'embed,object,param,source,canvas,script,noscript,del,ins,' +
	  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
	  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
	  'output,progress,select,textarea,' +
	  'details,dialog,menu,menuitem,summary,' +
	  'content,element,shadow,template'
	);

	// this map is intentionally selective, only covering SVG elements that may
	// contain child elements.
	var isSVG = makeMap(
	  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,' +
	  'font-face,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
	  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
	  true
	);

	var isPreTag = function (tag) { return tag === 'pre'; };

	var isReservedTag = function (tag) {
	  return isHTMLTag(tag) || isSVG(tag)
	};

	function getTagNamespace (tag) {
	  if (isSVG(tag)) {
	    return 'svg'
	  }
	  // basic support for MathML
	  // note it doesn't support other MathML elements being component roots
	  if (tag === 'math') {
	    return 'math'
	  }
	}

	var unknownElementCache = Object.create(null);
	function isUnknownElement (tag) {
	  /* istanbul ignore if */
	  if (!inBrowser) {
	    return true
	  }
	  if (isReservedTag(tag)) {
	    return false
	  }
	  tag = tag.toLowerCase();
	  /* istanbul ignore if */
	  if (unknownElementCache[tag] != null) {
	    return unknownElementCache[tag]
	  }
	  var el = document.createElement(tag);
	  if (tag.indexOf('-') > -1) {
	    // http://stackoverflow.com/a/28210364/1070244
	    return (unknownElementCache[tag] = (
	      el.constructor === window.HTMLUnknownElement ||
	      el.constructor === window.HTMLElement
	    ))
	  } else {
	    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
	  }
	}

	/*  */

	/**
	 * Query an element selector if it's not an element already.
	 */
	function query (el) {
	  if (typeof el === 'string') {
	    var selector = el;
	    el = document.querySelector(el);
	    if (!el) {
	      process.env.NODE_ENV !== 'production' && warn(
	        'Cannot find element: ' + selector
	      );
	      return document.createElement('div')
	    }
	  }
	  return el
	}

	/*  */

	function createElement$1 (tagName, vnode) {
	  var elm = document.createElement(tagName);
	  if (tagName !== 'select') {
	    return elm
	  }
	  if (vnode.data && vnode.data.attrs && 'multiple' in vnode.data.attrs) {
	    elm.setAttribute('multiple', 'multiple');
	  }
	  return elm
	}

	function createElementNS (namespace, tagName) {
	  return document.createElementNS(namespaceMap[namespace], tagName)
	}

	function createTextNode (text) {
	  return document.createTextNode(text)
	}

	function createComment (text) {
	  return document.createComment(text)
	}

	function insertBefore (parentNode, newNode, referenceNode) {
	  parentNode.insertBefore(newNode, referenceNode);
	}

	function removeChild (node, child) {
	  node.removeChild(child);
	}

	function appendChild (node, child) {
	  node.appendChild(child);
	}

	function parentNode (node) {
	  return node.parentNode
	}

	function nextSibling (node) {
	  return node.nextSibling
	}

	function tagName (node) {
	  return node.tagName
	}

	function setTextContent (node, text) {
	  node.textContent = text;
	}

	function setAttribute (node, key, val) {
	  node.setAttribute(key, val);
	}


	var nodeOps = Object.freeze({
		createElement: createElement$1,
		createElementNS: createElementNS,
		createTextNode: createTextNode,
		createComment: createComment,
		insertBefore: insertBefore,
		removeChild: removeChild,
		appendChild: appendChild,
		parentNode: parentNode,
		nextSibling: nextSibling,
		tagName: tagName,
		setTextContent: setTextContent,
		setAttribute: setAttribute
	});

	/*  */

	var ref = {
	  create: function create (_, vnode) {
	    registerRef(vnode);
	  },
	  update: function update (oldVnode, vnode) {
	    if (oldVnode.data.ref !== vnode.data.ref) {
	      registerRef(oldVnode, true);
	      registerRef(vnode);
	    }
	  },
	  destroy: function destroy (vnode) {
	    registerRef(vnode, true);
	  }
	};

	function registerRef (vnode, isRemoval) {
	  var key = vnode.data.ref;
	  if (!key) { return }

	  var vm = vnode.context;
	  var ref = vnode.componentInstance || vnode.elm;
	  var refs = vm.$refs;
	  if (isRemoval) {
	    if (Array.isArray(refs[key])) {
	      remove$1(refs[key], ref);
	    } else if (refs[key] === ref) {
	      refs[key] = undefined;
	    }
	  } else {
	    if (vnode.data.refInFor) {
	      if (Array.isArray(refs[key]) && refs[key].indexOf(ref) < 0) {
	        refs[key].push(ref);
	      } else {
	        refs[key] = [ref];
	      }
	    } else {
	      refs[key] = ref;
	    }
	  }
	}

	/**
	 * Virtual DOM patching algorithm based on Snabbdom by
	 * Simon Friis Vindum (@paldepind)
	 * Licensed under the MIT License
	 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
	 *
	 * modified by Evan You (@yyx990803)
	 *

	/*
	 * Not type-checking this because this file is perf-critical and the cost
	 * of making flow understand it is not worth it.
	 */

	var emptyNode = new VNode('', {}, []);

	var hooks$1 = ['create', 'activate', 'update', 'remove', 'destroy'];

	function isUndef (s) {
	  return s == null
	}

	function isDef (s) {
	  return s != null
	}

	function sameVnode (vnode1, vnode2) {
	  return (
	    vnode1.key === vnode2.key &&
	    vnode1.tag === vnode2.tag &&
	    vnode1.isComment === vnode2.isComment &&
	    !vnode1.data === !vnode2.data
	  )
	}

	function createKeyToOldIdx (children, beginIdx, endIdx) {
	  var i, key;
	  var map = {};
	  for (i = beginIdx; i <= endIdx; ++i) {
	    key = children[i].key;
	    if (isDef(key)) { map[key] = i; }
	  }
	  return map
	}

	function createPatchFunction (backend) {
	  var i, j;
	  var cbs = {};

	  var modules = backend.modules;
	  var nodeOps = backend.nodeOps;

	  for (i = 0; i < hooks$1.length; ++i) {
	    cbs[hooks$1[i]] = [];
	    for (j = 0; j < modules.length; ++j) {
	      if (modules[j][hooks$1[i]] !== undefined) { cbs[hooks$1[i]].push(modules[j][hooks$1[i]]); }
	    }
	  }

	  function emptyNodeAt (elm) {
	    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
	  }

	  function createRmCb (childElm, listeners) {
	    function remove$$1 () {
	      if (--remove$$1.listeners === 0) {
	        removeNode(childElm);
	      }
	    }
	    remove$$1.listeners = listeners;
	    return remove$$1
	  }

	  function removeNode (el) {
	    var parent = nodeOps.parentNode(el);
	    // element may have already been removed due to v-html / v-text
	    if (parent) {
	      nodeOps.removeChild(parent, el);
	    }
	  }

	  var inPre = 0;
	  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
	    vnode.isRootInsert = !nested; // for transition enter check
	    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
	      return
	    }

	    var data = vnode.data;
	    var children = vnode.children;
	    var tag = vnode.tag;
	    if (isDef(tag)) {
	      if (process.env.NODE_ENV !== 'production') {
	        if (data && data.pre) {
	          inPre++;
	        }
	        if (
	          !inPre &&
	          !vnode.ns &&
	          !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
	          config.isUnknownElement(tag)
	        ) {
	          warn(
	            'Unknown custom element: <' + tag + '> - did you ' +
	            'register the component correctly? For recursive components, ' +
	            'make sure to provide the "name" option.',
	            vnode.context
	          );
	        }
	      }
	      vnode.elm = vnode.ns
	        ? nodeOps.createElementNS(vnode.ns, tag)
	        : nodeOps.createElement(tag, vnode);
	      setScope(vnode);

	      /* istanbul ignore if */
	      {
	        createChildren(vnode, children, insertedVnodeQueue);
	        if (isDef(data)) {
	          invokeCreateHooks(vnode, insertedVnodeQueue);
	        }
	        insert(parentElm, vnode.elm, refElm);
	      }

	      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
	        inPre--;
	      }
	    } else if (vnode.isComment) {
	      vnode.elm = nodeOps.createComment(vnode.text);
	      insert(parentElm, vnode.elm, refElm);
	    } else {
	      vnode.elm = nodeOps.createTextNode(vnode.text);
	      insert(parentElm, vnode.elm, refElm);
	    }
	  }

	  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
	    var i = vnode.data;
	    if (isDef(i)) {
	      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
	      if (isDef(i = i.hook) && isDef(i = i.init)) {
	        i(vnode, false /* hydrating */, parentElm, refElm);
	      }
	      // after calling the init hook, if the vnode is a child component
	      // it should've created a child instance and mounted it. the child
	      // component also has set the placeholder vnode's elm.
	      // in that case we can just return the element and be done.
	      if (isDef(vnode.componentInstance)) {
	        initComponent(vnode, insertedVnodeQueue);
	        if (isReactivated) {
	          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
	        }
	        return true
	      }
	    }
	  }

	  function initComponent (vnode, insertedVnodeQueue) {
	    if (vnode.data.pendingInsert) {
	      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
	    }
	    vnode.elm = vnode.componentInstance.$el;
	    if (isPatchable(vnode)) {
	      invokeCreateHooks(vnode, insertedVnodeQueue);
	      setScope(vnode);
	    } else {
	      // empty component root.
	      // skip all element-related modules except for ref (#3455)
	      registerRef(vnode);
	      // make sure to invoke the insert hook
	      insertedVnodeQueue.push(vnode);
	    }
	  }

	  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
	    var i;
	    // hack for #4339: a reactivated component with inner transition
	    // does not trigger because the inner node's created hooks are not called
	    // again. It's not ideal to involve module-specific logic in here but
	    // there doesn't seem to be a better way to do it.
	    var innerNode = vnode;
	    while (innerNode.componentInstance) {
	      innerNode = innerNode.componentInstance._vnode;
	      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
	        for (i = 0; i < cbs.activate.length; ++i) {
	          cbs.activate[i](emptyNode, innerNode);
	        }
	        insertedVnodeQueue.push(innerNode);
	        break
	      }
	    }
	    // unlike a newly created component,
	    // a reactivated keep-alive component doesn't insert itself
	    insert(parentElm, vnode.elm, refElm);
	  }

	  function insert (parent, elm, ref) {
	    if (parent) {
	      if (ref) {
	        nodeOps.insertBefore(parent, elm, ref);
	      } else {
	        nodeOps.appendChild(parent, elm);
	      }
	    }
	  }

	  function createChildren (vnode, children, insertedVnodeQueue) {
	    if (Array.isArray(children)) {
	      for (var i = 0; i < children.length; ++i) {
	        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
	      }
	    } else if (isPrimitive(vnode.text)) {
	      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
	    }
	  }

	  function isPatchable (vnode) {
	    while (vnode.componentInstance) {
	      vnode = vnode.componentInstance._vnode;
	    }
	    return isDef(vnode.tag)
	  }

	  function invokeCreateHooks (vnode, insertedVnodeQueue) {
	    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
	      cbs.create[i$1](emptyNode, vnode);
	    }
	    i = vnode.data.hook; // Reuse variable
	    if (isDef(i)) {
	      if (i.create) { i.create(emptyNode, vnode); }
	      if (i.insert) { insertedVnodeQueue.push(vnode); }
	    }
	  }

	  // set scope id attribute for scoped CSS.
	  // this is implemented as a special case to avoid the overhead
	  // of going through the normal attribute patching process.
	  function setScope (vnode) {
	    var i;
	    if (isDef(i = vnode.context) && isDef(i = i.$options._scopeId)) {
	      nodeOps.setAttribute(vnode.elm, i, '');
	    }
	    if (isDef(i = activeInstance) &&
	        i !== vnode.context &&
	        isDef(i = i.$options._scopeId)) {
	      nodeOps.setAttribute(vnode.elm, i, '');
	    }
	  }

	  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
	    }
	  }

	  function invokeDestroyHook (vnode) {
	    var i, j;
	    var data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
	      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
	    }
	    if (isDef(i = vnode.children)) {
	      for (j = 0; j < vnode.children.length; ++j) {
	        invokeDestroyHook(vnode.children[j]);
	      }
	    }
	  }

	  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      var ch = vnodes[startIdx];
	      if (isDef(ch)) {
	        if (isDef(ch.tag)) {
	          removeAndInvokeRemoveHook(ch);
	          invokeDestroyHook(ch);
	        } else { // Text node
	          removeNode(ch.elm);
	        }
	      }
	    }
	  }

	  function removeAndInvokeRemoveHook (vnode, rm) {
	    if (rm || isDef(vnode.data)) {
	      var listeners = cbs.remove.length + 1;
	      if (!rm) {
	        // directly removing
	        rm = createRmCb(vnode.elm, listeners);
	      } else {
	        // we have a recursively passed down rm callback
	        // increase the listeners count
	        rm.listeners += listeners;
	      }
	      // recursively invoke hooks on child component root node
	      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
	        removeAndInvokeRemoveHook(i, rm);
	      }
	      for (i = 0; i < cbs.remove.length; ++i) {
	        cbs.remove[i](vnode, rm);
	      }
	      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
	        i(vnode, rm);
	      } else {
	        rm();
	      }
	    } else {
	      removeNode(vnode.elm);
	    }
	  }

	  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
	    var oldStartIdx = 0;
	    var newStartIdx = 0;
	    var oldEndIdx = oldCh.length - 1;
	    var oldStartVnode = oldCh[0];
	    var oldEndVnode = oldCh[oldEndIdx];
	    var newEndIdx = newCh.length - 1;
	    var newStartVnode = newCh[0];
	    var newEndVnode = newCh[newEndIdx];
	    var oldKeyToIdx, idxInOld, elmToMove, refElm;

	    // removeOnly is a special flag used only by <transition-group>
	    // to ensure removed elements stay in correct relative positions
	    // during leaving transitions
	    var canMove = !removeOnly;

	    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
	      if (isUndef(oldStartVnode)) {
	        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
	      } else if (isUndef(oldEndVnode)) {
	        oldEndVnode = oldCh[--oldEndIdx];
	      } else if (sameVnode(oldStartVnode, newStartVnode)) {
	        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
	        oldStartVnode = oldCh[++oldStartIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else if (sameVnode(oldEndVnode, newEndVnode)) {
	        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
	        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
	        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
	        oldStartVnode = oldCh[++oldStartIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
	        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
	        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else {
	        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
	        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
	        if (isUndef(idxInOld)) { // New element
	          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
	          newStartVnode = newCh[++newStartIdx];
	        } else {
	          elmToMove = oldCh[idxInOld];
	          /* istanbul ignore if */
	          if (process.env.NODE_ENV !== 'production' && !elmToMove) {
	            warn(
	              'It seems there are duplicate keys that is causing an update error. ' +
	              'Make sure each v-for item has a unique key.'
	            );
	          }
	          if (sameVnode(elmToMove, newStartVnode)) {
	            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
	            oldCh[idxInOld] = undefined;
	            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
	            newStartVnode = newCh[++newStartIdx];
	          } else {
	            // same key but different element. treat as new element
	            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
	            newStartVnode = newCh[++newStartIdx];
	          }
	        }
	      }
	    }
	    if (oldStartIdx > oldEndIdx) {
	      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
	      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
	    } else if (newStartIdx > newEndIdx) {
	      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
	    }
	  }

	  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
	    if (oldVnode === vnode) {
	      return
	    }
	    // reuse element for static trees.
	    // note we only do this if the vnode is cloned -
	    // if the new node is not cloned it means the render functions have been
	    // reset by the hot-reload-api and we need to do a proper re-render.
	    if (vnode.isStatic &&
	        oldVnode.isStatic &&
	        vnode.key === oldVnode.key &&
	        (vnode.isCloned || vnode.isOnce)) {
	      vnode.elm = oldVnode.elm;
	      vnode.componentInstance = oldVnode.componentInstance;
	      return
	    }
	    var i;
	    var data = vnode.data;
	    var hasData = isDef(data);
	    if (hasData && isDef(i = data.hook) && isDef(i = i.prepatch)) {
	      i(oldVnode, vnode);
	    }
	    var elm = vnode.elm = oldVnode.elm;
	    var oldCh = oldVnode.children;
	    var ch = vnode.children;
	    if (hasData && isPatchable(vnode)) {
	      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
	      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
	    }
	    if (isUndef(vnode.text)) {
	      if (isDef(oldCh) && isDef(ch)) {
	        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
	      } else if (isDef(ch)) {
	        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
	        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
	      } else if (isDef(oldCh)) {
	        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
	      } else if (isDef(oldVnode.text)) {
	        nodeOps.setTextContent(elm, '');
	      }
	    } else if (oldVnode.text !== vnode.text) {
	      nodeOps.setTextContent(elm, vnode.text);
	    }
	    if (hasData) {
	      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
	    }
	  }

	  function invokeInsertHook (vnode, queue, initial) {
	    // delay insert hooks for component root nodes, invoke them after the
	    // element is really inserted
	    if (initial && vnode.parent) {
	      vnode.parent.data.pendingInsert = queue;
	    } else {
	      for (var i = 0; i < queue.length; ++i) {
	        queue[i].data.hook.insert(queue[i]);
	      }
	    }
	  }

	  var bailed = false;
	  // list of modules that can skip create hook during hydration because they
	  // are already rendered on the client or has no need for initialization
	  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

	  // Note: this is a browser-only function so we can assume elms are DOM nodes.
	  function hydrate (elm, vnode, insertedVnodeQueue) {
	    if (process.env.NODE_ENV !== 'production') {
	      if (!assertNodeMatch(elm, vnode)) {
	        return false
	      }
	    }
	    vnode.elm = elm;
	    var tag = vnode.tag;
	    var data = vnode.data;
	    var children = vnode.children;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
	      if (isDef(i = vnode.componentInstance)) {
	        // child component. it should have hydrated its own tree.
	        initComponent(vnode, insertedVnodeQueue);
	        return true
	      }
	    }
	    if (isDef(tag)) {
	      if (isDef(children)) {
	        // empty element, allow client to pick up and populate children
	        if (!elm.hasChildNodes()) {
	          createChildren(vnode, children, insertedVnodeQueue);
	        } else {
	          var childrenMatch = true;
	          var childNode = elm.firstChild;
	          for (var i$1 = 0; i$1 < children.length; i$1++) {
	            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
	              childrenMatch = false;
	              break
	            }
	            childNode = childNode.nextSibling;
	          }
	          // if childNode is not null, it means the actual childNodes list is
	          // longer than the virtual children list.
	          if (!childrenMatch || childNode) {
	            if (process.env.NODE_ENV !== 'production' &&
	                typeof console !== 'undefined' &&
	                !bailed) {
	              bailed = true;
	              console.warn('Parent: ', elm);
	              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
	            }
	            return false
	          }
	        }
	      }
	      if (isDef(data)) {
	        for (var key in data) {
	          if (!isRenderedModule(key)) {
	            invokeCreateHooks(vnode, insertedVnodeQueue);
	            break
	          }
	        }
	      }
	    } else if (elm.data !== vnode.text) {
	      elm.data = vnode.text;
	    }
	    return true
	  }

	  function assertNodeMatch (node, vnode) {
	    if (vnode.tag) {
	      return (
	        vnode.tag.indexOf('vue-component') === 0 ||
	        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
	      )
	    } else {
	      return node.nodeType === (vnode.isComment ? 8 : 3)
	    }
	  }

	  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
	    if (!vnode) {
	      if (oldVnode) { invokeDestroyHook(oldVnode); }
	      return
	    }

	    var isInitialPatch = false;
	    var insertedVnodeQueue = [];

	    if (!oldVnode) {
	      // empty mount (likely as component), create new root element
	      isInitialPatch = true;
	      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
	    } else {
	      var isRealElement = isDef(oldVnode.nodeType);
	      if (!isRealElement && sameVnode(oldVnode, vnode)) {
	        // patch existing root node
	        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
	      } else {
	        if (isRealElement) {
	          // mounting to a real element
	          // check if this is server-rendered content and if we can perform
	          // a successful hydration.
	          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute('server-rendered')) {
	            oldVnode.removeAttribute('server-rendered');
	            hydrating = true;
	          }
	          if (hydrating) {
	            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
	              invokeInsertHook(vnode, insertedVnodeQueue, true);
	              return oldVnode
	            } else if (process.env.NODE_ENV !== 'production') {
	              warn(
	                'The client-side rendered virtual DOM tree is not matching ' +
	                'server-rendered content. This is likely caused by incorrect ' +
	                'HTML markup, for example nesting block-level elements inside ' +
	                '<p>, or missing <tbody>. Bailing hydration and performing ' +
	                'full client-side render.'
	              );
	            }
	          }
	          // either not server-rendered, or hydration failed.
	          // create an empty node and replace it
	          oldVnode = emptyNodeAt(oldVnode);
	        }
	        // replacing existing element
	        var oldElm = oldVnode.elm;
	        var parentElm$1 = nodeOps.parentNode(oldElm);
	        createElm(
	          vnode,
	          insertedVnodeQueue,
	          // extremely rare edge case: do not insert if old element is in a
	          // leaving transition. Only happens when combining transition +
	          // keep-alive + HOCs. (#4590)
	          oldElm._leaveCb ? null : parentElm$1,
	          nodeOps.nextSibling(oldElm)
	        );

	        if (vnode.parent) {
	          // component root element replaced.
	          // update parent placeholder node element, recursively
	          var ancestor = vnode.parent;
	          while (ancestor) {
	            ancestor.elm = vnode.elm;
	            ancestor = ancestor.parent;
	          }
	          if (isPatchable(vnode)) {
	            for (var i = 0; i < cbs.create.length; ++i) {
	              cbs.create[i](emptyNode, vnode.parent);
	            }
	          }
	        }

	        if (parentElm$1 !== null) {
	          removeVnodes(parentElm$1, [oldVnode], 0, 0);
	        } else if (isDef(oldVnode.tag)) {
	          invokeDestroyHook(oldVnode);
	        }
	      }
	    }

	    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
	    return vnode.elm
	  }
	}

	/*  */

	var directives = {
	  create: updateDirectives,
	  update: updateDirectives,
	  destroy: function unbindDirectives (vnode) {
	    updateDirectives(vnode, emptyNode);
	  }
	};

	function updateDirectives (oldVnode, vnode) {
	  if (oldVnode.data.directives || vnode.data.directives) {
	    _update(oldVnode, vnode);
	  }
	}

	function _update (oldVnode, vnode) {
	  var isCreate = oldVnode === emptyNode;
	  var isDestroy = vnode === emptyNode;
	  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
	  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

	  var dirsWithInsert = [];
	  var dirsWithPostpatch = [];

	  var key, oldDir, dir;
	  for (key in newDirs) {
	    oldDir = oldDirs[key];
	    dir = newDirs[key];
	    if (!oldDir) {
	      // new directive, bind
	      callHook$1(dir, 'bind', vnode, oldVnode);
	      if (dir.def && dir.def.inserted) {
	        dirsWithInsert.push(dir);
	      }
	    } else {
	      // existing directive, update
	      dir.oldValue = oldDir.value;
	      callHook$1(dir, 'update', vnode, oldVnode);
	      if (dir.def && dir.def.componentUpdated) {
	        dirsWithPostpatch.push(dir);
	      }
	    }
	  }

	  if (dirsWithInsert.length) {
	    var callInsert = function () {
	      for (var i = 0; i < dirsWithInsert.length; i++) {
	        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
	      }
	    };
	    if (isCreate) {
	      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert, 'dir-insert');
	    } else {
	      callInsert();
	    }
	  }

	  if (dirsWithPostpatch.length) {
	    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
	      for (var i = 0; i < dirsWithPostpatch.length; i++) {
	        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
	      }
	    }, 'dir-postpatch');
	  }

	  if (!isCreate) {
	    for (key in oldDirs) {
	      if (!newDirs[key]) {
	        // no longer present, unbind
	        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
	      }
	    }
	  }
	}

	var emptyModifiers = Object.create(null);

	function normalizeDirectives$1 (
	  dirs,
	  vm
	) {
	  var res = Object.create(null);
	  if (!dirs) {
	    return res
	  }
	  var i, dir;
	  for (i = 0; i < dirs.length; i++) {
	    dir = dirs[i];
	    if (!dir.modifiers) {
	      dir.modifiers = emptyModifiers;
	    }
	    res[getRawDirName(dir)] = dir;
	    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
	  }
	  return res
	}

	function getRawDirName (dir) {
	  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
	}

	function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
	  var fn = dir.def && dir.def[hook];
	  if (fn) {
	    fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
	  }
	}

	var baseModules = [
	  ref,
	  directives
	];

	/*  */

	function updateAttrs (oldVnode, vnode) {
	  if (!oldVnode.data.attrs && !vnode.data.attrs) {
	    return
	  }
	  var key, cur, old;
	  var elm = vnode.elm;
	  var oldAttrs = oldVnode.data.attrs || {};
	  var attrs = vnode.data.attrs || {};
	  // clone observed objects, as the user probably wants to mutate it
	  if (attrs.__ob__) {
	    attrs = vnode.data.attrs = extend({}, attrs);
	  }

	  for (key in attrs) {
	    cur = attrs[key];
	    old = oldAttrs[key];
	    if (old !== cur) {
	      setAttr(elm, key, cur);
	    }
	  }
	  // #4391: in IE9, setting type can reset value for input[type=radio]
	  /* istanbul ignore if */
	  if (isIE9 && attrs.value !== oldAttrs.value) {
	    setAttr(elm, 'value', attrs.value);
	  }
	  for (key in oldAttrs) {
	    if (attrs[key] == null) {
	      if (isXlink(key)) {
	        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
	      } else if (!isEnumeratedAttr(key)) {
	        elm.removeAttribute(key);
	      }
	    }
	  }
	}

	function setAttr (el, key, value) {
	  if (isBooleanAttr(key)) {
	    // set attribute for blank value
	    // e.g. <option disabled>Select one</option>
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key);
	    } else {
	      el.setAttribute(key, key);
	    }
	  } else if (isEnumeratedAttr(key)) {
	    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
	  } else if (isXlink(key)) {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
	    } else {
	      el.setAttributeNS(xlinkNS, key, value);
	    }
	  } else {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key);
	    } else {
	      el.setAttribute(key, value);
	    }
	  }
	}

	var attrs = {
	  create: updateAttrs,
	  update: updateAttrs
	};

	/*  */

	function updateClass (oldVnode, vnode) {
	  var el = vnode.elm;
	  var data = vnode.data;
	  var oldData = oldVnode.data;
	  if (!data.staticClass && !data.class &&
	      (!oldData || (!oldData.staticClass && !oldData.class))) {
	    return
	  }

	  var cls = genClassForVnode(vnode);

	  // handle transition classes
	  var transitionClass = el._transitionClasses;
	  if (transitionClass) {
	    cls = concat(cls, stringifyClass(transitionClass));
	  }

	  // set the class
	  if (cls !== el._prevClass) {
	    el.setAttribute('class', cls);
	    el._prevClass = cls;
	  }
	}

	var klass = {
	  create: updateClass,
	  update: updateClass
	};

	/*  */

	var target$1;

	function add$2 (
	  event,
	  handler,
	  once,
	  capture
	) {
	  if (once) {
	    var oldHandler = handler;
	    var _target = target$1; // save current target element in closure
	    handler = function (ev) {
	      remove$3(event, handler, capture, _target);
	      arguments.length === 1
	        ? oldHandler(ev)
	        : oldHandler.apply(null, arguments);
	    };
	  }
	  target$1.addEventListener(event, handler, capture);
	}

	function remove$3 (
	  event,
	  handler,
	  capture,
	  _target
	) {
	  (_target || target$1).removeEventListener(event, handler, capture);
	}

	function updateDOMListeners (oldVnode, vnode) {
	  if (!oldVnode.data.on && !vnode.data.on) {
	    return
	  }
	  var on = vnode.data.on || {};
	  var oldOn = oldVnode.data.on || {};
	  target$1 = vnode.elm;
	  updateListeners(on, oldOn, add$2, remove$3, vnode.context);
	}

	var events = {
	  create: updateDOMListeners,
	  update: updateDOMListeners
	};

	/*  */

	function updateDOMProps (oldVnode, vnode) {
	  if (!oldVnode.data.domProps && !vnode.data.domProps) {
	    return
	  }
	  var key, cur;
	  var elm = vnode.elm;
	  var oldProps = oldVnode.data.domProps || {};
	  var props = vnode.data.domProps || {};
	  // clone observed objects, as the user probably wants to mutate it
	  if (props.__ob__) {
	    props = vnode.data.domProps = extend({}, props);
	  }

	  for (key in oldProps) {
	    if (props[key] == null) {
	      elm[key] = '';
	    }
	  }
	  for (key in props) {
	    cur = props[key];
	    // ignore children if the node has textContent or innerHTML,
	    // as these will throw away existing DOM nodes and cause removal errors
	    // on subsequent patches (#3360)
	    if (key === 'textContent' || key === 'innerHTML') {
	      if (vnode.children) { vnode.children.length = 0; }
	      if (cur === oldProps[key]) { continue }
	    }

	    if (key === 'value') {
	      // store value as _value as well since
	      // non-string values will be stringified
	      elm._value = cur;
	      // avoid resetting cursor position when value is the same
	      var strCur = cur == null ? '' : String(cur);
	      if (shouldUpdateValue(elm, vnode, strCur)) {
	        elm.value = strCur;
	      }
	    } else {
	      elm[key] = cur;
	    }
	  }
	}

	// check platforms/web/util/attrs.js acceptValue


	function shouldUpdateValue (
	  elm,
	  vnode,
	  checkVal
	) {
	  return (!elm.composing && (
	    vnode.tag === 'option' ||
	    isDirty(elm, checkVal) ||
	    isInputChanged(vnode, checkVal)
	  ))
	}

	function isDirty (elm, checkVal) {
	  // return true when textbox (.number and .trim) loses focus and its value is not equal to the updated value
	  return document.activeElement !== elm && elm.value !== checkVal
	}

	function isInputChanged (vnode, newVal) {
	  var value = vnode.elm.value;
	  var modifiers = vnode.elm._vModifiers; // injected by v-model runtime
	  if ((modifiers && modifiers.number) || vnode.elm.type === 'number') {
	    return toNumber(value) !== toNumber(newVal)
	  }
	  if (modifiers && modifiers.trim) {
	    return value.trim() !== newVal.trim()
	  }
	  return value !== newVal
	}

	var domProps = {
	  create: updateDOMProps,
	  update: updateDOMProps
	};

	/*  */

	var parseStyleText = cached(function (cssText) {
	  var res = {};
	  var listDelimiter = /;(?![^(]*\))/g;
	  var propertyDelimiter = /:(.+)/;
	  cssText.split(listDelimiter).forEach(function (item) {
	    if (item) {
	      var tmp = item.split(propertyDelimiter);
	      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
	    }
	  });
	  return res
	});

	// merge static and dynamic style data on the same vnode
	function normalizeStyleData (data) {
	  var style = normalizeStyleBinding(data.style);
	  // static style is pre-processed into an object during compilation
	  // and is always a fresh object, so it's safe to merge into it
	  return data.staticStyle
	    ? extend(data.staticStyle, style)
	    : style
	}

	// normalize possible array / string values into Object
	function normalizeStyleBinding (bindingStyle) {
	  if (Array.isArray(bindingStyle)) {
	    return toObject(bindingStyle)
	  }
	  if (typeof bindingStyle === 'string') {
	    return parseStyleText(bindingStyle)
	  }
	  return bindingStyle
	}

	/**
	 * parent component style should be after child's
	 * so that parent component's style could override it
	 */
	function getStyle (vnode, checkChild) {
	  var res = {};
	  var styleData;

	  if (checkChild) {
	    var childNode = vnode;
	    while (childNode.componentInstance) {
	      childNode = childNode.componentInstance._vnode;
	      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
	        extend(res, styleData);
	      }
	    }
	  }

	  if ((styleData = normalizeStyleData(vnode.data))) {
	    extend(res, styleData);
	  }

	  var parentNode = vnode;
	  while ((parentNode = parentNode.parent)) {
	    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
	      extend(res, styleData);
	    }
	  }
	  return res
	}

	/*  */

	var cssVarRE = /^--/;
	var importantRE = /\s*!important$/;
	var setProp = function (el, name, val) {
	  /* istanbul ignore if */
	  if (cssVarRE.test(name)) {
	    el.style.setProperty(name, val);
	  } else if (importantRE.test(val)) {
	    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
	  } else {
	    el.style[normalize(name)] = val;
	  }
	};

	var prefixes = ['Webkit', 'Moz', 'ms'];

	var testEl;
	var normalize = cached(function (prop) {
	  testEl = testEl || document.createElement('div');
	  prop = camelize(prop);
	  if (prop !== 'filter' && (prop in testEl.style)) {
	    return prop
	  }
	  var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
	  for (var i = 0; i < prefixes.length; i++) {
	    var prefixed = prefixes[i] + upper;
	    if (prefixed in testEl.style) {
	      return prefixed
	    }
	  }
	});

	function updateStyle (oldVnode, vnode) {
	  var data = vnode.data;
	  var oldData = oldVnode.data;

	  if (!data.staticStyle && !data.style &&
	      !oldData.staticStyle && !oldData.style) {
	    return
	  }

	  var cur, name;
	  var el = vnode.elm;
	  var oldStaticStyle = oldVnode.data.staticStyle;
	  var oldStyleBinding = oldVnode.data.style || {};

	  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
	  var oldStyle = oldStaticStyle || oldStyleBinding;

	  var style = normalizeStyleBinding(vnode.data.style) || {};

	  vnode.data.style = style.__ob__ ? extend({}, style) : style;

	  var newStyle = getStyle(vnode, true);

	  for (name in oldStyle) {
	    if (newStyle[name] == null) {
	      setProp(el, name, '');
	    }
	  }
	  for (name in newStyle) {
	    cur = newStyle[name];
	    if (cur !== oldStyle[name]) {
	      // ie9 setting to null has no effect, must use empty string
	      setProp(el, name, cur == null ? '' : cur);
	    }
	  }
	}

	var style = {
	  create: updateStyle,
	  update: updateStyle
	};

	/*  */

	/**
	 * Add class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function addClass (el, cls) {
	  /* istanbul ignore if */
	  if (!cls || !cls.trim()) {
	    return
	  }

	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
	    } else {
	      el.classList.add(cls);
	    }
	  } else {
	    var cur = ' ' + el.getAttribute('class') + ' ';
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      el.setAttribute('class', (cur + cls).trim());
	    }
	  }
	}

	/**
	 * Remove class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function removeClass (el, cls) {
	  /* istanbul ignore if */
	  if (!cls || !cls.trim()) {
	    return
	  }

	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
	    } else {
	      el.classList.remove(cls);
	    }
	  } else {
	    var cur = ' ' + el.getAttribute('class') + ' ';
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    el.setAttribute('class', cur.trim());
	  }
	}

	/*  */

	var hasTransition = inBrowser && !isIE9;
	var TRANSITION = 'transition';
	var ANIMATION = 'animation';

	// Transition property/event sniffing
	var transitionProp = 'transition';
	var transitionEndEvent = 'transitionend';
	var animationProp = 'animation';
	var animationEndEvent = 'animationend';
	if (hasTransition) {
	  /* istanbul ignore if */
	  if (window.ontransitionend === undefined &&
	    window.onwebkittransitionend !== undefined) {
	    transitionProp = 'WebkitTransition';
	    transitionEndEvent = 'webkitTransitionEnd';
	  }
	  if (window.onanimationend === undefined &&
	    window.onwebkitanimationend !== undefined) {
	    animationProp = 'WebkitAnimation';
	    animationEndEvent = 'webkitAnimationEnd';
	  }
	}

	// binding to window is necessary to make hot reload work in IE in strict mode
	var raf = inBrowser && window.requestAnimationFrame
	  ? window.requestAnimationFrame.bind(window)
	  : setTimeout;

	function nextFrame (fn) {
	  raf(function () {
	    raf(fn);
	  });
	}

	function addTransitionClass (el, cls) {
	  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
	  addClass(el, cls);
	}

	function removeTransitionClass (el, cls) {
	  if (el._transitionClasses) {
	    remove$1(el._transitionClasses, cls);
	  }
	  removeClass(el, cls);
	}

	function whenTransitionEnds (
	  el,
	  expectedType,
	  cb
	) {
	  var ref = getTransitionInfo(el, expectedType);
	  var type = ref.type;
	  var timeout = ref.timeout;
	  var propCount = ref.propCount;
	  if (!type) { return cb() }
	  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
	  var ended = 0;
	  var end = function () {
	    el.removeEventListener(event, onEnd);
	    cb();
	  };
	  var onEnd = function (e) {
	    if (e.target === el) {
	      if (++ended >= propCount) {
	        end();
	      }
	    }
	  };
	  setTimeout(function () {
	    if (ended < propCount) {
	      end();
	    }
	  }, timeout + 1);
	  el.addEventListener(event, onEnd);
	}

	var transformRE = /\b(transform|all)(,|$)/;

	function getTransitionInfo (el, expectedType) {
	  var styles = window.getComputedStyle(el);
	  var transitioneDelays = styles[transitionProp + 'Delay'].split(', ');
	  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
	  var transitionTimeout = getTimeout(transitioneDelays, transitionDurations);
	  var animationDelays = styles[animationProp + 'Delay'].split(', ');
	  var animationDurations = styles[animationProp + 'Duration'].split(', ');
	  var animationTimeout = getTimeout(animationDelays, animationDurations);

	  var type;
	  var timeout = 0;
	  var propCount = 0;
	  /* istanbul ignore if */
	  if (expectedType === TRANSITION) {
	    if (transitionTimeout > 0) {
	      type = TRANSITION;
	      timeout = transitionTimeout;
	      propCount = transitionDurations.length;
	    }
	  } else if (expectedType === ANIMATION) {
	    if (animationTimeout > 0) {
	      type = ANIMATION;
	      timeout = animationTimeout;
	      propCount = animationDurations.length;
	    }
	  } else {
	    timeout = Math.max(transitionTimeout, animationTimeout);
	    type = timeout > 0
	      ? transitionTimeout > animationTimeout
	        ? TRANSITION
	        : ANIMATION
	      : null;
	    propCount = type
	      ? type === TRANSITION
	        ? transitionDurations.length
	        : animationDurations.length
	      : 0;
	  }
	  var hasTransform =
	    type === TRANSITION &&
	    transformRE.test(styles[transitionProp + 'Property']);
	  return {
	    type: type,
	    timeout: timeout,
	    propCount: propCount,
	    hasTransform: hasTransform
	  }
	}

	function getTimeout (delays, durations) {
	  /* istanbul ignore next */
	  while (delays.length < durations.length) {
	    delays = delays.concat(delays);
	  }

	  return Math.max.apply(null, durations.map(function (d, i) {
	    return toMs(d) + toMs(delays[i])
	  }))
	}

	function toMs (s) {
	  return Number(s.slice(0, -1)) * 1000
	}

	/*  */

	function enter (vnode, toggleDisplay) {
	  var el = vnode.elm;

	  // call leave callback now
	  if (el._leaveCb) {
	    el._leaveCb.cancelled = true;
	    el._leaveCb();
	  }

	  var data = resolveTransition(vnode.data.transition);
	  if (!data) {
	    return
	  }

	  /* istanbul ignore if */
	  if (el._enterCb || el.nodeType !== 1) {
	    return
	  }

	  var css = data.css;
	  var type = data.type;
	  var enterClass = data.enterClass;
	  var enterToClass = data.enterToClass;
	  var enterActiveClass = data.enterActiveClass;
	  var appearClass = data.appearClass;
	  var appearToClass = data.appearToClass;
	  var appearActiveClass = data.appearActiveClass;
	  var beforeEnter = data.beforeEnter;
	  var enter = data.enter;
	  var afterEnter = data.afterEnter;
	  var enterCancelled = data.enterCancelled;
	  var beforeAppear = data.beforeAppear;
	  var appear = data.appear;
	  var afterAppear = data.afterAppear;
	  var appearCancelled = data.appearCancelled;

	  // activeInstance will always be the <transition> component managing this
	  // transition. One edge case to check is when the <transition> is placed
	  // as the root node of a child component. In that case we need to check
	  // <transition>'s parent for appear check.
	  var context = activeInstance;
	  var transitionNode = activeInstance.$vnode;
	  while (transitionNode && transitionNode.parent) {
	    transitionNode = transitionNode.parent;
	    context = transitionNode.context;
	  }

	  var isAppear = !context._isMounted || !vnode.isRootInsert;

	  if (isAppear && !appear && appear !== '') {
	    return
	  }

	  var startClass = isAppear ? appearClass : enterClass;
	  var activeClass = isAppear ? appearActiveClass : enterActiveClass;
	  var toClass = isAppear ? appearToClass : enterToClass;
	  var beforeEnterHook = isAppear ? (beforeAppear || beforeEnter) : beforeEnter;
	  var enterHook = isAppear ? (typeof appear === 'function' ? appear : enter) : enter;
	  var afterEnterHook = isAppear ? (afterAppear || afterEnter) : afterEnter;
	  var enterCancelledHook = isAppear ? (appearCancelled || enterCancelled) : enterCancelled;

	  var expectsCSS = css !== false && !isIE9;
	  var userWantsControl =
	    enterHook &&
	    // enterHook may be a bound method which exposes
	    // the length of original fn as _length
	    (enterHook._length || enterHook.length) > 1;

	  var cb = el._enterCb = once(function () {
	    if (expectsCSS) {
	      removeTransitionClass(el, toClass);
	      removeTransitionClass(el, activeClass);
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, startClass);
	      }
	      enterCancelledHook && enterCancelledHook(el);
	    } else {
	      afterEnterHook && afterEnterHook(el);
	    }
	    el._enterCb = null;
	  });

	  if (!vnode.data.show) {
	    // remove pending leave element on enter by injecting an insert hook
	    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
	      var parent = el.parentNode;
	      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
	      if (pendingNode &&
	          pendingNode.tag === vnode.tag &&
	          pendingNode.elm._leaveCb) {
	        pendingNode.elm._leaveCb();
	      }
	      enterHook && enterHook(el, cb);
	    }, 'transition-insert');
	  }

	  // start enter transition
	  beforeEnterHook && beforeEnterHook(el);
	  if (expectsCSS) {
	    addTransitionClass(el, startClass);
	    addTransitionClass(el, activeClass);
	    nextFrame(function () {
	      addTransitionClass(el, toClass);
	      removeTransitionClass(el, startClass);
	      if (!cb.cancelled && !userWantsControl) {
	        whenTransitionEnds(el, type, cb);
	      }
	    });
	  }

	  if (vnode.data.show) {
	    toggleDisplay && toggleDisplay();
	    enterHook && enterHook(el, cb);
	  }

	  if (!expectsCSS && !userWantsControl) {
	    cb();
	  }
	}

	function leave (vnode, rm) {
	  var el = vnode.elm;

	  // call enter callback now
	  if (el._enterCb) {
	    el._enterCb.cancelled = true;
	    el._enterCb();
	  }

	  var data = resolveTransition(vnode.data.transition);
	  if (!data) {
	    return rm()
	  }

	  /* istanbul ignore if */
	  if (el._leaveCb || el.nodeType !== 1) {
	    return
	  }

	  var css = data.css;
	  var type = data.type;
	  var leaveClass = data.leaveClass;
	  var leaveToClass = data.leaveToClass;
	  var leaveActiveClass = data.leaveActiveClass;
	  var beforeLeave = data.beforeLeave;
	  var leave = data.leave;
	  var afterLeave = data.afterLeave;
	  var leaveCancelled = data.leaveCancelled;
	  var delayLeave = data.delayLeave;

	  var expectsCSS = css !== false && !isIE9;
	  var userWantsControl =
	    leave &&
	    // leave hook may be a bound method which exposes
	    // the length of original fn as _length
	    (leave._length || leave.length) > 1;

	  var cb = el._leaveCb = once(function () {
	    if (el.parentNode && el.parentNode._pending) {
	      el.parentNode._pending[vnode.key] = null;
	    }
	    if (expectsCSS) {
	      removeTransitionClass(el, leaveToClass);
	      removeTransitionClass(el, leaveActiveClass);
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, leaveClass);
	      }
	      leaveCancelled && leaveCancelled(el);
	    } else {
	      rm();
	      afterLeave && afterLeave(el);
	    }
	    el._leaveCb = null;
	  });

	  if (delayLeave) {
	    delayLeave(performLeave);
	  } else {
	    performLeave();
	  }

	  function performLeave () {
	    // the delayed leave may have already been cancelled
	    if (cb.cancelled) {
	      return
	    }
	    // record leaving element
	    if (!vnode.data.show) {
	      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
	    }
	    beforeLeave && beforeLeave(el);
	    if (expectsCSS) {
	      addTransitionClass(el, leaveClass);
	      addTransitionClass(el, leaveActiveClass);
	      nextFrame(function () {
	        addTransitionClass(el, leaveToClass);
	        removeTransitionClass(el, leaveClass);
	        if (!cb.cancelled && !userWantsControl) {
	          whenTransitionEnds(el, type, cb);
	        }
	      });
	    }
	    leave && leave(el, cb);
	    if (!expectsCSS && !userWantsControl) {
	      cb();
	    }
	  }
	}

	function resolveTransition (def$$1) {
	  if (!def$$1) {
	    return
	  }
	  /* istanbul ignore else */
	  if (typeof def$$1 === 'object') {
	    var res = {};
	    if (def$$1.css !== false) {
	      extend(res, autoCssTransition(def$$1.name || 'v'));
	    }
	    extend(res, def$$1);
	    return res
	  } else if (typeof def$$1 === 'string') {
	    return autoCssTransition(def$$1)
	  }
	}

	var autoCssTransition = cached(function (name) {
	  return {
	    enterClass: (name + "-enter"),
	    leaveClass: (name + "-leave"),
	    appearClass: (name + "-enter"),
	    enterToClass: (name + "-enter-to"),
	    leaveToClass: (name + "-leave-to"),
	    appearToClass: (name + "-enter-to"),
	    enterActiveClass: (name + "-enter-active"),
	    leaveActiveClass: (name + "-leave-active"),
	    appearActiveClass: (name + "-enter-active")
	  }
	});

	function once (fn) {
	  var called = false;
	  return function () {
	    if (!called) {
	      called = true;
	      fn();
	    }
	  }
	}

	function _enter (_, vnode) {
	  if (!vnode.data.show) {
	    enter(vnode);
	  }
	}

	var transition = inBrowser ? {
	  create: _enter,
	  activate: _enter,
	  remove: function remove (vnode, rm) {
	    /* istanbul ignore else */
	    if (!vnode.data.show) {
	      leave(vnode, rm);
	    } else {
	      rm();
	    }
	  }
	} : {};

	var platformModules = [
	  attrs,
	  klass,
	  events,
	  domProps,
	  style,
	  transition
	];

	/*  */

	// the directive module should be applied last, after all
	// built-in modules have been applied.
	var modules = platformModules.concat(baseModules);

	var patch$1 = createPatchFunction({ nodeOps: nodeOps, modules: modules });

	/**
	 * Not type checking this file because flow doesn't like attaching
	 * properties to Elements.
	 */

	var modelableTagRE = /^input|select|textarea|vue-component-[0-9]+(-[0-9a-zA-Z_-]*)?$/;

	/* istanbul ignore if */
	if (isIE9) {
	  // http://www.matts411.com/post/internet-explorer-9-oninput/
	  document.addEventListener('selectionchange', function () {
	    var el = document.activeElement;
	    if (el && el.vmodel) {
	      trigger(el, 'input');
	    }
	  });
	}

	var model = {
	  inserted: function inserted (el, binding, vnode) {
	    if (process.env.NODE_ENV !== 'production') {
	      if (!modelableTagRE.test(vnode.tag)) {
	        warn(
	          "v-model is not supported on element type: <" + (vnode.tag) + ">. " +
	          'If you are working with contenteditable, it\'s recommended to ' +
	          'wrap a library dedicated for that purpose inside a custom component.',
	          vnode.context
	        );
	      }
	    }
	    if (vnode.tag === 'select') {
	      var cb = function () {
	        setSelected(el, binding, vnode.context);
	      };
	      cb();
	      /* istanbul ignore if */
	      if (isIE || isEdge) {
	        setTimeout(cb, 0);
	      }
	    } else if (vnode.tag === 'textarea' || el.type === 'text') {
	      el._vModifiers = binding.modifiers;
	      if (!binding.modifiers.lazy) {
	        if (!isAndroid) {
	          el.addEventListener('compositionstart', onCompositionStart);
	          el.addEventListener('compositionend', onCompositionEnd);
	        }
	        /* istanbul ignore if */
	        if (isIE9) {
	          el.vmodel = true;
	        }
	      }
	    }
	  },
	  componentUpdated: function componentUpdated (el, binding, vnode) {
	    if (vnode.tag === 'select') {
	      setSelected(el, binding, vnode.context);
	      // in case the options rendered by v-for have changed,
	      // it's possible that the value is out-of-sync with the rendered options.
	      // detect such cases and filter out values that no longer has a matching
	      // option in the DOM.
	      var needReset = el.multiple
	        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
	        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
	      if (needReset) {
	        trigger(el, 'change');
	      }
	    }
	  }
	};

	function setSelected (el, binding, vm) {
	  var value = binding.value;
	  var isMultiple = el.multiple;
	  if (isMultiple && !Array.isArray(value)) {
	    process.env.NODE_ENV !== 'production' && warn(
	      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
	      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
	      vm
	    );
	    return
	  }
	  var selected, option;
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    option = el.options[i];
	    if (isMultiple) {
	      selected = looseIndexOf(value, getValue(option)) > -1;
	      if (option.selected !== selected) {
	        option.selected = selected;
	      }
	    } else {
	      if (looseEqual(getValue(option), value)) {
	        if (el.selectedIndex !== i) {
	          el.selectedIndex = i;
	        }
	        return
	      }
	    }
	  }
	  if (!isMultiple) {
	    el.selectedIndex = -1;
	  }
	}

	function hasNoMatchingOption (value, options) {
	  for (var i = 0, l = options.length; i < l; i++) {
	    if (looseEqual(getValue(options[i]), value)) {
	      return false
	    }
	  }
	  return true
	}

	function getValue (option) {
	  return '_value' in option
	    ? option._value
	    : option.value
	}

	function onCompositionStart (e) {
	  e.target.composing = true;
	}

	function onCompositionEnd (e) {
	  e.target.composing = false;
	  trigger(e.target, 'input');
	}

	function trigger (el, type) {
	  var e = document.createEvent('HTMLEvents');
	  e.initEvent(type, true, true);
	  el.dispatchEvent(e);
	}

	/*  */

	// recursively search for possible transition defined inside the component root
	function locateNode (vnode) {
	  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
	    ? locateNode(vnode.componentInstance._vnode)
	    : vnode
	}

	var show = {
	  bind: function bind (el, ref, vnode) {
	    var value = ref.value;

	    vnode = locateNode(vnode);
	    var transition = vnode.data && vnode.data.transition;
	    var originalDisplay = el.__vOriginalDisplay =
	      el.style.display === 'none' ? '' : el.style.display;
	    if (value && transition && !isIE9) {
	      vnode.data.show = true;
	      enter(vnode, function () {
	        el.style.display = originalDisplay;
	      });
	    } else {
	      el.style.display = value ? originalDisplay : 'none';
	    }
	  },

	  update: function update (el, ref, vnode) {
	    var value = ref.value;
	    var oldValue = ref.oldValue;

	    /* istanbul ignore if */
	    if (value === oldValue) { return }
	    vnode = locateNode(vnode);
	    var transition = vnode.data && vnode.data.transition;
	    if (transition && !isIE9) {
	      vnode.data.show = true;
	      if (value) {
	        enter(vnode, function () {
	          el.style.display = el.__vOriginalDisplay;
	        });
	      } else {
	        leave(vnode, function () {
	          el.style.display = 'none';
	        });
	      }
	    } else {
	      el.style.display = value ? el.__vOriginalDisplay : 'none';
	    }
	  },

	  unbind: function unbind (
	    el,
	    binding,
	    vnode,
	    oldVnode,
	    isDestroy
	  ) {
	    if (!isDestroy) {
	      el.style.display = el.__vOriginalDisplay;
	    }
	  }
	};

	var platformDirectives = {
	  model: model,
	  show: show
	};

	/*  */

	// Provides transition support for a single element/component.
	// supports transition mode (out-in / in-out)

	var transitionProps = {
	  name: String,
	  appear: Boolean,
	  css: Boolean,
	  mode: String,
	  type: String,
	  enterClass: String,
	  leaveClass: String,
	  enterToClass: String,
	  leaveToClass: String,
	  enterActiveClass: String,
	  leaveActiveClass: String,
	  appearClass: String,
	  appearActiveClass: String,
	  appearToClass: String
	};

	// in case the child is also an abstract component, e.g. <keep-alive>
	// we want to recursively retrieve the real component to be rendered
	function getRealChild (vnode) {
	  var compOptions = vnode && vnode.componentOptions;
	  if (compOptions && compOptions.Ctor.options.abstract) {
	    return getRealChild(getFirstComponentChild(compOptions.children))
	  } else {
	    return vnode
	  }
	}

	function extractTransitionData (comp) {
	  var data = {};
	  var options = comp.$options;
	  // props
	  for (var key in options.propsData) {
	    data[key] = comp[key];
	  }
	  // events.
	  // extract listeners and pass them directly to the transition methods
	  var listeners = options._parentListeners;
	  for (var key$1 in listeners) {
	    data[camelize(key$1)] = listeners[key$1].fn;
	  }
	  return data
	}

	function placeholder (h, rawChild) {
	  return /\d-keep-alive$/.test(rawChild.tag)
	    ? h('keep-alive')
	    : null
	}

	function hasParentTransition (vnode) {
	  while ((vnode = vnode.parent)) {
	    if (vnode.data.transition) {
	      return true
	    }
	  }
	}

	function isSameChild (child, oldChild) {
	  return oldChild.key === child.key && oldChild.tag === child.tag
	}

	var Transition = {
	  name: 'transition',
	  props: transitionProps,
	  abstract: true,

	  render: function render (h) {
	    var this$1 = this;

	    var children = this.$slots.default;
	    if (!children) {
	      return
	    }

	    // filter out text nodes (possible whitespaces)
	    children = children.filter(function (c) { return c.tag; });
	    /* istanbul ignore if */
	    if (!children.length) {
	      return
	    }

	    // warn multiple elements
	    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
	      warn(
	        '<transition> can only be used on a single element. Use ' +
	        '<transition-group> for lists.',
	        this.$parent
	      );
	    }

	    var mode = this.mode;

	    // warn invalid mode
	    if (process.env.NODE_ENV !== 'production' &&
	        mode && mode !== 'in-out' && mode !== 'out-in') {
	      warn(
	        'invalid <transition> mode: ' + mode,
	        this.$parent
	      );
	    }

	    var rawChild = children[0];

	    // if this is a component root node and the component's
	    // parent container node also has transition, skip.
	    if (hasParentTransition(this.$vnode)) {
	      return rawChild
	    }

	    // apply transition data to child
	    // use getRealChild() to ignore abstract components e.g. keep-alive
	    var child = getRealChild(rawChild);
	    /* istanbul ignore if */
	    if (!child) {
	      return rawChild
	    }

	    if (this._leaving) {
	      return placeholder(h, rawChild)
	    }

	    // ensure a key that is unique to the vnode type and to this transition
	    // component instance. This key will be used to remove pending leaving nodes
	    // during entering.
	    var id = "__transition-" + (this._uid) + "-";
	    var key = child.key = child.key == null
	      ? id + child.tag
	      : isPrimitive(child.key)
	        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
	        : child.key;
	    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
	    var oldRawChild = this._vnode;
	    var oldChild = getRealChild(oldRawChild);

	    // mark v-show
	    // so that the transition module can hand over the control to the directive
	    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
	      child.data.show = true;
	    }

	    if (oldChild && oldChild.data && !isSameChild(child, oldChild)) {
	      // replace old child transition data with fresh one
	      // important for dynamic transitions!
	      var oldData = oldChild && (oldChild.data.transition = extend({}, data));
	      // handle transition mode
	      if (mode === 'out-in') {
	        // return placeholder node and queue update when leave finishes
	        this._leaving = true;
	        mergeVNodeHook(oldData, 'afterLeave', function () {
	          this$1._leaving = false;
	          this$1.$forceUpdate();
	        }, key);
	        return placeholder(h, rawChild)
	      } else if (mode === 'in-out') {
	        var delayedLeave;
	        var performLeave = function () { delayedLeave(); };
	        mergeVNodeHook(data, 'afterEnter', performLeave, key);
	        mergeVNodeHook(data, 'enterCancelled', performLeave, key);
	        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
	          delayedLeave = leave;
	        }, key);
	      }
	    }

	    return rawChild
	  }
	};

	/*  */

	// Provides transition support for list items.
	// supports move transitions using the FLIP technique.

	// Because the vdom's children update algorithm is "unstable" - i.e.
	// it doesn't guarantee the relative positioning of removed elements,
	// we force transition-group to update its children into two passes:
	// in the first pass, we remove all nodes that need to be removed,
	// triggering their leaving transition; in the second pass, we insert/move
	// into the final disired state. This way in the second pass removed
	// nodes will remain where they should be.

	var props = extend({
	  tag: String,
	  moveClass: String
	}, transitionProps);

	delete props.mode;

	var TransitionGroup = {
	  props: props,

	  render: function render (h) {
	    var tag = this.tag || this.$vnode.data.tag || 'span';
	    var map = Object.create(null);
	    var prevChildren = this.prevChildren = this.children;
	    var rawChildren = this.$slots.default || [];
	    var children = this.children = [];
	    var transitionData = extractTransitionData(this);

	    for (var i = 0; i < rawChildren.length; i++) {
	      var c = rawChildren[i];
	      if (c.tag) {
	        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
	          children.push(c);
	          map[c.key] = c
	          ;(c.data || (c.data = {})).transition = transitionData;
	        } else if (process.env.NODE_ENV !== 'production') {
	          var opts = c.componentOptions;
	          var name = opts
	            ? (opts.Ctor.options.name || opts.tag)
	            : c.tag;
	          warn(("<transition-group> children must be keyed: <" + name + ">"));
	        }
	      }
	    }

	    if (prevChildren) {
	      var kept = [];
	      var removed = [];
	      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
	        var c$1 = prevChildren[i$1];
	        c$1.data.transition = transitionData;
	        c$1.data.pos = c$1.elm.getBoundingClientRect();
	        if (map[c$1.key]) {
	          kept.push(c$1);
	        } else {
	          removed.push(c$1);
	        }
	      }
	      this.kept = h(tag, null, kept);
	      this.removed = removed;
	    }

	    return h(tag, null, children)
	  },

	  beforeUpdate: function beforeUpdate () {
	    // force removing pass
	    this.__patch__(
	      this._vnode,
	      this.kept,
	      false, // hydrating
	      true // removeOnly (!important, avoids unnecessary moves)
	    );
	    this._vnode = this.kept;
	  },

	  updated: function updated () {
	    var children = this.prevChildren;
	    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
	    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
	      return
	    }

	    // we divide the work into three loops to avoid mixing DOM reads and writes
	    // in each iteration - which helps prevent layout thrashing.
	    children.forEach(callPendingCbs);
	    children.forEach(recordPosition);
	    children.forEach(applyTranslation);

	    // force reflow to put everything in position
	    var f = document.body.offsetHeight; // eslint-disable-line

	    children.forEach(function (c) {
	      if (c.data.moved) {
	        var el = c.elm;
	        var s = el.style;
	        addTransitionClass(el, moveClass);
	        s.transform = s.WebkitTransform = s.transitionDuration = '';
	        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
	          if (!e || /transform$/.test(e.propertyName)) {
	            el.removeEventListener(transitionEndEvent, cb);
	            el._moveCb = null;
	            removeTransitionClass(el, moveClass);
	          }
	        });
	      }
	    });
	  },

	  methods: {
	    hasMove: function hasMove (el, moveClass) {
	      /* istanbul ignore if */
	      if (!hasTransition) {
	        return false
	      }
	      if (this._hasMove != null) {
	        return this._hasMove
	      }
	      addTransitionClass(el, moveClass);
	      var info = getTransitionInfo(el);
	      removeTransitionClass(el, moveClass);
	      return (this._hasMove = info.hasTransform)
	    }
	  }
	};

	function callPendingCbs (c) {
	  /* istanbul ignore if */
	  if (c.elm._moveCb) {
	    c.elm._moveCb();
	  }
	  /* istanbul ignore if */
	  if (c.elm._enterCb) {
	    c.elm._enterCb();
	  }
	}

	function recordPosition (c) {
	  c.data.newPos = c.elm.getBoundingClientRect();
	}

	function applyTranslation (c) {
	  var oldPos = c.data.pos;
	  var newPos = c.data.newPos;
	  var dx = oldPos.left - newPos.left;
	  var dy = oldPos.top - newPos.top;
	  if (dx || dy) {
	    c.data.moved = true;
	    var s = c.elm.style;
	    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
	    s.transitionDuration = '0s';
	  }
	}

	var platformComponents = {
	  Transition: Transition,
	  TransitionGroup: TransitionGroup
	};

	/*  */

	// install platform specific utils
	Vue$3.config.isUnknownElement = isUnknownElement;
	Vue$3.config.isReservedTag = isReservedTag;
	Vue$3.config.getTagNamespace = getTagNamespace;
	Vue$3.config.mustUseProp = mustUseProp;

	// install platform runtime directives & components
	extend(Vue$3.options.directives, platformDirectives);
	extend(Vue$3.options.components, platformComponents);

	// install platform patch function
	Vue$3.prototype.__patch__ = inBrowser ? patch$1 : noop;

	// wrap mount
	Vue$3.prototype.$mount = function (
	  el,
	  hydrating
	) {
	  el = el && inBrowser ? query(el) : undefined;
	  return this._mount(el, hydrating)
	};

	if (process.env.NODE_ENV !== 'production' &&
	    inBrowser && typeof console !== 'undefined') {
	  console[console.info ? 'info' : 'log'](
	    "You are running Vue in development mode.\n" +
	    "Make sure to turn on production mode when deploying for production.\n" +
	    "See more tips at https://vuejs.org/guide/deployment.html"
	  );
	}

	// devtools global hook
	/* istanbul ignore next */
	setTimeout(function () {
	  if (config.devtools) {
	    if (devtools) {
	      devtools.emit('init', Vue$3);
	    } else if (
	      process.env.NODE_ENV !== 'production' &&
	      inBrowser && !isEdge && /Chrome\/\d+/.test(window.navigator.userAgent)
	    ) {
	      console[console.info ? 'info' : 'log'](
	        'Download the Vue Devtools extension for a better development experience:\n' +
	        'https://github.com/vuejs/vue-devtools'
	      );
	    }
	  }
	}, 0);

	/*  */

	// check whether current browser encodes a char inside attribute values
	function shouldDecode (content, encoded) {
	  var div = document.createElement('div');
	  div.innerHTML = "<div a=\"" + content + "\">";
	  return div.innerHTML.indexOf(encoded) > 0
	}

	// #3663
	// IE encodes newlines inside attribute values while other browsers don't
	var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;

	/*  */

	var decoder;

	function decode (html) {
	  decoder = decoder || document.createElement('div');
	  decoder.innerHTML = html;
	  return decoder.textContent
	}

	/*  */

	var isUnaryTag = makeMap(
	  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
	  'link,meta,param,source,track,wbr',
	  true
	);

	// Elements that you can, intentionally, leave open
	// (and which close themselves)
	var canBeLeftOpenTag = makeMap(
	  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source',
	  true
	);

	// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
	// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
	var isNonPhrasingTag = makeMap(
	  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
	  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
	  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
	  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
	  'title,tr,track',
	  true
	);

	/**
	 * Not type-checking this file because it's mostly vendor code.
	 */

	/*!
	 * HTML Parser By John Resig (ejohn.org)
	 * Modified by Juriy "kangax" Zaytsev
	 * Original code by Erik Arvidsson, Mozilla Public License
	 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
	 */

	// Regular Expressions for parsing tags and attributes
	var singleAttrIdentifier = /([^\s"'<>/=]+)/;
	var singleAttrAssign = /(?:=)/;
	var singleAttrValues = [
	  // attr value double quotes
	  /"([^"]*)"+/.source,
	  // attr value, single quotes
	  /'([^']*)'+/.source,
	  // attr value, no quotes
	  /([^\s"'=<>`]+)/.source
	];
	var attribute = new RegExp(
	  '^\\s*' + singleAttrIdentifier.source +
	  '(?:\\s*(' + singleAttrAssign.source + ')' +
	  '\\s*(?:' + singleAttrValues.join('|') + '))?'
	);

	// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
	// but for Vue templates we can enforce a simple charset
	var ncname = '[a-zA-Z_][\\w\\-\\.]*';
	var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
	var startTagOpen = new RegExp('^<' + qnameCapture);
	var startTagClose = /^\s*(\/?)>/;
	var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
	var doctype = /^<!DOCTYPE [^>]+>/i;
	var comment = /^<!--/;
	var conditionalComment = /^<!\[/;

	var IS_REGEX_CAPTURING_BROKEN = false;
	'x'.replace(/x(.)?/g, function (m, g) {
	  IS_REGEX_CAPTURING_BROKEN = g === '';
	});

	// Special Elements (can contain anything)
	var isScriptOrStyle = makeMap('script,style', true);
	var reCache = {};

	var ltRE = /&lt;/g;
	var gtRE = /&gt;/g;
	var nlRE = /&#10;/g;
	var ampRE = /&amp;/g;
	var quoteRE = /&quot;/g;

	function decodeAttr (value, shouldDecodeNewlines) {
	  if (shouldDecodeNewlines) {
	    value = value.replace(nlRE, '\n');
	  }
	  return value
	    .replace(ltRE, '<')
	    .replace(gtRE, '>')
	    .replace(ampRE, '&')
	    .replace(quoteRE, '"')
	}

	function parseHTML (html, options) {
	  var stack = [];
	  var expectHTML = options.expectHTML;
	  var isUnaryTag$$1 = options.isUnaryTag || no;
	  var index = 0;
	  var last, lastTag;
	  while (html) {
	    last = html;
	    // Make sure we're not in a script or style element
	    if (!lastTag || !isScriptOrStyle(lastTag)) {
	      var textEnd = html.indexOf('<');
	      if (textEnd === 0) {
	        // Comment:
	        if (comment.test(html)) {
	          var commentEnd = html.indexOf('-->');

	          if (commentEnd >= 0) {
	            advance(commentEnd + 3);
	            continue
	          }
	        }

	        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
	        if (conditionalComment.test(html)) {
	          var conditionalEnd = html.indexOf(']>');

	          if (conditionalEnd >= 0) {
	            advance(conditionalEnd + 2);
	            continue
	          }
	        }

	        // Doctype:
	        var doctypeMatch = html.match(doctype);
	        if (doctypeMatch) {
	          advance(doctypeMatch[0].length);
	          continue
	        }

	        // End tag:
	        var endTagMatch = html.match(endTag);
	        if (endTagMatch) {
	          var curIndex = index;
	          advance(endTagMatch[0].length);
	          parseEndTag(endTagMatch[1], curIndex, index);
	          continue
	        }

	        // Start tag:
	        var startTagMatch = parseStartTag();
	        if (startTagMatch) {
	          handleStartTag(startTagMatch);
	          continue
	        }
	      }

	      var text = (void 0), rest$1 = (void 0), next = (void 0);
	      if (textEnd > 0) {
	        rest$1 = html.slice(textEnd);
	        while (
	          !endTag.test(rest$1) &&
	          !startTagOpen.test(rest$1) &&
	          !comment.test(rest$1) &&
	          !conditionalComment.test(rest$1)
	        ) {
	          // < in plain text, be forgiving and treat it as text
	          next = rest$1.indexOf('<', 1);
	          if (next < 0) { break }
	          textEnd += next;
	          rest$1 = html.slice(textEnd);
	        }
	        text = html.substring(0, textEnd);
	        advance(textEnd);
	      }

	      if (textEnd < 0) {
	        text = html;
	        html = '';
	      }

	      if (options.chars && text) {
	        options.chars(text);
	      }
	    } else {
	      var stackedTag = lastTag.toLowerCase();
	      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
	      var endTagLength = 0;
	      var rest = html.replace(reStackedTag, function (all, text, endTag) {
	        endTagLength = endTag.length;
	        if (stackedTag !== 'script' && stackedTag !== 'style' && stackedTag !== 'noscript') {
	          text = text
	            .replace(/<!--([\s\S]*?)-->/g, '$1')
	            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
	        }
	        if (options.chars) {
	          options.chars(text);
	        }
	        return ''
	      });
	      index += html.length - rest.length;
	      html = rest;
	      parseEndTag(stackedTag, index - endTagLength, index);
	    }

	    if (html === last && options.chars) {
	      options.chars(html);
	      break
	    }
	  }

	  // Clean up any remaining tags
	  parseEndTag();

	  function advance (n) {
	    index += n;
	    html = html.substring(n);
	  }

	  function parseStartTag () {
	    var start = html.match(startTagOpen);
	    if (start) {
	      var match = {
	        tagName: start[1],
	        attrs: [],
	        start: index
	      };
	      advance(start[0].length);
	      var end, attr;
	      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
	        advance(attr[0].length);
	        match.attrs.push(attr);
	      }
	      if (end) {
	        match.unarySlash = end[1];
	        advance(end[0].length);
	        match.end = index;
	        return match
	      }
	    }
	  }

	  function handleStartTag (match) {
	    var tagName = match.tagName;
	    var unarySlash = match.unarySlash;

	    if (expectHTML) {
	      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
	        parseEndTag(lastTag);
	      }
	      if (canBeLeftOpenTag(tagName) && lastTag === tagName) {
	        parseEndTag(tagName);
	      }
	    }

	    var unary = isUnaryTag$$1(tagName) || tagName === 'html' && lastTag === 'head' || !!unarySlash;

	    var l = match.attrs.length;
	    var attrs = new Array(l);
	    for (var i = 0; i < l; i++) {
	      var args = match.attrs[i];
	      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
	      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
	        if (args[3] === '') { delete args[3]; }
	        if (args[4] === '') { delete args[4]; }
	        if (args[5] === '') { delete args[5]; }
	      }
	      var value = args[3] || args[4] || args[5] || '';
	      attrs[i] = {
	        name: args[1],
	        value: decodeAttr(
	          value,
	          options.shouldDecodeNewlines
	        )
	      };
	    }

	    if (!unary) {
	      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
	      lastTag = tagName;
	      unarySlash = '';
	    }

	    if (options.start) {
	      options.start(tagName, attrs, unary, match.start, match.end);
	    }
	  }

	  function parseEndTag (tagName, start, end) {
	    var pos, lowerCasedTagName;
	    if (start == null) { start = index; }
	    if (end == null) { end = index; }

	    if (tagName) {
	      lowerCasedTagName = tagName.toLowerCase();
	    }

	    // Find the closest opened tag of the same type
	    if (tagName) {
	      for (pos = stack.length - 1; pos >= 0; pos--) {
	        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
	          break
	        }
	      }
	    } else {
	      // If no tag name is provided, clean shop
	      pos = 0;
	    }

	    if (pos >= 0) {
	      // Close all the open elements, up the stack
	      for (var i = stack.length - 1; i >= pos; i--) {
	        if (options.end) {
	          options.end(stack[i].tag, start, end);
	        }
	      }

	      // Remove the open elements from the stack
	      stack.length = pos;
	      lastTag = pos && stack[pos - 1].tag;
	    } else if (lowerCasedTagName === 'br') {
	      if (options.start) {
	        options.start(tagName, [], true, start, end);
	      }
	    } else if (lowerCasedTagName === 'p') {
	      if (options.start) {
	        options.start(tagName, [], false, start, end);
	      }
	      if (options.end) {
	        options.end(tagName, start, end);
	      }
	    }
	  }
	}

	/*  */

	function parseFilters (exp) {
	  var inSingle = false;
	  var inDouble = false;
	  var inTemplateString = false;
	  var inRegex = false;
	  var curly = 0;
	  var square = 0;
	  var paren = 0;
	  var lastFilterIndex = 0;
	  var c, prev, i, expression, filters;

	  for (i = 0; i < exp.length; i++) {
	    prev = c;
	    c = exp.charCodeAt(i);
	    if (inSingle) {
	      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
	    } else if (inDouble) {
	      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
	    } else if (inTemplateString) {
	      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
	    } else if (inRegex) {
	      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
	    } else if (
	      c === 0x7C && // pipe
	      exp.charCodeAt(i + 1) !== 0x7C &&
	      exp.charCodeAt(i - 1) !== 0x7C &&
	      !curly && !square && !paren
	    ) {
	      if (expression === undefined) {
	        // first filter, end of expression
	        lastFilterIndex = i + 1;
	        expression = exp.slice(0, i).trim();
	      } else {
	        pushFilter();
	      }
	    } else {
	      switch (c) {
	        case 0x22: inDouble = true; break         // "
	        case 0x27: inSingle = true; break         // '
	        case 0x60: inTemplateString = true; break // `
	        case 0x28: paren++; break                 // (
	        case 0x29: paren--; break                 // )
	        case 0x5B: square++; break                // [
	        case 0x5D: square--; break                // ]
	        case 0x7B: curly++; break                 // {
	        case 0x7D: curly--; break                 // }
	      }
	      if (c === 0x2f) { // /
	        var j = i - 1;
	        var p = (void 0);
	        // find first non-whitespace prev char
	        for (; j >= 0; j--) {
	          p = exp.charAt(j);
	          if (p !== ' ') { break }
	        }
	        if (!p || !/[\w$]/.test(p)) {
	          inRegex = true;
	        }
	      }
	    }
	  }

	  if (expression === undefined) {
	    expression = exp.slice(0, i).trim();
	  } else if (lastFilterIndex !== 0) {
	    pushFilter();
	  }

	  function pushFilter () {
	    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
	    lastFilterIndex = i + 1;
	  }

	  if (filters) {
	    for (i = 0; i < filters.length; i++) {
	      expression = wrapFilter(expression, filters[i]);
	    }
	  }

	  return expression
	}

	function wrapFilter (exp, filter) {
	  var i = filter.indexOf('(');
	  if (i < 0) {
	    // _f: resolveFilter
	    return ("_f(\"" + filter + "\")(" + exp + ")")
	  } else {
	    var name = filter.slice(0, i);
	    var args = filter.slice(i + 1);
	    return ("_f(\"" + name + "\")(" + exp + "," + args)
	  }
	}

	/*  */

	var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

	var buildRegex = cached(function (delimiters) {
	  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
	  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
	  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
	});

	function parseText (
	  text,
	  delimiters
	) {
	  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
	  if (!tagRE.test(text)) {
	    return
	  }
	  var tokens = [];
	  var lastIndex = tagRE.lastIndex = 0;
	  var match, index;
	  while ((match = tagRE.exec(text))) {
	    index = match.index;
	    // push text token
	    if (index > lastIndex) {
	      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
	    }
	    // tag token
	    var exp = parseFilters(match[1].trim());
	    tokens.push(("_s(" + exp + ")"));
	    lastIndex = index + match[0].length;
	  }
	  if (lastIndex < text.length) {
	    tokens.push(JSON.stringify(text.slice(lastIndex)));
	  }
	  return tokens.join('+')
	}

	/*  */

	function baseWarn (msg) {
	  console.error(("[Vue parser]: " + msg));
	}

	function pluckModuleFunction (
	  modules,
	  key
	) {
	  return modules
	    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
	    : []
	}

	function addProp (el, name, value) {
	  (el.props || (el.props = [])).push({ name: name, value: value });
	}

	function addAttr (el, name, value) {
	  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
	}

	function addDirective (
	  el,
	  name,
	  rawName,
	  value,
	  arg,
	  modifiers
	) {
	  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
	}

	function addHandler (
	  el,
	  name,
	  value,
	  modifiers,
	  important
	) {
	  // check capture modifier
	  if (modifiers && modifiers.capture) {
	    delete modifiers.capture;
	    name = '!' + name; // mark the event as captured
	  }
	  if (modifiers && modifiers.once) {
	    delete modifiers.once;
	    name = '~' + name; // mark the event as once
	  }
	  var events;
	  if (modifiers && modifiers.native) {
	    delete modifiers.native;
	    events = el.nativeEvents || (el.nativeEvents = {});
	  } else {
	    events = el.events || (el.events = {});
	  }
	  var newHandler = { value: value, modifiers: modifiers };
	  var handlers = events[name];
	  /* istanbul ignore if */
	  if (Array.isArray(handlers)) {
	    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
	  } else if (handlers) {
	    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
	  } else {
	    events[name] = newHandler;
	  }
	}

	function getBindingAttr (
	  el,
	  name,
	  getStatic
	) {
	  var dynamicValue =
	    getAndRemoveAttr(el, ':' + name) ||
	    getAndRemoveAttr(el, 'v-bind:' + name);
	  if (dynamicValue != null) {
	    return parseFilters(dynamicValue)
	  } else if (getStatic !== false) {
	    var staticValue = getAndRemoveAttr(el, name);
	    if (staticValue != null) {
	      return JSON.stringify(staticValue)
	    }
	  }
	}

	function getAndRemoveAttr (el, name) {
	  var val;
	  if ((val = el.attrsMap[name]) != null) {
	    var list = el.attrsList;
	    for (var i = 0, l = list.length; i < l; i++) {
	      if (list[i].name === name) {
	        list.splice(i, 1);
	        break
	      }
	    }
	  }
	  return val
	}

	var len;
	var str;
	var chr;
	var index$1;
	var expressionPos;
	var expressionEndPos;

	/**
	 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
	 *
	 * for loop possible cases:
	 *
	 * - test
	 * - test[idx]
	 * - test[test1[idx]]
	 * - test["a"][idx]
	 * - xxx.test[a[a].test1[idx]]
	 * - test.xxx.a["asa"][test1[idx]]
	 *
	 */

	function parseModel (val) {
	  str = val;
	  len = str.length;
	  index$1 = expressionPos = expressionEndPos = 0;

	  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
	    return {
	      exp: val,
	      idx: null
	    }
	  }

	  while (!eof()) {
	    chr = next();
	    /* istanbul ignore if */
	    if (isStringStart(chr)) {
	      parseString(chr);
	    } else if (chr === 0x5B) {
	      parseBracket(chr);
	    }
	  }

	  return {
	    exp: val.substring(0, expressionPos),
	    idx: val.substring(expressionPos + 1, expressionEndPos)
	  }
	}

	function next () {
	  return str.charCodeAt(++index$1)
	}

	function eof () {
	  return index$1 >= len
	}

	function isStringStart (chr) {
	  return chr === 0x22 || chr === 0x27
	}

	function parseBracket (chr) {
	  var inBracket = 1;
	  expressionPos = index$1;
	  while (!eof()) {
	    chr = next();
	    if (isStringStart(chr)) {
	      parseString(chr);
	      continue
	    }
	    if (chr === 0x5B) { inBracket++; }
	    if (chr === 0x5D) { inBracket--; }
	    if (inBracket === 0) {
	      expressionEndPos = index$1;
	      break
	    }
	  }
	}

	function parseString (chr) {
	  var stringQuote = chr;
	  while (!eof()) {
	    chr = next();
	    if (chr === stringQuote) {
	      break
	    }
	  }
	}

	/*  */

	var dirRE = /^v-|^@|^:/;
	var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
	var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;
	var bindRE = /^:|^v-bind:/;
	var onRE = /^@|^v-on:/;
	var argRE = /:(.*)$/;
	var modifierRE = /\.[^.]+/g;

	var decodeHTMLCached = cached(decode);

	// configurable state
	var warn$1;
	var platformGetTagNamespace;
	var platformMustUseProp;
	var platformIsPreTag;
	var preTransforms;
	var transforms;
	var postTransforms;
	var delimiters;

	/**
	 * Convert HTML string to AST.
	 */
	function parse (
	  template,
	  options
	) {
	  warn$1 = options.warn || baseWarn;
	  platformGetTagNamespace = options.getTagNamespace || no;
	  platformMustUseProp = options.mustUseProp || no;
	  platformIsPreTag = options.isPreTag || no;
	  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
	  transforms = pluckModuleFunction(options.modules, 'transformNode');
	  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');
	  delimiters = options.delimiters;
	  var stack = [];
	  var preserveWhitespace = options.preserveWhitespace !== false;
	  var root;
	  var currentParent;
	  var inVPre = false;
	  var inPre = false;
	  var warned = false;
	  parseHTML(template, {
	    expectHTML: options.expectHTML,
	    isUnaryTag: options.isUnaryTag,
	    shouldDecodeNewlines: options.shouldDecodeNewlines,
	    start: function start (tag, attrs, unary) {
	      // check namespace.
	      // inherit parent ns if there is one
	      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

	      // handle IE svg bug
	      /* istanbul ignore if */
	      if (isIE && ns === 'svg') {
	        attrs = guardIESVGBug(attrs);
	      }

	      var element = {
	        type: 1,
	        tag: tag,
	        attrsList: attrs,
	        attrsMap: makeAttrsMap(attrs),
	        parent: currentParent,
	        children: []
	      };
	      if (ns) {
	        element.ns = ns;
	      }

	      if (isForbiddenTag(element) && !isServerRendering()) {
	        element.forbidden = true;
	        process.env.NODE_ENV !== 'production' && warn$1(
	          'Templates should only be responsible for mapping the state to the ' +
	          'UI. Avoid placing tags with side-effects in your templates, such as ' +
	          "<" + tag + ">" + ', as they will not be parsed.'
	        );
	      }

	      // apply pre-transforms
	      for (var i = 0; i < preTransforms.length; i++) {
	        preTransforms[i](element, options);
	      }

	      if (!inVPre) {
	        processPre(element);
	        if (element.pre) {
	          inVPre = true;
	        }
	      }
	      if (platformIsPreTag(element.tag)) {
	        inPre = true;
	      }
	      if (inVPre) {
	        processRawAttrs(element);
	      } else {
	        processFor(element);
	        processIf(element);
	        processOnce(element);
	        processKey(element);

	        // determine whether this is a plain element after
	        // removing structural attributes
	        element.plain = !element.key && !attrs.length;

	        processRef(element);
	        processSlot(element);
	        processComponent(element);
	        for (var i$1 = 0; i$1 < transforms.length; i$1++) {
	          transforms[i$1](element, options);
	        }
	        processAttrs(element);
	      }

	      function checkRootConstraints (el) {
	        if (process.env.NODE_ENV !== 'production' && !warned) {
	          if (el.tag === 'slot' || el.tag === 'template') {
	            warned = true;
	            warn$1(
	              "Cannot use <" + (el.tag) + "> as component root element because it may " +
	              'contain multiple nodes:\n' + template
	            );
	          }
	          if (el.attrsMap.hasOwnProperty('v-for')) {
	            warned = true;
	            warn$1(
	              'Cannot use v-for on stateful component root element because ' +
	              'it renders multiple elements:\n' + template
	            );
	          }
	        }
	      }

	      // tree management
	      if (!root) {
	        root = element;
	        checkRootConstraints(root);
	      } else if (!stack.length) {
	        // allow root elements with v-if, v-else-if and v-else
	        if (root.if && (element.elseif || element.else)) {
	          checkRootConstraints(element);
	          addIfCondition(root, {
	            exp: element.elseif,
	            block: element
	          });
	        } else if (process.env.NODE_ENV !== 'production' && !warned) {
	          warned = true;
	          warn$1(
	            "Component template should contain exactly one root element:" +
	            "\n\n" + template + "\n\n" +
	            "If you are using v-if on multiple elements, " +
	            "use v-else-if to chain them instead."
	          );
	        }
	      }
	      if (currentParent && !element.forbidden) {
	        if (element.elseif || element.else) {
	          processIfConditions(element, currentParent);
	        } else if (element.slotScope) { // scoped slot
	          currentParent.plain = false;
	          var name = element.slotTarget || 'default';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
	        } else {
	          currentParent.children.push(element);
	          element.parent = currentParent;
	        }
	      }
	      if (!unary) {
	        currentParent = element;
	        stack.push(element);
	      }
	      // apply post-transforms
	      for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
	        postTransforms[i$2](element, options);
	      }
	    },

	    end: function end () {
	      // remove trailing whitespace
	      var element = stack[stack.length - 1];
	      var lastNode = element.children[element.children.length - 1];
	      if (lastNode && lastNode.type === 3 && lastNode.text === ' ') {
	        element.children.pop();
	      }
	      // pop stack
	      stack.length -= 1;
	      currentParent = stack[stack.length - 1];
	      // check pre state
	      if (element.pre) {
	        inVPre = false;
	      }
	      if (platformIsPreTag(element.tag)) {
	        inPre = false;
	      }
	    },

	    chars: function chars (text) {
	      if (!currentParent) {
	        if (process.env.NODE_ENV !== 'production' && !warned && text === template) {
	          warned = true;
	          warn$1(
	            'Component template requires a root element, rather than just text:\n\n' + template
	          );
	        }
	        return
	      }
	      // IE textarea placeholder bug
	      /* istanbul ignore if */
	      if (isIE &&
	          currentParent.tag === 'textarea' &&
	          currentParent.attrsMap.placeholder === text) {
	        return
	      }
	      var children = currentParent.children;
	      text = inPre || text.trim()
	        ? decodeHTMLCached(text)
	        // only preserve whitespace if its not right after a starting tag
	        : preserveWhitespace && children.length ? ' ' : '';
	      if (text) {
	        var expression;
	        if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
	          children.push({
	            type: 2,
	            expression: expression,
	            text: text
	          });
	        } else if (text !== ' ' || children[children.length - 1].text !== ' ') {
	          currentParent.children.push({
	            type: 3,
	            text: text
	          });
	        }
	      }
	    }
	  });
	  return root
	}

	function processPre (el) {
	  if (getAndRemoveAttr(el, 'v-pre') != null) {
	    el.pre = true;
	  }
	}

	function processRawAttrs (el) {
	  var l = el.attrsList.length;
	  if (l) {
	    var attrs = el.attrs = new Array(l);
	    for (var i = 0; i < l; i++) {
	      attrs[i] = {
	        name: el.attrsList[i].name,
	        value: JSON.stringify(el.attrsList[i].value)
	      };
	    }
	  } else if (!el.pre) {
	    // non root node in pre blocks with no attributes
	    el.plain = true;
	  }
	}

	function processKey (el) {
	  var exp = getBindingAttr(el, 'key');
	  if (exp) {
	    if (process.env.NODE_ENV !== 'production' && el.tag === 'template') {
	      warn$1("<template> cannot be keyed. Place the key on real elements instead.");
	    }
	    el.key = exp;
	  }
	}

	function processRef (el) {
	  var ref = getBindingAttr(el, 'ref');
	  if (ref) {
	    el.ref = ref;
	    el.refInFor = checkInFor(el);
	  }
	}

	function processFor (el) {
	  var exp;
	  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
	    var inMatch = exp.match(forAliasRE);
	    if (!inMatch) {
	      process.env.NODE_ENV !== 'production' && warn$1(
	        ("Invalid v-for expression: " + exp)
	      );
	      return
	    }
	    el.for = inMatch[2].trim();
	    var alias = inMatch[1].trim();
	    var iteratorMatch = alias.match(forIteratorRE);
	    if (iteratorMatch) {
	      el.alias = iteratorMatch[1].trim();
	      el.iterator1 = iteratorMatch[2].trim();
	      if (iteratorMatch[3]) {
	        el.iterator2 = iteratorMatch[3].trim();
	      }
	    } else {
	      el.alias = alias;
	    }
	  }
	}

	function processIf (el) {
	  var exp = getAndRemoveAttr(el, 'v-if');
	  if (exp) {
	    el.if = exp;
	    addIfCondition(el, {
	      exp: exp,
	      block: el
	    });
	  } else {
	    if (getAndRemoveAttr(el, 'v-else') != null) {
	      el.else = true;
	    }
	    var elseif = getAndRemoveAttr(el, 'v-else-if');
	    if (elseif) {
	      el.elseif = elseif;
	    }
	  }
	}

	function processIfConditions (el, parent) {
	  var prev = findPrevElement(parent.children);
	  if (prev && prev.if) {
	    addIfCondition(prev, {
	      exp: el.elseif,
	      block: el
	    });
	  } else if (process.env.NODE_ENV !== 'production') {
	    warn$1(
	      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
	      "used on element <" + (el.tag) + "> without corresponding v-if."
	    );
	  }
	}

	function findPrevElement (children) {
	  var i = children.length;
	  while (i--) {
	    if (children[i].type === 1) {
	      return children[i]
	    } else {
	      if (process.env.NODE_ENV !== 'production' && children[i].text !== ' ') {
	        warn$1(
	          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
	          "will be ignored."
	        );
	      }
	      children.pop();
	    }
	  }
	}

	function addIfCondition (el, condition) {
	  if (!el.ifConditions) {
	    el.ifConditions = [];
	  }
	  el.ifConditions.push(condition);
	}

	function processOnce (el) {
	  var once = getAndRemoveAttr(el, 'v-once');
	  if (once != null) {
	    el.once = true;
	  }
	}

	function processSlot (el) {
	  if (el.tag === 'slot') {
	    el.slotName = getBindingAttr(el, 'name');
	    if (process.env.NODE_ENV !== 'production' && el.key) {
	      warn$1(
	        "`key` does not work on <slot> because slots are abstract outlets " +
	        "and can possibly expand into multiple elements. " +
	        "Use the key on a wrapping element instead."
	      );
	    }
	  } else {
	    var slotTarget = getBindingAttr(el, 'slot');
	    if (slotTarget) {
	      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
	    }
	    if (el.tag === 'template') {
	      el.slotScope = getAndRemoveAttr(el, 'scope');
	    }
	  }
	}

	function processComponent (el) {
	  var binding;
	  if ((binding = getBindingAttr(el, 'is'))) {
	    el.component = binding;
	  }
	  if (getAndRemoveAttr(el, 'inline-template') != null) {
	    el.inlineTemplate = true;
	  }
	}

	function processAttrs (el) {
	  var list = el.attrsList;
	  var i, l, name, rawName, value, arg, modifiers, isProp;
	  for (i = 0, l = list.length; i < l; i++) {
	    name = rawName = list[i].name;
	    value = list[i].value;
	    if (dirRE.test(name)) {
	      // mark element as dynamic
	      el.hasBindings = true;
	      // modifiers
	      modifiers = parseModifiers(name);
	      if (modifiers) {
	        name = name.replace(modifierRE, '');
	      }
	      if (bindRE.test(name)) { // v-bind
	        name = name.replace(bindRE, '');
	        value = parseFilters(value);
	        isProp = false;
	        if (modifiers) {
	          if (modifiers.prop) {
	            isProp = true;
	            name = camelize(name);
	            if (name === 'innerHtml') { name = 'innerHTML'; }
	          }
	          if (modifiers.camel) {
	            name = camelize(name);
	          }
	        }
	        if (isProp || platformMustUseProp(el.tag, el.attrsMap.type, name)) {
	          addProp(el, name, value);
	        } else {
	          addAttr(el, name, value);
	        }
	      } else if (onRE.test(name)) { // v-on
	        name = name.replace(onRE, '');
	        addHandler(el, name, value, modifiers);
	      } else { // normal directives
	        name = name.replace(dirRE, '');
	        // parse arg
	        var argMatch = name.match(argRE);
	        if (argMatch && (arg = argMatch[1])) {
	          name = name.slice(0, -(arg.length + 1));
	        }
	        addDirective(el, name, rawName, value, arg, modifiers);
	        if (process.env.NODE_ENV !== 'production' && name === 'model') {
	          checkForAliasModel(el, value);
	        }
	      }
	    } else {
	      // literal attribute
	      if (process.env.NODE_ENV !== 'production') {
	        var expression = parseText(value, delimiters);
	        if (expression) {
	          warn$1(
	            name + "=\"" + value + "\": " +
	            'Interpolation inside attributes has been removed. ' +
	            'Use v-bind or the colon shorthand instead. For example, ' +
	            'instead of <div id="{{ val }}">, use <div :id="val">.'
	          );
	        }
	      }
	      addAttr(el, name, JSON.stringify(value));
	    }
	  }
	}

	function checkInFor (el) {
	  var parent = el;
	  while (parent) {
	    if (parent.for !== undefined) {
	      return true
	    }
	    parent = parent.parent;
	  }
	  return false
	}

	function parseModifiers (name) {
	  var match = name.match(modifierRE);
	  if (match) {
	    var ret = {};
	    match.forEach(function (m) { ret[m.slice(1)] = true; });
	    return ret
	  }
	}

	function makeAttrsMap (attrs) {
	  var map = {};
	  for (var i = 0, l = attrs.length; i < l; i++) {
	    if (process.env.NODE_ENV !== 'production' && map[attrs[i].name] && !isIE) {
	      warn$1('duplicate attribute: ' + attrs[i].name);
	    }
	    map[attrs[i].name] = attrs[i].value;
	  }
	  return map
	}

	function isForbiddenTag (el) {
	  return (
	    el.tag === 'style' ||
	    (el.tag === 'script' && (
	      !el.attrsMap.type ||
	      el.attrsMap.type === 'text/javascript'
	    ))
	  )
	}

	var ieNSBug = /^xmlns:NS\d+/;
	var ieNSPrefix = /^NS\d+:/;

	/* istanbul ignore next */
	function guardIESVGBug (attrs) {
	  var res = [];
	  for (var i = 0; i < attrs.length; i++) {
	    var attr = attrs[i];
	    if (!ieNSBug.test(attr.name)) {
	      attr.name = attr.name.replace(ieNSPrefix, '');
	      res.push(attr);
	    }
	  }
	  return res
	}

	function checkForAliasModel (el, value) {
	  var _el = el;
	  while (_el) {
	    if (_el.for && _el.alias === value) {
	      warn$1(
	        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
	        "You are binding v-model directly to a v-for iteration alias. " +
	        "This will not be able to modify the v-for source array because " +
	        "writing to the alias is like modifying a function local variable. " +
	        "Consider using an array of objects and use v-model on an object property instead."
	      );
	    }
	    _el = _el.parent;
	  }
	}

	/*  */

	var isStaticKey;
	var isPlatformReservedTag;

	var genStaticKeysCached = cached(genStaticKeys$1);

	/**
	 * Goal of the optimizer: walk the generated template AST tree
	 * and detect sub-trees that are purely static, i.e. parts of
	 * the DOM that never needs to change.
	 *
	 * Once we detect these sub-trees, we can:
	 *
	 * 1. Hoist them into constants, so that we no longer need to
	 *    create fresh nodes for them on each re-render;
	 * 2. Completely skip them in the patching process.
	 */
	function optimize (root, options) {
	  if (!root) { return }
	  isStaticKey = genStaticKeysCached(options.staticKeys || '');
	  isPlatformReservedTag = options.isReservedTag || no;
	  // first pass: mark all non-static nodes.
	  markStatic(root);
	  // second pass: mark static roots.
	  markStaticRoots(root, false);
	}

	function genStaticKeys$1 (keys) {
	  return makeMap(
	    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
	    (keys ? ',' + keys : '')
	  )
	}

	function markStatic (node) {
	  node.static = isStatic(node);
	  if (node.type === 1) {
	    // do not make component slot content static. this avoids
	    // 1. components not able to mutate slot nodes
	    // 2. static slot content fails for hot-reloading
	    if (
	      !isPlatformReservedTag(node.tag) &&
	      node.tag !== 'slot' &&
	      node.attrsMap['inline-template'] == null
	    ) {
	      return
	    }
	    for (var i = 0, l = node.children.length; i < l; i++) {
	      var child = node.children[i];
	      markStatic(child);
	      if (!child.static) {
	        node.static = false;
	      }
	    }
	  }
	}

	function markStaticRoots (node, isInFor) {
	  if (node.type === 1) {
	    if (node.static || node.once) {
	      node.staticInFor = isInFor;
	    }
	    // For a node to qualify as a static root, it should have children that
	    // are not just static text. Otherwise the cost of hoisting out will
	    // outweigh the benefits and it's better off to just always render it fresh.
	    if (node.static && node.children.length && !(
	      node.children.length === 1 &&
	      node.children[0].type === 3
	    )) {
	      node.staticRoot = true;
	      return
	    } else {
	      node.staticRoot = false;
	    }
	    if (node.children) {
	      for (var i = 0, l = node.children.length; i < l; i++) {
	        markStaticRoots(node.children[i], isInFor || !!node.for);
	      }
	    }
	    if (node.ifConditions) {
	      walkThroughConditionsBlocks(node.ifConditions, isInFor);
	    }
	  }
	}

	function walkThroughConditionsBlocks (conditionBlocks, isInFor) {
	  for (var i = 1, len = conditionBlocks.length; i < len; i++) {
	    markStaticRoots(conditionBlocks[i].block, isInFor);
	  }
	}

	function isStatic (node) {
	  if (node.type === 2) { // expression
	    return false
	  }
	  if (node.type === 3) { // text
	    return true
	  }
	  return !!(node.pre || (
	    !node.hasBindings && // no dynamic bindings
	    !node.if && !node.for && // not v-if or v-for or v-else
	    !isBuiltInTag(node.tag) && // not a built-in
	    isPlatformReservedTag(node.tag) && // not a component
	    !isDirectChildOfTemplateFor(node) &&
	    Object.keys(node).every(isStaticKey)
	  ))
	}

	function isDirectChildOfTemplateFor (node) {
	  while (node.parent) {
	    node = node.parent;
	    if (node.tag !== 'template') {
	      return false
	    }
	    if (node.for) {
	      return true
	    }
	  }
	  return false
	}

	/*  */

	var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
	var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40,
	  'delete': [8, 46]
	};

	var modifierCode = {
	  stop: '$event.stopPropagation();',
	  prevent: '$event.preventDefault();',
	  self: 'if($event.target !== $event.currentTarget)return;',
	  ctrl: 'if(!$event.ctrlKey)return;',
	  shift: 'if(!$event.shiftKey)return;',
	  alt: 'if(!$event.altKey)return;',
	  meta: 'if(!$event.metaKey)return;'
	};

	function genHandlers (events, native) {
	  var res = native ? 'nativeOn:{' : 'on:{';
	  for (var name in events) {
	    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
	  }
	  return res.slice(0, -1) + '}'
	}

	function genHandler (
	  name,
	  handler
	) {
	  if (!handler) {
	    return 'function(){}'
	  } else if (Array.isArray(handler)) {
	    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
	  } else if (!handler.modifiers) {
	    return fnExpRE.test(handler.value) || simplePathRE.test(handler.value)
	      ? handler.value
	      : ("function($event){" + (handler.value) + "}")
	  } else {
	    var code = '';
	    var keys = [];
	    for (var key in handler.modifiers) {
	      if (modifierCode[key]) {
	        code += modifierCode[key];
	      } else {
	        keys.push(key);
	      }
	    }
	    if (keys.length) {
	      code = genKeyFilter(keys) + code;
	    }
	    var handlerCode = simplePathRE.test(handler.value)
	      ? handler.value + '($event)'
	      : handler.value;
	    return 'function($event){' + code + handlerCode + '}'
	  }
	}

	function genKeyFilter (keys) {
	  return ("if(" + (keys.map(genFilterCode).join('&&')) + ")return;")
	}

	function genFilterCode (key) {
	  var keyVal = parseInt(key, 10);
	  if (keyVal) {
	    return ("$event.keyCode!==" + keyVal)
	  }
	  var alias = keyCodes[key];
	  return ("_k($event.keyCode," + (JSON.stringify(key)) + (alias ? ',' + JSON.stringify(alias) : '') + ")")
	}

	/*  */

	function bind$2 (el, dir) {
	  el.wrapData = function (code) {
	    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + (dir.modifiers && dir.modifiers.prop ? ',true' : '') + ")")
	  };
	}

	/*  */

	var baseDirectives = {
	  bind: bind$2,
	  cloak: noop
	};

	/*  */

	// configurable state
	var warn$2;
	var transforms$1;
	var dataGenFns;
	var platformDirectives$1;
	var isPlatformReservedTag$1;
	var staticRenderFns;
	var onceCount;
	var currentOptions;

	function generate (
	  ast,
	  options
	) {
	  // save previous staticRenderFns so generate calls can be nested
	  var prevStaticRenderFns = staticRenderFns;
	  var currentStaticRenderFns = staticRenderFns = [];
	  var prevOnceCount = onceCount;
	  onceCount = 0;
	  currentOptions = options;
	  warn$2 = options.warn || baseWarn;
	  transforms$1 = pluckModuleFunction(options.modules, 'transformCode');
	  dataGenFns = pluckModuleFunction(options.modules, 'genData');
	  platformDirectives$1 = options.directives || {};
	  isPlatformReservedTag$1 = options.isReservedTag || no;
	  var code = ast ? genElement(ast) : '_c("div")';
	  staticRenderFns = prevStaticRenderFns;
	  onceCount = prevOnceCount;
	  return {
	    render: ("with(this){return " + code + "}"),
	    staticRenderFns: currentStaticRenderFns
	  }
	}

	function genElement (el) {
	  if (el.staticRoot && !el.staticProcessed) {
	    return genStatic(el)
	  } else if (el.once && !el.onceProcessed) {
	    return genOnce(el)
	  } else if (el.for && !el.forProcessed) {
	    return genFor(el)
	  } else if (el.if && !el.ifProcessed) {
	    return genIf(el)
	  } else if (el.tag === 'template' && !el.slotTarget) {
	    return genChildren(el) || 'void 0'
	  } else if (el.tag === 'slot') {
	    return genSlot(el)
	  } else {
	    // component or element
	    var code;
	    if (el.component) {
	      code = genComponent(el.component, el);
	    } else {
	      var data = el.plain ? undefined : genData(el);

	      var children = el.inlineTemplate ? null : genChildren(el, true);
	      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
	    }
	    // module transforms
	    for (var i = 0; i < transforms$1.length; i++) {
	      code = transforms$1[i](el, code);
	    }
	    return code
	  }
	}

	// hoist static sub-trees out
	function genStatic (el) {
	  el.staticProcessed = true;
	  staticRenderFns.push(("with(this){return " + (genElement(el)) + "}"));
	  return ("_m(" + (staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
	}

	// v-once
	function genOnce (el) {
	  el.onceProcessed = true;
	  if (el.if && !el.ifProcessed) {
	    return genIf(el)
	  } else if (el.staticInFor) {
	    var key = '';
	    var parent = el.parent;
	    while (parent) {
	      if (parent.for) {
	        key = parent.key;
	        break
	      }
	      parent = parent.parent;
	    }
	    if (!key) {
	      process.env.NODE_ENV !== 'production' && warn$2(
	        "v-once can only be used inside v-for that is keyed. "
	      );
	      return genElement(el)
	    }
	    return ("_o(" + (genElement(el)) + "," + (onceCount++) + (key ? ("," + key) : "") + ")")
	  } else {
	    return genStatic(el)
	  }
	}

	function genIf (el) {
	  el.ifProcessed = true; // avoid recursion
	  return genIfConditions(el.ifConditions.slice())
	}

	function genIfConditions (conditions) {
	  if (!conditions.length) {
	    return '_e()'
	  }

	  var condition = conditions.shift();
	  if (condition.exp) {
	    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions)))
	  } else {
	    return ("" + (genTernaryExp(condition.block)))
	  }

	  // v-if with v-once should generate code like (a)?_m(0):_m(1)
	  function genTernaryExp (el) {
	    return el.once ? genOnce(el) : genElement(el)
	  }
	}

	function genFor (el) {
	  var exp = el.for;
	  var alias = el.alias;
	  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
	  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
	  el.forProcessed = true; // avoid recursion
	  return "_l((" + exp + ")," +
	    "function(" + alias + iterator1 + iterator2 + "){" +
	      "return " + (genElement(el)) +
	    '})'
	}

	function genData (el) {
	  var data = '{';

	  // directives first.
	  // directives may mutate the el's other properties before they are generated.
	  var dirs = genDirectives(el);
	  if (dirs) { data += dirs + ','; }

	  // key
	  if (el.key) {
	    data += "key:" + (el.key) + ",";
	  }
	  // ref
	  if (el.ref) {
	    data += "ref:" + (el.ref) + ",";
	  }
	  if (el.refInFor) {
	    data += "refInFor:true,";
	  }
	  // pre
	  if (el.pre) {
	    data += "pre:true,";
	  }
	  // record original tag name for components using "is" attribute
	  if (el.component) {
	    data += "tag:\"" + (el.tag) + "\",";
	  }
	  // module data generation functions
	  for (var i = 0; i < dataGenFns.length; i++) {
	    data += dataGenFns[i](el);
	  }
	  // attributes
	  if (el.attrs) {
	    data += "attrs:{" + (genProps(el.attrs)) + "},";
	  }
	  // DOM props
	  if (el.props) {
	    data += "domProps:{" + (genProps(el.props)) + "},";
	  }
	  // event handlers
	  if (el.events) {
	    data += (genHandlers(el.events)) + ",";
	  }
	  if (el.nativeEvents) {
	    data += (genHandlers(el.nativeEvents, true)) + ",";
	  }
	  // slot target
	  if (el.slotTarget) {
	    data += "slot:" + (el.slotTarget) + ",";
	  }
	  // scoped slots
	  if (el.scopedSlots) {
	    data += (genScopedSlots(el.scopedSlots)) + ",";
	  }
	  // inline-template
	  if (el.inlineTemplate) {
	    var inlineTemplate = genInlineTemplate(el);
	    if (inlineTemplate) {
	      data += inlineTemplate + ",";
	    }
	  }
	  data = data.replace(/,$/, '') + '}';
	  // v-bind data wrap
	  if (el.wrapData) {
	    data = el.wrapData(data);
	  }
	  return data
	}

	function genDirectives (el) {
	  var dirs = el.directives;
	  if (!dirs) { return }
	  var res = 'directives:[';
	  var hasRuntime = false;
	  var i, l, dir, needRuntime;
	  for (i = 0, l = dirs.length; i < l; i++) {
	    dir = dirs[i];
	    needRuntime = true;
	    var gen = platformDirectives$1[dir.name] || baseDirectives[dir.name];
	    if (gen) {
	      // compile-time directive that manipulates AST.
	      // returns true if it also needs a runtime counterpart.
	      needRuntime = !!gen(el, dir, warn$2);
	    }
	    if (needRuntime) {
	      hasRuntime = true;
	      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
	    }
	  }
	  if (hasRuntime) {
	    return res.slice(0, -1) + ']'
	  }
	}

	function genInlineTemplate (el) {
	  var ast = el.children[0];
	  if (process.env.NODE_ENV !== 'production' && (
	    el.children.length > 1 || ast.type !== 1
	  )) {
	    warn$2('Inline-template components must have exactly one child element.');
	  }
	  if (ast.type === 1) {
	    var inlineRenderFns = generate(ast, currentOptions);
	    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
	  }
	}

	function genScopedSlots (slots) {
	  return ("scopedSlots:{" + (Object.keys(slots).map(function (key) { return genScopedSlot(key, slots[key]); }).join(',')) + "}")
	}

	function genScopedSlot (key, el) {
	  return key + ":function(" + (String(el.attrsMap.scope)) + "){" +
	    "return " + (el.tag === 'template'
	      ? genChildren(el) || 'void 0'
	      : genElement(el)) + "}"
	}

	function genChildren (el, checkSkip) {
	  var children = el.children;
	  if (children.length) {
	    var el$1 = children[0];
	    // optimize single v-for
	    if (children.length === 1 &&
	        el$1.for &&
	        el$1.tag !== 'template' &&
	        el$1.tag !== 'slot') {
	      return genElement(el$1)
	    }
	    var normalizationType = getNormalizationType(children);
	    return ("[" + (children.map(genNode).join(',')) + "]" + (checkSkip
	        ? normalizationType ? ("," + normalizationType) : ''
	        : ''))
	  }
	}

	// determine the normalization needed for the children array.
	// 0: no normalization needed
	// 1: simple normalization needed (possible 1-level deep nested array)
	// 2: full normalization needed
	function getNormalizationType (children) {
	  var res = 0;
	  for (var i = 0; i < children.length; i++) {
	    var el = children[i];
	    if (el.type !== 1) {
	      continue
	    }
	    if (needsNormalization(el) ||
	        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
	      res = 2;
	      break
	    }
	    if (maybeComponent(el) ||
	        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
	      res = 1;
	    }
	  }
	  return res
	}

	function needsNormalization (el) {
	  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
	}

	function maybeComponent (el) {
	  return !isPlatformReservedTag$1(el.tag)
	}

	function genNode (node) {
	  if (node.type === 1) {
	    return genElement(node)
	  } else {
	    return genText(node)
	  }
	}

	function genText (text) {
	  return ("_v(" + (text.type === 2
	    ? text.expression // no need for () because already wrapped in _s()
	    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
	}

	function genSlot (el) {
	  var slotName = el.slotName || '"default"';
	  var children = genChildren(el);
	  var res = "_t(" + slotName + (children ? ("," + children) : '');
	  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
	  var bind$$1 = el.attrsMap['v-bind'];
	  if ((attrs || bind$$1) && !children) {
	    res += ",null";
	  }
	  if (attrs) {
	    res += "," + attrs;
	  }
	  if (bind$$1) {
	    res += (attrs ? '' : ',null') + "," + bind$$1;
	  }
	  return res + ')'
	}

	// componentName is el.component, take it as argument to shun flow's pessimistic refinement
	function genComponent (componentName, el) {
	  var children = el.inlineTemplate ? null : genChildren(el, true);
	  return ("_c(" + componentName + "," + (genData(el)) + (children ? ("," + children) : '') + ")")
	}

	function genProps (props) {
	  var res = '';
	  for (var i = 0; i < props.length; i++) {
	    var prop = props[i];
	    res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
	  }
	  return res.slice(0, -1)
	}

	// #3895, #4268
	function transformSpecialNewlines (text) {
	  return text
	    .replace(/\u2028/g, '\\u2028')
	    .replace(/\u2029/g, '\\u2029')
	}

	/*  */

	/**
	 * Compile a template.
	 */
	function compile$1 (
	  template,
	  options
	) {
	  var ast = parse(template.trim(), options);
	  optimize(ast, options);
	  var code = generate(ast, options);
	  return {
	    ast: ast,
	    render: code.render,
	    staticRenderFns: code.staticRenderFns
	  }
	}

	/*  */

	// operators like typeof, instanceof and in are allowed
	var prohibitedKeywordRE = new RegExp('\\b' + (
	  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
	  'super,throw,while,yield,delete,export,import,return,switch,default,' +
	  'extends,finally,continue,debugger,function,arguments'
	).split(',').join('\\b|\\b') + '\\b');
	// check valid identifier for v-for
	var identRE = /[A-Za-z_$][\w$]*/;
	// strip strings in expressions
	var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

	// detect problematic expressions in a template
	function detectErrors (ast) {
	  var errors = [];
	  if (ast) {
	    checkNode(ast, errors);
	  }
	  return errors
	}

	function checkNode (node, errors) {
	  if (node.type === 1) {
	    for (var name in node.attrsMap) {
	      if (dirRE.test(name)) {
	        var value = node.attrsMap[name];
	        if (value) {
	          if (name === 'v-for') {
	            checkFor(node, ("v-for=\"" + value + "\""), errors);
	          } else {
	            checkExpression(value, (name + "=\"" + value + "\""), errors);
	          }
	        }
	      }
	    }
	    if (node.children) {
	      for (var i = 0; i < node.children.length; i++) {
	        checkNode(node.children[i], errors);
	      }
	    }
	  } else if (node.type === 2) {
	    checkExpression(node.expression, node.text, errors);
	  }
	}

	function checkFor (node, text, errors) {
	  checkExpression(node.for || '', text, errors);
	  checkIdentifier(node.alias, 'v-for alias', text, errors);
	  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
	  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
	}

	function checkIdentifier (ident, type, text, errors) {
	  if (typeof ident === 'string' && !identRE.test(ident)) {
	    errors.push(("- invalid " + type + " \"" + ident + "\" in expression: " + text));
	  }
	}

	function checkExpression (exp, text, errors) {
	  try {
	    new Function(("return " + exp));
	  } catch (e) {
	    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
	    if (keywordMatch) {
	      errors.push(
	        "- avoid using JavaScript keyword as property name: " +
	        "\"" + (keywordMatch[0]) + "\" in expression " + text
	      );
	    } else {
	      errors.push(("- invalid expression: " + text));
	    }
	  }
	}

	/*  */

	function transformNode (el, options) {
	  var warn = options.warn || baseWarn;
	  var staticClass = getAndRemoveAttr(el, 'class');
	  if (process.env.NODE_ENV !== 'production' && staticClass) {
	    var expression = parseText(staticClass, options.delimiters);
	    if (expression) {
	      warn(
	        "class=\"" + staticClass + "\": " +
	        'Interpolation inside attributes has been removed. ' +
	        'Use v-bind or the colon shorthand instead. For example, ' +
	        'instead of <div class="{{ val }}">, use <div :class="val">.'
	      );
	    }
	  }
	  if (staticClass) {
	    el.staticClass = JSON.stringify(staticClass);
	  }
	  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
	  if (classBinding) {
	    el.classBinding = classBinding;
	  }
	}

	function genData$1 (el) {
	  var data = '';
	  if (el.staticClass) {
	    data += "staticClass:" + (el.staticClass) + ",";
	  }
	  if (el.classBinding) {
	    data += "class:" + (el.classBinding) + ",";
	  }
	  return data
	}

	var klass$1 = {
	  staticKeys: ['staticClass'],
	  transformNode: transformNode,
	  genData: genData$1
	};

	/*  */

	function transformNode$1 (el, options) {
	  var warn = options.warn || baseWarn;
	  var staticStyle = getAndRemoveAttr(el, 'style');
	  if (staticStyle) {
	    /* istanbul ignore if */
	    if (process.env.NODE_ENV !== 'production') {
	      var expression = parseText(staticStyle, options.delimiters);
	      if (expression) {
	        warn(
	          "style=\"" + staticStyle + "\": " +
	          'Interpolation inside attributes has been removed. ' +
	          'Use v-bind or the colon shorthand instead. For example, ' +
	          'instead of <div style="{{ val }}">, use <div :style="val">.'
	        );
	      }
	    }
	    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
	  }

	  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
	  if (styleBinding) {
	    el.styleBinding = styleBinding;
	  }
	}

	function genData$2 (el) {
	  var data = '';
	  if (el.staticStyle) {
	    data += "staticStyle:" + (el.staticStyle) + ",";
	  }
	  if (el.styleBinding) {
	    data += "style:(" + (el.styleBinding) + "),";
	  }
	  return data
	}

	var style$1 = {
	  staticKeys: ['staticStyle'],
	  transformNode: transformNode$1,
	  genData: genData$2
	};

	var modules$1 = [
	  klass$1,
	  style$1
	];

	/*  */

	var warn$3;

	function model$1 (
	  el,
	  dir,
	  _warn
	) {
	  warn$3 = _warn;
	  var value = dir.value;
	  var modifiers = dir.modifiers;
	  var tag = el.tag;
	  var type = el.attrsMap.type;
	  if (process.env.NODE_ENV !== 'production') {
	    var dynamicType = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
	    if (tag === 'input' && dynamicType) {
	      warn$3(
	        "<input :type=\"" + dynamicType + "\" v-model=\"" + value + "\">:\n" +
	        "v-model does not support dynamic input types. Use v-if branches instead."
	      );
	    }
	  }
	  if (tag === 'select') {
	    genSelect(el, value, modifiers);
	  } else if (tag === 'input' && type === 'checkbox') {
	    genCheckboxModel(el, value, modifiers);
	  } else if (tag === 'input' && type === 'radio') {
	    genRadioModel(el, value, modifiers);
	  } else {
	    genDefaultModel(el, value, modifiers);
	  }
	  // ensure runtime directive metadata
	  return true
	}

	function genCheckboxModel (
	  el,
	  value,
	  modifiers
	) {
	  if (process.env.NODE_ENV !== 'production' &&
	    el.attrsMap.checked != null) {
	    warn$3(
	      "<" + (el.tag) + " v-model=\"" + value + "\" checked>:\n" +
	      "inline checked attributes will be ignored when using v-model. " +
	      'Declare initial values in the component\'s data option instead.'
	    );
	  }
	  var number = modifiers && modifiers.number;
	  var valueBinding = getBindingAttr(el, 'value') || 'null';
	  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
	  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
	  addProp(el, 'checked',
	    "Array.isArray(" + value + ")" +
	      "?_i(" + value + "," + valueBinding + ")>-1" + (
	        trueValueBinding === 'true'
	          ? (":(" + value + ")")
	          : (":_q(" + value + "," + trueValueBinding + ")")
	      )
	  );
	  addHandler(el, 'click',
	    "var $$a=" + value + "," +
	        '$$el=$event.target,' +
	        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
	    'if(Array.isArray($$a)){' +
	      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
	          '$$i=_i($$a,$$v);' +
	      "if($$c){$$i<0&&(" + value + "=$$a.concat($$v))}" +
	      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
	    "}else{" + value + "=$$c}",
	    null, true
	  );
	}

	function genRadioModel (
	    el,
	    value,
	    modifiers
	) {
	  if (process.env.NODE_ENV !== 'production' &&
	    el.attrsMap.checked != null) {
	    warn$3(
	      "<" + (el.tag) + " v-model=\"" + value + "\" checked>:\n" +
	      "inline checked attributes will be ignored when using v-model. " +
	      'Declare initial values in the component\'s data option instead.'
	    );
	  }
	  var number = modifiers && modifiers.number;
	  var valueBinding = getBindingAttr(el, 'value') || 'null';
	  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
	  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
	  addHandler(el, 'click', genAssignmentCode(value, valueBinding), null, true);
	}

	function genDefaultModel (
	  el,
	  value,
	  modifiers
	) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (el.tag === 'input' && el.attrsMap.value) {
	      warn$3(
	        "<" + (el.tag) + " v-model=\"" + value + "\" value=\"" + (el.attrsMap.value) + "\">:\n" +
	        'inline value attributes will be ignored when using v-model. ' +
	        'Declare initial values in the component\'s data option instead.'
	      );
	    }
	    if (el.tag === 'textarea' && el.children.length) {
	      warn$3(
	        "<textarea v-model=\"" + value + "\">:\n" +
	        'inline content inside <textarea> will be ignored when using v-model. ' +
	        'Declare initial values in the component\'s data option instead.'
	      );
	    }
	  }

	  var type = el.attrsMap.type;
	  var ref = modifiers || {};
	  var lazy = ref.lazy;
	  var number = ref.number;
	  var trim = ref.trim;
	  var event = lazy || (isIE && type === 'range') ? 'change' : 'input';
	  var needCompositionGuard = !lazy && type !== 'range';
	  var isNative = el.tag === 'input' || el.tag === 'textarea';

	  var valueExpression = isNative
	    ? ("$event.target.value" + (trim ? '.trim()' : ''))
	    : trim ? "(typeof $event === 'string' ? $event.trim() : $event)" : "$event";
	  valueExpression = number || type === 'number'
	    ? ("_n(" + valueExpression + ")")
	    : valueExpression;

	  var code = genAssignmentCode(value, valueExpression);
	  if (isNative && needCompositionGuard) {
	    code = "if($event.target.composing)return;" + code;
	  }

	  // inputs with type="file" are read only and setting the input's
	  // value will throw an error.
	  if (process.env.NODE_ENV !== 'production' &&
	      type === 'file') {
	    warn$3(
	      "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
	      "File inputs are read only. Use a v-on:change listener instead."
	    );
	  }

	  addProp(el, 'value', isNative ? ("_s(" + value + ")") : ("(" + value + ")"));
	  addHandler(el, event, code, null, true);
	  if (trim || number || type === 'number') {
	    addHandler(el, 'blur', '$forceUpdate()');
	  }
	}

	function genSelect (
	    el,
	    value,
	    modifiers
	) {
	  if (process.env.NODE_ENV !== 'production') {
	    el.children.some(checkOptionWarning);
	  }

	  var number = modifiers && modifiers.number;
	  var assignment = "Array.prototype.filter" +
	    ".call($event.target.options,function(o){return o.selected})" +
	    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
	    "return " + (number ? '_n(val)' : 'val') + "})" +
	    (el.attrsMap.multiple == null ? '[0]' : '');

	  var code = genAssignmentCode(value, assignment);
	  addHandler(el, 'change', code, null, true);
	}

	function checkOptionWarning (option) {
	  if (option.type === 1 &&
	    option.tag === 'option' &&
	    option.attrsMap.selected != null) {
	    warn$3(
	      "<select v-model=\"" + (option.parent.attrsMap['v-model']) + "\">:\n" +
	      'inline selected attributes on <option> will be ignored when using v-model. ' +
	      'Declare initial values in the component\'s data option instead.'
	    );
	    return true
	  }
	  return false
	}

	function genAssignmentCode (value, assignment) {
	  var modelRs = parseModel(value);
	  if (modelRs.idx === null) {
	    return (value + "=" + assignment)
	  } else {
	    return "var $$exp = " + (modelRs.exp) + ", $$idx = " + (modelRs.idx) + ";" +
	      "if (!Array.isArray($$exp)){" +
	        value + "=" + assignment + "}" +
	      "else{$$exp.splice($$idx, 1, " + assignment + ")}"
	  }
	}

	/*  */

	function text (el, dir) {
	  if (dir.value) {
	    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
	  }
	}

	/*  */

	function html (el, dir) {
	  if (dir.value) {
	    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
	  }
	}

	var directives$1 = {
	  model: model$1,
	  text: text,
	  html: html
	};

	/*  */

	var cache = Object.create(null);

	var baseOptions = {
	  expectHTML: true,
	  modules: modules$1,
	  staticKeys: genStaticKeys(modules$1),
	  directives: directives$1,
	  isReservedTag: isReservedTag,
	  isUnaryTag: isUnaryTag,
	  mustUseProp: mustUseProp,
	  getTagNamespace: getTagNamespace,
	  isPreTag: isPreTag
	};

	function compile$$1 (
	  template,
	  options
	) {
	  options = options
	    ? extend(extend({}, baseOptions), options)
	    : baseOptions;
	  return compile$1(template, options)
	}

	function compileToFunctions (
	  template,
	  options,
	  vm
	) {
	  var _warn = (options && options.warn) || warn;
	  // detect possible CSP restriction
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV !== 'production') {
	    try {
	      new Function('return 1');
	    } catch (e) {
	      if (e.toString().match(/unsafe-eval|CSP/)) {
	        _warn(
	          'It seems you are using the standalone build of Vue.js in an ' +
	          'environment with Content Security Policy that prohibits unsafe-eval. ' +
	          'The template compiler cannot work in this environment. Consider ' +
	          'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
	          'templates into render functions.'
	        );
	      }
	    }
	  }
	  var key = options && options.delimiters
	    ? String(options.delimiters) + template
	    : template;
	  if (cache[key]) {
	    return cache[key]
	  }
	  var res = {};
	  var compiled = compile$$1(template, options);
	  res.render = makeFunction(compiled.render);
	  var l = compiled.staticRenderFns.length;
	  res.staticRenderFns = new Array(l);
	  for (var i = 0; i < l; i++) {
	    res.staticRenderFns[i] = makeFunction(compiled.staticRenderFns[i]);
	  }
	  if (process.env.NODE_ENV !== 'production') {
	    if (res.render === noop || res.staticRenderFns.some(function (fn) { return fn === noop; })) {
	      _warn(
	        "failed to compile template:\n\n" + template + "\n\n" +
	        detectErrors(compiled.ast).join('\n') +
	        '\n\n',
	        vm
	      );
	    }
	  }
	  return (cache[key] = res)
	}

	function makeFunction (code) {
	  try {
	    return new Function(code)
	  } catch (e) {
	    return noop
	  }
	}

	/*  */

	var idToTemplate = cached(function (id) {
	  var el = query(id);
	  return el && el.innerHTML
	});

	var mount = Vue$3.prototype.$mount;
	Vue$3.prototype.$mount = function (
	  el,
	  hydrating
	) {
	  el = el && query(el);

	  /* istanbul ignore if */
	  if (el === document.body || el === document.documentElement) {
	    process.env.NODE_ENV !== 'production' && warn(
	      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
	    );
	    return this
	  }

	  var options = this.$options;
	  // resolve template/el and convert to render function
	  if (!options.render) {
	    var template = options.template;
	    if (template) {
	      if (typeof template === 'string') {
	        if (template.charAt(0) === '#') {
	          template = idToTemplate(template);
	          /* istanbul ignore if */
	          if (process.env.NODE_ENV !== 'production' && !template) {
	            warn(
	              ("Template element not found or is empty: " + (options.template)),
	              this
	            );
	          }
	        }
	      } else if (template.nodeType) {
	        template = template.innerHTML;
	      } else {
	        if (process.env.NODE_ENV !== 'production') {
	          warn('invalid template option:' + template, this);
	        }
	        return this
	      }
	    } else if (el) {
	      template = getOuterHTML(el);
	    }
	    if (template) {
	      var ref = compileToFunctions(template, {
	        warn: warn,
	        shouldDecodeNewlines: shouldDecodeNewlines,
	        delimiters: options.delimiters
	      }, this);
	      var render = ref.render;
	      var staticRenderFns = ref.staticRenderFns;
	      options.render = render;
	      options.staticRenderFns = staticRenderFns;
	    }
	  }
	  return mount.call(this, el, hydrating)
	};

	/**
	 * Get outerHTML of elements, taking care
	 * of SVG elements in IE as well.
	 */
	function getOuterHTML (el) {
	  if (el.outerHTML) {
	    return el.outerHTML
	  } else {
	    var container = document.createElement('div');
	    container.appendChild(el.cloneNode(true));
	    return container.innerHTML
	  }
	}

	Vue$3.compile = compileToFunctions;

	module.exports = Vue$3;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	  * vue-router v2.1.3
	  * (c) 2017 Evan You
	  * @license MIT
	  */
	'use strict';

	var View = {
	  name: 'router-view',
	  functional: true,
	  props: {
	    name: {
	      type: String,
	      default: 'default'
	    }
	  },
	  render: function render (h, ref) {
	    var props = ref.props;
	    var children = ref.children;
	    var parent = ref.parent;
	    var data = ref.data;

	    data.routerView = true

	    var name = props.name
	    var route = parent.$route
	    var cache = parent._routerViewCache || (parent._routerViewCache = {})

	    // determine current view depth, also check to see if the tree
	    // has been toggled inactive but kept-alive.
	    var depth = 0
	    var inactive = false
	    while (parent) {
	      if (parent.$vnode && parent.$vnode.data.routerView) {
	        depth++
	      }
	      if (parent._inactive) {
	        inactive = true
	      }
	      parent = parent.$parent
	    }
	    data.routerViewDepth = depth

	    // render previous view if the tree is inactive and kept-alive
	    if (inactive) {
	      return h(cache[name], data, children)
	    }

	    var matched = route.matched[depth]
	    // render empty node if no matched route
	    if (!matched) {
	      cache[name] = null
	      return h()
	    }

	    var component = cache[name] = matched.components[name]

	    // inject instance registration hooks
	    var hooks = data.hook || (data.hook = {})
	    hooks.init = function (vnode) {
	      matched.instances[name] = vnode.child
	    }
	    hooks.prepatch = function (oldVnode, vnode) {
	      matched.instances[name] = vnode.child
	    }
	    hooks.destroy = function (vnode) {
	      if (matched.instances[name] === vnode.child) {
	        matched.instances[name] = undefined
	      }
	    }

	    return h(component, data, children)
	  }
	}

	/*  */

	function assert (condition, message) {
	  if (!condition) {
	    throw new Error(("[vue-router] " + message))
	  }
	}

	function warn (condition, message) {
	  if (!condition) {
	    typeof console !== 'undefined' && console.warn(("[vue-router] " + message))
	  }
	}

	/*  */

	var encode = encodeURIComponent
	var decode = decodeURIComponent

	function resolveQuery (
	  query,
	  extraQuery
	) {
	  if ( extraQuery === void 0 ) extraQuery = {};

	  if (query) {
	    var parsedQuery
	    try {
	      parsedQuery = parseQuery(query)
	    } catch (e) {
	      process.env.NODE_ENV !== 'production' && warn(false, e.message)
	      parsedQuery = {}
	    }
	    for (var key in extraQuery) {
	      parsedQuery[key] = extraQuery[key]
	    }
	    return parsedQuery
	  } else {
	    return extraQuery
	  }
	}

	function parseQuery (query) {
	  var res = {}

	  query = query.trim().replace(/^(\?|#|&)/, '')

	  if (!query) {
	    return res
	  }

	  query.split('&').forEach(function (param) {
	    var parts = param.replace(/\+/g, ' ').split('=')
	    var key = decode(parts.shift())
	    var val = parts.length > 0
	      ? decode(parts.join('='))
	      : null

	    if (res[key] === undefined) {
	      res[key] = val
	    } else if (Array.isArray(res[key])) {
	      res[key].push(val)
	    } else {
	      res[key] = [res[key], val]
	    }
	  })

	  return res
	}

	function stringifyQuery (obj) {
	  var res = obj ? Object.keys(obj).map(function (key) {
	    var val = obj[key]

	    if (val === undefined) {
	      return ''
	    }

	    if (val === null) {
	      return encode(key)
	    }

	    if (Array.isArray(val)) {
	      var result = []
	      val.slice().forEach(function (val2) {
	        if (val2 === undefined) {
	          return
	        }
	        if (val2 === null) {
	          result.push(encode(key))
	        } else {
	          result.push(encode(key) + '=' + encode(val2))
	        }
	      })
	      return result.join('&')
	    }

	    return encode(key) + '=' + encode(val)
	  }).filter(function (x) { return x.length > 0; }).join('&') : null
	  return res ? ("?" + res) : ''
	}

	/*  */

	var trailingSlashRE = /\/?$/

	function createRoute (
	  record,
	  location,
	  redirectedFrom
	) {
	  var route = {
	    name: location.name || (record && record.name),
	    meta: (record && record.meta) || {},
	    path: location.path || '/',
	    hash: location.hash || '',
	    query: location.query || {},
	    params: location.params || {},
	    fullPath: getFullPath(location),
	    matched: record ? formatMatch(record) : []
	  }
	  if (redirectedFrom) {
	    route.redirectedFrom = getFullPath(redirectedFrom)
	  }
	  return Object.freeze(route)
	}

	// the starting route that represents the initial state
	var START = createRoute(null, {
	  path: '/'
	})

	function formatMatch (record) {
	  var res = []
	  while (record) {
	    res.unshift(record)
	    record = record.parent
	  }
	  return res
	}

	function getFullPath (ref) {
	  var path = ref.path;
	  var query = ref.query; if ( query === void 0 ) query = {};
	  var hash = ref.hash; if ( hash === void 0 ) hash = '';

	  return (path || '/') + stringifyQuery(query) + hash
	}

	function isSameRoute (a, b) {
	  if (b === START) {
	    return a === b
	  } else if (!b) {
	    return false
	  } else if (a.path && b.path) {
	    return (
	      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
	      a.hash === b.hash &&
	      isObjectEqual(a.query, b.query)
	    )
	  } else if (a.name && b.name) {
	    return (
	      a.name === b.name &&
	      a.hash === b.hash &&
	      isObjectEqual(a.query, b.query) &&
	      isObjectEqual(a.params, b.params)
	    )
	  } else {
	    return false
	  }
	}

	function isObjectEqual (a, b) {
	  if ( a === void 0 ) a = {};
	  if ( b === void 0 ) b = {};

	  var aKeys = Object.keys(a)
	  var bKeys = Object.keys(b)
	  if (aKeys.length !== bKeys.length) {
	    return false
	  }
	  return aKeys.every(function (key) { return String(a[key]) === String(b[key]); })
	}

	function isIncludedRoute (current, target) {
	  return (
	    current.path.replace(trailingSlashRE, '/').indexOf(
	      target.path.replace(trailingSlashRE, '/')
	    ) === 0 &&
	    (!target.hash || current.hash === target.hash) &&
	    queryIncludes(current.query, target.query)
	  )
	}

	function queryIncludes (current, target) {
	  for (var key in target) {
	    if (!(key in current)) {
	      return false
	    }
	  }
	  return true
	}

	/*  */

	// work around weird flow bug
	var toTypes = [String, Object]

	var Link = {
	  name: 'router-link',
	  props: {
	    to: {
	      type: toTypes,
	      required: true
	    },
	    tag: {
	      type: String,
	      default: 'a'
	    },
	    exact: Boolean,
	    append: Boolean,
	    replace: Boolean,
	    activeClass: String,
	    event: {
	      type: [String, Array],
	      default: 'click'
	    }
	  },
	  render: function render (h) {
	    var this$1 = this;

	    var router = this.$router
	    var current = this.$route
	    var ref = router.resolve(this.to, current, this.append);
	    var normalizedTo = ref.normalizedTo;
	    var resolved = ref.resolved;
	    var href = ref.href;
	    var classes = {}
	    var activeClass = this.activeClass || router.options.linkActiveClass || 'router-link-active'
	    var compareTarget = normalizedTo.path ? createRoute(null, normalizedTo) : resolved
	    classes[activeClass] = this.exact
	      ? isSameRoute(current, compareTarget)
	      : isIncludedRoute(current, compareTarget)

	    var handler = function (e) {
	      if (guardEvent(e)) {
	        if (this$1.replace) {
	          router.replace(normalizedTo)
	        } else {
	          router.push(normalizedTo)
	        }
	      }
	    }

	    var on = { click: guardEvent }
	    if (Array.isArray(this.event)) {
	      this.event.forEach(function (e) { on[e] = handler })
	    } else {
	      on[this.event] = handler
	    }

	    var data = {
	      class: classes
	    }

	    if (this.tag === 'a') {
	      data.on = on
	      data.attrs = { href: href }
	    } else {
	      // find the first <a> child and apply listener and href
	      var a = findAnchor(this.$slots.default)
	      if (a) {
	        // in case the <a> is a static node
	        a.isStatic = false
	        var extend = _Vue.util.extend
	        var aData = a.data = extend({}, a.data)
	        aData.on = on
	        var aAttrs = a.data.attrs = extend({}, a.data.attrs)
	        aAttrs.href = href
	      } else {
	        // doesn't have <a> child, apply listener to self
	        data.on = on
	      }
	    }

	    return h(this.tag, data, this.$slots.default)
	  }
	}

	function guardEvent (e) {
	  // don't redirect with control keys
	  /* istanbul ignore if */
	  if (e.metaKey || e.ctrlKey || e.shiftKey) { return }
	  // don't redirect when preventDefault called
	  /* istanbul ignore if */
	  if (e.defaultPrevented) { return }
	  // don't redirect on right click
	  /* istanbul ignore if */
	  if (e.button !== undefined && e.button !== 0) { return }
	  // don't redirect if `target="_blank"`
	  /* istanbul ignore if */
	  if (e.target && e.target.getAttribute) {
	    var target = e.target.getAttribute('target')
	    if (/\b_blank\b/i.test(target)) { return }
	  }

	  e.preventDefault()
	  return true
	}

	function findAnchor (children) {
	  if (children) {
	    var child
	    for (var i = 0; i < children.length; i++) {
	      child = children[i]
	      if (child.tag === 'a') {
	        return child
	      }
	      if (child.children && (child = findAnchor(child.children))) {
	        return child
	      }
	    }
	  }
	}

	var _Vue

	function install (Vue) {
	  if (install.installed) { return }
	  install.installed = true

	  _Vue = Vue

	  Object.defineProperty(Vue.prototype, '$router', {
	    get: function get () { return this.$root._router }
	  })

	  Object.defineProperty(Vue.prototype, '$route', {
	    get: function get$1 () { return this.$root._route }
	  })

	  Vue.mixin({
	    beforeCreate: function beforeCreate () {
	      if (this.$options.router) {
	        this._router = this.$options.router
	        this._router.init(this)
	        Vue.util.defineReactive(this, '_route', this._router.history.current)
	      }
	    }
	  })

	  Vue.component('router-view', View)
	  Vue.component('router-link', Link)

	  var strats = Vue.config.optionMergeStrategies
	  // use the same hook merging strategy for route hooks
	  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.created
	}

	/*  */

	function resolvePath (
	  relative,
	  base,
	  append
	) {
	  if (relative.charAt(0) === '/') {
	    return relative
	  }

	  if (relative.charAt(0) === '?' || relative.charAt(0) === '#') {
	    return base + relative
	  }

	  var stack = base.split('/')

	  // remove trailing segment if:
	  // - not appending
	  // - appending to trailing slash (last segment is empty)
	  if (!append || !stack[stack.length - 1]) {
	    stack.pop()
	  }

	  // resolve relative path
	  var segments = relative.replace(/^\//, '').split('/')
	  for (var i = 0; i < segments.length; i++) {
	    var segment = segments[i]
	    if (segment === '.') {
	      continue
	    } else if (segment === '..') {
	      stack.pop()
	    } else {
	      stack.push(segment)
	    }
	  }

	  // ensure leading slash
	  if (stack[0] !== '') {
	    stack.unshift('')
	  }

	  return stack.join('/')
	}

	function parsePath (path) {
	  var hash = ''
	  var query = ''

	  var hashIndex = path.indexOf('#')
	  if (hashIndex >= 0) {
	    hash = path.slice(hashIndex)
	    path = path.slice(0, hashIndex)
	  }

	  var queryIndex = path.indexOf('?')
	  if (queryIndex >= 0) {
	    query = path.slice(queryIndex + 1)
	    path = path.slice(0, queryIndex)
	  }

	  return {
	    path: path,
	    query: query,
	    hash: hash
	  }
	}

	function cleanPath (path) {
	  return path.replace(/\/\//g, '/')
	}

	/*  */

	function createRouteMap (routes) {
	  var pathMap = Object.create(null)
	  var nameMap = Object.create(null)

	  routes.forEach(function (route) {
	    addRouteRecord(pathMap, nameMap, route)
	  })

	  return {
	    pathMap: pathMap,
	    nameMap: nameMap
	  }
	}

	function addRouteRecord (
	  pathMap,
	  nameMap,
	  route,
	  parent,
	  matchAs
	) {
	  var path = route.path;
	  var name = route.name;
	  if (process.env.NODE_ENV !== 'production') {
	    assert(path != null, "\"path\" is required in a route configuration.")
	    assert(
	      typeof route.component !== 'string',
	      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
	      "string id. Use an actual component instead."
	    )
	  }

	  var record = {
	    path: normalizePath(path, parent),
	    components: route.components || { default: route.component },
	    instances: {},
	    name: name,
	    parent: parent,
	    matchAs: matchAs,
	    redirect: route.redirect,
	    beforeEnter: route.beforeEnter,
	    meta: route.meta || {}
	  }

	  if (route.children) {
	    // Warn if route is named and has a default child route.
	    // If users navigate to this route by name, the default child will
	    // not be rendered (GH Issue #629)
	    if (process.env.NODE_ENV !== 'production') {
	      if (route.name && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
	        warn(
	          false,
	          "Named Route '" + (route.name) + "' has a default child route. " +
	          "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
	          "the default child route will not be rendered. Remove the name from " +
	          "this route and use the name of the default child route for named " +
	          "links instead."
	        )
	      }
	    }
	    route.children.forEach(function (child) {
	      var childMatchAs = matchAs
	        ? cleanPath((matchAs + "/" + (child.path)))
	        : undefined
	      addRouteRecord(pathMap, nameMap, child, record, childMatchAs)
	    })
	  }

	  if (route.alias !== undefined) {
	    if (Array.isArray(route.alias)) {
	      route.alias.forEach(function (alias) {
	        var aliasRoute = {
	          path: alias,
	          children: route.children
	        }
	        addRouteRecord(pathMap, nameMap, aliasRoute, parent, record.path)
	      })
	    } else {
	      var aliasRoute = {
	        path: route.alias,
	        children: route.children
	      }
	      addRouteRecord(pathMap, nameMap, aliasRoute, parent, record.path)
	    }
	  }

	  if (!pathMap[record.path]) {
	    pathMap[record.path] = record
	  }

	  if (name) {
	    if (!nameMap[name]) {
	      nameMap[name] = record
	    } else if (process.env.NODE_ENV !== 'production') {
	      warn(
	        false,
	        "Duplicate named routes definition: " +
	        "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
	      )
	    }
	  }
	}

	function normalizePath (path, parent) {
	  path = path.replace(/\/$/, '')
	  if (path[0] === '/') { return path }
	  if (parent == null) { return path }
	  return cleanPath(((parent.path) + "/" + path))
	}

	var __moduleExports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};

	var isarray = __moduleExports

	/**
	 * Expose `pathToRegexp`.
	 */
	var index = pathToRegexp
	var parse_1 = parse
	var compile_1 = compile
	var tokensToFunction_1 = tokensToFunction
	var tokensToRegExp_1 = tokensToRegExp

	/**
	 * The main path matching regexp utility.
	 *
	 * @type {RegExp}
	 */
	var PATH_REGEXP = new RegExp([
	  // Match escaped characters that would otherwise appear in future matches.
	  // This allows the user to escape special characters that won't transform.
	  '(\\\\.)',
	  // Match Express-style parameters and un-named parameters with a prefix
	  // and optional suffixes. Matches appear as:
	  //
	  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
	  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
	  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
	  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
	].join('|'), 'g')

	/**
	 * Parse a string for the raw tokens.
	 *
	 * @param  {string}  str
	 * @param  {Object=} options
	 * @return {!Array}
	 */
	function parse (str, options) {
	  var tokens = []
	  var key = 0
	  var index = 0
	  var path = ''
	  var defaultDelimiter = options && options.delimiter || '/'
	  var res

	  while ((res = PATH_REGEXP.exec(str)) != null) {
	    var m = res[0]
	    var escaped = res[1]
	    var offset = res.index
	    path += str.slice(index, offset)
	    index = offset + m.length

	    // Ignore already escaped sequences.
	    if (escaped) {
	      path += escaped[1]
	      continue
	    }

	    var next = str[index]
	    var prefix = res[2]
	    var name = res[3]
	    var capture = res[4]
	    var group = res[5]
	    var modifier = res[6]
	    var asterisk = res[7]

	    // Push the current path onto the tokens.
	    if (path) {
	      tokens.push(path)
	      path = ''
	    }

	    var partial = prefix != null && next != null && next !== prefix
	    var repeat = modifier === '+' || modifier === '*'
	    var optional = modifier === '?' || modifier === '*'
	    var delimiter = res[2] || defaultDelimiter
	    var pattern = capture || group

	    tokens.push({
	      name: name || key++,
	      prefix: prefix || '',
	      delimiter: delimiter,
	      optional: optional,
	      repeat: repeat,
	      partial: partial,
	      asterisk: !!asterisk,
	      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
	    })
	  }

	  // Match any characters still remaining.
	  if (index < str.length) {
	    path += str.substr(index)
	  }

	  // If the path exists, push it onto the end.
	  if (path) {
	    tokens.push(path)
	  }

	  return tokens
	}

	/**
	 * Compile a string to a template function for the path.
	 *
	 * @param  {string}             str
	 * @param  {Object=}            options
	 * @return {!function(Object=, Object=)}
	 */
	function compile (str, options) {
	  return tokensToFunction(parse(str, options))
	}

	/**
	 * Prettier encoding of URI path segments.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeURIComponentPretty (str) {
	  return encodeURI(str).replace(/[\/?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
	  })
	}

	/**
	 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeAsterisk (str) {
	  return encodeURI(str).replace(/[?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
	  })
	}

	/**
	 * Expose a method for transforming tokens into the path function.
	 */
	function tokensToFunction (tokens) {
	  // Compile all the tokens into regexps.
	  var matches = new Array(tokens.length)

	  // Compile all the patterns before compilation.
	  for (var i = 0; i < tokens.length; i++) {
	    if (typeof tokens[i] === 'object') {
	      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
	    }
	  }

	  return function (obj, opts) {
	    var path = ''
	    var data = obj || {}
	    var options = opts || {}
	    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent

	    for (var i = 0; i < tokens.length; i++) {
	      var token = tokens[i]

	      if (typeof token === 'string') {
	        path += token

	        continue
	      }

	      var value = data[token.name]
	      var segment

	      if (value == null) {
	        if (token.optional) {
	          // Prepend partial segment prefixes.
	          if (token.partial) {
	            path += token.prefix
	          }

	          continue
	        } else {
	          throw new TypeError('Expected "' + token.name + '" to be defined')
	        }
	      }

	      if (isarray(value)) {
	        if (!token.repeat) {
	          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
	        }

	        if (value.length === 0) {
	          if (token.optional) {
	            continue
	          } else {
	            throw new TypeError('Expected "' + token.name + '" to not be empty')
	          }
	        }

	        for (var j = 0; j < value.length; j++) {
	          segment = encode(value[j])

	          if (!matches[i].test(segment)) {
	            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
	          }

	          path += (j === 0 ? token.prefix : token.delimiter) + segment
	        }

	        continue
	      }

	      segment = token.asterisk ? encodeAsterisk(value) : encode(value)

	      if (!matches[i].test(segment)) {
	        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
	      }

	      path += token.prefix + segment
	    }

	    return path
	  }
	}

	/**
	 * Escape a regular expression string.
	 *
	 * @param  {string} str
	 * @return {string}
	 */
	function escapeString (str) {
	  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
	}

	/**
	 * Escape the capturing group by escaping special characters and meaning.
	 *
	 * @param  {string} group
	 * @return {string}
	 */
	function escapeGroup (group) {
	  return group.replace(/([=!:$\/()])/g, '\\$1')
	}

	/**
	 * Attach the keys as a property of the regexp.
	 *
	 * @param  {!RegExp} re
	 * @param  {Array}   keys
	 * @return {!RegExp}
	 */
	function attachKeys (re, keys) {
	  re.keys = keys
	  return re
	}

	/**
	 * Get the flags for a regexp from the options.
	 *
	 * @param  {Object} options
	 * @return {string}
	 */
	function flags (options) {
	  return options.sensitive ? '' : 'i'
	}

	/**
	 * Pull out keys from a regexp.
	 *
	 * @param  {!RegExp} path
	 * @param  {!Array}  keys
	 * @return {!RegExp}
	 */
	function regexpToRegexp (path, keys) {
	  // Use a negative lookahead to match only capturing groups.
	  var groups = path.source.match(/\((?!\?)/g)

	  if (groups) {
	    for (var i = 0; i < groups.length; i++) {
	      keys.push({
	        name: i,
	        prefix: null,
	        delimiter: null,
	        optional: false,
	        repeat: false,
	        partial: false,
	        asterisk: false,
	        pattern: null
	      })
	    }
	  }

	  return attachKeys(path, keys)
	}

	/**
	 * Transform an array into a regexp.
	 *
	 * @param  {!Array}  path
	 * @param  {Array}   keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function arrayToRegexp (path, keys, options) {
	  var parts = []

	  for (var i = 0; i < path.length; i++) {
	    parts.push(pathToRegexp(path[i], keys, options).source)
	  }

	  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

	  return attachKeys(regexp, keys)
	}

	/**
	 * Create a path regexp from string input.
	 *
	 * @param  {string}  path
	 * @param  {!Array}  keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function stringToRegexp (path, keys, options) {
	  return tokensToRegExp(parse(path, options), keys, options)
	}

	/**
	 * Expose a function for taking tokens and returning a RegExp.
	 *
	 * @param  {!Array}          tokens
	 * @param  {(Array|Object)=} keys
	 * @param  {Object=}         options
	 * @return {!RegExp}
	 */
	function tokensToRegExp (tokens, keys, options) {
	  if (!isarray(keys)) {
	    options = /** @type {!Object} */ (keys || options)
	    keys = []
	  }

	  options = options || {}

	  var strict = options.strict
	  var end = options.end !== false
	  var route = ''

	  // Iterate over the tokens and create our regexp string.
	  for (var i = 0; i < tokens.length; i++) {
	    var token = tokens[i]

	    if (typeof token === 'string') {
	      route += escapeString(token)
	    } else {
	      var prefix = escapeString(token.prefix)
	      var capture = '(?:' + token.pattern + ')'

	      keys.push(token)

	      if (token.repeat) {
	        capture += '(?:' + prefix + capture + ')*'
	      }

	      if (token.optional) {
	        if (!token.partial) {
	          capture = '(?:' + prefix + '(' + capture + '))?'
	        } else {
	          capture = prefix + '(' + capture + ')?'
	        }
	      } else {
	        capture = prefix + '(' + capture + ')'
	      }

	      route += capture
	    }
	  }

	  var delimiter = escapeString(options.delimiter || '/')
	  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter

	  // In non-strict mode we allow a slash at the end of match. If the path to
	  // match already ends with a slash, we remove it for consistency. The slash
	  // is valid at the end of a path match, not in the middle. This is important
	  // in non-ending mode, where "/test/" shouldn't match "/test//route".
	  if (!strict) {
	    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?'
	  }

	  if (end) {
	    route += '$'
	  } else {
	    // In non-ending mode, we need the capturing groups to match as much as
	    // possible by using a positive lookahead to the end or next path segment.
	    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)'
	  }

	  return attachKeys(new RegExp('^' + route, flags(options)), keys)
	}

	/**
	 * Normalize the given path string, returning a regular expression.
	 *
	 * An empty array can be passed in for the keys, which will hold the
	 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
	 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
	 *
	 * @param  {(string|RegExp|Array)} path
	 * @param  {(Array|Object)=}       keys
	 * @param  {Object=}               options
	 * @return {!RegExp}
	 */
	function pathToRegexp (path, keys, options) {
	  if (!isarray(keys)) {
	    options = /** @type {!Object} */ (keys || options)
	    keys = []
	  }

	  options = options || {}

	  if (path instanceof RegExp) {
	    return regexpToRegexp(path, /** @type {!Array} */ (keys))
	  }

	  if (isarray(path)) {
	    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
	  }

	  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
	}

	index.parse = parse_1;
	index.compile = compile_1;
	index.tokensToFunction = tokensToFunction_1;
	index.tokensToRegExp = tokensToRegExp_1;

	/*  */

	var regexpCache = Object.create(null)

	function getRouteRegex (path) {
	  var hit = regexpCache[path]
	  var keys, regexp

	  if (hit) {
	    keys = hit.keys
	    regexp = hit.regexp
	  } else {
	    keys = []
	    regexp = index(path, keys)
	    regexpCache[path] = { keys: keys, regexp: regexp }
	  }

	  return { keys: keys, regexp: regexp }
	}

	var regexpCompileCache = Object.create(null)

	function fillParams (
	  path,
	  params,
	  routeMsg
	) {
	  try {
	    var filler =
	      regexpCompileCache[path] ||
	      (regexpCompileCache[path] = index.compile(path))
	    return filler(params || {}, { pretty: true })
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production') {
	      warn(false, ("missing param for " + routeMsg + ": " + (e.message)))
	    }
	    return ''
	  }
	}

	/*  */

	function normalizeLocation (
	  raw,
	  current,
	  append
	) {
	  var next = typeof raw === 'string' ? { path: raw } : raw
	  // named target
	  if (next.name || next._normalized) {
	    return next
	  }

	  // relative params
	  if (!next.path && next.params && current) {
	    next = assign({}, next)
	    next._normalized = true
	    var params = assign(assign({}, current.params), next.params)
	    if (current.name) {
	      next.name = current.name
	      next.params = params
	    } else if (current.matched) {
	      var rawPath = current.matched[current.matched.length - 1].path
	      next.path = fillParams(rawPath, params, ("path " + (current.path)))
	    } else if (process.env.NODE_ENV !== 'production') {
	      warn(false, "relative params navigation requires a current route.")
	    }
	    return next
	  }

	  var parsedPath = parsePath(next.path || '')
	  var basePath = (current && current.path) || '/'
	  var path = parsedPath.path
	    ? resolvePath(parsedPath.path, basePath, append || next.append)
	    : (current && current.path) || '/'
	  var query = resolveQuery(parsedPath.query, next.query)
	  var hash = next.hash || parsedPath.hash
	  if (hash && hash.charAt(0) !== '#') {
	    hash = "#" + hash
	  }

	  return {
	    _normalized: true,
	    path: path,
	    query: query,
	    hash: hash
	  }
	}

	function assign (a, b) {
	  for (var key in b) {
	    a[key] = b[key]
	  }
	  return a
	}

	/*  */

	function createMatcher (routes) {
	  var ref = createRouteMap(routes);
	  var pathMap = ref.pathMap;
	  var nameMap = ref.nameMap;

	  function match (
	    raw,
	    currentRoute,
	    redirectedFrom
	  ) {
	    var location = normalizeLocation(raw, currentRoute)
	    var name = location.name;

	    if (name) {
	      var record = nameMap[name]
	      if (process.env.NODE_ENV !== 'production') {
	        warn(record, ("Route with name '" + name + "' does not exist"))
	      }
	      var paramNames = getRouteRegex(record.path).keys
	        .filter(function (key) { return !key.optional; })
	        .map(function (key) { return key.name; })

	      if (typeof location.params !== 'object') {
	        location.params = {}
	      }

	      if (currentRoute && typeof currentRoute.params === 'object') {
	        for (var key in currentRoute.params) {
	          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
	            location.params[key] = currentRoute.params[key]
	          }
	        }
	      }

	      if (record) {
	        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""))
	        return _createRoute(record, location, redirectedFrom)
	      }
	    } else if (location.path) {
	      location.params = {}
	      for (var path in pathMap) {
	        if (matchRoute(path, location.params, location.path)) {
	          return _createRoute(pathMap[path], location, redirectedFrom)
	        }
	      }
	    }
	    // no match
	    return _createRoute(null, location)
	  }

	  function redirect (
	    record,
	    location
	  ) {
	    var originalRedirect = record.redirect
	    var redirect = typeof originalRedirect === 'function'
	        ? originalRedirect(createRoute(record, location))
	        : originalRedirect

	    if (typeof redirect === 'string') {
	      redirect = { path: redirect }
	    }

	    if (!redirect || typeof redirect !== 'object') {
	      process.env.NODE_ENV !== 'production' && warn(
	        false, ("invalid redirect option: " + (JSON.stringify(redirect)))
	      )
	      return _createRoute(null, location)
	    }

	    var re = redirect
	    var name = re.name;
	    var path = re.path;
	    var query = location.query;
	    var hash = location.hash;
	    var params = location.params;
	    query = re.hasOwnProperty('query') ? re.query : query
	    hash = re.hasOwnProperty('hash') ? re.hash : hash
	    params = re.hasOwnProperty('params') ? re.params : params

	    if (name) {
	      // resolved named direct
	      var targetRecord = nameMap[name]
	      if (process.env.NODE_ENV !== 'production') {
	        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."))
	      }
	      return match({
	        _normalized: true,
	        name: name,
	        query: query,
	        hash: hash,
	        params: params
	      }, undefined, location)
	    } else if (path) {
	      // 1. resolve relative redirect
	      var rawPath = resolveRecordPath(path, record)
	      // 2. resolve params
	      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""))
	      // 3. rematch with existing query and hash
	      return match({
	        _normalized: true,
	        path: resolvedPath,
	        query: query,
	        hash: hash
	      }, undefined, location)
	    } else {
	      warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))))
	      return _createRoute(null, location)
	    }
	  }

	  function alias (
	    record,
	    location,
	    matchAs
	  ) {
	    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""))
	    var aliasedMatch = match({
	      _normalized: true,
	      path: aliasedPath
	    })
	    if (aliasedMatch) {
	      var matched = aliasedMatch.matched
	      var aliasedRecord = matched[matched.length - 1]
	      location.params = aliasedMatch.params
	      return _createRoute(aliasedRecord, location)
	    }
	    return _createRoute(null, location)
	  }

	  function _createRoute (
	    record,
	    location,
	    redirectedFrom
	  ) {
	    if (record && record.redirect) {
	      return redirect(record, redirectedFrom || location)
	    }
	    if (record && record.matchAs) {
	      return alias(record, location, record.matchAs)
	    }
	    return createRoute(record, location, redirectedFrom)
	  }

	  return match
	}

	function matchRoute (
	  path,
	  params,
	  pathname
	) {
	  var ref = getRouteRegex(path);
	  var regexp = ref.regexp;
	  var keys = ref.keys;
	  var m = pathname.match(regexp)

	  if (!m) {
	    return false
	  } else if (!params) {
	    return true
	  }

	  for (var i = 1, len = m.length; i < len; ++i) {
	    var key = keys[i - 1]
	    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i]
	    if (key) { params[key.name] = val }
	  }

	  return true
	}

	function resolveRecordPath (path, record) {
	  return resolvePath(path, record.parent ? record.parent.path : '/', true)
	}

	/*  */

	var inBrowser = typeof window !== 'undefined'

	var supportsHistory = inBrowser && (function () {
	  var ua = window.navigator.userAgent

	  if (
	    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
	    ua.indexOf('Mobile Safari') !== -1 &&
	    ua.indexOf('Chrome') === -1 &&
	    ua.indexOf('Windows Phone') === -1
	  ) {
	    return false
	  }

	  return window.history && 'pushState' in window.history
	})()

	/*  */

	function runQueue (queue, fn, cb) {
	  var step = function (index) {
	    if (index >= queue.length) {
	      cb()
	    } else {
	      if (queue[index]) {
	        fn(queue[index], function () {
	          step(index + 1)
	        })
	      } else {
	        step(index + 1)
	      }
	    }
	  }
	  step(0)
	}

	/*  */


	var History = function History (router, base) {
	  this.router = router
	  this.base = normalizeBase(base)
	  // start with a route object that stands for "nowhere"
	  this.current = START
	  this.pending = null
	};

	History.prototype.listen = function listen (cb) {
	  this.cb = cb
	};

	History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
	    var this$1 = this;

	  var route = this.router.match(location, this.current)
	  this.confirmTransition(route, function () {
	    this$1.updateRoute(route)
	    onComplete && onComplete(route)
	    this$1.ensureURL()
	  }, onAbort)
	};

	History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
	    var this$1 = this;

	  var current = this.current
	  var abort = function () { onAbort && onAbort() }
	  if (isSameRoute(route, current)) {
	    this.ensureURL()
	    return abort()
	  }

	  var ref = resolveQueue(this.current.matched, route.matched);
	    var deactivated = ref.deactivated;
	    var activated = ref.activated;

	  var queue = [].concat(
	    // in-component leave guards
	    extractLeaveGuards(deactivated),
	    // global before hooks
	    this.router.beforeHooks,
	    // enter guards
	    activated.map(function (m) { return m.beforeEnter; }),
	    // async components
	    resolveAsyncComponents(activated)
	  )

	  this.pending = route
	  var iterator = function (hook, next) {
	    if (this$1.pending !== route) {
	      return abort()
	    }
	    hook(route, current, function (to) {
	      if (to === false) {
	        // next(false) -> abort navigation, ensure current URL
	        this$1.ensureURL(true)
	        abort()
	      } else if (typeof to === 'string' || typeof to === 'object') {
	        // next('/') or next({ path: '/' }) -> redirect
	        (typeof to === 'object' && to.replace) ? this$1.replace(to) : this$1.push(to)
	        abort()
	      } else {
	        // confirm transition and pass on the value
	        next(to)
	      }
	    })
	  }

	  runQueue(queue, iterator, function () {
	    var postEnterCbs = []
	    var enterGuards = extractEnterGuards(activated, postEnterCbs, function () {
	      return this$1.current === route
	    })
	    // wait until async components are resolved before
	    // extracting in-component enter guards
	    runQueue(enterGuards, iterator, function () {
	      if (this$1.pending !== route) {
	        return abort()
	      }
	      this$1.pending = null
	      onComplete(route)
	      if (this$1.router.app) {
	        this$1.router.app.$nextTick(function () {
	          postEnterCbs.forEach(function (cb) { return cb(); })
	        })
	      }
	    })
	  })
	};

	History.prototype.updateRoute = function updateRoute (route) {
	  var prev = this.current
	  this.current = route
	  this.cb && this.cb(route)
	  this.router.afterHooks.forEach(function (hook) {
	    hook && hook(route, prev)
	  })
	};

	function normalizeBase (base) {
	  if (!base) {
	    if (inBrowser) {
	      // respect <base> tag
	      var baseEl = document.querySelector('base')
	      base = baseEl ? baseEl.getAttribute('href') : '/'
	    } else {
	      base = '/'
	    }
	  }
	  // make sure there's the starting slash
	  if (base.charAt(0) !== '/') {
	    base = '/' + base
	  }
	  // remove trailing slash
	  return base.replace(/\/$/, '')
	}

	function resolveQueue (
	  current,
	  next
	) {
	  var i
	  var max = Math.max(current.length, next.length)
	  for (i = 0; i < max; i++) {
	    if (current[i] !== next[i]) {
	      break
	    }
	  }
	  return {
	    activated: next.slice(i),
	    deactivated: current.slice(i)
	  }
	}

	function extractGuard (
	  def,
	  key
	) {
	  if (typeof def !== 'function') {
	    // extend now so that global mixins are applied.
	    def = _Vue.extend(def)
	  }
	  return def.options[key]
	}

	function extractLeaveGuards (matched) {
	  return flatten(flatMapComponents(matched, function (def, instance) {
	    var guard = extractGuard(def, 'beforeRouteLeave')
	    if (guard) {
	      return Array.isArray(guard)
	        ? guard.map(function (guard) { return wrapLeaveGuard(guard, instance); })
	        : wrapLeaveGuard(guard, instance)
	    }
	  }).reverse())
	}

	function wrapLeaveGuard (
	  guard,
	  instance
	) {
	  return function routeLeaveGuard () {
	    return guard.apply(instance, arguments)
	  }
	}

	function extractEnterGuards (
	  matched,
	  cbs,
	  isValid
	) {
	  return flatten(flatMapComponents(matched, function (def, _, match, key) {
	    var guard = extractGuard(def, 'beforeRouteEnter')
	    if (guard) {
	      return Array.isArray(guard)
	        ? guard.map(function (guard) { return wrapEnterGuard(guard, cbs, match, key, isValid); })
	        : wrapEnterGuard(guard, cbs, match, key, isValid)
	    }
	  }))
	}

	function wrapEnterGuard (
	  guard,
	  cbs,
	  match,
	  key,
	  isValid
	) {
	  return function routeEnterGuard (to, from, next) {
	    return guard(to, from, function (cb) {
	      next(cb)
	      if (typeof cb === 'function') {
	        cbs.push(function () {
	          // #750
	          // if a router-view is wrapped with an out-in transition,
	          // the instance may not have been registered at this time.
	          // we will need to poll for registration until current route
	          // is no longer valid.
	          poll(cb, match.instances, key, isValid)
	        })
	      }
	    })
	  }
	}

	function poll (
	  cb, // somehow flow cannot infer this is a function
	  instances,
	  key,
	  isValid
	) {
	  if (instances[key]) {
	    cb(instances[key])
	  } else if (isValid()) {
	    setTimeout(function () {
	      poll(cb, instances, key, isValid)
	    }, 16)
	  }
	}

	function resolveAsyncComponents (matched) {
	  return flatMapComponents(matched, function (def, _, match, key) {
	    // if it's a function and doesn't have Vue options attached,
	    // assume it's an async component resolve function.
	    // we are not using Vue's default async resolving mechanism because
	    // we want to halt the navigation until the incoming component has been
	    // resolved.
	    if (typeof def === 'function' && !def.options) {
	      return function (to, from, next) {
	        var resolve = function (resolvedDef) {
	          match.components[key] = resolvedDef
	          next()
	        }

	        var reject = function (reason) {
	          warn(false, ("Failed to resolve async component " + key + ": " + reason))
	          next(false)
	        }

	        var res = def(resolve, reject)
	        if (res && typeof res.then === 'function') {
	          res.then(resolve, reject)
	        }
	      }
	    }
	  })
	}

	function flatMapComponents (
	  matched,
	  fn
	) {
	  return flatten(matched.map(function (m) {
	    return Object.keys(m.components).map(function (key) { return fn(
	      m.components[key],
	      m.instances[key],
	      m, key
	    ); })
	  }))
	}

	function flatten (arr) {
	  return Array.prototype.concat.apply([], arr)
	}

	/*  */

	var positionStore = Object.create(null)

	function saveScrollPosition (key) {
	  if (!key) { return }
	  positionStore[key] = {
	    x: window.pageXOffset,
	    y: window.pageYOffset
	  }
	}

	function getScrollPosition (key) {
	  if (!key) { return }
	  return positionStore[key]
	}

	function getElementPosition (el) {
	  var docRect = document.documentElement.getBoundingClientRect()
	  var elRect = el.getBoundingClientRect()
	  return {
	    x: elRect.left - docRect.left,
	    y: elRect.top - docRect.top
	  }
	}

	function isValidPosition (obj) {
	  return isNumber(obj.x) || isNumber(obj.y)
	}

	function normalizePosition (obj) {
	  return {
	    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
	    y: isNumber(obj.y) ? obj.y : window.pageYOffset
	  }
	}

	function isNumber (v) {
	  return typeof v === 'number'
	}

	/*  */


	// use User Timing api (if present) for more accurate key precision
	var Time = inBrowser && window.performance && window.performance.now
	  ? window.performance
	  : Date

	var genKey = function () { return String(Time.now()); }
	var _key = genKey()

	var HTML5History = (function (History) {
	  function HTML5History (router, base) {
	    var this$1 = this;

	    History.call(this, router, base)

	    var expectScroll = router.options.scrollBehavior
	    window.addEventListener('popstate', function (e) {
	      _key = e.state && e.state.key
	      var current = this$1.current
	      this$1.transitionTo(getLocation(this$1.base), function (next) {
	        if (expectScroll) {
	          this$1.handleScroll(next, current, true)
	        }
	      })
	    })

	    if (expectScroll) {
	      window.addEventListener('scroll', function () {
	        saveScrollPosition(_key)
	      })
	    }
	  }

	  if ( History ) HTML5History.__proto__ = History;
	  HTML5History.prototype = Object.create( History && History.prototype );
	  HTML5History.prototype.constructor = HTML5History;

	  HTML5History.prototype.go = function go (n) {
	    window.history.go(n)
	  };

	  HTML5History.prototype.push = function push (location) {
	    var this$1 = this;

	    var current = this.current
	    this.transitionTo(location, function (route) {
	      pushState(cleanPath(this$1.base + route.fullPath))
	      this$1.handleScroll(route, current, false)
	    })
	  };

	  HTML5History.prototype.replace = function replace (location) {
	    var this$1 = this;

	    var current = this.current
	    this.transitionTo(location, function (route) {
	      replaceState(cleanPath(this$1.base + route.fullPath))
	      this$1.handleScroll(route, current, false)
	    })
	  };

	  HTML5History.prototype.ensureURL = function ensureURL (push) {
	    if (getLocation(this.base) !== this.current.fullPath) {
	      var current = cleanPath(this.base + this.current.fullPath)
	      push ? pushState(current) : replaceState(current)
	    }
	  };

	  HTML5History.prototype.handleScroll = function handleScroll (to, from, isPop) {
	    var router = this.router
	    if (!router.app) {
	      return
	    }

	    var behavior = router.options.scrollBehavior
	    if (!behavior) {
	      return
	    }
	    if (process.env.NODE_ENV !== 'production') {
	      assert(typeof behavior === 'function', "scrollBehavior must be a function")
	    }

	    // wait until re-render finishes before scrolling
	    router.app.$nextTick(function () {
	      var position = getScrollPosition(_key)
	      var shouldScroll = behavior(to, from, isPop ? position : null)
	      if (!shouldScroll) {
	        return
	      }
	      var isObject = typeof shouldScroll === 'object'
	      if (isObject && typeof shouldScroll.selector === 'string') {
	        var el = document.querySelector(shouldScroll.selector)
	        if (el) {
	          position = getElementPosition(el)
	        } else if (isValidPosition(shouldScroll)) {
	          position = normalizePosition(shouldScroll)
	        }
	      } else if (isObject && isValidPosition(shouldScroll)) {
	        position = normalizePosition(shouldScroll)
	      }

	      if (position) {
	        window.scrollTo(position.x, position.y)
	      }
	    })
	  };

	  return HTML5History;
	}(History));

	function getLocation (base) {
	  var path = window.location.pathname
	  if (base && path.indexOf(base) === 0) {
	    path = path.slice(base.length)
	  }
	  return (path || '/') + window.location.search + window.location.hash
	}

	function pushState (url, replace) {
	  // try...catch the pushState call to get around Safari
	  // DOM Exception 18 where it limits to 100 pushState calls
	  var history = window.history
	  try {
	    if (replace) {
	      history.replaceState({ key: _key }, '', url)
	    } else {
	      _key = genKey()
	      history.pushState({ key: _key }, '', url)
	    }
	    saveScrollPosition(_key)
	  } catch (e) {
	    window.location[replace ? 'replace' : 'assign'](url)
	  }
	}

	function replaceState (url) {
	  pushState(url, true)
	}

	/*  */


	var HashHistory = (function (History) {
	  function HashHistory (router, base, fallback) {
	    History.call(this, router, base)
	    // check history fallback deeplinking
	    if (fallback && this.checkFallback()) {
	      return
	    }
	    ensureSlash()
	  }

	  if ( History ) HashHistory.__proto__ = History;
	  HashHistory.prototype = Object.create( History && History.prototype );
	  HashHistory.prototype.constructor = HashHistory;

	  HashHistory.prototype.checkFallback = function checkFallback () {
	    var location = getLocation(this.base)
	    if (!/^\/#/.test(location)) {
	      window.location.replace(
	        cleanPath(this.base + '/#' + location)
	      )
	      return true
	    }
	  };

	  HashHistory.prototype.onHashChange = function onHashChange () {
	    if (!ensureSlash()) {
	      return
	    }
	    this.transitionTo(getHash(), function (route) {
	      replaceHash(route.fullPath)
	    })
	  };

	  HashHistory.prototype.push = function push (location) {
	    this.transitionTo(location, function (route) {
	      pushHash(route.fullPath)
	    })
	  };

	  HashHistory.prototype.replace = function replace (location) {
	    this.transitionTo(location, function (route) {
	      replaceHash(route.fullPath)
	    })
	  };

	  HashHistory.prototype.go = function go (n) {
	    window.history.go(n)
	  };

	  HashHistory.prototype.ensureURL = function ensureURL (push) {
	    var current = this.current.fullPath
	    if (getHash() !== current) {
	      push ? pushHash(current) : replaceHash(current)
	    }
	  };

	  return HashHistory;
	}(History));

	function ensureSlash () {
	  var path = getHash()
	  if (path.charAt(0) === '/') {
	    return true
	  }
	  replaceHash('/' + path)
	  return false
	}

	function getHash () {
	  // We can't use window.location.hash here because it's not
	  // consistent across browsers - Firefox will pre-decode it!
	  var href = window.location.href
	  var index = href.indexOf('#')
	  return index === -1 ? '' : href.slice(index + 1)
	}

	function pushHash (path) {
	  window.location.hash = path
	}

	function replaceHash (path) {
	  var i = window.location.href.indexOf('#')
	  window.location.replace(
	    window.location.href.slice(0, i >= 0 ? i : 0) + '#' + path
	  )
	}

	/*  */


	var AbstractHistory = (function (History) {
	  function AbstractHistory (router, base) {
	    History.call(this, router, base)
	    this.stack = []
	    this.index = -1
	  }

	  if ( History ) AbstractHistory.__proto__ = History;
	  AbstractHistory.prototype = Object.create( History && History.prototype );
	  AbstractHistory.prototype.constructor = AbstractHistory;

	  AbstractHistory.prototype.push = function push (location) {
	    var this$1 = this;

	    this.transitionTo(location, function (route) {
	      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route)
	      this$1.index++
	    })
	  };

	  AbstractHistory.prototype.replace = function replace (location) {
	    var this$1 = this;

	    this.transitionTo(location, function (route) {
	      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route)
	    })
	  };

	  AbstractHistory.prototype.go = function go (n) {
	    var this$1 = this;

	    var targetIndex = this.index + n
	    if (targetIndex < 0 || targetIndex >= this.stack.length) {
	      return
	    }
	    var route = this.stack[targetIndex]
	    this.confirmTransition(route, function () {
	      this$1.index = targetIndex
	      this$1.updateRoute(route)
	    })
	  };

	  AbstractHistory.prototype.ensureURL = function ensureURL () {
	    // noop
	  };

	  return AbstractHistory;
	}(History));

	/*  */

	var VueRouter = function VueRouter (options) {
	  if ( options === void 0 ) options = {};

	  this.app = null
	  this.options = options
	  this.beforeHooks = []
	  this.afterHooks = []
	  this.match = createMatcher(options.routes || [])

	  var mode = options.mode || 'hash'
	  this.fallback = mode === 'history' && !supportsHistory
	  if (this.fallback) {
	    mode = 'hash'
	  }
	  if (!inBrowser) {
	    mode = 'abstract'
	  }
	  this.mode = mode

	  switch (mode) {
	    case 'history':
	      this.history = new HTML5History(this, options.base)
	      break
	    case 'hash':
	      this.history = new HashHistory(this, options.base, this.fallback)
	      break
	    case 'abstract':
	      this.history = new AbstractHistory(this, options.base)
	      break
	    default:
	      process.env.NODE_ENV !== 'production' && assert(false, ("invalid mode: " + mode))
	  }
	};

	var prototypeAccessors = { currentRoute: {} };

	prototypeAccessors.currentRoute.get = function () {
	  return this.history && this.history.current
	};

	VueRouter.prototype.init = function init (app /* Vue component instance */) {
	    var this$1 = this;

	  process.env.NODE_ENV !== 'production' && assert(
	    install.installed,
	    "not installed. Make sure to call `Vue.use(VueRouter)` " +
	    "before creating root instance."
	  )

	  this.app = app

	  var history = this.history

	  if (history instanceof HTML5History) {
	    history.transitionTo(getLocation(history.base))
	  } else if (history instanceof HashHistory) {
	    var setupHashListener = function () {
	      window.addEventListener('hashchange', function () {
	        history.onHashChange()
	      })
	    }
	    history.transitionTo(getHash(), setupHashListener, setupHashListener)
	  }

	  history.listen(function (route) {
	    this$1.app._route = route
	  })
	};

	VueRouter.prototype.beforeEach = function beforeEach (fn) {
	  this.beforeHooks.push(fn)
	};

	VueRouter.prototype.afterEach = function afterEach (fn) {
	  this.afterHooks.push(fn)
	};

	VueRouter.prototype.push = function push (location) {
	  this.history.push(location)
	};

	VueRouter.prototype.replace = function replace (location) {
	  this.history.replace(location)
	};

	VueRouter.prototype.go = function go (n) {
	  this.history.go(n)
	};

	VueRouter.prototype.back = function back () {
	  this.go(-1)
	};

	VueRouter.prototype.forward = function forward () {
	  this.go(1)
	};

	VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
	  var route = to
	    ? this.resolve(to).resolved
	    : this.currentRoute
	  if (!route) {
	    return []
	  }
	  return [].concat.apply([], route.matched.map(function (m) {
	    return Object.keys(m.components).map(function (key) {
	      return m.components[key]
	    })
	  }))
	};

	VueRouter.prototype.resolve = function resolve (
	  to,
	  current,
	  append
	) {
	  var normalizedTo = normalizeLocation(to, current || this.history.current, append)
	  var resolved = this.match(normalizedTo, current)
	  var fullPath = resolved.redirectedFrom || resolved.fullPath
	  var base = this.history.base
	  var href = createHref(base, fullPath, this.mode)
	  return {
	    normalizedTo: normalizedTo,
	    resolved: resolved,
	    href: href
	  }
	};

	Object.defineProperties( VueRouter.prototype, prototypeAccessors );

	function createHref (base, fullPath, mode) {
	  var path = mode === 'hash' ? '#' + fullPath : fullPath
	  return base ? cleanPath(base + '/' + path) : path
	}

	VueRouter.install = install
	VueRouter.version = '2.1.3'

	if (inBrowser && window.Vue) {
	  window.Vue.use(VueRouter)
	}

	module.exports = VueRouter;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 4 */
/***/ function(module, exports) {

	/*!
	 * vue-resource v1.0.3
	 * https://github.com/vuejs/vue-resource
	 * Released under the MIT License.
	 */

	'use strict';

	/**
	 * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
	 */

	var RESOLVED = 0;
	var REJECTED = 1;
	var PENDING = 2;

	function Promise$1(executor) {

	    this.state = PENDING;
	    this.value = undefined;
	    this.deferred = [];

	    var promise = this;

	    try {
	        executor(function (x) {
	            promise.resolve(x);
	        }, function (r) {
	            promise.reject(r);
	        });
	    } catch (e) {
	        promise.reject(e);
	    }
	}

	Promise$1.reject = function (r) {
	    return new Promise$1(function (resolve, reject) {
	        reject(r);
	    });
	};

	Promise$1.resolve = function (x) {
	    return new Promise$1(function (resolve, reject) {
	        resolve(x);
	    });
	};

	Promise$1.all = function all(iterable) {
	    return new Promise$1(function (resolve, reject) {
	        var count = 0,
	            result = [];

	        if (iterable.length === 0) {
	            resolve(result);
	        }

	        function resolver(i) {
	            return function (x) {
	                result[i] = x;
	                count += 1;

	                if (count === iterable.length) {
	                    resolve(result);
	                }
	            };
	        }

	        for (var i = 0; i < iterable.length; i += 1) {
	            Promise$1.resolve(iterable[i]).then(resolver(i), reject);
	        }
	    });
	};

	Promise$1.race = function race(iterable) {
	    return new Promise$1(function (resolve, reject) {
	        for (var i = 0; i < iterable.length; i += 1) {
	            Promise$1.resolve(iterable[i]).then(resolve, reject);
	        }
	    });
	};

	var p$1 = Promise$1.prototype;

	p$1.resolve = function resolve(x) {
	    var promise = this;

	    if (promise.state === PENDING) {
	        if (x === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }

	        var called = false;

	        try {
	            var then = x && x['then'];

	            if (x !== null && typeof x === 'object' && typeof then === 'function') {
	                then.call(x, function (x) {
	                    if (!called) {
	                        promise.resolve(x);
	                    }
	                    called = true;
	                }, function (r) {
	                    if (!called) {
	                        promise.reject(r);
	                    }
	                    called = true;
	                });
	                return;
	            }
	        } catch (e) {
	            if (!called) {
	                promise.reject(e);
	            }
	            return;
	        }

	        promise.state = RESOLVED;
	        promise.value = x;
	        promise.notify();
	    }
	};

	p$1.reject = function reject(reason) {
	    var promise = this;

	    if (promise.state === PENDING) {
	        if (reason === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }

	        promise.state = REJECTED;
	        promise.value = reason;
	        promise.notify();
	    }
	};

	p$1.notify = function notify() {
	    var promise = this;

	    nextTick(function () {
	        if (promise.state !== PENDING) {
	            while (promise.deferred.length) {
	                var deferred = promise.deferred.shift(),
	                    onResolved = deferred[0],
	                    onRejected = deferred[1],
	                    resolve = deferred[2],
	                    reject = deferred[3];

	                try {
	                    if (promise.state === RESOLVED) {
	                        if (typeof onResolved === 'function') {
	                            resolve(onResolved.call(undefined, promise.value));
	                        } else {
	                            resolve(promise.value);
	                        }
	                    } else if (promise.state === REJECTED) {
	                        if (typeof onRejected === 'function') {
	                            resolve(onRejected.call(undefined, promise.value));
	                        } else {
	                            reject(promise.value);
	                        }
	                    }
	                } catch (e) {
	                    reject(e);
	                }
	            }
	        }
	    });
	};

	p$1.then = function then(onResolved, onRejected) {
	    var promise = this;

	    return new Promise$1(function (resolve, reject) {
	        promise.deferred.push([onResolved, onRejected, resolve, reject]);
	        promise.notify();
	    });
	};

	p$1.catch = function (onRejected) {
	    return this.then(undefined, onRejected);
	};

	/**
	 * Promise adapter.
	 */

	if (typeof Promise === 'undefined') {
	    window.Promise = Promise$1;
	}

	function PromiseObj(executor, context) {

	    if (executor instanceof Promise) {
	        this.promise = executor;
	    } else {
	        this.promise = new Promise(executor.bind(context));
	    }

	    this.context = context;
	}

	PromiseObj.all = function (iterable, context) {
	    return new PromiseObj(Promise.all(iterable), context);
	};

	PromiseObj.resolve = function (value, context) {
	    return new PromiseObj(Promise.resolve(value), context);
	};

	PromiseObj.reject = function (reason, context) {
	    return new PromiseObj(Promise.reject(reason), context);
	};

	PromiseObj.race = function (iterable, context) {
	    return new PromiseObj(Promise.race(iterable), context);
	};

	var p = PromiseObj.prototype;

	p.bind = function (context) {
	    this.context = context;
	    return this;
	};

	p.then = function (fulfilled, rejected) {

	    if (fulfilled && fulfilled.bind && this.context) {
	        fulfilled = fulfilled.bind(this.context);
	    }

	    if (rejected && rejected.bind && this.context) {
	        rejected = rejected.bind(this.context);
	    }

	    return new PromiseObj(this.promise.then(fulfilled, rejected), this.context);
	};

	p.catch = function (rejected) {

	    if (rejected && rejected.bind && this.context) {
	        rejected = rejected.bind(this.context);
	    }

	    return new PromiseObj(this.promise.catch(rejected), this.context);
	};

	p.finally = function (callback) {

	    return this.then(function (value) {
	        callback.call(this);
	        return value;
	    }, function (reason) {
	        callback.call(this);
	        return Promise.reject(reason);
	    });
	};

	/**
	 * Utility functions.
	 */

	var debug = false;var util = {};var slice = [].slice;


	function Util (Vue) {
	    util = Vue.util;
	    debug = Vue.config.debug || !Vue.config.silent;
	}

	function warn(msg) {
	    if (typeof console !== 'undefined' && debug) {
	        console.warn('[VueResource warn]: ' + msg);
	    }
	}

	function error(msg) {
	    if (typeof console !== 'undefined') {
	        console.error(msg);
	    }
	}

	function nextTick(cb, ctx) {
	    return util.nextTick(cb, ctx);
	}

	function trim(str) {
	    return str.replace(/^\s*|\s*$/g, '');
	}

	function toLower(str) {
	    return str ? str.toLowerCase() : '';
	}

	function toUpper(str) {
	    return str ? str.toUpperCase() : '';
	}

	var isArray = Array.isArray;

	function isString(val) {
	    return typeof val === 'string';
	}

	function isBoolean(val) {
	    return val === true || val === false;
	}

	function isFunction(val) {
	    return typeof val === 'function';
	}

	function isObject(obj) {
	    return obj !== null && typeof obj === 'object';
	}

	function isPlainObject(obj) {
	    return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
	}

	function isBlob(obj) {
	    return typeof Blob !== 'undefined' && obj instanceof Blob;
	}

	function isFormData(obj) {
	    return typeof FormData !== 'undefined' && obj instanceof FormData;
	}

	function when(value, fulfilled, rejected) {

	    var promise = PromiseObj.resolve(value);

	    if (arguments.length < 2) {
	        return promise;
	    }

	    return promise.then(fulfilled, rejected);
	}

	function options(fn, obj, opts) {

	    opts = opts || {};

	    if (isFunction(opts)) {
	        opts = opts.call(obj);
	    }

	    return merge(fn.bind({ $vm: obj, $options: opts }), fn, { $options: opts });
	}

	function each(obj, iterator) {

	    var i, key;

	    if (obj && typeof obj.length == 'number') {
	        for (i = 0; i < obj.length; i++) {
	            iterator.call(obj[i], obj[i], i);
	        }
	    } else if (isObject(obj)) {
	        for (key in obj) {
	            if (obj.hasOwnProperty(key)) {
	                iterator.call(obj[key], obj[key], key);
	            }
	        }
	    }

	    return obj;
	}

	var assign = Object.assign || _assign;

	function merge(target) {

	    var args = slice.call(arguments, 1);

	    args.forEach(function (source) {
	        _merge(target, source, true);
	    });

	    return target;
	}

	function defaults(target) {

	    var args = slice.call(arguments, 1);

	    args.forEach(function (source) {

	        for (var key in source) {
	            if (target[key] === undefined) {
	                target[key] = source[key];
	            }
	        }
	    });

	    return target;
	}

	function _assign(target) {

	    var args = slice.call(arguments, 1);

	    args.forEach(function (source) {
	        _merge(target, source);
	    });

	    return target;
	}

	function _merge(target, source, deep) {
	    for (var key in source) {
	        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
	            if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
	                target[key] = {};
	            }
	            if (isArray(source[key]) && !isArray(target[key])) {
	                target[key] = [];
	            }
	            _merge(target[key], source[key], deep);
	        } else if (source[key] !== undefined) {
	            target[key] = source[key];
	        }
	    }
	}

	/**
	 * Root Prefix Transform.
	 */

	function root (options, next) {

	    var url = next(options);

	    if (isString(options.root) && !url.match(/^(https?:)?\//)) {
	        url = options.root + '/' + url;
	    }

	    return url;
	}

	/**
	 * Query Parameter Transform.
	 */

	function query (options, next) {

	    var urlParams = Object.keys(Url.options.params),
	        query = {},
	        url = next(options);

	    each(options.params, function (value, key) {
	        if (urlParams.indexOf(key) === -1) {
	            query[key] = value;
	        }
	    });

	    query = Url.params(query);

	    if (query) {
	        url += (url.indexOf('?') == -1 ? '?' : '&') + query;
	    }

	    return url;
	}

	/**
	 * URL Template v2.0.6 (https://github.com/bramstein/url-template)
	 */

	function expand(url, params, variables) {

	    var tmpl = parse(url),
	        expanded = tmpl.expand(params);

	    if (variables) {
	        variables.push.apply(variables, tmpl.vars);
	    }

	    return expanded;
	}

	function parse(template) {

	    var operators = ['+', '#', '.', '/', ';', '?', '&'],
	        variables = [];

	    return {
	        vars: variables,
	        expand: function (context) {
	            return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
	                if (expression) {

	                    var operator = null,
	                        values = [];

	                    if (operators.indexOf(expression.charAt(0)) !== -1) {
	                        operator = expression.charAt(0);
	                        expression = expression.substr(1);
	                    }

	                    expression.split(/,/g).forEach(function (variable) {
	                        var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
	                        values.push.apply(values, getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
	                        variables.push(tmp[1]);
	                    });

	                    if (operator && operator !== '+') {

	                        var separator = ',';

	                        if (operator === '?') {
	                            separator = '&';
	                        } else if (operator !== '#') {
	                            separator = operator;
	                        }

	                        return (values.length !== 0 ? operator : '') + values.join(separator);
	                    } else {
	                        return values.join(',');
	                    }
	                } else {
	                    return encodeReserved(literal);
	                }
	            });
	        }
	    };
	}

	function getValues(context, operator, key, modifier) {

	    var value = context[key],
	        result = [];

	    if (isDefined(value) && value !== '') {
	        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
	            value = value.toString();

	            if (modifier && modifier !== '*') {
	                value = value.substring(0, parseInt(modifier, 10));
	            }

	            result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
	        } else {
	            if (modifier === '*') {
	                if (Array.isArray(value)) {
	                    value.filter(isDefined).forEach(function (value) {
	                        result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
	                    });
	                } else {
	                    Object.keys(value).forEach(function (k) {
	                        if (isDefined(value[k])) {
	                            result.push(encodeValue(operator, value[k], k));
	                        }
	                    });
	                }
	            } else {
	                var tmp = [];

	                if (Array.isArray(value)) {
	                    value.filter(isDefined).forEach(function (value) {
	                        tmp.push(encodeValue(operator, value));
	                    });
	                } else {
	                    Object.keys(value).forEach(function (k) {
	                        if (isDefined(value[k])) {
	                            tmp.push(encodeURIComponent(k));
	                            tmp.push(encodeValue(operator, value[k].toString()));
	                        }
	                    });
	                }

	                if (isKeyOperator(operator)) {
	                    result.push(encodeURIComponent(key) + '=' + tmp.join(','));
	                } else if (tmp.length !== 0) {
	                    result.push(tmp.join(','));
	                }
	            }
	        }
	    } else {
	        if (operator === ';') {
	            result.push(encodeURIComponent(key));
	        } else if (value === '' && (operator === '&' || operator === '?')) {
	            result.push(encodeURIComponent(key) + '=');
	        } else if (value === '') {
	            result.push('');
	        }
	    }

	    return result;
	}

	function isDefined(value) {
	    return value !== undefined && value !== null;
	}

	function isKeyOperator(operator) {
	    return operator === ';' || operator === '&' || operator === '?';
	}

	function encodeValue(operator, value, key) {

	    value = operator === '+' || operator === '#' ? encodeReserved(value) : encodeURIComponent(value);

	    if (key) {
	        return encodeURIComponent(key) + '=' + value;
	    } else {
	        return value;
	    }
	}

	function encodeReserved(str) {
	    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
	        if (!/%[0-9A-Fa-f]/.test(part)) {
	            part = encodeURI(part);
	        }
	        return part;
	    }).join('');
	}

	/**
	 * URL Template (RFC 6570) Transform.
	 */

	function template (options) {

	    var variables = [],
	        url = expand(options.url, options.params, variables);

	    variables.forEach(function (key) {
	        delete options.params[key];
	    });

	    return url;
	}

	/**
	 * Service for URL templating.
	 */

	var ie = document.documentMode;
	var el = document.createElement('a');

	function Url(url, params) {

	    var self = this || {},
	        options = url,
	        transform;

	    if (isString(url)) {
	        options = { url: url, params: params };
	    }

	    options = merge({}, Url.options, self.$options, options);

	    Url.transforms.forEach(function (handler) {
	        transform = factory(handler, transform, self.$vm);
	    });

	    return transform(options);
	}

	/**
	 * Url options.
	 */

	Url.options = {
	    url: '',
	    root: null,
	    params: {}
	};

	/**
	 * Url transforms.
	 */

	Url.transforms = [template, query, root];

	/**
	 * Encodes a Url parameter string.
	 *
	 * @param {Object} obj
	 */

	Url.params = function (obj) {

	    var params = [],
	        escape = encodeURIComponent;

	    params.add = function (key, value) {

	        if (isFunction(value)) {
	            value = value();
	        }

	        if (value === null) {
	            value = '';
	        }

	        this.push(escape(key) + '=' + escape(value));
	    };

	    serialize(params, obj);

	    return params.join('&').replace(/%20/g, '+');
	};

	/**
	 * Parse a URL and return its components.
	 *
	 * @param {String} url
	 */

	Url.parse = function (url) {

	    if (ie) {
	        el.href = url;
	        url = el.href;
	    }

	    el.href = url;

	    return {
	        href: el.href,
	        protocol: el.protocol ? el.protocol.replace(/:$/, '') : '',
	        port: el.port,
	        host: el.host,
	        hostname: el.hostname,
	        pathname: el.pathname.charAt(0) === '/' ? el.pathname : '/' + el.pathname,
	        search: el.search ? el.search.replace(/^\?/, '') : '',
	        hash: el.hash ? el.hash.replace(/^#/, '') : ''
	    };
	};

	function factory(handler, next, vm) {
	    return function (options) {
	        return handler.call(vm, options, next);
	    };
	}

	function serialize(params, obj, scope) {

	    var array = isArray(obj),
	        plain = isPlainObject(obj),
	        hash;

	    each(obj, function (value, key) {

	        hash = isObject(value) || isArray(value);

	        if (scope) {
	            key = scope + '[' + (plain || hash ? key : '') + ']';
	        }

	        if (!scope && array) {
	            params.add(value.name, value.value);
	        } else if (hash) {
	            serialize(params, value, key);
	        } else {
	            params.add(key, value);
	        }
	    });
	}

	/**
	 * XDomain client (Internet Explorer).
	 */

	function xdrClient (request) {
	    return new PromiseObj(function (resolve) {

	        var xdr = new XDomainRequest(),
	            handler = function (_ref) {
	            var type = _ref.type;


	            var status = 0;

	            if (type === 'load') {
	                status = 200;
	            } else if (type === 'error') {
	                status = 500;
	            }

	            resolve(request.respondWith(xdr.responseText, { status: status }));
	        };

	        request.abort = function () {
	            return xdr.abort();
	        };

	        xdr.open(request.method, request.getUrl());
	        xdr.timeout = 0;
	        xdr.onload = handler;
	        xdr.onerror = handler;
	        xdr.ontimeout = handler;
	        xdr.onprogress = function () {};
	        xdr.send(request.getBody());
	    });
	}

	/**
	 * CORS Interceptor.
	 */

	var ORIGIN_URL = Url.parse(location.href);
	var SUPPORTS_CORS = 'withCredentials' in new XMLHttpRequest();

	function cors (request, next) {

	    if (!isBoolean(request.crossOrigin) && crossOrigin(request)) {
	        request.crossOrigin = true;
	    }

	    if (request.crossOrigin) {

	        if (!SUPPORTS_CORS) {
	            request.client = xdrClient;
	        }

	        delete request.emulateHTTP;
	    }

	    next();
	}

	function crossOrigin(request) {

	    var requestUrl = Url.parse(Url(request));

	    return requestUrl.protocol !== ORIGIN_URL.protocol || requestUrl.host !== ORIGIN_URL.host;
	}

	/**
	 * Body Interceptor.
	 */

	function body (request, next) {

	    if (isFormData(request.body)) {

	        request.headers.delete('Content-Type');
	    } else if (isObject(request.body) || isArray(request.body)) {

	        if (request.emulateJSON) {
	            request.body = Url.params(request.body);
	            request.headers.set('Content-Type', 'application/x-www-form-urlencoded');
	        } else {
	            request.body = JSON.stringify(request.body);
	        }
	    }

	    next(function (response) {

	        Object.defineProperty(response, 'data', {
	            get: function () {
	                return this.body;
	            },
	            set: function (body) {
	                this.body = body;
	            }
	        });

	        return response.bodyText ? when(response.text(), function (text) {

	            var type = response.headers.get('Content-Type');

	            if (isString(type) && type.indexOf('application/json') === 0) {

	                try {
	                    response.body = JSON.parse(text);
	                } catch (e) {
	                    response.body = null;
	                }
	            } else {
	                response.body = text;
	            }

	            return response;
	        }) : response;
	    });
	}

	/**
	 * JSONP client.
	 */

	function jsonpClient (request) {
	    return new PromiseObj(function (resolve) {

	        var name = request.jsonp || 'callback',
	            callback = '_jsonp' + Math.random().toString(36).substr(2),
	            body = null,
	            handler,
	            script;

	        handler = function (_ref) {
	            var type = _ref.type;


	            var status = 0;

	            if (type === 'load' && body !== null) {
	                status = 200;
	            } else if (type === 'error') {
	                status = 500;
	            }

	            resolve(request.respondWith(body, { status: status }));

	            delete window[callback];
	            document.body.removeChild(script);
	        };

	        request.params[name] = callback;

	        window[callback] = function (result) {
	            body = JSON.stringify(result);
	        };

	        script = document.createElement('script');
	        script.src = request.getUrl();
	        script.type = 'text/javascript';
	        script.async = true;
	        script.onload = handler;
	        script.onerror = handler;

	        document.body.appendChild(script);
	    });
	}

	/**
	 * JSONP Interceptor.
	 */

	function jsonp (request, next) {

	    if (request.method == 'JSONP') {
	        request.client = jsonpClient;
	    }

	    next(function (response) {

	        if (request.method == 'JSONP') {

	            return when(response.json(), function (json) {

	                response.body = json;

	                return response;
	            });
	        }
	    });
	}

	/**
	 * Before Interceptor.
	 */

	function before (request, next) {

	    if (isFunction(request.before)) {
	        request.before.call(this, request);
	    }

	    next();
	}

	/**
	 * HTTP method override Interceptor.
	 */

	function method (request, next) {

	    if (request.emulateHTTP && /^(PUT|PATCH|DELETE)$/i.test(request.method)) {
	        request.headers.set('X-HTTP-Method-Override', request.method);
	        request.method = 'POST';
	    }

	    next();
	}

	/**
	 * Header Interceptor.
	 */

	function header (request, next) {

	    var headers = assign({}, Http.headers.common, !request.crossOrigin ? Http.headers.custom : {}, Http.headers[toLower(request.method)]);

	    each(headers, function (value, name) {
	        if (!request.headers.has(name)) {
	            request.headers.set(name, value);
	        }
	    });

	    next();
	}

	/**
	 * Timeout Interceptor.
	 */

	function timeout (request, next) {

	    var timeout;

	    if (request.timeout) {
	        timeout = setTimeout(function () {
	            request.abort();
	        }, request.timeout);
	    }

	    next(function (response) {

	        clearTimeout(timeout);
	    });
	}

	/**
	 * XMLHttp client.
	 */

	function xhrClient (request) {
	    return new PromiseObj(function (resolve) {

	        var xhr = new XMLHttpRequest(),
	            handler = function (event) {

	            var response = request.respondWith('response' in xhr ? xhr.response : xhr.responseText, {
	                status: xhr.status === 1223 ? 204 : xhr.status, // IE9 status bug
	                statusText: xhr.status === 1223 ? 'No Content' : trim(xhr.statusText)
	            });

	            each(trim(xhr.getAllResponseHeaders()).split('\n'), function (row) {
	                response.headers.append(row.slice(0, row.indexOf(':')), row.slice(row.indexOf(':') + 1));
	            });

	            resolve(response);
	        };

	        request.abort = function () {
	            return xhr.abort();
	        };

	        if (request.progress) {
	            if (request.method === 'GET') {
	                xhr.addEventListener('progress', request.progress);
	            } else if (/^(POST|PUT)$/i.test(request.method)) {
	                xhr.upload.addEventListener('progress', request.progress);
	            }
	        }

	        xhr.open(request.method, request.getUrl(), true);

	        if ('responseType' in xhr) {
	            xhr.responseType = 'blob';
	        }

	        if (request.credentials === true) {
	            xhr.withCredentials = true;
	        }

	        request.headers.forEach(function (value, name) {
	            xhr.setRequestHeader(name, value);
	        });

	        xhr.timeout = 0;
	        xhr.onload = handler;
	        xhr.onerror = handler;
	        xhr.send(request.getBody());
	    });
	}

	/**
	 * Base client.
	 */

	function Client (context) {

	    var reqHandlers = [sendRequest],
	        resHandlers = [],
	        handler;

	    if (!isObject(context)) {
	        context = null;
	    }

	    function Client(request) {
	        return new PromiseObj(function (resolve) {

	            function exec() {

	                handler = reqHandlers.pop();

	                if (isFunction(handler)) {
	                    handler.call(context, request, next);
	                } else {
	                    warn('Invalid interceptor of type ' + typeof handler + ', must be a function');
	                    next();
	                }
	            }

	            function next(response) {

	                if (isFunction(response)) {

	                    resHandlers.unshift(response);
	                } else if (isObject(response)) {

	                    resHandlers.forEach(function (handler) {
	                        response = when(response, function (response) {
	                            return handler.call(context, response) || response;
	                        });
	                    });

	                    when(response, resolve);

	                    return;
	                }

	                exec();
	            }

	            exec();
	        }, context);
	    }

	    Client.use = function (handler) {
	        reqHandlers.push(handler);
	    };

	    return Client;
	}

	function sendRequest(request, resolve) {

	    var client = request.client || xhrClient;

	    resolve(client(request));
	}

	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	/**
	 * HTTP Headers.
	 */

	var Headers = function () {
	    function Headers(headers) {
	        var _this = this;

	        classCallCheck(this, Headers);


	        this.map = {};

	        each(headers, function (value, name) {
	            return _this.append(name, value);
	        });
	    }

	    Headers.prototype.has = function has(name) {
	        return getName(this.map, name) !== null;
	    };

	    Headers.prototype.get = function get(name) {

	        var list = this.map[getName(this.map, name)];

	        return list ? list[0] : null;
	    };

	    Headers.prototype.getAll = function getAll(name) {
	        return this.map[getName(this.map, name)] || [];
	    };

	    Headers.prototype.set = function set(name, value) {
	        this.map[normalizeName(getName(this.map, name) || name)] = [trim(value)];
	    };

	    Headers.prototype.append = function append(name, value) {

	        var list = this.getAll(name);

	        if (list.length) {
	            list.push(trim(value));
	        } else {
	            this.set(name, value);
	        }
	    };

	    Headers.prototype.delete = function _delete(name) {
	        delete this.map[getName(this.map, name)];
	    };

	    Headers.prototype.forEach = function forEach(callback, thisArg) {
	        var _this2 = this;

	        each(this.map, function (list, name) {
	            each(list, function (value) {
	                return callback.call(thisArg, value, name, _this2);
	            });
	        });
	    };

	    return Headers;
	}();

	function getName(map, name) {
	    return Object.keys(map).reduce(function (prev, curr) {
	        return toLower(name) === toLower(curr) ? curr : prev;
	    }, null);
	}

	function normalizeName(name) {

	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	        throw new TypeError('Invalid character in header field name');
	    }

	    return trim(name);
	}

	/**
	 * HTTP Response.
	 */

	var Response = function () {
	    function Response(body, _ref) {
	        var url = _ref.url;
	        var headers = _ref.headers;
	        var status = _ref.status;
	        var statusText = _ref.statusText;
	        classCallCheck(this, Response);


	        this.url = url;
	        this.ok = status >= 200 && status < 300;
	        this.status = status || 0;
	        this.statusText = statusText || '';
	        this.headers = new Headers(headers);
	        this.body = body;

	        if (isString(body)) {

	            this.bodyText = body;
	        } else if (isBlob(body)) {

	            this.bodyBlob = body;

	            if (isBlobText(body)) {
	                this.bodyText = blobText(body);
	            }
	        }
	    }

	    Response.prototype.blob = function blob() {
	        return when(this.bodyBlob);
	    };

	    Response.prototype.text = function text() {
	        return when(this.bodyText);
	    };

	    Response.prototype.json = function json() {
	        return when(this.text(), function (text) {
	            return JSON.parse(text);
	        });
	    };

	    return Response;
	}();

	function blobText(body) {
	    return new PromiseObj(function (resolve) {

	        var reader = new FileReader();

	        reader.readAsText(body);
	        reader.onload = function () {
	            resolve(reader.result);
	        };
	    });
	}

	function isBlobText(body) {
	    return body.type.indexOf('text') === 0 || body.type.indexOf('json') !== -1;
	}

	/**
	 * HTTP Request.
	 */

	var Request = function () {
	    function Request(options) {
	        classCallCheck(this, Request);


	        this.body = null;
	        this.params = {};

	        assign(this, options, {
	            method: toUpper(options.method || 'GET')
	        });

	        if (!(this.headers instanceof Headers)) {
	            this.headers = new Headers(this.headers);
	        }
	    }

	    Request.prototype.getUrl = function getUrl() {
	        return Url(this);
	    };

	    Request.prototype.getBody = function getBody() {
	        return this.body;
	    };

	    Request.prototype.respondWith = function respondWith(body, options) {
	        return new Response(body, assign(options || {}, { url: this.getUrl() }));
	    };

	    return Request;
	}();

	/**
	 * Service for sending network requests.
	 */

	var CUSTOM_HEADERS = { 'X-Requested-With': 'XMLHttpRequest' };
	var COMMON_HEADERS = { 'Accept': 'application/json, text/plain, */*' };
	var JSON_CONTENT_TYPE = { 'Content-Type': 'application/json;charset=utf-8' };

	function Http(options) {

	    var self = this || {},
	        client = Client(self.$vm);

	    defaults(options || {}, self.$options, Http.options);

	    Http.interceptors.forEach(function (handler) {
	        client.use(handler);
	    });

	    return client(new Request(options)).then(function (response) {

	        return response.ok ? response : PromiseObj.reject(response);
	    }, function (response) {

	        if (response instanceof Error) {
	            error(response);
	        }

	        return PromiseObj.reject(response);
	    });
	}

	Http.options = {};

	Http.headers = {
	    put: JSON_CONTENT_TYPE,
	    post: JSON_CONTENT_TYPE,
	    patch: JSON_CONTENT_TYPE,
	    delete: JSON_CONTENT_TYPE,
	    custom: CUSTOM_HEADERS,
	    common: COMMON_HEADERS
	};

	Http.interceptors = [before, timeout, method, body, jsonp, header, cors];

	['get', 'delete', 'head', 'jsonp'].forEach(function (method) {

	    Http[method] = function (url, options) {
	        return this(assign(options || {}, { url: url, method: method }));
	    };
	});

	['post', 'put', 'patch'].forEach(function (method) {

	    Http[method] = function (url, body, options) {
	        return this(assign(options || {}, { url: url, method: method, body: body }));
	    };
	});

	/**
	 * Service for interacting with RESTful services.
	 */

	function Resource(url, params, actions, options) {

	    var self = this || {},
	        resource = {};

	    actions = assign({}, Resource.actions, actions);

	    each(actions, function (action, name) {

	        action = merge({ url: url, params: assign({}, params) }, options, action);

	        resource[name] = function () {
	            return (self.$http || Http)(opts(action, arguments));
	        };
	    });

	    return resource;
	}

	function opts(action, args) {

	    var options = assign({}, action),
	        params = {},
	        body;

	    switch (args.length) {

	        case 2:

	            params = args[0];
	            body = args[1];

	            break;

	        case 1:

	            if (/^(POST|PUT|PATCH)$/i.test(options.method)) {
	                body = args[0];
	            } else {
	                params = args[0];
	            }

	            break;

	        case 0:

	            break;

	        default:

	            throw 'Expected up to 4 arguments [params, body], got ' + args.length + ' arguments';
	    }

	    options.body = body;
	    options.params = assign({}, options.params, params);

	    return options;
	}

	Resource.actions = {

	    get: { method: 'GET' },
	    save: { method: 'POST' },
	    query: { method: 'GET' },
	    update: { method: 'PUT' },
	    remove: { method: 'DELETE' },
	    delete: { method: 'DELETE' }

	};

	/**
	 * Install plugin.
	 */

	function plugin(Vue) {

	    if (plugin.installed) {
	        return;
	    }

	    Util(Vue);

	    Vue.url = Url;
	    Vue.http = Http;
	    Vue.resource = Resource;
	    Vue.Promise = PromiseObj;

	    Object.defineProperties(Vue.prototype, {

	        $url: {
	            get: function () {
	                return options(Vue.url, this, this.$options.url);
	            }
	        },

	        $http: {
	            get: function () {
	                return options(Vue.http, this, this.$options.http);
	            }
	        },

	        $resource: {
	            get: function () {
	                return Vue.resource.bind(this);
	            }
	        },

	        $promise: {
	            get: function () {
	                var _this = this;

	                return function (executor) {
	                    return new Vue.Promise(executor, _this);
	                };
	            }
	        }

	    });
	}

	if (typeof window !== 'undefined' && window.Vue) {
	    window.Vue.use(plugin);
	}

	module.exports = plugin;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mainPage = __webpack_require__(6);

	var _mainPage2 = _interopRequireDefault(_mainPage);

	var _sellPage = __webpack_require__(30);

	var _sellPage2 = _interopRequireDefault(_sellPage);

	var _userPage = __webpack_require__(40);

	var _userPage2 = _interopRequireDefault(_userPage);

	var _searchPage = __webpack_require__(45);

	var _searchPage2 = _interopRequireDefault(_searchPage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//声明路径和相应路径要跳转的目标组件
	exports.default = [
	//路由
	{
	  path: '/mainPage',
	  name: 'mainPage',
	  component: _mainPage2.default
	}, {
	  path: '/sellPage',
	  name: 'sellPage',
	  component: _sellPage2.default

	}, {
	  path: '/userPage',
	  name: 'userPage',
	  component: _userPage2.default

	}, {
	  path: '/searchPage',
	  name: 'searchPage',
	  component: _searchPage2.default

	}, {
	  path: '/',
	  redirect: '/mainPage'
	}];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(7)

	/* script */
	__vue_exports__ = __webpack_require__(11)

	/* template */
	var __vue_template__ = __webpack_require__(28)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/qiusz/qiushangzhe/myCode/sellApp/sellVueProject/app/views/mainPage/mainPage.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-59e10d39", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-59e10d39", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mainPage.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/.0.23.1@css-loader/index.js!./../../../node_modules/.10.0.2@vue-loader/lib/style-rewriter.js?id=data-v-59e10d39!./../../../node_modules/.4.1.1@sass-loader/index.js!./mainPage.scss", function() {
				var newContent = require("!!./../../../node_modules/.0.23.1@css-loader/index.js!./../../../node_modules/.10.0.2@vue-loader/lib/style-rewriter.js?id=data-v-59e10d39!./../../../node_modules/.4.1.1@sass-loader/index.js!./mainPage.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, "\n.mainPage .main-page-header {\n  position: relative;\n  height: 100px;\n}\n.mainPage .main-page-header img {\n    width: 100%;\n    height: 100px;\n}\n.mainPage .main-page-header .mask {\n    position: absolute;\n    top: 0;\n    left: 0;\n    background-color: rgba(0, 0, 0, 0.4);\n    width: 100%;\n    height: 100px;\n}\n.mainPage .main-page-header .mask .title {\n      font-size: 2em;\n      color: #f1ebe5;\n      line-height: 100px;\n      text-shadow: 0 8px 9px #c4b59d, 0 -2px 1px #fff;\n      font-weight: bold;\n      letter-spacing: -4px;\n      text-align: center;\n}\n.mainPage .shopList {\n  overflow-y: scroll;\n}\n.mainPage .moreTag {\n  height: 50px;\n  line-height: 50px;\n  text-align: center;\n  background-color: #fff;\n  width: 100%;\n}\n.mainPage .other {\n  margin-bottom: 40px;\n  padding: 30px 0;\n  text-align: center;\n}\n", ""]);

	// exports


/***/ },
/* 9 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if (media) {
			styleElement.setAttribute("media", media);
		}

		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _footerBar = __webpack_require__(12);

	var _footerBar2 = _interopRequireDefault(_footerBar);

	var _typeNav = __webpack_require__(17);

	var _typeNav2 = _interopRequireDefault(_typeNav);

	var _shopCard = __webpack_require__(22);

	var _shopCard2 = _interopRequireDefault(_shopCard);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    created: function created() {
	        this.init();
	        console.log('页面创建了');
	    },
	    data: function data() {
	        return {
	            hello: '大家好这里是主页',
	            shopList: []
	        };
	    },
	    methods: {
	        init: function init() {
	            this.getShopList();
	        },
	        getShopList: function getShopList() {
	            this.$http.get('../../../static/data/shoplist.json').then(function (res) {
	                res = res.data;
	                if (res.error.code == 0) {
	                    this.shopList = this.shopList.concat(res.data.shopList);
	                }
	            }, function (err) {
	                console.log(err);
	            });
	        }
	    },
	    components: {
	        'footerBar': _footerBar2.default,
	        'typeNav': _typeNav2.default,
	        'shopCard': _shopCard2.default
	    }
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(13)

	/* script */
	__vue_exports__ = __webpack_require__(15)

	/* template */
	var __vue_template__ = __webpack_require__(16)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/qiusz/qiushangzhe/myCode/sellApp/sellVueProject/app/components/footerBar/footerBar.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-34d91d8d", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-34d91d8d", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] footerBar.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(14);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/.0.23.1@css-loader/index.js!./../../../node_modules/.10.0.2@vue-loader/lib/style-rewriter.js?id=data-v-34d91d8d!./../../../node_modules/.4.1.1@sass-loader/index.js!./footerBar.scss", function() {
				var newContent = require("!!./../../../node_modules/.0.23.1@css-loader/index.js!./../../../node_modules/.10.0.2@vue-loader/lib/style-rewriter.js?id=data-v-34d91d8d!./../../../node_modules/.4.1.1@sass-loader/index.js!./footerBar.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, "\n.sell-footer {\n  position: fixed !important;\n  bottom: 0;\n  left: 0;\n  opacity: .9;\n}\n.sell-footer .active {\n    color: #3bc69c !important;\n}\n", ""]);

	// exports


/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    created: function created() {
	        this.init();
	    },
	    props: ['activeNum'],
	    data: function data() {
	        return {
	            num: this.activeNum,
	            navData: [{ title: '首页', icon: 'icon-home', link: '#/mainPage' }, { title: '发布', icon: 'icon-star', link: '#/sellPage' }, { title: '我', icon: 'icon-me', link: '#/userPage' }]
	        };
	    },
	    methods: {
	        init: function init() {}
	    }
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('nav', {
	    staticClass: "bar bar-tab sell-footer"
	  }, _vm._l((_vm.navData), function(item, index) {
	    return _c('a', {
	      staticClass: "tab-item external",
	      class: {
	        active: index == _vm.num
	      },
	      attrs: {
	        "href": item.link
	      }
	    }, [_c('span', {
	      staticClass: "icon",
	      class: item.icon
	    }), _vm._v(" "), _c('span', {
	      staticClass: "tab-label"
	    }, [_vm._v(_vm._s(item.title))])])
	  }))
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-34d91d8d", module.exports)
	  }
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(18)

	/* script */
	__vue_exports__ = __webpack_require__(20)

	/* template */
	var __vue_template__ = __webpack_require__(21)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/qiusz/qiushangzhe/myCode/sellApp/sellVueProject/app/components/typeNav/typeNav.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-792e9c22", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-792e9c22", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] typeNav.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(19);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/.0.23.1@css-loader/index.js!./../../../node_modules/.10.0.2@vue-loader/lib/style-rewriter.js?id=data-v-792e9c22!./../../../node_modules/.4.1.1@sass-loader/index.js!./typeNav.scss", function() {
				var newContent = require("!!./../../../node_modules/.0.23.1@css-loader/index.js!./../../../node_modules/.10.0.2@vue-loader/lib/style-rewriter.js?id=data-v-792e9c22!./../../../node_modules/.4.1.1@sass-loader/index.js!./typeNav.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, "\n@charset \"UTF-8\";\n.type-nav {\n  background-color: #fff;\n  position: relative;\n  overflow: hidden;\n  font-weight: lighter;\n  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/\n}\n.type-nav ul {\n    margin: 0;\n    padding: 0;\n}\n.type-nav .list {\n    border-bottom: 0;\n    padding: 0;\n    list-style: none;\n    white-space: nowrap;\n    overflow-x: auto;\n    overflow-y: hidden;\n    float: left;\n    width: 90%;\n    border-right: 1px solid #ddd;\n    font-size: 14px;\n}\n.type-nav .list li {\n      padding: 15px 20px;\n      display: inline-block;\n      border: none;\n}\n.type-nav .list li a {\n        color: #b9b9b9;\n}\n.type-nav .list .active {\n      background-color: #3bc69c;\n}\n.type-nav .list .active a {\n        color: #fff;\n}\n.type-nav .search {\n    position: absolute;\n    width: 10%;\n    top: 0;\n    height: 44px;\n}\n.type-nav .search:before {\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      font-size: 14px;\n      transform: translate(-50%, -50%);\n      color: #3bc69c;\n}\n.type-nav ::-webkit-scrollbar {\n    width: 0;\n    height: 0;\n}\n.type-nav .childType {\n    width: 100%;\n    height: 30px;\n    clear: both;\n    border-top: 1px solid #ddd;\n    border-bottom: 1px solid #ddd;\n}\n.type-nav .childType li {\n      float: left;\n      width: 50%;\n      font-size: 6px;\n      line-height: 28px;\n      text-align: center;\n}\n.type-nav .childType li a {\n        color: #b9b9b9;\n        border-bottom: 2px solid translate;\n}\n.type-nav .childType li a.choose {\n          color: #3bc69c;\n          border-bottom: 2px solid #3bc69c;\n          padding-bottom: 3px;\n}\n", ""]);

	// exports


/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    created: function created() {
	        this.init();
	    },
	    data: function data() {
	        return {
	            num: 0,
	            childTyle: 0,
	            navData: [{ title: '全部' }, { title: '闲置数码' }, { title: '鞋服家居' }, { title: '二手教辅' }, { title: '其他' }]
	        };
	    },
	    methods: {
	        init: function init() {},
	        chooseType: function chooseType(num) {
	            this.num = num;
	            this.$router.push({ path: 'mainPage', query: { type: num } });
	        },
	        searchShop: function searchShop() {
	            this.$router.push({ path: 'searchPage' });
	        },
	        childTypeClick: function childTypeClick(num) {
	            this.childTyle = num;
	        }
	    }
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('nav', {
	    staticClass: "type-nav"
	  }, [_c('ul', {
	    staticClass: "list"
	  }, _vm._l((_vm.navData), function(item, index) {
	    return _c('li', {
	      class: {
	        active: index == _vm.num
	      },
	      on: {
	        "click": function($event) {
	          _vm.chooseType(index)
	        }
	      }
	    }, [_c('a', {
	      attrs: {
	        "href": item.link
	      }
	    }, [_vm._v(_vm._s(item.title))])])
	  })), _vm._v(" "), _c('span', {
	    staticClass: "icon icon-search search",
	    on: {
	      "click": function($event) {
	        _vm.searchShop()
	      }
	    }
	  }), _vm._v(" "), _c('ul', {
	    staticClass: "childType"
	  }, [_c('li', {
	    on: {
	      "click": function($event) {
	        _vm.childTypeClick(0)
	      }
	    }
	  }, [_c('a', {
	    class: {
	      choose: _vm.childTyle == 0
	    }
	  }, [_vm._v("最新")])]), _vm._v(" "), _c('li', {
	    on: {
	      "click": function($event) {
	        _vm.childTypeClick(1)
	      }
	    }
	  }, [_c('a', {
	    class: {
	      choose: _vm.childTyle == 1
	    }
	  }, [_vm._v("最火")])])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-792e9c22", module.exports)
	  }
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(23)

	/* script */
	__vue_exports__ = __webpack_require__(26)

	/* template */
	var __vue_template__ = __webpack_require__(27)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/qiusz/qiushangzhe/myCode/sellApp/sellVueProject/app/components/shopCard/shopCard.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-991d404a", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-991d404a", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] shopCard.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(24);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/.0.23.1@css-loader/index.js!./../../../node_modules/.10.0.2@vue-loader/lib/style-rewriter.js?id=data-v-991d404a!./../../../node_modules/.4.1.1@sass-loader/index.js!./shopCard.scss", function() {
				var newContent = require("!!./../../../node_modules/.0.23.1@css-loader/index.js!./../../../node_modules/.10.0.2@vue-loader/lib/style-rewriter.js?id=data-v-991d404a!./../../../node_modules/.4.1.1@sass-loader/index.js!./shopCard.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, "\n.shop-card {\n  background-color: #fff;\n  margin-bottom: 10px;\n}\n.shop-card header.shop-card-header {\n    overflow: hidden;\n    height: 50px;\n    padding: 5px 0;\n}\n.shop-card header.shop-card-header .headImgBox {\n      position: relative;\n      float: left;\n      width: 20%;\n      height: 100%;\n      text-align: center;\n      vertical-align: middle;\n}\n.shop-card header.shop-card-header .headImgBox img {\n        width: 40px;\n        height: 40px;\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        transform: translate(-50%, -50%);\n        border-radius: 25px;\n}\n.shop-card header.shop-card-header .centerBox {\n      float: left;\n      width: 60%;\n}\n.shop-card header.shop-card-header .centerBox p.centerTitle {\n        font-size: 20px;\n        color: #4a4646;\n}\n.shop-card header.shop-card-header .centerBox .centerOther span {\n        font-size: 13px;\n        color: #a9a9a9;\n}\n.shop-card header.shop-card-header .rightBox {\n      float: left;\n      width: 20%;\n      font-size: 14px;\n      line-height: 20px;\n      text-align: center;\n}\n.shop-card header.shop-card-header .rightBox .nowCost {\n        background-color: #f8f0ee;\n        color: #3ec59c;\n}\n.shop-card .shop-card-mainBox {\n    margin-left: 20%;\n    border-bottom: 1px solid #ddd;\n}\n.shop-card .shop-card-mainBox .shopPicList img {\n      width: 100px;\n      height: 100px;\n}\n.shop-card .shop-card-mainBox .shopIntro {\n      font-size: 13px;\n      padding: 5px 2px;\n}\n.shop-card footer.shop-card-footer {\n    margin-left: 20%;\n    overflow: hidden;\n}\n.shop-card footer.shop-card-footer .watchNum {\n      float: left;\n      padding: 10px 0;\n      font-size: 13px;\n      color: #868686;\n}\n.shop-card footer.shop-card-footer .goodTime {\n      float: right;\n      border: 1px solid #ddd;\n      border-radius: 5px;\n      width: 50px;\n      height: 25px;\n      text-align: center;\n      line-height: 25px;\n      font-size: 13px;\n      margin-right: 10px;\n      margin-top: 4px;\n      background-image: url(" + __webpack_require__(25) + ");\n      background-size: contain;\n      background-repeat: no-repeat;\n      padding-left: 20px;\n      background-position: 3px center;\n}\n.shop-card footer.shop-card-footer .goodTime:hover {\n        color: #3bc69c;\n}\n", ""]);

	// exports


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "./img/zan.png";

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var buffer = {
	    shopName: '', //名称
	    shoperName: '', //卖家名
	    shoperHeader: '', //卖家头像
	    originalCost: 0, //原价
	    nowCost: 0, //现价
	    sex: 0, //性别 1男 0女
	    publishData: 'x月x日',
	    shopPic: ['', ''], //商品图片url地址
	    shopIntroduct: '', //商品介绍
	    watchNumber: 0, //商品浏览次数
	    goodTime: 0 //点赞数

	};
	exports.default = {
	    created: function created() {
	        this.init();
	    },
	    props: {
	        shopObjData: {
	            type: Object
	        }
	    },
	    data: function data() {
	        return {
	            shopObj: this.shopObjData
	        };
	    },
	    methods: {
	        init: function init() {}
	    }
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "shop-card"
	  }, [_c('header', {
	    staticClass: "shop-card-header"
	  }, [_c('div', {
	    staticClass: "headImgBox"
	  }, [_c('img', {
	    attrs: {
	      "src": _vm.shopObj.shoperHeader,
	      "alt": "一个头像"
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "centerBox"
	  }, [_c('p', {
	    staticClass: "centerTitle"
	  }, [_vm._v("我有一个:" + _vm._s(_vm.shopObj.shopName))]), _vm._v(" "), _c('p', {
	    staticClass: "centerOther"
	  }, [_c('span', {
	    staticClass: "shoperName"
	  }, [_vm._v(_vm._s(_vm.shopObj.shoperName))]), _vm._v(" "), _c('span', {
	    staticClass: "sex"
	  }, [_vm._v(_vm._s(_vm.shopObj.sex == 0 ? '女' : '男'))]), _vm._v(" "), _c('span', {
	    staticClass: "date"
	  }, [_vm._v(_vm._s(_vm.shopObj.publishData))])])]), _vm._v(" "), _c('div', {
	    staticClass: "rightBox"
	  }, [_c('p', {
	    staticClass: "nowCost"
	  }, [_vm._v(_vm._s(_vm.shopObj.nowCost) + "元")]), _vm._v(" "), _c('p', {
	    staticClass: "originalCost"
	  }, [_c('s', [_vm._v(_vm._s(_vm.shopObj.originalCost) + "元")])])])]), _vm._v(" "), _c('div', {
	    staticClass: "shop-card-mainBox"
	  }, [_c('div', {
	    staticClass: "shopPicList"
	  }, _vm._l((_vm.shopObj.shopPic), function(item) {
	    return _c('img', {
	      attrs: {
	        "src": item,
	        "alt": "商品图"
	      }
	    })
	  })), _vm._v(" "), _c('div', {
	    staticClass: "shopIntro"
	  }, [_vm._v("\n            " + _vm._s(_vm.shopObj.shopIntroduct) + "\n        ")])]), _vm._v(" "), _c('footer', {
	    staticClass: "shop-card-footer"
	  }, [_c('p', {
	    staticClass: "watchNum"
	  }, [_vm._v("浏览量:" + _vm._s(_vm.shopObj.watchNumber))]), _vm._v(" "), _c('p', {
	    staticClass: "goodTime"
	  }, [_vm._v(_vm._s(_vm.shopObj.goodTime))])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-991d404a", module.exports)
	  }
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "mainPage content"
	  }, [_vm._m(0), _vm._v(" "), _c('type-nav'), _vm._v(" "), _c('div', {
	    staticClass: "shopList "
	  }, _vm._l((_vm.shopList), function(item) {
	    return _c('shop-card', {
	      attrs: {
	        "shopObjData": item
	      }
	    })
	  })), _vm._v(" "), _c('div', {
	    staticClass: "moreTag icon icon-down",
	    on: {
	      "click": function($event) {
	        _vm.getShopList()
	      }
	    }
	  }, [_vm._v("\n        点击加载更多\n    ")]), _vm._v(" "), _c('div', {
	    staticClass: "other "
	  }, [_vm._v("\n        qqqq提供技术支持\n    ")]), _vm._v(" "), _c('footer-bar', {
	    attrs: {
	      "activeNum": "0"
	    }
	  })], 1)
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('header', {
	    staticClass: "main-page-header"
	  }, [_c('img', {
	    attrs: {
	      "src": __webpack_require__(29)
	    }
	  }), _vm._v(" "), _c('div', {
	    staticClass: "mask"
	  }, [_c('p', {
	    staticClass: "title"
	  }, [_vm._v("二手交易市场")])])])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-59e10d39", module.exports)
	  }
	}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "./img/banner.png";

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(31)

	/* script */
	__vue_exports__ = __webpack_require__(33)

	/* template */
	var __vue_template__ = __webpack_require__(39)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/qiusz/qiushangzhe/myCode/sellApp/sellVueProject/app/views/sellPage/sellPage.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-59e9a959", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-59e9a959", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] sellPage.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(32);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/.0.23.1@css-loader/index.js!./../../../node_modules/.10.0.2@vue-loader/lib/style-rewriter.js?id=data-v-59e9a959!./../../../node_modules/.4.1.1@sass-loader/index.js!./sellPage.scss", function() {
				var newContent = require("!!./../../../node_modules/.0.23.1@css-loader/index.js!./../../../node_modules/.10.0.2@vue-loader/lib/style-rewriter.js?id=data-v-59e9a959!./../../../node_modules/.4.1.1@sass-loader/index.js!./sellPage.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, "", ""]);

	// exports


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _footerBar = __webpack_require__(12);

	var _footerBar2 = _interopRequireDefault(_footerBar);

	var _headerBar = __webpack_require__(34);

	var _headerBar2 = _interopRequireDefault(_headerBar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    data: function data() {
	        return {};
	    },
	    components: {
	        'footerBar': _footerBar2.default,
	        'headerBar': _headerBar2.default
	    }
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(35)

	/* script */
	__vue_exports__ = __webpack_require__(37)

	/* template */
	var __vue_template__ = __webpack_require__(38)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/qiusz/qiushangzhe/myCode/sellApp/sellVueProject/app/components/headerBar/headerBar.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-f6f61cae", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-f6f61cae", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] headerBar.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(36);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/.0.23.1@css-loader/index.js!./../../../node_modules/.10.0.2@vue-loader/lib/style-rewriter.js?id=data-v-f6f61cae!./../../../node_modules/.4.1.1@sass-loader/index.js!./../../../node_modules/.10.0.2@vue-loader/lib/selector.js?type=styles&index=0!./headerBar.vue", function() {
				var newContent = require("!!./../../../node_modules/.0.23.1@css-loader/index.js!./../../../node_modules/.10.0.2@vue-loader/lib/style-rewriter.js?id=data-v-f6f61cae!./../../../node_modules/.4.1.1@sass-loader/index.js!./../../../node_modules/.10.0.2@vue-loader/lib/selector.js?type=styles&index=0!./headerBar.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, "\n.sell-green a {\n  color: #3bc69c;\n}\n", ""]);

	// exports


/***/ },
/* 37 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	//
	//
	//
	//
	//
	//

	exports.default = {
	    props: ['titleText'],
	    data: function data() {
	        return {
	            title: this.titleText
	        };
	    }
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('header', {
	    staticClass: "bar bar-nav sell-green"
	  }, [_c('a', {
	    staticClass: "icon icon-left pull-left",
	    attrs: {
	      "href": "#/mainPage"
	    }
	  }), _vm._v(" "), _c('h1', {
	    staticClass: "title"
	  }, [_vm._v(_vm._s(_vm.title))])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-f6f61cae", module.exports)
	  }
	}

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "sell-page"
	  }, [_c('header-bar', {
	    attrs: {
	      "titleText": "发布商品"
	    }
	  }), _vm._v(" "), _c('footer-bar', {
	    attrs: {
	      "activeNum": "1"
	    }
	  })], 1)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-59e9a959", module.exports)
	  }
	}

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(41)

	/* script */
	__vue_exports__ = __webpack_require__(43)

	/* template */
	var __vue_template__ = __webpack_require__(44)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/qiusz/qiushangzhe/myCode/sellApp/sellVueProject/app/views/userPage/userPage.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-19358179", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-19358179", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] userPage.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(42);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/.0.23.1@css-loader/index.js!./../../../node_modules/.10.0.2@vue-loader/lib/style-rewriter.js?id=data-v-19358179!./../../../node_modules/.4.1.1@sass-loader/index.js!./userPage.scss", function() {
				var newContent = require("!!./../../../node_modules/.0.23.1@css-loader/index.js!./../../../node_modules/.10.0.2@vue-loader/lib/style-rewriter.js?id=data-v-19358179!./../../../node_modules/.4.1.1@sass-loader/index.js!./userPage.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, "", ""]);

	// exports


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _footerBar = __webpack_require__(12);

	var _footerBar2 = _interopRequireDefault(_footerBar);

	var _headerBar = __webpack_require__(34);

	var _headerBar2 = _interopRequireDefault(_headerBar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    data: function data() {
	        return {};
	    },
	    components: {
	        'footerBar': _footerBar2.default,
	        'headerBar': _headerBar2.default
	    }
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "user-page"
	  }, [_c('header-bar', {
	    attrs: {
	      "titleText": "个人中心"
	    }
	  }), _vm._v(" "), _c('footer-bar', {
	    attrs: {
	      "activeNum": "2"
	    }
	  })], 1)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-19358179", module.exports)
	  }
	}

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(46)

	/* script */
	__vue_exports__ = __webpack_require__(48)

	/* template */
	var __vue_template__ = __webpack_require__(49)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/qiusz/qiushangzhe/myCode/sellApp/sellVueProject/app/views/searchPage/searchPage.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-1f7cd9ce", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-1f7cd9ce", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] searchPage.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(47);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/.0.23.1@css-loader/index.js!./../../../node_modules/.10.0.2@vue-loader/lib/style-rewriter.js?id=data-v-1f7cd9ce!./../../../node_modules/.4.1.1@sass-loader/index.js!./searchPage.scss", function() {
				var newContent = require("!!./../../../node_modules/.0.23.1@css-loader/index.js!./../../../node_modules/.10.0.2@vue-loader/lib/style-rewriter.js?id=data-v-1f7cd9ce!./../../../node_modules/.4.1.1@sass-loader/index.js!./searchPage.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, "", ""]);

	// exports


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _footerBar = __webpack_require__(12);

	var _footerBar2 = _interopRequireDefault(_footerBar);

	var _headerBar = __webpack_require__(34);

	var _headerBar2 = _interopRequireDefault(_headerBar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    created: function created() {},
	    data: function data() {
	        return {
	            hello: '大家好这里是主页',
	            testList: ['苹果', '橘子', '鸭梨', '西红柿']
	        };
	    },
	    components: {
	        'footerBar': _footerBar2.default,
	        'headerBar': _headerBar2.default
	    }
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "search-page"
	  }, [_c('header-bar', {
	    attrs: {
	      "titleText": "商品搜索"
	    }
	  }), _vm._v(" "), _c('footer-bar')], 1)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-1f7cd9ce", module.exports)
	  }
	}

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "./index.html";

/***/ },
/* 51 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/* Zepto v1.1.6 - zepto event ajax form ie - zeptojs.com/license */

	var Zepto = function () {
	  var undefined,
	      key,
	      $,
	      classList,
	      emptyArray = [],
	      _slice = emptyArray.slice,
	      _filter = emptyArray.filter,
	      document = window.document,
	      elementDisplay = {},
	      classCache = {},
	      cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1, 'opacity': 1, 'z-index': 1, 'zoom': 1 },
	      fragmentRE = /^\s*<(\w+|!)[^>]*>/,
	      singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
	      tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
	      rootNodeRE = /^(?:body|html)$/i,
	      capitalRE = /([A-Z])/g,


	  // special attributes that should be get/set via method calls
	  methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],
	      adjacencyOperators = ['after', 'prepend', 'before', 'append'],
	      table = document.createElement('table'),
	      tableRow = document.createElement('tr'),
	      containers = {
	    'tr': document.createElement('tbody'),
	    'tbody': table, 'thead': table, 'tfoot': table,
	    'td': tableRow, 'th': tableRow,
	    '*': document.createElement('div')
	  },
	      readyRE = /complete|loaded|interactive/,
	      simpleSelectorRE = /^[\w-]*$/,
	      class2type = {},
	      toString = class2type.toString,
	      zepto = {},
	      camelize,
	      uniq,
	      tempParent = document.createElement('div'),
	      propMap = {
	    'tabindex': 'tabIndex',
	    'readonly': 'readOnly',
	    'for': 'htmlFor',
	    'class': 'className',
	    'maxlength': 'maxLength',
	    'cellspacing': 'cellSpacing',
	    'cellpadding': 'cellPadding',
	    'rowspan': 'rowSpan',
	    'colspan': 'colSpan',
	    'usemap': 'useMap',
	    'frameborder': 'frameBorder',
	    'contenteditable': 'contentEditable'
	  },
	      isArray = Array.isArray || function (object) {
	    return object instanceof Array;
	  };

	  zepto.matches = function (element, selector) {
	    if (!selector || !element || element.nodeType !== 1) return false;
	    var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector || element.oMatchesSelector || element.matchesSelector;
	    if (matchesSelector) return matchesSelector.call(element, selector);
	    // fall back to performing a selector:
	    var match,
	        parent = element.parentNode,
	        temp = !parent;
	    if (temp) (parent = tempParent).appendChild(element);
	    match = ~zepto.qsa(parent, selector).indexOf(element);
	    temp && tempParent.removeChild(element);
	    return match;
	  };

	  function type(obj) {
	    return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";
	  }

	  function isFunction(value) {
	    return type(value) == "function";
	  }
	  function isWindow(obj) {
	    return obj != null && obj == obj.window;
	  }
	  function isDocument(obj) {
	    return obj != null && obj.nodeType == obj.DOCUMENT_NODE;
	  }
	  function isObject(obj) {
	    return type(obj) == "object";
	  }
	  function isPlainObject(obj) {
	    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype;
	  }
	  function likeArray(obj) {
	    return typeof obj.length == 'number';
	  }

	  function compact(array) {
	    return _filter.call(array, function (item) {
	      return item != null;
	    });
	  }
	  function flatten(array) {
	    return array.length > 0 ? $.fn.concat.apply([], array) : array;
	  }
	  camelize = function camelize(str) {
	    return str.replace(/-+(.)?/g, function (match, chr) {
	      return chr ? chr.toUpperCase() : '';
	    });
	  };
	  function dasherize(str) {
	    return str.replace(/::/g, '/').replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2').replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/_/g, '-').toLowerCase();
	  }
	  uniq = function uniq(array) {
	    return _filter.call(array, function (item, idx) {
	      return array.indexOf(item) == idx;
	    });
	  };

	  function classRE(name) {
	    return name in classCache ? classCache[name] : classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)');
	  }

	  function maybeAddPx(name, value) {
	    return typeof value == "number" && !cssNumber[dasherize(name)] ? value + "px" : value;
	  }

	  function defaultDisplay(nodeName) {
	    var element, display;
	    if (!elementDisplay[nodeName]) {
	      element = document.createElement(nodeName);
	      document.body.appendChild(element);
	      display = getComputedStyle(element, '').getPropertyValue("display");
	      element.parentNode.removeChild(element);
	      display == "none" && (display = "block");
	      elementDisplay[nodeName] = display;
	    }
	    return elementDisplay[nodeName];
	  }

	  function _children(element) {
	    return 'children' in element ? _slice.call(element.children) : $.map(element.childNodes, function (node) {
	      if (node.nodeType == 1) return node;
	    });
	  }

	  // `$.zepto.fragment` takes a html string and an optional tag name
	  // to generate DOM nodes nodes from the given html string.
	  // The generated DOM nodes are returned as an array.
	  // This function can be overriden in plugins for example to make
	  // it compatible with browsers that don't support the DOM fully.
	  zepto.fragment = function (html, name, properties) {
	    var dom, nodes, container;

	    // A special case optimization for a single tag
	    if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1));

	    if (!dom) {
	      if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>");
	      if (name === undefined) name = fragmentRE.test(html) && RegExp.$1;
	      if (!(name in containers)) name = '*';

	      container = containers[name];
	      container.innerHTML = '' + html;
	      dom = $.each(_slice.call(container.childNodes), function () {
	        container.removeChild(this);
	      });
	    }

	    if (isPlainObject(properties)) {
	      nodes = $(dom);
	      $.each(properties, function (key, value) {
	        if (methodAttributes.indexOf(key) > -1) nodes[key](value);else nodes.attr(key, value);
	      });
	    }

	    return dom;
	  };

	  // `$.zepto.Z` swaps out the prototype of the given `dom` array
	  // of nodes with `$.fn` and thus supplying all the Zepto functions
	  // to the array. Note that `__proto__` is not supported on Internet
	  // Explorer. This method can be overriden in plugins.
	  zepto.Z = function (dom, selector) {
	    dom = dom || [];
	    dom.__proto__ = $.fn;
	    dom.selector = selector || '';
	    return dom;
	  };

	  // `$.zepto.isZ` should return `true` if the given object is a Zepto
	  // collection. This method can be overriden in plugins.
	  zepto.isZ = function (object) {
	    return object instanceof zepto.Z;
	  };

	  // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
	  // takes a CSS selector and an optional context (and handles various
	  // special cases).
	  // This method can be overriden in plugins.
	  zepto.init = function (selector, context) {
	    var dom;
	    // If nothing given, return an empty Zepto collection
	    if (!selector) return zepto.Z();
	    // Optimize for string selectors
	    else if (typeof selector == 'string') {
	        selector = selector.trim();
	        // If it's a html fragment, create nodes from it
	        // Note: In both Chrome 21 and Firefox 15, DOM error 12
	        // is thrown if the fragment doesn't begin with <
	        if (selector[0] == '<' && fragmentRE.test(selector)) dom = zepto.fragment(selector, RegExp.$1, context), selector = null;
	        // If there's a context, create a collection on that context first, and select
	        // nodes from there
	        else if (context !== undefined) return $(context).find(selector);
	          // If it's a CSS selector, use it to select nodes.
	          else dom = zepto.qsa(document, selector);
	      }
	      // If a function is given, call it when the DOM is ready
	      else if (isFunction(selector)) return $(document).ready(selector);
	        // If a Zepto collection is given, just return it
	        else if (zepto.isZ(selector)) return selector;else {
	            // normalize array if an array of nodes is given
	            if (isArray(selector)) dom = compact(selector);
	            // Wrap DOM nodes.
	            else if (isObject(selector)) dom = [selector], selector = null;
	              // If it's a html fragment, create nodes from it
	              else if (fragmentRE.test(selector)) dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null;
	                // If there's a context, create a collection on that context first, and select
	                // nodes from there
	                else if (context !== undefined) return $(context).find(selector);
	                  // And last but no least, if it's a CSS selector, use it to select nodes.
	                  else dom = zepto.qsa(document, selector);
	          }
	    // create a new Zepto collection from the nodes found
	    return zepto.Z(dom, selector);
	  };

	  // `$` will be the base `Zepto` object. When calling this
	  // function just call `$.zepto.init, which makes the implementation
	  // details of selecting nodes and creating Zepto collections
	  // patchable in plugins.
	  $ = function $(selector, context) {
	    return zepto.init(selector, context);
	  };

	  function extend(target, source, deep) {
	    for (key in source) {
	      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
	        if (isPlainObject(source[key]) && !isPlainObject(target[key])) target[key] = {};
	        if (isArray(source[key]) && !isArray(target[key])) target[key] = [];
	        extend(target[key], source[key], deep);
	      } else if (source[key] !== undefined) target[key] = source[key];
	    }
	  }

	  // Copy all but undefined properties from one or more
	  // objects to the `target` object.
	  $.extend = function (target) {
	    var deep,
	        args = _slice.call(arguments, 1);
	    if (typeof target == 'boolean') {
	      deep = target;
	      target = args.shift();
	    }
	    args.forEach(function (arg) {
	      extend(target, arg, deep);
	    });
	    return target;
	  };

	  // `$.zepto.qsa` is Zepto's CSS selector implementation which
	  // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
	  // This method can be overriden in plugins.
	  zepto.qsa = function (element, selector) {
	    var found,
	        maybeID = selector[0] == '#',
	        maybeClass = !maybeID && selector[0] == '.',
	        nameOnly = maybeID || maybeClass ? selector.slice(1) : selector,
	        // Ensure that a 1 char tag name still gets checked
	    isSimple = simpleSelectorRE.test(nameOnly);
	    return isDocument(element) && isSimple && maybeID ? (found = element.getElementById(nameOnly)) ? [found] : [] : element.nodeType !== 1 && element.nodeType !== 9 ? [] : _slice.call(isSimple && !maybeID ? maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
	    element.getElementsByTagName(selector) : // Or a tag
	    element.querySelectorAll(selector) // Or it's not simple, and we need to query all
	    );
	  };

	  function filtered(nodes, selector) {
	    return selector == null ? $(nodes) : $(nodes).filter(selector);
	  }

	  $.contains = document.documentElement.contains ? function (parent, node) {
	    return parent !== node && parent.contains(node);
	  } : function (parent, node) {
	    while (node && (node = node.parentNode)) {
	      if (node === parent) return true;
	    }return false;
	  };

	  function funcArg(context, arg, idx, payload) {
	    return isFunction(arg) ? arg.call(context, idx, payload) : arg;
	  }

	  function setAttribute(node, name, value) {
	    value == null ? node.removeAttribute(name) : node.setAttribute(name, value);
	  }

	  // access className property while respecting SVGAnimatedString
	  function className(node, value) {
	    var klass = node.className || '',
	        svg = klass && klass.baseVal !== undefined;

	    if (value === undefined) return svg ? klass.baseVal : klass;
	    svg ? klass.baseVal = value : node.className = value;
	  }

	  // "true"  => true
	  // "false" => false
	  // "null"  => null
	  // "42"    => 42
	  // "42.5"  => 42.5
	  // "08"    => "08"
	  // JSON    => parse if valid
	  // String  => self
	  function deserializeValue(value) {
	    try {
	      return value ? value == "true" || (value == "false" ? false : value == "null" ? null : +value + "" == value ? +value : /^[\[\{]/.test(value) ? $.parseJSON(value) : value) : value;
	    } catch (e) {
	      return value;
	    }
	  }

	  $.type = type;
	  $.isFunction = isFunction;
	  $.isWindow = isWindow;
	  $.isArray = isArray;
	  $.isPlainObject = isPlainObject;

	  $.isEmptyObject = function (obj) {
	    var name;
	    for (name in obj) {
	      return false;
	    }return true;
	  };

	  $.inArray = function (elem, array, i) {
	    return emptyArray.indexOf.call(array, elem, i);
	  };

	  $.camelCase = camelize;
	  $.trim = function (str) {
	    return str == null ? "" : String.prototype.trim.call(str);
	  };

	  // plugin compatibility
	  $.uuid = 0;
	  $.support = {};
	  $.expr = {};

	  $.map = function (elements, callback) {
	    var value,
	        values = [],
	        i,
	        key;
	    if (likeArray(elements)) for (i = 0; i < elements.length; i++) {
	      value = callback(elements[i], i);
	      if (value != null) values.push(value);
	    } else for (key in elements) {
	      value = callback(elements[key], key);
	      if (value != null) values.push(value);
	    }
	    return flatten(values);
	  };

	  $.each = function (elements, callback) {
	    var i, key;
	    if (likeArray(elements)) {
	      for (i = 0; i < elements.length; i++) {
	        if (callback.call(elements[i], i, elements[i]) === false) return elements;
	      }
	    } else {
	      for (key in elements) {
	        if (callback.call(elements[key], key, elements[key]) === false) return elements;
	      }
	    }

	    return elements;
	  };

	  $.grep = function (elements, callback) {
	    return _filter.call(elements, callback);
	  };

	  if (window.JSON) $.parseJSON = JSON.parse;

	  // Populate the class2type map
	  $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (i, name) {
	    class2type["[object " + name + "]"] = name.toLowerCase();
	  });

	  // Define methods that will be available on all
	  // Zepto collections
	  $.fn = {
	    // Because a collection acts like an array
	    // copy over these useful array functions.
	    forEach: emptyArray.forEach,
	    reduce: emptyArray.reduce,
	    push: emptyArray.push,
	    sort: emptyArray.sort,
	    indexOf: emptyArray.indexOf,
	    concat: emptyArray.concat,

	    // `map` and `slice` in the jQuery API work differently
	    // from their array counterparts
	    map: function map(fn) {
	      return $($.map(this, function (el, i) {
	        return fn.call(el, i, el);
	      }));
	    },
	    slice: function slice() {
	      return $(_slice.apply(this, arguments));
	    },

	    ready: function ready(callback) {
	      // need to check if document.body exists for IE as that browser reports
	      // document ready when it hasn't yet created the body element
	      if (readyRE.test(document.readyState) && document.body) callback($);else document.addEventListener('DOMContentLoaded', function () {
	        callback($);
	      }, false);
	      return this;
	    },
	    get: function get(idx) {
	      return idx === undefined ? _slice.call(this) : this[idx >= 0 ? idx : idx + this.length];
	    },
	    toArray: function toArray() {
	      return this.get();
	    },
	    size: function size() {
	      return this.length;
	    },
	    remove: function remove() {
	      return this.each(function () {
	        if (this.parentNode != null) this.parentNode.removeChild(this);
	      });
	    },
	    each: function each(callback) {
	      emptyArray.every.call(this, function (el, idx) {
	        return callback.call(el, idx, el) !== false;
	      });
	      return this;
	    },
	    filter: function filter(selector) {
	      if (isFunction(selector)) return this.not(this.not(selector));
	      return $(_filter.call(this, function (element) {
	        return zepto.matches(element, selector);
	      }));
	    },
	    add: function add(selector, context) {
	      return $(uniq(this.concat($(selector, context))));
	    },
	    is: function is(selector) {
	      return this.length > 0 && zepto.matches(this[0], selector);
	    },
	    not: function not(selector) {
	      var nodes = [];
	      if (isFunction(selector) && selector.call !== undefined) this.each(function (idx) {
	        if (!selector.call(this, idx)) nodes.push(this);
	      });else {
	        var excludes = typeof selector == 'string' ? this.filter(selector) : likeArray(selector) && isFunction(selector.item) ? _slice.call(selector) : $(selector);
	        this.forEach(function (el) {
	          if (excludes.indexOf(el) < 0) nodes.push(el);
	        });
	      }
	      return $(nodes);
	    },
	    has: function has(selector) {
	      return this.filter(function () {
	        return isObject(selector) ? $.contains(this, selector) : $(this).find(selector).size();
	      });
	    },
	    eq: function eq(idx) {
	      return idx === -1 ? this.slice(idx) : this.slice(idx, +idx + 1);
	    },
	    first: function first() {
	      var el = this[0];
	      return el && !isObject(el) ? el : $(el);
	    },
	    last: function last() {
	      var el = this[this.length - 1];
	      return el && !isObject(el) ? el : $(el);
	    },
	    find: function find(selector) {
	      var result,
	          $this = this;
	      if (!selector) result = $();else if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) == 'object') result = $(selector).filter(function () {
	        var node = this;
	        return emptyArray.some.call($this, function (parent) {
	          return $.contains(parent, node);
	        });
	      });else if (this.length == 1) result = $(zepto.qsa(this[0], selector));else result = this.map(function () {
	        return zepto.qsa(this, selector);
	      });
	      return result;
	    },
	    closest: function closest(selector, context) {
	      var node = this[0],
	          collection = false;
	      if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) == 'object') collection = $(selector);
	      while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector))) {
	        node = node !== context && !isDocument(node) && node.parentNode;
	      }return $(node);
	    },
	    parents: function parents(selector) {
	      var ancestors = [],
	          nodes = this;
	      while (nodes.length > 0) {
	        nodes = $.map(nodes, function (node) {
	          if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
	            ancestors.push(node);
	            return node;
	          }
	        });
	      }return filtered(ancestors, selector);
	    },
	    parent: function parent(selector) {
	      return filtered(uniq(this.pluck('parentNode')), selector);
	    },
	    children: function children(selector) {
	      return filtered(this.map(function () {
	        return _children(this);
	      }), selector);
	    },
	    contents: function contents() {
	      return this.map(function () {
	        return _slice.call(this.childNodes);
	      });
	    },
	    siblings: function siblings(selector) {
	      return filtered(this.map(function (i, el) {
	        return _filter.call(_children(el.parentNode), function (child) {
	          return child !== el;
	        });
	      }), selector);
	    },
	    empty: function empty() {
	      return this.each(function () {
	        this.innerHTML = '';
	      });
	    },
	    // `pluck` is borrowed from Prototype.js
	    pluck: function pluck(property) {
	      return $.map(this, function (el) {
	        return el[property];
	      });
	    },
	    show: function show() {
	      return this.each(function () {
	        this.style.display == "none" && (this.style.display = '');
	        if (getComputedStyle(this, '').getPropertyValue("display") == "none") this.style.display = defaultDisplay(this.nodeName);
	      });
	    },
	    replaceWith: function replaceWith(newContent) {
	      return this.before(newContent).remove();
	    },
	    wrap: function wrap(structure) {
	      var func = isFunction(structure);
	      if (this[0] && !func) var dom = $(structure).get(0),
	          clone = dom.parentNode || this.length > 1;

	      return this.each(function (index) {
	        $(this).wrapAll(func ? structure.call(this, index) : clone ? dom.cloneNode(true) : dom);
	      });
	    },
	    wrapAll: function wrapAll(structure) {
	      if (this[0]) {
	        $(this[0]).before(structure = $(structure));
	        var children;
	        // drill down to the inmost element
	        while ((children = structure.children()).length) {
	          structure = children.first();
	        }$(structure).append(this);
	      }
	      return this;
	    },
	    wrapInner: function wrapInner(structure) {
	      var func = isFunction(structure);
	      return this.each(function (index) {
	        var self = $(this),
	            contents = self.contents(),
	            dom = func ? structure.call(this, index) : structure;
	        contents.length ? contents.wrapAll(dom) : self.append(dom);
	      });
	    },
	    unwrap: function unwrap() {
	      this.parent().each(function () {
	        $(this).replaceWith($(this).children());
	      });
	      return this;
	    },
	    clone: function clone() {
	      return this.map(function () {
	        return this.cloneNode(true);
	      });
	    },
	    hide: function hide() {
	      return this.css("display", "none");
	    },
	    toggle: function toggle(setting) {
	      return this.each(function () {
	        var el = $(this);(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide();
	      });
	    },
	    prev: function prev(selector) {
	      return $(this.pluck('previousElementSibling')).filter(selector || '*');
	    },
	    next: function next(selector) {
	      return $(this.pluck('nextElementSibling')).filter(selector || '*');
	    },
	    html: function html(_html) {
	      return 0 in arguments ? this.each(function (idx) {
	        var originHtml = this.innerHTML;
	        $(this).empty().append(funcArg(this, _html, idx, originHtml));
	      }) : 0 in this ? this[0].innerHTML : null;
	    },
	    text: function text(_text) {
	      return 0 in arguments ? this.each(function (idx) {
	        var newText = funcArg(this, _text, idx, this.textContent);
	        this.textContent = newText == null ? '' : '' + newText;
	      }) : 0 in this ? this[0].textContent : null;
	    },
	    attr: function attr(name, value) {
	      var result;
	      return typeof name == 'string' && !(1 in arguments) ? !this.length || this[0].nodeType !== 1 ? undefined : !(result = this[0].getAttribute(name)) && name in this[0] ? this[0][name] : result : this.each(function (idx) {
	        if (this.nodeType !== 1) return;
	        if (isObject(name)) for (key in name) {
	          setAttribute(this, key, name[key]);
	        } else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)));
	      });
	    },
	    removeAttr: function removeAttr(name) {
	      return this.each(function () {
	        this.nodeType === 1 && name.split(' ').forEach(function (attribute) {
	          setAttribute(this, attribute);
	        }, this);
	      });
	    },
	    prop: function prop(name, value) {
	      name = propMap[name] || name;
	      return 1 in arguments ? this.each(function (idx) {
	        this[name] = funcArg(this, value, idx, this[name]);
	      }) : this[0] && this[0][name];
	    },
	    data: function data(name, value) {
	      var attrName = 'data-' + name.replace(capitalRE, '-$1').toLowerCase();

	      var data = 1 in arguments ? this.attr(attrName, value) : this.attr(attrName);

	      return data !== null ? deserializeValue(data) : undefined;
	    },
	    val: function val(value) {
	      return 0 in arguments ? this.each(function (idx) {
	        this.value = funcArg(this, value, idx, this.value);
	      }) : this[0] && (this[0].multiple ? $(this[0]).find('option').filter(function () {
	        return this.selected;
	      }).pluck('value') : this[0].value);
	    },
	    offset: function offset(coordinates) {
	      if (coordinates) return this.each(function (index) {
	        var $this = $(this),
	            coords = funcArg(this, coordinates, index, $this.offset()),
	            parentOffset = $this.offsetParent().offset(),
	            props = {
	          top: coords.top - parentOffset.top,
	          left: coords.left - parentOffset.left
	        };

	        if ($this.css('position') == 'static') props['position'] = 'relative';
	        $this.css(props);
	      });
	      if (!this.length) return null;
	      var obj = this[0].getBoundingClientRect();
	      return {
	        left: obj.left + window.pageXOffset,
	        top: obj.top + window.pageYOffset,
	        width: Math.round(obj.width),
	        height: Math.round(obj.height)
	      };
	    },
	    css: function css(property, value) {
	      if (arguments.length < 2) {
	        var computedStyle,
	            element = this[0];
	        if (!element) return;
	        computedStyle = getComputedStyle(element, '');
	        if (typeof property == 'string') return element.style[camelize(property)] || computedStyle.getPropertyValue(property);else if (isArray(property)) {
	          var props = {};
	          $.each(property, function (_, prop) {
	            props[prop] = element.style[camelize(prop)] || computedStyle.getPropertyValue(prop);
	          });
	          return props;
	        }
	      }

	      var css = '';
	      if (type(property) == 'string') {
	        if (!value && value !== 0) this.each(function () {
	          this.style.removeProperty(dasherize(property));
	        });else css = dasherize(property) + ":" + maybeAddPx(property, value);
	      } else {
	        for (key in property) {
	          if (!property[key] && property[key] !== 0) this.each(function () {
	            this.style.removeProperty(dasherize(key));
	          });else css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';';
	        }
	      }

	      return this.each(function () {
	        this.style.cssText += ';' + css;
	      });
	    },
	    index: function index(element) {
	      return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0]);
	    },
	    hasClass: function hasClass(name) {
	      if (!name) return false;
	      return emptyArray.some.call(this, function (el) {
	        return this.test(className(el));
	      }, classRE(name));
	    },
	    addClass: function addClass(name) {
	      if (!name) return this;
	      return this.each(function (idx) {
	        if (!('className' in this)) return;
	        classList = [];
	        var cls = className(this),
	            newName = funcArg(this, name, idx, cls);
	        newName.split(/\s+/g).forEach(function (klass) {
	          if (!$(this).hasClass(klass)) classList.push(klass);
	        }, this);
	        classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "));
	      });
	    },
	    removeClass: function removeClass(name) {
	      return this.each(function (idx) {
	        if (!('className' in this)) return;
	        if (name === undefined) return className(this, '');
	        classList = className(this);
	        funcArg(this, name, idx, classList).split(/\s+/g).forEach(function (klass) {
	          classList = classList.replace(classRE(klass), " ");
	        });
	        className(this, classList.trim());
	      });
	    },
	    toggleClass: function toggleClass(name, when) {
	      if (!name) return this;
	      return this.each(function (idx) {
	        var $this = $(this),
	            names = funcArg(this, name, idx, className(this));
	        names.split(/\s+/g).forEach(function (klass) {
	          (when === undefined ? !$this.hasClass(klass) : when) ? $this.addClass(klass) : $this.removeClass(klass);
	        });
	      });
	    },
	    scrollTop: function scrollTop(value) {
	      if (!this.length) return;
	      var hasScrollTop = 'scrollTop' in this[0];
	      if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset;
	      return this.each(hasScrollTop ? function () {
	        this.scrollTop = value;
	      } : function () {
	        this.scrollTo(this.scrollX, value);
	      });
	    },
	    scrollLeft: function scrollLeft(value) {
	      if (!this.length) return;
	      var hasScrollLeft = 'scrollLeft' in this[0];
	      if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset;
	      return this.each(hasScrollLeft ? function () {
	        this.scrollLeft = value;
	      } : function () {
	        this.scrollTo(value, this.scrollY);
	      });
	    },
	    position: function position() {
	      if (!this.length) return;

	      var elem = this[0],

	      // Get *real* offsetParent
	      offsetParent = this.offsetParent(),

	      // Get correct offsets
	      offset = this.offset(),
	          parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

	      // Subtract element margins
	      // note: when an element has margin: auto the offsetLeft and marginLeft
	      // are the same in Safari causing offset.left to incorrectly be 0
	      offset.top -= parseFloat($(elem).css('margin-top')) || 0;
	      offset.left -= parseFloat($(elem).css('margin-left')) || 0;

	      // Add offsetParent borders
	      parentOffset.top += parseFloat($(offsetParent[0]).css('border-top-width')) || 0;
	      parentOffset.left += parseFloat($(offsetParent[0]).css('border-left-width')) || 0;

	      // Subtract the two offsets
	      return {
	        top: offset.top - parentOffset.top,
	        left: offset.left - parentOffset.left
	      };
	    },
	    offsetParent: function offsetParent() {
	      return this.map(function () {
	        var parent = this.offsetParent || document.body;
	        while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static") {
	          parent = parent.offsetParent;
	        }return parent;
	      });
	    }
	  };

	  // for now
	  $.fn.detach = $.fn.remove

	  // Generate the `width` and `height` functions
	  ;['width', 'height'].forEach(function (dimension) {
	    var dimensionProperty = dimension.replace(/./, function (m) {
	      return m[0].toUpperCase();
	    });

	    $.fn[dimension] = function (value) {
	      var offset,
	          el = this[0];
	      if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] : isDocument(el) ? el.documentElement['scroll' + dimensionProperty] : (offset = this.offset()) && offset[dimension];else return this.each(function (idx) {
	        el = $(this);
	        el.css(dimension, funcArg(this, value, idx, el[dimension]()));
	      });
	    };
	  });

	  function traverseNode(node, fun) {
	    fun(node);
	    for (var i = 0, len = node.childNodes.length; i < len; i++) {
	      traverseNode(node.childNodes[i], fun);
	    }
	  }

	  // Generate the `after`, `prepend`, `before`, `append`,
	  // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
	  adjacencyOperators.forEach(function (operator, operatorIndex) {
	    var inside = operatorIndex % 2; //=> prepend, append

	    $.fn[operator] = function () {
	      // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
	      var argType,
	          nodes = $.map(arguments, function (arg) {
	        argType = type(arg);
	        return argType == "object" || argType == "array" || arg == null ? arg : zepto.fragment(arg);
	      }),
	          parent,
	          copyByClone = this.length > 1;
	      if (nodes.length < 1) return this;

	      return this.each(function (_, target) {
	        parent = inside ? target : target.parentNode;

	        // convert all methods to a "before" operation
	        target = operatorIndex == 0 ? target.nextSibling : operatorIndex == 1 ? target.firstChild : operatorIndex == 2 ? target : null;

	        var parentInDocument = $.contains(document.documentElement, parent);

	        nodes.forEach(function (node) {
	          if (copyByClone) node = node.cloneNode(true);else if (!parent) return $(node).remove();

	          parent.insertBefore(node, target);
	          if (parentInDocument) traverseNode(node, function (el) {
	            if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' && (!el.type || el.type === 'text/javascript') && !el.src) window['eval'].call(window, el.innerHTML);
	          });
	        });
	      });
	    };

	    // after    => insertAfter
	    // prepend  => prependTo
	    // before   => insertBefore
	    // append   => appendTo
	    $.fn[inside ? operator + 'To' : 'insert' + (operatorIndex ? 'Before' : 'After')] = function (html) {
	      $(html)[operator](this);
	      return this;
	    };
	  });

	  zepto.Z.prototype = $.fn;

	  // Export internal API functions in the `$.zepto` namespace
	  zepto.uniq = uniq;
	  zepto.deserializeValue = deserializeValue;
	  $.zepto = zepto;

	  return $;
	}();

	window.Zepto = Zepto;
	window.$ === undefined && (window.$ = Zepto);(function ($) {
	  var _zid = 1,
	      undefined,
	      slice = Array.prototype.slice,
	      isFunction = $.isFunction,
	      isString = function isString(obj) {
	    return typeof obj == 'string';
	  },
	      handlers = {},
	      specialEvents = {},
	      focusinSupported = 'onfocusin' in window,
	      focus = { focus: 'focusin', blur: 'focusout' },
	      hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' };

	  specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents';

	  function zid(element) {
	    return element._zid || (element._zid = _zid++);
	  }
	  function findHandlers(element, event, fn, selector) {
	    event = parse(event);
	    if (event.ns) var matcher = matcherFor(event.ns);
	    return (handlers[zid(element)] || []).filter(function (handler) {
	      return handler && (!event.e || handler.e == event.e) && (!event.ns || matcher.test(handler.ns)) && (!fn || zid(handler.fn) === zid(fn)) && (!selector || handler.sel == selector);
	    });
	  }
	  function parse(event) {
	    var parts = ('' + event).split('.');
	    return { e: parts[0], ns: parts.slice(1).sort().join(' ') };
	  }
	  function matcherFor(ns) {
	    return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)');
	  }

	  function eventCapture(handler, captureSetting) {
	    return handler.del && !focusinSupported && handler.e in focus || !!captureSetting;
	  }

	  function realEvent(type) {
	    return hover[type] || focusinSupported && focus[type] || type;
	  }

	  function add(element, events, fn, data, selector, delegator, capture) {
	    var id = zid(element),
	        set = handlers[id] || (handlers[id] = []);
	    events.split(/\s/).forEach(function (event) {
	      if (event == 'ready') return $(document).ready(fn);
	      var handler = parse(event);
	      handler.fn = fn;
	      handler.sel = selector;
	      // emulate mouseenter, mouseleave
	      if (handler.e in hover) fn = function fn(e) {
	        var related = e.relatedTarget;
	        if (!related || related !== this && !$.contains(this, related)) return handler.fn.apply(this, arguments);
	      };
	      handler.del = delegator;
	      var callback = delegator || fn;
	      handler.proxy = function (e) {
	        e = compatible(e);
	        if (e.isImmediatePropagationStopped()) return;
	        e.data = data;
	        var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args));
	        if (result === false) e.preventDefault(), e.stopPropagation();
	        return result;
	      };
	      handler.i = set.length;
	      set.push(handler);
	      if ('addEventListener' in element) element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture));
	    });
	  }
	  function remove(element, events, fn, selector, capture) {
	    var id = zid(element);(events || '').split(/\s/).forEach(function (event) {
	      findHandlers(element, event, fn, selector).forEach(function (handler) {
	        delete handlers[id][handler.i];
	        if ('removeEventListener' in element) element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture));
	      });
	    });
	  }

	  $.event = { add: add, remove: remove };

	  $.proxy = function (fn, context) {
	    var args = 2 in arguments && slice.call(arguments, 2);
	    if (isFunction(fn)) {
	      var proxyFn = function proxyFn() {
	        return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments);
	      };
	      proxyFn._zid = zid(fn);
	      return proxyFn;
	    } else if (isString(context)) {
	      if (args) {
	        args.unshift(fn[context], fn);
	        return $.proxy.apply(null, args);
	      } else {
	        return $.proxy(fn[context], fn);
	      }
	    } else {
	      throw new TypeError("expected function");
	    }
	  };

	  $.fn.bind = function (event, data, callback) {
	    return this.on(event, data, callback);
	  };
	  $.fn.unbind = function (event, callback) {
	    return this.off(event, callback);
	  };
	  $.fn.one = function (event, selector, data, callback) {
	    return this.on(event, selector, data, callback, 1);
	  };

	  var returnTrue = function returnTrue() {
	    return true;
	  },
	      returnFalse = function returnFalse() {
	    return false;
	  },
	      ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$)/,
	      eventMethods = {
	    preventDefault: 'isDefaultPrevented',
	    stopImmediatePropagation: 'isImmediatePropagationStopped',
	    stopPropagation: 'isPropagationStopped'
	  };

	  function compatible(event, source) {
	    if (source || !event.isDefaultPrevented) {
	      source || (source = event);

	      $.each(eventMethods, function (name, predicate) {
	        var sourceMethod = source[name];
	        event[name] = function () {
	          this[predicate] = returnTrue;
	          return sourceMethod && sourceMethod.apply(source, arguments);
	        };
	        event[predicate] = returnFalse;
	      });

	      if (source.defaultPrevented !== undefined ? source.defaultPrevented : 'returnValue' in source ? source.returnValue === false : source.getPreventDefault && source.getPreventDefault()) event.isDefaultPrevented = returnTrue;
	    }
	    return event;
	  }

	  function createProxy(event) {
	    var key,
	        proxy = { originalEvent: event };
	    for (key in event) {
	      if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key];
	    }return compatible(proxy, event);
	  }

	  $.fn.delegate = function (selector, event, callback) {
	    return this.on(event, selector, callback);
	  };
	  $.fn.undelegate = function (selector, event, callback) {
	    return this.off(event, selector, callback);
	  };

	  $.fn.live = function (event, callback) {
	    $(document.body).delegate(this.selector, event, callback);
	    return this;
	  };
	  $.fn.die = function (event, callback) {
	    $(document.body).undelegate(this.selector, event, callback);
	    return this;
	  };

	  $.fn.on = function (event, selector, data, callback, one) {
	    var autoRemove,
	        delegator,
	        $this = this;
	    if (event && !isString(event)) {
	      $.each(event, function (type, fn) {
	        $this.on(type, selector, data, fn, one);
	      });
	      return $this;
	    }

	    if (!isString(selector) && !isFunction(callback) && callback !== false) callback = data, data = selector, selector = undefined;
	    if (isFunction(data) || data === false) callback = data, data = undefined;

	    if (callback === false) callback = returnFalse;

	    return $this.each(function (_, element) {
	      if (one) autoRemove = function autoRemove(e) {
	        remove(element, e.type, callback);
	        return callback.apply(this, arguments);
	      };

	      if (selector) delegator = function delegator(e) {
	        var evt,
	            match = $(e.target).closest(selector, element).get(0);
	        if (match && match !== element) {
	          evt = $.extend(createProxy(e), { currentTarget: match, liveFired: element });
	          return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)));
	        }
	      };

	      add(element, event, callback, data, selector, delegator || autoRemove);
	    });
	  };
	  $.fn.off = function (event, selector, callback) {
	    var $this = this;
	    if (event && !isString(event)) {
	      $.each(event, function (type, fn) {
	        $this.off(type, selector, fn);
	      });
	      return $this;
	    }

	    if (!isString(selector) && !isFunction(callback) && callback !== false) callback = selector, selector = undefined;

	    if (callback === false) callback = returnFalse;

	    return $this.each(function () {
	      remove(this, event, callback, selector);
	    });
	  };

	  $.fn.trigger = function (event, args) {
	    event = isString(event) || $.isPlainObject(event) ? $.Event(event) : compatible(event);
	    event._args = args;
	    return this.each(function () {
	      // handle focus(), blur() by calling them directly
	      if (event.type in focus && typeof this[event.type] == "function") this[event.type]();
	      // items in the collection might not be DOM elements
	      else if ('dispatchEvent' in this) this.dispatchEvent(event);else $(this).triggerHandler(event, args);
	    });
	  };

	  // triggers event handlers on current element just as if an event occurred,
	  // doesn't trigger an actual event, doesn't bubble
	  $.fn.triggerHandler = function (event, args) {
	    var e, result;
	    this.each(function (i, element) {
	      e = createProxy(isString(event) ? $.Event(event) : event);
	      e._args = args;
	      e.target = element;
	      $.each(findHandlers(element, event.type || event), function (i, handler) {
	        result = handler.proxy(e);
	        if (e.isImmediatePropagationStopped()) return false;
	      });
	    });
	    return result;
	  }

	  // shortcut methods for `.bind(event, fn)` for each event type
	  ;('focusin focusout focus blur load resize scroll unload click dblclick ' + 'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave ' + 'change select keydown keypress keyup error').split(' ').forEach(function (event) {
	    $.fn[event] = function (callback) {
	      return 0 in arguments ? this.bind(event, callback) : this.trigger(event);
	    };
	  });

	  $.Event = function (type, props) {
	    if (!isString(type)) props = type, type = props.type;
	    var event = document.createEvent(specialEvents[type] || 'Events'),
	        bubbles = true;
	    if (props) for (var name in props) {
	      name == 'bubbles' ? bubbles = !!props[name] : event[name] = props[name];
	    }event.initEvent(type, bubbles, true);
	    return compatible(event);
	  };
	})(Zepto);(function ($) {
	  var jsonpID = 0,
	      document = window.document,
	      key,
	      name,
	      rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	      scriptTypeRE = /^(?:text|application)\/javascript/i,
	      xmlTypeRE = /^(?:text|application)\/xml/i,
	      jsonType = 'application/json',
	      htmlType = 'text/html',
	      blankRE = /^\s*$/,
	      originAnchor = document.createElement('a');

	  originAnchor.href = window.location.href;

	  // trigger a custom event and return false if it was cancelled
	  function triggerAndReturn(context, eventName, data) {
	    var event = $.Event(eventName);
	    $(context).trigger(event, data);
	    return !event.isDefaultPrevented();
	  }

	  // trigger an Ajax "global" event
	  function triggerGlobal(settings, context, eventName, data) {
	    if (settings.global) return triggerAndReturn(context || document, eventName, data);
	  }

	  // Number of active Ajax requests
	  $.active = 0;

	  function ajaxStart(settings) {
	    if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart');
	  }
	  function ajaxStop(settings) {
	    if (settings.global && ! --$.active) triggerGlobal(settings, null, 'ajaxStop');
	  }

	  // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
	  function ajaxBeforeSend(xhr, settings) {
	    var context = settings.context;
	    if (settings.beforeSend.call(context, xhr, settings) === false || triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false) return false;

	    triggerGlobal(settings, context, 'ajaxSend', [xhr, settings]);
	  }
	  function ajaxSuccess(data, xhr, settings, deferred) {
	    var context = settings.context,
	        status = 'success';
	    settings.success.call(context, data, status, xhr);
	    if (deferred) deferred.resolveWith(context, [data, status, xhr]);
	    triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data]);
	    ajaxComplete(status, xhr, settings);
	  }
	  // type: "timeout", "error", "abort", "parsererror"
	  function ajaxError(error, type, xhr, settings, deferred) {
	    var context = settings.context;
	    settings.error.call(context, xhr, type, error);
	    if (deferred) deferred.rejectWith(context, [xhr, type, error]);
	    triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error || type]);
	    ajaxComplete(type, xhr, settings);
	  }
	  // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
	  function ajaxComplete(status, xhr, settings) {
	    var context = settings.context;
	    settings.complete.call(context, xhr, status);
	    triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings]);
	    ajaxStop(settings);
	  }

	  // Empty function, used as default callback
	  function empty() {}

	  $.ajaxJSONP = function (options, deferred) {
	    if (!('type' in options)) return $.ajax(options);

	    var _callbackName = options.jsonpCallback,
	        callbackName = ($.isFunction(_callbackName) ? _callbackName() : _callbackName) || 'jsonp' + ++jsonpID,
	        script = document.createElement('script'),
	        originalCallback = window[callbackName],
	        responseData,
	        abort = function abort(errorType) {
	      $(script).triggerHandler('error', errorType || 'abort');
	    },
	        xhr = { abort: abort },
	        abortTimeout;

	    if (deferred) deferred.promise(xhr);

	    $(script).on('load error', function (e, errorType) {
	      clearTimeout(abortTimeout);
	      $(script).off().remove();

	      if (e.type == 'error' || !responseData) {
	        ajaxError(null, errorType || 'error', xhr, options, deferred);
	      } else {
	        ajaxSuccess(responseData[0], xhr, options, deferred);
	      }

	      window[callbackName] = originalCallback;
	      if (responseData && $.isFunction(originalCallback)) originalCallback(responseData[0]);

	      originalCallback = responseData = undefined;
	    });

	    if (ajaxBeforeSend(xhr, options) === false) {
	      abort('abort');
	      return xhr;
	    }

	    window[callbackName] = function () {
	      responseData = arguments;
	    };

	    script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName);
	    document.head.appendChild(script);

	    if (options.timeout > 0) abortTimeout = setTimeout(function () {
	      abort('timeout');
	    }, options.timeout);

	    return xhr;
	  };

	  $.ajaxSettings = {
	    // Default type of request
	    type: 'GET',
	    // Callback that is executed before request
	    beforeSend: empty,
	    // Callback that is executed if the request succeeds
	    success: empty,
	    // Callback that is executed the the server drops error
	    error: empty,
	    // Callback that is executed on request complete (both: error and success)
	    complete: empty,
	    // The context for the callbacks
	    context: null,
	    // Whether to trigger "global" Ajax events
	    global: true,
	    // Transport
	    xhr: function xhr() {
	      return new window.XMLHttpRequest();
	    },
	    // MIME types mapping
	    // IIS returns Javascript as "application/x-javascript"
	    accepts: {
	      script: 'text/javascript, application/javascript, application/x-javascript',
	      json: jsonType,
	      xml: 'application/xml, text/xml',
	      html: htmlType,
	      text: 'text/plain'
	    },
	    // Whether the request is to another domain
	    crossDomain: false,
	    // Default timeout
	    timeout: 0,
	    // Whether data should be serialized to string
	    processData: true,
	    // Whether the browser should be allowed to cache GET responses
	    cache: true
	  };

	  function mimeToDataType(mime) {
	    if (mime) mime = mime.split(';', 2)[0];
	    return mime && (mime == htmlType ? 'html' : mime == jsonType ? 'json' : scriptTypeRE.test(mime) ? 'script' : xmlTypeRE.test(mime) && 'xml') || 'text';
	  }

	  function appendQuery(url, query) {
	    if (query == '') return url;
	    return (url + '&' + query).replace(/[&?]{1,2}/, '?');
	  }

	  // serialize payload and append it to the URL for GET requests
	  function serializeData(options) {
	    if (options.processData && options.data && $.type(options.data) != "string") options.data = $.param(options.data, options.traditional);
	    if (options.data && (!options.type || options.type.toUpperCase() == 'GET')) options.url = appendQuery(options.url, options.data), options.data = undefined;
	  }

	  $.ajax = function (options) {
	    var settings = $.extend({}, options || {}),
	        deferred = $.Deferred && $.Deferred(),
	        urlAnchor;
	    for (key in $.ajaxSettings) {
	      if (settings[key] === undefined) settings[key] = $.ajaxSettings[key];
	    }ajaxStart(settings);

	    if (!settings.crossDomain) {
	      urlAnchor = document.createElement('a');
	      urlAnchor.href = settings.url;
	      urlAnchor.href = urlAnchor.href;
	      settings.crossDomain = originAnchor.protocol + '//' + originAnchor.host !== urlAnchor.protocol + '//' + urlAnchor.host;
	    }

	    if (!settings.url) settings.url = window.location.toString();
	    serializeData(settings);

	    var dataType = settings.dataType,
	        hasPlaceholder = /\?.+=\?/.test(settings.url);
	    if (hasPlaceholder) dataType = 'jsonp';

	    if (settings.cache === false || (!options || options.cache !== true) && ('script' == dataType || 'jsonp' == dataType)) settings.url = appendQuery(settings.url, '_=' + Date.now());

	    if ('jsonp' == dataType) {
	      if (!hasPlaceholder) settings.url = appendQuery(settings.url, settings.jsonp ? settings.jsonp + '=?' : settings.jsonp === false ? '' : 'callback=?');
	      return $.ajaxJSONP(settings, deferred);
	    }

	    var mime = settings.accepts[dataType],
	        headers = {},
	        setHeader = function setHeader(name, value) {
	      headers[name.toLowerCase()] = [name, value];
	    },
	        protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
	        xhr = settings.xhr(),
	        nativeSetHeader = xhr.setRequestHeader,
	        abortTimeout;

	    if (deferred) deferred.promise(xhr);

	    if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest');
	    setHeader('Accept', mime || '*/*');
	    if (mime = settings.mimeType || mime) {
	      if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0];
	      xhr.overrideMimeType && xhr.overrideMimeType(mime);
	    }
	    if (settings.contentType || settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET') setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded');

	    if (settings.headers) for (name in settings.headers) {
	      setHeader(name, settings.headers[name]);
	    }xhr.setRequestHeader = setHeader;

	    xhr.onreadystatechange = function () {
	      if (xhr.readyState == 4) {
	        xhr.onreadystatechange = empty;
	        clearTimeout(abortTimeout);
	        var result,
	            error = false;
	        if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304 || xhr.status == 0 && protocol == 'file:') {
	          dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'));
	          result = xhr.responseText;

	          try {
	            // http://perfectionkills.com/global-eval-what-are-the-options/
	            if (dataType == 'script') (1, eval)(result);else if (dataType == 'xml') result = xhr.responseXML;else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result);
	          } catch (e) {
	            error = e;
	          }

	          if (error) ajaxError(error, 'parsererror', xhr, settings, deferred);else ajaxSuccess(result, xhr, settings, deferred);
	        } else {
	          ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred);
	        }
	      }
	    };

	    if (ajaxBeforeSend(xhr, settings) === false) {
	      xhr.abort();
	      ajaxError(null, 'abort', xhr, settings, deferred);
	      return xhr;
	    }

	    if (settings.xhrFields) for (name in settings.xhrFields) {
	      xhr[name] = settings.xhrFields[name];
	    }var async = 'async' in settings ? settings.async : true;
	    xhr.open(settings.type, settings.url, async, settings.username, settings.password);

	    for (name in headers) {
	      nativeSetHeader.apply(xhr, headers[name]);
	    }if (settings.timeout > 0) abortTimeout = setTimeout(function () {
	      xhr.onreadystatechange = empty;
	      xhr.abort();
	      ajaxError(null, 'timeout', xhr, settings, deferred);
	    }, settings.timeout);

	    // avoid sending empty string (#319)
	    xhr.send(settings.data ? settings.data : null);
	    return xhr;
	  };

	  // handle optional data/success arguments
	  function parseArguments(url, data, success, dataType) {
	    if ($.isFunction(data)) dataType = success, success = data, data = undefined;
	    if (!$.isFunction(success)) dataType = success, success = undefined;
	    return {
	      url: url,
	      data: data,
	      success: success,
	      dataType: dataType
	    };
	  }

	  $.get = function () /* url, data, success, dataType */{
	    return $.ajax(parseArguments.apply(null, arguments));
	  };

	  $.post = function () /* url, data, success, dataType */{
	    var options = parseArguments.apply(null, arguments);
	    options.type = 'POST';
	    return $.ajax(options);
	  };

	  $.getJSON = function () /* url, data, success */{
	    var options = parseArguments.apply(null, arguments);
	    options.dataType = 'json';
	    return $.ajax(options);
	  };

	  $.fn.load = function (url, data, success) {
	    if (!this.length) return this;
	    var self = this,
	        parts = url.split(/\s/),
	        selector,
	        options = parseArguments(url, data, success),
	        callback = options.success;
	    if (parts.length > 1) options.url = parts[0], selector = parts[1];
	    options.success = function (response) {
	      self.html(selector ? $('<div>').html(response.replace(rscript, "")).find(selector) : response);
	      callback && callback.apply(self, arguments);
	    };
	    $.ajax(options);
	    return this;
	  };

	  var escape = encodeURIComponent;

	  function serialize(params, obj, traditional, scope) {
	    var type,
	        array = $.isArray(obj),
	        hash = $.isPlainObject(obj);
	    $.each(obj, function (key, value) {
	      type = $.type(value);
	      if (scope) key = traditional ? scope : scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']';
	      // handle data in serializeArray() format
	      if (!scope && array) params.add(value.name, value.value);
	      // recurse into nested objects
	      else if (type == "array" || !traditional && type == "object") serialize(params, value, traditional, key);else params.add(key, value);
	    });
	  }

	  $.param = function (obj, traditional) {
	    var params = [];
	    params.add = function (key, value) {
	      if ($.isFunction(value)) value = value();
	      if (value == null) value = "";
	      this.push(escape(key) + '=' + escape(value));
	    };
	    serialize(params, obj, traditional);
	    return params.join('&').replace(/%20/g, '+');
	  };
	})(Zepto);(function ($) {
	  $.fn.serializeArray = function () {
	    var name,
	        type,
	        result = [],
	        add = function add(value) {
	      if (value.forEach) return value.forEach(add);
	      result.push({ name: name, value: value });
	    };
	    if (this[0]) $.each(this[0].elements, function (_, field) {
	      type = field.type, name = field.name;
	      if (name && field.nodeName.toLowerCase() != 'fieldset' && !field.disabled && type != 'submit' && type != 'reset' && type != 'button' && type != 'file' && (type != 'radio' && type != 'checkbox' || field.checked)) add($(field).val());
	    });
	    return result;
	  };

	  $.fn.serialize = function () {
	    var result = [];
	    this.serializeArray().forEach(function (elm) {
	      result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value));
	    });
	    return result.join('&');
	  };

	  $.fn.submit = function (callback) {
	    if (0 in arguments) this.bind('submit', callback);else if (this.length) {
	      var event = $.Event('submit');
	      this.eq(0).trigger(event);
	      if (!event.isDefaultPrevented()) this.get(0).submit();
	    }
	    return this;
	  };
	})(Zepto);(function ($) {
	  // __proto__ doesn't exist on IE<11, so redefine
	  // the Z function to use object extension instead
	  if (!('__proto__' in {})) {
	    $.extend($.zepto, {
	      Z: function Z(dom, selector) {
	        dom = dom || [];
	        $.extend(dom, $.fn);
	        dom.selector = selector || '';
	        dom.__Z = true;
	        return dom;
	      },
	      // this is a kludge but works
	      isZ: function isZ(object) {
	        return $.type(object) === 'array' && '__Z' in object;
	      }
	    });
	  }

	  // getComputedStyle shouldn't freak out when called
	  // without a valid element as argument
	  try {
	    getComputedStyle(undefined);
	  } catch (e) {
	    var nativeGetComputedStyle = getComputedStyle;
	    window.getComputedStyle = function (element) {
	      try {
	        return nativeGetComputedStyle(element);
	      } catch (e) {
	        return null;
	      }
	    };
	  }
	})(Zepto);

/***/ },
/* 52 */
/***/ function(module, exports) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/*!
	 * =====================================================
	 * SUI Mobile - http://m.sui.taobao.org/
	 *
	 * =====================================================
	 */
	;$.smVersion = "0.6.2";+function ($) {
	    "use strict";

	    //全局配置

	    var defaults = {
	        autoInit: false, //自动初始化页面
	        showPageLoadingIndicator: true, //push.js加载页面的时候显示一个加载提示
	        router: true, //默认使用router
	        swipePanel: "left", //滑动打开侧栏
	        swipePanelOnlyClose: true //只允许滑动关闭，不允许滑动打开侧栏
	    };

	    $.smConfig = $.extend(defaults, $.config);
	}(Zepto);

	+function ($) {
	    "use strict";

	    //比较一个字符串版本号
	    //a > b === 1
	    //a = b === 0
	    //a < b === -1

	    $.compareVersion = function (a, b) {
	        var as = a.split('.');
	        var bs = b.split('.');
	        if (a === b) return 0;

	        for (var i = 0; i < as.length; i++) {
	            var x = parseInt(as[i]);
	            if (!bs[i]) return 1;
	            var y = parseInt(bs[i]);
	            if (x < y) return -1;
	            if (x > y) return 1;
	        }
	        return -1;
	    };

	    $.getCurrentPage = function () {
	        return $(".page-current")[0] || $(".page")[0] || document.body;
	    };
	}(Zepto);

	/* global WebKitCSSMatrix:true */

	(function ($) {
	    "use strict";

	    ['width', 'height'].forEach(function (dimension) {
	        var Dimension = dimension.replace(/./, function (m) {
	            return m[0].toUpperCase();
	        });
	        $.fn['outer' + Dimension] = function (margin) {
	            var elem = this;
	            if (elem) {
	                var size = elem[dimension]();
	                var sides = {
	                    'width': ['left', 'right'],
	                    'height': ['top', 'bottom']
	                };
	                sides[dimension].forEach(function (side) {
	                    if (margin) size += parseInt(elem.css('margin-' + side), 10);
	                });
	                return size;
	            } else {
	                return null;
	            }
	        };
	    });

	    //support
	    $.support = function () {
	        var support = {
	            touch: !!('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch)
	        };
	        return support;
	    }();

	    $.touchEvents = {
	        start: $.support.touch ? 'touchstart' : 'mousedown',
	        move: $.support.touch ? 'touchmove' : 'mousemove',
	        end: $.support.touch ? 'touchend' : 'mouseup'
	    };

	    $.getTranslate = function (el, axis) {
	        var matrix, curTransform, curStyle, transformMatrix;

	        // automatic axis detection
	        if (typeof axis === 'undefined') {
	            axis = 'x';
	        }

	        curStyle = window.getComputedStyle(el, null);
	        if (window.WebKitCSSMatrix) {
	            // Some old versions of Webkit choke when 'none' is passed; pass
	            // empty string instead in this case
	            transformMatrix = new WebKitCSSMatrix(curStyle.webkitTransform === 'none' ? '' : curStyle.webkitTransform);
	        } else {
	            transformMatrix = curStyle.MozTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
	            matrix = transformMatrix.toString().split(',');
	        }

	        if (axis === 'x') {
	            //Latest Chrome and webkits Fix
	            if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41;
	            //Crazy IE10 Matrix
	            else if (matrix.length === 16) curTransform = parseFloat(matrix[12]);
	                //Normal Browsers
	                else curTransform = parseFloat(matrix[4]);
	        }
	        if (axis === 'y') {
	            //Latest Chrome and webkits Fix
	            if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42;
	            //Crazy IE10 Matrix
	            else if (matrix.length === 16) curTransform = parseFloat(matrix[13]);
	                //Normal Browsers
	                else curTransform = parseFloat(matrix[5]);
	        }

	        return curTransform || 0;
	    };
	    /* jshint ignore:start */
	    $.requestAnimationFrame = function (callback) {
	        if (requestAnimationFrame) return requestAnimationFrame(callback);else if (webkitRequestAnimationFrame) return webkitRequestAnimationFrame(callback);else if (mozRequestAnimationFrame) return mozRequestAnimationFrame(callback);else {
	            return setTimeout(callback, 1000 / 60);
	        }
	    };
	    $.cancelAnimationFrame = function (id) {
	        if (cancelAnimationFrame) return cancelAnimationFrame(id);else if (webkitCancelAnimationFrame) return webkitCancelAnimationFrame(id);else if (mozCancelAnimationFrame) return mozCancelAnimationFrame(id);else {
	            return clearTimeout(id);
	        }
	    };
	    /* jshint ignore:end */

	    $.fn.dataset = function () {
	        var dataset = {},
	            ds = this[0].dataset;
	        for (var key in ds) {
	            // jshint ignore:line
	            var item = dataset[key] = ds[key];
	            if (item === 'false') dataset[key] = false;else if (item === 'true') dataset[key] = true;else if (parseFloat(item) === item * 1) dataset[key] = item * 1;
	        }
	        // mixin dataset and __eleData
	        return $.extend({}, dataset, this[0].__eleData);
	    };
	    $.fn.data = function (key, value) {
	        var tmpData = $(this).dataset();
	        if (!key) {
	            return tmpData;
	        }
	        // value may be 0, false, null
	        if (typeof value === 'undefined') {
	            // Get value
	            var dataVal = tmpData[key],
	                __eD = this[0].__eleData;

	            //if (dataVal !== undefined) {
	            if (__eD && key in __eD) {
	                return __eD[key];
	            } else {
	                return dataVal;
	            }
	        } else {
	            // Set value,uniformly set in extra ```__eleData```
	            for (var i = 0; i < this.length; i++) {
	                var el = this[i];
	                // delete multiple data in dataset
	                if (key in tmpData) delete el.dataset[key];

	                if (!el.__eleData) el.__eleData = {};
	                el.__eleData[key] = value;
	            }
	            return this;
	        }
	    };
	    function __dealCssEvent(eventNameArr, callback) {
	        var events = eventNameArr,
	            i,
	            dom = this; // jshint ignore:line

	        function fireCallBack(e) {
	            /*jshint validthis:true */
	            if (e.target !== this) return;
	            callback.call(this, e);
	            for (i = 0; i < events.length; i++) {
	                dom.off(events[i], fireCallBack);
	            }
	        }
	        if (callback) {
	            for (i = 0; i < events.length; i++) {
	                dom.on(events[i], fireCallBack);
	            }
	        }
	    }
	    $.fn.animationEnd = function (callback) {
	        __dealCssEvent.call(this, ['webkitAnimationEnd', 'animationend'], callback);
	        return this;
	    };
	    $.fn.transitionEnd = function (callback) {
	        __dealCssEvent.call(this, ['webkitTransitionEnd', 'transitionend'], callback);
	        return this;
	    };
	    $.fn.transition = function (duration) {
	        if (typeof duration !== 'string') {
	            duration = duration + 'ms';
	        }
	        for (var i = 0; i < this.length; i++) {
	            var elStyle = this[i].style;
	            elStyle.webkitTransitionDuration = elStyle.MozTransitionDuration = elStyle.transitionDuration = duration;
	        }
	        return this;
	    };
	    $.fn.transform = function (transform) {
	        for (var i = 0; i < this.length; i++) {
	            var elStyle = this[i].style;
	            elStyle.webkitTransform = elStyle.MozTransform = elStyle.transform = transform;
	        }
	        return this;
	    };
	    $.fn.prevAll = function (selector) {
	        var prevEls = [];
	        var el = this[0];
	        if (!el) return $([]);
	        while (el.previousElementSibling) {
	            var prev = el.previousElementSibling;
	            if (selector) {
	                if ($(prev).is(selector)) prevEls.push(prev);
	            } else prevEls.push(prev);
	            el = prev;
	        }
	        return $(prevEls);
	    };
	    $.fn.nextAll = function (selector) {
	        var nextEls = [];
	        var el = this[0];
	        if (!el) return $([]);
	        while (el.nextElementSibling) {
	            var next = el.nextElementSibling;
	            if (selector) {
	                if ($(next).is(selector)) nextEls.push(next);
	            } else nextEls.push(next);
	            el = next;
	        }
	        return $(nextEls);
	    };

	    //重置zepto的show方法，防止有些人引用的版本中 show 方法操作 opacity 属性影响动画执行
	    $.fn.show = function () {
	        var elementDisplay = {};
	        function defaultDisplay(nodeName) {
	            var element, display;
	            if (!elementDisplay[nodeName]) {
	                element = document.createElement(nodeName);
	                document.body.appendChild(element);
	                display = getComputedStyle(element, '').getPropertyValue("display");
	                element.parentNode.removeChild(element);
	                display === "none" && (display = "block");
	                elementDisplay[nodeName] = display;
	            }
	            return elementDisplay[nodeName];
	        }

	        return this.each(function () {
	            this.style.display === "none" && (this.style.display = '');
	            if (getComputedStyle(this, '').getPropertyValue("display") === "none") ;
	            this.style.display = defaultDisplay(this.nodeName);
	        });
	    };
	})(Zepto);

	/*===========================
	Device/OS Detection
	===========================*/
	;(function ($) {
	    "use strict";

	    var device = {};
	    var ua = navigator.userAgent;

	    var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
	    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
	    var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
	    var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);

	    device.ios = device.android = device.iphone = device.ipad = device.androidChrome = false;

	    // Android
	    if (android) {
	        device.os = 'android';
	        device.osVersion = android[2];
	        device.android = true;
	        device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
	    }
	    if (ipad || iphone || ipod) {
	        device.os = 'ios';
	        device.ios = true;
	    }
	    // iOS
	    if (iphone && !ipod) {
	        device.osVersion = iphone[2].replace(/_/g, '.');
	        device.iphone = true;
	    }
	    if (ipad) {
	        device.osVersion = ipad[2].replace(/_/g, '.');
	        device.ipad = true;
	    }
	    if (ipod) {
	        device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
	        device.iphone = true;
	    }
	    // iOS 8+ changed UA
	    if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
	        if (device.osVersion.split('.')[0] === '10') {
	            device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
	        }
	    }

	    // Webview
	    device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);

	    // Minimal UI
	    if (device.os && device.os === 'ios') {
	        var osVersionArr = device.osVersion.split('.');
	        device.minimalUi = !device.webView && (ipod || iphone) && (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7) && $('meta[name="viewport"]').length > 0 && $('meta[name="viewport"]').attr('content').indexOf('minimal-ui') >= 0;
	    }

	    // Check for status bar and fullscreen app mode
	    var windowWidth = $(window).width();
	    var windowHeight = $(window).height();
	    device.statusBar = false;
	    if (device.webView && windowWidth * windowHeight === screen.width * screen.height) {
	        device.statusBar = true;
	    } else {
	        device.statusBar = false;
	    }

	    // Classes
	    var classNames = [];

	    // Pixel Ratio
	    device.pixelRatio = window.devicePixelRatio || 1;
	    classNames.push('pixel-ratio-' + Math.floor(device.pixelRatio));
	    if (device.pixelRatio >= 2) {
	        classNames.push('retina');
	    }

	    // OS classes
	    if (device.os) {
	        classNames.push(device.os, device.os + '-' + device.osVersion.split('.')[0], device.os + '-' + device.osVersion.replace(/\./g, '-'));
	        if (device.os === 'ios') {
	            var major = parseInt(device.osVersion.split('.')[0], 10);
	            for (var i = major - 1; i >= 6; i--) {
	                classNames.push('ios-gt-' + i);
	            }
	        }
	    }
	    // Status bar classes
	    if (device.statusBar) {
	        classNames.push('with-statusbar-overlay');
	    } else {
	        $('html').removeClass('with-statusbar-overlay');
	    }

	    // Add html classes
	    if (classNames.length > 0) $('html').addClass(classNames.join(' '));

	    // keng..
	    device.isWeixin = /MicroMessenger/i.test(ua);

	    $.device = device;
	})(Zepto);

	;(function () {
	    'use strict';

	    /**
	     * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
	     *
	     * @codingstandard ftlabs-jsv2
	     * @copyright The Financial Times Limited [All Rights Reserved]
	     * @license MIT License (see LICENSE.txt)
	     */

	    /*jslint browser:true, node:true, elision:true*/
	    /*global Event, Node*/

	    /**
	     * Instantiate fast-clicking listeners on the specified layer.
	     *
	     * @constructor
	     * @param {Element} layer The layer to listen on
	     * @param {Object} [options={}] The options to override the defaults
	     */

	    function FastClick(layer, options) {
	        var oldOnClick;

	        options = options || {};

	        /**
	         * Whether a click is currently being tracked.
	         *
	         * @type boolean
	         */
	        this.trackingClick = false;

	        /**
	         * Timestamp for when click tracking started.
	         *
	         * @type number
	         */
	        this.trackingClickStart = 0;

	        /**
	         * The element being tracked for a click.
	         *
	         * @type EventTarget
	         */
	        this.targetElement = null;

	        /**
	         * X-coordinate of touch start event.
	         *
	         * @type number
	         */
	        this.touchStartX = 0;

	        /**
	         * Y-coordinate of touch start event.
	         *
	         * @type number
	         */
	        this.touchStartY = 0;

	        /**
	         * ID of the last touch, retrieved from Touch.identifier.
	         *
	         * @type number
	         */
	        this.lastTouchIdentifier = 0;

	        /**
	         * Touchmove boundary, beyond which a click will be cancelled.
	         *
	         * @type number
	         */
	        this.touchBoundary = options.touchBoundary || 10;

	        /**
	         * The FastClick layer.
	         *
	         * @type Element
	         */
	        this.layer = layer;

	        /**
	         * The minimum time between tap(touchstart and touchend) events
	         *
	         * @type number
	         */
	        this.tapDelay = options.tapDelay || 200;

	        /**
	         * The maximum time for a tap
	         *
	         * @type number
	         */
	        this.tapTimeout = options.tapTimeout || 700;

	        if (FastClick.notNeeded(layer)) {
	            return;
	        }

	        // Some old versions of Android don't have Function.prototype.bind
	        function bind(method, context) {
	            return function () {
	                return method.apply(context, arguments);
	            };
	        }

	        var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
	        var context = this;
	        for (var i = 0, l = methods.length; i < l; i++) {
	            context[methods[i]] = bind(context[methods[i]], context);
	        }

	        // Set up event handlers as required
	        if (deviceIsAndroid) {
	            layer.addEventListener('mouseover', this.onMouse, true);
	            layer.addEventListener('mousedown', this.onMouse, true);
	            layer.addEventListener('mouseup', this.onMouse, true);
	        }

	        layer.addEventListener('click', this.onClick, true);
	        layer.addEventListener('touchstart', this.onTouchStart, false);
	        layer.addEventListener('touchmove', this.onTouchMove, false);
	        layer.addEventListener('touchend', this.onTouchEnd, false);
	        layer.addEventListener('touchcancel', this.onTouchCancel, false);

	        // Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
	        // which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
	        // layer when they are cancelled.
	        if (!Event.prototype.stopImmediatePropagation) {
	            layer.removeEventListener = function (type, callback, capture) {
	                var rmv = Node.prototype.removeEventListener;
	                if (type === 'click') {
	                    rmv.call(layer, type, callback.hijacked || callback, capture);
	                } else {
	                    rmv.call(layer, type, callback, capture);
	                }
	            };

	            layer.addEventListener = function (type, callback, capture) {
	                var adv = Node.prototype.addEventListener;
	                if (type === 'click') {
	                    adv.call(layer, type, callback.hijacked || (callback.hijacked = function (event) {
	                        if (!event.propagationStopped) {
	                            callback(event);
	                        }
	                    }), capture);
	                } else {
	                    adv.call(layer, type, callback, capture);
	                }
	            };
	        }

	        // If a handler is already declared in the element's onclick attribute, it will be fired before
	        // FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
	        // adding it as listener.
	        if (typeof layer.onclick === 'function') {

	            // Android browser on at least 3.2 requires a new reference to the function in layer.onclick
	            // - the old one won't work if passed to addEventListener directly.
	            oldOnClick = layer.onclick;
	            layer.addEventListener('click', function (event) {
	                oldOnClick(event);
	            }, false);
	            layer.onclick = null;
	        }
	    }

	    /**
	     * Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
	     *
	     * @type boolean
	     */
	    var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

	    /**
	     * Android requires exceptions.
	     *
	     * @type boolean
	     */
	    var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;

	    /**
	     * iOS requires exceptions.
	     *
	     * @type boolean
	     */
	    var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;

	    /**
	     * iOS 4 requires an exception for select elements.
	     *
	     * @type boolean
	     */
	    var deviceIsIOS4 = deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent);

	    /**
	     * iOS 6.0-7.* requires the target element to be manually derived
	     *
	     * @type boolean
	     */
	    var deviceIsIOSWithBadTarget = deviceIsIOS && /OS [6-7]_\d/.test(navigator.userAgent);

	    /**
	     * BlackBerry requires exceptions.
	     *
	     * @type boolean
	     */
	    var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

	    /**
	     * 判断是否组合型label
	     * @type {Boolean}
	     */
	    var isCompositeLabel = false;

	    /**
	     * Determine whether a given element requires a native click.
	     *
	     * @param {EventTarget|Element} target Target DOM element
	     * @returns {boolean} Returns true if the element needs a native click
	     */
	    FastClick.prototype.needsClick = function (target) {

	        // 修复bug: 如果父元素中有 label
	        // 如果label上有needsclick这个类，则用原生的点击，否则，用模拟点击
	        var parent = target;
	        while (parent && parent.tagName.toUpperCase() !== "BODY") {
	            if (parent.tagName.toUpperCase() === "LABEL") {
	                isCompositeLabel = true;
	                if (/\bneedsclick\b/.test(parent.className)) return true;
	            }
	            parent = parent.parentNode;
	        }

	        switch (target.nodeName.toLowerCase()) {

	            // Don't send a synthetic click to disabled inputs (issue #62)
	            case 'button':
	            case 'select':
	            case 'textarea':
	                if (target.disabled) {
	                    return true;
	                }

	                break;
	            case 'input':

	                // File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
	                if (deviceIsIOS && target.type === 'file' || target.disabled) {
	                    return true;
	                }

	                break;
	            case 'label':
	            case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
	            case 'video':
	                return true;
	        }

	        return (/\bneedsclick\b/.test(target.className)
	        );
	    };

	    /**
	     * Determine whether a given element requires a call to focus to simulate click into element.
	     *
	     * @param {EventTarget|Element} target Target DOM element
	     * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
	     */
	    FastClick.prototype.needsFocus = function (target) {
	        switch (target.nodeName.toLowerCase()) {
	            case 'textarea':
	                return true;
	            case 'select':
	                return !deviceIsAndroid;
	            case 'input':
	                switch (target.type) {
	                    case 'button':
	                    case 'checkbox':
	                    case 'file':
	                    case 'image':
	                    case 'radio':
	                    case 'submit':
	                        return false;
	                }

	                // No point in attempting to focus disabled inputs
	                return !target.disabled && !target.readOnly;
	            default:
	                return (/\bneedsfocus\b/.test(target.className)
	                );
	        }
	    };

	    /**
	     * Send a click event to the specified element.
	     *
	     * @param {EventTarget|Element} targetElement
	     * @param {Event} event
	     */
	    FastClick.prototype.sendClick = function (targetElement, event) {
	        var clickEvent, touch;

	        // On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
	        if (document.activeElement && document.activeElement !== targetElement) {
	            document.activeElement.blur();
	        }

	        touch = event.changedTouches[0];

	        // Synthesise a click event, with an extra attribute so it can be tracked
	        clickEvent = document.createEvent('MouseEvents');
	        clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
	        clickEvent.forwardedTouchEvent = true;
	        targetElement.dispatchEvent(clickEvent);
	    };

	    FastClick.prototype.determineEventType = function (targetElement) {

	        //Issue #159: Android Chrome Select Box does not open with a synthetic click event
	        if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
	            return 'mousedown';
	        }

	        return 'click';
	    };

	    /**
	     * @param {EventTarget|Element} targetElement
	     */
	    FastClick.prototype.focus = function (targetElement) {
	        var length;

	        // Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
	        var unsupportedType = ['date', 'time', 'month', 'number', 'email'];
	        if (deviceIsIOS && targetElement.setSelectionRange && unsupportedType.indexOf(targetElement.type) === -1) {
	            length = targetElement.value.length;
	            targetElement.setSelectionRange(length, length);
	        } else {
	            targetElement.focus();
	        }
	    };

	    /**
	     * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
	     *
	     * @param {EventTarget|Element} targetElement
	     */
	    FastClick.prototype.updateScrollParent = function (targetElement) {
	        var scrollParent, parentElement;

	        scrollParent = targetElement.fastClickScrollParent;

	        // Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
	        // target element was moved to another parent.
	        if (!scrollParent || !scrollParent.contains(targetElement)) {
	            parentElement = targetElement;
	            do {
	                if (parentElement.scrollHeight > parentElement.offsetHeight) {
	                    scrollParent = parentElement;
	                    targetElement.fastClickScrollParent = parentElement;
	                    break;
	                }

	                parentElement = parentElement.parentElement;
	            } while (parentElement);
	        }

	        // Always update the scroll top tracker if possible.
	        if (scrollParent) {
	            scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
	        }
	    };

	    /**
	     * @param {EventTarget} targetElement
	     * @returns {Element|EventTarget}
	     */
	    FastClick.prototype.getTargetElementFromEventTarget = function (eventTarget) {

	        // On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
	        if (eventTarget.nodeType === Node.TEXT_NODE) {
	            return eventTarget.parentNode;
	        }

	        return eventTarget;
	    };

	    /**
	     * On touch start, record the position and scroll offset.
	     *
	     * @param {Event} event
	     * @returns {boolean}
	     */
	    FastClick.prototype.onTouchStart = function (event) {
	        var targetElement, touch, selection;

	        // Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
	        if (event.targetTouches.length > 1) {
	            return true;
	        }

	        targetElement = this.getTargetElementFromEventTarget(event.target);
	        touch = event.targetTouches[0];

	        if (deviceIsIOS) {

	            // Only trusted events will deselect text on iOS (issue #49)
	            selection = window.getSelection();
	            if (selection.rangeCount && !selection.isCollapsed) {
	                return true;
	            }

	            if (!deviceIsIOS4) {

	                // Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
	                // when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
	                // with the same identifier as the touch event that previously triggered the click that triggered the alert.
	                // Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
	                // immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
	                // Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
	                // which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
	                // random integers, it's safe to to continue if the identifier is 0 here.
	                if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
	                    event.preventDefault();
	                    return false;
	                }

	                this.lastTouchIdentifier = touch.identifier;

	                // If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
	                // 1) the user does a fling scroll on the scrollable layer
	                // 2) the user stops the fling scroll with another tap
	                // then the event.target of the last 'touchend' event will be the element that was under the user's finger
	                // when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
	                // is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
	                this.updateScrollParent(targetElement);
	            }
	        }

	        this.trackingClick = true;
	        this.trackingClickStart = event.timeStamp;
	        this.targetElement = targetElement;

	        this.touchStartX = touch.pageX;
	        this.touchStartY = touch.pageY;

	        // Prevent phantom clicks on fast double-tap (issue #36)
	        if (event.timeStamp - this.lastClickTime < this.tapDelay) {
	            event.preventDefault();
	        }

	        return true;
	    };

	    /**
	     * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
	     *
	     * @param {Event} event
	     * @returns {boolean}
	     */
	    FastClick.prototype.touchHasMoved = function (event) {
	        var touch = event.changedTouches[0],
	            boundary = this.touchBoundary;

	        if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
	            return true;
	        }

	        return false;
	    };

	    /**
	     * Update the last position.
	     *
	     * @param {Event} event
	     * @returns {boolean}
	     */
	    FastClick.prototype.onTouchMove = function (event) {
	        if (!this.trackingClick) {
	            return true;
	        }

	        // If the touch has moved, cancel the click tracking
	        if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
	            this.trackingClick = false;
	            this.targetElement = null;
	        }

	        return true;
	    };

	    /**
	     * Attempt to find the labelled control for the given label element.
	     *
	     * @param {EventTarget|HTMLLabelElement} labelElement
	     * @returns {Element|null}
	     */
	    FastClick.prototype.findControl = function (labelElement) {

	        // Fast path for newer browsers supporting the HTML5 control attribute
	        if (labelElement.control !== undefined) {
	            return labelElement.control;
	        }

	        // All browsers under test that support touch events also support the HTML5 htmlFor attribute
	        if (labelElement.htmlFor) {
	            return document.getElementById(labelElement.htmlFor);
	        }

	        // If no for attribute exists, attempt to retrieve the first labellable descendant element
	        // the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
	        return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
	    };

	    /**
	     * On touch end, determine whether to send a click event at once.
	     *
	     * @param {Event} event
	     * @returns {boolean}
	     */
	    FastClick.prototype.onTouchEnd = function (event) {
	        var forElement,
	            trackingClickStart,
	            targetTagName,
	            scrollParent,
	            touch,
	            targetElement = this.targetElement;

	        if (!this.trackingClick) {
	            return true;
	        }

	        // Prevent phantom clicks on fast double-tap (issue #36)
	        if (event.timeStamp - this.lastClickTime < this.tapDelay) {
	            this.cancelNextClick = true;
	            return true;
	        }

	        if (event.timeStamp - this.trackingClickStart > this.tapTimeout) {
	            return true;
	        }
	        //修复安卓微信下，input type="date" 的bug，经测试date,time,month已没问题
	        var unsupportedType = ['date', 'time', 'month'];
	        if (unsupportedType.indexOf(event.target.type) !== -1) {
	            return false;
	        }
	        // Reset to prevent wrong click cancel on input (issue #156).
	        this.cancelNextClick = false;

	        this.lastClickTime = event.timeStamp;

	        trackingClickStart = this.trackingClickStart;
	        this.trackingClick = false;
	        this.trackingClickStart = 0;

	        // On some iOS devices, the targetElement supplied with the event is invalid if the layer
	        // is performing a transition or scroll, and has to be re-detected manually. Note that
	        // for this to function correctly, it must be called *after* the event target is checked!
	        // See issue #57; also filed as rdar://13048589 .
	        if (deviceIsIOSWithBadTarget) {
	            touch = event.changedTouches[0];

	            // In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
	            targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
	            targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
	        }

	        targetTagName = targetElement.tagName.toLowerCase();
	        if (targetTagName === 'label') {
	            forElement = this.findControl(targetElement);
	            if (forElement) {
	                this.focus(targetElement);
	                if (deviceIsAndroid) {
	                    return false;
	                }

	                targetElement = forElement;
	            }
	        } else if (this.needsFocus(targetElement)) {

	            // Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
	            // Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
	            if (event.timeStamp - trackingClickStart > 100 || deviceIsIOS && window.top !== window && targetTagName === 'input') {
	                this.targetElement = null;
	                return false;
	            }

	            this.focus(targetElement);
	            this.sendClick(targetElement, event);

	            // Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
	            // Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
	            if (!deviceIsIOS || targetTagName !== 'select') {
	                this.targetElement = null;
	                event.preventDefault();
	            }

	            return false;
	        }

	        if (deviceIsIOS && !deviceIsIOS4) {

	            // Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
	            // and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
	            scrollParent = targetElement.fastClickScrollParent;
	            if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
	                return true;
	            }
	        }

	        // Prevent the actual click from going though - unless the target node is marked as requiring
	        // real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
	        if (!this.needsClick(targetElement)) {
	            event.preventDefault();
	            this.sendClick(targetElement, event);
	        }

	        return false;
	    };

	    /**
	     * On touch cancel, stop tracking the click.
	     *
	     * @returns {void}
	     */
	    FastClick.prototype.onTouchCancel = function () {
	        this.trackingClick = false;
	        this.targetElement = null;
	    };

	    /**
	     * Determine mouse events which should be permitted.
	     *
	     * @param {Event} event
	     * @returns {boolean}
	     */
	    FastClick.prototype.onMouse = function (event) {

	        // If a target element was never set (because a touch event was never fired) allow the event
	        if (!this.targetElement) {
	            return true;
	        }

	        if (event.forwardedTouchEvent) {
	            return true;
	        }

	        // Programmatically generated events targeting a specific element should be permitted
	        if (!event.cancelable) {
	            return true;
	        }

	        // Derive and check the target element to see whether the mouse event needs to be permitted;
	        // unless explicitly enabled, prevent non-touch click events from triggering actions,
	        // to prevent ghost/doubleclicks.
	        if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

	            // Prevent any user-added listeners declared on FastClick element from being fired.
	            if (event.stopImmediatePropagation) {
	                event.stopImmediatePropagation();
	            } else {

	                // Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
	                event.propagationStopped = true;
	            }

	            // Cancel the event
	            event.stopPropagation();
	            // 允许组合型label冒泡
	            if (!isCompositeLabel) {
	                event.preventDefault();
	            }
	            // 允许组合型label冒泡
	            return false;
	        }

	        // If the mouse event is permitted, return true for the action to go through.
	        return true;
	    };

	    /**
	     * On actual clicks, determine whether this is a touch-generated click, a click action occurring
	     * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
	     * an actual click which should be permitted.
	     *
	     * @param {Event} event
	     * @returns {boolean}
	     */
	    FastClick.prototype.onClick = function (event) {
	        var permitted;

	        // It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
	        if (this.trackingClick) {
	            this.targetElement = null;
	            this.trackingClick = false;
	            return true;
	        }

	        // Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
	        if (event.target.type === 'submit' && event.detail === 0) {
	            return true;
	        }

	        permitted = this.onMouse(event);

	        // Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
	        if (!permitted) {
	            this.targetElement = null;
	        }

	        // If clicks are permitted, return true for the action to go through.
	        return permitted;
	    };

	    /**
	     * Remove all FastClick's event listeners.
	     *
	     * @returns {void}
	     */
	    FastClick.prototype.destroy = function () {
	        var layer = this.layer;

	        if (deviceIsAndroid) {
	            layer.removeEventListener('mouseover', this.onMouse, true);
	            layer.removeEventListener('mousedown', this.onMouse, true);
	            layer.removeEventListener('mouseup', this.onMouse, true);
	        }

	        layer.removeEventListener('click', this.onClick, true);
	        layer.removeEventListener('touchstart', this.onTouchStart, false);
	        layer.removeEventListener('touchmove', this.onTouchMove, false);
	        layer.removeEventListener('touchend', this.onTouchEnd, false);
	        layer.removeEventListener('touchcancel', this.onTouchCancel, false);
	    };

	    /**
	     * Check whether FastClick is needed.
	     *
	     * @param {Element} layer The layer to listen on
	     */
	    FastClick.notNeeded = function (layer) {
	        var metaViewport;
	        var chromeVersion;
	        var blackberryVersion;
	        var firefoxVersion;

	        // Devices that don't support touch don't need FastClick
	        if (typeof window.ontouchstart === 'undefined') {
	            return true;
	        }

	        // Chrome version - zero for other browsers
	        chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

	        if (chromeVersion) {

	            if (deviceIsAndroid) {
	                metaViewport = document.querySelector('meta[name=viewport]');

	                if (metaViewport) {
	                    // Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
	                    if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
	                        return true;
	                    }
	                    // Chrome 32 and above with width=device-width or less don't need FastClick
	                    if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
	                        return true;
	                    }
	                }

	                // Chrome desktop doesn't need FastClick (issue #15)
	            } else {
	                return true;
	            }
	        }

	        if (deviceIsBlackBerry10) {
	            blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

	            // BlackBerry 10.3+ does not require Fastclick library.
	            // https://github.com/ftlabs/fastclick/issues/251
	            if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
	                metaViewport = document.querySelector('meta[name=viewport]');

	                if (metaViewport) {
	                    // user-scalable=no eliminates click delay.
	                    if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
	                        return true;
	                    }
	                    // width=device-width (or less than device-width) eliminates click delay.
	                    if (document.documentElement.scrollWidth <= window.outerWidth) {
	                        return true;
	                    }
	                }
	            }
	        }

	        // IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
	        if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
	            return true;
	        }

	        // Firefox version - zero for other browsers
	        firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

	        if (firefoxVersion >= 27) {
	            // Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

	            metaViewport = document.querySelector('meta[name=viewport]');
	            if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
	                return true;
	            }
	        }

	        // IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
	        // http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
	        if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
	            return true;
	        }

	        return false;
	    };

	    /**
	     * Factory method for creating a FastClick object
	     *
	     * @param {Element} layer The layer to listen on
	     * @param {Object} [options={}] The options to override the defaults
	     */
	    FastClick.attach = function (layer, options) {
	        return new FastClick(layer, options);
	    };

	    window.FastClick = FastClick;
	})();

	/*======================================================
	************   Modals   ************
	======================================================*/
	/*jshint unused: false*/
	+function ($) {
	    "use strict";

	    var _modalTemplateTempDiv = document.createElement('div');

	    $.modalStack = [];

	    $.modalStackClearQueue = function () {
	        if ($.modalStack.length) {
	            $.modalStack.shift()();
	        }
	    };
	    $.modal = function (params) {
	        params = params || {};
	        var modalHTML = '';
	        var buttonsHTML = '';
	        if (params.buttons && params.buttons.length > 0) {
	            for (var i = 0; i < params.buttons.length; i++) {
	                buttonsHTML += '<span class="modal-button' + (params.buttons[i].bold ? ' modal-button-bold' : '') + '">' + params.buttons[i].text + '</span>';
	            }
	        }
	        var extraClass = params.extraClass || '';
	        var titleHTML = params.title ? '<div class="modal-title">' + params.title + '</div>' : '';
	        var textHTML = params.text ? '<div class="modal-text">' + params.text + '</div>' : '';
	        var afterTextHTML = params.afterText ? params.afterText : '';
	        var noButtons = !params.buttons || params.buttons.length === 0 ? 'modal-no-buttons' : '';
	        var verticalButtons = params.verticalButtons ? 'modal-buttons-vertical' : '';
	        modalHTML = '<div class="modal ' + extraClass + ' ' + noButtons + '"><div class="modal-inner">' + (titleHTML + textHTML + afterTextHTML) + '</div><div class="modal-buttons ' + verticalButtons + '">' + buttonsHTML + '</div></div>';

	        _modalTemplateTempDiv.innerHTML = modalHTML;

	        var modal = $(_modalTemplateTempDiv).children();

	        $(defaults.modalContainer).append(modal[0]);

	        // Add events on buttons
	        modal.find('.modal-button').each(function (index, el) {
	            $(el).on('click', function (e) {
	                if (params.buttons[index].close !== false) $.closeModal(modal);
	                if (params.buttons[index].onClick) params.buttons[index].onClick(modal, e);
	                if (params.onClick) params.onClick(modal, index);
	            });
	        });
	        $.openModal(modal);
	        return modal[0];
	    };
	    $.alert = function (text, title, callbackOk) {
	        if (typeof title === 'function') {
	            callbackOk = arguments[1];
	            title = undefined;
	        }
	        return $.modal({
	            text: text || '',
	            title: typeof title === 'undefined' ? defaults.modalTitle : title,
	            buttons: [{ text: defaults.modalButtonOk, bold: true, onClick: callbackOk }]
	        });
	    };
	    $.confirm = function (text, title, callbackOk, callbackCancel) {
	        if (typeof title === 'function') {
	            callbackCancel = arguments[2];
	            callbackOk = arguments[1];
	            title = undefined;
	        }
	        return $.modal({
	            text: text || '',
	            title: typeof title === 'undefined' ? defaults.modalTitle : title,
	            buttons: [{ text: defaults.modalButtonCancel, onClick: callbackCancel }, { text: defaults.modalButtonOk, bold: true, onClick: callbackOk }]
	        });
	    };
	    $.prompt = function (text, title, callbackOk, callbackCancel) {
	        if (typeof title === 'function') {
	            callbackCancel = arguments[2];
	            callbackOk = arguments[1];
	            title = undefined;
	        }
	        return $.modal({
	            text: text || '',
	            title: typeof title === 'undefined' ? defaults.modalTitle : title,
	            afterText: '<input type="text" class="modal-text-input">',
	            buttons: [{
	                text: defaults.modalButtonCancel
	            }, {
	                text: defaults.modalButtonOk,
	                bold: true
	            }],
	            onClick: function onClick(modal, index) {
	                if (index === 0 && callbackCancel) callbackCancel($(modal).find('.modal-text-input').val());
	                if (index === 1 && callbackOk) callbackOk($(modal).find('.modal-text-input').val());
	            }
	        });
	    };
	    $.modalLogin = function (text, title, callbackOk, callbackCancel) {
	        if (typeof title === 'function') {
	            callbackCancel = arguments[2];
	            callbackOk = arguments[1];
	            title = undefined;
	        }
	        return $.modal({
	            text: text || '',
	            title: typeof title === 'undefined' ? defaults.modalTitle : title,
	            afterText: '<input type="text" name="modal-username" placeholder="' + defaults.modalUsernamePlaceholder + '" class="modal-text-input modal-text-input-double"><input type="password" name="modal-password" placeholder="' + defaults.modalPasswordPlaceholder + '" class="modal-text-input modal-text-input-double">',
	            buttons: [{
	                text: defaults.modalButtonCancel
	            }, {
	                text: defaults.modalButtonOk,
	                bold: true
	            }],
	            onClick: function onClick(modal, index) {
	                var username = $(modal).find('.modal-text-input[name="modal-username"]').val();
	                var password = $(modal).find('.modal-text-input[name="modal-password"]').val();
	                if (index === 0 && callbackCancel) callbackCancel(username, password);
	                if (index === 1 && callbackOk) callbackOk(username, password);
	            }
	        });
	    };
	    $.modalPassword = function (text, title, callbackOk, callbackCancel) {
	        if (typeof title === 'function') {
	            callbackCancel = arguments[2];
	            callbackOk = arguments[1];
	            title = undefined;
	        }
	        return $.modal({
	            text: text || '',
	            title: typeof title === 'undefined' ? defaults.modalTitle : title,
	            afterText: '<input type="password" name="modal-password" placeholder="' + defaults.modalPasswordPlaceholder + '" class="modal-text-input">',
	            buttons: [{
	                text: defaults.modalButtonCancel
	            }, {
	                text: defaults.modalButtonOk,
	                bold: true
	            }],
	            onClick: function onClick(modal, index) {
	                var password = $(modal).find('.modal-text-input[name="modal-password"]').val();
	                if (index === 0 && callbackCancel) callbackCancel(password);
	                if (index === 1 && callbackOk) callbackOk(password);
	            }
	        });
	    };
	    $.showPreloader = function (title) {
	        $.hidePreloader();
	        $.showPreloader.preloaderModal = $.modal({
	            title: title || defaults.modalPreloaderTitle,
	            text: '<div class="preloader"></div>'
	        });

	        return $.showPreloader.preloaderModal;
	    };
	    $.hidePreloader = function () {
	        $.showPreloader.preloaderModal && $.closeModal($.showPreloader.preloaderModal);
	    };
	    $.showIndicator = function () {
	        if ($('.preloader-indicator-modal')[0]) return;
	        $(defaults.modalContainer).append('<div class="preloader-indicator-overlay"></div><div class="preloader-indicator-modal"><span class="preloader preloader-white"></span></div>');
	    };
	    $.hideIndicator = function () {
	        $('.preloader-indicator-overlay, .preloader-indicator-modal').remove();
	    };
	    // Action Sheet
	    $.actions = function (params) {
	        var modal, groupSelector, buttonSelector;
	        params = params || [];

	        if (params.length > 0 && !$.isArray(params[0])) {
	            params = [params];
	        }
	        var modalHTML;
	        var buttonsHTML = '';
	        for (var i = 0; i < params.length; i++) {
	            for (var j = 0; j < params[i].length; j++) {
	                if (j === 0) buttonsHTML += '<div class="actions-modal-group">';
	                var button = params[i][j];
	                var buttonClass = button.label ? 'actions-modal-label' : 'actions-modal-button';
	                if (button.bold) buttonClass += ' actions-modal-button-bold';
	                if (button.color) buttonClass += ' color-' + button.color;
	                if (button.bg) buttonClass += ' bg-' + button.bg;
	                if (button.disabled) buttonClass += ' disabled';
	                buttonsHTML += '<span class="' + buttonClass + '">' + button.text + '</span>';
	                if (j === params[i].length - 1) buttonsHTML += '</div>';
	            }
	        }
	        modalHTML = '<div class="actions-modal">' + buttonsHTML + '</div>';
	        _modalTemplateTempDiv.innerHTML = modalHTML;
	        modal = $(_modalTemplateTempDiv).children();
	        $(defaults.modalContainer).append(modal[0]);
	        groupSelector = '.actions-modal-group';
	        buttonSelector = '.actions-modal-button';

	        var groups = modal.find(groupSelector);
	        groups.each(function (index, el) {
	            var groupIndex = index;
	            $(el).children().each(function (index, el) {
	                var buttonIndex = index;
	                var buttonParams = params[groupIndex][buttonIndex];
	                var clickTarget;
	                if ($(el).is(buttonSelector)) clickTarget = $(el);
	                // if (toPopover && $(el).find(buttonSelector).length > 0) clickTarget = $(el).find(buttonSelector);

	                if (clickTarget) {
	                    clickTarget.on('click', function (e) {
	                        if (buttonParams.close !== false) $.closeModal(modal);
	                        if (buttonParams.onClick) buttonParams.onClick(modal, e);
	                    });
	                }
	            });
	        });
	        $.openModal(modal);
	        return modal[0];
	    };
	    $.popup = function (modal, removeOnClose) {
	        if (typeof removeOnClose === 'undefined') removeOnClose = true;
	        if (typeof modal === 'string' && modal.indexOf('<') >= 0) {
	            var _modal = document.createElement('div');
	            _modal.innerHTML = modal.trim();
	            if (_modal.childNodes.length > 0) {
	                modal = _modal.childNodes[0];
	                if (removeOnClose) modal.classList.add('remove-on-close');
	                $(defaults.modalContainer).append(modal);
	            } else return false; //nothing found
	        }
	        modal = $(modal);
	        if (modal.length === 0) return false;
	        modal.show();
	        modal.find(".content").scroller("refresh");
	        if (modal.find('.' + defaults.viewClass).length > 0) {
	            $.sizeNavbars(modal.find('.' + defaults.viewClass)[0]);
	        }
	        $.openModal(modal);

	        return modal[0];
	    };
	    $.pickerModal = function (pickerModal, removeOnClose) {
	        if (typeof removeOnClose === 'undefined') removeOnClose = true;
	        if (typeof pickerModal === 'string' && pickerModal.indexOf('<') >= 0) {
	            pickerModal = $(pickerModal);
	            if (pickerModal.length > 0) {
	                if (removeOnClose) pickerModal.addClass('remove-on-close');
	                $(defaults.modalContainer).append(pickerModal[0]);
	            } else return false; //nothing found
	        }
	        pickerModal = $(pickerModal);
	        if (pickerModal.length === 0) return false;
	        pickerModal.show();
	        $.openModal(pickerModal);
	        return pickerModal[0];
	    };
	    $.loginScreen = function (modal) {
	        if (!modal) modal = '.login-screen';
	        modal = $(modal);
	        if (modal.length === 0) return false;
	        modal.show();
	        if (modal.find('.' + defaults.viewClass).length > 0) {
	            $.sizeNavbars(modal.find('.' + defaults.viewClass)[0]);
	        }
	        $.openModal(modal);
	        return modal[0];
	    };
	    //显示一个消息，会在2秒钟后自动消失
	    $.toast = function (msg, duration, extraclass) {
	        var $toast = $('<div class="modal toast ' + (extraclass || '') + '">' + msg + '</div>').appendTo(document.body);
	        $.openModal($toast, function () {
	            setTimeout(function () {
	                $.closeModal($toast);
	            }, duration || 2000);
	        });
	    };
	    $.openModal = function (modal, cb) {
	        modal = $(modal);
	        var isModal = modal.hasClass('modal'),
	            isNotToast = !modal.hasClass('toast');
	        if ($('.modal.modal-in:not(.modal-out)').length && defaults.modalStack && isModal && isNotToast) {
	            $.modalStack.push(function () {
	                $.openModal(modal, cb);
	            });
	            return;
	        }
	        var isPopup = modal.hasClass('popup');
	        var isLoginScreen = modal.hasClass('login-screen');
	        var isPickerModal = modal.hasClass('picker-modal');
	        var isToast = modal.hasClass('toast');
	        if (isModal) {
	            modal.show();
	            modal.css({
	                marginTop: -Math.round(modal.outerHeight() / 2) + 'px'
	            });
	        }
	        if (isToast) {
	            modal.css({
	                marginLeft: -Math.round(modal.outerWidth() / 2 / 1.185) + 'px' //1.185 是初始化时候的放大效果
	            });
	        }

	        var overlay;
	        if (!isLoginScreen && !isPickerModal && !isToast) {
	            if ($('.modal-overlay').length === 0 && !isPopup) {
	                $(defaults.modalContainer).append('<div class="modal-overlay"></div>');
	            }
	            if ($('.popup-overlay').length === 0 && isPopup) {
	                $(defaults.modalContainer).append('<div class="popup-overlay"></div>');
	            }
	            overlay = isPopup ? $('.popup-overlay') : $('.modal-overlay');
	        }

	        //Make sure that styles are applied, trigger relayout;
	        var clientLeft = modal[0].clientLeft;

	        // Trugger open event
	        modal.trigger('open');

	        // Picker modal body class
	        if (isPickerModal) {
	            $(defaults.modalContainer).addClass('with-picker-modal');
	        }

	        // Classes for transition in
	        if (!isLoginScreen && !isPickerModal && !isToast) overlay.addClass('modal-overlay-visible');
	        modal.removeClass('modal-out').addClass('modal-in').transitionEnd(function (e) {
	            if (modal.hasClass('modal-out')) modal.trigger('closed');else modal.trigger('opened');
	        });
	        // excute callback
	        if (typeof cb === 'function') {
	            cb.call(this);
	        }
	        return true;
	    };
	    $.closeModal = function (modal) {
	        modal = $(modal || '.modal-in');
	        if (typeof modal !== 'undefined' && modal.length === 0) {
	            return;
	        }
	        var isModal = modal.hasClass('modal'),
	            isPopup = modal.hasClass('popup'),
	            isToast = modal.hasClass('toast'),
	            isLoginScreen = modal.hasClass('login-screen'),
	            isPickerModal = modal.hasClass('picker-modal'),
	            removeOnClose = modal.hasClass('remove-on-close'),
	            overlay = isPopup ? $('.popup-overlay') : $('.modal-overlay');
	        if (isPopup) {
	            if (modal.length === $('.popup.modal-in').length) {
	                overlay.removeClass('modal-overlay-visible');
	            }
	        } else if (!(isPickerModal || isToast)) {
	            overlay.removeClass('modal-overlay-visible');
	        }

	        modal.trigger('close');

	        // Picker modal body class
	        if (isPickerModal) {
	            $(defaults.modalContainer).removeClass('with-picker-modal');
	            $(defaults.modalContainer).addClass('picker-modal-closing');
	        }

	        modal.removeClass('modal-in').addClass('modal-out').transitionEnd(function (e) {
	            if (modal.hasClass('modal-out')) modal.trigger('closed');else modal.trigger('opened');

	            if (isPickerModal) {
	                $(defaults.modalContainer).removeClass('picker-modal-closing');
	            }
	            if (isPopup || isLoginScreen || isPickerModal) {
	                modal.removeClass('modal-out').hide();
	                if (removeOnClose && modal.length > 0) {
	                    modal.remove();
	                }
	            } else {
	                modal.remove();
	            }
	        });
	        if (isModal && defaults.modalStack) {
	            $.modalStackClearQueue();
	        }

	        return true;
	    };
	    function handleClicks(e) {
	        /*jshint validthis:true */
	        var clicked = $(this);
	        var url = clicked.attr('href');

	        //Collect Clicked data- attributes
	        var clickedData = clicked.dataset();

	        // Popup
	        var popup;
	        if (clicked.hasClass('open-popup')) {
	            if (clickedData.popup) {
	                popup = clickedData.popup;
	            } else popup = '.popup';
	            $.popup(popup);
	        }
	        if (clicked.hasClass('close-popup')) {
	            if (clickedData.popup) {
	                popup = clickedData.popup;
	            } else popup = '.popup.modal-in';
	            $.closeModal(popup);
	        }

	        // Close Modal
	        if (clicked.hasClass('modal-overlay')) {
	            if ($('.modal.modal-in').length > 0 && defaults.modalCloseByOutside) $.closeModal('.modal.modal-in');
	            if ($('.actions-modal.modal-in').length > 0 && defaults.actionsCloseByOutside) $.closeModal('.actions-modal.modal-in');
	        }
	        if (clicked.hasClass('popup-overlay')) {
	            if ($('.popup.modal-in').length > 0 && defaults.popupCloseByOutside) $.closeModal('.popup.modal-in');
	        }
	    }
	    $(document).on('click', ' .modal-overlay, .popup-overlay, .close-popup, .open-popup, .close-picker', handleClicks);
	    var defaults = $.modal.prototype.defaults = {
	        modalStack: true,
	        modalButtonOk: '确定',
	        modalButtonCancel: '取消',
	        modalPreloaderTitle: '加载中',
	        modalContainer: document.body
	    };
	}(Zepto);

	/*======================================================
	************   Calendar   ************
	======================================================*/
	/*jshint unused: false*/
	+function ($) {
	    "use strict";

	    var rtl = false;
	    var Calendar = function Calendar(params) {
	        var p = this;
	        var defaults = {
	            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
	            monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
	            dayNames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
	            dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
	            firstDay: 1, // First day of the week, Monday
	            weekendDays: [0, 6], // Sunday and Saturday
	            multiple: false,
	            dateFormat: 'yyyy-mm-dd',
	            direction: 'horizontal', // or 'vertical'
	            minDate: null,
	            maxDate: null,
	            touchMove: true,
	            animate: true,
	            closeOnSelect: true,
	            monthPicker: true,
	            monthPickerTemplate: '<div class="picker-calendar-month-picker">' + '<a href="#" class="link icon-only picker-calendar-prev-month"><i class="icon icon-prev"></i></a>' + '<div class="current-month-value"></div>' + '<a href="#" class="link icon-only picker-calendar-next-month"><i class="icon icon-next"></i></a>' + '</div>',
	            yearPicker: true,
	            yearPickerTemplate: '<div class="picker-calendar-year-picker">' + '<a href="#" class="link icon-only picker-calendar-prev-year"><i class="icon icon-prev"></i></a>' + '<span class="current-year-value"></span>' + '<a href="#" class="link icon-only picker-calendar-next-year"><i class="icon icon-next"></i></a>' + '</div>',
	            weekHeader: true,
	            // Common settings
	            scrollToInput: true,
	            inputReadOnly: true,
	            toolbar: true,
	            toolbarCloseText: 'Done',
	            toolbarTemplate: '<div class="toolbar">' + '<div class="toolbar-inner">' + '{{monthPicker}}' + '{{yearPicker}}' +
	            // '<a href="#" class="link close-picker">{{closeText}}</a>' +
	            '</div>' + '</div>'
	        };
	        params = params || {};
	        for (var def in defaults) {
	            if (typeof params[def] === 'undefined') {
	                params[def] = defaults[def];
	            }
	        }
	        p.params = params;
	        p.initialized = false;

	        // Inline flag
	        p.inline = p.params.container ? true : false;

	        // Is horizontal
	        p.isH = p.params.direction === 'horizontal';

	        // RTL inverter
	        var inverter = p.isH ? rtl ? -1 : 1 : 1;

	        // Animating flag
	        p.animating = false;

	        // Format date
	        function formatDate(date) {
	            date = new Date(date);
	            var year = date.getFullYear();
	            var month = date.getMonth();
	            var month1 = month + 1;
	            var day = date.getDate();
	            var weekDay = date.getDay();
	            return p.params.dateFormat.replace(/yyyy/g, year).replace(/yy/g, (year + '').substring(2)).replace(/mm/g, month1 < 10 ? '0' + month1 : month1).replace(/m/g, month1).replace(/MM/g, p.params.monthNames[month]).replace(/M/g, p.params.monthNamesShort[month]).replace(/dd/g, day < 10 ? '0' + day : day).replace(/d/g, day).replace(/DD/g, p.params.dayNames[weekDay]).replace(/D/g, p.params.dayNamesShort[weekDay]);
	        }

	        // Value
	        p.addValue = function (value) {
	            if (p.params.multiple) {
	                if (!p.value) p.value = [];
	                var inValuesIndex;
	                for (var i = 0; i < p.value.length; i++) {
	                    if (new Date(value).getTime() === new Date(p.value[i]).getTime()) {
	                        inValuesIndex = i;
	                    }
	                }
	                if (typeof inValuesIndex === 'undefined') {
	                    p.value.push(value);
	                } else {
	                    p.value.splice(inValuesIndex, 1);
	                }
	                p.updateValue();
	            } else {
	                p.value = [value];
	                p.updateValue();
	            }
	        };
	        p.setValue = function (arrValues) {
	            p.value = arrValues;
	            p.updateValue();
	        };
	        p.updateValue = function () {
	            p.wrapper.find('.picker-calendar-day-selected').removeClass('picker-calendar-day-selected');
	            var i, inputValue;
	            for (i = 0; i < p.value.length; i++) {
	                var valueDate = new Date(p.value[i]);
	                p.wrapper.find('.picker-calendar-day[data-date="' + valueDate.getFullYear() + '-' + valueDate.getMonth() + '-' + valueDate.getDate() + '"]').addClass('picker-calendar-day-selected');
	            }
	            if (p.params.onChange) {
	                p.params.onChange(p, p.value, p.value.map(formatDate));
	            }
	            if (p.input && p.input.length > 0) {
	                if (p.params.formatValue) inputValue = p.params.formatValue(p, p.value);else {
	                    inputValue = [];
	                    for (i = 0; i < p.value.length; i++) {
	                        inputValue.push(formatDate(p.value[i]));
	                    }
	                    inputValue = inputValue.join(', ');
	                }
	                $(p.input).val(inputValue);
	                $(p.input).trigger('change');
	            }
	        };

	        // Columns Handlers
	        p.initCalendarEvents = function () {
	            var col;
	            var allowItemClick = true;
	            var isTouched, isMoved, touchStartX, touchStartY, touchCurrentX, touchCurrentY, touchStartTime, touchEndTime, startTranslate, currentTranslate, wrapperWidth, wrapperHeight, percentage, touchesDiff, isScrolling;
	            function handleTouchStart(e) {
	                if (isMoved || isTouched) return;
	                // e.preventDefault();
	                isTouched = true;
	                touchStartX = touchCurrentY = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
	                touchStartY = touchCurrentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
	                touchStartTime = new Date().getTime();
	                percentage = 0;
	                allowItemClick = true;
	                isScrolling = undefined;
	                startTranslate = currentTranslate = p.monthsTranslate;
	            }
	            function handleTouchMove(e) {
	                if (!isTouched) return;

	                touchCurrentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
	                touchCurrentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
	                if (typeof isScrolling === 'undefined') {
	                    isScrolling = !!(isScrolling || Math.abs(touchCurrentY - touchStartY) > Math.abs(touchCurrentX - touchStartX));
	                }
	                if (p.isH && isScrolling) {
	                    isTouched = false;
	                    return;
	                }
	                e.preventDefault();
	                if (p.animating) {
	                    isTouched = false;
	                    return;
	                }
	                allowItemClick = false;
	                if (!isMoved) {
	                    // First move
	                    isMoved = true;
	                    wrapperWidth = p.wrapper[0].offsetWidth;
	                    wrapperHeight = p.wrapper[0].offsetHeight;
	                    p.wrapper.transition(0);
	                }
	                e.preventDefault();

	                touchesDiff = p.isH ? touchCurrentX - touchStartX : touchCurrentY - touchStartY;
	                percentage = touchesDiff / (p.isH ? wrapperWidth : wrapperHeight);
	                currentTranslate = (p.monthsTranslate * inverter + percentage) * 100;

	                // Transform wrapper
	                p.wrapper.transform('translate3d(' + (p.isH ? currentTranslate : 0) + '%, ' + (p.isH ? 0 : currentTranslate) + '%, 0)');
	            }
	            function handleTouchEnd(e) {
	                if (!isTouched || !isMoved) {
	                    isTouched = isMoved = false;
	                    return;
	                }
	                isTouched = isMoved = false;

	                touchEndTime = new Date().getTime();
	                if (touchEndTime - touchStartTime < 300) {
	                    if (Math.abs(touchesDiff) < 10) {
	                        p.resetMonth();
	                    } else if (touchesDiff >= 10) {
	                        if (rtl) p.nextMonth();else p.prevMonth();
	                    } else {
	                        if (rtl) p.prevMonth();else p.nextMonth();
	                    }
	                } else {
	                    if (percentage <= -0.5) {
	                        if (rtl) p.prevMonth();else p.nextMonth();
	                    } else if (percentage >= 0.5) {
	                        if (rtl) p.nextMonth();else p.prevMonth();
	                    } else {
	                        p.resetMonth();
	                    }
	                }

	                // Allow click
	                setTimeout(function () {
	                    allowItemClick = true;
	                }, 100);
	            }

	            function handleDayClick(e) {
	                if (!allowItemClick) return;
	                var day = $(e.target).parents('.picker-calendar-day');
	                if (day.length === 0 && $(e.target).hasClass('picker-calendar-day')) {
	                    day = $(e.target);
	                }
	                if (day.length === 0) return;
	                if (day.hasClass('picker-calendar-day-selected') && !p.params.multiple) return;
	                if (day.hasClass('picker-calendar-day-disabled')) return;
	                if (day.hasClass('picker-calendar-day-next')) p.nextMonth();
	                if (day.hasClass('picker-calendar-day-prev')) p.prevMonth();
	                var dateYear = day.attr('data-year');
	                var dateMonth = day.attr('data-month');
	                var dateDay = day.attr('data-day');
	                if (p.params.onDayClick) {
	                    p.params.onDayClick(p, day[0], dateYear, dateMonth, dateDay);
	                }
	                p.addValue(new Date(dateYear, dateMonth, dateDay).getTime());
	                if (p.params.closeOnSelect) p.close();
	            }

	            p.container.find('.picker-calendar-prev-month').on('click', p.prevMonth);
	            p.container.find('.picker-calendar-next-month').on('click', p.nextMonth);
	            p.container.find('.picker-calendar-prev-year').on('click', p.prevYear);
	            p.container.find('.picker-calendar-next-year').on('click', p.nextYear);
	            p.wrapper.on('click', handleDayClick);
	            if (p.params.touchMove) {
	                p.wrapper.on($.touchEvents.start, handleTouchStart);
	                p.wrapper.on($.touchEvents.move, handleTouchMove);
	                p.wrapper.on($.touchEvents.end, handleTouchEnd);
	            }

	            p.container[0].f7DestroyCalendarEvents = function () {
	                p.container.find('.picker-calendar-prev-month').off('click', p.prevMonth);
	                p.container.find('.picker-calendar-next-month').off('click', p.nextMonth);
	                p.container.find('.picker-calendar-prev-year').off('click', p.prevYear);
	                p.container.find('.picker-calendar-next-year').off('click', p.nextYear);
	                p.wrapper.off('click', handleDayClick);
	                if (p.params.touchMove) {
	                    p.wrapper.off($.touchEvents.start, handleTouchStart);
	                    p.wrapper.off($.touchEvents.move, handleTouchMove);
	                    p.wrapper.off($.touchEvents.end, handleTouchEnd);
	                }
	            };
	        };
	        p.destroyCalendarEvents = function (colContainer) {
	            if ('f7DestroyCalendarEvents' in p.container[0]) p.container[0].f7DestroyCalendarEvents();
	        };

	        // Calendar Methods
	        p.daysInMonth = function (date) {
	            var d = new Date(date);
	            return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
	        };
	        p.monthHTML = function (date, offset) {
	            date = new Date(date);
	            var year = date.getFullYear(),
	                month = date.getMonth(),
	                day = date.getDate();
	            if (offset === 'next') {
	                if (month === 11) date = new Date(year + 1, 0);else date = new Date(year, month + 1, 1);
	            }
	            if (offset === 'prev') {
	                if (month === 0) date = new Date(year - 1, 11);else date = new Date(year, month - 1, 1);
	            }
	            if (offset === 'next' || offset === 'prev') {
	                month = date.getMonth();
	                year = date.getFullYear();
	            }
	            var daysInPrevMonth = p.daysInMonth(new Date(date.getFullYear(), date.getMonth()).getTime() - 10 * 24 * 60 * 60 * 1000),
	                daysInMonth = p.daysInMonth(date),
	                firstDayOfMonthIndex = new Date(date.getFullYear(), date.getMonth()).getDay();
	            if (firstDayOfMonthIndex === 0) firstDayOfMonthIndex = 7;

	            var dayDate,
	                currentValues = [],
	                i,
	                j,
	                rows = 6,
	                cols = 7,
	                monthHTML = '',
	                dayIndex = 0 + (p.params.firstDay - 1),
	                today = new Date().setHours(0, 0, 0, 0),
	                minDate = p.params.minDate ? new Date(p.params.minDate).getTime() : null,
	                maxDate = p.params.maxDate ? new Date(p.params.maxDate).getTime() : null;

	            if (p.value && p.value.length) {
	                for (i = 0; i < p.value.length; i++) {
	                    currentValues.push(new Date(p.value[i]).setHours(0, 0, 0, 0));
	                }
	            }

	            for (i = 1; i <= rows; i++) {
	                var rowHTML = '';
	                var row = i;
	                for (j = 1; j <= cols; j++) {
	                    var col = j;
	                    dayIndex++;
	                    var dayNumber = dayIndex - firstDayOfMonthIndex;
	                    var addClass = '';
	                    if (dayNumber < 0) {
	                        dayNumber = daysInPrevMonth + dayNumber + 1;
	                        addClass += ' picker-calendar-day-prev';
	                        dayDate = new Date(month - 1 < 0 ? year - 1 : year, month - 1 < 0 ? 11 : month - 1, dayNumber).getTime();
	                    } else {
	                        dayNumber = dayNumber + 1;
	                        if (dayNumber > daysInMonth) {
	                            dayNumber = dayNumber - daysInMonth;
	                            addClass += ' picker-calendar-day-next';
	                            dayDate = new Date(month + 1 > 11 ? year + 1 : year, month + 1 > 11 ? 0 : month + 1, dayNumber).getTime();
	                        } else {
	                            dayDate = new Date(year, month, dayNumber).getTime();
	                        }
	                    }
	                    // Today
	                    if (dayDate === today) addClass += ' picker-calendar-day-today';
	                    // Selected
	                    if (currentValues.indexOf(dayDate) >= 0) addClass += ' picker-calendar-day-selected';
	                    // Weekend
	                    if (p.params.weekendDays.indexOf(col - 1) >= 0) {
	                        addClass += ' picker-calendar-day-weekend';
	                    }
	                    // Disabled
	                    if (minDate && dayDate < minDate || maxDate && dayDate > maxDate) {
	                        addClass += ' picker-calendar-day-disabled';
	                    }

	                    dayDate = new Date(dayDate);
	                    var dayYear = dayDate.getFullYear();
	                    var dayMonth = dayDate.getMonth();
	                    rowHTML += '<div data-year="' + dayYear + '" data-month="' + dayMonth + '" data-day="' + dayNumber + '" class="picker-calendar-day' + addClass + '" data-date="' + (dayYear + '-' + dayMonth + '-' + dayNumber) + '"><span>' + dayNumber + '</span></div>';
	                }
	                monthHTML += '<div class="picker-calendar-row">' + rowHTML + '</div>';
	            }
	            monthHTML = '<div class="picker-calendar-month" data-year="' + year + '" data-month="' + month + '">' + monthHTML + '</div>';
	            return monthHTML;
	        };
	        p.animating = false;
	        p.updateCurrentMonthYear = function (dir) {
	            if (typeof dir === 'undefined') {
	                p.currentMonth = parseInt(p.months.eq(1).attr('data-month'), 10);
	                p.currentYear = parseInt(p.months.eq(1).attr('data-year'), 10);
	            } else {
	                p.currentMonth = parseInt(p.months.eq(dir === 'next' ? p.months.length - 1 : 0).attr('data-month'), 10);
	                p.currentYear = parseInt(p.months.eq(dir === 'next' ? p.months.length - 1 : 0).attr('data-year'), 10);
	            }
	            p.container.find('.current-month-value').text(p.params.monthNames[p.currentMonth]);
	            p.container.find('.current-year-value').text(p.currentYear);
	        };
	        p.onMonthChangeStart = function (dir) {
	            p.updateCurrentMonthYear(dir);
	            p.months.removeClass('picker-calendar-month-current picker-calendar-month-prev picker-calendar-month-next');
	            var currentIndex = dir === 'next' ? p.months.length - 1 : 0;

	            p.months.eq(currentIndex).addClass('picker-calendar-month-current');
	            p.months.eq(dir === 'next' ? currentIndex - 1 : currentIndex + 1).addClass(dir === 'next' ? 'picker-calendar-month-prev' : 'picker-calendar-month-next');

	            if (p.params.onMonthYearChangeStart) {
	                p.params.onMonthYearChangeStart(p, p.currentYear, p.currentMonth);
	            }
	        };
	        p.onMonthChangeEnd = function (dir, rebuildBoth) {
	            p.animating = false;
	            var nextMonthHTML, prevMonthHTML, newMonthHTML;
	            p.wrapper.find('.picker-calendar-month:not(.picker-calendar-month-prev):not(.picker-calendar-month-current):not(.picker-calendar-month-next)').remove();

	            if (typeof dir === 'undefined') {
	                dir = 'next';
	                rebuildBoth = true;
	            }
	            if (!rebuildBoth) {
	                newMonthHTML = p.monthHTML(new Date(p.currentYear, p.currentMonth), dir);
	            } else {
	                p.wrapper.find('.picker-calendar-month-next, .picker-calendar-month-prev').remove();
	                prevMonthHTML = p.monthHTML(new Date(p.currentYear, p.currentMonth), 'prev');
	                nextMonthHTML = p.monthHTML(new Date(p.currentYear, p.currentMonth), 'next');
	            }
	            if (dir === 'next' || rebuildBoth) {
	                p.wrapper.append(newMonthHTML || nextMonthHTML);
	            }
	            if (dir === 'prev' || rebuildBoth) {
	                p.wrapper.prepend(newMonthHTML || prevMonthHTML);
	            }
	            p.months = p.wrapper.find('.picker-calendar-month');
	            p.setMonthsTranslate(p.monthsTranslate);
	            if (p.params.onMonthAdd) {
	                p.params.onMonthAdd(p, dir === 'next' ? p.months.eq(p.months.length - 1)[0] : p.months.eq(0)[0]);
	            }
	            if (p.params.onMonthYearChangeEnd) {
	                p.params.onMonthYearChangeEnd(p, p.currentYear, p.currentMonth);
	            }
	        };
	        p.setMonthsTranslate = function (translate) {
	            translate = translate || p.monthsTranslate || 0;
	            if (typeof p.monthsTranslate === 'undefined') p.monthsTranslate = translate;
	            p.months.removeClass('picker-calendar-month-current picker-calendar-month-prev picker-calendar-month-next');
	            var prevMonthTranslate = -(translate + 1) * 100 * inverter;
	            var currentMonthTranslate = -translate * 100 * inverter;
	            var nextMonthTranslate = -(translate - 1) * 100 * inverter;
	            p.months.eq(0).transform('translate3d(' + (p.isH ? prevMonthTranslate : 0) + '%, ' + (p.isH ? 0 : prevMonthTranslate) + '%, 0)').addClass('picker-calendar-month-prev');
	            p.months.eq(1).transform('translate3d(' + (p.isH ? currentMonthTranslate : 0) + '%, ' + (p.isH ? 0 : currentMonthTranslate) + '%, 0)').addClass('picker-calendar-month-current');
	            p.months.eq(2).transform('translate3d(' + (p.isH ? nextMonthTranslate : 0) + '%, ' + (p.isH ? 0 : nextMonthTranslate) + '%, 0)').addClass('picker-calendar-month-next');
	        };
	        p.nextMonth = function (transition) {
	            if (typeof transition === 'undefined' || (typeof transition === "undefined" ? "undefined" : _typeof(transition)) === 'object') {
	                transition = '';
	                if (!p.params.animate) transition = 0;
	            }
	            var nextMonth = parseInt(p.months.eq(p.months.length - 1).attr('data-month'), 10);
	            var nextYear = parseInt(p.months.eq(p.months.length - 1).attr('data-year'), 10);
	            var nextDate = new Date(nextYear, nextMonth);
	            var nextDateTime = nextDate.getTime();
	            var transitionEndCallback = p.animating ? false : true;
	            if (p.params.maxDate) {
	                if (nextDateTime > new Date(p.params.maxDate).getTime()) {
	                    return p.resetMonth();
	                }
	            }
	            p.monthsTranslate--;
	            if (nextMonth === p.currentMonth) {
	                var nextMonthTranslate = -p.monthsTranslate * 100 * inverter;
	                var nextMonthHTML = $(p.monthHTML(nextDateTime, 'next')).transform('translate3d(' + (p.isH ? nextMonthTranslate : 0) + '%, ' + (p.isH ? 0 : nextMonthTranslate) + '%, 0)').addClass('picker-calendar-month-next');
	                p.wrapper.append(nextMonthHTML[0]);
	                p.months = p.wrapper.find('.picker-calendar-month');
	                if (p.params.onMonthAdd) {
	                    p.params.onMonthAdd(p, p.months.eq(p.months.length - 1)[0]);
	                }
	            }
	            p.animating = true;
	            p.onMonthChangeStart('next');
	            var translate = p.monthsTranslate * 100 * inverter;

	            p.wrapper.transition(transition).transform('translate3d(' + (p.isH ? translate : 0) + '%, ' + (p.isH ? 0 : translate) + '%, 0)');
	            if (transitionEndCallback) {
	                p.wrapper.transitionEnd(function () {
	                    p.onMonthChangeEnd('next');
	                });
	            }
	            if (!p.params.animate) {
	                p.onMonthChangeEnd('next');
	            }
	        };
	        p.prevMonth = function (transition) {
	            if (typeof transition === 'undefined' || (typeof transition === "undefined" ? "undefined" : _typeof(transition)) === 'object') {
	                transition = '';
	                if (!p.params.animate) transition = 0;
	            }
	            var prevMonth = parseInt(p.months.eq(0).attr('data-month'), 10);
	            var prevYear = parseInt(p.months.eq(0).attr('data-year'), 10);
	            var prevDate = new Date(prevYear, prevMonth + 1, -1);
	            var prevDateTime = prevDate.getTime();
	            var transitionEndCallback = p.animating ? false : true;
	            if (p.params.minDate) {
	                if (prevDateTime < new Date(p.params.minDate).getTime()) {
	                    return p.resetMonth();
	                }
	            }
	            p.monthsTranslate++;
	            if (prevMonth === p.currentMonth) {
	                var prevMonthTranslate = -p.monthsTranslate * 100 * inverter;
	                var prevMonthHTML = $(p.monthHTML(prevDateTime, 'prev')).transform('translate3d(' + (p.isH ? prevMonthTranslate : 0) + '%, ' + (p.isH ? 0 : prevMonthTranslate) + '%, 0)').addClass('picker-calendar-month-prev');
	                p.wrapper.prepend(prevMonthHTML[0]);
	                p.months = p.wrapper.find('.picker-calendar-month');
	                if (p.params.onMonthAdd) {
	                    p.params.onMonthAdd(p, p.months.eq(0)[0]);
	                }
	            }
	            p.animating = true;
	            p.onMonthChangeStart('prev');
	            var translate = p.monthsTranslate * 100 * inverter;
	            p.wrapper.transition(transition).transform('translate3d(' + (p.isH ? translate : 0) + '%, ' + (p.isH ? 0 : translate) + '%, 0)');
	            if (transitionEndCallback) {
	                p.wrapper.transitionEnd(function () {
	                    p.onMonthChangeEnd('prev');
	                });
	            }
	            if (!p.params.animate) {
	                p.onMonthChangeEnd('prev');
	            }
	        };
	        p.resetMonth = function (transition) {
	            if (typeof transition === 'undefined') transition = '';
	            var translate = p.monthsTranslate * 100 * inverter;
	            p.wrapper.transition(transition).transform('translate3d(' + (p.isH ? translate : 0) + '%, ' + (p.isH ? 0 : translate) + '%, 0)');
	        };
	        p.setYearMonth = function (year, month, transition) {
	            if (typeof year === 'undefined') year = p.currentYear;
	            if (typeof month === 'undefined') month = p.currentMonth;
	            if (typeof transition === 'undefined' || (typeof transition === "undefined" ? "undefined" : _typeof(transition)) === 'object') {
	                transition = '';
	                if (!p.params.animate) transition = 0;
	            }
	            var targetDate;
	            if (year < p.currentYear) {
	                targetDate = new Date(year, month + 1, -1).getTime();
	            } else {
	                targetDate = new Date(year, month).getTime();
	            }
	            if (p.params.maxDate && targetDate > new Date(p.params.maxDate).getTime()) {
	                return false;
	            }
	            if (p.params.minDate && targetDate < new Date(p.params.minDate).getTime()) {
	                return false;
	            }
	            var currentDate = new Date(p.currentYear, p.currentMonth).getTime();
	            var dir = targetDate > currentDate ? 'next' : 'prev';
	            var newMonthHTML = p.monthHTML(new Date(year, month));
	            p.monthsTranslate = p.monthsTranslate || 0;
	            var prevTranslate = p.monthsTranslate;
	            var monthTranslate, wrapperTranslate;
	            var transitionEndCallback = p.animating ? false : true;
	            if (targetDate > currentDate) {
	                // To next
	                p.monthsTranslate--;
	                if (!p.animating) p.months.eq(p.months.length - 1).remove();
	                p.wrapper.append(newMonthHTML);
	                p.months = p.wrapper.find('.picker-calendar-month');
	                monthTranslate = -(prevTranslate - 1) * 100 * inverter;
	                p.months.eq(p.months.length - 1).transform('translate3d(' + (p.isH ? monthTranslate : 0) + '%, ' + (p.isH ? 0 : monthTranslate) + '%, 0)').addClass('picker-calendar-month-next');
	            } else {
	                // To prev
	                p.monthsTranslate++;
	                if (!p.animating) p.months.eq(0).remove();
	                p.wrapper.prepend(newMonthHTML);
	                p.months = p.wrapper.find('.picker-calendar-month');
	                monthTranslate = -(prevTranslate + 1) * 100 * inverter;
	                p.months.eq(0).transform('translate3d(' + (p.isH ? monthTranslate : 0) + '%, ' + (p.isH ? 0 : monthTranslate) + '%, 0)').addClass('picker-calendar-month-prev');
	            }
	            if (p.params.onMonthAdd) {
	                p.params.onMonthAdd(p, dir === 'next' ? p.months.eq(p.months.length - 1)[0] : p.months.eq(0)[0]);
	            }
	            p.animating = true;
	            p.onMonthChangeStart(dir);
	            wrapperTranslate = p.monthsTranslate * 100 * inverter;
	            p.wrapper.transition(transition).transform('translate3d(' + (p.isH ? wrapperTranslate : 0) + '%, ' + (p.isH ? 0 : wrapperTranslate) + '%, 0)');
	            if (transitionEndCallback) {
	                p.wrapper.transitionEnd(function () {
	                    p.onMonthChangeEnd(dir, true);
	                });
	            }
	            if (!p.params.animate) {
	                p.onMonthChangeEnd(dir);
	            }
	        };
	        p.nextYear = function () {
	            p.setYearMonth(p.currentYear + 1);
	        };
	        p.prevYear = function () {
	            p.setYearMonth(p.currentYear - 1);
	        };

	        // HTML Layout
	        p.layout = function () {
	            var pickerHTML = '';
	            var pickerClass = '';
	            var i;

	            var layoutDate = p.value && p.value.length ? p.value[0] : new Date().setHours(0, 0, 0, 0);
	            var prevMonthHTML = p.monthHTML(layoutDate, 'prev');
	            var currentMonthHTML = p.monthHTML(layoutDate);
	            var nextMonthHTML = p.monthHTML(layoutDate, 'next');
	            var monthsHTML = '<div class="picker-calendar-months"><div class="picker-calendar-months-wrapper">' + (prevMonthHTML + currentMonthHTML + nextMonthHTML) + '</div></div>';
	            // Week days header
	            var weekHeaderHTML = '';
	            if (p.params.weekHeader) {
	                for (i = 0; i < 7; i++) {
	                    var weekDayIndex = i + p.params.firstDay > 6 ? i - 7 + p.params.firstDay : i + p.params.firstDay;
	                    var dayName = p.params.dayNamesShort[weekDayIndex];
	                    weekHeaderHTML += '<div class="picker-calendar-week-day ' + (p.params.weekendDays.indexOf(weekDayIndex) >= 0 ? 'picker-calendar-week-day-weekend' : '') + '"> ' + dayName + '</div>';
	                }
	                weekHeaderHTML = '<div class="picker-calendar-week-days">' + weekHeaderHTML + '</div>';
	            }
	            pickerClass = 'picker-modal picker-calendar ' + (p.params.cssClass || '');
	            var toolbarHTML = p.params.toolbar ? p.params.toolbarTemplate.replace(/{{closeText}}/g, p.params.toolbarCloseText) : '';
	            if (p.params.toolbar) {
	                toolbarHTML = p.params.toolbarTemplate.replace(/{{closeText}}/g, p.params.toolbarCloseText).replace(/{{monthPicker}}/g, p.params.monthPicker ? p.params.monthPickerTemplate : '').replace(/{{yearPicker}}/g, p.params.yearPicker ? p.params.yearPickerTemplate : '');
	            }

	            pickerHTML = '<div class="' + pickerClass + '">' + toolbarHTML + '<div class="picker-modal-inner">' + weekHeaderHTML + monthsHTML + '</div>' + '</div>';

	            p.pickerHTML = pickerHTML;
	        };

	        // Input Events
	        function openOnInput(e) {
	            e.preventDefault();
	            // 安卓微信webviewreadonly的input依然弹出软键盘问题修复
	            if ($.device.isWeixin && $.device.android && p.params.inputReadOnly) {
	                /*jshint validthis:true */
	                this.focus();
	                this.blur();
	            }
	            if (p.opened) return;
	            p.open();
	            if (p.params.scrollToInput) {
	                var pageContent = p.input.parents('.content');
	                if (pageContent.length === 0) return;

	                var paddingTop = parseInt(pageContent.css('padding-top'), 10),
	                    paddingBottom = parseInt(pageContent.css('padding-bottom'), 10),
	                    pageHeight = pageContent[0].offsetHeight - paddingTop - p.container.height(),
	                    pageScrollHeight = pageContent[0].scrollHeight - paddingTop - p.container.height(),
	                    newPaddingBottom;

	                var inputTop = p.input.offset().top - paddingTop + p.input[0].offsetHeight;
	                if (inputTop > pageHeight) {
	                    var scrollTop = pageContent.scrollTop() + inputTop - pageHeight;
	                    if (scrollTop + pageHeight > pageScrollHeight) {
	                        newPaddingBottom = scrollTop + pageHeight - pageScrollHeight + paddingBottom;
	                        if (pageHeight === pageScrollHeight) {
	                            newPaddingBottom = p.container.height();
	                        }
	                        pageContent.css({ 'padding-bottom': newPaddingBottom + 'px' });
	                    }
	                    pageContent.scrollTop(scrollTop, 300);
	                }
	            }
	        }
	        function closeOnHTMLClick(e) {
	            if (p.input && p.input.length > 0) {
	                if (e.target !== p.input[0] && $(e.target).parents('.picker-modal').length === 0) p.close();
	            } else {
	                if ($(e.target).parents('.picker-modal').length === 0) p.close();
	            }
	        }

	        if (p.params.input) {
	            p.input = $(p.params.input);
	            if (p.input.length > 0) {
	                if (p.params.inputReadOnly) p.input.prop('readOnly', true);
	                if (!p.inline) {
	                    p.input.on('click', openOnInput);
	                }
	            }
	        }

	        if (!p.inline) $('html').on('click', closeOnHTMLClick);

	        // Open
	        function onPickerClose() {
	            p.opened = false;
	            if (p.input && p.input.length > 0) p.input.parents('.content').css({ 'padding-bottom': '' });
	            if (p.params.onClose) p.params.onClose(p);

	            // Destroy events
	            p.destroyCalendarEvents();
	        }

	        p.opened = false;
	        p.open = function () {
	            var updateValue = false;
	            if (!p.opened) {
	                // Set date value
	                if (!p.value) {
	                    if (p.params.value) {
	                        p.value = p.params.value;
	                        updateValue = true;
	                    }
	                }

	                // Layout
	                p.layout();

	                // Append
	                if (p.inline) {
	                    p.container = $(p.pickerHTML);
	                    p.container.addClass('picker-modal-inline');
	                    $(p.params.container).append(p.container);
	                } else {
	                    p.container = $($.pickerModal(p.pickerHTML));
	                    $(p.container).on('close', function () {
	                        onPickerClose();
	                    });
	                }

	                // Store calendar instance
	                p.container[0].f7Calendar = p;
	                p.wrapper = p.container.find('.picker-calendar-months-wrapper');

	                // Months
	                p.months = p.wrapper.find('.picker-calendar-month');

	                // Update current month and year
	                p.updateCurrentMonthYear();

	                // Set initial translate
	                p.monthsTranslate = 0;
	                p.setMonthsTranslate();

	                // Init events
	                p.initCalendarEvents();

	                // Update input value
	                if (updateValue) p.updateValue();
	            }

	            // Set flag
	            p.opened = true;
	            p.initialized = true;
	            if (p.params.onMonthAdd) {
	                p.months.each(function () {
	                    p.params.onMonthAdd(p, this);
	                });
	            }
	            if (p.params.onOpen) p.params.onOpen(p);
	        };

	        // Close
	        p.close = function () {
	            if (!p.opened || p.inline) return;
	            $.closeModal(p.container);
	            return;
	        };

	        // Destroy
	        p.destroy = function () {
	            p.close();
	            if (p.params.input && p.input.length > 0) {
	                p.input.off('click', openOnInput);
	            }
	            $('html').off('click', closeOnHTMLClick);
	        };

	        if (p.inline) {
	            p.open();
	        }

	        return p;
	    };
	    $.fn.calendar = function (params) {
	        return this.each(function () {
	            var $this = $(this);
	            if (!$this[0]) return;
	            var p = {};
	            if ($this[0].tagName.toUpperCase() === "INPUT") {
	                p.input = $this;
	            } else {
	                p.container = $this;
	            }
	            new Calendar($.extend(p, params));
	        });
	    };

	    $.initCalendar = function (content) {
	        var $content = content ? $(content) : $(document.body);
	        $content.find("[data-toggle='date']").each(function () {
	            $(this).calendar();
	        });
	    };
	}(Zepto);

	/*======================================================
	************   Picker   ************
	======================================================*/
	/* jshint unused:false */
	/* jshint multistr:true */
	+function ($) {
	    "use strict";

	    var Picker = function Picker(params) {
	        var p = this;
	        var defaults = {
	            updateValuesOnMomentum: false,
	            updateValuesOnTouchmove: true,
	            rotateEffect: false,
	            momentumRatio: 7,
	            freeMode: false,
	            // Common settings
	            scrollToInput: true,
	            inputReadOnly: true,
	            toolbar: true,
	            toolbarCloseText: '确定',
	            toolbarTemplate: '<header class="bar bar-nav">\
	                <button class="button button-link pull-right close-picker">确定</button>\
	                <h1 class="title">请选择</h1>\
	                </header>'
	        };
	        params = params || {};
	        for (var def in defaults) {
	            if (typeof params[def] === 'undefined') {
	                params[def] = defaults[def];
	            }
	        }
	        p.params = params;
	        p.cols = [];
	        p.initialized = false;

	        // Inline flag
	        p.inline = p.params.container ? true : false;

	        // 3D Transforms origin bug, only on safari
	        var originBug = $.device.ios || navigator.userAgent.toLowerCase().indexOf('safari') >= 0 && navigator.userAgent.toLowerCase().indexOf('chrome') < 0 && !$.device.android;

	        // Value
	        p.setValue = function (arrValues, transition) {
	            var valueIndex = 0;
	            for (var i = 0; i < p.cols.length; i++) {
	                if (p.cols[i] && !p.cols[i].divider) {
	                    p.cols[i].setValue(arrValues[valueIndex], transition);
	                    valueIndex++;
	                }
	            }
	        };
	        p.updateValue = function () {
	            var newValue = [];
	            var newDisplayValue = [];
	            for (var i = 0; i < p.cols.length; i++) {
	                if (!p.cols[i].divider) {
	                    newValue.push(p.cols[i].value);
	                    newDisplayValue.push(p.cols[i].displayValue);
	                }
	            }
	            if (newValue.indexOf(undefined) >= 0) {
	                return;
	            }
	            p.value = newValue;
	            p.displayValue = newDisplayValue;
	            if (p.params.onChange) {
	                p.params.onChange(p, p.value, p.displayValue);
	            }
	            if (p.input && p.input.length > 0) {
	                $(p.input).val(p.params.formatValue ? p.params.formatValue(p, p.value, p.displayValue) : p.value.join(' '));
	                $(p.input).trigger('change');
	            }
	        };

	        // Columns Handlers
	        p.initPickerCol = function (colElement, updateItems) {
	            var colContainer = $(colElement);
	            var colIndex = colContainer.index();
	            var col = p.cols[colIndex];
	            if (col.divider) return;
	            col.container = colContainer;
	            col.wrapper = col.container.find('.picker-items-col-wrapper');
	            col.items = col.wrapper.find('.picker-item');

	            var i, j;
	            var wrapperHeight, itemHeight, itemsHeight, minTranslate, maxTranslate;
	            col.replaceValues = function (values, displayValues) {
	                col.destroyEvents();
	                col.values = values;
	                col.displayValues = displayValues;
	                var newItemsHTML = p.columnHTML(col, true);
	                col.wrapper.html(newItemsHTML);
	                col.items = col.wrapper.find('.picker-item');
	                col.calcSize();
	                col.setValue(col.values[0], 0, true);
	                col.initEvents();
	            };
	            col.calcSize = function () {
	                if (p.params.rotateEffect) {
	                    col.container.removeClass('picker-items-col-absolute');
	                    if (!col.width) col.container.css({ width: '' });
	                }
	                var colWidth, colHeight;
	                colWidth = 0;
	                colHeight = col.container[0].offsetHeight;
	                wrapperHeight = col.wrapper[0].offsetHeight;
	                itemHeight = col.items[0].offsetHeight;
	                itemsHeight = itemHeight * col.items.length;
	                minTranslate = colHeight / 2 - itemsHeight + itemHeight / 2;
	                maxTranslate = colHeight / 2 - itemHeight / 2;
	                if (col.width) {
	                    colWidth = col.width;
	                    if (parseInt(colWidth, 10) === colWidth) colWidth = colWidth + 'px';
	                    col.container.css({ width: colWidth });
	                }
	                if (p.params.rotateEffect) {
	                    if (!col.width) {
	                        col.items.each(function () {
	                            var item = $(this);
	                            item.css({ width: 'auto' });
	                            colWidth = Math.max(colWidth, item[0].offsetWidth);
	                            item.css({ width: '' });
	                        });
	                        col.container.css({ width: colWidth + 2 + 'px' });
	                    }
	                    col.container.addClass('picker-items-col-absolute');
	                }
	            };
	            col.calcSize();

	            col.wrapper.transform('translate3d(0,' + maxTranslate + 'px,0)').transition(0);

	            var activeIndex = 0;
	            var animationFrameId;

	            // Set Value Function
	            col.setValue = function (newValue, transition, valueCallbacks) {
	                if (typeof transition === 'undefined') transition = '';
	                var newActiveIndex = col.wrapper.find('.picker-item[data-picker-value="' + newValue + '"]').index();
	                if (typeof newActiveIndex === 'undefined' || newActiveIndex === -1) {
	                    return;
	                }
	                var newTranslate = -newActiveIndex * itemHeight + maxTranslate;
	                // Update wrapper
	                col.wrapper.transition(transition);
	                col.wrapper.transform('translate3d(0,' + newTranslate + 'px,0)');

	                // Watch items
	                if (p.params.updateValuesOnMomentum && col.activeIndex && col.activeIndex !== newActiveIndex) {
	                    $.cancelAnimationFrame(animationFrameId);
	                    col.wrapper.transitionEnd(function () {
	                        $.cancelAnimationFrame(animationFrameId);
	                    });
	                    updateDuringScroll();
	                }

	                // Update items
	                col.updateItems(newActiveIndex, newTranslate, transition, valueCallbacks);
	            };

	            col.updateItems = function (activeIndex, translate, transition, valueCallbacks) {
	                if (typeof translate === 'undefined') {
	                    translate = $.getTranslate(col.wrapper[0], 'y');
	                }
	                if (typeof activeIndex === 'undefined') activeIndex = -Math.round((translate - maxTranslate) / itemHeight);
	                if (activeIndex < 0) activeIndex = 0;
	                if (activeIndex >= col.items.length) activeIndex = col.items.length - 1;
	                var previousActiveIndex = col.activeIndex;
	                col.activeIndex = activeIndex;
	                /*
	                   col.wrapper.find('.picker-selected, .picker-after-selected, .picker-before-selected').removeClass('picker-selected picker-after-selected picker-before-selected');
	                    col.items.transition(transition);
	                   var selectedItem = col.items.eq(activeIndex).addClass('picker-selected').transform('');
	                   var prevItems = selectedItem.prevAll().addClass('picker-before-selected');
	                   var nextItems = selectedItem.nextAll().addClass('picker-after-selected');
	                   */
	                //去掉 .picker-after-selected, .picker-before-selected 以提高性能
	                col.wrapper.find('.picker-selected').removeClass('picker-selected');
	                if (p.params.rotateEffect) {
	                    col.items.transition(transition);
	                }
	                var selectedItem = col.items.eq(activeIndex).addClass('picker-selected').transform('');

	                if (valueCallbacks || typeof valueCallbacks === 'undefined') {
	                    // Update values
	                    col.value = selectedItem.attr('data-picker-value');
	                    col.displayValue = col.displayValues ? col.displayValues[activeIndex] : col.value;
	                    // On change callback
	                    if (previousActiveIndex !== activeIndex) {
	                        if (col.onChange) {
	                            col.onChange(p, col.value, col.displayValue);
	                        }
	                        p.updateValue();
	                    }
	                }

	                // Set 3D rotate effect
	                if (!p.params.rotateEffect) {
	                    return;
	                }
	                var percentage = (translate - (Math.floor((translate - maxTranslate) / itemHeight) * itemHeight + maxTranslate)) / itemHeight;

	                col.items.each(function () {
	                    var item = $(this);
	                    var itemOffsetTop = item.index() * itemHeight;
	                    var translateOffset = maxTranslate - translate;
	                    var itemOffset = itemOffsetTop - translateOffset;
	                    var percentage = itemOffset / itemHeight;

	                    var itemsFit = Math.ceil(col.height / itemHeight / 2) + 1;

	                    var angle = -18 * percentage;
	                    if (angle > 180) angle = 180;
	                    if (angle < -180) angle = -180;
	                    // Far class
	                    if (Math.abs(percentage) > itemsFit) item.addClass('picker-item-far');else item.removeClass('picker-item-far');
	                    // Set transform
	                    item.transform('translate3d(0, ' + (-translate + maxTranslate) + 'px, ' + (originBug ? -110 : 0) + 'px) rotateX(' + angle + 'deg)');
	                });
	            };

	            function updateDuringScroll() {
	                animationFrameId = $.requestAnimationFrame(function () {
	                    col.updateItems(undefined, undefined, 0);
	                    updateDuringScroll();
	                });
	            }

	            // Update items on init
	            if (updateItems) col.updateItems(0, maxTranslate, 0);

	            var allowItemClick = true;
	            var isTouched, isMoved, touchStartY, touchCurrentY, touchStartTime, touchEndTime, startTranslate, returnTo, currentTranslate, prevTranslate, velocityTranslate, velocityTime;
	            function handleTouchStart(e) {
	                if (isMoved || isTouched) return;
	                e.preventDefault();
	                isTouched = true;
	                touchStartY = touchCurrentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
	                touchStartTime = new Date().getTime();

	                allowItemClick = true;
	                startTranslate = currentTranslate = $.getTranslate(col.wrapper[0], 'y');
	            }
	            function handleTouchMove(e) {
	                if (!isTouched) return;
	                e.preventDefault();
	                allowItemClick = false;
	                touchCurrentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
	                if (!isMoved) {
	                    // First move
	                    $.cancelAnimationFrame(animationFrameId);
	                    isMoved = true;
	                    startTranslate = currentTranslate = $.getTranslate(col.wrapper[0], 'y');
	                    col.wrapper.transition(0);
	                }
	                e.preventDefault();

	                var diff = touchCurrentY - touchStartY;
	                currentTranslate = startTranslate + diff;
	                returnTo = undefined;

	                // Normalize translate
	                if (currentTranslate < minTranslate) {
	                    currentTranslate = minTranslate - Math.pow(minTranslate - currentTranslate, 0.8);
	                    returnTo = 'min';
	                }
	                if (currentTranslate > maxTranslate) {
	                    currentTranslate = maxTranslate + Math.pow(currentTranslate - maxTranslate, 0.8);
	                    returnTo = 'max';
	                }
	                // Transform wrapper
	                col.wrapper.transform('translate3d(0,' + currentTranslate + 'px,0)');

	                // Update items
	                col.updateItems(undefined, currentTranslate, 0, p.params.updateValuesOnTouchmove);

	                // Calc velocity
	                velocityTranslate = currentTranslate - prevTranslate || currentTranslate;
	                velocityTime = new Date().getTime();
	                prevTranslate = currentTranslate;
	            }
	            function handleTouchEnd(e) {
	                if (!isTouched || !isMoved) {
	                    isTouched = isMoved = false;
	                    return;
	                }
	                isTouched = isMoved = false;
	                col.wrapper.transition('');
	                if (returnTo) {
	                    if (returnTo === 'min') {
	                        col.wrapper.transform('translate3d(0,' + minTranslate + 'px,0)');
	                    } else col.wrapper.transform('translate3d(0,' + maxTranslate + 'px,0)');
	                }
	                touchEndTime = new Date().getTime();
	                var velocity, newTranslate;
	                if (touchEndTime - touchStartTime > 300) {
	                    newTranslate = currentTranslate;
	                } else {
	                    velocity = Math.abs(velocityTranslate / (touchEndTime - velocityTime));
	                    newTranslate = currentTranslate + velocityTranslate * p.params.momentumRatio;
	                }

	                newTranslate = Math.max(Math.min(newTranslate, maxTranslate), minTranslate);

	                // Active Index
	                var activeIndex = -Math.floor((newTranslate - maxTranslate) / itemHeight);

	                // Normalize translate
	                if (!p.params.freeMode) newTranslate = -activeIndex * itemHeight + maxTranslate;

	                // Transform wrapper
	                col.wrapper.transform('translate3d(0,' + parseInt(newTranslate, 10) + 'px,0)');

	                // Update items
	                col.updateItems(activeIndex, newTranslate, '', true);

	                // Watch items
	                if (p.params.updateValuesOnMomentum) {
	                    updateDuringScroll();
	                    col.wrapper.transitionEnd(function () {
	                        $.cancelAnimationFrame(animationFrameId);
	                    });
	                }

	                // Allow click
	                setTimeout(function () {
	                    allowItemClick = true;
	                }, 100);
	            }

	            function handleClick(e) {
	                if (!allowItemClick) return;
	                $.cancelAnimationFrame(animationFrameId);
	                /*jshint validthis:true */
	                var value = $(this).attr('data-picker-value');
	                col.setValue(value);
	            }

	            col.initEvents = function (detach) {
	                var method = detach ? 'off' : 'on';
	                col.container[method]($.touchEvents.start, handleTouchStart);
	                col.container[method]($.touchEvents.move, handleTouchMove);
	                col.container[method]($.touchEvents.end, handleTouchEnd);
	                col.items[method]('click', handleClick);
	            };
	            col.destroyEvents = function () {
	                col.initEvents(true);
	            };

	            col.container[0].f7DestroyPickerCol = function () {
	                col.destroyEvents();
	            };

	            col.initEvents();
	        };
	        p.destroyPickerCol = function (colContainer) {
	            colContainer = $(colContainer);
	            if ('f7DestroyPickerCol' in colContainer[0]) colContainer[0].f7DestroyPickerCol();
	        };
	        // Resize cols
	        function resizeCols() {
	            if (!p.opened) return;
	            for (var i = 0; i < p.cols.length; i++) {
	                if (!p.cols[i].divider) {
	                    p.cols[i].calcSize();
	                    p.cols[i].setValue(p.cols[i].value, 0, false);
	                }
	            }
	        }
	        $(window).on('resize', resizeCols);

	        // HTML Layout
	        p.columnHTML = function (col, onlyItems) {
	            var columnItemsHTML = '';
	            var columnHTML = '';
	            if (col.divider) {
	                columnHTML += '<div class="picker-items-col picker-items-col-divider ' + (col.textAlign ? 'picker-items-col-' + col.textAlign : '') + ' ' + (col.cssClass || '') + '">' + col.content + '</div>';
	            } else {
	                for (var j = 0; j < col.values.length; j++) {
	                    columnItemsHTML += '<div class="picker-item" data-picker-value="' + col.values[j] + '">' + (col.displayValues ? col.displayValues[j] : col.values[j]) + '</div>';
	                }

	                columnHTML += '<div class="picker-items-col ' + (col.textAlign ? 'picker-items-col-' + col.textAlign : '') + ' ' + (col.cssClass || '') + '"><div class="picker-items-col-wrapper">' + columnItemsHTML + '</div></div>';
	            }
	            return onlyItems ? columnItemsHTML : columnHTML;
	        };
	        p.layout = function () {
	            var pickerHTML = '';
	            var pickerClass = '';
	            var i;
	            p.cols = [];
	            var colsHTML = '';
	            for (i = 0; i < p.params.cols.length; i++) {
	                var col = p.params.cols[i];
	                colsHTML += p.columnHTML(p.params.cols[i]);
	                p.cols.push(col);
	            }
	            pickerClass = 'picker-modal picker-columns ' + (p.params.cssClass || '') + (p.params.rotateEffect ? ' picker-3d' : '');
	            pickerHTML = '<div class="' + pickerClass + '">' + (p.params.toolbar ? p.params.toolbarTemplate.replace(/{{closeText}}/g, p.params.toolbarCloseText) : '') + '<div class="picker-modal-inner picker-items">' + colsHTML + '<div class="picker-center-highlight"></div>' + '</div>' + '</div>';

	            p.pickerHTML = pickerHTML;
	        };

	        // Input Events
	        function openOnInput(e) {
	            e.preventDefault();
	            // 安卓微信webviewreadonly的input依然弹出软键盘问题修复
	            if ($.device.isWeixin && $.device.android && p.params.inputReadOnly) {
	                /*jshint validthis:true */
	                this.focus();
	                this.blur();
	            }
	            if (p.opened) return;
	            p.open();
	            if (p.params.scrollToInput) {
	                var pageContent = p.input.parents('.content');
	                if (pageContent.length === 0) return;

	                var paddingTop = parseInt(pageContent.css('padding-top'), 10),
	                    paddingBottom = parseInt(pageContent.css('padding-bottom'), 10),
	                    pageHeight = pageContent[0].offsetHeight - paddingTop - p.container.height(),
	                    pageScrollHeight = pageContent[0].scrollHeight - paddingTop - p.container.height(),
	                    newPaddingBottom;
	                var inputTop = p.input.offset().top - paddingTop + p.input[0].offsetHeight;
	                if (inputTop > pageHeight) {
	                    var scrollTop = pageContent.scrollTop() + inputTop - pageHeight;
	                    if (scrollTop + pageHeight > pageScrollHeight) {
	                        newPaddingBottom = scrollTop + pageHeight - pageScrollHeight + paddingBottom;
	                        if (pageHeight === pageScrollHeight) {
	                            newPaddingBottom = p.container.height();
	                        }
	                        pageContent.css({ 'padding-bottom': newPaddingBottom + 'px' });
	                    }
	                    pageContent.scrollTop(scrollTop, 300);
	                }
	            }
	        }
	        function closeOnHTMLClick(e) {
	            if (!p.opened) return;
	            if (p.input && p.input.length > 0) {
	                if (e.target !== p.input[0] && $(e.target).parents('.picker-modal').length === 0) p.close();
	            } else {
	                if ($(e.target).parents('.picker-modal').length === 0) p.close();
	            }
	        }

	        if (p.params.input) {
	            p.input = $(p.params.input);
	            if (p.input.length > 0) {
	                if (p.params.inputReadOnly) p.input.prop('readOnly', true);
	                if (!p.inline) {
	                    p.input.on('click', openOnInput);
	                }
	            }
	        }

	        if (!p.inline) $('html').on('click', closeOnHTMLClick);

	        // Open
	        function onPickerClose() {
	            p.opened = false;
	            if (p.input && p.input.length > 0) p.input.parents('.content').css({ 'padding-bottom': '' });
	            if (p.params.onClose) p.params.onClose(p);

	            // Destroy events
	            p.container.find('.picker-items-col').each(function () {
	                p.destroyPickerCol(this);
	            });
	        }

	        p.opened = false;
	        p.open = function () {
	            if (!p.opened) {

	                // Layout
	                p.layout();

	                // Append
	                if (p.inline) {
	                    p.container = $(p.pickerHTML);
	                    p.container.addClass('picker-modal-inline');
	                    $(p.params.container).append(p.container);
	                    p.opened = true;
	                } else {
	                    p.container = $($.pickerModal(p.pickerHTML));
	                    $(p.container).one('opened', function () {
	                        p.opened = true;
	                    }).on('close', function () {
	                        onPickerClose();
	                    });
	                }

	                // Store picker instance
	                p.container[0].f7Picker = p;

	                // Init Events
	                p.container.find('.picker-items-col').each(function () {
	                    var updateItems = true;
	                    if (!p.initialized && p.params.value || p.initialized && p.value) updateItems = false;
	                    p.initPickerCol(this, updateItems);
	                });

	                // Set value
	                if (!p.initialized) {
	                    if (p.params.value) {
	                        p.setValue(p.params.value, 0);
	                    }
	                } else {
	                    if (p.value) p.setValue(p.value, 0);
	                }
	            }

	            // Set flag
	            p.initialized = true;

	            if (p.params.onOpen) p.params.onOpen(p);
	        };

	        // Close
	        p.close = function () {
	            if (!p.opened || p.inline) return;
	            $.closeModal(p.container);
	            return;
	        };

	        // Destroy
	        p.destroy = function () {
	            p.close();
	            if (p.params.input && p.input.length > 0) {
	                p.input.off('click', openOnInput);
	            }
	            $('html').off('click', closeOnHTMLClick);
	            $(window).off('resize', resizeCols);
	        };

	        if (p.inline) {
	            p.open();
	        }

	        return p;
	    };

	    $(document).on("click", ".close-picker", function () {
	        var pickerToClose = $('.picker-modal.modal-in');
	        $.closeModal(pickerToClose);
	    });

	    $.fn.picker = function (params) {
	        var args = arguments;
	        return this.each(function () {
	            if (!this) return;
	            var $this = $(this);

	            var picker = $this.data("picker");
	            if (!picker) {
	                var p = $.extend({
	                    input: this,
	                    value: $this.val() ? $this.val().split(' ') : ''
	                }, params);
	                picker = new Picker(p);
	                $this.data("picker", picker);
	            }
	            if ((typeof params === "undefined" ? "undefined" : _typeof(params)) === _typeof("a")) {
	                picker[params].apply(picker, Array.prototype.slice.call(args, 1));
	            }
	        });
	    };
	}(Zepto);

	/* jshint unused:false*/

	+function ($) {
	    "use strict";

	    var today = new Date();

	    var getDays = function getDays(max) {
	        var days = [];
	        for (var i = 1; i <= (max || 31); i++) {
	            days.push(i < 10 ? "0" + i : i);
	        }
	        return days;
	    };

	    var getDaysByMonthAndYear = function getDaysByMonthAndYear(month, year) {
	        var int_d = new Date(year, parseInt(month) + 1 - 1, 1);
	        var d = new Date(int_d - 1);
	        return getDays(d.getDate());
	    };

	    var formatNumber = function formatNumber(n) {
	        return n < 10 ? "0" + n : n;
	    };

	    var initMonthes = '01 02 03 04 05 06 07 08 09 10 11 12'.split(' ');

	    var initYears = function () {
	        var arr = [];
	        for (var i = 1950; i <= 2030; i++) {
	            arr.push(i);
	        }
	        return arr;
	    }();

	    var defaults = {

	        rotateEffect: false, //为了性能

	        value: [today.getFullYear(), formatNumber(today.getMonth() + 1), formatNumber(today.getDate()), today.getHours(), formatNumber(today.getMinutes())],

	        onChange: function onChange(picker, values, displayValues) {
	            var days = getDaysByMonthAndYear(picker.cols[1].value, picker.cols[0].value);
	            var currentValue = picker.cols[2].value;
	            if (currentValue > days.length) currentValue = days.length;
	            picker.cols[2].setValue(currentValue);
	        },

	        formatValue: function formatValue(p, values, displayValues) {
	            return displayValues[0] + '-' + values[1] + '-' + values[2] + ' ' + values[3] + ':' + values[4];
	        },

	        cols: [
	        // Years
	        {
	            values: initYears
	        },
	        // Months
	        {
	            values: initMonthes
	        },
	        // Days
	        {
	            values: getDays()
	        },

	        // Space divider
	        {
	            divider: true,
	            content: '  '
	        },
	        // Hours
	        {
	            values: function () {
	                var arr = [];
	                for (var i = 0; i <= 23; i++) {
	                    arr.push(i);
	                }
	                return arr;
	            }()
	        },
	        // Divider
	        {
	            divider: true,
	            content: ':'
	        },
	        // Minutes
	        {
	            values: function () {
	                var arr = [];
	                for (var i = 0; i <= 59; i++) {
	                    arr.push(i < 10 ? '0' + i : i);
	                }
	                return arr;
	            }()
	        }]
	    };

	    $.fn.datetimePicker = function (params) {
	        return this.each(function () {
	            if (!this) return;
	            var p = $.extend(defaults, params);
	            $(this).picker(p);
	            if (params.value) $(this).val(p.formatValue(p, p.value, p.value));
	        });
	    };
	}(Zepto);

	+function (window) {

	    "use strict";

	    var rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
	        window.setTimeout(callback, 1000 / 60);
	    };
	    /*var cRAF = window.cancelRequestAnimationFrame ||
	        window.webkitCancelRequestAnimationFrame ||
	        window.mozCancelRequestAnimationFrame ||
	        window.oCancelRequestAnimationFrame ||
	        window.msCancelRequestAnimationFrame;*/

	    var utils = function () {
	        var me = {};

	        var _elementStyle = document.createElement('div').style;
	        var _vendor = function () {
	            var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
	                transform,
	                i = 0,
	                l = vendors.length;

	            for (; i < l; i++) {
	                transform = vendors[i] + 'ransform';
	                if (transform in _elementStyle) return vendors[i].substr(0, vendors[i].length - 1);
	            }

	            return false;
	        }();

	        function _prefixStyle(style) {
	            if (_vendor === false) return false;
	            if (_vendor === '') return style;
	            return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
	        }

	        me.getTime = Date.now || function getTime() {
	            return new Date().getTime();
	        };

	        me.extend = function (target, obj) {
	            for (var i in obj) {
	                // jshint ignore:line
	                target[i] = obj[i];
	            }
	        };

	        me.addEvent = function (el, type, fn, capture) {
	            el.addEventListener(type, fn, !!capture);
	        };

	        me.removeEvent = function (el, type, fn, capture) {
	            el.removeEventListener(type, fn, !!capture);
	        };

	        me.prefixPointerEvent = function (pointerEvent) {
	            return window.MSPointerEvent ? 'MSPointer' + pointerEvent.charAt(9).toUpperCase() + pointerEvent.substr(10) : pointerEvent;
	        };

	        me.momentum = function (current, start, time, lowerMargin, wrapperSize, deceleration, self) {
	            var distance = current - start,
	                speed = Math.abs(distance) / time,
	                destination,
	                duration;

	            // var absDistance = Math.abs(distance);
	            speed = speed / 2; //slowdown
	            speed = speed > 1.5 ? 1.5 : speed; //set max speed to 1
	            deceleration = deceleration === undefined ? 0.0006 : deceleration;

	            destination = current + speed * speed / (2 * deceleration) * (distance < 0 ? -1 : 1);
	            duration = speed / deceleration;

	            if (destination < lowerMargin) {
	                destination = wrapperSize ? lowerMargin - wrapperSize / 2.5 * (speed / 8) : lowerMargin;
	                distance = Math.abs(destination - current);
	                duration = distance / speed;
	            } else if (destination > 0) {
	                destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
	                distance = Math.abs(current) + destination;
	                duration = distance / speed;
	            }

	            //simple trigger, every 50ms
	            var t = +new Date();
	            var l = t;

	            function eventTrigger() {
	                if (+new Date() - l > 50) {
	                    self._execEvent('scroll');
	                    l = +new Date();
	                }
	                if (+new Date() - t < duration) {
	                    rAF(eventTrigger);
	                }
	            }
	            rAF(eventTrigger);

	            return {
	                destination: Math.round(destination),
	                duration: duration
	            };
	        };

	        var _transform = _prefixStyle('transform');

	        me.extend(me, {
	            hasTransform: _transform !== false,
	            hasPerspective: _prefixStyle('perspective') in _elementStyle,
	            hasTouch: 'ontouchstart' in window,
	            hasPointer: window.PointerEvent || window.MSPointerEvent, // IE10 is prefixed
	            hasTransition: _prefixStyle('transition') in _elementStyle
	        });

	        // This should find all Android browsers lower than build 535.19 (both stock browser and webview)
	        me.isBadAndroid = /Android /.test(window.navigator.appVersion) && !/Chrome\/\d/.test(window.navigator.appVersion) && false; //this will cause many android device scroll flash; so set it to false!

	        me.extend(me.style = {}, {
	            transform: _transform,
	            transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
	            transitionDuration: _prefixStyle('transitionDuration'),
	            transitionDelay: _prefixStyle('transitionDelay'),
	            transformOrigin: _prefixStyle('transformOrigin')
	        });

	        me.hasClass = function (e, c) {
	            var re = new RegExp('(^|\\s)' + c + '(\\s|$)');
	            return re.test(e.className);
	        };

	        me.addClass = function (e, c) {
	            if (me.hasClass(e, c)) {
	                return;
	            }

	            var newclass = e.className.split(' ');
	            newclass.push(c);
	            e.className = newclass.join(' ');
	        };

	        me.removeClass = function (e, c) {
	            if (!me.hasClass(e, c)) {
	                return;
	            }

	            var re = new RegExp('(^|\\s)' + c + '(\\s|$)', 'g');
	            e.className = e.className.replace(re, ' ');
	        };

	        me.offset = function (el) {
	            var left = -el.offsetLeft,
	                top = -el.offsetTop;

	            // jshint -W084
	            while (el = el.offsetParent) {
	                left -= el.offsetLeft;
	                top -= el.offsetTop;
	            }
	            // jshint +W084

	            return {
	                left: left,
	                top: top
	            };
	        };

	        me.preventDefaultException = function (el, exceptions) {
	            for (var i in exceptions) {
	                if (exceptions[i].test(el[i])) {
	                    return true;
	                }
	            }

	            return false;
	        };

	        me.extend(me.eventType = {}, {
	            touchstart: 1,
	            touchmove: 1,
	            touchend: 1,

	            mousedown: 2,
	            mousemove: 2,
	            mouseup: 2,

	            pointerdown: 3,
	            pointermove: 3,
	            pointerup: 3,

	            MSPointerDown: 3,
	            MSPointerMove: 3,
	            MSPointerUp: 3
	        });

	        me.extend(me.ease = {}, {
	            quadratic: {
	                style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
	                fn: function fn(k) {
	                    return k * (2 - k);
	                }
	            },
	            circular: {
	                style: 'cubic-bezier(0.1, 0.57, 0.1, 1)', // Not properly 'circular' but this looks better, it should be (0.075, 0.82, 0.165, 1)
	                fn: function fn(k) {
	                    return Math.sqrt(1 - --k * k);
	                }
	            },
	            back: {
	                style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
	                fn: function fn(k) {
	                    var b = 4;
	                    return (k = k - 1) * k * ((b + 1) * k + b) + 1;
	                }
	            },
	            bounce: {
	                style: '',
	                fn: function fn(k) {
	                    if ((k /= 1) < 1 / 2.75) {
	                        return 7.5625 * k * k;
	                    } else if (k < 2 / 2.75) {
	                        return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
	                    } else if (k < 2.5 / 2.75) {
	                        return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
	                    } else {
	                        return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
	                    }
	                }
	            },
	            elastic: {
	                style: '',
	                fn: function fn(k) {
	                    var f = 0.22,
	                        e = 0.4;

	                    if (k === 0) {
	                        return 0;
	                    }
	                    if (k === 1) {
	                        return 1;
	                    }

	                    return e * Math.pow(2, -10 * k) * Math.sin((k - f / 4) * (2 * Math.PI) / f) + 1;
	                }
	            }
	        });

	        me.tap = function (e, eventName) {
	            var ev = document.createEvent('Event');
	            ev.initEvent(eventName, true, true);
	            ev.pageX = e.pageX;
	            ev.pageY = e.pageY;
	            e.target.dispatchEvent(ev);
	        };

	        me.click = function (e) {
	            var target = e.target,
	                ev;

	            if (!/(SELECT|INPUT|TEXTAREA)/i.test(target.tagName)) {
	                ev = document.createEvent('MouseEvents');
	                ev.initMouseEvent('click', true, true, e.view, 1, target.screenX, target.screenY, target.clientX, target.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null);

	                ev._constructed = true;
	                target.dispatchEvent(ev);
	            }
	        };

	        return me;
	    }();

	    function IScroll(el, options) {
	        this.wrapper = typeof el === 'string' ? document.querySelector(el) : el;
	        this.scroller = $(this.wrapper).find('.content-inner')[0]; // jshint ignore:line


	        this.scrollerStyle = this.scroller && this.scroller.style; // cache style for better performance

	        this.options = {

	            resizeScrollbars: true,

	            mouseWheelSpeed: 20,

	            snapThreshold: 0.334,

	            // INSERT POINT: OPTIONS

	            startX: 0,
	            startY: 0,
	            scrollY: true,
	            directionLockThreshold: 5,
	            momentum: true,

	            bounce: true,
	            bounceTime: 600,
	            bounceEasing: '',

	            preventDefault: true,
	            preventDefaultException: {
	                tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
	            },

	            HWCompositing: true,
	            useTransition: true,
	            useTransform: true,

	            //other options
	            eventPassthrough: undefined };

	        for (var i in options) {
	            this.options[i] = options[i];
	        }

	        // Normalize options
	        this.translateZ = this.options.HWCompositing && utils.hasPerspective ? ' translateZ(0)' : '';

	        this.options.useTransition = utils.hasTransition && this.options.useTransition;
	        this.options.useTransform = utils.hasTransform && this.options.useTransform;

	        this.options.eventPassthrough = this.options.eventPassthrough === true ? 'vertical' : this.options.eventPassthrough;
	        this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;

	        // If you want eventPassthrough I have to lock one of the axes
	        this.options.scrollY = this.options.eventPassthrough === 'vertical' ? false : this.options.scrollY;
	        this.options.scrollX = this.options.eventPassthrough === 'horizontal' ? false : this.options.scrollX;

	        // With eventPassthrough we also need lockDirection mechanism
	        this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
	        this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;

	        this.options.bounceEasing = typeof this.options.bounceEasing === 'string' ? utils.ease[this.options.bounceEasing] || utils.ease.circular : this.options.bounceEasing;

	        this.options.resizePolling = this.options.resizePolling === undefined ? 60 : this.options.resizePolling;

	        if (this.options.tap === true) {
	            this.options.tap = 'tap';
	        }

	        if (this.options.shrinkScrollbars === 'scale') {
	            this.options.useTransition = false;
	        }

	        this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1;

	        if (this.options.probeType === 3) {
	            this.options.useTransition = false;
	        }

	        // INSERT POINT: NORMALIZATION

	        // Some defaults
	        this.x = 0;
	        this.y = 0;
	        this.directionX = 0;
	        this.directionY = 0;
	        this._events = {};

	        // INSERT POINT: DEFAULTS

	        this._init();
	        this.refresh();

	        this.scrollTo(this.options.startX, this.options.startY);
	        this.enable();
	    }

	    IScroll.prototype = {
	        version: '5.1.3',

	        _init: function _init() {
	            this._initEvents();

	            if (this.options.scrollbars || this.options.indicators) {
	                this._initIndicators();
	            }

	            if (this.options.mouseWheel) {
	                this._initWheel();
	            }

	            if (this.options.snap) {
	                this._initSnap();
	            }

	            if (this.options.keyBindings) {
	                this._initKeys();
	            }

	            // INSERT POINT: _init
	        },

	        destroy: function destroy() {
	            this._initEvents(true);

	            this._execEvent('destroy');
	        },

	        _transitionEnd: function _transitionEnd(e) {
	            if (e.target !== this.scroller || !this.isInTransition) {
	                return;
	            }

	            this._transitionTime();
	            if (!this.resetPosition(this.options.bounceTime)) {
	                this.isInTransition = false;
	                this._execEvent('scrollEnd');
	            }
	        },

	        _start: function _start(e) {
	            // React to left mouse button only
	            if (utils.eventType[e.type] !== 1) {
	                if (e.button !== 0) {
	                    return;
	                }
	            }

	            if (!this.enabled || this.initiated && utils.eventType[e.type] !== this.initiated) {
	                return;
	            }

	            if (this.options.preventDefault && !utils.isBadAndroid && !utils.preventDefaultException(e.target, this.options.preventDefaultException)) {
	                e.preventDefault();
	            }

	            var point = e.touches ? e.touches[0] : e,
	                pos;

	            this.initiated = utils.eventType[e.type];
	            this.moved = false;
	            this.distX = 0;
	            this.distY = 0;
	            this.directionX = 0;
	            this.directionY = 0;
	            this.directionLocked = 0;

	            this._transitionTime();

	            this.startTime = utils.getTime();

	            if (this.options.useTransition && this.isInTransition) {
	                this.isInTransition = false;
	                pos = this.getComputedPosition();
	                this._translate(Math.round(pos.x), Math.round(pos.y));
	                this._execEvent('scrollEnd');
	            } else if (!this.options.useTransition && this.isAnimating) {
	                this.isAnimating = false;
	                this._execEvent('scrollEnd');
	            }

	            this.startX = this.x;
	            this.startY = this.y;
	            this.absStartX = this.x;
	            this.absStartY = this.y;
	            this.pointX = point.pageX;
	            this.pointY = point.pageY;

	            this._execEvent('beforeScrollStart');
	        },

	        _move: function _move(e) {
	            if (!this.enabled || utils.eventType[e.type] !== this.initiated) {
	                return;
	            }

	            if (this.options.preventDefault) {
	                // increases performance on Android? TODO: check!
	                e.preventDefault();
	            }

	            var point = e.touches ? e.touches[0] : e,
	                deltaX = point.pageX - this.pointX,
	                deltaY = point.pageY - this.pointY,
	                timestamp = utils.getTime(),
	                newX,
	                newY,
	                absDistX,
	                absDistY;

	            this.pointX = point.pageX;
	            this.pointY = point.pageY;

	            this.distX += deltaX;
	            this.distY += deltaY;
	            absDistX = Math.abs(this.distX);
	            absDistY = Math.abs(this.distY);

	            // We need to move at least 10 pixels for the scrolling to initiate
	            if (timestamp - this.endTime > 300 && absDistX < 10 && absDistY < 10) {
	                return;
	            }

	            // If you are scrolling in one direction lock the other
	            if (!this.directionLocked && !this.options.freeScroll) {
	                if (absDistX > absDistY + this.options.directionLockThreshold) {
	                    this.directionLocked = 'h'; // lock horizontally
	                } else if (absDistY >= absDistX + this.options.directionLockThreshold) {
	                    this.directionLocked = 'v'; // lock vertically
	                } else {
	                    this.directionLocked = 'n'; // no lock
	                }
	            }

	            if (this.directionLocked === 'h') {
	                if (this.options.eventPassthrough === 'vertical') {
	                    e.preventDefault();
	                } else if (this.options.eventPassthrough === 'horizontal') {
	                    this.initiated = false;
	                    return;
	                }

	                deltaY = 0;
	            } else if (this.directionLocked === 'v') {
	                if (this.options.eventPassthrough === 'horizontal') {
	                    e.preventDefault();
	                } else if (this.options.eventPassthrough === 'vertical') {
	                    this.initiated = false;
	                    return;
	                }

	                deltaX = 0;
	            }

	            deltaX = this.hasHorizontalScroll ? deltaX : 0;
	            deltaY = this.hasVerticalScroll ? deltaY : 0;

	            newX = this.x + deltaX;
	            newY = this.y + deltaY;

	            // Slow down if outside of the boundaries
	            if (newX > 0 || newX < this.maxScrollX) {
	                newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
	            }
	            if (newY > 0 || newY < this.maxScrollY) {
	                newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
	            }

	            this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
	            this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

	            if (!this.moved) {
	                this._execEvent('scrollStart');
	            }

	            this.moved = true;

	            this._translate(newX, newY);

	            /* REPLACE START: _move */
	            if (timestamp - this.startTime > 300) {
	                this.startTime = timestamp;
	                this.startX = this.x;
	                this.startY = this.y;

	                if (this.options.probeType === 1) {
	                    this._execEvent('scroll');
	                }
	            }

	            if (this.options.probeType > 1) {
	                this._execEvent('scroll');
	            }
	            /* REPLACE END: _move */
	        },

	        _end: function _end(e) {
	            if (!this.enabled || utils.eventType[e.type] !== this.initiated) {
	                return;
	            }

	            if (this.options.preventDefault && !utils.preventDefaultException(e.target, this.options.preventDefaultException)) {
	                e.preventDefault();
	            }

	            var /*point = e.changedTouches ? e.changedTouches[0] : e,*/
	            momentumX,
	                momentumY,
	                duration = utils.getTime() - this.startTime,
	                newX = Math.round(this.x),
	                newY = Math.round(this.y),
	                distanceX = Math.abs(newX - this.startX),
	                distanceY = Math.abs(newY - this.startY),
	                time = 0,
	                easing = '';

	            this.isInTransition = 0;
	            this.initiated = 0;
	            this.endTime = utils.getTime();

	            // reset if we are outside of the boundaries
	            if (this.resetPosition(this.options.bounceTime)) {
	                return;
	            }

	            this.scrollTo(newX, newY); // ensures that the last position is rounded

	            // we scrolled less than 10 pixels
	            if (!this.moved) {
	                if (this.options.tap) {
	                    utils.tap(e, this.options.tap);
	                }

	                if (this.options.click) {
	                    utils.click(e);
	                }

	                this._execEvent('scrollCancel');
	                return;
	            }

	            if (this._events.flick && duration < 200 && distanceX < 100 && distanceY < 100) {
	                this._execEvent('flick');
	                return;
	            }

	            // start momentum animation if needed
	            if (this.options.momentum && duration < 300) {
	                momentumX = this.hasHorizontalScroll ? utils.momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration, this) : {
	                    destination: newX,
	                    duration: 0
	                };
	                momentumY = this.hasVerticalScroll ? utils.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration, this) : {
	                    destination: newY,
	                    duration: 0
	                };
	                newX = momentumX.destination;
	                newY = momentumY.destination;
	                time = Math.max(momentumX.duration, momentumY.duration);
	                this.isInTransition = 1;
	            }

	            if (this.options.snap) {
	                var snap = this._nearestSnap(newX, newY);
	                this.currentPage = snap;
	                time = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(newX - snap.x), 1000), Math.min(Math.abs(newY - snap.y), 1000)), 300);
	                newX = snap.x;
	                newY = snap.y;

	                this.directionX = 0;
	                this.directionY = 0;
	                easing = this.options.bounceEasing;
	            }

	            // INSERT POINT: _end

	            if (newX !== this.x || newY !== this.y) {
	                // change easing function when scroller goes out of the boundaries
	                if (newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY) {
	                    easing = utils.ease.quadratic;
	                }

	                this.scrollTo(newX, newY, time, easing);
	                return;
	            }

	            this._execEvent('scrollEnd');
	        },

	        _resize: function _resize() {
	            var that = this;

	            clearTimeout(this.resizeTimeout);

	            this.resizeTimeout = setTimeout(function () {
	                that.refresh();
	            }, this.options.resizePolling);
	        },

	        resetPosition: function resetPosition(time) {
	            var x = this.x,
	                y = this.y;

	            time = time || 0;

	            if (!this.hasHorizontalScroll || this.x > 0) {
	                x = 0;
	            } else if (this.x < this.maxScrollX) {
	                x = this.maxScrollX;
	            }

	            if (!this.hasVerticalScroll || this.y > 0) {
	                y = 0;
	            } else if (this.y < this.maxScrollY) {
	                y = this.maxScrollY;
	            }

	            if (x === this.x && y === this.y) {
	                return false;
	            }

	            if (this.options.ptr && this.y > 44 && this.startY * -1 < $(window).height() && !this.ptrLock) {
	                // jshint ignore:line
	                // not trigger ptr when user want to scroll to top
	                y = this.options.ptrOffset || 44;
	                this._execEvent('ptr');
	                // 防止返回的过程中再次触发了 ptr ，导致被定位到 44px（因为可能done事件触发很快，在返回到44px以前就触发done
	                this.ptrLock = true;
	                var self = this;
	                setTimeout(function () {
	                    self.ptrLock = false;
	                }, 500);
	            }

	            this.scrollTo(x, y, time, this.options.bounceEasing);

	            return true;
	        },

	        disable: function disable() {
	            this.enabled = false;
	        },

	        enable: function enable() {
	            this.enabled = true;
	        },

	        refresh: function refresh() {
	            // var rf = this.wrapper.offsetHeight; // Force reflow

	            this.wrapperWidth = this.wrapper.clientWidth;
	            this.wrapperHeight = this.wrapper.clientHeight;

	            /* REPLACE START: refresh */

	            this.scrollerWidth = this.scroller.offsetWidth;
	            this.scrollerHeight = this.scroller.offsetHeight;

	            this.maxScrollX = this.wrapperWidth - this.scrollerWidth;
	            this.maxScrollY = this.wrapperHeight - this.scrollerHeight;

	            /* REPLACE END: refresh */

	            this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0;
	            this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0;

	            if (!this.hasHorizontalScroll) {
	                this.maxScrollX = 0;
	                this.scrollerWidth = this.wrapperWidth;
	            }

	            if (!this.hasVerticalScroll) {
	                this.maxScrollY = 0;
	                this.scrollerHeight = this.wrapperHeight;
	            }

	            this.endTime = 0;
	            this.directionX = 0;
	            this.directionY = 0;

	            this.wrapperOffset = utils.offset(this.wrapper);

	            this._execEvent('refresh');

	            this.resetPosition();

	            // INSERT POINT: _refresh
	        },

	        on: function on(type, fn) {
	            if (!this._events[type]) {
	                this._events[type] = [];
	            }

	            this._events[type].push(fn);
	        },

	        off: function off(type, fn) {
	            if (!this._events[type]) {
	                return;
	            }

	            var index = this._events[type].indexOf(fn);

	            if (index > -1) {
	                this._events[type].splice(index, 1);
	            }
	        },

	        _execEvent: function _execEvent(type) {
	            if (!this._events[type]) {
	                return;
	            }

	            var i = 0,
	                l = this._events[type].length;

	            if (!l) {
	                return;
	            }

	            for (; i < l; i++) {
	                this._events[type][i].apply(this, [].slice.call(arguments, 1));
	            }
	        },

	        scrollBy: function scrollBy(x, y, time, easing) {
	            x = this.x + x;
	            y = this.y + y;
	            time = time || 0;

	            this.scrollTo(x, y, time, easing);
	        },

	        scrollTo: function scrollTo(x, y, time, easing) {
	            easing = easing || utils.ease.circular;

	            this.isInTransition = this.options.useTransition && time > 0;

	            if (!time || this.options.useTransition && easing.style) {
	                this._transitionTimingFunction(easing.style);
	                this._transitionTime(time);
	                this._translate(x, y);
	            } else {
	                this._animate(x, y, time, easing.fn);
	            }
	        },

	        scrollToElement: function scrollToElement(el, time, offsetX, offsetY, easing) {
	            el = el.nodeType ? el : this.scroller.querySelector(el);

	            if (!el) {
	                return;
	            }

	            var pos = utils.offset(el);

	            pos.left -= this.wrapperOffset.left;
	            pos.top -= this.wrapperOffset.top;

	            // if offsetX/Y are true we center the element to the screen
	            if (offsetX === true) {
	                offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2);
	            }
	            if (offsetY === true) {
	                offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2);
	            }

	            pos.left -= offsetX || 0;
	            pos.top -= offsetY || 0;

	            pos.left = pos.left > 0 ? 0 : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
	            pos.top = pos.top > 0 ? 0 : pos.top < this.maxScrollY ? this.maxScrollY : pos.top;

	            time = time === undefined || time === null || time === 'auto' ? Math.max(Math.abs(this.x - pos.left), Math.abs(this.y - pos.top)) : time;

	            this.scrollTo(pos.left, pos.top, time, easing);
	        },

	        _transitionTime: function _transitionTime(time) {
	            time = time || 0;

	            this.scrollerStyle[utils.style.transitionDuration] = time + 'ms';

	            if (!time && utils.isBadAndroid) {
	                this.scrollerStyle[utils.style.transitionDuration] = '0.001s';
	            }

	            if (this.indicators) {
	                for (var i = this.indicators.length; i--;) {
	                    this.indicators[i].transitionTime(time);
	                }
	            }

	            // INSERT POINT: _transitionTime
	        },

	        _transitionTimingFunction: function _transitionTimingFunction(easing) {
	            this.scrollerStyle[utils.style.transitionTimingFunction] = easing;

	            if (this.indicators) {
	                for (var i = this.indicators.length; i--;) {
	                    this.indicators[i].transitionTimingFunction(easing);
	                }
	            }

	            // INSERT POINT: _transitionTimingFunction
	        },

	        _translate: function _translate(x, y) {
	            if (this.options.useTransform) {

	                /* REPLACE START: _translate */

	                this.scrollerStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.translateZ;

	                /* REPLACE END: _translate */
	            } else {
	                x = Math.round(x);
	                y = Math.round(y);
	                this.scrollerStyle.left = x + 'px';
	                this.scrollerStyle.top = y + 'px';
	            }

	            this.x = x;
	            this.y = y;

	            if (this.indicators) {
	                for (var i = this.indicators.length; i--;) {
	                    this.indicators[i].updatePosition();
	                }
	            }

	            // INSERT POINT: _translate
	        },

	        _initEvents: function _initEvents(remove) {
	            var eventType = remove ? utils.removeEvent : utils.addEvent,
	                target = this.options.bindToWrapper ? this.wrapper : window;

	            eventType(window, 'orientationchange', this);
	            eventType(window, 'resize', this);

	            if (this.options.click) {
	                eventType(this.wrapper, 'click', this, true);
	            }

	            if (!this.options.disableMouse) {
	                eventType(this.wrapper, 'mousedown', this);
	                eventType(target, 'mousemove', this);
	                eventType(target, 'mousecancel', this);
	                eventType(target, 'mouseup', this);
	            }

	            if (utils.hasPointer && !this.options.disablePointer) {
	                eventType(this.wrapper, utils.prefixPointerEvent('pointerdown'), this);
	                eventType(target, utils.prefixPointerEvent('pointermove'), this);
	                eventType(target, utils.prefixPointerEvent('pointercancel'), this);
	                eventType(target, utils.prefixPointerEvent('pointerup'), this);
	            }

	            if (utils.hasTouch && !this.options.disableTouch) {
	                eventType(this.wrapper, 'touchstart', this);
	                eventType(target, 'touchmove', this);
	                eventType(target, 'touchcancel', this);
	                eventType(target, 'touchend', this);
	            }

	            eventType(this.scroller, 'transitionend', this);
	            eventType(this.scroller, 'webkitTransitionEnd', this);
	            eventType(this.scroller, 'oTransitionEnd', this);
	            eventType(this.scroller, 'MSTransitionEnd', this);
	        },

	        getComputedPosition: function getComputedPosition() {
	            var matrix = window.getComputedStyle(this.scroller, null),
	                x,
	                y;

	            if (this.options.useTransform) {
	                matrix = matrix[utils.style.transform].split(')')[0].split(', ');
	                x = +(matrix[12] || matrix[4]);
	                y = +(matrix[13] || matrix[5]);
	            } else {
	                x = +matrix.left.replace(/[^-\d.]/g, '');
	                y = +matrix.top.replace(/[^-\d.]/g, '');
	            }

	            return {
	                x: x,
	                y: y
	            };
	        },

	        _initIndicators: function _initIndicators() {
	            var interactive = this.options.interactiveScrollbars,
	                customStyle = typeof this.options.scrollbars !== 'string',
	                indicators = [],
	                indicator;

	            var that = this;

	            this.indicators = [];

	            if (this.options.scrollbars) {
	                // Vertical scrollbar
	                if (this.options.scrollY) {
	                    indicator = {
	                        el: createDefaultScrollbar('v', interactive, this.options.scrollbars),
	                        interactive: interactive,
	                        defaultScrollbars: true,
	                        customStyle: customStyle,
	                        resize: this.options.resizeScrollbars,
	                        shrink: this.options.shrinkScrollbars,
	                        fade: this.options.fadeScrollbars,
	                        listenX: false
	                    };

	                    this.wrapper.appendChild(indicator.el);
	                    indicators.push(indicator);
	                }

	                // Horizontal scrollbar
	                if (this.options.scrollX) {
	                    indicator = {
	                        el: createDefaultScrollbar('h', interactive, this.options.scrollbars),
	                        interactive: interactive,
	                        defaultScrollbars: true,
	                        customStyle: customStyle,
	                        resize: this.options.resizeScrollbars,
	                        shrink: this.options.shrinkScrollbars,
	                        fade: this.options.fadeScrollbars,
	                        listenY: false
	                    };

	                    this.wrapper.appendChild(indicator.el);
	                    indicators.push(indicator);
	                }
	            }

	            if (this.options.indicators) {
	                // TODO: check concat compatibility
	                indicators = indicators.concat(this.options.indicators);
	            }

	            for (var i = indicators.length; i--;) {
	                this.indicators.push(new Indicator(this, indicators[i]));
	            }

	            // TODO: check if we can use array.map (wide compatibility and performance issues)
	            function _indicatorsMap(fn) {
	                for (var i = that.indicators.length; i--;) {
	                    fn.call(that.indicators[i]);
	                }
	            }

	            if (this.options.fadeScrollbars) {
	                this.on('scrollEnd', function () {
	                    _indicatorsMap(function () {
	                        this.fade();
	                    });
	                });

	                this.on('scrollCancel', function () {
	                    _indicatorsMap(function () {
	                        this.fade();
	                    });
	                });

	                this.on('scrollStart', function () {
	                    _indicatorsMap(function () {
	                        this.fade(1);
	                    });
	                });

	                this.on('beforeScrollStart', function () {
	                    _indicatorsMap(function () {
	                        this.fade(1, true);
	                    });
	                });
	            }

	            this.on('refresh', function () {
	                _indicatorsMap(function () {
	                    this.refresh();
	                });
	            });

	            this.on('destroy', function () {
	                _indicatorsMap(function () {
	                    this.destroy();
	                });

	                delete this.indicators;
	            });
	        },

	        _initWheel: function _initWheel() {
	            utils.addEvent(this.wrapper, 'wheel', this);
	            utils.addEvent(this.wrapper, 'mousewheel', this);
	            utils.addEvent(this.wrapper, 'DOMMouseScroll', this);

	            this.on('destroy', function () {
	                utils.removeEvent(this.wrapper, 'wheel', this);
	                utils.removeEvent(this.wrapper, 'mousewheel', this);
	                utils.removeEvent(this.wrapper, 'DOMMouseScroll', this);
	            });
	        },

	        _wheel: function _wheel(e) {
	            if (!this.enabled) {
	                return;
	            }

	            e.preventDefault();
	            e.stopPropagation();

	            var wheelDeltaX,
	                wheelDeltaY,
	                newX,
	                newY,
	                that = this;

	            if (this.wheelTimeout === undefined) {
	                that._execEvent('scrollStart');
	            }

	            // Execute the scrollEnd event after 400ms the wheel stopped scrolling
	            clearTimeout(this.wheelTimeout);
	            this.wheelTimeout = setTimeout(function () {
	                that._execEvent('scrollEnd');
	                that.wheelTimeout = undefined;
	            }, 400);

	            if ('deltaX' in e) {
	                if (e.deltaMode === 1) {
	                    wheelDeltaX = -e.deltaX * this.options.mouseWheelSpeed;
	                    wheelDeltaY = -e.deltaY * this.options.mouseWheelSpeed;
	                } else {
	                    wheelDeltaX = -e.deltaX;
	                    wheelDeltaY = -e.deltaY;
	                }
	            } else if ('wheelDeltaX' in e) {
	                wheelDeltaX = e.wheelDeltaX / 120 * this.options.mouseWheelSpeed;
	                wheelDeltaY = e.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
	            } else if ('wheelDelta' in e) {
	                wheelDeltaX = wheelDeltaY = e.wheelDelta / 120 * this.options.mouseWheelSpeed;
	            } else if ('detail' in e) {
	                wheelDeltaX = wheelDeltaY = -e.detail / 3 * this.options.mouseWheelSpeed;
	            } else {
	                return;
	            }

	            wheelDeltaX *= this.options.invertWheelDirection;
	            wheelDeltaY *= this.options.invertWheelDirection;

	            if (!this.hasVerticalScroll) {
	                wheelDeltaX = wheelDeltaY;
	                wheelDeltaY = 0;
	            }

	            if (this.options.snap) {
	                newX = this.currentPage.pageX;
	                newY = this.currentPage.pageY;

	                if (wheelDeltaX > 0) {
	                    newX--;
	                } else if (wheelDeltaX < 0) {
	                    newX++;
	                }

	                if (wheelDeltaY > 0) {
	                    newY--;
	                } else if (wheelDeltaY < 0) {
	                    newY++;
	                }

	                this.goToPage(newX, newY);

	                return;
	            }

	            newX = this.x + Math.round(this.hasHorizontalScroll ? wheelDeltaX : 0);
	            newY = this.y + Math.round(this.hasVerticalScroll ? wheelDeltaY : 0);

	            if (newX > 0) {
	                newX = 0;
	            } else if (newX < this.maxScrollX) {
	                newX = this.maxScrollX;
	            }

	            if (newY > 0) {
	                newY = 0;
	            } else if (newY < this.maxScrollY) {
	                newY = this.maxScrollY;
	            }

	            this.scrollTo(newX, newY, 0);

	            this._execEvent('scroll');

	            // INSERT POINT: _wheel
	        },

	        _initSnap: function _initSnap() {
	            this.currentPage = {};

	            if (typeof this.options.snap === 'string') {
	                this.options.snap = this.scroller.querySelectorAll(this.options.snap);
	            }

	            this.on('refresh', function () {
	                var i = 0,
	                    l,
	                    m = 0,
	                    n,
	                    cx,
	                    cy,
	                    x = 0,
	                    y,
	                    stepX = this.options.snapStepX || this.wrapperWidth,
	                    stepY = this.options.snapStepY || this.wrapperHeight,
	                    el;

	                this.pages = [];

	                if (!this.wrapperWidth || !this.wrapperHeight || !this.scrollerWidth || !this.scrollerHeight) {
	                    return;
	                }

	                if (this.options.snap === true) {
	                    cx = Math.round(stepX / 2);
	                    cy = Math.round(stepY / 2);

	                    while (x > -this.scrollerWidth) {
	                        this.pages[i] = [];
	                        l = 0;
	                        y = 0;

	                        while (y > -this.scrollerHeight) {
	                            this.pages[i][l] = {
	                                x: Math.max(x, this.maxScrollX),
	                                y: Math.max(y, this.maxScrollY),
	                                width: stepX,
	                                height: stepY,
	                                cx: x - cx,
	                                cy: y - cy
	                            };

	                            y -= stepY;
	                            l++;
	                        }

	                        x -= stepX;
	                        i++;
	                    }
	                } else {
	                    el = this.options.snap;
	                    l = el.length;
	                    n = -1;

	                    for (; i < l; i++) {
	                        if (i === 0 || el[i].offsetLeft <= el[i - 1].offsetLeft) {
	                            m = 0;
	                            n++;
	                        }

	                        if (!this.pages[m]) {
	                            this.pages[m] = [];
	                        }

	                        x = Math.max(-el[i].offsetLeft, this.maxScrollX);
	                        y = Math.max(-el[i].offsetTop, this.maxScrollY);
	                        cx = x - Math.round(el[i].offsetWidth / 2);
	                        cy = y - Math.round(el[i].offsetHeight / 2);

	                        this.pages[m][n] = {
	                            x: x,
	                            y: y,
	                            width: el[i].offsetWidth,
	                            height: el[i].offsetHeight,
	                            cx: cx,
	                            cy: cy
	                        };

	                        if (x > this.maxScrollX) {
	                            m++;
	                        }
	                    }
	                }

	                this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0);

	                // Update snap threshold if needed
	                if (this.options.snapThreshold % 1 === 0) {
	                    this.snapThresholdX = this.options.snapThreshold;
	                    this.snapThresholdY = this.options.snapThreshold;
	                } else {
	                    this.snapThresholdX = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold);
	                    this.snapThresholdY = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold);
	                }
	            });

	            this.on('flick', function () {
	                var time = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(this.x - this.startX), 1000), Math.min(Math.abs(this.y - this.startY), 1000)), 300);

	                this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, time);
	            });
	        },

	        _nearestSnap: function _nearestSnap(x, y) {
	            if (!this.pages.length) {
	                return {
	                    x: 0,
	                    y: 0,
	                    pageX: 0,
	                    pageY: 0
	                };
	            }

	            var i = 0,
	                l = this.pages.length,
	                m = 0;

	            // Check if we exceeded the snap threshold
	            if (Math.abs(x - this.absStartX) < this.snapThresholdX && Math.abs(y - this.absStartY) < this.snapThresholdY) {
	                return this.currentPage;
	            }

	            if (x > 0) {
	                x = 0;
	            } else if (x < this.maxScrollX) {
	                x = this.maxScrollX;
	            }

	            if (y > 0) {
	                y = 0;
	            } else if (y < this.maxScrollY) {
	                y = this.maxScrollY;
	            }

	            for (; i < l; i++) {
	                if (x >= this.pages[i][0].cx) {
	                    x = this.pages[i][0].x;
	                    break;
	                }
	            }

	            l = this.pages[i].length;

	            for (; m < l; m++) {
	                if (y >= this.pages[0][m].cy) {
	                    y = this.pages[0][m].y;
	                    break;
	                }
	            }

	            if (i === this.currentPage.pageX) {
	                i += this.directionX;

	                if (i < 0) {
	                    i = 0;
	                } else if (i >= this.pages.length) {
	                    i = this.pages.length - 1;
	                }

	                x = this.pages[i][0].x;
	            }

	            if (m === this.currentPage.pageY) {
	                m += this.directionY;

	                if (m < 0) {
	                    m = 0;
	                } else if (m >= this.pages[0].length) {
	                    m = this.pages[0].length - 1;
	                }

	                y = this.pages[0][m].y;
	            }

	            return {
	                x: x,
	                y: y,
	                pageX: i,
	                pageY: m
	            };
	        },

	        goToPage: function goToPage(x, y, time, easing) {
	            easing = easing || this.options.bounceEasing;

	            if (x >= this.pages.length) {
	                x = this.pages.length - 1;
	            } else if (x < 0) {
	                x = 0;
	            }

	            if (y >= this.pages[x].length) {
	                y = this.pages[x].length - 1;
	            } else if (y < 0) {
	                y = 0;
	            }

	            var posX = this.pages[x][y].x,
	                posY = this.pages[x][y].y;

	            time = time === undefined ? this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(posX - this.x), 1000), Math.min(Math.abs(posY - this.y), 1000)), 300) : time;

	            this.currentPage = {
	                x: posX,
	                y: posY,
	                pageX: x,
	                pageY: y
	            };

	            this.scrollTo(posX, posY, time, easing);
	        },

	        next: function next(time, easing) {
	            var x = this.currentPage.pageX,
	                y = this.currentPage.pageY;

	            x++;

	            if (x >= this.pages.length && this.hasVerticalScroll) {
	                x = 0;
	                y++;
	            }

	            this.goToPage(x, y, time, easing);
	        },

	        prev: function prev(time, easing) {
	            var x = this.currentPage.pageX,
	                y = this.currentPage.pageY;

	            x--;

	            if (x < 0 && this.hasVerticalScroll) {
	                x = 0;
	                y--;
	            }

	            this.goToPage(x, y, time, easing);
	        },

	        _initKeys: function _initKeys() {
	            // default key bindings
	            var keys = {
	                pageUp: 33,
	                pageDown: 34,
	                end: 35,
	                home: 36,
	                left: 37,
	                up: 38,
	                right: 39,
	                down: 40
	            };
	            var i;

	            // if you give me characters I give you keycode
	            if (_typeof(this.options.keyBindings) === 'object') {
	                for (i in this.options.keyBindings) {
	                    if (typeof this.options.keyBindings[i] === 'string') {
	                        this.options.keyBindings[i] = this.options.keyBindings[i].toUpperCase().charCodeAt(0);
	                    }
	                }
	            } else {
	                this.options.keyBindings = {};
	            }

	            for (i in keys) {
	                // jshint ignore:line
	                this.options.keyBindings[i] = this.options.keyBindings[i] || keys[i];
	            }

	            utils.addEvent(window, 'keydown', this);

	            this.on('destroy', function () {
	                utils.removeEvent(window, 'keydown', this);
	            });
	        },

	        _key: function _key(e) {
	            if (!this.enabled) {
	                return;
	            }

	            var snap = this.options.snap,
	                // we are using this alot, better to cache it
	            newX = snap ? this.currentPage.pageX : this.x,
	                newY = snap ? this.currentPage.pageY : this.y,
	                now = utils.getTime(),
	                prevTime = this.keyTime || 0,
	                acceleration = 0.250,
	                pos;

	            if (this.options.useTransition && this.isInTransition) {
	                pos = this.getComputedPosition();

	                this._translate(Math.round(pos.x), Math.round(pos.y));
	                this.isInTransition = false;
	            }

	            this.keyAcceleration = now - prevTime < 200 ? Math.min(this.keyAcceleration + acceleration, 50) : 0;

	            switch (e.keyCode) {
	                case this.options.keyBindings.pageUp:
	                    if (this.hasHorizontalScroll && !this.hasVerticalScroll) {
	                        newX += snap ? 1 : this.wrapperWidth;
	                    } else {
	                        newY += snap ? 1 : this.wrapperHeight;
	                    }
	                    break;
	                case this.options.keyBindings.pageDown:
	                    if (this.hasHorizontalScroll && !this.hasVerticalScroll) {
	                        newX -= snap ? 1 : this.wrapperWidth;
	                    } else {
	                        newY -= snap ? 1 : this.wrapperHeight;
	                    }
	                    break;
	                case this.options.keyBindings.end:
	                    newX = snap ? this.pages.length - 1 : this.maxScrollX;
	                    newY = snap ? this.pages[0].length - 1 : this.maxScrollY;
	                    break;
	                case this.options.keyBindings.home:
	                    newX = 0;
	                    newY = 0;
	                    break;
	                case this.options.keyBindings.left:
	                    newX += snap ? -1 : 5 + this.keyAcceleration >> 0; // jshint ignore:line
	                    break;
	                case this.options.keyBindings.up:
	                    newY += snap ? 1 : 5 + this.keyAcceleration >> 0; // jshint ignore:line
	                    break;
	                case this.options.keyBindings.right:
	                    newX -= snap ? -1 : 5 + this.keyAcceleration >> 0; // jshint ignore:line
	                    break;
	                case this.options.keyBindings.down:
	                    newY -= snap ? 1 : 5 + this.keyAcceleration >> 0; // jshint ignore:line
	                    break;
	                default:
	                    return;
	            }

	            if (snap) {
	                this.goToPage(newX, newY);
	                return;
	            }

	            if (newX > 0) {
	                newX = 0;
	                this.keyAcceleration = 0;
	            } else if (newX < this.maxScrollX) {
	                newX = this.maxScrollX;
	                this.keyAcceleration = 0;
	            }

	            if (newY > 0) {
	                newY = 0;
	                this.keyAcceleration = 0;
	            } else if (newY < this.maxScrollY) {
	                newY = this.maxScrollY;
	                this.keyAcceleration = 0;
	            }

	            this.scrollTo(newX, newY, 0);

	            this.keyTime = now;
	        },

	        _animate: function _animate(destX, destY, duration, easingFn) {
	            var that = this,
	                startX = this.x,
	                startY = this.y,
	                startTime = utils.getTime(),
	                destTime = startTime + duration;

	            function step() {
	                var now = utils.getTime(),
	                    newX,
	                    newY,
	                    easing;

	                if (now >= destTime) {
	                    that.isAnimating = false;
	                    that._translate(destX, destY);

	                    if (!that.resetPosition(that.options.bounceTime)) {
	                        that._execEvent('scrollEnd');
	                    }

	                    return;
	                }

	                now = (now - startTime) / duration;
	                easing = easingFn(now);
	                newX = (destX - startX) * easing + startX;
	                newY = (destY - startY) * easing + startY;
	                that._translate(newX, newY);

	                if (that.isAnimating) {
	                    rAF(step);
	                }

	                if (that.options.probeType === 3) {
	                    that._execEvent('scroll');
	                }
	            }

	            this.isAnimating = true;
	            step();
	        },

	        handleEvent: function handleEvent(e) {
	            switch (e.type) {
	                case 'touchstart':
	                case 'pointerdown':
	                case 'MSPointerDown':
	                case 'mousedown':
	                    this._start(e);
	                    break;
	                case 'touchmove':
	                case 'pointermove':
	                case 'MSPointerMove':
	                case 'mousemove':
	                    this._move(e);
	                    break;
	                case 'touchend':
	                case 'pointerup':
	                case 'MSPointerUp':
	                case 'mouseup':
	                case 'touchcancel':
	                case 'pointercancel':
	                case 'MSPointerCancel':
	                case 'mousecancel':
	                    this._end(e);
	                    break;
	                case 'orientationchange':
	                case 'resize':
	                    this._resize();
	                    break;
	                case 'transitionend':
	                case 'webkitTransitionEnd':
	                case 'oTransitionEnd':
	                case 'MSTransitionEnd':
	                    this._transitionEnd(e);
	                    break;
	                case 'wheel':
	                case 'DOMMouseScroll':
	                case 'mousewheel':
	                    this._wheel(e);
	                    break;
	                case 'keydown':
	                    this._key(e);
	                    break;
	                case 'click':
	                    if (!e._constructed) {
	                        e.preventDefault();
	                        e.stopPropagation();
	                    }
	                    break;
	            }
	        }
	    };

	    function createDefaultScrollbar(direction, interactive, type) {
	        var scrollbar = document.createElement('div'),
	            indicator = document.createElement('div');

	        if (type === true) {
	            scrollbar.style.cssText = 'position:absolute;z-index:9999';
	            indicator.style.cssText = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px';
	        }

	        indicator.className = 'iScrollIndicator';

	        if (direction === 'h') {
	            if (type === true) {
	                scrollbar.style.cssText += ';height:5px;left:2px;right:2px;bottom:0';
	                indicator.style.height = '100%';
	            }
	            scrollbar.className = 'iScrollHorizontalScrollbar';
	        } else {
	            if (type === true) {
	                scrollbar.style.cssText += ';width:5px;bottom:2px;top:2px;right:1px';
	                indicator.style.width = '100%';
	            }
	            scrollbar.className = 'iScrollVerticalScrollbar';
	        }

	        scrollbar.style.cssText += ';overflow:hidden';

	        if (!interactive) {
	            scrollbar.style.pointerEvents = 'none';
	        }

	        scrollbar.appendChild(indicator);

	        return scrollbar;
	    }

	    function Indicator(scroller, options) {
	        this.wrapper = typeof options.el === 'string' ? document.querySelector(options.el) : options.el;
	        this.wrapperStyle = this.wrapper.style;
	        this.indicator = this.wrapper.children[0];
	        this.indicatorStyle = this.indicator.style;
	        this.scroller = scroller;

	        this.options = {
	            listenX: true,
	            listenY: true,
	            interactive: false,
	            resize: true,
	            defaultScrollbars: false,
	            shrink: false,
	            fade: false,
	            speedRatioX: 0,
	            speedRatioY: 0
	        };

	        for (var i in options) {
	            // jshint ignore:line
	            this.options[i] = options[i];
	        }

	        this.sizeRatioX = 1;
	        this.sizeRatioY = 1;
	        this.maxPosX = 0;
	        this.maxPosY = 0;

	        if (this.options.interactive) {
	            if (!this.options.disableTouch) {
	                utils.addEvent(this.indicator, 'touchstart', this);
	                utils.addEvent(window, 'touchend', this);
	            }
	            if (!this.options.disablePointer) {
	                utils.addEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);
	                utils.addEvent(window, utils.prefixPointerEvent('pointerup'), this);
	            }
	            if (!this.options.disableMouse) {
	                utils.addEvent(this.indicator, 'mousedown', this);
	                utils.addEvent(window, 'mouseup', this);
	            }
	        }

	        if (this.options.fade) {
	            this.wrapperStyle[utils.style.transform] = this.scroller.translateZ;
	            this.wrapperStyle[utils.style.transitionDuration] = utils.isBadAndroid ? '0.001s' : '0ms';
	            this.wrapperStyle.opacity = '0';
	        }
	    }

	    Indicator.prototype = {
	        handleEvent: function handleEvent(e) {
	            switch (e.type) {
	                case 'touchstart':
	                case 'pointerdown':
	                case 'MSPointerDown':
	                case 'mousedown':
	                    this._start(e);
	                    break;
	                case 'touchmove':
	                case 'pointermove':
	                case 'MSPointerMove':
	                case 'mousemove':
	                    this._move(e);
	                    break;
	                case 'touchend':
	                case 'pointerup':
	                case 'MSPointerUp':
	                case 'mouseup':
	                case 'touchcancel':
	                case 'pointercancel':
	                case 'MSPointerCancel':
	                case 'mousecancel':
	                    this._end(e);
	                    break;
	            }
	        },

	        destroy: function destroy() {
	            if (this.options.interactive) {
	                utils.removeEvent(this.indicator, 'touchstart', this);
	                utils.removeEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);
	                utils.removeEvent(this.indicator, 'mousedown', this);

	                utils.removeEvent(window, 'touchmove', this);
	                utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);
	                utils.removeEvent(window, 'mousemove', this);

	                utils.removeEvent(window, 'touchend', this);
	                utils.removeEvent(window, utils.prefixPointerEvent('pointerup'), this);
	                utils.removeEvent(window, 'mouseup', this);
	            }

	            if (this.options.defaultScrollbars) {
	                this.wrapper.parentNode.removeChild(this.wrapper);
	            }
	        },

	        _start: function _start(e) {
	            var point = e.touches ? e.touches[0] : e;

	            e.preventDefault();
	            e.stopPropagation();

	            this.transitionTime();

	            this.initiated = true;
	            this.moved = false;
	            this.lastPointX = point.pageX;
	            this.lastPointY = point.pageY;

	            this.startTime = utils.getTime();

	            if (!this.options.disableTouch) {
	                utils.addEvent(window, 'touchmove', this);
	            }
	            if (!this.options.disablePointer) {
	                utils.addEvent(window, utils.prefixPointerEvent('pointermove'), this);
	            }
	            if (!this.options.disableMouse) {
	                utils.addEvent(window, 'mousemove', this);
	            }

	            this.scroller._execEvent('beforeScrollStart');
	        },

	        _move: function _move(e) {
	            var point = e.touches ? e.touches[0] : e,
	                deltaX,
	                deltaY,
	                newX,
	                newY,
	                timestamp = utils.getTime();

	            if (!this.moved) {
	                this.scroller._execEvent('scrollStart');
	            }

	            this.moved = true;

	            deltaX = point.pageX - this.lastPointX;
	            this.lastPointX = point.pageX;

	            deltaY = point.pageY - this.lastPointY;
	            this.lastPointY = point.pageY;

	            newX = this.x + deltaX;
	            newY = this.y + deltaY;

	            this._pos(newX, newY);

	            if (this.scroller.options.probeType === 1 && timestamp - this.startTime > 300) {
	                this.startTime = timestamp;
	                this.scroller._execEvent('scroll');
	            } else if (this.scroller.options.probeType > 1) {
	                this.scroller._execEvent('scroll');
	            }

	            // INSERT POINT: indicator._move

	            e.preventDefault();
	            e.stopPropagation();
	        },

	        _end: function _end(e) {
	            if (!this.initiated) {
	                return;
	            }

	            this.initiated = false;

	            e.preventDefault();
	            e.stopPropagation();

	            utils.removeEvent(window, 'touchmove', this);
	            utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);
	            utils.removeEvent(window, 'mousemove', this);

	            if (this.scroller.options.snap) {
	                var snap = this.scroller._nearestSnap(this.scroller.x, this.scroller.y);

	                var time = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(this.scroller.x - snap.x), 1000), Math.min(Math.abs(this.scroller.y - snap.y), 1000)), 300);

	                if (this.scroller.x !== snap.x || this.scroller.y !== snap.y) {
	                    this.scroller.directionX = 0;
	                    this.scroller.directionY = 0;
	                    this.scroller.currentPage = snap;
	                    this.scroller.scrollTo(snap.x, snap.y, time, this.scroller.options.bounceEasing);
	                }
	            }

	            if (this.moved) {
	                this.scroller._execEvent('scrollEnd');
	            }
	        },

	        transitionTime: function transitionTime(time) {
	            time = time || 0;
	            this.indicatorStyle[utils.style.transitionDuration] = time + 'ms';

	            if (!time && utils.isBadAndroid) {
	                this.indicatorStyle[utils.style.transitionDuration] = '0.001s';
	            }
	        },

	        transitionTimingFunction: function transitionTimingFunction(easing) {
	            this.indicatorStyle[utils.style.transitionTimingFunction] = easing;
	        },

	        refresh: function refresh() {
	            this.transitionTime();

	            if (this.options.listenX && !this.options.listenY) {
	                this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? 'block' : 'none';
	            } else if (this.options.listenY && !this.options.listenX) {
	                this.indicatorStyle.display = this.scroller.hasVerticalScroll ? 'block' : 'none';
	            } else {
	                this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? 'block' : 'none';
	            }

	            if (this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll) {
	                utils.addClass(this.wrapper, 'iScrollBothScrollbars');
	                utils.removeClass(this.wrapper, 'iScrollLoneScrollbar');

	                if (this.options.defaultScrollbars && this.options.customStyle) {
	                    if (this.options.listenX) {
	                        this.wrapper.style.right = '8px';
	                    } else {
	                        this.wrapper.style.bottom = '8px';
	                    }
	                }
	            } else {
	                utils.removeClass(this.wrapper, 'iScrollBothScrollbars');
	                utils.addClass(this.wrapper, 'iScrollLoneScrollbar');

	                if (this.options.defaultScrollbars && this.options.customStyle) {
	                    if (this.options.listenX) {
	                        this.wrapper.style.right = '2px';
	                    } else {
	                        this.wrapper.style.bottom = '2px';
	                    }
	                }
	            }

	            // var r = this.wrapper.offsetHeight; // force refresh

	            if (this.options.listenX) {
	                this.wrapperWidth = this.wrapper.clientWidth;
	                if (this.options.resize) {
	                    this.indicatorWidth = Math.max(Math.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8);
	                    this.indicatorStyle.width = this.indicatorWidth + 'px';
	                } else {
	                    this.indicatorWidth = this.indicator.clientWidth;
	                }

	                this.maxPosX = this.wrapperWidth - this.indicatorWidth;

	                if (this.options.shrink === 'clip') {
	                    this.minBoundaryX = -this.indicatorWidth + 8;
	                    this.maxBoundaryX = this.wrapperWidth - 8;
	                } else {
	                    this.minBoundaryX = 0;
	                    this.maxBoundaryX = this.maxPosX;
	                }

	                this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX;
	            }

	            if (this.options.listenY) {
	                this.wrapperHeight = this.wrapper.clientHeight;
	                if (this.options.resize) {
	                    this.indicatorHeight = Math.max(Math.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8);
	                    this.indicatorStyle.height = this.indicatorHeight + 'px';
	                } else {
	                    this.indicatorHeight = this.indicator.clientHeight;
	                }

	                this.maxPosY = this.wrapperHeight - this.indicatorHeight;

	                if (this.options.shrink === 'clip') {
	                    this.minBoundaryY = -this.indicatorHeight + 8;
	                    this.maxBoundaryY = this.wrapperHeight - 8;
	                } else {
	                    this.minBoundaryY = 0;
	                    this.maxBoundaryY = this.maxPosY;
	                }

	                this.maxPosY = this.wrapperHeight - this.indicatorHeight;
	                this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY;
	            }

	            this.updatePosition();
	        },

	        updatePosition: function updatePosition() {
	            var x = this.options.listenX && Math.round(this.sizeRatioX * this.scroller.x) || 0,
	                y = this.options.listenY && Math.round(this.sizeRatioY * this.scroller.y) || 0;

	            if (!this.options.ignoreBoundaries) {
	                if (x < this.minBoundaryX) {
	                    if (this.options.shrink === 'scale') {
	                        this.width = Math.max(this.indicatorWidth + x, 8);
	                        this.indicatorStyle.width = this.width + 'px';
	                    }
	                    x = this.minBoundaryX;
	                } else if (x > this.maxBoundaryX) {
	                    if (this.options.shrink === 'scale') {
	                        this.width = Math.max(this.indicatorWidth - (x - this.maxPosX), 8);
	                        this.indicatorStyle.width = this.width + 'px';
	                        x = this.maxPosX + this.indicatorWidth - this.width;
	                    } else {
	                        x = this.maxBoundaryX;
	                    }
	                } else if (this.options.shrink === 'scale' && this.width !== this.indicatorWidth) {
	                    this.width = this.indicatorWidth;
	                    this.indicatorStyle.width = this.width + 'px';
	                }

	                if (y < this.minBoundaryY) {
	                    if (this.options.shrink === 'scale') {
	                        this.height = Math.max(this.indicatorHeight + y * 3, 8);
	                        this.indicatorStyle.height = this.height + 'px';
	                    }
	                    y = this.minBoundaryY;
	                } else if (y > this.maxBoundaryY) {
	                    if (this.options.shrink === 'scale') {
	                        this.height = Math.max(this.indicatorHeight - (y - this.maxPosY) * 3, 8);
	                        this.indicatorStyle.height = this.height + 'px';
	                        y = this.maxPosY + this.indicatorHeight - this.height;
	                    } else {
	                        y = this.maxBoundaryY;
	                    }
	                } else if (this.options.shrink === 'scale' && this.height !== this.indicatorHeight) {
	                    this.height = this.indicatorHeight;
	                    this.indicatorStyle.height = this.height + 'px';
	                }
	            }

	            this.x = x;
	            this.y = y;

	            if (this.scroller.options.useTransform) {
	                this.indicatorStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.scroller.translateZ;
	            } else {
	                this.indicatorStyle.left = x + 'px';
	                this.indicatorStyle.top = y + 'px';
	            }
	        },

	        _pos: function _pos(x, y) {
	            if (x < 0) {
	                x = 0;
	            } else if (x > this.maxPosX) {
	                x = this.maxPosX;
	            }

	            if (y < 0) {
	                y = 0;
	            } else if (y > this.maxPosY) {
	                y = this.maxPosY;
	            }

	            x = this.options.listenX ? Math.round(x / this.sizeRatioX) : this.scroller.x;
	            y = this.options.listenY ? Math.round(y / this.sizeRatioY) : this.scroller.y;

	            this.scroller.scrollTo(x, y);
	        },

	        fade: function fade(val, hold) {
	            if (hold && !this.visible) {
	                return;
	            }

	            clearTimeout(this.fadeTimeout);
	            this.fadeTimeout = null;

	            var time = val ? 250 : 500,
	                delay = val ? 0 : 300;

	            val = val ? '1' : '0';

	            this.wrapperStyle[utils.style.transitionDuration] = time + 'ms';

	            this.fadeTimeout = setTimeout(function (val) {
	                this.wrapperStyle.opacity = val;
	                this.visible = +val;
	            }.bind(this, val), delay);
	        }
	    };

	    IScroll.utils = utils;

	    window.IScroll = IScroll;
	}(window);

	/* ===============================================================================
	************   scroller   ************
	=============================================================================== */
	+function ($) {
	    "use strict";
	    //重置zepto自带的滚动条

	    var _zeptoMethodCache = {
	        "scrollTop": $.fn.scrollTop,
	        "scrollLeft": $.fn.scrollLeft
	    };
	    //重置scrollLeft和scrollRight
	    (function () {
	        $.extend($.fn, {
	            scrollTop: function scrollTop(top, dur) {
	                if (!this.length) return;
	                var scroller = this.data('scroller');
	                if (scroller && scroller.scroller) {
	                    //js滚动
	                    return scroller.scrollTop(top, dur);
	                } else {
	                    return _zeptoMethodCache.scrollTop.apply(this, arguments);
	                }
	            }
	        });
	        $.extend($.fn, {
	            scrollLeft: function scrollLeft(left, dur) {
	                if (!this.length) return;
	                var scroller = this.data('scroller');
	                if (scroller && scroller.scroller) {
	                    //js滚动
	                    return scroller.scrollLeft(left, dur);
	                } else {
	                    return _zeptoMethodCache.scrollLeft.apply(this, arguments);
	                }
	            }
	        });
	    })();

	    //自定义的滚动条
	    var Scroller = function Scroller(pageContent, _options) {
	        var $pageContent = this.$pageContent = $(pageContent);

	        this.options = $.extend({}, this._defaults, _options);

	        var type = this.options.type;
	        //auto的type,系统版本的小于4.4.0的安卓设备和系统版本小于6.0.0的ios设备，启用js版的iscoll
	        var useJSScroller = type === 'js' || type === 'auto' && $.device.android && $.compareVersion('4.4.0', $.device.osVersion) > -1 || type === 'auto' && $.device.ios && $.compareVersion('6.0.0', $.device.osVersion) > -1;

	        if (useJSScroller) {

	            var $pageContentInner = $pageContent.find('.content-inner');
	            //如果滚动内容没有被包裹，自动添加wrap
	            if (!$pageContentInner[0]) {
	                // $pageContent.html('<div class="content-inner">' + $pageContent.html() + '</div>');
	                var children = $pageContent.children();
	                if (children.length < 1) {
	                    $pageContent.children().wrapAll('<div class="content-inner"></div>');
	                } else {
	                    $pageContent.html('<div class="content-inner">' + $pageContent.html() + '</div>');
	                }
	            }

	            if ($pageContent.hasClass('pull-to-refresh-content')) {
	                //因为iscroll 当页面高度不足 100% 时无法滑动，所以无法触发下拉动作，这里改动一下高度
	                //区分是否有.bar容器，如有，则content的top:0，无则content的top:-2.2rem,这里取2.2rem的最大值，近60
	                var minHeight = $(window).height() + ($pageContent.prev().hasClass(".bar") ? 1 : 61);
	                $pageContent.find('.content-inner').css('min-height', minHeight + 'px');
	            }

	            var ptr = $(pageContent).hasClass('pull-to-refresh-content');
	            //js滚动模式，用transform移动内容区位置，会导致fixed失效，表现类似absolute。因此禁用transform模式
	            var useTransform = $pageContent.find('.fixed-tab').length === 0;
	            var options = {
	                probeType: 1,
	                mouseWheel: true,
	                //解决安卓js模式下，刷新滚动条后绑定的事件不响应，对chrome内核浏览器设置click:true
	                click: $.device.androidChrome,
	                useTransform: useTransform,
	                //js模式下允许滚动条横向滚动，但是需要注意，滚动容易宽度必须大于屏幕宽度滚动才生效
	                scrollX: true
	            };
	            if (ptr) {
	                options.ptr = true;
	                options.ptrOffset = 44;
	            }
	            //如果用js滚动条，用transform计算内容区位置，position：fixed将实效。若有.fixed-tab，强制使用native滚动条；备选方案，略粗暴
	            // if($(pageContent).find('.fixed-tab').length>0){
	            //     $pageContent.addClass('native-scroll');
	            //     return;
	            // }
	            this.scroller = new IScroll(pageContent, options); // jshint ignore:line
	            //和native滚动统一起来
	            this._bindEventToDomWhenJs();
	            $.initPullToRefresh = $._pullToRefreshJSScroll.initPullToRefresh;
	            $.pullToRefreshDone = $._pullToRefreshJSScroll.pullToRefreshDone;
	            $.pullToRefreshTrigger = $._pullToRefreshJSScroll.pullToRefreshTrigger;
	            $.destroyToRefresh = $._pullToRefreshJSScroll.destroyToRefresh;
	            $pageContent.addClass('javascript-scroll');
	            if (!useTransform) {
	                $pageContent.find('.content-inner').css({
	                    width: '100%',
	                    position: 'absolute'
	                });
	            }

	            //如果页面本身已经进行了原生滚动，那么把这个滚动换成JS的滚动
	            var nativeScrollTop = this.$pageContent[0].scrollTop;
	            if (nativeScrollTop) {
	                this.$pageContent[0].scrollTop = 0;
	                this.scrollTop(nativeScrollTop);
	            }
	        } else {
	            $pageContent.addClass('native-scroll');
	        }
	    };
	    Scroller.prototype = {
	        _defaults: {
	            type: 'native'
	        },
	        _bindEventToDomWhenJs: function _bindEventToDomWhenJs() {
	            //"scrollStart", //the scroll started.
	            //"scroll", //the content is scrolling. Available only in scroll-probe.js edition. See onScroll event.
	            //"scrollEnd", //content stopped scrolling.
	            if (this.scroller) {
	                var self = this;
	                this.scroller.on('scrollStart', function () {
	                    self.$pageContent.trigger('scrollstart');
	                });
	                this.scroller.on('scroll', function () {
	                    self.$pageContent.trigger('scroll');
	                });
	                this.scroller.on('scrollEnd', function () {
	                    self.$pageContent.trigger('scrollend');
	                });
	            } else {
	                //TODO: 实现native的scrollStart和scrollEnd
	            }
	        },
	        scrollTop: function scrollTop(top, dur) {
	            if (this.scroller) {
	                if (top !== undefined) {
	                    this.scroller.scrollTo(0, -1 * top, dur);
	                } else {
	                    return this.scroller.getComputedPosition().y * -1;
	                }
	            } else {
	                return this.$pageContent.scrollTop(top, dur);
	            }
	            return this;
	        },
	        scrollLeft: function scrollLeft(left, dur) {
	            if (this.scroller) {
	                if (left !== undefined) {
	                    this.scroller.scrollTo(-1 * left, 0);
	                } else {
	                    return this.scroller.getComputedPosition().x * -1;
	                }
	            } else {
	                return this.$pageContent.scrollTop(left, dur);
	            }
	            return this;
	        },
	        on: function on(event, callback) {
	            if (this.scroller) {
	                this.scroller.on(event, function () {
	                    callback.call(this.wrapper);
	                });
	            } else {
	                this.$pageContent.on(event, callback);
	            }
	            return this;
	        },
	        off: function off(event, callback) {
	            if (this.scroller) {
	                this.scroller.off(event, callback);
	            } else {
	                this.$pageContent.off(event, callback);
	            }
	            return this;
	        },
	        refresh: function refresh() {
	            if (this.scroller) this.scroller.refresh();
	            return this;
	        },
	        scrollHeight: function scrollHeight() {
	            if (this.scroller) {
	                return this.scroller.scrollerHeight;
	            } else {
	                return this.$pageContent[0].scrollHeight;
	            }
	        }

	    };

	    //Scroller PLUGIN DEFINITION
	    // =======================

	    function Plugin(option) {
	        var args = Array.apply(null, arguments);
	        args.shift();
	        var internal_return;

	        this.each(function () {

	            var $this = $(this);

	            var options = $.extend({}, $this.dataset(), (typeof option === "undefined" ? "undefined" : _typeof(option)) === 'object' && option);

	            var data = $this.data('scroller');
	            //如果 scroller 没有被初始化，对scroller 进行初始化r
	            if (!data) {
	                //获取data-api的
	                $this.data('scroller', data = new Scroller(this, options));
	            }
	            if (typeof option === 'string' && typeof data[option] === 'function') {
	                internal_return = data[option].apply(data, args);
	                if (internal_return !== undefined) return false;
	            }
	        });

	        if (internal_return !== undefined) return internal_return;else return this;
	    }

	    var old = $.fn.scroller;

	    $.fn.scroller = Plugin;
	    $.fn.scroller.Constructor = Scroller;

	    // Scroll NO CONFLICT
	    // =================

	    $.fn.scroller.noConflict = function () {
	        $.fn.scroller = old;
	        return this;
	    };
	    //添加data-api
	    $(function () {
	        $('[data-toggle="scroller"]').scroller();
	    });

	    //统一的接口,带有 .javascript-scroll 的content 进行刷新
	    $.refreshScroller = function (content) {
	        if (content) {
	            $(content).scroller('refresh');
	        } else {
	            $('.javascript-scroll').each(function () {
	                $(this).scroller('refresh');
	            });
	        }
	    };
	    //全局初始化方法，会对页面上的 [data-toggle="scroller"]，.content. 进行滚动条初始化
	    $.initScroller = function (option) {
	        this.options = $.extend({}, (typeof option === "undefined" ? "undefined" : _typeof(option)) === 'object' && option);
	        $('[data-toggle="scroller"],.content').scroller(option);
	    };
	    //获取scroller对象
	    $.getScroller = function (content) {
	        //以前默认只能有一个无限滚动，因此infinitescroll都是加在content上，现在允许里面有多个，因此要判断父元素是否有content
	        content = content.hasClass('content') ? content : content.parents('.content');
	        if (content) {
	            return $(content).data('scroller');
	        } else {
	            return $('.content.javascript-scroll').data('scroller');
	        }
	    };
	    //检测滚动类型,
	    //‘js’: javascript 滚动条
	    //‘native’: 原生滚动条
	    $.detectScrollerType = function (content) {
	        if (content) {
	            if ($(content).data('scroller') && $(content).data('scroller').scroller) {
	                return 'js';
	            } else {
	                return 'native';
	            }
	        }
	    };
	}(Zepto);

	/* ===============================================================================
	************   Tabs   ************
	=============================================================================== */
	+function ($) {
	    "use strict";

	    var showTab = function showTab(tab, tabLink, force) {
	        var newTab = $(tab);
	        if (arguments.length === 2) {
	            if (typeof tabLink === 'boolean') {
	                force = tabLink;
	            }
	        }
	        if (newTab.length === 0) return false;
	        if (newTab.hasClass('active')) {
	            if (force) newTab.trigger('show');
	            return false;
	        }
	        var tabs = newTab.parent('.tabs');
	        if (tabs.length === 0) return false;

	        // Animated tabs
	        /*var isAnimatedTabs = tabs.parent().hasClass('tabs-animated-wrap');
	          if (isAnimatedTabs) {
	          tabs.transform('translate3d(' + -newTab.index() * 100 + '%,0,0)');
	          }*/

	        // Remove active class from old tabs
	        var oldTab = tabs.children('.tab.active').removeClass('active');
	        // Add active class to new tab
	        newTab.addClass('active');
	        // Trigger 'show' event on new tab
	        newTab.trigger('show');

	        // Update navbars in new tab
	        /*if (!isAnimatedTabs && newTab.find('.navbar').length > 0) {
	        // Find tab's view
	        var viewContainer;
	        if (newTab.hasClass(app.params.viewClass)) viewContainer = newTab[0];
	        else viewContainer = newTab.parents('.' + app.params.viewClass)[0];
	        app.sizeNavbars(viewContainer);
	        }*/

	        // Find related link for new tab
	        if (tabLink) tabLink = $(tabLink);else {
	            // Search by id
	            if (typeof tab === 'string') tabLink = $('.tab-link[href="' + tab + '"]');else tabLink = $('.tab-link[href="#' + newTab.attr('id') + '"]');
	            // Search by data-tab
	            if (!tabLink || tabLink && tabLink.length === 0) {
	                $('[data-tab]').each(function () {
	                    if (newTab.is($(this).attr('data-tab'))) tabLink = $(this);
	                });
	            }
	        }
	        if (tabLink.length === 0) return;

	        // Find related link for old tab
	        var oldTabLink;
	        if (oldTab && oldTab.length > 0) {
	            // Search by id
	            var oldTabId = oldTab.attr('id');
	            if (oldTabId) oldTabLink = $('.tab-link[href="#' + oldTabId + '"]');
	            // Search by data-tab
	            if (!oldTabLink || oldTabLink && oldTabLink.length === 0) {
	                $('[data-tab]').each(function () {
	                    if (oldTab.is($(this).attr('data-tab'))) oldTabLink = $(this);
	                });
	            }
	        }

	        // Update links' classes
	        if (tabLink && tabLink.length > 0) tabLink.addClass('active');
	        if (oldTabLink && oldTabLink.length > 0) oldTabLink.removeClass('active');
	        tabLink.trigger('active');

	        //app.refreshScroller();

	        return true;
	    };

	    var old = $.showTab;
	    $.showTab = showTab;

	    $.showTab.noConflict = function () {
	        $.showTab = old;
	        return this;
	    };
	    //a标签上的click事件，在iscroll下响应有问题
	    $(document).on("click", ".tab-link", function (e) {
	        e.preventDefault();
	        var clicked = $(this);
	        showTab(clicked.data("tab") || clicked.attr('href'), clicked);
	    });
	}(Zepto);

	/* ===============================================================================
	************   Tabs   ************
	=============================================================================== */
	+function ($) {
	    "use strict";

	    $.initFixedTab = function () {
	        var $fixedTab = $('.fixed-tab');
	        if ($fixedTab.length === 0) return;
	        $('.fixed-tab').fixedTab(); //默认{offset: 0}
	    };
	    var FixedTab = function FixedTab(pageContent, _options) {
	        var $pageContent = this.$pageContent = $(pageContent);
	        var shadow = $pageContent.clone();
	        var fixedTop = $pageContent[0].getBoundingClientRect().top;

	        shadow.css('visibility', 'hidden');
	        this.options = $.extend({}, this._defaults, {
	            fixedTop: fixedTop,
	            shadow: shadow,
	            offset: 0
	        }, _options);

	        this._bindEvents();
	    };

	    FixedTab.prototype = {
	        _defaults: {
	            offset: 0
	        },
	        _bindEvents: function _bindEvents() {
	            this.$pageContent.parents('.content').on('scroll', this._scrollHandler.bind(this));
	            this.$pageContent.on('active', '.tab-link', this._tabLinkHandler.bind(this));
	        },
	        _tabLinkHandler: function _tabLinkHandler(ev) {
	            var isFixed = $(ev.target).parents('.buttons-fixed').length > 0;
	            var fixedTop = this.options.fixedTop;
	            var offset = this.options.offset;
	            $.refreshScroller();
	            if (!isFixed) return;
	            this.$pageContent.parents('.content').scrollTop(fixedTop - offset);
	        },
	        // 滚动核心代码
	        _scrollHandler: function _scrollHandler(ev) {
	            var $scroller = $(ev.target);
	            var $pageContent = this.$pageContent;
	            var shadow = this.options.shadow;
	            var offset = this.options.offset;
	            var fixedTop = this.options.fixedTop;
	            var scrollTop = $scroller.scrollTop();
	            var isFixed = scrollTop >= fixedTop - offset;
	            if (isFixed) {
	                shadow.insertAfter($pageContent);
	                $pageContent.addClass('buttons-fixed').css('top', offset);
	            } else {
	                shadow.remove();
	                $pageContent.removeClass('buttons-fixed').css('top', 0);
	            }
	        }
	    };

	    //FixedTab PLUGIN DEFINITION
	    // =======================

	    function Plugin(option) {
	        var args = Array.apply(null, arguments);
	        args.shift();
	        this.each(function () {
	            var $this = $(this);
	            var options = $.extend({}, $this.dataset(), (typeof option === "undefined" ? "undefined" : _typeof(option)) === 'object' && option);
	            var data = $this.data('fixedtab');
	            if (!data) {
	                //获取data-api的
	                $this.data('fixedtab', data = new FixedTab(this, options));
	            }
	        });
	    }
	    $.fn.fixedTab = Plugin;
	    $.fn.fixedTab.Constructor = FixedTab;
	    $(document).on('pageInit', function () {
	        $.initFixedTab();
	    });
	}(Zepto);

	+function ($) {
	    "use strict";
	    //这里实在js滚动时使用的下拉刷新代码。

	    var refreshTime = 0;
	    var initPullToRefreshJS = function initPullToRefreshJS(pageContainer) {
	        var eventsTarget = $(pageContainer);
	        if (!eventsTarget.hasClass('pull-to-refresh-content')) {
	            eventsTarget = eventsTarget.find('.pull-to-refresh-content');
	        }
	        if (!eventsTarget || eventsTarget.length === 0) return;

	        var page = eventsTarget.hasClass('content') ? eventsTarget : eventsTarget.parents('.content');
	        var scroller = $.getScroller(page[0]);
	        if (!scroller) return;

	        var container = eventsTarget;

	        function handleScroll() {
	            if (container.hasClass('refreshing')) return;
	            if (scroller.scrollTop() * -1 >= 44) {
	                container.removeClass('pull-down').addClass('pull-up');
	            } else {
	                container.removeClass('pull-up').addClass('pull-down');
	            }
	        }

	        function handleRefresh() {
	            if (container.hasClass('refreshing')) return;
	            container.removeClass('pull-down pull-up');
	            container.addClass('refreshing transitioning');
	            container.trigger('refresh');
	            refreshTime = +new Date();
	        }
	        scroller.on('scroll', handleScroll);
	        scroller.scroller.on('ptr', handleRefresh);

	        // Detach Events on page remove
	        function destroyPullToRefresh() {
	            scroller.off('scroll', handleScroll);
	            scroller.scroller.off('ptr', handleRefresh);
	        }
	        eventsTarget[0].destroyPullToRefresh = destroyPullToRefresh;
	    };

	    var pullToRefreshDoneJS = function pullToRefreshDoneJS(container) {
	        container = $(container);
	        if (container.length === 0) container = $('.pull-to-refresh-content.refreshing');
	        if (container.length === 0) return;
	        var interval = +new Date() - refreshTime;
	        var timeOut = interval > 1000 ? 0 : 1000 - interval; //long than bounce time
	        var scroller = $.getScroller(container);
	        setTimeout(function () {
	            scroller.refresh();
	            container.removeClass('refreshing');
	            container.transitionEnd(function () {
	                container.removeClass("transitioning");
	            });
	        }, timeOut);
	    };
	    var pullToRefreshTriggerJS = function pullToRefreshTriggerJS(container) {
	        container = $(container);
	        if (container.length === 0) container = $('.pull-to-refresh-content');
	        if (container.hasClass('refreshing')) return;
	        container.addClass('refreshing');
	        var scroller = $.getScroller(container);
	        scroller.scrollTop(44 + 1, 200);
	        container.trigger('refresh');
	    };

	    var destroyPullToRefreshJS = function destroyPullToRefreshJS(pageContainer) {
	        pageContainer = $(pageContainer);
	        var pullToRefreshContent = pageContainer.hasClass('pull-to-refresh-content') ? pageContainer : pageContainer.find('.pull-to-refresh-content');
	        if (pullToRefreshContent.length === 0) return;
	        if (pullToRefreshContent[0].destroyPullToRefresh) pullToRefreshContent[0].destroyPullToRefresh();
	    };

	    $._pullToRefreshJSScroll = {
	        "initPullToRefresh": initPullToRefreshJS,
	        "pullToRefreshDone": pullToRefreshDoneJS,
	        "pullToRefreshTrigger": pullToRefreshTriggerJS,
	        "destroyPullToRefresh": destroyPullToRefreshJS
	    };
	}(Zepto); // jshint ignore:line

	+function ($) {
	    'use strict';

	    $.initPullToRefresh = function (pageContainer) {
	        var eventsTarget = $(pageContainer);
	        if (!eventsTarget.hasClass('pull-to-refresh-content')) {
	            eventsTarget = eventsTarget.find('.pull-to-refresh-content');
	        }
	        if (!eventsTarget || eventsTarget.length === 0) return;

	        var isTouched,
	            isMoved,
	            touchesStart = {},
	            isScrolling,
	            touchesDiff,
	            touchStartTime,
	            container,
	            refresh = false,
	            useTranslate = false,
	            startTranslate = 0,
	            translate,
	            scrollTop,
	            wasScrolled,
	            triggerDistance,
	            dynamicTriggerDistance;

	        container = eventsTarget;

	        // Define trigger distance
	        if (container.attr('data-ptr-distance')) {
	            dynamicTriggerDistance = true;
	        } else {
	            triggerDistance = 44;
	        }

	        function handleTouchStart(e) {
	            if (isTouched) {
	                if ($.device.android) {
	                    if ('targetTouches' in e && e.targetTouches.length > 1) return;
	                } else return;
	            }
	            isMoved = false;
	            isTouched = true;
	            isScrolling = undefined;
	            wasScrolled = undefined;
	            touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
	            touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
	            touchStartTime = new Date().getTime();
	            /*jshint validthis:true */
	            container = $(this);
	        }

	        function handleTouchMove(e) {
	            if (!isTouched) return;
	            var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
	            var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
	            if (typeof isScrolling === 'undefined') {
	                isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
	            }
	            if (!isScrolling) {
	                isTouched = false;
	                return;
	            }

	            scrollTop = container[0].scrollTop;
	            if (typeof wasScrolled === 'undefined' && scrollTop !== 0) wasScrolled = true;

	            if (!isMoved) {
	                /*jshint validthis:true */
	                container.removeClass('transitioning');
	                if (scrollTop > container[0].offsetHeight) {
	                    isTouched = false;
	                    return;
	                }
	                if (dynamicTriggerDistance) {
	                    triggerDistance = container.attr('data-ptr-distance');
	                    if (triggerDistance.indexOf('%') >= 0) triggerDistance = container[0].offsetHeight * parseInt(triggerDistance, 10) / 100;
	                }
	                startTranslate = container.hasClass('refreshing') ? triggerDistance : 0;
	                if (container[0].scrollHeight === container[0].offsetHeight || !$.device.ios) {
	                    useTranslate = true;
	                } else {
	                    useTranslate = false;
	                }
	                useTranslate = true;
	            }
	            isMoved = true;
	            touchesDiff = pageY - touchesStart.y;

	            if (touchesDiff > 0 && scrollTop <= 0 || scrollTop < 0) {
	                // iOS 8 fix
	                if ($.device.ios && parseInt($.device.osVersion.split('.')[0], 10) > 7 && scrollTop === 0 && !wasScrolled) useTranslate = true;

	                if (useTranslate) {
	                    e.preventDefault();
	                    translate = Math.pow(touchesDiff, 0.85) + startTranslate;
	                    container.transform('translate3d(0,' + translate + 'px,0)');
	                } else {}
	                if (useTranslate && Math.pow(touchesDiff, 0.85) > triggerDistance || !useTranslate && touchesDiff >= triggerDistance * 2) {
	                    refresh = true;
	                    container.addClass('pull-up').removeClass('pull-down');
	                } else {
	                    refresh = false;
	                    container.removeClass('pull-up').addClass('pull-down');
	                }
	            } else {

	                container.removeClass('pull-up pull-down');
	                refresh = false;
	                return;
	            }
	        }

	        function handleTouchEnd() {
	            if (!isTouched || !isMoved) {
	                isTouched = false;
	                isMoved = false;
	                return;
	            }
	            if (translate) {
	                container.addClass('transitioning');
	                translate = 0;
	            }
	            container.transform('');
	            if (refresh) {
	                //防止二次触发
	                if (container.hasClass('refreshing')) return;
	                container.addClass('refreshing');
	                container.trigger('refresh');
	            } else {
	                container.removeClass('pull-down');
	            }
	            isTouched = false;
	            isMoved = false;
	        }

	        // Attach Events
	        eventsTarget.on($.touchEvents.start, handleTouchStart);
	        eventsTarget.on($.touchEvents.move, handleTouchMove);
	        eventsTarget.on($.touchEvents.end, handleTouchEnd);

	        function destroyPullToRefresh() {
	            eventsTarget.off($.touchEvents.start, handleTouchStart);
	            eventsTarget.off($.touchEvents.move, handleTouchMove);
	            eventsTarget.off($.touchEvents.end, handleTouchEnd);
	        }
	        eventsTarget[0].destroyPullToRefresh = destroyPullToRefresh;
	    };
	    $.pullToRefreshDone = function (container) {
	        $(window).scrollTop(0); //解决微信下拉刷新顶部消失的问题
	        container = $(container);
	        if (container.length === 0) container = $('.pull-to-refresh-content.refreshing');
	        container.removeClass('refreshing').addClass('transitioning');
	        container.transitionEnd(function () {
	            container.removeClass('transitioning pull-up pull-down');
	        });
	    };
	    $.pullToRefreshTrigger = function (container) {
	        container = $(container);
	        if (container.length === 0) container = $('.pull-to-refresh-content');
	        if (container.hasClass('refreshing')) return;
	        container.addClass('transitioning refreshing');
	        container.trigger('refresh');
	    };

	    $.destroyPullToRefresh = function (pageContainer) {
	        pageContainer = $(pageContainer);
	        var pullToRefreshContent = pageContainer.hasClass('pull-to-refresh-content') ? pageContainer : pageContainer.find('.pull-to-refresh-content');
	        if (pullToRefreshContent.length === 0) return;
	        if (pullToRefreshContent[0].destroyPullToRefresh) pullToRefreshContent[0].destroyPullToRefresh();
	    };

	    //这里是否需要写到 scroller 中去？
	    /*    $.initPullToRefresh = function(pageContainer) {
	            var $pageContainer = $(pageContainer);
	            $pageContainer.each(function(index, item) {
	                if ($.detectScrollerType(item) === 'js') {
	                    $._pullToRefreshJSScroll.initPullToRefresh(item);
	                } else {
	                    initPullToRefresh(item);
	                }
	            });
	        };
	    
	    
	        $.pullToRefreshDone = function(pageContainer) {
	            var $pageContainer = $(pageContainer);
	            $pageContainer.each(function(index, item) {
	                if ($.detectScrollerType(item) === 'js') {
	                    $._pullToRefreshJSScroll.pullToRefreshDone(item);
	                } else {
	                    pullToRefreshDone(item);
	                }
	            });
	        };
	    
	    
	        $.pullToRefreshTrigger = function(pageContainer) {
	           var $pageContainer = $(pageContainer);
	            $pageContainer.each(function(index, item) {
	                if ($.detectScrollerType(item) === 'js') {
	                    $._pullToRefreshJSScroll.pullToRefreshTrigger(item);
	                } else {
	                    pullToRefreshTrigger(item);
	                }
	            });
	        };
	    
	        $.destroyPullToRefresh = function(pageContainer) {
	            var $pageContainer = $(pageContainer);
	            $pageContainer.each(function(index, item) {
	                if ($.detectScrollerType(item) === 'js') {
	                    $._pullToRefreshJSScroll.destroyPullToRefresh(item);
	                } else {
	                    destroyPullToRefresh(item);
	                }
	            });
	        };
	    */
	}(Zepto); //jshint ignore:line

	+function ($) {
	    'use strict';

	    function handleInfiniteScroll() {
	        /*jshint validthis:true */
	        var inf = $(this);
	        var scroller = $.getScroller(inf);
	        var scrollTop = scroller.scrollTop();
	        var scrollHeight = scroller.scrollHeight();
	        var height = inf[0].offsetHeight;
	        var distance = inf[0].getAttribute('data-distance');
	        var virtualListContainer = inf.find('.virtual-list');
	        var virtualList;
	        var onTop = inf.hasClass('infinite-scroll-top');
	        if (!distance) distance = 50;
	        if (typeof distance === 'string' && distance.indexOf('%') >= 0) {
	            distance = parseInt(distance, 10) / 100 * height;
	        }
	        if (distance > height) distance = height;
	        if (onTop) {
	            if (scrollTop < distance) {
	                inf.trigger('infinite');
	            }
	        } else {
	            if (scrollTop + height >= scrollHeight - distance) {
	                if (virtualListContainer.length > 0) {
	                    virtualList = virtualListContainer[0].f7VirtualList;
	                    if (virtualList && !virtualList.reachEnd) return;
	                }
	                inf.trigger('infinite');
	            }
	        }
	    }
	    $.attachInfiniteScroll = function (infiniteContent) {
	        $.getScroller(infiniteContent).on('scroll', handleInfiniteScroll);
	    };
	    $.detachInfiniteScroll = function (infiniteContent) {
	        $.getScroller(infiniteContent).off('scroll', handleInfiniteScroll);
	    };

	    $.initInfiniteScroll = function (pageContainer) {
	        pageContainer = $(pageContainer);
	        var infiniteContent = pageContainer.hasClass('infinite-scroll') ? pageContainer : pageContainer.find('.infinite-scroll');
	        if (infiniteContent.length === 0) return;
	        $.attachInfiniteScroll(infiniteContent);
	        //如果是顶部无限刷新，要将滚动条初始化于最下端
	        pageContainer.forEach(function (v) {
	            if ($(v).hasClass('infinite-scroll-top')) {
	                var height = v.scrollHeight - v.clientHeight;
	                $(v).scrollTop(height);
	            }
	        });
	        function detachEvents() {
	            $.detachInfiniteScroll(infiniteContent);
	            pageContainer.off('pageBeforeRemove', detachEvents);
	        }
	        pageContainer.on('pageBeforeRemove', detachEvents);
	    };
	}(Zepto);

	+function ($) {
	    "use strict";

	    $(function () {
	        $(document).on("focus", ".searchbar input", function (e) {
	            var $input = $(e.target);
	            $input.parents(".searchbar").addClass("searchbar-active");
	        });
	        $(document).on("click", ".searchbar-cancel", function (e) {
	            var $btn = $(e.target);
	            $btn.parents(".searchbar").removeClass("searchbar-active");
	        });
	        $(document).on("blur", ".searchbar input", function (e) {
	            var $input = $(e.target);
	            $input.parents(".searchbar").removeClass("searchbar-active");
	        });
	    });
	}(Zepto);

	/*======================================================
	************   Panels   ************
	======================================================*/
	/*jshint unused: false*/
	+function ($) {
	    "use strict";

	    $.allowPanelOpen = true;
	    $.openPanel = function (panel) {
	        if (!$.allowPanelOpen) return false;
	        if (panel === 'left' || panel === 'right') panel = ".panel-" + panel; //可以传入一个方向
	        panel = panel ? $(panel) : $(".panel").eq(0);
	        var direction = panel.hasClass("panel-right") ? "right" : "left";
	        if (panel.length === 0 || panel.hasClass('active')) return false;
	        $.closePanel(); // Close if some panel is opened
	        $.allowPanelOpen = false;
	        var effect = panel.hasClass('panel-reveal') ? 'reveal' : 'cover';
	        panel.css({ display: 'block' }).addClass('active');
	        panel.trigger('open');

	        // Trigger reLayout
	        var clientLeft = panel[0].clientLeft;

	        // Transition End;
	        var transitionEndTarget = effect === 'reveal' ? $($.getCurrentPage()) : panel;
	        var openedTriggered = false;

	        function panelTransitionEnd() {
	            transitionEndTarget.transitionEnd(function (e) {
	                if (e.target === transitionEndTarget[0]) {
	                    if (panel.hasClass('active')) {
	                        panel.trigger('opened');
	                    } else {
	                        panel.trigger('closed');
	                    }
	                    $.allowPanelOpen = true;
	                } else panelTransitionEnd();
	            });
	        }
	        panelTransitionEnd();

	        $(document.body).addClass('with-panel-' + direction + '-' + effect);
	        return true;
	    };
	    $.closePanel = function () {
	        var activePanel = $('.panel.active');
	        if (activePanel.length === 0) return false;
	        var effect = activePanel.hasClass('panel-reveal') ? 'reveal' : 'cover';
	        var panelPosition = activePanel.hasClass('panel-left') ? 'left' : 'right';
	        activePanel.removeClass('active');
	        var transitionEndTarget = effect === 'reveal' ? $('.page') : activePanel;
	        activePanel.trigger('close');
	        $.allowPanelOpen = false;

	        transitionEndTarget.transitionEnd(function () {
	            if (activePanel.hasClass('active')) return;
	            activePanel.css({ display: '' });
	            activePanel.trigger('closed');
	            $('body').removeClass('panel-closing');
	            $.allowPanelOpen = true;
	        });

	        $('body').addClass('panel-closing').removeClass('with-panel-' + panelPosition + '-' + effect);
	    };

	    $(document).on("click", ".open-panel", function (e) {
	        var panel = $(e.target).data('panel');
	        $.openPanel(panel);
	    });
	    $(document).on("click", ".close-panel, .panel-overlay", function (e) {
	        $.closePanel();
	    });
	    /*======================================================
	     ************   Swipe panels   ************
	     ======================================================*/
	    $.initSwipePanels = function () {
	        var panel, side;
	        var swipePanel = $.smConfig.swipePanel;
	        var swipePanelOnlyClose = $.smConfig.swipePanelOnlyClose;
	        var swipePanelCloseOpposite = true;
	        var swipePanelActiveArea = false;
	        var swipePanelThreshold = 2;
	        var swipePanelNoFollow = false;

	        if (!(swipePanel || swipePanelOnlyClose)) return;

	        var panelOverlay = $('.panel-overlay');
	        var isTouched,
	            isMoved,
	            isScrolling,
	            touchesStart = {},
	            touchStartTime,
	            touchesDiff,
	            translate,
	            opened,
	            panelWidth,
	            effect,
	            direction;
	        var views = $('.page');

	        function handleTouchStart(e) {
	            if (!$.allowPanelOpen || !swipePanel && !swipePanelOnlyClose || isTouched) return;
	            if ($('.modal-in, .photo-browser-in').length > 0) return;
	            if (!(swipePanelCloseOpposite || swipePanelOnlyClose)) {
	                if ($('.panel.active').length > 0 && !panel.hasClass('active')) return;
	            }
	            touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
	            touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
	            if (swipePanelCloseOpposite || swipePanelOnlyClose) {
	                if ($('.panel.active').length > 0) {
	                    side = $('.panel.active').hasClass('panel-left') ? 'left' : 'right';
	                } else {
	                    if (swipePanelOnlyClose) return;
	                    side = swipePanel;
	                }
	                if (!side) return;
	            }
	            panel = $('.panel.panel-' + side);
	            if (!panel[0]) return;
	            opened = panel.hasClass('active');
	            if (swipePanelActiveArea && !opened) {
	                if (side === 'left') {
	                    if (touchesStart.x > swipePanelActiveArea) return;
	                }
	                if (side === 'right') {
	                    if (touchesStart.x < window.innerWidth - swipePanelActiveArea) return;
	                }
	            }
	            isMoved = false;
	            isTouched = true;
	            isScrolling = undefined;

	            touchStartTime = new Date().getTime();
	            direction = undefined;
	        }
	        function handleTouchMove(e) {
	            if (!isTouched) return;
	            if (!panel[0]) return;
	            if (e.f7PreventPanelSwipe) return;
	            var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
	            var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
	            if (typeof isScrolling === 'undefined') {
	                isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
	            }
	            if (isScrolling) {
	                isTouched = false;
	                return;
	            }
	            if (!direction) {
	                if (pageX > touchesStart.x) {
	                    direction = 'to-right';
	                } else {
	                    direction = 'to-left';
	                }

	                if (side === 'left' && direction === 'to-left' && !panel.hasClass('active') || side === 'right' && direction === 'to-right' && !panel.hasClass('active')) {
	                    isTouched = false;
	                    return;
	                }
	            }

	            if (swipePanelNoFollow) {
	                var timeDiff = new Date().getTime() - touchStartTime;
	                if (timeDiff < 300) {
	                    if (direction === 'to-left') {
	                        if (side === 'right') $.openPanel(side);
	                        if (side === 'left' && panel.hasClass('active')) $.closePanel();
	                    }
	                    if (direction === 'to-right') {
	                        if (side === 'left') $.openPanel(side);
	                        if (side === 'right' && panel.hasClass('active')) $.closePanel();
	                    }
	                }
	                isTouched = false;
	                console.log(3);
	                isMoved = false;
	                return;
	            }

	            if (!isMoved) {
	                effect = panel.hasClass('panel-cover') ? 'cover' : 'reveal';
	                if (!opened) {
	                    panel.show();
	                    panelOverlay.show();
	                }
	                panelWidth = panel[0].offsetWidth;
	                panel.transition(0);
	                /*
	                   if (panel.find('.' + app.params.viewClass).length > 0) {
	                   if (app.sizeNavbars) app.sizeNavbars(panel.find('.' + app.params.viewClass)[0]);
	                   }
	                   */
	            }

	            isMoved = true;

	            e.preventDefault();
	            var threshold = opened ? 0 : -swipePanelThreshold;
	            if (side === 'right') threshold = -threshold;

	            touchesDiff = pageX - touchesStart.x + threshold;

	            if (side === 'right') {
	                translate = touchesDiff - (opened ? panelWidth : 0);
	                if (translate > 0) translate = 0;
	                if (translate < -panelWidth) {
	                    translate = -panelWidth;
	                }
	            } else {
	                translate = touchesDiff + (opened ? panelWidth : 0);
	                if (translate < 0) translate = 0;
	                if (translate > panelWidth) {
	                    translate = panelWidth;
	                }
	            }
	            if (effect === 'reveal') {
	                views.transform('translate3d(' + translate + 'px,0,0)').transition(0);
	                panelOverlay.transform('translate3d(' + translate + 'px,0,0)');
	                //app.pluginHook('swipePanelSetTransform', views[0], panel[0], Math.abs(translate / panelWidth));
	            } else {
	                panel.transform('translate3d(' + translate + 'px,0,0)').transition(0);
	                //app.pluginHook('swipePanelSetTransform', views[0], panel[0], Math.abs(translate / panelWidth));
	            }
	        }
	        function handleTouchEnd(e) {
	            if (!isTouched || !isMoved) {
	                isTouched = false;
	                isMoved = false;
	                return;
	            }
	            isTouched = false;
	            isMoved = false;
	            var timeDiff = new Date().getTime() - touchStartTime;
	            var action;
	            var edge = translate === 0 || Math.abs(translate) === panelWidth;

	            if (!opened) {
	                if (translate === 0) {
	                    action = 'reset';
	                } else if (timeDiff < 300 && Math.abs(translate) > 0 || timeDiff >= 300 && Math.abs(translate) >= panelWidth / 2) {
	                    action = 'swap';
	                } else {
	                    action = 'reset';
	                }
	            } else {
	                if (translate === -panelWidth) {
	                    action = 'reset';
	                } else if (timeDiff < 300 && Math.abs(translate) >= 0 || timeDiff >= 300 && Math.abs(translate) <= panelWidth / 2) {
	                    if (side === 'left' && translate === panelWidth) action = 'reset';else action = 'swap';
	                } else {
	                    action = 'reset';
	                }
	            }
	            if (action === 'swap') {
	                $.allowPanelOpen = true;
	                if (opened) {
	                    $.closePanel();
	                    if (edge) {
	                        panel.css({ display: '' });
	                        $('body').removeClass('panel-closing');
	                    }
	                } else {
	                    $.openPanel(side);
	                }
	                if (edge) $.allowPanelOpen = true;
	            }
	            if (action === 'reset') {
	                if (opened) {
	                    $.allowPanelOpen = true;
	                    $.openPanel(side);
	                } else {
	                    $.closePanel();
	                    if (edge) {
	                        $.allowPanelOpen = true;
	                        panel.css({ display: '' });
	                    } else {
	                        var target = effect === 'reveal' ? views : panel;
	                        $('body').addClass('panel-closing');
	                        target.transitionEnd(function () {
	                            $.allowPanelOpen = true;
	                            panel.css({ display: '' });
	                            $('body').removeClass('panel-closing');
	                        });
	                    }
	                }
	            }
	            if (effect === 'reveal') {
	                views.transition('');
	                views.transform('');
	            }
	            panel.transition('').transform('');
	            panelOverlay.css({ display: '' }).transform('');
	        }
	        $(document).on($.touchEvents.start, handleTouchStart);
	        $(document).on($.touchEvents.move, handleTouchMove);
	        $(document).on($.touchEvents.end, handleTouchEnd);
	    };

	    $.initSwipePanels();
	}(Zepto);

	/**
	 * 路由
	 *
	 * 路由功能将接管页面的链接点击行为，最后达到动画切换的效果，具体如下：
	 *  1. 链接对应的是另一个页面，那么则尝试 ajax 加载，然后把新页面里的符合约定的结构提取出来，然后做动画切换；如果没法 ajax 或结构不符合，那么则回退为普通的页面跳转
	 *  2. 链接是当前页面的锚点，并且该锚点对应的元素存在且符合路由约定，那么则把该元素做动画切入
	 *  3. 浏览器前进后退（history.forward/history.back）时，也使用动画效果
	 *  4. 如果链接有 back 这个 class，那么则忽略一切，直接调用 history.back() 来后退
	 *
	 * 路由功能默认开启，如果需要关闭路由功能，那么在 zepto 之后，msui 脚本之前设置 $.config.router = false 即可（intro.js 中会 extend 到 $.smConfig 中）。
	 *
	 * 可以设置 $.config.routerFilter 函数来设置当前点击链接是否使用路由功能，实参是 a 链接的 zepto 对象；返回 false 表示不使用 router 功能。
	 *
	 * ajax 载入新的文档时，并不会执行里面的 js。到目前为止，在开启路由功能时，建议的做法是：
	 *  把所有页面的 js 都放到同一个脚本里，js 里面的事件绑定使用委托而不是直接的绑定在元素上（因为动态加载的页面元素还不存在），然后所有页面都引用相同的 js 脚本。非事件类可以通过监控 pageInit 事件，根据里面的 pageId 来做对应区别处理。
	 *
	 * 如果有需要
	 *
	 * 对外暴露的方法
	 *  - load （原 loadPage 效果一致,但后者已标记为待移除）
	 *  - forward
	 *  - back
	 *
	 * 事件
	 * pageLoad* 系列在发生 ajax 加载时才会触发；当是块切换或已缓存的情况下，不会发送这些事件
	 *  - pageLoadCancel: 如果前一个还没加载完,那么取消并发送该事件
	 *  - pageLoadStart: 开始加载
	 *  - pageLodComplete: ajax complete 完成
	 *  - pageLoadError: ajax 发生 error
	 *  - pageAnimationStart: 执行动画切换前，实参是 event，sectionId 和 $section
	 *  - pageAnimationEnd: 执行动画完毕，实参是 event，sectionId 和 $section
	 *  - beforePageRemove: 新 document 载入且动画切换完毕，旧的 document remove 之前在 window 上触发，实参是 event 和 $pageContainer
	 *  - pageRemoved: 新的 document 载入且动画切换完毕，旧的 document remove 之后在 window 上触发
	 *  - beforePageSwitch: page 切换前，在 pageAnimationStart 前，beforePageSwitch 之后会做一些额外的处理才触发 pageAnimationStart
	 *  - pageInitInternal: （经 init.js 处理后，对外是 pageInit）紧跟着动画完成的事件，实参是 event，sectionId 和 $section
	 *
	 * 术语
	 *  - 文档（document），不带 hash 的 url 关联着的应答 html 结构
	 *  - 块（section），一个文档内有指定块标识的元素
	 *
	 * 路由实现约定
	 *  - 每个文档的需要展示的内容必需位于指定的标识（routerConfig.sectionGroupClass）的元素里面，默认是: div.page-group （注意,如果改变这个需要同时改变 less 中的命名）
	 *  - 每个块必需带有指定的块标识（routerConfig.pageClass），默认是 .page
	 *
	 *  即，使用路由功能的每一个文档应当是下面这样的结构（省略 <body> 等）:
	 *      <div class="page-group">
	 *          <div class="page">xxx</div>
	 *          <div class="page">yyy</div>
	 *      </div>
	 *
	 * 另，每一个块都应当有一个唯一的 ID，这样才能通过 #the-id 的形式来切换定位。
	 * 当一个块没有 id 时，如果是第一个的默认的需要展示的块，那么会给其添加一个随机的 id；否则，没有 id 的块将不会被切换展示。
	 *
	 * 通过 history.state/history.pushState 以及用 sessionStorage 来记录当前 state 以及最大的 state id 来辅助前进后退的切换效果，所以在不支持 sessionStorage 的情况下，将不开启路由功能。
	 *
	 * 为了解决 ajax 载入页面导致重复 ID 以及重复 popup 等功能，上面约定了使用路由功能的所有可展示内容都必需位于指定元素内。从而可以在进行文档间切换时可以进行两个文档的整体移动，切换完毕后再把前一个文档的内容从页面之间移除。
	 *
	 * 默认地过滤了部分协议的链接，包括 tel:, javascript:, mailto:，这些链接将不会使用路由功能。如果有更多的自定义控制需求，可以在 $.config.routerFilter 实现
	 *
	 * 注: 以 _ 开头的函数标明用于此处内部使用，可根据需要随时重构变更，不对外确保兼容性。
	 *
	 */
	+function ($) {
	    'use strict';

	    if (!window.CustomEvent) {
	        window.CustomEvent = function (type, config) {
	            config = config || { bubbles: false, cancelable: false, detail: undefined };
	            var e = document.createEvent('CustomEvent');
	            e.initCustomEvent(type, config.bubbles, config.cancelable, config.detail);
	            return e;
	        };

	        window.CustomEvent.prototype = window.Event.prototype;
	    }

	    var EVENTS = {
	        pageLoadStart: 'pageLoadStart', // ajax 开始加载新页面前
	        pageLoadCancel: 'pageLoadCancel', // 取消前一个 ajax 加载动作后
	        pageLoadError: 'pageLoadError', // ajax 加载页面失败后
	        pageLoadComplete: 'pageLoadComplete', // ajax 加载页面完成后（不论成功与否）
	        pageAnimationStart: 'pageAnimationStart', // 动画切换 page 前
	        pageAnimationEnd: 'pageAnimationEnd', // 动画切换 page 结束后
	        beforePageRemove: 'beforePageRemove', // 移除旧 document 前（适用于非内联 page 切换）
	        pageRemoved: 'pageRemoved', // 移除旧 document 后（适用于非内联 page 切换）
	        beforePageSwitch: 'beforePageSwitch', // page 切换前，在 pageAnimationStart 前，beforePageSwitch 之后会做一些额外的处理才触发 pageAnimationStart
	        pageInit: 'pageInitInternal' // 目前是定义为一个 page 加载完毕后（实际和 pageAnimationEnd 等同）
	    };

	    var Util = {
	        /**
	         * 获取 url 的 fragment（即 hash 中去掉 # 的剩余部分）
	         *
	         * 如果没有则返回空字符串
	         * 如: http://example.com/path/?query=d#123 => 123
	         *
	         * @param {String} url url
	         * @returns {String}
	         */
	        getUrlFragment: function getUrlFragment(url) {
	            var hashIndex = url.indexOf('#');
	            return hashIndex === -1 ? '' : url.slice(hashIndex + 1);
	        },
	        /**
	         * 获取一个链接相对于当前页面的绝对地址形式
	         *
	         * 假设当前页面是 http://a.com/b/c
	         * 那么有以下情况:
	         * d => http://a.com/b/d
	         * /e => http://a.com/e
	         * #1 => http://a.com/b/c#1
	         * http://b.com/f => http://b.com/f
	         *
	         * @param {String} url url
	         * @returns {String}
	         */
	        getAbsoluteUrl: function getAbsoluteUrl(url) {
	            var link = document.createElement('a');
	            link.setAttribute('href', url);
	            var absoluteUrl = link.href;
	            link = null;
	            return absoluteUrl;
	        },
	        /**
	         * 获取一个 url 的基本部分，即不包括 hash
	         *
	         * @param {String} url url
	         * @returns {String}
	         */
	        getBaseUrl: function getBaseUrl(url) {
	            var hashIndex = url.indexOf('#');
	            return hashIndex === -1 ? url.slice(0) : url.slice(0, hashIndex);
	        },
	        /**
	         * 把一个字符串的 url 转为一个可获取其 base 和 fragment 等的对象
	         *
	         * @param {String} url url
	         * @returns {UrlObject}
	         */
	        toUrlObject: function toUrlObject(url) {
	            var fullUrl = this.getAbsoluteUrl(url),
	                baseUrl = this.getBaseUrl(fullUrl),
	                fragment = this.getUrlFragment(url);

	            return {
	                base: baseUrl,
	                full: fullUrl,
	                original: url,
	                fragment: fragment
	            };
	        },
	        /**
	         * 判断浏览器是否支持 sessionStorage，支持返回 true，否则返回 false
	         * @returns {Boolean}
	         */
	        supportStorage: function supportStorage() {
	            var mod = 'sm.router.storage.ability';
	            try {
	                sessionStorage.setItem(mod, mod);
	                sessionStorage.removeItem(mod);
	                return true;
	            } catch (e) {
	                return false;
	            }
	        }
	    };

	    var routerConfig = {
	        sectionGroupClass: 'page-group',
	        // 表示是当前 page 的 class
	        curPageClass: 'page-current',
	        // 用来辅助切换时表示 page 是 visible 的,
	        // 之所以不用 curPageClass，是因为 page-current 已被赋予了「当前 page」这一含义而不仅仅是 display: block
	        // 并且，别的地方已经使用了，所以不方便做变更，故新增一个
	        visiblePageClass: 'page-visible',
	        // 表示是 page 的 class，注意，仅是标志 class，而不是所有的 class
	        pageClass: 'page'
	    };

	    var DIRECTION = {
	        leftToRight: 'from-left-to-right',
	        rightToLeft: 'from-right-to-left'
	    };

	    var theHistory = window.history;

	    var Router = function Router() {
	        this.sessionNames = {
	            currentState: 'sm.router.currentState',
	            maxStateId: 'sm.router.maxStateId'
	        };

	        this._init();
	        this.xhr = null;
	        window.addEventListener('popstate', this._onPopState.bind(this));
	    };

	    /**
	     * 初始化
	     *
	     * - 把当前文档内容缓存起来
	     * - 查找默认展示的块内容，查找顺序如下
	     *      1. id 是 url 中的 fragment 的元素
	     *      2. 有当前块 class 标识的第一个元素
	     *      3. 第一个块
	     * - 初始页面 state 处理
	     *
	     * @private
	     */
	    Router.prototype._init = function () {

	        this.$view = $('body');

	        // 用来保存 document 的 map
	        this.cache = {};
	        var $doc = $(document);
	        var currentUrl = location.href;
	        this._saveDocumentIntoCache($doc, currentUrl);

	        var curPageId;

	        var currentUrlObj = Util.toUrlObject(currentUrl);
	        var $allSection = $doc.find('.' + routerConfig.pageClass);
	        var $visibleSection = $doc.find('.' + routerConfig.curPageClass);
	        var $curVisibleSection = $visibleSection.eq(0);
	        var $hashSection;

	        if (currentUrlObj.fragment) {
	            $hashSection = $doc.find('#' + currentUrlObj.fragment);
	        }
	        if ($hashSection && $hashSection.length) {
	            $visibleSection = $hashSection.eq(0);
	        } else if (!$visibleSection.length) {
	            $visibleSection = $allSection.eq(0);
	        }
	        if (!$visibleSection.attr('id')) {
	            $visibleSection.attr('id', this._generateRandomId());
	        }

	        if ($curVisibleSection.length && $curVisibleSection.attr('id') !== $visibleSection.attr('id')) {
	            // 在 router 到 inner page 的情况下，刷新（或者直接访问该链接）
	            // 直接切换 class 会有「闪」的现象,或许可以采用 animateSection 来减缓一下
	            $curVisibleSection.removeClass(routerConfig.curPageClass);
	            $visibleSection.addClass(routerConfig.curPageClass);
	        } else {
	            $visibleSection.addClass(routerConfig.curPageClass);
	        }
	        curPageId = $visibleSection.attr('id');

	        // 新进入一个使用 history.state 相关技术的页面时，如果第一个 state 不 push/replace,
	        // 那么在后退回该页面时，将不触发 popState 事件
	        if (theHistory.state === null) {
	            var curState = {
	                id: this._getNextStateId(),
	                url: Util.toUrlObject(currentUrl),
	                pageId: curPageId
	            };

	            theHistory.replaceState(curState, '', currentUrl);
	            this._saveAsCurrentState(curState);
	            this._incMaxStateId();
	        }
	    };

	    /**
	     * 切换到 url 指定的块或文档
	     *
	     * 如果 url 指向的是当前页面，那么认为是切换块；
	     * 否则是切换文档
	     *
	     * @param {String} url url
	     * @param {Boolean=} ignoreCache 是否强制请求不使用缓存，对 document 生效，默认是 false
	     */
	    Router.prototype.load = function (url, ignoreCache) {
	        if (ignoreCache === undefined) {
	            ignoreCache = false;
	        }

	        if (this._isTheSameDocument(location.href, url)) {
	            this._switchToSection(Util.getUrlFragment(url));
	        } else {
	            this._saveDocumentIntoCache($(document), location.href);
	            this._switchToDocument(url, ignoreCache);
	        }
	    };

	    /**
	     * 调用 history.forward()
	     */
	    Router.prototype.forward = function () {
	        theHistory.forward();
	    };

	    /**
	     * 调用 history.back()
	     */
	    Router.prototype.back = function () {
	        theHistory.back();
	    };

	    //noinspection JSUnusedGlobalSymbols
	    /**
	     * @deprecated
	     */
	    Router.prototype.loadPage = Router.prototype.load;

	    /**
	     * 切换显示当前文档另一个块
	     *
	     * 把新块从右边切入展示，同时会把新的块的记录用 history.pushState 来保存起来
	     *
	     * 如果已经是当前显示的块，那么不做任何处理；
	     * 如果没对应的块，那么忽略。
	     *
	     * @param {String} sectionId 待切换显示的块的 id
	     * @private
	     */
	    Router.prototype._switchToSection = function (sectionId) {
	        if (!sectionId) {
	            return;
	        }

	        var $curPage = this._getCurrentSection(),
	            $newPage = $('#' + sectionId);

	        // 如果已经是当前页，不做任何处理
	        if ($curPage === $newPage) {
	            return;
	        }

	        this._animateSection($curPage, $newPage, DIRECTION.rightToLeft);
	        this._pushNewState('#' + sectionId, sectionId);
	    };

	    /**
	     * 载入显示一个新的文档
	     *
	     * - 如果有缓存，那么直接利用缓存来切换
	     * - 否则，先把页面加载过来缓存，然后再切换
	     *      - 如果解析失败，那么用 location.href 的方式来跳转
	     *
	     * 注意：不能在这里以及其之后用 location.href 来 **读取** 切换前的页面的 url，
	     *     因为如果是 popState 时的调用，那么此时 location 已经是 pop 出来的 state 的了
	     *
	     * @param {String} url 新的文档的 url
	     * @param {Boolean=} ignoreCache 是否不使用缓存强制加载页面
	     * @param {Boolean=} isPushState 是否需要 pushState
	     * @param {String=} direction 新文档切入的方向
	     * @private
	     */
	    Router.prototype._switchToDocument = function (url, ignoreCache, isPushState, direction) {
	        var baseUrl = Util.toUrlObject(url).base;

	        if (ignoreCache) {
	            delete this.cache[baseUrl];
	        }

	        var cacheDocument = this.cache[baseUrl];
	        var context = this;

	        if (cacheDocument) {
	            this._doSwitchDocument(url, isPushState, direction);
	        } else {
	            this._loadDocument(url, {
	                success: function success($doc) {
	                    try {
	                        context._parseDocument(url, $doc);
	                        context._doSwitchDocument(url, isPushState, direction);
	                    } catch (e) {
	                        location.href = url;
	                    }
	                },
	                error: function error() {
	                    location.href = url;
	                }
	            });
	        }
	    };

	    /**
	     * 利用缓存来做具体的切换文档操作
	     *
	     * - 确定待切入的文档的默认展示 section
	     * - 把新文档 append 到 view 中
	     * - 动画切换文档
	     * - 如果需要 pushState，那么把最新的状态 push 进去并把当前状态更新为该状态
	     *
	     * @param {String} url 待切换的文档的 url
	     * @param {Boolean} isPushState 加载页面后是否需要 pushState，默认是 true
	     * @param {String} direction 动画切换方向，默认是 DIRECTION.rightToLeft
	     * @private
	     */
	    Router.prototype._doSwitchDocument = function (url, isPushState, direction) {
	        if (typeof isPushState === 'undefined') {
	            isPushState = true;
	        }

	        var urlObj = Util.toUrlObject(url);
	        var $currentDoc = this.$view.find('.' + routerConfig.sectionGroupClass);
	        var $newDoc = $($('<div></div>').append(this.cache[urlObj.base].$content).html());

	        // 确定一个 document 展示 section 的顺序
	        // 1. 与 hash 关联的 element
	        // 2. 默认的标识为 current 的 element
	        // 3. 第一个 section
	        var $allSection = $newDoc.find('.' + routerConfig.pageClass);
	        var $visibleSection = $newDoc.find('.' + routerConfig.curPageClass);
	        var $hashSection;

	        if (urlObj.fragment) {
	            $hashSection = $newDoc.find('#' + urlObj.fragment);
	        }
	        if ($hashSection && $hashSection.length) {
	            $visibleSection = $hashSection.eq(0);
	        } else if (!$visibleSection.length) {
	            $visibleSection = $allSection.eq(0);
	        }
	        if (!$visibleSection.attr('id')) {
	            $visibleSection.attr('id', this._generateRandomId());
	        }

	        var $currentSection = this._getCurrentSection();
	        $currentSection.trigger(EVENTS.beforePageSwitch, [$currentSection.attr('id'), $currentSection]);

	        $allSection.removeClass(routerConfig.curPageClass);
	        $visibleSection.addClass(routerConfig.curPageClass);

	        // prepend 而不 append 的目的是避免 append 进去新的 document 在后面，
	        // 其里面的默认展示的(.page-current) 的页面直接就覆盖了原显示的页面（因为都是 absolute）
	        this.$view.prepend($newDoc);

	        this._animateDocument($currentDoc, $newDoc, $visibleSection, direction);

	        if (isPushState) {
	            this._pushNewState(url, $visibleSection.attr('id'));
	        }
	    };

	    /**
	     * 判断两个 url 指向的页面是否是同一个
	     *
	     * 判断方式: 如果两个 url 的 base 形式（不带 hash 的绝对形式）相同，那么认为是同一个页面
	     *
	     * @param {String} url
	     * @param {String} anotherUrl
	     * @returns {Boolean}
	     * @private
	     */
	    Router.prototype._isTheSameDocument = function (url, anotherUrl) {
	        return Util.toUrlObject(url).base === Util.toUrlObject(anotherUrl).base;
	    };

	    /**
	     * ajax 加载 url 指定的页面内容
	     *
	     * 加载过程中会发出以下事件
	     *  pageLoadCancel: 如果前一个还没加载完,那么取消并发送该事件
	     *  pageLoadStart: 开始加载
	     *  pageLodComplete: ajax complete 完成
	     *  pageLoadError: ajax 发生 error
	     *
	     *
	     * @param {String} url url
	     * @param {Object=} callback 回调函数配置，可选，可以配置 success\error 和 complete
	     *      所有回调函数的 this 都是 null，各自实参如下：
	     *      success: $doc, status, xhr
	     *      error: xhr, status, err
	     *      complete: xhr, status
	     *
	     * @private
	     */
	    Router.prototype._loadDocument = function (url, callback) {
	        if (this.xhr && this.xhr.readyState < 4) {
	            this.xhr.onreadystatechange = function () {};
	            this.xhr.abort();
	            this.dispatch(EVENTS.pageLoadCancel);
	        }

	        this.dispatch(EVENTS.pageLoadStart);

	        callback = callback || {};
	        var self = this;

	        this.xhr = $.ajax({
	            url: url,
	            success: $.proxy(function (data, status, xhr) {
	                // 给包一层 <html/>，从而可以拿到完整的结构
	                var $doc = $('<html></html>');
	                $doc.append(data);
	                callback.success && callback.success.call(null, $doc, status, xhr);
	            }, this),
	            error: function error(xhr, status, err) {
	                callback.error && callback.error.call(null, xhr, status, err);
	                self.dispatch(EVENTS.pageLoadError);
	            },
	            complete: function complete(xhr, status) {
	                callback.complete && callback.complete.call(null, xhr, status);
	                self.dispatch(EVENTS.pageLoadComplete);
	            }
	        });
	    };

	    /**
	     * 对于 ajax 加载进来的页面，把其缓存起来
	     *
	     * @param {String} url url
	     * @param $doc ajax 载入的页面的 jq 对象，可以看做是该页面的 $(document)
	     * @private
	     */
	    Router.prototype._parseDocument = function (url, $doc) {
	        var $innerView = $doc.find('.' + routerConfig.sectionGroupClass);

	        if (!$innerView.length) {
	            throw new Error('missing router view mark: ' + routerConfig.sectionGroupClass);
	        }

	        this._saveDocumentIntoCache($doc, url);
	    };

	    /**
	     * 把一个页面的相关信息保存到 this.cache 中
	     *
	     * 以页面的 baseUrl 为 key,而 value 则是一个 DocumentCache
	     *
	     * @param {*} doc doc
	     * @param {String} url url
	     * @private
	     */
	    Router.prototype._saveDocumentIntoCache = function (doc, url) {
	        var urlAsKey = Util.toUrlObject(url).base;
	        var $doc = $(doc);

	        this.cache[urlAsKey] = {
	            $doc: $doc,
	            $content: $doc.find('.' + routerConfig.sectionGroupClass)
	        };
	    };

	    /**
	     * 从 sessionStorage 中获取保存下来的「当前状态」
	     *
	     * 如果解析失败，那么认为当前状态是 null
	     *
	     * @returns {State|null}
	     * @private
	     */
	    Router.prototype._getLastState = function () {
	        var currentState = sessionStorage.getItem(this.sessionNames.currentState);
	        try {
	            currentState = JSON.parse(currentState);
	        } catch (e) {
	            currentState = null;
	        }

	        return currentState;
	    };

	    /**
	     * 把一个状态设为当前状态，保存仅 sessionStorage 中
	     *
	     * @param {State} state
	     * @private
	     */
	    Router.prototype._saveAsCurrentState = function (state) {
	        sessionStorage.setItem(this.sessionNames.currentState, JSON.stringify(state));
	    };

	    /**
	     * 获取下一个 state 的 id
	     *
	     * 读取 sessionStorage 里的最后的状态的 id，然后 + 1；如果原没设置，那么返回 1
	     *
	     * @returns {number}
	     * @private
	     */
	    Router.prototype._getNextStateId = function () {
	        var maxStateId = sessionStorage.getItem(this.sessionNames.maxStateId);
	        return maxStateId ? parseInt(maxStateId, 10) + 1 : 1;
	    };

	    /**
	     * 把 sessionStorage 里的最后状态的 id 自加 1
	     *
	     * @private
	     */
	    Router.prototype._incMaxStateId = function () {
	        sessionStorage.setItem(this.sessionNames.maxStateId, this._getNextStateId());
	    };

	    /**
	     * 从一个文档切换为显示另一个文档
	     *
	     * @param $from 目前显示的文档
	     * @param $to 待切换显示的新文档
	     * @param $visibleSection 新文档中展示的 section 元素
	     * @param direction 新文档切入方向
	     * @private
	     */
	    Router.prototype._animateDocument = function ($from, $to, $visibleSection, direction) {
	        var sectionId = $visibleSection.attr('id');

	        var $visibleSectionInFrom = $from.find('.' + routerConfig.curPageClass);
	        $visibleSectionInFrom.addClass(routerConfig.visiblePageClass).removeClass(routerConfig.curPageClass);

	        $visibleSection.trigger(EVENTS.pageAnimationStart, [sectionId, $visibleSection]);

	        this._animateElement($from, $to, direction);

	        $from.animationEnd(function () {
	            $visibleSectionInFrom.removeClass(routerConfig.visiblePageClass);
	            // 移除 document 前后，发送 beforePageRemove 和 pageRemoved 事件
	            $(window).trigger(EVENTS.beforePageRemove, [$from]);
	            $from.remove();
	            $(window).trigger(EVENTS.pageRemoved);
	        });

	        $to.animationEnd(function () {
	            $visibleSection.trigger(EVENTS.pageAnimationEnd, [sectionId, $visibleSection]);
	            // 外层（init.js）中会绑定 pageInitInternal 事件，然后对页面进行初始化
	            $visibleSection.trigger(EVENTS.pageInit, [sectionId, $visibleSection]);
	        });
	    };

	    /**
	     * 把当前文档的展示 section 从一个 section 切换到另一个 section
	     *
	     * @param $from
	     * @param $to
	     * @param direction
	     * @private
	     */
	    Router.prototype._animateSection = function ($from, $to, direction) {
	        var toId = $to.attr('id');
	        $from.trigger(EVENTS.beforePageSwitch, [$from.attr('id'), $from]);

	        $from.removeClass(routerConfig.curPageClass);
	        $to.addClass(routerConfig.curPageClass);
	        $to.trigger(EVENTS.pageAnimationStart, [toId, $to]);
	        this._animateElement($from, $to, direction);
	        $to.animationEnd(function () {
	            $to.trigger(EVENTS.pageAnimationEnd, [toId, $to]);
	            // 外层（init.js）中会绑定 pageInitInternal 事件，然后对页面进行初始化
	            $to.trigger(EVENTS.pageInit, [toId, $to]);
	        });
	    };

	    /**
	     * 切换显示两个元素
	     *
	     * 切换是通过更新 class 来实现的，而具体的切换动画则是 class 关联的 css 来实现
	     *
	     * @param $from 当前显示的元素
	     * @param $to 待显示的元素
	     * @param direction 切换的方向
	     * @private
	     */
	    Router.prototype._animateElement = function ($from, $to, direction) {
	        // todo: 可考虑如果入参不指定，那么尝试读取 $to 的属性，再没有再使用默认的
	        // 考虑读取点击的链接上指定的方向
	        if (typeof direction === 'undefined') {
	            direction = DIRECTION.rightToLeft;
	        }

	        var animPageClasses = ['page-from-center-to-left', 'page-from-center-to-right', 'page-from-right-to-center', 'page-from-left-to-center'].join(' ');

	        var classForFrom, classForTo;
	        switch (direction) {
	            case DIRECTION.rightToLeft:
	                classForFrom = 'page-from-center-to-left';
	                classForTo = 'page-from-right-to-center';
	                break;
	            case DIRECTION.leftToRight:
	                classForFrom = 'page-from-center-to-right';
	                classForTo = 'page-from-left-to-center';
	                break;
	            default:
	                classForFrom = 'page-from-center-to-left';
	                classForTo = 'page-from-right-to-center';
	                break;
	        }

	        $from.removeClass(animPageClasses).addClass(classForFrom);
	        $to.removeClass(animPageClasses).addClass(classForTo);

	        $from.animationEnd(function () {
	            $from.removeClass(animPageClasses);
	        });
	        $to.animationEnd(function () {
	            $to.removeClass(animPageClasses);
	        });
	    };

	    /**
	     * 获取当前显示的第一个 section
	     *
	     * @returns {*}
	     * @private
	     */
	    Router.prototype._getCurrentSection = function () {
	        return this.$view.find('.' + routerConfig.curPageClass).eq(0);
	    };

	    /**
	     * popState 事件关联着的后退处理
	     *
	     * 判断两个 state 判断是否是属于同一个文档，然后做对应的 section 或文档切换；
	     * 同时在切换后把新 state 设为当前 state
	     *
	     * @param {State} state 新 state
	     * @param {State} fromState 旧 state
	     * @private
	     */
	    Router.prototype._back = function (state, fromState) {
	        if (this._isTheSameDocument(state.url.full, fromState.url.full)) {
	            var $newPage = $('#' + state.pageId);
	            if ($newPage.length) {
	                var $currentPage = this._getCurrentSection();
	                this._animateSection($currentPage, $newPage, DIRECTION.leftToRight);
	                this._saveAsCurrentState(state);
	            } else {
	                location.href = state.url.full;
	            }
	        } else {
	            this._saveDocumentIntoCache($(document), fromState.url.full);
	            this._switchToDocument(state.url.full, false, false, DIRECTION.leftToRight);
	            this._saveAsCurrentState(state);
	        }
	    };

	    /**
	     * popState 事件关联着的前进处理,类似于 _back，不同的是切换方向
	     *
	     * @param {State} state 新 state
	     * @param {State} fromState 旧 state
	     * @private
	     */
	    Router.prototype._forward = function (state, fromState) {
	        if (this._isTheSameDocument(state.url.full, fromState.url.full)) {
	            var $newPage = $('#' + state.pageId);
	            if ($newPage.length) {
	                var $currentPage = this._getCurrentSection();
	                this._animateSection($currentPage, $newPage, DIRECTION.rightToLeft);
	                this._saveAsCurrentState(state);
	            } else {
	                location.href = state.url.full;
	            }
	        } else {
	            this._saveDocumentIntoCache($(document), fromState.url.full);
	            this._switchToDocument(state.url.full, false, false, DIRECTION.rightToLeft);
	            this._saveAsCurrentState(state);
	        }
	    };

	    /**
	     * popState 事件处理
	     *
	     * 根据 pop 出来的 state 和当前 state 来判断是前进还是后退
	     *
	     * @param event
	     * @private
	     */
	    Router.prototype._onPopState = function (event) {
	        var state = event.state;
	        // if not a valid state, do nothing
	        if (!state || !state.pageId) {
	            return;
	        }

	        var lastState = this._getLastState();

	        if (!lastState) {
	            console.error && console.error('Missing last state when backward or forward');
	            return;
	        }

	        if (state.id === lastState.id) {
	            return;
	        }

	        if (state.id < lastState.id) {
	            this._back(state, lastState);
	        } else {
	            this._forward(state, lastState);
	        }
	    };

	    /**
	     * 页面进入到一个新状态
	     *
	     * 把新状态 push 进去，设置为当前的状态，然后把 maxState 的 id +1。
	     *
	     * @param {String} url 新状态的 url
	     * @param {String} sectionId 新状态中显示的 section 元素的 id
	     * @private
	     */
	    Router.prototype._pushNewState = function (url, sectionId) {
	        var state = {
	            id: this._getNextStateId(),
	            pageId: sectionId,
	            url: Util.toUrlObject(url)
	        };

	        theHistory.pushState(state, '', url);
	        this._saveAsCurrentState(state);
	        this._incMaxStateId();
	    };

	    /**
	     * 生成一个随机的 id
	     *
	     * @returns {string}
	     * @private
	     */
	    Router.prototype._generateRandomId = function () {
	        return "page-" + +new Date();
	    };

	    Router.prototype.dispatch = function (event) {
	        var e = new CustomEvent(event, {
	            bubbles: true,
	            cancelable: true
	        });

	        //noinspection JSUnresolvedFunction
	        window.dispatchEvent(e);
	    };

	    /**
	     * 判断一个链接是否使用 router 来处理
	     *
	     * @param $link
	     * @returns {boolean}
	     */
	    function isInRouterBlackList($link) {
	        var classBlackList = ['external', 'tab-link', 'open-popup', 'close-popup', 'open-panel', 'close-panel'];

	        for (var i = classBlackList.length - 1; i >= 0; i--) {
	            if ($link.hasClass(classBlackList[i])) {
	                return true;
	            }
	        }

	        var linkEle = $link.get(0);
	        var linkHref = linkEle.getAttribute('href');

	        var protoWhiteList = ['http', 'https'];

	        //如果非noscheme形式的链接，且协议不是http(s)，那么路由不会处理这类链接
	        if (/^(\w+):/.test(linkHref) && protoWhiteList.indexOf(RegExp.$1) < 0) {
	            return true;
	        }

	        //noinspection RedundantIfStatementJS
	        if (linkEle.hasAttribute('external')) {
	            return true;
	        }

	        return false;
	    }

	    /**
	     * 自定义是否执行路由功能的过滤器
	     *
	     * 可以在外部定义 $.config.routerFilter 函数，实参是点击链接的 Zepto 对象。
	     *
	     * @param $link 当前点击的链接的 Zepto 对象
	     * @returns {boolean} 返回 true 表示执行路由功能，否则不做路由处理
	     */
	    function customClickFilter($link) {
	        var customRouterFilter = $.smConfig.routerFilter;
	        if ($.isFunction(customRouterFilter)) {
	            var filterResult = customRouterFilter($link);
	            if (typeof filterResult === 'boolean') {
	                return filterResult;
	            }
	        }

	        return true;
	    }

	    $(function () {
	        // 用户可选关闭router功能
	        if (!$.smConfig.router) {
	            return;
	        }

	        if (!Util.supportStorage()) {
	            return;
	        }

	        var $pages = $('.' + routerConfig.pageClass);
	        if (!$pages.length) {
	            var warnMsg = 'Disable router function because of no .page elements';
	            if (window.console && window.console.warn) {
	                console.warn(warnMsg);
	            }
	            return;
	        }

	        var router = $.router = new Router();

	        $(document).on('click', 'a', function (e) {
	            var $target = $(e.currentTarget);

	            var filterResult = customClickFilter($target);
	            if (!filterResult) {
	                return;
	            }

	            if (isInRouterBlackList($target)) {
	                return;
	            }

	            e.preventDefault();

	            if ($target.hasClass('back')) {
	                router.back();
	            } else {
	                var url = $target.attr('href');
	                if (!url || url === '#') {
	                    return;
	                }

	                var ignoreCache = $target.attr('data-no-cache') === 'true';

	                router.load(url, ignoreCache);
	            }
	        });
	    });
	}(Zepto);

	/**
	 * @typedef {Object} State
	 * @property {Number} id
	 * @property {String} url
	 * @property {String} pageId
	 */

	/**
	 * @typedef {Object} UrlObject 字符串 url 转为的对象
	 * @property {String} base url 的基本路径
	 * @property {String} full url 的完整绝对路径
	 * @property {String} origin 转换前的 url
	 * @property {String} fragment url 的 fragment
	 */

	/**
	 * @typedef {Object} DocumentCache
	 * @property {*|HTMLElement} $doc 看做是 $(document)
	 * @property {*|HTMLElement} $content $doc 里的 routerConfig.innerViewClass 元素
	 */

	/*======================================================
	************   Modals   ************
	======================================================*/
	/*jshint unused: false*/
	+function ($) {
	    "use strict";

	    $.lastPosition = function (options) {
	        if (!sessionStorage) {
	            return;
	        }
	        // 需要记忆模块的className
	        var needMemoryClass = options.needMemoryClass || [];

	        $(window).off('beforePageSwitch').on('beforePageSwitch', function (event, id, arg) {
	            updateMemory(id, arg);
	        });
	        $(window).off('pageAnimationStart').on('pageAnimationStart', function (event, id, arg) {
	            getMemory(id, arg);
	        });
	        //让后退页面回到之前的高度
	        function getMemory(id, arg) {
	            needMemoryClass.forEach(function (item, index) {
	                if ($(item).length === 0) {
	                    return;
	                }
	                var positionName = id;
	                // 遍历对应节点设置存储的高度
	                var memoryHeight = sessionStorage.getItem(positionName);
	                arg.find(item).scrollTop(parseInt(memoryHeight));
	            });
	        }
	        //记住即将离开的页面的高度
	        function updateMemory(id, arg) {
	            var positionName = id;
	            // 存储需要记忆模块的高度
	            needMemoryClass.forEach(function (item, index) {
	                if ($(item).length === 0) {
	                    return;
	                }
	                sessionStorage.setItem(positionName, arg.find(item).scrollTop());
	            });
	        }
	    };
	}(Zepto);

	/*jshint unused: false*/
	+function ($) {
	    'use strict';

	    var getPage = function getPage() {
	        var $page = $(".page-current");
	        if (!$page[0]) $page = $(".page").addClass('page-current');
	        return $page;
	    };

	    //初始化页面中的JS组件
	    $.initPage = function (page) {
	        var $page = getPage();
	        if (!$page[0]) $page = $(document.body);
	        var $content = $page.hasClass('content') ? $page : $page.find('.content');
	        $content.scroller(); //注意滚动条一定要最先初始化

	        $.initPullToRefresh($content);
	        $.initInfiniteScroll($content);
	        $.initCalendar($content);

	        //extend
	        if ($.initSwiper) $.initSwiper($content);
	    };

	    if ($.smConfig.showPageLoadingIndicator) {
	        //这里的 以 push 开头的是私有事件，不要用
	        $(window).on('pageLoadStart', function () {
	            $.showIndicator();
	        });
	        $(window).on('pageAnimationStart', function () {
	            $.hideIndicator();
	        });
	        $(window).on('pageLoadCancel', function () {
	            $.hideIndicator();
	        });
	        $(window).on('pageLoadComplete', function () {
	            $.hideIndicator();
	        });
	        $(window).on('pageLoadError', function () {
	            $.hideIndicator();
	            $.toast('加载失败');
	        });
	    }

	    $(window).on('pageAnimationStart', function (event, id, page) {
	        // 在路由切换页面动画开始前,为了把位于 .page 之外的 popup 等隐藏,此处做些处理
	        $.closeModal();
	        $.closePanel();
	        // 如果 panel 的 effect 是 reveal 时,似乎是 page 的动画或别的样式原因导致了 transitionEnd 时间不会触发
	        // 这里暂且处理一下
	        $('body').removeClass('panel-closing');
	        $.allowPanelOpen = true;
	    });

	    $(window).on('pageInit', function () {
	        $.hideIndicator();
	        $.lastPosition({
	            needMemoryClass: ['.content']
	        });
	    });
	    // safari 在后退的时候会使用缓存技术，但实现上似乎存在些问题，
	    // 导致路由中绑定的点击事件不会正常如期的运行（log 和 debugger 都没法调试），
	    // 从而后续的跳转等完全乱了套。
	    // 所以，这里检测到是 safari 的 cache 的情况下，做一次 reload
	    // 测试路径(后缀 D 表示是 document，E 表示 external，不使用路由跳转）：
	    // 1. aD -> bDE
	    // 2. back
	    // 3. aD -> bD
	    window.addEventListener('pageshow', function (event) {
	        if (event.persisted) {
	            location.reload();
	        }
	    });

	    $.init = function () {
	        var $page = getPage();
	        var id = $page[0].id;
	        $.initPage();
	        $page.trigger('pageInit', [id, $page]);
	    };

	    //DOM READY
	    $(function () {
	        //直接绑定
	        FastClick.attach(document.body);

	        if ($.smConfig.autoInit) {
	            $.init();
	        }

	        $(document).on('pageInitInternal', function (e, id, page) {
	            $.init();
	        });
	    });
	}(Zepto);

	/**
	 * ScrollFix v0.1
	 * http://www.joelambert.co.uk
	 *
	 * Copyright 2011, Joe Lambert.
	 * Free to use under the MIT license.
	 * http://www.opensource.org/licenses/mit-license.php
	 */
	/* ===============================================================================
	************   ScrollFix   ************
	=============================================================================== */

	+function ($) {
	    "use strict";
	    //安卓微信中使用scrollfix会有问题，因此只在ios中使用，安卓机器按照原来的逻辑

	    if ($.device.ios) {
	        var ScrollFix = function ScrollFix(elem) {

	            // Variables to track inputs
	            var startY;
	            var startTopScroll;

	            elem = elem || document.querySelector(elem);

	            // If there is no element, then do nothing
	            if (!elem) return;

	            // Handle the start of interactions
	            elem.addEventListener('touchstart', function (event) {
	                startY = event.touches[0].pageY;
	                startTopScroll = elem.scrollTop;

	                if (startTopScroll <= 0) elem.scrollTop = 1;

	                if (startTopScroll + elem.offsetHeight >= elem.scrollHeight) elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1;
	            }, false);
	        };

	        var initScrollFix = function initScrollFix() {
	            var prefix = $('.page-current').length > 0 ? '.page-current ' : '';
	            var scrollable = $(prefix + ".content");
	            new ScrollFix(scrollable[0]);
	        };

	        $(document).on($.touchEvents.move, ".page-current .bar", function () {
	            event.preventDefault();
	        });
	        //监听ajax页面跳转
	        $(document).on("pageLoadComplete", function () {
	            initScrollFix();
	        });
	        //监听内联页面跳转
	        $(document).on("pageAnimationEnd", function () {
	            initScrollFix();
	        });
	        initScrollFix();
	    }
	}(Zepto);

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(54);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(58)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/.0.23.1@css-loader/index.js!./sm.css", function() {
				var newContent = require("!!./../../node_modules/.0.23.1@css-loader/index.js!./sm.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, "/*!\n * =====================================================\n * SUI Mobile - http://m.sui.taobao.org/\n *\n * =====================================================\n */\n\n\n/*.transition(@d) {\n    -webkit-transition-duration: @d;\n    transition-duration: @d;\n}\n.delay(@d) {\n    -webkit-transition-delay: @d;\n    transition-delay: @d;\n}\n.transform(@t) {\n    -webkit-transform: @t;\n    transform: @t;\n}\n.transform-origin(@to) {\n    -webkit-transform-origin: @to;\n    transform-origin: @to;\n}\n.translate3d(@x:0, @y:0, @z:0) {\n    -webkit-transform: translate3d(@x,@y,@z);\n    transform: translate3d(@x,@y,@z);\n}\n.animation(@a) {\n    -webkit-animation: @a;\n    animation: @a;\n}\n.border-box(){\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n}\n.box-shadow(@bs) {\n    -webkit-box-shadow: @bs;\n    box-shadow: @bs;\n}\n.animation-name(@name) {\n  -webkit-animation-name: @name;\n     -moz-animation-name: @name;\n          animation-name: @name;\n}\n.animation-duration(@duration) {\n  -webkit-animation-duration: @duration;\n     -moz-animation-duration: @duration;\n          animation-duration: @duration;\n}\n.animation-direction(@direction) {\n  -webkit-animation-direction: @direction;\n     -moz-animation-direction: @direction;\n          animation-direction: @direction;\n}\n*/\n\nhtml {\n    font-size: 20px;\n}\n\n@media only screen and (min-width: 400px) {\n    html {\n        font-size: 21.33333333px !important;\n    }\n}\n\n@media only screen and (min-width: 414px) {\n    html {\n        font-size: 22.08px !important;\n    }\n}\n\n@media only screen and (min-width: 480px) {\n    html {\n        font-size: 25.6px !important;\n    }\n}\n\n\n/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */\n\nhtml {\n    font-family: sans-serif;\n    -ms-text-size-adjust: 100%;\n    -webkit-text-size-adjust: 100%;\n}\n\nbody {\n    margin: 0;\n}\n\narticle, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section, summary {\n    display: block;\n}\n\naudio, canvas, progress, video {\n    display: inline-block;\n    vertical-align: baseline;\n}\n\naudio:not([controls]) {\n    display: none;\n    height: 0;\n}\n\n[hidden], template {\n    display: none;\n}\n\na {\n    background-color: transparent;\n}\n\na:active, a:hover {\n    outline: 0;\n}\n\nabbr[title] {\n    border-bottom: 1px dotted;\n}\n\nb, strong {\n    font-weight: bold;\n}\n\ndfn {\n    font-style: italic;\n}\n\nh1 {\n    font-size: 2em;\n    margin: 0.67em 0;\n}\n\nmark {\n    background: #ff0;\n    color: #000;\n}\n\nsmall {\n    font-size: 80%;\n}\n\nsub, sup {\n    font-size: 75%;\n    line-height: 0;\n    position: relative;\n    vertical-align: baseline;\n}\n\nsup {\n    top: -0.5em;\n}\n\nsub {\n    bottom: -0.25em;\n}\n\nimg {\n    border: 0;\n}\n\nsvg:not(:root) {\n    overflow: hidden;\n}\n\nfigure {\n    margin: 1em 40px;\n}\n\nhr {\n    box-sizing: content-box;\n    height: 0;\n}\n\npre {\n    overflow: auto;\n}\n\ncode, kbd, pre, samp {\n    font-family: monospace, monospace;\n    font-size: 1em;\n}\n\nbutton, input, optgroup, select, textarea {\n    color: inherit;\n    font: inherit;\n    margin: 0;\n}\n\nbutton {\n    overflow: visible;\n}\n\nbutton, select {\n    text-transform: none;\n}\n\nbutton, html input[type=\"button\"], input[type=\"reset\"], input[type=\"submit\"] {\n    -webkit-appearance: button;\n    cursor: pointer;\n}\n\nbutton[disabled], html input[disabled] {\n    cursor: default;\n}\n\nbutton::-moz-focus-inner, input::-moz-focus-inner {\n    border: 0;\n    padding: 0;\n}\n\ninput {\n    line-height: normal;\n}\n\ninput[type=\"checkbox\"], input[type=\"radio\"] {\n    box-sizing: border-box;\n    padding: 0;\n}\n\ninput[type=\"number\"]::-webkit-inner-spin-button, input[type=\"number\"]::-webkit-outer-spin-button {\n    height: auto;\n}\n\ninput[type=\"search\"] {\n    -webkit-appearance: textfield;\n    box-sizing: content-box;\n}\n\ninput[type=\"search\"]::-webkit-search-cancel-button, input[type=\"search\"]::-webkit-search-decoration {\n    -webkit-appearance: none;\n}\n\nfieldset {\n    border: 1px solid #c0c0c0;\n    margin: 0 2px;\n    padding: 0.35em 0.625em 0.75em;\n}\n\nlegend {\n    border: 0;\n    padding: 0;\n}\n\ntextarea {\n    overflow: auto;\n}\n\noptgroup {\n    font-weight: bold;\n}\n\ntable {\n    border-collapse: collapse;\n    border-spacing: 0;\n}\n\ntd, th {\n    padding: 0;\n}\n\n* {\n    box-sizing: border-box;\n    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n    -webkit-touch-callout: none;\n}\n\nbody {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n    font-size: 0.85rem;\n    line-height: 1.5;\n    color: #3d4145;\n    background: #eee;\n    overflow: hidden;\n}\n\na, input, textarea, select, button {\n    outline: 0;\n}\n\np {\n    margin: 1em 0;\n}\n\na {\n    color: #0894ec;\n    text-decoration: none;\n    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n\na:active {\n    color: #0a8ddf;\n}\n\n.page {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    background: #eee;\n    z-index: 2000;\n}\n\n.content {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    overflow: auto;\n    -webkit-overflow-scrolling: touch;\n}\n\n.bar-nav~.content {\n    top: 2.2rem;\n}\n\n.bar-header-secondary~.content {\n    top: 4.4rem;\n}\n\n.bar-footer~.content {\n    bottom: 2.2rem;\n}\n\n.bar-footer-secondary~.content {\n    bottom: 4.4rem;\n}\n\n.bar-tab~.content {\n    bottom: 2.5rem;\n}\n\n.bar-footer-secondary-tab~.content {\n    bottom: 4.7rem;\n}\n\n.content-padded {\n    margin: 0.5rem;\n}\n\n.text-center {\n    text-align: center;\n}\n\n.pull-left {\n    float: left;\n}\n\n.pull-right {\n    float: right;\n}\n\n.clearfix:before, .clearfix:after {\n    content: \" \";\n    display: table;\n}\n\n.clearfix:after {\n    clear: both;\n}\n\n\n/* === Content Block === */\n\n.content-block {\n    margin: 1.75rem 0;\n    padding: 0 0.75rem;\n    color: #6d6d72;\n}\n\n.content-block-title {\n    position: relative;\n    overflow: hidden;\n    margin: 0;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    font-size: 0.7rem;\n    text-transform: uppercase;\n    line-height: 1;\n    color: #6d6d72;\n    margin: 1.75rem 0.75rem 0.5rem;\n}\n\n.content-block-title+.list-block, .content-block-title+.content-block, .content-block-title+.card {\n    margin-top: 0.5rem;\n}\n\n.content-block-inner {\n    background: #fff;\n    padding: 0.5rem 0.75rem;\n    margin-left: -0.75rem;\n    width: 100%;\n    position: relative;\n    color: #3d4145;\n}\n\n.content-block-inner:before {\n    content: '';\n    position: absolute;\n    left: 0;\n    top: 0;\n    bottom: auto;\n    right: auto;\n    height: 1px;\n    width: 100%;\n    background-color: #c8c7cc;\n    display: block;\n    z-index: 15;\n    -webkit-transform-origin: 50% 0%;\n    transform-origin: 50% 0%;\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 2) {\n    .content-block-inner:before {\n        -webkit-transform: scaleY(0.5);\n        transform: scaleY(0.5);\n    }\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 3) {\n    .content-block-inner:before {\n        -webkit-transform: scaleY(0.33);\n        transform: scaleY(0.33);\n    }\n}\n\n.content-block-inner:after {\n    content: '';\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    right: auto;\n    top: auto;\n    height: 1px;\n    width: 100%;\n    background-color: #c8c7cc;\n    display: block;\n    z-index: 15;\n    -webkit-transform-origin: 50% 100%;\n    transform-origin: 50% 100%;\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 2) {\n    .content-block-inner:after {\n        -webkit-transform: scaleY(0.5);\n        transform: scaleY(0.5);\n    }\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 3) {\n    .content-block-inner:after {\n        -webkit-transform: scaleY(0.33);\n        transform: scaleY(0.33);\n    }\n}\n\n.content-block.inset {\n    margin-left: 0.75rem;\n    margin-right: 0.75rem;\n    border-radius: 0.35rem;\n}\n\n.content-block.inset .content-block-inner {\n    border-radius: 0.35rem;\n}\n\n.content-block.inset .content-block-inner:before {\n    display: none;\n}\n\n.content-block.inset .content-block-inner:after {\n    display: none;\n}\n\n@media all and (min-width: 768px) {\n    .content-block.tablet-inset {\n        margin-left: 0.75rem;\n        margin-right: 0.75rem;\n        border-radius: 0.35rem;\n    }\n    .content-block.tablet-inset .content-block-inner {\n        border-radius: 0.35rem;\n    }\n    .content-block.tablet-inset .content-block-inner:before {\n        display: none;\n    }\n    .content-block.tablet-inset .content-block-inner:after {\n        display: none;\n    }\n}\n\n\n/* === Grid === */\n\n.row {\n    overflow: hidden;\n    margin-left: -4%;\n}\n\n.row>[class*=\"col-\"], .row>[class*=\"tablet-\"] {\n    box-sizing: border-box;\n    float: left;\n}\n\n.row.no-gutter {\n    margin-left: 0;\n}\n\n.row .col-100 {\n    width: 96%;\n    margin-left: 4%;\n}\n\n.row.no-gutter .col-100 {\n    width: 100%;\n    margin: 0;\n}\n\n.row .col-95 {\n    width: 91%;\n    margin-left: 4%;\n}\n\n.row.no-gutter .col-95 {\n    width: 95%;\n    margin: 0;\n}\n\n.row .col-90 {\n    width: 86%;\n    margin-left: 4%;\n}\n\n.row.no-gutter .col-90 {\n    width: 90%;\n    margin: 0;\n}\n\n.row .col-85 {\n    width: 81%;\n    margin-left: 4%;\n}\n\n.row.no-gutter .col-85 {\n    width: 85%;\n    margin: 0;\n}\n\n.row .col-80 {\n    width: 76%;\n    margin-left: 4%;\n}\n\n.row.no-gutter .col-80 {\n    width: 80%;\n    margin: 0;\n}\n\n.row .col-75 {\n    width: 71.00000000000001%;\n    margin-left: 4%;\n}\n\n.row.no-gutter .col-75 {\n    width: 75%;\n    margin: 0;\n}\n\n.row .col-66 {\n    width: 62.66666666666666%;\n    margin-left: 4%;\n}\n\n.row.no-gutter .col-66 {\n    width: 66.66666666666666%;\n    margin: 0;\n}\n\n.row .col-60 {\n    width: 55.99999999999999%;\n    margin-left: 4%;\n}\n\n.row.no-gutter .col-60 {\n    width: 60%;\n    margin: 0;\n}\n\n.row .col-50 {\n    width: 46%;\n    margin-left: 4%;\n}\n\n.row.no-gutter .col-50 {\n    width: 50%;\n    margin: 0;\n}\n\n.row .col-40 {\n    width: 36%;\n    margin-left: 4%;\n}\n\n.row.no-gutter .col-40 {\n    width: 40%;\n    margin: 0;\n}\n\n.row .col-33 {\n    width: 29.333333333333332%;\n    margin-left: 4%;\n}\n\n.row.no-gutter .col-33 {\n    width: 33.333333333333336%;\n    margin: 0;\n}\n\n.row .col-25 {\n    width: 21%;\n    margin-left: 4%;\n}\n\n.row.no-gutter .col-25 {\n    width: 25%;\n    margin: 0;\n}\n\n.row .col-20 {\n    width: 16%;\n    margin-left: 4%;\n}\n\n.row.no-gutter .col-20 {\n    width: 20%;\n    margin: 0;\n}\n\n.row .col-15 {\n    width: 10.999999999999998%;\n    margin-left: 4%;\n}\n\n.row.no-gutter .col-15 {\n    width: 15%;\n    margin: 0;\n}\n\n.row .col-10 {\n    width: 6%;\n    margin-left: 4%;\n}\n\n.row.no-gutter .col-10 {\n    width: 10%;\n    margin: 0;\n}\n\n.row .col-5 {\n    width: 1%;\n    margin-left: 4%;\n}\n\n.row.no-gutter .col-5 {\n    width: 5%;\n    margin: 0;\n}\n\n@media all and (min-width: 768px) {\n    .row {\n        margin-left: -2%;\n    }\n    .row .col-100 {\n        width: 98%;\n        margin-left: 2%;\n    }\n    .row.no-gutter .col-100 {\n        width: 100%;\n        margin: 0;\n    }\n    .row .col-95 {\n        width: 93%;\n        margin-left: 2%;\n    }\n    .row.no-gutter .col-95 {\n        width: 95%;\n        margin: 0;\n    }\n    .row .col-90 {\n        width: 87.99999999999999%;\n        margin-left: 2%;\n    }\n    .row.no-gutter .col-90 {\n        width: 90%;\n        margin: 0;\n    }\n    .row .col-85 {\n        width: 82.99999999999999%;\n        margin-left: 2%;\n    }\n    .row.no-gutter .col-85 {\n        width: 85%;\n        margin: 0;\n    }\n    .row .col-80 {\n        width: 78%;\n        margin-left: 2%;\n    }\n    .row.no-gutter .col-80 {\n        width: 80%;\n        margin: 0;\n    }\n    .row .col-75 {\n        width: 73%;\n        margin-left: 2%;\n    }\n    .row.no-gutter .col-75 {\n        width: 75%;\n        margin: 0;\n    }\n    .row .col-66 {\n        width: 64.66666666666666%;\n        margin-left: 2%;\n    }\n    .row.no-gutter .col-66 {\n        width: 66.66666666666666%;\n        margin: 0;\n    }\n    .row .col-60 {\n        width: 58%;\n        margin-left: 2%;\n    }\n    .row.no-gutter .col-60 {\n        width: 60%;\n        margin: 0;\n    }\n    .row .col-50 {\n        width: 48%;\n        margin-left: 2%;\n    }\n    .row.no-gutter .col-50 {\n        width: 50%;\n        margin: 0;\n    }\n    .row .col-40 {\n        width: 38%;\n        margin-left: 2%;\n    }\n    .row.no-gutter .col-40 {\n        width: 40%;\n        margin: 0;\n    }\n    .row .col-33 {\n        width: 31.333333333333332%;\n        margin-left: 2%;\n    }\n    .row.no-gutter .col-33 {\n        width: 33.333333333333336%;\n        margin: 0;\n    }\n    .row .col-25 {\n        width: 23%;\n        margin-left: 2%;\n    }\n    .row.no-gutter .col-25 {\n        width: 25%;\n        margin: 0;\n    }\n    .row .col-20 {\n        width: 18%;\n        margin-left: 2%;\n    }\n    .row.no-gutter .col-20 {\n        width: 20%;\n        margin: 0;\n    }\n    .row .col-15 {\n        width: 13%;\n        margin-left: 2%;\n    }\n    .row.no-gutter .col-15 {\n        width: 15%;\n        margin: 0;\n    }\n    .row .col-10 {\n        width: 8%;\n        margin-left: 2%;\n    }\n    .row.no-gutter .col-10 {\n        width: 10%;\n        margin: 0;\n    }\n    .row .col-5 {\n        width: 3%;\n        margin-left: 2%;\n    }\n    .row.no-gutter .col-5 {\n        width: 5%;\n        margin: 0;\n    }\n    .row .tablet-100 {\n        width: 98%;\n        margin-left: 2%;\n    }\n    .row.no-gutter .tablet-100 {\n        width: 100%;\n        margin: 0;\n    }\n    .row .tablet-95 {\n        width: 93%;\n        margin-left: 2%;\n    }\n    .row.no-gutter .tablet-95 {\n        width: 95%;\n        margin: 0;\n    }\n    .row .tablet-90 {\n        width: 87.99999999999999%;\n        margin-left: 2%;\n    }\n    .row.no-gutter .tablet-90 {\n        width: 90%;\n        margin: 0;\n    }\n    .row .tablet-85 {\n        width: 82.99999999999999%;\n        margin-left: 2%;\n    }\n    .row.no-gutter .tablet-85 {\n        width: 85%;\n        margin: 0;\n    }\n    .row .tablet-80 {\n        width: 78%;\n        margin-left: 2%;\n    }\n    .row.no-gutter .tablet-80 {\n        width: 80%;\n        margin: 0;\n    }\n    .row .tablet-75 {\n        width: 73%;\n        margin-left: 2%;\n    }\n    .row.no-gutter .tablet-75 {\n        width: 75%;\n        margin: 0;\n    }\n    .row .tablet-66 {\n        width: 64.66666666666666%;\n        margin-left: 2%;\n    }\n    .row.no-gutter .tablet-66 {\n        width: 66.66666666666666%;\n        margin: 0;\n    }\n    .row .tablet-60 {\n        width: 58%;\n        margin-left: 2%;\n    }\n    .row.no-gutter .tablet-60 {\n        width: 60%;\n        margin: 0;\n    }\n    .row .tablet-50 {\n        width: 48%;\n        margin-left: 2%;\n    }\n    .row.no-gutter .tablet-50 {\n        width: 50%;\n        margin: 0;\n    }\n    .row .tablet-40 {\n        width: 38%;\n        margin-left: 2%;\n    }\n    .row.no-gutter .tablet-40 {\n        width: 40%;\n        margin: 0;\n    }\n    .row .tablet-33 {\n        width: 31.333333333333332%;\n        margin-left: 2%;\n    }\n    .row.no-gutter .tablet-33 {\n        width: 33.333333333333336%;\n        margin: 0;\n    }\n    .row .tablet-25 {\n        width: 23%;\n        margin-left: 2%;\n    }\n    .row.no-gutter .tablet-25 {\n        width: 25%;\n        margin: 0;\n    }\n    .row .tablet-20 {\n        width: 18%;\n        margin-left: 2%;\n    }\n    .row.no-gutter .tablet-20 {\n        width: 20%;\n        margin: 0;\n    }\n    .row .tablet-15 {\n        width: 13%;\n        margin-left: 2%;\n    }\n    .row.no-gutter .tablet-15 {\n        width: 15%;\n        margin: 0;\n    }\n    .row .tablet-10 {\n        width: 8%;\n        margin-left: 2%;\n    }\n    .row.no-gutter .tablet-10 {\n        width: 10%;\n        margin: 0;\n    }\n    .row .tablet-5 {\n        width: 3%;\n        margin-left: 2%;\n    }\n    .row.no-gutter .tablet-5 {\n        width: 5%;\n        margin: 0;\n    }\n}\n\n.color-default {\n    color: #3d4145;\n}\n\n.color-gray {\n    color: #999;\n}\n\n.color-primary {\n    color: #0894ec;\n}\n\n.color-success {\n    color: #4cd964;\n}\n\n.color-danger {\n    color: #f6383a;\n}\n\n.color-warning {\n    color: #f60;\n}\n\n.text-center {\n    text-align: center;\n}\n\n.bar {\n    position: absolute;\n    right: 0;\n    left: 0;\n    z-index: 10;\n    height: 2.2rem;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    background-color: #f7f7f8;\n    -webkit-backface-visibility: hidden;\n    backface-visibility: hidden;\n}\n\n.bar:after {\n    content: '';\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    right: auto;\n    top: auto;\n    height: 1px;\n    width: 100%;\n    background-color: #e7e7e7;\n    display: block;\n    z-index: 15;\n    -webkit-transform-origin: 50% 100%;\n    transform-origin: 50% 100%;\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 2) {\n    .bar:after {\n        -webkit-transform: scaleY(0.5);\n        transform: scaleY(0.5);\n    }\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 3) {\n    .bar:after {\n        -webkit-transform: scaleY(0.33);\n        transform: scaleY(0.33);\n    }\n}\n\n.bar-header-secondary {\n    top: 2.2rem;\n}\n\n.bar-footer {\n    bottom: 0;\n}\n\n.bar-footer-secondary {\n    bottom: 2.2rem;\n}\n\n.bar-footer-secondary-tab {\n    bottom: 2.5rem;\n}\n\n.bar-footer:before, .bar-footer-secondary:before, .bar-footer-secondary-tab:before {\n    content: '';\n    position: absolute;\n    left: 0;\n    top: 0;\n    bottom: auto;\n    right: auto;\n    height: 1px;\n    width: 100%;\n    background-color: #e7e7e7;\n    display: block;\n    z-index: 15;\n    -webkit-transform-origin: 50% 0%;\n    transform-origin: 50% 0%;\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 2) {\n    .bar-footer:before, .bar-footer-secondary:before, .bar-footer-secondary-tab:before {\n        -webkit-transform: scaleY(0.5);\n        transform: scaleY(0.5);\n    }\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 3) {\n    .bar-footer:before, .bar-footer-secondary:before, .bar-footer-secondary-tab:before {\n        -webkit-transform: scaleY(0.33);\n        transform: scaleY(0.33);\n    }\n}\n\n.bar-footer:after, .bar-footer-secondary:after, .bar-footer-secondary-tab:after {\n    display: none;\n}\n\n.bar-nav {\n    top: 0;\n}\n\n.title {\n    position: absolute;\n    display: block;\n    width: 100%;\n    padding: 0;\n    margin: 0 -0.5rem;\n    font-size: 0.85rem;\n    font-weight: 500;\n    line-height: 2.2rem;\n    color: #3d4145;\n    text-align: center;\n    white-space: nowrap;\n}\n\n.title a {\n    color: inherit;\n}\n\n.bar-tab {\n    bottom: 0;\n    width: 100%;\n    height: 2.5rem;\n    padding: 0;\n    table-layout: fixed;\n}\n\n.bar-tab:before {\n    content: '';\n    position: absolute;\n    left: 0;\n    top: 0;\n    bottom: auto;\n    right: auto;\n    height: 1px;\n    width: 100%;\n    background-color: #e7e7e7;\n    display: block;\n    z-index: 15;\n    -webkit-transform-origin: 50% 0%;\n    transform-origin: 50% 0%;\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 2) {\n    .bar-tab:before {\n        -webkit-transform: scaleY(0.5);\n        transform: scaleY(0.5);\n    }\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 3) {\n    .bar-tab:before {\n        -webkit-transform: scaleY(0.33);\n        transform: scaleY(0.33);\n    }\n}\n\n.bar-tab:after {\n    display: none;\n}\n\n.bar-tab .tab-item {\n    position: relative;\n    display: table-cell;\n    width: 1%;\n    height: 2.5rem;\n    color: #929292;\n    text-align: center;\n    vertical-align: middle;\n}\n\n.bar-tab .tab-item.active, .bar-tab .tab-item:active {\n    color: #0894ec;\n}\n\n.bar-tab .tab-item .badge {\n    position: absolute;\n    top: .1rem;\n    left: 50%;\n    z-index: 100;\n    height: .8rem;\n    min-width: .8rem;\n    padding: 0 .2rem;\n    font-size: .6rem;\n    line-height: .8rem;\n    color: white;\n    vertical-align: top;\n    background: red;\n    border-radius: .5rem;\n    margin-left: .1rem;\n}\n\n.bar-tab .tab-item .icon {\n    top: 0.05rem;\n    height: 1.2rem;\n    font-size: 1.2rem;\n    line-height: 1.2rem;\n    padding-top: 0;\n    padding-bottom: 0;\n}\n\n.bar-tab .tab-item .icon~.tab-label {\n    display: block;\n    font-size: 0.55rem;\n    position: relative;\n    top: 0.15rem;\n}\n\n.bar .button {\n    position: relative;\n    top: 0.35rem;\n    z-index: 20;\n    margin-top: 0;\n    font-weight: 400;\n}\n\n.bar .button.pull-right {\n    margin-left: 0.5rem;\n}\n\n.bar .button.pull-left {\n    margin-right: 0.5rem;\n}\n\n.bar .button-link {\n    top: 0;\n    padding: 0;\n    font-size: 0.8rem;\n    line-height: 2.2rem;\n    height: 2.2rem;\n    color: #0894ec;\n    border: 0;\n}\n\n.bar .button-link:active, .bar .button-link.active {\n    color: #0675bb;\n}\n\n.bar .button-block {\n    top: 0.35rem;\n    font-size: 0.8rem;\n    width: 100%;\n}\n\n.bar .button-nav.pull-left {\n    margin-left: -0.25rem;\n}\n\n.bar .button-nav.pull-left .icon-left-nav {\n    margin-right: -0.15rem;\n}\n\n.bar .button-nav.pull-right {\n    margin-right: -0.25rem;\n}\n\n.bar .button-nav.pull-right .icon-right-nav {\n    margin-left: -0.15rem;\n}\n\n.bar .icon {\n    position: relative;\n    z-index: 20;\n    padding: .5rem .1rem;\n    font-size: 1rem;\n    line-height: 1.2rem;\n}\n\n.bar .button .icon {\n    padding: 0;\n}\n\n.bar .title .icon {\n    padding: 0;\n}\n\n.bar .title .icon.icon-caret {\n    top: 0.2rem;\n    margin-left: -0.25rem;\n}\n\n.bar-footer .icon {\n    font-size: 1.2rem;\n    line-height: 1.2rem;\n}\n\n.bar input[type=\"search\"] {\n    height: 1.45rem;\n    margin: 0.3rem 0;\n}\n\n.badge {\n    display: inline-block;\n    padding: 0.1rem 0.45rem 0.15rem;\n    font-size: 0.6rem;\n    line-height: 1;\n    color: #3d4145;\n    background-color: rgba(0, 0, 0, 0.15);\n    border-radius: 5rem;\n}\n\n.badge.badge-inverted {\n    padding: 0 0.25rem 0 0;\n    background-color: transparent;\n}\n\n\n/* === Lists === */\n\n.list-block {\n    margin: 1.75rem 0;\n    font-size: 0.85rem;\n    /*\n    .swipeout {\n        overflow: hidden;\n        -webkit-transform-style: preserve-3d;\n        transform-style: preserve-3d;\n    }\n    .swipeout.deleting {\n        transition-duration: 300ms;\n        .swipeout-content {\n            transform: translateX(-100%);\n        }\n    }\n    .swipeout.transitioning {\n        .swipeout-content, .swipeout-actions-right a, .swipeout-actions-left a, .swipeout-overswipe {\n            -webkit-transition: 300ms;\n            transition: 300ms;\n        }\n    }\n    .swipeout-content {\n        position: relative;\n        z-index: 10;\n    }\n    .swipeout-overswipe {\n        -webkit-transition: 200ms left;\n        transition: 200ms left;\n    }\n    .swipeout-actions-left, .swipeout-actions-right {\n        position: absolute;\n        top: 0;\n        height: 100%;\n        .flexbox();\n        a {\n            padding: 0 1.5rem;\n            color:#fff;\n            background: #c7c7cc;\n            .flexbox();\n            .align-items(center);\n            position: relative;\n            left: 0;\n            &:after {\n                content:'';\n                position: absolute;\n                top: 0;\n                width: 600%;\n                height: 100%;\n                background: inherit;\n                z-index: -1;\n            }\n        }\n        a.swipeout-delete {\n            background: @color-danger;\n        }\n    }\n    .swipeout-actions-right {\n        right: 0%;\n        transform: translateX(100%);\n        a:after {\n            left: 100%;\n            margin-left: -1px;\n        }\n    }\n    .swipeout-actions-left {\n        left: 0%;\n        transform: translateX(-100%);\n        a:after {\n            right: 100%;\n            margin-right: -1px;\n        }\n    }\n    */\n    /*\n    .sortable-handler {\n        position: absolute;\n        right: 0;\n        top: 0;\n        bottom: 1px;\n        z-index: 10;\n        background-repeat: no-repeat;\n        background-size: 0.9rem 0.6rem;\n        background-image: url(\"@{imgBaseUrl}/i-sortable-handler.png\");\n        background-position: center;\n        width: 1.75rem;\n        opacity: 0;\n        visibility: hidden;\n        right: 0;\n    }\n    &.sortable {\n        .item-inner {\n            transition-duration: 300ms;\n        }\n    }\n    &.sortable-opened {\n        .sortable-handler {\n            visibility: visible;\n            opacity: 1;\n        }\n        .item-inner, .item-link .item-inner {\n            padding-right: 1.5rem;\n        }\n        .item-link .item-inner, .item-link .item-title-row {\n            background-image: none;\n        }\n    }\n    &.sortable-sorting {\n        li {\n            transition-duration: 300ms;\n        }\n    }\n    li.sorting {\n        z-index: 50;\n        background: rgba(255,255,255,0.8);\n        box-shadow: 0 0.1rem 0.4rem rgba(0,0,0,0.6);\n        transition-duration: 0ms;\n        .item-inner {\n            .hairline-remove(bottom);\n        }\n    }\n    */\n}\n\n.list-block ul {\n    background: #fff;\n    list-style: none;\n    padding: 0;\n    margin: 0;\n    position: relative;\n}\n\n.list-block ul:before {\n    content: '';\n    position: absolute;\n    left: 0;\n    top: 0;\n    bottom: auto;\n    right: auto;\n    height: 1px;\n    width: 100%;\n    background-color: #e7e7e7;\n    display: block;\n    z-index: 15;\n    -webkit-transform-origin: 50% 0%;\n    transform-origin: 50% 0%;\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 2) {\n    .list-block ul:before {\n        -webkit-transform: scaleY(0.5);\n        transform: scaleY(0.5);\n    }\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 3) {\n    .list-block ul:before {\n        -webkit-transform: scaleY(0.33);\n        transform: scaleY(0.33);\n    }\n}\n\n.list-block ul:after {\n    content: '';\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    right: auto;\n    top: auto;\n    height: 1px;\n    width: 100%;\n    background-color: #e7e7e7;\n    display: block;\n    z-index: 15;\n    -webkit-transform-origin: 50% 100%;\n    transform-origin: 50% 100%;\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 2) {\n    .list-block ul:after {\n        -webkit-transform: scaleY(0.5);\n        transform: scaleY(0.5);\n    }\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 3) {\n    .list-block ul:after {\n        -webkit-transform: scaleY(0.33);\n        transform: scaleY(0.33);\n    }\n}\n\n.list-block ul ul {\n    padding-left: 2.25rem;\n}\n\n.list-block ul ul:before {\n    display: none;\n}\n\n.list-block ul ul:after {\n    display: none;\n}\n\n.list-block .align-top, .list-block .align-top .item-content, .list-block .align-top .item-inner {\n    -webkit-box-align: start;\n    -webkit-align-items: flex-start;\n    align-items: flex-start;\n}\n\n.list-block.inset {\n    margin-left: 0.75rem;\n    margin-right: 0.75rem;\n    border-radius: 0.35rem;\n}\n\n.list-block.inset .content-block-title {\n    margin-left: 0;\n    margin-right: 0;\n}\n\n.list-block.inset ul {\n    border-radius: 0.35rem;\n}\n\n.list-block.inset ul:before {\n    display: none;\n}\n\n.list-block.inset ul:after {\n    display: none;\n}\n\n.list-block.inset li:first-child>a {\n    border-radius: 0.35rem 0.35rem 0 0;\n}\n\n.list-block.inset li:last-child>a {\n    border-radius: 0 0 0.35rem 0.35rem;\n}\n\n.list-block.inset li:first-child:last-child>a {\n    border-radius: 0.35rem;\n}\n\n@media all and (min-width: 768px) {\n    .list-block.tablet-inset {\n        margin-left: 0.75rem;\n        margin-right: 0.75rem;\n        border-radius: 0.35rem;\n    }\n    .list-block.tablet-inset .content-block-title {\n        margin-left: 0;\n        margin-right: 0;\n    }\n    .list-block.tablet-inset ul {\n        border-radius: 0.35rem;\n    }\n    .list-block.tablet-inset ul:before {\n        display: none;\n    }\n    .list-block.tablet-inset ul:after {\n        display: none;\n    }\n    .list-block.tablet-inset li:first-child>a {\n        border-radius: 0.35rem 0.35rem 0 0;\n    }\n    .list-block.tablet-inset li:last-child>a {\n        border-radius: 0 0 0.35rem 0.35rem;\n    }\n    .list-block.tablet-inset li:first-child:last-child>a {\n        border-radius: 0.35rem;\n    }\n    .list-block.tablet-inset .content-block-title {\n        margin-left: 0;\n        margin-right: 0;\n    }\n    .list-block.tablet-inset ul {\n        border-radius: 0.35rem;\n    }\n    .list-block.tablet-inset ul:before {\n        display: none;\n    }\n    .list-block.tablet-inset ul:after {\n        display: none;\n    }\n    .list-block.tablet-inset li:first-child>a {\n        border-radius: 0.35rem 0.35rem 0 0;\n    }\n    .list-block.tablet-inset li:last-child>a {\n        border-radius: 0 0 0.35rem 0.35rem;\n    }\n    .list-block.tablet-inset li:first-child:last-child>a {\n        border-radius: 0.35rem;\n    }\n}\n\n.list-block li {\n    box-sizing: border-box;\n    position: relative;\n}\n\n.list-block .item-media {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: flex;\n    -webkit-flex-shrink: 0;\n    -ms-flex: 0 0 auto;\n    -webkit-flex-shrink: 0;\n    flex-shrink: 0;\n    -webkit-box-lines: single;\n    -moz-box-lines: single;\n    -webkit-flex-wrap: nowrap;\n    flex-wrap: nowrap;\n    box-sizing: border-box;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    align-items: center;\n    padding-top: 0.35rem;\n    padding-bottom: 0.4rem;\n}\n\n.list-block .item-media i+i {\n    margin-left: 0.25rem;\n}\n\n.list-block .item-media i+img {\n    margin-left: 0.25rem;\n}\n\n.list-block .item-media+.item-inner {\n    margin-left: 0.75rem;\n}\n\n.list-block .item-inner {\n    padding-right: 0.75rem;\n    position: relative;\n    width: 100%;\n    padding-top: 0.4rem;\n    padding-bottom: 0.35rem;\n    min-height: 2.2rem;\n    overflow: hidden;\n    box-sizing: border-box;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: flex;\n    -webkit-box-flex: 1;\n    -ms-flex: 1;\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n    justify-content: space-between;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    align-items: center;\n}\n\n.list-block .item-inner:after {\n    content: '';\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    right: auto;\n    top: auto;\n    height: 1px;\n    width: 100%;\n    background-color: #e7e7e7;\n    display: block;\n    z-index: 15;\n    -webkit-transform-origin: 50% 100%;\n    transform-origin: 50% 100%;\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 2) {\n    .list-block .item-inner:after {\n        -webkit-transform: scaleY(0.5);\n        transform: scaleY(0.5);\n    }\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 3) {\n    .list-block .item-inner:after {\n        -webkit-transform: scaleY(0.33);\n        transform: scaleY(0.33);\n    }\n}\n\n.list-block .item-title {\n    -webkit-flex-shrink: 1;\n    -ms-flex: 0 1 auto;\n    -webkit-flex-shrink: 1;\n    flex-shrink: 1;\n    white-space: nowrap;\n    position: relative;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    max-width: 100%;\n}\n\n.list-block .item-title.label {\n    width: 35%;\n    -webkit-flex-shrink: 0;\n    -ms-flex: 0 0 auto;\n    -webkit-flex-shrink: 0;\n    flex-shrink: 0;\n    margin: 4px 0;\n}\n\n.list-block .item-input {\n    width: 100%;\n    margin-top: -0.4rem;\n    margin-bottom: -0.35rem;\n    -webkit-box-flex: 1;\n    -ms-flex: 1;\n    -webkit-flex-shrink: 1;\n    -ms-flex: 0 1 auto;\n    -webkit-flex-shrink: 1;\n    flex-shrink: 1;\n}\n\n.list-block .item-after {\n    white-space: nowrap;\n    color: #5f646e;\n    -webkit-flex-shrink: 0;\n    -ms-flex: 0 0 auto;\n    -webkit-flex-shrink: 0;\n    flex-shrink: 0;\n    margin-left: 0.25rem;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: flex;\n    max-height: 1.4rem;\n}\n\n.list-block .smart-select .item-after {\n    max-width: 70%;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    position: relative;\n}\n\n.list-block .item-link {\n    -webkit-transition-duration: 300ms;\n    transition-duration: 300ms;\n    display: block;\n    color: inherit;\n}\n\n.list-block .item-link .item-inner {\n    padding-right: 1.5rem;\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUM0QzFDNzMyREM0MTFFNUJDNTI4OTMzMEE0RjBENzMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUM0QzFDNzQyREM0MTFFNUJDNTI4OTMzMEE0RjBENzMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1QzRDMUM3MTJEQzQxMUU1QkM1Mjg5MzMwQTRGMEQ3MyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1QzRDMUM3MjJEQzQxMUU1QkM1Mjg5MzMwQTRGMEQ3MyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pjs2Bb4AAAItSURBVHjazJhbK0RRGIb3DIOU/AG5kUTOgxmHceFGKf6BO+Vf+E8KKYcYg3FuMpNIDhFJXJAcp/GtvKumrzVs+zBrvfU2u689q6d3rb33+lYgl8tZvymZ3JOX7eQp8gT50fJA0Wj4z3tKbY5VR14hV5ObyWLkZ6sICtq4p4V8CjihevIWucoUQJFUmtUayTvkShMAL5DiGqs3IMlK3YBSgwrIZkBWmAAoIRMKyG2/IIMO/hMjbygepCS53ARAoQHyOqu1YbrLTADMAXJbASmSDOkGlOpTQHaQN72CdAuYBeQuq4cBWaIbUEJGC0Am3UIGPVoqMsk9Vu/CwxTQDSj0iSQPWD2C6Q7oBhT6AmRKAZkwAVDoowBkn+LdqQVQ6A2QhwrIuAmAEjKi2KrF/jPdfgIKveI7Pcfq/eSMCYBSD4pakymA0+RxVrsn15oAOEMeY7Vbcif5ys4ApT7CzZJHWO2G3I1fSyfgPHmY1a7x6bvT/ZpZUMBdOoHzI8El8pCiK+wq8CQXNcFlBdw51tyD00G9SnAVHV++zgDn6hzHiwTjCrgTTKvrQya3Ca5jA5CvY3IP+UlnTxJEb8zhjpDck1cL20mCAcBFWD2D2ovOvjiERojDpTGtnsL9N8EQegt+LJrC5vRN59lMORp0DrePNH2BswvYivXVzuoHSO7dz+2QHcAa6+eMOl87WHOffm8m7QCK7foog+tFi2mZACg3npPkRUxrtkitgvUtwAA5A3LWdzPizwAAAABJRU5ErkJggg==);\n    background-size: 0.7rem;\n    background-repeat: no-repeat;\n    background-position: 97% center;\n    background-position: -webkit-calc(100% - .5rem) center;\n    background-position: calc(100% - .5rem) center;\n}\n\nhtml:not(.watch-active-state) .list-block .item-link:active, .list-block .item-link.active-state {\n    -webkit-transition-duration: 0ms;\n    transition-duration: 0ms;\n    background-color: #d9d9d9;\n}\n\nhtml:not(.watch-active-state) .list-block .item-link:active .item-inner:after, .list-block .item-link.active-state .item-inner:after {\n    background-color: transparent;\n}\n\n.list-block .item-link.list-button {\n    padding: 0 0.75rem;\n    text-align: center;\n    color: #0894ec;\n    display: block;\n    line-height: 2.15rem;\n}\n\n.list-block .item-link.list-button:after {\n    content: '';\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    right: auto;\n    top: auto;\n    height: 1px;\n    width: 100%;\n    background-color: #e7e7e7;\n    display: block;\n    z-index: 15;\n    -webkit-transform-origin: 50% 100%;\n    transform-origin: 50% 100%;\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 2) {\n    .list-block .item-link.list-button:after {\n        -webkit-transform: scaleY(0.5);\n        transform: scaleY(0.5);\n    }\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 3) {\n    .list-block .item-link.list-button:after {\n        -webkit-transform: scaleY(0.33);\n        transform: scaleY(0.33);\n    }\n}\n\n.list-block .item-content {\n    box-sizing: border-box;\n    padding-left: 0.75rem;\n    min-height: 2.2rem;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: flex;\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n    justify-content: space-between;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    align-items: center;\n}\n\n.list-block .list-block-label {\n    margin: 0.5rem 0 1.75rem;\n    padding: 0 0.75rem;\n    font-size: 0.7rem;\n    color: #5f646e;\n}\n\n.list-block .item-subtitle {\n    font-size: 0.75rem;\n    position: relative;\n    overflow: hidden;\n    white-space: nowrap;\n    max-width: 100%;\n    text-overflow: ellipsis;\n}\n\n.list-block .item-text {\n    font-size: 0.75rem;\n    color: #5f646e;\n    line-height: 1.05rem;\n    position: relative;\n    overflow: hidden;\n    height: 2.1rem;\n    text-overflow: ellipsis;\n    -webkit-line-clamp: 2;\n    -webkit-box-orient: vertical;\n    display: -webkit-box;\n}\n\n.list-block.media-list .item-title {\n    font-weight: 500;\n}\n\n.list-block.media-list .item-inner {\n    display: block;\n    padding-top: 0.5rem;\n    padding-bottom: 0.45rem;\n    -webkit-align-self: stretch;\n    align-self: stretch;\n}\n\n.list-block.media-list .item-media {\n    padding-top: 0.45rem;\n    padding-bottom: 0.5rem;\n}\n\n.list-block.media-list .item-media img {\n    display: block;\n}\n\n.list-block.media-list .item-title-row {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: flex;\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n    justify-content: space-between;\n}\n\n.list-block .list-group ul:after, .list-block .list-group ul:before {\n    z-index: 11;\n}\n\n.list-block .list-group+.list-group ul:before {\n    display: none;\n}\n\n.list-block .item-divider, .list-block .list-group-title {\n    background: #F7F7F7;\n    margin-top: -1px;\n    padding: 0.2rem 0.75rem;\n    white-space: nowrap;\n    position: relative;\n    max-width: 100%;\n    text-overflow: ellipsis;\n    overflow: hidden;\n    color: #e7e7e7;\n}\n\n.list-block .item-divider:before, .list-block .list-group-title:before {\n    content: '';\n    position: absolute;\n    left: 0;\n    top: 0;\n    bottom: auto;\n    right: auto;\n    height: 1px;\n    width: 100%;\n    background-color: #e7e7e7;\n    display: block;\n    z-index: 15;\n    -webkit-transform-origin: 50% 0%;\n    transform-origin: 50% 0%;\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 2) {\n    .list-block .item-divider:before, .list-block .list-group-title:before {\n        -webkit-transform: scaleY(0.5);\n        transform: scaleY(0.5);\n    }\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 3) {\n    .list-block .item-divider:before, .list-block .list-group-title:before {\n        -webkit-transform: scaleY(0.33);\n        transform: scaleY(0.33);\n    }\n}\n\n.list-block .list-group-title {\n    position: relative;\n    position: -webkit-sticky;\n    position: -moz-sticky;\n    position: sticky;\n    top: 0;\n    z-index: 20;\n    margin-top: 0;\n}\n\n.list-block .list-group-title:before {\n    display: none;\n}\n\n.list-block li:last-child .list-button:after {\n    display: none;\n}\n\n.list-block li:last-child .item-inner:after, .list-block li:last-child li:last-child .item-inner:after {\n    display: none;\n}\n\n.list-block li li:last-child .item-inner:after, .list-block li:last-child li .item-inner:after {\n    content: '';\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    right: auto;\n    top: auto;\n    height: 1px;\n    width: 100%;\n    background-color: #e7e7e7;\n    display: block;\n    z-index: 15;\n    -webkit-transform-origin: 50% 100%;\n    transform-origin: 50% 100%;\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 2) {\n    .list-block li li:last-child .item-inner:after, .list-block li:last-child li .item-inner:after {\n        -webkit-transform: scaleY(0.5);\n        transform: scaleY(0.5);\n    }\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 3) {\n    .list-block li li:last-child .item-inner:after, .list-block li:last-child li .item-inner:after {\n        -webkit-transform: scaleY(0.33);\n        transform: scaleY(0.33);\n    }\n}\n\n\n/* === Forms === */\n\n.list-block input[type=\"text\"], .list-block input[type=\"password\"], .list-block input[type=\"search\"], .list-block input[type=\"email\"], .list-block input[type=\"tel\"], .list-block input[type=\"url\"], .list-block input[type=\"date\"], .list-block input[type=\"datetime-local\"], .list-block input[type=\"time\"], .list-block input[type=\"number\"], .list-block select, .list-block textarea {\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    -ms-appearance: none;\n    appearance: none;\n    box-sizing: border-box;\n    border: none;\n    background: none;\n    border-radius: 0 0 0 0;\n    box-shadow: none;\n    display: block;\n    padding: 0 0 0 0.25rem;\n    margin: 0;\n    width: 100%;\n    height: 2.15rem;\n    color: #3d4145;\n    font-size: 0.85rem;\n    font-family: inherit;\n}\n\n.list-block input[type=\"date\"], .list-block input[type=\"datetime-local\"] {\n    line-height: 2.2rem;\n}\n\n.list-block select {\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    -ms-appearance: none;\n    appearance: none;\n}\n\n.list-block .label {\n    vertical-align: top;\n}\n\n.list-block textarea {\n    height: 5rem;\n    resize: none;\n    line-height: 1.4;\n    padding-top: 0.4rem;\n    padding-bottom: 0.35rem;\n}\n\n.label-switch {\n    display: inline-block;\n    vertical-align: middle;\n    width: 2.6rem;\n    border-radius: 0.8rem;\n    box-sizing: border-box;\n    height: 1.6rem;\n    position: relative;\n    cursor: pointer;\n    -webkit-align-self: center;\n    align-self: center;\n}\n\n.label-switch .checkbox {\n    width: 2.6rem;\n    border-radius: 0.8rem;\n    box-sizing: border-box;\n    height: 1.6rem;\n    background: #e5e5e5;\n    z-index: 0;\n    margin: 0;\n    padding: 0;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    -ms-appearance: none;\n    appearance: none;\n    border: none;\n    cursor: pointer;\n    position: relative;\n    -webkit-transition-duration: 300ms;\n    transition-duration: 300ms;\n}\n\n.label-switch .checkbox:before {\n    content: ' ';\n    position: absolute;\n    left: 0.1rem;\n    top: 0.1rem;\n    width: 2.4rem;\n    border-radius: 0.8rem;\n    box-sizing: border-box;\n    height: 1.4rem;\n    background: #fff;\n    z-index: 1;\n    -webkit-transition-duration: 300ms;\n    transition-duration: 300ms;\n    -webkit-transform: scale(1);\n    transform: scale(1);\n}\n\n.label-switch .checkbox:after {\n    content: ' ';\n    height: 1.4rem;\n    width: 1.4rem;\n    border-radius: 1.4rem;\n    background: #fff;\n    position: absolute;\n    z-index: 2;\n    top: 0.1rem;\n    left: 0.1rem;\n    box-shadow: 0 0.1rem 0.25rem rgba(0, 0, 0, 0.4);\n    -webkit-transform: translateX(0px);\n    transform: translateX(0px);\n    -webkit-transition-duration: 300ms;\n    transition-duration: 300ms;\n}\n\n.label-switch input[type=\"checkbox\"] {\n    display: none;\n}\n\n.label-switch input[type=\"checkbox\"]:checked+.checkbox {\n    background: #4cd964;\n}\n\n.label-switch input[type=\"checkbox\"]:checked+.checkbox:before {\n    -webkit-transform: scale(0);\n    transform: scale(0);\n}\n\n.label-switch input[type=\"checkbox\"]:checked+.checkbox:after {\n    -webkit-transform: translateX(1.1rem);\n    transform: translateX(1.1rem);\n}\n\nhtml.android .label-switch input[type=\"checkbox\"]+.checkbox {\n    -webkit-transition-duration: 0;\n    transition-duration: 0;\n}\n\nhtml.android .label-switch input[type=\"checkbox\"]+.checkbox:after, html.android .label-switch input[type=\"checkbox\"]+.checkbox:before {\n    -webkit-transition-duration: 0;\n    transition-duration: 0;\n}\n\n.range-slider {\n    width: 100%;\n    position: relative;\n    overflow: hidden;\n    padding-left: 0.15rem;\n    padding-right: 0.15rem;\n    margin-left: -1px;\n    -webkit-align-self: center;\n    align-self: center;\n}\n\n.range-slider input[type=\"range\"] {\n    position: relative;\n    height: 1.4rem;\n    width: 100%;\n    margin: 0.2rem 0 0.25rem 0;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    -ms-appearance: none;\n    appearance: none;\n    background: -webkit-gradient(linear, 50% 0, 50% 100%, color-stop(0, #b7b8b7), color-stop(100%, #b7b8b7));\n    background: -webkit-linear-gradient(left, #b7b8b7 0, #b7b8b7 100%);\n    background: linear-gradient(to right, #b7b8b7 0, #b7b8b7 100%);\n    background-position: center;\n    background-size: 100% 0.1rem;\n    background-repeat: no-repeat;\n    outline: 0;\n}\n\n.range-slider input[type=\"range\"]:after {\n    height: 0.1rem;\n    background: #fff;\n    content: ' ';\n    width: 0.25rem;\n    top: 50%;\n    margin-top: -1px;\n    left: -0.25rem;\n    z-index: 1;\n    position: absolute;\n}\n\n.range-slider input[type=\"range\"]::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    -ms-appearance: none;\n    appearance: none;\n    border: none;\n    height: 1.4rem;\n    width: 1.4rem;\n    position: relative;\n    background: none;\n}\n\n.range-slider input[type=\"range\"]::-webkit-slider-thumb:after {\n    height: 1.4rem;\n    width: 1.4rem;\n    border-radius: 1.4rem;\n    background: #fff;\n    z-index: 10;\n    box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.4);\n    position: absolute;\n    left: 0;\n    top: 0;\n    content: ' ';\n}\n\n.range-slider input[type=\"range\"]::-webkit-slider-thumb:before {\n    position: absolute;\n    top: 50%;\n    right: 100%;\n    width: 100rem;\n    height: 0.1rem;\n    margin-top: -1px;\n    z-index: 1;\n    background: #0894ec;\n    content: ' ';\n}\n\nlabel.label-checkbox {\n    cursor: pointer;\n}\n\nlabel.label-checkbox i.icon-form-checkbox {\n    width: 1.1rem;\n    height: 1.1rem;\n    position: relative;\n    border-radius: 1.1rem;\n    border: 1px solid #c7c7cc;\n    box-sizing: border-box;\n}\n\nlabel.label-checkbox i.icon-form-checkbox:after {\n    content: ' ';\n    position: absolute;\n    left: 50%;\n    margin-left: -0.3rem;\n    top: 50%;\n    margin-top: -0.2rem;\n    width: 0.6rem;\n    height: 0.45rem;\n}\n\nlabel.label-checkbox input[type=\"checkbox\"], label.label-checkbox input[type=\"radio\"] {\n    display: none;\n}\n\nlabel.label-checkbox input[type=\"checkbox\"]:checked+.item-media i.icon-form-checkbox, label.label-checkbox input[type=\"radio\"]:checked+.item-media i.icon-form-checkbox {\n    border: none;\n    background-color: #0894ec;\n}\n\nlabel.label-checkbox input[type=\"checkbox\"]:checked+.item-media i.icon-form-checkbox:after, label.label-checkbox input[type=\"radio\"]:checked+.item-media i.icon-form-checkbox:after {\n    background: no-repeat center;\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20x%3D'0px'%20y%3D'0px'%20viewBox%3D'0%200%2012%209'%20xml%3Aspace%3D'preserve'%3E%3Cpolygon%20fill%3D'%23ffffff'%20points%3D'12%2C0.7%2011.3%2C0%203.9%2C7.4%200.7%2C4.2%200%2C4.9%203.9%2C8.8%203.9%2C8.8%203.9%2C8.8%20'%2F%3E%3C%2Fsvg%3E\");\n    background-size: 0.6rem 0.45rem;\n}\n\nlabel.label-checkbox {\n    -webkit-transition-duration: 300ms;\n    transition-duration: 300ms;\n}\n\nhtml:not(.watch-active-state) label.label-checkbox:active, label.label-checkbox.active-state {\n    -webkit-transition: 0ms;\n    transition: 0ms;\n    background-color: #d9d9d9;\n}\n\nhtml:not(.watch-active-state) label.label-checkbox:active .item-inner:after, label.label-checkbox.active-state .item-inner:after {\n    background-color: transparent;\n}\n\n.smart-select select {\n    display: none;\n}\n\n\n/* === Search Bar === */\n\n.searchbar {\n    padding: 8px 0;\n    overflow: hidden;\n    height: 2.2rem;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    align-items: center;\n}\n\n.searchbar .searchbar-cancel {\n    margin-right: -3rem;\n    width: 2.2rem;\n    float: right;\n    height: 1.4rem;\n    line-height: 1.4rem;\n    text-align: center;\n    -webkit-transition: all .3s;\n    transition: all .3s;\n    opacity: 0;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n}\n\n.searchbar .search-input {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n    margin-right: 0;\n    -webkit-transition: all .3s;\n    transition: all .3s;\n}\n\n.searchbar .search-input input {\n    margin: 0;\n    height: 1.4rem;\n}\n\n.searchbar.searchbar-active .searchbar-cancel {\n    margin-right: 0;\n    opacity: 1;\n}\n\n.searchbar.searchbar-active .searchbar-cancel+.search-input {\n    margin-right: 2.5rem;\n}\n\n.search-input {\n    position: relative;\n}\n\n.search-input input {\n    box-sizing: border-box;\n    width: 100%;\n    height: 1.4rem;\n    display: block;\n    border: none;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n    border-radius: 0.25rem;\n    font-family: inherit;\n    color: #3d4145;\n    font-size: 0.7rem;\n    font-weight: normal;\n    padding: 0 0.5rem;\n    background-color: #fff;\n    border: 1px solid #b4b4b4;\n}\n\n.search-input input::-webkit-input-placeholder {\n    color: #ccc;\n    opacity: 1;\n}\n\n.search-input .icon {\n    position: absolute;\n    font-size: 0.9rem;\n    color: #b4b4b4;\n    top: 50%;\n    left: 0.3rem;\n    -webkit-transform: translate3D(0, -50%, 0);\n    transform: translate3D(0, -50%, 0);\n}\n\n.search-input label+input {\n    padding-left: 1.4rem;\n}\n\n.bar .searchbar {\n    margin: 0 -0.5rem;\n    padding: 0.4rem 0.5rem;\n    background: rgba(0, 0, 0, 0.1);\n}\n\n.bar .searchbar .search-input input {\n    border: 0;\n}\n\n.bar .searchbar .searchbar-cancel {\n    color: #5f646e;\n}\n\n.button {\n    border: 1px solid #0894ec;\n    color: #0894ec;\n    text-decoration: none;\n    text-align: center;\n    display: block;\n    border-radius: 0.25rem;\n    line-height: 1.25rem;\n    box-sizing: border-box;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    -ms-appearance: none;\n    appearance: none;\n    background: none;\n    padding: 0 0.5rem;\n    margin: 0;\n    height: 1.35rem;\n    white-space: nowrap;\n    position: relative;\n    text-overflow: ellipsis;\n    font-size: 0.7rem;\n    font-family: inherit;\n    cursor: pointer;\n}\n\ninput[type=\"submit\"].button, input[type=\"button\"].button {\n    width: 100%;\n}\n\n.button:active {\n    color: #0a8ddf;\n    border-color: #0a8ddf;\n}\n\n.button.button-round {\n    border-radius: 1.25rem;\n}\n\n.button.active, .button.active:active {\n    color: #0a8ddf;\n    border-color: #0a8ddf;\n}\n\n.button.button-big {\n    font-size: 0.85rem;\n    height: 2.4rem;\n    line-height: 2.3rem;\n}\n\n.button.button-fill {\n    color: #fff;\n    background: #0894ec;\n    border: none;\n    line-height: 1.35rem;\n}\n\n.button.button-fill.active, .button.button-fill:active {\n    background: #0a8ddf;\n}\n\n.button.button-fill.button-big {\n    line-height: 2.4rem;\n}\n\n.button .button-link {\n    padding-top: 0.3rem;\n    padding-bottom: 0.3rem;\n    color: #0894ec;\n    background-color: transparent;\n    border: 0;\n}\n\n.button i.icon:first-child {\n    margin-right: 0.5rem;\n}\n\n.button i.icon:last-child {\n    margin-left: 0.5rem;\n}\n\n.button i.icon:first-child:last-child {\n    margin-left: 0;\n    margin-right: 0;\n}\n\n.button-light {\n    border-color: #ccc;\n    color: #ccc;\n    color: #5f646e;\n}\n\n.button-light:active {\n    border-color: #0a8ddf;\n    color: #0a8ddf;\n}\n\n.button-light.button-fill {\n    color: white;\n    background-color: #ccc;\n}\n\n.button-light.button-fill:active {\n    background-color: #0a8ddf;\n}\n\n.button-dark {\n    border-color: #6e727b;\n    color: #6e727b;\n    color: #5f646e;\n}\n\n.button-dark:active {\n    border-color: #0a8ddf;\n    color: #0a8ddf;\n}\n\n.button-dark.button-fill {\n    color: white;\n    background-color: #6e727b;\n}\n\n.button-dark.button-fill:active {\n    background-color: #0a8ddf;\n}\n\n.button-success {\n    border-color: #4cd964;\n    color: #4cd964;\n}\n\n.button-success:active {\n    border-color: #2ac845;\n    color: #2ac845;\n}\n\n.button-success.button-fill {\n    color: white;\n    background-color: #4cd964;\n}\n\n.button-success.button-fill:active {\n    background-color: #2ac845;\n}\n\n.button-danger {\n    border-color: #f6383a;\n    color: #f6383a;\n}\n\n.button-danger:active {\n    border-color: #f00b0d;\n    color: #f00b0d;\n}\n\n.button-danger.button-fill {\n    color: white;\n    background-color: #f6383a;\n}\n\n.button-danger.button-fill:active {\n    background-color: #f00b0d;\n}\n\n.button-warning {\n    border-color: #f60;\n    color: #f60;\n}\n\n.button-warning:active {\n    border-color: #cc5200;\n    color: #cc5200;\n}\n\n.button-warning.button-fill {\n    color: white;\n    background-color: #f60;\n}\n\n.button-warning.button-fill:active {\n    background-color: #cc5200;\n}\n\n.button.disabled, .button.button-primary.disabled, .button.button-success.disabled, .button.button-danger.disabled, .button.button-warning.disabled {\n    border-color: #c8c9cb;\n    color: #c8c9cb;\n    cursor: not-allowed;\n}\n\n.button.disabled:active, .button.button-primary.disabled:active, .button.button-success.disabled:active, .button.button-danger.disabled:active, .button.button-warning.disabled:active {\n    border-color: #c8c9cb;\n    color: #c8c9cb;\n}\n\n.button.disabled.button-fill, .button.button-primary.disabled.button-fill, .button.button-success.disabled.button-fill, .button.button-danger.disabled.button-fill, .button.button-warning.disabled.button-fill {\n    color: white;\n    background-color: #c8c9cb;\n}\n\n.button.disabled.button-fill:active, .button.button-primary.disabled.button-fill:active, .button.button-success.disabled.button-fill:active, .button.button-danger.disabled.button-fill:active, .button.button-warning.disabled.button-fill:active {\n    background-color: #c8c9cb;\n}\n\n.buttons-row, .buttons-tab {\n    -webkit-align-self: center;\n    align-self: center;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: flex;\n    -webkit-box-lines: single;\n    -moz-box-lines: single;\n    -webkit-flex-wrap: nowrap;\n    flex-wrap: nowrap;\n}\n\n.buttons-row .button {\n    border-radius: 0 0 0 0;\n    margin-left: -1px;\n    width: 100%;\n    -webkit-box-flex: 1;\n    -ms-flex: 1;\n    border-color: #0894ec;\n    color: #0894ec;\n}\n\n.buttons-row .button.active {\n    background-color: #0894ec;\n    color: white;\n    z-index: 90;\n}\n\n.buttons-row .button:first-child {\n    border-radius: 0.25rem 0 0 0.25rem;\n    margin-left: 0;\n    border-left-width: 1px;\n    border-left-style: solid;\n}\n\n.buttons-row .button:last-child {\n    border-radius: 0 0.25rem 0.25rem 0;\n}\n\n.buttons-row .button.button-round:first-child {\n    border-radius: 1.35rem 0 0 1.35rem;\n}\n\n.buttons-row .button.button-round:last-child {\n    border-radius: 0 1.35rem 1.35rem 0;\n}\n\n.buttons-tab {\n    background: white;\n    position: relative;\n}\n\n.buttons-tab:after {\n    content: '';\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    right: auto;\n    top: auto;\n    height: 1px;\n    width: 100%;\n    background-color: #d0d0d0;\n    display: block;\n    z-index: 15;\n    -webkit-transform-origin: 50% 100%;\n    transform-origin: 50% 100%;\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 2) {\n    .buttons-tab:after {\n        -webkit-transform: scaleY(0.5);\n        transform: scaleY(0.5);\n    }\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 3) {\n    .buttons-tab:after {\n        -webkit-transform: scaleY(0.33);\n        transform: scaleY(0.33);\n    }\n}\n\n.buttons-tab .button {\n    color: #5f646e;\n    font-size: 0.8rem;\n    width: 100%;\n    height: 2rem;\n    line-height: 2rem;\n    -webkit-box-flex: 1;\n    -ms-flex: 1;\n    border: 0;\n    border-bottom: 2px solid transparent;\n    border-radius: 0;\n}\n\n.buttons-tab .button.active {\n    color: #0894ec;\n    border-color: #0894ec;\n    z-index: 100;\n}\n\n.buttons-fixed {\n    position: fixed;\n    z-index: 99;\n    width: 100%;\n}\n\n\n/* === Tabs === */\n\n.tabs .tab {\n    display: none;\n}\n\n.tabs .tab.active {\n    display: block;\n}\n\n.tabs-animated-wrap {\n    position: relative;\n    width: 100%;\n    overflow: hidden;\n    height: 100%;\n}\n\n.tabs-animated-wrap>.tabs {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: flex;\n    height: 100%;\n    -webkit-transition: 300ms;\n    transition: 300ms;\n}\n\n.tabs-animated-wrap>.tabs>.tab {\n    width: 100%;\n    display: block;\n    -webkit-flex-shrink: 0;\n    -ms-flex: 0 0 auto;\n    -webkit-flex-shrink: 0;\n    flex-shrink: 0;\n}\n\n\n/* === Pages === */\n\n.page, .page-group {\n    box-sizing: border-box;\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    background: #efeff4;\n    display: none;\n    overflow: hidden;\n}\n\n.page.page-current, .page-group.page-current, .page.page-visible, .page-group.page-visible, .page.page-from-center-to-left, .page-group.page-from-center-to-left, .page.page-from-center-to-right, .page-group.page-from-center-to-right, .page.page-from-right-to-center, .page-group.page-from-right-to-center, .page.page-from-left-to-center, .page-group.page-from-left-to-center {\n    display: block;\n}\n\n.page.page-current, .page-group.page-current {\n    overflow: hidden;\n}\n\n.page-group {\n    display: block;\n}\n\n.page-transitioning, .page-transitioning .swipeback-page-shadow {\n    -webkit-transition: 400ms;\n    transition: 400ms;\n}\n\n.page-from-right-to-center {\n    -webkit-animation: pageFromRightToCenter 400ms forwards;\n    animation: pageFromRightToCenter 400ms forwards;\n    z-index: 2002;\n}\n\n.page-from-center-to-right {\n    -webkit-animation: pageFromCenterToRight 400ms forwards;\n    animation: pageFromCenterToRight 400ms forwards;\n    z-index: 2002;\n}\n\n@-webkit-keyframes pageFromRightToCenter {\n    from {\n        -webkit-transform: translate3d(100%, 0, 0);\n        transform: translate3d(100%, 0, 0);\n        opacity: .9;\n    }\n    to {\n        -webkit-transform: translate3d(0, 0, 0);\n        transform: translate3d(0, 0, 0);\n        opacity: 1;\n    }\n}\n\n@keyframes pageFromRightToCenter {\n    from {\n        -webkit-transform: translate3d(100%, 0, 0);\n        transform: translate3d(100%, 0, 0);\n        opacity: .9;\n    }\n    to {\n        -webkit-transform: translate3d(0, 0, 0);\n        transform: translate3d(0, 0, 0);\n        opacity: 1;\n    }\n}\n\n@-webkit-keyframes pageFromCenterToRight {\n    from {\n        -webkit-transform: translate3d(0, 0, 0);\n        transform: translate3d(0, 0, 0);\n        opacity: 1;\n    }\n    to {\n        -webkit-transform: translate3d(100%, 0, 0);\n        transform: translate3d(100%, 0, 0);\n        opacity: .9;\n    }\n}\n\n@keyframes pageFromCenterToRight {\n    from {\n        -webkit-transform: translate3d(0, 0, 0);\n        transform: translate3d(0, 0, 0);\n        opacity: 1;\n    }\n    to {\n        -webkit-transform: translate3d(100%, 0, 0);\n        transform: translate3d(100%, 0, 0);\n        opacity: .9;\n    }\n}\n\n.page-from-center-to-left {\n    -webkit-animation: pageFromCenterToLeft 400ms forwards;\n    animation: pageFromCenterToLeft 400ms forwards;\n}\n\n.page-from-left-to-center {\n    -webkit-animation: pageFromLeftToCenter 400ms forwards;\n    animation: pageFromLeftToCenter 400ms forwards;\n}\n\n@-webkit-keyframes pageFromCenterToLeft {\n    from {\n        opacity: 1;\n        -webkit-transform: translate3d(0, 0, 0);\n        transform: translate3d(0, 0, 0);\n    }\n    to {\n        opacity: 0.5;\n        -webkit-transform: translate3d(-20%, 0, 0);\n        transform: translate3d(-20%, 0, 0);\n    }\n}\n\n@keyframes pageFromCenterToLeft {\n    from {\n        opacity: 1;\n        -webkit-transform: translate3d(0, 0, 0);\n        transform: translate3d(0, 0, 0);\n    }\n    to {\n        opacity: 0.5;\n        -webkit-transform: translate3d(-20%, 0, 0);\n        transform: translate3d(-20%, 0, 0);\n    }\n}\n\n@-webkit-keyframes pageFromLeftToCenter {\n    from {\n        opacity: .5;\n        -webkit-transform: translate3d(-20%, 0, 0);\n        transform: translate3d(-20%, 0, 0);\n    }\n    to {\n        opacity: 1;\n        -webkit-transform: translate3d(0, 0, 0);\n        transform: translate3d(0, 0, 0);\n    }\n}\n\n@keyframes pageFromLeftToCenter {\n    from {\n        opacity: .5;\n        -webkit-transform: translate3d(-20%, 0, 0);\n        transform: translate3d(-20%, 0, 0);\n    }\n    to {\n        opacity: 1;\n        -webkit-transform: translate3d(0, 0, 0);\n        transform: translate3d(0, 0, 0);\n    }\n}\n\n.content-inner {\n    box-sizing: border-box;\n    border-top: 1px solid transparent;\n    margin-top: -1px;\n    padding-bottom: 0.5rem;\n}\n\n.javascript-scroll {\n    overflow: hidden;\n}\n\n\n/* === Pull To Refresh === */\n\n.pull-to-refresh-layer {\n    position: relative;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 2.2rem;\n}\n\n.pull-to-refresh-layer .preloader {\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    margin-left: -0.5rem;\n    margin-top: -0.5rem;\n    visibility: hidden;\n}\n\n.pull-to-refresh-layer .pull-to-refresh-arrow {\n    width: 0.65rem;\n    height: 1rem;\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    margin-left: -0.15rem;\n    margin-top: -0.5rem;\n    background: no-repeat center;\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2026%2040'%3E%3Cpolygon%20points%3D'9%2C22%209%2C0%2017%2C0%2017%2C22%2026%2C22%2013.5%2C40%200%2C22'%20fill%3D'%238c8c8c'%2F%3E%3C%2Fsvg%3E\");\n    background-size: 0.65rem 1rem;\n    z-index: 10;\n    -webkit-transform: rotate(0deg) translate3d(0, 0, 0);\n    transform: rotate(0deg) translate3d(0, 0, 0);\n    -webkit-transition-duration: 300ms;\n    transition-duration: 300ms;\n}\n\n.pull-to-refresh-content {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n}\n\n.pull-to-refresh-content.transitioning, .pull-to-refresh-content.refreshing {\n    -webkit-transition: -webkit-transform 400ms;\n    transition: transform 400ms;\n}\n\n.pull-to-refresh-content:not(.refreshing) .pull-to-refresh-layer .preloader {\n    -webkit-animation: none;\n    animation: none;\n}\n\n.pull-to-refresh-content.refreshing .pull-to-refresh-arrow {\n    visibility: hidden;\n    -webkit-transition-duration: 0ms;\n    transition-duration: 0ms;\n}\n\n.pull-to-refresh-content.refreshing .preloader {\n    visibility: visible;\n}\n\n.pull-to-refresh-content.pull-up .pull-to-refresh-arrow {\n    -webkit-transform: rotate(180deg) translate3d(0, 0, 0);\n    transform: rotate(180deg) translate3d(0, 0, 0);\n}\n\n.pull-to-refresh-content {\n    top: -2.2rem;\n}\n\n.pull-to-refresh-content.refreshing {\n    -webkit-transform: translate3d(0, 2.2rem, 0);\n    transform: translate3d(0, 2.2rem, 0);\n}\n\n.bar-nav~.pull-to-refresh-content, .bar-footer~.pull-to-refresh-content, .bar-tab~.pull-to-refresh-content {\n    top: 0;\n}\n\n.bar-nav~.pull-to-refresh-content.refreshing, .bar-footer~.pull-to-refresh-content.refreshing, .bar-tab~.pull-to-refresh-content.refreshing {\n    -webkit-transform: translate3d(0, 2.2rem, 0);\n    transform: translate3d(0, 2.2rem, 0);\n}\n\n.bar-header-secondary~.pull-to-refresh-content, .bar-footer-secondary~.pull-to-refresh-content {\n    top: 2.2rem;\n}\n\n.infinite-scroll-preloader {\n    margin: 0.5rem;\n    text-align: center;\n}\n\n.infinite-scroll-preloader .preloader {\n    width: 1.5rem;\n    height: 1.5rem;\n}\n\n.infinite-scroll-top .infinite-scroll-preloader {\n    position: absolute;\n    width: 100%;\n    top: 0;\n    margin: 0;\n}\n\n\n/* === Modals === */\n\n.modal-overlay, .preloader-indicator-overlay, .popup-overlay {\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    background: rgba(0, 0, 0, 0.4);\n    z-index: 10600;\n    visibility: hidden;\n    opacity: 0;\n    -webkit-transition-duration: 400ms;\n    transition-duration: 400ms;\n}\n\n.modal-overlay.modal-overlay-visible, .preloader-indicator-overlay.modal-overlay-visible, .popup-overlay.modal-overlay-visible {\n    visibility: visible;\n    opacity: 1;\n}\n\n.popup-overlay {\n    z-index: 10200;\n}\n\n.modal {\n    width: 13.5rem;\n    position: absolute;\n    z-index: 11000;\n    left: 50%;\n    margin-left: -6.75rem;\n    margin-top: 0;\n    top: 50%;\n    text-align: center;\n    border-radius: 0.35rem;\n    opacity: 0;\n    -webkit-transform: translate3d(0, 0, 0) scale(1.185);\n    transform: translate3d(0, 0, 0) scale(1.185);\n    -webkit-transition-property: -webkit-transform, opacity;\n    transition-property: transform, opacity;\n    color: #3d4145;\n    display: none;\n}\n\n.modal.modal-in {\n    opacity: 1;\n    -webkit-transition-duration: 400ms;\n    transition-duration: 400ms;\n    -webkit-transform: translate3d(0, 0, 0) scale(1);\n    transform: translate3d(0, 0, 0) scale(1);\n}\n\n.modal.modal-out {\n    opacity: 0;\n    z-index: 10999;\n    -webkit-transition-duration: 400ms;\n    transition-duration: 400ms;\n    -webkit-transform: translate3d(0, 0, 0) scale(0.815);\n    transform: translate3d(0, 0, 0) scale(0.815);\n}\n\n.modal-inner {\n    padding: 0.75rem;\n    border-radius: 0.35rem 0.35rem 0 0;\n    position: relative;\n    background: #e8e8e8;\n}\n\n.modal-inner:after {\n    content: '';\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    right: auto;\n    top: auto;\n    height: 1px;\n    width: 100%;\n    background-color: #b5b5b5;\n    display: block;\n    z-index: 15;\n    -webkit-transform-origin: 50% 100%;\n    transform-origin: 50% 100%;\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 2) {\n    .modal-inner:after {\n        -webkit-transform: scaleY(0.5);\n        transform: scaleY(0.5);\n    }\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 3) {\n    .modal-inner:after {\n        -webkit-transform: scaleY(0.33);\n        transform: scaleY(0.33);\n    }\n}\n\n.modal-title {\n    font-weight: 500;\n    font-size: 0.9rem;\n    text-align: center;\n}\n\n.modal-title+.modal-text {\n    margin-top: 0.25rem;\n}\n\n.modal-buttons {\n    height: 2.2rem;\n    overflow: hidden;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: flex;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n    justify-content: center;\n}\n\n.modal-buttons.modal-buttons-vertical {\n    display: block;\n    height: auto;\n}\n\n.modal-button {\n    width: 100%;\n    padding: 0 0.25rem;\n    height: 2.2rem;\n    font-size: 0.85rem;\n    line-height: 2.2rem;\n    text-align: center;\n    color: #0894ec;\n    background: #e8e8e8;\n    display: block;\n    position: relative;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    overflow: hidden;\n    cursor: pointer;\n    box-sizing: border-box;\n    -webkit-box-flex: 1;\n    -ms-flex: 1;\n}\n\n.modal-button:after {\n    content: '';\n    position: absolute;\n    right: 0;\n    top: 0;\n    left: auto;\n    bottom: auto;\n    width: 1px;\n    height: 100%;\n    background-color: #b5b5b5;\n    display: block;\n    z-index: 15;\n    -webkit-transform-origin: 100% 50%;\n    transform-origin: 100% 50%;\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 2) {\n    .modal-button:after {\n        -webkit-transform: scaleY(0.5);\n        transform: scaleY(0.5);\n    }\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 3) {\n    .modal-button:after {\n        -webkit-transform: scaleY(0.33);\n        transform: scaleY(0.33);\n    }\n}\n\n.modal-button:first-child {\n    border-radius: 0 0 0 0.35rem;\n}\n\n.modal-button:last-child {\n    border-radius: 0 0 0.35rem 0;\n}\n\n.modal-button:last-child:after {\n    display: none;\n}\n\n.modal-button:first-child:last-child {\n    border-radius: 0 0 0.35rem 0.35rem;\n}\n\n.modal-button.modal-button-bold {\n    font-weight: 500;\n}\n\nhtml:not(.watch-active-state) .modal-button:active, .modal-button.active-state {\n    background: #d4d4d4;\n}\n\n.modal-buttons-vertical .modal-button {\n    border-radius: 0;\n}\n\n.modal-buttons-vertical .modal-button:after {\n    display: none;\n}\n\n.modal-buttons-vertical .modal-button:before {\n    display: none;\n}\n\n.modal-buttons-vertical .modal-button:after {\n    content: '';\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    right: auto;\n    top: auto;\n    height: 1px;\n    width: 100%;\n    background-color: #b5b5b5;\n    display: block;\n    z-index: 15;\n    -webkit-transform-origin: 50% 100%;\n    transform-origin: 50% 100%;\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 2) {\n    .modal-buttons-vertical .modal-button:after {\n        -webkit-transform: scaleY(0.5);\n        transform: scaleY(0.5);\n    }\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 3) {\n    .modal-buttons-vertical .modal-button:after {\n        -webkit-transform: scaleY(0.33);\n        transform: scaleY(0.33);\n    }\n}\n\n.modal-buttons-vertical .modal-button:last-child {\n    border-radius: 0 0 0.35rem 0.35rem;\n}\n\n.modal-buttons-vertical .modal-button:last-child:after {\n    display: none;\n}\n\n.modal-no-buttons .modal-inner {\n    border-radius: 0.35rem;\n}\n\n.modal-no-buttons .modal-inner:after {\n    display: none;\n}\n\n.modal-no-buttons .modal-buttons {\n    display: none;\n}\n\n.actions-modal {\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    z-index: 11000;\n    width: 100%;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0);\n}\n\n.actions-modal.modal-in {\n    -webkit-transition-duration: 300ms;\n    transition-duration: 300ms;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n}\n\n.actions-modal.modal-out {\n    z-index: 10999;\n    -webkit-transition-duration: 300ms;\n    transition-duration: 300ms;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0);\n}\n\n.actions-modal-group {\n    margin: 0.4rem;\n}\n\n.actions-modal-button, .actions-modal-label {\n    width: 100%;\n    text-align: center;\n    font-weight: normal;\n    margin: 0;\n    background: rgba(243, 243, 243, 0.95);\n    box-sizing: border-box;\n    display: block;\n    position: relative;\n}\n\n.actions-modal-button:after, .actions-modal-label:after {\n    content: '';\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    right: auto;\n    top: auto;\n    height: 1px;\n    width: 100%;\n    background-color: #d2d2d6;\n    display: block;\n    z-index: 15;\n    -webkit-transform-origin: 50% 100%;\n    transform-origin: 50% 100%;\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 2) {\n    .actions-modal-button:after, .actions-modal-label:after {\n        -webkit-transform: scaleY(0.5);\n        transform: scaleY(0.5);\n    }\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 3) {\n    .actions-modal-button:after, .actions-modal-label:after {\n        -webkit-transform: scaleY(0.33);\n        transform: scaleY(0.33);\n    }\n}\n\n.actions-modal-button a, .actions-modal-label a {\n    text-decoration: none;\n    color: inherit;\n}\n\n.actions-modal-button b, .actions-modal-label b {\n    font-weight: 500;\n}\n\n.actions-modal-button.actions-modal-button-bold, .actions-modal-label.actions-modal-button-bold {\n    font-weight: 500;\n}\n\n.actions-modal-button.actions-modal-button-danger, .actions-modal-label.actions-modal-button-danger {\n    color: #f6383a;\n}\n\n.actions-modal-button.color-danger, .actions-modal-label.color-danger {\n    color: #f6383a;\n}\n\n.actions-modal-button.bg-danger, .actions-modal-label.bg-danger {\n    background: #f6383a;\n    color: white;\n}\n\n.actions-modal-button.bg-danger:active, .actions-modal-label.bg-danger:active {\n    background: #f00b0d;\n}\n\n.actions-modal-button:first-child, .actions-modal-label:first-child {\n    border-radius: 0.2rem 0.2rem 0 0;\n}\n\n.actions-modal-button:last-child, .actions-modal-label:last-child {\n    border-radius: 0 0 0.2rem 0.2rem;\n}\n\n.actions-modal-button:last-child:after, .actions-modal-label:last-child:after {\n    display: none;\n}\n\n.actions-modal-button:first-child:last-child, .actions-modal-label:first-child:last-child {\n    border-radius: 0.2rem;\n}\n\n.actions-modal-button.disabled, .actions-modal-label.disabled {\n    opacity: 0.95;\n    color: #8e8e93;\n}\n\n.actions-modal-button {\n    cursor: pointer;\n    line-height: 2.15rem;\n    font-size: 1rem;\n    color: #0894ec;\n}\n\n.actions-modal-button:active, .actions-modal-button.active-state {\n    background: #dcdcdc;\n}\n\n.actions-modal-label {\n    font-size: 0.7rem;\n    line-height: 1.3;\n    min-height: 2.2rem;\n    padding: 0.4rem 0.5rem;\n    color: #5f646e;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: flex;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n    justify-content: center;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    align-items: center;\n}\n\ninput.modal-text-input {\n    box-sizing: border-box;\n    height: 1.5rem;\n    background: #fff;\n    margin: 0;\n    margin-top: 0.75rem;\n    padding: 0 0.25rem;\n    border: 1px solid #a0a0a0;\n    border-radius: 0.25rem;\n    width: 100%;\n    font-size: 0.7rem;\n    font-family: inherit;\n    display: block;\n    box-shadow: 0 0 0 rgba(0, 0, 0, 0);\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n}\n\ninput.modal-text-input+input.modal-text-input {\n    margin-top: 0.25rem;\n}\n\ninput.modal-text-input.modal-text-input-double {\n    border-radius: 0.25rem 0.25rem 0 0;\n}\n\ninput.modal-text-input.modal-text-input-double+input.modal-text-input {\n    margin-top: 0;\n    border-top: 0;\n    border-radius: 0 0 0.25rem 0.25rem;\n}\n\n.popup, .login-screen {\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 10400;\n    background: #fff;\n    box-sizing: border-box;\n    display: none;\n    overflow: auto;\n    -webkit-overflow-scrolling: touch;\n    -webkit-transition-property: -webkit-transform;\n    transition-property: transform;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0);\n}\n\n.popup.modal-in, .login-screen.modal-in, .popup.modal-out, .login-screen.modal-out {\n    -webkit-transition-duration: 400ms;\n    transition-duration: 400ms;\n}\n\n.popup.modal-in, .login-screen.modal-in {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n}\n\n.popup.modal-out, .login-screen.modal-out {\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0);\n}\n\n.login-screen.modal-in, .login-screen.modal-out {\n    display: block;\n}\n\nhtml.with-statusbar-overlay .popup {\n    height: -webkit-calc(100% - 1rem);\n    height: calc(100% - 1rem);\n    top: 1rem;\n}\n\nhtml.with-statusbar-overlay .popup-overlay {\n    z-index: 9800;\n}\n\n@media all and (max-width: 629px), (max-height: 629px) {\n    html.with-statusbar-overlay .popup {\n        height: -webkit-calc(100% - 1rem);\n        height: calc(100% - 1rem);\n        top: 1rem;\n    }\n    html.with-statusbar-overlay .popup-overlay {\n        z-index: 9800;\n    }\n}\n\nhtml.with-statusbar-overlay .login-screen, html.with-statusbar-overlay .popup.tablet-fullscreen {\n    height: -webkit-calc(100% - 1rem);\n    height: calc(100% - 1rem);\n    top: 1rem;\n}\n\n.modal .preloader {\n    width: 1.7rem;\n    height: 1.7rem;\n}\n\n.preloader-indicator-overlay {\n    visibility: visible;\n    opacity: 0;\n    background: none;\n}\n\n.preloader-indicator-modal {\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    padding: 0.4rem;\n    margin-left: -1.25rem;\n    margin-top: -1.25rem;\n    background: rgba(0, 0, 0, 0.8);\n    z-index: 11000;\n    border-radius: 0.25rem;\n}\n\n.preloader-indicator-modal .preloader {\n    display: block;\n    width: 1.7rem;\n    height: 1.7rem;\n}\n\n.picker-modal {\n    position: fixed;\n    left: 0;\n    bottom: 0;\n    width: 100%;\n    height: 13rem;\n    z-index: 11500;\n    display: none;\n    -webkit-transition-property: -webkit-transform;\n    transition-property: transform;\n    background: #cfd5da;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0);\n}\n\n.picker-modal.modal-in, .picker-modal.modal-out {\n    -webkit-transition-duration: 400ms;\n    transition-duration: 400ms;\n}\n\n.picker-modal.modal-in {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n}\n\n.picker-modal.modal-out {\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0);\n}\n\n.picker-modal .picker-modal-inner {\n    height: 100%;\n    position: relative;\n}\n\n.picker-modal .toolbar {\n    position: relative;\n    width: 100%;\n}\n\n.picker-modal .toolbar:before {\n    content: '';\n    position: absolute;\n    left: 0;\n    top: 0;\n    bottom: auto;\n    right: auto;\n    height: 1px;\n    width: 100%;\n    background-color: #999;\n    display: block;\n    z-index: 15;\n    -webkit-transform-origin: 50% 0%;\n    transform-origin: 50% 0%;\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 2) {\n    .picker-modal .toolbar:before {\n        -webkit-transform: scaleY(0.5);\n        transform: scaleY(0.5);\n    }\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 3) {\n    .picker-modal .toolbar:before {\n        -webkit-transform: scaleY(0.33);\n        transform: scaleY(0.33);\n    }\n}\n\n.picker-modal .toolbar+.picker-modal-inner {\n    height: -webkit-calc(100% - 2.2rem);\n    height: calc(100% - 2.2rem);\n}\n\n.picker-modal.picker-modal-inline {\n    display: block;\n    position: relative;\n    background: none;\n    z-index: inherit;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n}\n\n.picker-modal.picker-modal-inline .toolbar:before {\n    display: none;\n}\n\n.picker-modal.picker-modal-inline .toolbar:after {\n    content: '';\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    right: auto;\n    top: auto;\n    height: 1px;\n    width: 100%;\n    background-color: #999;\n    display: block;\n    z-index: 15;\n    -webkit-transform-origin: 50% 100%;\n    transform-origin: 50% 100%;\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 2) {\n    .picker-modal.picker-modal-inline .toolbar:after {\n        -webkit-transform: scaleY(0.5);\n        transform: scaleY(0.5);\n    }\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 3) {\n    .picker-modal.picker-modal-inline .toolbar:after {\n        -webkit-transform: scaleY(0.33);\n        transform: scaleY(0.33);\n    }\n}\n\n.toast {\n    background: rgba(0, 0, 0, 0.8);\n    border-radius: 1rem;\n    color: white;\n    padding: 0 .8rem;\n    height: 2rem;\n    line-height: 2rem;\n    font-size: 0.8rem;\n    width: auto;\n}\n\n\n/* === Preloader === */\n\n.preloader {\n    display: inline-block;\n    width: 1rem;\n    height: 1rem;\n    -webkit-transform-origin: 50%;\n    transform-origin: 50%;\n    -webkit-animation: preloader-spin 1s steps(12, end) infinite;\n    animation: preloader-spin 1s steps(12, end) infinite;\n}\n\n.preloader:after {\n    display: block;\n    content: \"\";\n    width: 100%;\n    height: 100%;\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%236c6c6c'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\");\n    background-position: 50%;\n    background-size: 100%;\n    background-repeat: no-repeat;\n}\n\n.preloader-white:after {\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%23fff'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\");\n}\n\n@-webkit-keyframes preloader-spin {\n    100% {\n        -webkit-transform: rotate(360deg);\n    }\n}\n\n@keyframes preloader-spin {\n    100% {\n        -webkit-transform: rotate(360deg);\n        transform: rotate(360deg);\n    }\n}\n\n\n/* === Cards === */\n\n.cards-list ul, .card .list-block ul {\n    background: none;\n}\n\n.cards-list>ul:before, .card .list-block>ul:before {\n    display: none;\n}\n\n.cards-list>ul:after, .card .list-block>ul:after {\n    display: none;\n}\n\n.card {\n    background: #fff;\n    box-shadow: 0 0.05rem 0.1rem rgba(0, 0, 0, 0.3);\n    margin: 0.5rem;\n    position: relative;\n    border-radius: 0.1rem;\n    font-size: 0.7rem;\n}\n\n.card .list-block, .card .content-block {\n    margin: 0;\n}\n\n.row:not(.no-gutter) .col>.card {\n    margin-left: 0;\n    margin-right: 0;\n}\n\n.card-content {\n    position: relative;\n}\n\n.card-content-inner {\n    padding: 0.75rem;\n    position: relative;\n}\n\n.card-content-inner>p:first-child {\n    margin-top: 0;\n}\n\n.card-content-inner>p:last-child {\n    margin-bottom: 0;\n}\n\n.card-content-inner>.list-block, .card-content-inner>.content-block {\n    margin: -0.75rem;\n}\n\n.card-header, .card-footer {\n    min-height: 2.2rem;\n    position: relative;\n    padding: 0.5rem 0.75rem;\n    box-sizing: border-box;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: flex;\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n    justify-content: space-between;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    align-items: center;\n}\n\n.card-header[valign=\"top\"], .card-footer[valign=\"top\"] {\n    -webkit-box-align: start;\n    -webkit-align-items: flex-start;\n    align-items: flex-start;\n}\n\n.card-header[valign=\"bottom\"], .card-footer[valign=\"bottom\"] {\n    -webkit-box-align: end;\n    -webkit-align-items: flex-end;\n    align-items: flex-end;\n}\n\n.card-header a.link, .card-footer a.link {\n    line-height: 2.2rem;\n    height: 2.2rem;\n    text-decoration: none;\n    position: relative;\n    margin-top: -0.5rem;\n    margin-bottom: -0.5rem;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: flex;\n    -webkit-box-pack: start;\n    -webkit-justify-content: flex-start;\n    justify-content: flex-start;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    align-items: center;\n    -webkit-transition-duration: 300ms;\n    transition-duration: 300ms;\n}\n\nhtml:not(.watch-active-state) .card-header a.link:active, html:not(.watch-active-state) .card-footer a.link:active, .card-header a.link.active-state, .card-footer a.link.active-state {\n    opacity: 0.3;\n    -webkit-transition-duration: 0ms;\n    transition-duration: 0ms;\n}\n\n.card-header a.link i+span, .card-footer a.link i+span, .card-header a.link i+i, .card-footer a.link i+i, .card-header a.link span+i, .card-footer a.link span+i, .card-header a.link span+span, .card-footer a.link span+span {\n    margin-left: 0.35rem;\n}\n\n.card-header a.link i.icon, .card-footer a.link i.icon {\n    display: block;\n}\n\n.card-header a.icon-only, .card-footer a.icon-only {\n    min-width: 2.2rem;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: flex;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n    justify-content: center;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    align-items: center;\n    margin: 0;\n}\n\n.card-header {\n    border-radius: 0.1rem 0.1rem 0 0;\n    font-size: 0.85rem;\n}\n\n.card-header:after {\n    content: '';\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    right: auto;\n    top: auto;\n    height: 1px;\n    width: 100%;\n    background-color: #e1e1e1;\n    display: block;\n    z-index: 15;\n    -webkit-transform-origin: 50% 100%;\n    transform-origin: 50% 100%;\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 2) {\n    .card-header:after {\n        -webkit-transform: scaleY(0.5);\n        transform: scaleY(0.5);\n    }\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 3) {\n    .card-header:after {\n        -webkit-transform: scaleY(0.33);\n        transform: scaleY(0.33);\n    }\n}\n\n.card-header .card-cover {\n    width: 100%;\n    display: block;\n}\n\n.card-header.no-border:after {\n    display: none;\n}\n\n.card-header.no-padding {\n    padding: 0;\n}\n\n.card-footer {\n    border-radius: 0 0 0.1rem 0.1rem;\n    color: #5f646e;\n}\n\n.card-footer:before {\n    content: '';\n    position: absolute;\n    left: 0;\n    top: 0;\n    bottom: auto;\n    right: auto;\n    height: 1px;\n    width: 100%;\n    background-color: #e1e1e1;\n    display: block;\n    z-index: 15;\n    -webkit-transform-origin: 50% 0%;\n    transform-origin: 50% 0%;\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 2) {\n    .card-footer:before {\n        -webkit-transform: scaleY(0.5);\n        transform: scaleY(0.5);\n    }\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 3) {\n    .card-footer:before {\n        -webkit-transform: scaleY(0.33);\n        transform: scaleY(0.33);\n    }\n}\n\n.card-footer.no-border:before {\n    display: none;\n}\n\n.facebook-card .card-header {\n    display: block;\n    padding: 0.5rem;\n}\n\n.facebook-card .facebook-avatar {\n    float: left;\n}\n\n.facebook-card .facebook-name {\n    margin-left: 2.2rem;\n    font-size: 0.7rem;\n    font-weight: 500;\n}\n\n.facebook-card .facebook-date {\n    margin-left: 2.2rem;\n    font-size: 0.65rem;\n    color: #5f646e;\n}\n\n.facebook-card .card-footer {\n    background: #fafafa;\n}\n\n.facebook-card .card-footer a {\n    color: #5f646e;\n    font-weight: 500;\n}\n\n.facebook-card .card-content img {\n    display: block;\n}\n\n.facebook-card .card-content-inner {\n    padding: 0.75rem 0.5rem;\n}\n\n\n/* === Panels === */\n\n.panel-overlay {\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    background: rgba(0, 0, 0, 0);\n    opacity: 0;\n    z-index: 5999;\n    display: none;\n}\n\n.panel {\n    z-index: 1000;\n    display: none;\n    background: #111;\n    color: white;\n    box-sizing: border-box;\n    overflow: auto;\n    -webkit-overflow-scrolling: touch;\n    position: absolute;\n    width: 12rem;\n    top: 0;\n    height: 100%;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n    -webkit-transition: -webkit-transform 400ms;\n    transition: transform 400ms;\n}\n\n.panel.panel-left.panel-cover {\n    z-index: 6000;\n    left: -12rem;\n}\n\n.panel.panel-left.panel-reveal {\n    left: 0;\n}\n\n.panel.panel-right.panel-cover {\n    z-index: 6000;\n    right: -12rem;\n}\n\n.panel.panel-right.panel-reveal {\n    right: 0;\n}\n\nbody.with-panel-left-cover .page, body.with-panel-right-cover .page {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n    -webkit-transition: -webkit-transform 400ms;\n    transition: transform 400ms;\n}\n\nbody.with-panel-left-cover .panel-overlay, body.with-panel-right-cover .panel-overlay {\n    display: block;\n}\n\nbody.with-panel-left-reveal .page, body.with-panel-right-reveal .page {\n    -webkit-transition: 400ms;\n    transition: 400ms;\n    -webkit-transition-property: -webkit-transform;\n    transition-property: transform;\n}\n\nbody.with-panel-left-reveal .panel-overlay, body.with-panel-right-reveal .panel-overlay {\n    display: block;\n}\n\nbody.with-panel-left-reveal .page {\n    -webkit-transform: translate3d(12rem, 0, 0);\n    transform: translate3d(12rem, 0, 0);\n}\n\nbody.with-panel-left-reveal .panel-overlay {\n    margin-left: 12rem;\n}\n\nbody.with-panel-left-cover .panel-left {\n    -webkit-transform: translate3d(12rem, 0, 0);\n    transform: translate3d(12rem, 0, 0);\n}\n\nbody.with-panel-right-reveal .page {\n    -webkit-transform: translate3d(-12rem, 0, 0);\n    transform: translate3d(-12rem, 0, 0);\n}\n\nbody.with-panel-right-reveal .panel-overlay {\n    margin-left: -12rem;\n}\n\nbody.with-panel-right-cover .panel-right {\n    -webkit-transform: translate3d(-12rem, 0, 0);\n    transform: translate3d(-12rem, 0, 0);\n}\n\nbody.panel-closing .page {\n    -webkit-transition: 400ms;\n    transition: 400ms;\n    -webkit-transition-property: -webkit-transform;\n    transition-property: transform;\n}\n\n\n/* === Calendar === */\n\n.picker-calendar {\n    background: #fff;\n    height: 300px;\n    width: 100%;\n    overflow: hidden;\n}\n\n@media (orientation: landscape) and (max-height: 415px) {\n    .picker-calendar:not(.picker-modal-inline) {\n        height: 220px;\n    }\n}\n\n.picker-calendar .picker-modal-inner {\n    overflow: hidden;\n}\n\n.picker-calendar-week-days {\n    height: 18px;\n    background: #f7f7f8;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: flex;\n    font-size: 11px;\n    box-sizing: border-box;\n    position: relative;\n}\n\n.picker-calendar-week-days:after {\n    content: '';\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    right: auto;\n    top: auto;\n    height: 1px;\n    width: 100%;\n    background-color: #c4c4c4;\n    display: block;\n    z-index: 15;\n    -webkit-transform-origin: 50% 100%;\n    transform-origin: 50% 100%;\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 2) {\n    .picker-calendar-week-days:after {\n        -webkit-transform: scaleY(0.5);\n        transform: scaleY(0.5);\n    }\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 3) {\n    .picker-calendar-week-days:after {\n        -webkit-transform: scaleY(0.33);\n        transform: scaleY(0.33);\n    }\n}\n\n.picker-calendar-week-days .picker-calendar-week-day {\n    -webkit-flex-shrink: 1;\n    -ms-flex: 0 1 auto;\n    -webkit-flex-shrink: 1;\n    flex-shrink: 1;\n    width: 14.28571429%;\n    width: -webkit-calc(100% / 7);\n    width: calc(100% / 7);\n    line-height: 17px;\n    text-align: center;\n}\n\n.picker-calendar-week-days+.picker-calendar-months {\n    height: -webkit-calc(100% - 18px);\n    height: calc(100% - 18px);\n}\n\n.picker-calendar-months {\n    width: 100%;\n    height: 100%;\n    overflow: hidden;\n    position: relative;\n}\n\n.picker-calendar-months-wrapper {\n    position: relative;\n    width: 100%;\n    height: 100%;\n    -webkit-transition: 300ms;\n    transition: 300ms;\n}\n\n.picker-calendar-month {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-flex-direction: column;\n    flex-direction: column;\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    left: 0;\n    top: 0;\n}\n\n.picker-calendar-row {\n    height: 16.66666667%;\n    height: -webkit-calc(100% / 6);\n    height: calc(100% / 6);\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: flex;\n    -webkit-flex-shrink: 1;\n    -ms-flex: 0 1 auto;\n    -webkit-flex-shrink: 1;\n    flex-shrink: 1;\n    width: 100%;\n    position: relative;\n}\n\n.picker-calendar-row:after {\n    content: '';\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    right: auto;\n    top: auto;\n    height: 1px;\n    width: 100%;\n    background-color: #ccc;\n    display: block;\n    z-index: 15;\n    -webkit-transform-origin: 50% 100%;\n    transform-origin: 50% 100%;\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 2) {\n    .picker-calendar-row:after {\n        -webkit-transform: scaleY(0.5);\n        transform: scaleY(0.5);\n    }\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 3) {\n    .picker-calendar-row:after {\n        -webkit-transform: scaleY(0.33);\n        transform: scaleY(0.33);\n    }\n}\n\n.picker-calendar-row:last-child:after {\n    display: none;\n}\n\n.picker-calendar-day {\n    -webkit-flex-shrink: 1;\n    -ms-flex: 0 1 auto;\n    -webkit-flex-shrink: 1;\n    flex-shrink: 1;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: flex;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n    justify-content: center;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    align-items: center;\n    box-sizing: border-box;\n    width: 14.28571429%;\n    width: -webkit-calc(100% / 7);\n    width: calc(100% / 7);\n    text-align: center;\n    color: #3d4145;\n    font-size: 15px;\n    cursor: pointer;\n}\n\n.picker-calendar-day.picker-calendar-day-prev, .picker-calendar-day.picker-calendar-day-next {\n    color: #ccc;\n}\n\n.picker-calendar-day.picker-calendar-day-disabled {\n    color: #d4d4d4;\n    cursor: auto;\n}\n\n.picker-calendar-day.picker-calendar-day-today span {\n    background: #e3e3e3;\n}\n\n.picker-calendar-day.picker-calendar-day-selected span {\n    background: #0894ec;\n    color: #fff;\n}\n\n.picker-calendar-day span {\n    display: inline-block;\n    border-radius: 100%;\n    width: 30px;\n    height: 30px;\n    line-height: 30px;\n}\n\n.picker-calendar-month-picker, .picker-calendar-year-picker {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    align-items: center;\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n    justify-content: space-between;\n    width: 50%;\n    max-width: 200px;\n    -webkit-flex-shrink: 10;\n    -ms-flex: 0 10 auto;\n    -webkit-flex-shrink: 10;\n    flex-shrink: 10;\n}\n\n.picker-calendar-month-picker a.icon-only, .picker-calendar-year-picker a.icon-only {\n    min-width: 36px;\n}\n\n.picker-calendar-month-picker span, .picker-calendar-year-picker span {\n    -webkit-flex-shrink: 1;\n    -ms-flex: 0 1 auto;\n    -webkit-flex-shrink: 1;\n    flex-shrink: 1;\n    position: relative;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.picker-modal .toolbar-inner {\n    height: 2.2rem;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: flex;\n    text-align: center;\n}\n\n.picker-calendar-month-picker, .picker-calendar-year-picker {\n    display: block;\n    line-height: 2.2rem;\n}\n\n.picker-calendar-month-picker a.icon-only, .picker-calendar-year-picker a.icon-only {\n    float: left;\n    width: 25%;\n    height: 2.2rem;\n    line-height: 2rem;\n}\n\n.picker-calendar-month-picker .current-month-value, .picker-calendar-year-picker .current-month-value, .picker-calendar-month-picker .current-year-value, .picker-calendar-year-picker .current-year-value {\n    float: left;\n    width: 50%;\n    height: 2.2rem;\n}\n\n\n/* === Columns Picker === */\n\n.picker-columns {\n    width: 100%;\n    height: 13rem;\n    z-index: 11500;\n}\n\n.picker-columns.picker-modal-inline {\n    height: 10rem;\n}\n\n@media (orientation: landscape) and (max-height: 415px) {\n    .picker-columns:not(.picker-modal-inline) {\n        height: 10rem;\n    }\n}\n\n.picker-items {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: flex;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n    justify-content: center;\n    padding: 0;\n    text-align: right;\n    font-size: 1.2rem;\n    -webkit-mask-box-image: -webkit-linear-gradient(bottom, transparent, transparent 5%, white 20%, white 80%, transparent 95%, transparent);\n    -webkit-mask-box-image: linear-gradient(to top, transparent, transparent 5%, white 20%, white 80%, transparent 95%, transparent);\n}\n\n.bar+.picker-items {\n    height: 10.8rem;\n}\n\n.picker-items-col {\n    overflow: hidden;\n    position: relative;\n    max-height: 100%;\n}\n\n.picker-items-col.picker-items-col-left {\n    text-align: left;\n}\n\n.picker-items-col.picker-items-col-center {\n    text-align: center;\n}\n\n.picker-items-col.picker-items-col-right {\n    text-align: right;\n}\n\n.picker-items-col.picker-items-col-divider {\n    color: #3d4145;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    align-items: center;\n}\n\n.picker-items-col-normal {\n    width: 100%;\n}\n\n.picker-items-col-wrapper {\n    -webkit-transition: 300ms;\n    transition: 300ms;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out;\n}\n\n.picker-item {\n    height: 36px;\n    line-height: 36px;\n    padding: 0 10px;\n    white-space: nowrap;\n    position: relative;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    color: #999;\n    left: 0;\n    top: 0;\n    width: 100%;\n    box-sizing: border-box;\n    -webkit-transition: 300ms;\n    transition: 300ms;\n}\n\n.picker-items-col-absolute .picker-item {\n    position: absolute;\n}\n\n.picker-item.picker-item-far {\n    pointer-events: none;\n}\n\n.picker-item.picker-selected {\n    color: #3d4145;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n    -webkit-transform: rotateX(0deg);\n    transform: rotateX(0deg);\n}\n\n.picker-center-highlight {\n    height: 36px;\n    box-sizing: border-box;\n    position: absolute;\n    left: 0;\n    width: 100%;\n    top: 50%;\n    margin-top: -18px;\n    pointer-events: none;\n}\n\n.picker-center-highlight:before {\n    content: '';\n    position: absolute;\n    left: 0;\n    top: 0;\n    bottom: auto;\n    right: auto;\n    height: 1px;\n    width: 100%;\n    background-color: #a8abb0;\n    display: block;\n    z-index: 15;\n    -webkit-transform-origin: 50% 0%;\n    transform-origin: 50% 0%;\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 2) {\n    .picker-center-highlight:before {\n        -webkit-transform: scaleY(0.5);\n        transform: scaleY(0.5);\n    }\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 3) {\n    .picker-center-highlight:before {\n        -webkit-transform: scaleY(0.33);\n        transform: scaleY(0.33);\n    }\n}\n\n.picker-center-highlight:after {\n    content: '';\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    right: auto;\n    top: auto;\n    height: 1px;\n    width: 100%;\n    background-color: #a8abb0;\n    display: block;\n    z-index: 15;\n    -webkit-transform-origin: 50% 100%;\n    transform-origin: 50% 100%;\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 2) {\n    .picker-center-highlight:after {\n        -webkit-transform: scaleY(0.5);\n        transform: scaleY(0.5);\n    }\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 3) {\n    .picker-center-highlight:after {\n        -webkit-transform: scaleY(0.33);\n        transform: scaleY(0.33);\n    }\n}\n\n.picker-3d .picker-items {\n    overflow: hidden;\n    -webkit-perspective: 1200px;\n    perspective: 1200px;\n}\n\n.picker-3d .picker-items-col, .picker-3d .picker-items-col-wrapper, .picker-3d .picker-item {\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n}\n\n.picker-3d .picker-items-col {\n    overflow: visible;\n}\n\n.picker-3d .picker-item {\n    -webkit-transform-origin: center center -110px;\n    transform-origin: center center -110px;\n    -webkit-backface-visibility: hidden;\n    backface-visibility: hidden;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out;\n}\n\n.picker-modal .bar {\n    position: relative;\n    top: 0;\n}\n\n.picker-modal .bar:before {\n    content: '';\n    position: absolute;\n    left: 0;\n    top: 0;\n    bottom: auto;\n    right: auto;\n    height: 1px;\n    width: 100%;\n    background-color: #a8abb0;\n    display: block;\n    z-index: 15;\n    -webkit-transform-origin: 50% 0%;\n    transform-origin: 50% 0%;\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 2) {\n    .picker-modal .bar:before {\n        -webkit-transform: scaleY(0.5);\n        transform: scaleY(0.5);\n    }\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 3) {\n    .picker-modal .bar:before {\n        -webkit-transform: scaleY(0.33);\n        transform: scaleY(0.33);\n    }\n}\n\n.picker-modal .bar:after {\n    content: '';\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    right: auto;\n    top: auto;\n    height: 1px;\n    width: 100%;\n    background-color: #a8abb0;\n    display: block;\n    z-index: 15;\n    -webkit-transform-origin: 50% 100%;\n    transform-origin: 50% 100%;\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 2) {\n    .picker-modal .bar:after {\n        -webkit-transform: scaleY(0.5);\n        transform: scaleY(0.5);\n    }\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 3) {\n    .picker-modal .bar:after {\n        -webkit-transform: scaleY(0.33);\n        transform: scaleY(0.33);\n    }\n}\n\n.picker-modal .bar .title {\n    color: #5f646e;\n    font-weight: normal;\n}\n\n.city-picker .col-province {\n    width: 5rem;\n}\n\n.city-picker .col-city {\n    width: 6rem;\n}\n\n.city-picker .col-district {\n    width: 5rem;\n}\n\n@font-face {\n    font-family: \"iconfont-sm\";\n    src: url(" + __webpack_require__(55) + ") format('woff'), \n    url(" + __webpack_require__(56) + ") format('truetype'), \n    url(" + __webpack_require__(57) + ") format('svg');\n    /* iOS 4.1- */\n}\n\n.icon {\n    font-family: \"iconfont-sm\" !important;\n    font-style: normal;\n    display: inline-block;\n    vertical-align: middle;\n    background-size: 100% auto;\n    background-position: center;\n    -webkit-font-smoothing: antialiased;\n    -webkit-text-stroke-width: 0.2px;\n    -moz-osx-font-smoothing: grayscale;\n}\n\n.icon-app:before {\n    content: \"\\E605\";\n}\n\n.icon-browser:before {\n    content: \"\\E606\";\n}\n\n.icon-card:before {\n    content: \"\\E607\";\n}\n\n.icon-cart:before {\n    content: \"\\E600\";\n}\n\n.icon-code:before {\n    content: \"\\E609\";\n}\n\n.icon-computer:before {\n    content: \"\\E616\";\n}\n\n.icon-remove:before {\n    content: \"\\E60A\";\n}\n\n.icon-download:before {\n    content: \"\\E60B\";\n}\n\n.icon-edit:before {\n    content: \"\\E60C\";\n}\n\n.icon-emoji:before {\n    content: \"\\E615\";\n}\n\n.icon-star:before {\n    content: \"\\E60E\";\n}\n\n.icon-friends:before {\n    content: \"\\E601\";\n}\n\n.icon-gift:before {\n    content: \"\\E618\";\n}\n\n.icon-phone:before {\n    content: \"\\E60F\";\n}\n\n.icon-clock:before {\n    content: \"\\E619\";\n}\n\n.icon-home:before {\n    content: \"\\E602\";\n}\n\n.icon-menu:before {\n    content: \"\\E60D\";\n}\n\n.icon-message:before {\n    content: \"\\E617\";\n}\n\n.icon-me:before {\n    content: \"\\E603\";\n}\n\n.icon-picture:before {\n    content: \"\\E61A\";\n}\n\n.icon-share:before {\n    content: \"\\E61B\";\n}\n\n.icon-settings:before {\n    content: \"\\E604\";\n}\n\n.icon-refresh:before {\n    content: \"\\E61C\";\n}\n\n.icon-caret:before {\n    content: \"\\E610\";\n}\n\n.icon-down:before {\n    content: \"\\E611\";\n}\n\n.icon-up:before {\n    content: \"\\E612\";\n}\n\n.icon-right:before {\n    content: \"\\E613\";\n}\n\n.icon-left:before {\n    content: \"\\E614\";\n}\n\n.icon-check:before {\n    content: \"\\E608\";\n}\n\n.icon-search:before {\n    content: \"\\E61D\";\n}\n\n.icon-new:before {\n    content: \"\\E61E\";\n}\n\n.icon-next, .icon-prev {\n    width: 0.75rem;\n    height: 0.75rem;\n}\n\n.icon-next {\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2015%2015'%3E%3Cg%3E%3Cpath%20fill%3D'%23007aff'%20d%3D'M1%2C1.6l11.8%2C5.8L1%2C13.4V1.6%20M0%2C0v15l15-7.6L0%2C0L0%2C0z'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\");\n}\n\n.icon-prev {\n    background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2015%2015'%3E%3Cg%3E%3Cpath%20fill%3D'%23007aff'%20d%3D'M14%2C1.6v11.8L2.2%2C7.6L14%2C1.6%20M15%2C0L0%2C7.6L15%2C15V0L15%2C0z'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\");\n}\n\n\n/*\n.icon-plus {\n    width: 1.25rem;\n    height: 1.25rem;\n    font-size: 1.55rem;\n    line-height: 1rem;\n    text-align: center;\n    font-weight: 100;\n}\n*/\n\n\n/*==========================\nFramework7 Layouts Themes\n==========================*/\n\n\n/* === Dark layout === */\n\n.theme-dark {\n    background-color: #222426;\n}\n\n.theme-dark .bar, .bar.theme-dark {\n    background-color: #131313;\n    color: #fff;\n}\n\n.theme-dark .bar:after, .bar.theme-dark:after {\n    background-color: #333;\n}\n\n.theme-dark .title {\n    color: #fff;\n}\n\n.theme-dark .bar-nav, .theme-dark .bar-tab, .bar-nav.theme-dark, .bar-tab.theme-dark {\n    background-color: #131313;\n    color: #fff;\n}\n\n.theme-dark .bar-nav:before, .theme-dark .bar-tab:before, .bar-nav.theme-dark:before, .bar-tab.theme-dark:before {\n    background-color: #333;\n}\n\n.theme-dark .tab-item {\n    color: #fff;\n}\n\n.theme-dark .tab-item.active {\n    color: #0894ec;\n}\n\n.theme-dark .picker-calendar-week-days {\n    color: #fff;\n    background-color: #131313;\n}\n\n.theme-dark .picker-modal.picker-modal-inline .picker-center-highlight:before {\n    background-color: #333;\n}\n\n.theme-dark .picker-modal.picker-modal-inline .picker-center-highlight:after {\n    background-color: #333;\n}\n\n.theme-dark .picker-modal.picker-modal-inline .picker-item.picker-selected {\n    color: #fff;\n}\n\n.theme-dark .picker-modal.picker-modal-inline .picker-calendar-week-days {\n    color: #fff;\n}\n\n.theme-dark .picker-modal.picker-modal-inline .picker-calendar-day {\n    color: #fff;\n}\n\n.theme-dark .picker-modal.picker-modal-inline .picker-calendar-day.picker-calendar-day-prev, .theme-dark .picker-modal.picker-modal-inline .picker-calendar-day.picker-calendar-day-next {\n    color: #777;\n}\n\n.theme-dark .picker-modal.picker-modal-inline .picker-calendar-day.picker-calendar-day-disabled {\n    color: #555;\n}\n\n.theme-dark .picker-modal.picker-modal-inline .picker-calendar-day.picker-calendar-day-today span {\n    background: #444;\n}\n\n.theme-dark .picker-modal.picker-modal-inline .picker-calendar-week-days:after, .theme-dark .picker-modal.picker-modal-inline .picker-calendar-row:after {\n    background-color: #333;\n}\n\n.theme-dark .picker-modal.picker-modal-inline .toolbar~.picker-modal-inner .picker-calendar-months:before, .theme-dark .picker-modal.picker-modal-inline .picker-calendar-week-days~.picker-calendar-months:before {\n    background-color: #333;\n}\n\n.theme-dark .photo-browser .navbar, .photo-browser.theme-dark .navbar, .theme-dark .view[data-page=\"photo-browser-slides\"] .navbar, .view[data-page=\"photo-browser-slides\"].theme-dark .navbar, .theme-dark .photo-browser .toolbar, .photo-browser.theme-dark .toolbar, .theme-dark .view[data-page=\"photo-browser-slides\"] .toolbar, .view[data-page=\"photo-browser-slides\"].theme-dark .toolbar {\n    background: rgba(19, 19, 19, 0.95);\n}\n\n.theme-dark .tabbar a:not(.active) {\n    color: #fff;\n}\n\n.theme-dark .page, .theme-dark .login-screen-content, .page.theme-dark, .theme-dark .panel, .panel.theme-dark, .theme-dark .content {\n    background-color: #222426;\n    color: #ddd;\n}\n\n.theme-dark .content-block-title {\n    color: #fff;\n}\n\n.theme-dark .content-block, .content-block.theme-dark {\n    color: #bbb;\n}\n\n.theme-dark .content-block-inner {\n    background: #1c1d1f;\n    color: #ddd;\n}\n\n.theme-dark .content-block-inner:before {\n    background-color: #393939;\n}\n\n.theme-dark .content-block-inner:after {\n    background-color: #393939;\n}\n\n.theme-dark .list-block ul, .list-block.theme-dark ul {\n    background: #1c1d1f;\n}\n\n.theme-dark .list-block ul:before, .list-block.theme-dark ul:before {\n    background-color: #393939;\n}\n\n.theme-dark .list-block ul:after, .list-block.theme-dark ul:after {\n    background-color: #393939;\n}\n\n.theme-dark .list-block.inset ul, .list-block.theme-dark.inset ul {\n    background: #1c1d1f;\n}\n\n.theme-dark .list-block.notifications>ul, .list-block.theme-dark.notifications>ul {\n    background: none;\n}\n\n.theme-dark .list-block .item-title, .list-block.theme-dark .item-title, .theme-dark .list-block .item-subtitle, .list-block.theme-dark .item-subtitle {\n    color: #bbb;\n}\n\n.theme-dark .card {\n    background: #1c1d1f;\n}\n\n.theme-dark .card-header:after {\n    background-color: #393939;\n}\n\n.theme-dark .card-footer {\n    color: #bbb;\n}\n\n.theme-dark .card-footer:before {\n    background-color: #393939;\n}\n\n.theme-dark li.sorting {\n    background-color: #29292f;\n}\n\n.theme-dark .swipeout-actions-left a, .theme-dark .swipeout-actions-right a {\n    background-color: #444;\n}\n\n.theme-dark .item-inner:after, .theme-dark .list-block ul ul li:last-child .item-inner:after {\n    background-color: #393939;\n}\n\n.theme-dark .item-after {\n    color: #bbb;\n}\n\nhtml:not(.watch-active-state) .theme-dark .item-link:active, html:not(.watch-active-state) .theme-dark label.label-checkbox:active, html:not(.watch-active-state) .theme-dark label.label-radio:active, .theme-dark .item-link.active-state, .theme-dark label.label-checkbox.active-state, .theme-dark label.label-radio.active-state {\n    background-color: #29292f;\n}\n\n.theme-dark .item-link.list-button:after {\n    background-color: #393939;\n}\n\n.theme-dark .list-block-label {\n    color: #bbb;\n}\n\n.theme-dark .item-divider, .theme-dark .list-group-title {\n    background: #1a1a1a;\n    color: #bbb;\n}\n\n.theme-dark .item-divider:before, .theme-dark .list-group-title:before {\n    background-color: #393939;\n}\n\n.theme-dark .searchbar {\n    background: #333;\n}\n\n.theme-dark .searchbar:after {\n    background-color: #333;\n}\n\n.theme-dark .list-block input[type=\"text\"], .list-block.theme-dark input[type=\"text\"], .theme-dark .list-block input[type=\"password\"], .list-block.theme-dark input[type=\"password\"], .theme-dark .list-block input[type=\"email\"], .list-block.theme-dark input[type=\"email\"], .theme-dark .list-block input[type=\"tel\"], .list-block.theme-dark input[type=\"tel\"], .theme-dark .list-block input[type=\"url\"], .list-block.theme-dark input[type=\"url\"], .theme-dark .list-block input[type=\"date\"], .list-block.theme-dark input[type=\"date\"], .theme-dark .list-block input[type=\"datetime-local\"], .list-block.theme-dark input[type=\"datetime-local\"], .theme-dark .list-block input[type=\"number\"], .list-block.theme-dark input[type=\"number\"], .theme-dark .list-block select, .list-block.theme-dark select, .theme-dark .list-block textarea, .list-block.theme-dark textarea {\n    color: #fff;\n}\n\n.theme-dark .label-switch .checkbox {\n    background-color: #393939;\n}\n\n.theme-dark .label-switch .checkbox:before {\n    background-color: #1c1d1f;\n}\n\n.theme-dark .range-slider input[type=\"range\"]:after {\n    background: #1c1d1f;\n}\n\n.theme-dark .buttons-tab {\n    background: #131313;\n}\n\n.theme-dark .buttons-tab .tab-link:not(.active) {\n    color: #ddd;\n}\n\n\n/* === White layout === */\n\n.theme-white .navbar, .navbar.theme-white, .theme-white .subnavbar, .subnavbar.theme-white {\n    background-color: #fff;\n    color: #000;\n}\n\n.theme-white .navbar:after, .navbar.theme-white:after, .theme-white .subnavbar:after, .subnavbar.theme-white:after {\n    background-color: #ddd;\n}\n\n.theme-white .toolbar, .toolbar.theme-white {\n    background-color: #fff;\n    color: #000;\n}\n\n.theme-white .toolbar:before, .toolbar.theme-white:before {\n    background-color: #ddd;\n}\n\n.theme-white .picker-modal.picker-modal-inline .picker-center-highlight:before {\n    background-color: #ddd;\n}\n\n.theme-white .picker-modal.picker-modal-inline .picker-center-highlight:after {\n    background-color: #ddd;\n}\n\n.theme-white .picker-modal.picker-modal-inline .picker-calendar-week-days:after, .theme-white .picker-modal.picker-modal-inline .picker-calendar-row:after {\n    background-color: #ddd;\n}\n\n.theme-white .picker-modal.picker-modal-inline .toolbar~.picker-modal-inner .picker-calendar-months:before, .theme-white .picker-modal.picker-modal-inline .picker-calendar-week-days~.picker-calendar-months:before {\n    background-color: #ddd;\n}\n\n.theme-white .photo-browser .navbar, .photo-browser.theme-white .navbar, .theme-white .view[data-page=\"photo-browser-slides\"] .navbar, .view[data-page=\"photo-browser-slides\"].theme-white .navbar, .theme-white .photo-browser .toolbar, .photo-browser.theme-white .toolbar, .theme-white .view[data-page=\"photo-browser-slides\"] .toolbar, .view[data-page=\"photo-browser-slides\"].theme-white .toolbar {\n    background: rgba(255, 255, 255, 0.95);\n}\n\n.theme-white .tabbar a:not(.active) {\n    color: #777;\n}\n\n.theme-white .page, .theme-white .login-screen-content, .page.theme-white, .theme-white .panel, .panel.theme-white {\n    background-color: #fff;\n    color: #000;\n}\n\n.theme-white .content-block-title {\n    color: #777;\n}\n\n.theme-white .content-block, .content-block.theme-white {\n    color: #777;\n}\n\n.theme-white .content-block-inner {\n    background: #fafafa;\n    color: #000;\n}\n\n.theme-white .content-block-inner:after {\n    background-color: #ddd;\n}\n\n.theme-white .content-block-inner:before {\n    background-color: #ddd;\n}\n\n.theme-white .list-block ul, .list-block.theme-white ul {\n    background: #fff;\n}\n\n.theme-white .list-block ul:after, .list-block.theme-white ul:after {\n    background-color: #ddd;\n}\n\n.theme-white .list-block ul:before, .list-block.theme-white ul:before {\n    background-color: #ddd;\n}\n\n.theme-white .list-block.inset ul, .list-block.theme-white.inset ul {\n    background: #fafafa;\n}\n\n.theme-white .list-block.notifications>ul, .list-block.theme-white.notifications>ul {\n    background: none;\n}\n\n.theme-white li.sorting {\n    background-color: #eee;\n}\n\n.theme-white .swipeout-actions-left a, .theme-white .swipeout-actions-right a {\n    background-color: #c7c7cc;\n}\n\n.theme-white .item-inner, .theme-white .list-block ul ul li:last-child .item-inner {\n    border-color: #ddd;\n}\n\n.theme-white .item-inner:after, .theme-white .list-block ul ul li:last-child .item-inner:after {\n    background-color: #ddd;\n}\n\n.theme-white .item-after {\n    color: #8e8e93;\n}\n\nhtml:not(.watch-active-state) .theme-white .item-link:active, html:not(.watch-active-state) .theme-white label.label-checkbox:active, html:not(.watch-active-state) .theme-white label.label-radio:active, .theme-white .item-link.active-state, .theme-white label.label-checkbox.active-state, .theme-white label.label-radio.active-state {\n    background-color: #eee;\n}\n\n.theme-white .item-link.list-button:after {\n    background-color: #ddd;\n}\n\n.theme-white .list-block-label {\n    color: #777;\n}\n\n.theme-white .item-divider, .theme-white .list-group-title {\n    background: #f7f7f7;\n    color: #777;\n}\n\n.theme-white .item-divider:before, .theme-white .list-group-title:before {\n    background-color: #ddd;\n}\n\n.theme-white .searchbar {\n    background: #c9c9ce;\n}\n\n.theme-white .searchbar:after {\n    background-color: #b4b4b4;\n}\n\n.theme-white .list-block input[type=\"text\"], .list-block.theme-white input[type=\"text\"], .theme-white .list-block input[type=\"password\"], .list-block.theme-white input[type=\"password\"], .theme-white .list-block input[type=\"email\"], .list-block.theme-white input[type=\"email\"], .theme-white .list-block input[type=\"tel\"], .list-block.theme-white input[type=\"tel\"], .theme-white .list-block input[type=\"url\"], .list-block.theme-white input[type=\"url\"], .theme-white .list-block input[type=\"date\"], .list-block.theme-white input[type=\"date\"], .theme-white .list-block input[type=\"datetime-local\"], .list-block.theme-white input[type=\"datetime-local\"], .theme-white .list-block input[type=\"number\"], .list-block.theme-white input[type=\"number\"], .theme-white .list-block select, .list-block.theme-white select, .theme-white .list-block textarea, .list-block.theme-white textarea {\n    color: #777;\n}\n\n.theme-white .label-switch .checkbox {\n    background-color: #e5e5e5;\n}\n\n.theme-white .label-switch .checkbox:before {\n    background-color: #fff;\n}\n\n.theme-white .range-slider input[type=\"range\"]:after {\n    background: #fff;\n}\n", ""]);

	// exports


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "./font.woff";

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "./font.ttf";

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "./font.svg";

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(60);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(58)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/.0.23.1@css-loader/index.js!./common.css", function() {
				var newContent = require("!!./../../node_modules/.0.23.1@css-loader/index.js!./common.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, "/* http://meyerweb.com/eric/tools/css/reset/\n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}\nbody{\n\tfont-family:\"Comic Sans MS\",\"\\5E7C\\5706\",\"\\9ED1\\4F53\",sans-serif;\n}\n", ""]);

	// exports


/***/ }
/******/ ]);
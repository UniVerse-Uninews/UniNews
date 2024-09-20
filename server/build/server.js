"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/fastify-plugin/lib/getPluginName.js
var require_getPluginName = __commonJS({
  "node_modules/fastify-plugin/lib/getPluginName.js"(exports2, module2) {
    "use strict";
    var fpStackTracePattern = /at\s{1}(?:.*\.)?plugin\s{1}.*\n\s*(.*)/;
    var fileNamePattern = /(\w*(\.\w*)*)\..*/;
    module2.exports = function getPluginName(fn) {
      if (fn.name.length > 0)
        return fn.name;
      const stackTraceLimit = Error.stackTraceLimit;
      Error.stackTraceLimit = 10;
      try {
        throw new Error("anonymous function");
      } catch (e) {
        Error.stackTraceLimit = stackTraceLimit;
        return extractPluginName(e.stack);
      }
    };
    function extractPluginName(stack) {
      const m = stack.match(fpStackTracePattern);
      return m ? m[1].split(/[/\\]/).slice(-1)[0].match(fileNamePattern)[1] : "anonymous";
    }
    module2.exports.extractPluginName = extractPluginName;
  }
});

// node_modules/fastify-plugin/lib/toCamelCase.js
var require_toCamelCase = __commonJS({
  "node_modules/fastify-plugin/lib/toCamelCase.js"(exports2, module2) {
    "use strict";
    module2.exports = function toCamelCase(name) {
      if (name[0] === "@") {
        name = name.slice(1).replace("/", "-");
      }
      const newName = name.replace(/-(.)/g, function(match, g1) {
        return g1.toUpperCase();
      });
      return newName;
    };
  }
});

// node_modules/fastify-plugin/plugin.js
var require_plugin = __commonJS({
  "node_modules/fastify-plugin/plugin.js"(exports2, module2) {
    "use strict";
    var getPluginName = require_getPluginName();
    var toCamelCase = require_toCamelCase();
    var count = 0;
    function plugin(fn, options = {}) {
      let autoName = false;
      if (typeof fn.default !== "undefined") {
        fn = fn.default;
      }
      if (typeof fn !== "function") {
        throw new TypeError(
          `fastify-plugin expects a function, instead got a '${typeof fn}'`
        );
      }
      if (typeof options === "string") {
        options = {
          fastify: options
        };
      }
      if (typeof options !== "object" || Array.isArray(options) || options === null) {
        throw new TypeError("The options object should be an object");
      }
      if (options.fastify !== void 0 && typeof options.fastify !== "string") {
        throw new TypeError(`fastify-plugin expects a version string, instead got '${typeof options.fastify}'`);
      }
      if (!options.name) {
        autoName = true;
        options.name = getPluginName(fn) + "-auto-" + count++;
      }
      fn[Symbol.for("skip-override")] = options.encapsulate !== true;
      fn[Symbol.for("fastify.display-name")] = options.name;
      fn[Symbol.for("plugin-meta")] = options;
      if (!fn.default) {
        fn.default = fn;
      }
      const camelCase = toCamelCase(options.name);
      if (!autoName && !fn[camelCase]) {
        fn[camelCase] = fn;
      }
      return fn;
    }
    module2.exports = plugin;
    module2.exports.default = plugin;
    module2.exports.fastifyPlugin = plugin;
  }
});

// node_modules/obliterator/iterator.js
var require_iterator = __commonJS({
  "node_modules/obliterator/iterator.js"(exports2, module2) {
    "use strict";
    function Iterator(next) {
      if (typeof next !== "function")
        throw new Error("obliterator/iterator: expecting a function!");
      this.next = next;
    }
    if (typeof Symbol !== "undefined")
      Iterator.prototype[Symbol.iterator] = function() {
        return this;
      };
    Iterator.of = function() {
      var args = arguments, l = args.length, i = 0;
      return new Iterator(function() {
        if (i >= l)
          return { done: true };
        return { done: false, value: args[i++] };
      });
    };
    Iterator.empty = function() {
      var iterator = new Iterator(function() {
        return { done: true };
      });
      return iterator;
    };
    Iterator.fromSequence = function(sequence) {
      var i = 0, l = sequence.length;
      return new Iterator(function() {
        if (i >= l)
          return { done: true };
        return { done: false, value: sequence[i++] };
      });
    };
    Iterator.is = function(value) {
      if (value instanceof Iterator)
        return true;
      return typeof value === "object" && value !== null && typeof value.next === "function";
    };
    module2.exports = Iterator;
  }
});

// node_modules/obliterator/support.js
var require_support = __commonJS({
  "node_modules/obliterator/support.js"(exports2) {
    "use strict";
    exports2.ARRAY_BUFFER_SUPPORT = typeof ArrayBuffer !== "undefined";
    exports2.SYMBOL_SUPPORT = typeof Symbol !== "undefined";
  }
});

// node_modules/obliterator/foreach.js
var require_foreach = __commonJS({
  "node_modules/obliterator/foreach.js"(exports2, module2) {
    "use strict";
    var support = require_support();
    var ARRAY_BUFFER_SUPPORT = support.ARRAY_BUFFER_SUPPORT;
    var SYMBOL_SUPPORT = support.SYMBOL_SUPPORT;
    module2.exports = function forEach(iterable, callback) {
      var iterator, k, i, l, s;
      if (!iterable)
        throw new Error("obliterator/forEach: invalid iterable.");
      if (typeof callback !== "function")
        throw new Error("obliterator/forEach: expecting a callback.");
      if (Array.isArray(iterable) || ARRAY_BUFFER_SUPPORT && ArrayBuffer.isView(iterable) || typeof iterable === "string" || iterable.toString() === "[object Arguments]") {
        for (i = 0, l = iterable.length; i < l; i++)
          callback(iterable[i], i);
        return;
      }
      if (typeof iterable.forEach === "function") {
        iterable.forEach(callback);
        return;
      }
      if (SYMBOL_SUPPORT && Symbol.iterator in iterable && typeof iterable.next !== "function") {
        iterable = iterable[Symbol.iterator]();
      }
      if (typeof iterable.next === "function") {
        iterator = iterable;
        i = 0;
        while (s = iterator.next(), s.done !== true) {
          callback(s.value, i);
          i++;
        }
        return;
      }
      for (k in iterable) {
        if (iterable.hasOwnProperty(k)) {
          callback(iterable[k], k);
        }
      }
      return;
    };
  }
});

// node_modules/mnemonist/utils/typed-arrays.js
var require_typed_arrays = __commonJS({
  "node_modules/mnemonist/utils/typed-arrays.js"(exports2) {
    "use strict";
    var MAX_8BIT_INTEGER = Math.pow(2, 8) - 1;
    var MAX_16BIT_INTEGER = Math.pow(2, 16) - 1;
    var MAX_32BIT_INTEGER = Math.pow(2, 32) - 1;
    var MAX_SIGNED_8BIT_INTEGER = Math.pow(2, 7) - 1;
    var MAX_SIGNED_16BIT_INTEGER = Math.pow(2, 15) - 1;
    var MAX_SIGNED_32BIT_INTEGER = Math.pow(2, 31) - 1;
    exports2.getPointerArray = function(size) {
      var maxIndex = size - 1;
      if (maxIndex <= MAX_8BIT_INTEGER)
        return Uint8Array;
      if (maxIndex <= MAX_16BIT_INTEGER)
        return Uint16Array;
      if (maxIndex <= MAX_32BIT_INTEGER)
        return Uint32Array;
      throw new Error("mnemonist: Pointer Array of size > 4294967295 is not supported.");
    };
    exports2.getSignedPointerArray = function(size) {
      var maxIndex = size - 1;
      if (maxIndex <= MAX_SIGNED_8BIT_INTEGER)
        return Int8Array;
      if (maxIndex <= MAX_SIGNED_16BIT_INTEGER)
        return Int16Array;
      if (maxIndex <= MAX_SIGNED_32BIT_INTEGER)
        return Int32Array;
      return Float64Array;
    };
    exports2.getNumberType = function(value) {
      if (value === (value | 0)) {
        if (Math.sign(value) === -1) {
          if (value <= 127 && value >= -128)
            return Int8Array;
          if (value <= 32767 && value >= -32768)
            return Int16Array;
          return Int32Array;
        } else {
          if (value <= 255)
            return Uint8Array;
          if (value <= 65535)
            return Uint16Array;
          return Uint32Array;
        }
      }
      return Float64Array;
    };
    var TYPE_PRIORITY = {
      Uint8Array: 1,
      Int8Array: 2,
      Uint16Array: 3,
      Int16Array: 4,
      Uint32Array: 5,
      Int32Array: 6,
      Float32Array: 7,
      Float64Array: 8
    };
    exports2.getMinimalRepresentation = function(array, getter) {
      var maxType = null, maxPriority = 0, p, t, v, i, l;
      for (i = 0, l = array.length; i < l; i++) {
        v = getter ? getter(array[i]) : array[i];
        t = exports2.getNumberType(v);
        p = TYPE_PRIORITY[t.name];
        if (p > maxPriority) {
          maxPriority = p;
          maxType = t;
        }
      }
      return maxType;
    };
    exports2.isTypedArray = function(value) {
      return typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView(value);
    };
    exports2.concat = function() {
      var length = 0, i, o, l;
      for (i = 0, l = arguments.length; i < l; i++)
        length += arguments[i].length;
      var array = new arguments[0].constructor(length);
      for (i = 0, o = 0; i < l; i++) {
        array.set(arguments[i], o);
        o += arguments[i].length;
      }
      return array;
    };
    exports2.indices = function(length) {
      var PointerArray = exports2.getPointerArray(length);
      var array = new PointerArray(length);
      for (var i = 0; i < length; i++)
        array[i] = i;
      return array;
    };
  }
});

// node_modules/mnemonist/utils/iterables.js
var require_iterables = __commonJS({
  "node_modules/mnemonist/utils/iterables.js"(exports2) {
    "use strict";
    var forEach = require_foreach();
    var typed = require_typed_arrays();
    function isArrayLike(target) {
      return Array.isArray(target) || typed.isTypedArray(target);
    }
    function guessLength(target) {
      if (typeof target.length === "number")
        return target.length;
      if (typeof target.size === "number")
        return target.size;
      return;
    }
    function toArray(target) {
      var l = guessLength(target);
      var array = typeof l === "number" ? new Array(l) : [];
      var i = 0;
      forEach(target, function(value) {
        array[i++] = value;
      });
      return array;
    }
    function toArrayWithIndices(target) {
      var l = guessLength(target);
      var IndexArray = typeof l === "number" ? typed.getPointerArray(l) : Array;
      var array = typeof l === "number" ? new Array(l) : [];
      var indices = typeof l === "number" ? new IndexArray(l) : [];
      var i = 0;
      forEach(target, function(value) {
        array[i] = value;
        indices[i] = i++;
      });
      return [array, indices];
    }
    exports2.isArrayLike = isArrayLike;
    exports2.guessLength = guessLength;
    exports2.toArray = toArray;
    exports2.toArrayWithIndices = toArrayWithIndices;
  }
});

// node_modules/mnemonist/lru-cache.js
var require_lru_cache = __commonJS({
  "node_modules/mnemonist/lru-cache.js"(exports2, module2) {
    "use strict";
    var Iterator = require_iterator();
    var forEach = require_foreach();
    var typed = require_typed_arrays();
    var iterables = require_iterables();
    function LRUCache(Keys, Values, capacity) {
      if (arguments.length < 2) {
        capacity = Keys;
        Keys = null;
        Values = null;
      }
      this.capacity = capacity;
      if (typeof this.capacity !== "number" || this.capacity <= 0)
        throw new Error("mnemonist/lru-cache: capacity should be positive number.");
      else if (!isFinite(this.capacity) || Math.floor(this.capacity) !== this.capacity)
        throw new Error("mnemonist/lru-cache: capacity should be a finite positive integer.");
      var PointerArray = typed.getPointerArray(capacity);
      this.forward = new PointerArray(capacity);
      this.backward = new PointerArray(capacity);
      this.K = typeof Keys === "function" ? new Keys(capacity) : new Array(capacity);
      this.V = typeof Values === "function" ? new Values(capacity) : new Array(capacity);
      this.size = 0;
      this.head = 0;
      this.tail = 0;
      this.items = {};
    }
    LRUCache.prototype.clear = function() {
      this.size = 0;
      this.head = 0;
      this.tail = 0;
      this.items = {};
    };
    LRUCache.prototype.splayOnTop = function(pointer) {
      var oldHead = this.head;
      if (this.head === pointer)
        return this;
      var previous = this.backward[pointer], next = this.forward[pointer];
      if (this.tail === pointer) {
        this.tail = previous;
      } else {
        this.backward[next] = previous;
      }
      this.forward[previous] = next;
      this.backward[oldHead] = pointer;
      this.head = pointer;
      this.forward[pointer] = oldHead;
      return this;
    };
    LRUCache.prototype.set = function(key, value) {
      var pointer = this.items[key];
      if (typeof pointer !== "undefined") {
        this.splayOnTop(pointer);
        this.V[pointer] = value;
        return;
      }
      if (this.size < this.capacity) {
        pointer = this.size++;
      } else {
        pointer = this.tail;
        this.tail = this.backward[pointer];
        delete this.items[this.K[pointer]];
      }
      this.items[key] = pointer;
      this.K[pointer] = key;
      this.V[pointer] = value;
      this.forward[pointer] = this.head;
      this.backward[this.head] = pointer;
      this.head = pointer;
    };
    LRUCache.prototype.setpop = function(key, value) {
      var oldValue = null;
      var oldKey = null;
      var pointer = this.items[key];
      if (typeof pointer !== "undefined") {
        this.splayOnTop(pointer);
        oldValue = this.V[pointer];
        this.V[pointer] = value;
        return { evicted: false, key, value: oldValue };
      }
      if (this.size < this.capacity) {
        pointer = this.size++;
      } else {
        pointer = this.tail;
        this.tail = this.backward[pointer];
        oldValue = this.V[pointer];
        oldKey = this.K[pointer];
        delete this.items[this.K[pointer]];
      }
      this.items[key] = pointer;
      this.K[pointer] = key;
      this.V[pointer] = value;
      this.forward[pointer] = this.head;
      this.backward[this.head] = pointer;
      this.head = pointer;
      if (oldKey) {
        return { evicted: true, key: oldKey, value: oldValue };
      } else {
        return null;
      }
    };
    LRUCache.prototype.has = function(key) {
      return key in this.items;
    };
    LRUCache.prototype.get = function(key) {
      var pointer = this.items[key];
      if (typeof pointer === "undefined")
        return;
      this.splayOnTop(pointer);
      return this.V[pointer];
    };
    LRUCache.prototype.peek = function(key) {
      var pointer = this.items[key];
      if (typeof pointer === "undefined")
        return;
      return this.V[pointer];
    };
    LRUCache.prototype.forEach = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      var i = 0, l = this.size;
      var pointer = this.head, keys = this.K, values = this.V, forward = this.forward;
      while (i < l) {
        callback.call(scope, values[pointer], keys[pointer], this);
        pointer = forward[pointer];
        i++;
      }
    };
    LRUCache.prototype.keys = function() {
      var i = 0, l = this.size;
      var pointer = this.head, keys = this.K, forward = this.forward;
      return new Iterator(function() {
        if (i >= l)
          return { done: true };
        var key = keys[pointer];
        i++;
        if (i < l)
          pointer = forward[pointer];
        return {
          done: false,
          value: key
        };
      });
    };
    LRUCache.prototype.values = function() {
      var i = 0, l = this.size;
      var pointer = this.head, values = this.V, forward = this.forward;
      return new Iterator(function() {
        if (i >= l)
          return { done: true };
        var value = values[pointer];
        i++;
        if (i < l)
          pointer = forward[pointer];
        return {
          done: false,
          value
        };
      });
    };
    LRUCache.prototype.entries = function() {
      var i = 0, l = this.size;
      var pointer = this.head, keys = this.K, values = this.V, forward = this.forward;
      return new Iterator(function() {
        if (i >= l)
          return { done: true };
        var key = keys[pointer], value = values[pointer];
        i++;
        if (i < l)
          pointer = forward[pointer];
        return {
          done: false,
          value: [key, value]
        };
      });
    };
    if (typeof Symbol !== "undefined")
      LRUCache.prototype[Symbol.iterator] = LRUCache.prototype.entries;
    LRUCache.prototype.inspect = function() {
      var proxy = /* @__PURE__ */ new Map();
      var iterator = this.entries(), step;
      while (step = iterator.next(), !step.done)
        proxy.set(step.value[0], step.value[1]);
      Object.defineProperty(proxy, "constructor", {
        value: LRUCache,
        enumerable: false
      });
      return proxy;
    };
    if (typeof Symbol !== "undefined")
      LRUCache.prototype[Symbol.for("nodejs.util.inspect.custom")] = LRUCache.prototype.inspect;
    LRUCache.from = function(iterable, Keys, Values, capacity) {
      if (arguments.length < 2) {
        capacity = iterables.guessLength(iterable);
        if (typeof capacity !== "number")
          throw new Error("mnemonist/lru-cache.from: could not guess iterable length. Please provide desired capacity as last argument.");
      } else if (arguments.length === 2) {
        capacity = Keys;
        Keys = null;
        Values = null;
      }
      var cache = new LRUCache(Keys, Values, capacity);
      forEach(iterable, function(value, key) {
        cache.set(key, value);
      });
      return cache;
    };
    module2.exports = LRUCache;
  }
});

// node_modules/@fastify/cors/vary.js
var require_vary = __commonJS({
  "node_modules/@fastify/cors/vary.js"(exports2, module2) {
    "use strict";
    var LRUCache = require_lru_cache();
    var validFieldnameRE = /^[!#$%&'*+\-.^\w`|~]+$/u;
    function validateFieldname(fieldname) {
      if (validFieldnameRE.test(fieldname) === false) {
        throw new TypeError("Fieldname contains invalid characters.");
      }
    }
    function parse2(header) {
      header = header.trim().toLowerCase();
      const result = [];
      if (header.length === 0) {
      } else if (header.indexOf(",") === -1) {
        result.push(header);
      } else {
        const il = header.length;
        let i = 0;
        let pos = 0;
        let char;
        for (i = 0; i < il; ++i) {
          char = header[i];
          if (char === " ") {
            pos = i + 1;
          } else if (char === ",") {
            if (pos !== i) {
              result.push(header.slice(pos, i));
            }
            pos = i + 1;
          }
        }
        if (pos !== i) {
          result.push(header.slice(pos, i));
        }
      }
      return result;
    }
    function createAddFieldnameToVary(fieldname) {
      const headerCache = new LRUCache(1e3);
      validateFieldname(fieldname);
      return function(reply) {
        let header = reply.getHeader("Vary");
        if (!header) {
          reply.header("Vary", fieldname);
          return;
        }
        if (header === "*") {
          return;
        }
        if (fieldname === "*") {
          reply.header("Vary", "*");
          return;
        }
        if (Array.isArray(header)) {
          header = header.join(", ");
        }
        if (!headerCache.has(header)) {
          const vals = parse2(header);
          if (vals.indexOf("*") !== -1) {
            headerCache.set(header, "*");
          } else if (vals.indexOf(fieldname.toLowerCase()) === -1) {
            headerCache.set(header, header + ", " + fieldname);
          } else {
            headerCache.set(header, null);
          }
        }
        const cached = headerCache.get(header);
        if (cached !== null) {
          reply.header("Vary", cached);
        }
      };
    }
    module2.exports.createAddFieldnameToVary = createAddFieldnameToVary;
    module2.exports.addOriginToVaryHeader = createAddFieldnameToVary("Origin");
    module2.exports.addAccessControlRequestHeadersToVaryHeader = createAddFieldnameToVary("Access-Control-Request-Headers");
    module2.exports.parse = parse2;
  }
});

// node_modules/@fastify/cors/index.js
var require_cors = __commonJS({
  "node_modules/@fastify/cors/index.js"(exports2, module2) {
    "use strict";
    var fp = require_plugin();
    var {
      addAccessControlRequestHeadersToVaryHeader,
      addOriginToVaryHeader
    } = require_vary();
    var defaultOptions = {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      hook: "onRequest",
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: false,
      exposedHeaders: null,
      allowedHeaders: null,
      maxAge: null,
      preflight: true,
      strictPreflight: true
    };
    var validHooks = [
      "onRequest",
      "preParsing",
      "preValidation",
      "preHandler",
      "preSerialization",
      "onSend"
    ];
    var hookWithPayload = [
      "preSerialization",
      "preParsing",
      "onSend"
    ];
    function validateHook(value, next) {
      if (validHooks.indexOf(value) !== -1) {
        return;
      }
      next(new TypeError("@fastify/cors: Invalid hook option provided."));
    }
    function fastifyCors(fastify2, opts, next) {
      fastify2.decorateRequest("corsPreflightEnabled", false);
      let hideOptionsRoute = true;
      if (typeof opts === "function") {
        handleCorsOptionsDelegator(opts, fastify2, { hook: defaultOptions.hook }, next);
      } else if (opts.delegator) {
        const { delegator, ...options } = opts;
        handleCorsOptionsDelegator(delegator, fastify2, options, next);
      } else {
        if (opts.hideOptionsRoute !== void 0)
          hideOptionsRoute = opts.hideOptionsRoute;
        const corsOptions = normalizeCorsOptions(opts);
        validateHook(corsOptions.hook, next);
        if (hookWithPayload.indexOf(corsOptions.hook) !== -1) {
          fastify2.addHook(corsOptions.hook, function handleCors(req, reply, payload, next2) {
            addCorsHeadersHandler(fastify2, corsOptions, req, reply, next2);
          });
        } else {
          fastify2.addHook(corsOptions.hook, function handleCors(req, reply, next2) {
            addCorsHeadersHandler(fastify2, corsOptions, req, reply, next2);
          });
        }
      }
      fastify2.options("*", { schema: { hide: hideOptionsRoute } }, (req, reply) => {
        if (!req.corsPreflightEnabled) {
          reply.callNotFound();
          return;
        }
        reply.send();
      });
      next();
    }
    function handleCorsOptionsDelegator(optionsResolver, fastify2, opts, next) {
      const hook = opts && opts.hook || defaultOptions.hook;
      validateHook(hook, next);
      if (optionsResolver.length === 2) {
        if (hookWithPayload.indexOf(hook) !== -1) {
          fastify2.addHook(hook, function handleCors(req, reply, payload, next2) {
            handleCorsOptionsCallbackDelegator(optionsResolver, fastify2, req, reply, next2);
          });
        } else {
          fastify2.addHook(hook, function handleCors(req, reply, next2) {
            handleCorsOptionsCallbackDelegator(optionsResolver, fastify2, req, reply, next2);
          });
        }
      } else {
        if (hookWithPayload.indexOf(hook) !== -1) {
          fastify2.addHook(hook, function handleCors(req, reply, payload, next2) {
            const ret = optionsResolver(req);
            if (ret && typeof ret.then === "function") {
              ret.then((options) => addCorsHeadersHandler(fastify2, normalizeCorsOptions(options, true), req, reply, next2)).catch(next2);
              return;
            }
            next2(new Error("Invalid CORS origin option"));
          });
        } else {
          fastify2.addHook(hook, function handleCors(req, reply, next2) {
            const ret = optionsResolver(req);
            if (ret && typeof ret.then === "function") {
              ret.then((options) => addCorsHeadersHandler(fastify2, normalizeCorsOptions(options, true), req, reply, next2)).catch(next2);
              return;
            }
            next2(new Error("Invalid CORS origin option"));
          });
        }
      }
    }
    function handleCorsOptionsCallbackDelegator(optionsResolver, fastify2, req, reply, next) {
      optionsResolver(req, (err, options) => {
        if (err) {
          next(err);
        } else {
          addCorsHeadersHandler(fastify2, normalizeCorsOptions(options, true), req, reply, next);
        }
      });
    }
    function normalizeCorsOptions(opts, dynamic) {
      const corsOptions = { ...defaultOptions, ...opts };
      if (Array.isArray(opts.origin) && opts.origin.indexOf("*") !== -1) {
        corsOptions.origin = "*";
      }
      if (Number.isInteger(corsOptions.cacheControl)) {
        corsOptions.cacheControl = `max-age=${corsOptions.cacheControl}`;
      } else if (typeof corsOptions.cacheControl !== "string") {
        corsOptions.cacheControl = null;
      }
      corsOptions.dynamic = dynamic || false;
      return corsOptions;
    }
    function addCorsHeadersHandler(fastify2, options, req, reply, next) {
      if (typeof options.origin !== "string" && options.origin !== false || options.dynamic) {
        addOriginToVaryHeader(reply);
      }
      const resolveOriginOption = typeof options.origin === "function" ? resolveOriginWrapper(fastify2, options.origin) : (_, cb) => cb(null, options.origin);
      resolveOriginOption(req, (error, resolvedOriginOption) => {
        if (error !== null) {
          return next(error);
        }
        if (resolvedOriginOption === false) {
          return next();
        }
        if (!resolvedOriginOption) {
          return next(new Error("Invalid CORS origin option"));
        }
        addCorsHeaders(req, reply, resolvedOriginOption, options);
        if (req.raw.method === "OPTIONS" && options.preflight === true) {
          if (options.strictPreflight === true && (!req.headers.origin || !req.headers["access-control-request-method"])) {
            reply.status(400).type("text/plain").send("Invalid Preflight Request");
            return;
          }
          req.corsPreflightEnabled = true;
          addPreflightHeaders(req, reply, options);
          if (!options.preflightContinue) {
            reply.code(options.optionsSuccessStatus).header("Content-Length", "0").send();
            return;
          }
        }
        return next();
      });
    }
    function addCorsHeaders(req, reply, originOption, corsOptions) {
      const origin = getAccessControlAllowOriginHeader(req.headers.origin, originOption);
      if (origin) {
        reply.header("Access-Control-Allow-Origin", origin);
      }
      if (corsOptions.credentials) {
        reply.header("Access-Control-Allow-Credentials", "true");
      }
      if (corsOptions.exposedHeaders !== null) {
        reply.header(
          "Access-Control-Expose-Headers",
          Array.isArray(corsOptions.exposedHeaders) ? corsOptions.exposedHeaders.join(", ") : corsOptions.exposedHeaders
        );
      }
    }
    function addPreflightHeaders(req, reply, corsOptions) {
      reply.header(
        "Access-Control-Allow-Methods",
        Array.isArray(corsOptions.methods) ? corsOptions.methods.join(", ") : corsOptions.methods
      );
      if (corsOptions.allowedHeaders === null) {
        addAccessControlRequestHeadersToVaryHeader(reply);
        const reqAllowedHeaders = req.headers["access-control-request-headers"];
        if (reqAllowedHeaders !== void 0) {
          reply.header("Access-Control-Allow-Headers", reqAllowedHeaders);
        }
      } else {
        reply.header(
          "Access-Control-Allow-Headers",
          Array.isArray(corsOptions.allowedHeaders) ? corsOptions.allowedHeaders.join(", ") : corsOptions.allowedHeaders
        );
      }
      if (corsOptions.maxAge !== null) {
        reply.header("Access-Control-Max-Age", String(corsOptions.maxAge));
      }
      if (corsOptions.cacheControl) {
        reply.header("Cache-Control", corsOptions.cacheControl);
      }
    }
    function resolveOriginWrapper(fastify2, origin) {
      return function(req, cb) {
        const result = origin.call(fastify2, req.headers.origin, cb);
        if (result && typeof result.then === "function") {
          result.then((res) => cb(null, res), cb);
        }
      };
    }
    function getAccessControlAllowOriginHeader(reqOrigin, originOption) {
      if (typeof originOption === "string") {
        return originOption;
      }
      return isRequestOriginAllowed(reqOrigin, originOption) ? reqOrigin : false;
    }
    function isRequestOriginAllowed(reqOrigin, allowedOrigin) {
      if (Array.isArray(allowedOrigin)) {
        for (let i = 0; i < allowedOrigin.length; ++i) {
          if (isRequestOriginAllowed(reqOrigin, allowedOrigin[i])) {
            return true;
          }
        }
        return false;
      } else if (typeof allowedOrigin === "string") {
        return reqOrigin === allowedOrigin;
      } else if (allowedOrigin instanceof RegExp) {
        allowedOrigin.lastIndex = 0;
        return allowedOrigin.test(reqOrigin);
      } else {
        return !!allowedOrigin;
      }
    }
    var _fastifyCors = fp(fastifyCors, {
      fastify: "4.x",
      name: "@fastify/cors"
    });
    module2.exports = _fastifyCors;
    module2.exports.fastifyCors = _fastifyCors;
    module2.exports.default = _fastifyCors;
  }
});

// src/app.ts
var import_fastify = __toESM(require("fastify"));

// src/http/controllers/user/register.ts
var import_client2 = require("@prisma/client");
var import_zod = require("zod");

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: process.env.NODE_ENV === "dev" ? ["query", "info", "warn", "error"] : []
});

// src/repositories/prisma/prisma-users-repository.ts
var PrismaUsersRepository = class {
  async findById(id) {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    });
    return user;
  }
  async findByEmail(email) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });
    return user;
  }
  async create(data) {
    const user = await prisma.user.create({
      data
    });
    return user;
  }
  async findAll() {
    const allUsers = await prisma.user.findMany();
    return allUsers;
  }
  async deleteUser(id) {
    const user = await prisma.user.delete({
      where: {
        id
      }
    });
    return user;
  }
  async updateUser(id, data) {
    const user = await prisma.user.update({
      where: { id },
      data: {
        ...data,
        updatedAt: /* @__PURE__ */ new Date()
      }
    });
    return user;
  }
  async createPasswordResetToken(userId, token, expiresAt) {
    const passwordReset = await prisma.passwordReset.create({
      data: {
        userId,
        token,
        expiresAt
      }
    });
    return passwordReset;
  }
  async findPasswordResetByToken(token) {
    const passwordReset = await prisma.passwordReset.findUnique({
      where: {
        token
      }
    });
    return passwordReset;
  }
  async deletePasswordResetToken(token) {
    const passwordReset = await prisma.passwordReset.delete({
      where: {
        token
      }
    });
    return passwordReset;
  }
  async updatePassword(userId, hashedPassword) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        passwordHash: hashedPassword,
        updatedAt: /* @__PURE__ */ new Date()
      }
    });
    return user;
  }
};

// src/services/users/register.ts
var import_bcryptjs = require("bcryptjs");

// src/services/errors/user-already-exist-error.ts
var UserAlreadyExistError = class extends Error {
  constructor() {
    super("E-mail already exist");
  }
};

// src/services/users/register.ts
var RegisterUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({
    name,
    email,
    passwordHash,
    desactivated
  }) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw new UserAlreadyExistError();
    }
    const passwordHashed = await (0, import_bcryptjs.hash)(passwordHash, 6);
    const user = await this.usersRepository.create({
      name,
      email,
      passwordHash: passwordHashed,
      desactivated
    });
    console.log(user);
    return {
      user
    };
  }
};

// src/services/factories/make-register-use-case.ts
function makeRegisterUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUseCase(prismaUsersRepository);
  return registerUseCase;
}

// src/http/controllers/user/register.ts
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var prisma2 = new import_client2.PrismaClient();
async function register(request, reply) {
  const registerBodySchema = import_zod.z.object({
    name: import_zod.z.string(),
    email: import_zod.z.string().email(),
    passwordHash: import_zod.z.string().min(6),
    desactivated: import_zod.z.boolean().default(false),
    role: import_zod.z.enum(["ADMIN", "USER"]).default("USER")
  });
  console.log(request.body);
  try {
    const { name, email, passwordHash, desactivated, role } = registerBodySchema.parse(request.body);
    const registerUseCase = makeRegisterUseCase();
    await registerUseCase.execute({ name, email, passwordHash, desactivated, role });
    reply.status(201).send();
  } catch (error) {
    if (error instanceof UserAlreadyExistError) {
      reply.status(409).send({ message: error.message });
    } else {
      console.error("Internal server error:", error);
      reply.status(500).send({ message: "Internal server error" });
    }
  } finally {
    await prisma2.$disconnect();
  }
}

// src/http/controllers/user/authenticate.ts
var import_zod2 = require("zod");

// src/services/errors/invalid-credentials-error.ts
var InvalidCredentialsError = class extends Error {
  constructor() {
    super("invalid credentials");
  }
};

// src/services/users/authenticate.ts
var import_bcryptjs2 = require("bcryptjs");
var AuthenticateUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({
    email,
    password,
    desactivated
  }) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialsError();
    }
    console.log("Retrieved hashed password from database:", user.passwordHash);
    const doesPasswordMatch = await (0, import_bcryptjs2.compare)(password, user.passwordHash);
    const isDesactivated = user.desactivated;
    if (isDesactivated) {
      throw new InvalidCredentialsError();
    }
    console.log("Does password match?", doesPasswordMatch);
    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError();
    }
    return {
      user
    };
  }
};

// src/services/factories/make-authenticate-use-case.ts
function makeAuthenticateUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository);
  return authenticateUseCase;
}

// src/http/controllers/user/authenticate.ts
var import_client3 = require("@prisma/client");
var prisma3 = new import_client3.PrismaClient();
async function authenticate(request, reply) {
  const authenticateBodySchema = import_zod2.z.object({
    email: import_zod2.z.string().email(),
    password: import_zod2.z.string().min(6),
    desactivated: import_zod2.z.boolean().optional()
  });
  try {
    const { email, password, desactivated } = authenticateBodySchema.parse(request.body);
    const authenticateUseCase = makeAuthenticateUseCase();
    const { user } = await authenticateUseCase.execute({ email, password, desactivated });
    const token = await reply.jwtSign(
      {
        role: user.role
      },
      {
        sign: {
          sub: user.id
        }
      }
    );
    const refreshToken = await reply.jwtSign(
      {
        role: user.role
      },
      {
        sign: {
          sub: user.id,
          expiresIn: "7d"
        }
      }
    );
    return reply.setCookie("refreshToken", refreshToken, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: true
    }).status(200).send({
      token,
      role: user.role,
      id: user.id
    });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    } else {
      console.error("Error during authentication:", error);
      return reply.status(500).send({ message: "Internal Server Error" });
    }
  }
}

// src/services/errors/resource-not-found-error.ts
var ResourceNotFoundError = class extends Error {
  constructor() {
    super("Resource Not Found.");
  }
};

// src/services/users/get-user-profile.ts
var GetUserProfileUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({
    userId
  }) {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new ResourceNotFoundError();
    }
    return {
      user
    };
  }
};

// src/http/controllers/user/get-user-profile.ts
async function getUserProfileController(request, reply) {
  const { userId } = request.params;
  try {
    const usersRepository = new PrismaUsersRepository();
    const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository);
    const userProfile = await getUserProfileUseCase.execute({ userId });
    reply.status(200).send(userProfile);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(404).send({ error: "User not found" });
    } else {
      console.error("Error retrieving user profile:", error);
      reply.status(500).send({ error: "Internal Server Error" });
    }
  }
}

// src/http/controllers/user/get-all-users.ts
async function getAllUsersController(request, reply) {
  try {
    const usersRepository = new PrismaUsersRepository();
    const allUsers = await usersRepository.findAll();
    reply.status(200).send(allUsers);
  } catch (error) {
    console.error("Error retrieving all users:", error);
    reply.status(500).send({ error: "Internal Server Error" });
  }
}

// src/services/users/delete-user.ts
var DeleteUserUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({ id }) {
    const user = await this.usersRepository.deleteUser(id);
    return {
      user
    };
  }
};

// src/http/controllers/user/delete-user.ts
async function deleteUser(request, reply) {
  try {
    const usersRepository = new PrismaUsersRepository();
    const deleteUserUseCase = new DeleteUserUseCase(usersRepository);
    const { id } = request.params;
    if (!id) {
      reply.status(400).send({ error: "ID parameter is missing" });
      return;
    }
    const user = await deleteUserUseCase.execute({ id });
    if (!user) {
      reply.status(404).send({ error: "User not found" });
      return;
    }
    reply.status(200).send(user);
  } catch (error) {
    console.error("Error deleting user:", error);
    reply.status(500).send({ error: "Internal Server Error" });
  }
}

// src/http/controllers/user/update-user.ts
var import_zod3 = require("zod");

// src/services/users/update-user.ts
var import_bcryptjs3 = require("bcryptjs");
var UpdateUserUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({
    userId,
    name,
    email,
    passwordHash,
    role
  }) {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new ResourceNotFoundError();
    }
    const dataToUpdate = {};
    if (name)
      dataToUpdate.name = name;
    if (email)
      dataToUpdate.email = email;
    if (passwordHash)
      dataToUpdate.passwordHash = await (0, import_bcryptjs3.hash)(passwordHash, 6);
    if (role !== void 0)
      dataToUpdate.role = role;
    const updatedUser = await this.usersRepository.updateUser(userId, dataToUpdate);
    return {
      user: updatedUser
    };
  }
};

// src/services/factories/make-update-use-case.ts
function makeUpdateUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const updateUserUseCase = new UpdateUserUseCase(prismaUsersRepository);
  return updateUserUseCase;
}

// src/http/controllers/user/update-user.ts
async function updateUser(request, reply) {
  const updateUserBodySchema = import_zod3.z.object({
    name: import_zod3.z.string().optional(),
    email: import_zod3.z.string().email().optional(),
    passwordHash: import_zod3.z.string().min(6).optional(),
    role: import_zod3.z.string().optional()
  });
  const updateUserParamsSchema = import_zod3.z.object({
    userId: import_zod3.z.string()
  });
  try {
    const { name, email, passwordHash, role } = updateUserBodySchema.parse(request.body);
    const { userId } = updateUserParamsSchema.parse(request.params);
    const updateUseCase = makeUpdateUserUseCase();
    const result = await updateUseCase.execute({ userId, name, email, passwordHash });
    reply.status(200).send({ user: result.user });
  } catch (error) {
    if (error instanceof import_zod3.z.ZodError) {
      reply.status(400).send({ message: "Validation error", errors: error.errors });
    } else if (error instanceof ResourceNotFoundError) {
      reply.status(404).send({ message: "User not found" });
    } else {
      console.error("Internal server error:", error);
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}

// src/http/controllers/university/register-university.ts
var import_client4 = require("@prisma/client");
var import_zod4 = require("zod");

// src/repositories/prisma/prisma-university-repository.ts
var PrismaUniversityRepository = class {
  async findById(id) {
    try {
      const university = await prisma.university.findUnique({
        where: { id }
      });
      return university;
    } catch (error) {
      console.error("Error occurred while finding university by id:", error);
      return null;
    }
  }
  async findByUrl(url) {
    try {
      const university = await prisma.university.findUnique({
        where: { url }
      });
      return university;
    } catch (error) {
      console.error("Error occurred while finding university by url:", error);
      return null;
    }
  }
  async create(data) {
    try {
      const university = await prisma.university.create({
        data
      });
      return university;
    } catch (error) {
      console.error("Error occurred while creating university:", error);
      throw error;
    }
  }
  async findAll() {
    try {
      const allUniversities = await prisma.university.findMany();
      return allUniversities;
    } catch (error) {
      console.error("Error occurred while finding all universities:", error);
      return [];
    }
  }
  async deleteUniversity(id) {
    try {
      const university = await prisma.university.delete({
        where: { id }
      });
      return university;
    } catch (error) {
      console.error("Error occurred while deleting university:", error);
      throw error;
    }
  }
  async updateUniversity(id, data) {
    try {
      const university = await prisma.university.update({
        where: { id },
        data: {
          ...data,
          updatedAt: /* @__PURE__ */ new Date()
        }
      });
      return university;
    } catch (error) {
      console.error("Error occurred while updating university:", error);
      throw error;
    }
  }
  async findByName(prefix) {
    try {
      const universities = await prisma.university.findMany({
        where: {
          name: {
            contains: prefix,
            mode: "insensitive"
          }
        },
        orderBy: {
          name: "asc"
        }
      });
      return universities;
    } catch (error) {
      console.error("Error occurred while finding universities by name:", error);
      return [];
    }
  }
  async findAllPaginated(offset, limit) {
    try {
      console.log(`Fetching universities with offset: ${offset}, limit: ${limit}`);
      const universities = await prisma.university.findMany({
        skip: offset,
        take: limit,
        orderBy: {
          name: "asc"
        }
      });
      if (universities.length === 0) {
        console.log("No universities found");
      }
      return universities;
    } catch (error) {
      console.error("Error occurred while paginating universities:", error);
      return [];
    }
  }
};

// src/services/errors/university-already-exist-error.ts
var UniversityAlreadyExistError = class extends Error {
  constructor() {
    super("University already exist");
  }
};

// src/services/university/register-university.ts
var RegisterUniversityUseCase = class {
  constructor(universityRepository) {
    this.universityRepository = universityRepository;
  }
  async execute({
    name,
    location,
    url,
    description,
    image
  }) {
    const universityAlreadyExists = await this.universityRepository.findByUrl(url);
    if (universityAlreadyExists) {
      throw new UniversityAlreadyExistError();
    }
    const university = await this.universityRepository.create({
      name,
      location,
      url,
      description,
      image
    });
    return {
      university
    };
  }
};

// src/services/factories/make-register-university-use-case.ts
function makeRegisterUseCase2() {
  const prismaUniversityRepository = new PrismaUniversityRepository();
  const registerUseCase = new RegisterUniversityUseCase(prismaUniversityRepository);
  return registerUseCase;
}

// src/http/controllers/university/register-university.ts
var import_dotenv2 = __toESM(require("dotenv"));
import_dotenv2.default.config();
var prisma4 = new import_client4.PrismaClient();
var registerUniversitySchema = import_zod4.z.object({
  name: import_zod4.z.string(),
  url: import_zod4.z.string(),
  location: import_zod4.z.string(),
  description: import_zod4.z.string(),
  image: import_zod4.z.string()
});
async function registerUniversityController(request, reply) {
  const { name, url, location, description, image } = registerUniversitySchema.parse(request.body);
  const registerUseCase = makeRegisterUseCase2();
  try {
    await registerUseCase.execute({
      name,
      url,
      location,
      description,
      image
    });
    reply.send({ message: "University registered successfully" });
  } catch (error) {
    if (error instanceof UniversityAlreadyExistError) {
      reply.status(409).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}

// src/http/controllers/university/get-all-university.ts
async function getAllUniversityController(request, reply) {
  try {
    const universityRepository = new PrismaUniversityRepository();
    const allUniversities = await universityRepository.findAll();
    reply.status(200).send(allUniversities);
  } catch (error) {
    console.error("Error retrieving all universities:", error);
    reply.status(500).send({ error: "Internal Server Error" });
  }
}
async function getAllUniversityWithPaginationController(request, reply) {
  try {
    const universityRepository = new PrismaUniversityRepository();
    const { page = 1, limit = 6 } = request.query;
    const pageNumber = Math.max(Number(page), 1);
    const limitNumber = Math.max(Number(limit), 1);
    const offset = (pageNumber - 1) * limitNumber;
    const allUniversities = await universityRepository.findAllPaginated(offset, limitNumber);
    reply.status(200).send({ universities: allUniversities, page: pageNumber });
  } catch (error) {
    console.error("Error retrieving universities:", error);
    reply.status(500).send({ error: "Internal Server Error" });
  }
}

// src/services/university/get-university.ts
var GetUniversityUseCase = class {
  constructor(universityRepository) {
    this.universityRepository = universityRepository;
  }
  async execute({
    universityId
  }) {
    const university = await this.universityRepository.findById(universityId);
    if (!university) {
      throw new ResourceNotFoundError();
    }
    return {
      university
    };
  }
};

// src/http/controllers/university/get-university.ts
async function getUniversityController(request, reply) {
  const { id } = request.params;
  try {
    const universityRepository = new PrismaUniversityRepository();
    const getUniversityUseCase = new GetUniversityUseCase(universityRepository);
    const university = await getUniversityUseCase.execute({ universityId: id });
    reply.status(200).send(university);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(404).send({ error: "University not found" });
    } else {
      console.error("Error retrieving university:", error);
      reply.status(500).send({ error: "Internal Server Error" });
    }
  }
}

// src/services/university/delete-university.ts
var DeleteUniversityUseCase = class {
  constructor(universityRepository) {
    this.universityRepository = universityRepository;
  }
  async execute({
    universityId
  }) {
    const university = await this.universityRepository.deleteUniversity(universityId);
    return {
      university
    };
  }
};

// src/http/controllers/university/delete-university.ts
async function deleteUniversityController(request, reply) {
  const { id } = request.params;
  console.log("controller id: ", id);
  try {
    const universityRepository = new PrismaUniversityRepository();
    const deleteUniversityUseCase = new DeleteUniversityUseCase(universityRepository);
    const university = await deleteUniversityUseCase.execute({ universityId: id });
    reply.status(200).send(university);
  } catch (error) {
    console.error("Error deleting university:", error);
    reply.status(500).send({ error: "Internal Server Error" });
  }
}

// src/http/controllers/university/update-university.ts
var import_zod5 = require("zod");

// src/services/university/update-university.ts
var UpdateUniversityUseCase = class {
  constructor(universityRepository) {
    this.universityRepository = universityRepository;
  }
  async execute({
    universityId,
    name,
    location,
    description,
    url,
    image
  }) {
    const university = await this.universityRepository.findById(universityId);
    if (!university) {
      throw new ResourceNotFoundError();
    }
    const dataToUpdate = {};
    if (name)
      dataToUpdate.name = name;
    if (location)
      dataToUpdate.location = location;
    if (description)
      dataToUpdate.description = description;
    if (url)
      dataToUpdate.url = url;
    if (image)
      dataToUpdate.image = image;
    const updatedUniversity = await this.universityRepository.updateUniversity(universityId, dataToUpdate);
    return {
      university: updatedUniversity
    };
  }
};

// src/services/factories/make-update-university-use-case.ts
function makeUpdateUniversityUseCase() {
  const prismaUniversityRepository = new PrismaUniversityRepository();
  const updateUniversityUseCase = new UpdateUniversityUseCase(prismaUniversityRepository);
  return updateUniversityUseCase;
}

// src/http/controllers/university/update-university.ts
async function updateUniversityController(request, reply) {
  const updateUniversityBodySchema = import_zod5.z.object({
    name: import_zod5.z.string().optional(),
    location: import_zod5.z.string().optional(),
    url: import_zod5.z.string().optional(),
    description: import_zod5.z.string().optional(),
    image: import_zod5.z.string().optional()
  });
  const updateUniversityParamsSchema = import_zod5.z.object({
    universityId: import_zod5.z.string()
  });
  try {
    const { name, location, url, description, image } = updateUniversityBodySchema.parse(request.body);
    const { universityId } = updateUniversityParamsSchema.parse(request.params);
    const updateUseCase = makeUpdateUniversityUseCase();
    const result = await updateUseCase.execute({ universityId, name, location, url, description, image });
    reply.status(200).send({ university: result.university });
  } catch (error) {
    if (error instanceof import_zod5.z.ZodError) {
      reply.status(400).send({ message: "Validation error", errors: error.errors });
    } else if (error instanceof ResourceNotFoundError) {
      reply.status(404).send({ message: "University not found" });
    } else {
      console.error("Internal server error:", error);
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}

// src/http/controllers/user/profile.ts
async function profile(request, reply) {
  await request.jwtVerify();
  console.log(request.user.sub);
  return reply.status(200);
}

// src/http/controllers/user/refresh.ts
async function refresh(request, reply) {
  await request.jwtVerify({ onlyCookie: true });
  const { role } = request.user;
  const token = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub
      }
    }
  );
  const refreshToken = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
        expiresIn: "7d"
      }
    }
  );
  return reply.setCookie("refreshToken", refreshToken, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: true
  }).status(200).send({
    token
  });
}

// src/http/middleware/verify-user-role.ts
function verifyUserRole(roleToVerify) {
  return async (request, reply) => {
    console.log("Request user:", request.user);
    console.log("Role to verify:", roleToVerify);
    if (!request.user || !request.user.role) {
      console.error("User or role not available:", request.user);
      reply.status(401).send({ message: "Unauthorized" });
      return;
    }
    const { role } = request.user;
    if (role !== roleToVerify) {
      console.error("Role mismatch. Expected:", roleToVerify, "Actual:", role);
      reply.status(403).send({ message: "Forbidden" });
      return;
    }
    console.log("Role authorized:", role);
    return;
  };
}

// src/http/controllers/news/temp-news.ts
var import_client5 = require("@prisma/client");
var prisma5 = new import_client5.PrismaClient();
var createNews = async (request, reply) => {
  try {
    await prisma5.news.create({
      data: {
        title: request.body.title,
        description: request.body.description,
        url: request.body.url,
        image: request.body.image,
        content: request.body.content,
        author: request.body.author,
        university: {
          connect: { id: request.body.universityId }
        }
      }
    });
    reply.send({ msg: "Not\xEDcia adicionada com sucesso!" });
  } catch (e) {
    reply.status(500).send({ error: "Erro ao adicionar not\xEDcia: " + e });
  }
};

// src/http/controllers/news/temp-npm.ts
var import_rss_to_json = require("rss-to-json");
var getNpmData = async (request, reply) => {
  try {
    const rssUrl = request.params.text;
    const { limit = 5, offset = 0 } = request.query;
    const rss = await (0, import_rss_to_json.parse)(rssUrl);
    const startIndex = Number(offset);
    const endIndex = startIndex + Number(limit);
    const limitedItems = rss.items.slice(startIndex, endIndex);
    reply.send({ items: limitedItems, total: rss.items.length });
  } catch (e) {
    reply.status(500).send({ error: "Error parsing RSS feed: " + e.message });
  }
};
var getNpmDataWithoutLimit = async (request, reply) => {
  try {
    const rssUrl = request.params.text;
    const rss = await (0, import_rss_to_json.parse)(rssUrl);
    reply.send(rss);
  } catch (e) {
    reply.status(500).send({ error: "Error parsing RSS feed: " + e.message });
  }
};

// src/http/controllers/university/get-university-by-name.ts
async function getUniversityByNameController(request, reply) {
  try {
    const universityRepository = new PrismaUniversityRepository();
    const universities = await universityRepository.findByName(request.params.name);
    if (universities.length > 0) {
      reply.status(200).send(universities);
    } else {
      reply.status(404).send({ error: "No universities found" });
    }
  } catch (error) {
    console.error("Error retrieving universities by name:", error);
    reply.status(500).send({ error: "Internal Server Error" });
  }
}

// src/repositories/prisma/prisma-save-repository.ts
var import_client6 = require("@prisma/client");
var prisma6 = new import_client6.PrismaClient();
var saveNewsToDatabase = async (userId, newsData) => {
  const news = {
    link: newsData.link,
    title: newsData.title,
    description: newsData.description,
    image: newsData.image || "",
    author: newsData.author,
    published: new Date(newsData.published),
    created: new Date(newsData.created),
    category: newsData.category || [],
    enclosures: newsData.enclosures || [],
    media: newsData.media || {}
  };
  try {
    const existingSave = await prisma6.savedNews.findFirst({
      where: {
        userId,
        newsUrl: news.link
      }
    });
    if (existingSave) {
      console.log("Not\xEDcia j\xE1 salva para este usu\xE1rio.");
      return;
    }
    await prisma6.news.upsert({
      where: { link: news.link },
      update: {
        title: news.title,
        description: news.description,
        image: news.image,
        author: news.author,
        published: news.published,
        created: news.created,
        category: news.category,
        enclosures: news.enclosures,
        media: news.media
      },
      create: news
    });
    await prisma6.savedNews.upsert({
      where: { userId_newsUrl: { userId, newsUrl: news.link } },
      update: {},
      create: {
        userId,
        newsUrl: news.link
      }
    });
  } catch (error) {
    console.error("Error saving news:", error);
    throw new Error("Error saving news");
  }
};
var followUniversity = async (userId, universityId) => {
  return prisma6.follow.create({
    data: {
      userId,
      universityId
    }
  });
};
async function findNewsByUrl(link) {
  try {
    const news = await prisma6.news.findUnique({
      where: {
        link
      }
    });
    if (news) {
      console.log("Not\xEDcia encontrada:", news);
      return news;
    } else {
      console.log("Nenhuma not\xEDcia encontrada com essa URL.");
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar not\xEDcia:", error);
    throw new Error("Erro ao buscar not\xEDcia.");
  }
}
async function getSavedNewsByUserId(userId) {
  try {
    const savedNews = await prisma6.savedNews.findMany({
      where: { userId },
      include: { news: true }
    });
    console.log("Saved news:", savedNews);
    return savedNews;
  } catch (error) {
    console.error("Error fetching saved news from database:", error);
    throw error;
  }
}
async function removeNewsFromDatabase(userId, newsUrl) {
  try {
    console.log(`Removing news for userId: ${userId} and newsUrl: ${newsUrl}`);
    const result = await prisma6.savedNews.deleteMany({
      where: {
        userId,
        newsUrl
      }
    });
    if (result.count > 0) {
      console.log("Not\xEDcia removida com sucesso.");
    } else {
      console.log("Nenhuma not\xEDcia encontrada para remover.");
    }
  } catch (error) {
    console.error("Erro ao remover not\xEDcia:", error);
    throw new Error("Erro ao remover not\xEDcia");
  }
}
var unfollowUniversity = async (userId, universityId) => {
  return await prisma6.follow.deleteMany({
    where: {
      userId,
      universityId
    }
  });
};
var getFollowedUniversitiesByUser = async (userId) => {
  try {
    const followedUniversities = await prisma6.follow.findMany({
      where: {
        userId
      },
      include: {
        university: true
      }
    });
    return followedUniversities.map((follow) => follow.university);
  } catch (error) {
    throw new Error("Erro ao buscar universidades seguidas pelo usu\xE1rio.");
  }
};

// src/http/controllers/save/save.ts
var followUniversityHandler = async (request, reply) => {
  const { userId, universityId } = request.body;
  try {
    const follow = await followUniversity(userId, universityId);
    return reply.send(follow);
  } catch (error) {
    console.error("Error following university:", error);
    return reply.status(500).send({ error: "Unable to follow university" });
  }
};
var getFollowedUniversitiesHandler = async (request, reply) => {
  const { userId } = request.query;
  try {
    const followedUniversities = await getFollowedUniversitiesByUser(userId);
    if (followedUniversities.length === 0) {
      return reply.status(404).send({ message: "Voc\xEA n\xE3o segue nenhuma universidade." });
    }
    return reply.send(followedUniversities);
  } catch (error) {
    console.error("Error fetching followed universities:", error);
    return reply.status(500).send({ error: "Erro ao buscar universidades seguidas." });
  }
};
async function saveNewsHandler(request, reply) {
  const { userId, news } = request.body;
  if (!userId || !news || !news.link) {
    return reply.status(400).send({ error: "Missing required fields" });
  }
  const universityUrl = "";
  const newsData = {
    link: news.link,
    title: news.title,
    description: news.description,
    image: news.image || "",
    author: news.author,
    published: new Date(news.published),
    created: new Date(news.created),
    category: news.category,
    enclosures: news.enclosures || [],
    media: news.media || {},
    universityId: universityUrl
  };
  try {
    await saveNewsToDatabase(userId, newsData);
    reply.status(200).send({ message: "News saved successfully" });
  } catch (error) {
    console.error("Error saving news:", error);
    reply.status(500).send({ error: "Error saving news" });
  }
}
var getNewsByUrlHandler = async (request, reply) => {
  const { url } = request.params;
  try {
    const news = await findNewsByUrl(decodeURIComponent(url));
    if (!news) {
      reply.status(404).send({ message: "News not found." });
    } else {
      reply.send(news);
    }
  } catch (error) {
    reply.status(500).send({ message: error.message });
  }
};
async function getSavedNewsByUserIdHandler(req, reply) {
  const userId = req.query.userId;
  if (!userId) {
    return reply.status(400).send({ error: "User ID is required" });
  }
  try {
    const savedNews = await getSavedNewsByUserId(userId);
    if (!Array.isArray(savedNews)) {
      console.error("Saved news is not an array:", savedNews);
      return reply.status(500).send({ error: "Internal Server Error" });
    }
    return reply.send({ savedNews });
  } catch (error) {
    console.error("Error fetching saved news:", error);
    return reply.status(500).send({ error: "Internal Server Error" });
  }
}
var removeNewsHandler = async (request, reply) => {
  const { userId, newsUrl } = request.body;
  if (typeof newsUrl !== "string") {
    return reply.status(400).send({ error: "newsUrl must be a string" });
  }
  if (!userId || !newsUrl) {
    return reply.status(400).send({ error: "Missing required fields" });
  }
  try {
    await removeNewsFromDatabase(userId, newsUrl);
    return reply.status(200).send({ message: "News removed successfully" });
  } catch (error) {
    console.error("Error removing news:", error);
    return reply.status(500).send({ error: "Error removing news" });
  }
};
var unfollowUniversityHandler = async (request, reply) => {
  const { userId, universityId } = request.body;
  try {
    const unfollow = await unfollowUniversity(userId, universityId);
    return reply.send({ success: true, unfollow });
  } catch (error) {
    console.error("Error unfollowing university:", error);
    return reply.status(500).send({ error: "Unable to unfollow university" });
  }
};

// src/http/controllers/user/update-password.ts
var import_bcryptjs4 = require("bcryptjs");

// src/utils/email-service.ts
var import_nodemailer = __toESM(require("nodemailer"));
async function sendPasswordResetEmail(email, token) {
  const transporter = import_nodemailer.default.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  const mailOptions = {
    from: `"UniNews" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Password Reset Request",
    text: `You requested a password reset. Use the following token to reset your password: ${token}`,
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              padding: 20px;
            }
            .header {
              background-color: #007bff;
              color: #ffffff;
              padding: 20px;
              text-align: center;
            }
            .header img {
              width: 120px;
            }
            .content {
              padding: 20px;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              color: #888888;
              padding: 10px;
              background-color: #f4f4f4;
            }
            .button {
              display: inline-block;
              padding: 10px 20px;
              font-size: 16px;
              color: #ffffff;
              background-color: #F2A20C;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
            }

            .button:hover {
              background-color: #fac93b;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="http://projetoscti.com.br/projetoscti27/uninews/img/tcc-logo-quadrado-sem-fundo.png" alt="UniNews Logo">
              <h1>Password Reset Request</h1>
            </div>
            <div class="content">
              <p>Hello,</p>
              <p>You requested a password reset. Use the following token to reset your password:</p>
              <p><strong>${token}</strong></p>
              <p>If you did not request this, please ignore this email.</p>
            </div>
            <div class="footer">
              <p>UniNews &copy; ${(/* @__PURE__ */ new Date()).getFullYear()}</p>
            </div>
          </div>
        </body>
      </html>
    `
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Unable to send email");
  }
}

// src/http/controllers/user/update-password.ts
var requestPasswordResetHandler = async (req, reply) => {
  const { email } = req.body;
  const usersRepository = new PrismaUsersRepository();
  try {
    const user = await usersRepository.findByEmail(email);
    if (!user) {
      return reply.status(404).send({ error: "User not found" });
    }
    const token = Math.random().toString(36).substr(2, 6);
    const expiresAt = /* @__PURE__ */ new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);
    await usersRepository.createPasswordResetToken(user.id, token, expiresAt);
    await sendPasswordResetEmail(email, token);
    return reply.status(200).send({ message: "Password reset token sent" });
  } catch (error) {
    console.error("Error requesting password reset:", error);
    return reply.status(500).send({ error: "Internal server error" });
  }
};
var resetPasswordHandler = async (req, reply) => {
  const { token, newPassword } = req.body;
  const usersRepository = new PrismaUsersRepository();
  try {
    const passwordReset = await usersRepository.findPasswordResetByToken(token);
    if (!passwordReset || passwordReset.expiresAt < /* @__PURE__ */ new Date()) {
      return reply.status(400).send({ error: "Invalid or expired token" });
    }
    const hashedPassword = await (0, import_bcryptjs4.hash)(newPassword, 6);
    await usersRepository.updatePassword(passwordReset.userId, hashedPassword);
    await usersRepository.deletePasswordResetToken(token);
    return reply.status(200).send({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return reply.status(500).send({ error: "Internal server error" });
  }
};

// src/http/routes.ts
async function appRoutes(app2) {
  app2.post("/users", register);
  app2.post("/sessions", authenticate);
  app2.get("/users/:userId", getUserProfileController);
  app2.get("/getallusers", { preValidation: [app2.verifyJwt, verifyUserRole("ADMIN")] }, getAllUsersController);
  app2.delete("/deleteuser/:id", { preValidation: [app2.verifyJwt, verifyUserRole("ADMIN")] }, deleteUser);
  app2.put("/users/:userId", updateUser);
  app2.get("/me", { preValidation: [app2.verifyJwt] }, profile);
  app2.patch("/token/refresh", refresh);
  app2.post("/password-reset/request", requestPasswordResetHandler);
  app2.post("/password-reset/reset", resetPasswordHandler);
  app2.post("/university", { preValidation: [app2.verifyJwt, verifyUserRole("ADMIN")] }, registerUniversityController);
  app2.get("/getalluniversity", getAllUniversityController);
  app2.get("/univesitypagination", getAllUniversityWithPaginationController);
  app2.get("/university/:id", getUniversityController);
  app2.get("/getuniversityfollowed", getFollowedUniversitiesHandler);
  app2.get("/university/name/:name", getUniversityByNameController);
  app2.delete("/deleteuniversity/:id", { preValidation: [app2.verifyJwt, verifyUserRole("ADMIN")] }, deleteUniversityController);
  app2.put("/university/:universityId", { preValidation: [app2.verifyJwt, verifyUserRole("ADMIN")] }, updateUniversityController);
  app2.delete("/unfollowuniversity", unfollowUniversityHandler);
  app2.post("/news", createNews);
  app2.get("/npm/:text", getNpmData);
  app2.get("/npm/university/:text", getNpmDataWithoutLimit);
  app2.get("/news/:url", getNewsByUrlHandler);
  app2.post("/followuniversity", followUniversityHandler);
  app2.post("/save-news", saveNewsHandler);
  app2.get("/saved-news", getSavedNewsByUserIdHandler);
  app2.delete("/remove-news", removeNewsHandler);
}

// src/app.ts
var import_cors = __toESM(require_cors());
var import_jwt2 = __toESM(require("@fastify/jwt"));
var import_process = require("process");
var import_cookie = __toESM(require("@fastify/cookie"));

// src/http/middleware/verify-jwt.ts
async function verifyJwt(request, reply) {
  try {
    await request.jwtVerify();
    console.log("User:", request.user);
  } catch (error) {
    reply.status(401).send({ message: "Unauthorized" });
  }
}

// src/@types/fastify-jwt.d.ts
var import_jwt = require("@fastify/jwt");

// src/app.ts
var app = (0, import_fastify.default)();
app.register(import_jwt2.default, {
  secret: import_process.env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false
  },
  sign: {
    expiresIn: "1h"
  }
});
app.register(import_cookie.default);
app.register(import_cors.default);
app.decorate("verifyJwt", verifyJwt);
app.register(appRoutes);

// src/server.ts
app.listen({
  host: "0.0.0.0",
  port: process.env.PORT
}).then(() => console.log("\u{1F680}HTTP Server is running!"));

import { ref, defineComponent, openBlock, createElementBlock, createElementVNode, watch, onBeforeUnmount, toRefs, resolveComponent, normalizeStyle, normalizeClass, withModifiers, createBlock, computed, Teleport, toDisplayString, createVNode, Fragment, renderList, createCommentVNode, provide, renderSlot, inject, onMounted } from 'vue';

var updateItemKey = Symbol();
var removeItemKey = Symbol();
var handleShowKey = Symbol();

function useItems(index) {
    var items = ref([]);
    var updateItem = function (item) {
        var index = items.value.findIndex(function (_a) {
            var key = _a.key;
            return item.key === key;
        });
        if (index > -1) {
            items.value.splice(index, 1, item);
        }
        else {
            items.value.push(item);
        }
    };
    var removeItem = function (key) {
        var nextItems = items.value.filter(function (item) { return item.key !== key; });
        var nextEndIndex = nextItems.length - 1;
        items.value = nextItems;
        index.value = Math.min(index.value, nextEndIndex);
    };
    return {
        items: items,
        updateItem: updateItem,
        removeItem: removeItem,
    };
}

function useVisible(items, index, onVisibleChange) {
    var visible = ref(false);
    var handleHide = function () {
        visible.value = false;
        onVisibleChange();
    };
    var handleShow = function (key) {
        var itemIndex = items.value.findIndex(function (item) { return item.key === key; });
        if (itemIndex > -1) {
            index.value = itemIndex;
            visible.value = true;
            onVisibleChange();
        }
    };
    return {
        visible: visible,
        handleHide: handleHide,
        handleShow: handleShow,
    };
}

function useIndex(onIndexChange) {
    var index = ref(0);
    var updateIndex = function (newIndex) {
        index.value = newIndex;
        onIndexChange();
    };
    return {
        index: index,
        updateIndex: updateIndex,
    };
}

var script$c = defineComponent({});

const _hoisted_1$a = { class: "PhotoView__Spinner" };
const _hoisted_2$9 = /*#__PURE__*/createElementVNode("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 32 32",
  width: "36",
  height: "36",
  fill: "white"
}, [
  /*#__PURE__*/createElementVNode("path", {
    opacity: ".25",
    d: "M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"
  }),
  /*#__PURE__*/createElementVNode("path", { d: "M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z" })
], -1 /* HOISTED */);
const _hoisted_3$9 = [
  _hoisted_2$9
];

function render$c(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", _hoisted_1$a, _hoisted_3$9))
}

script$c.render = render$c;
script$c.__file = "src/PhotoView/Spinner.vue";

function getSuitableImageSize(naturalWidth, naturalHeight, rotate) {
    var _a;
    var innerWidth = window.innerWidth, innerHeight = window.innerHeight;
    // 如果图片不是水平，则调换宽高
    var isVertical = rotate % 180 !== 0;
    if (isVertical) {
        _a = [innerHeight, innerWidth], innerWidth = _a[0], innerHeight = _a[1];
    }
    var width;
    var height;
    // 缩放到和窗口一样所需要的比例
    var scaleWidth = innerWidth / naturalWidth;
    var scaleHeight = innerHeight / naturalHeight;
    if (naturalWidth < innerWidth && naturalHeight < innerHeight) {
        // 如果图片原始宽度未超过容器尺寸，则使用原始尺寸
        width = naturalWidth;
        height = naturalHeight;
    }
    else {
        // 否则缩放图片使之恰好放入
        if (scaleWidth < scaleHeight) {
            width = innerWidth;
            height = innerWidth * (naturalHeight / naturalWidth);
        }
        else {
            width = innerHeight * (naturalWidth / naturalHeight);
            height = innerHeight;
        }
    }
    return {
        width: width,
        height: height
    };
}

function useLoadImage(src) {
    var naturalWidth = ref(0);
    var naturalHeight = ref(0);
    var width = ref(0);
    var height = ref(0);
    var loaded = ref(false);
    function setSuitableImageSize(actualWidth, actualHeight, rotate) {
        var imageSize = getSuitableImageSize(actualWidth, actualHeight, rotate);
        width.value = imageSize.width;
        height.value = imageSize.height;
    }
    var loadImage = function (src) {
        loaded.value = false;
        var img = new Image();
        img.onload = function () {
            naturalWidth.value = img.naturalWidth;
            naturalHeight.value = img.naturalHeight;
            setSuitableImageSize(naturalWidth.value, naturalHeight.value, 0);
            loaded.value = true;
        };
        img.src = src;
    };
    loadImage(src.value);
    watch(src, function () {
        loadImage(src.value);
    });
    return {
        width: width,
        height: height,
        loaded: loaded,
        naturalWidth: naturalWidth,
        naturalHeight: naturalHeight,
        setSuitableImageSize: setSuitableImageSize
    };
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

var freeGlobal$1 = freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal$1 || freeSelf || Function('return this')();

var root$1 = root;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root$1.Date.now();
};

var now$1 = now;

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

/** Built-in value references. */
var Symbol$1 = root$1.Symbol;

var Symbol$2 = Symbol$1;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

/** Error message constants. */
var FUNC_ERROR_TEXT$1 = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now$1();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now$1());
  }

  function debounced() {
    var time = now$1(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

function useWindowResize(naturalWidth, naturalHeight, rotate, setSuitableImageSize) {
    var handleResize = throttle(function () {
        setSuitableImageSize(naturalWidth.value, naturalHeight.value, rotate.value);
    }, 8);
    window.addEventListener('resize', handleResize);
    onBeforeUnmount(function () {
        window.removeEventListener('resize', handleResize);
    });
}

// 动画类型
var ShowAnimateEnum;
(function (ShowAnimateEnum) {
    ShowAnimateEnum[ShowAnimateEnum["None"] = 0] = "None";
    ShowAnimateEnum[ShowAnimateEnum["In"] = 1] = "In";
    ShowAnimateEnum[ShowAnimateEnum["Out"] = 2] = "Out";
})(ShowAnimateEnum || (ShowAnimateEnum = {}));
// 触摸状态
var TouchTypeEnum;
(function (TouchTypeEnum) {
    TouchTypeEnum[TouchTypeEnum["Normal"] = 0] = "Normal";
    TouchTypeEnum[TouchTypeEnum["X"] = 1] = "X";
    TouchTypeEnum[TouchTypeEnum["Y"] = 2] = "Y";
    TouchTypeEnum[TouchTypeEnum["Scale"] = 3] = "Scale";
})(TouchTypeEnum || (TouchTypeEnum = {}));
// 边缘状态
var EdgeTypeEnum;
(function (EdgeTypeEnum) {
    EdgeTypeEnum[EdgeTypeEnum["Left"] = 0] = "Left";
    EdgeTypeEnum[EdgeTypeEnum["Right"] = 1] = "Right";
    EdgeTypeEnum[EdgeTypeEnum["Top"] = 2] = "Top";
    EdgeTypeEnum[EdgeTypeEnum["Bottom"] = 3] = "Bottom";
})(EdgeTypeEnum || (EdgeTypeEnum = {}));

function getAnimateOrigin(originRect) {
    if (originRect) {
        var innerWidth_1 = window.innerWidth, innerHeight_1 = window.innerHeight;
        // 动画的元素宽高为 0，计算触发的点的中心到中点的距离即是 AnimateOrigin（粗略计算）
        var xOrigin = originRect.left + originRect.width / 2 - innerWidth_1 / 2;
        var yOrigin = originRect.top + originRect.height / 2 - innerHeight_1 / 2;
        return "".concat(xOrigin, "px ").concat(yOrigin, "px");
    }
    return null;
}

/**
 * 当前设备是否支持触摸事件
 */
var isTouchDevice = typeof document !== 'undefined' && 'ontouchstart' in document.documentElement;

/**
 * 图片间隔
 */
var horizontalOffset = 20;
/**
 * 最小初始响应距离
 */
var minStartTouchOffset = 10;
/**
 * 最小切换图片距离
 */
var minSwitchImageOffset = 40;
/**
 * 最大缩放度（若图片足够大，则会超出该值）
 */
var maxScale = 6;

function withContinuousTap(singleTap, doubleTap) {
    // 当前连续点击次数
    var continuousCount = 0;
    var withSingleTap = debounce(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        continuousCount = 0;
        singleTap.apply(void 0, args);
    }, 300);
    return function invokeTap() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        continuousCount += 1;
        withSingleTap.apply(void 0, args);
        if (continuousCount >= 2) {
            withSingleTap.cancel();
            continuousCount = 0;
            doubleTap.apply(void 0, args);
        }
    };
}

/**
 * 获取移动或缩放之后的中心点
 */
function getPositionOnMoveOrScale(_a) {
    var x = _a.x, y = _a.y, clientX = _a.clientX, clientY = _a.clientY, fromScale = _a.fromScale, toScale = _a.toScale;
    var innerWidth = window.innerWidth, innerHeight = window.innerHeight;
    // 缩放前的图片的中心坐标
    var imageCenterClientX = innerWidth / 2 + x;
    var imageCenterClientY = innerHeight / 2 + y;
    // 放大偏移量
    var offsetScale = toScale / fromScale;
    // 缩放后的偏移量(为保证点击的点相对于视图位置不变，需要将缩放多出来的尺寸通过 translate 平衡掉)
    var originX = -(clientX - imageCenterClientX) * (offsetScale - 1);
    var originY = -(clientY - imageCenterClientY) * (offsetScale - 1);
    return {
        x: originX + x,
        y: originY + y,
        scale: toScale,
    };
}

/**
 * 获取图片拖拽到边缘需要的值
 */
function getEdgeInfo(_a) {
    var _b;
    var width = _a.width, height = _a.height, scale = _a.scale, rotate = _a.rotate;
    // 如果图片不是水平，则调换宽高
    var isVertical = rotate % 180 !== 0;
    if (isVertical) {
        _b = [height, width], width = _b[0], height = _b[1];
    }
    var innerWidth = window.innerWidth, innerHeight = window.innerHeight;
    var currentWidth = width * scale;
    var currentHeight = height * scale;
    var edgeLeft, edgeRight, edgeTop, edgeBottom;
    if (currentWidth > innerWidth) {
        edgeLeft = (currentWidth - innerWidth) / 2;
        edgeRight = -(currentWidth - innerWidth) / 2;
    }
    else {
        edgeLeft = 0;
        edgeRight = 0;
    }
    if (currentHeight > innerHeight) {
        edgeTop = (currentHeight - innerHeight) / 2;
        edgeBottom = -(currentHeight - innerHeight) / 2;
    }
    else {
        edgeTop = 0;
        edgeBottom = 0;
    }
    return {
        edgeLeft: edgeLeft,
        edgeRight: edgeRight,
        edgeTop: edgeTop,
        edgeBottom: edgeBottom,
    };
}
/**
 * 获取边缘类型
 */
function getEdgeTypes(_a) {
    var width = _a.width, height = _a.height, scale = _a.scale, rotate = _a.rotate, x = _a.x, y = _a.y;
    var position = getEdgeInfo({ width: width, height: height, scale: scale, rotate: rotate });
    var edgeTypes = [];
    if (x === position.edgeLeft) {
        edgeTypes.push(EdgeTypeEnum.Left);
    }
    if (x === position.edgeRight) {
        edgeTypes.push(EdgeTypeEnum.Right);
    }
    if (y === position.edgeTop) {
        edgeTypes.push(EdgeTypeEnum.Top);
    }
    if (y === position.edgeBottom) {
        edgeTypes.push(EdgeTypeEnum.Bottom);
    }
    return edgeTypes;
}
/**
 * 获取标准值
 */
function getStandardPosition(_a) {
    var width = _a.width, height = _a.height, scale = _a.scale, rotate = _a.rotate, x = _a.x, y = _a.y;
    var _b = getEdgeInfo({ width: width, height: height, scale: scale, rotate: rotate }), edgeLeft = _b.edgeLeft, edgeRight = _b.edgeRight, edgeTop = _b.edgeTop, edgeBottom = _b.edgeBottom;
    if (x > edgeLeft) {
        x = edgeLeft;
    }
    if (x < edgeRight) {
        x = edgeRight;
    }
    if (y > edgeTop) {
        y = edgeTop;
    }
    if (y < edgeBottom) {
        y = edgeBottom;
    }
    return { x: x, y: y, scale: scale };
}

/**
 * 从 Touch 事件中获取两个触控中心的位置
 * @param e TouchEvent
 */
function getMultipleTouchPosition(e) {
    var _a = e.touches[0], clientX = _a.clientX, clientY = _a.clientY;
    if (e.touches.length >= 2) {
        var _b = e.touches[1], nextClientX = _b.clientX, nextClientY = _b.clientY;
        return {
            clientX: (clientX + nextClientX) / 2,
            clientY: (clientY + nextClientY) / 2,
            touchLength: Math.sqrt(Math.pow(nextClientX - clientX, 2) + Math.pow(nextClientY - clientY, 2)),
        };
    }
    return { clientX: clientX, clientY: clientY, touchLength: 0 };
}

function useMoveImage(width, height, naturalWidth, naturalHeight, setSuitableImageSize, onTouchStart, onTouchMove, onTouchEnd, onSingleTap) {
    // 图片 x 偏移量
    var x = ref(0);
    // 图片 y 偏移量
    var y = ref(0);
    // 图片缩放程度
    var scale = ref(1);
    // 图片旋转角度
    var rotate = ref(0);
    // 图片是否处于触摸状态
    var touched = ref(false);
    // 触摸开始时 x 的坐标
    var clientX = ref(0);
    // 触摸开始时 y 的坐标
    var clientY = ref(0);
    // 初始触摸状态
    var touchType = ref(TouchTypeEnum.Normal);
    // 上一次图片的 x 偏移量
    var lastX = ref(0);
    // 上一次图片的 y 偏移量
    var lastY = ref(0);
    // 上一次 touch 的长度
    var lastTouchLength = ref(0);
    // 边缘状态(用于缩放图片判断)
    var edgeTypes = [];
    var handleMouseDown = function (e) {
        if (isTouchDevice)
            return;
        handleDown(e.clientX, e.clientY, 0);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };
    var handleTouchStart = function (e) {
        if (!isTouchDevice)
            return;
        var touch = getMultipleTouchPosition(e);
        handleDown(touch.clientX, touch.clientY, touch.touchLength);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handleTouchEnd);
    };
    var handleDown = function (newClientX, newClientY, touchLength) {
        touched.value = true;
        clientX.value = newClientX;
        clientY.value = newClientY;
        lastTouchLength.value = touchLength;
        edgeTypes = getEdgeTypes({
            width: width.value,
            height: height.value,
            scale: scale.value,
            rotate: rotate.value,
            x: lastX.value,
            y: lastY.value
        });
        onTouchStart(newClientX, newClientY);
    };
    var handleMouseMove = function (e) {
        if (isTouchDevice || !touched.value)
            return;
        handleMove(e.clientX, e.clientY, 0);
    };
    var handleTouchMove = function (e) {
        if (!isTouchDevice || !touched.value)
            return;
        var touch = getMultipleTouchPosition(e);
        handleMove(touch.clientX, touch.clientY, touch.touchLength);
    };
    var handleMove = throttle(function (newClientX, newClientY, touchLength) {
        // 初始化触摸状态
        if (touchType.value === TouchTypeEnum.Normal) {
            if (scale.value !== 1 || touchLength) {
                touchType.value = TouchTypeEnum.Scale;
            }
            else {
                var isMoveX = Math.abs(newClientX - clientX.value) > minStartTouchOffset;
                var isMoveY = Math.abs(newClientY - clientY.value) > minStartTouchOffset;
                if (!isMoveX && !isMoveY)
                    return;
                // 水平方向优先
                touchType.value = isMoveX ? TouchTypeEnum.X : TouchTypeEnum.Y;
            }
        }
        onTouchMove(touchType.value, newClientX, newClientY, edgeTypes);
        var newX = newClientX - clientX.value;
        var newY = newClientY - clientY.value;
        if (touchType.value === TouchTypeEnum.Y) {
            x.value = newX + lastX.value;
            y.value = newY + lastY.value;
        }
        if (touchType.value === TouchTypeEnum.Scale) {
            if (touchLength) {
                var endScale = scale.value + ((touchLength - lastTouchLength.value) / 100 / 2) * scale.value;
                var toScale = Math.max(Math.min(endScale, Math.max(maxScale, naturalWidth.value / width.value)), 1);
                handleToScale(toScale, newClientX, newClientY);
                lastTouchLength.value = touchLength;
            }
            else {
                // 处于左边缘情况，右划交给父级处理，处于右边缘情况，左划交给父级处理
                if (!(newX > 0 && edgeTypes.includes(EdgeTypeEnum.Left)) &&
                    !(newX < 0 && edgeTypes.includes(EdgeTypeEnum.Right))) {
                    x.value = newX + lastX.value;
                }
                y.value = newY + lastY.value;
            }
        }
    }, 8, { trailing: false });
    var handleMouseUp = function (e) {
        if (isTouchDevice)
            return;
        handleUp(e.clientX, e.clientY);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };
    var handleTouchEnd = function (e) {
        if (!isTouchDevice)
            return;
        var touch = e.changedTouches[0];
        handleUp(touch.clientX, touch.clientY);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
    };
    var onDoubleTap = function (newClientX, newClientY) {
        if (touchType.value !== TouchTypeEnum.Normal)
            return;
        if (scale.value === 1) {
            var toScale = Math.max(2, naturalWidth.value / width.value);
            var position = getPositionOnMoveOrScale({
                x: x.value,
                y: y.value,
                clientX: newClientX,
                clientY: newClientY,
                fromScale: scale.value,
                toScale: toScale,
            });
            x.value = position.x;
            y.value = position.y;
            scale.value = position.scale;
        }
        else {
            x.value = 0;
            y.value = 0;
            scale.value = 1;
        }
    };
    var onTap = withContinuousTap(onSingleTap, onDoubleTap);
    var handleUp = function (newClientX, newClientY) {
        if (clientX.value === newClientX && clientY.value === newClientY) {
            onTap(newClientX, newClientY);
        }
        onTouchEnd(touchType.value, newClientX, newClientY, edgeTypes);
        if (touchType.value === TouchTypeEnum.Y) {
            x.value = 0;
            y.value = 0;
        }
        if (touchType.value === TouchTypeEnum.Scale) {
            setStandardPosition({
                width: width.value,
                height: height.value,
                scale: scale.value,
                rotate: rotate.value,
                x: x.value,
                y: y.value
            });
        }
        touched.value = false;
        touchType.value = TouchTypeEnum.Normal;
        clientX.value = 0;
        clientY.value = 0;
        lastX.value = x.value;
        lastY.value = y.value;
    };
    var handleWheel = function (e) {
        var endScale = scale.value - e.deltaY / 100 / 2;
        var toScale = Math.max(Math.min(endScale, Math.max(maxScale, naturalWidth.value / width.value)), 1);
        handleToScale(toScale, e.clientX, e.clientY);
    };
    var handleToScale = function (newScale, newClientX, newClientY) {
        var position = getPositionOnMoveOrScale({
            x: x.value,
            y: y.value,
            clientX: newClientX,
            clientY: newClientY,
            fromScale: scale.value,
            toScale: newScale,
        });
        setStandardPosition({
            width: width.value,
            height: height.value,
            scale: position.scale,
            rotate: rotate.value,
            x: position.x,
            y: position.y
        });
    };
    var setStandardPosition = function (position) {
        var standardPosition = getStandardPosition(position);
        x.value = standardPosition.x;
        y.value = standardPosition.y;
        lastX.value = standardPosition.x;
        lastY.value = standardPosition.y;
        scale.value = standardPosition.scale;
    };
    var handleRotateLeft = function () {
        rotate.value = rotate.value - 90;
        setSuitableImageSize(naturalWidth.value, naturalHeight.value, rotate.value);
        setStandardPosition({
            width: width.value,
            height: height.value,
            scale: scale.value,
            rotate: rotate.value,
            x: x.value,
            y: y.value
        });
    };
    var handleRotateRight = function () {
        rotate.value = rotate.value + 90;
        setSuitableImageSize(naturalWidth.value, naturalHeight.value, rotate.value);
        setStandardPosition({
            width: width.value,
            height: height.value,
            scale: scale.value,
            rotate: rotate.value,
            x: x.value,
            y: y.value
        });
    };
    return {
        x: x,
        y: y,
        scale: scale,
        touched: touched,
        handleMouseDown: handleMouseDown,
        handleTouchStart: handleTouchStart,
        handleWheel: handleWheel,
        rotate: rotate,
        handleRotateLeft: handleRotateLeft,
        handleRotateRight: handleRotateRight
    };
}

var script$b = defineComponent({
    name: 'PhotoView',
    components: {
        Spinner: script$c
    },
    props: {
        /**
         * 图片地址
         */
        src: {
            type: String,
            required: true,
        },
        /**
         * 触发打开模态框的位置信息
         */
        originRect: {
            type: Object,
            default: null,
        },
        /**
         * 动画类型
         */
        showAnimateType: {
            type: Number,
            default: null,
        }
    },
    emits: ['touchStart', 'touchMove', 'touchEnd', 'singleTap'],
    setup: function (props, _a) {
        var emit = _a.emit;
        var src = toRefs(props).src;
        var _b = useLoadImage(src), width = _b.width, height = _b.height, loaded = _b.loaded, naturalWidth = _b.naturalWidth, naturalHeight = _b.naturalHeight, setSuitableImageSize = _b.setSuitableImageSize;
        var onTouchStart = function (clientX, clientY) {
            emit('touchStart', clientX, clientY);
        };
        var onTouchMove = function (touchType, clientX, clientY, edgeTypes) {
            emit('touchMove', touchType, clientX, clientY, edgeTypes);
        };
        var onTouchEnd = function (touchType, clientX, clientY, edgeTypes) {
            emit('touchEnd', touchType, clientX, clientY, edgeTypes);
        };
        var onSingleTap = function (clientX, clientY) {
            emit('singleTap', clientX, clientY);
        };
        var _c = useMoveImage(width, height, naturalWidth, naturalHeight, setSuitableImageSize, onTouchStart, onTouchMove, onTouchEnd, onSingleTap), x = _c.x, y = _c.y, scale = _c.scale, rotate = _c.rotate, touched = _c.touched, handleMouseDown = _c.handleMouseDown, handleTouchStart = _c.handleTouchStart, handleWheel = _c.handleWheel, handleRotateLeft = _c.handleRotateLeft, handleRotateRight = _c.handleRotateRight;
        useWindowResize(naturalWidth, naturalHeight, rotate, setSuitableImageSize);
        return {
            width: width,
            height: height,
            loaded: loaded,
            x: x,
            y: y,
            scale: scale,
            touched: touched,
            handleMouseDown: handleMouseDown,
            handleTouchStart: handleTouchStart,
            handleWheel: handleWheel,
            rotate: rotate,
            handleRotateLeft: handleRotateLeft,
            handleRotateRight: handleRotateRight
        };
    },
    data: function () {
        return {
            ShowAnimateEnum: ShowAnimateEnum,
            // 翻转
            isFlipHorizontal: false,
            isFlipVertical: false,
        };
    },
    methods: {
        getAnimateOrigin: getAnimateOrigin,
        toggleFlipHorizontal: function () {
            this.isFlipHorizontal = !this.isFlipHorizontal;
        },
        toggleFlipVertical: function () {
            this.isFlipVertical = !this.isFlipVertical;
        },
        getTransform: function () {
            var transform = {
                translate3d: "".concat(this.x, "px, ").concat(this.y, "px, 0"),
                scaleX: "".concat(this.isFlipHorizontal ? '-' : '').concat(this.scale),
                scaleY: "".concat(this.isFlipVertical ? '-' : '').concat(this.scale)
            };
            if (this.rotate) {
                transform.rotate = "".concat(this.rotate, "deg");
            }
            var str = '';
            Object.keys(transform).forEach(function (name) {
                str += "".concat(name, "(").concat(transform[name], ")");
            });
            return str;
        }
    }
});

const _hoisted_1$9 = ["width", "height", "src"];

function render$b(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_spinner = resolveComponent("spinner");

  return (_ctx.loaded)
    ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "PhotoView__PhotoWrap",
        style: normalizeStyle({
      width: `${_ctx.width}px`,
      height: `${_ctx.height}px`
    })
      }, [
        createElementVNode("div", {
          class: normalizeClass(["PhotoView__PhotoBox", {
        'PhotoView__animateIn': _ctx.showAnimateType === _ctx.ShowAnimateEnum.In,
        'PhotoView__animateOut': _ctx.showAnimateType === _ctx.ShowAnimateEnum.Out,
      }]),
          style: normalizeStyle({
        transformOrigin: _ctx.getAnimateOrigin(_ctx.originRect)
      })
        }, [
          createElementVNode("img", {
            class: "PhotoView__Photo",
            width: _ctx.width,
            height: _ctx.height,
            src: _ctx.src,
            style: normalizeStyle({
          transform: _ctx.getTransform(),
          transition: _ctx.touched ? undefined : 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
        }),
            onMousedown: _cache[0] || (_cache[0] = withModifiers((...args) => (_ctx.handleMouseDown && _ctx.handleMouseDown(...args)), ["prevent"])),
            onTouchstart: _cache[1] || (_cache[1] = withModifiers((...args) => (_ctx.handleTouchStart && _ctx.handleTouchStart(...args)), ["prevent"])),
            onWheel: _cache[2] || (_cache[2] = (...args) => (_ctx.handleWheel && _ctx.handleWheel(...args)))
          }, null, 44 /* STYLE, PROPS, HYDRATE_EVENTS */, _hoisted_1$9)
        ], 6 /* CLASS, STYLE */)
      ], 4 /* STYLE */))
    : (openBlock(), createBlock(_component_spinner, { key: 1 }))
}

script$b.render = render$b;
script$b.__file = "src/PhotoView/index.vue";

function useBodyEffect(visible, rootElement) {
    var root = rootElement && typeof rootElement === "string"
        ? document.querySelector(rootElement)
        : rootElement;
    var style = (root ? root : document.body).style;
    var originalOverflow = style.overflow;
    watch(visible, function () {
        if (visible.value) {
            style.overflow = "hidden";
        }
        else {
            style.overflow = originalOverflow;
        }
    });
}

function useInnerWidth() {
    var innerWidth = ref(window.innerWidth);
    var handleResize = throttle(function () {
        innerWidth.value = window.innerWidth;
    }, 8);
    window.addEventListener('resize', handleResize);
    onBeforeUnmount(function () {
        window.removeEventListener('resize', handleResize);
    });
    return {
        innerWidth: innerWidth
    };
}

var script$a = defineComponent({});

const _hoisted_1$8 = {
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  width: "44",
  height: "44",
  viewBox: "0 0 768 768"
};
const _hoisted_2$8 = /*#__PURE__*/createElementVNode("path", {
  fill: "#FFF",
  d: "M607.5 205.5l-178.5 178.5 178.5 178.5-45 45-178.5-178.5-178.5 178.5-45-45 178.5-178.5-178.5-178.5 45-45 178.5 178.5 178.5-178.5z"
}, null, -1 /* HOISTED */);
const _hoisted_3$8 = [
  _hoisted_2$8
];

function render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$8, _hoisted_3$8))
}

script$a.render = render$a;
script$a.__file = "src/PhotoSlider/Close.vue";

var script$9 = defineComponent({});

const _hoisted_1$7 = {
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  width: "44",
  height: "44",
  viewBox: "0 0 768 768"
};
const _hoisted_2$7 = /*#__PURE__*/createElementVNode("path", { d: "M640.5 352.5v63h-390l178.5 180-45 45-256.5-256.5 256.5-256.5 45 45-178.5 180h390z" }, null, -1 /* HOISTED */);
const _hoisted_3$7 = [
  _hoisted_2$7
];

function render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$7, _hoisted_3$7))
}

script$9.render = render$9;
script$9.__file = "src/PhotoSlider/ArrowLeft.vue";

var script$8 = defineComponent({});

const _hoisted_1$6 = {
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  width: "44",
  height: "44",
  viewBox: "0 0 768 768"
};
const _hoisted_2$6 = /*#__PURE__*/createElementVNode("path", { d: "M384 127.5l256.5 256.5-256.5 256.5-45-45 178.5-180h-390v-63h390l-178.5-180z" }, null, -1 /* HOISTED */);
const _hoisted_3$6 = [
  _hoisted_2$6
];

function render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$6, _hoisted_3$6))
}

script$8.render = render$8;
script$8.__file = "src/PhotoSlider/ArrowRight.vue";

var script$7 = defineComponent({});

const _hoisted_1$5 = {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  width: "44",
  height: "44"
};
const _hoisted_2$5 = /*#__PURE__*/createElementVNode("path", {
  fill: "#FFF",
  d: "M744.81 959.5c99.37-180.1 116.14-454.76-274.34-445.6v221.85L134.82 400.12 470.46 64.5v217.1c467.59-12.2 519.68 412.74 274.35 677.9z"
}, null, -1 /* HOISTED */);
const _hoisted_3$5 = [
  _hoisted_2$5
];

function render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$5, _hoisted_3$5))
}

script$7.render = render$7;
script$7.__file = "src/PhotoSlider/RotateLeft.vue";

var script$6 = defineComponent({});

const _hoisted_1$4 = {
  viewBox: "0 0 1000 1000",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  width: "44",
  height: "44"
};
const _hoisted_2$4 = /*#__PURE__*/createElementVNode("path", {
  fill: "#FFF",
  d: "M555.668 258.9754V47.24496791175579l327.3385 327.3241L555.668 701.8941V485.52881146582615c-380.8294-8.9369-364.4728 258.9334-267.5596 434.5814C48.8389 661.5105 99.6385 247.0815 555.668 258.9754z"
}, null, -1 /* HOISTED */);
const _hoisted_3$4 = [
  _hoisted_2$4
];

function render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$4, _hoisted_3$4))
}

script$6.render = render$6;
script$6.__file = "src/PhotoSlider/RotateRight.vue";

var script$5 = defineComponent({});

const _hoisted_1$3 = {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  width: "44",
  height: "44"
};
const _hoisted_2$3 = /*#__PURE__*/createElementVNode("path", {
  fill: "#FFF",
  d: "M978.432 492.832l-153.696-116.896c-17.504-13.312-31.968-6.208-32.096 15.776L792.032 480H231.968l-0.608-88.288c-0.16-22.016-14.592-29.088-32.096-15.776l-153.696 116.896c-17.504 13.312-17.12 34.592 0.864 47.264l154.144 108.608c17.984 12.672 32.576 5.056 32.416-16.96L232.384 544h559.2l-0.576 87.712c-0.16 22.016 14.432 29.632 32.416 16.96l154.144-108.608c17.984-12.672 18.4-33.92 0.864-47.232z"
}, null, -1 /* HOISTED */);
const _hoisted_3$3 = [
  _hoisted_2$3
];

function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$3, _hoisted_3$3))
}

script$5.render = render$5;
script$5.__file = "src/PhotoSlider/FlipHorizontal.vue";

var script$4 = defineComponent({});

const _hoisted_1$2 = {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  width: "44",
  height: "44"
};
const _hoisted_2$2 = /*#__PURE__*/createElementVNode("path", {
  fill: "#FFF",
  d: "M494.03 74.72l-109.59 144.09c-12.48 16.41-5.82 29.97 14.79000001 30.09L482 249.47 482 774.53l-82.77 0.54c-20.64 0.15-27.27 13.68-14.79 30.09l109.59 144.09c12.48 16.41 32.43 16.05 44.31000001-0.81l101.81999999-144.51c11.88-16.86 4.74-30.54-15.9-30.39L542.00000001 774.14l-1e-8-524.25 82.23 0.54c20.64 0.15 27.78-13.53 15.9-30.39l-101.82-144.51c-11.88-16.86-31.8-17.25-44.28-0.81z"
}, null, -1 /* HOISTED */);
const _hoisted_3$2 = [
  _hoisted_2$2
];

function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$2, _hoisted_3$2))
}

script$4.render = render$4;
script$4.__file = "src/PhotoSlider/FilpVertical.vue";

var script$3 = defineComponent({});

const _hoisted_1$1 = {
  viewBox: "0 0 1068 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "2740",
  width: "44",
  height: "44"
};
const _hoisted_2$1 = /*#__PURE__*/createElementVNode("path", {
  d: "M252.622237 809.004596a252.614304 252.614304 0 0 1-31.486765-503.2587v-4.352863a301.406611 301.406611 0 0 1 594.880633-68.660847 288.877568 288.877568 0 0 1-36.146765 575.488683 31.529129 31.529129 0 0 1 0-63.047667 225.819311 225.819311 0 0 0 8.472726-451.479758l-26.244267-0.974363-3.812726-25.990085a238.358944 238.358944 0 0 0-474.176071 34.664037 243.040125 243.040125 0 0 0 1.874591 30.035812l4.501135 35.786673-37.163491-0.3495h-0.730773c-104.521657 0-189.577228 85.034389-189.577228 189.577228s85.034389 189.577228 189.577228 189.577228a31.529129 31.529129 0 0 1 0 63.047667z",
  fill: "#FFF"
}, null, -1 /* HOISTED */);
const _hoisted_3$1 = /*#__PURE__*/createElementVNode("path", {
  d: "M500.417679 442.421546m10.590906 0l46.599989 0q10.590907 0 10.590907 10.590906l0 528.878103q0 10.590907-10.590907 10.590907l-46.599989 0q-10.590907 0-10.590906-10.590907l0-528.878103q0-10.590907 10.590906-10.590906Z",
  fill: "#FFF"
}, null, -1 /* HOISTED */);
const _hoisted_4$1 = /*#__PURE__*/createElementVNode("path", {
  d: "M487.406543 980.472843m7.488902-7.488902l171.982631-171.982631q7.488902-7.488902 14.977804 0l32.951168 32.951168q7.488902 7.488902 0 14.977804l-171.982631 171.982631q-7.488902 7.488902-14.977804 0l-32.951168-32.951168q-7.488902-7.488902 0-14.977804Z",
  fill: "#FFF"
}, null, -1 /* HOISTED */);
const _hoisted_5 = /*#__PURE__*/createElementVNode("path", {
  d: "M344.966294 837.223674m7.488902-7.488902l32.951168-32.951168q7.488902-7.488902 14.977804 0l176.198883 176.198883q7.488902 7.488902 0 14.977804l-32.951168 32.951168q-7.488902 7.488902-14.977804 0l-176.198883-176.198883q-7.488902-7.488902 0-14.977804Z",
  fill: "#FFF"
}, null, -1 /* HOISTED */);
const _hoisted_6 = [
  _hoisted_2$1,
  _hoisted_3$1,
  _hoisted_4$1,
  _hoisted_5
];

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$1, _hoisted_6))
}

script$3.render = render$3;
script$3.__file = "src/PhotoSlider/Download.vue";

function useAnimationHandle(visible, currentItem) {
    var photoVisible = ref(visible.value);
    var showAnimateType = ref(ShowAnimateEnum.None);
    var originRect = ref(null);
    watch(visible, function () {
        var originRef = currentItem.value.originRef;
        // 点击打开按钮和关闭时收集位置信息，用于过渡动画
        if (originRef && originRef.nodeType === 1 && originRef.children.length > 0) {
            var _a = originRef.getBoundingClientRect(), top_1 = _a.top, left = _a.left, width = _a.width, height = _a.height;
            originRect.value = {
                left: left,
                top: top_1,
                width: width,
                height: height
            };
        }
        else {
            originRect.value = null;
        }
        if (visible.value) {
            // 设置动画类型
            showAnimateType.value = ShowAnimateEnum.In;
            // 显示图片
            photoVisible.value = true;
        }
        else {
            // 设置动画类型
            showAnimateType.value = ShowAnimateEnum.Out;
        }
    });
    // 动画结束的回调
    var onShowAnimateEnd = function () {
        // 动画完成才关闭弹窗
        if (showAnimateType.value === ShowAnimateEnum.Out) {
            photoVisible.value = false;
        }
        showAnimateType.value = ShowAnimateEnum.None;
    };
    return {
        photoVisible: photoVisible,
        showAnimateType: showAnimateType,
        originRect: originRect,
        onShowAnimateEnd: onShowAnimateEnd
    };
}

var script$2 = defineComponent({
    name: "PhotoSlider",
    components: {
        PhotoView: script$b,
        Close: script$a,
        ArrowLeft: script$9,
        ArrowRight: script$8,
        RotateLeft: script$7,
        RotateRight: script$6,
        FlipHorizontal: script$5,
        FilpVertical: script$4,
        Download: script$3,
    },
    props: {
        /**
         * 图片列表
         */
        items: {
            type: Array,
            required: true,
        },
        /**
         * 图片当前索引
         */
        index: {
            type: Number,
            required: true,
        },
        /**
         * 是否显示模态框
         */
        visible: {
            type: Boolean,
            required: true,
        },
        /**
         * 箭头切换是否需要过渡
         */
        shouldTransition: {
            type: Boolean,
            default: false,
        },
        /**
         * 是否切换显隐覆盖物
         */
        toggleOverlay: {
            type: Boolean,
            default: true,
        },
        /**
         * 默认背景透明度
         */
        defaultBackdropOpacity: {
            type: Number,
            default: 1,
        },
        /**
         * Specifies a place in a DOM (target container) where PhotoSlider will be injected
         * Could bequery selector or HtmlElement
         */
        teleportTo: {
            type: [String, HTMLElement],
            default: "body",
        },
    },
    emits: ["clickPhoto", "clickMask", "changeIndex", "closeModal"],
    setup: function (props) {
        var _a = toRefs(props), items = _a.items, index = _a.index, visible = _a.visible;
        var currentItem = computed(function () {
            return items.value[index.value] || {};
        });
        useBodyEffect(visible, props.teleportTo);
        var _b = useAnimationHandle(visible, currentItem), photoVisible = _b.photoVisible, showAnimateType = _b.showAnimateType, originRect = _b.originRect, onShowAnimateEnd = _b.onShowAnimateEnd;
        var innerWidth = useInnerWidth().innerWidth;
        return {
            innerWidth: innerWidth,
            currentItem: currentItem,
            photoVisible: photoVisible,
            showAnimateType: showAnimateType,
            originRect: originRect,
            onShowAnimateEnd: onShowAnimateEnd,
        };
    },
    data: function () {
        return {
            // 常量
            horizontalOffset: horizontalOffset,
            ShowAnimateEnum: ShowAnimateEnum,
            isTouchDevice: isTouchDevice,
            // 触摸相关
            touched: false,
            hasMove: false,
            needTransition: false,
            clientX: 0,
            clientY: 0,
            touchMoveX: 0,
            backdropOpacity: this.defaultBackdropOpacity,
            // 是否显示覆盖物
            overlayVisible: true,
            // photo-view 子组件
            photoViewRefs: [],
        };
    },
    created: function () {
        window.addEventListener("keydown", this.handleKeyDown);
    },
    beforeUnmount: function () {
        window.removeEventListener("keydown", this.handleKeyDown);
    },
    beforeUpdate: function () {
        this.photoViewRefs = [];
    },
    methods: {
        handleDownload: function () {
            var item = this.items[this.index];
            var a = document.createElement("a");
            var paths = item.src.split(".")[0].split("/");
            var name = paths[paths.length - 1];
            a.download = item.downloadName || name;
            a.href = item.src;
            a.dispatchEvent(new MouseEvent("click"));
        },
        toggleFlipHorizontal: function () {
            this.photoViewRefs[this.index].toggleFlipHorizontal();
        },
        toggleFlipVertical: function () {
            this.photoViewRefs[this.index].toggleFlipVertical();
        },
        handleRotateLeft: function () {
            this.photoViewRefs[this.index].handleRotateLeft();
        },
        handleRotateRight: function () {
            this.photoViewRefs[this.index].handleRotateRight();
        },
        setPhotoViewRef: function (ref) {
            this.photoViewRefs.push(ref);
        },
        handleKeyDown: function (e) {
            if (this.visible) {
                switch (e.code) {
                    case "ArrowLeft":
                        this.handlePrevious();
                        break;
                    case "ArrowRight":
                        this.handleNext();
                        break;
                    case "Escape":
                        this.handleClickClose();
                        break;
                }
            }
        },
        handleSingleTap: function () {
            if (this.toggleOverlay) {
                this.overlayVisible = !this.overlayVisible;
            }
        },
        handleTouchStart: function (clientX, clientY) {
            this.touched = true;
            this.needTransition = false;
            this.clientX = clientX;
            this.clientY = clientY;
        },
        handleTouchMove: function (touchType, clientX, clientY, edgeTypes) {
            if (touchType === TouchTypeEnum.Scale) {
                this.handleTouchScaleMove(clientX, edgeTypes);
            }
            if (touchType === TouchTypeEnum.X) {
                this.handleTouchHorizontalMove(clientX);
            }
            if (touchType === TouchTypeEnum.Y) {
                this.handleTouchVerticalMove(clientX, clientY);
            }
        },
        handleTouchScaleMove: function (clientX, edgeTypes) {
            var touchMoveX = clientX - this.clientX;
            if ((touchMoveX > 0 && edgeTypes.includes(EdgeTypeEnum.Left)) ||
                (touchMoveX < 0 && edgeTypes.includes(EdgeTypeEnum.Right))) {
                this.handleTouchHorizontalMove(clientX);
            }
        },
        handleTouchHorizontalMove: function (clientX) {
            var touchMoveX = clientX - this.clientX;
            // 第一张和最后一张超出时拖拽距离减半
            if ((this.index === 0 && touchMoveX > 0) ||
                (this.index === this.items.length - 1 && touchMoveX < 0)) {
                touchMoveX = touchMoveX / 2;
            }
            this.hasMove = clientX !== this.clientX;
            this.touchMoveX = touchMoveX;
        },
        handleTouchVerticalMove: function (clientX, clientY) {
            var touchMoveY = Math.abs(clientY - this.clientY);
            var opacity = Math.max(Math.min(this.defaultBackdropOpacity, this.defaultBackdropOpacity - touchMoveY / 100 / 4), 0);
            this.hasMove = clientX !== this.clientX || clientY !== this.clientY;
            this.backdropOpacity = opacity;
        },
        handleTouchEnd: function (touchType, clientX, clientY, edgeTypes) {
            if (touchType === TouchTypeEnum.Scale) {
                this.handleTouchScaleEnd(clientX, edgeTypes);
            }
            if (touchType === TouchTypeEnum.X) {
                this.handleTouchHorizontalEnd(clientX);
            }
            if (touchType === TouchTypeEnum.Y) {
                this.handleTouchVerticalEnd(clientY);
            }
            // 只要移动过，则需要动画过渡
            if (this.hasMove) {
                this.needTransition = true;
            }
            this.touched = false;
            this.hasMove = false;
            this.clientX = 0;
            this.clientY = 0;
            this.touchMoveX = 0;
        },
        handleTouchScaleEnd: function (clientX, edgeTypes) {
            var offsetX = clientX - this.clientX;
            // 下一张
            if (offsetX < -minSwitchImageOffset &&
                edgeTypes.includes(EdgeTypeEnum.Right)) {
                this.handleNext();
            }
            // 上一张
            if (offsetX > minSwitchImageOffset &&
                edgeTypes.includes(EdgeTypeEnum.Left)) {
                this.handlePrevious();
            }
        },
        handleTouchHorizontalEnd: function (clientX) {
            var offsetX = clientX - this.clientX;
            // 下一张
            if (offsetX < -minSwitchImageOffset) {
                this.handleNext();
            }
            // 上一张
            if (offsetX > minSwitchImageOffset) {
                this.handlePrevious();
            }
        },
        handleTouchVerticalEnd: function (clientY) {
            var offsetY = clientY - this.clientY;
            if (Math.abs(offsetY) > window.innerHeight * 0.14) {
                this.$emit("closeModal");
            }
            else {
                this.resetBackdropOpacity();
            }
        },
        resetBackdropOpacity: function () {
            this.backdropOpacity = this.defaultBackdropOpacity;
        },
        resetNeedTransition: function () {
            this.needTransition = false;
        },
        getItemIndex: function (item) {
            return this.items.findIndex(function (_a) {
                var key = _a.key;
                return key === item.key;
            });
        },
        handlePrevious: function () {
            if (this.index > 0) {
                this.$emit("changeIndex", this.index - 1);
            }
        },
        handleNext: function () {
            if (this.index < this.items.length - 1) {
                this.$emit("changeIndex", this.index + 1);
            }
        },
        handleClickPhoto: function (e) {
            this.$emit("clickPhoto", e);
        },
        handleClickMask: function (e) {
            this.$emit("clickMask", e);
        },
        handleClickClose: function () {
            this.$emit("closeModal");
        },
        getTransition: function () {
            var transition = "transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)";
            if (this.needTransition) {
                return transition;
            }
            if (this.hasMove) {
                return undefined;
            }
            return this.shouldTransition ? transition : undefined;
        },
    },
});

const _hoisted_1 = { class: "PhotoSlider__BannerWrap" };
const _hoisted_2 = { class: "PhotoSlider__Counter" };
const _hoisted_3 = { class: "PhotoSlider__BannerRight" };
const _hoisted_4 = {
  key: 1,
  class: "PhotoSlider__FooterWrap"
};

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_download = resolveComponent("download");
  const _component_rotate_left = resolveComponent("rotate-left");
  const _component_rotate_right = resolveComponent("rotate-right");
  const _component_flip_horizontal = resolveComponent("flip-horizontal");
  const _component_filp_vertical = resolveComponent("filp-vertical");
  const _component_close = resolveComponent("close");
  const _component_photo_view = resolveComponent("photo-view");
  const _component_arrow_left = resolveComponent("arrow-left");
  const _component_arrow_right = resolveComponent("arrow-right");

  return (openBlock(), createBlock(Teleport, { to: _ctx.teleportTo }, [
    (_ctx.photoVisible)
      ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["PhotoSlider__Wrapper", {
        PhotoSlider__Clean: _ctx.showAnimateType !== _ctx.ShowAnimateEnum.None,
        PhotoSlider__Hide: !_ctx.overlayVisible,
      }])
        }, [
          createElementVNode("div", {
            class: normalizeClass(["PhotoSlider__Backdrop", {
          PhotoSlider__fadeIn: _ctx.showAnimateType === _ctx.ShowAnimateEnum.In,
          PhotoSlider__fadeOut: _ctx.showAnimateType === _ctx.ShowAnimateEnum.Out,
        }]),
            style: normalizeStyle({
          background: `rgba(0, 0, 0, ${_ctx.backdropOpacity})`,
        }),
            onAnimationend: _cache[0] || (_cache[0] = $event => (_ctx.onShowAnimateEnd(), _ctx.resetBackdropOpacity()))
          }, null, 38 /* CLASS, STYLE, HYDRATE_EVENTS */),
          createElementVNode("div", _hoisted_1, [
            createElementVNode("div", _hoisted_2, toDisplayString(_ctx.index + 1) + " / " + toDisplayString(_ctx.items.length), 1 /* TEXT */),
            createElementVNode("div", _hoisted_3, [
              createVNode(_component_download, {
                class: "PhotoSlider__BannerIcon",
                onClick: _ctx.handleDownload
              }, null, 8 /* PROPS */, ["onClick"]),
              createVNode(_component_rotate_left, {
                class: "PhotoSlider__BannerIcon",
                onClick: _ctx.handleRotateLeft
              }, null, 8 /* PROPS */, ["onClick"]),
              createVNode(_component_rotate_right, {
                class: "PhotoSlider__BannerIcon",
                onClick: _ctx.handleRotateRight
              }, null, 8 /* PROPS */, ["onClick"]),
              createVNode(_component_flip_horizontal, {
                class: "PhotoSlider__BannerIcon",
                onClick: _ctx.toggleFlipHorizontal
              }, null, 8 /* PROPS */, ["onClick"]),
              createVNode(_component_filp_vertical, {
                class: "PhotoSlider__BannerIcon",
                onClick: _ctx.toggleFlipVertical
              }, null, 8 /* PROPS */, ["onClick"]),
              createVNode(_component_close, {
                class: "PhotoSlider__BannerIcon",
                onClick: _ctx.handleClickClose
              }, null, 8 /* PROPS */, ["onClick"])
            ])
          ]),
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.items, (item) => {
            return (openBlock(), createElementBlock("div", {
              key: item.key,
              class: "PhotoSlider__PhotoBox",
              style: normalizeStyle({
          left: `${(_ctx.innerWidth + _ctx.horizontalOffset) * _ctx.getItemIndex(item)}px`,
          transition: _ctx.getTransition(),
          transform: `translate3d(${
            -(_ctx.innerWidth + _ctx.horizontalOffset) * _ctx.index + _ctx.touchMoveX
          }px, 0px, 0px)`,
        }),
              onTransitionend: _cache[1] || (_cache[1] = (...args) => (_ctx.resetNeedTransition && _ctx.resetNeedTransition(...args))),
              onClick: _cache[2] || (_cache[2] = (...args) => (_ctx.handleClickMask && _ctx.handleClickMask(...args)))
            }, [
              createVNode(_component_photo_view, {
                ref: _ctx.setPhotoViewRef,
                "origin-rect": _ctx.originRect,
                "show-animate-type": _ctx.showAnimateType,
                src: item.src,
                onClick: withModifiers(_ctx.handleClickPhoto, ["stop"]),
                onTouchStart: _ctx.handleTouchStart,
                onTouchMove: _ctx.handleTouchMove,
                onTouchEnd: _ctx.handleTouchEnd,
                onSingleTap: _ctx.handleSingleTap
              }, null, 8 /* PROPS */, ["origin-rect", "show-animate-type", "src", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onSingleTap"])
            ], 36 /* STYLE, HYDRATE_EVENTS */))
          }), 128 /* KEYED_FRAGMENT */)),
          (!_ctx.isTouchDevice)
            ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                (_ctx.index > 0)
                  ? (openBlock(), createElementBlock("div", {
                      key: 0,
                      class: "PhotoSlider__ArrowLeft",
                      onClick: _cache[3] || (_cache[3] = (...args) => (_ctx.handlePrevious && _ctx.handlePrevious(...args)))
                    }, [
                      createVNode(_component_arrow_left)
                    ]))
                  : createCommentVNode("v-if", true),
                (_ctx.index < _ctx.items.length - 1)
                  ? (openBlock(), createElementBlock("div", {
                      key: 1,
                      class: "PhotoSlider__ArrowRight",
                      onClick: _cache[4] || (_cache[4] = (...args) => (_ctx.handleNext && _ctx.handleNext(...args)))
                    }, [
                      createVNode(_component_arrow_right)
                    ]))
                  : createCommentVNode("v-if", true)
              ], 64 /* STABLE_FRAGMENT */))
            : createCommentVNode("v-if", true),
          (_ctx.currentItem.intro)
            ? (openBlock(), createElementBlock("div", _hoisted_4, toDisplayString(_ctx.currentItem.intro), 1 /* TEXT */))
            : createCommentVNode("v-if", true)
        ], 2 /* CLASS */))
      : createCommentVNode("v-if", true)
  ], 8 /* PROPS */, ["to"]))
}

script$2.render = render$2;
script$2.__file = "src/PhotoSlider/index.vue";

var script$1 = defineComponent({
    name: 'PhotoProvider',
    components: {
        PhotoSlider: script$2
    },
    props: {
        /**
         * 图片点击是否关闭
         */
        photoClosable: {
            type: Boolean,
            default: false,
        },
        /**
         * 背景点击是否关闭
         */
        maskClosable: {
            type: Boolean,
            default: true,
        },
        /**
         * 箭头切换是否需要过渡
         */
        shouldTransition: {
            type: Boolean,
            default: false,
        },
        /**
         * 默认背景透明度
         */
        defaultBackdropOpacity: {
            type: Number,
            default: 1,
        }
    },
    emits: ['indexChange', 'visibleChange'],
    setup: function (_props, _a) {
        var emit = _a.emit;
        var onIndexChange = function () {
            emit('indexChange', { index: index, items: items, visible: visible });
        };
        var onVisibleChange = function () {
            emit('visibleChange', { index: index, items: items, visible: visible });
        };
        var _b = useIndex(onIndexChange), index = _b.index, updateIndex = _b.updateIndex;
        var _c = useItems(index), items = _c.items, updateItem = _c.updateItem, removeItem = _c.removeItem;
        var _d = useVisible(items, index, onVisibleChange), visible = _d.visible, handleHide = _d.handleHide, handleShow = _d.handleShow;
        provide(updateItemKey, updateItem);
        provide(removeItemKey, removeItem);
        provide(handleShowKey, handleShow);
        return {
            items: items,
            updateItem: updateItem,
            removeItem: removeItem,
            visible: visible,
            handleHide: handleHide,
            handleShow: handleShow,
            index: index,
            updateIndex: updateIndex,
        };
    },
    methods: {
        handleClickPhoto: function () {
            if (this.photoClosable) {
                this.handleHide();
            }
        },
        handleClickMask: function () {
            if (this.maskClosable) {
                this.handleHide();
            }
        }
    }
});

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_photo_slider = resolveComponent("photo-slider");

  return (openBlock(), createElementBlock(Fragment, null, [
    createCommentVNode(" @slot 默认插槽 "),
    renderSlot(_ctx.$slots, "default"),
    createVNode(_component_photo_slider, {
      visible: _ctx.visible,
      index: _ctx.index,
      "should-transition": _ctx.shouldTransition,
      "toggle-overlay": !_ctx.photoClosable,
      "default-backdrop-opacity": _ctx.defaultBackdropOpacity,
      items: _ctx.items,
      onClickPhoto: _ctx.handleClickPhoto,
      onClickMask: _ctx.handleClickMask,
      onChangeIndex: _ctx.updateIndex,
      onCloseModal: _ctx.handleHide
    }, null, 8 /* PROPS */, ["visible", "index", "should-transition", "toggle-overlay", "default-backdrop-opacity", "items", "onClickPhoto", "onClickMask", "onChangeIndex", "onCloseModal"])
  ], 64 /* STABLE_FRAGMENT */))
}

script$1.render = render$1;
script$1.__file = "src/PhotoProvider/index.vue";

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

var isArray$1 = isArray;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol$2 ? Symbol$2.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray$1(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/** Used to generate unique IDs. */
var idCounter = 0;

/**
 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {string} [prefix=''] The value to prefix the ID with.
 * @returns {string} Returns the unique ID.
 * @example
 *
 * _.uniqueId('contact_');
 * // => 'contact_104'
 *
 * _.uniqueId();
 * // => '105'
 */
function uniqueId(prefix) {
  var id = ++idCounter;
  return toString(prefix) + id;
}

var script = defineComponent({
    name: 'PhotoConsumer',
    props: {
        /**
         * 图片地址
         */
        src: {
            type: String,
            required: true,
        },
        /**
         * 图片介绍
         */
        intro: {
            type: String,
            default: null
        },
        /**
         * 图片下载名称，默认图片名称
         */
        downloadName: {
            type: String,
            default: null
        }
    },
    setup: function (props) {
        var updateItem = inject(updateItemKey);
        var handleShow = inject(handleShowKey);
        var root = ref(null);
        var key = uniqueId();
        var _a = toRefs(props), src = _a.src, intro = _a.intro, downloadName = _a.downloadName;
        var handleClick = function () {
            handleShow === null || handleShow === void 0 ? void 0 : handleShow(key);
        };
        var getItem = function () { return ({
            key: key,
            src: src.value,
            originRef: root.value,
            intro: intro.value,
            downloadName: downloadName.value
        }); };
        watch([src, intro, downloadName], function () {
            updateItem === null || updateItem === void 0 ? void 0 : updateItem(getItem());
        });
        onMounted(function () {
            updateItem === null || updateItem === void 0 ? void 0 : updateItem(getItem());
        });
        return {
            root: root,
            handleClick: handleClick
        };
    },
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_ctx.$slots.default())
    ? (openBlock(), createElementBlock("span", {
        key: 0,
        ref: "root",
        style: {"display":"inline-block"},
        class: "PhotoConsumer",
        onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.handleClick && _ctx.handleClick(...args)))
      }, [
        createCommentVNode(" @slot 默认插槽 "),
        renderSlot(_ctx.$slots, "default")
      ], 512 /* NEED_PATCH */))
    : createCommentVNode("v-if", true)
}

script.render = render;
script.__file = "src/PhotoConsumer/index.vue";

var components = [
    script$1,
    script,
    script$2
];
var install = function (app) {
    components.forEach(function (component) {
        app.component(component.name, component);
    });
};
var index = { install: install };

export { EdgeTypeEnum, script as PhotoConsumer, script$1 as PhotoProvider, script$2 as PhotoSlider, ShowAnimateEnum, TouchTypeEnum, index as default };
//# sourceMappingURL=vue3-photo-preview.esm.js.map

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('art-template/lib/template-web')) :
  typeof define === 'function' && define.amd ? define(['exports', 'art-template/lib/template-web'], factory) :
  (global = global || self, factory(global.Ark = {}, global.template));
}(this, function (exports, template) { 'use strict';

  template = template && template.hasOwnProperty('default') ? template['default'] : template;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  function _newArrowCheck(innerThis, boundThis) {
    if (innerThis !== boundThis) {
      throw new TypeError("Cannot instantiate an arrow function");
    }
  }

  var rule = {
    test: /<x\-([a-z]\w*)(?:\s+((?:\S|\s)*?))?(?:\/|(?:>((?:\S|\s)*?)<\/x\-\1))>/gim,
    // 第二个\s，可以\r|\n|\f
    use: function use(match, Plugin, props, children) {
      var hasChildren = !!children;
      var propsString = stringifyProps(props || '', hasChildren ? "__template__.render('" + children.replace(/(?:\r|\n)/gm, '\\n').replace(/\'/gm, '\\\'') + "', $data)" : '""');
      return {
        // code: `(__self__ ? __self__.__components__[__self__.__components__.push(new ${Plugin}(${propsString})) - 1] : '')`,
        code: "(__self__ ? __self__.__renderComponent__(" + Plugin + ", " + propsString + ") : '')",
        output: 'raw'
      };
    }
  };
  var PROPS_REG_EXP = /([a-z]\w*)(?:\=(["']){{\s*(.*?)\s*}}\2)?/gim;

  function stringifyProps(propsString, children) {
    PROPS_REG_EXP.lastIndex = 0;
    var props = ["children:" + children];
    var match;

    while (match = PROPS_REG_EXP.exec(propsString)) {
      props.push(match[1] + ":" + (match[3] || 'true'));
    }

    return "{" + props.join(',') + "}";
  }

  template.defaults.rules.unshift(rule);

  var arkId = 'data-ark-id';

  function is(o) {
    return Object.prototype.toString.call(o).slice(8, -1).toLowerCase();
  }
  function isFunction(fn) {
    return is(fn) === 'function';
  }
  function upperFirst(s) {
    return s.replace(/^\w/, function (m0) {
      return m0.toUpperCase();
    });
  }
  function g(salt) {
    if (salt === void 0) {
      salt = 'SALT';
    }

    return Math.random().toString(32).slice(2) + "." + salt;
  }
  var SIMPLE_HTML_REG = /^<([a-z]\w*)/i;
  function insertArkId(html, id) {
    return html.replace(SIMPLE_HTML_REG, function (m0) {
      return m0 + " " + arkId + "=\"" + id + "\"";
    });
  }
  function getBody() {
    document.body || document.getElementsByTagName('body')[0];
  }

  var _KEYCODE_TO_EVENT_NAM;

  var VK_0 = window.VK_0 || 48;
  var VK_1 = window.VK_1 || 49;
  var VK_2 = window.VK_2 || 50;
  var VK_3 = window.VK_3 || 51;
  var VK_4 = window.VK_4 || 52;
  var VK_5 = window.VK_5 || 53;
  var VK_6 = window.VK_6 || 54;
  var VK_7 = window.VK_7 || 55;
  var VK_8 = window.VK_8 || 56;
  var VK_9 = window.VK_9 || 57;
  var VK_PLAY = window.VK_PLAY || 0;
  var VK_PAUSE = window.VK_PAUSE || 0;
  var VK_STOP = window.VK_STOP || 0;
  var VK_FAST_FWD = window.VK_FAST_FWD || 0;
  var VK_REWIND = window.VK_REWIND || 0;
  var VK_BACK = window.VK_BACK || 8;
  var VK_DOWN = window.VK_DOWN || 40;
  var VK_UP = window.VK_UP || 38;
  var VK_LEFT = window.VK_LEFT || 37;
  var VK_RIGHT = window.VK_RIGHT || 39;
  var VK_ENTER = window.VK_ENTER || 13;
  var VK_RED = window.VK_RED || 112; // F1

  var VK_GREEN = window.VK_GREEN || 113; // F2

  var VK_YELLOW = window.VK_YELLOW || 114; // F3

  var VK_BLUE = window.VK_BLUE || 115; // F4

  var VK_MENU = window.VK_MENU || 116; // F5

  var KEYCODE_TO_EVENT_NAME = (_KEYCODE_TO_EVENT_NAM = {}, _KEYCODE_TO_EVENT_NAM[VK_0] = 'd0', _KEYCODE_TO_EVENT_NAM[VK_1] = 'd1', _KEYCODE_TO_EVENT_NAM[VK_2] = 'd2', _KEYCODE_TO_EVENT_NAM[VK_3] = 'd3', _KEYCODE_TO_EVENT_NAM[VK_4] = 'd4', _KEYCODE_TO_EVENT_NAM[VK_5] = 'd5', _KEYCODE_TO_EVENT_NAM[VK_6] = 'd6', _KEYCODE_TO_EVENT_NAM[VK_7] = 'd7', _KEYCODE_TO_EVENT_NAM[VK_8] = 'd8', _KEYCODE_TO_EVENT_NAM[VK_9] = 'd9', _KEYCODE_TO_EVENT_NAM[VK_PLAY] = 'play', _KEYCODE_TO_EVENT_NAM[VK_PAUSE] = 'pause', _KEYCODE_TO_EVENT_NAM[VK_STOP] = 'stop', _KEYCODE_TO_EVENT_NAM[VK_FAST_FWD] = 'fast_fwd', _KEYCODE_TO_EVENT_NAM[VK_REWIND] = 'rewind', _KEYCODE_TO_EVENT_NAM[VK_BACK] = 'back', _KEYCODE_TO_EVENT_NAM[VK_DOWN] = 'down', _KEYCODE_TO_EVENT_NAM[VK_UP] = 'up', _KEYCODE_TO_EVENT_NAM[VK_LEFT] = 'left', _KEYCODE_TO_EVENT_NAM[VK_RIGHT] = 'right', _KEYCODE_TO_EVENT_NAM[VK_ENTER] = 'enter', _KEYCODE_TO_EVENT_NAM[VK_RED] = 'red', _KEYCODE_TO_EVENT_NAM[VK_GREEN] = 'green', _KEYCODE_TO_EVENT_NAM[VK_YELLOW] = 'yellow', _KEYCODE_TO_EVENT_NAM[VK_BLUE] = 'blue', _KEYCODE_TO_EVENT_NAM[VK_MENU] = 'menu', _KEYCODE_TO_EVENT_NAM);

  var FOCUS_EVENT_SUPPORTED = document.implementation.hasFeature('FocusEvent', '3.0');

  var NormalEvents = function () {
    var _ref;

    var focus = 'focusin';
    var blur = 'focusout';

    if (!FOCUS_EVENT_SUPPORTED) {
      focus = 'DOMFocusIn';
      blur = 'DOMFocusOut';
    } // key: value, key是实际event对象的event.type，value是art-template文件里的on-[EVENT_TYPE]


    return _ref = {}, _ref[focus] = 'focus', _ref[blur] = 'blur', _ref;
  }();

  var KeyEvents = ['keydown']; // 事件回调方法名不要使用onKeydown/onFocus.../on[Native-Envet-Name]

  var Event =
  /*#__PURE__*/
  function () {
    function Event() {
      this.__bindEventThis__();
    } // 以下三个为顶级默认事件处理函数
    // onKeydown() {}
    // onFocus() {}
    // onBlur() {}


    var _proto = Event.prototype;

    _proto.__bindEventThis__ = function __bindEventThis__() {
      this.__handleKeyevents__ = this.__handleKeyevents__.bind(this);
      this.__handleNormalEvent__ = this.__handleNormalEvent__.bind(this);
    };

    _proto.__bindEvents__ = function __bindEvents__() {
      this.__liveEvents__('add');
    };

    _proto.__unbindEvents__ = function __unbindEvents__() {
      this.__liveEvents__('remove');
    };

    _proto.__liveEvents__ = function __liveEvents__(name) {
      var el = this.el;
      var hand = name + "EventListener";

      for (var j = KeyEvents.length; j--;) {
        el[hand](KeyEvents[j], this.__handleKeyevents__, false);
      }

      for (var k in NormalEvents) {
        if (NormalEvents.hasOwnProperty(k)) {
          el[hand](k, this.__handleNormalEvent__, false);
        }
      }
    };

    _proto.__handleKeyevents__ = function __handleKeyevents__(evt) {
      var keyCode = evt.keyCode;
      var evtType = KEYCODE_TO_EVENT_NAME[keyCode] || evt.type;
      evtType && this.__handleEvents__(evt, evtType);
    };

    _proto.__handleNormalEvent__ = function __handleNormalEvent__(evt) {
      var type = evt.type;
      var evtType = NormalEvents[type];
      evtType && this.__handleEvents__(evt, evtType);
    };

    _proto.__handleEvents__ = function __handleEvents__(evt, evtType) {
      var body = getBody();
      var proxyEvt = evt.proxied ? evt : proxyEvent(evt);
      var nativeEvtName = proxyEvt.type.toLowerCase();
      var fallbackEvtType = (NormalEvents[nativeEvtName] || nativeEvtName).toLowerCase();
      var el = proxyEvt.target;
      var ending = this.el; // 到容器了就结束

      do {
        this.__triggerEvent__(proxyEvt, el, el.getAttribute("on-" + evtType) || el.getAttribute("on-" + fallbackEvtType));

        if (el === ending || el === body) break;
      } while (!proxyEvt.cancelBubble && (el = el.parentNode));

      if (!proxyEvt.cancelBubble) {
        // 没有被阻止，调用默认的onKeydown/onFoucs等onXX
        this.__triggerEvent__(proxyEvt, el, "on" + upperFirst(fallbackEvtType));
      }
    };

    _proto.__triggerEvent__ = function __triggerEvent__(evt, el, evtName) {
      if (evtName && isFunction(this[evtName])) {
        this[evtName](evt, el);
      }
    };

    return Event;
  }();

  function proxyEvent(evt) {
    evt.proxied = true;
    evt.__originalStop__ = evt.stopPropagation;

    if (!('cancelBubble' in evt)) {
      evt.cancelBubble = false;
    }

    evt.stopPropagation = function () {
      evt.__originalStop__();

      if (!evt.cancelBubble) evt.cancelBubble = true;
    };

    return evt;
  }

  var Manager, ComSet;

  if (!window.Manager) {
    ComSet = {};
    Manager = {
      ComponentSet: ComSet,
      peelArkComponents: peelArkComponents
    };
  }

  window.__Manager__ || (window.__Manager__ = Manager);
  var ComponentSet = window.__Manager__.ComponentSet;
  function peelArkComponents(container) {
    var comSet = window.__Manager__.ComponentSet;
    var all = container.getElementsByTagName('*');

    for (var k = all.length; k--;) {
      var el = all[k];
      var id = el.getAttribute(arkId);

      if (id) {
        comSet[id] = el;
      }
    }
  }

  var Component =
  /*#__PURE__*/
  function (_Event) {
    _inheritsLoose(Component, _Event);

    function Component(props) {
      var _this;

      _this = _Event.call(this) || this;
      _this.props = props || {};
      _this.data = {};
      _this.id = g('ark');

      var __template__ = _this.render() || '';

      _this.__renderer__ = template.compile(__template__.replace('{{children}}', _this.props.children || ''));
      _this.__components__ = [];
      _this.__updatePropsCursor__ = 0; // 绑定this

      _this.bind();

      return _this;
    } // <InterfaceAPI>
    // <InitAPI>


    var _proto = Component.prototype;

    _proto.willMount = function willMount() {};

    _proto.didMount = function didMount() {} // </InitAPI>
    // <LifeAPI>
    ;

    _proto.render = function render() {
      return '';
    };

    _proto.setData = function setData(patch) {
      var nextData = _objectSpread({}, this.data, patch || {});

      this.__doUpdate__(nextData);

      this.data = nextData;
    } // </LifeAPI>
    // <UpateAPI>
    ;

    _proto.willUpdate = function willUpdate() {};

    _proto.willReceiveProps = function willReceiveProps() {};

    _proto.didUpdate = function didUpdate() {} // </UpateAPI>
    ;

    _proto.bind = function bind() {} // </InterfaceAPI>
    // <PrivateAPI>
    ;

    _proto.toString = function toString() {
      return this.__render__();
    };

    _proto.__render__ = function __render__(data) {
      if (data === void 0) {
        data = this.data;
      }

      return insertArkId(this.__renderer__(_objectSpread({}, this.props, data, this.constructor.components || {}, {
        __self__: this,
        __template__: template
      })).trim(), this.id);
    };

    _proto.__willMount__ = function __willMount__() {
      this.willMount();

      this.__do__('__willMount__');
    };

    _proto.__didMount__ = function __didMount__() {
      this.el = ComponentSet[this.id];

      this.__bindEvents__();

      this.didMount();

      this.__do__('__didMount__');
    };

    _proto.__willUpdate__ = function __willUpdate__() {
      this.willUpdate();

      this.__do__('__willUpdate__');

      this.__unbindEvents__();
    };

    _proto.__didUpdate__ = function __didUpdate__() {
      this.el = ComponentSet[this.id];
      this.didUpdate();

      this.__do__('__didUpdate__');

      this.__bindEvents__();

      this.__updatePropsCursor__ = 0;
    };

    _proto.__doUpdate__ = function __doUpdate__(data) {
      if (data === void 0) {
        data = this.data;
      }

      this.__willUpdate__();

      var html = this.__render__(data);

      var newEl = this.__buildEl__(html);

      this.el.parentNode.replaceChild(newEl, this.el);
      peelArkComponents(ComponentSet[this.id] = newEl);

      this.__didUpdate__();
    };

    _proto.__willReceiveProps__ = function __willReceiveProps__(nextProps) {
      this.willReceiveProps(nextProps);
      this.props = nextProps;
    };

    _proto.__buildEl__ = function __buildEl__(html) {
      var proxy = document.createElement('div');
      proxy.innerHTML = html;
      return proxy.firstChild;
    };

    _proto.__do__ = function __do__(name) {
      var __components__ = this.__components__;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      for (var k = __components__.length; k--;) {
        var _components__$k;

        (_components__$k = __components__[k])[name].apply(_components__$k, args);
      }
    };

    _proto.__renderComponent__ = function __renderComponent__(Type, props) {
      var component = this.__components__[this.__updatePropsCursor__++];

      if (!!component) {
        component.__willReceiveProps__(props);
      } else {
        this.__components__.push(component = new Type(props));
      }

      return component;
    } // </PrivateAPI>
    ;

    return Component;
  }(Event); // 定义该组件有哪些子组件，子组件是一个组件类，不是实例
  Component.components = {};

  var ArkDOM = {};

  ArkDOM.render = function (element, container, callback) {
    var _this = this;

    if (container === void 0) {
      container = document.getElementsByTagName('body')[0];
    }

    if (callback === void 0) {
      callback = function callback() {
        _newArrowCheck(this, _this);

        return void 0;
      }.bind(this);
    }

    if (!container || container.nodeType !== 1) return; // const el = new Element

    element.__willMount__(); // container.innerHTML += element


    container.appendChild(generateDom(element));
    peelArkComponents(container);

    element.__didMount__();

    callback();
  };

  function generateDom(element) {
    var proxy = document.createElement('div');
    proxy.innerHTML = element;
    return proxy.firstChild;
  }

  var Ark = {
    Component: Component
  };
  var Component$1 = Component;

  exports.ArkDOM = ArkDOM;
  exports.Component = Component$1;
  exports.default = Ark;

  Object.defineProperty(exports, '__esModule', { value: true });

}));

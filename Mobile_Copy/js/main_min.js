var gctongji
;(function () {
  function five_tongji() {
    try {
      var MD5 = function (string) {
        function RotateLeft(lValue, iShiftBits) {
          return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits))
        }
        function AddUnsigned(lX, lY) {
          var lX4, lY4, lX8, lY8, lResult
          lX8 = lX & 2147483648
          lY8 = lY & 2147483648
          lX4 = lX & 1073741824
          lY4 = lY & 1073741824
          lResult = (lX & 1073741823) + (lY & 1073741823)
          if (lX4 & lY4) {
            return lResult ^ 2147483648 ^ lX8 ^ lY8
          }
          if (lX4 | lY4) {
            if (lResult & 1073741824) {
              return lResult ^ 3221225472 ^ lX8 ^ lY8
            } else {
              return lResult ^ 1073741824 ^ lX8 ^ lY8
            }
          } else {
            return lResult ^ lX8 ^ lY8
          }
        }
        function F(x, y, z) {
          return (x & y) | (~x & z)
        }
        function G(x, y, z) {
          return (x & z) | (y & ~z)
        }
        function H(x, y, z) {
          return x ^ y ^ z
        }
        function I(x, y, z) {
          return y ^ (x | ~z)
        }
        function FF(a, b, c, d, x, s, ac) {
          a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac))
          return AddUnsigned(RotateLeft(a, s), b)
        }
        function GG(a, b, c, d, x, s, ac) {
          a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac))
          return AddUnsigned(RotateLeft(a, s), b)
        }
        function HH(a, b, c, d, x, s, ac) {
          a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac))
          return AddUnsigned(RotateLeft(a, s), b)
        }
        function II(a, b, c, d, x, s, ac) {
          a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac))
          return AddUnsigned(RotateLeft(a, s), b)
        }
        function ConvertToWordArray(string) {
          var lWordCount
          var lMessageLength = string.length
          var lNumberOfWords_temp1 = lMessageLength + 8
          var lNumberOfWords_temp2 =
            (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64
          var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16
          var lWordArray = Array(lNumberOfWords - 1)
          var lBytePosition = 0
          var lByteCount = 0
          while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4
            lBytePosition = (lByteCount % 4) * 8
            lWordArray[lWordCount] =
              lWordArray[lWordCount] |
              (string.charCodeAt(lByteCount) << lBytePosition)
            lByteCount++
          }
          lWordCount = (lByteCount - (lByteCount % 4)) / 4
          lBytePosition = (lByteCount % 4) * 8
          lWordArray[lWordCount] =
            lWordArray[lWordCount] | (128 << lBytePosition)
          lWordArray[lNumberOfWords - 2] = lMessageLength << 3
          lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29
          return lWordArray
        }
        function WordToHex(lValue) {
          var WordToHexValue = '',
            WordToHexValue_temp = '',
            lByte,
            lCount
          for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255
            WordToHexValue_temp = '0' + lByte.toString(16)
            WordToHexValue =
              WordToHexValue +
              WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2)
          }
          return WordToHexValue
        }
        function Utf8Encode(string) {
          string = string.replace(/\r\n/g, '\n')
          var utftext = ''
          for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n)
            if (c < 128) {
              utftext += String.fromCharCode(c)
            } else {
              if (c > 127 && c < 2048) {
                utftext += String.fromCharCode((c >> 6) | 192)
                utftext += String.fromCharCode((c & 63) | 128)
              } else {
                utftext += String.fromCharCode((c >> 12) | 224)
                utftext += String.fromCharCode(((c >> 6) & 63) | 128)
                utftext += String.fromCharCode((c & 63) | 128)
              }
            }
          }
          return utftext
        }
        var x = Array()
        var k, AA, BB, CC, DD, a, b, c, d
        var S11 = 7,
          S12 = 12,
          S13 = 17,
          S14 = 22
        var S21 = 5,
          S22 = 9,
          S23 = 14,
          S24 = 20
        var S31 = 4,
          S32 = 11,
          S33 = 16,
          S34 = 23
        var S41 = 6,
          S42 = 10,
          S43 = 15,
          S44 = 21
        string = Utf8Encode(string)
        x = ConvertToWordArray(string)
        a = 1732584193
        b = 4023233417
        c = 2562383102
        d = 271733878
        for (k = 0; k < x.length; k += 16) {
          AA = a
          BB = b
          CC = c
          DD = d
          a = FF(a, b, c, d, x[k + 0], S11, 3614090360)
          d = FF(d, a, b, c, x[k + 1], S12, 3905402710)
          c = FF(c, d, a, b, x[k + 2], S13, 606105819)
          b = FF(b, c, d, a, x[k + 3], S14, 3250441966)
          a = FF(a, b, c, d, x[k + 4], S11, 4118548399)
          d = FF(d, a, b, c, x[k + 5], S12, 1200080426)
          c = FF(c, d, a, b, x[k + 6], S13, 2821735955)
          b = FF(b, c, d, a, x[k + 7], S14, 4249261313)
          a = FF(a, b, c, d, x[k + 8], S11, 1770035416)
          d = FF(d, a, b, c, x[k + 9], S12, 2336552879)
          c = FF(c, d, a, b, x[k + 10], S13, 4294925233)
          b = FF(b, c, d, a, x[k + 11], S14, 2304563134)
          a = FF(a, b, c, d, x[k + 12], S11, 1804603682)
          d = FF(d, a, b, c, x[k + 13], S12, 4254626195)
          c = FF(c, d, a, b, x[k + 14], S13, 2792965006)
          b = FF(b, c, d, a, x[k + 15], S14, 1236535329)
          a = GG(a, b, c, d, x[k + 1], S21, 4129170786)
          d = GG(d, a, b, c, x[k + 6], S22, 3225465664)
          c = GG(c, d, a, b, x[k + 11], S23, 643717713)
          b = GG(b, c, d, a, x[k + 0], S24, 3921069994)
          a = GG(a, b, c, d, x[k + 5], S21, 3593408605)
          d = GG(d, a, b, c, x[k + 10], S22, 38016083)
          c = GG(c, d, a, b, x[k + 15], S23, 3634488961)
          b = GG(b, c, d, a, x[k + 4], S24, 3889429448)
          a = GG(a, b, c, d, x[k + 9], S21, 568446438)
          d = GG(d, a, b, c, x[k + 14], S22, 3275163606)
          c = GG(c, d, a, b, x[k + 3], S23, 4107603335)
          b = GG(b, c, d, a, x[k + 8], S24, 1163531501)
          a = GG(a, b, c, d, x[k + 13], S21, 2850285829)
          d = GG(d, a, b, c, x[k + 2], S22, 4243563512)
          c = GG(c, d, a, b, x[k + 7], S23, 1735328473)
          b = GG(b, c, d, a, x[k + 12], S24, 2368359562)
          a = HH(a, b, c, d, x[k + 5], S31, 4294588738)
          d = HH(d, a, b, c, x[k + 8], S32, 2272392833)
          c = HH(c, d, a, b, x[k + 11], S33, 1839030562)
          b = HH(b, c, d, a, x[k + 14], S34, 4259657740)
          a = HH(a, b, c, d, x[k + 1], S31, 2763975236)
          d = HH(d, a, b, c, x[k + 4], S32, 1272893353)
          c = HH(c, d, a, b, x[k + 7], S33, 4139469664)
          b = HH(b, c, d, a, x[k + 10], S34, 3200236656)
          a = HH(a, b, c, d, x[k + 13], S31, 681279174)
          d = HH(d, a, b, c, x[k + 0], S32, 3936430074)
          c = HH(c, d, a, b, x[k + 3], S33, 3572445317)
          b = HH(b, c, d, a, x[k + 6], S34, 76029189)
          a = HH(a, b, c, d, x[k + 9], S31, 3654602809)
          d = HH(d, a, b, c, x[k + 12], S32, 3873151461)
          c = HH(c, d, a, b, x[k + 15], S33, 530742520)
          b = HH(b, c, d, a, x[k + 2], S34, 3299628645)
          a = II(a, b, c, d, x[k + 0], S41, 4096336452)
          d = II(d, a, b, c, x[k + 7], S42, 1126891415)
          c = II(c, d, a, b, x[k + 14], S43, 2878612391)
          b = II(b, c, d, a, x[k + 5], S44, 4237533241)
          a = II(a, b, c, d, x[k + 12], S41, 1700485571)
          d = II(d, a, b, c, x[k + 3], S42, 2399980690)
          c = II(c, d, a, b, x[k + 10], S43, 4293915773)
          b = II(b, c, d, a, x[k + 1], S44, 2240044497)
          a = II(a, b, c, d, x[k + 8], S41, 1873313359)
          d = II(d, a, b, c, x[k + 15], S42, 4264355552)
          c = II(c, d, a, b, x[k + 6], S43, 2734768916)
          b = II(b, c, d, a, x[k + 13], S44, 1309151649)
          a = II(a, b, c, d, x[k + 4], S41, 4149444226)
          d = II(d, a, b, c, x[k + 11], S42, 3174756917)
          c = II(c, d, a, b, x[k + 2], S43, 718787259)
          b = II(b, c, d, a, x[k + 9], S44, 3951481745)
          a = AddUnsigned(a, AA)
          b = AddUnsigned(b, BB)
          c = AddUnsigned(c, CC)
          d = AddUnsigned(d, DD)
        }
        var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d)
        return temp.toLowerCase()
      }
      '1'.startsWith ||
        (String.prototype.startsWith = function (str) {
          if (
            str == null ||
            str == '' ||
            this.length == 0 ||
            str.length > this.length
          ) {
            return false
          }
          if (this.substr(0, str.length) == str) {
            return true
          } else {
            return false
          }
          return true
        })
      function getallattribute(element) {
        var t = element.attributes
        var result = {}
        for (var index in t) {
          try {
            if (index >= 0) {
              result[t[index].name] = t[index].value
            }
          } catch (ex) {}
        }
        return result
      }
      function readXPath(element) {
        return ''
      }
      function trimStr(str) {
        return str.replace(/(^\s*)|(\s*$)/g, '')
      }
      function getSelector(element) {
        if (element == document.body) {
          return 'body'
        }
        if (element.tagName == 'HTML') {
          return 'html'
        }
        if (
          element.id !== '' &&
          element.id != null &&
          typeof element.id != 'undefined'
        ) {
          var id = element.id
          var _ids = document.getElementById(id)
          if (id.indexOf(' ') == -1 && _ids != null) {
            return '#' + id
          }
        }
        if (_class) {
          var _class = element.getAttribute('class')
          _class = trimStr(_class)
          var _classes = document.getElementsByClassName(_class)
          if (_classes.length == 1) {
            return '.' + _class.replace(/\s+/g, '.')
          }
        }
        var parent_node = element.parentNode
        var _ = null
        if (parent_node == document.body) {
          _ = 'body>' + element.tagName.toLowerCase()
        } else {
          _ = getSelector(parent_node) + '>' + element.tagName.toLowerCase()
        }
        var _elems = jQuery(parent_node).children()
        var _index = -1
        var _break = false
        jQuery.map(_elems, function (x, _index_) {
          if (x.tagName == element.tagName && _break == false) {
            _index += 1
            if (x == element) {
              _break = true
            }
          }
        })
        if (_index == 0) {
          return _
        } else {
          return _ + ':eq(' + _index + ')'
        }
      }
      function forIn(obj, handler) {
        for (var i in obj) {
          if (obj.hasOwnProperty(i)) {
            handler(i, obj[i])
          }
        }
      }
      function each(arr, handler) {
        for (var i = 0, len = arr.length; i < len; i += 1) {
          handler(i, arr[i])
        }
      }
      window.JSON = window.JSON || {}
      if (!JSON.parse) {
        JSON.parse = function (json) {
          return eval('1,' + json)
        }
      }
      if (!JSON.stringify) {
        ;(function (JSON) {
          var arr = '[object Array]',
            obj = '[object Object]'
          JSON.stringify = function (json) {
            var t = ''
            var m = Object.prototype.toString.call(json)
            if (m == arr) {
              t = ArrPartten(json)
            } else {
              if (m == obj) {
                t = ObjectJson(json)
              } else {
                t = json
              }
            }
            return t
          }
          function ObjectParse() {
            var t = '{'
            forIn(json, function (i, ele) {
              var m = Object.prototype.toString.call(ele)
              if (m == arr) {
                t += i + ':' + ArrPartten(ele) + ','
              } else {
                if (m == obj) {
                  t += i + ':' + ObjectJson(ele) + ','
                } else {
                  t += i + ':' + ele + ','
                }
              }
            })
            if (t.length != 1) {
              t = t.substring(0, t.length - 1)
            }
            return t + '}'
          }
          function ArrayParse() {
            var t = '['
            each(json, function (i, ele) {
              var m = Object.prototype.toString.call(ele)
              if (m == arr) {
                t += ArrPartten(ele) + ','
              } else {
                if (m == obj) {
                  t += ObjectJson(ele) + ','
                } else {
                  t += ele + ','
                }
              }
            })
            if (json.length > 0) {
              t = t.substring(0, t.length - 1)
            }
            return t + ']'
          }
        })(JSON)
      }
      function IsPC() {
        var userAgentInfo = navigator.userAgent
        var Agents = new Array(
          'Android',
          'iPhone',
          'SymbianOS',
          'Windows Phone',
          'iPad',
          'iPod',
        )
        var flag = true
        for (var v = 0; v < Agents.length; v++) {
          if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false
            break
          }
        }
        return flag
      }
      function get_timestamp() {
        var _ = new Date().valueOf()
        return parseInt(_ / 1000)
      }
      function parseURL(url) {
        var a = document.createElement('a')
        a.href = url
        return {
          source: url,
          protocol: a.protocol.replace(':', ''),
          host: a.hostname,
          port: a.port,
          query: a.search,
          params: (function () {
            var ret = {},
              seg = a.search.replace(/^\?/, '').split('&'),
              len = seg.length,
              i = 0,
              s
            for (; i < len; i++) {
              if (!seg[i]) {
                continue
              }
              s = seg[i].split('=')
              ret[s[0]] = s[1]
            }
            return ret
          })(),
          file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
          hash: a.hash.replace('#', ''),
          path: a.pathname.replace(/^([^\/])/, '/$1'),
          relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
          segments: a.pathname.replace(/^\//, '').split('/'),
        }
      }
      function get_host_se_kw(url) {
        var se_config = []
        se_config.push(['www.baidu.com', '百度搜索', 'wd'])
        se_config.push(['m.baidu.com', '百度移动搜索', 'word'])
        se_config.push(['google', '谷歌搜索', 'q'])
        se_config.push(['www.so.com', '360搜索', 'q'])
        se_config.push(['m.so.com', '360移动搜索', 'q'])
        se_config.push(['www.sogou.com', '搜狗搜索', 'query'])
        se_config.push(['m.sogou.com', '搜狗移动搜索', 'keyword'])
        se_config.push(['www.bing.com', '微软bing搜索', 'q'])
        se_config.push(['cn.bing.com', '微软bing搜索', 'q'])
        se_config.push(['yahoo.com', '雅虎搜索', 'p'])
        se_config.push(['gougou', '狗狗搜索', 'q'])
        se_config.push(['m.sm.cn', '神马搜索', 'q'])
        se_config.push(['product.gongchang.com', '工厂网产品搜索', 'wd'])
        se_config.push(['company.gongchang.com', '工厂网企业搜索', 'wd'])
        se_config.push(['m-p.gongchang.com', '工厂网移动产品搜索', 'wd'])
        se_config.push(['m-c.gongchang.com', '工厂网移动企业搜索', 'wd'])
        if (!url) {
          return ['', '', '']
        }
        var obj = parseURL(url)
        var host = obj.host
        var se = ''
        var kw = ''
        for (var x = 0; x < se_config.length; x++) {
          var _h = se_config[x][0]
          var _s = se_config[x][1]
          var _q = se_config[x][2]
          if (host.indexOf(_h) != -1) {
            se = _s
            kw = obj.params[_q] || ''
          }
        }
        return [host, se, decodeURIComponent(kw)]
      }
      function getParam(url) {
        var search = url.substring(url.indexOf('?') + 1)
        var tmpArr = search.split('&')
        var urlParmObj = {}
        if (tmpArr.length > 0 && tmpArr[0] != '') {
          for (var i = 0, len = tmpArr.length; i < len; i++) {
            var tmp = tmpArr[i].split('=')
            urlParmObj[tmp[0]] = tmp[1]
          }
        }
        return urlParmObj
      }
      var kw_cache = {}
      function pass_data_to_server(data) {
        var src_host = '//5tongji.westarcloud.com'
        var src_params = '/5tongji/tongji.jpg'
        src_params += '?_=' + get_timestamp()
        var kw_exist = false
        for (var key in data) {
          if (key != 'refer_kw') {
            var value = encodeURIComponent(data[key])
            src_params += '&' + key + '=' + value
          } else {
            if (data[key]) {
              kw_exist = true
              var value = encodeURIComponent(data[key])
              src_params += '&' + key + '=' + value
            }
          }
        }
        if (kw_exist) {
          new Image().src = src_host + src_params + '&_s=' + MD5(src_params)
        } else {
          var refer_kw = ''
          var url = document.referrer
          var eqid = getParam(url).eqid
          if (eqid) {
            var kw = kw_cache.eqid
            if (kw) {
              refer_kw = kw
              src_params += '&refer_kw=' + refer_kw
              new Image().src = src_host + src_params + '&_s=' + MD5(src_params)
            } else {
              $.ajax({
                type: 'GET',
                dataType: 'jsonp',
                url: 'https://baiduapi.gongchang.com/baidu_refer/?eqid=' + eqid,
                success: function (res) {
                  if (res.status) {
                    refer_kw = res.data.wd
                  }
                },
                complete: function () {
                  kw_cache = { eqid: refer_kw }
                  src_params += '&refer_kw=' + refer_kw
                  var secret = MD5(src_params)
                  new Image().src = src_host + src_params + '&_s=' + secret
                },
              })
            }
          } else {
            src_params += '&refer_kw=' + refer_kw
            new Image().src = src_host + src_params + '&_s=' + MD5(src_params)
          }
        }
      }
      var client_open_timestamp = get_timestamp()
      var client_last_event_timestamp = client_open_timestamp
      var client_last_event = null
      var href = document.location.href
      var url = href
      var url_info = get_host_se_kw(url)
      var url_host = url_info[0]
      var url_se = url_info[1]
      var url_kw = url_info[2]
      var title = document.title
      var refer = document.referrer
      var refer_info = get_host_se_kw(refer)
      var refer_host = refer_info[0]
      var refer_se = refer_info[1]
      var refer_kw = refer_info[2]
      var devicetype = IsPC() ? 0 : 1
      var tag = MD5(href + refer + client_last_event_timestamp + Math.random())
      function document_ready() {
        var pass_data =
          typeof window.siteConfig == 'undefined' ? {} : window.siteConfig
        pass_data['client_open_tag'] = tag
        pass_data['client_open_timestamp'] = client_open_timestamp
        pass_data['client_event_timestamp'] = client_open_timestamp
        pass_data['client_last_event_timestamp'] = ''
        pass_data['url'] = href
        pass_data['title'] = title
        pass_data['refer'] = refer
        pass_data['url_host'] = url_host
        pass_data['url_se'] = url_se
        pass_data['url_kw'] = url_kw
        pass_data['refer_host'] = refer_host
        pass_data['refer_se'] = refer_se
        pass_data['refer_kw'] = refer_kw
        pass_data['event'] = 'ready'
        pass_data['devicetype'] = devicetype
        pass_data_to_server(pass_data)
      }
      try {
        document_ready()
      } catch (_) {}
      jQuery(document).on('click ', function (event) {
        try {
          var pass_data =
            typeof window.siteConfig == 'undefined' ? {} : window.siteConfig
          var target = event.target
          var _time = get_timestamp()
          pass_data['client_open_tag'] = tag
          pass_data['client_open_timestamp'] = client_open_timestamp
          pass_data['client_event_timestamp'] = _time
          pass_data['client_event_timedelta'] =
            _time - client_last_event_timestamp
          pass_data['client_last_event_timestamp'] = client_last_event_timestamp
          client_last_event_timestamp = _time
          client_last_event = 'click'
          pass_data['url'] = href
          pass_data['title'] = title
          pass_data['refer'] = refer
          pass_data['url_host'] = url_host
          pass_data['url_se'] = url_se
          pass_data['url_kw'] = url_kw
          pass_data['refer_host'] = refer_host
          pass_data['refer_se'] = refer_se
          pass_data['refer_kw'] = refer_kw
          pass_data['event'] = 'click'
          pass_data['devicetype'] = devicetype
          pass_data['event_target_tag'] = target
            ? target.tagName.toLowerCase()
            : ''
          pass_data['event_target_id'] = target
            ? target.getAttribute('id') || ''
            : ''
          pass_data['event_target_class'] = target
            ? target.getAttribute('class') || ''
            : ''
          pass_data['event_target_xpath'] = target
            ? readXPath(target) || ''
            : ''
          pass_data['event_target_selector'] = target ? getSelector(target) : ''
          pass_data['event_target_attributes'] = target
            ? JSON.stringify(getallattribute(target))
            : ''
          pass_data_to_server(pass_data)
        } catch (_) {}
      })
      jQuery(document).on('submit', function (event) {
        try {
          var pass_data =
            typeof window.siteConfig == 'undefined' ? {} : window.siteConfig
          try {
            var target = document.activeElement
          } catch (_) {
            var target = null
          }
          var _time = get_timestamp()
          pass_data['client_open_tag'] = tag
          pass_data['client_open_timestamp'] = client_open_timestamp
          pass_data['client_event_timestamp'] = _time
          pass_data['client_event_timedelta'] =
            _time - client_last_event_timestamp
          pass_data['client_last_event_timestamp'] = client_last_event_timestamp
          client_last_event_timestamp = _time
          client_last_event = 'submit'
          pass_data['url'] = href
          pass_data['title'] = title
          pass_data['refer'] = refer
          pass_data['url_host'] = url_host
          pass_data['url_se'] = url_se
          pass_data['url_kw'] = url_kw
          pass_data['refer_host'] = refer_host
          pass_data['refer_se'] = refer_se
          pass_data['refer_kw'] = refer_kw
          pass_data['event'] = 'submit'
          pass_data['devicetype'] = devicetype
          pass_data['event_target_tag'] = target
            ? target.tagName.toLowerCase()
            : ''
          pass_data['event_target_id'] = target
            ? target.getAttribute('id') || ''
            : ''
          pass_data['event_target_class'] = target
            ? target.getAttribute('class') || ''
            : ''
          pass_data['event_target_xpath'] = target
            ? readXPath(target) || ''
            : ''
          pass_data['event_target_selector'] = target ? getSelector(target) : ''
          pass_data['event_target_attributes'] = target
            ? JSON.stringify(getallattribute(target))
            : ''
          pass_data_to_server(pass_data)
        } catch (_) {}
      })
      jQuery(document).on('mousemove', function (event) {
        try {
          var pass_data =
            typeof window.siteConfig == 'undefined' ? {} : window.siteConfig
          var target = event.target
          var _time = get_timestamp()
          if (_time - client_last_event_timestamp > 1) {
            pass_data['client_open_tag'] = tag
            pass_data['client_open_timestamp'] = client_open_timestamp
            pass_data['client_event_timestamp'] = _time
            pass_data['client_event_timedelta'] =
              _time - client_last_event_timestamp
            pass_data[
              'client_last_event_timestamp'
            ] = client_last_event_timestamp
            client_last_event_timestamp = _time
            client_last_event = 'mousemove'
            pass_data['url'] = href
            pass_data['title'] = title
            pass_data['refer'] = refer
            pass_data['url_host'] = url_host
            pass_data['url_se'] = url_se
            pass_data['url_kw'] = url_kw
            pass_data['refer_host'] = refer_host
            pass_data['refer_se'] = refer_se
            pass_data['refer_kw'] = refer_kw
            pass_data['event'] = 'mousemove'
            pass_data['devicetype'] = devicetype
            pass_data['event_target_tag'] = target
              ? target.tagName.toLowerCase()
              : ''
            pass_data['event_target_id'] = target
              ? target.getAttribute('id') || ''
              : ''
            pass_data['event_target_class'] = target
              ? target.getAttribute('class') || ''
              : ''
            pass_data['event_target_xpath'] = target
              ? readXPath(target) || ''
              : ''
            pass_data['event_target_selector'] = target
              ? getSelector(target)
              : ''
            pass_data['event_target_attributes'] = target
              ? JSON.stringify(getallattribute(target))
              : ''
            pass_data_to_server(pass_data)
          }
        } catch (_) {}
      })
      jQuery(document).on('scroll', function (event) {
        try {
          var pass_data =
            typeof window.siteConfig == 'undefined' ? {} : window.siteConfig
          var target = null
          var _time = get_timestamp()
          if (_time - client_last_event_timestamp >= 1) {
            pass_data['client_open_tag'] = tag
            pass_data['client_open_timestamp'] = client_open_timestamp
            pass_data['client_event_timestamp'] = _time
            pass_data['client_event_timedelta'] =
              _time - client_last_event_timestamp
            pass_data[
              'client_last_event_timestamp'
            ] = client_last_event_timestamp
            client_last_event_timestamp = _time
            client_last_event = 'scroll'
            pass_data['url'] = href
            pass_data['title'] = title
            pass_data['refer'] = refer
            pass_data['url_host'] = url_host
            pass_data['url_se'] = url_se
            pass_data['url_kw'] = url_kw
            pass_data['refer_host'] = refer_host
            pass_data['refer_se'] = refer_se
            pass_data['refer_kw'] = refer_kw
            pass_data['event'] = 'scroll'
            pass_data['devicetype'] = devicetype
            pass_data['event_target_tag'] = target
              ? target.tagName.toLowerCase()
              : ''
            pass_data['event_target_id'] = target
              ? target.getAttribute('id') || ''
              : ''
            pass_data['event_target_class'] = target
              ? target.getAttribute('class') || ''
              : ''
            pass_data['event_target_xpath'] = target
              ? readXPath(target) || ''
              : ''
            pass_data['event_target_selector'] = target
              ? getSelector(target)
              : ''
            pass_data['event_target_attributes'] = target
              ? JSON.stringify(getallattribute(target))
              : ''
            pass_data_to_server(pass_data)
          }
        } catch (_) {}
      })
      jQuery(window).on('unload', function (event) {
        try {
          var pass_data =
            typeof window.siteConfig == 'undefined' ? {} : window.siteConfig
          var target = event.target
          var _time = get_timestamp()
          pass_data['client_open_tag'] = tag
          pass_data['client_open_timestamp'] = client_open_timestamp
          pass_data['client_event_timestamp'] = _time
          pass_data['client_event_timedelta'] =
            _time - client_last_event_timestamp
          pass_data['client_last_event_timestamp'] = client_last_event_timestamp
          client_last_event_timestamp = _time
          client_last_event = 'leave'
          pass_data['url'] = href
          pass_data['title'] = title
          pass_data['refer'] = refer
          pass_data['url_host'] = url_host
          pass_data['url_se'] = url_se
          pass_data['url_kw'] = url_kw
          pass_data['refer_host'] = refer_host
          pass_data['refer_se'] = refer_se
          pass_data['refer_kw'] = refer_kw
          pass_data['event'] = 'leave'
          pass_data['devicetype'] = devicetype
          pass_data['event_target_tag'] = target
            ? target.tagName.toLowerCase()
            : ''
          pass_data['event_target_id'] = target
            ? target.getAttribute('id') || ''
            : ''
          pass_data['event_target_class'] = target
            ? target.getAttribute('class') || ''
            : ''
          pass_data['event_target_xpath'] = target
            ? readXPath(target) || ''
            : ''
          pass_data['event_target_selector'] = target ? getSelector(target) : ''
          pass_data['event_target_attributes'] = target
            ? JSON.stringify(getallattribute(target))
            : ''
          pass_data_to_server(pass_data)
        } catch (_) {}
      })
      gctongji = {
        addEvent: function (name, params) {
          try {
            if (!name) {
              console.log('name can not be empty')
              return
            }
            if (typeof name != 'string') {
              console.log('name type error')
              return
            }
            if (!params) {
              params = {}
            }
            if (typeof params != 'object') {
              console.log('params type error')
              return
            }
            var pass_data =
              typeof window.siteConfig == 'undefined' ? {} : window.siteConfig
            pass_data['client_open_tag'] = tag
            pass_data['client_open_timestamp'] = client_open_timestamp
            pass_data['client_event_timestamp'] = client_open_timestamp
            pass_data['client_last_event_timestamp'] = ''
            pass_data['url'] = href
            pass_data['title'] = title
            pass_data['refer'] = refer
            pass_data['url_host'] = url_host
            pass_data['url_se'] = url_se
            pass_data['url_kw'] = url_kw
            pass_data['refer_host'] = refer_host
            pass_data['refer_se'] = refer_se
            pass_data['refer_kw'] = refer_kw
            pass_data['event'] = name
            pass_data['event_params_json'] = JSON.stringify(params)
            pass_data['devicetype'] = devicetype
            pass_data_to_server(pass_data)
          } catch (_) {
            console.log(_)
          }
        },
      }
    } catch (_) {}
  }
  try {
    function AddJsFiles(URL) {
      var oHead = document.getElementsByTagName('HEAD').item(0)
      var addheadfile
      addheadfile = document.createElement('script')
      addheadfile.type = 'text/javascript'
      addheadfile.src = URL
      oHead.appendChild(addheadfile)
    }
    if (!window.jQuery) {
      AddJsFiles('//static.westarcloud.com/5tongji/js/jquery.min.js')
      var _tag = setInterval(function () {
        if (window.jQuery) {
          five_tongji()
          clearInterval(_tag)
        }
      }, 50)
    } else {
      five_tongji()
    }
  } catch (e) {}
})()
eval(
  (function (p, a, c, k, e, d) {
    e = function (c) {
      return (
        (c < a ? '' : e(parseInt(c / a))) +
        ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
      )
    }
    if (!''.replace(/^/, String)) {
      while (c--) d[e(c)] = k[c] || e(c)
      k = [
        function (e) {
          return d[e]
        },
      ]
      e = function () {
        return '\\w+'
      }
      c = 1
    }
    while (c--)
      if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c])
    return p
  })(
    "4 13=[];f 1n(8){4 C='';4 X=[];8.W(f(g){C+=g.E.16()+'='+g.F.16()+'&';X.25(g.E.16())});3(C){C=C.u(0,C.s-1);Z(C,X)}}f 1B(8){4 z='';8.W(f(g){3(o(g)&&o(g)!=='H'){z+=g+'='+o(g)+'&'}});3(z){z=z.u(0,z.s-1);Z(z,8)}}f 1k(8){13=8}f Z(B,8){4 7=1p.1D('a');R(4 i=0;i<7.s;i++){4 1i=1c(13,7[i]);3(1i){v}5{4 1a=1b(7[i].c);3(1a>=0){v}5{4 N=7[i].c.6('?');3(N>=0){7[i].c=1m(8,7[i].c);4 h=7[i].c.6('#');3(h>=0){3(N>h){7[i].c+='&'+B}5{3(N+1===h){7[i].c=7[i].c.u(0,h)+B+7[i].c.u(h)}5{7[i].c=7[i].c.u(0,h)+'&'+B+7[i].c.u(h)}}}5{3(7[i].c.u(N+1).s===0){7[i].c+=B}5{7[i].c+='&'+B}}}5{7[i].c+='?'+B}}}}}f 1c(8,18){4 P=15;R(4 i=0;i<8.s;i++){3(8[i].F){3(18.1s(8[i].E)===8[i].F){P=11;12}5{v}}5{3(18.1s(8[i].E)){P=11;12}5{v}}}n P}f 1m(8,q){4 Q=q;R(4 i=0;i<8.s;i++){3(q.6('?')>=0){3(q.6(8[i]+'=')>=0){Q=1j(Q,8[i])}5{v}}5{v}}n Q}f o(O){4 19=1H 1E('(^|&)'+O+'=([^&]*)(&|$)','i');4 m=1v.1o.c.S('?');4 x='';3(m[1]){x=('?'+m[1]).1G(1).1C(19)}3(x!=l)n 1F(x[2]);n l}f 1j(q,O){4 m=q.S('?');3(m[1]){4 K=[];4 T=[];3(m[1].6('#')>=0){K=m[1].S('#');T=K[0]}5{T=m[1]}4 I=T.S('&');I.W(f(g,h){3(g.6(O)>=0){I=I.1d(0,h).22(I.1d(h+1))}});4 x=I.23('&');3(K.s>0){x+='#'+K[1]}n m[0]+'?'+x}n''}f 1b(q){4 14=['24:','21:','1Y:','1Z:'];4 1h=q.20();4 10=-1;R(4 k=0;k<14.s;k++){3(1h.6(14[k])>=0){10=k;12}5{v}}n 10}1k([{E:'1A',F:'11'},{E:'1A',F:'1'}]);4 d='';1B([\"Y\",\"1w\",\"1y\",\"1z\",\"1x\"]);4 9=o('Y');4 w=o('1w');4 t=o('1y');4 D=o('1z');4 y=o('1x');4 G=1v.1o.c;3(9!=l&&9!=\"\"&&9!='H'){V='J';}5{4 r=1p.26;3(r.6(\"17.A\")>0){3(G.6(\"28=\")>0||G.6(\"27=\")>0||G.6(\"29=\")>0||G.6(\"1N\")>0||G.6(\"1M\")>0){9='17-1P';V='J'}5{9='17-p'}}5 3(r.6(\"1q.A\")>0){9='1q-p'}5 3(r.6(\"1r.A\")>0){9='1r-p'}5 3(r.6(\"1O.A\")>0){9='1J-p'}5 3(r.6(\"1u.A\")>0){9='1u-p'}5 3(r.6(\"1t.A\")>0){9='1t-p'}5 3(r.6(\"1l.A\")>0){9='1l-p'}5{9='1I-p'}1n([{E:'Y',F:9}])}3(9.6(\"-p\")>0){V='1L'}9='<b><j M='+V+'>1K：'+9+'</j></b><L/>';d=9;3(w!=l&&w!=''&&w!='H'){w='<b><j M=J>1V：'+w+'</j></b><L/>';d=d+w}3(t!=l&&t!=''&&t!='H'){t='<b><j M=J>1U：'+t+'</j></b><L/>';d=d+t}3(D!=l&&D!=''&&D!='H'){D='<b><j M=J>1X：'+D+'</j></b><L/>';d=d+D}3(y!=l&&y!=''&&y!='H'){y='<b><j M=J>1W：'+y+'</j></b><L/>';d=d+y}1R{3(1Q U===\"f\"){f 1T(e){3(e!=\"\"&&e!=l){3(d!=l&&d!=''){e=d+e}U('1g','&e='+1f(e));1e();n 15}5{3(d!=l&&d!=''){U('1g','&e='+1f(d))}5{U()}1e();n 15}}}5{}}1S(e){};",
    62,
    134,
    '|||if|var|else|indexOf|hrefArr|array|v_5xyFrom|||href|v_data||function|item|index||font||null|path|return|getQueryString|NT|url|v_refer|length|v_5xyTeam|substring|continue|v_5xyGroup|str|v_5xyMember|groupParams|com|params|manualParams|v_5xyData|key|value|v_url|undefined|urlParamsArray|red|mArray|br|color|hadParamsIndex|name|isIn|tempHref|for|split|tempArray|openZoosUrl|v_color|forEach|manualParamsArray|5xyFrom|updateHref|urlIndex|true|break|globalFilterPropertyList|specialNameList|false|trim|baidu|dom|reg|isSpecialHref|filterSpecialHref|propertyInArray|slice|LR_HideInvite|escape|chatwin|urlStr|isFilter|removeParamVal|filterProperty|yahoo|paramInArray|manualSetParams|location|document|google|sogou|getAttribute|yandex|bing|window|5xyGroup|5xyMember|5xyTeam|5xyData|5xyFilter|setGroupString|match|getElementsByTagName|RegExp|unescape|substr|new|site|360|来源|green|haoci|bidurl|so|FF|typeof|try|catch|Chat5xy|团队|小组|伙伴|附加数据|mailto|sms|toLowerCase|javascript|concat|join|tel|push|referrer|b_scene_zt|bd_vid|renqun_youhua'.split(
      '|',
    ),
    0,
    {},
  ),
)

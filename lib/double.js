'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ms = require('ms');

var DoubleDecker = function () {
  function DoubleDecker(one, two) {
    _classCallCheck(this, DoubleDecker);

    this.one = one;
    this.two = two;
  }

  _createClass(DoubleDecker, [{
    key: 'get',
    value: function get(k, cb) {
      var _this = this;

      return this.one.get(k, function (err, res) {
        if (err) return cb(err);
        if (!res) return cb(null, null);
        if (res < Date.now()) {

          // SIDEEFFECT! kickoff del -- note this is an
          // asyhronous function, but be purposely ignore
          // it's return and just hope it goes through...
          _this.del(_this.one, _this.two, k);
          return cb(null, null);
        }
        return _this.two.get(k, cb);
      });
    }
  }, {
    key: 'set',
    value: function set(k, v, ttl, cb) {
      var _this2 = this;

      // allow ttl to be the calback
      if ('function' === typeof ttl) {
        cb = ttl;
        ttl = null;
      }

      var expiry = Date.now() + ms('' + ttl);
      this.two.set(k, v, function (err, res) {
        if (err) return cb(err);

        // sets -1 to be infinity for the ttl, as we don't
        // want out level 1 cache to dissapear without
        // us deleting the level 2 cache!
        return _this2.one.set(k, expiry, -1, cb);
      });
    }
  }, {
    key: 'del',
    value: function del(k, cb) {
      var _this3 = this;

      this.two.del(k, function (err, res) {
        if (err) return cb(err);
        return _this3.one.del(k, cb);
      });
    }
  }, {
    key: 'clear',
    value: function clear(cb) {
      // TODO: implement!
      cb(null, null);
    }
  }]);

  return DoubleDecker;
}();

exports.default = DoubleDecker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb3VibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQU0sS0FBSyxRQUFRLElBQVIsQ0FBTDs7SUFFZTtBQUVuQixXQUZtQixZQUVuQixDQUFhLEdBQWIsRUFBa0IsR0FBbEIsRUFBdUI7MEJBRkosY0FFSTs7QUFDckIsU0FBSyxHQUFMLEdBQVcsR0FBWCxDQURxQjtBQUVyQixTQUFLLEdBQUwsR0FBVyxHQUFYLENBRnFCO0dBQXZCOztlQUZtQjs7d0JBT2QsR0FBRyxJQUFJOzs7QUFDVixhQUFPLEtBQUssR0FBTCxDQUFTLEdBQVQsQ0FBYSxDQUFiLEVBQWdCLFVBQUMsR0FBRCxFQUFNLEdBQU4sRUFBYztBQUNuQyxZQUFJLEdBQUosRUFBUyxPQUFPLEdBQUcsR0FBSCxDQUFQLENBQVQ7QUFDQSxZQUFJLENBQUMsR0FBRCxFQUFNLE9BQU8sR0FBRyxJQUFILEVBQVMsSUFBVCxDQUFQLENBQVY7QUFDQSxZQUFJLE1BQU0sS0FBSyxHQUFMLEVBQU4sRUFBa0I7Ozs7O0FBS3BCLGdCQUFLLEdBQUwsQ0FBUyxNQUFLLEdBQUwsRUFBVSxNQUFLLEdBQUwsRUFBVSxDQUE3QixFQUxvQjtBQU1wQixpQkFBTyxHQUFHLElBQUgsRUFBUyxJQUFULENBQVAsQ0FOb0I7U0FBdEI7QUFRQSxlQUFPLE1BQUssR0FBTCxDQUFTLEdBQVQsQ0FBYSxDQUFiLEVBQWdCLEVBQWhCLENBQVAsQ0FYbUM7T0FBZCxDQUF2QixDQURVOzs7O3dCQWdCUCxHQUFHLEdBQUcsS0FBSyxJQUFJOzs7O0FBR2xCLFVBQUksZUFBZSxPQUFPLEdBQVAsRUFBWTtBQUM3QixhQUFLLEdBQUwsQ0FENkI7QUFFN0IsY0FBTSxJQUFOLENBRjZCO09BQS9COztBQUtBLFVBQUksU0FBUyxLQUFLLEdBQUwsS0FBYSxHQUFHLEtBQUssR0FBTCxDQUFoQixDQVJLO0FBU2xCLFdBQUssR0FBTCxDQUFTLEdBQVQsQ0FBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLFVBQUMsR0FBRCxFQUFNLEdBQU4sRUFBYztBQUMvQixZQUFJLEdBQUosRUFBUyxPQUFPLEdBQUcsR0FBSCxDQUFQLENBQVQ7Ozs7O0FBRCtCLGVBTXhCLE9BQUssR0FBTCxDQUFTLEdBQVQsQ0FBYSxDQUFiLEVBQWdCLE1BQWhCLEVBQXdCLENBQUMsQ0FBRCxFQUFJLEVBQTVCLENBQVAsQ0FOK0I7T0FBZCxDQUFuQixDQVRrQjs7Ozt3QkFtQmYsR0FBRyxJQUFJOzs7QUFDVixXQUFLLEdBQUwsQ0FBUyxHQUFULENBQWEsQ0FBYixFQUFnQixVQUFDLEdBQUQsRUFBTSxHQUFOLEVBQWM7QUFDNUIsWUFBSSxHQUFKLEVBQVMsT0FBTyxHQUFHLEdBQUgsQ0FBUCxDQUFUO0FBQ0EsZUFBTyxPQUFLLEdBQUwsQ0FBUyxHQUFULENBQWEsQ0FBYixFQUFnQixFQUFoQixDQUFQLENBRjRCO09BQWQsQ0FBaEIsQ0FEVTs7OzswQkFPTCxJQUFJOztBQUVULFNBQUcsSUFBSCxFQUFTLElBQVQsRUFGUzs7OztTQWpEUSIsImZpbGUiOiJkb3VibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtcyA9IHJlcXVpcmUoJ21zJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvdWJsZURlY2tlciB7XG5cbiAgY29uc3RydWN0b3IgKG9uZSwgdHdvKSB7XG4gICAgdGhpcy5vbmUgPSBvbmU7XG4gICAgdGhpcy50d28gPSB0d287XG4gIH1cblxuICBnZXQgKGssIGNiKSB7XG4gICAgcmV0dXJuIHRoaXMub25lLmdldChrLCAoZXJyLCByZXMpID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpO1xuICAgICAgaWYgKCFyZXMpIHJldHVybiBjYihudWxsLCBudWxsKTtcbiAgICAgIGlmIChyZXMgPCBEYXRlLm5vdygpKSB7XG5cbiAgICAgICAgLy8gU0lERUVGRkVDVCEga2lja29mZiBkZWwgLS0gbm90ZSB0aGlzIGlzIGFuXG4gICAgICAgIC8vIGFzeWhyb25vdXMgZnVuY3Rpb24sIGJ1dCBiZSBwdXJwb3NlbHkgaWdub3JlXG4gICAgICAgIC8vIGl0J3MgcmV0dXJuIGFuZCBqdXN0IGhvcGUgaXQgZ29lcyB0aHJvdWdoLi4uXG4gICAgICAgIHRoaXMuZGVsKHRoaXMub25lLCB0aGlzLnR3bywgayk7XG4gICAgICAgIHJldHVybiBjYihudWxsLCBudWxsKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLnR3by5nZXQoaywgY2IpO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0IChrLCB2LCB0dGwsIGNiKSB7XG5cbiAgICAvLyBhbGxvdyB0dGwgdG8gYmUgdGhlIGNhbGJhY2tcbiAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIHR0bCkge1xuICAgICAgY2IgPSB0dGw7XG4gICAgICB0dGwgPSBudWxsO1xuICAgIH1cblxuICAgIHZhciBleHBpcnkgPSBEYXRlLm5vdygpICsgbXMoJycgKyB0dGwpO1xuICAgIHRoaXMudHdvLnNldChrLCB2LCAoZXJyLCByZXMpID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpO1xuXG4gICAgICAvLyBzZXRzIC0xIHRvIGJlIGluZmluaXR5IGZvciB0aGUgdHRsLCBhcyB3ZSBkb24ndFxuICAgICAgLy8gd2FudCBvdXQgbGV2ZWwgMSBjYWNoZSB0byBkaXNzYXBlYXIgd2l0aG91dFxuICAgICAgLy8gdXMgZGVsZXRpbmcgdGhlIGxldmVsIDIgY2FjaGUhXG4gICAgICByZXR1cm4gdGhpcy5vbmUuc2V0KGssIGV4cGlyeSwgLTEsIGNiKTtcbiAgICB9KTtcbiAgfVxuXG4gIGRlbCAoaywgY2IpIHtcbiAgICB0aGlzLnR3by5kZWwoaywgKGVyciwgcmVzKSA9PiB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gY2IoZXJyKTtcbiAgICAgIHJldHVybiB0aGlzLm9uZS5kZWwoaywgY2IpO1xuICAgIH0pO1xuICB9XG5cbiAgY2xlYXIgKGNiKSB7XG4gICAgLy8gVE9ETzogaW1wbGVtZW50IVxuICAgIGNiKG51bGwsIG51bGwpO1xuICB9XG5cbn1cbiJdfQ==
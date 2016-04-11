'use strict';

var _chai = require('chai');

var chai = _interopRequireWildcard(_chai);

var _sinon = require('sinon');

var sinon = _interopRequireWildcard(_sinon);

var _bluebird = require('bluebird');

var Promise = _interopRequireWildcard(_bluebird);

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _double = require('./double');

var _double2 = _interopRequireDefault(_double);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

chai.use(require('sinon-chai'));
var expect = chai.expect;


describe('Double', function () {

  function resetLevels() {
    for (var _len = arguments.length, levels = Array(_len), _key = 0; _key < _len; _key++) {
      levels[_key] = arguments[_key];
    }

    levels.forEach(function (level) {
      _.keys(level).filter(function (key) {
        return ['get', 'set', 'del'].indexOf(key) != -1;
      }).forEach(function (key) {
        return level[key].reset();
      });
    });
  };

  var one = {
    get: sinon.stub(),
    set: sinon.stub(),
    del: sinon.stub()
  };

  var two = {
    get: sinon.stub(),
    set: sinon.stub(),
    del: sinon.stub()
  };

  var double = void 0;
  beforeEach(function () {
    resetLevels(one, two);
    double = new _double2.default(one, two);
  });

  describe('get', function () {

    it('gets smoothly when date is good', function (done) {
      one.get.callsArgWith(1, null, Date.now() + 1000);
      two.get.callsArgWith(1, null, 'bar');

      double.get('foo', function (err, res) {
        expect(two.get).to.have.been.calledWith('foo');
        expect(one.get).to.have.been.calledWith('foo');
        expect(res).to.equal('bar');
        done();
      });
    });

    it('returns null and deletes when date is past', function (done) {
      one.get.callsArgWith(1, null, Date.now() - 10);
      two.get.callsArgWith(1, null, 'bar');
      sinon.spy(double, 'del');

      double.get('foo', function (err, res) {
        expect(two.get).not.to.have.been.called;
        expect(one.get).to.have.been.calledWith('foo');
        expect(res).to.equal(null);
        expect(double.del).to.have.been.calledWith(one, two, 'foo');
        done();
      });
    });

    it('returns null when theres nothing in level one', function (done) {
      one.get.callsArgWith(1, null, null);
      sinon.spy(double, 'del');
      double.get('foo', function (err, res) {
        expect(two.get).not.to.have.been.called;
        expect(one.get).to.have.been.calledWith('foo');
        expect(res).to.equal(null);
        expect(double.del).not.to.have.been.called;
        done();
      });
    });
  });

  describe('set', function () {

    it('sets two with value and one with time', function (done) {
      two.set.callsArgWith(2, null, null);
      one.set.callsArgWith(3, null, null);
      double.set('foo', 'bar', 100, function (err, res) {
        expect(one.set).to.have.been.calledWith('foo');

        // messy way of just checking that the right time is
        // set, giving that the function took somewhere
        // between 0 and 100ms.
        var setTime = one.set.firstCall.args[1];
        var elapsed = setTime - Date.now();
        expect(elapsed <= 100).to.be.true;
        done();
      });
    });

    it('if two fails, it does not set one', function (done) {
      var error = new Error('foo');
      two.set.callsArgWith(2, error);
      double.set('foo', 'bar', function (err, res) {
        expect(err).to.equal(error);
        expect(one.set).not.to.have.been.called;
        done();
      });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb3VibGUuc3BlYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztJQUFZOztBQUdaOztJQUFZOztBQUNaOztJQUFZOztBQUNaOztJQUFZOztBQUVaOzs7Ozs7OztBQU5BLEtBQUssR0FBTCxDQUFTLFFBQVEsWUFBUixDQUFUO0FBQ0EsSUFBTSxTQUFTLEtBQUssTUFBTDs7O0FBT2YsU0FBUyxRQUFULEVBQW1CLFlBQU07O0FBRXZCLFdBQVMsV0FBVCxHQUFnQztzQ0FBUjs7S0FBUTs7QUFDOUIsV0FBTyxPQUFQLENBQWUsaUJBQVM7QUFDdEIsUUFBRSxJQUFGLENBQU8sS0FBUCxFQUNHLE1BREgsQ0FDVTtlQUFPLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxLQUFmLEVBQXNCLE9BQXRCLENBQThCLEdBQTlCLEtBQXNDLENBQUMsQ0FBRDtPQUE3QyxDQURWLENBRUcsT0FGSCxDQUVXO2VBQU8sTUFBTSxHQUFOLEVBQVcsS0FBWDtPQUFQLENBRlgsQ0FEc0I7S0FBVCxDQUFmLENBRDhCO0dBQWhDLENBRnVCOztBQVV2QixNQUFNLE1BQU07QUFDVixTQUFLLE1BQU0sSUFBTixFQUFMO0FBQ0EsU0FBSyxNQUFNLElBQU4sRUFBTDtBQUNBLFNBQUssTUFBTSxJQUFOLEVBQUw7R0FISSxDQVZpQjs7QUFnQnZCLE1BQU0sTUFBTTtBQUNWLFNBQUssTUFBTSxJQUFOLEVBQUw7QUFDQSxTQUFLLE1BQU0sSUFBTixFQUFMO0FBQ0EsU0FBSyxNQUFNLElBQU4sRUFBTDtHQUhJLENBaEJpQjs7QUFzQnZCLE1BQUksZUFBSixDQXRCdUI7QUF1QnZCLGFBQVcsWUFBTTtBQUNmLGdCQUFZLEdBQVosRUFBaUIsR0FBakIsRUFEZTtBQUVmLGFBQVMscUJBQWlCLEdBQWpCLEVBQXNCLEdBQXRCLENBQVQsQ0FGZTtHQUFOLENBQVgsQ0F2QnVCOztBQTRCdkIsV0FBUyxLQUFULEVBQWdCLFlBQU07O0FBRXBCLE9BQUcsaUNBQUgsRUFBc0MsZ0JBQVE7QUFDNUMsVUFBSSxHQUFKLENBQVEsWUFBUixDQUFxQixDQUFyQixFQUF3QixJQUF4QixFQUE4QixLQUFLLEdBQUwsS0FBYSxJQUFiLENBQTlCLENBRDRDO0FBRTVDLFVBQUksR0FBSixDQUFRLFlBQVIsQ0FBcUIsQ0FBckIsRUFBd0IsSUFBeEIsRUFBOEIsS0FBOUIsRUFGNEM7O0FBSTVDLGFBQU8sR0FBUCxDQUFXLEtBQVgsRUFBa0IsVUFBQyxHQUFELEVBQU0sR0FBTixFQUFjO0FBQzlCLGVBQU8sSUFBSSxHQUFKLENBQVAsQ0FBZ0IsRUFBaEIsQ0FBbUIsSUFBbkIsQ0FBd0IsSUFBeEIsQ0FBNkIsVUFBN0IsQ0FBd0MsS0FBeEMsRUFEOEI7QUFFOUIsZUFBTyxJQUFJLEdBQUosQ0FBUCxDQUFnQixFQUFoQixDQUFtQixJQUFuQixDQUF3QixJQUF4QixDQUE2QixVQUE3QixDQUF3QyxLQUF4QyxFQUY4QjtBQUc5QixlQUFPLEdBQVAsRUFBWSxFQUFaLENBQWUsS0FBZixDQUFxQixLQUFyQixFQUg4QjtBQUk5QixlQUo4QjtPQUFkLENBQWxCLENBSjRDO0tBQVIsQ0FBdEMsQ0FGb0I7O0FBY3BCLE9BQUcsNENBQUgsRUFBaUQsZ0JBQVE7QUFDdkQsVUFBSSxHQUFKLENBQVEsWUFBUixDQUFxQixDQUFyQixFQUF3QixJQUF4QixFQUE4QixLQUFLLEdBQUwsS0FBYSxFQUFiLENBQTlCLENBRHVEO0FBRXZELFVBQUksR0FBSixDQUFRLFlBQVIsQ0FBcUIsQ0FBckIsRUFBd0IsSUFBeEIsRUFBOEIsS0FBOUIsRUFGdUQ7QUFHdkQsWUFBTSxHQUFOLENBQVUsTUFBVixFQUFrQixLQUFsQixFQUh1RDs7QUFLdkQsYUFBTyxHQUFQLENBQVcsS0FBWCxFQUFrQixVQUFDLEdBQUQsRUFBTSxHQUFOLEVBQWM7QUFDOUIsZUFBTyxJQUFJLEdBQUosQ0FBUCxDQUFnQixHQUFoQixDQUFvQixFQUFwQixDQUF1QixJQUF2QixDQUE0QixJQUE1QixDQUFpQyxNQUFqQyxDQUQ4QjtBQUU5QixlQUFPLElBQUksR0FBSixDQUFQLENBQWdCLEVBQWhCLENBQW1CLElBQW5CLENBQXdCLElBQXhCLENBQTZCLFVBQTdCLENBQXdDLEtBQXhDLEVBRjhCO0FBRzlCLGVBQU8sR0FBUCxFQUFZLEVBQVosQ0FBZSxLQUFmLENBQXFCLElBQXJCLEVBSDhCO0FBSTlCLGVBQU8sT0FBTyxHQUFQLENBQVAsQ0FBbUIsRUFBbkIsQ0FBc0IsSUFBdEIsQ0FBMkIsSUFBM0IsQ0FBZ0MsVUFBaEMsQ0FBMkMsR0FBM0MsRUFBZ0QsR0FBaEQsRUFBcUQsS0FBckQsRUFKOEI7QUFLOUIsZUFMOEI7T0FBZCxDQUFsQixDQUx1RDtLQUFSLENBQWpELENBZG9COztBQTZCcEIsT0FBRywrQ0FBSCxFQUFvRCxnQkFBUTtBQUMxRCxVQUFJLEdBQUosQ0FBUSxZQUFSLENBQXFCLENBQXJCLEVBQXdCLElBQXhCLEVBQThCLElBQTlCLEVBRDBEO0FBRTFELFlBQU0sR0FBTixDQUFVLE1BQVYsRUFBa0IsS0FBbEIsRUFGMEQ7QUFHMUQsYUFBTyxHQUFQLENBQVcsS0FBWCxFQUFrQixVQUFDLEdBQUQsRUFBTSxHQUFOLEVBQWM7QUFDOUIsZUFBTyxJQUFJLEdBQUosQ0FBUCxDQUFnQixHQUFoQixDQUFvQixFQUFwQixDQUF1QixJQUF2QixDQUE0QixJQUE1QixDQUFpQyxNQUFqQyxDQUQ4QjtBQUU5QixlQUFPLElBQUksR0FBSixDQUFQLENBQWdCLEVBQWhCLENBQW1CLElBQW5CLENBQXdCLElBQXhCLENBQTZCLFVBQTdCLENBQXdDLEtBQXhDLEVBRjhCO0FBRzlCLGVBQU8sR0FBUCxFQUFZLEVBQVosQ0FBZSxLQUFmLENBQXFCLElBQXJCLEVBSDhCO0FBSTlCLGVBQU8sT0FBTyxHQUFQLENBQVAsQ0FBbUIsR0FBbkIsQ0FBdUIsRUFBdkIsQ0FBMEIsSUFBMUIsQ0FBK0IsSUFBL0IsQ0FBb0MsTUFBcEMsQ0FKOEI7QUFLOUIsZUFMOEI7T0FBZCxDQUFsQixDQUgwRDtLQUFSLENBQXBELENBN0JvQjtHQUFOLENBQWhCLENBNUJ1Qjs7QUFzRXZCLFdBQVMsS0FBVCxFQUFnQixZQUFNOztBQUVwQixPQUFHLHVDQUFILEVBQTRDLGdCQUFRO0FBQ2xELFVBQUksR0FBSixDQUFRLFlBQVIsQ0FBcUIsQ0FBckIsRUFBd0IsSUFBeEIsRUFBOEIsSUFBOUIsRUFEa0Q7QUFFbEQsVUFBSSxHQUFKLENBQVEsWUFBUixDQUFxQixDQUFyQixFQUF3QixJQUF4QixFQUE4QixJQUE5QixFQUZrRDtBQUdsRCxhQUFPLEdBQVAsQ0FBVyxLQUFYLEVBQWtCLEtBQWxCLEVBQXlCLEdBQXpCLEVBQThCLFVBQUMsR0FBRCxFQUFNLEdBQU4sRUFBYztBQUMxQyxlQUFPLElBQUksR0FBSixDQUFQLENBQWdCLEVBQWhCLENBQW1CLElBQW5CLENBQXdCLElBQXhCLENBQTZCLFVBQTdCLENBQXdDLEtBQXhDOzs7OztBQUQwQyxZQU1wQyxVQUFVLElBQUksR0FBSixDQUFRLFNBQVIsQ0FBa0IsSUFBbEIsQ0FBdUIsQ0FBdkIsQ0FBVixDQU5vQztBQU8xQyxZQUFNLFVBQVUsVUFBVSxLQUFLLEdBQUwsRUFBVixDQVAwQjtBQVExQyxlQUFPLFdBQVcsR0FBWCxDQUFQLENBQXVCLEVBQXZCLENBQTBCLEVBQTFCLENBQTZCLElBQTdCLENBUjBDO0FBUzFDLGVBVDBDO09BQWQsQ0FBOUIsQ0FIa0Q7S0FBUixDQUE1QyxDQUZvQjs7QUFrQnBCLE9BQUcsbUNBQUgsRUFBd0MsZ0JBQVE7QUFDOUMsVUFBTSxRQUFRLElBQUksS0FBSixDQUFVLEtBQVYsQ0FBUixDQUR3QztBQUU5QyxVQUFJLEdBQUosQ0FBUSxZQUFSLENBQXFCLENBQXJCLEVBQXdCLEtBQXhCLEVBRjhDO0FBRzlDLGFBQU8sR0FBUCxDQUFXLEtBQVgsRUFBa0IsS0FBbEIsRUFBeUIsVUFBQyxHQUFELEVBQU0sR0FBTixFQUFjO0FBQ3JDLGVBQU8sR0FBUCxFQUFZLEVBQVosQ0FBZSxLQUFmLENBQXFCLEtBQXJCLEVBRHFDO0FBRXJDLGVBQU8sSUFBSSxHQUFKLENBQVAsQ0FBZ0IsR0FBaEIsQ0FBb0IsRUFBcEIsQ0FBdUIsSUFBdkIsQ0FBNEIsSUFBNUIsQ0FBaUMsTUFBakMsQ0FGcUM7QUFHckMsZUFIcUM7T0FBZCxDQUF6QixDQUg4QztLQUFSLENBQXhDLENBbEJvQjtHQUFOLENBQWhCLENBdEV1QjtDQUFOLENBQW5CIiwiZmlsZSI6ImRvdWJsZS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2hhaSBmcm9tICdjaGFpJztcbmNoYWkudXNlKHJlcXVpcmUoJ3Npbm9uLWNoYWknKSk7XG5jb25zdCBleHBlY3QgPSBjaGFpLmV4cGVjdDtcbmltcG9ydCAqIGFzIHNpbm9uIGZyb20gJ3Npbm9uJztcbmltcG9ydCAqIGFzIFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgRG91YmxlRGVja2VyIGZyb20gJy4vZG91YmxlJ1xuXG5kZXNjcmliZSgnRG91YmxlJywgKCkgPT4ge1xuXG4gIGZ1bmN0aW9uIHJlc2V0TGV2ZWxzKC4uLmxldmVscykge1xuICAgIGxldmVscy5mb3JFYWNoKGxldmVsID0+IHtcbiAgICAgIF8ua2V5cyhsZXZlbClcbiAgICAgICAgLmZpbHRlcihrZXkgPT4gWydnZXQnLCAnc2V0JywgJ2RlbCddLmluZGV4T2Yoa2V5KSAhPSAtMSlcbiAgICAgICAgLmZvckVhY2goa2V5ID0+IGxldmVsW2tleV0ucmVzZXQoKSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3Qgb25lID0ge1xuICAgIGdldDogc2lub24uc3R1YigpLFxuICAgIHNldDogc2lub24uc3R1YigpLFxuICAgIGRlbDogc2lub24uc3R1YigpXG4gIH07XG5cbiAgY29uc3QgdHdvID0ge1xuICAgIGdldDogc2lub24uc3R1YigpLFxuICAgIHNldDogc2lub24uc3R1YigpLFxuICAgIGRlbDogc2lub24uc3R1YigpXG4gIH07XG5cbiAgbGV0IGRvdWJsZTtcbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgcmVzZXRMZXZlbHMob25lLCB0d28pO1xuICAgIGRvdWJsZSA9IG5ldyBEb3VibGVEZWNrZXIob25lLCB0d28pO1xuICB9KVxuXG4gIGRlc2NyaWJlKCdnZXQnLCAoKSA9PiB7XG5cbiAgICBpdCgnZ2V0cyBzbW9vdGhseSB3aGVuIGRhdGUgaXMgZ29vZCcsIGRvbmUgPT4ge1xuICAgICAgb25lLmdldC5jYWxsc0FyZ1dpdGgoMSwgbnVsbCwgRGF0ZS5ub3coKSArIDEwMDApXG4gICAgICB0d28uZ2V0LmNhbGxzQXJnV2l0aCgxLCBudWxsLCAnYmFyJyk7XG5cbiAgICAgIGRvdWJsZS5nZXQoJ2ZvbycsIChlcnIsIHJlcykgPT4ge1xuICAgICAgICBleHBlY3QodHdvLmdldCkudG8uaGF2ZS5iZWVuLmNhbGxlZFdpdGgoJ2ZvbycpO1xuICAgICAgICBleHBlY3Qob25lLmdldCkudG8uaGF2ZS5iZWVuLmNhbGxlZFdpdGgoJ2ZvbycpO1xuICAgICAgICBleHBlY3QocmVzKS50by5lcXVhbCgnYmFyJyk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgbnVsbCBhbmQgZGVsZXRlcyB3aGVuIGRhdGUgaXMgcGFzdCcsIGRvbmUgPT4ge1xuICAgICAgb25lLmdldC5jYWxsc0FyZ1dpdGgoMSwgbnVsbCwgRGF0ZS5ub3coKSAtIDEwKVxuICAgICAgdHdvLmdldC5jYWxsc0FyZ1dpdGgoMSwgbnVsbCwgJ2JhcicpO1xuICAgICAgc2lub24uc3B5KGRvdWJsZSwgJ2RlbCcpO1xuXG4gICAgICBkb3VibGUuZ2V0KCdmb28nLCAoZXJyLCByZXMpID0+IHtcbiAgICAgICAgZXhwZWN0KHR3by5nZXQpLm5vdC50by5oYXZlLmJlZW4uY2FsbGVkO1xuICAgICAgICBleHBlY3Qob25lLmdldCkudG8uaGF2ZS5iZWVuLmNhbGxlZFdpdGgoJ2ZvbycpO1xuICAgICAgICBleHBlY3QocmVzKS50by5lcXVhbChudWxsKTtcbiAgICAgICAgZXhwZWN0KGRvdWJsZS5kZWwpLnRvLmhhdmUuYmVlbi5jYWxsZWRXaXRoKG9uZSwgdHdvLCAnZm9vJyk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG5cbiAgICBpdCgncmV0dXJucyBudWxsIHdoZW4gdGhlcmVzIG5vdGhpbmcgaW4gbGV2ZWwgb25lJywgZG9uZSA9PiB7XG4gICAgICBvbmUuZ2V0LmNhbGxzQXJnV2l0aCgxLCBudWxsLCBudWxsKTtcbiAgICAgIHNpbm9uLnNweShkb3VibGUsICdkZWwnKTtcbiAgICAgIGRvdWJsZS5nZXQoJ2ZvbycsIChlcnIsIHJlcykgPT4ge1xuICAgICAgICBleHBlY3QodHdvLmdldCkubm90LnRvLmhhdmUuYmVlbi5jYWxsZWQ7XG4gICAgICAgIGV4cGVjdChvbmUuZ2V0KS50by5oYXZlLmJlZW4uY2FsbGVkV2l0aCgnZm9vJyk7XG4gICAgICAgIGV4cGVjdChyZXMpLnRvLmVxdWFsKG51bGwpO1xuICAgICAgICBleHBlY3QoZG91YmxlLmRlbCkubm90LnRvLmhhdmUuYmVlbi5jYWxsZWQ7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnc2V0JywgKCkgPT4ge1xuXG4gICAgaXQoJ3NldHMgdHdvIHdpdGggdmFsdWUgYW5kIG9uZSB3aXRoIHRpbWUnLCBkb25lID0+IHtcbiAgICAgIHR3by5zZXQuY2FsbHNBcmdXaXRoKDIsIG51bGwsIG51bGwpO1xuICAgICAgb25lLnNldC5jYWxsc0FyZ1dpdGgoMywgbnVsbCwgbnVsbCk7XG4gICAgICBkb3VibGUuc2V0KCdmb28nLCAnYmFyJywgMTAwLCAoZXJyLCByZXMpID0+IHtcbiAgICAgICAgZXhwZWN0KG9uZS5zZXQpLnRvLmhhdmUuYmVlbi5jYWxsZWRXaXRoKCdmb28nKVxuXG4gICAgICAgIC8vIG1lc3N5IHdheSBvZiBqdXN0IGNoZWNraW5nIHRoYXQgdGhlIHJpZ2h0IHRpbWUgaXNcbiAgICAgICAgLy8gc2V0LCBnaXZpbmcgdGhhdCB0aGUgZnVuY3Rpb24gdG9vayBzb21ld2hlcmVcbiAgICAgICAgLy8gYmV0d2VlbiAwIGFuZCAxMDBtcy5cbiAgICAgICAgY29uc3Qgc2V0VGltZSA9IG9uZS5zZXQuZmlyc3RDYWxsLmFyZ3NbMV07XG4gICAgICAgIGNvbnN0IGVsYXBzZWQgPSBzZXRUaW1lIC0gRGF0ZS5ub3coKTtcbiAgICAgICAgZXhwZWN0KGVsYXBzZWQgPD0gMTAwKS50by5iZS50cnVlO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdpZiB0d28gZmFpbHMsIGl0IGRvZXMgbm90IHNldCBvbmUnLCBkb25lID0+IHtcbiAgICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKCdmb28nKVxuICAgICAgdHdvLnNldC5jYWxsc0FyZ1dpdGgoMiwgZXJyb3IpXG4gICAgICBkb3VibGUuc2V0KCdmb28nLCAnYmFyJywgKGVyciwgcmVzKSA9PiB7XG4gICAgICAgIGV4cGVjdChlcnIpLnRvLmVxdWFsKGVycm9yKTtcbiAgICAgICAgZXhwZWN0KG9uZS5zZXQpLm5vdC50by5oYXZlLmJlZW4uY2FsbGVkO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdfQ==
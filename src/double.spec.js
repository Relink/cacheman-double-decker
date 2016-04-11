import * as chai from 'chai';
chai.use(require('sinon-chai'));
const expect = chai.expect;
import * as sinon from 'sinon';
import * as Promise from 'bluebird';
import * as _ from 'lodash';

import DoubleDecker from './double'

describe('Double', () => {

  function resetLevels(...levels) {
    levels.forEach(level => {
      _.keys(level)
        .filter(key => ['get', 'set', 'del'].indexOf(key) != -1)
        .forEach(key => level[key].reset());
    });
  };

  const one = {
    get: sinon.stub(),
    set: sinon.stub(),
    del: sinon.stub()
  };

  const two = {
    get: sinon.stub(),
    set: sinon.stub(),
    del: sinon.stub()
  };

  let double;
  beforeEach(() => {
    resetLevels(one, two);
    double = new DoubleDecker(one, two);
  })

  describe('get', () => {

    it('gets smoothly when date is good', done => {
      one.get.callsArgWith(1, null, Date.now() + 1000)
      two.get.callsArgWith(1, null, 'bar');

      double.get('foo', (err, res) => {
        expect(two.get).to.have.been.calledWith('foo');
        expect(one.get).to.have.been.calledWith('foo');
        expect(res).to.equal('bar');
        done();
      });
    });

    it('returns null and deletes when date is past', done => {
      one.get.callsArgWith(1, null, Date.now() - 10)
      two.get.callsArgWith(1, null, 'bar');
      sinon.spy(double, 'del');

      double.get('foo', (err, res) => {
        expect(two.get).not.to.have.been.called;
        expect(one.get).to.have.been.calledWith('foo');
        expect(res).to.equal(null);
        expect(double.del).to.have.been.calledWith(one, two, 'foo');
        done();
      });
    });


    it('returns null when theres nothing in level one', done => {
      one.get.callsArgWith(1, null, null);
      sinon.spy(double, 'del');
      double.get('foo', (err, res) => {
        expect(two.get).not.to.have.been.called;
        expect(one.get).to.have.been.calledWith('foo');
        expect(res).to.equal(null);
        expect(double.del).not.to.have.been.called;
        done();
      });
    });
  });

  describe('set', () => {

    it('sets two with value and one with time', done => {
      two.set.callsArgWith(2, null, null);
      one.set.callsArgWith(3, null, null);
      double.set('foo', 'bar', 100, (err, res) => {
        expect(one.set).to.have.been.calledWith('foo')

        // messy way of just checking that the right time is
        // set, giving that the function took somewhere
        // between 0 and 100ms.
        const setTime = one.set.firstCall.args[1];
        const elapsed = setTime - Date.now();
        expect(elapsed <= 100).to.be.true;
        done();
      });
    });

    it('if two fails, it does not set one', done => {
      const error = new Error('foo')
      two.set.callsArgWith(2, error)
      double.set('foo', 'bar', (err, res) => {
        expect(err).to.equal(error);
        expect(one.set).not.to.have.been.called;
        done();
      });
    });
  });
});

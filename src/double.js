const ms = require('ms');

export default class DoubleDecker {

  constructor (one, two) {
    this.one = one;
    this.two = two;
  }

  get (k, cb) {
    return this.one.get(k, (err, res) => {
      if (err) return cb(err);
      if (!res) return cb(null, null);
      if (res < Date.now()) {

        // SIDEEFFECT! kickoff del -- note this is an
        // asyhronous function, but be purposely ignore
        // it's return and just hope it goes through...
        this.del(this.one, this.two, k);
        return cb(null, null);
      }
      return this.two.get(k, cb);
    });
  }

  set (k, v, ttl, cb) {

    // allow ttl to be the calback
    if ('function' === typeof ttl) {
      cb = ttl;
      ttl = null;
    }

    var expiry = Date.now() + ms('' + ttl);
    this.two.set(k, v, (err, res) => {
      if (err) return cb(err);

      // sets -1 to be infinity for the ttl, as we don't
      // want out level 1 cache to dissapear without
      // us deleting the level 2 cache!
      return this.one.set(k, expiry, -1, cb);
    });
  }

  del (k, cb) {
    this.two.del(k, (err, res) => {
      if (err) return cb(err);
      return this.one.del(k, cb);
    });
  }

  clear (cb) {
    // TODO: implement!
    cb(null, null);
  }

}

const assert = require('assert');
const t = require('../index');

describe('Clock', function () {
  let app = new t.Clock();

  it('#run()', function () {
    app.run().then((signal) => {
      console.log(JSON.stringify(signal));
      assert.ok(signal);
    }).catch(error => {
      assert.fail(error);
    });
  });
})
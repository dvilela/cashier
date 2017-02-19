const details = require('../details')({
  api: {
    port: 8081
  }
});

describe('details', () => {
  it('should resolve version', () => {
    const expected = require('../../package.json').version;
    const actual = details.version;
    expect(actual).toBe(expected);
  });
});

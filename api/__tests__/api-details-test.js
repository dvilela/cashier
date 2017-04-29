const details = require('../api-details')({
  api: {
    port: 8081
  }
});

describe('details', () => {
  it('should resolve app name and version', () => {
    const { name, version } = require('../../package.json');
    const expected = { name, version };
    const actual = details.app;
    expect(actual).toEqual(expected);
  });
});

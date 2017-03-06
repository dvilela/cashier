module.exports = (o, c) => Object.keys(o).sort(c).reduce((r, k) => (r[k] = o[k], r), {});

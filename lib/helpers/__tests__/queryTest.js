const { toMongo } = require('../query');

describe('query helper', () => {

  it('toMongo should parse greater than (>) query', () => {
    const resQuery = {
      'age>18': ''
    };
    expect(toMongo(resQuery).query).toEqual({ 'age': { $gt: 18 }});
  });

  it('toMongo should parse less than (<) query', () => {
    const resQuery = {
      'age<18': ''
    };
    expect(toMongo(resQuery).query).toEqual({ 'age': { $lt: 18 }});
  });

  it('toMongo should parse greater than (>) and less than (<) query', () => {
    const resQuery = {
      'age>18': '',
      'age<65': ''
    };
    expect(toMongo(resQuery).query).toEqual({ 'age': { $gt: 18, $lt: 65 }});
  });

  it('toMongo should parse greater than or equal (>=) query', () => {
    const resQuery = { 'age>': 18 };
    expect(toMongo(resQuery).query).toEqual({ 'age': { $gte: 18} });
  });

  it('toMongo should parse less than or equal (<=) query', () => {
    const resQuery = { 'age<': 18 };
    expect(toMongo(resQuery).query).toEqual({ 'age': { $lte: 18} });
  });

  it('toMongo should parse greater than or equal (>=) and less than or equal (<=) query', () => {
    const resQuery = {
      'age>': 18,
      'age<': 65
     };
    expect(toMongo(resQuery).query).toEqual({ 'age': { $gte: 18, $lte: 65} });
  });

  it('toMongo should parse greater than zero (>0) query', () => {
    const resQuery = {
      'age>0': ''
    };
    expect(toMongo(resQuery).query).toEqual({ 'age': { $gt: 0 }});
  });

  it('toMongo should parse less than zero (<0) query', () => {
    const resQuery = {
      'age<0': ''
    };
    expect(toMongo(resQuery).query).toEqual({ 'age': { $lt: 0 }});
  });

  it('toMongo should throw error about greater than queries with no value', () => {
    const resQuery = {
      'age>': ''
    };
    expect(() => toMongo(resQuery)).toThrow();
  });

  it('toMongo should throw error about less than queries with no value', () => {
    const resQuery = {
      'age<': ''
    };
    expect(() => toMongo(resQuery)).toThrow();
  });

  it('toMongo should not parse string values of queries', () => {
    const resQuery = {
      'month>': 'Jan',
      'month<': 'Jun',
      'dayOfWeek>Thursday': ''
    };
    expect(toMongo(resQuery).query).toEqual({
      'month': { $gte: 'Jan', $lte: 'Jun' },
      'dayOfWeek': { $gt: 'Thursday' }
    });
  });

  it('toMongo should not parse equal queries', () => {
    const resQuery = {
      'name': 'John',
      'id': 2,
      'year': '2017'
    };
    expect(toMongo(resQuery).query).toEqual({
      'name': 'John',
      'id': 2,
      'year': '2017'
    });
  });

  it('toMongo should parse RegExp queries', () => {
    const resQuery = {
      'name~': '/Doe/i',
      'lastname~': 'Vilela',
      'text~': /health/iu
    };
    expect(toMongo(resQuery).query).toEqual({
      'name': /Doe/i,
      'lastname': /Vilela/,
      'text': /health/iu
    });
  });

  it('toMongo should return undefined query if nothing is passed', () => {
    const resQuery = {};
    expect(toMongo(resQuery).query).toBeFalsy();
  });

  it('toMongo should parse sort descending by id (sort=-_id)', () => {
    const resQuery = { sort: '-_id' };
    expect(toMongo(resQuery).sort).toEqual({ _id: -1 });
  });

  it('toMongo should parse sort ascending by id (sort=_id)', () => {
    const resQuery = { sort: '_id' };
    expect(toMongo(resQuery).sort).toEqual({ _id: 1 });
  });

  it('toMongo should parse sort descending date and by name (sort=-date,name)', () => {
    const resQuery = { sort: [ '-date', 'name' ] };
    expect(toMongo(resQuery).sort).toEqual({ date: -1, name: 1 });
  });

});

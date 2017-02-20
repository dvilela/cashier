const queryFields = [ 'sort', 'fields', 'offset', 'limit' ];

const toMongo = (query) => {
  const { sort='-_id', fields, offset=0, limit=10 } = query;
  for (let field of queryFields) delete query[field];
  const mongoFilters = {
    sort: parseSort(sort),
    offset,
    limit,
    query: parseResQuery(query)
  };
  if (fields != null) {
    mongoFilters.fields = fields;
  }
  return mongoFilters;
};

const parseSort = (sortQuery) => {
  const sort = [].concat(sortQuery).reduce((sort, query) =>
    Object.assign(
      sort,
        query[0] == '-' ? { [query.substring(1)] : -1 } :
        { [query] : 1 }
    ),
    {}
  );
  return sort;
};

const assignParsedQueryField = (queryObject, symbol, operator, query, queryValue) => {
  let [fieldName, value] = query.split(symbol);

  if (value == '') {
    operator += 'e';
    value = queryValue;
  }

  if (value == '') {
    throw new Error(`query ${query} with no value`);
  }

  if (!isNaN(+value)) {
    value = +value;
  }

  if (queryObject[fieldName] == null) {
    queryObject[fieldName] = {};
  }

  Object.assign(queryObject[fieldName], { [operator]: value });
};

const parseResQuery = (resQuery) => {
  const query = {};
  for (let qf in resQuery) {
    if (qf.indexOf('>') > -1) {
      assignParsedQueryField(query, '>', '$gt', qf, resQuery[qf]);
    } else if (qf.indexOf('<') > -1) {
      assignParsedQueryField(query, '<', '$lt', qf, resQuery[qf]);
    } else if (qf.indexOf('~') > -1) {
      let pattern = resQuery[qf];
      let flags;
      if (pattern[0] == '/') {
        const parts = pattern.split('/');
        // has flags
        if (parts.length == 3) {
          flags = parts[2];
          pattern = parts[1];
        }
      }
      query[qf.split('~')[0]] = new RegExp(pattern, flags);
    } else {
      query[qf] = resQuery[qf];
    }
  }
  if (Object.keys(query).length > 0) {
    return query;
  }
};

module.exports = { toMongo };

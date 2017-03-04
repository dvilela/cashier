const logger = require('../helpers/logger');

// creates a crud
const crud = (model, middlewares = []) => {

  const applyMiddlewares = (docs) => {
    if (docs == null)
      return;
    if (docs instanceof Array) {
      docs.forEach((doc) => middlewares.forEach((middleware) => middleware(doc)));
    } else {
      middlewares.forEach((middleware) => middleware(docs));
    }
    return docs;
  };

  const create = (doc) =>
    model.create(doc).then(
      (response) => {
        response = applyMiddlewares(response.toObject());
        logger.debug('doc created', response);
        return response;
      },
      (err) => logger.error(err)
    );

  const deleteById = (id) =>
    model.remove({ _id: id }).then(
      () => { },
      (err) => logger.error(err)
    );

  const find = ({ fields, sort, offset, limit, query }) => {
    const queryPromise = model.find({ query }).limit(limit).skip(offset).sort(sort).lean();
    if (fields != null) {
      q.select(fields);
    }

    const countPromise = model.count();

    return Promise.all([queryPromise, countPromise]).then(
      ([docs, count]) => ({ totalCount: count, content: applyMiddlewares(docs) }),
      (err) => logger.error(err)
    )
  };

  const findById = (id) =>
    model.findById(id).then(
      (response) => response && applyMiddlewares(response.toObject()),
      (err) => logger.error(err)
    );

  const update = (id, doc) =>
    model.findOneAndUpdate({ _id: id }, doc, { new: true }).then(
      (doc) => {
        if (doc != null) {
          // saving incremented document version
          doc.increment();
          doc.save();

          obj = doc.toObject();

          // little hack to return incremented version.
          obj.__v++;
          return applyMiddlewares(obj);
        }
      },
      (err) => logger.error(err)
    );

  return {
    create,
    deleteById,
    find,
    findById,
    update
  };
};

module.exports = { crud };

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
      }
    );

  const deleteById = (id) =>
    model.remove({ _id: id }).then(
      () => { }
    );

  const find = ({ fields, sort, offset, limit, query }) => {
    const queryPromise = model.find(query).select(fields).limit(limit).skip(offset).sort(sort).lean();
    const countPromise = model.count();

    return Promise.all([queryPromise, countPromise]).then(
      ([docs, count]) => ({ totalCount: count, content: applyMiddlewares(docs) })
    )
  };

  const findById = (id, { fields } = {}) =>
    model.findById(id).select(fields).then(
      (response) =>
        response && applyMiddlewares(response.toObject())
    );

  const pull = (id, path, value) =>
    update(id, { $pull: { [path]: value } }, {});

  const push = (id, path, value) =>
    update(id, { $push: { [path]: value } }, {});

  const update = (id, doc, options = { new: true }) =>
    model.findOneAndUpdate({ _id: id }, doc, options).then(
      (doc) => {
        if (doc != null) {
          // saving incremented document version
          doc.increment();
          doc.save();
        }
      }
    );

  return {
    create,
    deleteById,
    find,
    findById,
    pull,
    push,
    update
  };
};

module.exports = { crud };

const Bank = require('../models/Bank');
const logger = require('../helpers/logger');
const { toMongo } = require('../helpers/query');

const create = (bank) =>
  Bank.create(bank).then(
    (response) => {
      response = response.toObject();
      logger.debug('bank created', response);
      return response;
    },
    (err) => logger.error(err)
  );

const deleteById = (id) =>
  Bank.remove({ _id : id }).then(
    () => {},
    (err) => logger.error(err)
  );

const find = ({ fields, sort, offset, limit, query }) => {
  logger.debug('banks', sort);
  const queryPromise = Bank.find({ query }).limit(limit).skip(offset).sort(sort).lean();
  if (fields != null) {
    fields = [].concat(fields);
    q.select(fields.join(' '));
  }

  const countPromise = Bank.count();

  return Promise.all([queryPromise, countPromise]).then(
    ([banks, count]) => ({ totalCount: count, content: banks }),
    (err) => logger.error(err)
  )
}

const findById = (id) =>
  Bank.findById(id).then(
    (response) => response.toObject(),
    (err) => logger.error(err)
  );

const update = (id, bank) =>
  Bank.findOneAndUpdate({ _id: id }, bank, { new: true }).then(
    (doc) => {
      doc.increment();
      doc.save();
      bank = doc.toObject();
      bank.__v++;
      return bank;
    },
    (err) => logger.error(err)
  )

module.exports = {
  create,
  deleteById,
  find,
  findById,
  update
}

const mongoose = require('mongoose');

const Model = mongoose.model('Quote');

const custom = require('@/controllers/pdfController');

const { calculate } = require('@/helpers');

const update = async (req, res) => {
  const { items = [], discountRate = 0, discount = 0 } = req.body;

  if (items.length === 0) {
    return res.status(400).json({
      success: false,
      result: null,
      message: 'Items cannot be empty',
    });
  }
  
  let subTotal = 0;
  let discountTotal = 0;
  let total = 0;
  

  
  items.map((item) => {
    let total = calculate.multiply(item['quantity'], item['price']);
    
    subTotal = calculate.add(subTotal, total);
    
    item['total'] = total;
  });
  discountTotal = calculate.multiply(subTotal, discountRate / 100);
  total = calculate.add(subTotal, discountTotal);

  let body = req.body;

  body['subTotal'] = subTotal;
  body['discountTotal'] = discountTotal;
  body['total'] = total;
  body['items'] = items;
  body['pdf'] = 'quote-' + req.params.id + '.pdf';

  if (body.hasOwnProperty('currency')) {
    delete body.currency;
  }
  

  const result = await Model.findOneAndUpdate({ _id: req.params.id, removed: false }, body, {
    new: true, 
  }).exec();

  

  return res.status(200).json({
    success: true,
    result,
    message: 'we update this document ',
  });
};
module.exports = update;

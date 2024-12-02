const mongoose = require('mongoose');

const Model = mongoose.model('Quote');

const custom = require('@/controllers/pdfController');
const { increaseBySettingKey } = require('@/middlewares/settings');
const { calculate } = require('@/helpers');

const create = async (req, res) => {
  const { items = [], discountRate = 0, discount = 0 } = req.body;

  
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
  body['createdBy'] = req.admin._id;

  
  const result = await new Model(body).save();
  const fileId = 'quote-' + result._id + '.pdf';
  const updateResult = await Model.findOneAndUpdate(
    { _id: result._id },
    { pdf: fileId },
    {
      new: true,
    }
  ).exec();
  

  increaseBySettingKey({
    settingKey: 'last_quote_number',
  });

  
  return res.status(200).json({
    success: true,
    result: updateResult,
    message: 'Quote created successfully',
  });
};
module.exports = create;

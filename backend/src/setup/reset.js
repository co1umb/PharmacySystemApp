require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: '.env.local' });

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);

async function deleteData() {
  const Admin = require('../models/coreModels/Admin');
  const AdminPassword = require('../models/coreModels/AdminPassword');
  const Setting = require('../models/coreModels/Setting');
  const PaymentMode = require('../models/appModels/PaymentMode');
  const discountes = require('../models/appModels/discountes');

  await Admin.deleteMany();
  await AdminPassword.deleteMany();
  await PaymentMode.deleteMany();
  await discountes.deleteMany();
  console.log('Admin Deleted.');
  await Setting.deleteMany();
  console.log('Setting Deleted');

  process.exit();
}

deleteData();

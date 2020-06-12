const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
  email: { type: String, unique: true},
  first_name: { type: String, default: '' },
  last_name: { type: String, default: '' },
  sequence:{ type: Number, default: 0 },
  password: { type: String }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('User', schema);

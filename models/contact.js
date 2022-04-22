const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const contactSchema = new Schema({
  name: {type: String, required: [true, 'Set name for contact']},
  email: {type: String},
  phone: {type: String},
  favorite: {type: Boolean, default: false}, 
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true, 
 },
 },
 {
  versionKey: false,
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id
      delete ret.isVaccinated
      return ret
    },
  },
  toObject: { virtuals: true },
},
 );

const Contact = model('contact', contactSchema)

module.exports = Contact
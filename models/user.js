const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')

const { Role } = require('../libs/constants');
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String, 
    default: 'Guest'
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
  role: {
      type: String, 
      enum: {values: Object.values(Role), message: 'Invalid role'},
      default: Role.USER
  },
  avatar: {
      type: String,
      default: function () {
        return gravatar.url(this.email, {s: '250'}, true)
      }
  },
},
{ 
    versionKey: false,
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            delete ret._id
            return ret
        },
    },
    toObject: {virtuals: true}
});

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(6)
        this.password = await bcrypt.hash(this.password, salt)
    }
    next()
})

userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const User = model('user', userSchema)

module.exports = User
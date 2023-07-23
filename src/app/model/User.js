const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
   email: { type: String},
   password: { type: String},
   pack: { type: String},
   role: { type: Number}
},{
    // Nó sẽ tự tạo ra 2 trường là createAt và updateAt
    timestamps: true
});

module.exports = mongoose.model('User', User);
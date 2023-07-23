const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Bill = new Schema({
   user: { type: String},
   pack: { type: String},
   card: { type: Number},
   end: { type: Date},
   status: { type: Boolean}
},{
    // Nó sẽ tự tạo ra 2 trường là createAt và updateAt
    timestamps: true
});

module.exports = mongoose.model('Bill', Bill);
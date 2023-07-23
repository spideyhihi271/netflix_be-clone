const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Pack = new Schema({
    name: { type: String, require: true},
    price: { type: Number, require: true},
    quality: { type: String},
    resolution: { type: String},
    devices: { type: Array},
    update: { type: Date},
    sold: { type: Number},
    hidden: { type: Boolean}
},{
    // Nó sẽ tự tạo ra 2 trường là createAt và updateAt
    timestamps: true
});

module.exports = mongoose.model('Pack', Pack);
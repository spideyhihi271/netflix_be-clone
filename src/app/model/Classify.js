const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Classify = new Schema({
    name: { type: String},
    prioritize: { type: Number}
},{
    // Nó sẽ tự tạo ra 2 trường là createAt và updateAt
    timestamps: true
});

module.exports = mongoose.model('Classify', Classify);
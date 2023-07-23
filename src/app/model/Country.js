const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Country = new Schema({
    name: { type: String},
    prioritize: { type: Number}
},{
    // Nó sẽ tự tạo ra 2 trường là createAt và updateAt
    timestamps: true
});

module.exports = mongoose.model('Country', Country);
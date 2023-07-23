const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Actor = new Schema({
    name: { type: String},
    avt: { type: String},
    country: { type: String}
},{
    // Nó sẽ tự tạo ra 2 trường là createAt và updateAt
    timestamps: true
});

module.exports = mongoose.model('Actor', Actor);
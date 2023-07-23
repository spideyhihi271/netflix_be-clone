const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Gender = new Schema({
    name: { type: String},
    prioritize: { type: Number},
    hidden: { type: Boolean}
},{
    // Nó sẽ tự tạo ra 2 trường là createAt và updateAt
    timestamps: true
});

module.exports = mongoose.model('Gender', Gender);
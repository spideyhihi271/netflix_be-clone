const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Slot = new Schema({
    name: { type: String},
    user: { type: String},
    avt: { type: String},
    playlist: { type: Array}
},{
    // Nó sẽ tự tạo ra 2 trường là createAt và updateAt
    timestamps: true
});

module.exports = mongoose.model('Slot', Slot);
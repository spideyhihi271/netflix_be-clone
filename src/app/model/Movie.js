const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Movie = new Schema({
    name: { type: String, require: true},
    link: { type: String, require: true},
    rating: { type: Number, max: 10},
    lenght: { type: Number},
    pay: { type: Boolean},
    views: { type: Number},
    type: { type: Number},
    class: { type: Object},
    country: { type: Object},
    public: { type: Number},
    description: { type: String},
    story: { type: String},
    actors: { type: Array},
    genders: { type: Array},
    banner: { type: String},
    poster: { type: String},
    pictures: { type: Array},
    hidden: { type: Boolean}
},{
    // Nó sẽ tự tạo ra 2 trường là createAt và updateAt
    timestamps: true
});

module.exports = mongoose.model('Movie', Movie);
const mongoose = require('mongoose');

const url = 'mongodb+srv://nguyenlt2713:cv6HCAJP1bqgJlTn@cluster0.vjyj1wi.mongodb.net/';
let connect = async () => {
   try {
        await mongoose.connect(url); 
        console.log('Connect successfully!!!')
   } catch (error) {
        console.log('Connect failure!!!')
   }
}

module.exports = { connect }

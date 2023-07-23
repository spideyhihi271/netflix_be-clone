const User = require('../model/User');
const Bill = require('../model/Bill');
const Pack = require('../model/Pack');
const formatData = require('../../utils/format_data');
const bcrypt = require("bcrypt");   
const salt = bcrypt.genSaltSync(10);

class UserController {
    // [GET] /api/user/:email
    async getUserByEmail(req, res) {
        try {
            const user = await User.findOne({ email: req.params.email});
            let isExist = false;
            if(user != null) isExist = true;
            res.status(200).json({
                isExist
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [GET] /api/user/:email
    async getUserById(req, res) {
        try {
            const user = await User.findOne({ _id: req.params._id});
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [POST] /api/user/create
    async createNewUser(req, res) {
        try {
            let data = req.body;
            data.role = 0;
            data.pack = '';
            data.password = bcrypt.hashSync(data.password, salt);
            const user = new User(data);
            user.save();
            res.status(200).json({
                massage: 'Your account was created!'
            });
        } catch (err) {
            res.status(400).json(err);
        }
    }
    // [POST] /api/user/login
    async loggingUser(req, res) {
        try {
            let data = req.body;
            let isValid = false;
            let user = await User.findOne({ email: data.email});
            if(user != null) {
                isValid = bcrypt.compareSync(req.body.password, user.password);
                if(isValid) res.status(200).json(user);
                else res.status(200).json(isValid);
            }else{
                res.status(200).json(isValid);
            }
            
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [GET] /api/user/admin
    async getAllUserForAdmin(req, res) {
        try {
            let queries = req.query;
            let users = await User.find({});
            let bills = await Bill.find({});
            let packs = await Pack.find({});
            let data = formatData.userForAdmin(users, bills, packs, queries);
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [GET] /api/user/admin
    async getUserByEmailForAdmin(req, res) {
        try {
            let queries = req.query;
            let users = await User.find({ email: req.params.email});
            let bills = await Bill.find({});
            let packs = await Pack.find({});
            let data = formatData.userForAdmin(users, bills, packs, queries);
            res.status(200).json(data[0]);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [POST] /api/user/create
    async createNewUserForAdmin(req, res) {
        try {
            let data = req.body;
            data.pack = '';
            data.password = bcrypt.hashSync(data.password, salt);
            const user = new User(data);
            user.save();
            res.status(200).json({
                massage: 'Your account was created!'
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [DELETE] /api/user/admin/:id
    async deleteUserByIdForAdmin(req, res) {
        try {
            await User.findByIdAndDelete(req.params._id);
            res.status(200).json({
                massage: "Deleted was compeleted!!!"
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [POST] /api/user/login/admin
    async loggingUserForAdmin(req, res) {
        try {
            let data = req.body;
            let isValid = false;
            let user = await User.findOne({ email: data.email, role: 1});
            if(user != null) {
                isValid = bcrypt.compareSync(req.body.password, user.password);
            }
            res.status(200).json(isValid);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [PATCH] /api/user/:email
    async updatePass(req, res) {
        try {
            let data = {};
            data.password = req.body.pass;
            console.log(req.params.email);
            console.log(data.password);
            data.password = bcrypt.hashSync(data.password, salt);
            await User.findOneAndUpdate({ email: req.params.email}, data);
            res.status(200).json({
                massage: "Update was compeleted!!!"
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }
}
  
module.exports = new UserController();
  
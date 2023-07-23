const { filterWithQuery } = require("./filter_data");
const { mutipleMongooseToObject, moogoesToObject } = require('../utils/mongooesToObject');
const { filterGenderForAdmin, filterCountryForAdmin, filterClientForAdmin, filterBillForAdmin, filterPackForAdmin } = require('../utils/filter_data');
const { minus_times_today } = require('../utils/minus _times');
const mongooesToObject = require("../utils/mongooesToObject");
module.exports = {
    mutilpleMovie(movies, countries, actors, genders, classifies, queries) {
        movies = mutipleMongooseToObject(movies).reverse();
        countries = mutipleMongooseToObject(countries);
        actors = mutipleMongooseToObject(actors);
        genders = mutipleMongooseToObject(genders);
        classifies = mutipleMongooseToObject(classifies);
        // Map with Classicfy
        movies.map((movie, idx) => {
            classifies.map(classify => {
                if (movie.class._id == classify._id) {
                    movies[idx].class.name = classify.name;
                }
            })
        })
        // Map with country
        movies.map((movie, idx) => {
            countries.map(count => {
                if (movie.country._id == count._id) {
                    movies[idx].country.name = count.name;
                }
            })
        })
        //  Map with gender
        movies.map((movie, idxMovie) => {
            movie.genders.map((genMovie, idxGen) => {
                genders.map(gender => {
                    if (genMovie._id == gender._id) {
                        movies[idxMovie].genders[idxGen].name = gender.name;
                    }
                })
            })
        })
        // Map with actor
        movies.map((movie, idxMovie) => {
            movie.actors.map((actMovie, idxAct) => {
                actors.map(actor => {
                    if (actMovie._id == actor._id) {
                        movies[idxMovie].actors[idxAct].name = actor.name;
                        movies[idxMovie].actors[idxAct].avt = actor.avt;
                    }
                })
            })
        })
        movies = filterWithQuery(movies, queries);
        return movies;
    },
    onlyMovie(movie, countries, actors, genders) {
        countries.map(country => {
            if (movie.country._id == country._id) {
                movie.country.name = country.name;
            }
        })
        // With gender
        movie.genders.map((genMovie, idx) => {
            genders.map(gender => {
                if (genMovie._id == gender._id) {
                    movie.genders[idx].name = gender.name;
                }
            })
        })
        // With actors
        movie.actors.map((actMovie, idx) => {
            actors.map(actor => {
                if (actMovie._id == actor._id) {
                    movie.actors[idx].name = actor.name;
                    movie.actors[idx].avt = actor.avt;
                }
            })
        })
        return movie;
    },
    genderForAdmin(genders, movies, queries) {
        genders = mutipleMongooseToObject(genders).reverse();
        movies = mutipleMongooseToObject(movies);
        genders.map((gender, idx) => {
            // Config lần đầu
            if (genders[idx].views === undefined) genders[idx].views = 0;
            if (genders[idx].contentNumber === undefined) genders[idx].contentNumber = 0;
            // Xử lí data
            movies.map(movie => {
                movie.genders.map(genMov => {
                    if (genMov._id == gender._id) {
                        genders[idx].views += movie.views;
                        genders[idx].contentNumber += 1;
                    }
                })
            })
        })
        let data = filterGenderForAdmin(genders, queries);
        return data;
    },
    countryForAdmin(countries, movies, actors, queries) {
        countries = mutipleMongooseToObject(countries).reverse();;
        movies = mutipleMongooseToObject(movies);
        actors = mutipleMongooseToObject(actors);

        countries.map((country, idx) => {
            // Config lần đầu
            if (countries[idx].views === undefined) countries[idx].views = 0;
            if (countries[idx].contentNumber === undefined) countries[idx].contentNumber = 0;
            if (countries[idx].actors === undefined) countries[idx].actors = [];
            movies.map(movie => {
                if (country._id == movie.country._id) {
                    countries[idx].views += movie.views;
                    countries[idx].contentNumber += 1;
                };
            })
        })
        countries.map((country, idx) => {
            actors.map(actor => {
                if (country._id == actor.country) {
                    countries[idx].actors.push({
                        name: actor.name,
                        avt: actor.avt,
                    })
                };
            })
        })
        countries = filterCountryForAdmin(countries, queries);
        return countries;
    },
    userForAdmin(users, bills, packs, queries) {
        users = mutipleMongooseToObject(users).reverse();;
        bills = mutipleMongooseToObject(bills);
        packs = mutipleMongooseToObject(packs);

        users.map((user, idx) => {
            // Define info
            users[idx].createdAt = new Date(user.createdAt).toLocaleString('vi');
            users[idx].service = {
                _idPack: '',
                packName: 'Chưa đăng kí',
                start: 'Chưa đăng kí',
                end: 'Chưa đăng kí',
                status: 'Chưa đăng kí',
            };
            bills.map(bill => {
                if (user.pack == bill._id) {
                    let createDay = new Date(bill.createdAt);
                    let endDate = new Date(bill.end);
                    let nowDate = new Date();
                    let endStart = endDate - createDay;
                    let nowEnd = nowDate - createDay;
                    let endStartDiff = endStart / (1000 * 60 * 60 * 24);
                    let nowEndDiff = nowEnd / (1000 * 60 * 60 * 24);
                    let status = '';
                    if(endStartDiff > 29) status = 'Đang sử dụng';
                    else if(nowEndDiff >= 0) status = 'Đã hết hạn';
                    else status = 'Đã hủy';
                    users[idx].service = {
                        _idPack: bill.pack,
                        start: bill.createdAt,
                        end: bill.end,
                        status: status
                    };
                };
            })
        })
        users.map((user, idx) => {
            packs.map(pack => {
                if (user.service._idPack == pack._id) {
                    users[idx].service.packName = pack.name;
                }
            })
        })
        users = filterClientForAdmin(users, queries);
        return users;
    },
    billForAdmin( bills, users, packs, queries){
        bills = mutipleMongooseToObject(bills).reverse();;
        users = mutipleMongooseToObject(users);
        packs = mutipleMongooseToObject(packs);
        // Mapping with users
        bills.map((bill, idx) => {
            // First Config
            bills[idx].email = "";
            bills[idx].packName = "";
            bills[idx].price = 0;
            users.map(user => {
                if(bill._id == user.pack){
                    bills[idx].email = user.email;
                }
            })
        })
        // Mapping with pack
        bills.map((bill, idx) => {
            packs.map( pack => {
                if(bill.pack == pack._id){
                    bills[idx].packName = pack.name;
                    bills[idx].price = pack.price;
                }
            })
        })
        // Mapping with status
        bills.map((bill, idx) => {
            let createDay = new Date(bill.createdAt);
            let endDate = new Date(bill.end);
            let nowDate = new Date();
            let endStart = endDate - createDay;
            let nowEnd = nowDate - createDay;
            let endStartDiff = endStart / (1000 * 60 * 60 * 24);
            let nowEndDiff = nowEnd / (1000 * 60 * 60 * 24);
            let status = '';
            if(endStartDiff > 29) status = 'Đang sử dụng';
            else if(nowEndDiff >= 0) status = 'Đã hết hạn';
            else status = 'Đã hủy';
            bills[idx].status = status;
            bills[idx].end =  bills[idx].end.toLocaleString('vi');
            bills[idx].createdAt = bills[idx].createdAt.toLocaleString('vi');
        })
        bills = filterBillForAdmin(bills, queries);
        return bills;
    },
    packForAdmin(packs, queries){
        packs = mutipleMongooseToObject(packs).reverse();;
        packs = filterPackForAdmin(packs, queries)
        return packs;
    },
    mapBillWithPack(bills, packs, users){
        bills = mongooesToObject.mutipleMongooseToObject(bills);
        packs = mongooesToObject.mutipleMongooseToObject(packs);
        bills.map((item, idx) => {
            packs.map( pack => {
                if(item.pack == pack._id) {
                    bills[idx].price = pack.price;
                    bills[idx].namePack = pack.name;
                }
            })
        })
        if(users != undefined) {
            users = mongooesToObject.mutipleMongooseToObject(users);
            bills.map((bill, idx) => {
                users.map(user => {
                   if(bill.user == user._id){
                        bills[idx].email = user.email;
                   }
                })
            })
        }
        return bills;
    },
    totalSaleToday(bills, packs){
        bills = this.mapBillWithPack(bills, packs);
        let billsToday = [];
        bills.filter(item => {
            let diff = minus_times_today(item.createdAt, 0);
            if(diff <= 1) billsToday.push(item);
        })
        let billsyesterday = [];
        bills.filter(item => {
            let diff = minus_times_today(item.createdAt, 0);
            if(diff > 1 && diff < 2) billsToday.push(item);
        })
        // Total
        let totalToday = billsToday.reduce((total, item, idx) => total += item.price, 0);
        let totalYesterDay = billsyesterday.reduce((total, item, idx) => total += item.price, 0);
        // Minus
        let progress = (totalToday / (totalToday + totalYesterDay)) * 100; 
        return progress;
    },
    allSale(bills, packs){
        bills = this.mapBillWithPack(bills, packs);
        let allSale = bills.reduce((total, item, idx) => total += item.price, 0);
        let billsToday = [];
        bills.filter(item => {
            let diff = minus_times_today(item.createdAt, 0);
            if(diff <=1) billsToday.push(item);
        })
        // Total
        let totalToday = billsToday.reduce((total, item, idx) => total += item.price, 0);
        // Số đơn từng loại
        packs = packs.sort((a,b) => b.sold - a.sold)
        return {
            allSale,
            totalToday,
            packs
        }
    },
    allBillToday(bills, packs, users){
        bills = this.mapBillWithPack(bills, packs, users);
        bills = bills.reverse();
        let billsToday = [];
        bills.filter(item => {
            let diff = minus_times_today(item.createdAt, 0);
            if(diff <= 1) billsToday.push(item);
        })
        return billsToday;
    },
    billandUserToday(bills, packs, users){
        bills = this.mapBillWithPack(bills, packs, users);
        users = mutipleMongooseToObject(users);
        users = users.filter( item => item.role === 0)
        // Bill today
        let billsToday = [];
        bills.filter(item => {
            let diff = minus_times_today(item.createdAt, 0);
            if(diff <= 1) billsToday.push(item);
        })
        let billsyesterday = [];
        bills.filter(item => {
            let diff = minus_times_today(item.createdAt, 0);
            if(diff <= 1) billsToday.push(item);
        })
        // Total
        let totalBillToday = billsToday.reduce((total, item, idx) => total += item.price, 0);
        let totalBillYesterDay = billsyesterday.reduce((total, item, idx) => total += item.price, 0);
        // Minus
        let progressBill = (totalBillToday / (totalBillToday + totalBillYesterDay)) * 100;  
        // User
        let userToday = [];
        users.filter(item => {
            let diff = minus_times_today(item.createdAt, 0);
            if(diff <= 1) userToday.push(item);
        })
        let userYesterday = [];
        users.filter(item => {
            let diff = minus_times_today(item.createdAt, 0);
            if(diff > 1 && diff < 2) userYesterday.push(item);
        })
        // Total
        let totalUserToday = userToday.length;
        let totalUserYesterDay = userYesterday.length;
        // Minus
        let progressUser = ( totalUserToday / (totalUserYesterDay + totalUserToday)) * 100; 

        return [
            {
                name: "Doanh thu",
                total: totalBillToday,
                progress: progressBill
            },
            {
                name: "Khách hàng mới",
                total: totalUserToday,
                progress: progressUser
            }
        ];
    },

}
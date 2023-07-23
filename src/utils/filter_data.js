const { now } = require("mongoose");
const vnStr = require("vn-str");
const { unique_element } = require('../utils/unique_element');
module.exports = {
    filterWithQuery( movies, queries){
        if(queries.type) movies = movies.filter(movie => movie.type == queries.type);
        if(queries.country) movies = movies.filter(movie => movie.country._id == queries.country);
        if(queries.classify) movies = movies.filter(movie => movie.class._id == queries.classify);
        if(queries.public) movies = movies.filter(movie => movie.public == queries.public);
        if(queries.rating) movies = movies.sort((a, b) => b.rating - a.rating).filter(movie => movie.rating >= 8);
        if(queries.view) movies = movies.sort((a, b) => b.views - a.views);
        if(queries.pay) movies = movies.filter(movie => movie.pay == (queries.pay == 'true' ? true : false));
        if(queries.hidden) movies = movies.filter(movie => movie.hidden == (queries.hidden == 'true' ? true : false));
        if(queries.gender) {
           let result = [];
           movies.map( movie => {
                movie.genders.map(gender => {
                    if(gender._id === queries.gender) result.push(movie);
                })
           })
           movies = result;
        }
        if(queries.sortBy){
            switch (queries.sortBy) {
                case 'public':
                    movies = movies.sort((a,b) => b.public - a.public)
                    break;
            
                default:
                    movies = movies.sort((a,b) => b.views - a.views)
                    break;
            }
        }
        if(queries.keyword){
            let result = [];
            let keyword = vnStr.rmVnTones(queries.keyword);
            let keyList = keyword.split(" ");
            keyList.map( key => {
                movies.map( movie => {
                    key = key.toLocaleLowerCase();
                    value = vnStr.rmVnTones(movie.name.toLocaleLowerCase());
                    if(value.includes(key)) result.push(movie);
                })
            })
            movies = unique_element(result);
        }
        return movies;
    },
    filterGenderForAdmin(genders, queries){
        if(queries.hidden) genders = genders.filter(gender => {
            if(queries.hidden == 1) return gender.hidden === true;
            else return gender.hidden === false;
        });
        if(queries.sortBy) {
            switch (queries.sortBy) {
                case "prioritize":
                    genders = genders.sort((a, b) => b.prioritize - a.prioritize);
                    break;
                case "views":
                    genders = genders.sort((a, b) => b.views - a.views);
                    break;
                case "contentNumber":
                    genders = genders.sort((a, b) => b.contentNumber - a.contentNumber);
                    break;
            }
        }
        if(queries.keyword){
            let result = [];
            let keyword = vnStr.rmVnTones(queries.keyword);
            let keyList = keyword.split(" ");
            keyList.map( key => {
                genders.map( gender => {
                    key = key.toLocaleLowerCase();
                    value = vnStr.rmVnTones(gender.name.toLocaleLowerCase());
                    if(value.includes(key)) result.push(gender);
                })
            })
            genders = result.reduce((newArr, current) => {
                const x = newArr.find(item => item._id === current._id);
                if (!x) {
                  return newArr.concat([current]);
                } else {
                  return newArr;
                }
              }, []);

        }
        return genders;
    },
    filterCountryForAdmin(countries, queries){
        if(queries.sortBy) {
            switch (queries.sortBy) {
                case "prioritize":
                    countries = countries.sort((a, b) => b.prioritize - a.prioritize);
                    break;
                case "views":
                    countries = countries.sort((a, b) => b.views - a.views);
                    break;
                case "contentNumber":
                    countries = countries.sort((a, b) => b.contentNumber - a.contentNumber);
                    break;
            }
        }
        if(queries.keyword){
            let result = [];
            let keyword = vnStr.rmVnTones(queries.keyword);
            let keyList = keyword.split(" ");
            keyList.map( key => {
                countries.map( country => {
                    key = key.toLocaleLowerCase();
                    value = vnStr.rmVnTones(country.name.toLocaleLowerCase());
                    if(value.includes(key)) result.push(country);
                })
            })
            countries = result.reduce((newArr, current) => {
                const x = newArr.find(item => item._id === current._id);
                if (!x) {
                  return newArr.concat([current]);
                } else {
                  return newArr;
                }
              }, []);

        }
        return countries;
    },
    filterClientForAdmin(clients, queries){
        if(queries.pack) {
            if(queries.pack == 0)  clients;
            else if (queries.pack == 1) clients = clients.filter(item => item.service._idPack == "");
            else clients = clients.filter(item => item.service._idPack == queries.pack);
        }
        if(queries.status) {
            switch (Number(queries.status)) {
                case 0:
                    clients = clients.filter(item => item.service.status.includes('Chưa đăng kí'));
                    break;
                case 1:
                    clients = clients.filter(item => item.service.status.includes('Đang sử dụng'));
                    break;
                case 2: 
                clients = clients.filter(item => item.service.status.includes('Đã hết hạn'));
                    break;
                default:
                    clients = clients.filter(item => item.service.status.includes('Đã hủy'));
                    break;
            }
        }
        if(queries.role) clients = clients.filter(item => item.role == queries.role);
        if(queries.keyword){
            let result = [];
            let keyword = vnStr.rmVnTones(queries.keyword);
            let keyList = keyword.split(" ");
            keyList.map( key => {
                clients.map( client => {
                    key = key.toLocaleLowerCase();
                    value = vnStr.rmVnTones(client.email.toLocaleLowerCase());
                    if(value.includes(key)) result.push(client);
                })
            })
            clients = result.reduce((newArr, current) => {
                const x = newArr.find(item => item._id === current._id);
                if (!x) {
                  return newArr.concat([current]);
                } else {
                  return newArr;
                }
            }, []);

        }
        return clients;
    },
    filterBillForAdmin(bills, queries){
        if(queries.filter) {
            if(queries.filter == today)  bills.filter(item => item.createAt === new Date());
            if(queries.filter == end)  bills.filter(item => item.status === "Đã hết hạn");
        }
        if(queries.pack) bills = bills.filter(item => item.pack == queries.pack);
        if(queries.status) {
            switch (Number(queries.status)) {
                case 0:
                    bills = bills.filter(item => item.status.includes('Đang sử dụng'));
                    break;
                case 1:
                    bills = bills.filter(item => item.status.includes('Đã hết hạn'));
                    break;
                default:
                    bills = bills.filter(item => item.status.includes('Đã hủy'));
                    break;
            }
        }
        if(queries.sortBy){
            switch (queries.sortBy) {
                case 'price':
                    bills = bills.sort((a,b) => b.price - a.price);
                    break;
                case 'start':
                    bills = bills.sort((a,b) => a.createAt - b.createAt);
                break;
                default:
                    bills = bills.sort((a,b) => a.end - b.end);
                    break;
            }
        }
        if(queries.keyword){
            let result = [];
            let keyword = vnStr.rmVnTones(queries.keyword);
            let keyList = keyword.split(" ");
            keyList.map( key => {
                bills.map( bill => {
                    key = key.toLocaleLowerCase();
                    value = vnStr.rmVnTones(bill.email.toLocaleLowerCase());
                    if(value.includes(key)) result.push(bill);
                })
            })
            bills = unique_element(result);
        }
        return bills;
    },
    filterPackForAdmin(packs, queries){
        if(queries.resolution) packs = packs.filter(item => item.resolution == queries.resolution);
        if(queries.hidden){
            switch (Number(queries.hidden)) {
                case 0:
                    packs = packs.filter(item => item.hidden === false);
                    break;
            
                default:
                    packs = packs.filter(item => item.hidden === true);
                    break;
            }
        }
        if(queries.sortBy){
            switch (queries.sortBy) {
                case 'price':
                    packs = packs.sort((a,b) => b.price - a.price);
                    break;
            
                default:
                    packs = packs.sort((a,b) => b.sold - a.sold);
                    break;
            }
        }
        if(queries.keyword){
            let result = [];
            let keyword = vnStr.rmVnTones(queries.keyword);
            let keyList = keyword.split(" ");
            keyList.map( key => {
                packs.map( pack => {
                    key = key.toLocaleLowerCase();
                    value = vnStr.rmVnTones(pack.name.toLocaleLowerCase());
                    if(value.includes(key)) result.push(pack);
                })
            })
            packs = unique_element(result);
        }
        return packs
    }
    
}
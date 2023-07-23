module.exports = {
    mutipleMongooseToObject: (moogoes) => moogoes.map(item => item.toObject()),
    moogoesToObject: (moogoes) => moogoes ? moogoes.toObject() : moogoes
}

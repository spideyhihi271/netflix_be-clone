const Actor = require('../model/Actor');
class PackController {
    // [GET] /api/pack/
    async getAllActor(req, res) {
        try {
            const actors = await Actor.find({});
            res.status(200).json(actors);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new PackController();

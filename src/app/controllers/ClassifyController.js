const Classify = require('../model/Classify');
class ClassifyController {
    // [GET] /api/movie/
    async getAllClassify(req, res) {
        try {
            const classifies = await Classify.find({});
            res.status(200).json(classifies);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}
  
module.exports = new ClassifyController();
  
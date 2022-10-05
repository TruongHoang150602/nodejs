const Course = require('../models/Course');

class Newscontroller {
    // GET /news
    news(req, res) {
        Course.find({}, function (err, courses) {
            if (!err) {
                res.json(courses);
            } else {
                res.status(400).json({ error: 'ERROR' });
            }
        });
        res.render('search');
    }
}

module.exports = new Newscontroller();

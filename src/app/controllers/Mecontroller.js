const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');
class Mecontroller {
    // GET /stored/courses
    stored(req, res, next) {
        let coursesQuery =  Course.find({});

        if(req.query.hasOwnProperty('_sort')){
            coursesQuery = coursesQuery.sort({
                [req.query.column] : req.query.type
            })

        }

        Promise.all([coursesQuery])
            .then(([courses]) => {
                res.render('me/stored', {
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }
    // GET /trash/courses
    trash(req, res, next) {
        let coursesQuery =  Course.findDeleted({});
        if(req.query.hasOwnProperty('_sort')){
            coursesQuery = coursesQuery.sort({
                [req.query.column] : req.query.type
            })

        }

        Promise.all([coursesQuery])
            .then(([courses]) => {
                res.render('me/trash', {
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }
}

module.exports = new Mecontroller();

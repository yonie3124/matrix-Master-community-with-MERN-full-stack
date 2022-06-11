/*const mongoose = require('mongoose');*/

const titleModel = require('../models/Titles');

const homePage = async (req, res) => {
    await titleModel.find()
            .then( result => {
                res.render('index', {
                    alltitles: result,
                    result: ''
                });
            })
            .catch( err => {
                console.log(err)
            })
}

const addtitle = (req, res) => {
    if (req.body.title !== '' && req.body.article !== '') {
        let titlelenght = req.body.title.split(" ").join("");
        let articlelenght = req.body.article.split(" ").join("");
        if (titlelenght.length >= 25) {
            if (articlelenght.length >= 100) {
            let title = new titleModel(req.body);
            title.save()
                .then(() => {
                    res.redirect('/')
                })
                .catch(err => {
                    console.log(err)
                })
            }
            else {
                res.render('AddArticle', {
                    result: '',
                    formError: 'The Article field must be longer than 100 character.'
                })
            }
        }
        else {
            res.render('AddArticle', {
                result: '',
                formError: 'The Title field must be longer than 25 characters.'
            })
        }
    }
    else {
        res.render('AddArticle', {
            result: '',
            formError: 'All fields are required and can not be empty.'
        })
    }
}

const edittitle = (req, res) => {
    titleModel.findById(req.query.title_id)
        .then(title => {
            res.render('EditArticle', {
                title: title
            })
        })
        .catch(err => {
            console.log(err)
        })
}

const confirmEdit = (req, res) => {
    titleModel.findByIdAndUpdate(req.query.title_id, req.body, function (err, newData) {
        if (err) throw err

        res.redirect('/')
    })
}
const viewtitle = async (req, res) => {
  /*  let id = mongoose.Types.ObjectId(req.params.id);*/
    console.log(req.query.title_id);
    await titleModel.findById(req.query.title_id)
        .then(result => {
            console.log(result);
            res.render('ViewAtrical', {
                title: result,
                result: ''
            });
        })
        .catch(err => {
            console.log(err)
        })
}
const deletetitle = (req, res) => {
    userModel.findByIdAndDelete(req.query.title_id_id)
        .then(() => {
            res.redirect('/')
        })
        .catch(err => {
            console.log(err)
        })
}
const notFound =  (req, res) => {
    res.render('notFound')
}

module.exports = {
    homePage,
    notFound,
    addtitle,
    edittitle,
    confirmEdit,
    viewtitle,
    deletetitle
}
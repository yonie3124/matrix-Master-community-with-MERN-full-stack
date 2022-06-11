const Usermodel = require("../models/User");
const Questionmodel = require("../models/Question");
const jwt = require('jsonwebtoken'); 


const viewpage = (req, res) => {
    const user = res.locals.user;
    // check json web token exists & is verified
    if (user) {
        Questionmodel.find().populate("comments").populate("user").sort({ created_at: -1 })
            .then(result => {
                res.render('community', {
                    allquestions: result,
                    counts: result.length +1
                })
            })
            .catch(err => {
                console.log(err)
            })
    } else {
        console.log(user);
    }
};
const filter = (req, res) => {
    const user = res.locals.user;
    // check json web token exists & is verified
    if (user) {
        Questionmodel.find().populate("comments").populate("user").sort({ created_at: 1 })
            .then(result => {
                res.render('community', {
                    allquestions: result,
                    counts: result.length +1,
                    user: user
                })
            })
            .catch(err => {
                console.log(err)
            })
    } else {
        console.log(user);
    }
};
const addq = async (req, res) => {
    let user = await Usermodel.findById(req.query.user_id);
    // check json web token exists & is verified
    if (req.body.text.length > 0 && req.body.title.length > 0) {
        const Question = new Questionmodel(req.body);
        Question.user = req.query.user_id;
        console.log(req.query.user_id);
        Question.save().then(() => {
            Questionmodel.find().sort({ created_at: -1 })
                .then(result => {
                    console.log(user.email)
                    res.locals.user = user;
                res.render('community', {
                    allquestions: result,
                    counts: result.length +1
                })
            })
            .catch(err => {
                console.log(err)
            })
        })
            .catch(err => {
                console.log(err)
            })
        //Questionmodel.find().sort({ created_at: -1 })
        //    .then(result => {
        //        res.render('community', {
        //            allquestions: result,
        //            counts: result.length,
        //            error: ''
        //        })
        //    })
        //    .catch(err => {
        //        console.log(err)
        //    })
    }
    else {
        res.render('addquestions', {
            userid: req.query.user_id,
            formError: 'Please add value title and descreption can not be empty',
            user: user
        })
    }
};
const editq = (req, res) => {
    const user = res.locals.user;
    Questionmodel.findById(req.query.questions_id)
        .then(qresult => {
            res.render('editquestions', {
                formError: '',
                user: user,
                question: qresult
          })
        })
        .catch(err => {
            console.log(err)
        })
    
};
const confirm_edit = (req, res) => {
    Questionmodel.findByIdAndUpdate(req.query.question_id, { text: req.body.text, title: req.body.title })
        .then((result) => {

            console.log("updated")
            res.redirect(`/communitydetails/?question_id=${req.query.question_id}`)
        })
        .catch(err => {
    console.log(err)
                      })
};
const deleteq = (req, res) => {
    Questionmodel.findByIdAndDelete(req.query.q_id)
        .then(() => {
            res.redirect('community')
        })
        .catch(err => {
            console.log(err)
        })
};
const add_question = (req, res) => {
    const user = res.locals.user;
    res.render('addquestions', {
        formError: '',
        userid: user._id
    });
}
const serch_question = (req, res) => {
    let user = '';
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'Secretkey', async (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.locals.user = null;
            } else {
                user = await Usermodel.findById(decodedToken.id);
            }
        });
    }
   /* const user = res.locals.user;*/
    let searchtxt  = req.body.Searchtxt;
    console.log(searchtxt);
    /*    const txtRegex = new RegExp(searchtxt, 'i')*/
    Questionmodel.find({ title: { "$regex": searchtxt, "$options": "i" } }).exec()
        .then(result => {
            res.render('community', {
                allquestions: result,
                counts: result.length - 1,
                user: user
            })
        })
        .catch(err => {
            console.log(err)
        })  
}
module.exports = {
    viewpage,
    addq,
    editq,
    deleteq,
    add_question,
    serch_question,
    filter,
    confirm_edit
}
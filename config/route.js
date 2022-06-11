const express = require('express');
const route = express.Router()

const authController = require('../controller/authController');
const questionController = require('../controller/questionController');
const commentController = require('../controller/commentController');


route.get('/signup', authController.signup_get);
route.post('/signup', authController.signup_post);
route.get('/login', authController.login_get);
route.post('/login', authController.login_post);
route.get('/logout', authController.logout_get);

route.get('/community', questionController.viewpage);

route.get('/addquestions', questionController.add_question);
route.post('/addquestions', questionController.addq);
route.post('/confirm_edit_q', questionController.confirm_edit);
route.get('/edit-question', questionController.editq);
route.post('/delete-question', questionController.deleteq);
route.post('/searchquestions', questionController.serch_question);
route.get('/filter-q', questionController.filter);

route.get('/communitydetails', commentController.viewpage);
route.post('/add-comment', commentController.addcomment);
route.post('/delete-comment', commentController.deletecomment);
route.get('/rate-comment', commentController.ratecomment);


module.exports = route;
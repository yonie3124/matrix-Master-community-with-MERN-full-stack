const User = require("../models/User");
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
    /* console.log(err.message, err.code);*/
    let errors = '';

    // incorrect email
    if (err.message === 'incorrect email') {
        errors = 'That email is not registered';
    }
    // incorrect password
    if (err.message === 'incorrect password') {
        errors = 'That password is incorrect';
    }
   
    // duplicate email error
    if (err.code === 11000) {
        errors = 'that email is already registered';
        return errors;
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        // console.log(err);
        Object.values(err.errors).forEach(({ properties }) => {
            // console.log(val);
            console.log(properties.message);
            errors = properties.message;
        });
    }
    else if (err.message === '') {
        console.log("errors");
        errors = err.message;
        errors = errors.replace('user validation failed:', 'Validation failed:');
       
        console.log(errors);
    }
    return errors;
}
// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'Secretkey', {
    expiresIn: maxAge
  });
};

// controller actions
module.exports.signup_get = (req, res) => {
  res.render('signup');
}

module.exports.login_get = (req, res) => {
  res.render('login');
}

module.exports.signup_post = async (req, res) => {
    const { email, password, username } = req.body;

  try {
    const user = await User.create({ email, password, username});
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  }
  catch(err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors  });
  }
 
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

  try {
      const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } 
  catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors  });
  }

}

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}

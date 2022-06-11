const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://The-Timeline:MongoDBOne@cluster0.gvx5y.mongodb.net/?retryWrites=true&w=majority')
        .then( () => {
            console.log('DB is connected')
        })
        .catch( err => {
            console.log(err)
        })
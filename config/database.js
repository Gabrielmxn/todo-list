const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const URL = 'mongodb://localhost/to-do-list';

mongoose.connect(URL, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => console.log('conectado'))
	.catch((err) => console.log(err));
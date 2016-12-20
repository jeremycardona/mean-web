process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const configureExpress = require('./config/express');
const configureMongoose = require('./config/mongoose');

const db = configureMongoose();  // must be loaded before any other configuration, any module loaded after this 
                                // will be able to use the model without loading it by itself.
const app = configureExpress(); 

app.listen(3000); 
module.exports = app;

console.log('Server running at http://localhost:3000/');
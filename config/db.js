require('./keys'); //Conexion a la BD local o remota
const mongoose = require('mongoose');

mongoose.connect(process.env.URLBD, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;
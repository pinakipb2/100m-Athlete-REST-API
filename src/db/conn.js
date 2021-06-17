const mongoose = require('mongoose');
const env = require('dotenv');

env.config();

mongoose.connect(`${process.env.MONGO_DB_NAME}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Connection Successful");
}).catch((err) => {
    console.log(err);
});
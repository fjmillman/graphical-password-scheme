const mongoose = require("mongoose");

const connect = () => {
    const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}` +
        `@cluster0-tvtpt.mongodb.net/graphicalpasswordscheme?retryWrites=true`;

    mongoose.connect(uri, {useNewUrlParser: true})
        .then(() => console.log("Connected to MongoDB"))
        .catch(err => console.error(err));
};

module.exports = connect;

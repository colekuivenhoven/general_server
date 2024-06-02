const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const db = async () => {
    try {
        const response = await mongoose.connect(process.env.MONGODB_URL+'/Things', {});
        console.log(`MongoDB Connected: ${response.connection.host}`);
    } catch (error) {
        console.log('MongoDB Connection Error:', error);
    }
};

module.exports = db;
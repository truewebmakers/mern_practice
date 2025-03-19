const mongoose = require('mongoose'); 
const URI = process.env.MONGODB_URI;

const connectDb = async () => {
    try {
        await mongoose.connect(URI); 
        console.log("db connected"); 
    } catch (error) {
        console.error("db failed to connect"); 
        process.exit(0); 
    }
}

module.exports =connectDb; 
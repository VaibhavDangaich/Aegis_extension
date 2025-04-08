const moongoose=require('mongoose');
const dotenv=require('dotenv');
const dbConnect=async()=>{
    try {
        await moongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}
module.exports=dbConnect;
import mongoose from 'mongoose';

const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Mongo Connected!');
    } catch (error) {
        console.error('Mongo Connection Error:', error.message);
        throw new Error('Mongo Connection Error:', error.message);
       
    }
};

export default connectMongo;
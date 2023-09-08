import mongoose from 'mongoose';
mongoose.set('strictQuery', false);

const connectionToDb = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URI);
        if (connection) {
            console.log(`Conenected to MongoDB: ${connection.host}`);
        }
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error}`);
        process.exit(1);
    }
};

export default connectionToDb;

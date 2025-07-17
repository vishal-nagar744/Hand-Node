import mongoose from 'mongoose';
import colors from 'colors'; // add this at top of db.js


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log(colors.cyan.underline(` ✅ MongoDB Connected: ${conn.connection.host}`));
    } catch (error) {
        console.log(colors.red.bold(` ❌ Error: ${error.message}`));
        process.exit(1);
    }
};

export default connectDB; 
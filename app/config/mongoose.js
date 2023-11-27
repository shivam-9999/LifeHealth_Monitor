// ./config/mongoose.js

import mongoose from 'mongoose';
import config from './config.js';



// Define the Mongoose configuration method
const connectToDatabase = async () => {
  try {
    // Use Mongoose to connect to MongoDB
    const db = await mongoose.connect(process.env.URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log('DB Connected!');
    mongoose.set('useFindAndModify', false);

    // Return the Mongoose connection instance
    return db;
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
    throw err;
  }
};

// Export the function for external usage
export default connectToDatabase;

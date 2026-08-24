const mongoose = require('mongoose');
const dns = require('dns');

// Resolve mongodb+srv:// SRV records via Google DNS — some ISP/Windows
// resolvers fail or hang on SRV lookups.
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

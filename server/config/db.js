const mongoose = require('mongoose');
const dns = require('dns');

// Resolve mongodb+srv:// SRV records via Google DNS for local ISP/Windows resolvers.
// On Vercel (AWS Lambda), allow native DNS to avoid unnecessary outbound latency.
if (!process.env.VERCEL) {
  try {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
  } catch {}
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongooseInstance) => {
      console.log(`MongoDB connected: ${mongooseInstance.connection.host}`);
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    console.error(`MongoDB connection error: ${err.message}`);
    if (!process.env.VERCEL) {
      process.exit(1);
    }
    throw err;
  }

  return cached.conn;
};

module.exports = connectDB;

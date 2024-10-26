// backend/src/db/init.js
import mongoose from 'mongoose'

export async function initDatabase() {
  const DATABASE_URL = 'mongodb://localhost:27017/blog'

  try {
    // Establish the connection to MongoDB with unified topology
    await mongoose.connect(DATABASE_URL)

    // Log successful connection
    mongoose.connection.once('open', () => {
      console.log('Connected to the database:', DATABASE_URL)
    })

    // Handle connection errors after initial connection is established
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err)
    })
  } catch (error) {
    console.error('Error connecting to the database:', error)
    process.exit(1) // Optional: Exit process if the connection fails
  }
}

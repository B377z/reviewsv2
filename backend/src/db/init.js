// backend/src/db/init.js
import mongoose from 'mongoose'

export async function initDatabase(databaseUrl = process.env.DATABASE_URL) {
  try {
    // Establish the connection to MongoDB with unified topology
    await mongoose.connect(databaseUrl)

    // Log successful connection
    mongoose.connection.once('open', () => {
      console.log('Connected to the database:', databaseUrl)
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

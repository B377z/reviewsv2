// backend/src/db/init.js
import mongoose from 'mongoose'

export async function initDatabase() {
  const DATABASE_URL = 'mongodb://localhost:27017/blog'

  try {
    // Establish the connection to MongoDB
    await mongoose.connect(DATABASE_URL)

    // Log successful connection
    mongoose.connection.on('open', () => {
      console.log('Connected to the database', DATABASE_URL)
    })
  } catch (error) {
    console.error('Error connecting to the database:', error)
  }
}

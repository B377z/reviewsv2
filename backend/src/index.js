import { app } from './app.js'
import { initDatabase } from './db/init.js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const PORT = process.env.PORT || 3000 // Fallback to 3000 if PORT is not defined
const DATABASE_URL = process.env.DATABASE_URL

try {
  await initDatabase(DATABASE_URL)
  app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}/api/v1`)
  })
} catch (error) {
  console.error('Error starting server:', error)
}

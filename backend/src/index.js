import dotenv from 'dotenv'
dotenv.config()
console.log(process.env.DATABASE_URL)

import { app } from './app.js'
import { initDatabase } from './db/init.js'

// Load environment variables

const PORT = process.env.PORT || 3000 // Fallback to 3000 if PORT is not defined

try {
  await initDatabase(process.env.DATABASE_URL)
  app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}/api/v1`)
  })
} catch (error) {
  console.error('Error starting server:', error)
}

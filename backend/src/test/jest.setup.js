// jest.setup.js
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongoServer

// Before all tests, start MongoDB in memory
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  const uri = mongoServer.getUri()
  await mongoose.connect(uri)
})

// After each test, clear the database to ensure test isolation
afterEach(async () => {
  await mongoose.connection.db.dropDatabase()
})

// After all tests, close the MongoDB connection and stop the in-memory server
afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

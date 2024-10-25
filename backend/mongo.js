import mongo from 'mongodb'

const uri = 'mongodb://localhost:27017'
const client = new mongo.MongoClient(uri)

async function insertParkingLots() {
  try {
    await client.connect()
    console.log('Connected to the database')

    // Define database and collection
    const database = client.db('testdb')
    const collection = database.collection('parkingLots')

    // Array of parking lot documents to insert
    const parkingLots = [
      {
        lotId: 'PL001',
        name: 'Main Street Lot',
        location: '123 Main St',
        capacity: 100,
        occupiedSpots: 75,
        availableSpots: 25,
        hourlyRate: 5.0,
        minTime: '30 minutes',
        maxTime: '1 day',
        isOpen: true,
      },
      {
        lotId: 'PL002',
        name: 'Broadway Lot',
        location: '456 Broadway Ave',
        capacity: 150,
        occupiedSpots: 90,
        availableSpots: 60,
        hourlyRate: 6.0,
        minTime: '30 minutes',
        maxTime: '1 day',
        isOpen: true,
      },
      {
        lotId: 'PL003',
        name: 'Riverfront Lot',
        location: '789 Riverfront Rd',
        capacity: 80,
        occupiedSpots: 40,
        availableSpots: 40,
        hourlyRate: 4.5,
        minTime: '30 minutes',
        maxTime: '1 day',
        isOpen: false,
      },
    ]

    // Insert documents into collection
    const result = await collection.insertMany(parkingLots)
    console.log(`${result.insertedCount} parking lots inserted`)
  } catch (error) {
    console.error('Error inserting parking lots:', error)
  } finally {
    // Close the database connection
    await client.close()
    console.log('Disconnected from the database')
  }
}

// Call the function
insertParkingLots().catch(console.error)

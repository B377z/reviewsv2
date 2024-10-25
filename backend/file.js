import { writeFileSync, readFileSync } from 'node:fs'

// Step 1: Define the array of users
const users = [
  {
    email: 'john.doe@example.com',
    password: 'hashed_password_1',
    mobileNumber: '(555) 123-4567',
    vehicles: [
      {
        licensePlate: 'ABC123',
        country: 'US',
        state: 'CA',
        nickname: 'My Tesla',
      },
      {
        licensePlate: 'XYZ789',
        country: 'US',
        state: 'NY',
        nickname: 'Family SUV',
      },
    ],
  },
  {
    email: 'jane.smith@example.com',
    password: 'hashed_password_2',
    mobileNumber: '(444) 987-6543',
    vehicles: [
      {
        licensePlate: 'JKL456',
        country: 'US',
        state: 'TX',
        nickname: 'Roadster',
      },
    ],
  },
  {
    email: 'alex.johnson@example.com',
    password: 'hashed_password_3',
    mobileNumber: '(333) 456-7890',
    vehicles: [
      {
        licensePlate: 'MNO321',
        country: 'US',
        state: 'FL',
        nickname: 'Beach Cruiser',
      },
    ],
  },
]

const filepath = './users.json'

// Step 2: Write the array of users to a JSON file
writeFileSync(filepath, JSON.stringify(users, null, 2))
console.log(`Users saved to ${filepath}`)

// Step 3: Read the array of users from the JSON file
const fileContent = readFileSync(filepath, 'utf8')
const readUsers = JSON.parse(fileContent)

// Pretty-print the users read from file
console.log(`Users read from ${filepath}:`)
console.log(JSON.stringify(readUsers, null, 2))

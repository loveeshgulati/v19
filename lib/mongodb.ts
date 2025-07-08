import { MongoClient } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {
  serverSelectionTimeoutMS: 30000, // Increased from 5000
  connectTimeoutMS: 30000, // Increased from 10000
  socketTimeoutMS: 60000, // Increased from 45000
  maxPoolSize: 10,
  minPoolSize: 1, // Reduced from 5
  retryWrites: true,
  retryReads: true,
  tls: true,
  tlsAllowInvalidCertificates: false,
  directConnection: false,
  heartbeatFrequencyMS: 30000, // Added
  maxIdleTimeMS: 300000, // Added 5 minutes
  waitQueueTimeoutMS: 60000, // Added
  compressors: ['zlib'], // Added compression
  readPreference: 'primary' // Added
};

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export async function getDatabase() {
  try {
    const client = await clientPromise
    return client.db("splyBob_crm") // Database name
  } catch (error) {
    console.error('Database connection error:', error)
    throw new Error('Failed to connect to database')
  }
}

// Test database connection
export async function testDatabaseConnection() {
  try {
    const db = await getDatabase()
    await db.admin().ping()
    console.log('✅ Database connected successfully')
    return true
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    return false
  }
}

export default clientPromise

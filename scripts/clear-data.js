
require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require("mongodb");

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const dbName = "splyBob_crm";
const options = {
  serverSelectionTimeoutMS: 30000,
  connectTimeoutMS: 30000,
  socketTimeoutMS: 30000,
};

async function clearDatabase() {
  const client = new MongoClient(uri, options);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);

    // Get all collections
    const collections = await db.collections();

    for (const collection of collections) {
      console.log(`Clearing collection: ${collection.collectionName}`);
      await collection.deleteMany({});
    }

    console.log("All collections have been cleared.");

  } catch (error) {
    console.error("Error clearing database:", error);
  } finally {
    await client.close();
    console.log('Database connection closed');
  }
}

clearDatabase();


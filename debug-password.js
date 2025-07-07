const { MongoClient } = require('mongodb');

async function checkPasswordHashes() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db('splyBob_crm');
    
    // Find all supplier users
    const suppliers = await db.collection('users').find({ role: 'supplier' }).toArray();
    
    console.log('Found', suppliers.length, 'supplier users:');
    console.log('');
    
    suppliers.forEach((supplier, index) => {
      console.log(`Supplier ${index + 1}:`);
      console.log('  ID:', supplier._id);
      console.log('  Name:', supplier.name);
      console.log('  Email:', supplier.email);
      console.log('  Role:', supplier.role);
      console.log('  Supplier ID:', supplier.supplierId);
      console.log('  Has password:', !!supplier.password);
      console.log('  Password length:', supplier.password?.length || 0);
      console.log('  Password starts with:', supplier.password?.substring(0, 20) || 'N/A');
      console.log('  Is bcrypt hash:', supplier.password?.startsWith('$2b$') || supplier.password?.startsWith('$2a$') || 'false');
      console.log('  Created at:', supplier.createdAt);
      console.log('');
    });
    
    // Also check if there are any recent users (last 24 hours)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    const recentUsers = await db.collection('users').find({ 
      createdAt: { $gte: yesterday } 
    }).toArray();
    
    console.log('Recent users (last 24 hours):', recentUsers.length);
    recentUsers.forEach((user, index) => {
      console.log(`Recent user ${index + 1}:`);
      console.log('  Email:', user.email);
      console.log('  Role:', user.role);
      console.log('  Password hash valid:', user.password?.startsWith('$2b$') || user.password?.startsWith('$2a$') || 'false');
      console.log('');
    });
    
  } catch (error) {
    console.error('Error checking database:', error);
  } finally {
    await client.close();
  }
}

checkPasswordHashes().catch(console.error);

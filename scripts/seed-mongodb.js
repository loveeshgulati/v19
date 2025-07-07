// Run this script to seed your MongoDB database with initial data
// Usage: node scripts/seed-mongodb.js

require('dotenv').config({ path: '.env.local' })
const { MongoClient } = require("mongodb")

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const dbName = "splyBob_crm"
const options = {
  serverSelectionTimeoutMS: 30000,
  connectTimeoutMS: 30000,
  socketTimeoutMS: 30000,
}

const inventoryData = [
  {
    name: "Premium Car Seat Covers",
    category: "Interior Accessories",
    sku: "CSC-PREM-001",
    description: "High-quality leather seat covers for sedan cars",
    currentStock: 45,
    minStock: 10,
    maxStock: 100,
    unitPrice: 2500,
    supplier: "Sharma Auto Components",
    location: "Warehouse A-1-B",
    status: "In Stock",
    lastUpdated: "2024-01-22",
  },
  {
    name: "LED Headlight Bulbs H4",
    category: "Lighting",
    sku: "LED-H4-001",
    description: "6000K white LED headlight bulbs, 60W",
    currentStock: 8,
    minStock: 15,
    maxStock: 80,
    unitPrice: 1200,
    supplier: "Gupta Components Ltd",
    location: "Warehouse B-2-A",
    status: "Low Stock",
    lastUpdated: "2024-01-23",
  },
  {
    name: "Dashboard Camera 1080p",
    category: "Electronics",
    sku: "DASH-CAM-001",
    description: "Full HD dashboard camera with night vision",
    currentStock: 25,
    minStock: 5,
    maxStock: 50,
    unitPrice: 4200,
    supplier: "Patel Electronics",
    location: "Warehouse C-1-C",
    status: "In Stock",
    lastUpdated: "2024-01-21",
  },
  {
    name: "Rubber Floor Mats Set",
    category: "Interior Accessories",
    sku: "RFM-SET-001",
    description: "All-weather rubber floor mats, set of 4",
    currentStock: 0,
    minStock: 20,
    maxStock: 120,
    unitPrice: 800,
    supplier: "Kumar Auto Parts",
    location: "Warehouse A-2-A",
    status: "Out of Stock",
    lastUpdated: "2024-01-24",
  },
  {
    name: "Steering Wheel Cover",
    category: "Interior Accessories",
    sku: "SWC-LEA-001",
    description: "Genuine leather steering wheel cover with grip",
    currentStock: 35,
    minStock: 10,
    maxStock: 60,
    unitPrice: 650,
    supplier: "Singh Accessories",
    location: "Warehouse B-1-B",
    status: "In Stock",
    lastUpdated: "2024-01-20",
  },
]

const suppliersData = [
  {
    name: "Sharma Auto Components",
    contactPerson: "Rajesh Sharma",
    email: "rajesh@sharmaauto.com",
    phone: "+91 98765 43210",
    address: "Plot 45, Industrial Area, Gurgaon, Haryana 122001",
    category: "Interior Accessories",
    rating: 4.8,
    onTimeDelivery: 95,
    totalOrders: 156,
    totalValue: 1250000,
    status: "Active",
  },
  {
    name: "Gupta Components Ltd",
    contactPerson: "Amit Gupta",
    email: "amit@guptacomponents.com",
    phone: "+91 87654 32109",
    address: "Sector 18, Noida, Uttar Pradesh 201301",
    category: "Electronics & Lighting",
    rating: 4.6,
    onTimeDelivery: 88,
    totalOrders: 89,
    totalValue: 890000,
    status: "Active",
  },
  {
    name: "Patel Electronics",
    contactPerson: "Kiran Patel",
    email: "kiran@patelelectronics.com",
    phone: "+91 76543 21098",
    address: "Ring Road, Ahmedabad, Gujarat 380001",
    category: "Electronics & Accessories",
    rating: 4.9,
    onTimeDelivery: 97,
    totalOrders: 234,
    totalValue: 2100000,
    status: "Active",
  },
]

const purchaseOrdersData = [
  {
    orderNumber: "PO-2024-001",
    supplier: "Sharma Auto Components",
    assignedTo: "Arjun Mehta",
    status: "Delivered",
    items: [
      { name: "Premium Car Seat Covers", quantity: 20, unitPrice: 2500, total: 50000 },
      { name: "Steering Wheel Cover", quantity: 15, unitPrice: 650, total: 9750 },
    ],
    totalAmount: 59750,
    orderDate: "2024-01-15",
    expectedDelivery: "2024-01-22",
    actualDelivery: "2024-01-21",
    notes: "Urgent order for premium customers",
  },
  {
    orderNumber: "PO-2024-002",
    supplier: "Gupta Components Ltd",
    assignedTo: "Kavya Sharma",
    status: "In Transit",
    items: [{ name: "LED Headlight Bulbs H4", quantity: 50, unitPrice: 1200, total: 60000 }],
    totalAmount: 60000,
    orderDate: "2024-01-18",
    expectedDelivery: "2024-01-25",
    notes: "Bulk order for LED bulbs",
  },
]

// Seed Customers
const customersData = [
  {
    name: "Acme Corporation",
    contactPerson: "John Smith",
    email: "john@acme.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business St, Suite 100",
    city: "New York",
    country: "USA",
    industry: "Technology",
    companySize: "Large",
    status: "Active",
    estimatedValue: 125000,
    actualValue: 98000,
    notes: "Major enterprise client with multiple ongoing projects",
    assignedTo: "Sarah Johnson",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    name: "TechStart Inc",
    contactPerson: "Mike Wilson",
    email: "mike@techstart.com",
    phone: "+1 (555) 987-6543",
    address: "456 Innovation Ave",
    city: "San Francisco",
    country: "USA",
    industry: "Software",
    companySize: "Startup",
    status: "Prospect",
    estimatedValue: 75000,
    actualValue: 0,
    notes: "Promising startup in AI space",
    assignedTo: "David Kim",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
]

// Seed Leads
const leadsData = [
  {
    name: "Robert Chen",
    email: "robert@innovatetech.com",
    phone: "+1 (555) 234-5678",
    company: "InnovateTech",
    position: "CTO",
    source: "Website",
    status: "New",
    priority: "High",
    estimatedValue: 50000,
    notes: "Interested in our enterprise solution",
    assignedTo: "Sarah Johnson",
    nextFollowUp: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
]

// Seed Campaigns
const campaignsData = [
  {
    name: "Q1 Product Launch Campaign",
    type: "Email",
    status: "Active",
    budget: 25000,
    spent: 12500,
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    targetAudience: "Enterprise customers in technology sector",
    goals: "Increase awareness of new product features and generate qualified leads",
    description: "Comprehensive email marketing campaign targeting existing customers and prospects",
    channels: ["Email", "LinkedIn", "Google Ads"],
    metrics: {
      impressions: 45000,
      clicks: 3200,
      conversions: 125,
      leads: 89,
      revenue: 156000
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
]

async function seedDatabase() {
  const client = new MongoClient(uri, options)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db(dbName)

    // Clear existing data
    console.log('Clearing existing data...')
    await db.collection("inventory").deleteMany({})
    await db.collection("suppliers").deleteMany({})
    await db.collection("purchaseOrders").deleteMany({})
    await db.collection("customers").deleteMany({})
    await db.collection("leads").deleteMany({})
    await db.collection("campaigns").deleteMany({})

    // Insert seed data
    await db.collection("inventory").insertMany(inventoryData)
    console.log("Inventory data seeded")

    await db.collection("suppliers").insertMany(suppliersData)
    console.log("Suppliers data seeded")

    await db.collection("purchaseOrders").insertMany(purchaseOrdersData)
    console.log("Purchase orders data seeded")

    await db.collection("customers").insertMany(customersData)
    console.log("Customers data seeded")

    await db.collection("leads").insertMany(leadsData)
    console.log("Leads data seeded")

    await db.collection("campaigns").insertMany(campaignsData)
    console.log("Campaigns data seeded")

    console.log("Database seeding completed successfully!")
    console.log(`Seeded:
      - ${inventoryData.length} inventory items
      - ${suppliersData.length} suppliers
      - ${purchaseOrdersData.length} purchase orders
      - ${customersData.length} customers
      - ${leadsData.length} leads
      - ${campaignsData.length} campaigns`)

  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await client.close()
    console.log('Database connection closed')
  }
}

seedDatabase()

import { getDatabase } from "./mongodb"
import type { InventoryItem, Supplier, PurchaseOrder } from "./models/inventory"
import type { Customer, Lead, Campaign, Shipment, Deal, Analytics, Task, Notification } from "./models/types"
import { ObjectId } from "mongodb"

// Inventory Operations
export async function getInventoryItems(
  filters: {
    category?: string
    status?: string
    location?: string
    supplier?: string
    search?: string
  } = {},
) {
  const db = await getDatabase()
  const collection = db.collection<InventoryItem>("inventory")

  const query: any = {}

  if (filters.category && filters.category !== "all") {
    query.category = new RegExp(filters.category, "i")
  }

  if (filters.status && filters.status !== "all") {
    query.status = filters.status.replace("-", " ")
  }

  if (filters.location && filters.location !== "all") {
    query.location = new RegExp(filters.location, "i")
  }

  if (filters.supplier && filters.supplier !== "all") {
    query.supplier = new RegExp(filters.supplier, "i")
  }

  if (filters.search) {
    query.$or = [
      { name: new RegExp(filters.search, "i") },
      { sku: new RegExp(filters.search, "i") },
      { supplier: new RegExp(filters.search, "i") },
    ]
  }

  return await collection.find(query).toArray()
}

export async function createInventoryItem(item: Omit<InventoryItem, "_id" | "createdAt" | "updatedAt">) {
  const db = await getDatabase()
  const collection = db.collection<InventoryItem>("inventory")

  const newItem = {
    ...item,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const result = await collection.insertOne(newItem)
  return { ...newItem, _id: result.insertedId.toString() }
}

export async function updateInventoryItem(id: string, updates: Partial<InventoryItem>) {
  const db = await getDatabase()
  const collection = db.collection<InventoryItem>("inventory")

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...updates,
        updatedAt: new Date().toISOString(),
      },
    },
  )

  return result.modifiedCount > 0
}

export async function deleteInventoryItem(id: string) {
  const db = await getDatabase()
  const collection = db.collection<InventoryItem>("inventory")

  const result = await collection.deleteOne({ _id: new ObjectId(id) })
  return result.deletedCount > 0
}

// Supplier Operations
export async function getSuppliers(
  filters: {
    status?: string
    category?: string
    search?: string
  } = {},
) {
  const db = await getDatabase()
  const collection = db.collection<Supplier>("suppliers")

  const query: any = {}

  if (filters.status && filters.status !== "all") {
    query.status = filters.status
  }

  if (filters.category && filters.category !== "all") {
    query.category = new RegExp(filters.category, "i")
  }

  if (filters.search) {
    query.$or = [
      { name: new RegExp(filters.search, "i") },
      { contactPerson: new RegExp(filters.search, "i") },
      { email: new RegExp(filters.search, "i") },
    ]
  }

  return await collection.find(query).toArray()
}

import { hashPassword } from "@/lib/auth";

export async function createSupplier(supplier: Omit<Supplier, "_id" | "createdAt" | "updatedAt">) {
  const db = await getDatabase();
  const suppliersCollection = db.collection<Supplier>("suppliers");
  const usersCollection = db.collection("users");

  const session = db.client.startSession();

  try {
    session.startTransaction();

    const newSupplier = {
      ...supplier,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const supplierResult = await suppliersCollection.insertOne(newSupplier, { session });
    const supplierId = supplierResult.insertedId;

    const hashedPassword = await hashPassword(supplier.password);

    const newUser = {
      email: supplier.email,
      password: hashedPassword,
      name: supplier.contactPerson,
      role: "supplier",
      supplierId: supplierId.toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await usersCollection.insertOne(newUser, { session });

    await session.commitTransaction();

    return { ...newSupplier, _id: supplierId.toString() };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}

export async function updateSupplier(id: string, updates: Partial<Supplier>) {
  const db = await getDatabase()
  const collection = db.collection<Supplier>("suppliers")

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...updates,
        updatedAt: new Date().toISOString(),
      },
    },
  )

  return result.modifiedCount > 0
}

// Purchase Order Operations
export async function getPurchaseOrders(
  filters: {
    status?: string
    supplier?: string
    assignedTo?: string
  } = {},
) {
  const db = await getDatabase()
  const collection = db.collection<PurchaseOrder>("purchaseOrders")

  const query: any = {}

  if (filters.status && filters.status !== "all") {
    query.status = filters.status
  }

  if (filters.supplier && filters.supplier !== "all") {
    query.supplier = new RegExp(filters.supplier, "i")
  }

  if (filters.assignedTo && filters.assignedTo !== "all") {
    query.assignedTo = new RegExp(filters.assignedTo, "i")
  }

  return await collection.find(query).sort({ createdAt: -1 }).toArray()
}

export async function createPurchaseOrder(order: Omit<PurchaseOrder, "_id" | "createdAt" | "updatedAt">) {
  const db = await getDatabase()
  const collection = db.collection<PurchaseOrder>("purchaseOrders")

  const newOrder = {
    ...order,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const result = await collection.insertOne(newOrder)
  return { ...newOrder, _id: result.insertedId.toString() }
}

export async function updatePurchaseOrderStatus(id: string, status: PurchaseOrder["status"]) {
  const db = await getDatabase()
  const collection = db.collection<PurchaseOrder>("purchaseOrders")

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        status,
        updatedAt: new Date().toISOString(),
        ...(status === "Delivered" ? { actualDelivery: new Date().toISOString().split("T")[0] } : {}),
      },
    },
  )

  return result.modifiedCount > 0
}

// Customer Operations
export async function getCustomers(
  filters: {
    status?: string
    industry?: string
    companySize?: string
    assignedTo?: string
    search?: string
  } = {},
) {
  const db = await getDatabase()
  const collection = db.collection<Customer>("customers")

  const query: any = {}

  if (filters.status && filters.status !== "all") {
    query.status = filters.status
  }

  if (filters.industry && filters.industry !== "all") {
    query.industry = new RegExp(filters.industry, "i")
  }

  if (filters.companySize && filters.companySize !== "all") {
    query.companySize = filters.companySize
  }

  if (filters.assignedTo && filters.assignedTo !== "all") {
    query.assignedTo = new RegExp(filters.assignedTo, "i")
  }

  if (filters.search) {
    query.$or = [
      { name: new RegExp(filters.search, "i") },
      { contactPerson: new RegExp(filters.search, "i") },
      { email: new RegExp(filters.search, "i") },
    ]
  }

  return await collection.find(query).sort({ createdAt: -1 }).toArray()
}

export async function createCustomer(customer: Omit<Customer, "_id" | "createdAt" | "updatedAt">) {
  const db = await getDatabase()
  const collection = db.collection<Customer>("customers")

  const newCustomer = {
    ...customer,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const result = await collection.insertOne(newCustomer)
  return { ...newCustomer, _id: result.insertedId.toString() }
}

export async function updateCustomer(id: string, updates: Partial<Customer>) {
  const db = await getDatabase()
  const collection = db.collection<Customer>("customers")

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...updates,
        updatedAt: new Date().toISOString(),
      },
    },
  )

  return result.modifiedCount > 0
}

export async function deleteCustomer(id: string) {
  const db = await getDatabase()
  const collection = db.collection<Customer>("customers")

  const result = await collection.deleteOne({ _id: new ObjectId(id) })
  return result.deletedCount > 0
}

// Lead Operations
export async function getLeads(
  filters: {
    status?: string
    priority?: string
    source?: string
    assignedTo?: string
    search?: string
  } = {},
) {
  const db = await getDatabase()
  const collection = db.collection<Lead>("leads")

  const query: any = {}

  if (filters.status && filters.status !== "all") {
    query.status = filters.status
  }

  if (filters.priority && filters.priority !== "all") {
    query.priority = filters.priority
  }

  if (filters.source && filters.source !== "all") {
    query.source = filters.source
  }

  if (filters.assignedTo && filters.assignedTo !== "all") {
    query.assignedTo = new RegExp(filters.assignedTo, "i")
  }

  if (filters.search) {
    query.$or = [
      { name: new RegExp(filters.search, "i") },
      { company: new RegExp(filters.search, "i") },
      { email: new RegExp(filters.search, "i") },
    ]
  }

  return await collection.find(query).sort({ createdAt: -1 }).toArray()
}

export async function createLead(lead: Omit<Lead, "_id" | "createdAt" | "updatedAt">) {
  const db = await getDatabase()
  const collection = db.collection<Lead>("leads")

  const newLead = {
    ...lead,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const result = await collection.insertOne(newLead)
  return { ...newLead, _id: result.insertedId.toString() }
}

export async function updateLead(id: string, updates: Partial<Lead>) {
  const db = await getDatabase()
  const collection = db.collection<Lead>("leads")

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...updates,
        updatedAt: new Date().toISOString(),
      },
    },
  )

  return result.modifiedCount > 0
}

// Campaign Operations
export async function getCampaigns(
  filters: {
    status?: string
    type?: string
    search?: string
  } = {},
) {
  const db = await getDatabase()
  const collection = db.collection<Campaign>("campaigns")

  const query: any = {}

  if (filters.status && filters.status !== "all") {
    query.status = filters.status
  }

  if (filters.type && filters.type !== "all") {
    query.type = filters.type
  }

  if (filters.search) {
    query.$or = [
      { name: new RegExp(filters.search, "i") },
      { description: new RegExp(filters.search, "i") },
    ]
  }

  return await collection.find(query).sort({ createdAt: -1 }).toArray()
}

export async function createCampaign(campaign: Omit<Campaign, "_id" | "createdAt" | "updatedAt">) {
  const db = await getDatabase()
  const collection = db.collection<Campaign>("campaigns")

  const newCampaign = {
    ...campaign,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const result = await collection.insertOne(newCampaign)
  return { ...newCampaign, _id: result.insertedId.toString() }
}

export async function updateCampaign(id: string, updates: Partial<Campaign>) {
  const db = await getDatabase()
  const collection = db.collection<Campaign>("campaigns")

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...updates,
        updatedAt: new Date().toISOString(),
      },
    },
  )

  return result.modifiedCount > 0
}

// Shipment Operations
export async function getShipments(
  filters: {
    status?: string
    carrier?: string
    priority?: string
    search?: string
  } = {},
) {
  const db = await getDatabase()
  const collection = db.collection<Shipment>("shipments")

  const query: any = {}

  if (filters.status && filters.status !== "all") {
    query.status = filters.status
  }

  if (filters.carrier && filters.carrier !== "all") {
    query.carrier = new RegExp(filters.carrier, "i")
  }

  if (filters.priority && filters.priority !== "all") {
    query.priority = filters.priority
  }

  if (filters.search) {
    query.$or = [
      { trackingNumber: new RegExp(filters.search, "i") },
      { origin: new RegExp(filters.search, "i") },
      { destination: new RegExp(filters.search, "i") },
    ]
  }

  return await collection.find(query).sort({ createdAt: -1 }).toArray()
}

export async function createShipment(shipment: Omit<Shipment, "_id" | "createdAt" | "updatedAt">) {
  const db = await getDatabase()
  const collection = db.collection<Shipment>("shipments")

  const newShipment = {
    ...shipment,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const result = await collection.insertOne(newShipment)
  return { ...newShipment, _id: result.insertedId.toString() }
}

export async function updateShipmentStatus(id: string, status: Shipment["status"], location?: string, notes?: string) {
  const db = await getDatabase()
  const collection = db.collection<Shipment>("shipments")

  const update = {
    status,
    updatedAt: new Date().toISOString(),
    ...(status === "Delivered" ? { actualDelivery: new Date().toISOString().split("T")[0] } : {}),
  }

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: update,
      $push: {
        updates: {
          timestamp: new Date().toISOString(),
          status,
          location: location || "",
          notes: notes || "",
        },
      },
    },
  )

  return result.modifiedCount > 0
}

// Deal Operations
export async function getDeals(
  filters: {
    stage?: string
    assignedTo?: string
    customer?: string
    search?: string
  } = {},
) {
  const db = await getDatabase()
  const collection = db.collection<Deal>("deals")

  const query: any = {}

  if (filters.stage && filters.stage !== "all") {
    query.stage = filters.stage
  }

  if (filters.assignedTo && filters.assignedTo !== "all") {
    query.assignedTo = new RegExp(filters.assignedTo, "i")
  }

  if (filters.customer && filters.customer !== "all") {
    query.customer = new RegExp(filters.customer, "i")
  }

  if (filters.search) {
    query.$or = [
      { title: new RegExp(filters.search, "i") },
      { customer: new RegExp(filters.search, "i") },
      { description: new RegExp(filters.search, "i") },
    ]
  }

  return await collection.find(query).sort({ createdAt: -1 }).toArray()
}

export async function createDeal(deal: Omit<Deal, "_id" | "createdAt" | "updatedAt">) {
  const db = await getDatabase()
  const collection = db.collection<Deal>("deals")

  const newDeal = {
    ...deal,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const result = await collection.insertOne(newDeal)
  return { ...newDeal, _id: result.insertedId.toString() }
}

export async function updateDeal(id: string, updates: Partial<Deal>) {
  const db = await getDatabase()
  const collection = db.collection<Deal>("deals")

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...updates,
        updatedAt: new Date().toISOString(),
      },
    },
  )

  return result.modifiedCount > 0
}

// Analytics Operations
export async function getAnalytics(
  filters: {
    type?: string
    period?: string
    dateRange?: { start: string; end: string }
  } = {},
) {
  const db = await getDatabase()
  const collection = db.collection<Analytics>("analytics")

  const query: any = {}

  if (filters.type && filters.type !== "all") {
    query.type = filters.type
  }

  if (filters.period && filters.period !== "all") {
    query.period = filters.period
  }

  if (filters.dateRange) {
    query.date = {
      $gte: filters.dateRange.start,
      $lte: filters.dateRange.end,
    }
  }

  return await collection.find(query).sort({ date: -1 }).toArray()
}

export async function createAnalyticsEntry(analytics: Omit<Analytics, "_id" | "createdAt">) {
  const db = await getDatabase()
  const collection = db.collection<Analytics>("analytics")

  const newAnalytics = {
    ...analytics,
    createdAt: new Date().toISOString(),
  }

  const result = await collection.insertOne(newAnalytics)
  return { ...newAnalytics, _id: result.insertedId.toString() }
}

// Task Operations
export async function getTasks(
  filters: {
    status?: string
    priority?: string
    assignedTo?: string
    search?: string
  } = {},
) {
  const db = await getDatabase()
  const collection = db.collection<Task>("tasks")

  const query: any = {}

  if (filters.status && filters.status !== "all") {
    query.status = filters.status
  }

  if (filters.priority && filters.priority !== "all") {
    query.priority = filters.priority
  }

  if (filters.assignedTo && filters.assignedTo !== "all") {
    query.assignedTo = new RegExp(filters.assignedTo, "i")
  }

  if (filters.search) {
    query.$or = [
      { title: new RegExp(filters.search, "i") },
      { description: new RegExp(filters.search, "i") },
    ]
  }

  return await collection.find(query).sort({ dueDate: 1 }).toArray()
}

export async function createTask(task: Omit<Task, "_id" | "createdAt" | "updatedAt">) {
  const db = await getDatabase()
  const collection = db.collection<Task>("tasks")

  const newTask = {
    ...task,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const result = await collection.insertOne(newTask)
  return { ...newTask, _id: result.insertedId.toString() }
}

export async function updateTask(id: string, updates: Partial<Task>) {
  const db = await getDatabase()
  const collection = db.collection<Task>("tasks")

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...updates,
        updatedAt: new Date().toISOString(),
        ...(updates.status === "Completed" ? { completedDate: new Date().toISOString() } : {}),
      },
    },
  )

  return result.modifiedCount > 0
}

import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { getDatabase } from "./mongodb"

const JWT_SECRET = process.env.JWT_SECRET || "supplybobsupplychain"

export interface User {
  _id?: string
  name: string
  email: string
  password: string
  role: 'manager' | 'supplier'
  companyName?: string
  supplierId?: string
  createdAt: Date
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" })
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string }
  } catch {
    return null
  }
}

export async function createUser(
  name: string,
  email: string,
  password: string,
  role: 'manager' | 'supplier',
  companyName?: string,
  supplierId?: string
) {
  const db = await getDatabase()
  const hashedPassword = await hashPassword(password)

  const user = {
    name,
    email: email.toLowerCase().trim(),
    password: hashedPassword,
    role,
    companyName,
    supplierId,
    createdAt: new Date(),
  }

  const result = await db.collection("users").insertOne(user)
  return { ...user, _id: result.insertedId }
}

export async function findUserByEmail(email: string) {
  const normalizedEmail = email.toLowerCase().trim()
  const db = await getDatabase()
  return db.collection("users").findOne({ email: normalizedEmail })
}

export async function findUserById(id: string) {
  const db = await getDatabase()
  const { ObjectId } = require("mongodb")
  return db.collection("users").findOne({ _id: new ObjectId(id) })
}

export async function checkSupplierStatus(supplierId: string): Promise<string | null> {
  if (!supplierId) return null
  
  const db = await getDatabase()
  const { ObjectId } = require("mongodb")
  
  // Check if supplierId is a valid ObjectId format
  if (!ObjectId.isValid(supplierId)) {
    // If it's not a valid ObjectId, try to find by supplierId field instead
    const supplier = await db.collection("suppliers").findOne({ supplierId: supplierId })
    return supplier?.status || null
  }
  
  // If it's a valid ObjectId, search by _id
  const supplier = await db.collection("suppliers").findOne({ _id: new ObjectId(supplierId) })
  return supplier?.status || null
}

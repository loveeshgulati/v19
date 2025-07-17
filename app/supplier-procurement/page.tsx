"use client"

import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PurchaseOrderList } from "@/components/purchase-order-list";
import { useAuth } from "@/contexts/AuthContext";
import { ShoppingCart } from "lucide-react";

export default function SupplierProcurementPage() {
  const { user } = useAuth();
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { 'Content-Type': 'application/json' };
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const supplierName = user?.name || user?.email;
        const response = await fetch(`/api/purchase-orders?supplier=${encodeURIComponent(supplierName)}`, { headers });
        const data = await response.json();
        setPurchaseOrders(data);
      } catch (error) {
        console.error('Error fetching purchase orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-gray-500">Loading purchase orders...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Purchase Orders</h1>
          <p className="text-gray-600">Manage your purchase orders effectively</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Purchase Order Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PurchaseOrderList purchaseOrders={purchaseOrders} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

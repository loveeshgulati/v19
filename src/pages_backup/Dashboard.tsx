export function Dashboard() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">SplyBob Dashboard</h1>
        <p className="text-gray-600">Welcome to your supply chain management system</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-blue-600 text-xl">📦</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Inventory Value</p>
              <p className="text-2xl font-bold text-gray-900">₹2.4M</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-green-600 text-xl">💰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Monthly Procurement</p>
              <p className="text-2xl font-bold text-gray-900">₹485K</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-purple-600 text-xl">📈</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">On-Time Delivery</p>
              <p className="text-2xl font-bold text-gray-900">94.2%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <span className="text-orange-600 text-xl">⏱️</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Average Lead Time</p>
              <p className="text-2xl font-bold text-gray-900">7.5 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="space-y-4 mb-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <span className="text-red-600 text-xl mr-3">⚠️</span>
            <div>
              <h3 className="text-red-800 font-medium">Low Stock Alert</h3>
              <p className="text-red-700 text-sm">
                15 items are below minimum stock levels. Immediate restocking required.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex">
            <span className="text-amber-600 text-xl mr-3">🚚</span>
            <div>
              <h3 className="text-amber-800 font-medium">Delayed Shipments</h3>
              <p className="text-amber-700 text-sm">3 critical shipments are delayed. Estimated delay: 2-3 days.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {[
              { id: "PO-2024-001", supplier: "Sharma Industries", amount: "₹25,000", status: "Delivered" },
              { id: "PO-2024-002", supplier: "Gupta Components", amount: "₹18,500", status: "In Transit" },
              { id: "PO-2024-003", supplier: "Patel Materials", amount: "₹12,000", status: "Processing" },
            ].map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-gray-600">{order.supplier}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{order.amount}</p>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "In Transit"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Supplier Performance</h2>
          <div className="space-y-4">
            {[
              { name: "Sharma Industries", score: 94, orders: 45 },
              { name: "Gupta Components", score: 89, orders: 32 },
              { name: "Patel Materials", score: 87, orders: 28 },
            ].map((supplier) => (
              <div key={supplier.name} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{supplier.name}</span>
                  <span className="text-sm text-gray-600">{supplier.score}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${supplier.score}%` }}></div>
                </div>
                <p className="text-xs text-gray-500">{supplier.orders} orders</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

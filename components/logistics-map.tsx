"use client"
import { MapPin, Truck, Package } from "lucide-react"

// Mock logistics data for visualization
const locations = [
  { id: 1, name: "Warehouse A", type: "warehouse", x: 20, y: 30, status: "active" },
  { id: 2, name: "Warehouse B", type: "warehouse", x: 60, y: 25, status: "active" },
  { id: 3, name: "Warehouse C", type: "warehouse", x: 80, y: 60, status: "active" },
  { id: 4, name: "Supplier 1", type: "supplier", x: 15, y: 70, status: "active" },
  { id: 5, name: "Supplier 2", type: "supplier", x: 45, y: 80, status: "active" },
  { id: 6, name: "Distribution Center", type: "distribution", x: 50, y: 45, status: "active" },
]

const routes = [
  { from: 4, to: 1, status: "active", vehicle: "truck" },
  { from: 5, to: 2, status: "active", vehicle: "truck" },
  { from: 1, to: 6, status: "completed", vehicle: "truck" },
  { from: 2, to: 3, status: "delayed", vehicle: "truck" },
]

export function LogisticsMap() {
  return (
    <div className="relative w-full h-96 bg-gray-50 rounded-lg overflow-hidden">
      {/* SVG for routes */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        {routes.map((route, index) => {
          const fromLocation = locations.find((l) => l.id === route.from)
          const toLocation = locations.find((l) => l.id === route.to)
          if (!fromLocation || !toLocation) return null

          return (
            <line
              key={index}
              x1={`${fromLocation.x}%`}
              y1={`${fromLocation.y}%`}
              x2={`${toLocation.x}%`}
              y2={`${toLocation.y}%`}
              stroke={route.status === "active" ? "#3b82f6" : route.status === "completed" ? "#22c55e" : "#ef4444"}
              strokeWidth="2"
              strokeDasharray={route.status === "active" ? "5,5" : "none"}
            />
          )
        })}
      </svg>

      {/* Location markers */}
      {locations.map((location) => (
        <div
          key={location.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${location.x}%`,
            top: `${location.y}%`,
            zIndex: 2,
          }}
        >
          <div
            className={`
            p-2 rounded-full shadow-lg
            ${
              location.type === "warehouse"
                ? "bg-blue-500"
                : location.type === "supplier"
                  ? "bg-green-500"
                  : "bg-purple-500"
            }
          `}
          >
            {location.type === "warehouse" ? (
              <Package className="h-4 w-4 text-white" />
            ) : location.type === "supplier" ? (
              <Truck className="h-4 w-4 text-white" />
            ) : (
              <MapPin className="h-4 w-4 text-white" />
            )}
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1">
            <div className="bg-white px-2 py-1 rounded shadow text-xs font-medium whitespace-nowrap">
              {location.name}
            </div>
          </div>
        </div>
      ))}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg" style={{ zIndex: 3 }}>
        <div className="text-sm font-medium mb-2">Legend</div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Warehouse</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Supplier</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span>Distribution Center</span>
          </div>
        </div>
      </div>

      {/* Status indicators */}
      <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg" style={{ zIndex: 3 }}>
        <div className="text-sm font-medium mb-2">Route Status</div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-0.5 bg-blue-500"></div>
            <span>Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-0.5 bg-green-500"></div>
            <span>Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-0.5 bg-red-500"></div>
            <span>Delayed</span>
          </div>
        </div>
      </div>
    </div>
  )
}

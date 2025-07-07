import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Download } from "lucide-react"

export function InventoryFilters() {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search inventory items..." className="pl-10" />
      </div>

      <Select>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="electronics">Electronics</SelectItem>
          <SelectItem value="components">Components</SelectItem>
          <SelectItem value="materials">Materials</SelectItem>
          <SelectItem value="fasteners">Fasteners</SelectItem>
          <SelectItem value="packaging">Packaging</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="in-stock">In Stock</SelectItem>
          <SelectItem value="low-stock">Low Stock</SelectItem>
          <SelectItem value="out-of-stock">Out of Stock</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Locations</SelectItem>
          <SelectItem value="warehouse-a">Warehouse A</SelectItem>
          <SelectItem value="warehouse-b">Warehouse B</SelectItem>
          <SelectItem value="warehouse-c">Warehouse C</SelectItem>
          <SelectItem value="warehouse-d">Warehouse D</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline">
        <Filter className="mr-2 h-4 w-4" />
        More Filters
      </Button>

      <Button variant="outline">
        <Download className="mr-2 h-4 w-4" />
        Export
      </Button>
    </div>
  )
}

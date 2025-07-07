import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Calendar } from "lucide-react"

export function ProcurementFilters() {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search purchase orders..." className="pl-10" />
      </div>

      <Select>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="draft">Draft</SelectItem>
          <SelectItem value="pending">Pending Approval</SelectItem>
          <SelectItem value="processing">Processing</SelectItem>
          <SelectItem value="in-transit">In Transit</SelectItem>
          <SelectItem value="delivered">Delivered</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Supplier" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Suppliers</SelectItem>
          <SelectItem value="techcorp">TechCorp Industries</SelectItem>
          <SelectItem value="global">Global Components</SelectItem>
          <SelectItem value="reliable">Reliable Materials</SelectItem>
          <SelectItem value="quick">Quick Supply Co</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline">
        <Calendar className="mr-2 h-4 w-4" />
        Date Range
      </Button>

      <Button variant="outline">
        <Filter className="mr-2 h-4 w-4" />
        Advanced Filters
      </Button>
    </div>
  )
}

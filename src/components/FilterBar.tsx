import { Button } from "@/components/ui/button"
import type { ProjectStatus } from "@/data/mockProjects"
import { cn } from "@/lib/utils"

interface FilterBarProps {
  activeFilter: ProjectStatus | "All"
  onFilterChange: (filter: ProjectStatus | "All") => void
}

const statusFilters: (ProjectStatus | "All")[] = [
  "All",
  "Draft",
  "In Progress",
  "Ready for Review",
  "Final",
  "Archived",
]

export function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-4 px-4 scrollbar-hide md:mx-0 md:px-0">
      {statusFilters.map((filter) => (
        <Button
          key={filter}
          variant={activeFilter === filter ? "default" : "outline"}
          onClick={() => onFilterChange(filter)}
          className={cn(
            "whitespace-nowrap transition-all duration-200 min-h-[44px] px-4 rounded-full",
            activeFilter === filter
              ? "bg-primary text-primary-foreground dark:bg-[#34c759] dark:text-white"
              : "bg-card text-card-foreground border-border"
          )}
          aria-pressed={activeFilter === filter}
          aria-label={`Filter by ${filter}`}
        >
          {filter}
        </Button>
      ))}
    </div>
  )
}


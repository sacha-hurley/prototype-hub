import { useState } from "react"
import { ChevronDown, Copy, Folder, Code, Rocket, Sparkles, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { Project, ProjectStatus } from "@/data/mockProjects"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  project: Project
  onStatusChange: (projectId: string, newStatus: ProjectStatus) => void
}

// Map each project to a unique icon
const projectIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "1": Code,      // lsa-card-flow
  "2": Rocket,    // challenge-social-feed
  "3": Sparkles,  // onboarding-gamification
}

// Map each project to a light Tailwind color background with darker matching icon
const projectColors: Record<string, { bg: string; iconColor: string }> = {
  "1": { bg: "bg-blue-100", iconColor: "text-blue-500" },      // lsa-card-flow - light blue with darker blue icon
  "2": { bg: "bg-purple-100", iconColor: "text-purple-500" },    // challenge-social-feed - light purple with darker purple icon
  "3": { bg: "bg-yellow-100", iconColor: "text-yellow-500" },  // onboarding-gamification - light yellow with darker yellow icon
}

const statusColors: Record<ProjectStatus, string> = {
  Draft: "bg-[var(--status-draft)] text-[var(--status-draft-foreground)]",
  "In Progress": "bg-[var(--status-in-progress)] text-[var(--status-in-progress-foreground)]",
  "Ready for Review": "bg-[var(--status-ready-for-review)] text-[var(--status-ready-for-review-foreground)]",
  Final: "bg-[var(--status-final)] text-[var(--status-final-foreground)]",
  Archived: "bg-[var(--status-archived)] text-[var(--status-archived-foreground)]",
}

const allStatuses: ProjectStatus[] = [
  "Draft",
  "In Progress",
  "Ready for Review",
  "Final",
  "Archived",
]

function truncateNotes(notes: string, maxLength: number = 120): string {
  if (notes.length <= maxLength) return notes
  return notes.slice(0, maxLength) + "..."
}

export function ProjectCard({ project, onStatusChange }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const IconComponent = projectIcons[project.id] || Folder
  const colorConfig = projectColors[project.id] || { bg: "bg-neutral-500", iconColor: "text-white" }

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't expand if clicking on status badge or duplicate icon
    const target = e.target as HTMLElement
    if (
      target.closest('[data-status-badge]') ||
      target.closest('[data-duplicate-icon]') ||
      target.closest('[data-open-button]')
    ) {
      return
    }
    setIsExpanded(!isExpanded)
  }

  const handleStatusSelect = (newStatus: ProjectStatus) => {
    onStatusChange(project.id, newStatus)
  }

  return (
    <Card
      className="cursor-pointer transition-all duration-200 dark:hover:shadow-md overflow-hidden"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          setIsExpanded(!isExpanded)
        }
      }}
      aria-expanded={isExpanded}
      aria-label={`${project.title} project card, ${project.status} status`}
    >
      <div className="flex flex-col md:flex-row md:items-start">
        {/* Placeholder rectangle */}
        <div className={`w-[calc(100%-2rem)] md:w-[84px] md:flex-shrink-0 h-[84px] md:h-16 ${colorConfig.bg} rounded-[16px] mx-4 mt-4 md:ml-4 md:mr-0 md:mt-4 flex items-center justify-center`}>
          <IconComponent className={`h-6 w-6 ${colorConfig.iconColor}`} />
        </div>
        
        <div className="flex-1 min-w-0">
      <CardHeader className="pb-4 pl-4 pr-4 pt-2 md:pl-4 md:pr-6 md:pt-4 md:pb-4 space-y-0">
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="flex-1 min-w-0 flex flex-col items-start gap-1">
            <h3 className="text-lg font-semibold text-card-foreground">
              {project.title}
            </h3>
            <div className="flex flex-row flex-wrap items-center gap-2 sm:gap-3 text-sm">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Badge
                    data-status-badge
                    className={cn(
                      "cursor-pointer min-h-[28px]",
                      statusColors[project.status]
                    )}
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Change status from ${project.status}`}
                  >
                    {project.status}
                  </Badge>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  onClick={(e) => e.stopPropagation()}
                  className="min-w-[180px]"
                >
                  {allStatuses.map((status) => (
                    <DropdownMenuItem
                      key={status}
                      onClick={() => handleStatusSelect(status)}
                      className="cursor-pointer min-h-[44px]"
                    >
                      {status}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <span className="text-muted-foreground">
                {project.lastUpdated}
              </span>
              <span className="text-muted-foreground hidden sm:inline">
                {project.creator}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    data-open-button
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors min-h-[44px] flex items-center justify-center gap-1.5 text-sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Handle open action here
                    }}
                    aria-label="Open in new tab"
                  >
                    <span>Open</span>
                    <ExternalLink className="h-5 w-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="hidden md:block">
                  <p>Open in new tab</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    data-duplicate-icon
                    className="p-2 text-muted-foreground cursor-not-allowed min-w-[44px] min-h-[44px] flex items-center justify-center"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Duplicate function disabled"
                  >
                    <Copy className="h-5 w-5" />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="hidden md:block">
                  <p>Duplicate function disabled for now</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div
              className="min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-hidden="true"
            >
              <ChevronDown
                className={cn(
                  "h-6 w-6 text-muted-foreground transition-transform duration-200 flex-shrink-0",
                  isExpanded && "transform rotate-180"
                )}
              />
            </div>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0 pb-4 px-4 sm:px-6">
          <div className="pt-3 border-t border-border">
            <p className="text-sm text-muted-foreground">
              {truncateNotes(project.notes)}
            </p>
            <p className="text-sm text-muted-foreground mt-2 sm:hidden">
              Creator: {project.creator}
            </p>
          </div>
        </CardContent>
      )}
        </div>
      </div>
    </Card>
  )
}


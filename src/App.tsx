import { useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/Header"
import { FilterBar } from "@/components/FilterBar"
import { ProjectCard } from "@/components/ProjectCard"
import { mockProjects } from "@/data/mockProjects"
import type { Project, ProjectStatus } from "@/data/mockProjects"

function App() {
  const [filter, setFilter] = useState<ProjectStatus | "All">("All")
  const [projects, setProjects] = useState<Project[]>(mockProjects)

  const handleFilterChange = (newFilter: ProjectStatus | "All") => {
    setFilter(newFilter)
  }

  const handleStatusChange = (projectId: string, newStatus: ProjectStatus) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId ? { ...project, status: newStatus } : project
      )
    )
  }

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.status === filter)

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      <div className="min-h-screen bg-background transition-colors duration-200">
        <Header />
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="mb-4">
            <FilterBar activeFilter={filter} onFilterChange={handleFilterChange} />
          </div>
          
          <div className="space-y-4">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No projects found with status "{filter}"
              </div>
            ) : (
              filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onStatusChange={handleStatusChange}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App

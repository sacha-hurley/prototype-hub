export type ProjectStatus = 
  | "Draft" 
  | "In Progress" 
  | "Ready for Review" 
  | "Final" 
  | "Archived";

export interface Project {
  id: string;
  title: string;
  status: ProjectStatus;
  creator: string;
  lastUpdated: string;
  notes: string;
}

export const mockProjects: Project[] = [
  {
    id: "1",
    title: "lsa-card-flow",
    status: "In Progress",
    creator: "Sacha",
    lastUpdated: "4 hours ago",
    notes: "Added LSA card selection modal with benefits breakdown",
  },
  {
    id: "2",
    title: "challenge-social-feed",
    status: "Ready for Review",
    creator: "Sacha",
    lastUpdated: "2 days ago",
    notes: "Implemented social challenge feed with real-time updates and friend activity",
  },
  {
    id: "3",
    title: "onboarding-gamification",
    status: "Draft",
    creator: "Sacha",
    lastUpdated: "1 week ago",
    notes: "Initial draft of gamified onboarding flow with BetterFlies earning tutorials",
  },
];


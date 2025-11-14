# **PRD: Betterfly US Prototypes Hub**

## **Overview**

An internal prototype management hub that displays all active prototype branches from connected GitHub repositories. The interface provides at-a-glance status visibility and basic project metadata for the team.

## **Core Requirements**

### **Header**

- **Title:** "Prototype Hub"

- **Subtitle:** "US Betterfly Prototypes"

- **Theme Toggle:** Light/Dark mode switch button positioned in top-right of header

  - Small, icon-based button (sun/moon icon)

  - Toggles between light and dark themes

  - Persists preference in localStorage

- Clean, professional typography using Shadcn defaults

### **Project Cards**

Each prototype displays as an expandable card containing:

**Collapsed State (Default):**

- **Title:** Branch/repo name (e.g., "lsa-card-flow")

- **Status Pill:** Visual indicator (see status system below)

- **Last Updated:** Relative timestamp (e.g., "2 hours ago", "3 days ago")

- **Creator:** Username/name of person who created the branch

- **Duplicate Icon:** Copy/duplicate icon (disabled state, see below)

- **Quick Actions:** Expand icon/button

**Expanded State:**

- All collapsed state info remains visible

- **Commit Notes:** Most recent GitHub commit message (truncated to ~120 characters with "..." if longer)

- **Collapse:** Button/icon to minimize

**Duplicate Function (Upcoming Feature):**

- Display duplicate/copy icon on each card (in disabled/muted state)

- Desktop: Hovering shows tooltip "Duplicate function disabled for now"

- Mobile: Icon visible but non-interactive

- Use muted color (e.g., `text-gray-400`) to indicate disabled state

- Position near top-right of card alongside other card actions

### **Status System**

Five status categories with pill indicators (Tailwind colors):

1. **Draft** - Gray (`bg-gray-100 text-gray-700`)

2. **In Progress** - Blue (`bg-blue-100 text-blue-700`)

3. **Ready for Review** - Yellow (`bg-yellow-100 text-yellow-700`)

4. **Final** - Green (`bg-green-100 text-green-700`)

5. **Archived** - Slate (`bg-slate-100 text-slate-500`)

**Status Modification:**

- Status pills are clickable/editable

- Clicking opens a dropdown menu with all five status options

- Selecting new status updates immediately (UI only for prototype, API connection handled separately)

### **Filtering**

- Filter buttons/tabs above card list showing all five statuses

- Clicking a status filter shows only cards with that status

- "All" option to clear filters and show everything

### **Theme System**

- Light and dark mode support throughout the application

- All components adapt to current theme

- Theme preference persists across sessions

- Smooth transition between themes

### **Responsive Behavior**

**Desktop (≥768px):**

- Cards display in a single column with comfortable spacing

- Full information visible in collapsed state

- Generous padding and readable typography

- Tooltip interactions enabled for disabled features

**Mobile (<768px):**

- Compact card design with tighter spacing

- Key info prioritized (title, status, timestamp)

- Creator name may shift to expanded state for space

- Touch-friendly expand/collapse targets

- No tooltip interactions (disabled icons simply non-interactive)

## **Technical Stack**

- **Component Library:** Shadcn/ui

- **Styling:** Tailwind CSS (using Tailwind color system)

- **Theme Management:** next-themes for dark mode support

- **Framework Context:** Vanilla Framework conventions where applicable

- **State Management:** React useState for expansion/filter states (prototype level)

## **Initial Data (3 Example Projects)**

1. **lsa-card-flow**

   - Status: In Progress

   - Creator: Sacha

   - Last Updated: 4 hours ago

   - Notes: "Added LSA card selection modal with benefits breakdown"

2. **challenge-social-feed**

   - Status: Ready for Review

   - Creator: Sacha

   - Last Updated: 2 days ago

   - Notes: "Implemented social challenge feed with real-time updates and friend activity"

3. **onboarding-gamification**

   - Status: Draft

   - Creator: Sacha

   - Last Updated: 1 week ago

   - Notes: "Initial draft of gamified onboarding flow with BetterFlies earning tutorials"

## **Future Considerations (Not in Scope)**

- Automated status detection via CI/CD

- GitHub API integration for live updates

- Multi-repository support

- Advanced sorting options

- Deployment status indicators

- **Duplicate branch functionality** (UI placeholder implemented, functionality pending)


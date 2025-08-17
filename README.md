# Build a Complete Cash Flow Tracker React App with Docker

Please create a complete React application for a personal cash flow tracker with the following requirements:

## Project Setup
- Create a new React app called `cash-flow-tracker`
- Use modern React with hooks (React 18+)
- Include Tailwind CSS for styling
- Add lucide-react for icons
- Set up Docker containerization with nginx for production deployment

## Core Functionality
Create a mobile-responsive cash flow tracker with these features:

### Budget Configuration (hardcoded for €1,750 monthly income)
- Fixed expenses: Rent+Internet (€308), Gas+Power (€50), Phone (€25), Insurance (€60)
- Variable expenses: Groceries (€300), Transportation (€80), Entertainment (€150), Dining out (€100), Personal care (€22)
- Savings targets: Emergency fund (€150), Long-term savings (€100), Investments (€100)

### User Interface Features
1. **Mobile-first responsive design** with tabbed interface (Overview, Fixed, Variable, Savings)
2. **Quick stats cards** showing income, expenses, savings, and savings rate
3. **Privacy toggle** to hide/show amounts
4. **Progress bars** for each budget category with color coding:
   - Green: within 105% of budget
   - Yellow: 105-115% of budget  
   - Red: over 115% of budget
5. **Notes system** for each expense category
6. **Export/Import functionality** to save/load monthly data as JSON
7. **Clear all data** button with confirmation
8. **Auto-fill current month** on load

### Core Components Structure
- Main tracker component with state management
- Expense item components with progress indicators
- Tab navigation system
- Status overview with visual indicators
- Income section with salary + other income input

### Data Management
- All data stored in React state (no localStorage)
- Export functionality to download monthly data as JSON
- Import functionality to load previous months
- Clear all with confirmation dialog

## Docker Setup
Create production-ready Docker setup:

1. **Multi-stage Dockerfile** (build with Node, serve with nginx)
2. **docker-compose.yml** for easy deployment
3. **nginx.conf** with optimizations:
   - Gzip compression
   - Static asset caching
   - Security headers
   - React Router support
4. **Proper .dockerignore**

## Key Technical Requirements
- Use functional components with hooks
- Implement responsive grid layouts (4 cols desktop → 2 cols mobile)
- Add smooth transitions and hover effects
- Include loading states and error handling for file operations
- Optimize for touch interfaces on mobile
- Use semantic HTML and proper accessibility

## File Structure Expected
```
cash-flow-tracker/
├── public/
│   └── index.html (with Tailwind CDN)
├── src/
│   ├── index.js
│   ├── index.css (with Tailwind imports)
│   └── App.js (main component)
├── Dockerfile (multi-stage)
├── docker-compose.yml
├── nginx.conf
├── package.json
└── .dockerignore
```

## Specific UI Requirements
- Header with gradient background (blue to purple)
- Color-coded sections: green (income), blue (fixed), orange (variable), purple (savings)  
- Clean card-based layout with shadows
- Intuitive icons for each category
- Status indicators with appropriate colors and icons
- Progress bars showing budget vs actual spending
- Professional, modern design that works on all screen sizes

## Additional Features
- Calculate savings rate percentage
- Show remaining budget or overage
- Quick tips section in footer
- Smooth animations and transitions
- Touch-friendly button sizes for mobile

Please build this as a complete, production-ready application that can be deployed with `docker-compose up --build` and accessed at localhost:3000.

The app should feel like a polished financial management tool with intuitive UX that encourages regular use for budget tracking.

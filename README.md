# StudySphere 

StudySphere is a modern React-based study planner application designed to help students stay organized, productive, and focused. The application combines task management, note-taking, and Pomodoro study sessions into a single productivity platform with a clean and responsive user interface.

---

##  Features

### Task Management
- Create, edit, update, and delete tasks
- Assign priorities to tasks
- Track task completion status
- Filter and sort tasks
- Search tasks easily

### Notes System
- Create and manage study notes
- Edit and delete notes
- Search notes by title
- Expand and collapse note previews

### Pomodoro Study Timer
- 25-minute focus sessions
- Pause and reset functionality
- Session tracking and history
- Productivity monitoring

### Dashboard
- Overview of study progress
- Quick navigation between features
- Productivity-focused layout

---

## Technologies Used

### Frontend
- React.js
- Vite
- React Router DOM
- Tailwind CSS
- Lucide React Icons

### Backend
- JSON Server (`db.json`)

### State Management
- React Hooks (`useState`, `useEffect`)
- Custom Hooks

---

##  Project Structure

```bash
src/
│
├── assets/
├── components/
│   ├── Button.jsx
│   ├── NoteCard.jsx
│   ├── NoteModal.jsx
│   ├── PageHeader.jsx
│   ├── SessionHistory.jsx
│   ├── StatCard.jsx
│   ├── TaskFilters.jsx
│   ├── TaskModal.jsx
│   ├── TaskRow.jsx
│   └── TimerCircle.jsx
│
├── hooks/
│   ├── useNotes.js
│   ├── useTasks.js
│   └── useTimer.js
│
├── layout/
│   ├── layout.jsx
│   └── Sidebar.jsx
│
├── pages/
│   ├── Dashboard.jsx
│   ├── Notes.jsx
│   ├── Tasks.jsx
│   └── Timer.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## CRUD Functionality

### Tasks
- **Create** new tasks
- **Read** existing tasks
- **Update** task details and completion status
- **Delete** tasks

### Notes
- **Create** notes
- **Read** notes
- **Update** note content
- **Delete** notes

---

## Client-Side Routing

StudySphere uses React Router for seamless navigation.

| Route | Page |
|---|---|
| `/` | Dashboard |
| `/tasks` | Tasks Page |
| `/notes` | Notes Page |
| `/timer` | Study Timer |

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/penzimbuthia-sudo/Study-Sphere.git
```

### 2. Navigate into the Project

```bash
cd Study-Sphere
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start JSON Server

```bash
npx json-server --watch db.json --port 3001
```

### 5. Run the Development Server

```bash
npm run dev
```

---

## API Endpoints

| Endpoint | Description |
|---|---|
| `/tasks` | Task management |
| `/notes` | Notes management |
| `/sessions` | Pomodoro session history |

---

## Team Members

- Penzi Mbuthia — Team Lead
- Joseph Musyoka
- Frank Mwangi
- Fauz Lemayian

---

##  Deployment

### Frontend
Deployed using:
- Vercel


### Backend
- JSON Server (`db.json`)

---

## Project Requirements Covered

- React Functional Components
- Custom Hooks
- CRUD Operations
- REST API Integration
- Client-Side Routing
- Responsive UI Design
- Modular Component Architecture

---

## Future Improvements

- Authentication system
- Dark mode support
- Notifications and reminders
- Cloud database integration
- User analytics dashboard


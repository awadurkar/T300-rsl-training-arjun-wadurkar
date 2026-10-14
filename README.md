# Todo App

A simple React + Vite to-do application for managing daily tasks. The app lets you add new tasks, mark them as completed, edit existing items, delete them with confirmation, and filter the list by all, done, or pending tasks.


## Project Structure

```text
.
├── index.html
├── package.json
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── assets/
│   └── components/
│       ├── DeleteConfirmModal.jsx
│       ├── TodoFilters.jsx
│       ├── TodoInput.jsx
│       ├── TodoItem.jsx
│       └── TodoList.jsx
└── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Run the app locally

```bash
npm run dev
```

This will start the Vite development server. Open the local URL shown in the terminal (typically `http://localhost:5173`).

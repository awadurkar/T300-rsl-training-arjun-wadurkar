# Todo App

A simple React + Vite to-do application for managing daily tasks. The app lets you add new tasks, mark them as completed, edit existing items, delete them with confirmation, and filter the list by all, done, or pending tasks.

## Features

- Add new todos with a text input
- Mark a task as completed
- Prevent completed tasks from being edited or unchecked
- Edit tasks inline with confirm/cancel actions
- Delete tasks through a confirmation modal
- Filter the list by:
  - All
  - Done
  - Todo
- Preserves the initial sample tasks in the default state

## Tech Stack

- React 19
- Vite
- JavaScript
- CSS

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

### Production build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Usage

1. Enter a task in the input field and click "Add new task".
2. Use the checkbox to mark a task as complete.
3. Click "Edit" to modify an existing task.
4. Click "Delete" to remove a task after confirmation.
5. Use the filter buttons to switch between all, done, and pending tasks.

## Notes

This project is a lightweight task manager designed for quick learning and daily use. It is intentionally simple and does not include persistence, authentication, or backend storage.

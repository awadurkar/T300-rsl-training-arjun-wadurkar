# ProjectSpace — Project Explorer

A responsive project management portal built with the Next.js App Router, TypeScript, and Tailwind CSS v4. The interface uses Tailwind utilities, with a small global stylesheet for theme tokens and base styles.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use `npm run build` to create a production build and `npm start` to serve it.

## What’s included

- Shared navigation with Home, About, Dashboard, Projects, and Settings.
- A dashboard-only sidebar plus Analytics and Team pages.
- A local JSON project dataset, URL-driven project search/status filters, and project detail sections for Overview, Team, Tasks, Activity, and nested Docs.
- Project loading skeletons, a project-specific not-found view, and retryable error handling. Visit `/projects/demo-error` to preview the error boundary.
- A streamed Recent Activity section on the dashboard using a Server Component, `Suspense`, and a loading fallback.
- Client-side theme switching and persistent project favorites.

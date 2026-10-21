# TanStack Query Training Exercises

This branch contains Exercise 1, a product listing built with React and TanStack Query.

## Run locally

```bash
npm install
npm run dev
```

The app fetches products from the Fake Store API, caches each search query, and exposes query status in the interface and React Query DevTools.

## Exercise 1 features

- Query keys use `['products', { search }]`.
- Query data is considered fresh for 30 seconds and remains cached for 5 minutes after becoming inactive.
- Search filters product titles, descriptions, and categories.
- Refresh Products manually refetches the active query while keeping the current results visible.
- Pending, background-fetching, error, success, and empty-result states are displayed.

# TanStack Query Training — Exercise 2

User management with TanStack Query, React mutations, cache invalidation, and optimistic deletion.

## Run locally

```bash
npm install
npm run dev
```

The first visit loads users from JSONPlaceholder. Since the starter project does not include a writable backend and JSONPlaceholder does not persist writes, the app stores subsequent user changes in browser local storage. Created and edited users therefore remain available after a refresh in the same browser.

## Exercise 2 features

- `useUsers()` retrieves and caches the `['users']` query.
- Create and edit forms use mutations and invalidate the users query after success.
- Delete updates the query cache optimistically, cancels in-flight user queries, restores the previous list on failure, and invalidates after settling.
- Mutation pending, success, and error states are visible in the interface.
- React Query DevTools are available in the lower corner.

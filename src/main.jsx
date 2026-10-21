import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createUser, deleteUser, fetchUsers, updateUser } from './usersApi.js';
import './styles.css';

const queryClient = new QueryClient();
const USERS_QUERY_KEY = ['users'];
const EMPTY_USER = { name: '', email: '', role: 'Member' };
const ROLES = ['Member', 'Admin', 'Editor', 'Viewer'];

function useUsers() {
  return useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: fetchUsers,
  });
}

function useCreateUser() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => client.invalidateQueries({ queryKey: USERS_QUERY_KEY }),
  });
}

function useUpdateUser() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => client.invalidateQueries({ queryKey: USERS_QUERY_KEY }),
  });
}

function useDeleteUser() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onMutate: async (userId) => {
      await client.cancelQueries({ queryKey: USERS_QUERY_KEY });
      const previousUsers = client.getQueryData(USERS_QUERY_KEY);
      client.setQueryData(USERS_QUERY_KEY, (users) =>
        users?.filter((user) => user.id !== userId),
      );
      return { previousUsers };
    },
    onError: (_error, _userId, context) => {
      if (context?.previousUsers) {
        client.setQueryData(USERS_QUERY_KEY, context.previousUsers);
      }
    },
    onSettled: () => client.invalidateQueries({ queryKey: USERS_QUERY_KEY }),
  });
}

function UserForm({ createMutation }) {
  const [form, setForm] = useState(EMPTY_USER);

  function handleSubmit(event) {
    event.preventDefault();
    createMutation.mutate(form, {
      onSuccess: () => setForm(EMPTY_USER),
    });
  }

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  return (
    <form className="create-panel" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <p className="section-kicker">ADD TO YOUR TEAM</p>
          <h2>Create a user</h2>
        </div>
        <span className="form-icon" aria-hidden="true">＋</span>
      </div>
      <div className="form-fields">
        <label>
          <span>Name</span>
          <input
            autoComplete="name"
            name="name"
            onChange={updateField}
            placeholder="e.g. Taylor Morgan"
            required
            value={form.name}
          />
        </label>
        <label>
          <span>Email</span>
          <input
            autoComplete="email"
            name="email"
            onChange={updateField}
            placeholder="name@example.com"
            required
            type="email"
            value={form.email}
          />
        </label>
        <label>
          <span>Role</span>
          <select name="role" onChange={updateField} value={form.role}>
            {ROLES.map((role) => <option key={role}>{role}</option>)}
          </select>
        </label>
        <button className="primary-button" disabled={createMutation.isPending} type="submit">
          {createMutation.isPending ? (
            <><span className="button-spinner" aria-hidden="true" /> Creating…</>
          ) : (
            'Create user'
          )}
        </button>
      </div>
    </form>
  );
}

function EditUserForm({ user, mutation, onCancel }) {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
  });

  function handleSubmit(event) {
    event.preventDefault();
    mutation.mutate({ id: user.id, ...form }, { onSuccess: onCancel });
  }

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <label>
        <span>Name</span>
        <input name="name" onChange={updateField} required value={form.name} />
      </label>
      <label>
        <span>Email</span>
        <input name="email" onChange={updateField} required type="email" value={form.email} />
      </label>
      <label>
        <span>Role</span>
        <select name="role" onChange={updateField} value={form.role}>
          {ROLES.map((role) => <option key={role}>{role}</option>)}
        </select>
      </label>
      <div className="edit-actions">
        <button className="secondary-button compact-button" onClick={onCancel} type="button">
          Cancel
        </button>
        <button className="primary-button compact-button" disabled={mutation.isPending} type="submit">
          {mutation.isPending ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </form>
  );
}

function UserCard({ user, deleteMutation, updateMutation, controlsDisabled }) {
  const [editing, setEditing] = useState(false);
  const isDeleting = deleteMutation.isPending && deleteMutation.variables === user.id;
  const initials = user.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return (
    <article className="user-card">
      <div className="avatar" aria-hidden="true">{initials || '?'}</div>
      <div className="user-content">
        {editing ? (
          <EditUserForm user={user} mutation={updateMutation} onCancel={() => setEditing(false)} />
        ) : (
          <>
            <div className="user-heading">
              <div className="user-identity">
                <h3>{user.name}</h3>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </div>
              <span className={`role-badge role-${user.role.toLowerCase()}`}>{user.role}</span>
            </div>
            <div className="user-footer">
              <span>{user.company || 'Team member'}</span>
              <div className="user-actions">
                <button
                  className="secondary-button"
                  disabled={controlsDisabled}
                  onClick={() => setEditing(true)}
                  type="button"
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  disabled={controlsDisabled}
                  onClick={() => deleteMutation.mutate(user.id)}
                  type="button"
                >
                  {isDeleting ? <><span className="button-spinner" aria-hidden="true" /> Removing…</> : 'Delete'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </article>
  );
}

function MutationMessage({ mutation, label }) {
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (!mutation.isSuccess && !mutation.isError) {
      setIsDismissed(false);
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setIsDismissed(true), 3000);
    return () => window.clearTimeout(timeoutId);
  }, [mutation.isError, mutation.isSuccess]);

  if (isDismissed) {
    return null;
  }
  if (mutation.isPending) {
    return <p className="notice notice-pending" role="status">{label}…</p>;
  }
  if (mutation.isError) {
    return <p className="notice notice-error" role="alert">{label} failed: {mutation.error.message}</p>;
  }
  if (mutation.isSuccess) {
    return <p className="notice notice-success" role="status">{label} completed successfully.</p>;
  }
  return null;
}

function UserManagement() {
  const usersQuery = useUsers();
  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();
  const deleteMutation = useDeleteUser();
  const users = usersQuery.data;
  const isMutationPending =
    createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  return (
    <main className="page-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">WORKSPACE DIRECTORY</p>
          <h1>People</h1>
          <p className="intro">Manage your team, their roles, and access.</p>
        </div>
      </header>

      <UserForm createMutation={createMutation} />

      <section className="directory" aria-label="Team users">
        <div className="directory-heading">
          <div>
            <p className="section-kicker">YOUR WORKSPACE</p>
            <h2>Team members</h2>
          </div>
          <div className="directory-controls">
            {users && <span className="member-count">{users.length} members</span>}
            <button
              className="secondary-button refresh-button"
              disabled={usersQuery.isFetching}
              onClick={() => usersQuery.refetch()}
              type="button"
            >
              <span className={usersQuery.isFetching ? 'refresh-icon spinning' : 'refresh-icon'} aria-hidden="true">
                ↻
              </span>
              {usersQuery.isFetching ? 'Refreshing…' : 'Refresh'}
            </button>
          </div>
        </div>

        <MutationMessage mutation={createMutation} label="Creating user" />
        <MutationMessage mutation={updateMutation} label="Updating user" />
        <MutationMessage mutation={deleteMutation} label="Deleting user" />

        {usersQuery.isFetching && !usersQuery.isPending && (
          <p className="fetching-note" role="status">Syncing the latest team list…</p>
        )}

        {usersQuery.isPending && (
          <div className="state-panel" role="status">
            <span className="spinner" aria-hidden="true" />
            <h3>Loading your team</h3>
            <p>Fetching the latest user directory…</p>
          </div>
        )}

        {usersQuery.isError && !users && (
          <div className="state-panel error-panel" role="alert">
            <span className="state-symbol" aria-hidden="true">!</span>
            <h3>We couldn’t load your team</h3>
            <p>{usersQuery.error.message}</p>
            <button className="secondary-button" onClick={() => usersQuery.refetch()} type="button">
              Try again
            </button>
          </div>
        )}

        {usersQuery.isError && users && (
          <p className="notice notice-error" role="alert">
            Couldn’t sync the latest list: {usersQuery.error.message}. Showing the last available data.
          </p>
        )}

        {users && users.length > 0 && (
          <div className="user-list">
            {users.map((user) => (
              <UserCard
                key={user.id}
                controlsDisabled={isMutationPending}
                deleteMutation={deleteMutation}
                updateMutation={updateMutation}
                user={user}
              />
            ))}
          </div>
        )}

        {users && users.length === 0 && (
          <div className="state-panel empty-panel">
            <span className="state-symbol" aria-hidden="true">＋</span>
            <h3>Your team list is empty</h3>
            <p>Create a user above to get started.</p>
          </div>
        )}
      </section>
    </main>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserManagement />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

createRoot(document.getElementById('root')).render(<App />);

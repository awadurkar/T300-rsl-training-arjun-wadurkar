const USERS_STORAGE_KEY = 'tanstack-query-exercise-2-users';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

function waitForResponse() {
  return new Promise((resolve) => window.setTimeout(resolve, 300));
}

function readStoredUsers() {
  const storedUsers = window.localStorage.getItem(USERS_STORAGE_KEY);
  if (storedUsers === null) {
    return null;
  }

  const users = JSON.parse(storedUsers);
  if (!Array.isArray(users)) {
    throw new Error('Saved user data is invalid. Clear this app’s saved data and reload.');
  }
  return users;
}

function saveUsers(users) {
  window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

async function requestUsers() {
  const response = await fetch(USERS_URL);
  if (!response.ok) {
    throw new Error(`Unable to load users (${response.status}). Please try again.`);
  }

  const users = await response.json();
  if (!Array.isArray(users)) {
    throw new Error('The users service returned an unexpected response.');
  }

  return users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: 'Member',
    company: user.company?.name ?? '',
  }));
}

export async function fetchUsers() {
  const storedUsers = readStoredUsers();
  if (storedUsers !== null) {
    await waitForResponse();
    return storedUsers;
  }

  const users = await requestUsers();
  saveUsers(users);
  return users;
}

export async function createUser(userInput) {
  await waitForResponse();
  const users = readStoredUsers();
  if (users === null) {
    throw new Error('The user list is not ready yet. Please try again.');
  }

  const nextId = users.reduce((largestId, user) => Math.max(largestId, user.id), 0) + 1;
  const newUser = { id: nextId, ...userInput, company: '' };
  saveUsers([newUser, ...users]);
  return newUser;
}

export async function updateUser(userInput) {
  await waitForResponse();
  const users = readStoredUsers();
  if (users === null) {
    throw new Error('The user list is not ready yet. Please try again.');
  }

  const userIndex = users.findIndex((user) => user.id === userInput.id);
  if (userIndex === -1) {
    throw new Error('This user no longer exists. Refresh the list and try again.');
  }

  const updatedUser = { ...users[userIndex], ...userInput };
  const updatedUsers = [...users];
  updatedUsers[userIndex] = updatedUser;
  saveUsers(updatedUsers);
  return updatedUser;
}

export async function deleteUser(userId) {
  await waitForResponse();
  const users = readStoredUsers();
  if (users === null) {
    throw new Error('The user list is not ready yet. Please try again.');
  }

  const remainingUsers = users.filter((user) => user.id !== userId);
  if (remainingUsers.length === users.length) {
    throw new Error('This user no longer exists. Refresh the list and try again.');
  }

  saveUsers(remainingUsers);
}

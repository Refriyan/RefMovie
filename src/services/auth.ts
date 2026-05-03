// ── LOCAL AUTH SERVICE ──
export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
  createdAt: string;
}

interface StoredUser extends User { password: string; }

const USERS_KEY   = "cv_users";
const SESSION_KEY = "cv_session";

const getStoredUsers = (): StoredUser[] => {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || "[]"); }
  catch { return []; }
};

export const registerUser = (name: string, email: string, password: string): User => {
  const users = getStoredUsers();
  if (users.find(u => u.email.toLowerCase() === email.toLowerCase()))
    throw new Error("Email already registered");
  const user: StoredUser = {
    id: `u_${Date.now()}`, name, email: email.toLowerCase(),
    password, isAdmin: false, createdAt: new Date().toISOString(),
  };
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  const { password: _, ...safe } = user;
  localStorage.setItem(SESSION_KEY, JSON.stringify(safe));
  return safe;
};

export const loginUser = (email: string, password: string): User => {
  const users = getStoredUsers();
  const found = users.find(u => u.email === email.toLowerCase() && u.password === password);
  if (!found) throw new Error("Invalid email or password");
  const { password: _, ...safe } = found;
  localStorage.setItem(SESSION_KEY, JSON.stringify(safe));
  return safe;
};

export const logoutUser = () => localStorage.removeItem(SESSION_KEY);

export const getCurrentUser = (): User | null => {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || "null"); }
  catch { return null; }
};

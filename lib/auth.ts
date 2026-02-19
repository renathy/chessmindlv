'use client';

import { UserProfile } from './types';

const KEY = 'chessmind-user';

export function saveUser(user: UserProfile) {
  localStorage.setItem(KEY, JSON.stringify(user));
}

export function getUser(): UserProfile | null {
  const raw = localStorage.getItem(KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as UserProfile;
  } catch {
    return null;
  }
}

export function clearUser() {
  localStorage.removeItem(KEY);
}

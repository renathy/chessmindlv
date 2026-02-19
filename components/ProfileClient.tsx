'use client';

import { getUser } from '@/lib/auth';
import { UserProfile } from '@/lib/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function ProfileClient() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);
  }, [router]);

  if (!user) {
    return null;
  }

  return (
    <main>
      <section className="card">
        <h1>User profile</h1>

        <label htmlFor="profile-username">Username</label>
        <input id="profile-username" value={user.username} readOnly />

        <label htmlFor="profile-level">Level</label>
        <input id="profile-level" value={user.level} readOnly />

        <p>
          <small>Profile fields are read-only.</small>
        </p>

        <Link className="btn btn-primary" href="/dashboard">
          Back to dashboard
        </Link>
      </section>
    </main>
  );
}

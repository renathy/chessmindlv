'use client';

import lessons from '@/data/lessons.json';
import { clearUser, getUser } from '@/lib/auth';
import { Lesson, UserProfile } from '@/lib/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export function DashboardClient() {
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

  const visibleLessons = useMemo(() => {
    if (!user) {
      return [];
    }

    return (lessons as Lesson[])
      .filter((lesson) => user.role === 'teacher' || lesson.level <= user.level)
      .sort((a, b) => a.order - b.order);
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <main>
      <section className="card">
        <h1>Welcome, {user.username}</h1>
        <p>
          Role: <b>{user.role}</b> | {user.role === 'student' ? `Level: ${user.level}` : 'Full teacher access'}
        </p>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link className="btn btn-primary" href="/profile">
            View profile
          </Link>
          <button
            className="btn btn-muted"
            onClick={() => {
              clearUser();
              router.push('/login');
            }}
          >
            Log out
          </button>
        </div>
      </section>

      <section className="grid grid-2">
        {visibleLessons.map((lesson) => (
          <article className="card" key={lesson.id}>
            <h3>{lesson.title}</h3>
            <p>{lesson.description}</p>
            <p>
              <small>Recommended for level {lesson.level}+</small>
            </p>
            <Link className="btn btn-primary" href={`/lesson/${lesson.id}`}>
              Open lesson
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}

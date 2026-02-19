'use client';

import lessons from '@/data/lessons.json';
import { getUser } from '@/lib/auth';
import { Lesson, UserProfile } from '@/lib/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { PuzzleBoard } from './PuzzleBoard';

interface LessonClientProps {
  lessonId: string;
}

export function LessonClient({ lessonId }: LessonClientProps) {
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

  const lesson = useMemo(() => {
    return (lessons as Lesson[]).find((entry) => entry.id === lessonId) ?? null;
  }, [lessonId]);

  if (!user || !lesson) {
    return null;
  }

  if (user.role !== 'teacher' && lesson.level > user.level) {
    return (
      <main>
        <section className="card">
          <h2>Lesson is locked</h2>
          <p>Raise your student level to unlock this lesson path.</p>
          <Link href="/dashboard" className="btn btn-primary">
            Back to dashboard
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main>
      <Link href="/dashboard">← Back to dashboard</Link>
      <section className="card">
        <h1>{lesson.title}</h1>
        <p>{lesson.description}</p>
        {user.role === 'teacher' && lesson.teacherOnlyNote && (
          <p>
            <b>Teacher note:</b> {lesson.teacherOnlyNote}
          </p>
        )}
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
          <iframe
            src={lesson.videoUrl}
            title={lesson.title}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
            allowFullScreen
          />
        </div>
      </section>

      <section>
        <h2>Puzzles</h2>
        <p>This board uses react-chessboard + chess.js as the open-source puzzle runner/analyzer base.</p>
        {lesson.puzzles.map((puzzle) => (
          <PuzzleBoard key={puzzle.id} puzzle={puzzle} />
        ))}
      </section>
    </main>
  );
}

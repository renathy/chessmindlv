export type UserRole = 'student' | 'teacher';
export type UserLevel = 0 | 1 | 2 | 3;

export interface UserProfile {
  username: string;
  role: UserRole;
  level: UserLevel;
}

export interface AuthUser extends UserProfile {
  password: string;
}

export interface Puzzle {
  id: string;
  title: string;
  fen: string;
  solution: string[];
  hint: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  level: number;
  order: number;
  previousLessonId: string | null;
  nextLessonId: string | null;
  tags: string[];
  videoUrl: string;
  teacherOnlyNote?: string;
  puzzles: Puzzle[];
}

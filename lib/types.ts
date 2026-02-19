export type UserRole = 'student' | 'teacher';

export interface UserProfile {
  username: string;
  role: UserRole;
  level: number;
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
  videoUrl: string;
  teacherOnlyNote?: string;
  puzzles: Puzzle[];
}

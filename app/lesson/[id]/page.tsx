import { LessonClient } from '@/components/LessonClient';

export default function LessonPage({ params }: { params: { id: string } }) {
  return <LessonClient lessonId={params.id} />;
}

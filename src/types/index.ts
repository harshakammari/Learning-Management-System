export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher';
}

export interface Course {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  videoUrl: string;
  materials: Material[];
  enrolledStudents: string[];
  ratings: Rating[];
  createdAt: Date;
}

export interface Material {
  id: string;
  title: string;
  type: 'pdf' | 'slides' | 'notes';
  url: string;
}

export interface Rating {
  userId: string;
  rating: number;
  review: string;
  createdAt: Date;
}

export interface Question {
  id: string;
  courseId: string;
  userId: string;
  content: string;
  answers: Answer[];
  createdAt: Date;
}

export interface Answer {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
}
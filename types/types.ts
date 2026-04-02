export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  department: string;
  avatar?: string;
  classes: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  classId: string;
  className: string;
  fileUrl?: string;
  fileName?: string;
  uploadedAt: Date;
  type: 'pdf' | 'video' | 'link' | 'document';
}

export interface TimeSlot {
  id: string;
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export type DayOfWeek =
  | 'Lundi'
  | 'Mardi'
  | 'Mercredi'
  | 'Jeudi'
  | 'Vendredi'
  | 'Samedi';

export interface Room {
  id: string;
  name: string;
  capacity: number;
  building: string;
  floor: string;
  equipment: string[];
  status: 'available' | 'occupied' | 'reserved' | 'maintenance';
  reservedBy?: string;
  reservedUntil?: string;
}

export interface ScheduleEntry {
  id: string;
  subject: string;
  className: string;
  room: string;
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  color: string;
}

export interface ClassGroup {
  id: string;
  name: string;
  studentCount: number;
  level: string;
}
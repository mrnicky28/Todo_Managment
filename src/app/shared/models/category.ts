export interface Category {
  id?: number;
  title?: string;
  color?: string;
}

export enum Categories {
  GENERAL = 'General',
  IMPORTANT = 'Important',
  PLANNED = 'Planned',
  WORK = 'Work',
  EDUCATION = 'Education',
}

export type ClassLink = {
  id: string;
  name: string;
  url: string;
};

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string; // ISO String
};

export type ClassDef = {
  id: string;
  name: string;
  shift: string;
  year: string;
};

export type StudyPlan = {
  id: string;
  title: string;
  description: string;
  date: string; // ISO String
  classId: string;
};

export type ClassActivity = {
  id: string;
  title: string;
  description: string;
  classId: string;
  date: string; // ISO String
  type: 'evaluation' | 'homework' | 'in_class' | 'other';
};

export type AppState = {
  sheetUrls: {
    bimester1: string;
    bimester2: string;
    bimester3: string;
    bimester4: string;
    reportCard: string;
    calendar: string;
    seminars: string;
    attendance: string;
  };
  tasks?: Task[];
  classes?: ClassDef[];
  studyPlans?: StudyPlan[];
  activities?: ClassActivity[];
};

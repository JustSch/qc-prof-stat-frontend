// Global type declarations

declare global {
  interface TLetterGradeData {
    A_plus: string;
    A: string;
    A_minus: string;
    B_plus: string;
    B: string;
    B_minus: string;
    C_plus: string;
    C: string;
    P: string;
    C_minus: string;
    D_plus: string;
    D: string;
    F: string;
  }

  interface TNoLetterGradeData {
    inc_ng: number;
    Withdrawal: string;
  }

  interface TClassResult extends TLetterGradeData, TNoLetterGradeData {
    total_enrollment: number;
    instructor: string;
    subject: string;
    course_number: string;
    term: string;
    course_desc: string;
    class_section: string;
  }

  type TGradeKey = keyof TLetterGradeData;

  interface TSummaryStats {
    gradeLabels: string[];
    gradeCounts: number[];
    totalPassingGrades: number;
    totalGradedStudents: number;
  }
}

export {};

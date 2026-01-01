import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useStudentStore = create(
  persist(
    (set) => ({
      students: [
        {
          student_id: "B-001",
          stu_name: "Makara",
          BOD: "2004-05-24",
          Department: "Science",
          Major: "Computer Science",
          Contact: "0192083",
          Province: "Phnom Penh",
          class: "M3",
        },
        {
          student_id: "B-002",
          stu_name: "Sok Dara",
          BOD: "2003-11-12",
          Department: "Engineering",
          Major: "Information Technology Engineering",
          Contact: "0964521",
          Province: "Kandal",
          class: "E2",
        },
        {
          student_id: "B-003",
          stu_name: "Sreyneang",
          BOD: "2005-02-03",
          Department: "SocialHumanities",
          Major: "Media and Communication",
          Contact: "0883342",
          Province: "Battambang",
          class: "SH1",
        },
        {
          student_id: "B-004",
          stu_name: "Vannak",
          BOD: "2004-08-19",
          Department: "IFL",
          Major: "English",
          Contact: "0977789",
          Province: "Siem Reap",
          class: "L2",
        },
        {
          student_id: "B-005",
          stu_name: "Chanthy",
          BOD: "2003-06-30",
          Department: "Science",
          Major: "Biology",
          Contact: "0705521",
          Province: "Kampong Cham",
          class: "S3",
        },
        {
          student_id: "B-006",
          stu_name: "Pisey",
          BOD: "2005-01-14",
          Department: "Engineering",
          Major: "Bio Engineering",
          Contact: "0926618",
          Province: "Preah Sihanouk",
          class: "E1",
        },
        {
          student_id: "B-007",
          stu_name: "Rithy",
          BOD: "2004-03-09",
          Department: "Science",
          Major: "Chemistry",
          Contact: "0814432",
          Province: "Pursat",
          class: "S2",
        },
        {
          student_id: "B-008",
          stu_name: "Monika",
          BOD: "2005-10-21",
          Department: "IFL",
          Major: "Chinese",
          Contact: "0958890",
          Province: "Kampot",
          class: "L1",
        },
        {
          student_id: "B-009",
          stu_name: "Sopheak",
          BOD: "2003-07-17",
          Department: "Engineering",
          Major: "Telecommunication and Electronic Engineering",
          Contact: "0783321",
          Province: "Svay Rieng",
          class: "E3",
        },
        {
          student_id: "B-010",
          stu_name: "Bunthoeun",
          BOD: "2002-12-05",
          Department: "SocialHumanities",
          Major: "History",
          Contact: "0937744",
          Province: "Takeo",
          class: "SH4",
        },
        {
          student_id: "B-011",
          stu_name: "Sokha",
          BOD: "2004-09-11",
          Department: "Science",
          Major: "Mathematics",
          Contact: "0712265",
          Province: "Kampong Thom",
          class: "S2",
        },
        {
          student_id: "B-012",
          stu_name: "Dara",
          BOD: "2005-04-02",
          Department: "IFL",
          Major: "Japanese",
          Contact: "0869901",
          Province: "Koh Kong",
          class: "L1",
        },
        {
          student_id: "B-013",
          stu_name: "Channy",
          BOD: "2003-01-26",
          Department: "Engineering",
          Major: "Automation & Supply Chain Systems Engineering",
          Contact: "0985512",
          Province: "Kratie",
          class: "E4",
        },
        {
          student_id: "B-014",
          stu_name: "Sreymom",
          BOD: "2004-06-18",
          Department: "SocialHumanities",
          Major: "Khmer Literature",
          Contact: "0903387",
          Province: "Mondulkiri",
          class: "SH3",
        },
        {
          student_id: "B-015",
          stu_name: "Vichea",
          BOD: "2002-08-29",
          Department: "Science",
          Major: "Physics",
          Contact: "0776642",
          Province: "Ratanakiri",
          class: "S4",
        },
      ],
      addStudent: (student) =>
        set((state) => ({ students: [...state.students, student] })),
      updateStudent: (student) =>
        set((state) => ({
          students: state.students.map((s) =>
            s.student_id === student.student_id ? student : s,
          ),
        })),
      deleteStudent: (student_id) =>
        set((state) => ({
          students: state.students.filter((s) => s.student_id !== student_id),
        })),
    }),
    // NOTE:
    // doysa zustand ort upate mock data pel yg add more jg yg config vea oy migrate sa tmey
    // make zustand detect changes in mock data and migrate
    {
      name: "student-storage", // name of the item in the storage (must be unique)
      migrate: (persistedState, version) => {
        if (version === 0) {
          return { students: [] };
        }
        return persistedState;
      },
      stirage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useStudentStore;

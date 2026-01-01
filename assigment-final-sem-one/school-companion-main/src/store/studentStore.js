// System will use this data if there is no db.json
import { create } from "zustand";

// Mock data for when JSON Server is not available
const mockStudents = [
  {
    id: 1,
    student_name: "San Makara",
    BOD: "2000-05-15",
    Department: "Engineering",
    Major: "Computer Science",
    Year: 3,
    class: "M1",
    Province: "Phnom Penh",
  },
  {
    id: 2,
    student_name: "Sok Dara",
    BOD: "2001-03-22",
    Department: "Engineering",
    Major: "Information Technology Engineering",
    Year: 2,
    class: "A2",
    Province: "Kandal",
  },
  {
    id: 3,
    student_name: "Chenda Sreyneang",
    BOD: "1999-11-08",
    Department: "SocialHumanities",
    Major: "Media and Communication",
    Year: 4,
    class: "E4",
    Province: "Battambang",
  },
  {
    id: 4,
    student_name: "Touch Rithy",
    BOD: "2002-07-30",
    Department: "IFL",
    Major: "English",
    Year: 4,
    class: "A6",
    Province: "Siem Reap",
  },
  {
    id: 5,
    student_name: "Heng Visal",
    BOD: "2000-01-18",
    Department: "Science",
    Major: "Biology",
    Year: 3,
    class: "M4",
    Province: "Kampong Cham",
  },
  {
    id: 6,
    student_name: "Lim Sothea",
    BOD: "2001-09-25",
    Department: "Engineering",
    Major: "Bio Engineering", // keep if allowed, or change to listed Engineering majors
    Year: 2,
    class: "M3",
    Province: "Preah Sihanouk",
  },
  {
    id: 7,
    student_name: "Keo Pisey",
    BOD: "1999-04-12",
    Department: "SocialHumanities",
    Major: "History",
    Year: 4,
    class: "A7",
    Province: "Takeo",
  },
  {
    id: 8,
    student_name: "Chanthy Monika",
    BOD: "2002-12-05",
    Department: "IFL",
    Major: "Chinese",
    Year: 1,
    class: "M7",
    Province: "Kampot",
  },
  {
    id: 9,
    student_name: "Daniel Sok",
    BOD: "2000-08-20",
    Department: "Science",
    Major: "Chemistry",
    Year: 3,
    class: "M6",
    Province: "Pursat",
  },
  {
    id: 10,
    student_name: "Srey Pov",
    BOD: "2001-02-14",
    Department: "Engineering",
    Major: "Computer Science",
    Year: 2,
    class: "A4",
    Province: "Svay Rieng",
  },
  {
    id: 11,
    student_name: "Ros Chantha",
    BOD: "1999-06-28",
    Department: "SocialHumanities",
    Major: "Khmer Literature",
    Year: 4,
    class: "A3",
    Province: "Kampong Thom",
  },
  {
    id: 12,
    student_name: "Phan Vichea",
    BOD: "2002-10-03",
    Department: "IFL",
    Major: "Japanese",
    Year: 1,
    class: "A1",
    Province: "Koh Kong",
  },
  {
    id: 13,
    student_name: "Joshua Meng",
    BOD: "2000-03-17",
    Department: "Science",
    Major: "Physics",
    Year: 3,
    class: "E1",
    Province: "Kratie",
  },
  {
    id: 14,
    student_name: "Nita Sopheak",
    BOD: "2001-11-22",
    Department: "Engineering",
    Major: "Bio Engineering",
    Year: 2,
    class: "M5",
    Province: "Mondulkiri",
  },
  {
    id: 15,
    student_name: "Kosal Bunthoeun",
    BOD: "1999-07-09",
    Department: "Science",
    Major: "Mathematics",
    Year: 4,
    class: "M2",
    Province: "Ratanakiri",
  },
];

const useStudentStore = create((set, get) => ({
  students: [],

  // Loading and error states
  isLoading: false,
  error: null,

  // Search state
  searchQuery: "",

  // Filter states
  filters: {
    department: "",
    major: "",
    year: "",
    province: "",
  },

  // Pagination states
  currentPage: 1,
  pageSize: 10,

  // Get unique values for filter dropdowns
  getUniqueValues: (field) => {
    const students = get().students;
    const values = [...new Set(students.map((s) => s[field]))];
    return values.filter(Boolean).sort();
  },

  // Set search query
  setSearchQuery: (query) => {
    set({ searchQuery: query, currentPage: 1 });
  },

  // Set individual filter
  setFilter: (filterName, value) => {
    set((state) => ({
      filters: { ...state.filters, [filterName]: value },
      currentPage: 1,
    }));
  },

  // Clear all filters
  clearFilters: () => {
    set({
      filters: {
        department: "",
        major: "",
        year: "",
        province: "",
      },
      searchQuery: "",
      currentPage: 1,
    });
  },

  // Set current page
  setCurrentPage: (page) => {
    set({ currentPage: page });
  },

  // Set page size
  setPageSize: (size) => {
    set({ pageSize: size, currentPage: 1 });
  },

  // Get filtered students
  getFilteredStudents: () => {
    const { students, searchQuery, filters } = get();

    return students.filter((student) => {
      // Search filter
      const matchesSearch = searchQuery
        ? student.student_name.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      // Department filter
      const matchesDepartment = filters.department
        ? student.Department === filters.department
        : true;

      // Major filter
      const matchesMajor = filters.major
        ? student.Major === filters.major
        : true;

      // Year filter
      const matchesYear = filters.year
        ? student.Year === parseInt(filters.year)
        : true;

      // Province filter
      const matchesProvince = filters.province
        ? student.Province === filters.province
        : true;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesMajor &&
        matchesYear &&
        matchesProvince
      );
    });
  },

  // Get paginated students
  getPaginatedStudents: () => {
    const { currentPage, pageSize } = get();
    const filteredStudents = get().getFilteredStudents();

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return filteredStudents.slice(startIndex, endIndex);
  },

  // Get total pages
  getTotalPages: () => {
    const { pageSize } = get();
    const filteredStudents = get().getFilteredStudents();
    return Math.ceil(filteredStudents.length / pageSize);
  },

  // Fetch all students - uses mock data in preview environment
  fetchStudents: async () => {
    set({ isLoading: true, error: null });
    // Use mock data directly since JSON Server is not available in preview
    setTimeout(() => {
      set({ students: mockStudents, isLoading: false });
    }, 300);
  },

  // Add new student (local state only in preview)
  addStudent: async (studentData) => {
    set({ isLoading: true, error: null });
    const newId = Math.max(...get().students.map((s) => s.id), 0) + 1;
    const newStudent = { ...studentData, id: newId };
    set((state) => ({
      students: [...state.students, newStudent],
      isLoading: false,
    }));
    return true;
  },

  // Update existing student (local state only in preview)
  editStudent: async (id, studentData) => {
    set({ isLoading: true, error: null });
    set((state) => ({
      students: state.students.map((s) =>
        s.id === id ? { ...studentData, id } : s,
      ),
      isLoading: false,
    }));
    return true;
  },

  // Remove student (local state only in preview)
  removeStudent: async (id) => {
    set({ isLoading: true, error: null });
    set((state) => ({
      students: state.students.filter((s) => s.id !== id),
      isLoading: false,
    }));
    return true;
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },
}));

export default useStudentStore;

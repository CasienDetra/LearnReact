import axios from "axios";

// Base URL for JSON Server
const API_BASE_URL = "http://localhost:3001";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Fetch all students from the server
 * @returns {Promise<Array>} Array of student objects
 */
export const getAllStudents = async () => {
  const response = await api.get("/students");
  return response.data;
};

/**
 * Fetch a single student by ID
 * @param {number} id - Student ID
 * @returns {Promise<Object>} Student object
 */
export const getStudentById = async (id) => {
  const response = await api.get(`/students/${id}`);
  return response.data;
};

/**
 * Create a new student
 * @param {Object} studentData - Student data without ID
 * @returns {Promise<Object>} Created student object with ID
 */
export const createStudent = async (studentData) => {
  const response = await api.post("/students", studentData);
  return response.data;
};

/**
 * Update an existing student
 * @param {number} id - Student ID
 * @param {Object} studentData - Updated student data
 * @returns {Promise<Object>} Updated student object
 */
export const updateStudent = async (id, studentData) => {
  const response = await api.put(`/students/${id}`, studentData);
  return response.data;
};

/**
 * Delete a student by ID
 * @param {number} id - Student ID
 * @returns {Promise<void>}
 */
export const deleteStudent = async (id) => {
  await api.delete(`/students/${id}`);
};

export default api;

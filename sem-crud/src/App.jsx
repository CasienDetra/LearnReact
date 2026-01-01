import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  Button,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import ThemeToggle from './components/ThemeToggle';
import useThemeStore from './stores/useThemeStore';
import useStudentStore from './stores/useStudentStore';
import StudentTable from './components/StudentTable';
import StudentDialog from './components/StudentDialog';

function App() {
  const theme = useThemeStore((state) => state.theme);
  const { students, addStudent, updateStudent, deleteStudent } = useStudentStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    document.documentElement.className = `theme-${theme}`;
  }, [theme]);

  const handleAddStudent = () => {
    setSelectedStudent(null);
    onOpen();
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    onOpen();
  };

  const handleDeleteStudent = (student_id) => {
    deleteStudent(student_id);
  };

  const handleSubmit = (studentData) => {
    if (selectedStudent) {
      updateStudent(studentData);
    } else {
      addStudent(studentData);
    }
  };

  return (
    <Box>
      <Flex as="header" p={4} justifyContent="space-between" alignItems="center">
        <Heading size="md">Student Management</Heading>
        <ThemeToggle />
      </Flex>
      <Box p={4}>
        <Button onClick={handleAddStudent} mb={4}>
          Add Student
        </Button>
        <StudentTable
          students={students}
          onEdit={handleEditStudent}
          onDelete={handleDeleteStudent}
        />
        <StudentDialog
          isOpen={isOpen}
          onClose={onClose}
          student={selectedStudent}
          onSubmit={handleSubmit}
        />
      </Box>
      <Box as="footer" p={4} textAlign="center">
        <Text>Made with ❤️ by Yanouk</Text>
      </Box>
    </Box>
  );
}

export default App;

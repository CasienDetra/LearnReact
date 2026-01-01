/**
 * StudentTable Component
 * Displays students in a responsive table with edit/delete actions
 */
import { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  HStack,
  Badge,
  Text,
  Box,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useToast,
  Tooltip,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useRef } from 'react';
import useStudentStore from '../store/studentStore';
import StudentForm from './StudentForm';

// Year badge colors
const yearColors = {
  1: 'green',
  2: 'blue',
  3: 'purple',
  4: 'orange',
  5: 'red',
  6: 'pink',
};

const StudentTable = () => {
  // Get state from store - subscribe to reactive state to trigger re-renders
  const students = useStudentStore((state) => state.students);
  const searchQuery = useStudentStore((state) => state.searchQuery);
  const filters = useStudentStore((state) => state.filters);
  const currentPage = useStudentStore((state) => state.currentPage);
  const pageSize = useStudentStore((state) => state.pageSize);
  const getPaginatedStudents = useStudentStore((state) => state.getPaginatedStudents);
  const isLoading = useStudentStore((state) => state.isLoading);
  const error = useStudentStore((state) => state.error);
  const removeStudent = useStudentStore((state) => state.removeStudent);
  const clearError = useStudentStore((state) => state.clearError);

  // Local state for selected student
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);

  // Modal controls
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  // Refs and hooks
  const cancelRef = useRef();
  const toast = useToast();

  // Get paginated students - now reactive due to subscribed state
  const paginatedStudents = getPaginatedStudents();

  // Handle edit button click
  const handleEdit = (student) => {
    setSelectedStudent(student);
    onEditOpen();
  };

  // Handle delete button click
  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    onDeleteOpen();
  };

  // Confirm deletion
  const handleDeleteConfirm = async () => {
    if (studentToDelete) {
      const success = await removeStudent(studentToDelete.id);
      if (success) {
        toast({
          title: 'Student deleted',
          description: `${studentToDelete.student_name} has been removed.`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
      setStudentToDelete(null);
      onDeleteClose();
    }
  };

  // Close edit modal
  const handleEditClose = () => {
    setSelectedStudent(null);
    onEditClose();
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" color="blue.500" thickness="4px" />
        <Text mt={4} color="gray.600">
          Loading students...
        </Text>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        py={8}
        borderRadius="lg"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Error Loading Students
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          {error}
          <Button size="sm" mt={4} colorScheme="red" variant="outline" onClick={clearError}>
            Dismiss
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  // Empty state
  if (paginatedStudents.length === 0) {
    return (
      <Box textAlign="center" py={10} bg="gray.50" borderRadius="lg">
        <Text fontSize="lg" color="gray.600">
          No students found
        </Text>
        <Text fontSize="sm" color="gray.500" mt={2}>
          Try adjusting your search or filter criteria
        </Text>
      </Box>
    );
  }

  return (
    <>
      <TableContainer
        bg="white"
        borderRadius="lg"
        border="1px"
        borderColor="gray.200"
        overflowX="auto"
      >
        <Table variant="simple" size="sm">
          <Thead bg="gray.50">
            <Tr>
              <Th py={4}>ID</Th>
              <Th py={4}>Name</Th>
              <Th py={4}>Date of Birth</Th>
              <Th py={4}>Department</Th>
              <Th py={4}>Major</Th>
              <Th py={4}>Year</Th>
              <Th py={4}>Class</Th>
              <Th py={4}>Province</Th>
              <Th py={4} textAlign="center">
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedStudents.map((student) => (
              <Tr key={student.id} _hover={{ bg: 'gray.50' }}>
                <Td fontWeight="medium" color="gray.600">
                  #{student.id}
                </Td>
                <Td fontWeight="semibold">{student.student_name}</Td>
                <Td color="gray.600">{formatDate(student.BOD)}</Td>
                <Td>
                  <Badge colorScheme="teal" variant="subtle">
                    {student.Department}
                  </Badge>
                </Td>
                <Td color="gray.700">{student.Major}</Td>
                <Td>
                  <Badge colorScheme={yearColors[student.Year] || 'gray'}>
                    Year {student.Year}
                  </Badge>
                </Td>
                <Td>
                  <Badge variant="outline" colorScheme="gray">
                    {student.class}
                  </Badge>
                </Td>
                <Td color="gray.600">{student.Province}</Td>
                <Td>
                  <HStack spacing={2} justify="center">
                    <Tooltip label="Edit student" hasArrow>
                      <IconButton
                        aria-label="Edit student"
                        icon={<EditIcon />}
                        size="sm"
                        colorScheme="blue"
                        variant="ghost"
                        onClick={() => handleEdit(student)}
                      />
                    </Tooltip>
                    <Tooltip label="Delete student" hasArrow>
                      <IconButton
                        aria-label="Delete student"
                        icon={<DeleteIcon />}
                        size="sm"
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => handleDeleteClick(student)}
                      />
                    </Tooltip>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Edit Modal */}
      <StudentForm
        isOpen={isEditOpen}
        onClose={handleEditClose}
        editStudent={selectedStudent}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Student
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete{' '}
              <Text as="span" fontWeight="bold">
                {studentToDelete?.student_name}
              </Text>
              ? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteConfirm} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default StudentTable;

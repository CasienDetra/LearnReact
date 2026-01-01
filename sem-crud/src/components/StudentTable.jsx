import React, { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  HStack,
  Badge,
  useColorModeValue,
  Flex,
  Select,
  Button,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const departmentColors = {
  SocialHumanities: 'red',
  IFL: 'green',
  Engineering: 'blue',
  Science: 'purple',
  Education: 'orange',
};

const majorColors = {
  "Information Technology Engineering": 'teal',
  "Telecommunication and Electronic Engineering": 'cyan',
  "Bio Engineering": 'yellow',
  "Automation & Supply Chain Systems Engineering": 'pink',
  "Environmental Engineering": 'gray',
  "History": 'red',
  "Khmer Literature": 'green',
  "Media and Communication": 'blue',
  "IBM": 'purple',
  "Philosophy": 'orange',
  "Psychology": 'teal',
  "Tourism": 'cyan',
  "Chinese": 'yellow',
  "English": 'pink',
  "Japanese": 'gray',
  "France": 'red',
  "Korean": 'green',
  "Physics": 'blue',
  "Computer Science": 'purple',
  "Chemistry": 'orange',
  "Biology": 'teal',
  "Mathematics": 'cyan',
  "Educational Studies": 'yellow',
  "Higher Education Development and Management": 'pink',
  "Lifelong Learning": 'gray',
  "Center for Educational Research and Training": 'red',
};

const classColors = {
  M1: 'red',
  M2: 'green',
  M3: 'blue',
  M4: 'purple',
  M5: 'orange',
  M6: 'teal',
};

const StudentTable = ({ students, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const headerBg = useColorModeValue('blue.500', 'blue.800');
  const headerColor = useColorModeValue('white', 'gray.100');
  const evenRowBg = useColorModeValue('gray.100', 'gray.700');
  const oddRowBg = useColorModeValue('white', 'gray.800');
  const hoverBg = useColorModeValue('gray.200', 'gray.600');

  const totalPages = Math.ceil(students.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = students.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };
  return (
    <>
      <Table variant="simple">
        <Thead bg={headerBg}>
          <Tr>
            <Th color={headerColor}>Student ID</Th>
            <Th color={headerColor}>Name</Th>
            <Th color={headerColor}>Birth Date</Th>
            <Th color={headerColor}>Department</Th>
            <Th color={headerColor}>Major</Th>
            <Th color={headerColor}>Contact</Th>
            <Th color={headerColor}>Province</Th>
            <Th color={headerColor}>Class</Th>
            <Th color={headerColor}>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedStudents.map((student, index) => (
            <Tr key={student.student_id} bg={index % 2 === 0 ? evenRowBg : oddRowBg} _hover={{ bg: hoverBg }}>
              <Td>{student.student_id}</Td>
              <Td>{student.stu_name}</Td>
              <Td>{student.BOD}</Td>
              <Td>
                <Badge variant="subtle" colorScheme={departmentColors[student.Department]}>
                  {student.Department}
                </Badge>
              </Td>
              <Td>
                <Badge variant="subtle" colorScheme={majorColors[student.Major]}>
                  {student.Major}
                </Badge>
              </Td>
              <Td>{student.Contact}</Td>
              <Td>{student.Province}</Td>
              <Td>
                <Badge variant="subtle" colorScheme={classColors[student.class]}>
                  {student.class}
                </Badge>
              </Td>
              <Td>
                <HStack spacing={2}>
                  <IconButton
                    aria-label="Edit student"
                    icon={<EditIcon />}
                    onClick={() => onEdit(student)}
                    colorScheme="blue"
                  />
                  <IconButton
                    aria-label="Delete student"
                    icon={<DeleteIcon />}
                    onClick={() => onDelete(student.student_id)}
                    colorScheme="red"
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Flex justifyContent="space-between" alignItems="center" mt={4}>
        <Select w="120px" value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
        </Select>
        <HStack>
          <IconButton
            icon={<ChevronLeftIcon />}
            aria-label="Previous page"
            onClick={() => handlePageChange(currentPage - 1)}
            isDisabled={currentPage === 1}
          />
          <Button>
            {currentPage} / {totalPages}
          </Button>
          <IconButton
            icon={<ChevronRightIcon />}
            aria-label="Next page"
            onClick={() => handlePageChange(currentPage + 1)}
            isDisabled={currentPage === totalPages}
          />
        </HStack>
      </Flex>
    </>
  );
};

export default StudentTable;

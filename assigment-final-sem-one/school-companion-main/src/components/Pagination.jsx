/**
 * Pagination Component
 * Handles page navigation and page size selection
 */
import {
  Flex,
  Button,
  Select,
  Text,
  HStack,
  IconButton,
  Box,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import useStudentStore from '../store/studentStore';

const Pagination = () => {
  // Get pagination state and methods from store
  const currentPage = useStudentStore((state) => state.currentPage);
  const pageSize = useStudentStore((state) => state.pageSize);
  const setCurrentPage = useStudentStore((state) => state.setCurrentPage);
  const setPageSize = useStudentStore((state) => state.setPageSize);
  const getTotalPages = useStudentStore((state) => state.getTotalPages);
  const getFilteredStudents = useStudentStore((state) => state.getFilteredStudents);

  const totalPages = getTotalPages();
  const totalStudents = getFilteredStudents().length;

  // Calculate display range
  const startItem = totalStudents === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalStudents);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <Flex
      justify="space-between"
      align="center"
      wrap="wrap"
      gap={4}
      bg="gray.50"
      p={4}
      borderRadius="lg"
      border="1px"
      borderColor="gray.200"
    >
      {/* Page size selector */}
      <HStack spacing={2}>
        <Text fontSize="sm" color="gray.600">
          Show
        </Text>
        <Select
          value={pageSize}
          onChange={(e) => setPageSize(parseInt(e.target.value))}
          size="sm"
          w="80px"
          bg="white"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </Select>
        <Text fontSize="sm" color="gray.600">
          entries
        </Text>
      </HStack>

      {/* Current display info */}
      <Box>
        <Text fontSize="sm" color="gray.600">
          Showing {startItem} to {endItem} of {totalStudents} students
        </Text>
      </Box>

      {/* Page navigation */}
      <HStack spacing={1}>
        <IconButton
          aria-label="Previous page"
          icon={<ChevronLeftIcon />}
          size="sm"
          variant="outline"
          isDisabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        />

        {getPageNumbers().map((pageNum) => (
          <Button
            key={pageNum}
            size="sm"
            variant={currentPage === pageNum ? 'solid' : 'outline'}
            colorScheme={currentPage === pageNum ? 'blue' : 'gray'}
            onClick={() => setCurrentPage(pageNum)}
          >
            {pageNum}
          </Button>
        ))}

        <IconButton
          aria-label="Next page"
          icon={<ChevronRightIcon />}
          size="sm"
          variant="outline"
          isDisabled={currentPage >= totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        />
      </HStack>
    </Flex>
  );
};

export default Pagination;

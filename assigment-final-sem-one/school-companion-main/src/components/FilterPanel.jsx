/**
 * FilterPanel Component
 * Provides filter dropdowns for Department, Major, Year, and Province
 */
import {
  Box,
  Flex,
  Select,
  Button,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import useStudentStore from '../store/studentStore';

const FilterPanel = () => {
  // Get filter state and methods from store
  const filters = useStudentStore((state) => state.filters);
  const setFilter = useStudentStore((state) => state.setFilter);
  const clearFilters = useStudentStore((state) => state.clearFilters);
  const getUniqueValues = useStudentStore((state) => state.getUniqueValues);

  // Get unique values for each filter dropdown
  const departments = getUniqueValues('Department');
  const majors = getUniqueValues('Major');
  const years = getUniqueValues('Year');
  const provinces = getUniqueValues('Province');

  // Check if any filter is active
  const hasActiveFilters = Object.values(filters).some((v) => v !== '');

  return (
    <Box bg="gray.50" p={4} borderRadius="lg" border="1px" borderColor="gray.200">
      <Flex justify="space-between" align="center" mb={3}>
        <Text fontWeight="semibold" color="gray.700">
          Filters
        </Text>
        {hasActiveFilters && (
          <Button
            size="sm"
            variant="ghost"
            colorScheme="red"
            leftIcon={<CloseIcon boxSize={2} />}
            onClick={clearFilters}
          >
            Clear All
          </Button>
        )}
      </Flex>

      <Wrap spacing={4}>
        {/* Department Filter */}
        <WrapItem>
          <Box>
            <Text fontSize="sm" color="gray.600" mb={1}>
              Department
            </Text>
            <Select
              placeholder="All Departments"
              value={filters.department}
              onChange={(e) => setFilter('department', e.target.value)}
              bg="white"
              minW="180px"
              size="sm"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </Select>
          </Box>
        </WrapItem>

        {/* Major Filter */}
        <WrapItem>
          <Box>
            <Text fontSize="sm" color="gray.600" mb={1}>
              Major
            </Text>
            <Select
              placeholder="All Majors"
              value={filters.major}
              onChange={(e) => setFilter('major', e.target.value)}
              bg="white"
              minW="180px"
              size="sm"
            >
              {majors.map((major) => (
                <option key={major} value={major}>
                  {major}
                </option>
              ))}
            </Select>
          </Box>
        </WrapItem>

        {/* Year Filter */}
        <WrapItem>
          <Box>
            <Text fontSize="sm" color="gray.600" mb={1}>
              Year
            </Text>
            <Select
              placeholder="All Years"
              value={filters.year}
              onChange={(e) => setFilter('year', e.target.value)}
              bg="white"
              minW="120px"
              size="sm"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  Year {year}
                </option>
              ))}
            </Select>
          </Box>
        </WrapItem>

        {/* Province Filter */}
        <WrapItem>
          <Box>
            <Text fontSize="sm" color="gray.600" mb={1}>
              Province
            </Text>
            <Select
              placeholder="All Provinces"
              value={filters.province}
              onChange={(e) => setFilter('province', e.target.value)}
              bg="white"
              minW="160px"
              size="sm"
            >
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </Select>
          </Box>
        </WrapItem>
      </Wrap>
    </Box>
  );
};

export default FilterPanel;

/**
 * SearchBar Component
 * Provides search functionality for filtering students by name
 */
import {
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import useStudentStore from '../store/studentStore';

const SearchBar = () => {
  // Get search state and setter from store
  const searchQuery = useStudentStore((state) => state.searchQuery);
  const setSearchQuery = useStudentStore((state) => state.setSearchQuery);

  return (
    <InputGroup maxW="400px">
      <InputLeftElement pointerEvents="none">
        <Icon as={SearchIcon} color="gray.400" />
      </InputLeftElement>
      <Input
        placeholder="Search by student name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        bg="white"
        borderColor="gray.300"
        _hover={{ borderColor: 'blue.400' }}
        _focus={{
          borderColor: 'blue.500',
          boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)',
        }}
      />
    </InputGroup>
  );
};

export default SearchBar;

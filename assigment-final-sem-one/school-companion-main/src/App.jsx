import { useEffect } from "react";
import {
  ChakraProvider,
  Box,
  Container,
  Heading,
  Text,
  Button,
  Flex,
  VStack,
  useDisclosure,
  Icon,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import useStudentStore from "./store/studentStore";
import SearchBar from "./components/SearchBar";
import FilterPanel from "./components/FilterPanel";
import StudentTable from "./components/StudentTable";
import StudentForm from "./components/StudentForm";
import Pagination from "./components/Pagination";
import ExportButtons from "./components/ExportButtons";

// Custom icon component for graduation cap
const GraduationIcon = (props) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"
    />
  </Icon>
);

const App = () => {
  // Store state and methods
  const fetchStudents = useStudentStore((state) => state.fetchStudents);
  const error = useStudentStore((state) => state.error);
  const clearError = useStudentStore((state) => state.clearError);

  // Modal control for create form
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Fetch students on mount
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return (
    <ChakraProvider>
      <Box minH="100vh" bg="gray.100">
        {/* Header */}
        <Box bg="blue.600" color="white" py={6} boxShadow="md">
          <Container maxW="container.xl">
            <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
              <Flex align="center" gap={3}>
                <GraduationIcon boxSize={10} />
                <Box>
                  <Heading size="lg" fontWeight="bold">
                    Student Management System
                  </Heading>
                  <Text fontSize="sm" opacity={0.9}>
                    Manage student records
                  </Text>
                </Box>
              </Flex>
              <Flex gap={3}>
                <ExportButtons />
                <Button
                  leftIcon={<AddIcon />}
                  colorScheme="whiteAlpha"
                  variant="solid"
                  size="md"
                  onClick={onOpen}
                  _hover={{ bg: "whiteAlpha.300" }}
                >
                  Add Student
                </Button>
              </Flex>
            </Flex>
          </Container>
        </Box>

        {/* Main Content */}
        <Container maxW="container.xl" py={8}>
          <VStack spacing={6} align="stretch">
            {/* Error Alert */}
            {error && (
              <Alert status="error" borderRadius="lg">
                <AlertIcon />
                <Box flex="1">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Box>
                <CloseButton onClick={clearError} />
              </Alert>
            )}

            {/* Search and Filter Section */}
            <Flex
              justify="space-between"
              align="flex-start"
              wrap="wrap"
              gap={4}
            >
              <SearchBar />
            </Flex>

            {/* Filter Panel */}
            <FilterPanel />

            {/* Student Table */}
            <StudentTable />

            {/* Pagination */}
            <Pagination />
          </VStack>
        </Container>

        {/* Create Student Modal */}
        <StudentForm isOpen={isOpen} onClose={onClose} />

        {/* Footer */}
        <Box bg="gray.800" color="white" py={4} mt={8}>
          <Container maxW="container.xl">
            <Text textAlign="center" fontSize="sm">
              Create with Love By{" "}
              <a href="https://github.com/CasienDetra">Yanouk</a>
            </Text>
          </Container>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default App;

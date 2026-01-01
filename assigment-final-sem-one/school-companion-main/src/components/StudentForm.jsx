/**
 * StudentForm Component
 * Modal form for creating and editing students
 */
import { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  useToast,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import useStudentStore from "../store/studentStore";

// Initial form state
const initialFormState = {
  student_name: "",
  BOD: "",
  Department: "",
  Major: "",
  Year: 1,
  class: "",
  Province: "",
};

// Available options for dropdowns
const departments = ["SocialHumanities", "IFL", "Engineering", "Science"];
const majors = {
  Engineering: [
    "Information Technology Engineering",
    "Telecommunication and Electronic Engineering",
    "Bio Engineering",
    "Automation & Supply Chain Systems Engineering",
  ],
  SocialHumanities: [
    "History",
    "Khmer Literature",
    "Media and Communication",
    "IBM",
  ],
  IFL: ["Chinese", "English", "Japanese", "France", "Korean"],
  Science: [
    "Physics",
    "Computer Science",
    "Chemistry",
    "Biology",
    "Mathematics",
  ],
};
const provinces = [
  "Phnom Penh",
  "Banteay Meanchey",
  "Battambang",
  "Kampong Cham",
  "Kampong Chhnang",
  "Kampong Speu",
  "Kampong Thom",
  "Kampot",
  "Kandal",
  "Kep",
  "Koh Kong",
  "Kratie",
  "Mondulkiri",
  "Oddar Meanchey",
  "Pailin",
  "Preah Sihanouk",
  "Preah Vihear",
  "Pursat",
  "Ratanakiri",
  "Siem Reap",
  "Stung Treng",
  "Svay Rieng",
  "Takeo",
  "Tboung Khmum",
];

const StudentForm = ({ isOpen, onClose, editStudent = null }) => {
  // Form state
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get store methods
  const addStudent = useStudentStore((state) => state.addStudent);
  const editStudentFn = useStudentStore((state) => state.editStudent);

  // Toast for notifications
  const toast = useToast();

  // Populate form when editing
  useEffect(() => {
    if (editStudent) {
      setFormData({
        student_name: editStudent.student_name || "",
        BOD: editStudent.BOD || "",
        Department: editStudent.Department || "",
        Major: editStudent.Major || "",
        Year: editStudent.Year || 1,
        class: editStudent.class || "",
        Province: editStudent.Province || "",
      });
    } else {
      setFormData(initialFormState);
    }
  }, [editStudent, isOpen]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Reset major when department changes
      ...(name === "Department" ? { Major: "" } : {}),
    }));
  };

  // Handle year change
  const handleYearChange = (valueString, valueNumber) => {
    setFormData((prev) => ({
      ...prev,
      Year: valueNumber || 1,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let success;
      if (editStudent) {
        // Update existing student
        success = await editStudentFn(editStudent.id, formData);
        if (success) {
          toast({
            title: "Student updated",
            description: "Student information has been updated successfully.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }
      } else {
        // Create new student
        success = await addStudent(formData);
        if (success) {
          toast({
            title: "Student created",
            description: "New student has been added successfully.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }
      }

      if (success) {
        onClose();
        setFormData(initialFormState);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get available majors based on selected department
  const availableMajors = formData.Department
    ? majors[formData.Department] || []
    : [];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader borderBottom="1px" borderColor="gray.200">
            {editStudent ? "Edit Student" : "Add New Student"}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody py={6}>
            <VStack spacing={4}>
              {/* Student Name */}
              <FormControl isRequired>
                <FormLabel>Student Name</FormLabel>
                <Input
                  name="student_name"
                  value={formData.student_name}
                  onChange={handleChange}
                  placeholder="Enter student name"
                />
              </FormControl>

              {/* Date of Birth */}
              <FormControl isRequired>
                <FormLabel>Date of Birth</FormLabel>
                <Input
                  name="BOD"
                  type="date"
                  value={formData.BOD}
                  onChange={handleChange}
                />
              </FormControl>

              {/* Department */}
              <FormControl isRequired>
                <FormLabel>Department</FormLabel>
                <Select
                  name="Department"
                  value={formData.Department}
                  onChange={handleChange}
                  placeholder="Select department"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </Select>
              </FormControl>

              {/* Major */}
              <FormControl isRequired>
                <FormLabel>Major</FormLabel>
                <Select
                  name="Major"
                  value={formData.Major}
                  onChange={handleChange}
                  placeholder="Select major"
                  isDisabled={!formData.Department}
                >
                  {availableMajors.map((major) => (
                    <option key={major} value={major}>
                      {major}
                    </option>
                  ))}
                </Select>
              </FormControl>

              {/* Year */}
              <FormControl isRequired>
                <FormLabel>Year</FormLabel>
                <NumberInput
                  value={formData.Year}
                  onChange={handleYearChange}
                  min={1}
                  max={6}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              {/* Class */}
              <FormControl isRequired>
                <FormLabel>Class</FormLabel>
                <Input
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  placeholder="e.g., CS-301"
                />
              </FormControl>

              {/* Province */}
              <FormControl isRequired>
                <FormLabel>Province</FormLabel>
                <Select
                  name="Province"
                  value={formData.Province}
                  onChange={handleChange}
                  placeholder="Select province"
                >
                  {provinces.map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter borderTop="1px" borderColor="gray.200">
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              colorScheme="blue"
              isLoading={isSubmitting}
              loadingText={editStudent ? "Updating..." : "Creating..."}
            >
              {editStudent ? "Update Student" : "Add Student"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default StudentForm;

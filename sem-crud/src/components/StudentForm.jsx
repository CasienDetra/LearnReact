import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { departments, majors, provinces, classes } from '../constants/studentOptions';

const StudentForm = ({ student, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    student_id: '',
    stu_name: '',
    BOD: '',
    Department: '',
    Major: '',
    Contact: '',
    Province: '',
    class: '',
  });

  useEffect(() => {
    if (student) {
      setFormData(student);
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      student_id: '',
      stu_name: '',
      BOD: '',
      Department: '',
      Major: '',
      Contact: '',
      Province: '',
      class: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Student ID</FormLabel>
          <Input
            name="student_id"
            value={formData.student_id}
            onChange={handleChange}
            disabled={!!student}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Student Name</FormLabel>
          <Input
            name="stu_name"
            value={formData.stu_name}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Birth Date</FormLabel>
          <Input
            type="date"
            name="BOD"
            value={formData.BOD}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Department</FormLabel>
          <Select
            name="Department"
            placeholder="Select department"
            value={formData.Department}
            onChange={handleChange}
          >
            {departments.map((dep) => (
              <option key={dep} value={dep}>
                {dep}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Major</FormLabel>
          <Select
            name="Major"
            placeholder="Select major"
            value={formData.Major}
            onChange={handleChange}
            disabled={!formData.Department}
          >
            {formData.Department &&
              majors[formData.Department]?.map((major) => (
                <option key={major} value={major}>
                  {major}
                </option>
              ))}
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Contact</FormLabel>
          <Input
            type="tel"
            name="Contact"
            value={formData.Contact}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Province</FormLabel>
          <Select
            name="Province"
            placeholder="Select province"
            value={formData.Province}
            onChange={handleChange}
          >
            {provinces.map((prov) => (
              <option key={prov} value={prov}>
                {prov}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Class</FormLabel>
          <Select
            name="class"
            placeholder="Select class"
            value={formData.class}
            onChange={handleChange}
          >
            {classes.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </FormControl>
        <HStack spacing={4} justifyContent="flex-end">
          <Button colorScheme="blue" type="submit">
            {student ? 'Update Student' : 'Add Student'}
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </HStack>
      </VStack>
    </form>
  );
};

export default StudentForm;

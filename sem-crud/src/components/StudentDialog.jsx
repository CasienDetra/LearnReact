import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import StudentForm from './StudentForm';

const StudentDialog = ({ isOpen, onClose, student, onSubmit }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{student ? 'Edit Student' : 'Add Student'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <StudentForm
            student={student}
            onSubmit={(data) => {
              onSubmit(data);
              onClose();
            }}
            onCancel={onClose}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default StudentDialog;

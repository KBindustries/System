import React from "react";

import { Modal, ModalHeader, ModalBody } from "@windmill/react-ui";

import TeacherForm from "./TeacherForm";
import TeacherEditForm from "./TeacherEditForm";

function TeacherModal({
  openModal,
  closeModal,
  isModalOpen,
  openEditModal,
  getTeacher,
  specialties,
  fetchTeachers = () => {},
}) {
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Teacher</ModalHeader>
        <ModalBody>
          {getTeacher ? (
            <TeacherEditForm
              closeModal={closeModal}
              getTeacher={getTeacher}
              fetchTeachers={fetchTeachers}
            />
          ) : (
            <TeacherForm
              closeModal={closeModal}
              fetchTeachers={fetchTeachers}
            />
          )}
        </ModalBody>
      </Modal>
    </>
  );
}

export default TeacherModal;

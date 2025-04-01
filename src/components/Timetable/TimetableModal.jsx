import React from "react";

import { Modal, ModalHeader, ModalBody } from "@windmill/react-ui";
// import TimetableEditForm from "./TimetableEditForm";
import TimetableForm from "./TimetableForm";

function TimetableModal({
  openModal,
  closeModal,
  isModalOpen,
  openEditModal,
  fetchData,
  Teachers,
  Courses,
  Specialties,
}) {
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>User</ModalHeader>
        <ModalBody>
          {
            <TimetableForm
              fetchData={fetchData}
              closeModal={closeModal}
              Courses={Courses}
              Teachers={Teachers}
              Specialties={Specialties}
            />
          }
        </ModalBody>
      </Modal>
    </>
  );
}

export default TimetableModal;

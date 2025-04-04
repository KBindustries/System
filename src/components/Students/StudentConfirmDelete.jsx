import React, { useState } from "react";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@windmill/react-ui";
import axios from "axios";
const API_URL = "http://localhost:4000/students";

function StudentConfirmDelete({
  openModal,
  closeModal,
  isModalOpen,
  openDeleteModal,
  getStudent,
  fetchStudents = () => {},
}) {
  const deleteStudent = async (id) => {
    console.log({ id });
    try {
      await axios
        .delete(`${API_URL}/${id}`)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    } finally {
      closeModal();
      fetchStudents();
    }
  };
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Course</ModalHeader>
        <ModalBody>
          Are You Sure You Want To Delete
          <div className="flex flex-row justify-between mt-5">
            <div className="hidden sm:block">
              <Button layout="outline" onClick={closeModal}>
                Cancel
              </Button>
            </div>
            <div className="hidden sm:block">
              <Button
                onClick={() => deleteStudent(getStudent._id)}
                type="submit"
              >
                Accept
              </Button>
            </div>
            <div className="block w-full sm:hidden">
              <Button block size="large" layout="outline" onClick={closeModal}>
                Cancel
              </Button>
            </div>
            <div className="block w-full sm:hidden">
              <Button
                onClick={() => deleteStudent(getStudent._id)}
                block
                size="large"
                type="submit"
              >
                Accept
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default StudentConfirmDelete;

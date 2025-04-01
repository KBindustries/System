import React from "react";

import { Modal, ModalHeader, ModalBody, Button } from "@windmill/react-ui";
import axios from "axios";
const API_URL = "http://localhost:4000/teachers";

function TeacherConfirmDelete({
  openModal,
  closeModal,
  isModalOpen,
  openDeleteModal,
  getTeacher,
  fetchTeachers = () => {},
}) {
  const deleteTeacher = async (id) => {
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
      fetchTeachers();
    }
  };
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Teacher</ModalHeader>
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
                onClick={() => deleteTeacher(getTeacher?._id)}
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
                onClick={() => deleteTeacher(getTeacher?._id)}
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

export default TeacherConfirmDelete;

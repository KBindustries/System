import React from 'react'


import { Modal, ModalHeader, ModalBody, ModalFooter,  } from '@windmill/react-ui'
// import AttendanceEditForm from './AttendanceEditForm'
// import AttendanceForm from './AttendanceForm'


function AttendanceModal({openModal, closeModal,isModalOpen, openEditModal, getCourse, getSpecialties }) {

  return (
    <>
      
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Course</ModalHeader>
        <ModalBody>
          {/* {getCourse? <CourseEditForm getCourse={getCourse} closeModal={closeModal} getSpecialties={getSpecialties} /> : <CourseForm closeModal={closeModal} getSpecialties={getSpecialties} /> } */}
         {/* <SpecialtyForm getSpecialty={getSpecialty}/> */}
        </ModalBody>
        <ModalFooter>
          {/* I don't like this approach. Consider passing a prop to ModalFooter
           * that if present, would duplicate the buttons in a way similar to this.
           * Or, maybe find some way to pass something like size="large md:regular"
           * to Button
           */}
        
        </ModalFooter>
      </Modal>
    </>
  )
}

export default AttendanceModal

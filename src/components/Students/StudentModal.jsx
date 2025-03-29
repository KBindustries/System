import React from 'react'

import { Modal, ModalHeader, ModalBody, ModalFooter,  } from '@windmill/react-ui'
import StudentEditForm from './StudentEditForm'
import StudentForm from  './StudentForm'


function StudentModal({openModal, closeModal,isModalOpen, openEditModal, getStudent,specialties }) {

  return (
    <>
      
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Student</ModalHeader>
        <ModalBody>
          {getStudent? <StudentEditForm  closeModal={closeModal} getStudent={getStudent} specialties={specialties} /> : <StudentForm specialties={specialties} closeModal={closeModal}  /> }
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

export default StudentModal

import React from 'react'


import { Modal, ModalHeader, ModalBody, ModalFooter,  } from '@windmill/react-ui'
import TimetableEditForm from'./TimetableEditForm'
import TimetableForm from './TimetableForm'



function TimetableModal({openModal, closeModal,isModalOpen, openEditModal, fetchData,Teachers, Courses }) {

  return (
    <>
      
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>User</ModalHeader>
        <ModalBody>
          { <TimetableForm  fetchData={fetchData} closeModal={closeModal} Courses={Courses} Teachers={Teachers}  /> 
          // : <TimetableEditForm closeModal={closeModal} fetchData={fetchData} getSpecialties={getSpecialties} /> 
          }
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

export default TimetableModal

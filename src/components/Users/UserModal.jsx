import React from 'react'


import { Modal, ModalHeader, ModalBody, ModalFooter,  } from '@windmill/react-ui'
import UserForm from './UserForm'
import UserEditForm from './UserEditForm'



function UserModal({openModal, closeModal,isModalOpen, openEditModal, getUser, getSpecialties, fetchData }) {

  return (
    <>
      
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>User</ModalHeader>
        <ModalBody>
          {getUser? <UserEditForm getUser={getUser} fetchData={fetchData} closeModal={closeModal} getSpecialties={getSpecialties} /> 
          : <UserForm closeModal={closeModal} fetchData={fetchData} getSpecialties={getSpecialties} /> }
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

export default UserModal

import React, { useState } from 'react'

import PageTitle from '../Typography/PageTitle'
import CTA from '../CTA'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui'
import SpecialtyForm from './SpecialtyForm'
import SpecialtyEditForm from './SpecialtyEditFrom'

function SpecialtyModal({openModal, closeModal,isModalOpen, openEditModal, getSpecialty, fetchSpecialties }) {

  return (
    <>
      
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Specialty</ModalHeader>
        <ModalBody>
          {getSpecialty? <SpecialtyEditForm fetchSpecialties={fetchSpecialties} getSpecialty={getSpecialty} closeModal={closeModal} /> 
          : <SpecialtyForm fetchSpecialties={fetchSpecialties} closeModal={closeModal}/> }
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

export default SpecialtyModal

import React from 'react'


import { Modal, ModalHeader, ModalBody, ModalFooter,  } from '@windmill/react-ui'
// import CourseForm from './CourseForm'
import AnnouncementForm from './AnnouncementForm'
import AnnouncementEditForm from './AnnouncementEditForm'
// import CourseEditForm from './CouseEditForm'



function AnnouncementModal({openModal, closeModal,isModalOpen, openEditModal, getAnnouncement, getSpecialties }) {

  return (
    <>
      
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Announcement</ModalHeader>
        <ModalBody>
          {getAnnouncement? <AnnouncementEditForm getAnnouncement={getAnnouncement} closeModal={closeModal} getSpecialties={getSpecialties} />
           : 
           <AnnouncementForm closeModal={closeModal} getSpecialties={getSpecialties} getAnnouncement={getAnnouncement} /> }
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

export default AnnouncementModal

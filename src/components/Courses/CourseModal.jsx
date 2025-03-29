import React from 'react'


import { Modal, ModalHeader, ModalBody, ModalFooter,  } from '@windmill/react-ui'
import CourseForm from './CourseForm'
import CourseEditForm from './CouseEditForm'



function CourseModal({openModal, closeModal,isModalOpen, openEditModal, getCourse, specialties , fetchCourses}) {

  return (
    <>
      
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Course</ModalHeader>
        <ModalBody>
          {getCourse? <CourseEditForm getCourse={getCourse} fetchCourses={fetchCourses} closeModal={closeModal} specialties={specialties} /> 
          : <CourseForm closeModal={closeModal} fetchCourses={fetchCourses} specialties={specialties} /> }
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

export default CourseModal

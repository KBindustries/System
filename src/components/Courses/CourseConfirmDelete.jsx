import React, { useState } from 'react'

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui'
import {deleteCourse} from '../../services/CourseService'


function CourseConfirmDelete({ openModal, closeModal, isModalOpen, openDeleteModal , fetchCourses, getCourse}) {

    const delSpecialty = async () => {
        console.log(getCourse._id)
        const courseId = getCourse._id

        try {
          const CourseData = await deleteCourse(courseId);
        closeModal();
        fetchCourses();
        } catch (error) {
          console.log('Error:', error);
        }
      };

    return (
        <>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalHeader>Course</ModalHeader>
                <ModalBody>
                    Are You Sure You Want To Delete
                    <div className='flex flex-row justify-between mt-5'>
                        <div className="hidden sm:block">
                            <Button layout="outline" onClick={closeModal}>
                                Cancel
                            </Button>
                        </div>
                        <div className="hidden sm:block">
                            <Button onClick={delSpecialty} type="submit">Accept</Button>
                        </div>
                        <div className="block w-full sm:hidden">
                            <Button block size="large" layout="outline" onClick={closeModal}>
                                Cancel
                            </Button>
                        </div>
                        <div className="block w-full sm:hidden">
                            <Button onClick={delSpecialty} block size="large" type="submit">
                                Accept
                            </Button>
                        </div>
                    </div>
                </ModalBody>

            </Modal>
        </>
    )
}

export default CourseConfirmDelete

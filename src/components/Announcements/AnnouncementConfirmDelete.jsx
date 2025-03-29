import React, { useState } from 'react'

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui'


function AnnouncementConfirmDelete({ openModal, closeModal, isModalOpen, openDeleteModal }) {

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
                            <Button type="submit">Accept</Button>
                        </div>
                        <div className="block w-full sm:hidden">
                            <Button block size="large" layout="outline" onClick={closeModal}>
                                Cancel
                            </Button>
                        </div>
                        <div className="block w-full sm:hidden">
                            <Button block size="large" type="submit">
                                Accept
                            </Button>
                        </div>
                    </div>
                </ModalBody>

            </Modal>
        </>
    )
}

export default AnnouncementConfirmDelete

import React, { useState, useEffect } from 'react'

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui'
import { deleteSpecialty } from '../../services/SpecialtyService';

function SpecialtyConfirmDelete({ openModal, closeModal, isModalOpen, openDeleteModal, fetchSpecialties, getSpecialty }) {

    const delSpecialty = async () => {
        console.log(getSpecialty._id)
        const specialtyId = getSpecialty._id

        try {
          const specialtiesData = await deleteSpecialty(specialtyId);
        //   setSpecialties(specialtiesData);
        closeModal();
        fetchSpecialties();
        } catch (error) {
          console.log('Error:', error);
        }
      };
    //   useEffect(() =>{
    //     console.log(getSpecialty._id)
    //   }, [])
    return (
        <>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalHeader>Specialty</ModalHeader>
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

export default SpecialtyConfirmDelete

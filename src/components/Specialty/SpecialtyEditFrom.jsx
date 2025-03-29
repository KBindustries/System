import React, { useState } from 'react'
import { Input, Label, Button } from '@windmill/react-ui'
import axios from 'axios';
import { editSpecialty } from '../../services/SpecialtyService';

const API_URL = "http://localhost:4000/specialties"

// A custom hook to handle form inputs
const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    return [values, handleChange];
};


function SpecialtyEditForm({ getSpecialty, closeModal, fetchSpecialties }) {
    // Use the custom hook with the initial data
    const [values, handleChange] = useForm(getSpecialty);
    // A function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Do something with the values here
        console.log(values);
        const specialtyId = values._id

        

        const specialtyData  = {
            name: values.name,
            level: values.level,
            academic_year: values.academic_year,
            total_fee: values.total_fee,
            fees: {
                ...(values.first_installment && { first_installment: values.first_installment }),
                ...(values.second_installment && { second_installment: values.second_installment }),
                ...(values.third_installment && { third_installment: values.third_installment }),
              },
            fee_check: values.fee_check
        };
        try {
            const updatedSpecialty = await editSpecialty(specialtyId, specialtyData);
            console.log('Updated Specialty:', updatedSpecialty);
            fetchSpecialties();
            // Handle success case, such as displaying a success message or redirecting
          } catch (error) {
            console.error('Error:', error);
            // Handle error case, such as displaying an error message
          }
    };


    return (
        <>
            <div className="rounded-sm  shadow-default bg-bgray-800">
                <div className="border-b border-stroke py-4 px-6.5 ">
                    <h3 className="font-medium ">
                        Specialty Edit Form
                    </h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6.5">
                        <div className="mb-4.5 py-3">
                            <label className="mb-2.5 block ">
                                Name
                            </label>
                            <input
                                type="text"
                                id='name'
                                name='name'
                                value={values.name}
                                onChange={handleChange}
                                placeholder={values.name}
                                className="w-full rounded border-2 border-gray-700 bg-transparent py-3 px-5 font-medium outline-none transition "
                            />
                        </div>

                        <div className="mb-4.5 py-3">
                            <label className="mb-2.5 block">
                                Level
                            </label>
                            <input
                                type="number"
                                id='level'
                                name='level'
                                value={values.level}
                                onChange={handleChange}
                                placeholder="Enter level"
                                className="w-full rounded border-2 border-gray-700 bg-transparent py-3 px-5 font-medium outline-none transition "
                            />
                        </div>

                        <div className="mb-4.5 py-3">
                            <label className="mb-2.5 block ">
                                Total fee
                            </label>
                            <input
                                type="number"
                                id='total_fee'
                                name='total_fee'
                                value={values.total_fee}
                                onChange={handleChange}
                                placeholder="Enter total fee"
                                className="w-full rounded border-2 border-gray-700 bg-transparent py-3 px-5 font-medium outline-none transition "
                            />
                        </div>

                        <div className="mb-4.5 py-3">
                            <label className="mb-2.5 block ">
                                First Installment
                            </label>
                            <input
                                type="number"
                                id='fees.first_installment'
                                name='first_installment'
                                value={values.fees.first_installment}
                                onChange={handleChange}
                                placeholder="Enter first installment"
                                className="w-full rounded border-2 border-gray-700 bg-transparent py-3 px-5 font-medium outline-none transition"
                            />
                        </div>

                        <div className="mb-4.5 py-3">
                            <label className="mb-2.5 block ">
                                Second Installment
                            </label>
                            <input
                                type="number"
                                id='fees.second_installment'
                                name='fees.second_installment'
                                value={values.fees.second_installment}
                                onChange={handleChange}
                                placeholder="Enter second installment"
                                className="w-full rounded border-2 border-gray-700 bg-transparent py-3 px-5 font-medium outline-none transition "
                            />
                        </div>

                        <div className="mb-4.5 py-3">
                            <label className="mb-2.5 block ">
                                Third Installment
                            </label>
                            <input
                                type="number"
                                id='fees.third_installment'
                                name='fees.third_installment'
                                value={values.fees.third_installment}
                                onChange={handleChange}
                                placeholder="Enter third installment"
                                className="w-full rounded border-2 border-gray-700 bg-transparent py-3 px-5 font-medium outline-none transition "
                            />
                        </div>
                        <div className="mt-5 mb-5.5 flex items-center justify-between">
                            <Label className="mt-6" check>
                                <Input type="checkbox"
                                    id={values.fee_check.toString()}
                                    name='fee_check'
                                    checked={values.fee_check}
                                    onChange={handleChange}
                                />
                                <span className="ml-2">
                                    Fee check
                                </span>
                            </Label>
                        </div>
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
                    </div>
                </form>
            </div>
        </>
    )
}

export default SpecialtyEditForm
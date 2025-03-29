import React, { useState } from 'react'
import {  Label, Button, Select } from '@windmill/react-ui'
import axios from 'axios';

const API_URL = "http://localhost:4000/attendances"

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

function StudentEditForm ({getStudent, closeModal, specialties}){

      // Use the custom hook with the initial data
      const [values, handleChange] = useForm(getStudent);

      // A function to handle form submission
      const handleSubmit = (e) => {
          e.preventDefault();
          // Do something with the values here
          console.log(values);

          const data = {
            name: values.name,
            email: values.email,
            imageUrl: values.imageUrl,
            phone: values.phone,
            fee_paid: values.fee_paid,
            specialty_id: values.specialty_id,
           
        }
        axios.put(`${API_URL}/${values._id}`, data)
        .then(response => {
            console.log(response)
        }).catch(error => {
            console.error(error)
        })
        }

    return(
        <>
         <div className="rounded-sm  shadow-default bg-bgray-800">
                <div className="border-b border-stroke py-4 px-6.5 ">
                    <h3 className="font-medium ">
                        Edit Student Form
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
                                id="name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                placeholder="Enter your student name"
                                className="w-full rounded border-2 border-gray-700 bg-transparent py-3 px-5 font-medium outline-none transition "
                            />
                        </div>
                        <div className="mb-4.5 py-3">
                            <label className="mb-2.5 block ">
                                Email
                            </label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                placeholder="Enter your student email"
                                className="w-full rounded border-2 border-gray-700 bg-transparent py-3 px-5 font-medium outline-none transition "
                            />
                        </div>
                        <div className="mb-4.5 py-3">
                            <label className="mb-2.5 block ">
                                Avatar
                            </label>
                            <input
                                type="text"
                                id="imageUrl"
                                name="imageUrl"
                                value={values.avatar}
                                onChange={handleChange}
                                placeholder="Enter avatar url"
                                className="w-full rounded border-2 border-gray-700 bg-transparent py-3 px-5 font-medium outline-none transition "
                            />
                        </div>
                        <div className="mb-4.5 py-3">
                            <label className="mb-2.5 block ">
                                Phone
                            </label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={values.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                                className="w-full rounded border-2 border-gray-700 bg-transparent py-3 px-5 font-medium outline-none transition "
                            />
                        </div>
                        <div className="mb-4.5 py-3">
                            <label className="mb-2.5 block ">
                                Fee Paid
                            </label>
                            <input
                                type="text"
                                id="fee_paid"
                                name="fee_paid"
                                value={values.fee_paid}
                                onChange={handleChange}
                                placeholder="Enter your course name"
                                className="w-full rounded border-2 border-gray-700 bg-transparent py-3 px-5 font-medium outline-none transition "
                            />
                        </div>

                        <Label className="mt-4">
                            <span>Requested Limit</span>
                            <Select className="mt-1"
                                value={values.specialty_id}
                                onChange={handleChange}>
                                <option disabled defaultValue>Select Specialty</option>
                                {specialties.map((item) => (
                                    <option key={item._id} value={item._id}>{item.name}</option>
                                ))}
                            </Select>
                            </Label>

                        
                       
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
};

export default StudentEditForm
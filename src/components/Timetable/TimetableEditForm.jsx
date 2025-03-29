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

function TimetableEditForm ({getStudent, closeModal, specialties}){

      // Use the custom hook with the initial data
      const [values, handleChange] = useForm(getStudent);

      // A function to handle form submission
      const handleSubmit = (e) => {
          e.preventDefault();
          // Do something with the values here
          console.log(values);

          const data = {
            name: values.weekSatartDate,
            email: values.teacher,
            imageUrl: values.course,
            phone: values.day,
            fee_paid: values.time,
           
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
                        Edit Timetable Form
                    </h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6.5">
                        <div className="mb-4.5 py-3">
                            <label className="mb-2.5 block ">
                                Week Start Date
                            </label>
                            <input
                                type="text"
                                id="weekStartDate"
                                name="weekStartDate"
                                value={values.weekStartDate}
                                onChange={handleChange}
                                placeholder="Enter the week start date"
                                className="w-full rounded border-2 border-gray-700 bg-transparent py-3 px-5 font-medium outline-none transition "
                            />
                        </div>
                        <div className='flex'>
                            <div className="mb-4.5 py-3">
                                <label className="mb-2.5 block ">
                                    Teacher
                                </label>
                                <input
                                    type="text"
                                    id="teacher"
                                    name="teacher"
                                    value={values.teacher}
                                    onChange={handleChange}
                                    placeholder="Enter teacher's name"
                                    className="w-full rounded border-2 border-gray-700 bg-transparent py-3 px-5 font-medium outline-none transition "
                                />
                            </div>
                            <div className="mb-4.5 py-3">
                                <label className="mb-2.5 block ">
                                    Course
                                </label>
                                <input
                                    type="text"
                                    id="course"
                                    name="course"
                                    value={values.course}
                                    onChange={handleChange}
                                    placeholder="Enter course name"
                                    className="w-full rounded border-2 border-gray-700 bg-transparent py-3 px-5 font-medium outline-none transition "
                                />
                            </div>
                        </div>
                        <div className='flex'>
                            <div className="mb-4.5 py-3">
                                <label className="mb-2.5 block ">
                                    Day
                                </label>
                                <input
                                    type="text"
                                    id="day"
                                    name="day"
                                    value={values.day}
                                    onChange={handleChange}
                                    placeholder="Enter the day"
                                    className="w-full rounded border-2 border-gray-700 bg-transparent py-3 px-5 font-medium outline-none transition "
                                />
                            </div>
                            <div className="mb-4.5 py-3">
                                <label className="mb-2.5 block ">
                                    Time
                                </label>
                                <input
                                    type="text"
                                    id="time"
                                    name="time"
                                    value={values.time}
                                    onChange={handleChange}
                                    placeholder="Enter course time period"
                                    className="w-full rounded border-2 border-gray-700 bg-transparent py-3 px-5 font-medium outline-none transition "
                                />
                            </div>
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
};

export default TimetableEditForm
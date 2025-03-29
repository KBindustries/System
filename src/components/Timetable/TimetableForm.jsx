import React, { useState } from 'react'
import { Button, Label, Select, Input } from '@windmill/react-ui'
import axios from 'axios'

const API_URL = "http://localhost:4000/timetables"

function TimetableForm({ closeModal, Teachers, Courses,fetchData }) {
    const [weekStartDate, setWeekStartDate] = useState('')
    const [course, setCourse] = useState('')
    const [teacher, setTeacher] = useState('')
    const [day, setDay] = useState('')
    const [time, setTime] = useState('')
    const [timetableArray, setTimetableArray] = useState([
        {
            teacher: '',
            course: '',
            day: '',
            time: '',
        },
    ]);
    const [timetableHistory, setTimetableHistory] = useState([]);


    const handleAddTimetable = () => {
        setTimetableHistory((prevHistory) => [...prevHistory, timetableArray]);
        const newTimetableEntry = {
            teacher: '',
            course: '',
            day: '',
            time: '',
        };
        setTimetableArray((prevTimetable) => [...prevTimetable, newTimetableEntry]);
    };

    const handleUndo = () => {
        if (timetableHistory.length > 0) {
            const prevTimetableArray = timetableHistory[timetableHistory.length - 1];
            setTimetableHistory((prevHistory) => prevHistory.slice(0, prevHistory.length - 1));
            setTimetableArray(prevTimetableArray);
        }
    };

    // const handleTimetableChange = (e, index, field) => {
    //     const { value } = e.target;
    //     setTimetableArray((prevTimetable) => {
    //         const updatedTimetable = [...prevTimetable];
    //         updatedTimetable[index][field] = value;
    //         return updatedTimetable;
    //     });
    // };
    const handleTimetableChange = (e, index, field) => {
        const { value } = e.target;
        setTimetableArray((prevTimetable) => {
            const updatedTimetable = prevTimetable.map((entry, i) => {
                if (i === index) {
                    return { ...entry, [field]: value };
                } else {
                    return entry;
                }
            });
            return updatedTimetable;
        });
    };




    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            weekStartDate: weekStartDate,
            timetable: timetableArray.map((entry) => ({
                course: entry.course,
                teacher: entry.teacher,
                day: entry.day,
                time: entry.time,
            })),
        };

        console.log(data)

        axios.post(`${API_URL}`, data)
            .then(response => {
                console.log(response)
            }).catch(error => {
                console.error(error)
            });
            fetchData();

    }

    return (
        <>
            <div className="rounded-sm  shadow-default bg-bgray-800">
                <div className="border-b border-stroke py-4 px-6.5 ">
                    <h3 className="font-medium ">
                        Add Timetable Form
                    </h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6.5">
                        <div className="mb-4.5 py-3">
                            <label className="mb-2.5 block ">
                                Week Start Date
                            </label>
                            <Input
                                id="weekStartDate"
                                name="weekStartDate"
                                value={weekStartDate}
                                onChange={(e) => setWeekStartDate(e.target.value)}
                                type="date" className='w-4 mt-4 ' placeholder="select date" />

                        </div>

                        {/* timetable array */}
                        {timetableArray.map((entry, index) => (
                            <div className='border-b border-stroke'>

                                <div className='flex justify-between'>
                                    <Label className="mt-2">
                                        <span>Teacher</span>
                                        <Select className="py-3"
                                            id={`teacher-${index}`}
                                            value={entry.teacher}
                                            onChange={(e) => handleTimetableChange(e, index, 'teacher')}>
                                            {/* <option disabled >Select Teacher</option> */}
                                            {Teachers.map((item) => (
                                                <option key={item._id} value={item._id}>{item.name}</option>
                                            ))}
                                        </Select>
                                    </Label>
                                    <Label className="mt-2">
                                        <span>Course</span>
                                        <Select className="py-3"
                                            id={`course-${index}`}
                                            value={entry.course}
                                            onChange={(e) => handleTimetableChange(e, index, 'course')}>
                                            {/* <option disabled defaultValue>Select Course</option> */}
                                            {Courses.map((item) => (
                                                <option key={item._id} value={item._id}>{item.name}</option>
                                            ))}
                                        </Select>
                                    </Label>

                                </div>

                                <div className='flex justify-between'>
                                    <div className="mb-4.5 py-3">
                                        <label className="mb-2.5 block">Day</label>
                                        <input
                                            type="text"
                                            id={`day-${index}`}
                                            name="day"
                                            value={entry.day}
                                            onChange={(e) => handleTimetableChange(e, index, "day")}
                                            placeholder="Enter the day"
                                            className="w-full rounded border-2 border-gray-700 bg-transparent py-3 px-5 font-medium outline-none transition"
                                        />

                                    </div>
                                    <div className="mb-4.5 py-3">
                                        <label className="mb-2.5 block">Time</label>
                                        <input
                                            type="text"
                                            name="time"
                                            value={entry.time}
                                            onChange={(e) => handleTimetableChange(e, index, "time")}
                                            placeholder="Enter course time period"
                                            className="w-full rounded border-2 border-gray-700 bg-transparent py-3 px-5 font-medium outline-none transition"
                                        />

                                    </div>

                                </div>
                            </div>


                        ))}


                        {/*end of timetable arrayy  */}
                        {/* add button and undo button*/}

                        <div className='flex justify-between mt-5'>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                onClick={handleAddTimetable}
                                style={{ cursor: 'pointer' }}
                                viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                            </svg>
                            {timetableHistory.length > 0 && (<svg
                                onClick={handleUndo}
                                style={{ cursor: 'pointer' }}
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z" clipRule="evenodd" />
                            </svg>)}

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

export default TimetableForm;
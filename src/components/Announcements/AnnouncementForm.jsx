import React, { useState } from 'react'
import {  Button , Label, Select} from '@windmill/react-ui'
import axios from 'axios'

const API_URL = "http://localhost:4000/announcements"

function AnnouncementForm({closeModal, getSpecialties, getAnnouncement }){
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [specialty, setSpecialty] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            title: title,
            content: content,
            specialty: specialty,
        }

        axios.post(`${API_URL}`, data)
            .then(response => {
                console.log(response);
                getAnnouncement();
                closeModal()
            }).catch(error => {
                console.error(error)
            })

    }

    return(
        <>
         <div className="rounded-sm  shadow-default bg-bgray-800">
                <div className="border-b border-stroke py-4 px-6.5 ">
                    <h3 className="font-medium ">
                        Add Announcement Form
                    </h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6.5">
                        <div className="mb-4.5 py-3">
                            <label className="mb-2.5 block ">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter your title"
                                className="w-full rounded border-2 border-gray-700 bg-transparent py-3 px-5 font-medium outline-none transition "
                            />
                        </div>
                        <div className="mb-4.5 py-3">
                            <label className="mb-2.5 block ">
                                Content
                            </label>
                            <input
                                type="textarea"
                                id='content'
                                name='content'
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Type in the details of your announcement"
                                className="w-full rounded border-2 border-gray-700 bg-transparent py-3 px-5 font-medium outline-none transition "
                            />
                        </div>

                        <Label className="mt-4">
                            <span>Specialty</span>
                            <Select className="mt-1"
                                value={specialty}
                                onChange={(e) => setSpecialty(e.target.value)}>
                                <option disabled defaultValue>Select Specialty</option>
                                {getSpecialties.map((item) => (
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

export default AnnouncementForm;
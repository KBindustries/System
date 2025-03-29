import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PageTitle from '../components/Typography/PageTitle'
import Filter from '../components/Filter'
import {
    TableBody,
    TableContainer,
    Table,
    TableHeader,
    TableCell,
    TableRow,
    TableFooter,
    Button,

} from '@windmill/react-ui'

// const API_URL = "http://localhost:4000/courses"
const API_SPECIALTY_URL = "http://localhost:4000/specialties"
const API_URL = "http://localhost:4000/feedbacks"


function StudentRequestTable() {

    const [request, setRequest] = useState([]);
    const [getSpecialties, setGetSpecialties] = useState([])

    // A state for the search value
    const [search, setSearch] = useState("");

    // A handler for the search input change
    const handleSearch = (event) => {
        setSearch(event.target.value);
    };


    // A function to filter the data based on the search value
    const filteredData = request?.filter(
        (item) =>
            item.title?.toLowerCase().includes(search.toLowerCase()) ||
            item.specialty.name?.toLowerCase().includes(search.toLowerCase()) ||
            item.specialty.title?.toLowerCase().includes(search.toLowerCase()) ||
            item.specialty.level?.toString().includes(search)
    );

    // function openModal() {
    //     setIsModalOpen(true)
    //   }

    //   const openEditModal = async(e) => {
    //       setIsModalOpen(true)
    //       console.log(e)
    //       const response = await axios.get(`${API_URL}/${e}`)
    //       console.log(response.data.data)
    //       setGetAnnouncement(response.data.data)
    //   }

    //   function closeModal() {
    //     setIsModalOpen(false)
    //   }
    //   const fetchSpecialties = async () => {
    //     const response = await axios.get(`${API_SPECIALTY_URL}`);
    //     setGetSpecialties(response.data.data);
    // }

    const toggleRead = async (e)=>{
        const response = await axios.put(`${API_URL}/read/${e}`);
        console.log(response)
        fetchData()
    }


    const fetchData = async () => {
        const response = await axios.get(`${API_URL}`);
        console.log(response.data.data)
        setRequest(response.data.data);

    }

    useEffect(() => {
        fetchData();
        // fetchSpecialties();

    }, [])

    return (
        <>
            {/* <!-- Search input --> */}
            <div className="flex justify-center flex-1 lg:mr-32 mt-10">
                <Filter value={search} onChange={handleSearch} />
            </div>
            <div className='flex items-center justify-between'>
                <PageTitle>Student Requests</PageTitle>
            </div>


            <TableContainer>
                <Table>
                    <TableHeader>
                        <tr>
                            <TableCell>Title</TableCell>
                            <TableCell>Content</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Specialty</TableCell>
                            <TableCell>Action</TableCell>
                            {/* <TableCell>  <img src={trash}/></TableCell> */}
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {filteredData.map((request, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <span className="text-xs"> {request.title}</span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-xs whitespace-pre-wrap break-words"> {request.content}</span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-xs"> {request.date.split('T')[0]} </span>
                                </TableCell>
                                {/* split(announcement.date) */}
                                <TableCell>
                                    <span className="text-xs"> {request.specialty?.name} </span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm">
                                        
                                        <button  id={request._id}  onClick={() => toggleRead(request._id)}  className="hover:text-primary">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={request.read ? 'green' : 'gray'} className="w-10 h-10">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>

                                        </button>
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
                {filteredData.length < 1 && <TableFooter className="w-full flex justify-center text-xs">
                    --No data--
                </TableFooter>}
            </TableContainer>
        </>
    )
}


export default StudentRequestTable
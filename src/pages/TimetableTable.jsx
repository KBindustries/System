import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import PageTitle from '../components/Typography/PageTitle'
import TimetableModal from '../components/Timetable/TimetableModal'
import Filter from '../components/Filter'
import {  Label, Select, Input } from '@windmill/react-ui';
import { getCourses } from '../services/CourseService'

import { EditIcon, } from '../icons'
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
const API_TEACHERS_URL = "http://localhost:4000/teachers"
const API_SPECIALTY_URL = "http://localhost:4000/specialties"
const API_URL = "http://localhost:4000/timeTables/weeklyTimetable"



  
  

function TimetableTable() {

    const [data, setData] = useState([]);
    const [timetable, setTimetable] = useState([]);
    const [weekstart, setWeekstart] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDelModalOpen, setIsDelModalOpen] = useState(false)
    const [Courses, setCourses] = useState('')
    const [Teachers, setTeachers] = useState('')
    const [specialties, setSpecialties] = useState([]);
    const [mondayOfCurrentWeek, setMondayOfCurrentWeek] = useState('');
    const mondayRef = useRef('');


    // const [specialty, setSpecialty] = useState('');
    const [date, setDate] = useState('');
    const [formData , setFormData] = useState([
        {
            weekStartDate: '',
            specialty:""
        }
    ])
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'weekStartDate') {
          const date = new Date(value);
          value = date.toISOString();
        }
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
      };
    
    // A state for the search value
    const [search, setSearch] = useState("");

    // A handler for the search input change
    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    //functions to handle modals
    function openModal() {
        setIsModalOpen(true)
    }
    function closeModal() {
        setIsModalOpen(false)
    }
    const openEditModal = async (e) => {
        setIsModalOpen(true)
        console.log(e)
        const response = await axios.get(`${API_URL}/${e}`)
        console.log(response.data.data)
        // setGetAnnouncement(response.data.data)
    }

    //functions to handle delete modals 
    function openDeleteModal() {
        setIsDelModalOpen(true)
    }
    function closeDeleteModal() {
        setIsDelModalOpen(false)
    }

    //function to fetch specialties
    const fetchSpecialties = async () => {
        const response = await axios.get(`${API_SPECIALTY_URL}`);
        setSpecialties(response.data.data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('form',formData)
        const response = await axios.post(`${API_URL}`,
        formData);
        console.log(response.data.timetable[0]);
            setData(response.data);
            const week = response.data.weekStartDate.split("T")[0]
            setWeekstart(week)

        };
    const fetchCourses = async () => {
        try {
            const coursesData = await getCourses();
            setCourses(coursesData);
        } catch (error) {
            console.log('Error:', error);
        }
        };
    //to get current monday date for each week    
    useEffect(() => {
        // Function to get the date for Monday of the current week
        const getMondayOfCurrentWeek = () => {
            const currentDate = new Date();
            const currentDay = currentDate.getDay();
            const diff = currentDay === 0 ? -6 : 1 - currentDay; // Adjust for Sunday as the first day of the week
            const monday = new Date(currentDate);
            monday.setDate(currentDate.getDate() + diff);
            return monday.toISOString().split("T")[0];
        };
    
        // Call the function to get the date for Monday of the current week
        const monday = getMondayOfCurrentWeek();
        const dateParts = monday.split("-");
        const year = dateParts[0];
        const month = dateParts[1];
        const day = dateParts[2];
  
  // Creating a new Date object using the input date parts
  const formattedDate = new Date(year, month - 1, day);
  
  // Using toLocaleDateString() to convert to desired format "m/d/yyyy"
  const convertedDate = formattedDate.toLocaleDateString("en-US");
  
        setMondayOfCurrentWeek(convertedDate);
        mondayRef.current = convertedDate; // Store the value in the ref
        }, []);    

  
    //function to fetch announcements
    const fetchData = async () => {
        console.log("test", mondayRef.current);
        const response = await axios.post(`${API_URL}`,
        {
            weekStartDate: mondayRef.current,
            specialtyId: "648f91317dfa27d9439555f8"
          });
        console.log(response.data.timetables);
            setData(response.data.timetables);
        // Access the timetable arrays from the response and store them in the state
      const allTimetables = response.data.timetables.map(item => item.timetable).flat();

      // Create a mapping of day names to numerical values for sorting
      const dayOrder = {
        Sunday: 0,
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6,
      };

      // Sort the timetable entries based on the day names
      allTimetables.sort((a, b) => dayOrder[a.day] - dayOrder[b.day]);

      setTimetable(allTimetables);    
        };


    const fetchTeachers = async () => {
        const response = await axios.get(`${API_TEACHERS_URL}`);
        console.log("teachers",response.data.data);
        setTeachers(response.data.data);
         
        };
     
    useEffect(() => {
        fetchData();
        fetchSpecialties();
        fetchCourses();
        fetchTeachers();

    }, [])

    return (
        <>
            {/* <!-- Search input --> */}
            <div className="flex justify-center flex-1 lg:mr-32 mt-10">
                <Filter value={search} onChange={handleSearch} />
            </div>
            <div className='flex items-center justify-between'>
                <PageTitle>Timetable</PageTitle>
                <Button size="small" onClick={openModal}>Add data</Button>
            </div>
            <TimetableModal openModal={openModal} openEditModal={openEditModal} closeModal={closeModal} fetchData={fetchData} Courses={Courses} Teachers={Teachers} isModalOpen={isModalOpen} />

            {/* <AnnouncementConfirmDelete openModal={openDeleteModal} closeModal={closeDeleteModal} isModalOpen={isDelModalOpen} /> */}


            <form onSubmit={handleSubmit}  className='flex items-center justify-between mb-5'>
            <Label className="mt-4">
                <Select className="mt-1" value={formData.specialty} onChange={handleChange}>
                  <option disabled >
                    Select Specialty
                  </option>
                  {specialties.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </Label>
              {/* <div className='w-1/2' /> */}
              <Input value={formData.weekStartDate} onChange={handleChange} type="date" className='w-4 mt-4 ml-32' placeholder="select date"/>
                          {/* <button type='submit'>submit</button> */}
              {/* <DatePicker className='bg-gray-700 text-white mt-10' size="large"  /> */}
            </form>

            <div className='flex-col items-center justify-around mb-5'>
                <p className="text-gray-400 text-xs">WEEK: {mondayOfCurrentWeek}</p>
                <p className="text-gray-400 text-xs">SPECIALTY: {weekstart}</p>
            </div>
            <TableContainer>
                <Table>
                    <TableHeader>
                        <tr>
                            <TableCell>Course</TableCell>
                            <TableCell>Teacher</TableCell>
                            <TableCell>Day</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Time(24HR)</TableCell>
                            <TableCell>Action</TableCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {timetable?.map((item, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <span className="text-xs"> {item.course?.name}</span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-xs"> {item.teacher?.name}</span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-xs"> {item.day} </span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-xs"> {item.date} </span>
                                </TableCell>
                                {/* split(item.date) */}
                                <TableCell>
                                    <span className="text-xs"> {item.startTime} -{item.stopTime} </span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm">
                                        <button id={item._id} onClick={() => openEditModal(item._id)} className="hover:text-primary mr-2">
                                            <EditIcon className="w-4 h-4" />
                                        </button>
                                        <button id={item._id} onClick={() => openDeleteModal(item._id)} className="hover:text-primary">
                                            <svg
                                                className="fill-current"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                                    fill=""
                                                />
                                                <path
                                                    d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                                    fill=""
                                                />
                                                <path
                                                    d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                                    fill=""
                                                />
                                                <path
                                                    d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                                                    fill=""
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {data.length < 1 && <TableFooter className="w-full flex justify-center text-xs">
                    --No data--
                </TableFooter>}
            </TableContainer>
        </>
    )
}


export default TimetableTable
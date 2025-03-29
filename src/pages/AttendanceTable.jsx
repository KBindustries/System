import React, { useState, useEffect, } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
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
    Badge,
    Button,
    
} from '@windmill/react-ui'

const API_URL = "http://localhost:4000/attendances"
// const API_COURSES_URL = "http://localhost:4000/courses"
// const API_STUDENTS_URL = "http://localhost:4000/students"


function AttendanceTable() {
    const [attendances, setAttendances] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [getAttendance, setGetAttendance] = useState('')
    const [pdfStyle, setPdfStyle] = useState({})



           // A state for the search value
        const [search, setSearch] = useState("");

        // A handler for the search input change
        const handleSearch = (event) => {
            setSearch(event.target.value);
        };
    
    
        // A function to filter the data based on the search value
        const filteredData = attendances?.filter(
        (item) =>
            item.student_id.name?.toLowerCase().includes(search.toLowerCase()) ||
            item.course_id.name?.toLowerCase().includes(search.toLowerCase()) ||
            item.date?.toString().includes(search)
        );

    function openModal() {
        setIsModalOpen(true)
    }

    const openEditModal = async (e) => {
        setIsModalOpen(true)
        console.log(e)
        const response = await axios.get(`${API_URL}/${e}`)
        console.log(response.data.data)
        setGetAttendance(response.data.data)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    // function printDocument(){
    //     const input = document.getElementById('divToPrint');
    //     html2canvas(input[0]).then((canvas) => {
    //         const imgData = canvas.toDataUrl('image/png')
    //         const pdf = new jsPDF();
    //         pdf.addImage(imgData, 'PNG', 0,0);
    //         pdf.save("attendance.pdf")
    //     })
    // }

      // Create a ref for the div element
      function pdfStyling (){
        setPdfStyle({
            width: "500px",
            height: "300px",
            border: "1px solid black",
            padding: "10px",
            margin:'20px'
           
          })
      }
  const divRef = React.useRef();

  // Define a function to handle the PDF download
  const handleDownload = () => {
    // pdfStyling()
    // Create a new jsPDF instance
    const doc = new jsPDF("l", "pt", "a3");

    // Get the div element
    const div = divRef.current;

    // Use html2canvas to capture the div as a canvas
    html2canvas(div).then((canvas) => {
      // Add the canvas image to the jsPDF document
      // with a 20pt margin and a 10pt padding
      doc.addImage(canvas, "PNG", 20, 20, canvas.width - 20, canvas.height - 10);

      // Save the PDF file
      doc.save("attendance.pdf");
    //   setPdfStyle({})
    });
  };

    
    const fetchData = async () => {
        const response = await axios.get(`${API_URL}`);
        console.log(response.data.data)
        setAttendances(response.data.data);

    }

    useEffect(() => {
        fetchData();
       

    }, [])

    return (
        <>
            {/* <!-- Search input --> */}
            <div className="flex justify-center flex-1 lg:mr-32 mt-10">
            <Filter value={search} onChange={handleSearch} />
            </div>
            <div className='flex items-center justify-between my-3'>
                <PageTitle>Attendance</PageTitle>          
                        
                <Button size="small" onClick={handleDownload}>Download
                <svg
                                                className="fill-current"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M16.8754 11.6719C16.5379 11.6719 16.2285 11.9531 16.2285 12.3187V14.8219C16.2285 15.075 16.0316 15.2719 15.7785 15.2719H2.22227C1.96914 15.2719 1.77227 15.075 1.77227 14.8219V12.3187C1.77227 11.9812 1.49102 11.6719 1.12539 11.6719C0.759766 11.6719 0.478516 11.9531 0.478516 12.3187V14.8219C0.478516 15.7781 1.23789 16.5375 2.19414 16.5375H15.7785C16.7348 16.5375 17.4941 15.7781 17.4941 14.8219V12.3187C17.5223 11.9531 17.2129 11.6719 16.8754 11.6719Z"
                                                    fill=""
                                                />
                                                <path
                                                    d="M8.55074 12.3469C8.66324 12.4594 8.83199 12.5156 9.00074 12.5156C9.16949 12.5156 9.31012 12.4594 9.45074 12.3469L13.4726 8.43752C13.7257 8.1844 13.7257 7.79065 13.5007 7.53752C13.2476 7.2844 12.8539 7.2844 12.6007 7.5094L9.64762 10.4063V2.1094C9.64762 1.7719 9.36637 1.46252 9.00074 1.46252C8.66324 1.46252 8.35387 1.74377 8.35387 2.1094V10.4063L5.40074 7.53752C5.14762 7.2844 4.75387 7.31252 4.50074 7.53752C4.24762 7.79065 4.27574 8.1844 4.50074 8.43752L8.55074 12.3469Z"
                                                    fill=""
                                                />
                 </svg>
                </Button>
                {/* <Button size="small" onClick={openModal}>Add Attendance</Button> */}
            </div>



            <TableContainer ref={divRef}  >
                <Table>
                    <TableHeader>
                        {/* <tr className="w-full "><TableCell>Attendance </TableCell></tr> */}
                        <tr>
                            <TableCell>Course Name</TableCell>
                            <TableCell>Student</TableCell>
                            <TableCell>Present</TableCell>
                            <TableCell>Date</TableCell>
                            {/* <TableCell>Action</TableCell> */}
                            {/* <TableCell>  <img src={trash}/></TableCell> */}
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {filteredData.map((attendance, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <span className="text-xs"> {attendance.course_id.name}</span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-xs"> {attendance.student_id.name}</span>
                                </TableCell>
                                <TableCell>                                
                                    <span className="text-xs"> 
                                    {attendance.status? <Badge > {`${attendance.status}`}</Badge>: <Badge type='danger'>{`${attendance.status}`}</Badge>}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-xs"> {attendance.date.split('T')[0]} </span>
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
};

export default AttendanceTable
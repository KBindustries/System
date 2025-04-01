import React, { useState, useEffect } from "react";
import axios from "axios";
import PageTitle from "../components/Typography/PageTitle";
import StudentModal from "../components/Students/StudentModal";
import Filter from "../components/Filter";
import StudentCard from "../components/Students/StudentCard";
import StudentConfirmDelete from "../components/Students/StudentConfirmDelete";
import { getStudents, getSingleStudent } from "../services/StudentService";
import { getSpecialties } from "../services/SpecialtyService";
import { TrashIcon, EditIcon } from "../icons";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Button,
} from "@windmill/react-ui";

const API_URL = "http://localhost:4000/students";
const API_SPECIALTY_URL = "http://localhost:4000/specialties";

function StudentTable() {
  const [student, setStudent] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStudentCardOpen, setIsStudentCardOpen] = useState(false);
  const [isDelModalOpen, setIsDelModalOpen] = useState(false);
  const [getStudent, setGetStudent] = useState("");
  const [specialties, setSpecialties] = useState([]);

  // A state for the search value
  const [search, setSearch] = useState("");

  // A handler for the search input change
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  // A function to filter the data based on the search value
  const filteredData = student?.filter(
    (item) =>
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.specialty_id.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.specialty_id.level?.toString().includes(search)
  );
  //functions for handling the modal
  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  //functions for handling the student card
  function openStudentCard() {
    setIsStudentCardOpen(true);
  }
  const viewStudentCard = async (e) => {
    setIsStudentCardOpen(true);
    let studentId = e;
    const response = await getSingleStudent(studentId);
    console.log(response);
    setGetStudent(response);
  };
  function closeStudentCard() {
    setIsStudentCardOpen(false);
  }

  //functions for handling delete modal
  async function openDeleteModal(e) {
    setIsDelModalOpen(true);
    let studentId = e;
    const response = await getSingleStudent(studentId);
    console.log(response);
    setGetStudent(response);
  }
  function closeDeleteModal() {
    setIsDelModalOpen(false);
  }

  const openEditModal = async (e) => {
    setIsModalOpen(true);
    const studentId = e;
    console.log(e);
    const response = await getSingleStudent(studentId);
    console.log(response);
    setGetStudent(response);
  };

  //function to fetch specialties
  const fetchSpecialties = async () => {
    try {
      const specialtiesData = await getSpecialties();
      console.log(specialtiesData);
      setSpecialties(specialtiesData);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  //function to fetch students
  const fetchStudents = async () => {
    try {
      const studentData = await getStudents();
      console.log(studentData);
      setStudent(studentData);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchSpecialties();
  }, []);

  return (
    <>
      {/* <!-- Search input --> */}
      <div className="flex justify-center flex-1 lg:mr-32 mt-10">
        <Filter value={search} onChange={handleSearch} />
      </div>
      <div className="flex items-center justify-between">
        <PageTitle>Students</PageTitle>
        <Button size="small" onClick={openModal}>
          Add Student
        </Button>
      </div>
      {/* //modals */}
      <StudentModal
        openModal={openModal}
        openEditModal={openEditModal}
        getStudent={getStudent}
        specialties={specialties}
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        fetchStudents={fetchStudents}
      />

      <StudentCard
        openStudentCard={openStudentCard}
        getStudent={getStudent}
        closeStudentCard={closeStudentCard}
        isStudentCardOpen={isStudentCardOpen}
      />

      <StudentConfirmDelete
        openModal={openDeleteModal}
        closeModal={closeDeleteModal}
        isModalOpen={isDelModalOpen}
        getStudent={getStudent}
        fetchStudents={fetchStudents}
      />

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Specialty</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>qrcode</TableCell>
              <TableCell>Fee Paid</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {filteredData.map((student, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-xs"> {student.name}</span>
                </TableCell>
                <TableCell>
                  <span className="text-xs"> {student.email}</span>
                </TableCell>
                <TableCell>
                  <span className="text-xs"> {student.phone}</span>
                </TableCell>
                <TableCell>
                  <span className="text-xs"> {student.specialty_id.name} </span>
                </TableCell>
                <TableCell>
                  <span className="text-xs">
                    {" "}
                    {student.specialty_id.level}{" "}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-xs">
                    <img className="h-10 w-10" src={student.qrcode} />
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-xs"> {student.fee_paid} </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    <button
                      id={student._id}
                      onClick={() => viewStudentCard(student._id)}
                      className="hover:text-primary"
                    >
                      <svg
                        className="fill-current mr-2"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                          fill=""
                        />
                        <path
                          d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                          fill=""
                        />
                      </svg>
                    </button>
                    <button
                      id={student._id}
                      onClick={() => openEditModal(student._id)}
                      className="hover:text-primary mr-2"
                    >
                      <EditIcon className="w-4 h-4" />
                    </button>
                    <button
                      id={student._id}
                      onClick={() => openDeleteModal(student._id)}
                      className="hover:text-primary "
                    >
                      <TrashIcon className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredData.length < 1 && (
          <TableFooter className="w-full flex justify-center text-xs">
            --No data--
          </TableFooter>
        )}
      </TableContainer>
    </>
  );
}

export default StudentTable;

import React, { useState, useEffect } from "react";
import PageTitle from "../components/Typography/PageTitle";
import Filter from "../components/Filter";
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
import { getSingleTeacher, getTeachers } from "../services/TeacherService";
import TeacherConfirmDelete from "../components/Teachers/TeacherConfirmDelete";
import TeacherModal from "../components/Teachers/TeacherModal";

function TeachersTable() {
  const [student, setStudent] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDelModalOpen, setIsDelModalOpen] = useState(false);
  const [getTeacher, setGetTeacher] = useState("");
  const [specialties, setSpecialties] = useState([]);

  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredData = student?.filter(
    (item) =>
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.specialty_id.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.specialty_id.level?.toString().includes(search)
  );

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }
  async function openDeleteModal(e) {
    setIsDelModalOpen(true);
    let teacherId = e;
    const response = await getSingleTeacher(teacherId);
    console.log(response);
    setGetTeacher(response);
  }
  function closeDeleteModal() {
    setIsDelModalOpen(false);
  }

  const openEditModal = async (e) => {
    setIsModalOpen(true);
    const teacherId = e;
    console.log(e);
    const response = await getSingleTeacher(teacherId);
    console.log(response);
    setGetTeacher(response);
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
  const fetchTeachers = async () => {
    try {
      const teacherData = await getTeachers();
      console.log(teacherData);
      setStudent(teacherData);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    fetchTeachers();
    fetchSpecialties();
  }, []);

  return (
    <>
      {/* <!-- Search input --> */}
      <div className="flex justify-center flex-1 lg:mr-32 mt-10">
        <Filter value={search} onChange={handleSearch} />
      </div>
      <div className="flex items-center justify-between">
        <PageTitle>Teachers</PageTitle>
        <Button size="small" onClick={openModal}>
          Add Teacher
        </Button>
      </div>
      {/* //modals */}
      <TeacherModal
        openModal={openModal}
        openEditModal={openEditModal}
        getTeacher={getTeacher}
        specialties={specialties}
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        fetchTeachers={fetchTeachers}
      />

      <TeacherConfirmDelete
        openModal={openDeleteModal}
        closeModal={closeDeleteModal}
        isModalOpen={isDelModalOpen}
        getTeacher={getTeacher}
        fetchTeachers={fetchTeachers}
      />

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {filteredData.map((teacher, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-xs"> {teacher.name}</span>
                </TableCell>
                <TableCell>
                  <span className="text-xs"> {teacher.email}</span>
                </TableCell>
                <TableCell>
                  <span className="text-xs"> {teacher.phone}</span>
                </TableCell>
                <TableCell>
                  <span className="text-xs"> {teacher.address} </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    <button
                      id={teacher._id}
                      onClick={() => openEditModal(teacher._id)}
                      className="hover:text-primary mr-2"
                    >
                      <EditIcon className="w-4 h-4" />
                    </button>
                    <button
                      id={teacher._id}
                      onClick={() => openDeleteModal(teacher._id)}
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

export default TeachersTable;

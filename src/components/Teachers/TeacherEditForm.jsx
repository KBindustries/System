import React, { useState } from "react";
import { Button } from "@windmill/react-ui";
import axios from "axios";

const API_URL = "http://localhost:4000/teachers";

// A custom hook to handle form inputs
const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return [values, handleChange];
};

function TeacherEditForm({ getTeacher, closeModal, fetchTeachers = () => {} }) {
  const [values, handleChange] = useForm(getTeacher);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      address: values.address,
    };
    axios
      .put(`${API_URL}/${values._id}`, data)
      .then((response) => {
        console.log(response);
        fetchTeachers();
        closeModal();
      })
      .catch((error) => {
        console.error(error);
      });
    fetchTeachers();
    closeModal();
  };

  return (
    <>
      <div className="rounded-sm  shadow-default bg-bgray-800">
        <div className="border-b border-stroke py-4 px-6.5 ">
          <h3 className="font-medium ">Edit Teacher Form</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6.5 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-4.5 py-3">
              <label className="mb-2.5 block ">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Enter teacher's name"
                className="w-full rounded border-2 border-gray-700 bg-transparent py-3 px-5 font-medium outline-none transition "
              />
            </div>
            <div className="mb-4.5 py-3">
              <label className="mb-2.5 block ">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Enter teacher's email"
                className="w-full rounded border-2 border-gray-700 bg-transparent py-3 px-5 font-medium outline-none transition "
              />
            </div>
            <div className="mb-4.5 py-3">
              <label className="mb-2.5 block ">Phone</label>
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
              <label className="mb-2.5 block ">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={values.address}
                onChange={handleChange}
                placeholder="Enter address number"
                className="w-full rounded border-2 border-gray-700 bg-transparent py-3 px-5 font-medium outline-none transition "
              />
            </div>

            <div className="flex flex-row justify-between mt-5">
              <div className="hidden sm:block">
                <Button layout="outline" onClick={closeModal}>
                  Cancel
                </Button>
              </div>
              <div className="hidden sm:block">
                <Button type="submit">Accept</Button>
              </div>
              <div className="block w-full sm:hidden">
                <Button
                  block
                  size="large"
                  layout="outline"
                  onClick={closeModal}
                >
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
  );
}

export default TeacherEditForm;

import React, { useState } from "react";
import { Button, Label, Select } from "@windmill/react-ui";
import axios from "axios";
import { createCourse } from "../../services/CourseService";

const API_URL = "http://localhost:4000/courses";

function CourseForm({ closeModal, specialties, fetchCourses }) {
  const [name, setName] = useState("");
  const [specialty_id, setSpecialtyId] = useState(specialties[0]._id);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: name,
      specialty_id: specialty_id,
    };

    axios
      .post(`${API_URL}`, data)
      .then((response) => {
        console.log(response);
        closeModal();
        fetchCourses();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="rounded-sm  shadow-default bg-bgray-800">
        <div className="border-b border-stroke py-4 px-6.5 ">
          <h3 className="font-medium ">Add Course Form</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            <div className="mb-4.5 py-3">
              <label className="mb-2.5 block ">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your course name"
                className="w-full rounded border-2 border-gray-700 bg-transparent py-3 px-5 font-medium outline-none transition "
              />
            </div>

            <Label className="mt-4">
              <span>Specialties</span>
              <Select
                className="mt-1"
                value={specialty_id}
                onChange={(e) => setSpecialtyId(e.target.value)}
              >
                <option disabled defaultValue>
                  Select Specialty
                </option>
                {specialties.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </Label>

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

export default CourseForm;

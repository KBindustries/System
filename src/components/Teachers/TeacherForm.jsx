import React, { useState } from "react";
import { Button } from "@windmill/react-ui";
import axios from "axios";

const API_URL = "http://localhost:4000/teachers";

function TeacherForm({ closeModal, fetchTeachers = () => {} }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: name,
      email: email,
      phone: phone,
      address: address,
    };

    axios
      .post(`${API_URL}`, data)
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
          <h3 className="font-medium ">Add Teacher Form</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6.5 grid grid-cols-2 gap-2">
            <div className="mb-4.5 py-3">
              <label className="mb-2.5 block ">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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

export default TeacherForm;

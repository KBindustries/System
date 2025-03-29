import React, { useState } from 'react';
import { Button, Label, Select } from '@windmill/react-ui';
import axios from 'axios';

const API_URL = 'http://localhost:4000/auth/users/register';

function UserForm({ closeModal, getSpecialties, fetchData }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [specialty, setSpecialty] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      username: name,
      email: email,
      role: role,
      password: password,
    };

    if (role === 'delegate') {
      data = {
        ...data,
        specialty: specialty,
      };
    }

    console.log(data);
    axios
      .post(API_URL, data)
      .then((response) => {
        console.log(response);
        closeModal();
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="rounded-sm  shadow-default bg-bgray-800">
        <div className="border-b border-stroke py-4 px-6.5 ">
          <h3 className="font-medium">Add User Form</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            <div className="mb-4.5 py-3">
              <label className="mb-2.5 block">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your user name"
                className="w-full rounded border-2 border-gray-700 bg-transparent py-3 px-5 font-medium outline-none transition"
              />
            </div>

            <div className="mb-4.5 py-3">
              <label className="mb-2.5 block">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter user email"
                className="w-full rounded border-2 border-gray-700 bg-transparent py-3 px-5 font-medium outline-none transition"
              />
            </div>

            <label htmlFor="role" className="block m-2 text-sm font-medium text-gray-500">
              Select a role
            </label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-gray-50 border border-gray-500 text-gray-500 text-sm rounded-lg block w-full p-4 dark:bg-gray-700 placeholder-gray-400"
            >
              <option disabled defaultValue>
                Choose a Role
              </option>
              <option value="admin">Admin</option>
              <option value="security">Security</option>
              <option value="delegate">Delegate</option>
            </select>

            <div className="mb-4.5 py-3">
              <label className="mb-2.5 block">Password</label>
              <input
                type="text"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter user password"
                className="w-full rounded border-2 border-gray-700 bg-transparent py-3 px-5 font-medium outline-none transition"
              />
            </div>

            {role === 'delegate' && (
              <Label className="mt-4">
                <span>Specialty</span>
                <Select className="mt-1" value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
                  <option disabled defaultValue>
                    Select Specialty
                  </option>
                  <option value="all">all</option>

                  {getSpecialties.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </Label>
            )}

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
  );
}

export default UserForm;

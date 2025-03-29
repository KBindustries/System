import React, { useState } from "react";
import { Button } from "@windmill/react-ui";
import axios from "axios";
import { createSpecialty } from "../../services/SpecialtyService";

const API_URL = "http://localhost:4000/specialties";

function SpecialtyForm({ closeModal, fetchSpecialties }) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [academic_year, setAcademicYear] = useState("");
  const [total_fee, setTotalFee] = useState("");
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const specialtyData = {
      name: name,
      level: level,
      academic_year: academic_year,
      total_fee: total_fee,
      fees: {
        first_installment: first,
        second_installment: second,
        third_installment: third,
      },
    };
    try {
      const createdSpecialty = await createSpecialty(specialtyData);
      console.log("Created Specialty:", createdSpecialty);
      closeModal();
      fetchSpecialties();
      // Handle success case, such as displaying a success message or redirecting
    } catch (error) {
      console.error("Error:", error);
      // Handle error case, such as displaying an error message
    }
  };

  return (
    <>
      <div className="rounded-sm  shadow-default bg-bgray-800">
        <div className="border-b border-stroke py-4 px-6.5 ">
          <h3 className="font-medium ">Specialty Form</h3>
        </div>
        <form onSubmit={handleSubmit} className="">
          <div className="p-6.5 grid grid-cols-2 gap-2">
            <div className="mb-4.5 py-3">
              <label className="mb-2.5 block ">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your specialty name"
                className="w-full rounded border-2 border-gray-700 bg-transparent py-3 px-5 font-medium outline-none transition "
              />
            </div>

            <div className="mb-4.5 py-3">
              <label className="mb-2.5 block">Level</label>
              <input
                type="number"
                id="level"
                name="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                placeholder="Enter level"
                className="w-full rounded border-2 border-gray-700 bg-transparent py-3 px-5 font-medium outline-none transition "
              />
            </div>

            <div className="mb-4.5 py-3">
              <label className="mb-2.5 block">Academic year</label>
              <input
                type="text"
                id="academic_year"
                name="academic_year"
                value={academic_year}
                onChange={(e) => setAcademicYear(e.target.value)}
                placeholder="Enter Academic year"
                className="w-full rounded border-2 border-gray-700 bg-transparent py-3 px-5 font-medium outline-none transition "
              />
            </div>

            <div className="mb-4.5 py-3">
              <label className="mb-2.5 block ">Total fee</label>
              <input
                type="number"
                id="total_fee"
                name="total_fee"
                value={total_fee}
                onChange={(e) => setTotalFee(e.target.value)}
                placeholder="Enter total fee"
                className="w-full rounded border-2 border-gray-700 bg-transparent py-3 px-5 font-medium outline-none transition "
              />
            </div>

            <div className="mb-4.5 py-3">
              <label className="mb-2.5 block ">First Installment</label>
              <input
                type="number"
                id="first"
                name="first"
                value={first}
                onChange={(e) => setFirst(e.target.value)}
                placeholder="Enter first installment"
                className="w-full rounded border-2 border-gray-700 bg-transparent py-3 px-5 font-medium outline-none transition"
              />
            </div>

            <div className="mb-4.5 py-3">
              <label className="mb-2.5 block ">Second Installment</label>
              <input
                type="number"
                id="second"
                name="second"
                value={second}
                onChange={(e) => setSecond(e.target.value)}
                placeholder="Enter second installment"
                className="w-full rounded border-2 border-gray-700 bg-transparent py-3 px-5 font-medium outline-none transition "
              />
            </div>

            <div className="mb-4.5 py-3">
              <label className="mb-2.5 block ">Third Installment</label>
              <input
                type="number"
                id="third"
                name="third"
                value={third}
                onChange={(e) => setThird(e.target.value)}
                placeholder="Enter third installment"
                className="w-full rounded border-2 border-gray-700 bg-transparent py-3 px-5 font-medium outline-none transition "
              />
            </div>
            <div className="mt-5 mb-5.5 flex items-center justify-between">
              <label htmlFor="formCheckbox" className="flex cursor-pointer">
                <div className="relative pt-0.5">
                  <input
                    type="checkbox"
                    id="formCheckbox"
                    className="taskCheckbox sr-only"
                  />
                  <div className="box mr-3 flex h-5 w-5 items-center justify-center rounded border-2 border-gray-700 ">
                    <span className="text-white opacity-0">
                      <svg
                        className="fill-current"
                        width="10"
                        height="7"
                        viewBox="0 0 10 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.70685 0.292804C9.89455 0.480344 10 0.734667 10 0.999847C10 1.26503 9.89455 1.51935 9.70685 1.70689L4.70059 6.7072C4.51283 6.89468 4.2582 7 3.9927 7C3.72721 7 3.47258 6.89468 3.28482 6.7072L0.281063 3.70701C0.0986771 3.5184 -0.00224342 3.26578 3.785e-05 3.00357C0.00231912 2.74136 0.10762 2.49053 0.29326 2.30511C0.4789 2.11969 0.730026 2.01451 0.992551 2.01224C1.25508 2.00996 1.50799 2.11076 1.69683 2.29293L3.9927 4.58607L8.29108 0.292804C8.47884 0.105322 8.73347 0 8.99896 0C9.26446 0 9.51908 0.105322 9.70685 0.292804Z"
                          fill=""
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <p>Fee Check</p>
              </label>
            </div>
            <div className="flex flex-row justify-between mt-5 w-full">
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

export default SpecialtyForm;

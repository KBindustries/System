import React from "react";
import "./student.css";

import { Modal, ModalBody } from "@windmill/react-ui";

function StudentCard({ isStudentCardOpen, closeStudentCard, getStudent }) {
  return (
    <>
      <Modal
        isOpen={isStudentCardOpen}
        onClose={closeStudentCard}
        className="p-6 w-2/3 bg-white rounded-lg shadow-lg "
      >
        <ModalBody>
          <div className="flex sm:flex-row flex-col">
            <div className="w-full mx-5 bg-white border-8 border-gray-900  overflow-hidden shadow-lg">
              <div className="text-center ">
                <div className="bg-gray-800 py-4">
                  <h2 className="text-white text-2xl font-semibold">
                    INSTITUTE NAME
                  </h2>
                  <h2 className="text-white text-l font-semibold">SLOGAN</h2>
                </div>

                <img
                  className="h-32 w-32 rounded-full border-4 border-gray-800 mx-auto my-8"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRacMM1OKv-wYKCGQsU1KPsB9oUxcM2RaCeig&usqp=CAU"
                  alt="student"
                />

                {/* student info */}
                <div className=" text-black space-y-4 space-x-20 mb-16">
                  <h1 className="font-bold text-left mx-20">
                    Reg No :
                    <span className="font-semibold">
                      {getStudent?._id?.substring(0, 10)}
                    </span>{" "}
                  </h1>
                  <h1 className="font-bold text-left ">
                    Student ID :
                    <span className="font-semibold">
                      {getStudent?._id?.substring(10, 16)}
                    </span>{" "}
                  </h1>
                  <h1 className="font-bold text-left ">
                    Student Name :
                    <span className="font-semibold">{getStudent?.name}</span>{" "}
                  </h1>
                  <h1 className="font-bold text-left ">
                    Call :
                    <span className="font-semibold">
                      +237 {getStudent?.phone}
                    </span>{" "}
                  </h1>
                  <h1 className="font-bold text-left ">
                    Address :{" "}
                    <span className="font-semibold">{getStudent?.address}</span>{" "}
                  </h1>

                  <h1 className="font-bold text-left">
                    Level :{" "}
                    <span className="font-semibold">
                      {getStudent?.specialty_id?.level}
                    </span>{" "}
                  </h1>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <h1 className="text-black text-xs font-bold truncate text-truncate">
                  Specialty:{" "}
                  <span className="font-semibold">
                    {getStudent?.specialty_id?.name}
                  </span>{" "}
                </h1>
                <h1 className="text-black text-xs font-bold truncate text-truncate">
                  Year:{" "}
                  <span className="font-semibold">
                    {getStudent?.specialty_id?.academic_year}
                  </span>{" "}
                </h1>
              </div>

              <div className="bg-gray-900 h-1 mt-16 "></div>
              <div className="bg-gray-900 h-20 ">
                <h2 className="text-center text-white p-4">
                  NothingVille, Douala, Cameroon
                </h2>
              </div>
            </div>
            {/* second card */}

            <div className="w-full mx-5 bg-white border-8  border-gray-900  overflow-hidden shadow-lg">
              <div className="bg-gray-800 py-5 mb-1">
                <h2 className="text-center text-white">TERMS AND CONDITIONS</h2>
              </div>
              <div className="bg-gray-900 h-1"></div>
              <div className="flex p-3 text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-10 h-10 text-black "
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                    clip-rule="evenodd"
                  />
                </svg>
                <h2>
                  The student card is the property of the institution and must
                  be surrendered upon request.It is valid only when a student is
                  registered.
                </h2>
              </div>
              <div className="flex p-3 text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-10 h-10 text-black "
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                    clip-rule="evenodd"
                  />
                </svg>
                <h2>
                  The student card is not transferable and no modifications are
                  allowed.Failure to comply implies serious sanctions
                </h2>
              </div>

              <div className="border-b px-4 pb-6 mb-12">
                <div className="text-center my-4">
                  <div className="py-2">
                    <div className="inline-flex flex-col text-xs text-gray-700 items-center">
                      <h3 className="font-bold">
                        Phone :{" "}
                        <span className="font-semibold">
                          +237{getStudent?.phone}{" "}
                        </span>
                      </h3>
                      <h3 className="font-bold">
                        Mail : <span>{getStudent?.email}</span>
                      </h3>
                      <img
                        className="qrcode rounded-md my-3"
                        alt="qrcode"
                        src={getStudent?.qrcode}
                      />
                      <h3 className="font-bold">
                        Joined Date :{" "}
                        <span className="font-semibold">
                          {" "}
                          {getStudent?.createdAt}
                        </span>
                      </h3>
                      <h3 className="font-bold">
                        Duration :{" "}
                        <span className="font-semibold">
                          Full academic year
                        </span>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900 h-1 mb-1"></div>
              <div className="bg-gray-900 h-20"></div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default StudentCard;

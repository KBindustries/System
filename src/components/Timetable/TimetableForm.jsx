import React, { useState } from "react";
import { Button, Label, Select, Input } from "@windmill/react-ui";
import axios from "axios";

const API_URL = "http://localhost:4000/timetables";

function TimetableForm({
  closeModal,
  Teachers,
  Courses,
  Specialties,
  fetchData,
}) {
  const [weekStartDate, setWeekStartDate] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [timetableArray, setTimetableArray] = useState([]);
  const [timetableHistory, setTimetableHistory] = useState([]);

  const handleAddTimetable = () => {
    if (!specialty) {
      alert("Please select a specialty before adding timetable entries.");
      return;
    }

    setTimetableHistory((prevHistory) => [...prevHistory, [...timetableArray]]);
    setTimetableArray([
      ...timetableArray,
      {
        teacher: "",
        course: "",
        day: "",
        startTime: "",
        stopTime: "",
      },
    ]);
  };

  const handleUndo = () => {
    if (timetableHistory.length > 0) {
      setTimetableArray(timetableHistory.pop());
      setTimetableHistory([...timetableHistory]);
    }
  };

  const handleTimetableChange = (e, index, field) => {
    const { value } = e.target;
    setTimetableArray((prevTimetable) => {
      const updatedTimetable = [...prevTimetable];
      updatedTimetable[index] = { ...updatedTimetable[index], [field]: value };
      return updatedTimetable;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!specialty) {
      alert("Please select a specialty before submitting.");
      return;
    }

    const data = {
      weekStartDate,
      specialty,
      timetable: timetableArray,
    };
    console.log({ data });

    try {
      await axios.post(API_URL, data);
      fetchData();
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="rounded-sm shadow-default  p-6">
      <h3 className="font-medium border-b pb-4">Add Timetable Form</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label>Week Start Date</Label>
          <Input
            type="date"
            value={weekStartDate}
            onChange={(e) => setWeekStartDate(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <Label>Specialty</Label>
          <Select
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
          >
            <option value="" disabled>
              Select Specialty
            </option>
            {Specialties.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </Select>
        </div>
        {timetableArray.map((entry, index) => (
          <div
            key={index}
            className="border-b pb-4 mb-4 grid grid-cols-1 md:grid-cols-2 gap-2"
          >
            <div className="col-span-2">
              <Label>Teacher</Label>
              <Select
                value={entry.teacher}
                onChange={(e) => handleTimetableChange(e, index, "teacher")}
              >
                {Teachers.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label>Course</Label>
              <Select
                value={entry.course}
                onChange={(e) => handleTimetableChange(e, index, "course")}
              >
                {Courses.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label>Day</Label>
              <Input
                type="text"
                value={entry.day}
                onChange={(e) => handleTimetableChange(e, index, "day")}
              />
            </div>
            <div>
              <Label>Start Time</Label>
              <Input
                type="time"
                value={entry.startTime}
                onChange={(e) => handleTimetableChange(e, index, "startTime")}
              />
            </div>
            <div>
              <Label>Stop Time</Label>
              <Input
                type="time"
                value={entry.stopTime}
                onChange={(e) => handleTimetableChange(e, index, "stopTime")}
              />
            </div>
          </div>
        ))}
        <div className="flex justify-between mt-4">
          <Button type="button" onClick={handleAddTimetable}>
            + Add Timetable
          </Button>
          {timetableHistory.length > 0 && (
            <Button type="button" onClick={handleUndo}>
              Undo
            </Button>
          )}
        </div>
        <div className="flex justify-between mt-6">
          <Button layout="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}

export default TimetableForm;

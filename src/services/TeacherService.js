import axios from "axios";
const API_URL = "http://localhost:4000";

export const getTeachers = async () => {
  try {
    const response = await axios.get(`${API_URL}/teachers`);
    return response.data.data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
export const getSingleTeacher = async (teacherId) => {
  try {
    const response = await axios.get(`${API_URL}/teachers/${teacherId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export const createTeacher = async (teacherData) => {
  try {
    const response = await axios.post(`${API_URL}/teachers`, teacherData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to create teacher");
  }
};

export const editTeacher = async (teacherId, teacherData) => {
  try {
    const response = await axios.put(
      `${API_URL}/teachers/${teacherId}`,
      teacherData
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to edit teacher");
  }
};
export const deleteTeacher = async (teacherId, teacherData) => {
  try {
    const response = await axios.delete(
      `${API_URL}/teachers/${teacherId}`,
      teacherData
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to delete teacher");
  }
};

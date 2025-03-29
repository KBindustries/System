import axios from 'axios'
const API_URL = 'http://localhost:4000';

export const getStudents = async () => {
    try {
      const response = await axios.get(`${API_URL}/students`);
      return response.data.data;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  };
export const getSingleStudent = async (studentId) => {
    try {
      const response = await axios.get(`${API_URL}/students/${studentId}`);
      return response.data.data;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  };
  
  export const createStudent = async (studentData) => {
    try {
      const response = await axios.post(`${API_URL}/students`, studentData);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to create student');
    }
  };
  
  export const editStudent = async (studentId, studentData) => {
    try {
      const response = await axios.put(`${API_URL}/students/${studentId}`, studentData);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to edit student');
    }
  };
  export const deleteStudent = async (studentId, studentData) => {
    try {
      const response = await axios.delete(`${API_URL}/students/${studentId}`, studentData);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to delete student');
    }
  };
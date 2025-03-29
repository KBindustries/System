import axios from 'axios'
const API_URL = 'http://localhost:4000';

export const getSpecialties = async () => {
    try {
      const response = await axios.get(`${API_URL}/specialties`);
      return response.data.data;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  };
  
  export const createSpecialty = async (specialtyData) => {
    try {
      const response = await axios.post(`${API_URL}/specialties`, specialtyData);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to create specialty');
    }
  };
  
  export const editSpecialty = async (specialtyId, specialtyData) => {
    try {
      const response = await axios.put(`${API_URL}/specialties/${specialtyId}`, specialtyData);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to edit specialty');
    }
  };
  export const deleteSpecialty = async (specialtyId, specialtyData) => {
    try {
      const response = await axios.delete(`${API_URL}/specialties/${specialtyId}`, specialtyData);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to delete specialty');
    }
  };
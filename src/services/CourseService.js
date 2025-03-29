import axios from 'axios';

const API_URL = 'http://localhost:4000/courses';

export const getCourses = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

export const createCourse = async (courseData) => {
  try {
  
    const response = await axios.post(API_URL, courseData);
    console.log('Course created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};

export const editCourse = async (courseId, courseData) => {
  try {
   
    const response = await axios.put(`${API_URL}/${courseId}`, courseData);
    // const response = await axios.delete(`${API_URL}/specialties/${specialtyId}`, specialtyData);

    console.log('Course updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error editing course:', error);
    throw error;
  }
};

export const deleteCourse = async (courseId, courseData) => {
  try {
    const response = await axios.delete(`${API_URL}/${courseId}`, courseData);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to delete course');
  }
};

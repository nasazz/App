import api from './api';

// Function to handle file import
export const importBlockedStockData = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await api.post('/BlockedStock/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error; // Handle the error in the component
  }
};

// Function to get blocked stock data
export const getBlockedStockData = async () => {
  try {
    const response = await api.get('/BlockedStock');
    return response.data; // Array of blocked stock data
  } catch (error) {
    throw error; // Handle the error in the component
  }
};

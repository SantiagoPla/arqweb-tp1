import axiosInstance from '../config/axios.js';

export const addLogoToRestaurant = async (logoFile, restaurantId) => {
    try {
      const formData = new FormData();
      formData.append("input_logo", logoFile);
  
      console.log(formData)
      const response = await axiosInstance.post(`/logo/${restaurantId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      
      return response.data;
  
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
      return [];
    }
  };
  
  export const fetchLogoById = async (restaurantId) => {
    try {
      const response = await axiosInstance.get(`/logo/${restaurantId}`);
      const logoBase64 = `data:${response.data.content_type};base64,${response.data.data}`;
      return logoBase64;
  
    } catch (error) {
      console.error('Error fetching logo:', error);
      return null;
    }
  };
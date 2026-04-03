import API from "./axios";


export const getAllProperties = async () => {
    try {
        const response = await API.get("/properties");
        return response.data; 
    } catch (error) {
       
        throw error.response?.data || { message: "Could not load properties" };
    }
};


export const getPropertyById = async (id) => {
    try {
        const response = await API.get(`/properties/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Property not found" };
    }
};


export const createProperty = async (propertyData) => {
    try {
        const response = await API.post("/properties", propertyData);
        return response.data;
    } catch (error) {
        
        throw error.response?.data || { message: "Failed to create property" };
    }
};


export const updateProperty = async (id, updatedData) => {
    try {
        const response = await API.put(`/properties/${id}`, updatedData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to update property" };
    }
};


export const deleteProperty = async (id) => {
    try {
        const response = await API.delete(`/properties/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to delete property" };
    }
};
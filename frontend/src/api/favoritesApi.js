import API from "./axios";


export const getMyFavorites = async () => {
    try {
        const response = await API.get("/favorites");
        return response.data; 
    } catch (error) {
        
        throw error.response?.data || { message: "Could not load your favourites" };
    }
};


export const addFavorite = async (propertyId) => {
    try {
        const response = await API.post("/favorites", { property_id: propertyId });
        return response.data;
    } catch (error) {
        
        throw error.response?.data || { message: "Failed to add to favourites" };
    }
};


export const removeFavorite = async (favId) => {
    try {
        const response = await API.delete(`/favorites/${favId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to remove favourite" };
    }
};
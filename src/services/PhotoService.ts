import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_API + "photos";

// Helper function to get a clean API URL (no trailing slash)
const getCleanUrl = (url: string) => url.endsWith('/') ? url.slice(0, -1) : url;

// Helper to convert image file to base64 (in case backend expects base64)
const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

export const GetPhotos = async (issueId?: number) => {
    try {
        const url = issueId ? `${getCleanUrl(API_URL)}?issue_id=${issueId}` : API_URL;
        console.log("Fetching photos from:", url);
        
        const response = await axios.get(url);
        console.log("Photos received:", response.data);
        return response.data;
    } catch (error: any) {
        console.error("Error loading photos:", error);
        if (error.response) {
            console.error("Status code:", error.response.status);
            console.error("Response data:", error.response.data);
        }
        return [];
    }
};

export const UploadPhoto = async (issueId: number, imageFile: File, caption: string = "") => {
    try {
        console.log(`Uploading photo for issue ${issueId}:`, {
            fileName: imageFile.name,
            fileType: imageFile.type,
            fileSize: `${(imageFile.size / 1024).toFixed(2)} KB`
        });
        
        // Try method 1: Using FormData
        const formData = new FormData();
        formData.append('issue_id', issueId.toString());
        formData.append('image_url', imageFile); // Try with image_url (from your schema)
        formData.append('caption', caption || "");
        
        console.log("Attempting upload with FormData");
        try {
            const response = await axios.post(getCleanUrl(API_URL), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("Photo uploaded successfully:", response.data);
            return response.data;
        } catch (formDataError) {
            console.error("FormData upload failed, trying alternative method...", formDataError);
            
            // Try method 2: Using JSON with Base64
            const base64Image = await fileToBase64(imageFile);
            const jsonData = {
                issue_id: issueId,
                image_url: base64Image,
                caption: caption || "",
                taken_at: null
            };
            
            console.log("Attempting upload with Base64 JSON");
            const response = await axios.post(getCleanUrl(API_URL), jsonData);
            console.log("Photo uploaded successfully (Base64):", response.data);
            return response.data;
        }
    } catch (error: any) {
        console.error("All photo upload methods failed:", error);
        if (error.response) {
            console.error("Status code:", error.response.status);
            console.error("Response data:", error.response.data);
        }
        alert(`Error uploading photo: ${error.message || "Unknown error"}`);
        throw error;
    }
};

export const DeletePhoto = async (id: number | string) => {
    try {
        console.log("Attempting to delete photo with ID:", id);
        
        // Make sure API URL doesn't have trailing slash
        const deleteUrl = `${getCleanUrl(API_URL)}/${id}`;
        console.log("Delete URL:", deleteUrl);
        
        const response = await axios.delete(deleteUrl);
        console.log("Photo deleted:", response.data);
        return response.data;
    } catch (error: any) {
        console.error("Error deleting photo:", error);
        if (error.response) {
            console.error("Status code:", error.response.status);
            console.error("Response data:", error.response.data);
            alert(`Error deleting photo: ${error.response.status} ${error.response.statusText}`);
        } else {
            alert("Error deleting photo: " + error.message);
        }
        throw error;
    }
};
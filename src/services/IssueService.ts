import axios from 'axios';
import { UploadPhoto } from './PhotoService';

const API_URL = import.meta.env.VITE_BACKEND_API + "issues";

export const GetIssues = async () => {
    try {
        const response = await axios.get(API_URL);
        console.log("Data received:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error loading issues:", error);
        alert("Error loading issues");
        return [];
    }
};

export const CreateIssue = async (issue: any) => {
    try {
        console.log("Creating issue with data:", issue);
        
        // First, create the issue record without photos
        const issueData = {
            motorcycle_id: issue.motorcycle_id,
            description: issue.description,
            issue_type: issue.issue_type,
            status: issue.status || 'pending',
            date_reported: issue.date_reported || new Date().toISOString()
        };
        
        console.log("Sending issue data:", issueData);
        
        // Create the issue first (without photos)
        const issueResponse = await axios.post(API_URL, issueData);
        console.log("Issue created:", issueResponse.data);
        
        const issueId = issueResponse.data.id;
        
        // If we have photos, upload them separately
        if (issue.photos && issue.photos instanceof FileList && issue.photos.length > 0) {
            console.log(`Uploading ${issue.photos.length} photos for issue ${issueId}`);
            
            // Upload each photo with a separate request
            for (let i = 0; i < issue.photos.length; i++) {
                try {
                    await UploadPhoto(
                        issueId, 
                        issue.photos[i],
                        issue.caption || ""
                    );
                } catch (photoError) {
                    console.error(`Failed to upload photo ${i+1}:`, photoError);
                    // Continue with next photo even if one fails
                }
            }
        }
        
        return issueResponse.data;
    } catch (error: any) {
        console.error("Error creating issue:", error);
        if (error.response) {
            console.error("Server response:", error.response.data);
            alert(`Error creating issue: ${error.response.status} ${error.response.statusText}`);
        } else {
            alert("Error creating issue: " + (error.message || "Unknown error"));
        }
        throw error;
    }
};

export const EditIssue = async (id: string, issue: any) => {
    try {
        // Update the issue data first
        const issueData = {
            motorcycle_id: issue.motorcycle_id,
            description: issue.description,
            issue_type: issue.issue_type,
            status: issue.status,
            date_reported: issue.date_reported
        };
        
        // Update the issue
        const issueResponse = await axios.put(`${API_URL}/${id}`, issueData);
        
        // Add new photos if any
        if (issue.photos && issue.photos instanceof FileList && issue.photos.length > 0) {
            console.log(`Uploading ${issue.photos.length} photos for issue ${id}`);
            
            // Upload each photo with a separate request
            for (let i = 0; i < issue.photos.length; i++) {
                try {
                    await UploadPhoto(
                        parseInt(id), 
                        issue.photos[i],
                        issue.caption || ""
                    );
                } catch (photoError) {
                    console.error(`Failed to upload photo ${i+1}:`, photoError);
                    // Continue with next photo even if one fails
                }
            }
        }
        
        return issueResponse.data;
    } catch (error: any) {
        console.error("Error updating issue:", error);
        if (error.response) {
            console.error("Server response:", error.response.data);
            alert(`Error updating issue: ${error.response.status} ${error.response.statusText}`);
        } else {
            alert("Error updating issue: " + (error.message || "Unknown error"));
        }
        throw error;
    }
};

export const DeleteIssue = async (id: string) => {
    try {
        console.log("Attempting to delete issue with ID:", id);
        
        // Convert id to number if needed (some APIs require numeric IDs)
        const numericId = parseInt(id);
        
        // Make sure API URL doesn't have trailing slash
        const cleanUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
        const deleteUrl = `${cleanUrl}/${id}`;
        
        console.log("Delete URL:", deleteUrl);
        
        const response = await axios.delete(deleteUrl);
        console.log("Issue deletion response:", response.data);
        
        return response.data;
    } catch (error: any) {
        console.error("Error deleting issue:", error);
        
        // More detailed error logging
        if (error.response) {
            console.error("Status code:", error.response.status);
            console.error("Response data:", error.response.data);
            alert(`Error deleting issue: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
        } else if (error.request) {
            console.error("No response received:", error.request);
            alert("Error deleting issue: No response from server");
        } else {
            console.error("Error message:", error.message);
            alert("Error deleting issue: " + error.message);
        }
        
        throw error;
    }
};
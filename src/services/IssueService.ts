import axios from 'axios';
import GetInstanceAxios from '../components/authInstance';

const API_URL = import.meta.env.VITE_BACKEND_API + "issues";

// Crear una instancia de axios configurada para autenticación
const instance = GetInstanceAxios({ API_URL });

export const GetIssues = async () => {
    try {
        const response = await instance.get('');
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
        
        // Create the issue without photos
        const issueData = {
            motorcycle_id: issue.motorcycle_id,
            description: issue.description,
            issue_type: issue.issue_type,
            status: issue.status || 'pending',
            date_reported: issue.date_reported || new Date().toISOString()
        };
        
        console.log("Sending issue data:", issueData);
        
        // Create the issue using the authenticated instance
        const issueResponse = await instance.post('', issueData);
        console.log("Issue created:", issueResponse.data);
        
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
        // Update the issue data
        const issueData = {
            motorcycle_id: issue.motorcycle_id,
            description: issue.description,
            issue_type: issue.issue_type,
            status: issue.status,
            date_reported: issue.date_reported
        };
        
        // Update the issue using the authenticated instance
        const issueResponse = await instance.put(`/${id}`, issueData);
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
        
        // Use the authenticated instance for deletion
        const response = await instance.delete(`/${id}`);
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
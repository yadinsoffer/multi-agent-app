// API Base URL - will use relative path in production
export const API_BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001';

// API Endpoints
export const ENDPOINTS = {
    UPDATE_AGENT_CONFIG: '/api/config/agents',
    GET_BACKUPS: '/api/config/agents/backups',
    RESTORE_BACKUP: '/api/config/agents/restore',
};

// Function for partial configuration updates
export const updatePartialConfig = async (updates) => {
    try {
        const response = await fetch(`${API_BASE_URL}${ENDPOINTS.UPDATE_AGENT_CONFIG}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
        });

        if (!response.ok) {
            throw new Error('Failed to update configuration');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating configuration:', error);
        throw error;
    }
};

// Function to update all agent configurations
export const updateAgentConfig = async (config) => {
    try {
        const response = await fetch(`${API_BASE_URL}${ENDPOINTS.UPDATE_AGENT_CONFIG}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // Agent Names
                agentNames: {
                    lance: config.AGENT_LANCE,
                    john: config.AGENT_JOHN,
                    sydney: config.AGENT_SYDNEY,
                    ron: config.AGENT_RON,
                    jerry: config.AGENT_JERRY,
                },
                // Role Names
                roleNames: {
                    teamLead: config.ROLE_TEAM_LEAD,
                    voiceCoordinator: config.ROLE_VOICE_COORDINATOR,
                    salesSpecialist: config.ROLE_SALES_SPECIALIST,
                    listingSpecialist: config.ROLE_LISTING_SPECIALIST,
                    dataSpecialist: config.ROLE_DATA_SPECIALIST,
                    legalCounsel: config.ROLE_LEGAL_COUNSEL,
                    adminAssistant: config.ROLE_ADMINISTRATIVE_ASSISTANT,
                    videoEditor: config.ROLE_VIDEO_EDITOR,
                },
                // Chat Messages
                messages: {
                    lanceWelcome: config.MESSAGE_LANCE_WELCOME,
                    lanceStatusRequest: config.MESSAGE_LANCE_STATUS_REQUEST,
                    johnUpdate: config.MESSAGE_JOHN_UPDATE,
                    johnToSydney: config.MESSAGE_JOHN_TO_SYDNEY,
                    sydneyCalling: config.MESSAGE_SYDNEY_CALLING,
                    incomingCall: config.MESSAGE_INCOMING_CALL,
                },
                // Listing Tasks
                listingTasks: {
                    propertyDetails: config.TASK_PROPERTY_DETAILS,
                    photography: config.TASK_PHOTOGRAPHY,
                    description: config.TASK_DESCRIPTION,
                    virtualTour: config.TASK_VIRTUAL_TOUR,
                    staging: config.TASK_STAGING,
                    marketAnalysis: config.TASK_MARKET_ANALYSIS,
                    mlsListing: config.TASK_MLS_LISTING,
                    marketing: config.TASK_MARKETING,
                },
                // Role Assignments
                availableRoles: config.AVAILABLE_AGENT_ROLES,
                validRoles: config.VALID_AGENT_ROLES,
                agentRoles: config.AGENT_ROLES,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to update agent configuration');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating agent configuration:', error);
        throw error;
    }
};

// Function to fetch current agent configuration
export const fetchAgentConfig = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}${ENDPOINTS.UPDATE_AGENT_CONFIG}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch agent configuration');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching agent configuration:', error);
        throw error;
    }
};

// Function to get list of available backups
export const fetchBackups = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}${ENDPOINTS.GET_BACKUPS}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch backups');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching backups:', error);
        throw error;
    }
};

// Function to restore from a specific backup
export const restoreBackup = async (backupId) => {
    try {
        const response = await fetch(`${API_BASE_URL}${ENDPOINTS.RESTORE_BACKUP}/${backupId}`, {
            method: 'POST',
        });
        
        if (!response.ok) {
            throw new Error('Failed to restore backup');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error restoring backup:', error);
        throw error;
    }
}; 
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const initialConfig = require('./initialConfig');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Paths for Vercel deployment
const BACKUPS_DIR = path.join('/tmp', 'backups');
const CONFIG_FILE = path.join('/tmp', 'config.json');
const FRONTEND_CONFIG_FILE = path.join(__dirname, '../src/config/agents.js');

// Ensure backup directory exists and initial config
async function ensureDirectories() {
    try {
        await fs.mkdir(BACKUPS_DIR, { recursive: true });
        // Check if config exists, if not create it with initial config
        try {
            await fs.access(CONFIG_FILE);
        } catch {
            await writeConfig(initialConfig);
        }
    } catch (error) {
        console.error('Error creating directories:', error);
    }
}

ensureDirectories();

// Helper function to read current config
async function readConfig() {
    try {
        const data = await fs.readFile(CONFIG_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return null;
    }
}

// Helper function to write config and update frontend
async function writeConfig(config) {
    // Write to config.json
    await fs.writeFile(CONFIG_FILE, JSON.stringify(config, null, 2));
    
    // Update frontend agents.js file
    const agentsContent = generateAgentsFileContent(config);
    await fs.writeFile(FRONTEND_CONFIG_FILE, agentsContent);
}

// Helper function to generate agents.js content
function generateAgentsFileContent(config) {
    return `// Agent name constants
export let AGENT_LANCE = "${config.agentNames?.lance || ''}";
export let AGENT_JOHN = "${config.agentNames?.john || ''}";
export let AGENT_SYDNEY = "${config.agentNames?.sydney || ''}";
export let AGENT_RON = "${config.agentNames?.ron || ''}";
export let AGENT_JERRY = "${config.agentNames?.jerry || ''}";

// Role constants - unified for all components
export let ROLE_TEAM_LEAD = "${config.roleNames?.teamLead || ''}";
export let ROLE_VOICE_COORDINATOR = "${config.roleNames?.voiceCoordinator || ''}";
export let ROLE_SALES_SPECIALIST = "${config.roleNames?.salesSpecialist || ''}";
export let ROLE_LISTING_SPECIALIST = "${config.roleNames?.listingSpecialist || ''}";
export let ROLE_DATA_SPECIALIST = "${config.roleNames?.dataSpecialist || ''}";
export let ROLE_LEGAL_COUNSEL = "${config.roleNames?.legalCounsel || ''}";
export let ROLE_ADMINISTRATIVE_ASSISTANT = "${config.roleNames?.adminAssistant || ''}";
export let ROLE_VIDEO_EDITOR = "${config.roleNames?.videoEditor || ''}";

// Chat message constants
export let MESSAGE_LANCE_WELCOME = "${config.messages?.lanceWelcome || ''}";
export let MESSAGE_LANCE_STATUS_REQUEST = "${config.messages?.lanceStatusRequest || ''}";
export let MESSAGE_JOHN_UPDATE = "${config.messages?.johnUpdate || ''}";
export let MESSAGE_JOHN_TO_SYDNEY = "${config.messages?.johnToSydney || ''}";
export let MESSAGE_SYDNEY_CALLING = "${config.messages?.sydneyCalling || ''}";
export let MESSAGE_INCOMING_CALL = "${config.messages?.incomingCall || ''}";

// Listing task constants
export let TASK_PROPERTY_DETAILS = "${config.listingTasks?.propertyDetails || ''}";
export let TASK_PHOTOGRAPHY = "${config.listingTasks?.photography || ''}";
export let TASK_DESCRIPTION = "${config.listingTasks?.description || ''}";
export let TASK_VIRTUAL_TOUR = "${config.listingTasks?.virtualTour || ''}";
export let TASK_STAGING = "${config.listingTasks?.staging || ''}";
export let TASK_MARKET_ANALYSIS = "${config.listingTasks?.marketAnalysis || ''}";
export let TASK_MLS_LISTING = "${config.listingTasks?.mlsListing || ''}";
export let TASK_MARKETING = "${config.listingTasks?.marketing || ''}";

// List of all listing tasks
export let LISTING_TASKS = [
    TASK_PROPERTY_DETAILS,
    TASK_PHOTOGRAPHY,
    TASK_DESCRIPTION,
    TASK_VIRTUAL_TOUR,
    TASK_STAGING,
    TASK_MARKET_ANALYSIS,
    TASK_MLS_LISTING,
    TASK_MARKETING
];

// List of available agent roles
export let AVAILABLE_AGENT_ROLES = [
    ROLE_TEAM_LEAD,
    ROLE_VOICE_COORDINATOR,
    ROLE_SALES_SPECIALIST,
    ROLE_LISTING_SPECIALIST,
    ROLE_DATA_SPECIALIST
];

// List of valid agent roles
export let VALID_AGENT_ROLES = [
    ROLE_TEAM_LEAD,
    ROLE_VOICE_COORDINATOR,
    ROLE_SALES_SPECIALIST,
    ROLE_LISTING_SPECIALIST,
    ROLE_DATA_SPECIALIST
];

// Agent roles mapping
export let AGENT_ROLES = {
    [AGENT_LANCE]: ROLE_TEAM_LEAD,
    [AGENT_JOHN]: ROLE_SALES_SPECIALIST,
    [AGENT_SYDNEY]: ROLE_VOICE_COORDINATOR,
    [AGENT_RON]: ROLE_LISTING_SPECIALIST,
    [AGENT_JERRY]: ROLE_LISTING_SPECIALIST
};

// Function to get current configuration
export const getCurrentConfig = () => ({
    agentNames: {
        lance: AGENT_LANCE,
        john: AGENT_JOHN,
        sydney: AGENT_SYDNEY,
        ron: AGENT_RON,
        jerry: AGENT_JERRY,
    },
    roleNames: {
        teamLead: ROLE_TEAM_LEAD,
        voiceCoordinator: ROLE_VOICE_COORDINATOR,
        salesSpecialist: ROLE_SALES_SPECIALIST,
        listingSpecialist: ROLE_LISTING_SPECIALIST,
        dataSpecialist: ROLE_DATA_SPECIALIST,
        legalCounsel: ROLE_LEGAL_COUNSEL,
        adminAssistant: ROLE_ADMINISTRATIVE_ASSISTANT,
        videoEditor: ROLE_VIDEO_EDITOR,
    },
    messages: {
        lanceWelcome: MESSAGE_LANCE_WELCOME,
        lanceStatusRequest: MESSAGE_LANCE_STATUS_REQUEST,
        johnUpdate: MESSAGE_JOHN_UPDATE,
        johnToSydney: MESSAGE_JOHN_TO_SYDNEY,
        sydneyCalling: MESSAGE_SYDNEY_CALLING,
        incomingCall: MESSAGE_INCOMING_CALL,
    },
    listingTasks: {
        propertyDetails: TASK_PROPERTY_DETAILS,
        photography: TASK_PHOTOGRAPHY,
        description: TASK_DESCRIPTION,
        virtualTour: TASK_VIRTUAL_TOUR,
        staging: TASK_STAGING,
        marketAnalysis: TASK_MARKET_ANALYSIS,
        mlsListing: TASK_MLS_LISTING,
        marketing: TASK_MARKETING,
    },
    availableRoles: AVAILABLE_AGENT_ROLES,
    validRoles: VALID_AGENT_ROLES,
    agentRoles: AGENT_ROLES,
});
`;
}

// Helper function to create backup
async function createBackup(config) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(BACKUPS_DIR, `backup-${timestamp}.json`);
    await fs.writeFile(backupPath, JSON.stringify(config, null, 2));
    return backupPath;
}

// Get current configuration
app.get('/api/config/agents', async (req, res) => {
    try {
        const config = await readConfig();
        if (!config) {
            return res.status(404).json({ error: 'Configuration not found' });
        }
        res.json(config);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read configuration' });
    }
});

// Update entire configuration
app.put('/api/config/agents', async (req, res) => {
    try {
        const currentConfig = await readConfig();
        if (currentConfig) {
            await createBackup(currentConfig);
        }
        await writeConfig(req.body);
        res.json({ message: 'Configuration updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update configuration' });
    }
});

// Partial update configuration
app.patch('/api/config/agents', async (req, res) => {
    try {
        const currentConfig = await readConfig() || {};
        await createBackup(currentConfig);

        // Deep merge the updates
        const updatedConfig = {
            ...currentConfig,
            ...req.body,
            roleNames: {
                ...(currentConfig.roleNames || {}),
                ...(req.body.roleNames || {})
            },
            messages: {
                ...(currentConfig.messages || {}),
                ...(req.body.messages || {})
            },
            listingTasks: {
                ...(currentConfig.listingTasks || {}),
                ...(req.body.listingTasks || {})
            }
        };

        await writeConfig(updatedConfig);
        res.json({ message: 'Configuration updated successfully', config: updatedConfig });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update configuration' });
    }
});

// Get list of backups
app.get('/api/config/agents/backups', async (req, res) => {
    try {
        const files = await fs.readdir(BACKUPS_DIR);
        const backups = files.filter(file => file.startsWith('backup-'));
        res.json(backups);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch backups' });
    }
});

// Restore from backup
app.post('/api/config/agents/restore/:filename', async (req, res) => {
    try {
        const backupPath = path.join(BACKUPS_DIR, req.params.filename);
        const backupData = await fs.readFile(backupPath, 'utf8');
        const backupConfig = JSON.parse(backupData);
        
        // Backup current config before restoring
        const currentConfig = await readConfig();
        if (currentConfig) {
            await createBackup(currentConfig);
        }
        
        await writeConfig(backupConfig);
        res.json({ message: 'Configuration restored successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to restore backup' });
    }
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// Export for Vercel
module.exports = app; 
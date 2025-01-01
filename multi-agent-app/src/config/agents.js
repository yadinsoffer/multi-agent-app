// Agent name constants
export let AGENT_LANCE = "Bob (Synthetic Teams)";
export let AGENT_JOHN = "John (Synthetic Teams)";
export let AGENT_SYDNEY = "Sydney (Synthetic Teams)";
export let AGENT_RON = "Ron (Synthetic Teams)";
export let AGENT_JERRY = "Jerry (Synthetic Teams)";

// Role constants - unified for all components
export let ROLE_TEAM_LEAD = "Team Lead";
export let ROLE_VOICE_COORDINATOR = "Voice Coordinator";
export let ROLE_SALES_SPECIALIST = "Sales Specialist";
export let ROLE_LISTING_SPECIALIST = "Listing Specialist";
export let ROLE_DATA_SPECIALIST = "Data Specialist";
export let ROLE_LEGAL_COUNSEL = "Legal Counsel";
export let ROLE_ADMINISTRATIVE_ASSISTANT = "Administrative Assistant";
export let ROLE_VIDEO_EDITOR = "Video Editor";

// Chat message constants
export let MESSAGE_LANCE_WELCOME = "Hi Lorenzo, welcome back! We just wrapped up the contract for Rachel and sent her the DocuSign. We're now scheduling the showing with John.";
export let MESSAGE_LANCE_STATUS_REQUEST = "@John can you please update the status of the scheduling?";
export let MESSAGE_JOHN_UPDATE = "Hey Lance and Lorenzo, I sent Larry 2 emails to schedule but no response. I'm going to have our voice agent Sydney try to call him directly.";
export let MESSAGE_JOHN_TO_SYDNEY = "Sydney please let me know if you get ahold of him!";
export let MESSAGE_SYDNEY_CALLING = "📞 Calling Larry...";
export let MESSAGE_INCOMING_CALL = "Incoming call from Yadin...";

// Listing task constants
export let TASK_PROPERTY_DETAILS = "Gathering property details and specifications";
export let TASK_PHOTOGRAPHY = "Preparing professional photography schedule";
export let TASK_DESCRIPTION = "Creating property description draft";
export let TASK_VIRTUAL_TOUR = "Setting up virtual tour arrangements";
export let TASK_STAGING = "Organizing staging consultation";
export let TASK_MARKET_ANALYSIS = "Preparing comparative market analysis";
export let TASK_MLS_LISTING = "Setting up MLS listing draft";
export let TASK_MARKETING = "Coordinating marketing materials";

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

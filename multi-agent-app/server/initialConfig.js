const initialConfig = {
    agentNames: {
        lance: "Bob (Synthetic Teams)",
        john: "John (Synthetic Teams)",
        sydney: "Sydney (Synthetic Teams)",
        ron: "Ron (Synthetic Teams)",
        jerry: "Jerry (Synthetic Teams)"
    },
    roleNames: {
        teamLead: "Team Lead",
        voiceCoordinator: "Voice Coordinator",
        salesSpecialist: "Sales Specialist",
        listingSpecialist: "Listing Specialist",
        dataSpecialist: "Data Specialist",
        legalCounsel: "Legal Counsel",
        adminAssistant: "Administrative Assistant",
        videoEditor: "Video Editor"
    },
    messages: {
        lanceWelcome: "Hi Lorenzo, welcome back! We just wrapped up the contract for Rachel and sent her the DocuSign. We're now scheduling the showing with John.",
        lanceStatusRequest: "@John can you please update the status of the scheduling?",
        johnUpdate: "Hey Lance and Lorenzo, I sent Larry 2 emails to schedule but no response. I'm going to have our voice agent Sydney try to call him directly.",
        johnToSydney: "Sydney please let me know if you get ahold of him!",
        sydneyCalling: "📞 Calling Larry...",
        incomingCall: "Incoming call from Yadin..."
    },
    listingTasks: {
        propertyDetails: "Gathering property details and specifications",
        photography: "Preparing professional photography schedule",
        description: "Creating property description draft",
        virtualTour: "Setting up virtual tour arrangements",
        staging: "Organizing staging consultation",
        marketAnalysis: "Preparing comparative market analysis",
        mlsListing: "Setting up MLS listing draft",
        marketing: "Coordinating marketing materials"
    }
};

module.exports = initialConfig; 
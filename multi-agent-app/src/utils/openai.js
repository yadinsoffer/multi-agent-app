import OpenAI from 'openai';

// Check if API key is available
const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
if (!apiKey) {
    console.error('OpenAI API key is missing. Please check your .env file.');
}

const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
});

const analyzeMessage = async (messages) => {
    if (!apiKey) {
        console.error('OpenAI API key is missing. Tasks will not be updated.');
        return [];
    }

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: `You are a task analyzer that converts chat messages into current task statuses. 
                    Based on the conversation, identify the main tasks and their current status.
                    Return a JSON array of tasks with 'text' and 'status' properties.
                    Status can be 'not_started', 'in_progress', or 'completed'.
                    Keep task descriptions concise and action-oriented.`
                },
                {
                    role: "user",
                    content: JSON.stringify(messages)
                }
            ],
            temperature: 0.3,
            max_tokens: 500
        });

        return JSON.parse(response.choices[0].message.content);
    } catch (error) {
        console.error('Error analyzing message:', error);
        return [];
    }
};

export { analyzeMessage }; 
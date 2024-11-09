import fetch from "node-fetch";

export async function checkToxicity(content) {
    const apiKey = process.env.PERSPECTIVE_API_KEY;  // Store your API key in the .env file
    const url = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${apiKey}`;

    const body = {
        comment: { text: content },
        languages: ["en"],
        requestedAttributes: {
            TOXICITY: {},  // You can check for other attributes like SEVERE_TOXICITY, INSULT, etc.
        }
    };

    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error("Perspective API request failed");
        }

        const result = await response.json();
        return result.attributeScores.TOXICITY.summaryScore.value;  // Returns toxicity score
    } catch (error) {
        console.error("Error calling Perspective API:", error);
        throw error;
    }
}
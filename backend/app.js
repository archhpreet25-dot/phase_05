import express from "express";
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const app = express();

const PORT = process.env.PORT;

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.use(express.json());
app.use(express.static("../frontend"));

app.post("/ask", async (req, res) => {
    try {
        const { question } = req.body;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Answer this question briefly in 2-3 sentences: ${question}`
        });

        res.json({
            answer: response.text
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Something went wrong"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});

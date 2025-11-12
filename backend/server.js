import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const filePath = './feedback.json';

app.post('/analyze', (req, res) => {const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const { analyzeFeedback } = require("./ai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const filePath = "./feedback.json";

app.post("/analyze", async (req, res) => {
  const { name, email, feedback } = req.body;

  if (!feedback) {
    return res.status(400).json({ message: "Feedback is required" });
  }

  try {
    // Get AI summary
    const aiResult = await analyzeFeedback(feedback);

    // Save feedback with AI summary
    let feedbackData = [];
    if (fs.existsSync(filePath)) {
      feedbackData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    }

    const newFeedback = {
      name,
      email,
      feedback,
      date: new Date(),
      summary: aiResult.summary,
      sentiment: aiResult.sentiment
    };

    feedbackData.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(feedbackData, null, 2));

    res.json({ message: "Feedback saved successfully!", ...aiResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get AI summary" });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

  const { name, email, feedback } = req.body;

  if (!feedback) {
    return res.status(400).json({ message: 'Feedback is required' });
  }

  // Generate a basic mock summary (you can replace with AI later)
  const summary = `Thanks ${name || 'user'}, we’ve received your feedback. It seems ${feedback.length > 50 ? 'detailed' : 'short but helpful'}.`;

  // Save to feedback.json
  let feedbackData = [];
  if (fs.existsSync(filePath)) {
    feedbackData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }

  const newFeedback = { name, email, feedback, date: new Date(), summary };
  feedbackData.push(newFeedback);
  fs.writeFileSync(filePath, JSON.stringify(feedbackData, null, 2));

  // Send the summary back to frontend
  res.json({ message: 'Feedback saved successfully!', summary });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

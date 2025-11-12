// backend/ai.js
const https = require("https");

async function analyzeFeedback(message) {
  const prompt = `Summarize and detect sentiment for this feedback: "${message}"`;

  const data = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }]
  });

  const options = {
    hostname: "api.openai.com",
    path: "/v1/chat/completions",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer YOUR_API_KEY`
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let body = "";
      res.on("data", chunk => body += chunk);
      res.on("end", () => {
        try {
          const response = JSON.parse(body);
          const aiText = response.choices[0].message.content;
          // Simple sentiment detection
          const sentiment = aiText.toLowerCase().includes("positive") ? "Positive" : "Negative";
          resolve({ summary: aiText, sentiment });
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

module.exports = { analyzeFeedback };

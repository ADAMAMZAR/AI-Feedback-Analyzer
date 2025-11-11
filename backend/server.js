const http = require("http");
const fs = require("fs");
const { analyzeFeedback } = require("./ai");

const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/submit") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", async () => {
      const feedback = JSON.parse(body);

      // Call AI API
      const analysis = await analyzeFeedback(feedback.message);
      const dataToSave = { ...feedback, ...analysis };

      // Save to JSON file
      const all = JSON.parse(fs.readFileSync("feedback.json", "utf8") || "[]");
      all.push(dataToSave);
      fs.writeFileSync("feedback.json", JSON.stringify(all, null, 2));

      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify(dataToSave));
    });
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(3000, () => console.log("Server running on http://localhost:3000"));

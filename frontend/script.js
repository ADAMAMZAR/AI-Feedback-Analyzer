document.getElementById("feedbackForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  const res = await fetch("http://localhost:3000/submit", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  });
  const feedback = await res.json();
  document.getElementById("result").innerText =
    `Summary: ${feedback.summary}\nSentiment: ${feedback.sentiment}`;
});

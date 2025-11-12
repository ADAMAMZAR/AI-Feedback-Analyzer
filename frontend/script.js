document.getElementById('feedbackForm').addEventListener('submit', async (e) => {
  e.preventDefault(); // prevent page reload

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const feedback = document.getElementById('feedback').value;

  const response = await fetch('http://localhost:3000/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, feedback })
  });

  const data = await response.json();

  // Display all info
  document.getElementById('result').innerHTML = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Feedback:</strong> ${feedback}</p>
    <p><strong>Summary:</strong> ${data.summary}</p>
  `;
});

function analyze() {
  const drug = document.getElementById("drug").value.trim() || "Unknown Drug";
  const text = document.getElementById("text").value.toLowerCase();
  const result = document.getElementById("result");

  const signals = {
    "severe headache": 3,
    "headache": 1,
    "nausea": 1,
    "vomiting": 2,
    "dizziness": 1,
    "rash": 2,
    "bleeding": 3,
    "chest pain": 3,
    "shortness of breath": 3,
    "allergic reaction": 3,
    "fatigue": 1,
    "fever": 1
  };

  const detected = [];

  for (const signal in signals) {
    if (text.includes(signal)) {
      detected.push({
        name: signal,
        score: signals[signal]
      });
    }
  }

  const totalScore = detected.reduce((sum, item) => sum + item.score, 0);

  let risk = "LOW";

  if (totalScore >= 5) {
    risk = "HIGH";
  } else if (totalScore >= 2) {
    risk = "MEDIUM";
  }

  if (detected.length === 0) {
    result.innerHTML = `
      <div class="result">
        <h3>✓ No obvious safety signal detected</h3>
        <p>Drug: ${drug}</p>
        <p>No predefined safety indicators were found in the provided text.</p>
      </div>
    `;
    return;
  }

  result.innerHTML = `
    <div class="result">
      <h3>⚠ Potential Safety Signal</h3>
      <p><strong>Drug:</strong> ${drug}</p>
      <p><strong>Risk Level:</strong> ${risk}</p>
      <p><strong>Detected Signals:</strong></p>
      <ul>
        ${detected.map(item => `<li>${item.name}</li>`).join("")}
      </ul>
      <p><strong>Recommendation:</strong> Further human review is required.</p>
    </div>
  `;
}

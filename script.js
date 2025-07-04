function searchWord() {
  const word = document.getElementById('wordInput').value.trim();
  const resultBox = document.getElementById('result');

  if (!word) {
    resultBox.innerHTML = `<p>Please enter a word.</p>`;
    return;
  }

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => response.json())
    .then(data => {
      if (data.title === "No Definitions Found") {
        resultBox.innerHTML = `<p>No definitions found for "${word}".</p>`;
      } else {
        const definition = data[0].meanings[0].definitions[0].definition;
        const partOfSpeech = data[0].meanings[0].partOfSpeech;
       

        resultBox.innerHTML = `
          <h2>${word}</h2>
          
          <p><strong>Part of Speech:</strong> ${partOfSpeech}</p>
          <p><strong>Definition:</strong> ${definition}</p>
        `;
      }
    })
    .catch(() => {
      resultBox.innerHTML = `<p>Error fetching definition.</p>`;
    });
}

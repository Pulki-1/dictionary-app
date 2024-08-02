
const commonWords = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'indigo', 'jackfruit'];

document.getElementById('wordInput').addEventListener('input', function() {
    const inputVal = this.value.toLowerCase();
    const hintList = document.getElementById('hintList');
    hintList.innerHTML = '';

    if (inputVal.length > 0) {
        const hints = commonWords.filter(word => word.startsWith(inputVal));
        hints.forEach(hint => {
            const hintItem = document.createElement('div');
            hintItem.classList.add('hintItem');
            hintItem.textContent = hint;
            hintItem.addEventListener('click', function() {
                document.getElementById('wordInput').value = hint;
                hintList.innerHTML = '';
                hintList.style.display = 'none';
            });
            hintList.appendChild(hintItem);
        });
        hintList.style.display = 'block';
    } else {
        hintList.style.display = 'none';
    }
});

document.getElementById('searchButton').addEventListener('click', function() {
    const word = document.getElementById('wordInput').value;
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const wordDetails = document.getElementById('wordDetails');
            wordDetails.innerHTML = '';
            const wordTitle = data[0].word;
            document.getElementById('wordTitle').textContent = wordTitle;

            data[0].meanings.forEach(meaning => {
                const partOfSpeech = document.createElement('div');
                partOfSpeech.classList.add('partOfSpeech');
                partOfSpeech.textContent = meaning.partOfSpeech;
                wordDetails.appendChild(partOfSpeech);

                meaning.definitions.forEach(definition => {
                    const wordDefinition = document.createElement('div');
                    wordDefinition.classList.add('wordDefinition');

                    const definitionText = document.createElement('div');
                    definitionText.classList.add('definitionText');
                    definitionText.textContent = `Definition: ${definition.definition}`;
                    wordDefinition.appendChild(definitionText);

                    if (definition.example) {
                        const exampleText = document.createElement('div');
                        exampleText.classList.add('exampleText');
                        exampleText.textContent = `Example: ${definition.example}`;
                        wordDefinition.appendChild(exampleText);
                    }

                    wordDetails.appendChild(wordDefinition);
                });
            });
        })
        .catch(error => {
            document.getElementById('wordTitle').textContent = 'Error';
            document.getElementById('wordDetails').textContent = 'Word not found. Please try another word.';
        });
});

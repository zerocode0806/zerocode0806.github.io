// script.js
let dropdownOpen = false;

function toggleDropdown(dropdownId) {
    dropdownOpen = !dropdownOpen;
    const dropdownContent = document.getElementById(dropdownId);
    dropdownContent.style.display = dropdownOpen ? 'block' : 'none';
}

function selectTranslator(translator) {
    changeTranslatorMode(translator);
    toggleDropdown('translatorDropdown'); // Close the dropdown after selecting a translator
}

function changeTranslatorMode(translator) {
    document.querySelectorAll('.translator').forEach(translatorElement => {
        translatorElement.style.display = 'none';
    });

    document.getElementById(`${translator}Translator`).style.display = 'block';
}

function translateMorse() {
    const morseInput = document.getElementById('morseInput').value;
    const morseTranslation = textToMorse(morseInput);
    document.getElementById('morseResult').innerText = `Morse Code: ${morseTranslation}`;
}

function translateCaesar() {
    const caesarInput = document.getElementById('caesarInput').value;
    const caesarKey = parseInt(document.getElementById('caesarKey').value);
    const caesarTranslation = encryptMessage(caesarInput, caesarKey);
    document.getElementById('caesarResult').innerText = `Caesar Cipher: ${caesarTranslation}`;
}

function textToMorse(text) {
    const morseCode = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
        'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
        'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..',
        '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
        ' ': ' '
    };

    return text.toUpperCase().split('').map(char => morseCode[char] || '').join(' ');
}

function encryptMessage(message, shift) {
    let result = '';

    for (let i = 0; i < message.length; i++) {
        let char = message[i];

        if (char.match(/[a-zA-Z]/)) {
            let code = message.charCodeAt(i);
            let boundary = char === char.toUpperCase() ? 65 : 97;
            char = String.fromCharCode((code - boundary + shift) % 26 + boundary);
        }

        result += char;
    }

    return result;
}

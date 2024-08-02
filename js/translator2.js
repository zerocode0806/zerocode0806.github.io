let dropdownOpen = false;
let currentOption = 'morseCode'; // Default option

function toggleDropdown() {
    dropdownOpen = !dropdownOpen;
    const dropdownContent = document.getElementById('optionDropdown');
    dropdownContent.style.display = dropdownOpen ? 'block' : 'none';
}

function selectOption(option) {
    currentOption = option;
    changeTranslatorMode(option);
    toggleDropdown();
}

function changeTranslatorMode(option) {
    document.querySelectorAll('.translator').forEach(translator => {
        translator.style.display = 'none';
    });

    document.getElementById(option).style.display = 'block';
}

function translateMorse() {
    const morseInput = document.getElementById('morseInput').value;
    const textResult = morseToText(morseInput);
    document.getElementById('morseResult').innerText = `Translated Text: ${textResult}`;
}

function morseToText(morseCode) {
    const morseCodeDict = {
        '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F', '--.': 'G', '....': 'H', '..': 'I',
        '.---': 'J', '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R',
        '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X', '-.--': 'Y', '--..': 'Z',
        '-----': '0', '.----': '1', '..---': '2', '...--': '3', '....-': '4', '.....': '5', '-....': '6', '--...': '7',
        '---..': '8', '----.': '9',
        '/': ' ', '|': ' '
    };

    return morseCode.split(' ').map(code => morseCodeDict[code] || '').join('');

}

function translateIndo() {
    const indoInput = document.getElementById('indoInput').value;
    const morseResult = textToMorse(indoInput);
    document.getElementById('indoResult').innerText = `Translated Morse Code: ${morseResult}`;
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

function translateCaesar() {
    const caesarInput = document.getElementById('caesarInput').value;
    const caesarKey = parseInt(document.getElementById('caesarKey').value);
    const textResult = decryptCaesar(caesarInput, caesarKey);
    document.getElementById('caesarResult').innerText = `Decrypted Text: ${textResult}`;
}

function decryptCaesar(ciphertext, key) {
    const charCode = char.charCodeAt(0);

    if (char.match(/[a-zA-Z]/)) {
        const boundary = char === char.toUpperCase() ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
        return String.fromCharCode((charCode - boundary - key + 26) % 26 + boundary);
    }

    return char;
}

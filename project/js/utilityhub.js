let dropdownOpen = false;

function toggleDropdown() {
    dropdownOpen = !dropdownOpen;
    const dropdownContent = document.getElementById('optionDropdown');
    dropdownContent.style.display = dropdownOpen ? 'block' : 'none';
}

function selectUtility(utility) {
    changeUtilityMode(utility);

    // Clear input or results if necessary
    if (utility === 'morseCodeTranslator' || utility === 'calculator') {
        document.getElementById('translatorInput').value = '';
        document.getElementById('result').innerText = '';
        document.getElementById('calculatorInput').value = '';
        document.getElementById('calculatorResult').innerText = '';
    }

    // Close the dropdown after selecting a utility
    dropdownOpen = false;
    document.getElementById('optionDropdown').style.display = 'none';
}

function changeUtilityMode(utility) {
    document.querySelectorAll('.utility').forEach(element => {
        element.style.display = 'none';
    });

    const selectedUtility = document.getElementById(utility);
    if (selectedUtility) {
        selectedUtility.style.display = 'block';
    }
}

function speak() {
    const text = document.getElementById('speechInput').value;
    const language = document.getElementById('languageSelect').value;

    if (text) {
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = language;
        window.speechSynthesis.speak(speech);
    } else {
        alert("Please enter text to speak.");
    }
}

function calculateAge() {
    const birthYear = document.getElementById('birthYear').value;
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;

    if (birthYear && !isNaN(age)) {
        document.getElementById('ageResult').innerText = `Your age is ${age} years.`;
    } else {
        document.getElementById('ageResult').innerText = 'Please enter a valid birth year.';
    }
}

function calculate() {
    const expression = document.getElementById('calculatorInput').value;
    try {
        const result = eval(expression);
        document.getElementById('calculatorResult').innerText = `Result: ${result}`;
    } catch (error) {
        document.getElementById('calculatorResult').innerText = 'Invalid calculation.';
    }
}

function convertCurrency() {
    const usdAmount = document.getElementById('usdAmount').value;
    const exchangeRate = 14000;

    if (usdAmount && !isNaN(usdAmount)) {
        const idrAmount = (usdAmount * exchangeRate).toLocaleString('en-US', { style: 'currency', currency: 'IDR' });
        document.getElementById('idrResult').innerText = `Equivalent in IDR: ${idrAmount}`;
    } else {
        document.getElementById('idrResult').innerText = 'Please enter a valid USD amount.';
    }
}

function translateText() {
    const translatorInput = document.getElementById('translatorInput').value;
    const morseTranslation = textToMorse(translatorInput);
    document.getElementById('result').innerText = morseTranslation;
}

function handleMorseCodeEncryption() {
    const message = document.getElementById("translatorInput").value;
    const morseCode = textToMorse(message);
    document.getElementById("result").innerHTML = morseCode;
}

function textToMorse(text) {
    const morseCode = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
        'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
        'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
        'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
        'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
        '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
        '9': '----.', '0': '-----', ' ': ' / '
    };
    return text.toUpperCase().split('').map(char => morseCode[char] || char).join(' ');
}

function translateText() {
    const translatorInput = document.getElementById('translatorInput').value;
    const option = document.getElementById('morseOption').value;

    let translationResult = '';
    if (option === 'textToMorse') {
        translationResult = textToMorse(translatorInput);
    } else if (option === 'morseToText') {
        translationResult = morseToText(translatorInput);
    }
    
    document.getElementById('result').innerText = translationResult;
}

function textToMorse(text) {
    const morseCode = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
        'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
        'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
        'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
        'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
        '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
        '9': '----.', '0': '-----', ' ': ' / '
    };
    return text.toUpperCase().split('').map(char => morseCode[char] || char).join(' ');
}

function morseToText(morse) {
    const text = {
        '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F',
        '--.': 'G', '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L',
        '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R',
        '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
        '-.--': 'Y', '--..': 'Z', '.----': '1', '..---': '2', '...--': '3',
        '....-': '4', '.....': '5', '-....': '6', '--...': '7', '---..': '8',
        '----.': '9', '-----': '0', ' / ': ' '
    };
    return morse.split(' ').map(code => text[code] || code).join('');
}

function translateCaesar() {
    const caesarInput = document.getElementById('caesarInput').value;
    const key = parseInt(document.getElementById('caesarKey').value);
    const option = document.getElementById('caesarOption').value;

    let translationResult = '';
    if (option === 'encrypt') {
        translationResult = caesarCipher(caesarInput, key);
    } else if (option === 'decrypt') {
        translationResult = caesarCipher(caesarInput, -key);
    }

    document.getElementById('caesarResult').innerText = translationResult;
}

function caesarCipher(text, key) {
    return text.split('').map(char => {
        const code = char.charCodeAt(0);
        if (char >= 'A' && char <= 'Z') {
            return String.fromCharCode(((code - 65 + key) % 26 + 26) % 26 + 65);
        } else if (char >= 'a' && char <= 'z') {
            return String.fromCharCode(((code - 97 + key) % 26 + 26) % 26 + 97);
        } else {
            return char;
        }
    }).join('');
}

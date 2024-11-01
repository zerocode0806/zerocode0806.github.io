let dropdownOpen = false;
let selectedVoice = null; // Variable to hold the selected voice

function toggleDropdown() {
    dropdownOpen = !dropdownOpen;
    const dropdownContent = document.getElementById('optionDropdown');
    dropdownContent.style.display = dropdownOpen ? 'block' : 'none';
}

function selectUtility(utility) {
    changeUtilityMode(utility);

    if (utility === 'morseCodeTranslator' || utility === 'calculator') {
        document.getElementById('translatorInput').value = '';
        document.getElementById('result').innerText = '';
        document.getElementById('calculatorInput').value = '';
        document.getElementById('calculatorResult').innerText = '';
    }

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

function loadVoices() {
    const voices = window.speechSynthesis.getVoices();
    const selectedGender = document.getElementById('voiceSelect').value;
    const language = document.getElementById('languageSelect').value;
    
    selectedVoice = voices.find(voice => voice.lang === language && voice.name.includes(selectedGender === 'male' ? 'Male' : 'Female'));
}

function speak() {
    const text = document.getElementById('speechInput').value;
    const language = document.getElementById('languageSelect').value;

    if (text) {
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = language;

        loadVoices();
        if (selectedVoice) {
            speech.voice = selectedVoice;
        }

        window.speechSynthesis.speak(speech);
    } else {
        alert("Please enter text to speak.");
    }
}

function downloadSpeech() {
    const text = document.getElementById('speechInput').value;
    if (!text) {
        alert("Please enter text to download.");
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    loadVoices();
    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }

    const audioContext = new AudioContext();
    const destination = audioContext.createMediaStreamDestination();
    const mediaRecorder = new MediaRecorder(destination.stream);
    const chunks = [];

    mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'speech.wav';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const synthSource = audioContext.createMediaStreamSource(destination.stream);
    synthSource.connect(audioContext.destination);

    mediaRecorder.start();
    window.speechSynthesis.speak(utterance);

    utterance.onend = () => {
        mediaRecorder.stop();
    };
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
    const conversionRate = 15000; // Example conversion rate
    const idrAmount = usdAmount * conversionRate;

    if (usdAmount && !isNaN(idrAmount)) {
        document.getElementById('idrResult').innerText = `Equivalent IDR: ${idrAmount}`;
    } else {
        document.getElementById('idrResult').innerText = 'Please enter a valid USD amount.';
    }
}

function translateText() {
    const text = document.getElementById('translatorInput').value;
    const morseOption = document.getElementById('morseOption').value;

    if (morseOption === 'textToMorse') {
        document.getElementById('result').innerText = textToMorse(text);
    } else {
        document.getElementById('result').innerText = morseToText(text);
    }
}

function textToMorse(text) {
    const morseCode = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
        'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
        'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
        'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
        '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----', ' ': '/'
    };

    return text.toUpperCase().split('').map(char => morseCode[char] || char).join(' ');
}

function morseToText(morse) {
    const textCode = {
        '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F', '--.': 'G', '....': 'H',
        '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P',
        '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
        '-.--': 'Y', '--..': 'Z', '.----': '1', '..---': '2', '...--': '3', '....-': '4', '.....': '5',
        '-....': '6', '--...': '7', '---..': '8', '----.': '9', '-----': '0', '/': ' '
    };

    return morse.split(' ').map(code => textCode[code] || code).join('');
}

function translateCaesar() {
    const text = document.getElementById('caesarInput').value;
    const key = parseInt(document.getElementById('caesarKey').value);
    const caesarOption = document.getElementById('caesarOption').value;

    if (caesarOption === 'encrypt') {
        document.getElementById('caesarResult').innerText = caesarCipher(text, key);
    } else {
        document.getElementById('caesarResult').innerText = caesarCipher(text, -key);
    }
}

function caesarCipher(text, shift) {
    return text.split('').map(char => {
        const code = char.charCodeAt();
        if (char >= 'A' && char <= 'Z') {
            return String.fromCharCode(((code - 65 + shift + 26) % 26) + 65);
        } else if (char >= 'a' && char <= 'z') {
            return String.fromCharCode(((code - 97 + shift + 26) % 26) + 97);
        } else {
            return char;
        }
    }).join('');
}

// Load voices for Text-to-Speech
window.speechSynthesis.onvoiceschanged = loadVoices;

// script.js
let dropdownOpen = false;

function toggleDropdown() {
    dropdownOpen = !dropdownOpen;
    const dropdownContent = document.getElementById('utilityDropdown');
    dropdownContent.style.display = dropdownOpen ? 'block' : 'none';
}

function selectUtility(utility) {
    changeUtilityMode(utility);
    toggleDropdown(); // Close the dropdown after selecting a utility
}

// ... (other functions)

function changeUtilityMode(utility) {
    // Pass the utility parameter to the function
    // const utilityMode = document.getElementById('utilityMode').value; // Remove this line
    const utilityMode = utility;

    // Hide all utilities
    document.querySelectorAll('.utility').forEach(utility => {
        utility.style.display = 'none';
    });

    // Display the selected utility
    document.getElementById(utilityMode).style.display = 'block';
}

// ... (other functions)


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

function convertCurrency() {
    const usdAmount = document.getElementById('usdAmount').value;
    const exchangeRate = 14000; // Example exchange rate (1 USD to IDR)

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
    document.getElementById('result').innerText = `Morse Code: ${morseTranslation}`;
}

function textToMorse(text) {
    const morseCode = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
        'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
        'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..',
        '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
        ' ': '/'
    };

    return text.toUpperCase().split('').map(char => morseCode[char] || '').join(' ');
}


function calculate() {
    const calculatorInput = document.getElementById('calculatorInput').value;

    try {
        const result = eval(calculatorInput);

        if (isNaN(result)) {
            throw new Error('Invalid calculation');
        }

        document.getElementById('calculatorResult').innerText = `Result: ${result}`;
    } catch (error) {
        document.getElementById('calculatorResult').innerText = 'Error: Invalid calculation';
    }
}
// script.js

// Fungsi untuk mengenkripsi pesan menggunakan Caesar Cipher
function encryptMessage(message, shift) {
    let result = '';

    for (let i = 0; i < message.length; i++) {
        let char = message[i];

        // Periksa apakah karakter adalah huruf alfabet
        if (char.match(/[a-zA-Z]/)) {
            // Ambil kode ASCII
            let code = message.charCodeAt(i);

            // Atur batas untuk huruf besar (uppercase) dan huruf kecil (lowercase)
            let boundary = char === char.toUpperCase() ? 65 : 97;

            // Lakukan penggeseran sesuai dengan shift
            char = String.fromCharCode((code - boundary + shift) % 26 + boundary);
        }

        // Tambahkan karakter ke hasil enkripsi
        result += char;
    }

    return result;
}

// Fungsi untuk menangani enkripsi pesan saat memilih Morse Code Translator
function handleMorseCodeEncryption() {
    const translatorInput = document.getElementById('translatorInput').value;
    const shift = 6; // Ganti dengan jumlah shift yang diinginkan

    // Enkripsi pesan
    const encryptedMessage = encryptMessage(translatorInput, shift);

    // Tampilkan hasil enkripsi
    document.getElementById('result').innerText = `Encrypted Message: ${encryptedMessage}`;
}

// Tambahkan ini ke dalam fungsi selectUtility() untuk Morse Code Translator
function selectUtility(utility) {
    changeUtilityMode(utility);

    if (utility === 'morseCodeTranslator') {
        // Reset input dan hasil enkripsi saat memilih Morse Code Translator
        document.getElementById('translatorInput').value = '';
        document.getElementById('result').innerText = '';
    }

    toggleDropdown(); // Tutup dropdown setelah memilih utilitas
}
// Fungsi untuk mengaktifkan atau menonaktifkan mode gelap
function toggleDarkMode() {
    const body = document.body;
    const nav = document.querySelector('nav');

    body.classList.toggle('dark-mode');
    nav.classList.toggle('nav-dark-mode');
}



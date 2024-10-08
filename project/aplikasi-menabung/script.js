// Mendapatkan elemen dari DOM
const targetInput = document.getElementById('target');
const amountPerDayInput = document.getElementById('amountPerDay');
const addButton = document.getElementById('addBtn');
const resetButton = document.getElementById('resetBtn');
const targetAmountDisplay = document.getElementById('targetAmount');
const remainingAmountDisplay = document.getElementById('remainingAmount');
const checkboxContainer = document.getElementById('checkboxContainer');

// Variabel untuk menyimpan data
let targetAmount = 0;
let remainingAmount = 0;
let amountPerDay = 0;
let days = 0;

// Fungsi untuk menyimpan data ke LocalStorage
function saveData() {
    localStorage.setItem('targetAmount', targetAmount);
    localStorage.setItem('remainingAmount', remainingAmount);
    localStorage.setItem('amountPerDay', amountPerDay);
    localStorage.setItem('days', days);
    localStorage.setItem('checkboxes', JSON.stringify(getCheckboxStates()));
}

// Fungsi untuk memuat data dari LocalStorage
function loadData() {
    targetAmount = parseInt(localStorage.getItem('targetAmount')) || 0;
    remainingAmount = parseInt(localStorage.getItem('remainingAmount')) || 0;
    amountPerDay = parseInt(localStorage.getItem('amountPerDay')) || 0;
    days = parseInt(localStorage.getItem('days')) || 0;

    targetAmountDisplay.textContent = formatCurrency(targetAmount);
    updateRemainingAmountDisplay();

    if (amountPerDay > 0 && days > 0) {
        createCheckboxes();
        const savedCheckboxes = JSON.parse(localStorage.getItem('checkboxes')) || [];
        applyCheckboxStates(savedCheckboxes);
    }
}

// Fungsi untuk menambahkan jumlah tabungan dan membuat checkbox
addButton.addEventListener('click', () => {
    const target = parseInt(targetInput.value);
    const inputAmountPerDay = parseInt(amountPerDayInput.value);

    if (!isNaN(target) && target > 0 && !isNaN(inputAmountPerDay) && inputAmountPerDay > 0) {
        targetAmount = target;
        amountPerDay = inputAmountPerDay;

        // Hitung jumlah hari menabung
        days = Math.ceil(targetAmount / amountPerDay);

        // Update tampilan target dan sisa target
        targetAmountDisplay.textContent = formatCurrency(targetAmount);
        remainingAmount = targetAmount;
        updateRemainingAmountDisplay();
        createCheckboxes();
        saveData();
    } else {
        alert('Masukkan target dan jumlah tabungan per hari yang valid!');
    }
});

// Fungsi untuk membuat checkbox berdasarkan jumlah hari
function createCheckboxes() {
    checkboxContainer.innerHTML = '';  // Reset container

    for (let i = 1; i <= days; i++) {
        const checkboxDiv = document.createElement('div');
        checkboxDiv.classList.add('checkbox-group');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `day${i}`;
        checkbox.value = amountPerDay;

        const label = document.createElement('label');
        label.htmlFor = `day${i}`;
        label.innerText = `Hari ${i} - Menabung Rp${formatCurrency(amountPerDay)}`;

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                remainingAmount -= parseInt(checkbox.value);
            } else {
                remainingAmount += parseInt(checkbox.value);
            }
            updateRemainingAmountDisplay();
            saveData(); // Simpan data setiap kali checkbox diubah
        });

        checkboxDiv.appendChild(checkbox);
        checkboxDiv.appendChild(label);
        checkboxContainer.appendChild(checkboxDiv);
    }
}

// Fungsi untuk memperbarui tampilan sisa target
function updateRemainingAmountDisplay() {
    if (remainingAmount >= 0) {
        remainingAmountDisplay.textContent = formatCurrency(remainingAmount);
    } else {
        remainingAmountDisplay.textContent = "lebih " + formatCurrency(Math.abs(remainingAmount));
    }
}

// Fungsi untuk format currency
function formatCurrency(value) {
    return 'Rp ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Fungsi untuk mereset data
resetButton.addEventListener('click', () => {
    targetAmount = 0;
    remainingAmount = 0;
    amountPerDay = 0;
    days = 0;
    localStorage.clear();  // Reset local storage

    targetAmountDisplay.textContent = formatCurrency(0);
    remainingAmountDisplay.textContent = formatCurrency(0);
    targetInput.value = '';
    amountPerDayInput.value = '';
    checkboxContainer.innerHTML = '';
});

// Fungsi untuk mendapatkan status checkbox
function getCheckboxStates() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    return Array.from(checkboxes).map(checkbox => checkbox.checked);
}

// Fungsi untuk menerapkan status checkbox
function applyCheckboxStates(states) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox, index) => {
        checkbox.checked = states[index];
        if (checkbox.checked) {
            remainingAmount -= parseInt(checkbox.value);
        }
    });
    updateRemainingAmountDisplay();
}

// Muat data dari local storage saat halaman di-refresh
window.onload = loadData;

// Mendapatkan elemen dari DOM
const targetInput = document.getElementById('target');
const daysInput = document.getElementById('days');
const amountInput = document.getElementById('amount');
const addButton = document.getElementById('addBtn');
const targetAmountDisplay = document.getElementById('targetAmount');
const remainingAmountDisplay = document.getElementById('remainingAmount');
const checkboxContainer = document.getElementById('checkboxContainer');
const resetButton = document.getElementById('resetBtn');
const savingOptionDropdown = document.getElementById('savingOption');

let targetAmount = 0;
let remainingAmount = 0;
let days = 0;
let amountPerDay = 0;

// Menampilkan input sesuai pilihan dropdown
savingOptionDropdown.addEventListener('change', () => {
    const selectedOption = savingOptionDropdown.value;
    const daysInputGroup = document.getElementById('daysInputGroup');
    const amountInputGroup = document.getElementById('amountInputGroup');

    if (selectedOption === 'days') {
        daysInputGroup.style.display = 'block';
        amountInputGroup.style.display = 'none';
        amountInput.value = ''; // Reset input amount jika beralih ke opsi hari
    } else {
        daysInputGroup.style.display = 'none';
        amountInputGroup.style.display = 'block';
        daysInput.value = ''; // Reset input days jika beralih ke opsi amount
    }
});

// Fungsi untuk menambahkan jumlah tabungan dan membuat checkbox
addButton.addEventListener('click', () => {
    targetAmount = parseInt(targetInput.value); // Parsing nilai target
    const savingOption = savingOptionDropdown.value;

    if (savingOption === 'days') {
        days = parseInt(daysInput.value); // Parsing nilai hari
        if (!isNaN(targetAmount) && targetAmount > 0 && !isNaN(days) && days > 0) {
            remainingAmount = targetAmount; // Set remaining amount ke target saat pertama kali
            amountPerDay = Math.ceil(targetAmount / days / 500) * 500; // Hitung jumlah tabungan per hari
            amountInput.value = amountPerDay; // Set input amount
            amountInput.disabled = true; // Disable input setelah ditetapkan

            // Update tampilan target dan sisa target
            targetAmountDisplay.textContent = formatCurrency(targetAmount);
            remainingAmountDisplay.textContent = formatCurrency(remainingAmount);
            createCheckboxes(days, amountPerDay);
        } else {
            alert('Masukkan target dan jumlah hari yang valid!');
        }
    } else {
        amountPerDay = parseInt(amountInput.value); // Parsing jumlah tabungan per hari
        if (!isNaN(targetAmount) && targetAmount > 0 && !isNaN(amountPerDay) && amountPerDay > 0) {
            days = Math.ceil(targetAmount / amountPerDay); // Hitung jumlah hari
            remainingAmount = targetAmount; // Set remaining amount ke target saat pertama kali

            // Update tampilan target dan sisa target
            targetAmountDisplay.textContent = formatCurrency(targetAmount);
            remainingAmountDisplay.textContent = formatCurrency(remainingAmount);
            createCheckboxes(days, amountPerDay);
        } else {
            alert('Masukkan target dan jumlah tabungan per hari yang valid!');
        }
    }
});

// Fungsi untuk membuat checkbox berdasarkan jumlah hari
function createCheckboxes(days, amountPerDay) {
    checkboxContainer.innerHTML = ''; // Reset container

    for (let i = 1; i <= days; i++) {
        const checkboxDiv = document.createElement('div');
        checkboxDiv.classList.add('checkbox-group');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `day${i}`;
        checkbox.value = amountPerDay; // Ambil nilai dari jumlah tabungan per hari
        
        const label = document.createElement('label');
        label.htmlFor = `day${i}`;
        label.innerText = `Hari ${i} - Menabung Rp${amountPerDay}`;

        // Tambahkan event listener untuk checkbox
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                remainingAmount -= parseInt(checkbox.value); // Mengurangi sisa target
            } else {
                remainingAmount += parseInt(checkbox.value); // Menambah sisa target
            }

            // Update tampilan sisa target
            updateRemainingAmountDisplay();
        });

        checkboxDiv.appendChild(checkbox);
        checkboxDiv.appendChild(label);
        checkboxContainer.appendChild(checkboxDiv);
    }
}

// Fungsi untuk memperbarui tampilan sisa target
function updateRemainingAmountDisplay() {
    if (remainingAmount >= 0) {
        remainingAmountDisplay.textContent = "Sisa Target: " + formatCurrency(remainingAmount); // Menampilkan nilai sisa
    } else {
        remainingAmountDisplay.textContent = "Lebih: " + formatCurrency(Math.abs(remainingAmount)); // Menampilkan "lebih: Rp"
    }
}

// Fungsi untuk format currency dengan titik sebagai pemisah ribuan
function formatCurrency(value) {
    return 'Rp ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Mengganti koma dengan titik
}

// Fungsi untuk mereset tabungan
resetButton.addEventListener('click', () => {
    targetAmount = 0;
    remainingAmount = 0;
    days = 0;
    amountPerDay = 0;
    targetAmountDisplay.textContent = formatCurrency(targetAmount);
    remainingAmountDisplay.textContent = formatCurrency(remainingAmount);
    amountInput.value = ''; // Reset input
    targetInput.value = ''; // Reset target input
    daysInput.value = ''; // Reset days input
    checkboxContainer.innerHTML = ''; // Reset checkbox
    amountInput.disabled = false; // Enable input lagi
});

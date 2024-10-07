// Mendapatkan elemen dari DOM
const amountInput = document.getElementById('amount');
const targetInput = document.getElementById('target');
const addButton = document.getElementById('addBtn');
const totalAmountDisplay = document.getElementById('totalAmount');
const targetAmountDisplay = document.getElementById('targetAmount');
const remainingAmountDisplay = document.getElementById('remainingAmount');
const checkboxContainer = document.getElementById('checkboxContainer');
const resetButton = document.getElementById('resetBtn');

let totalAmount = parseInt(localStorage.getItem('totalAmount')) || 0;
let targetAmount = parseInt(localStorage.getItem('targetAmount')) || 0;
let remainingAmount = parseInt(localStorage.getItem('remainingAmount')) || targetAmount;

// Update tampilan awal
totalAmountDisplay.textContent = formatCurrency(totalAmount);
targetAmountDisplay.textContent = formatCurrency(targetAmount);
remainingAmountDisplay.textContent = formatCurrency(remainingAmount);

// Memuat status checkbox dari localStorage
function loadCheckboxes() {
    const checkboxes = JSON.parse(localStorage.getItem('checkboxes')) || [];
    checkboxes.forEach((checkbox) => {
        const checkboxDiv = document.createElement('div');
        checkboxDiv.classList.add('checkbox-group');

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = checkbox.id;
        input.checked = checkbox.checked; // Set status checkbox
        input.value = checkbox.value;

        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.innerText = `Hari ${checkbox.day} - Menabung Rp${input.value}`;

        // Tambahkan event listener untuk checkbox
        input.addEventListener('change', () => {
            if (input.checked) {
                remainingAmount -= parseInt(input.value.replace(/\./g, '').replace('Rp ', '').trim());
            } else {
                remainingAmount += parseInt(input.value.replace(/\./g, '').replace('Rp ', '').trim());
            }
            localStorage.setItem('remainingAmount', remainingAmount);
            remainingAmountDisplay.textContent = formatCurrency(remainingAmount);

            // Simpan status checkbox ke localStorage
            checkbox.checked = input.checked;
            saveCheckboxes();
        });

        checkboxDiv.appendChild(input);
        checkboxDiv.appendChild(label);
        checkboxContainer.appendChild(checkboxDiv);
    });
}

// Fungsi untuk menyimpan status checkbox ke localStorage
function saveCheckboxes() {
    const checkboxes = [];
    checkboxContainer.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
        checkboxes.push({
            id: checkbox.id,
            day: checkbox.id.replace('day', ''), // Ambil nomor hari dari ID
            value: checkbox.value,
            checked: checkbox.checked
        });
    });
    localStorage.setItem('checkboxes', JSON.stringify(checkboxes));
}

// Fungsi untuk menambahkan jumlah tabungan dan membuat checkbox
addButton.addEventListener('click', () => {
    const amount = parseInt(amountInput.value.replace(/\./g, '').replace('Rp ', '').trim()); // Parsing nilai input
    const target = parseInt(targetInput.value.replace(/\./g, '').replace('Rp ', '').trim()); // Parsing nilai target
    
    // Cek jika input valid
    if (!isNaN(amount) && amount > 0) {
        totalAmount += amount;
        localStorage.setItem('totalAmount', totalAmount); // Simpan total ke localStorage
        totalAmountDisplay.textContent = formatCurrency(totalAmount);

        // Hanya set target jika belum di-set
        if (targetAmount === 0 && !isNaN(target) && target > 0) {
            targetAmount = target;
            localStorage.setItem('targetAmount', targetAmount); // Simpan target ke localStorage
            targetAmountDisplay.textContent = formatCurrency(targetAmount);
            remainingAmount = targetAmount; // Set remaining amount ke target saat pertama kali
            remainingAmountDisplay.textContent = formatCurrency(remainingAmount);

            // Menghitung jumlah hari dan membuat checkbox
            const days = Math.ceil(targetAmount / amount);
            createCheckboxes(days);
        } else {
            // Update sisa target
            remainingAmount = targetAmount - totalAmount;
            localStorage.setItem('remainingAmount', remainingAmount); // Simpan sisa target ke localStorage
            remainingAmountDisplay.textContent = formatCurrency(remainingAmount);
        }

        amountInput.value = ''; // Reset input
    } else {
        alert('Masukkan jumlah yang valid!');
    }
});

// Fungsi untuk membuat checkbox berdasarkan jumlah hari
function createCheckboxes(days) {
    checkboxContainer.innerHTML = ''; // Reset container

    for (let i = 1; i <= days; i++) {
        const checkboxDiv = document.createElement('div');
        checkboxDiv.classList.add('checkbox-group');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `day${i}`;
        checkbox.value = amountInput.value; // Ambil nilai dari input amount
        
        const label = document.createElement('label');
        label.htmlFor = `day${i}`;
        label.innerText = `Hari ${i} - Menabung Rp${amountInput.value}`;

        // Tambahkan event listener untuk checkbox
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                remainingAmount -= parseInt(checkbox.value.replace(/\./g, '').replace('Rp ', '').trim()); // Mengurangi sisa target
            } else {
                remainingAmount += parseInt(checkbox.value.replace(/\./g, '').replace('Rp ', '').trim()); // Menambah sisa target
            }
            localStorage.setItem('remainingAmount', remainingAmount); // Simpan sisa target ke localStorage
            remainingAmountDisplay.textContent = formatCurrency(remainingAmount); // Update tampilan sisa target

            // Simpan status checkbox ke localStorage
            checkbox.checked = checkbox.checked;
            saveCheckboxes();
        });

        checkboxDiv.appendChild(checkbox);
        checkboxDiv.appendChild(label);
        checkboxContainer.appendChild(checkboxDiv);
    }

    // Simpan status checkbox ke localStorage
    saveCheckboxes();
}

// Memuat status checkbox saat aplikasi dimuat
loadCheckboxes();

// Fungsi untuk format currency dengan titik sebagai pemisah ribuan
function formatCurrency(value) {
    return 'Rp ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Mengganti koma dengan titik
}

// Fungsi untuk mereset tabungan
resetButton.addEventListener('click', () => {
    totalAmount = 0;
    targetAmount = 0;
    remainingAmount = 0;
    
    // Reset localStorage
    localStorage.removeItem('totalAmount');
    localStorage.removeItem('targetAmount');
    localStorage.removeItem('remainingAmount');
    localStorage.removeItem('checkboxes');
    
    totalAmountDisplay.textContent = formatCurrency(totalAmount);
    targetAmountDisplay.textContent = formatCurrency(targetAmount);
    remainingAmountDisplay.textContent = formatCurrency(remainingAmount);
    amountInput.value = ''; // Reset input
    targetInput.value = ''; // Reset target input
    checkboxContainer.innerHTML = ''; // Reset checkbox
});

// Set nilai awal pada tampilan
totalAmountDisplay.textContent = formatCurrency(totalAmount);
targetAmountDisplay.textContent = formatCurrency(targetAmount);
remainingAmountDisplay.textContent = formatCurrency(remainingAmount);

import re

# ============================================================
#  DEFINISI STATE & TRANSISI (VERSI SEDERHANA)
# ============================================================
STATE_NAMES = {
    0: 'q0 (Start)',
    1: 'q1 (Username)',
    2: 'q2 (@ OK)',
    3: 'q3 (Domain)',
    4: 'q4 (Dot .)',
    5: 'q5 (TLD / ACCEPT STATE)'
}

def ambil_state_berikutnya(state_sekarang, karakter):
    """Fungsi Transisi Delta: δ(State, Karakter) -> State Berikutnya"""
    c = karakter
    
    if state_sekarang == 0:
        if bool(re.match(r'[a-zA-Z0-9._%+\-]', c)): return 1
    elif state_sekarang == 1:
        if c == '@': return 2
        if bool(re.match(r'[a-zA-Z0-9._%+\-]', c)): return 1
    elif state_sekarang == 2:
        if bool(re.match(r'[a-zA-Z0-9\-]', c)): return 3
    elif state_sekarang == 3:
        if c == '.': return 4
        if bool(re.match(r'[a-zA-Z0-9\-]', c)): return 3
    elif state_sekarang == 4:
        if bool(re.match(r'[a-zA-Z]', c)): return 5
    elif state_sekarang == 5:
        if c == '.': return 4
        if bool(re.match(r'[a-zA-Z]', c)): return 5
        
    return -1 # -1 Berarti tidak ada transisi (REJECT / TRAP STATE)

# ============================================================
#  FUNGSI UTAMA VALIDASI (SIMULATOR)
# ============================================================
def cek_email_fsa(email):
    print(f"Menguji Email: '{email}'")
    print("-" * 50)
    
    state_aktif = 0
    print(f" -> State Awal: {STATE_NAMES[state_aktif]}")
    
    for i, char in enumerate(email):
        state_baru = ambil_state_berikutnya(state_aktif, char)
        
        # Jika tidak ada transisi yang valid
        if state_baru == -1:
            print(f" [*] Karakter '{char}' (ke-{i+1}): Tidak ada transisi dari {STATE_NAMES[state_aktif]}! [REJECT]")
            print("-" * 50)
            print("KESIMPULAN: Email TIDAK VALID (Mesin Berhenti/Crash)")
            return False
            
        print(f" [✓] Karakter '{char}' (ke-{i+1}): δ({STATE_NAMES[state_aktif]}, '{char}') -> {STATE_NAMES[state_baru]}")
        state_aktif = state_baru

    print("-" * 50)
    # Cek apakah akhir string berada di Accept State (q5)
    if state_aktif == 5:
        print(f"KESIMPULAN: Email VALID (Berhenti di {STATE_NAMES[state_aktif]})")
        return True
    else:
        print(f"KESIMPULAN: Email TIDAK VALID (Berhenti di {STATE_NAMES[state_aktif]} - Bukan Accept State)")
        return False

# ============================================================
#  CONTOH JALANKAN UNTUK DEMO
# ============================================================
email_test = "budi.123@gmail.com"
cek_email_fsa(email_test)
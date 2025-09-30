<?php

session_start();

//membatasi halaman sebelum login
if (!isset($_SESSION["login"])) {
  echo "<script>
          alert('Login dulu dong');
          document.location.href = 'login.php';
        </script>";
  exit;
}
include 'config/app.php';

// Memeriksa apakah 'id_barang' ada di URL
if (isset($_GET['id_mahasiswa'])) {
    $id_mahasiswa = (int)$_GET['id_mahasiswa'];
    if (delete_mahasiswa($id_mahasiswa) > 0) {
        echo "<script>
                alert('Data Mahasiswa Berhasil Dihapus');
                document.location.href = 'mahasiswa.php';
              </script>";
    } else {
        echo "<script>
                alert('Data Mahasiswa Gagal Dihapus');
                document.location.href = 'mahasiswa.php';
              </script>";
    }
} 
?>

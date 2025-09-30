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

// Memeriksa apakah 'id_akun' ada di URL
if (isset($_GET['id_akun'])) {
    $id_akun = (int)$_GET['id_akun'];
    if (delete_akun($id_akun) > 0) {
        echo "<script>
                alert('Data Akun Berhasil Dihapus');
                document.location.href = 'akun.php';
              </script>";
    } else {
        echo "<script>
                alert('Data Akun Gagal Dihapus');
                document.location.href = 'akun.php';
              </script>";
    }
} 
?>

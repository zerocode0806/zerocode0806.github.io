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

//kosongkan $_SESSION USER LOGIN
$_SESSION = [];

session_unset() ;
session_destroy() ;
header("Location: login.php");
<?php

session_start();

include 'config/app.php';

//cek apakah tombol login ditekan
if (isset($_POST['login'])) {
    //ambil input username dan password
    $username = mysqli_real_escape_string($db, $_POST['username']);
    $password = mysqli_real_escape_string($db, $_POST['password']);

    // Lanjutkan verifikasi login tanpa reCAPTCHA
    $result = mysqli_query($db, "SELECT * FROM akun WHERE username = '$username'");

    //jika ada username 
    if (mysqli_num_rows($result) == 1) {
        $hasil = mysqli_fetch_assoc($result);
    
        if (password_verify($password, $hasil['password'])) {
            // Set session dan redirect jika login berhasil
            $_SESSION['login'] = true;
            $_SESSION['id_akun'] = $hasil['id_akun'];
            $_SESSION['nama'] = $hasil['nama'];
            $_SESSION['username'] = $hasil['username'];
            $_SESSION['email'] = $hasil['email'];
            $_SESSION['level'] = $hasil['level'];
            
            header("Location: index.php");
            exit; // Stop execution after successful login and redirection
        } else {
            // Jika username tidak ditemukan
            $error = true;
        }
    } 
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdn.datatables.net/2.1.3/css/dataTables.bootstrap5.css">
<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Poppins", sans-serif;
    }

    body {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: #1e1e1e;
        overflow-y: hidden;
        padding: 20px;
    }

    .container {
        width: 100%;
        max-height: 590px;
        max-width: 350px;
        background: #595959;
        border-radius: 15px;
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
    }

    .login {
        width: 100%;
        max-width: 400px;
        padding: 30px;
        margin: auto;
    }

    .login label {
        color: #a6a6a6;
    }

    form {
        width: 100%;
        max-width: 350px;
        margin: 0 auto;
        margin-bottom: 1.8rem;
    }

    h1 {
        margin: 20px 0;
        text-align: center;
        font-weight: bold;
        text-transform: uppercase;
        color: #a6a6a6;
    }

    p {
        text-align: center;
        margin: 10px 0;
        color: #a6a6a6;
    }

    hr {
        border-top: 2px solid #a6a6a6;
        margin: 20px 0;
    }

    form label {
        display: block;
        font-size: 16px;
        font-weight: 600;
        margin: 5px 0;
    }

    input {
        width: 100%;
        margin: 5px 0;
        padding: 10px;
        border: 1px solid grey;
        border-radius: 5px;
        outline: none;
        background: #1e1e1e;
        color: #a6a6a6;
    }

    button {
        border: none;
        padding: 12px;
        width: 100%;
        color: #a6a6a6;
        font-size: 16px;
        cursor: pointer;
        margin-top: 30px;
        border-radius: 5px;
        background: #1e1e1e;
        transition: background 0.3s ease;
    }

    button:hover {
        background: #1e1e1e;
        box-shadow: 0 0 0.5rem #1e1e1e;
    }

    .btn-signup {
        margin-top: 10px;
        background: #a6a6a6;
    }

    .btn-signup:hover {
        background: #d0d0d0;
        color: #1e1e1e;
    }

    .btn-signin {
        margin-top: 10px;
        background: #a6a6a6;
    }

    .btn-signin:hover {
        background: #d0d0d0;
        color: #1e1e1e;
    }

    a {
        color: black;
        text-decoration: none;
    }

    @media (max-width: 768px) {
        .container {
            flex-direction: column;
            align-items: center;
        }

        .login {
            width: 100%;
            max-width: 100%;
            padding: 20px;
        }

        form {
            max-width: 100%;
            padding: 0 20px;
        }
    }

    @media (max-width: 480px) {
        .container {
            padding: 10px;
        }

        .login {
            padding: 10px;
        }

        form {
            padding: 0;
        }

        button, .btn-signup, .btn-signin {
            padding: 12px;
            font-size: 14px;
        }
    }

</style>
<title>Sign In</title>
</head>

<body>
    <div class="container">
        <div class="login">
            <form action="" method="POST">
                <h1>Sign In</h1>
                <hr>
                
                <?php if (isset($error)) :?>
                    <div class="alert alert-danger text-center">
                    <b>Username/Password Salah</b>
                </div>
                <?php endif;?>

                <label for="username">Username</label>
                <input type="text" id="username" name="username" placeholder="jeando" required>

                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Masukkan password" required>
                
                <button type="submit" name="login">Sign In</button>
            </form>            
        </div>
    </div>

</body>
</html>

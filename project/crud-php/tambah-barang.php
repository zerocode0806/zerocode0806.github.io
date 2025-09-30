<?php 

session_start();

include 'config/app.php';

//membatasi halaman sebelum login
if (!isset($_SESSION["login"])) {
    echo "<script>
            alert('Login dulu dong');
            document.location.href = 'login.php';
          </script>";
    exit;
}

$title = 'Tambah Barang';
include 'layout/header.php';
if (isset($_POST['tambah'])) {
    var_dump($_POST['alamat-editor']);
    if (create_barang($_POST) > 0) {
        echo "<script>
                alert('Data Barang Berhasil Ditambahkan');
                document.location.href = 'index.php';
              </script>";
    } else {
        echo "<script>
                alert('Data Barang Gagal Ditambahkan');
                document.location.href = 'index.php';
              </script>";
    }
}
?>

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">

  <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1><i class="fas fa-plus"></i> Tambah Barang</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="index.php">Tabel Barang</a></li>
              <li class="breadcrumb-item active">Tambah Barang</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <section class="content">
        <form action="" method="post">
                <div class="mb-3">
                    <label for="nama" class="form-label">Nama Barang</label>
                    <input type="text" class="form-control" id="nama" name='nama' placeholder="Nama barang ..." required>
                </div>
                <div class="mb-3">
                    <label for="jumlah" class="form-label">Jumlah</label>
                    <input type="number" class="form-control" id="jumlah" name='jumlah' placeholder="Jumlah barang ..." required>
                </div>
                <div class="mb-3">
                    <label for="Harga" class="form-label">Harga</label>
                    <input type="number" class="form-control" id="Harga" name='harga' placeholder="Harga barang ..." required>
                </div>
                <button type="submit" name="tambah" class="btn btn-primary" style="float: right;">Tambah</button>
        </form>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->

</div><!-- /.content-wrapper -->

<?php include 'layout/footer.php'; ?>

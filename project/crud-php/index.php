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

//membatasi halaman sesuai user login
if ($_SESSION["level"] != 1 and $_SESSION["level"] != 2) {
    echo "<script>
            alert('Anda Tidak Punya Akses');
            document.location.href = 'akun.php';
          </script>";
    exit;
}

$title = 'Daftar Barang';

include 'config/app.php';
include 'layout/header.php';

if (isset($_POST['filter'])) {
  $tgl_awal = strip_tags($_POST['tgl-awal'] . " 00:00:00");
  $tgl_akhir = strip_tags($_POST['tgl-akhir'] . " 23:59:59");

  // Query filtered data
  $query = "SELECT * FROM barang WHERE tanggal BETWEEN '$tgl_awal' AND '$tgl_akhir' ORDER BY id_barang DESC";
  $data_barang = select($query);

  // Handle pagination for filtered results
  $jumlahDataPerhalaman = 10;
  $jumlahData = count($data_barang);
  $jumlahHalaman = ceil($jumlahData / $jumlahDataPerhalaman);
  $halamanAktif = (isset($_GET['halaman']) ? $_GET['halaman'] : 1);
  $awalData = ($jumlahDataPerhalaman * $halamanAktif) - $jumlahDataPerhalaman;

  // Slice the filtered data for pagination
  $data_barang = array_slice($data_barang, $awalData, $jumlahDataPerhalaman);
} else {
  // Regular pagination without filter
  $jumlahDataPerhalaman = 10;
  $jumlahData = count(select("SELECT * FROM barang"));
  $jumlahHalaman = ceil($jumlahData / $jumlahDataPerhalaman);
  $halamanAktif = (isset($_GET['halaman']) ? $_GET['halaman'] : 1);
  $awalData = ($jumlahDataPerhalaman * $halamanAktif) - $jumlahDataPerhalaman;

  $data_barang = select("SELECT * FROM barang ORDER BY id_barang DESC LIMIT $awalData, $jumlahDataPerhalaman");
}




?>
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1 class="m-0"><i class="fas fa-list"></i> Data Barang</h1>
        </div><!-- /.col -->
        <div class="col-sm-6">
          <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item active">Data Barang</li>
          </ol>
        </div><!-- /.col -->
      </div><!-- /.row -->
    </div><!-- /.container-fluid -->
  </div>
  <!-- /.content-header -->

  <!-- Main content -->
  <section class="content">
    <div class="container-fluid">
      <!-- Small boxes (Stat box) -->
      <div class="row">
        <div class="col-lg-3 col-6">
          <!-- small box -->
          <div class="small-box bg-info">
            <div class="inner">
              <h3>150</h3>
              <p>New Orders</p>
            </div>
            <div class="icon">
              <i class="ion ion-bag"></i>
            </div>
            <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
          </div>
        </div><!-- ./col -->

        <div class="col-lg-3 col-6">
          <!-- small box -->
          <div class="small-box bg-success">
            <div class="inner">
              <h3>53<sup style="font-size: 20px">%</sup></h3>
              <p>Bounce Rate</p>
            </div>
            <div class="icon">
              <i class="ion ion-stats-bars"></i>
            </div>
            <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
          </div>
        </div><!-- ./col -->

        <div class="col-lg-3 col-6">
          <!-- small box -->
          <div class="small-box bg-warning">
            <div class="inner">
              <h3>44</h3>
              <p>User Registrations</p>
            </div>
            <div class="icon">
              <i class="ion ion-person-add"></i>
            </div>
            <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
          </div>
        </div><!-- ./col -->

        <div class="col-lg-3 col-6">
          <!-- small box -->
          <div class="small-box bg-danger">
            <div class="inner">
              <h3>65</h3>
              <p>Unique Visitors</p>
            </div>
            <div class="icon">
              <i class="ion ion-pie-graph"></i>
            </div>
            <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
          </div>
        </div><!-- ./col -->
      </div><!-- /.row -->
    </div><!-- /.container-fluid -->
  </section>
  <!-- /.content -->

  <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Data Tabel Barang</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item active">Data Tabel Barang</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Tabel Barang</h3>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <a href="tambah-barang.php" class="btn btn-primary btn-sm mb-2"> <i class="fas fa-plus-circle"></i> Tambah</a>
                <button type="button" class="btn btn-success btn-sm mb-2" data-toggle="modal" data-target="#modalFilter">
                  <i class="fas fa-search"></i> Filter Data
                </button>
                <table class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Jumlah</th>
                            <th>Harga</th>
                            <th>Barcode</th>
                            <th>Tanggal</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                      <?php foreach ($data_barang as $barang) : ?>
                      <tr>
                          <td><?= ++$awalData; ?></td> <!-- Pre-increment $awalData -->
                          <td><?= $barang['nama']; ?></td>
                          <td><?= $barang['jumlah']; ?></td>
                          <td>Rp. <?= number_format($barang['harga'], 0, ',', '.'); ?></td>
                          <td class="text-center">
                          <img alt="barcode" src="barcode.php?codetype=code128&size=15&text=<?= $barang['barcode'];?>&print=true" />
                          </td>
                          <td><?= date('d-m-y | H:i:s', strtotime($barang['tanggal'])); ?></td>
                          <td width="19%" class="text-center">
                              <a href="ubah-barang.php?id_barang=<?= $barang['id_barang'];?>" class="btn btn-success btn-sm"> <i class="fas fa-edit"></i> Ubah</a>
                              <a href="hapus-barang.php?id_barang=<?= $barang['id_barang'];?>" class="btn btn-danger btn-sm" onclick="return confirm('Yakin ingin menghapus data barang ?')"> <i class="fas fa-trash-alt"></i> Hapus</a>
                          </td>
                      </tr>
                      <?php endforeach; ?>
                  </tbody>
                </table>
                <!-- pagination -->
                 <div class="mt-2 justify-content-end d-flex">
                 <nav aria-label="Page navigation example">
                    <ul class="pagination">
                      <?php if ($halamanAktif > 1) : ?>
                        <li class="page-item">
                          <a class="page-link" href="?halaman=<?= $halamanAktif - 1?>" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                          </a>
                        </li>
                      <?php endif;?>

                      <?php for ($i = 1; $i <= $jumlahHalaman; $i++) : ?>
                        <?php if ($i == $halamanAktif) : ?>
                          <li class="page-item active"><a class="page-link" href="?halaman=<?= $i; ?>"><?= $i; ?></a></li>
                        <?php else : ?>
                          <li class="page-item"><a class="page-link" href="?halaman=<?= $i; ?>"><?= $i; ?></a></li>
                        <?php endif ; ?>
                      <?php endfor ;?>

                      <?php if ($halamanAktif < $jumlahHalaman) : ?>
                        <li class="page-item">
                          <a class="page-link" href="?halaman=<?= $halamanAktif + 1?>" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                          </a>
                        </li>
                      <?php endif; ?>
                    </ul>
                  </nav>
                 </div>
                 <!-- /.pagination -->
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->

</div><!-- /.content-wrapper -->

<!-- Modal Filter-->
<div class="modal fade" id="modalFilter" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header bg-success">
        <h5 class="modal-title" id="exampleModalLabel"><i class="fas fa-search"></i> Filter Data</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form action="" method="post">
          <div class="form-group">
            <label for="tgl-awal">Tanggal Awal</label>
            <input type="date" name="tgl-awal" id="tgl-awal" class="form-control">
          </div>

          <div class="form-group">
            <label for="tgl-akhir">Tanggal Akhir</label>
            <input type="date" name="tgl-akhir" id="tgl-akhir" class="form-control">
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Kembali</button>
            <button type="submit" class="btn btn-primary btn-sm" name="filter">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<?php include 'layout/footer.php'; ?>

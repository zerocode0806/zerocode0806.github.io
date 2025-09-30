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
if ($_SESSION["level"] != 1 and $_SESSION["level"] != 3) {
    echo "<script>
            alert('Anda Tidak Punya Akses');
            document.location.href = 'index.php';
          </script>";
    exit;
}

require 'config/app.php';

require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

$spreadsheet = new Spreadsheet();
$sheet = $spreadsheet->getActiveSheet();
$sheet->setCellValue('A2', 'No');
$sheet->setCellValue('B2', 'Nama');
$sheet->setCellValue('C2', 'Program Studi');
$sheet->setCellValue('D2', 'Jenis Kelamin');
$sheet->setCellValue('E2', 'Telepom');
$sheet->setCellValue('F2', 'Email');
$sheet->setCellValue('G2', 'Foto');

$data_mahasiswa = select("SELECT * FROM mahasiswa");

$no = 1;
$start = 3;

foreach ($data_mahasiswa as $mahasiswa) {
    $sheet->setCellValue("A". $start, $no++)->getColumnDimension('A')->setAutoSize(true);
    $sheet->setCellValue("B". $start, $mahasiswa['nama'])->getColumnDimension('B')->setAutoSize(true);
    $sheet->setCellValue("C". $start, $mahasiswa['prodi'])->getColumnDimension('C')->setAutoSize(true);
    $sheet->setCellValue("D". $start, $mahasiswa['jk'])->getColumnDimension('D')->setAutoSize(true);
    $sheet->setCellValue("E". $start, $mahasiswa['telepon'])->getColumnDimension('E')->setAutoSize(true);
    $sheet->setCellValue("F". $start, $mahasiswa['email'])->getColumnDimension('F')->setAutoSize(true);
    
    // Properly setting the image URL as text in the cell
    $imageUrl = 'http://localhost/crud-php/assets/img/' . $mahasiswa['foto'];
    $sheet->setCellValue("G". $start, $imageUrl)->getColumnDimension('G')->setAutoSize(true);

    $start++;
}

//tabel border
$styleArray = [
    'borders' => [
        'allBorders' => [
            'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
        ],
    ],
];

$border = $start-1;

$sheet->getStyle('A2:G'. $border)->applyFromArray($styleArray);

$writer = new Xlsx($spreadsheet);
$writer->save('Laporan Data Mahasiswa.xlsx');
header('Content-Type: application/vnd.openxmlformats-officedocument.spreedsheet.sheet');
header('Content-Disposition: attachment;filename="Laporan Data Mahasiswa.xlsx"');
readfile('Laporan Data Mahasiswa.xlsx');
unlink('Laporan Data Mahasiswa.xlsx');
exit;
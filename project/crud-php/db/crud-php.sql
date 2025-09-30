-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 05, 2024 at 05:07 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crud-php`
--

-- --------------------------------------------------------

--
-- Table structure for table `akun`
--

CREATE TABLE `akun` (
  `id_akun` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `level` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `akun`
--

INSERT INTO `akun` (`id_akun`, `nama`, `username`, `email`, `password`, `level`) VALUES
(8, 'Zegula', 'ElManuk', 'elmanuk@gmail.com', '$2y$10$HE9RsPeHxNtVSTFTARpuVuomvgAoGU2Ise081tTUk3AuiwMH9Vheu', '3'),
(9, 'Administrator', 'Admin', 'admin@gmail.com', '$2y$10$V28Xkb8FfFYmBf.zq4rtg.w9VEET2171TzWqucKbwAPWAiOF.dSCy', '1'),
(12, 'Ubaidillah', 'Ubeddahlan', 'ubaidillahdahlan@gmail.com', '$2y$10$ZoO.LHf8Orxr1vainXjw3u.gDWr2lASC/3oUEP0S2fzjAt7oDpSYu', '2');

-- --------------------------------------------------------

--
-- Table structure for table `barang`
--

CREATE TABLE `barang` (
  `id_barang` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `jumlah` varchar(50) NOT NULL,
  `harga` varchar(50) NOT NULL,
  `barcode` varchar(15) NOT NULL,
  `tanggal` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `barang`
--

INSERT INTO `barang` (`id_barang`, `nama`, `jumlah`, `harga`, `barcode`, `tanggal`) VALUES
(24, 'Keyboard', '100', '90000', '257951', '2024-09-01 08:25:15'),
(25, 'Mouse', '20', '100000', '603994', '2024-09-01 08:25:45'),
(26, 'Monitor', '12', '1000000', '646687', '2024-09-01 08:26:10'),
(27, 'Kabel HDMI', '22', '30000', '919645', '2024-09-01 11:19:20'),
(28, 'Advan WorkPro', '20', '5200000', '594949', '2024-09-03 02:08:30'),
(29, 'Zphyrus G14', '21', '29000000', '372554', '2024-09-03 14:41:41'),
(30, 'Zphyrus G16', '1', '40000000', '154424', '2024-09-03 14:42:13'),
(31, 'Lenovo Legion 7I', '21', '23000000', '781194', '2024-09-05 13:33:13'),
(32, 'Acer Swift 3', '12', '7000000', '845316', '2024-09-05 13:33:58');

-- --------------------------------------------------------

--
-- Table structure for table `mahasiswa`
--

CREATE TABLE `mahasiswa` (
  `id_mahasiswa` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `prodi` varchar(50) NOT NULL,
  `jk` varchar(10) NOT NULL,
  `telepon` varchar(30) NOT NULL,
  `alamat` text NOT NULL,
  `email` varchar(30) NOT NULL,
  `foto` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mahasiswa`
--

INSERT INTO `mahasiswa` (`id_mahasiswa`, `nama`, `prodi`, `jk`, `telepon`, `alamat`, `email`, `foto`) VALUES
(8, 'Muhammad Ubaidillah Dahlan ', 'Teknik Logistik', 'Laki-Laki', '085163024682', 'Terik RT 07 RW 03 Krian Sidoarjo 61262', 'ubaidillahdahlan@gmail.com', '66c159273f607.jpg'),
(11, 'Ardan', 'Teknik Listrik', 'Laki-Laki', '098776546451', 'Tundungan RT 04 RW 07 Krian Sidoarjo&nbsp;', 'kazamelody@gmail.com', '66c567c5b9d08.jpg'),
(12, 'Kal El', 'Teknik Mesin', 'Laki-Laki', '098716254356', '<p><s><u><em><strong>Perumtas 3 blok A6, Jimbaran Wonoayu, 61262</strong></em></u></s></p>\r\n', 'elmanuk@gmail.com', '66cf25a917180.jpg'),
(19, 'haidar', 'Teknik Listrik', 'Perempuan', '098735923569', 'Perumtas 3 Blok B2 Jimbaran Wonoayu 61262', 'haidar@gmail.com', '66d07a0e4ff49.jpg'),
(24, 'Taufik', 'Teknik Komputer', 'Laki-Laki', '086543568765', '<p><img alt=\"\" src=\"/ckfinder/userfiles/images/haidar.jpg\" style=\"width:100%\" /></p>\r\n', 'ardan@gmail.com', '66d4739a6b3e5.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `pegawai`
--

CREATE TABLE `pegawai` (
  `id_pegawai` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `jabatan` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telepon` varchar(30) NOT NULL,
  `alamat` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pegawai`
--

INSERT INTO `pegawai` (`id_pegawai`, `nama`, `jabatan`, `email`, `telepon`, `alamat`) VALUES
(1, 'Ubaidillah', 'Co Founder', 'dahlanubed@gmail.com', '081326108845', 'Terik Krian Sidoarjo'),
(2, 'Kal El', 'CEO', 'elmanuk@gmail.com', '098712345674', 'Jimbaran Wonoayu Sidoarjo');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `akun`
--
ALTER TABLE `akun`
  ADD PRIMARY KEY (`id_akun`);

--
-- Indexes for table `barang`
--
ALTER TABLE `barang`
  ADD PRIMARY KEY (`id_barang`);

--
-- Indexes for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD PRIMARY KEY (`id_mahasiswa`);

--
-- Indexes for table `pegawai`
--
ALTER TABLE `pegawai`
  ADD PRIMARY KEY (`id_pegawai`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `akun`
--
ALTER TABLE `akun`
  MODIFY `id_akun` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `barang`
--
ALTER TABLE `barang`
  MODIFY `id_barang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  MODIFY `id_mahasiswa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `pegawai`
--
ALTER TABLE `pegawai`
  MODIFY `id_pegawai` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 17, 2025 at 01:54 AM
-- Server version: 8.0.30
-- PHP Version: 8.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ukk_kasir`
--

-- --------------------------------------------------------

--
-- Table structure for table `detail_penjualan`
--

CREATE TABLE `detail_penjualan` (
  `id_detail` int NOT NULL,
  `id_penjualan` int DEFAULT NULL,
  `id_produk` int DEFAULT NULL,
  `jumlah_produk` int DEFAULT NULL,
  `sub_total` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `detail_penjualan`
--

INSERT INTO `detail_penjualan` (`id_detail`, `id_penjualan`, `id_produk`, `jumlah_produk`, `sub_total`) VALUES
(48, 16, 6, 1, 5000),
(96, 32, 6, 1, 5000),
(97, 32, 7, 1, 3000),
(98, 32, 9, 1, 2000),
(99, 32, 10, 1, 2000),
(100, 32, 11, 1, 2000),
(101, 33, 6, 1, 5000),
(102, 33, 7, 1, 3000),
(103, 33, 9, 1, 2000),
(104, 34, 6, 8, 40000),
(105, 35, 6, 10, 50000),
(106, 35, 7, 10, 30000),
(107, 35, 9, 10, 20000),
(108, 35, 10, 10, 20000),
(109, 35, 11, 10, 20000),
(115, 37, 6, 1, 5000),
(116, 38, 6, 1, 5000),
(117, 38, 7, 1, 3000),
(118, 38, 10, 1, 2000),
(119, 38, 11, 1, 2000),
(120, 39, 6, 10, 50000),
(121, 39, 7, 10, 30000),
(122, 39, 9, 10, 20000),
(123, 39, 10, 10, 20000),
(124, 39, 11, 10, 20000),
(125, 40, 7, 1, 3000),
(126, 40, 9, 1, 2000),
(127, 40, 11, 1, 2000),
(128, 40, 15, 1, 2000),
(129, 41, 15, 1, 2000),
(130, 42, 7, 10, 30000),
(131, 42, 9, 10, 20000),
(132, 42, 11, 10, 20000),
(133, 42, 15, 10, 20000);

-- --------------------------------------------------------

--
-- Table structure for table `pelanggan`
--

CREATE TABLE `pelanggan` (
  `id_pelanggan` int NOT NULL,
  `nama_pelanggan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `alamat` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `no_telepon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pelanggan`
--

INSERT INTO `pelanggan` (`id_pelanggan`, `nama_pelanggan`, `alamat`, `no_telepon`) VALUES
(8, 'El Manuk', 'Sidoarjo', '095235656543'),
(9, 'Sam Sul', 'Krian', '0856782345');

-- --------------------------------------------------------

--
-- Table structure for table `penjualan`
--

CREATE TABLE `penjualan` (
  `id_penjualan` int NOT NULL,
  `tanggal_penjualan` date DEFAULT NULL,
  `id_kasir` int DEFAULT NULL,
  `total_harga` int DEFAULT NULL,
  `id_pelanggan` int DEFAULT NULL,
  `bayar` int DEFAULT NULL,
  `kembali` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `penjualan`
--

INSERT INTO `penjualan` (`id_penjualan`, `tanggal_penjualan`, `id_kasir`, `total_harga`, `id_pelanggan`, `bayar`, `kembali`) VALUES
(16, '2025-01-14', 16, 5000, 16, 10000, 5000),
(32, '2025-01-14', 8, 14000, 8, 15000, 1000),
(33, '2025-01-14', 16, 10000, 16, 12000, 2000),
(34, '2025-01-14', 16, 40000, 16, 50000, 10000),
(35, '2025-01-14', 16, 140000, 16, 150000, 10000),
(37, '2025-01-15', 17, 5000, 17, 7000, 2000),
(38, '2025-01-15', 17, 12000, 17, 15000, 3000),
(39, '2025-01-15', 16, 140000, 16, 150000, 10000),
(40, '2025-01-15', 18, 9000, 18, 10000, 1000),
(41, '2025-01-15', 18, 2000, 18, 2500, 500),
(42, '2025-01-17', 16, 90000, 16, 90000, 0);

-- --------------------------------------------------------

--
-- Table structure for table `produk`
--

CREATE TABLE `produk` (
  `id_produk` int NOT NULL,
  `nama_produk` varchar(255) DEFAULT NULL,
  `harga` int DEFAULT NULL,
  `stok` int DEFAULT NULL,
  `gambar_produk` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `produk`
--

INSERT INTO `produk` (`id_produk`, `nama_produk`, `harga`, `stok`, `gambar_produk`) VALUES
(7, 'Kue Panada', 3000, 28, 'pastel.jpg'),
(9, 'Kue Apang', 2000, 29, 'apang.jpg'),
(11, 'Bakpao', 2000, 28, 'bakpao.jpg'),
(15, 'Kue Cucur', 2000, 88, 'cucur.jpg'),
(16, 'Kue Balapis', 3000, 200, 'balapis.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int NOT NULL,
  `business_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `logo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `business_name`, `email`, `address`, `phone`, `logo`) VALUES
(1, 'Dapur Manis', 'dapurmanis@gmail.com', 'Gresik, Kedamean Perumahan Kota Damai, Bougenville 1 no.11 ', '089512086177', 'logo berwarna.png');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `gambar` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `level` enum('admin','petugas') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `nama`, `gambar`, `username`, `password`, `level`) VALUES
(8, 'Ubed Dahlan', 'uploads/about.png', 'ubeddahlan', '$2y$10$4giKOHHxV0jW1N8N.M5SPet/T8CrTxMgnK.LH2LF76ZIv/Y3KTCOy', 'admin'),
(16, 'Sam Sul', 'uploads/ardan.jpg', 'samsul', '$2y$10$1Puks6aPN/wOWDGcoaiYJe5m3itRzvuqVBs5kdeC.sspfxS4EXzUO', 'petugas'),
(18, 'El Manuk', 'uploads/el.jpg', 'elmanuk', '$2y$10$fqngPPUsEaorKE3J2WoeY.GtQSkpzkCSBQCwWHREG7YpoM/PDJTTC', 'petugas');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `detail_penjualan`
--
ALTER TABLE `detail_penjualan`
  ADD PRIMARY KEY (`id_detail`);

--
-- Indexes for table `pelanggan`
--
ALTER TABLE `pelanggan`
  ADD PRIMARY KEY (`id_pelanggan`);

--
-- Indexes for table `penjualan`
--
ALTER TABLE `penjualan`
  ADD PRIMARY KEY (`id_penjualan`);

--
-- Indexes for table `produk`
--
ALTER TABLE `produk`
  ADD PRIMARY KEY (`id_produk`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `detail_penjualan`
--
ALTER TABLE `detail_penjualan`
  MODIFY `id_detail` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=134;

--
-- AUTO_INCREMENT for table `pelanggan`
--
ALTER TABLE `pelanggan`
  MODIFY `id_pelanggan` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `penjualan`
--
ALTER TABLE `penjualan`
  MODIFY `id_penjualan` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `produk`
--
ALTER TABLE `produk`
  MODIFY `id_produk` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

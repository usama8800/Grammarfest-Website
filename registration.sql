-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 15, 2016 at 02:48 AM
-- Server version: 10.1.10-MariaDB
-- PHP Version: 7.0.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `registration`
--

-- --------------------------------------------------------

--
-- Table structure for table `delegates`
--

CREATE TABLE `delegates` (
  `Delegate_ID` varchar(100) NOT NULL,
  `Delegate_Name` text NOT NULL,
  `Delegate_Pic` text NOT NULL,
  `Delegate_Number` text NOT NULL,
  `Delegate_Email` text NOT NULL,
  `Delegate_Event_1` text NOT NULL,
  `Delegate_Event_2` text,
  `Delegate_Event_3` text,
  `Delegate_isHead` tinyint(1) NOT NULL,
  `Delegate_Team_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `staff_advisors`
--

CREATE TABLE `staff_advisors` (
  `Advisor_Team_ID` int(11) NOT NULL,
  `Name` text,
  `Email` text,
  `Number` text,
  `NIC` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `Team_ID` varchar(100) NOT NULL,
  `Team_Name` text NOT NULL,
  `Team_Branch` text,
  `Team_Email` text NOT NULL,
  `Team_Address` text NOT NULL,
  `Team_Accomodations` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `delegates`
--
ALTER TABLE `delegates`
  ADD PRIMARY KEY (`Delegate_ID`),
  ADD UNIQUE KEY `Delegate_ID` (`Delegate_ID`);

--
-- Indexes for table `staff_advisors`
--
ALTER TABLE `staff_advisors`
  ADD PRIMARY KEY (`Advisor_Team_ID`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`Team_ID`),
  ADD UNIQUE KEY `Team_ID` (`Team_ID`);


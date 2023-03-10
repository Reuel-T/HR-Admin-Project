USE [master]
GO
/****** Object:  Database [HR-ADMIN]    Script Date: 2023/03/08 13:10:47 ******/
CREATE DATABASE [HR-ADMIN]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'HR-ADMIN', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\HR-ADMIN.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'HR-ADMIN_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\HR-ADMIN_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [HR-ADMIN] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [HR-ADMIN].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [HR-ADMIN] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [HR-ADMIN] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [HR-ADMIN] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [HR-ADMIN] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [HR-ADMIN] SET ARITHABORT OFF 
GO
ALTER DATABASE [HR-ADMIN] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [HR-ADMIN] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [HR-ADMIN] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [HR-ADMIN] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [HR-ADMIN] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [HR-ADMIN] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [HR-ADMIN] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [HR-ADMIN] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [HR-ADMIN] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [HR-ADMIN] SET  ENABLE_BROKER 
GO
ALTER DATABASE [HR-ADMIN] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [HR-ADMIN] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [HR-ADMIN] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [HR-ADMIN] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [HR-ADMIN] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [HR-ADMIN] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [HR-ADMIN] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [HR-ADMIN] SET RECOVERY FULL 
GO
ALTER DATABASE [HR-ADMIN] SET  MULTI_USER 
GO
ALTER DATABASE [HR-ADMIN] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [HR-ADMIN] SET DB_CHAINING OFF 
GO
ALTER DATABASE [HR-ADMIN] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [HR-ADMIN] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [HR-ADMIN] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [HR-ADMIN] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'HR-ADMIN', N'ON'
GO
ALTER DATABASE [HR-ADMIN] SET QUERY_STORE = ON
GO
ALTER DATABASE [HR-ADMIN] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [HR-ADMIN]
GO
/****** Object:  Table [dbo].[DepartmentEmployees]    Script Date: 2023/03/08 13:10:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DepartmentEmployees](
	[DepartmentEmployeeID] [int] IDENTITY(1,1) NOT NULL,
	[EmployeeID] [int] NULL,
	[DepartmentID] [int] NULL,
	[DepartmentManager] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[DepartmentEmployeeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Departments]    Script Date: 2023/03/08 13:10:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Departments](
	[DepartmentID] [int] IDENTITY(10,1) NOT NULL,
	[DepartmentName] [varchar](64) NOT NULL,
	[DepartmentStatus] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[DepartmentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Employees]    Script Date: 2023/03/08 13:10:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Employees](
	[EmployeeID] [int] IDENTITY(0,1) NOT NULL,
	[EmployeeFirstName] [varchar](64) NOT NULL,
	[EmployeeSurname] [varchar](64) NOT NULL,
	[EmployeeTelephoneNumber] [varchar](20) NULL,
	[EmployeeEmailAddress] [varchar](64) NOT NULL,
	[EmployeeRole] [tinyint] NOT NULL,
	[EmployeeStatus] [bit] NOT NULL,
	[EmployeePassword] [varchar](255) NOT NULL,
	[EmployeeManagerID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[EmployeeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[DepartmentEmployees] ON 

INSERT [dbo].[DepartmentEmployees] ([DepartmentEmployeeID], [EmployeeID], [DepartmentID], [DepartmentManager]) VALUES (1, 0, 10, 1)
INSERT [dbo].[DepartmentEmployees] ([DepartmentEmployeeID], [EmployeeID], [DepartmentID], [DepartmentManager]) VALUES (2, 3, 13, 1)
INSERT [dbo].[DepartmentEmployees] ([DepartmentEmployeeID], [EmployeeID], [DepartmentID], [DepartmentManager]) VALUES (3, 4, 12, 1)
INSERT [dbo].[DepartmentEmployees] ([DepartmentEmployeeID], [EmployeeID], [DepartmentID], [DepartmentManager]) VALUES (4, 5, 12, 0)
INSERT [dbo].[DepartmentEmployees] ([DepartmentEmployeeID], [EmployeeID], [DepartmentID], [DepartmentManager]) VALUES (5, 6, 11, 0)
INSERT [dbo].[DepartmentEmployees] ([DepartmentEmployeeID], [EmployeeID], [DepartmentID], [DepartmentManager]) VALUES (6, 6, 12, 1)
INSERT [dbo].[DepartmentEmployees] ([DepartmentEmployeeID], [EmployeeID], [DepartmentID], [DepartmentManager]) VALUES (9, 3, 10, 0)
INSERT [dbo].[DepartmentEmployees] ([DepartmentEmployeeID], [EmployeeID], [DepartmentID], [DepartmentManager]) VALUES (10, 4, 14, 0)
INSERT [dbo].[DepartmentEmployees] ([DepartmentEmployeeID], [EmployeeID], [DepartmentID], [DepartmentManager]) VALUES (11, 3, 12, 1)
INSERT [dbo].[DepartmentEmployees] ([DepartmentEmployeeID], [EmployeeID], [DepartmentID], [DepartmentManager]) VALUES (12, 15, 13, 1)
INSERT [dbo].[DepartmentEmployees] ([DepartmentEmployeeID], [EmployeeID], [DepartmentID], [DepartmentManager]) VALUES (13, 16, 13, 0)
SET IDENTITY_INSERT [dbo].[DepartmentEmployees] OFF
GO
SET IDENTITY_INSERT [dbo].[Departments] ON 

INSERT [dbo].[Departments] ([DepartmentID], [DepartmentName], [DepartmentStatus]) VALUES (10, N'Admin', 1)
INSERT [dbo].[Departments] ([DepartmentID], [DepartmentName], [DepartmentStatus]) VALUES (11, N'Manufacturing', 0)
INSERT [dbo].[Departments] ([DepartmentID], [DepartmentName], [DepartmentStatus]) VALUES (12, N'Machining', 0)
INSERT [dbo].[Departments] ([DepartmentID], [DepartmentName], [DepartmentStatus]) VALUES (13, N'Research and Development', 1)
INSERT [dbo].[Departments] ([DepartmentID], [DepartmentName], [DepartmentStatus]) VALUES (14, N'Reverb', 1)
SET IDENTITY_INSERT [dbo].[Departments] OFF
GO
SET IDENTITY_INSERT [dbo].[Employees] ON 

INSERT [dbo].[Employees] ([EmployeeID], [EmployeeFirstName], [EmployeeSurname], [EmployeeTelephoneNumber], [EmployeeEmailAddress], [EmployeeRole], [EmployeeStatus], [EmployeePassword], [EmployeeManagerID]) VALUES (0, N'Admin', N'User', N'000000000', N'hradmin@test.com', 0, 1, N'TestPass1234', NULL)
INSERT [dbo].[Employees] ([EmployeeID], [EmployeeFirstName], [EmployeeSurname], [EmployeeTelephoneNumber], [EmployeeEmailAddress], [EmployeeRole], [EmployeeStatus], [EmployeePassword], [EmployeeManagerID]) VALUES (1, N'Gary', N'Test', N'0123456789', N'gary@email.com', 2, 0, N'Password123#', NULL)
INSERT [dbo].[Employees] ([EmployeeID], [EmployeeFirstName], [EmployeeSurname], [EmployeeTelephoneNumber], [EmployeeEmailAddress], [EmployeeRole], [EmployeeStatus], [EmployeePassword], [EmployeeManagerID]) VALUES (2, N'Bob', N'Edited', N'0123456789', N'bob@email.com', 2, 0, N'Password123#', 0)
INSERT [dbo].[Employees] ([EmployeeID], [EmployeeFirstName], [EmployeeSurname], [EmployeeTelephoneNumber], [EmployeeEmailAddress], [EmployeeRole], [EmployeeStatus], [EmployeePassword], [EmployeeManagerID]) VALUES (3, N'Brucey', N'McLaren', N'0123456789', N'bruce@email.com', 1, 1, N'Password123#', NULL)
INSERT [dbo].[Employees] ([EmployeeID], [EmployeeFirstName], [EmployeeSurname], [EmployeeTelephoneNumber], [EmployeeEmailAddress], [EmployeeRole], [EmployeeStatus], [EmployeePassword], [EmployeeManagerID]) VALUES (4, N'Ferdinand', N'Porsche', N'0123456789', N'fp@email.com', 1, 0, N'Password123#', 9)
INSERT [dbo].[Employees] ([EmployeeID], [EmployeeFirstName], [EmployeeSurname], [EmployeeTelephoneNumber], [EmployeeEmailAddress], [EmployeeRole], [EmployeeStatus], [EmployeePassword], [EmployeeManagerID]) VALUES (5, N'Mario', N'Adretti', N'0123456789', N'ma@email.com', 2, 0, N'Password123#', NULL)
INSERT [dbo].[Employees] ([EmployeeID], [EmployeeFirstName], [EmployeeSurname], [EmployeeTelephoneNumber], [EmployeeEmailAddress], [EmployeeRole], [EmployeeStatus], [EmployeePassword], [EmployeeManagerID]) VALUES (6, N'Dave', N'Rodgers', N'0123456789', N'dr@email.com', 2, 1, N'Password123#', NULL)
INSERT [dbo].[Employees] ([EmployeeID], [EmployeeFirstName], [EmployeeSurname], [EmployeeTelephoneNumber], [EmployeeEmailAddress], [EmployeeRole], [EmployeeStatus], [EmployeePassword], [EmployeeManagerID]) VALUES (7, N'Gumesh', N'string', N'0123456789', N'gman@email.com', 2, 0, N'Password123#', NULL)
INSERT [dbo].[Employees] ([EmployeeID], [EmployeeFirstName], [EmployeeSurname], [EmployeeTelephoneNumber], [EmployeeEmailAddress], [EmployeeRole], [EmployeeStatus], [EmployeePassword], [EmployeeManagerID]) VALUES (8, N'Another', N'User', N'0000000000', N'', 2, 0, N'Password123#', NULL)
INSERT [dbo].[Employees] ([EmployeeID], [EmployeeFirstName], [EmployeeSurname], [EmployeeTelephoneNumber], [EmployeeEmailAddress], [EmployeeRole], [EmployeeStatus], [EmployeePassword], [EmployeeManagerID]) VALUES (9, N'Takumi', N'Fujiwara', N'0123456789', N'ae86@trueno.com', 2, 0, N'Password123#', 15)
INSERT [dbo].[Employees] ([EmployeeID], [EmployeeFirstName], [EmployeeSurname], [EmployeeTelephoneNumber], [EmployeeEmailAddress], [EmployeeRole], [EmployeeStatus], [EmployeePassword], [EmployeeManagerID]) VALUES (10, N'Another', N'User', N'0000000000', N'anotherDude@email.com', 2, 0, N'Password123#', NULL)
INSERT [dbo].[Employees] ([EmployeeID], [EmployeeFirstName], [EmployeeSurname], [EmployeeTelephoneNumber], [EmployeeEmailAddress], [EmployeeRole], [EmployeeStatus], [EmployeePassword], [EmployeeManagerID]) VALUES (11, N'Another', N'User', N'0000000000', N'anotherDude1@email.com', 2, 0, N'Password123#', NULL)
INSERT [dbo].[Employees] ([EmployeeID], [EmployeeFirstName], [EmployeeSurname], [EmployeeTelephoneNumber], [EmployeeEmailAddress], [EmployeeRole], [EmployeeStatus], [EmployeePassword], [EmployeeManagerID]) VALUES (12, N'Test', N'User', N'0123456789', N'tu3@gmail.com', 2, 0, N'Password123#', NULL)
INSERT [dbo].[Employees] ([EmployeeID], [EmployeeFirstName], [EmployeeSurname], [EmployeeTelephoneNumber], [EmployeeEmailAddress], [EmployeeRole], [EmployeeStatus], [EmployeePassword], [EmployeeManagerID]) VALUES (13, N'Test', N'User', N'0123456789', N'tu4@gmail.com', 2, 0, N'Password123#', NULL)
INSERT [dbo].[Employees] ([EmployeeID], [EmployeeFirstName], [EmployeeSurname], [EmployeeTelephoneNumber], [EmployeeEmailAddress], [EmployeeRole], [EmployeeStatus], [EmployeePassword], [EmployeeManagerID]) VALUES (14, N'Test', N'User', N'0123456789', N'tu5@gmail.com', 2, 0, N'Password123#', NULL)
INSERT [dbo].[Employees] ([EmployeeID], [EmployeeFirstName], [EmployeeSurname], [EmployeeTelephoneNumber], [EmployeeEmailAddress], [EmployeeRole], [EmployeeStatus], [EmployeePassword], [EmployeeManagerID]) VALUES (15, N'Ryosuke', N'Takahashi', N'1234567890', N'fcs@email.com', 2, 0, N'RX7', NULL)
INSERT [dbo].[Employees] ([EmployeeID], [EmployeeFirstName], [EmployeeSurname], [EmployeeTelephoneNumber], [EmployeeEmailAddress], [EmployeeRole], [EmployeeStatus], [EmployeePassword], [EmployeeManagerID]) VALUES (16, N'Keisuke', N'Takahashi', N'1234567890', N'fd@email.com', 2, 1, N'Password123#', 15)
SET IDENTITY_INSERT [dbo].[Employees] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Employee__EA4E01BA0372E97A]    Script Date: 2023/03/08 13:10:48 ******/
ALTER TABLE [dbo].[Employees] ADD UNIQUE NONCLUSTERED 
(
	[EmployeeEmailAddress] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[DepartmentEmployees]  WITH CHECK ADD FOREIGN KEY([DepartmentID])
REFERENCES [dbo].[Departments] ([DepartmentID])
GO
ALTER TABLE [dbo].[DepartmentEmployees]  WITH CHECK ADD FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employees] ([EmployeeID])
GO
ALTER TABLE [dbo].[Employees]  WITH CHECK ADD FOREIGN KEY([EmployeeManagerID])
REFERENCES [dbo].[Employees] ([EmployeeID])
GO
USE [master]
GO
ALTER DATABASE [HR-ADMIN] SET  READ_WRITE 
GO

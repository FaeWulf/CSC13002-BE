CREATE TABLE KHOI(
MAKHOI CHAR(5) NOT NULL,
TENKHOI VARCHAR(40),
SOLUONG INT,
PRIMARY KEY(MAKHOI)
);

CREATE TABLE LOP
(
MALOP CHAR(5) NOT NULL,
TENLOP VARCHAR(10),
SISO INT,
MAKHOI CHAR(5),
PRIMARY KEY(MALOP)
);

CREATE TABLE HOCSINH
(
MAHS CHAR(5) NOT NULL,
HOTEN VARCHAR(40),
GIOITINH VARCHAR(5), -- SQLINES DEMO *** ÁC
NGAYSINH DATE,
DIACHI VARCHAR(40),
EMAIL VARCHAR(20),
MALOP CHAR(5),
PRIMARY KEY(MAHS)
);

CREATE TABLE HOCKI
(
MAHK CHAR(5) NOT NULL,
TENHK VARCHAR(10),
PRIMARY KEY(MAHK)
);

CREATE TABLE MONHOC
(
MAMH CHAR(5) NOT NULL,
TENMH VARCHAR(20),
PRIMARY KEY(MAMH)
);

CREATE TABLE DIEMTK
(
MADIEMTK CHAR(5) NOT NULL,
DIEMTK DOUBLE PRECISION,
MAHK CHAR(5),
MAMH CHAR(5),
MAHS CHAR(5),
PRIMARY KEY(MADIEMTK)
);

CREATE TABLE LOAIKT
(
MAKT CHAR(5) NOT NULL,
TENKT VARCHAR(10),
PRIMARY KEY(MAKT)
);

CREATE TABLE CHITIETDIEM
(
MADIEMKT CHAR(5) NOT NULL,
MAKT CHAR(5),
DIEMKT DOUBLE precision,
PRIMARY KEY(MADIEMKT,MAKT)
);

CREATE TABLE TAIKHOAN
(
MATK CHAR(5) NOT NULL,
TENDANGNHAP VARCHAR(100),
MATKHAU VARCHAR(100),
LOAITK INT 
);

CREATE TABLE QUYDINH
(
MAQUYDINH VARCHAR(5) NOT NULL,
TENQUYDINH VARCHAR(50),
VALUE DOUBLE precision,
PRIMARY KEY(MAQUYDINH)
);

select * from khoi

INSERT INTO KHOI(MAKHOI,TENKHOI,SOLUONG)
VALUES('KH010','Khối 10',3),('KH011','Khối 11',3),('KH012','Khối 12',3);

insert into HOCKI(MAHK,TENHK)
values('HK001','HK1'),('HK002','HK2');

INSERT INTO MONHOC(MAMH,TENMH)
VALUES('MH001','Toán'),
('MH002','Lý'),
('MH003','Hóa'),
('MH004','Sinh'),
('MH005','Sử'),
('MH006','Địa'),
('MH007','Văn'),
('MH008','Đạo đức'),
('MH009','Thể dục');

insert into LOP(MALOP,TENLOP,SISO,MAKHOI)
values('L10A1','10A1',0,'KH010'),
('L10A2','10A2',0,'KH010'),
('L10A3','10A3',0,'KH010'),
('L11A1','11A1',0,'KH011'),
('L11A2','11A2',0,'KH011'),
('L11A3','11A3',0,'KH011'),
('L12A1','12A1',0,'KH012'),
('L12A2','12A2',0,'KH012'),
('L12A3','12A3',0,'KH012');

insert into LOAIKT(MAKT,TENKT)
values('KT001','KT15p'),('KT002','KT 1 tiết'),('KT003','KT Học Kỳ');


ALTER TABLE HOCSINH
ADD CONSTRAINT QD_TUOI CHECK( (EXTRACT(YEAR FROM NOW()) - EXTRACT(YEAR FROM NGAYSINH)) >=15 AND (EXTRACT(YEAR FROM NOW()) - EXTRACT(YEAR FROM NGAYSINH)) <= 20 )

ALTER TABLE LOP
ADD CONSTRAINT QD_LOP CHECK(SISO<=40)

ALTER TABLE KHOI
ADD CONSTRAINT QD_KHOI CHECK(SOLUONG=3);





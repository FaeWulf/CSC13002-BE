const diemtk = require('./api/controllers/diemtk')
const quydinh = require('./api/controllers/quydinh')
const lop = require('./api/controllers/lop')
const db = require('./api/db')

const { calAge } = require('./modules/calAge')

//MADIEMTK, DIEMTK, MAHK, MAMH, MAHS

async function temp() {

  const lops = await lop.all()

  for (let i = 0; i < lops.length; i++) {
    const size = await db.oneOrNone(`SELECT COUNT(*) FROM hocsinh WHERE malop=$1`, [lops[i].malop])
    await db.query('update lop set siso=$1 where malop=$2', [size.count, lops[i].malop])
  }
}
temp()

/*
for (let i = 1; i < 22; i++) {
  for (let mh = 1; mh <= 7; mh++) {
    diemtk.add(
      stt < 100 ? "DT0" + stt : "DT" + stt,
      Math.floor(Math.random() * (100 - 40) + 40) / 10,
      hk,
      "MH00" + mh,
      i < 10 ? "HS00" + i : "HS0" + i
    )
    stt++
  }
}

//MADIEMKT, MAKT, DIEMKT
let makt = ["KT001", "KT002", "KT003"]
for (let i = stt; i <= stt_max; i++) {
  makt.forEach(E => {
    chitietdiem.add(
      i < 100 ? "DT0" + i : "DT" + i,
      E,
      Math.floor(Math.random() * (100 - 40) + 40) / 10
    )
  })

}

const malop = 'L12A2'
const mamh = 'MH001'
const mahk = 'HK001'

let result = []

async function temp() {
  //get hocsinhs in lop
  const hocsinh = await db.any(`
SELECT h.mahs 
FROM lop
join hocsinh h on h.malop = lop.malop 
where lop.malop=$1`, [String(malop)])

  //get madiemtk of every hocsinh query with monhoc and hocki
  for (let i = 0; i < hocsinh.length; i++) {
    let tt = await db.oneOrNone(`
SELECT h.mahs, h.hoten, d.madiemtk FROM diemtk d
JOIN hocsinh h ON h.mahs = d.mahs
WHERE d.mahs=$1 AND d.mamh=$2 AND d.mahk=$3
`,
      [hocsinh[i].mahs, String(mamh), String(mahk)])

    //get all chitietdiem of hocsinh's monhoc via madiemtk
    if (tt) {
      tt.chitietdiem = []
      const chitietdiem = await db.any(`
SELECT d.mamh, l.tenkt, c.diemkt 
FROM chitietdiem c 
join diemtk d on d.madiemtk = c.madiemkt  
join loaikt l on l.makt = c.makt 
where d.madiemtk=$1`,
        [String(tt.madiemtk)])

      tt.chitietdiem.push(chitietdiem)

      result.push(tt)
    }


  }
}

temp()
*/

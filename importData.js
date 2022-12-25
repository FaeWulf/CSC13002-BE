const diemtk = require('./api/controllers/diemtk')
const quydinh = require('./api/controllers/quydinh')
const lop = require('./api/controllers/lop')
const db = require('./api/db')

const { calAge } = require('./modules/calAge')

//MADIEMTK, DIEMTK, MAHK, MAMH, MAHS

async function temp() {
  const madiemtk = await db.manyOrNone(`SELECT madiemtk FROM diemtk`)


  for (let i = 0; i < madiemtk.length; i++) {
    let diems = await db.manyOrNone(`SELECT * FROM chitietdiem WHERE madiemkt=$1`,
      [String(madiemtk[i].madiemtk)]
    )

    if (diems.length == 0)
      console.log(madiemtk[i].madiemtk + "==========================")
    else
      console.log(madiemtk[i].madiemtk)


    let diem15p = diems[diems.findIndex(E => E.makt == "KT001")]?.diemkt ?? 0
    let diem1tiet = diems[diems.findIndex(E => E.makt == "KT002")]?.diemkt ?? 0
    let diemcuoiky = diems[diems.findIndex(E => E.makt == "KT003")]?.diemkt ?? 0

    diem15p = isNaN(diem15p) ? 0 : diem15p
    diem1tiet = isNaN(diem1tiet) ? 0 : diem1tiet
    diemcuoiky = isNaN(diemcuoiky) ? 0 : diemcuoiky


    let result = (diem15p + diem1tiet * 2 + diemcuoiky * 3) / 6
    result = Math.round((result + Number.EPSILON) * 100) / 100 //round up to 2 decimal

    const rs = await db.query('UPDATE diemtk SET DIEMTK=$1 WHERE MADIEMTK=$2',
      [result, String(madiemtk[i].madiemtk)]
    )
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

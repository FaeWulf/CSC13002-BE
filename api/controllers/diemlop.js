const db = require('../db.js')

module.exports = {
  query: async (MALOP, MAMH, MAHK) => {
    const malop = MALOP
    const mamh = MAMH
    const mahk = MAHK

    let result = []

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
SELECT d.mamh, l.makt, l.tenkt, c.diemkt 
FROM chitietdiem c 
join diemtk d on d.madiemtk = c.madiemkt  
join loaikt l on l.makt = c.makt 
where d.madiemtk=$1`,
          [String(tt.madiemtk)])

        tt.chitietdiem = chitietdiem

        tt.chitietdiem.sort((a, b) => (a.makt > b.makt) ? 1 : ((b.makt > a.makt) ? -1 : 0))
        console.log(tt.chitietdiem)
        result.push(tt)
      }
    }

    return result
  }
}

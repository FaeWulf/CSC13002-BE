const db = require('../db.js')

module.exports = {
  all: async () => {
    const rs = await db.any(`SELECT madiemtk, diemtk, mahk, mamh, h.mahs, h.hoten, h.gioitinh, h.ngaysinh, h.diachi, h.email, h.malop 
FROM diemtk
JOIN hocsinh h ON h.mahs = diemtk.mahs`)
    return rs
  },

  byId: async (MAHS) => {
    const rs = await db.oneOrNone(`SELECT madiemtk, diemtk, mahk, mamh, h.mahs, h.hoten, h.gioitinh, h.ngaysinh, h.diachi, h.email, h.malop 
FROM diemtk
JOIN hocsinh h ON h.mahs = diemtk.mahs
WHERE h.mahs = $1
`,
      [String(MAHS)]
    )
    return rs
  },
}

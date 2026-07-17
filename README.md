# VMOS Control

เว็บ Static สำหรับจัดการ VMOS Cloud สองบัญชีจากแดชบอร์ดเดียว พร้อมใช้งานบน GitHub Pages

## วิธีอัปโหลดขึ้น GitHub Pages

1. สร้าง Repository ใหม่ใน GitHub
2. อัปโหลดไฟล์ `index.html`, `styles.css` และ `app.js` ไว้ที่หน้าหลักของ Repository
3. เข้า **Settings → Pages**
4. ใน **Build and deployment** เลือก **Deploy from a branch**
5. เลือก Branch `main`, Folder `/ (root)` แล้วกด **Save**
6. รอประมาณ 1–3 นาที แล้วเปิด URL ที่ GitHub แสดง

## การใช้งาน

- เว็บจะโหลดเครื่องจากทั้งสองบัญชีโดยอัตโนมัติ
- ใช้ช่องค้นหาและตัวกรองบัญชี/สถานะเพื่อหาเครื่อง
- ปุ่ม “ควบคุมเครื่อง” แสดงเมนูคำสั่งสำหรับเครื่องนั้น
- ประวัติคำสั่งเก็บใน Local Storage ของเบราว์เซอร์

## ข้อควรรู้

- API Key และ Secret Key อยู่ใน `app.js` ตามคำอนุญาตของเจ้าของ
- Repository และ URL ไม่ควรถูกแชร์สู่สาธารณะ
- หากขึ้นข้อความ CORS หมายความว่า VMOS API ไม่อนุญาตให้หน้าเว็บ GitHub Pages เรียก API โดยตรง ต้องเพิ่ม Serverless Proxy ในรุ่นถัดไป
- ใช้ระบบลงลายเซ็น VMOS OpenAPI V2 (`X-Access-Key`, `X-Timestamp`, `X-Sign`)

เอกสารอ้างอิง: https://cloud.vmoscloud.com/vmoscloud/doc/en/server/example-v2.html

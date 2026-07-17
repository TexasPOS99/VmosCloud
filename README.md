# VMOS Control

แดชบอร์ดจัดการ VMOS Cloud สองบัญชี พร้อม Vercel Serverless Proxy สำหรับแก้ปัญหา CORS

## วิธีนำขึ้นใช้งานด้วย GitHub + Vercel

1. สร้าง Repository ใหม่ใน GitHub
2. แตก ZIP แล้วอัปโหลดไฟล์และโฟลเดอร์ทั้งหมดเข้า Repository โดยต้องมีโฟลเดอร์ `api` อยู่ด้วย
3. เข้า https://vercel.com แล้วเลือก **Add New → Project**
4. เลือก Repository ที่เพิ่งสร้าง แล้วกด **Import**
5. ไม่ต้องตั้งค่า Framework Preset, Build Command หรือ Environment Variables เพิ่ม
6. กด **Deploy** และรอจนเสร็จ
7. เปิด URL ที่ Vercel แสดง ห้ามใช้ URL ของ GitHub Pages

## โครงสร้างไฟล์

- `index.html` หน้าเว็บหลัก
- `styles.css` รูปแบบหน้าจอ
- `app.js` ระบบแดชบอร์ด
- `api/vmos.js` ตัวกลางเรียก VMOS API และลงลายเซ็น V2
- `vercel.json` การตั้งค่า Vercel

## ข้อควรรู้

- API Key และ Secret Key อยู่ใน `api/vmos.js` ตามคำอนุญาตของเจ้าของ
- อย่าแชร์ Repository กับบุคคลอื่น และแนะนำให้ตั้ง Repository เป็น Private
- GitHub Pages ใช้ชุดนี้ไม่ได้ เพราะไม่สามารถทำงานฝั่งเซิร์ฟเวอร์ในโฟลเดอร์ `api` ได้
- ประวัติคำสั่งเก็บใน Local Storage ของเบราว์เซอร์

เอกสารอ้างอิง: https://cloud.vmoscloud.com/vmoscloud/doc/en/server/example-v2.html

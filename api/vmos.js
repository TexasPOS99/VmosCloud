const crypto = require('crypto');

const HOST = 'https://api.vmoscloud.com';
const ACCOUNTS = {
  'account-1': { accessKey: 'B4cCZSvKDmsQUHTukUNHUim8uEmNq96P', secretKey: 'CWxHAw4SNme3vgzNo9DdO4hh' },
  'account-2': { accessKey: 'RMAcIQfJ3E5rbSSRTWAMtDSWc46Q3bQ4', secretKey: 'kQNRZK7uaAQ7ayuVeMkR5qQc' }
};

const ALLOWED_PATHS = new Set([
  '/vcpcloud/api/padApi/userPadList',
  '/vcpcloud/api/padApi/padDetail',
  '/vcpcloud/api/padApi/infos',
  '/vcpcloud/api/padApi/reset',
  '/vcpcloud/api/padApi/replacePad',
  '/vcpcloud/api/padApi/updateLanguage',
  '/vcpcloud/api/padApi/updateTimeZone',
  '/vcpcloud/api/padApi/selectFiles',
  '/vcpcloud/api/padApi/installApp',
  '/vcpcloud/api/padApi/uploadFileV3',
  '/vcpcloud/api/padApi/padTaskDetail',
  '/vcpcloud/api/padApi/fileTaskDetail',
  '/vcpcloud/api/padApi/listInstalledApp',
  '/vcpcloud/api/padApi/restart',
  '/vcpcloud/api/padApi/updatePadName',
  '/vcpcloud/api/padApi/getLongGenerateUrl',
  '/vcpcloud/api/padApi/stsTokenByPadCode',
  '/vcpcloud/api/padApi/listInstalledApp',
  '/vcpcloud/api/padApi/dissolveRoom'
]);

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'GET') {
    return res.status(200).json({ ok: true, service: 'VMOS Proxy', accounts: Object.keys(ACCOUNTS).length });
  }
  if (req.method !== 'POST') return res.status(405).json({ code: 405, msg: 'Method not allowed' });

  const { accountId, path, body = {} } = req.body || {};
  const account = ACCOUNTS[accountId];
  if (!account) return res.status(400).json({ code: 400, msg: 'ไม่พบบัญชีที่เลือก' });
  if (!ALLOWED_PATHS.has(path)) return res.status(403).json({ code: 403, msg: 'Endpoint นี้ไม่ได้รับอนุญาต' });

  const rawBody = JSON.stringify(body);
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = crypto.createHash('sha256')
    .update(account.secretKey + timestamp + path + rawBody, 'utf8')
    .digest('hex');

  try {
    const upstream = await fetch(HOST + path, {
      method: 'POST',
      headers: {
        'X-Access-Key': account.accessKey,
        'X-Timestamp': timestamp,
        'X-Sign': signature,
        'Content-Type': 'application/json'
      },
      body: rawBody
    });
    const text = await upstream.text();
    res.status(upstream.status);
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json; charset=utf-8');
    return res.send(text);
  } catch (error) {
    return res.status(502).json({ code: 502, msg: 'Vercel เชื่อมต่อ VMOS ไม่สำเร็จ', error: error.message });
  }
};

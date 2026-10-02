# Gizariotis Construction

Premium marketing website for **GIZARIOTIS CONSTRUCTION**.

## Run locally

```bash
npm install
npm run dev
```

- Site: http://localhost:5173
- Admin: http://localhost:5173/admin

## Vercel deploy

1. Deploy the repo to Vercel.
2. In **Project Settings → Environment Variables** add:

| Name | Value |
| --- | --- |
| `BLOB_READ_WRITE_TOKEN` | from Vercel Storage → Blob → create store / token |
| `ADMIN_PASSWORD` | your strong password |
| `ADMIN_TOKEN_SECRET` | long random secret |

3. Redeploy.
4. Open `https://your-domain.vercel.app/admin`

Without `BLOB_READ_WRITE_TOKEN`, `/admin` loads but uploads cannot be saved on Vercel.

## Production (VPS / Node)

```bash
npm run build
npm start
```

## Mini admin

Path: `/admin`

Default password: `gizariotis2026` (change it in env vars)

The client can upload / delete project photos for the «Τα έργα μας» section.

## Contact

Business phone: [694 803 3201](tel:6948033201)

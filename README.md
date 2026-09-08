# Gizariotis Construction

Premium marketing website for **GIZARIOTIS CONSTRUCTION**.

## Run locally

```bash
npm install
npm run dev
```

- Site: http://localhost:5173
- Admin: http://localhost:5173/admin

## Production

```bash
npm run build
npm start
```

Server listens on port `3001` (or `PORT`).

## Mini admin (photos)

Path: `/admin`

Default password: `gizariotis2026`

Change it with environment variables:

```bash
ADMIN_PASSWORD=your-strong-password
ADMIN_TOKEN_SECRET=random-long-secret
PORT=3001
```

The client can:
1. Open `/admin`
2. Log in
3. Upload project photos with title / category / description
4. Delete photos

Uploaded files are stored in `public/uploads/` and metadata in `data/projects.json`.

## Contact

Business phone: [694 803 3201](tel:6948033201)

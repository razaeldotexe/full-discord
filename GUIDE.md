# 📘 Panduan Penggunaan & Menjalankan Project

Project ini adalah monorepo yang terdiri dari **Discord Bot** dan **Web Dashboard** (Next.js).

## 🚀 Prasyarat
Sebelum memulai, pastikan Anda telah menginstal:
- [Node.js](https://nodejs.org/) (Versi 18 atau terbaru)
- [npm](https://www.npmjs.com/)
- [SQLite](https://sqlite.org/) (Digunakan untuk database lokal)

---

## 🛠️ Langkah Instalasi

1. **Clone atau Buka Project**
   Pastikan Anda berada di direktori root project `full-discord`.

2. **Instal Dependensi**
   Jalankan perintah berikut di root direktori untuk menginstal semua library yang dibutuhkan:
   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variables**
   Salin file `.env.example` menjadi `.env` dan isi nilai yang diperlukan:
   ```bash
   cp .env.example .env
   ```
   Isi variabel berikut:
   - `DISCORD_TOKEN`: Token bot dari Discord Developer Portal.
   - `DISCORD_CLIENT_ID`: Client ID bot Anda.
   - `DISCORD_GUILD_ID`: ID Server Discord (untuk pendaftaran command instan di mode dev).
   - `DATABASE_URL`: Alamat database (Contoh: `file:./dev.db`).
   - `NEXTAUTH_SECRET`: Kode rahasia untuk autentikasi (Bisa diisi string acak).

---

## 🗄️ Persiapan Database

Project ini menggunakan Prisma dengan SQLite. Jalankan perintah ini untuk menyiapkan database:

```bash
# Pindah ke direktori web
cd apps/web

# Jalankan migrasi database
npx prisma migrate dev --name init

# Kembali ke root
cd ../..
```

---

## 🏃 Cara Menjalankan Project

Anda dapat menjalankan bot dan web dashboard secara terpisah atau bersamaan.

### 1. Menjalankan Discord Bot
Dari direktori root, jalankan:
```bash
npm run bot
```
Perintah ini akan menjalankan bot menggunakan `ts-node`. Slash commands akan otomatis didaftarkan ke server (Guild) yang ID-nya ada di `.env`.

### 2. Menjalankan Web Dashboard
Dari direktori root, jalankan:
```bash
npm run web
```
Dashboard akan tersedia di [http://localhost:3000](http://localhost:3000).

---

## ✨ Fitur Utama

### 🤖 Discord Bot
- **Slash Commands & Prefix Commands**: Handler yang terpisah dan rapi.
- **Event Handler**: Otomatis memuat event dari folder `events`.
- **Version Tracking**: Melacak versi bot secara dinamis.

### 🌐 Web Dashboard
- **Discord OAuth**: Login menggunakan akun Discord.
- **Webhook Management**: Buat, edit, dan hapus webhook Discord.
- **Message Builder**: Kirim pesan melalui webhook dengan dukungan Embed dan Button.
- **API Access**: Dilengkapi dengan sistem API Key.

---

## 📦 Build untuk Produksi

Jika ingin melakukan deployment:
```bash
# Build Bot
npm run bot:build

# Build Web
npm run web:build
```

---
> [!TIP]
> Saat melakukan pengembangan, pastikan bot memiliki izin **Gateway Intents** yang benar di Discord Developer Portal (Guilds, Guild Messages, Message Content, Guild Members).

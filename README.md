# Krafters Promo Landing & Intake Application

A high-conversion landing page and multi-step website project intake system built with React, Vite, Tailwind CSS v4, and an Express server.

---

## 🚀 How to Run Locally

### Prerequisites
- **Node.js**: Version **18.0+** or **20+ LTS** (recommended: Node 20 or 22).
  Check your version by running:
  ```bash
  node -v
  ```
- **npm**: Version 9+ or 10+ (comes with Node.js).

---

### Step 1: Install Dependencies
Open your terminal in the extracted project folder and run:

```bash
npm install
```

> 💡 **Troubleshooting `npm install`**:
> If you encounter an `ERESOLVE unable to resolve dependency tree` error (common with React 19 peer dependencies on some npm versions), run:
> ```bash
> npm install --legacy-peer-deps
> ```

---

### Step 2: Set Up Environment Variables (Optional)
Create a `.env` file in the project root:
```bash
cp .env.example .env
```
(On Windows Command Prompt: `copy .env.example .env`)

You can edit `.env` with your values (e.g. `VITE_WHATSAPP_NUMBER`, `GOOGLE_SHEETS_WEBHOOK_URL`, `VITE_GA_MEASUREMENT_ID`).

---

### Step 3: Start the Development Server

#### Option A: Full-Stack Mode (Frontend + Express API)
```bash
npm run dev
```
- Open [http://localhost:3000](http://localhost:3000) in your browser.
- *Note:* If port 3000 is already in use by another application on your computer (`EADDRINUSE`), stop the application using port 3000 first, or see Option B.

#### Option B: Standalone Frontend Mode (Vite only)
If you only need to work on the UI, styling, and animations:
```bash
npm run dev:client
```
- Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🛠️ Common Errors & Solutions

| Error | Cause | Solution |
|---|---|---|
| `npm ERR! code ERESOLVE` | React 19 peer dependency check | Run `npm install --legacy-peer-deps` |
| `listen EADDRINUSE: address already in use :::3000` | Port 3000 is occupied by another app | Close the app on port 3000, or kill it via `npx kill-port 3000` |
| `tsx: command not found` | Dependencies not installed | Run `npm install` first |
| `SyntaxError: Unexpected token` or Tailwind error | Outdated Node.js version (< 18) | Update Node.js to version 20+ LTS from [nodejs.org](https://nodejs.org) |
| Windows PowerShell Script Execution Policy error | Restricted PowerShell execution policy | Run in Command Prompt (CMD), Git Bash, or run `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser` in PowerShell |

---

## 📦 Production Build

To build for production:
```bash
npm run build
```

To test the compiled production server:
```bash
npm start
```

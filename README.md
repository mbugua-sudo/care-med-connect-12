Document Research & Q&A Web App
================================

Requirements
------------
- Python 3.10+
- Node 18+
- OpenAI API key

Setup
-----
1) Copy env and set your key
```
cp .env.example .env
```
Set `OPENAI_API_KEY` in `.env`.

2) Backend install and run
```
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

3) Frontend install and run
```
cd frontend
npm install
npm run dev
```

Usage
-----
1. Upload a PDF/TXT/DOCX/XLSX/image.
2. Click "Build Index" to create embeddings in FAISS.
3. Ask questions in chat. Toggle Deep reasoning / Image / Voice.
4. Export past answers via CSV/XLSX.

API Endpoints
-------------
- `POST /upload` — Upload files, parse via PyMuPDF, python-docx, openpyxl, TXT, OCR (gpt-image-1)
- `POST /build-index` — Split, embed (text-embedding-3-large), store in FAISS
- `POST /query` — Moderate (omni-moderation-latest), retrieve, reason with gpt-5-mini or gpt-5/o1-pro
- `POST /export` — Export query history via pandas/openpyxl
- `GET /documents`, `GET /index-info`, `GET /queries`, `GET /health`

Notes
-----
- Embeddings, metadata, and queries stored locally (SQLite + JSON + files).
- You can customize models and retrieval params via `.env`.

# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/fcc819de-039b-487e-b81d-886170b742fd

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/fcc819de-039b-487e-b81d-886170b742fd) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/fcc819de-039b-487e-b81d-886170b742fd) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

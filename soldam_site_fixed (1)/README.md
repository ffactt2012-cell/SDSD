
# Netlify Static Portfolio (EN)

Features:
- Gallery index (thumbnails) → viewer with previous/next + mobile swipe
- Per‑photo comments (Netlify Forms + instant local display)
- Board (documents / notes)
- Admin via Decap CMS at `/admin` (Git Gateway + Netlify Identity)
- Images bundled under `/uploads`
- Sample images included from your attachments

Deploy:
1) Push to a Git repo and connect on Netlify (recommended).  
2) Enable **Identity** and **Git Gateway**.  
3) Invite yourself and log in at `/admin`.

Notes:
- The serverless function `/.netlify/functions/comments` returns demo data. Replace with a Forms API integration if you want public comment listing.

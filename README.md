# Aman Raj — personal site

Pages: index (Home), work, experience, upsc, markets, book, about.
Shared design: assets/style.css · Shared behaviour: assets/site.js

## Upload to GitHub
Upload everything in this folder to the root of your repo, replacing the old files.
Keep the folders: assets/, picks/, resume/, tools/.

## Booking links
Open assets/site.js, find `EDIT HERE`, paste your links.

## Photo
Save a square photo as assets/aman.jpg, then in index.html find `aman.jpg`
and remove the `<!--` and `-->` around the img tag.

## Weekly stock picks
1. Make a folder named with the date, e.g.  Weekly Picks/2026-11-01/
2. Put your screenshots in it, named by stock symbol:
      HDFCBANK.png   HDFCBANK_2.png   TATAMOTORS.png
3. Add notes.txt in this format:

      DATE: 2026-11-01
      SUMMARY: Optional note for the week

      ### HDFCBANK | NSE | HDFC Bank
      Your note on this stock.

      ### TATAMOTORS | NSE
      Your note on this stock.

4. Run (from this site folder):
      python3 tools/add_week.py "/path/to/Weekly Picks/2026-11-01"
   It copies the screenshots into picks/ and adds your notes word for word
   to picks/picks.js. Then upload picks/ to GitHub.

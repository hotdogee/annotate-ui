# Deployment Notes

- Setup Custom domain
  - Verify Domain
    - User Settings -> Pages -> Add a domain -> hanl.in
    - DNS: TXT Record
  - DNS: CNAME Record
    - ann
    - hotdogee.github.io.
  - Repo Settings -> Pages -> Custom Domain: ann.hanl.in
    - Enforce HTTPS (wait 1 min and refresh page)
- Setup GitHub Actions
  - .github/workflows/quasar-gh-pages.yml

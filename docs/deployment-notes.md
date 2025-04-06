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

## id-token: write is Required for actions/deploy-pages@v4

```
Run actions/deploy-pages@v4
Error: Error message: Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable
    at Function.<anonymous> (/home/runner/work/_actions/actions/deploy-pages/v4/node_modules/@actions/core/lib/oidc-utils.js:71:1)
    at Generator.next (<anonymous>)
    at /home/runner/work/_actions/actions/deploy-pages/v4/node_modules/@actions/core/lib/oidc-utils.js:8:1
    at new Promise (<anonymous>)
    at __webpack_modules__.98041.__awaiter (/home/runner/work/_actions/actions/deploy-pages/v4/node_modules/@actions/core/lib/oidc-utils.js:4:1)
    at Function.getIDToken (/home/runner/work/_actions/actions/deploy-pages/v4/node_modules/@actions/core/lib/oidc-utils.js:57:1)
    at Object.<anonymous> (/home/runner/work/_actions/actions/deploy-pages/v4/node_modules/@actions/core/lib/core.js:315:1)
    at Generator.next (<anonymous>)
    at /home/runner/work/_actions/actions/deploy-pages/v4/node_modules/@actions/core/lib/core.js:27:1
    at new Promise (<anonymous>)
Error: Ensure GITHUB_TOKEN has permission "id-token: write".
```

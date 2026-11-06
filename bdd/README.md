# OrangeHRM Login BDD

This TypeScript Cucumber suite is isolated in `bdd/`; it does not modify the
existing Playwright tests, root package files, or Playwright configuration.
The suite uses a page object, scenario fixtures, UI helpers, and centralized
login test data.

Run these commands from the repository root:

```powershell
npm install --prefix bdd
npm run typecheck --prefix bdd
npm run test --prefix bdd
```

The browser runs headless by default. Set `HEADLESS=false` to show Chromium.
Set `ORANGEHRM_URL` to use a different OrangeHRM login URL.

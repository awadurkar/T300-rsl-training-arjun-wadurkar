# Modern Front-End Security Concepts

This project refines the intentionally vulnerable User Security Dashboard while
preserving its Vanilla JavaScript, HTML, CSS, Node.js, and Express architecture.
The fixes use multiple layers: safe DOM APIs, strict server-side input
validation, minimal public profile data, and browser-enforced security headers.

## Run the application

Requires Node.js with built-in `node:test` support.

```bash
npm install
npm start
```

Open <http://localhost:3000>. The dashboard and Account Settings page load the
profile from `/api/profile`; the settings form posts to `/api/settings`.

Run the automated regression and security tests:

```bash
npm test
```

## Findings and refinements

### DOM-based XSS

- **Vulnerable implementation:** `client/app.js` interpolated the `name` query
  parameter into an `innerHTML` template. `server/server.js` also interpolated
  profile values into HTML on the account page.
- **Untrusted source / boundary:** URL query parameters and profile data cross
  into the browser DOM. Treat both as text, even when profile data currently
  comes from this demo's server.
- **Fix:** The dashboard constructs elements and inserts all dynamic values
  with `textContent`/text nodes. Account details are loaded from the profile
  API and assigned with `textContent`. There are no HTML-string rendering
  sinks.
- **Verification:** `npm test` checks that the rendering code uses text
  insertion and has no `innerHTML`. Manually open
  `http://localhost:3000/?name=%3Cimg%20src%3Dx%20onerror%3Dalert(1)%3E`:
  the value should appear literally as the heading and no image/alert should
  be created.

### Prototype pollution

- **Vulnerable implementation:** Client and server copied arbitrary
  user-controlled properties into ordinary objects. An own `__proto__`
  property could alter the destination object's prototype.
- **Untrusted source / boundary:** JSON request bodies sent to `POST
  /api/settings` and the settings object constructed in the browser.
- **Fix:** The client submits only the three known settings. The server
  validates that the body is an object, rejects unsupported keys, and checks
  each setting against its allowed values before constructing the response.
  It does not merge arbitrary input.
- **Verification:** `npm test` checks successful allowed settings, invalid
  values, and rejection of `__proto__` without polluting `Object.prototype`.

### Server-rendered (SSR) token leakage

- **Vulnerable implementation:** The home page serialized the complete server
  user record into `window.initialUser`; `/api/profile` also returned that
  complete record, including its session and refresh token fields.
- **Sensitive data / boundary:** Session tokens are server-side secrets and
  must not be included in HTML or public profile responses.
- **Fix:** The dashboard is now a static HTML file. The profile API explicitly
  returns only `id`, `name`, `email`, and `role`; it never serializes the full
  user record. Both pages consume this minimal public profile.
- **Verification:** `npm test` confirms that the HTML and profile API do not
  contain the demo token values or token property names.

### Content Security Policy (CSP)

- **Vulnerable implementation:** The pages had inline scripts and, on the
  account page, inline styles. No policy constrained executable content.
- **Security boundary:** The browser's policy controls which sources may
  execute scripts/styles, connect to APIs, and frame the page.
- **Fix:** All page JavaScript and CSS are external same-origin resources. The
  Express middleware sends a restrictive CSP (`default-src 'self'`,
  `script-src 'self'`, `style-src 'self'`, `object-src 'none'`,
  `base-uri 'self'`, `form-action 'self'`, and `frame-ancestors 'none'`).
- **Verification:** `npm test` checks CSP response headers and that served
  pages have no inline scripts. In browser DevTools, verify normal dashboard
  and account functionality works without CSP violations; an inline script
  added temporarily to a page should be blocked.

### Clickjacking

- **Vulnerable implementation:** The account page could be embedded by another
  site in an iframe.
- **Security boundary:** A hostile parent page could overlay a transparent
  frame and trick a user into interacting with the account page.
- **Fix:** All responses include `X-Frame-Options: DENY`; CSP additionally
  sets `frame-ancestors 'none'`.
- **Verification:** `npm test` checks both framing headers. With the app
  running, open <http://localhost:3000/test/iframe-test.html>; the account
  page must not render inside the frame. Browser DevTools should report that
  the frame was refused by the response policy.

## Automated and manual verification

`npm test` covers security headers, public profile minimization, settings
validation, and safe rendering expectations. The manual scenarios above cover
browser behavior that cannot be fully exercised by the Node built-in test
runner alone. The assignment requires testing evidence for all five security
areas and a demonstration video; capture screenshots of the relevant browser
scenarios as evidence and include them with the submission.

## Defense in depth

The application does not rely on CSP as a substitute for safe rendering:
untrusted text is inserted as text, arbitrary settings are rejected at the
server boundary, sensitive profile fields are excluded from public responses,
and response headers further restrict script execution and framing. Each
control mitigates a different failure mode.

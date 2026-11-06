const assert = require("node:assert/strict");
const { readFile } = require("node:fs/promises");
const { after, before, test } = require("node:test");
const app = require("../server/server");

let server;
let baseUrl;

before(async () => {
    await new Promise((resolve) => {
        server = app.listen(0, resolve);
    });
    baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
    await new Promise((resolve, reject) => {
        server.close((error) => error ? reject(error) : resolve());
    });
});

test("DOM XSS: profile rendering uses text APIs, not HTML parsing", async () => {
    const source = await readFile(
        require.resolve("../client/app.js"),
        "utf8"
    );

    assert.match(source, /new URLSearchParams\(window\.location\.search\)/);
    assert.match(source, /\.textContent\s*=/);
    assert.match(source, /createTextNode/);
    assert.doesNotMatch(source, /\.innerHTML\b/);
});

test("prototype pollution: allowed settings work and hostile keys are rejected", async () => {
    const validResponse = await fetch(`${baseUrl}/api/settings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            theme: "dark",
            language: "fr",
            fontSize: "large"
        })
    });

    assert.equal(validResponse.status, 200);
    assert.deepEqual((await validResponse.json()).settings, {
        theme: "dark",
        language: "fr",
        fontSize: "large"
    });

    const hostileResponse = await fetch(`${baseUrl}/api/settings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: '{"__proto__":{"polluted":"yes"},"theme":"dark"}'
    });

    assert.equal(hostileResponse.status, 400);
    assert.equal(Object.prototype.polluted, undefined);

    const invalidValueResponse = await fetch(`${baseUrl}/api/settings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: "unexpected" })
    });

    assert.equal(invalidValueResponse.status, 400);
});

test("SSR token leakage: public HTML and profile exclude private token fields", async () => {
    const [pageResponse, profileResponse] = await Promise.all([
        fetch(baseUrl),
        fetch(`${baseUrl}/api/profile`)
    ]);
    const html = await pageResponse.text();
    const profileData = await profileResponse.json();
    const profile = JSON.stringify(profileData);

    for (const content of [html, profile]) {
        assert.doesNotMatch(content, /TRAINING-FAKE-(ACCESS|REFRESH)-TOKEN/);
        assert.doesNotMatch(content, /sessionToken|refreshToken/);
    }

    assert.match(profile, /"name":"John Doe"/);
    assert.match(profile, /"email":"john@example.com"/);
    assert.deepEqual(Object.keys(profileData), ["id", "name", "email", "role"]);
});

test("CSP: pages use external scripts and restrictive policy headers", async () => {
    for (const route of ["/", "/account"]) {
        const response = await fetch(`${baseUrl}${route}`);
        const html = await response.text();
        const policy = response.headers.get("content-security-policy");

        assert.match(policy, /script-src 'self'/);
        assert.match(policy, /style-src 'self'/);
        assert.match(policy, /object-src 'none'/);
        assert.match(html, /<script[^>]+src=/);
        assert.doesNotMatch(html, /<script(?:\s[^>]*)?>\s*[^<]/i);
    }
});

test("clickjacking: dashboard and account responses deny framing", async () => {
    for (const route of ["/", "/account"]) {
        const response = await fetch(`${baseUrl}${route}`);

        assert.equal(response.headers.get("x-frame-options"), "DENY");
        assert.match(
            response.headers.get("content-security-policy"),
            /frame-ancestors 'none'/
        );
    }

    const iframeTest = await fetch(`${baseUrl}/test/iframe-test.html`);
    assert.equal(iframeTest.status, 200);
});

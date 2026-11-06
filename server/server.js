const express = require("express");
const path = require("path");

const { user, defaultSettings } = require("./data");

const app = express();
const PORT = 3000;

const allowedSettings = {
    theme: ["light", "dark"],
    language: ["en", "fr"],
    fontSize: ["small", "medium", "large"]
};

app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        [
            "default-src 'self'",
            "script-src 'self'",
            "style-src 'self'",
            "connect-src 'self'",
            "img-src 'self'",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self'",
            "frame-ancestors 'none'"
        ].join("; ")
    );
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
});

app.use(express.json({ limit: "10kb" }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.get("/api/profile", (req, res) => {
    res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    });
});

app.get("/api/settings", (req, res) => {
    res.json({ ...defaultSettings });
});

app.post("/api/settings", (req, res) => {
    const incomingSettings = req.body;

    if (
        incomingSettings === null ||
        typeof incomingSettings !== "object" ||
        Array.isArray(incomingSettings)
    ) {
        return res.status(400).json({ message: "Settings must be a JSON object." });
    }

    const keys = Object.keys(incomingSettings);
    const unknownKey = keys.find((key) => !Object.hasOwn(allowedSettings, key));

    if (unknownKey) {
        return res.status(400).json({ message: `Unsupported setting: ${unknownKey}` });
    }

    const settings = {};

    for (const key of keys) {
        const value = incomingSettings[key];

        if (
            typeof value !== "string" ||
            !allowedSettings[key].includes(value)
        ) {
            return res.status(400).json({ message: `Invalid value for setting: ${key}` });
        }

        settings[key] = value;
    }

    res.json({
        message: "Settings saved successfully.",
        settings
    });
});

app.get("/account", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "account.html"));
});

app.use("/test", express.static(path.join(__dirname, "..", "test")));
app.use(express.static(path.join(__dirname, "..", "client")));

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Application running at http://localhost:${PORT}`);
    });
}

module.exports = app;
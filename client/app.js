const app = document.getElementById("app");
const profileName = new URLSearchParams(window.location.search).get("name");

function addProfileField(profile, label, value) {
    const paragraph = document.createElement("p");
    const labelElement = document.createElement("strong");

    labelElement.textContent = `${label}: `;
    paragraph.append(labelElement, document.createTextNode(value));
    profile.append(paragraph);
}

function renderProfile(user) {
    const profile = document.createElement("section");
    const heading = document.createElement("h2");

    profile.className = "profile-card";
    heading.textContent = `Welcome, ${profileName || user.name || "Guest"}`;
    profile.append(heading);
    addProfileField(profile, "Email", user.email || "Unknown");
    addProfileField(profile, "Role", user.role || "User");
    app.replaceChildren(profile);
}

async function loadProfile() {
    try {
        const response = await fetch("/api/profile");

        if (!response.ok) {
            throw new Error(`Profile request failed with status ${response.status}`);
        }

        renderProfile(await response.json());
    } catch (error) {
        console.error("Unable to load profile:", error);
        app.textContent = "Unable to load your profile.";
    }
}

loadProfile();

const saveButton = document.getElementById("save-settings");

saveButton.addEventListener("click", async () => {
    const settings = {
        theme: document.getElementById("theme").value,
        language: document.getElementById("language").value,
        fontSize: document.getElementById("fontSize").value
    };

    try {
        const response = await fetch("/api/settings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(settings)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Settings request failed.");
        }

        document.getElementById("settings-status").textContent =
            result.message;
    } catch (error) {
        console.error("Unable to save settings:", error);
        document.getElementById("settings-status").textContent =
            "Unable to save settings.";
    }
});

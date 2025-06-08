🛡️ Fake Viber Bot Profile API (PoC Lab Setup)

A fully dockerized fake API server that simulates `chatapi.viber.com/pa/v1/botProfile` for Red Team testing, bot UX mockups, or interception research.

Built with **NestJS**, **Nginx TLS reverse proxy**, and **Frida SSL bypass script** for use in **authorized lab environments**.

---

## 📌 Use Case

This project allows you to simulate a Viber bot profile by intercepting the client request to:

```

POST [https://chatapi.viber.com/pa/v1/botProfile](https://chatapi.viber.com/pa/v1/botProfile)

```

And responding with a custom fake bot profile. Once configured, your fake bot will appear inside the official Viber app UI when searching by `chatUri`.

---

## 📁 Project Structure

```

api-server/
├── src/                     # NestJS app
│   └── bot-profile/         # Controller + Service
├── certs/                   # TLS certs for HTTPS
├── frida/                   # SSL bypass & redirect
├── nginx/                   # Reverse proxy with TLS
├── docker/                  # Entrypoint scripts
├── docker-compose.yaml      # Orchestration
├── .env                     # Env config
└── README.md                # This file

````

---

## ✅ Features

- 🧠 Simulates Viber botProfile endpoint (`/pa/v1/botProfile`)
- 🔐 HTTPS with self-signed or custom cert
- 🧬 Frida script for:
  - SSL pinning bypass
  - Domain redirect (`chatapi.viber.com → fake.local`)
- 🐳 Docker Compose stack (API + TLS Proxy)
- 🔁 Ready for local or cloud deployment (with systemd or PM2)

---

## 🚀 Quick Start

### 1. Clone the Repo

```bash
git clone https://github.com/EthanVT97/api-server.git
cd api-server
````

### 2. Generate Fake TLS Certs

```bash
mkdir certs
openssl req -x509 -newkey rsa:4096 -nodes \
  -keyout certs/fake.key -out certs/fake.crt -days 365 \
  -subj "/CN=chatapi.viber.com"
```

### 3. Configure Environment

`.env`:

```env
HOSTNAME=chatapi.viber.com
FAKE_API_PORT=443
```

### 4. Build & Launch (Docker)

```bash
docker-compose up --build -d
```

---

## 🧪 Frida Setup (Device Interception)

Use on **Android emulator or rooted device** with Viber installed:

```bash
frida -U -n com.viber.voip -l frida/viber-redirect.js
```

✅ This bypasses SSL pinning and rewrites API hostname to point to your fake server.

---

## 🔁 Viber Fake Bot Test

1. Open **Viber app**
2. In Search bar, type:

```
555mix
```

3. If your fake API is working:

✅ You will see **Fake MixBot** profile
✅ Avatar, name, background color, and members count shown
✅ Optional: Simulate subscribe, message feed, etc.

---

## 🧱 API Response Schema

Example JSON returned by `POST /pa/v1/botProfile`:

```json
{
  "status": 0,
  "chat": {
    "id": "pa:555666777",
    "name": "Fake MixBot",
    "icon": "https://yourcdn.com/assets/fakebot.png",
    "background": "#121212",
    "members": 1254,
    "category": "Technology",
    "country": "US",
    "role": "admin",
    "flags": 1,
    "altUris": ["555mix"],
    "status": "active",
    "capabilities": {
      "hasBot": true,
      "canSendMessages": true
    }
  }
}
```

---

## 🔐 Security & Stability Tips

| Feature                 | Strategy                                                    |
| ----------------------- | ----------------------------------------------------------- |
| SSL Pinning Bypass      | Frida script / TrustMeAlready (Magisk)                      |
| Header Mimicry          | Match real Viber request headers (User-Agent, X-\* headers) |
| JSON Precision          | Preserve Viber's expected field names/order                 |
| DNS Override (optional) | Magisk module or system `hosts` override                    |

---

## 📈 Extend & Scale

| Extension           | How-to                                            |
| ------------------- | ------------------------------------------------- |
| Fake Subscribe Flow | Add `POST /pa/v1/subscribe` endpoint              |
| Fake Messages       | Serve message history from `/pa/v1/fetchMessages` |
| Multi-Bot UX Mock   | Handle multiple `chatUri` mappings                |
| Cloud Deploy        | Use Nginx + TLS on cloud VM (Ubuntu)              |
| CI/CD               | GitHub Actions + Docker Hub publish               |

---

## ⚠️ Legal Notice

This project is strictly for **authorized lab testing**, **Red Team simulation**, and **UX prototyping**.
Do **NOT** use against production infrastructure or without consent.

---

## 🧠 Credits

Author: [EthanVT97](https://github.com/EthanVT97)
Frida Techniques: [Frida.re](https://frida.re)
Viber Protocol Analysis: Reverse engineered via emulator traffic

---

## 📎 License

MIT — Use at your own risk. For ethical hacking & testing labs only.

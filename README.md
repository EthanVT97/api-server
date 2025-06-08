api-server/
├── src/
│   ├── main.ts            # NestJS HTTPS server
│   ├── bot-profile/
│   │   ├── bot-profile.controller.ts
│   │   └── bot-profile.service.ts
├── certs/
│   ├── fake.crt
│   └── fake.key
├── docker-compose.yaml    # App + reverse proxy
├── Dockerfile             # Builds NestJS app
├── frida/
│   └── viber-redirect.js  # Script to bypass SSL pinning & redirect domain
├── nginx/
│   ├── nginx.conf         # TLS termination & reverse proxy setup
│   └── Dockerfile
├── docker/
│   └── entrypoint.sh      # Launch sequence script
├── .env                   # Configurable env vars (PORT, HOSTNAME…)
├── README.md              # Setup & test instructions
└── ci/                    # GitHub Actions CI/CD pipeline files


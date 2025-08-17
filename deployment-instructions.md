# Cash Flow Tracker

A modern, mobile-responsive personal finance tracker built with React and Docker.

## 🚀 Quick Start (Docker)

### Option 1: Pull from GitHub Container Registry (Recommended)

```bash
# Download the docker-compose.yml
curl -O https://raw.githubusercontent.com/yourusername/cash-flow-tracker/main/docker-compose.yml

# Start the application
docker-compose up -d

# Access at http://localhost:3000
```

### Option 2: One-liner deployment

```bash
docker run -d \
  --name cash-flow-tracker \
  -p 3000:80 \
  --restart unless-stopped \
  ghcr.io/yourusername/cash-flow-tracker:latest
```

### Option 3: Build locally

```bash
# Clone the repository
git clone https://github.com/yourusername/cash-flow-tracker.git
cd cash-flow-tracker

# Build and run
docker-compose up --build -d
```

## 🛠️ Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | `production` | Application environment |

### Ports

- **3000**: Web interface (HTTP)

### Volumes

- `/etc/localtime:/etc/localtime:ro` - Timezone synchronization

## 🔧 Advanced Configuration

### With Traefik (Reverse Proxy)

Uncomment the labels section in `docker-compose.yml`:

```yaml
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.cash-flow.rule=Host(`your-domain.com`)"
  - "traefik.http.routers.cash-flow.tls=true"
  - "traefik.http.routers.cash-flow.tls.certresolver=letsencrypt"
```

### Health Checks

The container includes built-in health checks:
- **Endpoint**: `http://localhost:80/`
- **Interval**: 30 seconds
- **Timeout**: 10 seconds
- **Retries**: 3

## 📱 Features

- **Mobile-responsive** design
- **Privacy toggle** to hide amounts
- **Export/Import** monthly data as JSON
- **Real-time budget tracking** with visual indicators
- **Multi-category** expense management
- **Savings rate** calculation
- **Progress bars** for budget categories

## 🔄 Updates

The image is automatically built on every commit to the main branch. To update:

```bash
docker-compose pull
docker-compose up -d
```

Or if using Watchtower:

```yaml
labels:
  - "com.centurylinklabs.watchtower.enable=true"
```

## 🛡️ Security

The container runs with:
- **Read-only** filesystem
- **No new privileges**
- **Non-root** user
- **Minimal attack surface** (nginx + static files only)

## 🏗️ Building Your Own

1. Fork this repository
2. Update the image name in `docker-compose.yml`
3. Push to your repo - GitHub Actions will build automatically
4. Use your image: `ghcr.io/yourusername/cash-flow-tracker:latest`

## 📊 Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React App     │────│   Nginx         │────│   Docker        │
│   (Frontend)    │    │   (Web Server)  │    │   (Container)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with `docker-compose up --build`
5. Submit a pull request

## 📄 License

MIT License - feel free to use for personal or commercial projects!

---

**Built for personal finance management with privacy and simplicity in mind.**

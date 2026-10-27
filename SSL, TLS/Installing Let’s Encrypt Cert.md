### Prerequisites

Before starting:
1. The domain name (e.g., `example.com` and `www.example.com`) has an **A Record** pointing to the server's public IP address.
2. The Nginx server block contains the domain name in the `server_name` directive:
   ```nginx
   server_name example.com www.example.com;
   ```

---

### 1: Open HTTP and HTTPS Ports in the Firewall

Let's Encrypt requires port 80 to verify the domain and port 443 to serve encrypted traffic:

```bash
sudo ufw allow 'Nginx Full'
sudo ufw delete allow 'Nginx HTTP'
sudo ufw status
```

---

### 2: Install Certbot

The Electronic Frontier Foundation (EFF) recommends installing Certbot via **Snap** for the latest features and security updates (Ubuntu comes with `snapd` pre-installed):

```bash
# Ensure snap core is up to date
sudo snap install core && sudo snap refresh core

# Install Certbot
sudo snap install --classic certbot

# Link the certbot command to the path
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

*(Alternative: If you prefer standard APT, run: `sudo apt update && sudo apt install certbot python3-certbot-nginx -y`)*.

---

### 3: Obtain and Install the SSL Certificate

```bash
sudo certbot --nginx -d <example.com> -d <www.example.com>
```

Once complete, Certbot will output the file locations of the certificate and keys:
* **Certificate:** `/etc/letsencrypt/live/example.com/fullchain.pem`
* **Private Key:** `/etc/letsencrypt/live/example.com/privkey.pem`

---

### 4: Verify Nginx Configuration and Reload

Check that Certbot didn't introduce any syntax errors:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

At this point SSL Cert has been installed.

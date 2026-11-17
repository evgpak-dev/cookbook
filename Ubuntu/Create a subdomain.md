# Creating a subdomain
requires two main steps:

1. **Pointing the subdomain to the server (DNS setup)**
2. **Configuring the web server (Nginx) to serve it**

---

### 1: Add the Subdomain in the DNS Provider

* **Type:** `A` Record
* **Name / Host:** The name of the subdomain (e.g., `blog`, `api`, or `app`)
* **Value / IP:** the server's public IP address (the same IP as the main domain)
* **TTL:** Automatic (or 300 seconds)

---

### 2: Create a Folder for the Subdomain

```bash
sudo mkdir -p /var/www/<SUBDOMAIN>
```

Set the proper file ownership and permissions:

```bash
sudo chown -R $USER:$USER /var/www/<SUBDOMAIN>
sudo chmod -R 755 /var/www/<SUBDOMAIN>
```

Create a simple test page:

```bash
nano /var/www/<SUBDOMAIN>/index.html
```

Paste a test message:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Subdomain Working</title>
</head>
<body>
    <h1>Success! <SUBDOMAIN> is live.</h1>
</body>
</html>
```

### Step 3: Create an Nginx Server Block for the Subdomain

Create a new configuration file in `/etc/nginx/sites-available/`:

```bash
sudo nano /etc/nginx/sites-available/<SUBDOMAIN>
```

```nginx
server {
    listen 80;
    listen [::]:80;

    server_name <SUBDOMAIN>;

    root /var/www/<SUBDOMAIN>/html;
    index index.php index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php8.5-fpm.sock;
    }
}
```

### Step 4: Enable the Site and Reload Nginx

1. Link the configuration file to `sites-enabled`:
   ```bash
   sudo ln -s /etc/nginx/sites-available/<SUBDOMAIN> /etc/nginx/sites-enabled/
   ```

2. Test the configuration for syntax errors:
   ```bash
   sudo nginx -t
   ```

3. Reload Nginx:
   ```bash
   sudo systemctl reload nginx
   ```

At this stage, you can open `http://<SUBDOMAIN>` in the browser to verify it loads.

---

### Step 5: Secure the Subdomain with SSL (Let's Encrypt)

Run Certbot to generate and install an SSL certificate for the new subdomain:

```bash
sudo certbot --nginx -d <SUBDOMAIN>
```

The subdomain is now live at `https://<SUBDOMAIN>`.

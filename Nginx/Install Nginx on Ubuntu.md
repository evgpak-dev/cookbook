### Step 1: Update the system
```bash
sudo apt update
sudo apt upgrade -y
```

### Step 2: Install Nginx

```bash
sudo apt install nginx -y
```
The `-y` flag automatically confirms the installation prompt. When the installation finishes, Ubuntu will automatically start the Nginx service.

### Step 3: Adjust the Firewall (UFW)
If you have the Uncomplicated Firewall (UFW) enabled on your Ubuntu server, you need to allow traffic to Nginx. Nginx registers itself with UFW upon installation.

1. **See the available UFW applications:**
   ```bash
   sudo ufw app list
   ```
   You should see Nginx profiles in the output (`Nginx HTTP`, `Nginx HTTPS`, and `Nginx Full`).

2. **Allow web traffic:**
   It is recommended to enable the most restrictive profile that still allows the traffic you need. If you haven't configured SSL/TLS (HTTPS) yet, you can just allow HTTP:
   ```bash
   sudo ufw allow 'Nginx HTTP'
   ```
   *Note: If you plan to set up HTTPS right away, use `sudo ufw allow 'Nginx Full'` instead to open both port 80 and 443.*

3. **Verify the change:**
   ```bash
   sudo ufw status
   ```

### Step 4: Verify the Installation
To confirm that Nginx is running properly, you can check its systemd service status:

```bash
sudo systemctl status nginx
```
You should see an output that says `active (running)`. *(Press `q` to exit the status screen).*

**Test in your browser:**
You can also verify it by accessing the default Nginx landing page. Open your web browser and navigate to your server's IP address:

```text
http://your_server_ip
```
*(If you are installing this on your local machine, navigate to `http://localhost` or `http://127.0.0.1`).*

You should see a page that says **"Welcome to nginx!"** This confirms your web server is installed and working correctly.

---

### Step 5: Basic Nginx Management Commands
Now that you have Nginx up and running, here are the essential commands you will need to manage it.

*   **Stop Nginx:**
    ```bash
    sudo systemctl stop nginx
    ```
*   **Start Nginx:**
    ```bash
    sudo systemctl start nginx
    ```
*   **Restart Nginx** (Stops and then starts the service, dropping connections):
    ```bash
    sudo systemctl restart nginx
    ```
*   **Reload Nginx** (Applies configuration changes gracefully without dropping current connections - **Use this most often**):
    ```bash
    sudo systemctl reload nginx
    ```
*   **Disable Nginx from starting at boot:**
    ```bash
    sudo systemctl disable nginx
    ```
*   **Enable Nginx to start at boot** (This is on by default):
    ```bash
    sudo systemctl enable nginx
    ```

### Important File Locations
*   **Web files:** `/var/www/html/` (This is where the default "Welcome to nginx" page lives).
*   **Configuration files:** `/etc/nginx/` (The main configuration file is `nginx.conf`).
*   **Server Blocks (Virtual Hosts):** Create configurations for specific websites in `/etc/nginx/sites-available/` and activate them by creating a symlink in `/etc/nginx/sites-enabled/`.
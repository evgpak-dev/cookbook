### 1. Create a Password File

**1. Install the utility:**
*   **Ubuntu / Debian:** `sudo apt install apache2-utils`

**2. Generate the credentials:**

```bash
sudo htpasswd -c /etc/nginx/.htpasswd <your_username>
```

*   The `-c` flag tells the system to **create** a new file. 
*   *Note: If you want to add a **second** user later, do not use the `-c` flag, or it will overwrite your existing file. Just use:* `sudo htpasswd /etc/nginx/.htpasswd <second_user>`

### 2. Configure NGINX

**To protect a specific location:**
Add the `auth_basic` and `auth_basic_user_file` directives inside a `location` block.

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location /admin {
        auth_basic "Restricted Access";
        auth_basic_user_file /etc/nginx/.htpasswd;
    }
}
```

*   `auth_basic "Restricted Access";`: Turns on basic authentication. The text in the quotes is the "realm" (the message sometimes displayed in the browser's login prompt). To disable authentication, you can set this to `auth_basic off;`.
*   `auth_basic_user_file /etc/nginx/.htpasswd;`: Tells NGINX exactly where to look for the usernames and passwords.

### Step 3: Test and Reload NGINX
Test the configuration to ensure there are no syntax errors.

```bash
sudo nginx -t
```

```bash
sudo systemctl reload nginx
```

### Bonus: Combining IP Whitelisting with Authentication
Sometimes you might want to allow users from your office IP address to bypass the password prompt, but require a password for everyone else. You can combine IP restriction with basic auth using the `satisfy any;` directive:

```nginx
location /admin {
    satisfy any;
    
    # Allow office IP
    allow 192.168.1.50;
    # Deny everyone else (they will fallback to the password prompt)
    deny all; 
    
    # The password prompt
    auth_basic "Restricted Access";
    auth_basic_user_file /etc/nginx/.htpasswd;
}
```
Now, if you visit the page from `192.168.1.50`, you go straight in. If you visit from anywhere else, you will be prompted for a username and password.
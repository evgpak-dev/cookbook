>**Front Controller (Единая точка входа)**<br>
>Перенаправляет все входящие запросы на один PHP-файл (public/index.php), если только запрошенный файл не существует на диске физически (например, картинки, CSS или JS)

**Apache**

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^(.*)$ public/index.php [L]
```

**Nginx**
```nginx
server {
    listen 80;
    server_name example.com;

    root /var/www/my-project/public;
    index index.php index.html;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include fastcgi_params;
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }
}
```
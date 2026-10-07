# Install PHP on Windows

### 1: Download PHP

Go to the PHP for Windows download page https://www.php.net/downloads.php. Choose the latest stable version (e.g., `VS17 x64 Thread Safe PHP 8.3`).

### 2: Extract the Files

* Create a new folder in the root of `C:` drive called php. (e.g., `C:\php`).
* Extract the contents of the ZIP file you downloaded into this `C:\php` folder.

### 3: Configure the php.ini File

* In the `C:\php` folder, find two files: `php.ini-development` and `php.ini-production`.

* Copy `php.ini-development` and rename the copy to `php.ini`.

* Search for the following lines and remove the semicolon:
  
  ```ini
  ;extension=curl
  ;extension=gd
  ;extension=mbstring
  ;extension=mysqli
  ;extension=openssl
  ;extension=pdo_mysql
  ;extension=pdo_sqlite
  ...
  ;extension_dir="ext"
  ```

### 4: Add PHP to the Windows PATH

* In the System Properties window, click the "Environment Variables..." button.
* In the System variables section (the bottom half), find and select the Path variable, then click "Edit...".
* Click "New" and add the path to the PHP folder: `C:\php`.

### 5: Verify the Installation
  
  ```bash
  php -v
  ```
  
  If everything is correct, you will see the PHP version information:
  
  ```
  PHP 8.3.x (cli) (built: ... ) (ZTS)
  Copyright (c) The PHP Group
  Zend Engine v..., Copyright (c) Zend Technologies
  ```

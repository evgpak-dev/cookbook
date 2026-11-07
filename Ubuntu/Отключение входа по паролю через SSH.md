# Отключение входа по паролю через SSH

1. Перед отключением убедиться, что публичный SSH-ключ скопирован на сервер и возможно входить по нему без ввода пароля.

2. Открыть конфигурационный файл SSH:
```bash
sudo nano /etc/ssh/sshd_config
```

3. Изменить/прописать следующие параметры:
```text
PasswordAuthentication no
KbdInteractiveAuthentication no
ChallengeResponseAuthentication no
UsePAM no
```

4. Отключить переопределение от Cloud-Init
    * 4.1. Посмотреть, какие файлы есть в этой директории:
    ```bash
    ls -la /etc/ssh/sshd_config.d/
    ```
    4.2. Если там есть файлы типа `50-cloud-init.conf` или `60-cloudimg-settings.conf`, открыть его:
    ```bash
    sudo nano /etc/ssh/sshd_config.d/50-cloud-init.conf
    ```
    4.3. Изменить строку `PasswordAuthentication no`

4. Перезапустить службу SSH:
```bash
sudo systemctl restart ssh
```

<br>

Проверить сделанные изменения:
```bash
ssh -o PubkeyAuthentication=no имя_пользователя@IP_сервера
```
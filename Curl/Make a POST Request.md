### 1. Sending JSON Data

```bash
curl -X POST https://jsonplaceholder.typicode.com/posts \
  -H "Content-Type: application/json" \
  -d '{"title": "Alice", "body": "alice@example.com", "userId": 1}'
```

---

### 2. Sending JSON from a File

```bash
curl -X POST https://jsonplaceholder.typicode.com/posts \
  -H "Content-Type: application/json" \
  -d @payload.json
```

---

### 3. Sending Form Data (`application/x-www-form-urlencoded`)

```bash
curl -X POST https://example.com/login \
  -d "username=john_doe" \
  -d "password=secret123"
```
*(Or combine them into a single string: `-d "username=john_doe&password=secret123"`)*

---

### 4. Uploading Files (`multipart/form-data`)
To upload a file (like an image or document), use the `-F` flag. Prefix the local file path with `@`:

```bash
curl -X POST https://api.example.com/upload \
  -F "avatar=@/path/to/photo.jpg" \
  -F "user_id=42"
```

---

### 5. Making an Authenticated Request (Bearer Token / API Key)
Add an `Authorization` header using `-H`:

```bash
curl -X POST https://api.example.com/items \
  -H "Authorization: Bearer your_api_token_here" \
  -H "Content-Type: application/json" \
  -d '{"title": "New Item"}'
```

---

### Useful Flags for Debugging

| Flag | What it does | Example |
| :--- | :--- | :--- |
| **`-i`** | Shows HTTP response headers (status code, content type, etc.) alongside the response body. | `curl -i -X POST ...` |

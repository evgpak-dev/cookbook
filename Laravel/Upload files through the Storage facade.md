### 1. Create the HTML Form (Blade)

```html
<form action="{{ route('avatar.store') }}" method="POST" enctype="multipart/form-data">
    @csrf

    <div>
        <label for="avatar">Choose an image:</label>
        <input type="file" name="avatar" id="avatar" required>
        
        @error('avatar')
            <div style="color: red;">{{ $message }}</div>
        @enderror
    </div>

    <button type="submit">Upload File</button>
</form>
```

---

### 2. Validate the Uploaded File

In the Controller:

```php
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\File;

public function store(Request $request)
{
    $request->validate([
        'avatar' => [
            'required',
            File::image()
                ->types(['jpg', 'jpeg', 'png', 'webp'])
                ->max(5 * 1024), // Max size in Kilobytes (5MB)
        ],
    ]);
}
```

---

### 3. Store the File


```php
// Get the UploadedFile instance
$file = $request->file('avatar');

// Laravel generate a unique hash name
$path = Storage::disk('public')->putFile('avatars', $file);

// Save path to database
$request->user()->update([
    'avatar_path' => $path,
]);
```

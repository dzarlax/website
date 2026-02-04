# Images Directory

All images are served directly from GitHub Pages CDN - fast, free, no external dependencies!

## 📸 Image Gallery

### Main Images

| File | Size | Dimensions | Format | Usage |
|------|------|------------|--------|-------|
| **avatar-circle.png** | 3.8MB | 1688x1688 | PNG | **Hero section** (main profile photo) |
| **ava.jpg** | 620KB | 1824x2336 | JPEG | Open Graph & Twitter Cards (social sharing) |
| **avatar-512x512.webp** | 17KB | 512x512 | WebP | Apple Touch Icon (iOS "Add to Home Screen") |
| **avatar-128x128.webp** | 2.3KB | 128x128 | WebP | **Favicon** (browser tab icon) |

## 🎯 Usage Details

### 1. avatar-circle.png (3.8MB)
**Where:** Hero section (intro)
**Used in:** `<img src="assets/images/avatar-circle.png" class="profile-image">`
**Purpose:** Large, high-quality circular profile photo
**Optimization needed:** ⚠️ YES - Can be compressed to ~200KB

### 2. ava.jpg (620KB)
**Where:** Open Graph meta tags, Twitter Card
**Used in:**
```html
<meta property="og:image" content="assets/images/ava.jpg">
<meta name="twitter:image" content="assets/images/ava.jpg">
```
**Purpose:** Social media sharing preview
**Optimization needed:** ⚠️ YES - Should be ~150KB

### 3. avatar-512x512.webp (17KB) ✅
**Where:** Apple Touch Icon
**Used in:** `<link rel="apple-touch-icon" sizes="512x512" href="...">`
**Purpose:** iOS home screen icon
**Status:** ✅ Perfect size!

### 4. avatar-128x128.webp (2.3KB) ✅
**Where:** Favicon
**Used in:** `<link rel="icon" sizes="128x128" href="...">`
**Purpose:** Browser tab icon
**Status:** ✅ Perfect size!

## ⚡ Optimization Needed

Two files are too large:

### avatar-circle.png (3.8MB → should be ~200KB)
```bash
# Using ImageMagick
convert avatar-circle.png -quality 85 avatar-circle-optimized.png
mv avatar-circle-optimized.png avatar-circle.png
```

### Or use https://squoosh.app:
- Drag `avatar-circle.png`
- Compress: 85% quality
- Download & replace

### ava.jpg (620KB → should be ~150KB)
```bash
# Using jpegoptim
jpegoptim --max=85 --strip-all ava.jpg
```

### Or use https://squoosh.app:
- Drag `ava.jpg`
- Compress: 85% quality
- Resize: max 1200px width (optional)
- Download & replace

## 🚀 Quick Optimize All

```bash
cd assets/images

# Optimize PNG (avatar-circle.png)
# Install: brew install pngquant
pngquant --quality=85 --ext=.png avatar-circle.png --force

# Optimize JPEG (ava.jpg)
# Install: brew install jpegoptim
jpegoptim --max=85 --strip-all ava.jpg

# Check results
ls -lh
```

Expected results:
- `avatar-circle.png`: 3.8MB → ~200KB (95% reduction!)
- `ava.jpg`: 620KB → ~150KB (76% reduction!)

## 📁 File Structure

```
assets/images/
├── avatar-circle.png          # Hero section (NEEDS OPTIMIZATION)
├── ava.jpg                     # Social sharing (NEEDS OPTIMIZATION)
├── avatar-512x512.webp         # Apple icon ✅
├── avatar-128x128.webp         # Favicon ✅
├── optimize.sh                 # Auto-optimization script
└── README.md                   # This file
```

## 🎨 Format Choices

- **PNG** for hero image: Quality transparency
- **JPEG** for social sharing: Best compatibility
- **WebP** for icons: Modern format, smallest size

## 🌐 CDN

All images served from GitHub Pages:
- ✅ Fast (Akamai CDN)
- ✅ Free
- ✅ Global edge locations
- ✅ HTTPS automatically
- ✅ No external dependencies

## 📝 Adding New Images

1. Place image in this directory
2. Reference as: `assets/images/your-image.jpg`
3. Optimize before committing (keep < 200KB)
4. Use WebP for icons/graphics
5. Use JPEG for photos
6. Use PNG only for transparency

## 🔍 Test Your Images

```bash
# Start local server
cd /Users/dzarlax/Projects/website
python3 -m http.server 8000

# Open in browser
open http://localhost:8000

# Check Network tab (F12) for load times
```

Expected load times:
- WebP icons: < 100ms
- Optimized images: < 500ms
- Current (unoptimized): 1-2s (needs fixing!)

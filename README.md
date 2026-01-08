# Space Welding & Fabrication Website

Professional single-page website for Space Welding and Fabrication - Mobile welding services in Darwin & Rural areas.

## 🚀 Features

- **Space-Themed Design**: Dark charcoal background with neon green accents and animated star field
- **Fully Responsive**: Mobile-first design that works on all devices
- **Smooth Animations**: Fade-in effects, smooth scrolling, and interactive hover states
- **Mobile Menu**: Hamburger navigation for mobile devices
- **Contact Form**: Built-in validation for customer inquiries
- **SEO Optimized**: Meta tags and semantic HTML for better search visibility
- **Fast Loading**: Vanilla HTML/CSS/JS with no heavy frameworks

## 📁 Project Structure

```
SpaceWelding/
│
├── index.html          # Main HTML file with all sections
├── styles.css          # Complete stylesheet with space theme
├── script.js           # JavaScript for interactivity
└── README.md           # This file
```

## 🛠️ Setup in VS Code

1. **Open the project**:
   - Open VS Code
   - File → Open Folder → Select the `SpaceWelding` folder

2. **Install Live Server Extension** (optional but recommended):
   - Go to Extensions (Ctrl+Shift+X)
   - Search for "Live Server" by Ritwick Dey
   - Click Install

3. **Preview the website locally**:
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - The site will open at `http://localhost:5500` (or similar)

## 🎨 Customization Guide

### Replace Placeholder Images

All placeholder images have clear HTML comments. Search for these in `index.html`:

```html
<!-- REPLACE WITH REAL LOGO IMAGE -->
<!-- REPLACE WITH REAL PHOTO OF ENDRI AT WORK -->
<!-- REPLACE WITH REAL PHOTO OF [description] -->
```

**To replace images**:
1. Add your images to a new `images/` folder
2. Update the `src` attributes in HTML:
   ```html
   <img src="images/your-photo.jpg" alt="Description">
   ```

### Add Your Logo

In `index.html`, find line 34:
```html
<img src="https://via.placeholder.com/200x60/1a1a1a/00ff88?text=SPACE+WELDING" alt="Space Welding and Fabrication Logo" class="logo-img">
```

Replace with:
```html
<img src="images/your-logo.png" alt="Space Welding and Fabrication Logo" class="logo-img">
```

### Customize Colors

In `styles.css`, find the CSS variables section (top of file) and modify:

```css
:root {
    --color-space-black: #0a0a0a;      /* Main background */
    --color-charcoal: #1a1a1a;          /* Secondary background */
    --color-neon-green: #00ff88;        /* Primary accent color */
    --color-green-glow: #00d4aa;        /* Secondary accent */
    /* Modify these to change the entire color scheme */
}
```

### Update Contact Information

In `index.html`, search for:
- Phone number: `+61 484 028 369`
- Business name: `Space Welding and Fabrication`
- Location: `Darwin & Rural Areas`

Replace with your actual information.

### Modify Services

In `index.html`, find the Services section (around line 110) and edit the service cards to match your offerings.

## 🚀 Deploy to GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon → "New repository"
3. Repository name: `space-welding` (or your preferred name)
4. Make it **Public**
5. **DO NOT** initialize with README (we already have files)
6. Click "Create repository"

### Step 2: Upload Your Files

**Option A: Using Git (Recommended)**

1. Open VS Code Terminal (Ctrl+` or View → Terminal)
2. Run these commands:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit your files
git commit -m "Initial commit: Space Welding website"

# Add your GitHub repository as remote (replace with your URL)
git remote add origin https://github.com/YOUR-USERNAME/space-welding.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Option B: Using GitHub Desktop**

1. Download and install [GitHub Desktop](https://desktop.github.com/)
2. File → Add Local Repository → Select the SpaceWelding folder
3. Commit changes with message "Initial commit"
4. Click "Publish repository" to push to GitHub

**Option C: Manual Upload**

1. Go to your new GitHub repository
2. Click "uploading an existing file"
3. Drag and drop all three files (index.html, styles.css, script.js)
4. Click "Commit changes"

### Step 3: Enable GitHub Pages

1. In your GitHub repository, go to **Settings**
2. Scroll down to **Pages** section (left sidebar)
3. Under "Source", select:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**
5. Wait 1-2 minutes for deployment

### Step 4: Access Your Live Website

Your site will be live at:
```
https://YOUR-USERNAME.github.io/space-welding/
```

GitHub will show you the exact URL in the Pages settings.

## 📧 Contact Form Integration

The contact form currently shows a success message but doesn't send emails. To make it functional, you have several options:

### Option 1: Formspree (Easiest)

1. Go to [Formspree.io](https://formspree.io)
2. Create a free account
3. Create a new form and get your endpoint URL
4. Update `script.js` around line 133:

```javascript
fetch('https://formspree.io/f/YOUR-FORM-ID', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(result => resolve(result))
.catch(error => reject(error));
```

### Option 2: Netlify Forms

If you deploy to Netlify instead of GitHub Pages:
1. Add `netlify` attribute to form tag
2. Netlify will handle form submissions automatically

### Option 3: EmailJS

Similar to Formspree but with different features. See [EmailJS.com](https://www.emailjs.com/)

## 🔧 Maintenance & Updates

### Updating Content

1. Edit files in VS Code
2. Save changes
3. Push to GitHub:
   ```bash
   git add .
   git commit -m "Updated content"
   git push
   ```
4. Changes will appear on your live site in 1-2 minutes

### Adding New Pages

To add additional pages (e.g., `about.html`, `services.html`):
1. Create new HTML files in the root folder
2. Copy the header/footer from `index.html` for consistency
3. Update navigation links in all files

## 🎯 Performance Tips

1. **Optimize Images**:
   - Use JPG for photos (compress to 80-90% quality)
   - Use PNG for logos with transparency
   - Resize images to actual display size
   - Recommended: [TinyPNG.com](https://tinypng.com/) for compression

2. **Add Favicon**:
   - Create a 32x32px icon: `favicon.ico`
   - Add to `<head>` in HTML:
     ```html
     <link rel="icon" type="image/x-icon" href="favicon.ico">
     ```

3. **Test Mobile Responsiveness**:
   - Use Chrome DevTools (F12) → Device Toolbar
   - Test on actual mobile devices

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

**Images not loading?**
- Check file paths are correct
- Ensure images are in the correct folder
- Check image file extensions match

**Styles not applying?**
- Clear browser cache (Ctrl+Shift+R)
- Check `styles.css` is in the same folder as `index.html`

**Mobile menu not working?**
- Ensure `script.js` is loaded
- Check browser console for JavaScript errors (F12)

**GitHub Pages not updating?**
- Wait 2-5 minutes after pushing changes
- Check GitHub Actions tab for build status
- Try hard refresh: Ctrl+Shift+R

## 📞 Support

For website issues or questions:
- Check GitHub Pages documentation: [pages.github.com](https://pages.github.com)
- VS Code help: Press F1 → search for help topics

## 📄 License

This website is created for Space Welding and Fabrication. All content and images are property of the business owner.

---

**Built with ❤️ for Space Welding & Fabrication**

*Ready to launch your web presence into orbit! 🚀*

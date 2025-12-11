# Instagram Feed Setup Guide - FREE METHOD

## How to Add Instagram Posts to Your Website (100% Free!)

Your website now has a grid layout ready for Instagram posts. Follow these simple steps to add your posts manually using Instagram's FREE native embed feature.

---

## Method: Instagram Native Embed (Recommended - 100% FREE!)

This method uses Instagram's built-in embed feature - completely free, no signups required!

### Step-by-Step Instructions:

#### 1. Open Instagram on Desktop Browser
- Go to **https://www.instagram.com/spacewelding/**
- Make sure you're logged in

#### 2. Select a Post to Embed
- Click on one of your recent posts to open it

#### 3. Get the Embed Code
- Click the **"..."** (three dots) button in the top right corner
- Select **"Embed"** from the menu
- A popup will appear with embed code
- **IMPORTANT**: Check the box for **"Include caption"** if you want captions
- Click **"Copy Embed Code"**

#### 4. Paste into Your Website
- Open `index.html` in your code editor
- Find line 252 (or search for "instagram-post-embed")
- Look for this section:
  ```html
  <div class="instagram-post-embed">
      <a href="https://www.instagram.com/spacewelding/" target="_blank">
          <div class="instagram-post-placeholder">
              <i class="fab fa-instagram"></i>
              <p>Post 1</p>
          </div>
      </a>
  </div>
  ```
- **DELETE** everything between the `<div class="instagram-post-embed">` tags
- **PASTE** your Instagram embed code inside the div:
  ```html
  <div class="instagram-post-embed">
      <!-- Instagram embed code goes here -->
      <blockquote class="instagram-media">...</blockquote>
  </div>
  ```

#### 5. Repeat for 6 Posts
- Go back to your Instagram profile
- Repeat steps 2-4 for your next 5 most recent posts
- You'll end up with 6 embedded posts in a nice grid

#### 6. Load Instagram's JavaScript
The Instagram embed codes include a script tag. The first embed will load it, and subsequent embeds will use the same script automatically.

---

## Quick Example

Your code should look like this after adding one post:

```html
<div class="instagram-post-embed">
    <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/ABC123/">
        <div style="padding:16px;">
            <a href="https://www.instagram.com/p/ABC123/" style="background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank">
                <!-- Instagram post content -->
            </a>
        </div>
    </blockquote>
    <script async src="//www.instagram.com/embed.js"></script>
</div>
```

---

## Benefits of This Method

✅ **100% Free** - No paid services required
✅ **Official Instagram** - Uses Instagram's native embed
✅ **No Account Needed** - No third-party signups
✅ **Shows Full Posts** - Includes images, captions, likes
✅ **Responsive** - Works on mobile and desktop
✅ **Easy Updates** - Just replace embed codes when you want to update

---

## Downsides

⚠️ **Manual Updates** - You need to manually update posts (takes 5 minutes)
⚠️ **6 Posts Only** - Grid shows 6 posts (but that's usually enough)

---

## Alternative: Keep the Placeholder

If you prefer not to manually embed posts, the current placeholder with the "View More on Instagram" button works great too! It directs visitors straight to your Instagram profile.

---

## Tips

- Update your website posts monthly with your latest Instagram content
- Choose your best 6 posts that show variety in your work
- Make sure posts are public (not private)
- Test on mobile after embedding to ensure proper display

---

## Need Help?

If you run into any issues, just let me know!

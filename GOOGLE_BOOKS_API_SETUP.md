# Google Books API Setup Guide

## Getting Your API Key

The Personal Library Manager uses the **Google Books API** for the public search feature. Follow these steps to get your free API key:

### Step 1: Go to Google Cloud Console
1. Visit [Google Cloud Console](https://console.cloud.google.com)
2. Sign in with your Google account (create one if needed)

### Step 2: Create a New Project
1. Click the project dropdown at the top
2. Click "NEW PROJECT"
3. Enter project name: "Personal Library Manager"
4. Click "CREATE"
5. Wait for the project to be created, then select it

### Step 3: Enable Google Books API
1. In the left sidebar, click "APIs & Services" → "Library"
2. Search for "Google Books API"
3. Click on "Google Books API"
4. Click "ENABLE"

### Step 4: Create API Key
1. Go to "APIs & Services" → "Credentials"
2. Click "CREATE CREDENTIALS" → "API Key"
3. Copy the generated API key
4. **Keep this key private!** Do not commit it to version control

### Step 5: Configure Your App

#### For Development:
1. Navigate to `client/` directory
2. Create a `.env.local` file (Git will ignore this)
3. Add your API key:
   ```
   REACT_APP_GOOGLE_BOOKS_API_KEY=your_api_key_here
   REACT_APP_API_URL=http://localhost:5000/api
   ```
4. Restart your React development server: `npm start`

#### For Production:
Set environment variables in your hosting platform:
- **Vercel**: Project Settings → Environment Variables
- **Other Platforms**: Follow their documentation for environment variables

### Step 6: Test the API
1. Start your React app: `npm start`
2. Try searching for "JavaScript" in the search box
3. You should see books from Google Books API

## Troubleshooting

### Error: "API key is not configured"
- **Cause**: Environment variable not set
- **Fix**: Check that `REACT_APP_GOOGLE_BOOKS_API_KEY` is in your `.env.local` file and restart the development server

### Error: "API key invalid"
- **Cause**: Invalid or expired API key
- **Fix**: Regenerate the API key in Google Cloud Console

### Error: "Google Books API not enabled"
- **Cause**: API not enabled in your project
- **Fix**: Follow Step 3 above to enable it

### No search results
- **Cause**: Network error or API quota exceeded
- **Fix**: Check browser console (F12) for error messages. Google allows free API calls up to 1000 per day.

## API Key Security

⚠️ **IMPORTANT SECURITY NOTES:**

1. **Never commit your API key** to version control
2. **Use `.env.local`** which is in `.gitignore` by default
3. **In production**, use environment variables from your hosting platform
4. **Optional**: Set API key restrictions in Google Cloud Console:
   - Application restrictions: HTTP referrers
   - API restrictions: Google Books API only

## Free Tier Limits

Google Books API free tier includes:
- ✅ 1,000 queries per day
- ✅ Up to 10 results per query
- ✅ No credit card required
- ✅ Suitable for development and small-scale apps

For higher limits, upgrade to a paid plan in Google Cloud Console.

## Additional Resources

- [Google Books API Documentation](https://developers.google.com/books)
- [Google Cloud Console](https://console.cloud.google.com)
- [API Reference](https://developers.google.com/books/docs/v1/using)

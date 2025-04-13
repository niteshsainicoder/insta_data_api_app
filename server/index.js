// server/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "https://insta-data-api-app.vercel.app", // only allow this origin
    methods: ["GET", "POST"],
    credentials: true,
  })
);


// Step 1: Redirect to Instagram Login
app.get('/auth/login', (req, res) => {
  const authUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${FB_APP_ID}&redirect_uri=${REDIRECT_URI}&scope=instagram_basic,instagram_manage_comments,pages_show_list,pages_read_engagement`;
  res.redirect(authUrl);
});

// Step 2: Callback - Exchange Code for Access Token
app.get('/auth/callback', async (req, res) => {
  const { code } = req.query;

  try {
    const tokenRes = await axios.post('https://api.instagram.com/oauth/access_token', null, {
      params: {
        client_id: '1602024230487198',
        client_secret: '6d07d0dc2ac30f959c47b815d75af6b6',
        grant_type: 'authorization_code',
        redirect_uri: 'https://insta-data-api-app.vercel.app/',
        code: code,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    alert(tokenRes.data)
    console.log(tokenRes.data); 
    const accessToken = tokenRes.data.access_token;

    // Redirect to frontend with access token in query (or send JSON if you prefer)
    res.redirect(`http://localhost:5173/dashboard?token=${accessToken}`);
  } catch (err) {
    console.error('Token exchange failed:', err.response?.data || err.message);
    res.status(500).send('OAuth flow failed');
  }

// Contains access_token, user_id
  
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});

import { useEffect } from "react";
import axios from "axios"
const App = () => {

  const handleInstagramLogin = () => {
    const redirectUri = `
 https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=1602024230487198&redirect_uri=https://insta-data-api-app.vercel.app/&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights`; // Ensure this matches the redirect URI set in the App DashboardF
    window.location.href = redirectUri;
  };
  
      const queryParams = new URLSearchParams(window.location.search);
      const code = queryParams.get("code");
      const token = queryParams.get("token");

  useEffect(() => {    
    if (code) {
      axios.get(`https://insta-data-api-app.onrender.com/auth/callback?code=${code}`)
      .then(res => {
        console.log('Token response:', res.data);
      })
      .catch(err => {
        console.error('Error:', err);
      });
    }
  }, [code])

  useEffect(()=>{
    
  },[token])
  return <div>
    <button onClick={handleInstagramLogin} className="bg-white text-black">login with Insta</button>
  </div>
}
export default App
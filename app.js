document.addEventListener("DOMContentLoaded", function () {
  const clientId = "317566814494-8vblc8906hpms4pkk10q834fju1a6fd5.apps.googleusercontent.com";
  const redirectUri = "https://hwebhub.github.io/ChatO-MG/oauth2/callback";
  const scope = "https://www.googleapis.com/auth/calendar.readonly";
  const responseType = "token";

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=${responseType}&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&include_granted_scopes=true&prompt=consent`;

  const btn = document.getElementById("authorize_button");
  if (btn) {
    btn.addEventListener("click", () => {
      window.location.href = authUrl;
    });
  } else {
    console.error("No se encontró el botón con id 'authorize_button'");
  }
});

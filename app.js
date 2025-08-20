document.addEventListener("DOMContentLoaded", async function () {
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
  }

  // 🚀 Si ya tenemos un token, vamos directo a leer calendario
  const token = localStorage.getItem('access_token');
  if (token) {
    try {
      const response = await fetch(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=5&orderBy=startTime&singleEvents=true&timeMin=' + new Date().toISOString(),
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.json();

      const div = document.createElement("div");
      div.innerHTML = "<h2>📅 Próximos eventos:</h2>";

      if (data.items && data.items.length > 0) {
        const ul = document.createElement("ul");
        data.items.forEach(event => {
          const li = document.createElement("li");
          const start = event.start.dateTime || event.start.date;
          li.innerText = `${start} → ${event.summary}`;
          ul.appendChild(li);
        });
        div.appendChild(ul);
      } else {
        div.innerHTML += "<p>No hay eventos próximos 🎉</p>";
      }

      document.body.appendChild(div);
    } catch (e) {
      console.error("Error al leer calendario:", e);
    }
  }
});

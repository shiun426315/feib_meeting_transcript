  const LIFF_ID = "你的_LIFF_ID";
const N8N_WEBHOOK_URL = "https://你的-n8n-網域/webhook/meeting-form-submit";

async function initApp() {
  await liff.init({ liffId: LIFF_ID });

  if (!liff.isLoggedIn()) {
    liff.login();
    return;
  }

  const profile = await liff.getProfile();
  document.getElementById("displayName").textContent = profile.displayName;
  document.getElementById("userId").textContent = profile.userId;
}

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const profile = await liff.getProfile();
  const meetingTitle = document.getElementById("meetingTitle").value;

  await fetch(N8N_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      lineUserId: profile.userId,
      displayName: profile.displayName,
      meetingTitle
    })
  });

  alert("送出成功");
});

initApp();

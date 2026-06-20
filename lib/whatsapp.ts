const WHATSAPP_API_VERSION = "v21.0";

// Helper to access environment variables safely on both Node.js (local dev) and Cloudflare Workers (runtime)
function getEnvValue(key: string): string | undefined {
  if (process.env[key]) {
    return process.env[key];
  }
  if (typeof window === "undefined") {
    try {
      const moduleName = "@opennextjs/cloudflare";
      const { getCloudflareContext } = require(moduleName);
      const cfEnv = getCloudflareContext().env;
      if (cfEnv && cfEnv[key]) {
        return cfEnv[key] as string;
      }
    } catch (e) {
      // ignore
    }
  }
  return undefined;
}

function getConfig() {
  const phoneNumberId = getEnvValue("WHATSAPP_PHONE_NUMBER_ID");
  const accessToken = getEnvValue("WHATSAPP_ACCESS_TOKEN");
  return { phoneNumberId, accessToken };
}

export function isWhatsAppConfigured() {
  const { phoneNumberId, accessToken } = getConfig();
  return !!(phoneNumberId && accessToken);
}

export async function sendWhatsAppImage(
  to: string,
  imageUrl: string,
  caption: string
) {
  const { phoneNumberId, accessToken } = getConfig();
  if (!phoneNumberId || !accessToken) {
    console.warn("WhatsApp not configured. QR not sent for", to);
    return;
  }

  const url = `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${phoneNumberId}/messages`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: to.startsWith("+") ? to : `+${to}`,
      type: "image",
      image: {
        link: imageUrl,
        caption
      }
    })
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("WhatsApp API error:", errorBody);
    throw new Error(`WhatsApp send failed: ${response.status}`);
  }

  return response.json();
}

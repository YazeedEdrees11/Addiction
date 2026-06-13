const WHATSAPP_API_VERSION = "v21.0";

function getConfig() {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
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

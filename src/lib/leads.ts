// HubSpot Forms API submission. Set VITE_HUBSPOT_PORTAL_ID and VITE_HUBSPOT_FORM_ID
// (see .env.example). Without them the form runs in demo mode and submits nowhere.

export type Lead = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  company: string;
  org_type: string;
  topic: string;
  message: string;
};

const PORTAL = import.meta.env.VITE_HUBSPOT_PORTAL_ID as string | undefined;
const FORM = import.meta.env.VITE_HUBSPOT_FORM_ID as string | undefined;

export const leadsConfigured = Boolean(PORTAL && FORM);

export async function submitLead(lead: Lead): Promise<void> {
  if (!PORTAL || !FORM) {
    console.info("[HCRM demo] Lead captured (HubSpot not configured):", lead);
    return;
  }
  const hutk = document.cookie.match(/hubspotutk=([^;]+)/)?.[1];
  const res = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL}/${FORM}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fields: Object.entries(lead).map(([name, value]) => ({ name, value })),
      context: { pageUri: location.href, pageName: document.title, ...(hutk ? { hutk } : {}) },
    }),
  });
  if (!res.ok) throw new Error(`HubSpot responded ${res.status}`);
}

export default async (req, context) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { fields } = await req.json();

  const AIRTABLE_API_KEY = Netlify.env.get("AIRTABLE_API_KEY");
  const AIRTABLE_BASE_ID = Netlify.env.get("AIRTABLE_BASE_ID");
  const TABLE = "Dinner Responses";

  const res = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(TABLE)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    }
  );

  const data = await res.json();
  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
};

export const config = { path: "/api/submit" };

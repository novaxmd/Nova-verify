import { supabaseAdmin } from "../lib/supabaseServer.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { query } = req.body;
  if (!query || query.trim() === "") {
    return res.status(400).json({ error: "Search query required" });
  }

  const searchTerm = `%${query.trim()}%`;

  try {
    const { data, error } = await supabaseAdmin
      .from("contacts")
      .select("id, name, phone")
      .or(`name.ilike.${searchTerm},phone.ilike.${searchTerm}`)
      .limit(50);

    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to search contacts" });
  }
}

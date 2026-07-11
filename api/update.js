import { supabaseAdmin } from "../lib/supabaseServer.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { id, name, phone } = req.body;
  if (!id) return res.status(400).json({ error: "Contact ID required" });

  const updateData = {};
  if (name !== undefined) updateData.name = name;
  if (phone !== undefined) updateData.phone = phone;

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ error: "Nothing to update" });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("contacts")
      .update(updateData)
      .eq("id", id)
      .select();

    if (error) throw error;
    res.json({ success: true, updated: data[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

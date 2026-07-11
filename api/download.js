import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {

  // 🔥 Ruhusu GET (download direct)
  if (req.method === "GET") {
    return generateVCF(res);
  }

  // 🔐 POST (ikiwa unatumia password)
  if (req.method === "POST") {
    const { password } = req.body;

    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    return generateVCF(res);
  }

  return res.status(405).json({ error: "Method not allowed" });
}


// 🔥 Function ya kutengeneza VCF
async function generateVCF(res) {
  const { data, error } = await supabase
    .from("contacts")
    .select("name, phone");

  if (error) {
    console.error("Supabase error:", error.message);
    return res.status(500).json({ error: "Failed to fetch contacts" });
  }

  if (!data || data.length === 0) {
    return res.status(404).json({ error: "No contacts found" });
  }

  let vcfContent = "";

  data.forEach((c) => {
    vcfContent += `BEGIN:VCARD\nVERSION:3.0\n`;
    vcfContent += `FN:${c.name || ""}\n`;
    vcfContent += `TEL:${c.phone || ""}\n`;
    vcfContent += `END:VCARD\n\n`;
  });

  res.setHeader("Content-Type", "text/vcard");
  res.setHeader("Content-Disposition", "attachment; filename=contacts.vcf");

  res.status(200).send(vcfContent);
                         }

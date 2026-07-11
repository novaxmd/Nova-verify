import { supabaseAdmin } from "../lib/supabaseServer.js";
import PDFDocument from "pdfkit";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed. Use GET." });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("contacts")
      .select("name, phone")
      .order("created_at", { ascending: false });

    if (error) throw error;
    if (!data || data.length === 0) {
      return res.status(404).json({ error: "No contacts found" });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=contacts.pdf");

    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(res);

    doc.fontSize(24).font("Helvetica-Bold").text("BMB VCF - Contacts List", { align: "center" });
    doc.moveDown();
    doc.fontSize(10).font("Helvetica").text(`Generated: ${new Date().toLocaleString()}`, { align: "right" });
    doc.moveDown(2);

    doc.fontSize(12).font("Helvetica-Bold").text("#", 50, doc.y, { continued: true })
      .text("Name", 100, doc.y, { continued: true })
      .text("Phone Number", 300, doc.y);
    doc.moveDown();
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();

    data.forEach((contact, index) => {
      doc.fontSize(11).font("Helvetica")
        .text(`${index + 1}`, 50, doc.y, { continued: true })
        .text(contact.name || "No name", 100, doc.y, { continued: true })
        .text(contact.phone || "No phone", 300, doc.y);
      doc.moveDown(0.8);
    });

    const pageCount = doc.bufferedPageRange().count;
    for (let i = 0; i < pageCount; i++) {
      doc.switchToPage(i);
      doc.fontSize(8).text(`Page ${i + 1} of ${pageCount}`, 0, doc.page.height - 30, { align: "center" });
    }

    doc.end();
  } catch (err) {
    console.error(err);
    if (!res.headersSent) res.status(500).json({ error: "Failed to generate PDF" });
    else res.end();
  }
                                                 }

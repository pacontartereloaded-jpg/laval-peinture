import { Resend } from 'resend'

const CONTACT_EMAIL = 'soumission@peinturelaval.ca'

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { name, email, phone, projectType, message } = req.body ?? {}

  if (!name?.trim() || !email?.trim()) {
    res.status(400).json({ error: 'Nom et courriel requis.' })
    return
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    res.status(500).json({ error: 'Email service not configured.' })
    return
  }

  const resend = new Resend(apiKey)

  const { error } = await resend.emails.send({
    from: 'Peinture Laval <noreply@peinturelaval.ca>',
    to: [CONTACT_EMAIL],
    replyTo: email.trim(),
    subject: `Nouvelle soumission — ${name.trim()}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px">
        <h2 style="margin:0 0 24px;font-size:22px;color:#0d1b3e">
          Nouvelle demande de soumission
        </h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#555;width:140px"><strong>Nom</strong></td><td style="padding:8px 0">${name.trim()}</td></tr>
          <tr><td style="padding:8px 0;color:#555"><strong>Courriel</strong></td><td style="padding:8px 0"><a href="mailto:${email.trim()}">${email.trim()}</a></td></tr>
          ${phone?.trim() ? `<tr><td style="padding:8px 0;color:#555"><strong>Téléphone</strong></td><td style="padding:8px 0">${phone.trim()}</td></tr>` : ''}
          ${projectType ? `<tr><td style="padding:8px 0;color:#555"><strong>Type de projet</strong></td><td style="padding:8px 0">${projectType}</td></tr>` : ''}
        </table>
        ${message?.trim() ? `
          <div style="margin-top:24px">
            <strong style="color:#555">Message</strong>
            <p style="margin:8px 0 0;white-space:pre-wrap;color:#222">${message.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
          </div>
        ` : ''}
        <hr style="margin:32px 0;border:none;border-top:1px solid #eee"/>
        <p style="font-size:12px;color:#999">Envoyé depuis peinturelaval.ca</p>
      </div>
    `,
  })

  if (error) {
    console.error('Resend error:', error)
    res.status(500).json({ error: 'Échec de l\'envoi. Veuillez appeler directement.' })
    return
  }

  res.status(200).json({ success: true })
}

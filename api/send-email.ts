import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  try {
    const { name, email, subject, message } = req.body

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Muhannad <mail@muhannadalsrahen.dev>',
      to: 'muhannadalsrahen@gmail.com',
      replyTo: email,
      subject: subject || `New message from ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a1a; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #f5c542 0%, #e6a020 100%); padding: 32px; text-align: center;">
            <h1 style="margin: 0; color: #000; font-size: 24px; font-weight: 700;">New Contact Form Submission</h1>
          </div>
          <div style="padding: 32px; color: #e0e0e0;">
            <div style="margin-bottom: 24px; padding: 20px; background: #252525; border-radius: 12px; border-left: 4px solid #f5c542;">
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 1px;">From</p>
              <p style="margin: 0; font-size: 18px; font-weight: 600; color: #fff;">${name}</p>
              <p style="margin: 4px 0 0 0; color: #f5c542;">${email}</p>
            </div>
            ${subject ? `
            <div style="margin-bottom: 24px; padding: 20px; background: #252525; border-radius: 12px;">
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 1px;">Subject</p>
              <p style="margin: 0; font-size: 16px; color: #fff;">${subject}</p>
            </div>
            ` : ''}
            <div style="padding: 20px; background: #252525; border-radius: 12px;">
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 1px;">Message</p>
              <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #fff; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <div style="padding: 24px; text-align: center; border-top: 1px solid #333;">
            <p style="margin: 0; font-size: 12px; color: #666;">Sent from your portfolio contact form</p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return res.status(500).json({ 
        error: 'Failed to send email',
        details: error?.message || 'Unknown error'
      })
    }

    console.log('Email sent successfully:', data?.id)
    return res.status(200).json({ 
      success: true, 
      messageId: data?.id,
      message: 'Email sent successfully! You should receive a confirmation soon.'
    })
  } catch (error) {
    console.error('Server error:', error)
    const errorMessage = error instanceof Error ? error.message : String(error)
    return res.status(500).json({ 
      error: 'Internal server error',
      details: errorMessage
    })
  }
}

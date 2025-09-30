/**
 * @typedef {import('next').NextApiRequest} NextApiRequest
 * @typedef {import('next').NextApiResponse} NextApiResponse
 * @typedef {Object} RequestBody
 * @property {string} name
 * @property {string} email
 * @property {string} [service]
 * @property {string} message
 * @property {string} [fileName]
 * @property {string} [fileContent]
 */

import nodemailer from 'nodemailer';

/**
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, service, message, fileName, fileContent } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' });
  }

  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    secure: false, // true for 465, false for other ports
    tls: {
      rejectUnauthorized: false // Only for development, remove in production
    }
  });

  try {
    const info = await transporter.sendMail({
        from: `"${name}" <${process.env.EMAIL_USER}>`, // Use your Gmail address here
        to: 'zolile.nonzaba@gmail.com',
      subject: `New Contact Form Submission: ${service || 'No service selected'}`,
      text: `
        Name: ${name}
        Email: ${email}
        Service: ${service || 'Not specified'}
        
        Message:
        ${message}
      `,
      html: `
        <div>
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Service:</strong> ${service || 'Not specified'}</p>
          <h3>Message:</h3>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>
      `,
      attachments: fileContent ? [{
        filename: fileName,
        content: Buffer.from(fileContent.split(',')[1], 'base64'),
      }] : [],
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    return res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully',
      previewUrl: nodemailer.getTestMessageUrl(info)
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to send message',
      error: error.message 
    });
  }
}

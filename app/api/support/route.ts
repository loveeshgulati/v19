import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.description || !body.category || !body.priority) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Log the support request to console for development
    console.log('=== NEW SUPPORT REQUEST ===')
    console.log('Name:', body.name)
    console.log('Email:', body.email)
    console.log('Subject:', body.subject)
    console.log('Category:', body.category)
    console.log('Priority:', body.priority)
    console.log('Submitted:', new Date().toLocaleString())
    console.log('Description:', body.description)
    console.log('==========================')

    // Try to send email if email credentials are configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransporter({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        })

        // Format the email content
        const emailContent = `
          <h2>New Support Request - SplyBob</h2>
          <p><strong>Support Request Details:</strong></p>
          <hr/>
          
          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Subject:</strong> ${body.subject}</p>
          <p><strong>Category:</strong> ${body.category}</p>
          <p><strong>Priority:</strong> ${body.priority}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          
          <h3>Description:</h3>
          <p>${body.description.replace(/\n/g, '<br/>')}</p>
          
          <hr/>
          <p><em>This email was sent automatically from the SplyBob Support System.</em></p>
        `

        // Send email to support team
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: 'loveesh1gulati@gmail.com',
          subject: `[SplyBob Support] ${body.priority.toUpperCase()} - ${body.subject}`,
          html: emailContent,
          replyTo: body.email,
        }

        await transporter.sendMail(mailOptions)
        console.log('Email sent successfully to support team')

        // Send confirmation email to user
        const confirmationContent = `
          <h2>Support Request Received - SplyBob</h2>
          <p>Dear ${body.name},</p>
          
          <p>Thank you for contacting SplyBob support. We have received your support request and will get back to you within 24 hours.</p>
          
          <p><strong>Your Request Details:</strong></p>
          <p><strong>Subject:</strong> ${body.subject}</p>
          <p><strong>Category:</strong> ${body.category}</p>
          <p><strong>Priority:</strong> ${body.priority}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          
          <p>If you have any urgent issues, please don't hesitate to reach out directly at loveesh1gulati@gmail.com.</p>
          
          <p>Best regards,<br/>
          SplyBob Support Team</p>
        `

        const confirmationOptions = {
          from: process.env.EMAIL_USER,
          to: body.email,
          subject: `[SplyBob] Support Request Confirmation - ${body.subject}`,
          html: confirmationContent,
        }

        await transporter.sendMail(confirmationOptions)
        console.log('Confirmation email sent to user')

      } catch (emailError) {
        console.error('Email sending failed:', emailError)
        // Continue without failing - request is still logged
      }
    } else {
      console.log('Email credentials not configured - support request logged only')
    }

    return NextResponse.json({ 
      message: "Support request submitted successfully",
      success: true,
      note: "Your request has been received and will be processed by our support team."
    }, { status: 200 })

  } catch (error) {
    console.error("Error processing support request:", error)
    return NextResponse.json({ 
      error: "Failed to submit support request",
      message: "Please try again later or contact support directly at loveesh1gulati@gmail.com"
    }, { status: 500 })
  }
}

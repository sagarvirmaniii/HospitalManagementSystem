const express = require("express");
const nodemailer = require("nodemailer");

const contactRouter = express.Router();

// Contact form submission
contactRouter.post("/send", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields"
      });
    }

    // Create transporter (using Gmail as example)
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
      }
    });

    // Email options
    const mailOptions = {
      from: email,
      to: process.env.ADMIN_EMAIL || 'admin@doctorappointment.com',
      subject: `Contact Form Message from ${name}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    // For now, just simulate success without actually sending email
    // Remove this and uncomment below lines when you have email configured
    console.log('Contact form submission:', { name, email, message });
    
    res.status(200).json({
      success: true,
      message: "Message sent successfully!"
    });

    // Uncomment these lines when you have email configured:
    // await transporter.sendMail(mailOptions);
    // res.status(200).json({
    //   success: true,
    //   message: "Message sent successfully!"
    // });

  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again."
    });
  }
});

module.exports = contactRouter;
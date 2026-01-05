/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const data = Object.fromEntries(formData);

    const {
      name,
      email,
      phone = "",
      city = "",
      company = "",
      website = "",
      message,
    } = data as any;

    // 1️⃣ USE YOUR ETHEREAL CREDENTIALS
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // Ethereal uses STARTTLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 2️⃣ SEND EMAIL
    const info = await transporter.sendMail({
      from: `"JKumar Website" <krystal72@ethereal.email>`,
      to: "krystal72@ethereal.email", // send to your test inbox
      subject: "New Contact Form Message",
      html: `
        <h2>Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Website:</strong> ${website}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return Response.json({
      message: "Email sent successfully!",
      previewUrl: nodemailer.getTestMessageUrl(info),
      info,
    });
  } catch (error: any) {
    console.error(error);

    return Response.json(
      { message: "Failed to send email", error: error.message },
      { status: 500 }
    );
  }
}

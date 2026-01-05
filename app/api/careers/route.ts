/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const city = formData.get("city") as string;
    const position = formData.get("position") as string;
    const company = formData.get("company") as string;
    const website = formData.get("website") as string;
    const about = formData.get("about") as string;

    const resume = formData.get("resume") as File;

    if (!resume) {
      return Response.json({ message: "Resume is required" }, { status: 400 });
    }

    // Convert file to buffer
    const resumeBuffer = Buffer.from(await resume.arrayBuffer());

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"JKumar Careers" <${process.env.SMTP_USER}>`,
      to: process.env.HR_EMAIL,
      subject: `New Career Application - ${name}`,
      html: `
        <h2>Career Application</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>City:</strong> ${city || "N/A"}</p>
        <p><strong>Position:</strong> ${position}</p>
        <p><strong>Company:</strong> ${company || "N/A"}</p>
        <p><strong>Website:</strong> ${website || "N/A"}</p>
        <br/>
        <p><strong>About:</strong></p>
        <p>${about}</p>
      `,
      attachments: [
        {
          filename: resume.name,
          content: resumeBuffer,
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);

    return Response.json({
      success: true,
      message: "Application submitted successfully!",
      previewUrl: nodemailer.getTestMessageUrl(info),
    });
  } catch (error: any) {
    console.error("SMTP Error:", error.message);
    return Response.json(
      { message: "Failed to submit application", error: error.message },
      { status: 500 }
    );
  }
}

// import nodemailer from "nodemailer";

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ success: false, message: "Method Not Allowed" });
//   }

//   try {
//     const { name, email } = req.body;

//     if (!email) {
//       return res.status(400).json({ success: false, message: "Email is required" });
//     }

//     // ✅ Configure SMTP transporter
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.MAIL_USER,     // Gmail
//         pass: process.env.MAIL_PASS,     // App password
//       },
//     });

//     // ✅ Send email to subscriber
//     // await transporter.sendMail({
//     //   from: `"Sunrise Marketing Solutions" <${process.env.MAIL_USER}>`,
//     //   to: email,
//     //   subject: "Welcome to Sunrise Marketing Solutions",
//     //   html: `
//     //     <h2>Hello ${name || "Subscriber"},</h2>
//     //     <p>Thanks for subscribing!</p>
//     //     <p>We will send you project updates, investment opportunities and offers.</p>
//     //     <br>
//     //     Regards,<br>
//     //     <strong>Sunrise Marketing Solutions</strong>
//     //   `,
//     // });


//     await transporter.sendMail({
//   from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
//   to: email,
//   subject: "Welcome to Sunrise Marketing Solutions",
//   html: `
//       <h2>Hello ${name},</h2>
//       <p>Thank you for subscribing!</p>
//       <p>We will send you project updates and property listings soon.</p>
//       <br><b>Sunrise Marketing Solutions</b>
//   `,
// });


//     return res.status(200).json({ success: true, message: "Email sent successfully!" });

//   } catch (err) {
//     console.log("ERROR:", err);
//     return res.status(500).json({ success: false, message: "Server Error" });
//   }
// }




import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  try {
    const { name, email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    // ✅ Configure SMTP transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // ✅ Email to subscriber
    await transporter.sendMail({
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: email,
      subject: "Welcome to Sunrise Marketing Solutions",
      html: `
        <h2>Hello ${name || "Subscriber"},</h2>
        <p>Thanks for subscribing!</p>
        <p>We will send you project updates and property listings soon.</p>
        <br><b>Sunrise Marketing Solutions</b>
      `,
    });

    return res.status(200).json({ success: true, message: "Email sent successfully!" });

  } catch (err) {
    console.error("ERROR:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}


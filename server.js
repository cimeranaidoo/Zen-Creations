const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Handle form submission for the subscription form
app.post("/subscribe", (req, res) => {
  const { email } = req.body;

  // Configure Nodemailer
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "your-email@gmail.com",
      pass: "your-email-password",
    },
  });

  const mailOptions = {
    from: "your-email@gmail.com",
    to: "cimera@zencreations.co.za",
    subject: "Add me to email newsletter",
    text: `Please add this email to the newsletter subscription: ${email}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Subscription request sent successfully");
    }
  });
});

// Example endpoint for handling contact form submissions
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: "cimera@zencreations.co.za",
    subject: "Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Message sent successfully");
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

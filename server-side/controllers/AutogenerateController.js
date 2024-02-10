const fs = require('fs').promises;
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const nodemailer = require('nodemailer');

const prisma = new PrismaClient();

// Function to create users from a list of emails in a JSON file
exports.createUsersFromFile = async (filePath) => {
  try {
    // Read the JSON file
    const data = await fs.readFile(filePath, 'utf-8');
    const emails = JSON.parse(data);

    let userCount = 0;
    const userDetails = [];

    // Iterate through the list of emails
    for (const email of emails) {
      try {
        // Generate a random password for each user
        const password = generateRandomPassword();

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user entry in the database
        const newUser = await prisma.user.create({
          data: {
            email,
            password: hashedPassword,
            // Add any other user details here (e.g., username, firstName, lastName, etc.)
          },
        });

        // Send email with account details
        await sendEmail(email, password);

        // Increment the user count and store user details
        userCount++;
        userDetails.push({
          email: newUser.email,
          password,
          // Add other user details here if needed
        });
      } catch (error) {
        console.error('Error creating user:', error);
      }
    }

    // Return the count of users created and their details
    return { userCount, userDetails };
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
};

// Function to send email with account details
const sendEmail = async (email, password) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'your.email@gmail.com', // Your Gmail email address
        pass: 'your_password', // Your Gmail password
      },
    });

    const mailOptions = {
      from: 'your.email@gmail.com', // Sender address
      to: email, // Recipient address
      subject: 'Your account details', // Subject line
      html: `<p>Your account details:</p><p>Email: ${email}</p><p>Password: ${password}</p>`, // Email content
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Function to generate a random password
function generateRandomPassword() {
  const length = 8; // Set the length of the password
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

// Example usage:
const filePath = 'emails.json'; // Path to your JSON file
createUsersFromFile(filePath)
  .then((result) => {
    console.log('Users created:', result.userCount);
    console.log('User details:', result.userDetails);
  })
  .catch((error) => {
    console.error('Error creating users:', error);
  });

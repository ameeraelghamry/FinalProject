const nodemailer = require('nodemailer');

// Create reusable transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Email templates
const getConfirmationEmailTemplate = (booking) => {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <img src="https://your-domain.com/images/nilewayrental-02.png" alt="NileWay Rentals" style="max-width: 200px; margin-bottom: 20px;">
            <h2 style="color: #2c3e50;">Booking Confirmed! 🎉</h2>
            <p>Dear ${booking.fullname},</p>
            <p>Great news! Your car rental booking has been confirmed. Here are your booking details:</p>
            
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p><strong>Booking Reference:</strong> ${booking.bookingReference}</p>
                <p><strong>Car:</strong> ${booking.carName || 'Selected Vehicle'}</p>
                <p><strong>Pickup Date:</strong> ${booking.pickupDate || 'As scheduled'}</p>
                <p><strong>Return Date:</strong> ${booking.returnDate || 'As scheduled'}</p>
                <p><strong>Total Amount:</strong> $${booking.totalAmount}</p>
            </div>
            
            <h3 style="color: #2c3e50;">Next Steps:</h3>
            <ul>
                <li>Please arrive 15 minutes before your scheduled pickup time</li>
                <li>Bring your driver's license and the credit card used for booking</li>
                <li>Have your booking reference number handy: ${booking.bookingReference}</li>
            </ul>
            
            <p>If you need to modify your booking or have any questions, please don't hesitate to contact us:</p>
            <p>📞 Phone: +20 (2) 123-4567<br>
               📧 Email: support@nileway.com</p>
            
            <p style="margin-top: 30px;">Thank you for choosing NileWay Rentals!</p>
            <p style="color: #666;">Best regards,<br>The NileWay Team</p>
        </div>
    `;
};

const getDeclinedEmailTemplate = (booking) => {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <img src="https://your-domain.com/images/nilewayrental-02.png" alt="NileWay Rentals" style="max-width: 200px; margin-bottom: 20px;">
            <h2 style="color: #2c3e50;">Booking Update</h2>
            <p>Dear ${booking.fullname},</p>
            <p>We regret to inform you that we are unable to confirm your car rental booking at this time.</p>
            
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p><strong>Booking Reference:</strong> ${booking.bookingReference}</p>
                <p><strong>Car:</strong> ${booking.carName || 'Selected Vehicle'}</p>
                <p><strong>Requested Dates:</strong> ${booking.pickupDate || 'As scheduled'} - ${booking.returnDate || 'As scheduled'}</p>
            </div>
            
            <p>This could be due to one of the following reasons:</p>
            <ul>
                <li>Vehicle availability issues</li>
                <li>Documentation requirements</li>
                <li>Technical constraints</li>
            </ul>
            
            <p>We encourage you to:</p>
            <ul>
                <li>Try booking for different dates</li>
                <li>Check our other available vehicles</li>
                <li>Contact our support team for assistance</li>
            </ul>
            
            <p>Our team is ready to help you find an alternative solution:</p>
            <p>📞 Phone: +20 (2) 123-4567<br>
               📧 Email: support@nileway.com</p>
            
            <p style="margin-top: 30px;">We apologize for any inconvenience and hope to serve you in the future.</p>
            <p style="color: #666;">Best regards,<br>The NileWay Team</p>
        </div>
    `;
};

// Send confirmation email
const sendConfirmationEmail = async (booking) => {
    try {
        const mailOptions = {
            from: '"NileWay Rentals" <noreply@nileway.com>',
            to: booking.email,
            subject: 'Booking Confirmed! - NileWay Rentals',
            html: getConfirmationEmailTemplate(booking)
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Confirmation email sent:', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending confirmation email:', error);
        return false;
    }
};

// Send declined email
const sendDeclinedEmail = async (booking) => {
    try {
        const mailOptions = {
            from: '"NileWay Rentals" <noreply@nileway.com>',
            to: booking.email,
            subject: 'Booking Update - NileWay Rentals',
            html: getDeclinedEmailTemplate(booking)
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Decline email sent:', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending decline email:', error);
        return false;
    }
};

module.exports = {
    sendConfirmationEmail,
    sendDeclinedEmail
}; 
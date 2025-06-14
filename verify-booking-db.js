const mongoose = require('mongoose');
const { Booking } = require('./models/booking');
require('dotenv/config');

async function verifyCheckoutCollection() {
    try {
        console.log('🔌 Connecting to MongoDB Atlas...');
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log('✅ Connected to MongoDB Atlas');
        console.log('📊 Database Name:', mongoose.connection.db.databaseName);
        console.log('🌐 Cluster:', process.env.CONNECTION_STRING.split('@')[1].split('/')[0]);
        
        // Create a test booking in the 'checkout' collection
        console.log('\n📝 Creating a test booking in "checkout" collection...');
        const testBooking = new Booking({
            fullname: 'Test Customer',
            email: 'test.customer@example.com',
            phone: '+20987654321',
            country: 'Egypt',
            city: 'Alexandria',
            address: '456 Mediterranean Street, Alexandria',
            paymentMethod: 'card',
            cardName: 'Test Customer',
            carName: 'BMW X5 2024',
            pickupDate: 'Jan 15, 2025 - 2:00 PM',
            returnDate: 'Jan 20, 2025 - 2:00 PM',
            pickupLocation: 'Alexandria Airport',
            rentalRate: 400.00,
            insurance: 40.00,
            taxes: 60.00,
            totalAmount: 500.00
        });
        
        const savedBooking = await testBooking.save();
        console.log('✅ Test booking saved to "checkout" collection!');
        console.log('🆔 Booking ID:', savedBooking._id);
        console.log('📝 Booking Reference:', savedBooking.bookingReference);
        console.log('📅 Created At:', savedBooking.dateCreated);
        
        // Count all bookings in checkout collection
        const totalCheckouts = await Booking.countDocuments();
        console.log(`📊 Total entries in "checkout" collection: ${totalCheckouts}`);
        
        // Show recent entries from checkout collection
        const recentCheckouts = await Booking.find().sort({ dateCreated: -1 }).limit(3);
        console.log('\n📋 Recent entries in "checkout" collection:');
        recentCheckouts.forEach((checkout, index) => {
            console.log(`   ${index + 1}. ${checkout.bookingReference} - ${checkout.fullname} (${checkout.email})`);
        });
        
        // List all collections to confirm 'checkout' exists
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('\n📋 All collections in nileway_db:');
        collections.forEach(collection => {
            if (collection.name === 'checkout') {
                console.log(`   ✅ ${collection.name} (YOUR NEW CHECKOUT COLLECTION)`);
            } else {
                console.log(`   - ${collection.name}`);
            }
        });
        
        console.log('\n🔍 HOW TO FIND "CHECKOUT" COLLECTION IN MONGODB ATLAS:');
        console.log('1. Go to https://cloud.mongodb.com/');
        console.log('2. Login with your MongoDB Atlas account');
        console.log('3. Click on your cluster: cluster0');
        console.log('4. Click "Browse Collections" button');
        console.log('5. Select database: "nileway_db"');
        console.log('6. Look for collection: "checkout" ← YOUR NEW COLLECTION!');
        console.log('7. Click on "checkout" to see all booking data');
        
        console.log('\n📍 Updated Database Details:');
        console.log(`   • Cluster: cluster0.6n4ofcn.mongodb.net`);
        console.log(`   • Database: nileway_db`);
        console.log(`   • Collection: checkout ← NEW COLLECTION NAME`);
        console.log(`   • Username: malakkmoatazz`);
        
        // Clean up test booking
        await Booking.findByIdAndDelete(savedBooking._id);
        console.log('\n🧹 Test booking cleaned up');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await mongoose.connection.close();
        console.log('\n🔌 Connection closed');
        process.exit(0);
    }
}

verifyCheckoutCollection(); 
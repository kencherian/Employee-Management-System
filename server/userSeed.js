// EMS/server/userSeed.js
import connectToDatabase from './db/db.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

const userRegister = async () => {
    try {
        await connectToDatabase();
        const hashPassword = await bcrypt.hash("admin", 10);
        
        // Find existing admin or create a new one, ensuring password is set to 'admin'
        await User.findOneAndUpdate(
            { email: "admin@gmail.com" },
            { 
                name: "Admin",
                email: "admin@gmail.com",
                password: hashPassword,
                role: "admin"
            },
            { upsert: true, new: true }
        );
        
        console.log("Admin account successfully created/updated with password 'admin'!");
        process.exit(0);
    } catch (error) {
        console.log("Error seeding admin:", error);
        process.exit(1);
    }
};

userRegister();
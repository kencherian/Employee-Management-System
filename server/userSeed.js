// EMS/server/userSeed.js
import User from './models/User.js';
import bcrypt from 'bcryptjs';

const userRegister = async () => {
    try {
        const hashPassword = await bcrypt.hash("admin", 10);
        
        await User.findOneAndUpdate(
            { email: "admin@gmail.com" },
            { 
                name: "Admin",
                email: "admin@gmail.com",
                password: hashPassword,
                role: "admin"
            },
            { upsert: true, returnDocument: 'after' }
        );
        
        console.log("Admin account successfully created/updated with password 'admin'!");
    } catch (error) {
        console.log("Error seeding admin:", error);
    }
};

export default userRegister;
import mongoose, { model, Document } from 'mongoose'
import bcrypt from 'bcryptjs'

interface UserInterface extends Document {
    name: string;
    surname: string;
    email: string;
    password: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

const userSchema = new mongoose.Schema<UserInterface>({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    surname: {
        type: String,
        required: [true, 'Surname is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true
    },
    role: {
        type: Object,
    }
}, {
    versionKey: false,
    timestamps: true
})

export const encryptPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

export const validatePassword = async (password: string, registeredPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, registeredPassword)
};

export default model('User', userSchema)

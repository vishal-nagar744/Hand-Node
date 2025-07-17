import User from '../models/userModels.js';
import bcrypt from 'bcryptjs';


// @desc Get user profile
// @route GET /api/auth/profile
// @access Private

export const getUserProfile = async (req, res) => {
    try {
        const user = req.user;

        res.status(200).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar || '',
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// @desc    Update logged-in user's profile
// @route   PUT /api/users/profile
// @access  Private

export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // update user details
        const { name, email, password } = req.body;

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = password;   // bcrypt hoga pre-save hook se

        const updatedUser = await user.save();

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ==============================
// @desc    Change user password
// @route   PUT /api/users/change-password
// @access  Private
// ==============================

export const changeUserPassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: 'Both old and new passwords are required' });
        }

        const user = await User.findById(req.user._id);

        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Old password is incorrect' });
        }

        user.password = newPassword; // bcrypt hoga pre-save hook se
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password changed successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ==============================
// @desc    Upload user avatar (profile image)
// @route   POST /api/users/upload-avatar
// @access  Private
// ==============================

export const uploadUserAvatar = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Save file path in DB
        user.avatar = `/uploads/${req.file.filename}`;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Avatar uploaded and saved successfully',
            filePath: user.avatar,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

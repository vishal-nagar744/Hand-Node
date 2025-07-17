import User from '../models/userModels.js';


// @desc Get all users
// @route GET /api/admin
// @access Private/Admin
export const getAllUsers = async (req, res) => {
  try {

    // pagination logic 
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const keyword = req.query.search ? {
      $or: [
        { name: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } }
      ]
    } : {};

    const totalUsers = await User.countDocuments(keyword);


    const users = await User.find(keyword).select('-password').skip(skip).limit(limit).sort({ createdAt: -1 });
    res.status(200).json
      (
        {
          success: true,
          totalUsers,
          totalPages: Math.ceil(totalUsers / limit),
          currentPage: page,
          users,
        }
      );
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc Get user by ID
// @route GET /api/admin/:id
// @access Private/Admin
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc Update user by ID
// @route PUT /api/admin/:id
// @access Private/Admin
export const updateUserById = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    const updatedUser = await user.save();

    res.status(200).json({ success: true, message: 'User updated', data: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc Delete user by ID
// @route DELETE /api/admin/:id
// @access Private/Admin
export const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ success: true, message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

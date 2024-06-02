const User = require('./users.model');

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json({ message: 'All users', data: users });
    } catch (error) {
        res.json({ message: 'Error', data: error });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json({ message: 'User by ID', data: user });
    } catch (error) {
        res.json({ message: 'Error', data: error });
    }
};

// Create user
exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json({ message: 'User created', data: user });
    } catch (error) {
        res.json({ message: 'Error', data: error });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: 'User updated', data: user });
    }
    catch (error) {
        res.json({ message: 'Error', data: error });
    }
}

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted', data: user });
    }
    catch (error) {
        res.json({ message: 'Error', data: error });
    }
}
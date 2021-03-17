const User = require('./user.model');


const getUsers = async (req, res) => {
    try {
        const response = await User.find();
        res.send(response);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
}

const createUser = async (req, res) => {
    const user = new User(req.body);
    try {
        const response = await user.save();
        res.send(response);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
}

const updateUser = async (req, res) => {
    const id = req.params.id;
    const user = new User(req.body);
    try {
        const response = await User.findOneAndUpdate({_id: id}, req.body, {
            new: true
        });
        res.send(response);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await User.findByIdAndDelete(id);
        res.send(response);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
}

module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser
};

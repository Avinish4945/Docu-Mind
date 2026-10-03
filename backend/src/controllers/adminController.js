const getAdminDashboard = (req, res) => {

    res.json({
        message: "Welcome to KMRL Admin Dashboard",
        user: req.user
    });

};

module.exports = {
    getAdminDashboard
};
const requireRole = (...allowedRoles) => {

    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        if (!allowedRoles.includes(req.user.role)) {

            console.log(
                "ROLE ACCESS DENIED:",
                req.user.role,
                "Allowed:",
                allowedRoles
            );

            return res.status(403).json({
                message: "Access denied"
            });
        }

        next();
    };
};

module.exports = requireRole;
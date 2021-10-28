module.exports = {
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            return res.redirect('/signin');
        }
    },
    notLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect('/profile');
        } else {
            return next();
        }
    }

};

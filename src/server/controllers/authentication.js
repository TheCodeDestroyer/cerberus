import express from 'express';
import passport from 'passport';

let router = new express.Router();
let redirect = {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password.',
    successFlash: 'Welcome!'
};
router.post('/', passport.authenticate('local', redirect), (req, res) => {
});

export default router;

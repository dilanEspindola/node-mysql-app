const { query } = require('express');
const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth')

router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add.hbs')
});

router.post('/add', async (req, res) => {
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description,
        user_id: req.user.id
    };

    await pool.query('INSERT INTO links SET ?', [newLink]);
    req.flash('success', 'Link Saved!');
    res.redirect('/links')
});

router.get('/', isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    res.render('links/list.hbs', { links });
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE id = ?', [id]);
    req.flash('success', 'Link Has been deleted')
    res.redirect('/links');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    res.render('links/edit.hbs', { link: links[0] });
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, url, description } = req.body;
    const newLink = { title, url, description };
    await pool.query('update links set ? where id = ?', [newLink, id]);
    console.log(id)
    req.flash('success', 'Link has been updated')
    res.redirect('/links');
});

module.exports = router;
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { loadContact, findContact } = require('./utilities/contacts');
const { loadTickets } = require( './utilities/tickets')
const bodyparser = require('body-parser')
const koneksi = require('./koneksi');
const app = express();
const port = 3006;

app.set('view engine', 'ejs');
//Third party middleware
app.use(expressLayouts);

//Built in middleware
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:false}))
//Application Level Middleware


app.get('/' , (req,res) => {
    koneksi.query("SELECT * FROM siswa", (error, siswa) => {
        res.render('index', {
            layout : 'layouts/main-layout',
            nama : 'azarel',  
            title : 'main',
            siswa
        })
    })
    // const mahasiswa = [
    //     {
    //         nama : 'azarel',
    //         email : 'aza@gmail.com'
    //     },
    //     {
    //         nama : 'azarel',
    //         email : 'aza@gmail.com'
    //     },
    //     {
    //         nama : 'azarel',
    //         email : 'aza@gmail.com'
    //     }
    // ]
    
    // res.render('index' , 
    // {
    //     layout : 'layouts/main-layout',
    //     nama : 'azarel',  
    //     title : 'main',
    //     mahasiswa
    // });
})

app.get('/siswa/:nis', (req,res) => {
    const nis = req.params.nis
    const sql = `SELECT * FROM siswa WHERE nis  = ${nis}`
    koneksi.query(sql, (error, siswa) => {
        res.render('siswa', {
            layout : 'layouts/main-layout',
            title : 'about',
            siswa,
        })
    })
})

app.get('/delete/:nis', (req,res) => {
    const nis = req.params.nis
    const sql = `DELETE  FROM siswa WHERE nis  = ${nis}`
    koneksi.query(sql, (error, siswa) => {
        res.redirect('/')
    })
})

app.get('/tambah', (req, res) => {
    res.render('tambah', {
        layout: 'layouts/main-layout',
        title: 'Tambah Data',
    });
});

app.get('/ticket', (req, res) => {
    const tickets = loadTickets()
    res.render('ticket', {
        layout: 'layouts/main-layout',
        title: 'tickets',
        tickets,
    });
});

app.post('/tambah', (req, res) => {
    const { nis, nama, jenis_kelamin, alamat } = req.body;
    const sql = `INSERT INTO siswa (nis, nama, jenis_kelamin, alamat) VALUES (?, ?, ?, ?)`;
    koneksi.query(sql, [nis, nama, jenis_kelamin, alamat], (error, result) => {
        if (error) throw error;
        res.redirect('/');
    });
});

app.get('/edit/:nis', (req,res) => {
    const nis = req.params.nis
    const sql = `UPDATE FROM siswa WHERE nis  = ${nis}`
    koneksi.query(sql, (error, siswa) => {
        res.redirect('/')
    })
})



app.get('/about' , (req,res) => {
    res.render('about', {
        layout : 'layouts/main-layout',
        title : 'about'});
})

app.get('/contacts' , (req,res) => {
    const contacts = loadContact();
    console.log(contacts);
    res.render('contacts', {
        layout : 'layouts/main-layout',
        title : 'contacts',
        contacts,
    });
})

app.get('/contact/:nama' , (req,res) => {
    const contact = findContact(req.params.nama);
    res.render('contact-detail', {
        title : 'Detail Contact',
        layout : 'layouts/main-layout',
        contact,
    });
})

app.use('/' , (req,res) => {
    res.status(404)
    res.send('<h1>404 Not Found<h1>')
})

app.listen(port, ()=>{
    console.log(`listening in http://localhost:${port}`)
})
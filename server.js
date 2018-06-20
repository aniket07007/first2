var express = require('express');
var app = express();
var hbs = require('hbs');
var fs = require('fs');
hbs.registerPartials(__dirname+'/views/partials');
// app.use((req, res, next)=>{
//      res.render('maintanance.hbs');
//      next();
// });
app.get('/', (req, res)=>{
   res.send('Hello express');
});

app.use((req, res, next)=>{

    var now = new Date().toString();
    var log = `${req.method} ${req.ip} ${req.url}`;
    fs.appendFile('server.log', log+'\n');
   next(); 
});

app.get('/about', (req, res)=>{
    res.render('about.hbs',{
        pageTitle: 'About Us'
    });
});

hbs.registerHelper('year', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
     return text.toUpperCase();
});

app.get('/home', (req, res)=>{
    res.render('home.hbs', {
        pageTitle: 'welcome'
    });
});

app.get('/help', (req, res)=>{
  res.render('help.hbs',{
      pageTitle: 'Help2',
     
  });
});

app.use(express.static(__dirname+ '/public'));

app.get('/api' , (req, res)=>{
    res.send({
        Name: 'Tom Cruise',
        Profession: [
            'Actor',
            'Most handsome face',
            'Ethan Hunt'
        ]
    })
});

app.get('/bad', (res, req)=>{
    req.send({
        status: 'ZERO_ReSULT',
        Error: 'Unable to connect'
    })
});
app.listen(3000);
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();

const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname+"/views/partials");
app.set('view engine','hbs');

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n',(err)=>{
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintenance');
// });

app.use(express.static(__dirname+"/public"));

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});



app.get("/",(req,res)=>{
    res.render("home",{
        pageTitle:"Home",
        WelcomeMessage:"Welcome !"
    })
});


app.get("/contact",(req,res)=>{
    res.render('page',{
        pageTitle:"Contact",
        content:"Hello contact"
    })
});

app.get("/about",(req,res)=>{
    res.render('page',{
        pageTitle:"About",
        content:"Hello About!"
    });
});

app.listen(port,()=>{
    console.log("Server run at localhost:3000");
});
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
require("./db/conn");
const Register = require("./models/registers");

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:false})); //!important while get

//Added static path(css, js)
const static_path = path.join(__dirname, "../public");
app.use(express.static(static_path));
// console.log(path.join(__dirname, "../public"));

//Added template engine path which will be helpful in routing
const template_path = path.join(__dirname, "../templates/views");
app.set("view engine", "hbs");
app.set("views", template_path);

// Added partials
const partials_path = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partials_path);

app.get("/", (req, res) =>{
   res.render("register");
});

app.get("/login", (req, res) =>{
   res.render("login");
});

// Create an new user in our database
app.post("/", async (req, res)=>{
   try{
      // console.log(req.body.password);
      // res.send(req.body.password);

      const password = req.body.password;
      const cpassword = req.body.confirmpassword;
      if(password === cpassword){
         const registerUser = new Register({
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            email :  req.body.email,
            gender : req.body.gender,
            phone : req.body.phone,
            age : req.body.age,
            password : password,
            confirmPassword : cpassword
         });
        const registered = await registerUser.save();
        res.status(201).render();
      }else{
         res.send("password are not matching");
      }
   }
   catch(error){
      res.status(400).send(error);
   }
})

app.listen(port, ()=>{
   console.log(`server is running at port no ${port} `);
})
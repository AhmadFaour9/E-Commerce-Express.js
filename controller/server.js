var express=require('express');
var path=require('path')
var bodyparser=require('body-parser');
const sessions = require('express-session');
const { Console } = require('console');
const { render, redirect } = require('express/lib/response');
const mongoose = require('mongoose')
const Users=require('../model/Users')
const Product=require('../model/Product')
const Category=require('../model/Category')
const Company=require('../model/Company')
mongoose.connect('mongodb://127.0.0.1:27017/project');
const store=new sessions.MemoryStore();

var app=express();
var bodyparse=bodyparser.urlencoded({extended:true})

app.set('view engine','ejs')
app.set('views','views')
// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave:true,
    store
}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{

    console.log(req.session);
    var u=req.session;
    if(u.username && u.password){
if(u.username=='admin'&& u.password=='123456')
{
    res.render('main page for admin')
}
else{
    res.render('main page',{name:u.username})
}
    }
    else {
        res.redirect('/login')
    }
})
app.get('/signup',(req,res)=>{

res.render('signup',{errorpass:'',errorfound:''})

})
app.get('/login',(req,res)=>{

res.render('login')

})
app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/login')
    
})

app.post('/aa',bodyparse,(req,res)=>{

    async function run(){
var i=await Users.find({Username:req.body.username,Password:req.body.password})
if(i.length!=0){
    var u= req.session
    u.username=req.body.username
    u.password=req.body.password
    res.redirect('/')

}
else {res.redirect('/signup')}

    }
    run()
})
app.post('/sign',bodyparse,(req,res)=>{
    async function run(){
        if(req.body.password===req.body.confirmpassword)
        {
            var i= await Users.find({Username:req.body.username,Password:req.body.password,Email:req.body.email,Gender:req.body.gender});
        if(i.length===0){
        var ii=await  new Users({Username:req.body.username,Password:req.body.password,Email:req.body.email,Gender:req.body.gender})
        await ii.save();
        console.log(ii);
            var u= req.session
            u.username=req.body.username
            res.render('login')
        
        }
        
        else {res.render('signup',{errorpass:"",errorfound:'you have account try Login'})}
        
    }
            else {res.render('signup',{errorpass:'confirm your password again',errorfound:''});}}
            run()
})

app.get('/add-product',(req,res)=>{
    var u=req.session
    if(u.username=='admin'&& u.password=='123456')
    {
    res.render('addproduct')
    }
    else 
    res.send('<h1>Not Found <br><br> 404</h1>');

})
app.post('/addingproduct',bodyparse,(req,res)=>{
  
    
async function add(){
    var i=await Product.find({})
var p=await new Product({id:i.length,name:req.body.Name,category_id:req.body.Idcategory,company_id:req.body.Idcompany,price:req.body.Price,source:req.body.Source})
await p.save();
console.log(p)
console.log('successfuully add')   
        var j=await Category.find({})
        var z=await Company.find({})
res.render('showproduct',{data:i,data1:j,data2:z})
}
add()

})
app.get('/show-product',(req,res)=>{
    var s=req.session
   
    async function show(){
        var i=await Product.find({})
        var j=await Category.find({})
        var z=await Company.find({})
res.render('showproduct',{data:i,data1:j,data2:z})

    }
     if(s.username && s.password){ show()}
    else 
    res.send('<center><h1>Not Found <br><br> 404</h1></center>');


})
app.get('/add-category',(req,res)=>{
    var u=req.session
    if(u.username=='admin'&& u.password=='123456')
    {
    res.render('addcategory')
    }
    else 
    res.send('<center><h1>Not Found <br><br> 404</h1></center>');

})
app.post('/addcategory1',bodyparse,(req,res)=>{
    async function add(){
var i=await Category.find({})
        var a=await Category.find({category:req.body.Name})
        if(a.length==0)
        {
            var p=await new Category({id:i.length,category:req.body.Name})
            await p.save();
            console.log(p)
            res.render('showcategory',{data:i})
        }
    }
    add();

})
app.get('/show-category',(req,res)=>{
 var u=req.session
    if(u.username=='admin'&& u.password=='123456')
    {
        async function show(){
            var s=await Category.find({})
            console.log(s)
res.render('showcategory',{data:s})
       show();  }
   
    }
    else 
    res.send('<center style="color:gray;"><h1>Not Found <br><br> 404</h1></center>');

})

app.get('/add-company',(req,res)=>{

 var u=req.session
    if(u.username=='admin'&& u.password=='123456')
    {
    res.render('addcompany')
    }
    else 
    res.send('<center><h1>Not Found <br><br> 404</h1></center>');

})
app.post('/addingcom',bodyparse,(req,res)=>{
async function add(){
var a=await Company.find({company:req.body.Company,logo:req.body.Logo})
if(a.length==0)
{var i=await Company.find({})
var aa=await new Company({id:i.length,company:req.body.Company,logo:req.body.Logo})
await aa.save();
res.render('showcompany',{data:i})
console.log(aa)
}
else {
    res.redirect('/add-company')
}
}add();

})
app.get('/show-company',(req,res)=>{

 var u=req.session
    if(u.username=='admin'&& u.password=='123456')
    { async function show(){
var i=await Company.find({});
    res.render('showcompany',{data:i})

    }
    show();
    }
    else 
    res.send('<center><h1>Not Found <br><br> 404</h1></center>');
})

app.get('/modify-product',(req,res)=>{

    var u=req.session
    if(u.username=='admin'&& u.password=='123456')
    {
res.render('modifyproduct');
    }
    else 
    res.send('<center><h1>Not Found <br><br> 404</h1></center>');

})
app.post('/modifyproduct',bodyparse,(req,res)=>{
    async function run(){
        var s=await Product.find({id:req.body.ID})
    if(s.length!=0)
    {if(req.body.Name!='')
    {
        var a=await Product.updateOne({id:req.body.ID},{$set:{name:req.body.Name}})
        console.log('success');
    }
    if(req.body.Idcategory!='')
    {
        var a=await Product.updateOne({id:req.body.ID},{$set:{category_id:req.body.Idcategory}})
                console.log('success');

    }
 if(req.body.Idcompany!='')
    {
        var a=await Product.updateOne({id:req.body.ID},{$set:{company_id:req.body.Idcompany}})
                console.log('success');

    }
    if(req.body.Price!='')
    {
        var a=await Product.updateOne({id:req.body.ID},{$set:{price:req.body.Price}})
                console.log('success');

    }
    if(req.body.Source!='')
    {
        var a=await Product.updateOne({id:req.body.ID},{$set:{source:req.body.Source}})
                console.log('success');

    }   var i=await Product.find({})
        var j=await Category.find({})
        var z=await Company.find({})
res.render('showproduct',{data:i,data1:j,data2:z})
    }
    else 
    res.redirect('/modify-product')
    }
    run();
})
app.get('/modify-company',(req,res)=>{

 var u=req.session
    if(u.username=='admin'&& u.password=='123456')
    {
res.render('modifycompany');
    }
    else 
    res.send('<center><h1>Not Found <br><br> 404</h1></center>');


})
app.post('/modifycompany',bodyparse,(req,res)=>{

 async function run(){
        var s=await Company.find({id:req.body.ID})
    if(s.length!=0)
    {
        if(req.body.Company!=''){
             var a=await Company.updateOne({id:req.body.ID},{$set:{company:req.body.Company}})
             console.log('success');
        }
         if(req.body.Logo!=''){
             var a=await Company.updateOne({id:req.body.ID},{$set:{logo:req.body.Logo}})
             console.log('success');
        }
        var rr=await Company.find({})
        res.render('showcompany',{data:rr})
    }
    else res.redirect('/modify-company')
    
 }
 run();
})

app.get('/show-product-as-category',(req,res)=>{
var u=req.session

async function show(){
var a=await Category.find({})
var p=await Product.find({})
res.render('show product as category',{data:p,data1:a});

}
if(u.username &&u.password){
show();
}
else 
    res.send('<center><h1>Not Found <br><br> 404</h1></center>');

})
app.get('/show-product-as-company',(req,res)=>{
var u=req.session

async function show(){
var a=await Company.find({})
var p=await Product.find({})
res.render('show product as company',{data:p,data1:a});

}
if(u.username &&u.password){
show();
}
else 
    res.send('<center><h1>Not Found <br><br> 404</h1></center>');

})

app.get('/information/:Name',(req,res)=>{
  var s=req.session
   async function run(){
      
       
       var i=await Product.findOne({name:req.params.Name})
  console.log(i)
        res.render('information',{id:i.id,name:i.name,
        source:i.source,price:i.price,
        category_id:i.category_id,company_id:i.company_id})
        
       
}

 if(s.username && s.password){run()}
 else 
    res.send('<center><h1>Not Found <br><br> 404</h1></center>');

})
var servr=app.listen(2000,()=>{
    console.log("Done "+servr.address().port);
}); 

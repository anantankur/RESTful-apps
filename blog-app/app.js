var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser')


mongoose.connect('mongodb://localhost:27017/restful_blog_app', {useNewUrlParser: true});
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));



app.listen(3000, function(){
  console.log('restful-blog-app server has started!');
});
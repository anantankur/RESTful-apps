var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    expressSanitizer = require('express-sanitizer')

// mongoose.connect('mongodb://localhost:27017/restful_blog_app', {useNewUrlParser: true});
mongoose.connect('mongodb://darshan:123456789gg@ds155352.mlab.com:55352/blog-app', {useNewUrlParser: true});
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(expressSanitizer());

var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});
var Blog = mongoose.model('Blog', blogSchema);


//RESTful Routes
app.get('/', function(req, res){
  res.redirect('/blogs');
});

// Index Route
app.get('/blogs', function(req, res){
  Blog.find({}, function(err, blogs){
    if(err){
      console.log(err);
    } else {
      res.render('index', {blogs: blogs});
    }
  });
});

// New Route
app.get('/blogs/new', function(req, res){
  res.render('new');
});

// Create Route
app.post('/blogs', function(req, res){
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.create(req.body.blog, function(err, newBlog){
    if(err){
      console.log(err);
      res.render('new');
    } else {
      res.redirect('/blogs');
    }
  });
});

// Show Route
app.get('/blogs/:id', function(req, res){
  Blog.findById(req.params.id, function(err, foundBlog){
    if(err){
      res.redirect('/blogs');
    } else {
      res.render('show', {blog: foundBlog});
    }
  });
});

// Edit Route
app.get('/blogs/:id/edit', function(req, res){
  Blog.findById(req.params.id, function(err, foundBlog){
    if(err){
      res.redirect('/blogs');
    } else {
      res.render('edit', {blog: foundBlog});
    }
  });
});

// Update Route
app.put('/blogs/:id', function(req, res){
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
    if(err){
      res.redirect('/blogs');
    } else {
      res.redirect('/blogs/' + req.params.id);
    }
  });
});

// Delete Route
app.delete('/blogs/:id', function(req, res){
  Blog.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect('/blogs');
    } else {
      res.redirect('/blogs');
    }
  });
});

app.listen(3000, function(){
  console.log('restful-blog-app server has started!');
});
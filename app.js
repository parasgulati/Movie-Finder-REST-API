const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const cors=require('cors');
const API=express();
const Post=require('./backend/models/Post.js');
const Search=require('./backend/models/Search.js');
mongoose.connect('mongodb+srv://paras:HD60YdWhMm8KDceC@movie-finder-dnxcw.mongodb.net/movie-finder-visitor_information?retryWrites=true&w=majority',{'useUnifiedTopology':true})
.then(()=>{
    console.log('database connected');
})
.catch(()=>{
    console.log('database connectivity failed');
});

API.use(cors());
API.use(bodyParser.json());
API.use(bodyParser.urlencoded({extended: false}));

API.use('/set',(req,res,next)=>{

	const post2=req.query;
	if (typeof localStorage === "undefined" || localStorage === null) 
	{
		var LocalStorage = require('node-localstorage').LocalStorage;
		localStorage = new LocalStorage('./scratch');
	}   
  localStorage.setItem('email_id', post2.email);
	const post=new Post({
        id:post2.id,
        name:post2.name,
        email_id:post2.email,
        time:post2.time
        });
    post.save(); 
    console.log('visitor information posted');

    res.status(200).json(
        {
            message:'success'
        });
});

API.use('/search',(req,res,next)=>{

  console.log('movie key searched');
   
    const post2=req.query;

	try
	{
	if (typeof localStorage === "undefined" || localStorage === null) {
		var LocalStorage = require('node-localstorage').LocalStorage;
		localStorage = new LocalStorage('./scratch');
	  }
	}
	catch{
		console.log('error caught');
	}
	var key=post2.movie_key;

		Search.findOne({email_id:localStorage.getItem('email_id'),movie_key:key},{liked_or_not:1}).then(documents=>{        
			res.status(200).json(
			{
				liked_or_not:documents.liked_or_not
			});     
		})
	  .catch(documents=>{
		  res.status(200).json(
		{
			liked_or_not:'i'
		});
	  });
  
});


API.use('/update',(req,res,next)=>{

    const post3=req.query;
  if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }
  var id=localStorage.getItem('email_id')
  Search.remove({email_id:id,
  movie_key:(post3.movie_key)})
  .then(documents=>
    {
        console.log('deleted');
    })
	.catch(documents=>
        {
            console.log('not found');
        });  
    const search=new Search({
        email_id:id,
        time:new Date(),
        movie_key:post3.movie_key,
        liked_or_not:post3.liked_or_not
        });

    search.save();
    res.status(200).json(
        {
            message:'success'
        });
        
  console.log('movie information updated'); 
});


 var port =process.env.PORT || 3000;
 API.listen(port)
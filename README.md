example of usage:
```
var sRA = new somethingReallyAwful;
sRA.getThreads(219, function(threads) { console.log(threads.length); });
sRA.getForums(function(forums) { console.log(forums.length); });
sRA.getPosts(3618109, function(posts) { console.log(posts.length); });
sRA.newPost(3618109, "i do what i want");
```

demo of suggested usage at:   
[demo](https://rawgithub.com/CamHenlin/somethingreallyawful/master/demo.html)   
[demo html doc](demo.html)   
[demo js](demo.js)   
note: probably need to be logged in to SA for this to work right
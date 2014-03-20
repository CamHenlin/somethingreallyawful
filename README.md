example of usage:

var sRA = new somethingReallyAwful;
sRA.getThreads(219, function(threads) { console.log(threads.length); });
sRA.getForums(function(forums) { console.log(forums.length); });
sRA.getPosts(3618109, function(posts) { console.log(posts.length); });
sRA.newPost(3618109, "i do what i want");
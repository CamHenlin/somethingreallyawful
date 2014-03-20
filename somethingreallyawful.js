var somethingReallyAwful = function() {
	/**
	 * [Thread object]
	 * @param {[type]} id       [thread id]
	 * @param {[type]} name     [thread name]
	 * @param {[type]} replies  [number of replies]
	 * @param {[type]} views    [number of views]
	 * @param {[type]} author   [thread author]
	 * @param {[type]} authorId [id of thread author]
	 * @param {[type]} rating   [thread rating]
	 * @param {[type]} votes    [thread votes contributing to rating]
	 * @param {[type]} icon     [id of icon used by thread]
	 */
	var Thread = function (id, name, replies, views, author, authorId, iconId, killedBy, rating, votes) {
		this.id         = id;
		this.name       = name;
		this.replies    = replies;
		this.views      = views;
		this.author     = author;
		this.authorId   = authorId;
		this.iconId 	= iconId;
		this.killedBy   = killedBy;
		this.rating     = rating;
		this.votes 		= votes;
	};

	/**
	 * [Forum object]
	 * @param {[type]} id          [description]
	 * @param {[type]} name        [description]
	 * @param {[type]} description [description]
	 * @param {[type]} moderators  [description]
	 */
	var Forum = function (id, name, description, moderators) {
		this.id         = id;
		this.name       = name;
		this.description = description;
		this.moderators = moderators;
	};

	this.getForums = function(callback) {
		var forums = [];
		var iconRegex = /\d\d\d/;
		var temp;
		$.ajax({
			url: "http://forums.somethingawful.com/index.php",
			type: "GET",
			success: function (pageData) {
				console.log(pageData);
				var threadEls = $(pageData).children('#forums').children('tbody').children('tr');
				threadEls.each(function(threadTr) {
					threadTr = $(threadEls[threadTr])[0];
					forums.push(
						new Forum(
							threadEls[1].children[0].children[0].href.split('forumid=')[1], // id
							threadEls[1].children[1].children[0].text, // name
							threadEls[1].children[1].children[0].title, // description
							 // moderators
						)
					);
				});

				callback(forums);
			},
			error: function(xhr, status, error) {
				var err = eval("(" + xhr.responseText + ")");
				alert(err.Message);
			}
		});
	}

	/**
	 * [getThreads gets threads by id and sends them to callback function]
	 * @param  {[type]}   forumId  [forum id]
	 * @param  {Function} callback [function that you want to use to interact with the thread data. thread data is an array of thread objects]
	 */
	this.getThreads = function (forumId, callback) {
		var threads = [];
		var iconRegex = /\d\d\d/;
		var temp;
		$.ajax({
			url: "http://forums.somethingawful.com/forumdisplay.php?forumid=" + forumId,
			type: "GET",
			success: function (pageData) {
				console.log(pageData);
				var threadEls = $(pageData).children('#forum').children('tbody').children('tr');
				threadEls.each(function(threadTr) {
					threadTr = $(threadEls[threadTr])[0];
					threads.push(
						new Thread(
							$($(threadTr).children()[2]).children('div').children('div').children('a').attr('href').split('=')[1], // id
							$($(threadTr).children()[2]).children('div').children('div').children('a').text(), // name
							$($($(threadTr).children()[4]).children()[0]).text, // replies
							$($(threadTr).children()[5]).textContent, // views
							$($(threadTr).children()[3]).children('a').text(), // author
							$($(threadTr).children()[3]).children('a').attr('href').split('=')[2], // authorid
							iconRegex.exec($(threadTr).children()[1].innerHTML), // iconid
							$($(threadTr).children()[7]).children()[1].textContent, // killed by
							(typeof($($(threadTr).children()[6]).children()[0]) !== "undefined") ? $($(threadTr).children()[6]).children()[0].getAttribute('title').split(' votes - ')[1].split(' average')[0] : null, // rating
							(typeof($($(threadTr).children()[6]).children()[0]) !== "undefined") ? $($(threadTr).children()[6]).children()[0].getAttribute('title').split(' votes -')[0] : null // votes
						)
					);
				});

				callback(threads);
			},
			error: function(xhr, status, error) {
				var err = eval("(" + xhr.responseText + ")");
				alert(err.Message);
			}
		});
	};

};

var sRA = new somethingReallyAwful;
var t = sRA.getThreads(219);
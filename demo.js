var sRA = new somethingReallyAwful;

sRA.getThreads(219, function(threads) {
	var table = "<table>";
	threads.forEach(function(thread) {
		table += "<tr><td>name: " + thread.name + "</td><td>id: " + thread.id + "</td><td>replies: " + thread.replies +
			"</td><td>author: " + thread.author + "</td><td>killed by: " + thread.killedBy + "</td></tr>";
	});
	table += "</table>";
	$('body').append(table);
});

function submitPost() {
	sRA.newPost(
		$("#threadId").val(),
		$("#postText").val(),
		function() {
			alert('posted!');
			$("#postText").val("");
			$("#threadId").val("");
		}
	);
}
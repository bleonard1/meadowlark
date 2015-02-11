var cluster = require("cluster");

function startWorker() {
	var worker= cluster.fork();
	console.log("cluster started: ", + worker.id);
}

if (cluster.isMaster) {
	require("os").cpus().forEach(function() {
		startWorker();
	});

	//log workers that disconn. if it does, it should exit, then we'll spawn a new worker.
	cluster.on("disconnect", function(worker) {
		console.log("Cluster worker disconnected: " + worker.id);
	});

	// When a worker exits, create a new one
	cluster.on("exit", function(worker, code, signal) {
		console.log("worker died with exit code :" + worker.id, code, signal);
		startWorker();
	});

} else {
	//start out app on worker; see meadowlark.js
	require("./meadowlark.js");

}

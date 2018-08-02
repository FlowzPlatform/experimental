const deepstream = require('deepstream.io-client-js');
var nodeCleanup = require('node-cleanup');
var afterLoad = require('after-load');

// const ds = deepstream('ws://206.81.2.165:6020');
const ds = deepstream('ws://206.81.2.165:6020', {
	rpcTimeout: 400000, 
	rpcAckTimeout: 400000, 
	rpcResponseTimeout: 400000, 
	subscriptionTimeout: 400000, 
	recordReadAckTimeout: 400000, 
	recordReadTimeout: 400000
});


ds.login();

// const randomURL = Math.ceil(Math.random() * 10000).toString();
const randomURL = 'f3df2e8a2e1f46a383eef403452b77d4';

let websites = [{
				"websiteId": 'f3df2e8a2e1f46a383eef403452b77d4',
				"userId": '592fd3b09df25d00f7a11393'
				}];


for(let i = 0; i < websites.length; i++){
	console.log("websiteId: ", websites[i].websiteId)
	ds.rpc.provide(websites[i].websiteId, async (data, response) => {
		// console.log("received request for: ", randomURL, data.pageName);

		// get page contents
		let html = await afterLoad('http://' + websites[i].userId + '.' + websites[i].websiteId + '.flowzcluster.tk/'  + data.pageName + '.html', function (html){
			console.log("html: ", html)
    		response.send(html);
		});
		// let html = `<h1>Hello user ${randomURL} </h1>`;

	  	// response.send(`<h1>Hello user ${randomURL} </h1>`);
	})
}

ds.on( 'error', error => {
	console.log("error: ", error)
});


nodeCleanup(function (exitCode, signal) {
    // release resources here before node exits
    console.log("called: ", signal)
    ds.rpc.unprovide(randomURL);
});

module.exports = (req, res) => {
  res.end('Hello service')
}
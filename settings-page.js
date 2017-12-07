"use strict"
/*ajaxurl - global wp variable. It has value <protokol> + <site url> + '/wp-admin/admin-ajax.php'
It pablished in page sorce code by PHP (<?php echo admin_url('admin-ajax.php'); ?> ),
or inline added to some JS script.
admin-ajax.php - listen requests and triggers registered functions (eventlisteners)
query parameter action value is name of registered eventlistener function at the backend*/

function RequestMaker(){
	let params = {};
	let asyncStorage = Object.create(null);

	this.setParams = function(data){
		params = {...data};
	};
//TODO: method getParams presents just for test. Have to delete before commit
	this.getParams = function(){
		return params;
	};

	function* getGenerator(){
		let fetchObj = yield fetch(params.getawey);
		let handledResponse = yield handleResponse(fetchObj);

		if(handledResponse.success){
			return handledResponse.data
		}else{
			return Promise.reject(
				Object.assign({}, handledResponse, {
					status: fetchObj.status,
					statusText: fetchObj.statusText
				})
			);
		}
	};

	function* postGenerator(){
		let fetchObj = yield fetch(params.getawey, params.fetchObj);
		let handledResponse = yield handleResponse(fetchObj);

		if(handledResponse.success){
			return handledResponse.data
		}else{
			return Promise.reject(
				Object.assign({}, handledResponse, {
					status: fetchObj.status,
					statusText: fetchObj.statusText
				})
			);
		}
	};

	const generators = {
		getRegions: getGenerator,
		getPlaces: getGenerator,
		addRegion: postGenerator,
		addPlace: postGenerator,
		updateRegion: postGenerator,
		updatePlace: postGenerator,
		deleteRegion: getGenerator,
		deletePlace: getGenerator
	};

	function handleResponse(res) {

		let contentType = res.headers.get('content-type');

		if (contentType.includes('application/json')) {
			return res.json();
		}
		if (contentType.includes('text/html')) {
			return res.text();
		}

		throw new Error(`Content type ${contentType} not supported`);
	};

	function exec(generator, value){

		let next = generator.next(value);

		if(!next.done) {
			next.value.then(
				result => {
					exec(generator, result);
				},
				error=> {
					generator.throw(error);
				}
			);
		} else {
			params.callback.forEach((callback)=>{
				callback.method.apply(callback.context, [next.value, ...callback.args]);
			});
		}
	}

	this.execute = function(generatorName){
		const generator = generators[generatorName];
		if(generator){
			exec( generator() );
		}else{
			throw new Error(`Generator ${generatorName} not found.`);
		}
		;
	}
};

var listeners = (function(listeners){
	var targets = {};

	var actions = {};

	function getTarget(selector){
		return selector && document.querySelector(selector) || false;
	};

	function addListeners(type, listenersData){
		for(var listener in listenersData){
			listenersData[listener].forEach(item => {
				let target = getTarget(item);
				target && target.addEventListener(type, actions[listener])
			})
		}
	};

	function removeListeners(type, listenersData){
		for(var listener in listenersData){
			listenersData[listener].forEach(item => {
				let target = getTarget(item);
				target && target.removeEventListener(type, actions[listener])
			})
		}
	};

	listeners.addTargets = function(newTargets){
		targets = {...targets, ...newTargets};
	};

	listeners.addActions = function(newActions){
		actions = {...actions, ...newActions};
	};

	listeners.initListeners = function(){
		for(var key in targets){
			removeListeners(key, targets[key]);
			addListeners(key, targets[key]);
		}
	};

	return listeners;
})(listeners || {});

var viewModule = (function(viewModule){

	viewModule.printHTML = function(data, target, place){
		target.insertAdjacentHTML(place, data.fragment);
	}

	viewModule.clearFields = function(res, target){
		[...target].forEach(nodeElem => nodeElem.value = '');
	}

	return viewModule;
})(viewModule || {});

var stateController = (function(stateController){
	var state = Object.create(null);

	stateController.manageState = function(obj){
		console.log(obj);
	};

	stateController.getState = function(key){
		return state[key] || null;
	};

	return stateController;
})(stateController || {});


var artefactsController = (function(artefactsController){

	const esc = encodeURIComponent;
	const ajaxUrl = ajaxurl;
	const actions = {
		getRegions: 'get_regions',
		postRegion: 'add_region',
		updateRegion: 'update_region',
		deleteRegion: 'delete_region',
		getPlaces: 'get_places',
		postPlace: 'add_place',
		updatePlace: 'update_place',
		deletePlace: 'delete_place'
	};
	const nonces = {
		getRegions: adfw_nonces.get_regions,
		postRegion: adfw_nonces.post_regions,
		updateRegion: adfw_nonces.update_regions,
		deleteRegion: adfw_nonces.delete_regions,
		getPlaces: adfw_nonces.get_places,
		postPlace: adfw_nonces.post_places,
		updatePlace: adfw_nonces.update_places,
		deletePlace: adfw_nonces.delete_places
	};
	const reqSettings = {
		getRegions: {
				credentials: "same-origin",
				headers: {'Cache': 'no-cache'},
				method: "GET"
			},
		postRegion: {
				credentials: "same-origin",
				headers: {"Content-Type":"application/json; charset=UTF-8", 'Cache': 'no-cache'},
				method: "POST"
			},
		updateRegion: {
				credentials: "same-origin",
				headers: {'Cache': 'no-cache'},
				method: "PUT"
			},
		deleteRegion: {
				credentials: "same-origin",
				headers: {'Cache': 'no-cache'},
				method: "delete"
			},
		getPlaces: {
				credentials: "same-origin",
				headers: {'Cache': 'no-cache'},
				method: "GET"
			},
		postPlace: {
				credentials: "same-origin",
				headers: {"Content-Type":"application/json; charset=UTF-8", 'Cache': 'no-cache'},
				method: "POST"
			},
		updatePlace: {
				credentials: "same-origin",
				headers: {'Cache': 'no-cache'},
				method: "PUT"
			},
		deletePlace: {
				credentials: "same-origin",
				headers: {'Cache': 'no-cache'},
				method: "delete"
			}
	};

	function Region(name, translatedName){
		this.name = name;
		this.translatedName = translatedName;
		//TODDO: must finish validation!!!
		let valid = function(){
			return this.name.length && this.translatedName.length
		};
		let params = Object.create(null);
		this.isValid = ()=> valid;
		this.initParams = (request, callback) => {
			params = {request: request, callback: callback};
		};
		this.getParams = ()=>params;
	};

	Region.prototype.getSome = function(handler){
		handler(this.name, this.translatedName);
	};

	Region.prototype.saveMe = function(handler){
		this.isValid() && handler(this.name, this.translatedName);
	};

	Region.prototype.updateMe = function(handler){
		this.isValid() && handler(this.name, this.translatedName);
	};

	Region.prototype.deleteMe = function(handler){
		this.isValid() && handler(this.name, this.translatedName);
	};

	function Place(region, name, address, payments){
		this.region = region;
		this.name=name;
		this.address = address;
		this.payments = payments;
		//TODDO: must finish validation!!!
		let valid = function(){
			return true;
		};
		let params = Object.create(null);
		this.isValid = ()=> valid;
		this.initParams = (request, callback) => {
			params = {request: request, callback: callback};
		};

		this.getParams = ()=>params;
	}



	Place.prototype.getSome = function(handler){
		this.isValid() && handler(this.name, this.translatedName);
	};

	Place.prototype.saveMe = function(handler){
		this.isValid() && handler(this.name, this.translatedName);
	};

	Place.prototype.updateMe = function(handler){
		this.isValid() && handler(this.name, this.translatedName);
	};

	Place.prototype.deleteMe = function(handler){
		this.isValid() && handler(this.name, this.translatedName);
	};
	
	let listenersInitialData = {
		click: {
			addRegion: ['#add-region'],
			addPlace: ['#add-place'],
		},
		change: {
			selectRegion: ['#region-selector'],
		}
	};
	let listenersActions = {
		addRegion: createRegion,
		addPlace: createRegion,
		selectRegion: selectRegion
	};

	function makeQueryUrl(queryObj){
		return Object.keys(queryObj).map(key => esc(key) + '=' + esc(queryObj[key])).join('&');
	}

	function getArtifacts(reqParams, generatorName){
		const requestMaker = new RequestMaker();
		
		try{
			requestMaker.setParams( reqParams );
		}catch(e){
			//TODO: have to mmake error handler
			cosole.log('error!!!!!!!!!!', e);
		}
		requestMaker.execute( generatorName)
	};

	function addArtifacts(reqParams, generatorName){
		const requestMaker = new RequestMaker();
		
		try{
			requestMaker.setParams( reqParams );
		}catch(e){
			//TODO: have to mmake error handler
			cosole.log('error!!!!!!!!!!', e);
		}
		requestMaker.execute( generatorName)
	};

	artefactsController.getRegions = function(){
		
		const reqParams = {
			getawey: ajaxUrl + '?' + makeQueryUrl({action: actions.getRegions, nonce: nonces.getRegions}),
			fetchObj: reqSettings.getRegions
		};

		var callbackParams = {
			callback: [{
							method: viewModule.printHTML,
							args: [document.querySelector('#region-selector'), 'afterBegin'],
							context: viewModule
						}]
		};

		getArtifacts({...reqParams, ...callbackParams}, 'getRegions');
		
	};

	artefactsController.getPlaces = function(){

		const reqParams = {
			getawey: ajaxUrl + '?' + makeQueryUrl({action: actions.getPlaces, nonce: nonces.getPlaces}),
			fetchObj: reqSettings.getPlaces
		};

		var callbackParams = {
			callback: [{
							method: viewModule.printHTML,
							args: [document.querySelector('#place-selector'), 'afterBegin'],
							context: viewModule
						}]
		};

		getArtifacts({...reqParams, ...callbackParams}, 'getPlaces');
		
	}

	function createRegion(){
		let region = new Region([...document.querySelectorAll('.new-region-field')]);
		region.saveMe(addRegion);
	}

	function addRegion(){

		const callbackParams = {
			callback: [{
						method: viewModule.printHTML,
						args: [document.querySelector('#region-selector'), 'beforeEnd'],
						context: viewModule
					},
					{
						method: viewModule.clearFields,
						args: [document.querySelectorAll('.new-region-field')],
						context: viewModule
					},
					{
						method: stateController.manageState, //TODO: have to encapsulate state manager. Have to read about module best praktiks
						args: [new RequestMaker().getFromAsyncStorage],
						context: stateController
					}]
		};

		var addRegionForm = {};
		[...document.querySelectorAll('.new-region-field')].forEach(function(field){
			/*TODO: validate fields*/
			addRegionForm[field.name] = encodeURIComponent(field.value);
		});

		addRegionForm.nonce = nonces.postRegion;

		const reqParams = {
			getawey: ajaxurl+'?'+makeQueryUrl({action: actions.postRegion}),
			fetchObj: {...reqSettings.postRegion, ...{body: JSON.stringify(addRegionForm)}}
		};

		addArtifacts({...reqParams, ...callbackParams}, 'addPlace');

	};

	function addPlace(e){
		console.log('in addPlace');
	};

	function selectRegion(e){
		console.log('in selectRegion');
	};

	listeners.addTargets(listenersInitialData);
	listeners.addActions(listenersActions);

	return artefactsController;
})(artefactsController || {});


document.addEventListener('DOMContentLoaded', listeners.initListeners);
document.addEventListener('DOMContentLoaded', artefactsController.getRegions);
document.addEventListener('DOMContentLoaded', artefactsController.getPlaces);
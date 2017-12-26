"use strict"
/*ajaxurl - global wp variable. It has value <protokol> + <site url> + '/wp-admin/admin-ajax.php'
It pablished in page sorce code by PHP (<?php echo admin_url('admin-ajax.php'); ?> ),
or inline added to some JS script.
admin-ajax.php - listen requests and triggers registered functions (eventlisteners)
query parameter action value is name of registered eventlistener function at the backend*/
function getModuleParams(key){
	const allParams = {
		ajaxUrl: ajaxurl,
		actionNodes: {
			button: {
				addRegion: document.querySelector('#add-region'),
				addPlace: document.querySelector('#add-place'),
			},
			select: {
				selectRegion: document.querySelector('#region-selector'),
				selectPlace: document.querySelector('#place-selector')
			},
			field: {
				regionInputs: document.querySelectorAll('.new-region-field'),
				placeInputs: document.querySelectorAll('.new-place-field[type="text"]'),
				placeCheckboxes: document.querySelectorAll('.new-place-field[type="checkbox"]')
			},
		},
		actions: {
			getRegions: 'get_regions',
			postRegion: 'add_region',
			updateRegion: 'update_region',
			deleteRegion: 'delete_region',
			getPlaces: 'get_places',
			postPlace: 'add_place',
			updatePlace: 'update_place',
			deletePlace: 'delete_place'
		},
		nonces: {
			getRegions: adfw_nonces.get_regions,
			postRegion: adfw_nonces.post_region,
			updateRegion: adfw_nonces.update_region,
			deleteRegion: adfw_nonces.delete_region,
			getPlaces: adfw_nonces.get_places,
			postPlace: adfw_nonces.post_place,
			updatePlace: adfw_nonces.update_place,
			deletePlace: adfw_nonces.delete_place
		},
		reqSettings: {
			getRegions: {
					credentials: "same-origin",
					headers: {"Content-Type":"application/json; charset=UTF-8", 'Cache': 'no-cache'},
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
					headers: {"Content-Type":"application/json; charset=UTF-8", 'Cache': 'no-cache'},
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
		}

	};
	return allParams[key];
}

function RequestMaker(){

	let asyncStorage = Object.create(null);

	let params = Object.create(null);
	this.initParams = (request, callback) => {
			params = {...request, ...callback};
		};
	this.getParams = ()=>params;

	this.generator = function* (){
		let fetchObj = yield fetch(this.getParams().getawey, this.getParams().fetchObj);
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

	this.makeQueryUrl = (queryObj, subKey = false)=> Object.keys(queryObj).map((key) => {
		if('object' == typeof queryObj[key]){
			return this.makeQueryUrl(queryObj[key], key);
		}
		if(subKey){
			return encodeURIComponent(subKey)+'['+encodeURIComponent(key)+']' + '=' + encodeURIComponent(queryObj[key]);
		}
		return encodeURIComponent(key) + '=' + encodeURIComponent(queryObj[key]);
	}).join('&');

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

	this.exec = function (generator, value){

		let next = generator.next(value);

		if(!next.done) {
			next.value.then(
				result => {
					this.exec(generator, result);
				},
				error=> {
					generator.throw(error);
				}
			);
		} else {

			this.getParams().callback.forEach((callback)=>{
				let processedRes = processResponse(next.value, callback.keys);
				console.log(callback.args);
				callback.method.apply(callback.context, [processedRes, ...callback.args]);
			});
		}
	}

	function processResponse(res, keys){

		if(!keys || !Array.isArray(keys) || !keys.length) return res;

		let resAsArgument = keys.reduce((obj, key) => {
			return res.hasOwnProperty(key) && {...obj,[key]: res[key]}
		},Object.create(null));
		console.log(resAsArgument);
		return resAsArgument;
	}
};

var listeners = (function(listeners){
	const actionNodes = ()=>getModuleParams('actionNodes');
	var targets = {};
	var actions = {};

	let listenersInitialData = ()=> {
		return {
			click: {
				addRegion: [actionNodes().button.addRegion],
				addPlace: [actionNodes().button.addPlace],
			},
			change: {
				selectTheRegion: [actionNodes().select.selectRegion],
				selectThePlace: [actionNodes().select.selectPlace],
			}
		}
	};
	
	function getTarget(selector){
		return selector && document.querySelector(selector) || false;
	};

	function addListeners(type, listenersData){
		for(var listener in listenersData){
			listenersData[listener].forEach(target => {
				target && target.addEventListener(type, actions[listener])
			});
		}
	};

	function removeListeners(type, listenersData){
		for(var listener in listenersData){
			listenersData[listener].forEach(target => {
				target && target.removeEventListener(type, actions[listener])
			});
		}
	};

	function addTargets(newTargets){
		targets = {...targets, ...newTargets()};
	};

	listeners.addActions = function(newActions){
		actions = {...actions, ...newActions};
	};

	listeners.initListeners = function(){
		addTargets(listenersInitialData);
		for(var key in targets){
			removeListeners(key, targets[key]);
			addListeners(key, targets[key]);
		}
	};

	return listeners;
})(listeners || {});

var viewModule = (function(viewModule){

	viewModule.printHTML = function(data, target, place){
		if(place == 'innerHTML'){
			target.innerHTML = data.fragment||'';
		}else{
			target.insertAdjacentHTML(place, data.fragment);
		}
	};

	let simplifyData = function(data, mainKey=false){
		console.log('mainKey', mainKey);
		return Object.keys(data).reduce((copy, key)=>{
			console.log('key', key);
			console.log('data[key] type is: ', Object.prototype.toString.call(data[key]).slice(1,-1).split(' ').slice(-1).join());
			if(Object.prototype.toString.call(data[key]).slice(1,-1).split(' ').slice(-1).join() === 'GeneratorFunction'){
				return copy;
			}else if(Object.prototype.toString.call(data[key]).slice(1,-1).split(' ').slice(-1).join() === 'Function'){
				return copy;
			}else if(Object.prototype.toString.call(data[key]).slice(1,-1).split(' ').slice(-1).join() === 'Object'){
				return {...copy, ...simplifyData(data[key], mainKey && mainKey+key || key)};
			}else if(mainKey){
				return {...copy, ...{[mainKey+key]: data[key]}};
			}else{
				return {...copy, ...{[key]: data[key]}};
			}
		}, Object.create(null));
	}

	viewModule.fillFields = function(res, target, data){
		//check is property type is Object. Only fot 2 deepth
		//maybe need new ectended function!!!
		let simpleData = simplifyData(data);
		console.log('simpleData', simpleData);
		/*let simpleData = Object.keys(data).reduce((copy, key)=>{
			console.log(key);
			console.log(Object.prototype.toString.call(data[key]).slice(1,-1).split(' ').slice(-1).join());
			if(Object.prototype.toString.call(data[key]).slice(1,-1).split(' ').slice(-1).join() === 'GeneratorFunction'){
				return copy;
			}else if(Object.prototype.toString.call(data[key]).slice(1,-1).split(' ').slice(-1).join() === 'Function'){
				return copy;
			}else if(Object.prototype.toString.call(data[key]).slice(1,-1).split(' ').slice(-1).join() === 'Object'){
				return {...copy, ...data[key]};
			}else{
				return {...copy, ...{[key]: data[key]}};
			}
		}, Object.create(null));*/

		target.forEach((field)=> {
			field.value = decodeURIComponent(simpleData[field.name]);
		});
	};

	viewModule.checkFields = function(res, target, data){
		//check is property type is Object. Only fot 2 deepth
		//maybe need new ectended function!!!
		let simpleData = simplifyData(data);
		/*let simpleData = Object.keys(data).reduce((copy, key)=>{
			if(Object.prototype.toString.call(data[key]).slice(1,-1).split(' ').slice(-1).join() === 'Object'){
				return {...copy, ...data[key]};
			}else{
				return {...copy, ...{[key]: data[key]}};
			}
		}, Object.create(null));*/

		target.forEach((field)=> {
			field.checked = simpleData[field.name];
		});
	}

	viewModule.clearFields = function(res, target){
		[...target].forEach(nodeElem => nodeElem.value = '');
	}

	return viewModule;
})(viewModule || {});

function Region(regionData){
	RequestMaker.call(this);
	this.name = regionData.name;
	//TODDO: must finish validation!!!
	let valid = ()=> true;
	this.isValid = ()=> valid;
	
};

Region.prototype.getSome = function(){
	try{
		this.exec(this.generator());
	}catch(e){
		//TODO: have to mmake error handler
		cosole.log('error!!!!!!!!!!', e);
	}
};

Region.prototype.saveMe = function(handler){
	this.isValid() && handler.call(this);
	try{
		this.exec(this.generator());
	}catch(e){
		//TODO: have to mmake error handler
		cosole.log('error!!!!!!!!!!', e);
	}
};

Region.prototype.updateMe = function(handler){
	this.isValid() && handler(this.name, this.translatedName);
};

Region.prototype.deleteMe = function(handler){
	this.isValid() && handler(this.name, this.translatedName);
};

function Place(placeData){
	RequestMaker.call(this);
	this.region = placeData.region;
	this.name = placeData.name;
	this.address = placeData.address;
	this.working = placeData.working;
	this.payment = placeData.payment;
	//TODDO: must finish validation!!!
	let valid = function(){
		return true;
	};
	this.isValid = ()=> valid;
}

Place.prototype.getSome = function(){
	try{
		this.exec(this.generator());
	}catch(e){
		//TODO: have to mmake error handler
		cosole.log('error!!!!!!!!!!', e);
	}
};

Place.prototype.saveMe = function(handler){
	this.isValid() && handler.call(this);
	try{
		this.exec(this.generator());
	}catch(e){
		//TODO: have to mmake error handler
		cosole.log('error!!!!!!!!!!', e);
	}
};

Place.prototype.updateMe = function(handler){
	this.isValid() && handler(this.name, this.translatedName);
};

Place.prototype.deleteMe = function(handler){
	this.isValid() && handler(this.name, this.translatedName);
};

var artefactsController = (function(artefactsController){
	const actionNodes = ()=> getModuleParams('actionNodes');
	const ajaxUrl = getModuleParams('ajaxUrl');
	const actions = getModuleParams('actions');
	const nonces = getModuleParams('nonces');
	const reqSettings = getModuleParams('reqSettings');

	let state = Object.create(null);
	let stateDispatcher = function(data){
		state = {...getState(), ...data};
	};
	let getState = function (){
		console.log(state);
		return state;
	};

	let getPlaces = (params, callbacks=false) =>{

		params = params && params instanceof HTMLElement? Object.create(null) : params;

		let blankPlace = new Place(Object.create(null));

		const reqParams = {
			getawey: ajaxUrl + '?' + blankPlace.makeQueryUrl({...{action: actions.getPlaces, nonce: nonces.getPlaces}, ...params}),
			fetchObj: reqSettings.getPlaces
		};

		const callbackParams = {
			callback: [{
							method: viewModule.printHTML,
							args: [actionNodes().select.selectPlace, 'innerHTML'],
							context: viewModule,
							keys: ['fragment']
						},
						{
							method: stateDispatcher,
							args: [],
							context: state,
							keys: ['places']
						}]
		};

		if(callbacks && callbacks.length){
			callbackParams.callback = [...callbackParams.callback, ...callbacks];
		}

		blankPlace.initParams(reqParams, callbackParams);
		blankPlace.getSome();
	}

	let multipleData = function(key){
		return {[key]: {}}
	}

	let mergeMultipleObjDeep = function(obj, fieldObj){
		for(let key in fieldObj){
			if('undefined' == typeof(obj[key])){
				obj[key] = fieldObj[key];
			}else{
				obj[key] = mergeMultipleObjDeep(obj[key], fieldObj[key]);
			}
		}
		return obj;
	}

	let createRegion = ()=>{
		//TODO: have to create validation for data have being entered by user
		let initData = [...actionNodes().field.regionInputs].reduce(
			(obj, field)=> {
				let keysArr = field.name.split('__').map((item, index) => {
					if(!index){
						return item;
					}
					return '__'+item;
				});

				let fieldObj = keysArr.reverse().reduce((obj, namePart)=>{
					return {[namePart]: obj}
				}, encodeURIComponent(field.value));
				return mergeMultipleObjDeep(obj, fieldObj);
			}, Object.create(null));

		let region = new Region(initData);

		region.saveMe(addRegionSchema);
	}

	let addRegionSchema = function(){

		const callbackParams = {
			callback: [{
						method: viewModule.printHTML,
						args: [actionNodes().select.selectRegion, 'innerHTML'],
						context: viewModule
					},
					{
						method: viewModule.clearFields,
						args: [[...actionNodes().field.regionInputs]],
						context: viewModule
					},
					{
						method: stateDispatcher, //TODO: have to encapsulate state manager. Have to read about module best praktiks
						args: ['regions'],
						context: state
					}]
		};

		var addRegionForm = {};
		addRegionForm.name = this.name;
		addRegionForm.nonce = nonces.postRegion;

		const reqParams = {
			getawey: ajaxurl+'?'+this.makeQueryUrl({action: actions.postRegion}),
			fetchObj: {...reqSettings.postRegion, ...{body: JSON.stringify(addRegionForm)}}
		};
		this.initParams(reqParams, callbackParams);
	};

	let addPlaceSchema = function(){
		const callbackParams = {
			callback: [{
						method: viewModule.printHTML,
						args: [actionNodes().select.selectPlace, 'innerHTML'],
						context: viewModule
					},
					{
						method: viewModule.clearFields,
						args: [[...actionNodes().field.placeInputs]],
						context: viewModule
					},
					{
						method: stateDispatcher, //TODO: have to encapsulate state manager. Have to read about module best praktiks
						args: ['places'],
						context: state
					}]
		};
		let addPlaceForm = {
			region: this.region,
			name: this.name,
			address: this.address,
			payment: this.payment,
			working: this.working,
			nonce: nonces.postPlace
		};

		const reqParams = {
			getawey: ajaxurl+'?'+this.makeQueryUrl({action: actions.postPlace}),
			fetchObj: {...reqSettings.postPlace, ...{body: JSON.stringify(addPlaceForm)}}
		};
		this.initParams(reqParams, callbackParams);
	}

	let createPlace = (e)=>{
		console.log('in addPlace');
		//TODO: have to create validation for data have being entered by user
		let initData = [...actionNodes().field.placeInputs, ...actionNodes().field.placeCheckboxes].reduce(
			(obj, field)=> {
				let keysArr = field.name.split('__').map((item, index) => {
					if(!index){
						return item;
					}
					return '__'+item;
				});
				let objValue = field.type=='text'? encodeURIComponent(field.value): field.checked;
				let fieldObj = keysArr.reverse().reduce((obj, namePart)=>{
					return {[namePart]: obj}
				}, objValue);
				return mergeMultipleObjDeep(obj, fieldObj);
			}, Object.create(null));
		/*let initData = [...actionNodes().field.placeInputs, ...actionNodes().field.placeCheckboxes].reduce(
			(obj, field)=> {
				let groupKey = field.getAttribute('group');

				if(!groupKey){
					return {...obj, ...{[field.name] : encodeURIComponent(field.value)}};
				}

				if(!obj.hasOwnProperty(groupKey)){
					obj[groupKey] = {};
				}
				if(field.type=='text'){
					obj[groupKey][field.name] = encodeURIComponent(field.value);
				}else if(field.type =='checkbox'){
					obj[groupKey][field.name] = field.checked;
				}
				
				return obj;
			}, {});*/
		console.log('initData', initData);
		let activeRegion = getState().activeRegion;
		initData.region = activeRegion.region_id;
		let place = new Place(initData);

		place.saveMe(addPlaceSchema);
	};

	let getSomeRegion = (searchParams)=> state.regions['region_'+searchParams.id] || false;

	let getSomePlace = (searchParams)=> state.places[searchParams.place_id] || false;

	let selectTheRegion = (e)=>{
		console.log('in selectTheRegion');
		//get region from state++
		//set active region in to the state++
		//create region object by Region constructor++
		//get all region places from DB++
		//print the region data to the region fields++


		let evTarget = e && e.target || event.srcElement;

		const regionId = evTarget.options[evTarget.selectedIndex].value.split('_').slice(-1).join();//undo _
		//get region from state
		const regionState = getSomeRegion({id: regionId});
		const callbackParams = [{
						method: viewModule.clearFields,
						args: [
							[...actionNodes().field.regionInputs, 
							...actionNodes().field.placeInputs, 
							...actionNodes().field.placeCheckboxes]
						],
						context: viewModule
					},
					{
						method: viewModule.fillFields,
						args: [[...actionNodes().field.regionInputs], regionState],
						context: viewModule
					}];
		
		//set active region in to the state
		stateDispatcher({activeRegion: regionState});
		//create region object by Region constructor
		let region = new Region(regionState.name);
		//get all region places from DB & print the region data to the region fields by the callback
		getPlaces({filter:{region: regionState.term_name}}, callbackParams);
	};

	let selectThePlace = (e)=>{
		console.log('in selectThePlace');
		//get place from state++
		//get active region from state++
		//check is active region present++
		//set active place in to the state++
		//create place object by Place constructor++
		//verify is neq place object valid++
		//print the place data to the place fields++


		let evTarget = e && e.target || event.srcElement;
		const placeId = evTarget.options[evTarget.selectedIndex].value.split('_').slice(-1).join();// undo _
		const callbackParams = {
			callback: [{
						method: viewModule.fillFields,
						args: [...actionNodes().field.placeInputs],
						context: viewModule
					},
					{
						method: viewModule.checkFields,
						args: [...actionNodes().field.placeCheckboxes],
						context: viewModule
					},
					{
						method: stateDispatcher,
						args: [{activeRegion: placeId}],
						context: state
					}]
		};
		//get place from state
		let placeState = getSomePlace({place_id: placeId});
		//get active region from state
		let activeRegion = getState().activeRegion;
		//check is active region present
		if('undefined' == typeof activeRegion || !activeRegion.region_id){
			return alert('No active region present into the state!!! Have to make failsController module!!!');
			throw new Error('Ahtung!!!!!!!!!!')
		}
		if(placeState === false || !placeState.region_id){
			return alert('No place present into the state!!! Have to make failsController module!!!');
			throw new Error('Ahtung!!!!!!!!!!')
		}
		//set active place in to the state
		stateDispatcher({activePlace: placeState});
		//create place object by Place constructor
		let place = new Place(placeState);
		//verify is neq place object valid
		if(!place.isValid()){
			return alert('Place object is not valid!!! Have to make failsController module!!!');
		}
		//print the place data to the place fields
		viewModule.fillFields(null, [...actionNodes().field.placeInputs], place);
		viewModule.checkFields(null, [...actionNodes().field.placeCheckboxes], place);

	};

	let deletePlace = (e) =>{
		console.log('in deletePlace');
		//get place from state++
		//get active region from state++
		//check is active region present++
		//set active place in to the state++
		//create place object by Place constructor++
		//verify is neq place object valid++
		//print the place data to the place fields++
	}
	let deleteRegion = (e) =>{
		
	}
	let updateRegion = (e) =>{
		
	}
	let updatePlace = (e) =>{
		
	}

	artefactsController.initRegions = function(params = Object.create(null)){

		params = params && params instanceof HTMLElement? Object.create(null) : params;
		
		let blankRegion = new Region(Object.create(null));

		const reqParams = {
			getawey: ajaxUrl + '?' + blankRegion.makeQueryUrl({...{action: actions.getRegions, nonce: nonces.getRegions}, ...params}),
			fetchObj: reqSettings.getRegions
		};

		const callbackParams = {
			callback: [{
							method: viewModule.printHTML,
							args: [actionNodes().select.selectRegion, 'afterBegin'],
							context: viewModule,
							keys: ['fragment']
						},
						{
							method: stateDispatcher,
							args: [],
							context: state,
							keys: ['regions']
						}]
		};

		blankRegion.initParams(reqParams, callbackParams);
		blankRegion.getSome();
	};

	let listenersActions = {
		addRegion: createRegion,
		addPlace: createPlace,
		selectTheRegion: selectTheRegion,
		selectThePlace: selectThePlace,
		deletePlace: deletePlace
	};

	listeners.addActions(listenersActions);

	return artefactsController;
})(artefactsController || {});


document.addEventListener('DOMContentLoaded', listeners.initListeners);
document.addEventListener('DOMContentLoaded', artefactsController.initRegions);
//document.addEventListener('DOMContentLoaded', artefactsController.getPlaces);
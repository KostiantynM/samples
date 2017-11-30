function SHA1(r){function o(r,o){return r<<o|r>>>32-o}function e(r){var o,e="";for(o=7;o>=0;o--)e+=(r>>>4*o&15).toString(16);return e}var t,a,h,n,C,c,f,d,A,u=new Array(80),g=1732584193,i=4023233417,s=2562383102,S=271733878,m=3285377520,p=(r=function(r){r=r.replace(/\r\n/g,"\n");for(var o="",e=0;e<r.length;e++){var t=r.charCodeAt(e);t<128?o+=String.fromCharCode(t):t>127&&t<2048?(o+=String.fromCharCode(t>>6|192),o+=String.fromCharCode(63&t|128)):(o+=String.fromCharCode(t>>12|224),o+=String.fromCharCode(t>>6&63|128),o+=String.fromCharCode(63&t|128))}return o}(r)).length,l=new Array;for(a=0;a<p-3;a+=4)h=r.charCodeAt(a)<<24|r.charCodeAt(a+1)<<16|r.charCodeAt(a+2)<<8|r.charCodeAt(a+3),l.push(h);switch(p%4){case 0:a=2147483648;break;case 1:a=r.charCodeAt(p-1)<<24|8388608;break;case 2:a=r.charCodeAt(p-2)<<24|r.charCodeAt(p-1)<<16|32768;break;case 3:a=r.charCodeAt(p-3)<<24|r.charCodeAt(p-2)<<16|r.charCodeAt(p-1)<<8|128}for(l.push(a);l.length%16!=14;)l.push(0);for(l.push(p>>>29),l.push(p<<3&4294967295),t=0;t<l.length;t+=16){for(a=0;a<16;a++)u[a]=l[t+a];for(a=16;a<=79;a++)u[a]=o(u[a-3]^u[a-8]^u[a-14]^u[a-16],1);for(n=g,C=i,c=s,f=S,d=m,a=0;a<=19;a++)A=o(n,5)+(C&c|~C&f)+d+u[a]+1518500249&4294967295,d=f,f=c,c=o(C,30),C=n,n=A;for(a=20;a<=39;a++)A=o(n,5)+(C^c^f)+d+u[a]+1859775393&4294967295,d=f,f=c,c=o(C,30),C=n,n=A;for(a=40;a<=59;a++)A=o(n,5)+(C&c|C&f|c&f)+d+u[a]+2400959708&4294967295,d=f,f=c,c=o(C,30),C=n,n=A;for(a=60;a<=79;a++)A=o(n,5)+(C^c^f)+d+u[a]+3395469782&4294967295,d=f,f=c,c=o(C,30),C=n,n=A;g=g+n&4294967295,i=i+C&4294967295,s=s+c&4294967295,S=S+f&4294967295,m=m+d&4294967295}return(A=e(g)+e(i)+e(s)+e(S)+e(m)).toLowerCase()};
function MD5(s){function L(k,d){return(k<<d)|(k>>>(32-d))}function K(G,k){var I,d,F,H,x;F=(G&2147483648);H=(k&2147483648);I=(G&1073741824);d=(k&1073741824);x=(G&1073741823)+(k&1073741823);if(I&d){return(x^2147483648^F^H)}if(I|d){if(x&1073741824){return(x^3221225472^F^H)}else{return(x^1073741824^F^H)}}else{return(x^F^H)}}function r(d,F,k){return(d&F)|((~d)&k)}function q(d,F,k){return(d&k)|(F&(~k))}function p(d,F,k){return(d^F^k)}function n(d,F,k){return(F^(d|(~k)))}function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));return K(L(G,H),F)}function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F)}function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));return K(L(G,H),F)}function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F)}function e(G){var Z;var F=G.length;var x=F+8;var k=(x-(x%64))/64;var I=(k+1)*16;var aa=Array(I-1);var d=0;var H=0;while(H<F){Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=(aa[Z]| (G.charCodeAt(H)<<d));H++}Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=aa[Z]|(128<<d);aa[I-2]=F<<3;aa[I-1]=F>>>29;return aa}function B(x){var k="",F="",G,d;for(d=0;d<=3;d++){G=(x>>>(d*8))&255;F="0"+G.toString(16);k=k+F.substr(F.length-2,2)}return k}function J(k){k=k.replace(/rn/g,"n");var d="";for(var F=0;F<k.length;F++){var x=k.charCodeAt(F);if(x<128){d+=String.fromCharCode(x)}else{if((x>127)&&(x<2048)){d+=String.fromCharCode((x>>6)|192);d+=String.fromCharCode((x&63)|128)}else{d+=String.fromCharCode((x>>12)|224);d+=String.fromCharCode(((x>>6)&63)|128);d+=String.fromCharCode((x&63)|128)}}}return d}var C=Array();var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var U=6,T=10,R=15,O=21;s=J(s);C=e(s);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],j,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],j,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],j,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],j,3299628645);Y=t(Y,X,W,V,C[P+0],U,4096336452);V=t(V,Y,X,W,C[P+7],T,1126891415);W=t(W,V,Y,X,C[P+14],R,2878612391);X=t(X,W,V,Y,C[P+5],O,4237533241);Y=t(Y,X,W,V,C[P+12],U,1700485571);V=t(V,Y,X,W,C[P+3],T,2399980690);W=t(W,V,Y,X,C[P+10],R,4293915773);X=t(X,W,V,Y,C[P+1],O,2240044497);Y=t(Y,X,W,V,C[P+8],U,1873313359);V=t(V,Y,X,W,C[P+15],T,4264355552);W=t(W,V,Y,X,C[P+6],R,2734768916);X=t(X,W,V,Y,C[P+13],O,1309151649);Y=t(Y,X,W,V,C[P+4],U,4149444226);V=t(V,Y,X,W,C[P+11],T,3174756917);W=t(W,V,Y,X,C[P+2],R,718787259);X=t(X,W,V,Y,C[P+9],O,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);V=K(V,g)}var i=B(Y)+B(X)+B(W)+B(V);return i.toLowerCase()};
window.addEventListener('DOMContentLoaded', function() {
	"use strict";
	if (!document.querySelector('#catBox')) {
		return;
	}
	var ajaxModule = (function(ajaxModule) {

		var module_data = {};

		ajaxModule.get_response = function() {
			return module_data.response;
		}
		ajaxModule.controller = function(data) {

			if (data.action && isPresent(['link', 'method'], data.action)) {

				if (data.action.method === "POST") {
					sendData(data);
				}
				if (data.action.method === "GET") {
					//sendData(data);
					getData(data);
				}

			}

			if (data.action && isPresent(['function', 'args', 'context'], data.action) && 'function' == typeof data.action.function) {

				module_data.response = data.action.function.call(data.action.context, data.action.args());
				if (data.callback !== false) {
					ajaxModule.controller(data.callback);
				}

			}

		}

		function change_data(what, where) {
			if ('object' == typeof where) {
				for (key in what) {
					where[key] = what[key];
				}
				return where;
			}
		}

		function isPresent(what, where) {
			if ('object' == typeof where) {
				for (var i = 0, l = what.length; i < l; i++) {
					if (!where[what[i]]) {
						return false;
					}
				}
				return true;
			}
		}

		function createActionPart(actionData) {
			var actionPart = '?',
				dataKeys = Object.keys(actionData).length,
				spliter = '&';
			for (var key in actionData) {
				if (dataKeys-- == 1) {
					spliter = '';
				}
				actionPart += key + '=' + actionData[key] + spliter;

			}
			return actionPart;
		}

		function sendData(multiData) {
			var transferData = multiData.action,
				apiURL = '',
				fetchObj = {},
				fetchData = new FormData();

			for (var elem in multiData.action.link) {
				if (elem == 'action') {
					apiURL += createActionPart(multiData.action.link[elem]);
				} else {
					apiURL += multiData.action.link[elem];
				}
			};

			fetchObj.method = multiData.action.method;
			fetchObj.credentials = multiData.action.credentials;
			fetchObj.headers = multiData.action.headers;

			for (var key in multiData.data) {
				if ('object' == typeof multiData.data[key] && !File.prototype.isPrototypeOf(multiData.data[key])) {
					fetchData.append(key, JSON.stringify(multiData.data[key]));
				} else {
					fetchData.append(key, multiData.data[key]);
				}

			}

			fetchObj.body = fetchData;

			if (multiData.action.timeout) {
				setTimeout(function() {
					fetch(apiURL, fetchObj).then(function(response) {
						return response.json();
					}).then(function(responseObj) {
						module_data.response = responseObj;
						if (multiData.callback !== false) {
							ajaxModule.controller(multiData.callback);
						}
					})
				}, multiData.action.timeout);
			} else {
				fetch(apiURL, fetchObj).then(function(response) {
					return response.json();
				}).then(function(responseObj) {
					module_data.response = responseObj;
					if (multiData.callback !== false) {
						ajaxModule.controller(multiData.callback);
					}
				})
			}
		}

		function getData(multiData) {
			var transferData = multiData.action,
				apiURL = '',
				fetchObj = Object.create(null),
				fetchData = new FormData();

			for (var elem in multiData.action.link) {
				if (elem == 'action') {
					apiURL += createActionPart(multiData.action.link[elem]);
				} else {
					apiURL += multiData.action.link[elem];
				}
			};

			for (var key in multiData.action.link.request) {
				apiURL += multiData.action.link.request[elem];
			};

			fetchObj.method = multiData.action.method;
			fetchObj.credentials = multiData.action.credentials;
			fetchObj.headers = multiData.action.headers;

			fetch(apiURL, fetchObj).then(function(response) {
				return response.json();
			}).then(function(responseObj) {
				module_data.response = responseObj;
				if (multiData.callback !== false) {
					ajaxModule.controller(multiData.callback);
				}
			});
		}

		return ajaxModule;

	}(ajaxModule || {}));

	/*var*/ window.ymlcModule = (function(ymlcModule) {

		const productKeys = ['default_size', 'uploaded_photos', 'measureInfo', 
						'translatedMeasureInfo', 'name', 'translatedName', 'params', 'translatedParams', 
						'post_title', 'premalink', 'translatedUrl', 'price', 'description', 'variations',
						'offerId', 'ID', 'categoryId'],
				variationsKeys = ['ID', 'variation_description', '_variation_description_uk', 
								'_price', '_regular_price'],
				paramsKeys = ['colors', 'composition', 'event', 'flowers', 'hight', 'quantity', 'size', 'type'],
				properties = {
					default_size: 'размер по умолчанию',
					uploaded_photos: 'фотографии',
					measureInfo: 'размер (высота, диаметр)',
					translatedMeasureInfo: 'размер Укр версии (высота, диаметр)',
					name: 'название для прайса',
					translatedName: 'название для Укр версии',
					params: 'параметры',
					translatedParams: 'параметры для Укр версии',
					post_title: 'название',
					premalink: 'URL',
					translatedUrl: 'URL для Укр версии',
					price: 'цена',
					description: 'описание',
					variations: 'вариации',
					offerId: 'артикул',
					ID: 'id товара в базе',
					categoryId: 'id категории товара',
					variation_description: 'описание вариации',
					_variation_description_uk: 'описание вариации для Укр версии',
					_price: 'цена вариации',
					_regular_price: 'цена вариации',
					colors: 'цветовая гамма',
					composition: 'состав букета',
					event: 'события',
					flowers: 'цветы в составе',
					hight: 'высота',
					quantity: 'количество цветов в букете',
					size: 'размер',
					type: 'тип',
				};

		var homeUrl = window.location.protocol + '//' + window.location.host,
			prodSearch = document.querySelector('#prodSearch'),
			catSearch = document.querySelector('#catSearch'),
			langTrigger = document.querySelector('#lang'),
			tabsContainer = document.querySelector('.tabs-wrap'),
			tabsCategoriesContainer = document.querySelector('#categories-tabs'),
			priceDataContainer = document.querySelector('#price-data-tabs'),
			priceDataOffers = document.querySelector('#offers-wrap'),
			priceDataMainRefresh = document.querySelector('#refresh-cutegories-data'),
			saveBtn = document.querySelector("#save-price"),
			verifyBtn = document.querySelector('#verify-btn'),
			categoriesFilter = document.querySelector('#catSearch'),
			moduleData = {},
			priceData = {};

		categoriesFilter.addEventListener('input', filterAction);

		function filterAction(e){
			var evTarget = e&&e.target||event.srcElement,
				targetId = evTarget.getAttribute('target'),
				inputs = document.querySelectorAll('#'+targetId+' input');
			for(let input of inputs){
				if(input.value.toLowerCase().indexOf(evTarget.value.toLowerCase())==-1){
					input.parentElement.classList.add('hide-this');
				}else{
					input.parentElement.classList.remove('hide-this');
				}
			}
		}

		ymlcModule.getPriceData = function(){
			return priceData;
		}
		ymlcModule.getModuleData = function(){
			return moduleData;
		}

		priceData.curLang = 'ru';
		moduleData.categories = Object.create(null);

		document.querySelector('#catBox').addEventListener('click', categoriesController);
		tabsContainer.addEventListener('click', tabsController);
		tabsCategoriesContainer.addEventListener('click', subTabsController);
		priceDataContainer.addEventListener('click', subTabsController);
		langTrigger.addEventListener('click', swithLang);
		priceDataOffers.addEventListener('click', offersController/*.bind(priceData)*/);
		saveBtn.addEventListener('click', saveYML/*.bind(priceData)*/);
		window.addEventListener('load', getCategories);
		priceDataMainRefresh.addEventListener('click', setDataMain.bind(priceData));
		document.querySelector('#verify-btn').addEventListener('click', verifyYml);


		function saveLoadPublishControllerbind(res){
			console.log(res);
		}

		function saveYML(){

			let ymlContentContainer = document.querySelector('#content-container'),
				/*YML = getPriceObject.call(priceData),*/
				data = Object.create(null);

			data.workName = document.querySelector('#work-name').value||false;
			data.priceConstructorData = priceData;
			data.YMLobj = getPriceObject.call(priceData);

			if(data.priceConstructorData && data.YMLobj && data.workName){
				let headers = {
						'Cache': 'no-cache',
						"content-disposition": "attachment; filename='test.png'",
					},
					actionData = {
							action: 'ymlc_request',
						},
						verifyResults = {
							action: {
								function: saveLoadPublishControllerbind,
								args: ajaxModule.get_response,
								context: ajaxModule
							},
							callback: false
						},
						saveWork = {
							action: {
								link: {
									home: ymlc_data.ajax_url,
									action: actionData
								},
								method: "POST",
								credentials: "same-origin",
								headers: headers
							},
							data: {
								action: 'ymlc_request',
								target: 'save_work',
								data: data,
								nonce: ymlc_data.ymlc_nonce
							},
							callback: verifyResults
						};
				ajaxModule.controller(saveWork);
			}

		}

		function verifyYml(){

		}

		function loadDataMainFields(data, checkInputData = false){

			var priceDataMainFields = document.querySelectorAll('#price-data-main .main-data-field');

			for(let field of priceDataMainFields){
				let replace = false;
				if(checkInputData && data[field.name] !=field.value && field.value.length){
					replace = confirm('В поле '+field.name+' введены данные:'
										+field.value +' перезаписать их на: '+ data[field.name]+' ?');
				}
				if(replace || !field.value.length){
					field.value = data[field.name];
				}
			}
		}

		function setDataMain(e){
			var priceDataMainFields = document.querySelectorAll('#price-data-main .main-data-field'),
				mainData = Object.create(null),
				loadedData = e.company&&e||null;

			if(loadedData){
				for(let key in loadedData){
					Object.defineProperties(mainData, {
						[key]: {
							configurable: false,
							enumerable: true,
							/*writable: true,*/
							get: function(){
									return setField(key, prepareString(loadedData[key])) || false;
								}
						}
					});
				}
				return this.priceMainData = mainData;
			}else{
				for(let field of priceDataMainFields){
					Object.defineProperties(mainData, {
						[field.name]: {
							configurable: false,
							enumerable: true,
							/*writable: true,*/
							get: function(){
									return verifyField(field) && prepareString(field.value) || false;
								}
						}
					});
				}

				this.priceMainData = mainData;
			}
		}

		function subTabsController(e){
			var evTarget = e&&e.target||event.srcElement,
				categoryId = evTarget.id.split('-').slice(-1).join();

			if (evTarget.classList.contains('active')) {
				return false;
			}

			if(!isNaN(categoryId)){
				priceData.active = categoryId;
			}
			

			if (evTarget.classList.contains('category-tab')) {
				let activeTab = document.querySelector('.category-tab.active')
								||document.querySelector('.category-tab'),
					activeTabContainer = document.querySelector('.category-galery-container.active')
										||document.querySelector('.category-galery-container');
				activeTab.classList.remove('active');
				evTarget.classList.add('active');

				activeTabContainer.classList.add('hide-this');
				activeTabContainer.classList.remove('active');

				var categoryId = evTarget.id.split('-').slice(-1).join();

				activeTabContainer = document.querySelector('#category-galery-' + categoryId);

				activeTabContainer.classList.remove('hide-this');
				activeTabContainer.classList.add('active');
			}
			if(evTarget.classList.contains('category-tab')&&getParentElement(evTarget, 'id', 'galery')){
				let categoryId = evTarget.id.split('-').slice(-1).join();
				showFlash(priceData.selected[categoryId].selectedProducts, categoryId);
				
			}
			if (evTarget.classList.contains('price-data-tab')) {
				let activeTab = document.querySelector('.price-data-tab.active')
								||document.querySelector('.price-data-tab'),
					activeTabContainer = document.querySelector('.price-data-container.active')
										||document.querySelector('.price-data-container');
				activeTab.classList.remove('active');
				evTarget.classList.add('active');

				activeTabContainer.classList.add('hide-this');
				activeTabContainer.classList.remove('active');

				var categoryId = evTarget.id.split('-').slice(-1).join();

				activeTabContainer = document.querySelector('#price-data-' + categoryId);

				activeTabContainer.classList.remove('hide-this');
				activeTabContainer.classList.add('active');
			}
		}

		function tabsController(e) {
			var evTarget = e && e.target || event.srcElement,
				activeTab = document.querySelector('.tab.active'),
				activeTabContainer = document.querySelector('.tab-container.active');
			if (evTarget.classList.contains('active')) {
				return false;
			}
			if (evTarget.classList.contains('tab')) {
				activeTab.classList.remove('active');
				evTarget.classList.add('active');

				activeTabContainer.classList.add('hide-this');
				activeTabContainer.classList.remove('active');

				var tabContainerId = evTarget.id.split('-').slice(0, -1).join('-');

				activeTabContainer = document.querySelector('#' + tabContainerId);

				activeTabContainer.classList.remove('hide-this');
				activeTabContainer.classList.add('active');
				printTabContent(tabContainerId);
			}
		};

		function setField(fieldId, value){
			var priceDataMainField = document.querySelectorAll('#'+fieldId);
			if(priceDataMainField){
				priceDataMainField.value = value;
				return value;
			}
		}

		function verifyField(field){
			if(!field.required){
				return true;
			}else if(!field.value.length && !field.classList.contains('error')){
				field.classList.toggle('error');
				field.placeholder = "Обязательно заполните!!!";
				field.focus();
				return false;
			}else if(field.value.length && field.classList.contains('error')){
				field.classList.toggle('error');
				field.placeholder = "";
				return true;
			}else if(field.value.length && !field.classList.contains('error')){
				return true;
			}else {
				field.classList.toggle('error');
				field.placeholder = "Обязательно заполните!!!";
				field.focus();
				return false;
			}
		}

		function showHideOffer(productId){
			let errors = document.querySelectorAll('#price-data-offer-params-'+productId+' .offer-params-field.error'),
				wrappers = document.querySelectorAll('#price-data-offer-params-'+productId+' .price-data-field-wrap'),
				showOffer = document.querySelector('#show-offer-'+productId);
			if(errors.length){
				return false;
			}else{
				for(let wrap of wrappers){
					wrap.classList.toggle('hide-this');
				}
				let offerBlock = document.querySelector('#price-data-offer-params-'+productId);
				offerBlock.classList.toggle('closed');
				offerBlock.classList.contains('closed')&&offerBlock.classList.add('complit');
				return true;
				//showOffer.classList.toggle('hide-this');
			}
		}

		function getOfferFieldsData(buttonId){
			var offerId = buttonId.split('-').slice(-1).join(),
				offerParamsBlock = document.querySelector('#price-data-offer-params-'+offerId);
			if(offerParamsBlock){
				//offerParamsBlock.classList.toggle('closed');
				let fields = offerParamsBlock.querySelectorAll('.offer-params-field'),
					offerParams = Object.create(null),
					translatedParams = Object.create(null);
				for(let field of fields){
					let paramKey = field.id.split('-').slice(-2,-1).join();
					let lang = field.id.split('-').slice(-3,-2).join()=='uk'?'uk':false;
					if(lang){
						translatedParams[paramKey] = verifyField(field)&&prepareString(field.value)||false;
						continue;
					}
					offerParams[paramKey] = verifyField(field)&&prepareString(field.value)||false;
				}
				offerParamsBlock.classList.add('complit');
				return showHideOffer(offerId) && {id:offerId,params:offerParams,translatedParams:translatedParams} || false;
			}

			return false;
		}

		function checkOfferParamFields(categoryId){
			var fields= Object.create(null);

			fields.offerNamePrefix = document.querySelector('#offer-name-prefix-'+categoryId),
			fields.offerNameUkPrefix = document.querySelector('#offer-name-uk-prefix-'+categoryId),
			fields.offerType = document.querySelector('#offer-type-'+categoryId);
			fields.offerTypeUk = document.querySelector('#offer-type-uk-'+categoryId);

			for(let key in fields){
				if(!fields[key].value.length){
					fields[key].focus();
					fields[key].classList.add('error');
					return false;
				}else{
					fields[key].classList.remove('error');
				}
			}
			return true;
		}

		function getCategoryParent(categoryId, lang){
			let tree = Object.create(null),
				categories = moduleData.categories.all[lang];

			tree.id = categoryId;
			tree.name = categories[categoryId].name;
			tree.parentId = categories[categoryId].parent;

			if(Number(tree.parentId)){
				tree.parentName = categories[tree.parentId].name;
			}
			return tree;
		}

		function makeCategoriesTree(categoryId, lang = priceData.curLang){
			let tree = getCategoryParent(categoryId, lang),
				fullTree = [];
			fullTree.push(tree);
			if(!Number(tree.parentId)){
				return fullTree;
			}
			while(Number(tree.parentId)){
				tree = getCategoryParent(tree.parentId, lang);
				fullTree.push(tree);
			}
			return fullTree.reverse();
		}

		function getVariationBy(key, value, variations){
			var variation;
			variations.forEach(function(item){
				if(item[key] == value){
					variation = item;
				}
			});
			return variation;
		}

		function offersController(e){

			var evTarget = e&&e.target||event.srcElement,
				offerParamsData = evTarget.type == 'button'&&getOfferFieldsData(evTarget.id)||false,
				/*categoryId = this.active,*/
				categoryId = priceData.active;
			if(evTarget.classList.contains('show-hide-offer')&&checkOfferParamFields(categoryId)){
				showHideOffer(evTarget.getAttribute('offer-control'));
			}

			if(evTarget.classList.contains('offer-params-variation')&&evTarget.type=='radio'){
				let checkedVariation = evTarget.parentElement.querySelector('.offer-params-variation[checked]'),
					productId = evTarget.name.split('-').slice(-1).join(),
					variations = priceData.selected[categoryId].selectedProducts[productId].variations,
					variationId = evTarget.id.split('-').slice(-1).join(),
					price = getVariationBy('ID', variationId, variations)._price,
					productPriceField = document.querySelector('#offer-params-price-'+checkedVariation.id.split('-').slice(-1).join());

				checkedVariation.hasAttribute('checked')&&checkedVariation.removeAttribute('checked');
				evTarget.setAttribute('checked', '');
				productPriceField.id = 'offer-params-price-'+variationId;
				productPriceField.value = price;
			}
			
			if(offerParamsData){
				let product = priceData.selected[categoryId].selectedProducts[offerParamsData.id],
					data = moduleData.categories.all[priceData.curLang][categoryId].products[offerParamsData.id],
					translatedData = moduleData.categories.all['uk'][data.translated_category].products[data.translated_product];
				priceData.selected[categoryId].namePrefix = prepareString(document.querySelector('#offer-name-prefix-'+categoryId).value)+' ';
				priceData.selected[categoryId].translatedNamePrefix = prepareString(document.querySelector('#offer-name-uk-prefix-'+categoryId).value)+' ';

				product.offerId = data._sku;
				product.available = true;
				product.name = prepareString(priceData.selected[categoryId].namePrefix + '&quot;'+data.post_title+'&quot;');
				product.translatedName = prepareString(priceData.selected[categoryId].namePrefix + '&quot;'+translatedData.post_title+'&quot;');
				product.url = data.premalink;
				product.translatedUrl = translatedData.premalink;
				product.price = offerParamsData.params.price||data._price||data.price;

				product.categoryId = categoryId;
				product.translatedCategoryId = data.translated_category;
				//product.pictures = product.pictures;
				product.description = prepareString(data.woo_obj.post.post_content);
				product.translatedDescription = prepareString(translatedData.woo_obj.post.post_content);

				product.measureInfo = product.variations
										&&getVariationBy('_price', product.price, product.variations).variation_description
										||data.woo_obj.post.post_excerpt;
				product.translatedMeasureInfo = translatedData.variations
										&&getVariationBy('_price', product.price, translatedData.variations)._variation_description_uk
										||translatedData.woo_obj.post.post_excerpt;
				product.params = {
					flowers:{
						display : 'Цветы в составе',
						value : prepareMultiParams(data.woo_obj.post.post_excerpt, 'Состав:')
					},
					type:{
						display:'Тип',
						value: prepareString(priceData.selected[categoryId].type)
					},
					event:{
						display:"Событие",
						value: false,
					},
					composition: {
						display: "Состав букета",
						value: false
					},
					colors: {
						display: 'Цветовая гамма',
						value: false
					},
					size: {
						display: 'Размер',
						value: false
					},
					hight: {
						display: 'Высота',
						value: prepareMultiParams(product.measureInfo, 'высота\\s(\\d.)\\s?см',true),
						unit: 'см',
						displayTranslated: 'Висота'
					},
					quantity: {
						display: 'Количество цветов в букете',
						value: false,
						unit: 'шт',
						displayTranslated: 'Кількість квітів у букеті'
					}
				};

				product.translatedParams = {
					flowers:{
						display : 'Квіти в складі',
						value : prepareMultiParams(translatedData.woo_obj.post.post_excerpt, 'Склад:')
					},
					type:{
						display:'Тип',
						value: prepareString(priceData.selected[categoryId].typeTranslated)
					},
					event:{
						display:"Подія",
						value: false,
					},
					composition: {
						display: "Склад букета",
						value: false
					},
					colors: {
						display: 'Колірна гамма',
						value: false
					},
					size: {
						display: 'Розмір',
						value: false
					}
				};

				priceData.selected[categoryId].categoriesTree = makeCategoriesTree(categoryId);
				//TODO: change on translated category id
				priceData.selected[categoryId].translatedCategoriesTree = makeCategoriesTree(moduleData.categories.all['ru'][categoryId].products[product.ID].translated_category, 'uk');
				priceData.selected[categoryId].selectedProducts[product.ID] = product;
				
				priceData.selected[categoryId].selectedProducts[offerParamsData.id].params.type.value = priceData.selected[categoryId].type;
				for(let key in offerParamsData.params){
					if(!priceData.selected[categoryId].selectedProducts[offerParamsData.id].params[key]) continue;
					priceData.selected[categoryId].selectedProducts[offerParamsData.id].params[key].value = offerParamsData.params[key];
				}
				for(let key in offerParamsData.translatedParams){
					priceData.selected[categoryId].selectedProducts[offerParamsData.id].translatedParams[key].value = offerParamsData.translatedParams[key];
				}
				console.log(priceData);
			}
		}

		function getCategoryData(catId){
			let result = false,
				categoryObj = Object.create(null);
			moduleData.categories.all.ru.forEach(function(item){
				if(result){
					return;
				}
				if(item.term_id == catId){
					categoryObj.ru = item;
				}
			});
			moduleData.categories.all.uk.forEach(function(item){
				if(result){
					return;
				}
				if(item.term_id == catId){
					categoryObj.uk = item;
				}
			});
			if(Object.keys(categoryObj).length){
				return categoryObj;
			}else{
				return false;
			}
		}

		function makeCategoryBlock(categoryId, parent){
			let categoryBlock = document.createElement('div'),
				categoryTab = document.createElement('div'),
				categoryObj = moduleData.categories.all[priceData.curLang][categoryId];
			categoryBlock.id = 'category-galery-'+categoryId;
			categoryBlock.classList.add('category-galery-container', 'hide-this');

			categoryTab.id = 'category-tab-'+categoryId;
			categoryTab.classList.add('category-tab');
			categoryTab.innerText = categoryObj.name;

			document.querySelector('#categories-tabs').appendChild(categoryTab);
			parent.appendChild(categoryBlock);
			return categoryBlock;
		}
		//TODO: have to finish
		function publishVariationSelector(product){
			return '';
		}

//productId, product, categoryBlock, categoryId, tab
		function makeProductBlock(product, parent, categoryId, type){
			/*if(document.querySelector('#product-galery-'+product.ID)
				&&document.querySelector('#price-data-'+product.ID)){
				return;
			}*/
			if(type == 'galery' && !document.querySelector('#product-galery-'+product.ID)){

				let productGalery = document.createElement('div'),
					categoryGalery = document.querySelector('#category-galery-'+categoryId),
					addPhotoInput = document.createElement('input'),
					photoContainer = document.createElement('div'),
					productInfo = document.createElement('div');

				

				productGalery.id = 'product-galery-'+product.ID;
				productGalery.classList.add('photo-gallery-child');

				productInfo.id = 'product-info-'+product.ID;
				productInfo.classList.add('product-info');
				productInfo.innerHTML = '<h3><a target="_blank" href="'+product.premalink+'">'+product.post_title+'</a></h3>';

				photoContainer.id = 'links-'+product.ID;
				photoContainer.classList.add('product-images');

				addPhotoInput.type = 'file';
				addPhotoInput.id = 'add-photo-to-'+product.ID;
				addPhotoInput.name = 'add-photo-to-'+product.ID;
				addPhotoInput.classList.add('lazy-load-flash');
				addPhotoInput.accept = 'image';

				productGalery.appendChild(productInfo);
				productGalery.appendChild(addPhotoInput);
				productGalery.appendChild(photoContainer);
				parent.appendChild(productGalery);

				//if(product.uploaded_photos.length){
					product.uploaded_photos.forEach(function(image){
						let data = {
							files:[image] + (image.indexOf('jpg')==-1?'.jpg':''),
							url: this.url,
							product:this.product
						};
						publishImage(this.categoryId, false, data, true);
					}.bind({categoryId:categoryId, url:product.photosUrl, product:product.ID}));
				//}
			}
			if(type == 'galery' && !product.uploaded_photos.length && product.pictures && Object.keys(product.pictures).length){
				for(let key in product.pictures){
					product.uploaded_photos.push(product.pictures[key]);
				}
					product.uploaded_photos.forEach(function(image){
						let data = {
							files:[image] + (image.indexOf('jpg')==-1?'.jpg':''),
							url: this.url,
							product:this.product
						};
						publishImage(this.categoryId, false, data, true);
					}.bind({categoryId:categoryId, url:product.photosUrl, product:product.ID}))
			}
				
			if(type == 'price-data' && !document.querySelector('#price-data-offer-params-'+product.ID)){

				//product.ymlObj = product.ymlObj || Object.create(null);

                let productPriceData = document.createElement('div'),
					categoryPriceData = document.querySelector('#price-data-'+categoryId),
					customHTML = '<h3><a href="'+product.premalink+'" target="_blank">'+product.post_title+'</a></h3>';

				customHTML+= publishVariationSelector(product);
				//<param name="Событие">День знаний, День Рождения, Рождение ребенка, Свидание</param>
				customHTML+= '<div class="price-data-field-wrap hide-this"><label for="offer-params-event-'
							+product.ID+'">Добавьте события через запятую</label><input type="text" id="offer-params-event-'
							+product.ID+'" class="offer-params-field" placeholder="День знаний, День Рождения, Рождение ребенка, Свидание" required>'
							+'<label for="offer-params-uk-event-'+product.ID+'" >Переклад'
							+'</label><input type="text" id="offer-params-uk-event-'+product.ID+'" class="offer-params-field" placeholder="День знань, День Народження, Народження дитини" required></div>';
				//<param name="Состав букета">оазис, упаковка, летны, зелень, астра, роза, геооргина, лимониум, ягоды, фисташка</param>
				customHTML+= '<div class="price-data-field-wrap hide-this"><label for="offer-params-composition-'
							+product.ID+'">Введите состав букета</label><input type="text" id="offer-params-composition-'
							+product.ID+'" class="offer-params-field" placeholder="оазис, упаковка, летны, зелень, астра, роза, геооргина, лимониум, ягоды, фисташка" '
							+'required><label for="offer-params-uk-composition-'+product.ID+'">Переклад</label>'
							+'<input type="text" id="offer-params-uk-composition-'+product.ID+'" class="offer-params-field" placeholder="оаза, пакунок, стрічки, астра, троянда, фісташка" required></div>';
				//<param name="Цветовая гамма">розово-фиолетовая</param>
				customHTML+= '<div class="price-data-field-wrap hide-this"><label for="offer-params-colors-'
							+product.ID+'">Добавьте цветовую гамму</label><input type="text" id="offer-params-colors-'
							+product.ID+'" class="offer-params-field" placeholder="розово-фиолетовая" required><label for="offer-params-uk-colors-'
							+product.ID+'">Переклад</label><input type="text" id="offer-params-uk-colors-'
							+product.ID+'" class="offer-params-field" placeholder="рожево-фіолетова" required></div>';
				//<param name="Размер">средний</param>
				customHTML+= '<div class="price-data-field-wrap hide-this"><label for="offer-params-size-'
							+product.ID+'">Введите размер </label><input type="text" id="offer-params-size-'
							+product.ID+'" class="offer-params-field" placeholder="маленький, средний, большой" required><label for="offer-params-uk-size-'
							+product.ID+'">Переклад </label><input type="text" id="offer-params-uk-size-'
							+product.ID+'" class="offer-params-field" placeholder="маленький, середній, великий" required></div>';
				//<param name="Количество цветов в букете" unit="шт">15</param>
				customHTML+= '<div class="price-data-field-wrap hide-this"><label for="offer-params-quantity-'+product.ID+'">Количество цветов в букете</label><input type="number" id="offer-params-quantity-'+product.ID+'" class="offer-params-field"></div>';
				//for variations
				if(product.variations){
					customHTML+= '<div class="price-data-field-wrap hide-this"><label for="offer-params-variations-'+product.ID+'">Выберете вариацию товара</label>';
					let offerParamVariation = false;
					for(let variation of product.variations){
						offerParamVariation = offerParamVariation||variation.attribute_pa_size==product.default_size&&variation;
						let checked = //variation.attribute_pa_size==product.default_size
									product.price
									&&product.price==variation._price
									&&'checked'
									||(!product.price
									&&variation.attribute_pa_size==product.default_size
									&&'checked')
									||'';
									//||variation.attribute_pa_size!=product.default_size
									//&&product.price==variation._price
									//'';
						customHTML+='<input name="group-'+product.ID+'" type="radio" id="offer-params-variation-'+variation.ID+'" '+checked+' class="offer-params-variation field">';
						customHTML+='<label for="offer-params-variation-'+variation.ID+'">Размер - '+variation.attribute_pa_size+', цена-'+variation._price+'грн.</label>';
					}
					customHTML+='<input type="text" id="offer-params-price-'+offerParamVariation.ID+'" value="'+(offerParamVariation['_price']||'')+'" class="offer-params-field" style="display:none">';
					customHTML+='</div>';

				}

				//button
				customHTML+= '<div class="price-data-field-wrap hide-this"><input type="button" id="offer-params-submit-'+product.ID+'" value="Добавить" ></div>';
				//show offer parametres fields
				customHTML+= '<div id = "show-offer-'+product.ID+'" class="price-data-field-wrap"><a href="javascript:void(0)" offer-control="'+product.ID+'" class="show-hide-offer">Раскрыть</a></div>';
				

				productPriceData.id = "price-data-offer-params-"+product.ID;
				productPriceData.classList.add('priсe-data-offer-wrap', 'closed');
				productPriceData.insertAdjacentHTML('afterBegin', customHTML);
				categoryPriceData.appendChild(productPriceData);
					
			}	
		}

		function prepareMultiParams(value, key, expr=false){

			var expr = expr && new RegExp(key, 'i') || new RegExp(key+'(.*)', 'i'),
				result = value.match(expr);
			if(result){
				value = result[1];
			}else{
				debugger;
				value = false;
			}
			return value;
		}

		function prepareString(value){
			if('string' == typeof value){
				value = value.replace(/<[^>]*>/g, '');
				value = value.replace( /"/g, "&quot;" );
				value = value.replace( /»/g, "&quot;" );
				value = value.replace( /«/g, "&quot;" );
				value = value.replace( /`/g, "&apos;" );
				value = value.replace( /'/g, "&apos;" );
				value = value.replace( / Воспользуйтесь услугами интернет-магазина цветов и доставка букета не отнимет у Вас драгоценное время./g, "" );
				value = value.replace( / Скористайтеся послугами інтернет-магазину квітів TORY ART і доставка букета не відніме у Вас дорогоцінний час./g, "" );
				value = value.replace( /, сделайте заказ в интернет-магазине, и мы доставим букет адресату/g, "" );
				value = value.replace( /, зробіть замовлення в інтернет-магазині, і ми доставимо букет адресатові/g, "" );
				value = value.replace( /Интернет-магазин цветов Tory Art предлагает/g, "Предлагаем" );
				value = value.replace( /Інтернет-магазин квітів TORY ART пропонує/g, "Пропонуємо" );
				value = value.replace( / Интернет магазин цветов Tory Art поможет Вам быстро решит эту задачу./g, "" );
				value = value.replace( / Інтернет магазин квітів TORY ART допоможе Вам швидко вирішити це завдання./g, "" );
				value = value.replace( /Интернет-магазин цветов Tory Art предлагает свежую и интересную идею букета на день знаний. /g, "" );
				value = value.replace( /Інтернет-магазин квітів TORY ART пропонує свіжу і цікаву ідею букета на день знань. /g, "" );

				value = value.replace( /Интернет-магазин цветов Tory Art с радостью поможет Вам решит поставленную задачу. /g, "" );
				value = value.replace( /Інтернет-магазин квітів TORY ART з радістю допоможе Вам вирішити поставлене завдання. /g, "" );
				value = value.replace( /Наш интернет – магазин решит Ваши задачи. /g, "" );
				//value = value.replace( //g, "" );
				value = value.replace( /Интернет магазин цветов поможет Вам быстро, а главное качественно решит эту задачу. /g, "" );
				//value = value.replace( //g, "" );
			}
			return value;
		}

		function decodeURIComponentX( str ) {
			var out = "", arr, i = 0, l, x;
			arr = str.split(/(%(?:D0|D1)%.{2})/);
			for ( l = arr.length; i < l; i++ ) {
				try {
					x = decodeURIComponent( (arr[i]+"").replace(/\+/g, "%20") );
				} catch (e) {
					x = arr[i];
				}
				out += x;
			}
			return out;
		};

		function removeProductImage(e){
			var evTarget = e&&e.target||event.srcElement,
				imageContainer,
				headers = {
					'Cache': 'no-cache',
					"content-disposition": "attachment; filename='test.png'",
				};
			if(!evTarget.classList.contains('delete-photo-button')){
				return;
			}
			if(imageContainer = getParentElement(evTarget, 'class', 'drug-drop')){
				var photo_id = imageContainer.getAttribute('img-hash'),
					categoryId = getParentElement(evTarget, 'class', 'category-galery-container').id.split('-').slice(-1).join(),
					productId = evTarget.id.split('-').slice(-1).join(),
					counter = Object.keys(priceData.selected[categoryId].selectedProducts[productId].pictures).length,
					actionData = {
						action: 'ymlc_request',
					},
					wp_change_data_callback = {
						action: {
							function: removeHtmlElement.bind(priceData, productId, categoryId),
							args: ajaxModule.get_response,
							context: ajaxModule
						},
						callback: false
					},
					upload_file = {
						action: {
							link: {
								home: ymlc_data.ajax_url,
								action: actionData
							},
							method: "POST",
							credentials: "same-origin",
							headers: headers
						},
						data: {
							action: 'ymlc_request',
							target: 'remove_photo',
							product: evTarget.id.split('-')[1],
							articul: photo_id.split('_')[1],
							nonce: ymlc_data.ymlc_nonce,
							hash: photo_id,
							counter: counter
						},
						callback: wp_change_data_callback
					};
				ajaxModule.controller(upload_file);
			}
		}

		function refreshImagesHash(containerId, res){

			if(res.success){
				let imagesContainer = document.querySelectorAll('#links-'+containerId+' .drug-drop');
				for(let i=0; i<imagesContainer.length; i++){
					let imageData = res.data[i+1]/*,
						secretHash = '.jpg?'+MD5(SHA1(imageData.name+Math.ceil(Math.random()*100000)))*/;
					imagesContainer[i].setAttribute('img-hash', imageData.name);
					//setTimeout(function(){
						imagesContainer[i].querySelector('.product-image').src = imageData.url+'.jpg'+makeSuperHash();
					//},1000);
					//imagesContainer[i].querySelector('.product-image').src = imageData.url+'.jpg'+makeSuperHash();
				}
				let categoryId = getParentElement(imagesContainer[0], 'class', 'category-galery-container').id.split('-').slice(-1).join();
				//saveProductImagesData.call(this, containerId, categoryId, res.data);


			}
		}

		function renameProductImage(containerId, imagesData, articul){
			let headers = {
					'Cache': 'no-cache',
					"content-disposition": "attachment; filename='test.png'",
				},
				actionData = {
						action: 'ymlc_request',
					},
					wp_change_data_callback = {
						action: {
							function: refreshImagesHash.bind(priceData, containerId),
							args: ajaxModule.get_response,
							context: ajaxModule
						},
						callback: false
					},
					upload_file = {
						action: {
							link: {
								home: ymlc_data.ajax_url,
								action: actionData
							},
							method: "POST",
							credentials: "same-origin",
							headers: headers
						},
						data: {
							action: 'ymlc_request',
							target: 'rename_photo',
							data: imagesData,
							nonce: ymlc_data.ymlc_nonce,
							product: containerId,
							articul: articul.split('_')[1]
						},
						callback: wp_change_data_callback
					};
				ajaxModule.controller(upload_file);
		}

		function removeSortable(containerId){
			jQuery( "#"+containerId ).sortable("destroy");
		}

		function saveProductImagesData(productId, categoryId, imagesData){

			var imagesContainer = document.querySelectorAll('#links-'+productId+' .drug-drop'),
				imagesObj = Object.create(null);
			for(let i=0; i<imagesContainer.length; i++){
				imagesObj[imagesContainer[i].id] = imagesContainer[i].getAttribute('img-hash');
			}
			if(this&&this.selected[categoryId] && this.selected[categoryId].selectedProducts[productId]){
				this.selected[categoryId].selectedProducts[productId].pictures = imagesObj;
			}else if(priceData.selected[categoryId] && priceData.selected[categoryId].selectedProducts[productId]){
				priceData.selected[categoryId].selectedProducts[productId].pictures = imagesObj;
			}

		}

		function addSortable(containerId){
			$( "#links-"+containerId ).sortable({
				cursor:					'move',
				axis:					'x',
				forcePlaceholderSize: 	true,
				opacity: 				0.65,

				start:function(event,ui){
					ui.item.css( 'background-color','#f6f6f6' );
				},
				stop:function(event,ui){
					ui.item.removeAttr( 'style' );
				},
				update: function(event, ui) {

					let imagesContainer = document.querySelector( "#links-"+containerId );
					reInitProductGalery(imagesContainer);
					let imagesHolders = imagesContainer.querySelectorAll('.drug-drop'),
						imagesData = [];
					for(let i=0; i<imagesHolders.length; i++){
						let someImg = imagesHolders[i].querySelector('.product-image');
						//setTimeout(function(){
							someImg.src = someImg.src.split('?')[0] + makeSuperHash();
						//},1000);
						//"?hash="+MD5(SHA1(Date.now()+Math.ceil(Math.random()*1000000)+''));
						/*let imgHash = imagesHolders[i].getAttribute('img-hash').split('_').slice(0,-1).join('_');
						imagesHolders[i].setAttribute('img-hash', imgHash+"_" + (i+1));*/
						imagesData[imagesHolders[i].id.split('-')[1]] = imagesHolders[i].getAttribute('img-hash');
						//images[i].src = ymlc_data.uploadify_url+'img/loading.gif';
					}

					renameProductImage(containerId, imagesData, imagesHolders[0].getAttribute('img-hash'));
				}
			});
		}

		function initGaleryListeners(productId){
			let galeryContainer = document.querySelector('#galery-container');
			removeEventListener('click', removeProductImage);
			addEventListener('click', removeProductImage);
			removeSortable(productId);
			addSortable(productId);
		}

		function publishImage(categoryId, file, data, response){
			if(response){

				let controllerData = 'object' == typeof data && data || JSON.parse(decodeURIComponentX(data)).data,
					imagesContainer = document.querySelector('#links-'+controllerData.product),
					imageContainer = document.createElement('div'),
					imageDelete = document.createElement('span'),
					productImage = document.createElement('img'),
					productImages = document.querySelectorAll('#links-'+controllerData.product+' .product-image'),
					file = 'object' == typeof controllerData.files
							&&controllerData.files[0]
							||controllerData.files;

				if(productImages.length <=4){
					imageContainer.id = 'image-'+(productImages.length+1);
					imageContainer.classList.add('drug-drop');
					imageContainer.setAttribute('img-hash', file.split('.')[0]);
					productImage.classList.add('product-image');
					imageDelete.id = 'remove-'+controllerData.product;
					imageDelete.classList.add('delete-photo-button');
					imageDelete.innerText = 'X';
					productImage.src = controllerData.url + file;
					productImage.setAttribute('ordinal-number', productImages.length+1);


					imageContainer.appendChild(productImage);
					imageContainer.appendChild(imageDelete);
					imagesContainer.appendChild(imageContainer);

					let imagesObj = priceData.selected[categoryId].selectedProducts[controllerData.product].pictures,
						imagesArr = priceData.selected[categoryId].selectedProducts[controllerData.product].uploaded_photos;
					if(!imagesObj){
						imagesObj = {
								'image-1': 'object'==typeof controllerData.files ? controllerData.files[0].split('.')[0]
																				: controllerData.files.split('.')[0]
							};
					}else if(Object.keys(imagesObj).length != imagesArr.length){
						let imgIndex = Object.keys(imagesObj).length+1;
						imagesObj['image-'+imgIndex] = 'object'==typeof controllerData.files ? controllerData.files[0].split('.')[0]
																							: controllerData.files.split('.')[0];
					}
					priceData.imgSorce = controllerData.url;
					priceData.selected[categoryId].selectedProducts[controllerData.product].pictures = imagesObj;
					initGaleryListeners(controllerData.product);

				}
			}
		}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		function makeUpload(productId, articul, categoryId){
			jQuery('#add-photo-to-'+productId).uploadify({
				        'swf'      : ymlc_data.uploadify_url+"libs/uploadify/uploadify.swf",
				        'script' : ymlc_data.ajax_url,
				        /*'auto'     : false,*/
				        'fileSizeLimit' : '2000KB',
				        'fileTypeDesc' : 'Image Files',
        				'fileTypeExts' : '*.jpg;',
        				'buttonText' : 'Добавить картинки',
				        'method'   : 'post',
				    	'formData' : {
				    				'action'		: 'ymlc_request',
				    				'target' 		: 'add_photos',
				    				'product' 		: productId,
				    				'articul'		: articul,
				    				'nonce' 		: ymlc_data.nonce,
				    				'credentials'	: 'same-origin'
				    				},
				    	/*'onUploadStart': function(){
				    		if(document.querySelectorAll('#links-'+productId+' .product-image').length >4){
				    			jQuery('#add-photo-to-'+productId).uploadify('cancel');
				    		}
				    	},*/
				    	'onUploadSuccess' : publishImage.bind(null, categoryId)
				    });
		}

		function printProductsGalery(categoryId, productsObj){
			if(!Object.keys(productsObj.selectedProducts)){
				return;
			}
			let categoryBlock = document.querySelector('#category-galery-'+categoryId),
				galeryContainer = document.querySelector('#galery-container');
			if(!categoryBlock){
				categoryBlock = makeCategoryBlock(categoryId, galeryContainer);
			}
			for(let key in productsObj.selectedProducts){
				if(productsObj.selectedProducts[key].galery){
					continue;
				}
				let product = productsObj.selectedProducts[key];

				//getProductPhotos(product, categoryBlock, categoryId, 'galery');

				makeProductBlock(product, categoryBlock, categoryId, 'galery');
				//makeUpload(product.ID, product.offerId, categoryId);
			}
			//showFlash(productsObj, categoryId);
			//hideFlash(productsObj, categoryId);
		}
		function showFlash(products, categoryId){
			jQuery('.lazy-load-flash').bind("scrollin",{
					distance: 50
				},
				function(){
					//jQuery(this).unbind("scrollin");
					var productId = this.id.split('-').slice(-1).join(),
						product = products[productId];
					jQuery(this).uploadify({
					        'swf'      : ymlc_data.uploadify_url+"libs/uploadify/uploadify.swf",
					        'uploader'	: ymlc_data.ajax_url,
					        /*'auto'     : false,*/
					        'fileSizeLimit' : '2000KB',
					        'fileTypeDesc' : 'Image Files',
	        				'fileTypeExts' : '*.jpg;',
	        				'buttonText' : 'Добавить картинки',
					        'method'   : 'post',
					    	'formData' : {
					    				'action'		: 'ymlc_request',	
					    				'target' 		: 'add_photos',
					    				'product' 		: product.ID,
					    				'articul'		: product.offerId,
					    				'nonce' 		: ymlc_data.nonce,
					    				'credentials'	: 'same-origin'
					    				},
					    	/*'onUploadStart': function(){
					    		if(document.querySelectorAll('#links-'+productId+' .product-image').length >4){
					    			jQuery('#add-photo-to-'+productId).uploadify('cancel');
					    		}
					    	},*/
					    	'onUploadSuccess' : publishImage.bind(null, categoryId),
					    	/*'onInit'   : function() {
								    		hideFlash(products, categoryId);
								    	}*/
					   });
					hideFlash();
					//jQuery(this).removeClass('lazy-load-flash').addClass('lazy-loaded-flash');
				}
			);
		};

		function hideFlash(){
			jQuery('.uploadify').bind("scrollout",{
					distance: 80
				},
				function(){
					jQuery(this).uploadify('destroy');

					//jQuery(this).unbind("scrollout");
					
					//showFlash(products, categoryId);
					//jQuery(this).addClass('lazy-load-flash');
				});
		};

		function checkRequiredFields(key, e){
			var evTarget = e&&e.target||event.srcElement;
			let message = "Это поле обязательно для заполнения",
				categoryId = evTarget.id.split('-').slice(-1);
			if(!evTarget.value.length){
				evTarget.focus();
				evTarget.placeholder = message;
			}
			this.selected[categoryId][key] = evTarget.value;
		}
		function makeCategoryPriceBlock(categoryId, parent){
			let categoryBlock = document.createElement('div'),
				categoryTab = document.createElement('div'),
				prefixNameWrap = document.createElement('div'),
				prefixNameUkWrap, offerTypeUkWrap, prefixNameUk, offerTypeUk,
				offerTypeWrap = document.createElement('div'),
				prefixName = document.createElement('input'),
				offerTypeCustomHTML = '',
				prefixNameCustomHTML = '',
				offerTypeUkCustomHTML = '',//translated block
				prefixNameUkCustomHTML = '',//translated block
				offerType = document.createElement('input'),
				categoryObj = moduleData.categories.all[priceData.curLang][categoryId];
			
			categoryBlock.id = 'price-data-'+categoryId;
			categoryBlock.classList.add('price-data-container', 'hide-this');

			prefixNameWrap.classList.add('main-data-field-wrap');
			prefixNameUkWrap = prefixNameWrap.cloneNode();//translated block
			prefixNameUkWrap.id = "offer-prefix-name-uk-wrap";//translated block
			prefixNameWrap.id = "offer-prefix-name-wrap";
			prefixNameCustomHTML = '<label for="offer-name-prefix-'+categoryId+'">Эта фраза отобразится перед названием товара</label>';
			prefixNameUkCustomHTML = '<label for="offer-name-uk-prefix-'+categoryId+'">Ця фраза з\'явиться перед назвою товара </label>';//translated block
			
			
			offerTypeWrap.classList.add('main-data-field-wrap');
			offerTypeUkWrap = offerTypeWrap.cloneNode();//translated block
			offerTypeUkWrap.id = "offer-type-uk-wrap";//translated block
			offerTypeWrap.id = "offer-type-wrap";
			offerTypeCustomHTML = '<label for="offer-type-wrap">Тип товаров</label>';
			offerTypeUkCustomHTML = '<label for="offer-type-wrap">Тип товарів</label>';//translated block

			/*<param name="Тип">Букеты</param>*/
            
            offerType.type = "text";
            offerType.required = true;

            offerTypeUk = offerType.cloneNode();//translated block
            offerTypeUk.id = "offer-type-uk-"+categoryId;//translated block
            offerTypeUk.placeholder = "Тип товарів";//translated block

            offerType.id = "offer-type-"+categoryId;
            offerType.placeholder = "Тип товаров";

            offerType.addEventListener('blur', checkRequiredFields.bind(priceData, 'type'));
            offerTypeUk.addEventListener('blur', checkRequiredFields.bind(priceData, 'typeTranslated'));//translated block

			
			prefixName.value = "Букет TORY ART";
			prefixName.required = true;
			prefixName.setAttribute('category', categoryId);

			prefixNameUk = prefixName.cloneNode();//translated block
			prefixNameUk.id = "offer-name-uk-prefix-"+categoryId;//translated block
			prefixNameUk.name = "offer-name-uk-prefix-"+categoryId;//translated block
			//translated block
			//translated block
			prefixName.id = "offer-name-prefix-"+categoryId;
			prefixName.name = "offer-name-prefix-"+categoryId;

			prefixName.addEventListener('blur', checkRequiredFields.bind(priceData, 'prefixName'));
			prefixNameUk.addEventListener('blur', checkRequiredFields.bind(priceData, 'prefixNameTranslated'));//translated block

			categoryTab.id = 'price-data-tab-'+categoryId;
			categoryTab.classList.add('price-data-tab');
			categoryTab.innerText = categoryObj.name;

			document.querySelector('#price-data-tabs').appendChild(categoryTab);
			
			prefixNameWrap.insertAdjacentHTML('afterBegin', prefixNameCustomHTML);
			prefixNameUkWrap.insertAdjacentHTML('afterBegin', prefixNameUkCustomHTML);//translated block

			prefixNameWrap.appendChild(prefixName);
			prefixNameUkWrap.appendChild(prefixNameUk);//translated block
			
			offerTypeWrap.insertAdjacentHTML('afterBegin', offerTypeCustomHTML);
			offerTypeUkWrap.insertAdjacentHTML('afterBegin', offerTypeUkCustomHTML);//translated block

			offerTypeWrap.appendChild(offerType);
			offerTypeUkWrap.appendChild(offerTypeUk);//translated block

			categoryBlock.appendChild(prefixNameWrap);
			categoryBlock.appendChild(prefixNameUkWrap);//translated block

			categoryBlock.appendChild(offerTypeWrap);
			categoryBlock.appendChild(offerTypeUkWrap);//translated block


			parent.appendChild(categoryBlock);


			return categoryBlock;
		}

		function printPriceData(categoryId, productsObj){
			if(!Object.keys(productsObj.selectedProducts)){
				return;
			}
			let categoryBlock = document.querySelector('#price-data-'+categoryId),
				dataContainer = document.querySelector('#offers-wrap');
			if(!categoryBlock){
				categoryBlock = makeCategoryPriceBlock(categoryId, dataContainer);
			}
			for(let key in productsObj.selectedProducts){
				if(productsObj.selectedProducts[key].priceData){
					continue;
				}
				let product = productsObj.selectedProducts[key],
					productBlock = makeProductBlock(product, categoryBlock, categoryId, 'price-data');

					
			}

		}

		function getPriceObject(){

			return Object.create(new YMLCatalogParent(this) ,{
				'db':{
					enumerable: false,
					get: function(){
						const go = this.data.selected
									&&this.data.hasOwnProperty('priceMainData')
									&&true
									||false;
									
						return go
								&&Object.keys(this.data.selected).length
								&&this.data
								||false;
					}
				},
				'date':{
					enumerable: true,
					get: function(){
						return this.db 
								&& this.db.priceMainData['date']
								|| this.makeError('date') 
								&& false;
					}
				},
				'name': {
					enumerable: true,
					get: function(){
						return this.db 
								&& this.db.priceMainData['name']
								|| this.makeError('name') 
								&& false;
					}
				},
				'name-uk': {
					enumerable: true,
					get: function(){
						return this.db 
								&& this.db.priceMainData['name-uk']
								|| this.makeError('name-uk') 
								&& false;
					}
				},
				'company': {
					enumerable: true,
					get: function(){
						return this.db 
								&& this.db.priceMainData['company']
								|| this.makeError('company') 
								&& false;
					}
				},
				'company-uk': {
					enumerable: true,
					get: function(){
						return this.db 
								&& this.db.priceMainData['company-uk']
								|| this.makeError('company-uk') 
								&& false;
					}
				},
				'url': {
					enumerable: true,
					get: function(){
						return this.db 
								&& this.db.priceMainData['url']
								|| this.makeError('url') 
								&& false;
					}
				},
				'url-uk': {
					enumerable: true,
					get: function(){
						return this.db 
								&& this.db.priceMainData['url-uk']
								|| this.makeError('url-uk') 
								&& false;
					}
				},
				'currencies': {
					enumerable: true,
					get: function(){
						return this.db 
								&& this.db.priceMainData['currencies']
								|| this.makeError('currencies') 
								&& false;
					}
				},
				//TODO: make categories objekt!!!!!!
				'categories': {
					enumerable: true,
					get: function(){
						let categoriesTree = [];

						for(let key in this.db.selected){
							categoriesTree.push(this.db.selected[key].categoriesTree);
						}
						return this.db 
								&& categoriesTree.length
								&& categoriesTree
								|| this.makeError('categories') 
								&& false;
					}
				},
				'categories-uk': {
					enumerable: true,
					get: function(){
						let categoriesTree = [];

						for(let key in this.db.selected){
							categoriesTree.push(this.db.selected[key].translatedCategoriesTree);
						}
						return this.db 
								&& categoriesTree.length
								&& categoriesTree
								|| this.makeError('categories-uk') 
								&& false;
					}
				},
				'delivery-options': {
					enumerable: true,
					get: function(){
						let cost = this.db 
									&& this.db.priceMainData['delivery-price']
									|| this.makeError('delivery-price') 
									&& false,
							days = this.db 
									&& this.db.priceMainData['delivery-days']
									|| this.makeError('delivery-days') 
									&& false,
							orderBefore = this.db 
											&& this.db.priceMainData['delivery-order-before']
											|| this.makeError('delivery-order-before') 
											&& false;
						if(cost && days && orderBefore){
							let result = Object.create(null);
							result['cost'] = cost;
							result['days'] = days;
							result['order-before'] = orderBefore;
							return result;
						}
						return false;
					}
				},
				'offers': {
					enumerable: true,
					get: function(){
						if(!this.db){
							return false;
						}
						var offers = {
										offersObj: Object.create(null),
										translatedOffersYML: '',
										offersYML: ''
									};
						function getOffers(imgSorce, categoryOffers, mainData){
							for(let offerId in categoryOffers.selectedProducts){
								
								let offer = new Offer(imgSorce, categoryOffers.type, categoryOffers.selectedProducts[offerId], mainData);
								offers.offersObj[offer.productData.ID] = offer.makeObj();
								offers.offersYML += offer.getYML();
								offers.translatedOffersYML += offer.getYML('uk');
							}
						}

						for(let key in this.db.selected){
							getOffers(this.db.imgSorce, this.db.selected[key], this.db.priceMainData);
						}
						
						return offers;
					}
				}
			});
		};
		class YMLCatalogParent {
			constructor(data){
				this.data = data;
			}
			makeError(name){
				console.log('error in -"'+name+'"!!!');
				return false;
			}
			printCategoryBlock(items, ymlString){
				items.forEach(function(item){
					var parent = '';
					if(Number(item.parentId)&&ymlString.indexOf('parent="'+item.parentId+'"')==-1){
						parent = 'parent="'+item.parentId+'"';
					}
					ymlString += '\t\t\t<category id="'+item.id+'" '+parent+'>'+item.name+'</category>\n';
				});
				

				return ymlString;
			}
			makeYML(lang = false){
				if(!this.offers){
					return false;
				}

				let yml = '<?xml version="1.0" encoding="UTF-8"?>\n',
					deliveryOptions = this['delivery-options'];
				yml += '<yml_catalog date="'+this.date+'">\n';
				yml += '\t<shop>\n';
				yml += '\t\t<name>'+(lang && this['name-uk'] || this.name)+'</name>\n';
				yml += '\t\t<company>'+(lang && this['company-uk'] || this.company)+'</company>\n';
				yml += '\t\t<url>'+(lang && this['url-uk'] || this.url)+'</url>\n\n';
				yml += '\t\t<currencies>\n\t\t\t<currency id="'+this.currencies+'" rate="1" />\n\t\t</currencies>\n\n';
				yml += '\t\t<categories>\n';

				this[lang && 'categories-uk' || 'categories'].forEach(function(item){

					yml = this.printCategoryBlock(item, yml);
					
				}.bind(this));
				
				yml += '\t\t</categories>\n';
				yml += '\t\t<delivery-options>\n\t\t\t<option cost="'+deliveryOptions['cost']+'" days="'+deliveryOptions['days']+'" order-before="'+deliveryOptions['order-before']+'" />\n\t\t</delivery-options>\n\n';
				yml += '\t\t<offers>\n'+(lang && this.offers.translatedOffersYML || this.offers.offersYML)+'\t\t</offers>\n';
				yml += '\t</shop>\n';
				yml += '</yml_catalog>'
				return yml;
			}
		}

		class Offer {
			constructor( imgSorce, type, productData, shopData){
				this.type = type;
				this.productData = productData;
				this.shopData = shopData;
				this.imgSorce = imgSorce;
			}
			makeObj() {
				var objYML = Object.create(null);
				objYML.id = this.productData._sku||this.productData.offerId;
				objYML.name = this.productData.name;
				objYML.url = this.productData.url;
				objYML.price = this.productData._price||this.productData.price;
				objYML.currencyId = this.shopData.currencies;
				objYML.categoryId = this.productData.categoryId;
				objYML.store = true;
				objYML.delivery = true;
				objYML.pickup = true;
				objYML.pictures = this.productData.pictures;
				objYML.vendor = this.shopData.company;
				objYML.description = this.productData.description;
				objYML.params = this.productData.params;

				objYML.translated = Object.create(null);
				objYML.translated.name = this.productData.translatedName;
				objYML.translated.url = this.productData.translatedUrl;
				objYML.translated.categoryId = this.productData.translatedCategoryId;
				objYML.translated.vendor = this.shopData['company-uk'];
				objYML.translated.description = this.productData.translatedDescription;
				objYML.translated.params = this.productData.translatedParams;

				return objYML;
			}

			getYML(lang = false) {
				var stringYML = '',
					product = this.makeObj();
				if(lang){
					stringYML +='\t\t\t<offer id="'+product.id+'" available="true">\n';
					stringYML +='\t\t\t\t<name>'+product.translated.name+'</name>\n';
					stringYML +='\t\t\t\t<url>'+product.translated.url+'</url>\n';
					stringYML +='\t\t\t\t<vendor>'+product.translated.vendor+'</vendor>\n';
					stringYML +='\t\t\t\t<price>'+product.price+'</price>\n';
					stringYML +='\t\t\t\t<currencyId>'+product.currencyId+'</currencyId>\n';
					stringYML +='\t\t\t\t<categoryId>'+product.translated.categoryId+'</categoryId>\n';
					stringYML +='\t\t\t\t<store>'+product.store+'</store>\n';
					stringYML +='\t\t\t\t<delivery>'+product.delivery+'</delivery>\n';
					stringYML +='\t\t\t\t<pickup>'+product.pickup+'</pickup>\n';
					for(let key in product.pictures){
						stringYML +='\t\t\t\t<picture>'+this.imgSorce+product.pictures[key]+'.jpg</picture>\n';
					}
					
					stringYML +='\t\t\t\t<description>'+product.translated.description+'</description>\n';
					for(let key in product.translated.params){
						let unit = product.translated.params[key].unit && 'unit="'+product.translated.params[key].unit+'"' || '';
						stringYML +=	'\t\t\t\t<param name="'+product.translated.params[key].display+'" '+unit+'>'+product.translated.params[key].value+'</param>\n';
					}
					stringYML += '\t\t\t</offer>\n\n';
				}else{
					stringYML +='\t\t\t<offer id="'+product.id+'" available="true">\n';
					stringYML +='\t\t\t\t<name>'+product.name+'</name>\n';
					stringYML +='\t\t\t\t<url>'+product.url+'</url>\n';
					stringYML +='\t\t\t\t<vendor>'+product.vendor+'</vendor>\n';
					stringYML +='\t\t\t\t<price>'+product.price+'</price>\n';
					
					stringYML +='\t\t\t\t<currencyId>'+product.currencyId+'</currencyId>\n';
					stringYML +='\t\t\t\t<categoryId>'+product.categoryId+'</categoryId>\n';
					stringYML +='\t\t\t\t<store>'+product.store+'</store>\n';
					stringYML +='\t\t\t\t<delivery>'+product.delivery+'</delivery>\n';
					stringYML +='\t\t\t\t<pickup>'+product.pickup+'</pickup>\n';
					for(let key in product.pictures){
						stringYML +='\t\t\t\t<picture>'+this.imgSorce+product.pictures[key]+'.jpg</picture>\n';
					}
					
					stringYML +='\t\t\t\t<description>'+product.description+'</description>\n';
					for(let key in product.params){
						if(!product.params[key].value.length) continue;
						let unit = product.params[key].unit && 'unit="'+product.params[key].unit+'"' || '';
						stringYML +=	'\t\t\t\t<param name="'+(product.params[key].displayTranslated||product.params[key].display)+'" '+unit+'>'+product.params[key].value+'</param>\n';
					}
					stringYML += '\t\t\t</offer>\n\n';
				}
				return stringYML;
			}
		}

		function publishPricePreview(ymlCatalogObject, print=true){
			if(!ymlCatalogObject){
				return false;
			}
			console.log(ymlCatalogObject);
			let price = ymlCatalogObject.makeYML(),
				translatedPrice = ymlCatalogObject.makeYML('uk'),
				verifyBtn = document.querySelector('#verify-btn-wrap'),
				saveBtn = document.querySelector("#save-btn-wrap");
			if(print && price && translatedPrice){
				verifyBtn.classList.remove('hide-this');
				saveBtn.classList.remove('hide-this');
			}else{
				verifyBtn.classList.add('hide-this');
				saveBtn.classList.add('hide-this');
			}
			if(print){
				document.querySelector("#content-container").value = ''
				document.querySelector("#content-container").value = price;
				document.querySelector("#content-uk-container").value = ''
				document.querySelector("#content-uk-container").value = translatedPrice;
			}else{
				return {
					ru: price,
					uk: translatedPrice
				};
			}
			
		}

		function initUI(){
			console.log(priceData);
		}

		function publishController(res){
			if(!res.success){
				alert('Server side publish error!!!');
			}
			alert('Published OK');
		}

		function publishYMLPrice(){
			if(!this){
				alert('Publish error!!!');
				return false;
			}
			let headers = {
						'Cache': 'no-cache'
					},
					actionData = {
							action: 'ymlc_request',
						},
						verifyResults = {
							action: {
								function: publishController,
								args: ajaxModule.get_response,
								context: ajaxModule
							},
							callback: false
						},
						saveWork = {
							action: {
								link: {
									home: ymlc_data.ajax_url,
									action: actionData
								},
								method: "POST",
								credentials: "same-origin",
								headers: headers
							},
							data: {
								action: 'ymlc_request',
								target: 'publish_yml',
								data: this,
								nonce: ymlc_data.ymlc_nonce
							},
							callback: verifyResults
						};
				ajaxModule.controller(saveWork);

		}
		
		function reinitCatsAndProducts(parentContainer, categoryObj){

			for(let key in categoryObj.selectedProducts){
				if(parentContainer.querySelector('#term-'+key)){
					parentContainer.querySelector('#term-'+key).checked="checked";
				}else{
					console.log('product term_id not found !!!');
					return false;
				}
			}
			return true;
		};

		function reinitGaleryTab(selectedProducts, categoryId){

		}

		function reinitPriceMainData(newPriceData){
			//setDataMain.call(priceData, newPriceData);
		}

		function changeFieldValue(productId, product){
			for(let key in product.params){
				let paramField = document.querySelector('#offer-params-'+key+'-'+productId),
					paramFieldUk = document.querySelector('#offer-params-uk-'+key+'-'+productId);

				if(paramField && paramField.type == 'number'&&product.params[key].value.length){
					product.params[key].value = Number(product.params[key].value);
				}
				if(paramField){

					paramField.value = product.params[key].value;

				}else{
					console.log(key);
					//return false;
				}
				if(paramFieldUk){
					paramFieldUk.value = product.translatedParams[key].value;
				}else{
					console.log(key);
					//return false;
				}
			}
			return true;
		}

		function reinitPriceDataProducts(selectedProducts, categoryId, categoryData){
			var offerNamePrefix = document.querySelector('#offer-name-prefix-'+categoryId),
				offerNameUkPrefix = document.querySelector('#offer-name-uk-prefix-'+categoryId),
				offerNameType = document.querySelector('#offer-type-'+categoryId),
				offerNameUkType = document.querySelector('#offer-type-uk-'+categoryId);



			if(offerNamePrefix){
				offerNamePrefix.value = categoryData.namePrefix;
			}else{
				console.log('loaded data error, tag not found');
				return false;
			}
			if(offerNameUkPrefix){
				offerNameUkPrefix.value = categoryData.translatedNamePrefix;
			}else{
				console.log('loaded data error, tag not found');
				return false;
			}
			if(offerNameType){
				offerNameType.value = categoryData.type;
			}else{
				console.log('loaded data error, tag not found');
				return false;
			}
			if(offerNameUkType){
				offerNameUkType.value = categoryData.typeTranslated;
			}else{
				console.log('loaded data error, tag not found');
				return false;
			}

			for(let key in selectedProducts){
				if(!changeFieldValue(key, selectedProducts[key])){
					console.log('error product value');
					return false;
				}
			}

			return true;
			
		}

		function reinitObjects(action, newPriceData){
			let reinitPromise = function(key){
					//console.log(this);
					return new Promise(function(resolve, reject){
						
						getProductsList(key, {
									action: {
										function: function(res){
											res&&resolve(res)||reject(res);
										},
										args: ajaxModule.get_response,
										context: ajaxModule
									},
									callback: false
								});
					});
				};

			if(action=='load-point'){

				loadDataMainFields(newPriceData.priceMainData);

				for(let key in priceData.selected){
					if(moduleData.categories.all[priceData.curLang][key].products){
						delete moduleData.categories.all[priceData.curLang][key].products;
						delete priceData.selected[key];
						removeProductsList(key);
						removeCategoryTab(key);
						document.querySelector('#term-'+key).checked=false;
					}
				}

				priceData.active = newPriceData.active;
				priceData.imgSorce = newPriceData.imgSorce;
				priceData.selected = newPriceData.selected;

				

				for(let key in newPriceData.selected){
					
					if(!moduleData.categories.all[priceData.curLang][key].products){
						document.querySelector('#term-'+key).checked='checked';

						reinitPromise(key).then(
							container => {
								priceData.selected[key] = checkActualProductsProperties(newPriceData.selected[key]);
								return reinitCatsAndProducts(container, newPriceData.selected[key])
								&&Array(newPriceData.selected[key], 
										key, 
										{
											prefixName: newPriceData.selected[key].namePrefix,
											translatedNamePrefix: newPriceData.selected[key].translatedNamePrefix,
											type: newPriceData.selected[key].type,
											typeTranslated: newPriceData.selected[key].typeTranslated
										}
										)||'reinitCatsAndProducts error !!!';
							},
							errors => {console.log(errors)}
						).then(
							(args) => {
								//console.log(args);
								
								var [categoryData, categoryId, categoryPrefixes, ...args] = args;
								reinitGaleryTab(categoryData, categoryId);
								reinitPriceDataProducts(categoryData.selectedProducts, categoryId, categoryPrefixes);
								
								//reinitPriceDataTab(newPriceData);
						});

					}

				}

				setDataMain.call(priceData, newPriceData);
				printTabContent('price-data');
				printTabContent('galery');

			}else if(action=='add-point'){
				loadDataMainFields(newPriceData.priceMainData, true);

				for(let key in newPriceData.selected){
					if(!priceData.selected[key]){
						//priceData.selected[key] = checkActualProductsProperties(newPriceData.selected[key]);
						priceData.selected[key] = newPriceData.selected[key];
						document.querySelector('#term-'+key).checked='checked';

						reinitPromise(key).then(
							container => {
								return reinitCatsAndProducts(container, newPriceData.selected[key])
								&&Array(newPriceData.selected[key], 
										key, 
										{
											prefixName: newPriceData.selected[key].namePrefix,
											translatedNamePrefix: newPriceData.selected[key].translatedNamePrefix,
											type: newPriceData.selected[key].type,
											typeTranslated: newPriceData.selected[key].typeTranslated
										}
										)||'reinitCatsAndProducts error !!!';
							},
							errors => {console.log(errors)}
						).then(
							(args) => {
								//console.log(args);
								
								var [categoryData, categoryId, categoryPrefixes, ...args] = args;

								var pd = checkActualProductsProperties(categoryData);

								reinitGaleryTab(categoryData, categoryId);
								reinitPriceDataProducts(categoryData.selectedProducts, categoryId, categoryPrefixes);
								//reinitPriceDataTab(newPriceData);
								//loadedCategoryData.selectedProducts[key] = checkActualProductsProperties(loadedCategoryData.selectedProducts[key]);
						});

					}else{
						/*reinitPromise(key).then(
							container => {
								reinitCatsAndProducts(container, newPriceData.selected[key]);
							});
						printTabContent('price-data');
						printTabContent('galery');*/
						
						
						addLoadedCategory(key, newPriceData.selected[key]);
						printTabContent('price-data');
						printTabContent('galery');
						reinitCatsAndProducts(document.querySelector('#prodBox-'+key), newPriceData.selected[key])
						reinitPriceDataProducts(newPriceData.selected[key].selectedProducts, key, newPriceData.selected[key]);
						//changeFieldValue(key, loadedCategoryData.selectedProducts[key]);
					}
					/*printTabContent('price-data');
					printTabContent('galery');*/
				}
				printTabContent('price-data');
				printTabContent('galery');
			}

		}

		function askUser(loadedValue, currentValue, msg){
			let replace = false;

			if('array' == typeof loadedValue && 'array' == typeof currentValue && currentValue[0].parentId){
				loadedValue = loadedValue.reduceRight(function(res, cur){
					return '->'+cur.name ;
				});
				currentValue = loadedValue.reduceRight(function(res, cur){
					return '->'+cur.name ;
				});
			}
			if('array' == typeof loadedValue && 'array' == typeof currentValue){
				loadedValue.join(';');
				currentValue.join(';');
			}
			if(loadedValue != currentValue && currentValue.length){
				replace = confirm(msg + ' введены данные:'
									+currentValue +' перезаписать их на: '+ loadedValue+' ?');
			}
			if(replace || !currentValue.length){
				return loadedValue;
			}else{
				return currentValue;
			}
		}

		function checkVariations(loadedVariations, variations, properties, variationsKeys){
			var addVariations = false,
				moreVariations = [],
				sizes = [];
			if(loadedVariations.length > variations.length){
				for(var i=loadedVariations.length - ++variations.length, l=loadedVariations.length; i<l; i++){
					moreVariations.push(loadedVariations[i]);
					sizes.push(loadedVariations[i].attribute_pa_size);
				}
				addVariations = confirm('В текущей версии прайса нет вариаций с размерами: '+sizes+'. Добавить в текущую версию прайса вариации?');
			}
			if(addVariations){
				variations.push(...[moreVariations]);
			}else{
				loadedVariations.length = variations.length;
			}
			
			variations = loadedVariations.map(function(item, index){
				var msg = 'В вариации с размером ';
				for(var i=0, l=variationsKeys.length; i<l; i++){
					item[variationsKeys[i]] = askUser(item[variationsKeys[i]],
													variations[index][variationsKeys[i]],
													msg+variations[index].default_size+' в '+properties[variationsKeys[i]]
													);
				}
				return item;
			});
			return variations;
		}


		class ActualPriceProduct {
			constructor( dbProduct ){
				this.dbProduct = dbProduct;
			}

			makeActualProduct(){
				
			}
		}

		function checkActualProductsProperties(loadedProducts){
			if(loadedProducts.selectedProducts){
				loadedProducts.selectedProducts = checkActualProductsProperties(loadedProducts.selectedProducts);
				return loadedProducts;
			}
			if(!loadedProducts.ID){
				for(let key in loadedProducts){
					let categoryId = loadedProducts[key].categoryId,
						actualProduct = new ActualPriceProduct(moduleData.categories.all.ru[categoryId].products[key]);

					if(!moduleData.categories.all.ru[categoryId]){
						alert('Категории '+categoryId+' не существует в БД сайта!!!');
						return false;
					}

					if(moduleData.categories.all.ru[categoryId]&&!moduleData.categories.all.ru[categoryId].products[key]){
						alert('Товар '+loadedProducts[key].post_title+' не существует в БД сайта!!!');
						delete loadedProducts[key];
						continue;
					}

					//let productFromDB = moduleData.categories.all.ru[categoryId].products[key];

					productKeys.forEach(function(item){
						
						//for string
						if(moduleData.categories.all.ru[categoryId].products[key][item] 
							&& prepareString(moduleData.categories.all.ru[categoryId].products[key][item]) != loadedProducts[key][item]){
							loadedProducts[key][item] = prepareString(moduleData.categories.all.ru[categoryId].products[key][item]);
						}
					});
				}
				return loadedProducts;
			}else{
				if(!moduleData.categories.all.ru[loadedProducts.categoryId]){
					alert('Категории '+loadedProducts.categoryId+' не существует в БД сайта!!!');
					return false;
				}
				if(moduleData.categories.all.ru[loadedProducts.categoryId]&&!moduleData.categories.all.ru[loadedProducts.categoryId].products[loadedProducts.ID]){
					alert('Товар '+loadedProducts.post_title+' не существует в БД сайта!!!');
					return false;
				}
				let actualProduct = new ActualPriceProduct(moduleData.categories.all.ru[loadedProducts.categoryId].products[loadedProducts.ID]);
				


				productKeys.forEach(function(item){
						
					//for string
					if(moduleData.categories.all.ru[loadedProducts.categoryId].products[loadedProducts.ID][item] 
						&& moduleData.categories.all.ru[loadedProducts.categoryId].products[loadedProducts.ID][item] != loadedProducts[item]){
						loadedProducts[item] = moduleData.categories.all.ru[loadedProducts.categoryId].products[loadedProducts.ID][item];
					}
				});
				return loadedProducts;
			}
			
		}

		function addLoadedProducts(product, categoryId){
			var msg = 'Для товара '+product.name;
			if(!product.uploaded_photos.length && (Object.keys(product.pictures).length||Object.keys(product.pictures).length)){
				let images = Object.keys(product.pictures).length&&product.pictures||product.pictures;
				for(let key in pictures){
					product.uploaded_photos.push(pictures[key]+'.jpg');
				}
			}

			for(var i=0,l=productKeys.length; i<l;i++){

				if(productKeys[i] == 'params' || productKeys[i] == 'translatedParams'){
					for(var iter=0, len=paramsKeys.length; iter<len; i++){
						if(!product[productKeys[i]][paramsKeys[iter]]) continue;
						priceData.selected[categoryId].selectedProducts[product.ID][productKeys[i]][paramsKeys[iter]].value = askUser(product[productKeys[i]][paramsKeys[iter]].value,
																												priceData.selected[categoryId].selectedProducts[product.ID][productKeys[i]][paramsKeys[iter]].value,
																												msg + properties[paramsKeys[iter]]);
					}
				}

				if(productKeys[i] == 'variations' && product[productKeys[i]].length){
					priceData.selected[categoryId].selectedProducts[product.ID][productKeys[i]] = checkVariations(product[productKeys[i]], priceData.selected[categoryId].selectedProducts[product.ID][productKeys[i]], properties, variationsKeys);
				}

				if(priceData.selected[categoryId].selectedProducts[product.ID][productKeys[i]] !=product[productKeys[i]]){
					priceData.selected[categoryId].selectedProducts[product.ID][productKeys[i]] = askUser(product[productKeys[i]], 
																									priceData.selected[categoryId].selectedProducts[product.ID][productKeys[i]], 
																									msg + properties[productKeys[i]]);
				}
				
			}
			
		}

		function addLoadedCategory(categoryId, loadedCategoryData){
			var categoryName = moduleData.categories.all.ru[categoryId].name,
				msg = 'Для категории '+categoryName;
				console.log(loadedCategoryData);
			priceData.selected[categoryId].namePrefix = askUser(
														loadedCategoryData.namePrefix, 
														priceData.selected[categoryId].namePrefix, 
														msg + ' в префикс товара'
														);
			priceData.selected[categoryId].translatedNamePrefix = askUser(
														loadedCategoryData.translatedNamePrefix, 
														priceData.selected[categoryId].translatedNamePrefix, 
														msg + ' в префикс товара для Укр версии'
														);
			priceData.selected[categoryId].type = askUser(
												loadedCategoryData.type, 
												priceData.selected[categoryId].type, 
												msg + ' в типе товара'
												);
			priceData.selected[categoryId].typeTranslated = askUser(
														loadedCategoryData.typeTranslated, 
														priceData.selected[categoryId].typeTranslated, 
														msg + ' в типе товара для Укр версии'
														);
			if(JSON.stringify(priceData.selected[categoryId].categoriesTree) != JSON.stringify(loadedCategoryData.categoriesTree)){
				priceData.selected[categoryId].categoriesTree = askUser(
													loadedCategoryData.categoriesTree, 
													priceData.selected[categoryId].categoriesTree, 
													msg + ' отличаются родительские категории'
													);
			}
			if(JSON.stringify(priceData.selected[categoryId].translatedCategoriesTree) != JSON.stringify(loadedCategoryData.translatedCategoriesTree)){
				priceData.selected[categoryId].categoriesTree = askUser(
													loadedCategoryData.translatedCategoriesTree, 
													priceData.selected[categoryId].translatedCategoriesTree, 
													msg + ' отличаются родительские категории для Укр версии'
													);

			}

			for(let key in loadedCategoryData.selectedProducts){
				if(!priceData.selected[categoryId].selectedProducts[key]){
					loadedCategoryData.selectedProducts[key] = checkActualProductsProperties(loadedCategoryData.selectedProducts[key]);
					priceData.selected[categoryId].selectedProducts[key] = loadedCategoryData.selectedProducts[key];
					//changeFieldValue(key, loadedCategoryData.selectedProducts[key]);
				}else{
					addLoadedProducts(loadedCategoryData.selectedProducts[key], categoryId);
				}
			}
			console.log(priceData.selected[categoryId]);
		}

		function loadSavedPoint(target, res){
			if(!res.success){
				console.log('Error!!!');
			}
			let pointObj = JSON.parse(res.data);
			
			//console.log(pointObj);
			if(target == 'create-yml'){
				let YMLPriceObj = getPriceObject.call(pointObj.priceConstructorData),
					publishBtn = document.querySelector('#publish-yml');
				publishBtn.removeEventListener('click', publishYMLPrice);
				YMLPriceObj = YMLPriceObj&&publishPricePreview(YMLPriceObj, false)||false;
				if(YMLPriceObj){
					publishBtn.addEventListener('click', publishYMLPrice.bind(YMLPriceObj));
				}

				/*publishYMLPrice(YMLPriceObj);*/
			}
			if((target == 'load-point' || target == 'add-point') && !document.querySelector('#yml-'+pointObj.workName)){
				let ymlContainer = document.querySelector('#create-yml-container'),
					createYMLBtn = document.querySelector('#create-yml'),
					yml = document.createElement('div'),
					ymlHTML = '<input type="radio" name="saved-yml" value="'+pointObj.workName
							+'" id="yml-'+pointObj.workName+'"><label for="yml-'
							+pointObj.workName+'">'+pointObj.workName+'</label>';
				
				yml.classList.add('saved-point-wrap');
				ymlContainer.innerHTML = '';
				yml.insertAdjacentHTML('afterBegin', ymlHTML);
				ymlContainer.appendChild(yml);
				createYMLBtn.removeEventListener('click', getSavedPoint);
				createYMLBtn.addEventListener('click', getSavedPoint);

				
			}
			if(target == 'load-point' || target == 'add-point'){
				reinitObjects.call(moduleData, target, pointObj.priceConstructorData);
			}	
			
		}

		function getSavedPoint(e){
			let fileName = document.querySelector('#saved-points-container input:checked').value,
				evTarget = e&&e.target||event.srcElement;
			if(fileName){
				var actionData = {
						action: 'ymlc_request',
						target: 'get_saved_point_content',
						point_name: fileName,
						nonce: ymlc_data.ymlc_nonce
					},
					result_callback = {
						action: {
							function: loadSavedPoint.bind(priceData, evTarget.id),
							args: ajaxModule.get_response,
							context: ajaxModule
						},
						callback: false
					},
					savedPointsRequest = {
						action: {
							link: {
								home: ymlc_data.ajax_url,
								action: actionData
							},
							credentials: "same-origin",
							method: 'GET',

						},
						callback: result_callback
					};
				ajaxModule.controller(savedPointsRequest);
			}
			
		}

		function savedPointsController(res){

			let pointsContainer = document.querySelector('#saved-points-container'),
				loadPointBtn = document.querySelector('#load-point'),
				addPointBtn = document.querySelector('#add-point');
				
			if(res.data){
				pointsContainer.innerHTML = '';
				for(let key in res.data){
					let point = document.createElement('div'),
						pointHTML = '<input type="radio" name="save-point" value="'+res.data[key].split('.')[0]
						+'" id="point-'+res.data[key].split('.')[0]+'"><label for="point-'
						+res.data[key].split('.')[0]+'">'+res.data[key]+'</label>';
					point.classList.add('saved-point-wrap');
					point.insertAdjacentHTML('afterBegin', pointHTML);
					pointsContainer.appendChild(point);
				}
				loadPointBtn.addEventListener('click', getSavedPoint);
				addPointBtn.addEventListener('click', getSavedPoint);
			}
				

			//console.log(res);
		}

		function loadSavePublishController(){
			var actionData = {
					action: 'ymlc_request',
					target: 'get_saved_points_names',
					nonce: ymlc_data.ymlc_nonce
				},
				result_callback = {
					action: {
						function: savedPointsController,
						args: ajaxModule.get_response,
						context: ajaxModule
					},
					callback: false
				},
				savedPointsRequest = {
					action: {
						link: {
							home: ymlc_data.ajax_url,
							action: actionData
						},
						credentials: "same-origin",
						method: 'GET',

					},
					callback: result_callback
				};
			ajaxModule.controller(savedPointsRequest);
		}

		function printTabContent(tabId){

			if(tabId == 'galery'){
				for(let key in priceData.selected){
					printProductsGalery(key, priceData.selected[key]);
				}
			}
			if(tabId == 'price-data'){
				for(let key in priceData.selected){
					printPriceData(key, priceData.selected[key]);
				}
			}
			if(tabId == 'preview'){
				let ymlCatalogObject = getPriceObject.call(priceData);
				publishPricePreview(ymlCatalogObject);
			}
			if(tabId == 'load-save-publish'){
				loadSavePublishController();
			}

		};

		function removeProductsList(termId) {
			document.querySelector('#block-' + termId)&&document.querySelector('#block-' + termId).remove();

		}

		function removeCategoryTab(termId){
			document.querySelector('#category-tab-' + termId)&&document.querySelector('#category-tab-' + termId).remove();
			document.querySelector('#price-data-tab-' + termId)&&document.querySelector('#price-data-tab-' + termId).remove();
		}

		function printProductsList(res, selected = false) {
			if (!res.success) return false;

			var productsBlock = document.createElement('div'),
				productsHtml = '<div class="products-block-wrap"><div class="search-wrap">' +
				'<input class="search-filter" id = "prodSearch-' + res.data.category + '" type = "text" placeholder="find product by articul or by name" target="prodBox-' + res.data.category+'">' +
				'</div><div class ="more-controls"><a select="true" href="javascript:void(0)">select all</a><a select="false" href="javascript:void(0)">unselect all</a></div><div class = "list-container" name="products-for-edit" id="prodBox-' + res.data.category + '" size="10">' +
				'<ul disabled>',
				productsContainer = document.querySelector('#products-container');;
			productsBlock.id = 'block-' + res.data.category;
			for (let key in res.data.products_data) {
				productsHtml += '<li><input type="checkbox" id="term-' +
					res.data.products_data[key].ID + '" name="products-filter" value="' +
					res.data.products_data[key].post_title + '"><label for="term-' + res.data.products_data[key].ID + '">' +
					res.data.products_data[key].post_title + '</label></li>';
			}
			productsHtml += '</ul></div></div>';
			productsBlock.innerHTML = productsHtml;
			productsContainer.appendChild(productsBlock);
			//priceData.selected[res.data.category].products = res.data.products_data;
			moduleData.categories.all[priceData.curLang][res.data.category].products = res.data.products_data;
			moduleData.categories.all['uk'][res.data.translated_category].products = res.data.translated_products_data;
			/*productsContainer.removeEventListener(productsController);*/
			productsContainer.addEventListener('click', productsController);
			productsBlock.querySelector('#prodSearch-' + res.data.category).addEventListener('input', filterAction);
			productsBlock.querySelector('.more-controls').addEventListener('click', selectUnselect);
			return productsContainer;
		}

		function selectUnselect(e){
			var evTarget = e&&e.target||event.srcElement,
				inputs = getParentElement(evTarget, 'class', 'products-block-wrap').querySelectorAll('input'),
				action = evTarget.getAttribute('select')==='true';

			for(let input of inputs){
				input.checked = action;
				input.type == 'checkbox'&&productsController(input);
			}
		}

		function getParentElement(element, selector, value) {
			var parentElementSelector,
				parent = element;

			while (parent.tagName !== "BODY") {
				switch (selector) {
					case 'id':
						parentElementSelector = parent.id;
						break;
					case 'class':
						parentElementSelector = parent.classList.contains(value) && parent || false;
						break;
					case 'attribute':
						parentElementSelector = parent.hasAttribute(value) && parent || false;
						break
				};
				if (parentElementSelector /* && parentElementSelector == nodeValue*/ ) {
					break;
				};
				parent = parent.parentElement;
			};
			if (parent.tagName == "BODY") {
				return false;
			} else {
				return parentElementSelector;
			}
		}

		/*Returns true if it is a DOM node*/
        function isNode(o){
          return (
            typeof Node === "object" ? o instanceof Node : 
            o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
          );
        };

        /*Returns true if it is a DOM element */   
        function isElement(o){
          return (
            typeof HTMLElement === "object" ? o instanceof HTMLElement : /*DOM2*/
            o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
        );
        };

		function productsController(e) {
			var evTarget = isElement(e)?e:e && e.target || event.srcElement,
				productId = evTarget.id.split('-')[1],
				category = getParentElement(evTarget, 'class', 'list-container');
			if (evTarget.tagName != 'INPUT') {
				return false;
			}
			if (!category) {
				return false;
			}
			var categoryId = category.id.split('-')[1];
			if (evTarget.checked && category) {
				let product = moduleData.categories.all[priceData.curLang][categoryId].products[productId];
				priceData.selected[categoryId].selectedProducts[productId] = Object.create(null);

				priceData.selected[categoryId].selectedProducts[productId].ID = product.ID;
				priceData.selected[categoryId].selectedProducts[productId].premalink = product.premalink;
				priceData.selected[categoryId].selectedProducts[productId].post_title = product.post_title;
				priceData.selected[categoryId].selectedProducts[productId].variations = product.woo_obj.variations || false;
				priceData.selected[categoryId].selectedProducts[productId].default_size = product.default_size || false;
				priceData.selected[categoryId].selectedProducts[productId].uploaded_photos = product.uploaded_photos
				priceData.selected[categoryId].selectedProducts[productId].photosUrl = product.photos_url;
				priceData.selected[categoryId].selectedProducts[productId].offerId = product._sku;
			}
			if (!evTarget.checked && category) {

				delete priceData.selected[categoryId].selectedProducts[productId];
				document.querySelector('#product-galery-'+productId)&&document.querySelector('#product-galery-'+productId).remove();
				document.querySelector('#price-data-offer-params-'+productId)&&document.querySelector('#price-data-offer-params-'+productId).remove();
			}
		}

		function categoriesController(e) {
			var evTarget = e && e.target || event.srcElement,
				termId = evTarget.id.split('-')[1];
			if (evTarget.tagName != 'INPUT') {
				return false;
			}
			if ('undefined' == typeof priceData.selected) {
				priceData.selected = Object.create(null);
			}

			if (evTarget.checked) {
				priceData.selected[termId] = Object.create(null);
				priceData.selected[termId].selectedProducts = Object.create(null);
				getProductsList(termId);
			} else {
				for(let key in priceData.selected[termId]){
					
				}
				delete priceData.selected[termId];
				document.querySelector('#prodSearch-' + termId).removeEventListener('input', filterAction);
				document.querySelector('#block-'+termId+' .more-controls').removeEventListener('click', selectUnselect);
				removeProductsList(termId);
				removeCategoryTab(termId);

			}

		}

		function swithLang(e) {
			var evTarget = e && e.target || event.srcElement;
			priceData.curLang = evTarget.value;
			print_categories(moduleData.categories);
		}

		function publish_html(data, publishType) {
			var containers = {
				categories: document.querySelector('#catBox'),
				products: document.querySelector('#prodBox')
			}
			containers[publishType].innerHTML = data;
		}

		function categoriesPublisher(res) {
			if (!res.success) return;
			moduleData.categories.all = res.data;
			print_categories(moduleData.categories.all);
		}

		function print_categories(data) {
			var termsHtml = '<ul>',
				curLang = document.querySelector('.lang-selector:checked').value;
			for (let key in data[curLang]) {
				termsHtml += '<li><input type="checkbox" id="term-' +
					data[curLang][key].term_id + '" name="categories-filter" value="' +
					data[curLang][key].name + '"><label for="term-' + data[curLang][key].term_id + '">' +
					data[curLang][key].name + ' ( ' + data[curLang][key].count + ' )</label></li>';
			}
			termsHtml += '</ul>';
			publish_html(termsHtml, 'categories');

		}

		function makeSuperHash(){
			var key ='';
			while(key.length < 4){
				key += Math.random().toString(36).replace(/\d|_/g,'').slice(2, 12);
			}
			key = key.substr(0, 4);

			return "?"+key+"="+MD5(SHA1(Date.now()+Math.ceil(Math.random()*1000000)+''));
		}

		function reInitProductGalery(galery, resData = {}){
			let containers = galery.querySelectorAll('.drug-drop'),
				i=0,
				keys = Object.keys(resData.pictures||resData);
			for(let key in resData.pictures){
				//containers[i].id=key;
				containers[i].setAttribute('img-hash', resData.pictures[key]);
				let imgProduct = containers[i].querySelector('.product-image'),
					imgArr = imgProduct.src.split('/'),
					removedImgIndex = resData.hash.split('_').slice(-1).join();
				imgArr[imgArr.length-1] = imgArr[imgArr.length-1].split('.')[0];
				let imgIndex = resData.pictures[key].split('_').slice(-1).join();

				if('img_'+resData.articul+'_'+(i+1)!=imgArr[imgArr.length-1]){
					imgArr[imgArr.length-1] = 'img_'+resData.articul+'_'+(i+1);
				}

				//setTimeout(function(){
					imgProduct.src = imgArr.join('/')+'.jpg'+makeSuperHash();
				//},1000);
				
				
				i++;
			}
			for(let i = 0; i<containers.length; i++){
				containers[i].id='image-'+(i+1);
			}
		}

		function removeFromObject(obj, value){
			let keys = Object.keys(obj);
			delete obj[keys[keys.length-1]];
			return obj;
		}

		function removeHtmlElement(productId, categoryId, res) {
			if (res.success === false && res.status =='not found' || res.success === true){
				var someImg = document.querySelector('.drug-drop[img-hash="' + res.data.hash + '"');

				if (someImg) {
					let parent = someImg.parentElement;
					someImg.remove();
					this.selected[categoryId].selectedProducts[productId].pictures = removeFromObject(priceData.selected[categoryId].selectedProducts[productId].pictures,res.data.hash);
					this.selected[categoryId].selectedProducts[productId].uploaded_photos = priceData.selected[categoryId].selectedProducts[productId].uploaded_photos.filter(function(item){
						return item.split('.')[0] != res.data.hash;
					});
					reInitProductGalery(parent, res.data);
				}
			}
			

		}

		function getProductData(productId, categoryId) {
			var product,
				products = moduleData.categories.all[priceData.curLang][categoryId].products;

			for (let product of products) {
				if (product.ID == productId) {
					return product;
				}
			}

		}

		function getProductsList(termId, callback=false) {
			var actionData = {
					action: 'ymlc_request',
					target: 'get_products',
					category: termId,
					nonce: ymlc_data.ymlc_nonce
				},
				result_callback = {
					action: {
						function: printProductsList,
						args: ajaxModule.get_response,
						context: ajaxModule
					},
					callback: callback
				},
				categoriesRequest = {
					action: {
						link: {
							home: ymlc_data.ajax_url,
							action: actionData
						},
						credentials: "same-origin",
						method: 'GET',

					},
					callback: result_callback
				};
			ajaxModule.controller(categoriesRequest);
		}

		function getCategories() {
			var actionData = {
					action: 'ymlc_request',
					target: 'get_categories',
					nonce: ymlc_data.ymlc_nonce
				},
				result_callback = {
					action: {
						function: categoriesPublisher,
						args: ajaxModule.get_response,
						context: ajaxModule
					},
					callback: false
				},
				categoriesRequest = {
					action: {
						link: {
							home: ymlc_data.ajax_url,
							action: actionData
						},
						credentials: "same-origin",
						method: 'GET',

					},
					callback: result_callback
				};
			ajaxModule.controller(categoriesRequest);
		}
		// ADD product PHOTO TO GALLERY

		var addPhotoToGallery = document.querySelector("#product-photos-gallery [name='add-product-photo']");
		var viewAddedPhoto = document.querySelector("#links");
		//addPhotoToGallery.addEventListener("change", addProductPhoto);

		function addProductPhoto(e) {
			var photoSumCheck = document.querySelectorAll("#links img").length,
				evTarget = e&&e.target||event.srcElement;

			if (photoSumCheck <= 4) {
				var fetchResponse;
				var headers = {
					'Cache': 'no-cache',
					"content-disposition": "attachment; filename='test.png'",
				};

				function changePhotoSrc(respObj) {
					var ourHTML = '<div id="img_' + photoSumCheck + '" class="img-galery-wrap" ><a href="javascript:void(0)" img-hash="' + respObj.data.hash +
						'" class="photo-container"> <span class="delete-photo-button">X</span></a>' +
						' <img class="photo-gallery-preview" src="' + respObj.data.source_url +
						'" id="img_' + respObj.data.product + '_' + photoSumCheck + '"></div>';

					viewAddedPhoto.insertAdjacentHTML('afterbegin', ourHTML);
					document.querySelector("#product-photos").value = '';
				}
				var actionData = {
						action: 'ymlc_request',
						/*target: 'add_photo',
						product: 1111111,
						nonce: ymlc_data.ymlc_nonce*/
					},
					wp_change_data_callback = {
						action: {
							function: changePhotoSrc,
							args: ajaxModule.get_response,
							context: ajaxModule
						},
						callback: false
					},
					upload_file = {
						action: {
							link: {
								home: ymlc_data.ajax_url,
								action: actionData
							},
							method: "POST",
							credentials: "same-origin",
							headers: headers
						},
						data: {
							action: 'ymlc_request',
							target: 'add_photo',
							product: 1111111,
							nonce: ymlc_data.ymlc_nonce,
							file: document.querySelector("#product-photos-gallery [name='product-photos']").files[0]
						},
						callback: wp_change_data_callback
					};
				ajaxModule.controller(upload_file);
			} else {
				alert("Вы загрузили максимальное количество фотографий питомца");
			}

		};
		return ymlcModule;

	}(window.ymlcModule || {}));
});
window.emeListenerDriver = function(emeCalendarData, listen){

        if ('undefined' == typeof emeCalendarData){
            return false;
        };
    var customEventModul = (function(eventModul){

        var controllerResult = {},
            fieldError = {};
            

        function refreshAttribAndCSS(){
            var quickWiev = document.querySelectorAll('.quick-view'),
                productInfo = document.querySelectorAll('.info.style-grid1'),
                activePanelProducts = document.querySelectorAll('.panel div.inner-wrap');
            for(var i=0, l=activePanelProducts.length; i<l;i++){
                activePanelProducts[i].style.cssText = 'border:none!important;';
            };
            for(var i=0,l=quickWiev.length; i<l;i++){
                quickWiev[i].remove();
            };
            for(var i=0,l=productInfo.length; i<l;i++){
                productInfo[i].remove();
            };
            var elementGBCR = activePanelProducts[0].getBoundingClientRect(),
                panels = document.querySelector('.panels'),
                iconRight = document.querySelector('.icon-angle-right'),
                iconLeft = document.querySelector('.icon-angle-left'),
                allLinks = panels.querySelectorAll('a');
            for(var i=0, l=allLinks.length; i<l; i++){
                if(!allLinks[i].href.indexOf('://')) continue;
                var product = allLinks[i].href.split('/');
                if(product[product.length-1]){
                    product = product[product.length-1];    
                }else{
                    product = product[product.length-2];
                };
                if(allLinks[i].querySelector('.back-image')){
                    allLinks[i].querySelector('.back-image').setAttribute('product',product);
                }else if(allLinks[i].querySelector('.front-image')){
                    allLinks[i].querySelector('.front-image').setAttribute('product',product);
                };
                
                
                allLinks[i].href = 'javascript:void(0)';
            };

            iconLeft.style.top = iconRight.style.top = '35%';
            panels.style.height = elementGBCR.bottom-elementGBCR.top+'px';
            panels.style.overflow = 'hidden';

        };
        /*setTimeout(refreshAttribAndCSS, 100);*/
        
        document.body.addEventListener('click', eventClickController.bind(eventModul), true);
        document.body.addEventListener('keyup', eventKeyUpController.bind(eventModul));
        document.addEventListener('beforeunload', doNotUnload);


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

        function createErrorNode(nodeType, nodeId, nodeText){
            var newNode = document.createElement(nodeType);
            newNode.id = nodeId;
            newNode.innerText = nodeText;
            newNode.style.color = 'red';
            return newNode;
        };

        function checkDataPickerError(dataNode){
            if(!dataNode.value){
                dataNode.focus();
                return 'Choice the day of event please.'
            }else{
                return false;
            }
        };

        function checkDataTypeError(dataNode){
            var dataTypeAttr, errorMessage;
            if(dataTypeAttr = dataNode.getAttribute('datatype')){
                switch(dataTypeAttr){
                    case 'number':
                    errorMessage = !isNaN(dataNode.value)? false: 'You have to use only numbers in this field';
                    break;
                    case 'string':
                    errorMessage = dataNode.value.length&&isNaN(dataNode.value)? false: 'You have to use numbers with words or words only in this field';
                    break;
                };
            };
            return errorMessage;
        };

        function checkRelationError(dataNode){
            var dataTypeAttr, dataTypeValue, errorMessage;
            if(dataTypeAttr = dataNode.getAttribute('lesThan')){
                dataTypeValue = document.querySelector('#'+dataTypeAttr).value;
                errorMessage = dataTypeValue.length? Number(dataTypeValue) > Number(dataNode.value)? false:'THE number in this field must be les than number in the right field':false;
            };
            if(dataTypeAttr = dataNode.getAttribute('moreThan')){
                dataTypeValue = document.querySelector('#'+dataTypeAttr).value;
                errorMessage = dataTypeValue.length? Number(dataTypeValue) < Number(dataNode.value)? false:'THE number in this field must be more than number in the left field':false;
            };
            return errorMessage;
        };

        function doUndoErrorMsg(evTarget, fieldError, errorMessage, dataError){
            errorMessage.push(dataError);
            evTarget.classList.contains('event-field-error')?'':evTarget.classList.add('event-field-error');
            evTarget.classList.contains('event-field-error')?evTarget.focus():'';
            if(document.querySelector('#'+evTarget.id+'-error')){
                document.querySelector('#'+evTarget.id+'-error').remove();
            };
            if(evTarget.classList.contains('error-select')){
                evTarget.classList.remove('error-select');
                evTarget.options[0].innerText = '--'
            }
            if(evTarget.tagName=="SELECT"){

                evTarget.options[0].innerText = dataError;
                evTarget.classList.add('error-select');
                evTarget.blur();
                /*evTarget.selectedIndex = 0;*/
                evTarget.addEventListener('focus', function(e){
                    var evTarget = e&&e.target||event.srcElement;

                    if(evTarget.classList.contains('error-select')){
                        evTarget.classList.remove('error-select');
                    };
                    evTarget.addEventListener('blur', function(e){

                        var evTarget = e&&e.target||event.srcElement;

                        if(evTarget.selectedIndex>0&&evTarget.classList.contains('error-select')){
                            evTarget.classList.remove('error-select');
                        };
                        if(!evTarget.selectedIndex&&!evTarget.classList.contains('error-select')){
                            evTarget.classList.add('error-select');
                        };
                    });
                });
                
            }else{
                evTarget.parentElement.firstElementChild.appendChild(createErrorNode('span', evTarget.id+'-error', errorMessage));
            }

            return fieldError[evTarget.id] = true;
        };

        function customizeInvalidMsg(event, message, placeholder){
            evTarget.setCustomValidity("");
            if (!evTarget.validity.valid) {
                evTarget.setCustomValidity(message);
            }else{
                evTarget.setCustomValidity(placeholder);
            };
            return evTarget;
        };

        function checkDataOnBlur(evTarget){
            var errorMessage = [],
                inputFieldLength = 0,
                fieldWithData,
                dataError,
                relationError;

            /*verify data lenth*/
            if(evTarget.hasAttribute('required')||evTarget.hasAttribute('length')||evTarget.hasAttribute('datatype')||evTarget.hasAttribute('lesThan')||evTarget.hasAttribute('moreThan')){
                if((evTarget.value.length < (evTarget.getAttribute('length')||inputFieldLength))/*||evTarget.tagName == 'INPUT'&&!evTarget.getAttribute('length')*/){
                    /*field with additional field*/

                    if(evTarget.getAttribute('additional-field')){
                        var mainFieldPresent = document.getElementById(evTarget.getAttribute('additional-field'));
                        if(mainFieldPresent){
                            switch(mainFieldPresent.tagName.toLowerCase()){
                                case 'select':
                                fieldWithData = mainFieldPresent.value===0?false:true;
                                break;
                            };
                            if(fieldWithData && !checkDataTypeError(evTarget)){
                                evTarget.classList.contains('event-field-error')?evTarget.classList.remove('event-field-error'):'';
                                if(document.querySelector('#'+evTarget.id+'-error')){
                                    document.querySelector('#'+evTarget.id+'-error').remove();
                                };
                                return fieldError[evTarget.id] = false;
                            };
                            
                        }
                    };

                    /*lenth error section*/
                    dataError = !evTarget.value.length?helperDataEMEFS.fieldsTranslation.empty_field:
                        evTarget.hasAttribute('length')&&evTarget.getAttribute('length')>evTarget.value.length?helperDataEMEFS.fieldsTranslation.short_data+evTarget.getAttribute('length')+helperDataEMEFS.fieldsTranslation.characters:
                        !evTarget.hasAttribute('length')&&inputFieldLength>evTarget.value.length?helperDataEMEFS.fieldsTranslation.short_data+inputFieldLength+helperDataEMEFS.fieldsTranslation.characters:false;

                    return doUndoErrorMsg(evTarget, fieldError, errorMessage, dataError);
                }else if(dataError = checkDataPickerError(evTarget) && evTarget.classList.contains('hasDatepicker')){

                    return doUndoErrorMsg(evTarget, fieldError, errorMessage, dataError);
                }else if(evTarget.tagName =="SELECT"&& evTarget.value=='0'){
                    return doUndoErrorMsg(evTarget, fieldError, errorMessage, helperDataEMEFS.fieldsTranslation.empty_category);            
                }else if(dataError = checkDataTypeError(evTarget)){  /*data type error section*/

                    return doUndoErrorMsg(evTarget, fieldError, errorMessage, dataError);
                }else if(relationError = checkRelationError(evTarget)){ /*data relations error section*/

                    return doUndoErrorMsg(evTarget, fieldError, errorMessage, dataError);
                }else{
                    evTarget.classList.contains('event-field-error')?evTarget.classList.remove('event-field-error'):'';
                    if(document.querySelector('#'+evTarget.id+'-error')){
                        document.querySelector('#'+evTarget.id+'-error').remove();
                    };

                    return fieldError[evTarget.id] = false;
                }
                
            }else{
                return fieldError[evTarget.id] = false;
            }
        };

        function changeDataOnBlur(e){
            var evTarget = isNode(e)?e:e&&e.target||event.srcElement,
                fieldData, 
                parent = this, 
                inObject = false;
                checkDataOnBlur.call(parent, evTarget);

            if(fieldError[evTarget.id]===false){

                if(!inObject && 'object' == typeof e && !isNode(e)  && !isElement(e)){
                    if(evTarget.hasAttribute('additional-field')){
                        controllerResult[evTarget.name][evTarget.id] = evTarget.value;
                    }else{
                        controllerResult[evTarget.id] = evTarget.value;
                    }
                    /*controllerResult[evTarget.id] = evTarget.value;*/
                };
                if(!inObject&&isNode(e)){
                    /*e - SELECT node
                    evTarget - OPTION node*/
                    if(evTarget.tagName == 'SELECT'){

                        if(e.name&&!controllerResult[e.name]){
                            controllerResult[e.name] = {};
                            controllerResult[e.name][e.id] = e.value;
                        }else{
                            controllerResult[e.name][e.id] = e.value;
                        }

                    }else if(evTarget.tagName == 'INPUT'&&evTarget.type == 'checkbox'){

                        var groupName = evTarget.getAttribute('group');
                        if(e.value=='true'){
                            if('object' != typeof controllerResult[groupName]){
                                controllerResult[groupName] = {};
                            }
                            controllerResult[groupName][e.id] = e.value;
                        }else{
                            delete controllerResult[groupName][e.id];
                        };
                        if(epcf.querySelector('#evFilterList')){
                            addRemoveLable(e, epcf.querySelector('#evFilterList'));
                        };
                        
                        function addRemoveLable(chbx, labelList){

                            if(chbx.value=='true'){
                                createLabel(chbx, labelList);
                            };
                            if(chbx.value=='false'){
                                removeLabel(chbx.id, labelList);
                            }
                        };
                        function createLabel(chbx, parent){
                            var label = document.querySelector('#labelDolly').cloneNode(true);
                            label.style.display = '';
                            label.id = 'ev-'+ chbx.id;
                            label.querySelector('span').insertAdjacentHTML('afterBegin',chbx.nextElementSibling.title);
                            parent.appendChild(label);
                        };
                        function removeLabel(chbx, labelList){
                            labelList.querySelector('#ev-'+chbx).remove();
                        };

                    }else if(evTarget.tagName == 'IMG'){
                        var selProd = evTarget.parentElement.hasAttribute('product')?evTarget.parentElement.getAttribute('product'):false;
                        
                        controllerResult.products = controllerResult.products?controllerResult.products:{};
                        controllerResult.products[selProd] = selProd && !controllerResult.products[selProd]?true:false;
                        if(!controllerResult.products[selProd]){
                            delete controllerResult.products[selProd];
                        }
                    }else{
                        if(e.name&&!controllerResult[e.name]){
                            controllerResult[e.name] = {};
                            controllerResult[e.name][e.id] = e.value;
                        }else{
                            controllerResult[e.name][e.id] = e.value;
                        }
                    }
                    
                };
                return controllerResult, fieldError;
            }
        };

        function eventKeyUpController(e){
            if(e.type =='click' && e.isTrusted===true){
            }
        };
        function hasParentElement(evTarget, selector, nodeValue){
            var parentElementSelector, 
                parent = evTarget.parentElement,
                result =  false;

            while(parent.tagName !=="BODY"){
                switch(selector){
                    case 'id':
                    parentElementSelector = parent.id;
                    break;
                    case 'class':
                    parentElementSelector = parent.classList.contains(nodeValue)?parent:false;
                    break;
                    case 'attribute':
                    parentElementSelector = parent.getAttribute(nodeValue);
                    break
                };
                if(parentElementSelector/* && parentElementSelector == nodeValue*/){
                    result =  true;
                    break;
                };
                parent = parent.parentElement;
            };
            return result;
            
        };
        function getParentElement(evTarget, selector, nodeValue){
            var parentElementSelector, 
                parent = evTarget;
            if(evTarget.id=="ep_close") return false;
            while(parent.tagName !=="BODY"){
                switch(selector){
                    case 'id':
                    parentElementSelector = parent.id;
                    break;
                    case 'class':
                    parentElementSelector = parent.classList.contains(nodeValue)?parent:false;
                    break;
                    case 'attribute':
                    parentElementSelector = parent.hasAttribute(nodeValue)?parent:false;
                    break
                };
                if(parentElementSelector/* && parentElementSelector == nodeValue*/){
                    break;
                };
                parent = parent.parentElement;
            };
            if(parent.tagName == "BODY"){
                return false;
            }else{
                return parentElementSelector;
            }
            
        };

        function eventClickController(e){
            if(e.type =='click' && e.isTrusted===true){

                var evTarget = e&&e.target||event.srcElement,
                    parent = this,
                    dataPickerDiv = document.querySelector('#ui-datepicker-div'),
                    evAction = evTarget.hasAttribute('action')&&evTarget.getAttribute('action')||false,
                    evResponseHtml, ajaxObj={}, evForm = document.body.querySelector('#epcf'),evInputs;

                if(evTarget.id == 'ep_close'){
                    if (e.preventDefault) {
                        e.preventDefault();
                    } else {
                        e.returnValue = false;
                    };
                    controllerResult = {};
                    ep.remove();
                    return false;
                }
                if(evTarget.classList.contains('label')){

                    var labelParent = getParentElement(evTarget, 'class', 'ev-label');
                        labelChbx = epcf.querySelector('#' + labelParent.id.substring(3));
                        /*labelParent.remove();*/
                        labelChbx.checked = false;
                        evTarget = labelChbx;
                        /*labelChbx.checked = false;
                        labelChbx.value = false;
                        changeDataOnBlur.call(parent, labelChbx);

                        for(key in parent.fieldResult){
                            controllerResult[key] = parent.fieldResult[key];
                        };
                        return controllerResult;*/

                        /*return controllerResult;*/
                }
                
                    
                /*click in input text field*/
                if(evTarget.tagName == "INPUT" && evTarget.type == "text" || evTarget.type == "textarea"){
                    if('undefined' == typeof controllerResult[evTarget.name]){
                        controllerResult[evTarget.name] = {};
                    }
                    if(evTarget.classList.contains('hasDatepicker')){
                        controllerResult[evTarget.name][evTarget.id] = false;
                        return controllerResult;
                        /*ui-datepicker-div
                        do nothing;*/
                    }else if(evTarget.classList.contains('hasWickedpicker')){
                        controllerResult[evTarget.name][evTarget.id] = false;
                        return controllerResult;
                    }else{
                        evTarget.addEventListener('blur', changeDataOnBlur.bind(parent));
                        for(key in parent.fieldResult){
                            controllerResult[key] = parent.fieldResult[key];
                        };
                        return controllerResult;
                    }               
                };
                /*click in classic input checkbox field*/
                if(evTarget.tagName == "INPUT" && evTarget.type == "checkbox"){
                    evTarget.value = evTarget.checked;
                    changeDataOnBlur.call(parent, evTarget);
                    for(key in parent.fieldResult){
                        controllerResult[key] = parent.fieldResult[key];
                    };
                    return controllerResult;
                };
                /*click in link whith input checkbox field inside*/
                if(evTarget.tagName == 'A' && !hasParentElement(evTarget, 'id', 'ui-datepicker-div') && evTarget.firstElementChild && evTarget.firstElementChild.type =="checkbox"){
                    var colorInput = evTarget.parentElement.querySelector('input');

                    evTarget.firstElementChild.value = evTarget.firstElementChild.checked = evTarget.firstElementChild.checked?false:true;

                    evTarget.style.border = colorInput.checked?'3px solid green':'1px solid #ddd';
                    changeDataOnBlur.call(parent, evTarget.firstElementChild);
                    for(key in parent.fieldResult){
                        controllerResult[key] = parent.fieldResult[key];
                    };
                    return controllerResult;                
                };

                if(evTarget.tagName == 'SELECT'){

                    changeDataOnBlur.call(parent, evTarget);
                    for(key in parent.fieldResult){
                        controllerResult[key] = parent.fieldResult[key];
                    };
                    return controllerResult;
                    
                };

                if(evTarget.tagName == 'IMG' && hasParentElement(evTarget, 'class', 'product-image') || evTarget.classList.contains('product-image')){ /*select product from slider*/
                    var productCbx, 
                        prodactCat = getParentElement(evTarget, 'attribute', 'product-type'),
                        productData;
                    if('object' != typeof controllerResult.products){
                        controllerResult.products = {};
                    }
                    if('object' != typeof controllerResult.products[prodactCat.getAttribute('product-type')]){
                        controllerResult.products[prodactCat.getAttribute('product-type')] = {};
                    }

                    if(!evTarget.classList.contains('product-image')){
                        productCbx = evTarget.parentElement;
                        productData = evTarget.getAttribute('p-data');
                        while(!productCbx.classList.contains('product-image')){
                            productCbx = productCbx.parentElement;
                        }
                    }else{
                        productData = evTarget.querySelector('img').getAttribute('p-data');
                        productCbx = evTarget;
                    }
                    if(productCbx.hasAttribute('checked')){
                        productCbx.setAttribute('checked',productCbx.getAttribute('checked')=="true"?'false':'true');

                        if(productCbx.getAttribute('checked')=="true"){
                            controllerResult.products[prodactCat.getAttribute('product-type')][productData] = false;
                        }else{
                            controllerResult.products[prodactCat.getAttribute('product-type')][productData] = true;
                        }
                    }else{
                        controllerResult.products[prodactCat.getAttribute('product-type')][productData] = true;
                        productCbx.setAttribute('checked','true');
                    }

                    return controllerResult;
                };
                if(evAction){
                    if(dataPickerDiv){
                        for(key in controllerResult[dataPickerDiv.name]){
                            if(controllerResult[dataPickerDiv.name][key]===false){
                                controllerResult[dataPickerDiv.name][key] = document.querySelector('#'+key).value;
                            }
                        }
                    }
                    evInputs = evForm.querySelectorAll('input, select');
                    for(var i =0, l=evInputs.length; i<l; i++){

                        if(evInputs[i].hasAttribute('required')){

                            if(checkDataOnBlur.call(null, evInputs[i])) return;
                            
                        }
                        if(evInputs[i].value && evInputs[i].classList.contains('hasWickedpicker')){

                            changeDataOnBlur.call(null, evInputs[i]);

                        }
                        if(evInputs[i].value&&evInputs[i].classList.contains('hasDatepicker')){

                            changeDataOnBlur.call(null, evInputs[i]);

                        }
                    }
                    evTarget.classList.toggle('pushed');
                    ajaxObj.reqSettings = {
                        action: 'add_new_event',
                        step: evAction,
                        cur_step: document.querySelector('.ep_nav_info').id,
                        event_popup: 'get'
                    };
                    ajaxObj.publishSettings = {
                        parent: document.body,
                        contContainer: ep,
                        responsePlace: "beforeEnd",
                        target: evTarget
                    };
                    if(evTarget.id == 'event_btn'){
                        if (e.preventDefault) {
                            e.preventDefault();
                        } else { /*  IE8-:*/
                            e.returnValue = false;
                        };
                        
                        if(checkTheFieldsData(controllerResult)){
                            controllerResult.submitData = document.querySelector('#submit').value;
                            submitEvent({reqSettings:ajaxObj.reqSettings, publishSettings:ajaxObj.publishSettings, controllerResult:controllerResult});
                        }

                        return;
                    }
                    sendEvAjax(ajaxObj);
                }

            }
        };

        function doNotUnload(e){
            if (e.preventDefault) {
                e.preventDefault();
            } else { /*  IE8-:*/
                e.returnValue = false;
            }
        };
        


        function checkTheFieldsData(controllerResult){
            var inputFields = document.querySelectorAll('#new_event_form input');
            for(key in inputFields){
                if(inputFields[key].id && inputFields[key].value != false && !controllerResult[inputFields[key].id]){
                    controllerResult[inputFields[key].id] = inputFields[key].value;
                }else if(inputFields[key].id && !inputFields[key].value && inputFields[key].hasAttribute('required')){
                    return false;
                }
            };
            return controllerResult;
        };

        function submitEvent(controllerResult){

            sendEvAjax(controllerResult);
            return;
            var submissionReq = new XMLHttpRequest();
            submissionReq.open("POST", ajaxurl+'?action=emefs&data=json&submit_type=new_event');
            submissionReq.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            submissionReq.onreadystatechange = function () {
                if (submissionReq.readyState != 4 || submissionReq.status != 200){
                } else {
                }
            };
            submissionReq.send(JSON.stringify(controllerResult));
        };
        eventModul.getEventFieldsData = function(){
            console.log(controllerResult);
        };
        eventModul.getEventFieldsErrorData = function(){
            console.log(fieldError);
        };
        function emeChangeMonthPrev(e){

            e.preventDefault();
            tableDiv = jQuery(emeCalendarData.emeCalendar);
            jQuery(emeCalendarData.emeCalendar +' a.prev-month').html('<img src="http://testforeach.pp.ua/media/plugins/events-made-easy/images/spinner.gif">');
            loadCalendar(tableDiv, 
                         emeCalendarData.emeViewOption, 
                         emeCalendarData.emeLongEvents,
                         emeCalendarData.emePrevMonth,
                         emeCalendarData.emePrevYear,
                         emeCalendarData.emeCategory,
                         emeCalendarData.emeAuthor,
                         emeCalendarData.emeContactPerson,
                         emeCalendarData.emeLocationId,
                         emeCalendarData.emeNoCategory,
                         emeCalendarData.emeTemplateId,
                         emeCalendarData.emeHolidayId,
                         emeCalendarData.emeWeekdays);
        };

        document.querySelector('.eme-calendar-table a.prev-month').addEventListener('click', emeChangeMonthPrev);

        function emeChangeMonthNext(e){
            e.preventDefault();
            tableDiv = jQuery(emeCalendarData.emeCalendar);
            jQuery(emeCalendarData.emeCalendar +' a.next-month').html('<img src="http://testforeach.pp.ua/media/plugins/events-made-easy/images/spinner.gif">');
            loadCalendar(tableDiv, 
                         emeCalendarData.emeViewOption, 
                         emeCalendarData.emeLongEvents,
                         emeCalendarData.emeNextMonth,
                         emeCalendarData.emeNextYear,
                         emeCalendarData.emeCategory,
                         emeCalendarData.emeAuthor,
                         emeCalendarData.emeContactPerson,
                         emeCalendarData.emeLocationId,
                         emeCalendarData.emeNoCategory,
                         emeCalendarData.emeTemplateId,
                         emeCalendarData.emeHolidayId,
                         emeCalendarData.emeWeekdays);
        };

        document.querySelector('.eme-calendar-table a.next-month').addEventListener('click', emeChangeMonthNext);

        function show_the_day_events(evTarget, events_data){
            var ajaxObj = {};
            ajaxObj.reqSettings = {action: 'eme', get_the_day_events: events_data};
            ajaxObj.publishSettings = {parent: document.body,
                                        contContainer: "undefined"==typeof ep?false:ep,
                                        responsePlace: "afterBegin",
                                        target: evTarget};
            sendEvAjax(ajaxObj);
        };

        function prepareForPopUp(){
//TODO
        }

        function changeImgHeight(parentRow){

                var prodImg = parentRow.querySelectorAll('.front-image'),
                imgRect = [], imgHeight, heightObj = {}, sortedHeight=0;

                for(var i=0, l=prodImg.length;i<l;i++){
                    imgHeight = prodImg[i].getBoundingClientRect();
                    imgHeight = imgHeight.bottom - imgHeight.top;
                    if(!imgHeight){continue;};
                    imgRect.push(imgHeight);
                }

                for (var i = 0, l = imgRect.length; i < l; i++) {
                    var str = imgRect[i];
                    if(!heightObj[str]){
                        heightObj[str] = 1;
                    }
                    heightObj[str] += 1;
                };

                for (key in heightObj){
                    if(sortedHeight < heightObj[key]){
                        imgHeight = key;
                        sortedHeight = heightObj[key];
                    }
                }

                for(var i=0, l=prodImg.length;i<l;i++){
                    sortedHeight = prodImg[i].getBoundingClientRect();
                    sortedHeight = sortedHeight.bottom - sortedHeight.top;
                    if(sortedHeight != imgHeight-15){
                        prodImg[i].style.height = imgHeight -10 + 'px';
                    };
                }
           
        }

        function tabActions(e){
            var evTarget = e&&e.target||event.srcElement;
            evTarget = evTarget.parentElement;

            if(evTarget.classList.contains('active')){
                return;
            }
            if(evTarget.hasAttribute('product-type')){
               var evProductType = evTarget.getAttribute('product-type'),
               productsLists = document.querySelectorAll('#block-new-event-our-products > .row');
               productsTabs = document.querySelectorAll(".ev-form-part .tab");

               for(var i=0,l=productsTabs.length;i<l;i++){
                if(productsTabs[i].classList.contains('active')){
                    productsTabs[i].classList.toggle('active');
                    productsLists[i].classList.toggle('hide-this');
                    
                }
                if(productsTabs[i].getAttribute('product-type')==evProductType){
                    productsLists[i].classList.toggle('hide-this');
                    productsTabs[i].classList.toggle('active');
                    if(!evTarget.hasAttribute('visited')){
                        setTimeout(changeImgHeight.bind(null, productsLists[i]),100);
                        evTarget.setAttribute('visited',"true");
                    }
                    
                    
                }
                
               }
            }
        }
        
        function setPopUpActions(actionType){
            var mainContainer = document.querySelector("#main-content").getBoundingClientRect(),
            evDataForm =  document.querySelector('#event_data_form'),
            mainContHight = mainContainer.bottom - mainContainer.top,
            mainContWidth = mainContainer.right - mainContainer.left,
            evPopUp = document.querySelector('#ev-popup-container'),
            epcf = document.querySelector('#epcf'),
            ep = document.querySelector('#ep'),
            evClose = document.querySelector('#ep_close'),
            eventCategorySel = document.querySelector('#event_category_ids');
            //TODO:refactoring
            /*testforeach.pp.ua*/
            if(window.location.hostname =="testforeach.pp.ua"){
                if(null!==document.querySelector('.add-to-cart-button')) {
                    var forRemove = document.querySelectorAll('.add-to-cart-button');
                    for(var i=0, l=forRemove.length; i<l;i++){
                        forRemove[i].remove();
                    }
                };
                if(null!==document.querySelector('.price')) {
                    var forRemove = document.querySelectorAll('.price');
                    for(var i=0, l=forRemove.length; i<l;i++){
                        forRemove[i].remove();
                    }
                };
                if(null!==evPopUp.querySelector('.product-image a')) {
                    var forRemove = evPopUp.querySelectorAll('.product-image a');
                    for(var i=0, l=forRemove.length; i<l;i++){
                        forRemove[i].href = '#';
                    }
                };
                if(null!==evPopUp.querySelector('.product-bg')) {
                    var forRemove = evPopUp.querySelectorAll('.product-bg');
                    for(var i=0, l=forRemove.length; i<l;i++){
                        forRemove[i].remove();
                    }
                };
                if(null!==evPopUp.querySelector('.featured-product>a')) {
                    var forRemove = evPopUp.querySelectorAll('.featured-product>a'),
                        product, key;
                    for(var i=0, l=forRemove.length; i<l;i++){
                        forRemove[i].remove();
                    }
                };
                if(null!==evPopUp.querySelector('.product-image>a')) {
                    var forRemove = evPopUp.querySelectorAll('.product-image>a'),
                        product, key;
                    for(var i=0, l=forRemove.length; i<l;i++){
                        product = forRemove[i].href.split('/');
                        key = product[product.length-1].length?product.length-1:product.length-2;
                        forRemove[i].querySelector('img').setAttribute('p-data', product[key]);
                        forRemove[i].href = '#';
                    }
                };
                if(null!==document.querySelector('.quicks-view')) {
                    var forRemove = document.querySelectorAll('.quicks-view');
                    for(var i=0, l=forRemove.length; i<l;i++){
                        forRemove[i].remove();
                    }
                };
                if(null!==document.querySelector('.product-text')) {
                    var forRemove = document.querySelectorAll('.product-text');
                    for(var i=0, l=forRemove.length; i<l;i++){
                        forRemove[i].remove();
                    }
                };
            };
            

            /*testforeach.pp.ua*/
            if(window.location.hostname =="toryart.lo"){
                if(null!==evPopUp.querySelector('.product-bg')) {
                    var forRemove = evPopUp.querySelectorAll('.product-bg');
                    for(var i=0, l=forRemove.length; i<l;i++){
                        forRemove[i].remove();
                    }
                };
                if(null!==evPopUp.querySelector('.featured-product>a')) {
                    var forRemove = evPopUp.querySelectorAll('.featured-product>a'),
                        product, key;
                    for(var i=0, l=forRemove.length; i<l;i++){
                        product = forRemove[i].href.split('/');
                        key = product[product.length-1].length?product.length-1:product.length-2;
                        forRemove[i].querySelector('img').setAttribute('p-data', product[key]);
                        forRemove[i].href = '#';
                    }
                };
                if(null!==document.querySelector('.product-text')) {
                    var forRemove = document.querySelectorAll('.product-text');
                    for(var i=0, l=forRemove.length; i<l;i++){
                        forRemove[i].remove();
                    }
                };
                if(null!==document.querySelector('.yith-wcwl-add-to-wishlist')) {
                    var forRemove = document.querySelectorAll('.yith-wcwl-add-to-wishlist');
                    for(var i=0, l=forRemove.length; i<l;i++){
                        forRemove[i].remove();
                    }
                };            
                if(null!==document.querySelector('.quicks-view')) {
                    var forRemove = document.querySelectorAll('.quicks-view');
                    for(var i=0, l=forRemove.length; i<l;i++){
                        forRemove[i].remove();
                    }
                };
                if(null!==document.querySelector('.front-image')) {
                    var forRemoveStyle = document.querySelectorAll('.front-image');
                    for(var i=0, l=forRemoveStyle.length; i<l;i++){
                        forRemoveStyle[i].style.cssText = '';
                        forRemoveStyle[i].classList.add('pseudo-chbx');
                    }
                };
                if(null!==evPopUp.querySelector('.sliderControlls ')) {
                    var forRemove = evPopUp.querySelectorAll('.sliderControlls ');
                    for(var i=0, l=forRemove.length; i<l;i++){
                        forRemove[i].remove();
                    }
                };
            };
            //TODO end
            if(null!==document.querySelector('#block-new-event-our-products > .row')) {
                var forHide = document.querySelectorAll('#block-new-event-our-products > .row'),
                productTypes = document.querySelectorAll(".ev-form-part .tab"),
                tabsContainer = document.querySelector('.tabs');
                tabsContainer.addEventListener('click', tabActions);
                
                for(var i=0, l=forHide.length; i<l;++i){
                    if(i) forHide[i].classList.add('hide-this');
                    forHide[i].setAttribute('product-type', productTypes[i].getAttribute('product-type'));
                }
                document.querySelector('.tab.active').setAttribute('visited', 'true');
                setTimeout(changeImgHeight.bind(null, forHide[0]),300);

                var productsContainer = document.querySelector('#block-new-event-our-products');

            };

            if(null!==document.querySelector('.checkboxes-filter')){
                var flwFilter = document.querySelector('#flower_filter'),
                    colorFilter = document.querySelector('#color_filter');
                    colorFilter.addEventListener('input', autocompliteFilter);
                    flwFilter.addEventListener('input', autocompliteFilter);
            }
            

            if(actionType[0] = 'styles'){
                epcf.style.height = mainContHight*0.8 + 'px';
                epcf.style.width = mainContHight*1.6 + 'px';
            };
            
            if(eventCategorySel){
                eventCategorySel.addEventListener('change',function(e){
                    var evTarget = e&&e.target||event.srcElement,
                        customEventCat = document.querySelector('#custom_event_category');
                    if(!customEventCat) return;

                    if (evTarget.value == 'custom_event_category'&&customEventCat.hasAttribute('disabled')){
                        customEventCat.removeAttribute('disabled');
                        customEventCat.setAttribute('required', 'required');

                    }else if (evTarget.value != 'custom_event_category'&&!customEventCat.hasAttribute('disabled')){
                        customEventCat.setAttribute('disabled',true);
                        customEventCat.removeAttribute('required');
                        delete controllerResult[evTarget.name].custom_event_category;
                    };
                    return;
                });
            }
        };

        function autocompliteFilter(e){
            var evTarget = e&&e.target||event.srcElement,
                filterDataNode = epcf.querySelectorAll('.filter-data'),
                filterDataObj;
                for(key in filterDataNode){
                    if(filterDataNode[key].getAttribute('filter')==evTarget.id){
                        filterDataNode = filterDataNode[key];
                        break;
                    }
                }
                filterDataObj = createFilterDataObj(filterDataNode.querySelectorAll('label'), 'filter-selector');

                for(key in filterDataObj){
                    if(key.indexOf(evTarget.value.toLowerCase())>-1){
                        filterDataObj[key].parentElement.style.display = "";
                    }else{
                        filterDataObj[key].parentElement.style.display = "none";
                    }
                }

        };
        function createFilterDataObj(selectorList, selectorAttrib){
            var propName, propNode, resultObj={};
            for(var i=0, l = selectorList.length; i<l; i++){
                if(propName = selectorList[i].getAttribute(selectorAttrib)){
                    resultObj[propName.toLowerCase()] = selectorList[i];
                }
            }
            return resultObj;
        };

        function productsClick(e){
                var evTarget = e&&e.target||event.srcElement,
                    productCbx;
            if(!evTarget.classList.contains('product-image')){
                productCbx = evTarget.parentElement;
                while(!productCbx.classList.contains('product-image')){
                    productCbx = productCbx.parentElement;
                }
            }else{
                productCbx = evTarget;
            }
                if(productCbx.hasAttribute('checked')){

                productCbx.setAttribute('checked',productCbx.getAttribute('checked')=="true"?'false':'true');
                }else{
                productCbx.setAttribute('checked','true');
                }

        }

        Object.size = function(obj) {
                var size = 0, key;
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) size++;
                }
                return size;
            };

        function sendEvAjax(ajaxObj){
            prepareForPopUp();
            var popUpReq,
                fetchObj={},
                reqData = '?',
                objSize,
                iter = 0;
            if(ajaxObj.controllerResult){
                var data = new FormData();
                ajaxObj.reqSettings.data = "json";
                data.append( "json", JSON.stringify( ajaxObj.controllerResult ) );
                fetchObj.body = JSON.stringify(ajaxObj.controllerResult);
                fetchObj.method = "POST";
                fetchObj.credentials = "same-origin";
                fetchObj.headers = {"Content-Type":"application/json; charset=UTF-8",'Cache': 'no-cache'};
            }else{
                fetchObj.method = "get";
                fetchObj.credentials = "same-origin";
                fetchObj.headers = {"Content-Type":"application/json; charset=UTF-8",'Cache': 'no-cache'};
            };
            objSize = Object.size(ajaxObj.reqSettings);
            for(key in ajaxObj.reqSettings){
                iter++;
                reqData +=key+'='+ajaxObj.reqSettings[key];
                reqData += objSize == iter?'':'&';
            }
            
            popUpReq = fetch(ajaxurl+reqData, fetchObj).then(function(response){return response.json();}).then(function(data){publishHtml(data,ajaxObj)});
        };

        function publishHtml(data,ajaxObj){

            if(ajaxObj.controllerResult){
                var emecContainer = document.querySelector('.entry-content');
                emecContainer.innerHTML = '';
                emecContainer.insertAdjacentHTML('afterBegin',data);
                document.querySelector('#ep').remove();
                controllerResult = ajaxObj = {};
                

                return;
            }
            if(ajaxObj.publishSettings.target.classList.contains('show-day-events')){
                var eventContainerWrap = document.createElement('div'),
                eventContainer = document.createElement('div'),
                eventContainerSlyle = document.createElement('style'),
                eventContainerClose = document.createElement('div'),
                styleText;
                eventContainerWrap.id = 'my_events_wrapper';
                eventContainer.id = 'my_events_container';
                eventContainerClose.id = 'event_container_close';
                eventContainerClose.classList.add("close-button");
                eventContainerWrap.appendChild(eventContainer);
                eventContainer.appendChild(eventContainerClose);
                styleText = '#my_events_wrapper{z-index:999!important;position: absolute;top: 0px!important;left: 0px!important;width: 100%!important;height: 100%!important;background: rgba(0, 86, 72, 0.59);}#my_events_container{-moz-box-shadow: 0 15px 20px rgba(0,0,0,.22),0 19px 60px rgba(0,0,0,.3);-ms-box-shadow: 0 15px 20px rgba(0,0,0,.22),0 19px 60px rgba(0,0,0,.3);box-shadow: 0 15px 20px rgba(0,0,0,.22), 0 19px 60px rgba(0,0,0,.3);-ms-transform: translate(-50%, -500%);-o-transform: translate(-50%, -500%);-moz-transition: -moz-transform 0.6s ease-out;-o-transition: -o-transform 0.6s ease-out;transition: transform 0.6s ease-out;position: absolute;top: 25%!important;left: 40%!important;padding-left: 30px!important;padding-right: 30px!important;border: 3px solid #005648;background:white!important;z-index:1000!important;}.close-button{display:inline-block;margin-top:-50px;margin-right:-50px;float:right;width:30px;height:30px;padding:0;border:2px solid #ccc;-webkit-border-radius:25px;-moz-border-radius:25px;-ms-border-radius:25px;-o-border-radius:25px;border-radius:25px;background-color:#005648;-webkit-box-shadow:0 0 10px #000;-moz-box-shadow:0 0 10px #000;box-shadow:0 0 10px #000;text-align:center;text-decoration:none;font:20px Tahoma,Arial,sans-serif;font-weight:700;-webkit-transition:all ease .8s;-moz-transition:all ease .8s;-ms-transition:all ease .8s;-o-transition:all ease .8s;transition:all ease .8s;z-index:1001!important}.close-button:before{color:rgba(255,255,255,.9);content:"X";text-shadow:0 -1px rgba(0,0,0,.9);font-size:15px}.close-button:hover{background-color:rgba(252,20,0,.8);-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg)}';
                eventContainerSlyle.innerText = styleText;
                eventContainer.insertAdjacentHTML(ajaxObj.publishSettings.responsePlace, data);
                document.body.appendChild(eventContainerSlyle);
                document.body.appendChild(eventContainerWrap);
                document.body.addEventListener('click', removeEventContainer);
                function removeEventContainer(e){
                    var evTarget = e&&e.target||event.srcElement,
                        eventContainerWrapper = document.querySelector('#my_events_wrapper');
                    if(evTarget.id =='my_events_wrapper'){
                        document.body.removeEventListener('click', removeEventContainer);
                        evTarget.remove();
                        eventContainerSlyle.remove();
                    };
                    if(evTarget.id =='event_container_close'){
                        document.body.removeEventListener('click', removeEventContainer);
                        eventContainerWrapper.remove();
                        eventContainerSlyle.remove();
                    };
                };
                if(ajaxObj.publishSettings.publishAction){
                    ajaxObj.publishSettings.publishAction.init();
                }
                return;
            }
            if(ajaxObj.publishSettings.target.href !='#emefsPopUp'){
                ajaxObj.publishSettings.target.classList.toggle('pushed');

            }

            if(ajaxObj.publishSettings.contContainer){
                ajaxObj.publishSettings.contContainer.remove();
            }

            ajaxObj.publishSettings.parent.insertAdjacentHTML(ajaxObj.publishSettings.responsePlace, data);

            if(ajaxObj.publishSettings.publishAction){
                    ajaxObj.publishSettings.publishAction.init();
            }else if(emeCalendarData.jsActionsTrigger){
                    emeCalendarData.jsActionsTrigger.init();
            }
            setTimeout(function(){prepareDataIfExists(controllerResult)},100);
            console.log(document.querySelector("#main-content").getBoundingClientRect());
            setPopUpActions(['styles']);
        };
        function isEmptyObj(obj) {
            if (obj == null) return true;
            if (obj.length > 0)    return false;
            if (obj.length === 0)  return true;
            if (typeof obj !== "object") return true;
            for (var key in obj) {
                if (hasOwnProperty.call(obj, key)) return false;
            }
            return true;
        }

        function prepareDataIfExists(controllerResult){
            if(isEmptyObj(controllerResult)) return;
            var dataField;
            for(key in controllerResult){
                
                
            /*if(['event_flower', 'event_color'].indexOf(key)>-1) */
                if('object' == typeof controllerResult[key]) {
                    
                    prepareDataIfExists(controllerResult[key]);continue;
                };
                dataField = document.querySelector('#'+key);
                if(!dataField) continue;
                if(dataField.tagName == "SELECT"){
                    for(i in dataField.options){
                        if(dataField.options[i].value == controllerResult[key]){
                            dataField.selectedIndex = i;
                        }
                    }
                };
                if(dataField.type != "checkbox" && ["INPUT","TEXTAREA"].indexOf(dataField.tagName)>-1){
                    dataField.value = controllerResult[key];
                    dataField.hasAttribute('disabled')?dataField.removeAttribute('disabled'):'';
                };
                if(dataField.type == "checkbox"){
                        dataField.value = controllerResult[key];
                        dataField.checked = controllerResult[key];                    
                }
            }
        };

        function getEventPopUp(evTarget, evData){
            prepareForPopUp();
            var ajaxObj = {};
                emeCalendarData.jsActionsTrigger = {
                                                    init : function(){
                                                    /*tpActions.test();*/
                                                    dpActions.test();
                                                    /*tpActions.init();*/
                                                    dpActions.init();
                                                }
                            };

            ajaxObj.reqSettings = {action: 'add_new_event', event_popup: 'get', evDay: evData};
            ajaxObj.publishSettings = {parent: document.body,
                                        contContainer: "undefined"==typeof ep?false:ep,
                                        responsePlace: "beforeEnd",
                                        target: evTarget,
                                        publishAction: emeCalendarData.jsActionsTrigger};

            sendEvAjax(ajaxObj);
        }

        function getEvDay(targetNode){
            var eventDay,
                targetNode = getParentElement(targetNode, 'class', 'ev-day')?getParentElement(targetNode, 'class', 'ev-day'):targetNode;
            if(false !== targetNode && targetNode.tagName == 'TD' && targetNode.classList.contains('ev-day')){
                eventDay = targetNode.id.split('-');
                return eventDay[eventDay.length - 1];
            }else{
                return false;
            }
        };

        function checkEventObj(e){

            var evTarget = e&&e.target||event.srcElement,
                evTargetParent=evTarget.parentElement,
                this_month = emeCalendarData.emeSelectedMonth,
                this_year = emeCalendarData.emeSelectedYear,
                this_day = getEvDay(evTarget),
                this_data = this_day+'.'+this_month+'.'+this_year;

            if(evTarget.tagName=="A"&&evTarget.href.indexOf("#emefsPopUp")>-1){
                getEventPopUp(evTarget, '');
                if (e.preventDefault) {
                            e.preventDefault();
                        } else {
                            e.returnValue = false;
                        };
                
                return false;
            }
            if(evTarget.tagName != 'A' && getParentElement(evTarget, 'class', 'ev-day')!==false){
                /*while(evTargetParent.tagName!="TR"){
                    evTargetParent = evTargetParent.parentElement;
                }
                if(evTargetParent.classList.contains('event-days')){*/
                    prepareForPopUp();
                    getEventPopUp(evTarget, this_data);
                    return;
                /*}*/
            }
            if(evTarget.tagName=='A'&&evTarget.classList.contains('show-day-events')){
                
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                };
                while(evTargetParent.tagName!="TD"){
                    evTargetParent = evTargetParent.parentElement;
                }
                var this_day = evTargetParent.id.split('-');
                show_the_day_events(evTarget, this_year+'-'+this_month+'-'+this_day[this_day.length - 1]);
                return false;
            }

        };
        function createHelper(e){
            
            if(!showingTooltip){
                var eventToolTip = document.createElement('div');
                eventToolTip.className = 'tooltip';
                eventToolTip.id = 'evHelper';
                eventToolTip.innerHTML = 'add new event';
            }else{
                var eventToolTip = showingTooltip;
            }
            var evTarget = e&&e.target||event.srcElement,
                left = e.clientX, top = e.clientY;          
            
            left = left + 110;
            top = top +50;

            eventToolTip.style.left = left + 'px';
            eventToolTip.style.top = top + 'px';
            document.body.appendChild(eventToolTip);
            showingTooltip = eventToolTip;
        };

        function calendarHelperIn(e){

            var evTarget = e&&e.target||event.srcElement;
            if (currentElem) return;

            if(evTarget.tagName =='A'||evTarget.tagName =='LI') return;
            while (evTarget != this) {
            if (evTarget.tagName == 'TD') break;
                evTarget = evTarget.parentNode;
            }
            if (evTarget == this) return;
            if(evTarget.classList.contains('ev-day')){
                currentElem = evTarget;
                currentElem.classList.add('add-icon');
                /*currentElem.addEventListener('mousemove', createHelper);*/
            }
            
            
        };
        function calendarHelperOut(e){
            if (!currentElem) return;
            if (e.relatedTarget === undefined) {
                if (e.type == 'mouseover') e.relatedTarget = e.fromElement;
                if (e.type == 'mouseout') e.relatedTarget = e.toElement;
              }
            var evTarget = e&&e.target||event.srcElement;
            var relatedTarget = e.relatedTarget;
            if (relatedTarget) {
                while (relatedTarget) {
                    if(relatedTarget.tagName =='A'||relatedTarget.tagName =='LI'){
                        
                        currentElem.classList.remove('add-icon');
                        currentElem.removeEventListener('mousemove', createHelper);
                        if(showingTooltip) showingTooltip.remove(); 
                        currentElem = null;
                        return;
                    }
                    if (relatedTarget == currentElem) return;
                    relatedTarget = relatedTarget.parentNode;
                }
            }
            currentElem.classList.remove('add-icon');
            currentElem.removeEventListener('mousemove', createHelper);
            currentElem = null;
            
            if(showingTooltip) showingTooltip.remove();         
            
        };
        document.body.addEventListener('click', checkEventObj);
        var evetCalendar = document.querySelector('.eme-calendar-table'),
            currentElem = null,
            showingTooltip;
        if('null' != typeof evetCalendar){
            var currentElem = null;
            evetCalendar.addEventListener('mouseover', calendarHelperIn);
            evetCalendar.addEventListener('mouseout', calendarHelperOut);
        };
        return eventModul;
    }(customEventModul || {}));

/*event_form_js end*/

    };
if ('undefined' != typeof emeCalendarData){
     emeListenerDriver(emeCalendarData, true); 
};

    


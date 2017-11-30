<div class ="container" id="mainContainer">
	<div class="composer-form">
	<input id = "complite-url" name="website" type="text" placeholder="input url">
	<input id = "runCompose" type="button" onClick = "composeRequest()" value ="Создать URL">
	<input id = "showCompose" type="button" onClick = "showRequest()" value ="Показать созданные URL">
	<div class = "result-container" id = "result">
		<a href="#" target="_blank"></a>
	</div>
	<div class="view-container">
		<textarea id = "contentContainer"></textarea>
	</div>

</div>

<script>

	var startCompose = document.querySelector('#runCompose'),
		composeUrl = document.querySelector("#complite-url"),
		showResults = document.querySelector('#contentContainer'),
		resultField = document.querySelector('#result').firstElementChild,
		ajaxurl = '<?php echo admin_url('admin-ajax.php'); ?>';
		
		function showRequest(){
			jQuery.post(
							ajaxurl,
							{
							'action': 'showComposedUrls',
							},
							function(response,q,w){
								showResults.value='';

								if (w.responseText =='error'){
									showResults.value = 'Request or server error ' + response;
								}else {	
									response = response.split('*urlComposerRes*')[1];			
									showResults.value = response;
								}
							});
			
		}
		function composeRequest(){

						jQuery.post(
							ajaxurl,
							{
							'action': 'urlComposerReq',
							'composedUrl': composeUrl.value
							},
							function(response,q,w){
								resultField.value = '----';
								if (w.responseText =='error'){
									resultField.innerText = 'Request or server error ' + response;
								}else {	
									response = response.split('*urlComposerRes*')[1];
									resultField.innerText = response;
									resultField.href = response;
								}
							}
					);
					};
</script>
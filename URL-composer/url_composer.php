<?php
   /*
   Plugin Name: URL Composer
   Plugin URI:
   Description: a plugin to compose URL
   Version: 1.1.1
   Author: Kostiantyn Manko
   Author URI:
   License:

   */
define( 'URLC_DIR', trailingslashit( plugin_dir_path( __FILE__ ) ) );
define( 'URLC_URI', trailingslashit( plugins_url( '', __FILE__ ) ) );

class URL_COMPOSER_BASE {
	function __construct(){
		$this->settings = array(
			'table_name' => 'url_composer',
			'request_border' => '*urlComposerRes*'
			);
		$this->init();
	}

	function init(){
		$this->create_new_dp_table();
		add_action('admin_menu', array( &$this, 'create_menu' ) );
		add_action('wp_ajax_urlComposerReq', array(&$this, 'request_driver'));
		add_action('wp_ajax_showComposedUrls', array(&$this, 'request_driver'));
		add_action('wp_ajax_nopriv_showComposedUrls', array(&$this, 'request_driver'));
		new URL_COMPOSER_VIEW;
		
	}

	function create_menu(){
			$page_title = 'URL Composer';
			$menu_title = 'URL Composer';
			add_menu_page($page_title, $menu_title, 7, 'url-composer' , array( &$this, 'url_composer_page' ));
			wp_enqueue_style('urlc-style', URLC_URI.'views/css/urlc-main.css');
		}

		function url_composer_page(){
			echo "<br>On this page you can create and view composed url. <br>";
			echo "<br>http://www.valentingunko.com.ua/print/?utm_source=google&utm_medium=test_chanel&utm_term=3d&utm_content=print&utm_campaign=tory3D";
			$file = URLC_DIR.'views/url_composer_page.php';

			if( !file_exists( $file ) ) {
				echo '!file_exists( $file )';
				return; }

			ob_start();
			include $file;
			$urlc_page = ob_get_contents();
			ob_end_clean();
			echo $urlc_page;
			die();
			}

	function instance_driver(){
		$url = $_SERVER["HTTP_REFERER"];
		$instance_url = '';
		$wp_admin = strpos($url, "wp-admin");
		if ($wp_admin !== false){
			$url_path = explode('wp-admin', $url);
			return $url_path[0];
		}
		return $instance_url;
	}

	function request_driver(){

		if (empty($_REQUEST)||!isset($_REQUEST['action'])) exit;
		
		if ($_REQUEST['action']=='urlComposerReq' && isset($_REQUEST['composedUrl'])){
			$short_url = $this->parse_users_url($_REQUEST['composedUrl']);
			$this->add_url_to_db($_REQUEST['composedUrl'], $short_url);
			echo $this->settings['request_border'].$this->instance_driver().$short_url.$this->settings['request_border'];
			exit;
			
		}
		if ($_REQUEST['action']=='showComposedUrls'){
			global $wpdb;
			$table_name = $wpdb->prefix . $this->settings['table_name'];
			$str="<-- START REPORT -->\n\n";
			$wpdb->show_errors();

			$results = $wpdb->get_results("SELECT * FROM $table_name");
			foreach ($results as $key => $value){
				$result_number = $key+1;
				$str_border = "=====================================================================\n";
				$str .= "\t№".$result_number."\n";
				$str .= "\t FULL URL:\n".$value->native_url."\n";
				$str .= "\n\t SHORT URL:\n".$this->instance_driver().$value->short_url."\n".$str_border;
			}

			$str.= "\n<-- END OF REPORT -->";
			echo $this->settings['request_border'].$str.$this->settings['request_border'];
			exit;
		}
		

	}

	function parse_users_url($url){
		$url_parts = parse_url($url);
		$second_part = '';
		foreach ($url_parts as $key => $value){
			if ($key == 'scheme' || $key =='host'){
				continue;
			} else {
				$second_part .= $value;
			}
		}
		return $this->code_url($second_part);
	}

	function code_url($url){
		return $url = md5($url);
	}

	function add_url_to_db($native_url, $short_url){
		global $wpdb;
		$wpdb->show_errors();
		$table_name = $wpdb->prefix . $this->settings['table_name'];
		
		$wpdb->insert($table_name, 
						  array(
						  	'native_url'=>$native_url, 
						  	'short_url'=>$short_url),
						  array('%s',
						  		'%s'));
	}

	function create_new_dp_table(){
		global $wpdb;
		$wpdb->show_errors();
		$table_name = $wpdb->prefix . $this->settings['table_name'];

		if($wpdb->get_var("SHOW TABLES LIKE '$table_name'") == $table_name) return;

		$sql = "CREATE TABLE " . $table_name . " (
    	  id mediumint(9) NOT NULL AUTO_INCREMENT,
    	  native_url longtext NOT NULL,
    	  short_url VARCHAR(100) NOT NULL,
    	  UNIQUE KEY  id (id,short_url)
    	);";
 
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);

	}
}

class URL_COMPOSER_VIEW {
	function __construct(){
		//add_action('template_redirect', array(&$this, 'composed_urls_driver'));
	}

	function composed_urls_driver(){
		global $wp_query, $wpdb;
		
		$table_name = 'url_composer';
		$table_name = $wpdb->get_blog_prefix() . $table_name;
		$url_for_checking = explode('/', $_SERVER["REQUEST_URI"]);
		$index = count($url_for_checking);
		$url_for_checking = $url_for_checking[$index - 1];

		if (is_404()){
			//var_dump($_SERVER);
			//return;
			//var_dump(file_exists(get_404_template()));
			$composed_URL = $wpdb->get_results("SELECT native_url, short_url FROM $table_name WHERE short_url= \"$url_for_checking\"");

			if (empty($composed_URL)){
				status_header(404);
				nocache_headers();
				//echo "hellow world!!!";
				include( get_404_template() );
				exit();
			} else {
			print_r($composed_URL[0]->native_url);
				wp_redirect($composed_URL[0]->native_url);
				exit();

			}
			
		}
		
	}
	
}

new URL_COMPOSER_BASE;

?>
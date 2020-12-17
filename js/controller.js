var appXTweb = angular.module('appXTweb', []);

appXTweb.controller('mainController', ['$scope', '$http', function($scope, $http) {
	
	var url = "http://api.wunderground.com/api/6010eb931ae088e0/geolookup/conditions/forecast/q/autoip.json?callback=JSON_CALLBACK";
	$scope.predefinedMaxLinks = 5;
	$scope.weatherLocation = "";
	$scope.conditionImage = "";
	$scope.conditionTemp = "";
	$scope.forecastday =[];
	if (window.matchMedia("(min-width: 1230px)").matches) {
    $scope.windowWidth = 3;
	} else if (window.matchMedia("(min-width: 768px)").matches) {
    $scope.windowWidth = 2;
	}else{
		$scope.windowWidth = 1;
	}
	
	var needDataUpdate = true;
	var now = new Date();
	
	if (!localStorage.localWeatherData){
		localStorage.localWeatherData = JSON.stringify({});
	}else{
		if (!localStorage.lastWeatherDataUpdate)
			localStorage.lastWeatherDataUpdate = now;
		else{
			var lastWeatherDataUpdate = Date.parse(localStorage.lastWeatherDataUpdate);
			if(now-lastWeatherDataUpdate < (1000*60*60)){
				needDataUpdate = false;
				populateWeather(JSON.parse(localStorage.localWeatherData));
			}
		}
			
	}
	if(needDataUpdate){
		localStorage.lastWeatherDataUpdate = now;
		$http.jsonp(url)
		  .success(function(data){
	      $scope.weatherData = data;
	      localStorage.localWeatherData = JSON.stringify(data);
	      
				if(!angular.isUndefined($scope.weatherData)){
					populateWeather($scope.weatherData)
				}
		  });
	}
	
	function populateWeather(weatherData){
		$scope.weatherLocation = weatherData.location.city;
		$scope.conditionImage = getImageUrl(weatherData.current_observation.icon);
		$scope.conditionImageTitle = weatherData.current_observation.weather;
		$scope.conditionTemp = weatherData.current_observation.temp_c;
		$scope.forecastday = weatherData.forecast.simpleforecast.forecastday;
		for(var day in $scope.forecastday){
			if(day>0){
				$scope.forecastday[day].conditionImage = getImageUrl($scope.forecastday[day].icon);
			}
		}
		
		var d = new Date(localStorage.lastWeatherDataUpdate);
		var dDate = d.getDate();
	  var dMonth = d.getMonth() + 1; //Months are zero based
	  var dYear = d.getFullYear();
	  var dHours = d.getHours();
	  var dMinutes = d.getMinutes();
		$scope.lastWeatherDataUpdate = dYear + "-" + dMonth + "-" + dDate + " at " + dHours +":"+ dMinutes;
		
    //$scope.test = weatherData;
	}
	
	function getImageUrl(weather){
		if(weather=="chanceflurries"||weather=="chancesleet"||weather=="sleet"||weather=="flurries")
			return "images/icons/sleet.svg";
		if(weather=="clear"||weather=="sunny"||weather=="mostlysunny")
			return "images/icons/clear.svg";
		if(weather=="chancerain"||weather=="rain")
			return "images/icons/rain.svg";
		if(weather=="chancesnow"||weather=="snow")
			return "images/icons/snow.svg";
		if(weather=="chancetstorms"||weather=="tstorms")
			return "images/icons/tstorms.svg";
		if(weather=="cloudy")
			return "images/icons/cloudy.svg";
		if(weather=="fog")
			return "images/icons/fog.svg";
		if(weather=="hazy")
			return "images/icons/hazy.svg";
		if(weather=="mostlycloudy")
			return "images/icons/mostlycloudy.svg";
		if(weather=="partlycloudy"||weather=="partlysunny")
			return "images/icons/partlycloudy.svg";
		return "images/icons/unknown.svg";
	}
	
	/*
	$http({method: 'GET', url: 'http://api.wunderground.com/api/6010eb931ae088e0/geolookup/conditions/q/autoip.json'}).
    success(function(data, status, headers, config) {
    	$scope.test2 = data;
    	
  	});
	*/
	$scope.selectedIndex = -1; // Whatever the default selected index is, use -1 for no selection

  $scope.itemClicked = function ($index) {
  	if($scope.selectedIndex == $index)
  		$scope.selectedIndex = null;
  	else
    	$scope.selectedIndex = $index;
  };
  
	$scope.links=[
				    {
				        "catName": "Webmails",
				        "catLinks": [
				            {
				                "linkName": "GMAIL",
				                "linkUrl": "http://mail.google.com/mail/"
				            },
				            {
				                "linkName": "YAHOO MAIL",
				                "linkUrl": "https://login.yahoo.com/config/mail?.intl=us"
				            },
				            {
				                "linkName": "HOTMAIL",
				                "linkUrl": "http://www.hotmail.com/"
				            },
				            {
				                "linkName": "OVH",
				                "linkUrl": "http://www.ovh.com/fr/index.xml"
				            },
				            {
				                "linkName": "OVH PHPMYADMIN",
				                "linkUrl": "https://phpmyadmin.ovh.net/"
				            },
				            {
				                "linkName": "OVH WEBMAIL",
				                "linkUrl": "http://webmail.ovh.net/"
				            },
				            {
				                "linkName": "EmailR",
				                "linkUrl": "http://www.emailr.com/"
				            }
				        ]
				    },
				    {
				        "catName": "Social",
				        "catLinks": [
				            {
				                "linkName": "GOOGLE +",
				                "linkUrl": "https://plus.google.com/"
				            },
				            {
				                "linkName": "FACEBOOK",
				                "linkUrl": "http://www.facebook.com"
				            },
				            {
				                "linkName": "LINKEDIN",
				                "linkUrl": "http://www.linkedin.com/"
				            },
				            {
				                "linkName": "TWITTER",
				                "linkUrl": "http://twitter.com/"
				            }
				        ]
				    },
				    {
				        "catName": "Dictionnaires",
				        "catLinks": [
				            {
				                "linkName": "DICTIONNAIRE",
				                "linkUrl": "http://www.le-dictionnaire.com/"
				            },
				            {
				                "linkName": "SYNONYMES",
				                "linkUrl": "http://elsap1.unicaen.fr/cgi-bin/cherches.cgi"
				            },
				            {
				                "linkName": "GOOGLE Translate",
				                "linkUrl": "http://www.google.com/language_tools?hl=fr"
				            },
				            {
				                "linkName": "PHONETIQUE",
				                "linkUrl": "http://dictionary.reference.com/"
				            },
				            {
				                "linkName": "WordReference",
				                "linkUrl": "http://www.wordreference.com/"
				            },
				            {
				                "linkName": "CONJUGAISON",
				                "linkUrl": "http://www.leconjugueur.com/"
				            },
				            {
				                "linkName": "CONVERTISSEUR",
				                "linkUrl": "http://www.le-convertisseur.com/"
				            },
				            {
				                "linkName": "Figures de style",
				                "linkUrl": "http://www.bacdefrancais.net/figures.htm"
				            }
				        ]
				    },
				    {
				        "catName": "Banques",
				        "catLinks": [
				            {
				                "linkName": "Deutsche Bank",
				                "linkUrl": "https://secure.deutschebank.be/login/login.cgi?language=fr"
				            },
				            {
				                "linkName": "CHASE",
				                "linkUrl": "https://www.chase.com"
				            },
				            {
				                "linkName": "CITIBANK",
				                "linkUrl": "http://www.citibank.be/home.asp?lang=fr"
				            },
				            {
				                "linkName": "SOCIETE GENERALE",
				                "linkUrl": "http://www.particuliers.societegenerale.fr/"
				            },
				            {
				                "linkName": "ING BELGIUM",
				                "linkUrl": "http://homebank.ing.be"
				            },
				            {
				                "linkName": "CREDIT AGRICOLE",
				                "linkUrl": "http://www.credit-agricole.fr/"
				            },
				            {
				                "linkName": "PayPal",
				                "linkUrl": "http://www.paypal.fr/fr"
				            },
				            {
				                "linkName": "GOOGLE Finance",
				                "linkUrl": "http://www.google.com/finance"
				            },
				            {
				                "linkName": "MINT",
				                "linkUrl": "https://wwws.mint.com/"
				            }
				        ]
				    },
				    {
				        "catName": "Plans-Itinéraires",
				        "catLinks": [
				            {
				                "linkName": "GOOGLE Maps",
				                "linkUrl": "http://maps.google.fr/"
				            },
				            {
				                "linkName": "BINGMaps",
				                "linkUrl": "http://www.bing.com/maps/"
				            },
				            {
				                "linkName": "VIAMICHELIN",
				                "linkUrl": "http://www.viamichelin.com/viamichelin/fra/tpl/hme/MaHomePage.htm"
				            },
				            {
				                "linkName": "MAPPY",
				                "linkUrl": "http://www.mappy.com/"
				            }
				        ]
				    },
				    {
				        "catName": "Annuaires",
				        "catLinks": [
				            {
				                "linkName": "PAGES D'OR",
				                "linkUrl": "http://www.pagesdor.be/displayhome.ds"
				            },
				            {
				                "linkName": "PAGES JAUNES",
				                "linkUrl": "http://www.pagesjaunes.fr"
				            },
				            {
				                "linkName": "LES ANNUAIRES",
				                "linkUrl": "http://www.lesannuaires.com/"
				            },
				            {
				                "linkName": "INFO BEL",
				                "linkUrl": "http://www.infobel.com/fr/belgium"
				            }
				        ]
				    },
				    {
				        "catName": "Videos",
				        "catLinks": [
				            {
				                "linkName": "YOUTUBE",
				                "linkUrl": "http://www.youtube.com/"
				            },
				            {
				                "linkName": "DAILYMOTION",
				                "linkUrl": "http://www.dailymotion.com/fr"
				            },
				            {
				                "linkName": "NETFLIX",
				                "linkUrl": "http://www.netflix.com/"
				            },
				            {
				                "linkName": "COUCHTUNER",
				                "linkUrl": "http://www.couchtuner.eu/"
				            }
				        ]
				    },
				    {
				        "catName": "Fonts",
				        "catLinks": [
				            {
				                "linkName": "GOOGLE Fonts",
				                "linkUrl": "http://www.google.com/fonts"
				            },
				            {
				                "linkName": "URBANFONTS",
				                "linkUrl": "http://www.urbanfonts.com/"
				            },
				            {
				                "linkName": "DAFONT",
				                "linkUrl": "http://www.dafont.com/"
				            }
				        ]
				    },
				    {
				        "catName": "Images",
				        "catLinks": [
				            {
				                "linkName": "GOOGLE Images",
				                "linkUrl": "http://images.google.com/"
				            },
				            {
				                "linkName": "FOTOLIA",
				                "linkUrl": "http://fr.fotolia.com/partner/200629665"
				            },
				            {
				                "linkName": "DREAMSTIME",
				                "linkUrl": "http://www.dreamstime.com/"
				            }
				        ]
				    },
				    {
				        "catName": "Documents",
				        "catLinks": [
				            {
				                "linkName": "GOOGLE Drive",
				                "linkUrl": "http://drive.google.com/"
				            },
				            {
				                "linkName": "PDF ONLINE",
				                "linkUrl": "http://www.pdfonline.com/"
				            },
				            {
				                "linkName": "YOUSENDIT",
				                "linkUrl": "http://www.yousendit.com/"
				            }
				        ]
				    },
				    {
				        "catName": "Voyages",
				        "catLinks": [
				            {
				                "linkName": "BXL AIRPORT",
				                "linkUrl": "http://www.brusselsairport.be/fr/"
				            },
				            {
				                "linkName": "SN",
				                "linkUrl": "http://www.flysn.be/fr_be/home/default.aspx"
				            },
				            {
				                "linkName": "AF",
				                "linkUrl": "http://www.airfrance.com"
				            },
				            {
				                "linkName": "RYANAIR",
				                "linkUrl": "http://www.ryanair.com/site/FR/"
				            },
				            {
				                "linkName": "JETAIR",
				                "linkUrl": "http://www.jetair.be/fr/reserver-enligne"
				            },
				            {
				                "linkName": "JETBLUE",
				                "linkUrl": "http://www.jetblue.com/"
				            },
				            {
				                "linkName": "HERTZ",
				                "linkUrl": "https://www.hertz.com/"
				            },
				            {
				                "linkName": "SNCB",
				                "linkUrl": "http://www.b-rail.be/main/F/index.php"
				            },
				            {
				                "linkName": "SNCF",
				                "linkUrl": "http://www.voyages-sncf.com/leisure/fr/launch/home/"
				            },
				            {
				                "linkName": "TRIPADVISOR",
				                "linkUrl": "http://www.tripadvisor.com/"
				            },
				            {
				                "linkName": "EXPEDIA",
				                "linkUrl": "http://www.expedia.com"
				            }
				        ]
				    },
				    {
				        "catName": "Musique",
				        "catLinks": [
				            {
				                "linkName": "DEEZER",
				                "linkUrl": "http://www.deezer.com/"
				            },
				            {
				                "linkName": "GROOVESHARK",
				                "linkUrl": "http://www.grooveshark.com/"
				            },
				            {
				                "linkName": "PANDORA",
				                "linkUrl": "http://www.pandora.com/"
				            }
				        ]
				    },
				    {
				        "catName": "Colors",
				        "catLinks": [
				            {
				                "linkName": "GRADIENT",
				                "linkUrl": "http://www.colorzilla.com/gradient-editor/"
				            },
				            {
				                "linkName": "KULER",
				                "linkUrl": "https://kuler.adobe.com/create/color-wheel/"
				            }
				        ]
				    },
				    {
				        "catName": "Icons",
				        "catLinks": [
				            {
				                "linkName": "ICONFINDER",
				                "linkUrl": "https://www.iconfinder.com/"
				            },
				            {
				                "linkName": "ICONSEEKER",
				                "linkUrl": "http://iconseeker.com/"
				            },
				            {
				                "linkName": "ICONBUG",
				                "linkUrl": "http://iconbug.com/"
				            },
				            {
				                "linkName": "ICONARCHIVE",
				                "linkUrl": "http://www.iconarchive.com/"
				            },
				            {
				                "linkName": "VERYICON",
				                "linkUrl": "http://www.veryicon.com/"
				            }
				        ]
				    },
				    {
				        "catName": "Université",
				        "catLinks": [
				            {
				                "linkName": "ICHEC.BE",
				                "linkUrl": "http://www.ichec.be"
				            },
				            {
				                "linkName": "ICHEC.NET",
				                "linkUrl": "http://www.ichec.net"
				            },
				            {
				                "linkName": "CICHEC.BE",
				                "linkUrl": "http://www.cichec.be"
				            },
				            {
				                "linkName": "AIESEC",
				                "linkUrl": "http://www.aiesec.net/"
				            },
				            {
				                "linkName": "ICHEC CAMPUS",
				                "linkUrl": "http://www.icheccampus.ichec.be/"
				            },
				            {
				                "linkName": "ALICHEC",
				                "linkUrl": "http://www.alichec.be/"
				            },
				            {
				                "linkName": "CEE-ICHEC",
				                "linkUrl": "http://www.cee-ichec.be/"
				            }
				        ]
				    },
				    {
				        "catName": "GSM",
				        "catLinks": [
				            {
				                "linkName": "PROXIMUS",
				                "linkUrl": "http://customer.proximus.be/fr/index.html"
				            },
				            {
				                "linkName": "BASE",
				                "linkUrl": "https://www.kpnonline.be/"
				            },
				            {
				                "linkName": "MOBISTAR",
				                "linkUrl": "http://www.mobistar.be/"
				            },
				            {
				                "linkName": "Quel Opérateur?",
				                "linkUrl": "http://www.1399.be/"
				            }
				        ]
				    },
				    {
				        "catName": "Shopping",
				        "catLinks": [
				            {
				                "linkName": "AMAZON",
				                "linkUrl": "http://www.amazon.com/"
				            },
				            {
				                "linkName": "AMAZON FR",
				                "linkUrl": "http://www.amazon.fr/"
				            },
				            {
				                "linkName": "GOOGLE Play",
				                "linkUrl": "http://www.play.google.com/"
				            },
				            {
				                "linkName": "CDISCOUNT",
				                "linkUrl": "http://www.cdiscount.com/home/default.asp"
				            },
				            {
				                "linkName": "EBAY",
				                "linkUrl": "http://www.befr.ebay.be/"
				            },
				            {
				                "linkName": "FNAC",
				                "linkUrl": "http://www.fnac.com/"
				            },
				            {
				                "linkName": "TOP ACHAT",
				                "linkUrl": "http://www.topachat.com/accueil/index.php"
				            },
				            {
				                "linkName": "RUE DU COMMERCE",
				                "linkUrl": "http://www.rueducommerce.fr/home/index.htm"
				            },
				            {
				                "linkName": "MONSIEURPRIX",
				                "linkUrl": "http://www.monsieurprix.com/"
				            }
				        ]
				    },
				    {
				        "catName": "Informations",
				        "catLinks": [
				            {
				                "linkName": "CNN",
				                "linkUrl": "http://www.cnn.com/"
				            },
				            {
				                "linkName": "BBC",
				                "linkUrl": "http://news.bbc.co.uk/"
				            },
				            {
				                "linkName": "EURONEWS",
				                "linkUrl": "http://www.euronews.net/"
				            },
				            {
				                "linkName": "LE SOIR",
				                "linkUrl": "http://www.lesoir.be/"
				            },
				            {
				                "linkName": "L'ÉCHO",
				                "linkUrl": "http://www.lecho.be/home"
				            },
				            {
				                "linkName": "DH",
				                "linkUrl": "http://www.dhnet.be/index.php"
				            },
				            {
				                "linkName": "7SUR7",
				                "linkUrl": "http://www.7sur7.be/"
				            },
				            {
				                "linkName": "FIGARO",
				                "linkUrl": "http://www.lefigaro.fr/"
				            },
				            {
				                "linkName": "MONDE",
				                "linkUrl": "http://www.lemonde.fr/"
				            },
				            {
				                "linkName": "FrAndroid",
				                "linkUrl": "http://www.frandroid.com/"
				            },
				            {
				                "linkName": "FEEDLY",
				                "linkUrl": "http://feedly.com/"
				            }
				        ]
				    }
				];
}]);
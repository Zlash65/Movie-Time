var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http){

	$scope.init = function() {
		var flag = 0;
		$.getJSON('./assets/genres.json', function(data) {         
			$scope.type = data;
		});
	};

	var refresh = function(){
		$http.get('/movietime/').then(function onSuccess(response){
			$scope.movie = response.data.results;
		});
	};

	refresh();

	$scope.trigger_search = function(e) {
		var key = e.which;
		if (key === 13) $scope.search();
	};

	$scope.search = function(){
		$scope.name = angular.element($('#search')).val();
		$http.get('/movietime/' + $scope.name).then(function onSuccess(response){
			$scope.movie = response.data.results;
		});
	};

	$('#movie').on('click', function(){
		$('#tv').removeClass('active');
		$('#movie').addClass('active');
	});
	$('#tv').on('click', function(){
		$('#movie').removeClass('active');
		$('#tv').addClass('active');
	});

	$scope.search_genre = function(event) {
		var selected = event.srcElement.id;
		var genre = event.srcElement.dataset.genre;
		$('.type').removeClass('active');
		$('#'+selected).addClass('active');
		$http.get('/movietime/genre/' + genre).then(function onSuccess(response){
			$scope.movie = response.data.results;
		});
	};

}]);
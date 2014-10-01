var app = angular.module('lightangular', ['ui.bootstrap.progressbar']);

app.controller('mainCtrl', ['$scope','$timeout', '$http', function($scope, $timeout, $http){
		
		//init vals
		$scope.dynamic = 0;
		$scope.duration = 2000;
		$scope.interval = 200;
		$scope.max = parseInt($scope.duration/$scope.interval);
	   
	    var timer;
	    var progMsg ="";

		$scope.progress = function(){
			$scope.dynamic++;
			
			var percent_lsj = parseInt( 100 * ($scope.dynamic / $scope.max));
			if(percent_lsj>100) percent_lsj = 100;
			$scope.percent_lsj = percent_lsj;
			$scope.progMsg = "Progress" + percent_lsj +  "%";
			
			timer = $timeout(function(){
				$scope.progress();
			}, $scope.interval);

			if($scope.dynamic >= $scope.max){
				$scope.progMsg = "The task is 100% completed";
				$scope.stop();
			}
		}

		$scope.startProgress = function(){
			$scope.dynamic = 0.0001 ;
			timer = $timeout(function(){
				$scope.progress();
			}, $scope.interval);
		}

		$scope.restart = function(){
			$('.progress-bar').removeAttr('style');
			$('#myModal').modal('show');
		}

		$scope.stop = function(){
			$timeout.cancel(timer);
		}

		$('#myModal').on('shown.bs.modal', function(e){
			$scope.startProgress();
		}).on('hide.bs.modal', function(){
			$scope.stop();
		});

	    (function() {
		     // get JSON data 
		     $http({method: 'GET', url: '/js/data.json'}).
				    success(function(data, status, headers, config) {
				  
				     	$scope.dynamic = data.data.lightbox.start;
						$scope.finish = data.data.lightbox.finish;
						$scope.duration = data.data.lightbox.duration;
						//$scope.interval = 200;
						$scope.max = parseInt($scope.duration/$scope.interval);
						$('#myModal').modal('show');
				    }).
				    error(function(data, status, headers, config) {
				      // called asynchronously if an error occurs
				      // or server returns response with an error status.
				    });
   
		 }());
	     
}]);
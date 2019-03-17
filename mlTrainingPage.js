

const app = angular.module('myApp', ['ui.slider']);
app.controller('mlTrainingPage', ($scope, $http) => {
  const backendUrl = 'http://0.0.0.0:8001';
  $scope.start = 0;
  $scope.end = 10;

  $('#capture_btn').on('click', function () {
    var data = $.param({start: $scope.start, end: $scope.end});
    $http({
        method: 'POST',
        url: `${backendUrl}/videoTrimmer`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data:data,
      }).success((res) => {
         console.log('SUCCESS');
         alert("video trimmed!!!!");
      }).error((res) => {
         console.log('status : ' + status);
      });
});

$scope.updateFoo = function (newFoo) {
    $scope.foo = newFoo;
}
var vm = this;

vm.priceSlider = {
    minValue: 200,
    maxValue: 300,
    options: {
        floor: 0,
        ceil: 500,
    }
}
});
app.directive("player", function() {
  return {
      restrict : "E",
    //   scope: {
    //     isolatedAttributeFoo:'@attributeFoo',
    // },
      template : '<div class="wide">'+
                  '<video width= "100%" autoplay controls>'+
                  '<source ng-src="img/testVideo.mp4" type="video/mp4" /></video></div>' +
                   '<slider floor="0" ceiling="{{ duration }}" step="0.1" precision="10" ng-model-low="start" '+
                   'ng-model-high="end" change="onTrimChange($scope)"></slider>' + 
                   '<span class = "spec">Start = {{ start }}</span><span class = "spec">Current = {{ current }}</span>'+
                   '<span class = "spec">End = {{ end }}</span>'+
                   '<rzslider rz-slider-model="brightness_slider.value"'+
                   'rz-slider-options="brightness_slider.options"></rzslider><br>',
      link: function(scope, element,attrs){
        console.log("link");
        video = element.find('video');
        video.on('loadeddata', function (e) {
          scope.$apply(function () {
              scope.start = 0;
              scope.end = e.target.duration;
              scope.current = scope.start;
              scope.currentPercent = scope.start;
              scope.duration = scope.end;
          });
      });

      video.on('timeupdate', function (e) {
        scope.$apply(function () {
            scope.current = (e.target.currentTime - scope.start);
            scope.currentPercent = (scope.current / (scope.end - scope.start)) * 100;
            if (e.target.currentTime < scope.start) {
                e.target.currentTime = scope.start;
            }
            if (e.target.currentTime > scope.end) {
                if (video[0].paused === false) {
                    e.target.pause();
                } else {
                    e.target.currentTime = scope.start;
                }
            }
        });
    });
   
    scope.onTrimChange = function ($scope) {
        var interval;
        video[0].pause();
        interval = window.setTimeout(function () {
            video[0].currentTime = scope.start + ((scope.currentPercent / 100 ) * (scope.end - scope.start));
        }, 300);
    };
    
    scope.onSliderChange = function () {
      var interval;
        video[0].pause();
        if (interval) {
            window.clearInterval(interval);
        }
        interval = window.setTimeout(function () {
            video[0].currentTime = scope.start + ((scope.currentPercent / 100 ) * (scope.end - scope.start));
        }, 300);
    };
    
    scope.$watch('start', function (num) {
        if (num !== undefined) {
            video[0].currentTime = num;
        }
    });
    scope.$watch('end', function (num) {
        if (num !== undefined) {
            video[0].currentTime = num;
        }
    });
      }
  };



});
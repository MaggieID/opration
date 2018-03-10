tabsApp.controller("hotelCtrl", function($scope, ngAjax, $timeout, $ionicPopover, $ionicSlideBoxDelegate) {
  $scope.hotelList = [];
  $scope.curpage = 1;
  $scope.isnotlast = true;
  function init() {
    ngAjax.get(url_hotel + $scope.curpage).success(function(res) {
      if(res.length == 0) {
        $scope.isnotlast = false;
        return false;
      }
      if($scope.curpage == 1) {
        $scope.hotelList = res.msg;
      } else {
        $scope.hotelList = $scope.hotelList.concat(res); //合并数组
      }
      console.log("刷新后的数据:", $scope.hotelList);
      $scope.$broadcast('scroll.refreshComplete');
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  }
  $scope.doRefresh = function() {
    $scope.isnotlast = true; //上拉刷新时将显示底部加载动画
    $scope.curpage = 1; //下拉强制为1
    init();
  };
  $scope.loadMore = function() { //当有infinite的时候，进入页面首先会触发
    $scope.curpage++;
    init();
  }
});
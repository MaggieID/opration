tabsApp.controller("sightsCtrl",function($scope,ngAjax,$timeout,$ionicPopover,$ionicSlideBoxDelegate){
  url = url_banner;
  ngAjax.post(url).success(function(res){
    if (res.code == 1) {
      $scope.adslist = res.msg;
    } else {
      alert(res.msg);
    }
  });
});

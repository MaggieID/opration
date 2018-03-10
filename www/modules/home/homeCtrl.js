tabsApp.controller("homeCtrl",function($scope,ngAjax,$timeout,$ionicPopover,$ionicSlideBoxDelegate){
  url = url_banner;
  ngAjax.post(url).success(function(res){
    if (res.code == 1) {
      $scope.adslist = res.msg;
    } else {
      alert(res.msg);
    }
  });
  $scope.datalist=[];
    //模拟异步过程,网络请求数据
    $timeout(function(){
        $scope.datalist= $scope.adslist;
        //得到数据后应该更新以下控件服务
        $ionicSlideBoxDelegate.update();
        //用服务启动循环
        $ionicSlideBoxDelegate.loop(true);
    },200);
    $scope.prepage=function(){
        $ionicSlideBoxDelegate.previous();
    };
    $scope.nextpage=function(){
        $ionicSlideBoxDelegate.next()
    };
    $scope.chaPage=function(){
      /*  console.log("页面发生改变");
        console.log("当前页面:",$ionicSlideBoxDelegate.currentIndex() );*/
    };

    $ionicPopover.fromTemplateUrl("./modules/home/mypopover.html",{
        scope:$scope
    }).then(function(pop){
        $scope.mypop=pop;
    });

    $scope.openPop=function($event){
        $scope.mypop.show($event);
    }
    $scope.closePop=function(){
        $scope.mypop.hide();
    }
});

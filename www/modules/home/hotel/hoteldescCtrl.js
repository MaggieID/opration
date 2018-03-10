tabsApp.controller("hoteldescCtrl",function($scope,ngAjax,$stateParams,$rootScope,$timeout,
                                             $ionicLoading,$ionicNavBarDelegate,$state,$ionicPopup){
    $scope.curid = $stateParams.hid;
    $scope.userId = localStorage.getItem("uid");
    $scope.loadWait=function(){
        $ionicLoading.show({
            template:"加载中..."
        });
        $timeout(function(){
            $ionicLoading.hide();
        },3000)
    };
    $scope.loadWait();
    function myPro(){
        ngAjax.get(url_hotelone+$scope.curid).success(function( res ){
            console.log(res);
            $scope.hotel=res.data;
            $ionicNavBarDelegate.title($scope.hotel.hotelname);//设置标题
        });
    }
    myPro();
    $scope.chnum = function (num){
        if(num!=0){
            $scope.price+=num*step
        }
        if($scope.price<=0){
            $scope.price =step;
        }
    };

    $scope.tobuy = function(){
        if(localStorage.getItem("uid") == null){
            /*$state.go("tabs.mine",{openmodal:'yes'});*/
           var alertPopup = $ionicPopup.alert({
                title: '温馨提示',
                template: '您还未登录，暂不能购买！'
            });
            alertPopup.then(function(res) {});
        return false;
        }else{
            ngAjax.get(url_buy+"&pid="+$scope.curid+"&uid="+$scope.userId+"&money="+$scope.price+"&time="+$scope.time)
                .success(function( res ){
                $scope.buyyingDat=res;
                var confirmPopup = $ionicPopup.confirm({
                    title: res.msg
                });
                confirmPopup.then(function(res) {
                    if(res) {
                        myPro();
                        console.log('You are sure');
                    } else {
                        console.log('You are not sure');
                    }
                });
            });
        }
    }
});

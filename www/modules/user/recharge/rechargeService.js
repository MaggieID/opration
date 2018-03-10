tabsApp.service("rechargeService",function($ionicPopup,loginService){
	this.rechargeSer=function($scope,ngAjax){
        if($scope.rech.money==""||$scope.rech.money=="0"){
            var alertPopup = $ionicPopup.alert({
                title:"请输入标准金额"
            });
            alertPopup.then(function(res) {
            });
        }else if($scope.rech.money > 10000){
            var alertPopup = $ionicPopup.alert({
                title:"一次最多可充值10000元"
            });
            alertPopup.then(function(res) {});
        }else{
            ngAjax.get(url_setcash+"&uid="+$scope.userId+"&money="+$scope.rech.money)
                .success(function( res ){
                $scope.rechargeData=res;
                var alertPopup = $ionicPopup.alert({
                    title:res.msg
                });
                alertPopup.then(function(res) {
                    $scope.recharge.hide();
                    loginService.getUser($scope.userId,$scope);
                });
            });
        }
    }
});
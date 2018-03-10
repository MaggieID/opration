tabsApp.service("withdrawalsService",function($ionicPopup,loginService){
	this.withdrawalsSer=function($scope,ngAjax){
        if($scope.withd.money == ""||$scope.withd.money =="0"){
            var alertPopup = $ionicPopup.alert({
                title:"请输入标准金额"
            });
            alertPopup.then(function(res) {});
        }else if($scope.withd.money > 20000){
            var alertPopup = $ionicPopup.alert({
                title:"提现金额不能超过20000元"
            });
            alertPopup.then(function(res) {});
        }else if($scope.withd.money > $scope.userList.abvalue){
            var alertPopup = $ionicPopup.alert({
                title:"余额不足，无法提出！"
            });
            alertPopup.then(function(res) {});
        }else{
            ngAjax.get(url_getcash+"&uid="+$scope.userId+"&money="+$scope.withd.money)
                .success(function( res ){
                $scope.withdrawalsData=res;
                var alertPopup = $ionicPopup.alert({
                    title: res.msg
                });
                alertPopup.then(function(res) {
                    $scope.withdrawals.hide();
                    loginService.getUser($scope.userId,$scope);
                });
            });
        }
	}
});
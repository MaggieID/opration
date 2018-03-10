tabsApp.service("modalService",function($ionicModal){
    /*this.loginModal=loginModal=function($scope){
        return $ionicModal.fromTemplateUrl("./modules/user/login/login.html",{
            scope: $scope,//必须有
            animation: 'slide-in-up'
        })
    }*/

	this.mymodal1=function($scope){
        /*loginModal($scope).then(function(m){  //回调函数，做结果赋值
            $scope.login=m; //必须有
        });*/
       
    $ionicModal.fromTemplateUrl("./modules/user/login/login.html",{
        scope: $scope,//必须有
        animation: 'slide-in-up'
    }).then(function(m){  //回调函数，做结果赋值
        $scope.login=m; //必须有
    });

    $ionicModal.fromTemplateUrl("./modules/user/register/register.html",{
        scope: $scope,//必须有
        animation: 'slide-in-up'
    }).then(function(m){  //回调函数，做结果赋值
        $scope.register=m; //必须有
    });
    
    $ionicModal.fromTemplateUrl("./modules/user/setting/setting.html",{
        scope: $scope,//必须有
        animation: 'slide-in-up'
    }).then(function(m){  //回调函数，做结果赋值
        $scope.setting=m; //必须有
    });
    
    $ionicModal.fromTemplateUrl("./modules/user/withdrawals/withdrawals.html",{
        scope: $scope,//必须有
        animation: 'slide-in-up'
    }).then(function(m){  //回调函数，做结果赋值
        $scope.withdrawals=m; //必须有
    });
    
    $ionicModal.fromTemplateUrl("./modules/user/recharge/recharge.html",{
        scope: $scope,//必须有
        animation: 'slide-in-up'
    }).then(function(m){  //回调函数，做结果赋值
        $scope.recharge=m; //必须有
    });

    $ionicModal.fromTemplateUrl("./modules/user/userInfo/userInfo.html",{
        scope: $scope,//必须有
        animation: 'slide-in-up'
    }).then(function(m){  //回调函数，做结果赋值
        $scope.userInfo=m; //必须有
    });
    
    
    $scope.$on('modal.hidden', function() {
        console.log("隐藏");
    });
    $scope.$on('modal.removed', function() {
        console.log("删除模态框实例");
    });
    }
})
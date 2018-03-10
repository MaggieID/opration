tabsApp.service("refreshService",function(ngAjax){
    this.refreshSer=function($scope){
        url = url_login;
        ngAjax.post(url,$scope.log).success(function(res){
            ngAjax.get(url_userinfo+res.uid).success(function( res ){
                $scope.userList=res;
                console.log(res);
                if(res.username==""){
                    $scope.userList.userName ="金猪宝会员V"
                }else{
                    $scope.userList.userName = res.username;
                }
                $scope.userList.abvalue = res.abvalue;
                $scope.userList.acount = res.acount;
                $scope.userList.isnew = res.isnew;
                $scope.abvalue = res.abvalue;
                $scope.acount = res.acount;
                $scope.isnew = res.isnew;
            });
        })
    }

});
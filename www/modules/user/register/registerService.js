tabsApp.service("registerService",function($ionicPopup,ngAjax){
	this.registerSer=function($scope){
		if($scope.reg.phone.length==0){
            var alertPopup = $ionicPopup.alert({
                title: '注册提示',
                template: '手机号不能为空，请重新输入！'
            });
            alertPopup.then(function(res) {});
		  	return false;
		}
    	if($scope.reg.password.length==0){
            var alertPopup = $ionicPopup.alert({
                title: '注册提示',
                template: '密码不能为空，请重新输入'
            });
            alertPopup.then(function(res) {});
		  	return false;
		}
		if($scope.reg.repassword.length==0){
            var alertPopup = $ionicPopup.alert({
                title: '注册提示',
                template: '确认密码不能为空，请重新输入'
            });
            alertPopup.then(function(res) {});
		  	return false;
		}
        if($scope.reg.password!=$scope.reg.repassword){
            var alertPopup = $ionicPopup.alert({
                title: '注册提示',
                template: '两次密码输入不一致！'
            });
            alertPopup.then(function(res) {});
            return false;
        }		
		if($scope.reg.code.length==0){
            var alertPopup = $ionicPopup.alert({
                title: '注册提示',
                template: '验证码不能为空，请重新输入'
            });
            alertPopup.then(function(res) {});
			return false;
		}
        if($scope.reg.code!=rand){
            var alertPopup = $ionicPopup.alert({
                title: '注册提示',
                template: '验证码输入错误'
            });
            alertPopup.then(function(res) {});
            return false;
        }
        if($scope.ischecked == false){
            var alertPopup = $ionicPopup.alert({
                title: '注册提示',
                template: '您还未同意网站服务协议'
            });
            alertPopup.then(function(res) {});
            return false;
        }
        url = url_reg;
        ngAjax.post(url,$scope.reg).success(function(res){
            $scope.reg = res.code;
            var confirmPopup = $ionicPopup.confirm({
                title: '注册提示',
                template: res.msg
            });
            confirmPopup.then(function(res) {
                if(res) {
                    if($scope.reg == 1){
                        $scope.register.hide();
                        $scope.login.show(); 
                    }else if(res.msg ==""){ }
                    $scope.description="点击获取验证码";
                    return false;
                } else {
                    console.log('You are not sure');
                }
            });
        });
	};
	this.watch = function($scope){
        $scope.$watch("reg", function (newData, oldvData) {
            $scope.errorinfo=" ";
            if (!/^1[34578]\d{9}$/.test(newData.phone)) {
//                console.log("手机号码输入不正确");
                if(newData.phone.length==0){
                    $scope.errorinfo="";
                    return false;
                }
                $scope.errorinfo="请输入合法的手机号码";
                return false;
            } else {
                $scope.errorinfo="";
            }

            if (newData.password.length<6) {
                console.log("密码不能少于六位数");
                if(newData.password.length==0){
                    $scope.errorinfo="";
                    return false;
                }
                $scope.errorinfo="密码不能少于六位数";
                return false;
            } else {
                $scope.errorinfo="";
            }

            if (newData.repassword != newData.password) {
                console.log("两次密码输入不一致");
                if(newData.repassword.length==0){
                    $scope.errorinfo="";
                    return false;
                }
                $scope.errorinfo="两次密码输入不一致";
                return false;
            } else {
                $scope.errorinfo="";
//                console.log("密码输入正确");
            }
        }, true);
    }
});
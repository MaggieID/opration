tabsApp.service("loginService", function($ionicPopup, ngAjax) {
  this.getUser = getUser = function(uid, $scope) {
    ngAjax.post(url_login).success(function(res) {
      if(res.code == 0){
        
      }else{
        $scope.userList = res;
        console.log(res);
        if(res.username == "") {
          $scope.userList.userName = "金猪宝会员V"
        } else {
          $scope.userList.userName = res.nickname;
        }
      }
    });
  };
  this.loginSer = function($scope) {
    if($scope.log.phone.length == 0) {
      var alertPopup = $ionicPopup.alert({
        title: '登录提示',
        template: '手机号不能为空，请重新输入！'
      });
      alertPopup.then(function(res) {});
      return false;
    }
    if($scope.log.password.length == 0) {
      var alertPopup = $ionicPopup.alert({
        title: '登录提示',
        template: '密码不能为空，请重新输入'
      });
      alertPopup.then(function(res) {});
      return false;
    }
    url = url_login;
    ngAjax.post(url, $scope.log).success(function(res) {
      $scope.res = res.code;
      localStorage.setItem("uid", res.uid);
      getUser(res.uid, $scope);
      var alertPopup = $ionicPopup.alert({
        title: '登录提示',
        template: res.msg
      });
      alertPopup.then(function(res) {
        if($scope.res == 1) {
          $scope.user = "./assets/images/tou.jpg";
          $scope.login.hide();
          return false;
        }
      });
    });
  }
});
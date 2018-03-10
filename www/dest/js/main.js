tabsApp = angular.module("tabsApp",["ionic"]);
tabsApp.config(function($stateProvider,$urlRouterProvider,$ionicConfigProvider){
/*	消除平台差异*/
	$ionicConfigProvider.backButton.previousTitleText(false);
	$ionicConfigProvider.backButton.text("返回");
	$ionicConfigProvider.backButton.icon("ion-ios-arrow-back");//返回按钮
	$ionicConfigProvider.tabs.style("ios").position("bottom");//底部栏
	$ionicConfigProvider.navBar.alignTitle("center");//导航标题
	$ionicConfigProvider.form.checkbox("circle");//多选按钮

	$urlRouterProvider.otherwise("/tabsUrl/homeUrl");
    $stateProvider.state("tabs",{
        url:"/tabsUrl",
        abstract:true,
        templateUrl:"./modules/tabs.html"
    })
	.state("tabs.home",{
		url:"/homeUrl",
        cache:false,
		views:{
			tabhome:{
        templateUrl:"./modules/home/home.html",
        controller:"homeCtrl"
			}
		}		
	})
	.state("tabs.sights",{
    url:"/sightsUrl",
        cache:false,
    views:{
      tabhome:{
        templateUrl:"./modules/home/sights/sights.html",
        controller:"sightsCtrl"
      }
    }   
  })

	.state("tabs.hotel",{
    url:"/hotelUrl",
        cache:false,
    views:{
      tabhome:{
        templateUrl:"./modules/home/hotel/hotel.html",
        controller:"hotelCtrl"
      }
    }   
  })
	 .state("tabs.hoteldesc",{
    url:"/hoteldescUrl/:hid",
    cache:false,
    views:{
      tabProducts:{
        templateUrl:"./modules/home/hotel/hoteldesc.html",
        controller:"hoteldescCtrl"
      }
    }   
  })
	.state("tabs.find",{
		url:"/findUrl",
		views:{
			tabfind:{
				templateUrl:"./modules/find/find.html",
				controller:"findCtrl"
			}
		}		
	})
	.state("tabs.info",{
		url:"/infoUrl",
		views:{
			tabProducts:{
				templateUrl:"./modules/info/info.html",
                controller:"infoCtrl"
			}
		}		
	})
	/*.state("tabs.proDetailsc",{
		url:"/proDetailscUrl/:pid",
		cache:false,
		views:{
            tabhome:{
				templateUrl:"./modules/products/proDetails/proDetails.html",
                controller:"proDetailsCtrl"
			}
		}		
	})*/
	.state("tabs.mine",{
		url:"/mineUrl/:openmodal",
		cache:false,
		views:{
			tabMine:{
				templateUrl:"./modules/user/user.html",
				controller:"userCtrl"
			}
		}		
	})
});
tabsApp.controller("tabsCtrl",function($scope,$timeout){
//  console.log(999);
    /*$scope.start = localStorage.getItem("myId");
    if($scope.start == true){
        $state.go("tabs.home")
    }*/
});

tabsApp.filter("time",function(){
    return function(time){
        return new Date(parseInt(time)*1000).toLocaleString().substr(0,20);
    }
});
tabsApp.service("ngAjax",["$http",function($http){
    this.post=function(url,data){
        return $http({
            url:url,
            method:"post", //post请求默认提交不了表单参数
            data:data,
            async:false, 
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
            //设置请求头为表单提交方式
            transformRequest: function(obj) {
                //当data为json格式，必须使用transformRequest去将参数格式化
                var str = []; //定义新数组
                for (var p in obj) {   //键值对分离
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    //组装字符串后推入数组
                }
                return str.join("&");//使用&符号连接数组元素
            }
        });
    };
    this.get=function(url,paramObj){
        if(undefined==paramObj){
            paramObj={};
        }
      var gethttp = $http({
            url:url,
            method:"GET",
            async:false,
            params:paramObj
        });
        return gethttp;
    }
}]);


var urlbase="http://localhost/travel-server/";
var url_reg=urlbase+"users/doreg.php"; //注册路径
var url_login=urlbase+"users/dologin.php"; //登录路径
var url_banner = urlbase + "ads/gets.php";//轮播图
var url_hotel = urlbase + "hotel/gets.php?page=";//酒店
var url_hotelone = urlbase + "hotel/getone.php?hid=";//酒店

tabsApp.controller("findCtrl",function($scope,ngAjax){
  
});
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

tabsApp.controller("infoCtrl",function($scope,ngAjax){
  
});
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
tabsApp.controller("userCtrl",function($scope,ngAjax,modalService,loginService,registerService,$ionicLoading,
         withdrawalsService,rechargeService,$ionicPopup,$timeout,$stateParams,$ionicPopup){

	$scope.imgUrl="./assets/icons/openeye.png";
	$scope.userList={/*userName:"",abvalue:"",acount:"",isnew:""*/};
    $scope.userList.userName = "登录/注册";
    $scope.canClick=false;
    modalService.mymodal1($scope);
    $scope.userId = localStorage.getItem("uid");
    if($scope.userId == null){
        $scope.userList.userName = "登录/注册";
        $scope.user = "./assets/images/user.png"
    }else{
        loginService.getUser($scope.userId,$scope);
        $scope.user = "./assets/images/tou.jpg"
    }
    //登录界面
    $scope.log = {};
    $scope.log.phone = "";
    $scope.log.password = "";
    $scope.isCookie = true;
    //cookie
    function getCookie(c_name){
        if (document.cookie.length>0){
            c_start=document.cookie.indexOf(c_name + "=");
            if (c_start!=-1){
                c_start=c_start + c_name.length+1;
                c_end=document.cookie.indexOf(";",c_start);
                if (c_end==-1) c_end=document.cookie.length;
                return unescape(document.cookie.substring(c_start,c_end))
            }
        }
        return ""
    }

    function setCookie(c_name,value,expiredays){
        var exdate=new Date();
        exdate.setDate(exdate.getDate()+expiredays);
        document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
    }
    function clearCookie(cname) {
        setCookie(cname, "", -1);
    }
    $scope.myCookie = function(){
        $scope.isCookie = !$scope.isCookie;
    };
    $scope.loginShow = function(){
        $scope.userId = localStorage.getItem("uid");
        if($scope.userId == null){
            $scope.login.show(); //显示
            $scope.cusername = getCookie('myphone');
            $scope.cpassword = getCookie('mypasswd');
            if($scope.cusername != "" && $scope.cpassword != ""){
                $scope.log.phone = $scope.cusername;
                $scope.log.password = $scope.cpassword;
            }
        }else{
            $scope.userInfo.show();
        }
    };
    $scope.closelog=function(){
        $scope.login.hide();//隐藏
    };

    //登录操作
    $scope.doLog = function(){
        if($scope.isCookie == true){
            setCookie('myphone',$scope.log.phone, 7);
            setCookie('mypasswd', $scope.log.password, 7);
        }else{
            clearCookie('myphone');
            clearCookie('mypasswd');
        }
        loginService.loginSer($scope);
    };
    $scope.eyeflag=true;//判断标志
    $scope.chage=function(){
        $scope.eyeflag=!$scope.eyeflag;//点击切换，取反数据
        if($scope.eyeflag){
            $scope.imgUrl="./assets/icons/openeye.png";
            if($scope.userId == null){
	            $scope.aout="— —";
	            $scope.userList.abvalue="— —";
	            $scope.userList.acount="— —";
	            $scope.userList.isnew="— —";
	        }else{
	        	$scope.aout="— —";
	            $scope.userList.abvalue = $scope.abvalue;
	            $scope.userList.acount = $scope.acount;
	            $scope.userList.isnew = $scope.isnew;
	        }
        }else{
            $scope.imgUrl="./assets/icons/closeeye.png";
            $scope.aout="******";
            $scope.userList.abvalue="******";
            $scope.userList.acount="******";
            $scope.userList.isnew="******";
        }
    };
  
    $scope.userId = localStorage.getItem("uid");
    
	//注册界面  
    $scope.regShow = function(){
        $scope.register.show(); //显示
    };
    $scope.closereg=function(){
        $scope.register.hide();//隐藏
    };
    
    //注册操作
    x = 999999;
    y = 100000;
    function rr(){
       return rand = parseInt(Math.random() * (x - y + 1) + y);
    }

    $scope.description="获取验证码";
    var second=60;
    var timerHandler;
    $scope.reg = {username:"",phone:"",password :"",repassword:"",code:""};
    $scope.getCode=function(){
        $scope.description=rr();
        /*timerHandler=setInterval(function(){
            if(second > 0){
                $scope.description="("+second+"s)后重发";
                second--;
                $scope.canClick=true;
            }else{
                clearInterval(timerHandler);
                second=59;
                $scope.description="获取验证码";
                $scope.canClick=false;
            }
            console.log(second);
            $scope.$apply();
        },1000)*/
    };
    $scope.ischecked = true;
    $scope.isclick = function(){
        $scope.ischecked = !$scope.ischecked;
    };
    $scope.doReg = function(){
    	registerService.registerSer($scope);
    };

    //用户信息界面
    $scope.uaerInfoShow = function(){
        $scope.userInfo.show(); //显示
    };
    $scope.closeuaerInfo=function(){
        $scope.userInfo.hide();//隐藏
    };
    
    //设置界面
    $scope.settingShow = function(){
        $scope.userId = localStorage.getItem("uid");
        if($scope.userId == null){
            $scope.login.show();
            return false;
        }
        $scope.setting.show(); //显示
    };
    $scope.closesetting=function(){
        $scope.setting.hide();//隐藏
        console.log($scope.user);
    };
    //退出登录
    $scope.signOut = function(){
        localStorage.removeItem("uid");
        $scope.userList.abvalue="— —";
        $scope.userList.acount="— —";
        $scope.userList.isnew="— —";
        $scope.userList.userName = "登录注册";
        $scope.user = "./assets/images/user.png";
        $scope.setting.hide();
    };
    //注册信息检索
    registerService.watch($scope);
    
});
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
tabsApp.controller("transactionCtrl",function($scope,$ionicModal,ngAjax){
//    this.transactionSer=function($scope){
        $scope.userId = localStorage.getItem("uid");
        $scope.transactions=[];
        $scope.transpage=-1;
        $scope.isnotlast=true;
        function init(){
            ngAjax.get(url_funds + "&uid=" + $scope.userId + "&page=" + $scope.transpage).success(function (res) {
                if(res.length==0){
                    $scope.isnotlast=false;
                    return false;
                }
                if($scope.transpage==0){
                    $scope.transactions=res;
                }else{
                    $scope.transactions=$scope.transactions.concat(res); //合并数组
                }
                console.log("刷新后的数据:" ,$scope.transactions);
                $scope.$broadcast('scroll.refreshComplete');
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        }

        $scope.doRefresh=function(){
            $scope.isnotlast=true;//上拉刷新时将显示底部加载动画
            $scope.transpage=0; //下拉强制为0
            init();
        };
        $scope.loadMore=function(){  //当有infinite的时候，进入页面首先会触发
            $scope.transpage++;
            init();
        };
//    }
});

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
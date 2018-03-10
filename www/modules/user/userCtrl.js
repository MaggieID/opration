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
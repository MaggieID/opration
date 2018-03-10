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

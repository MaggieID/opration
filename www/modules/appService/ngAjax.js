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

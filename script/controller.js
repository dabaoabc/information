//为核心的AMail服务创建模块
var aInforServices = angular.module('information',['ngRoute']);

//在URL，模板和控制器之间建立映射关系
function inforRouteConfig($routeProvider){
	$routeProvider.
	when('/',{
		controller:'collectController',
		templateUrl:'collection.html'
	}).
	when('/list',{
		controller:'ListController',
		templateUrl:'list.html'
	}).
	//注意，为了创建详情视图，我们在id的前面加一个冒号，从而指定了一个参数化的url组件
	when('/view/:id',{
		controller:'DetailController',
		templateUrl:'detail.html'
	}).
	when('/add',{
		controller:'addController',
		templateUrl:'add.html'
	}).
	otherwise({
		redirectTo:'/'
	});
}
	//配置我们的路由，以便infor服务能够找到它
	aInforServices.config(inforRouteConfig);


var $rootScope;

aInforServices.controller('dataController', ['$http', function($http){
	$http.get("../information/json/information.json").success(function(response) {
    	$rootScope = response;
    });
}])

//把我们的信息发布给信息列表模板
aInforServices.controller('addController',function($scope){
	var id = $rootScope[$rootScope.length-1].id+1;
	var canClick = true;
	$scope.submit = function(){
		if (canClick) {
			if ($scope.formData.title != undefined && $scope.formData.message != '') {
				$scope.formData.id = id;
				$rootScope.push($scope.formData);
				var submit = angular.element(document.querySelector('#submit'));
				submit.addClass('submit');
				canClick = false;
				alert("提交成功");
			}else{
				alert("标题不能为空");
				return false;
			}
		}else{
			alert("您已提交");
			return false;
		}
		
	}
})
//收藏界面，主页
aInforServices.controller('collectController',['$scope',function($scope){
	$scope.messages = collect($rootScope);
}])

//列表页面
aInforServices.controller('ListController',function($scope){
	$scope.messages = $rootScope;
	$scope.hide = true;
	$scope.$watch('mysearch',function(string){
		if (string != undefined && string != '') {
			$scope.hide = false;
		}else{
			$scope.hide = true;
		}
	});
})

//详情页面
aInforServices.controller('DetailController',function($scope,$routeParams){
	$scope.message = $rootScope[$routeParams.id-1];
	if ($rootScope[$routeParams.id-1].collect) {
		$scope.isCollect = '已收藏';
		$scope.button_clicked = true;
		var isCollect = angular.element(document.querySelector('.isCollect'));
		isCollect.addClass('submit');
	}else{
		$scope.isCollect = '收藏';
	}
	$scope.collect = function(){
		$scope.isCollect = '已收藏';

		$rootScope[$routeParams.id-1].collect = true;
		var isCollect = angular.element(document.querySelector('.isCollect'));
		isCollect.addClass('submit');
		$scope.button_clicked = true;
	}
})


export const routes: (angular.ui.IState | any)[]   = [
  {
    abstract: true,
    name: 'beacon',
    templateUrl: 'assets/templates/common/content.html',
    controller: 'IndexController',
    url: '/',
    children: [
      {
        name: 'home',
        url: '',
        controller: 'HomeController',
        templateUrl: 'assets/templates/common/home.html'
      }
    ]
  }
];

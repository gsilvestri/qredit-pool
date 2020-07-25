var app = angular.module('delegateApp', []);

app.controller('indexCtrl', function($scope, $http) {
    $scope.accounts = [];
    $scope.lastpayout = 0;
    $scope.nextpayout = 0;

    $http.get ('poollogs.json').then (function (res) {
        $scope.lastforged = res.data.lastforged / 100000000;
        $scope.lastpayout = res.data.lastpayout * 1000;
        $scope.nextpayout = moment ($scope.lastpayout).add (1, 'week').valueOf();
        $scope.accounts = [];

        for (addr in res.data.accounts) {
            var it = res.data.accounts[addr];
            it['address'] = addr;
            $scope.accounts.push (it);
        }
    });

    $http.get('https://qredit.api.cryptdelegate.com/api/delegates/qredit_cryptography').then (function (res) {
        if (res.data) {
            if (res.data.data) {
                $scope.delegate = res.data.data;
            }
        }
    });
});

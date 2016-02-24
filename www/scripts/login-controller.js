myApp.controller('LoginController', function($scope, $loginservice,$timeout) {

    $scope.contratos=[];
    $scope.contrato=null;
    $scope.consumo=null;
    $scope.pagename=null;
    /*$scope.categories = [];
    $scope.subcategories = [];
    $scope.recy_ways = [];
    $scope.root_base = 'http://api-reciveci.rhcloud.com/';
    //$scope.root_base = 'http://192.168.10.115:3000/';
    //$scope.root_base = 'http://192.168.1.8:3000/';
    $scope.path_images_ways = 'assets/images/ways/';*/

    $scope.success = true;

    $timeout(function(){
        modal.show();
        $scope.success = true;
        $loginservice.contratos (function(contratos){
        $scope.contratos = contratos;
            if(contratos == null){
                $scope.success = false;
            }
            modal.hide();
                
        });

    },100);

    $scope.pageTitle = "Acceso a su espacio de Coworker";

    $scope.init=function(username){
        if(username == "")
        {
            $loginservice.contratos (function(contratos){
                $scope.contratos = contratos;
                    if(contratos == null){
                        $scope.success = false;
                    }
                    modal.hide();
                        
            });

        }
        else
        {
            $timeout(function(){
            modal.show();
                $loginservice.contrato_by_username(username, function(contrato) {
                    $scope.contrato = contrato;
                    if(contrato == null)
                    {
                        $scope.success = false;
                    }
                    modal.hide();
                });
            },300);

        }
        $scope.username=$scope.contrato.coworker.nombre;
        $scope.pageTitle = "Resultado de la Búsqueda";
        $scope.loginNavigator.pushPage('coworker.html',{ animation : 'lift' } );
        
    }

    $scope.register=function(username){
        $scope.pagename="logout.html";
        $scope.success = true;
        $scope.pageTitle = "Notificación de registro de Salida";
        if(username == ""){
            $scope.success = false;
            $scope.pageTitle = "No ingreso valor de Código";
            $scope.pagename="coworker.html";
        }
        else
        {
           $timeout(function(){
            modal.show();
                $loginservice.consumo_registro_by_username (username,function(consumo){
                    $scope.consumo = consumo;
                    status=consumo.status;
                    
                        if(consumo.id == null){
                            $scope.success = false;
                            $scope.pageTitle = "No se encuentra el usuario";
                            $scope.pagename="coworker.html";
                        }
                        else if (consumo.estado_registro == 'E')
                        {
                            $scope.pageTitle = "Notificación de registro de Entrada";
                        }
                        
                        modal.hide();
                            
                });
            },200);


        }

        $scope.loginNavigator.pushPage($scope.pagename,{ animation : 'lift' });
        
    }

     $scope.refreshTitleOrigin=function(){
        $scope.username="";
        $scope.pageTitle = "Acceso a su espacio de Coworker";
        $scope.contratos = [];
        
    }


});
(function () {

    angular.module('k121')
    .controller('FormCtrl', FormCtrl);

    function FormCtrl($scope, $rootScope,  API) {

        this.master = {
            nome: '',
            email: '',
        }

        this.sortear = function(){
            API.save({ url: '/sorteios'})
            .then( (result) => {
                $rootScope.refresh()
            })
            .catch( (err) => {
                swal("Falha!", err.data.message, "success");
            });
        }

        this.submit = () => {

            let { nome, email } = $scope.form.value;

            let participante = {
                nome: $scope.form.value.nome
                , email: $scope.form.value.email
            }

            API.save({ url: '/participantes', data: participante })
            .then( (result) => {
                this.value = angular.copy(this.master);
                swal("Cadastrado!", "Participante cadastrado com sucesso", "success");
                $rootScope.refresh();
            })
            .catch( (err) => {
                $scope.refresh();
                swal("Falha!", err.data.message, "success");
            });
        }

        this.value = angular.copy(this.master);
    }

})()

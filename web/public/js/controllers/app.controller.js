(function () {

    angular.module('k121')
    .controller('AppCtrl', AppCtrl);

    function AppCtrl($rootScope,API) {

        this.participantes = [];
        this.sorteios = [];
        this.sorteados = [];

        this.delete = (participante) => {
            API.delete({ url: '/participantes', id: participante['_id'] })
            .then((result) => {
                $rootScope.refresh();
            })
            .catch( (err) => {
                swal("Falha!", err.data.message, "success");
            })
        }

        this.deleteSorteios = () => {

            swal({
                title: "Tem certeza que deseja deletar todos os sorteios ?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    API.delete({ url: '/sorteios' })
                    .then((result) => {
                        $rootScope.refresh();
                    })
                    .catch( (err) => {
                        swal("Falha!", err.data.message, "success");
                    })
                 }
            });

        }

        this.verSorteio = ( sorteados ) => {
            this.sorteados = sorteados

            $('#modalSorteados').modal({
                keyboard: false
            }).modal('show')
        }

        $rootScope.refresh = () => {
            API.all({ url: '/participantes'})
            .then(result => {
                this.participantes = result.data.data;
            });

            API.all({ url: '/sorteios'})
            .then(result => {
                this.sorteios = result.data.data;
            });
        }

        $rootScope.refresh();

    }

})()

(function(){
    function PlayerBarCtrl($scope, Fixtures, SongPlayer){
        this.albumData = Fixtures.getAlbum();
        this.songPlayer = SongPlayer;
        this.songPlayer.bindScope($scope);
    }
    angular
        .module('blocJams')
        .controller('PlayerBarCtrl', ['Fixtures', 'SongPlayer', PlayerBarCtrl($scope)]);
})();
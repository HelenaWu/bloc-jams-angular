(function(){
    function SongPlayer($rootScope, Fixtures){
        var SongPlayer = {};
        /**
        *@desc Buzz object audio file
        *@type {Object}
        */
        var currentBuzzObject = null;
        var currentAlbum = Fixtures.getAlbum();
        /**
        *@function setSong
        *@desc Stops currently playing song and loads a new audio file as currentBuzzObject
        *@param {Object} song        
        */
        var setSong = function(song){
            if (currentBuzzObject){
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'] ,
                preload: true
            });
            currentBuzzObject.bind('timeupdate', function(){
                $rootScope.$apply(function(){
                    SongPlayer.currentTime = buzz.toTimer(currentBuzzObject.getTime());
                });
            });
            SongPlayer.currentSong = song;
            SongPlayer.currentSong.duration = buzz.toTimer(SongPlayer.currentSong.duration);
        };
        var getSongIndex = function(song){
            return currentAlbum.songs.indexOf(song);
        }
        /**
        @function playSong
        @desc plays the currentBuzzObject and set song.playing to true
        */
        var playSong = function(){
            currentBuzzObject.play();
            SongPlayer.currentSong.playing = true;
        };
        /**
        @function stopSong
        @desc stop the currentBuzzObject and set song.playing to null
        */
        var stopSong = function(){            
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        };
        /**
        *@desc currently playing song
        *type {Object} - see fixtures
        */
        SongPlayer.currentSong = null;
        /**
        *@desc current playback time (in seconds) of currently playing song
        *@type {Number}
        */
        SongPlayer.currentTime = null;
        /**
        *@function setCurrentTime
        *@desc Set current time (in seconds) of currently playing song 
        *@param {Number} time
        */
        SongPlayer.setCurrentTime = function(time){
          if(currentBuzzObject){
              currentBuzzObject.setTime(time);
          }
        };
        
        /**
        *@desc volume of the current playing song, 0-100
        *@type {Number}
        */
        SongPlayer.volume = 0;
        /**
        *@function setVolume
        *@desc Set volume of currently playing song 
        *@param {Number} volume
        */
        SongPlayer.setVolume = function(volume){
            if (currentBuzzObject){
                currentBuzzObject.setVolume(volume);
            }
        };
        SongPlayer.play = function(song){
            song = song || SongPlayer.currentSong;
            if(SongPlayer.currentSong !== song){
                setSong(song);
                playSong();
            }else if (SongPlayer.currentSong === song){
                /*check if currentBuzzObject is not null */
                if (currentBuzzObject && currentBuzzObject.isPaused()){
                    playSong();
                }
            }
        };
        SongPlayer.pause = function(song){
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        }
        /**
        *@function previous
        *@desc play the previous song, if the index falls out of range then stop the song
        */
        SongPlayer.previous = function(){
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            if(currentSongIndex < 0 ){
                stopSong();
            }else{
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
          /**
        *@function next
        *@desc play the next song, if the index falls out of range then stop the song
        */
        SongPlayer.next = function(){
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            if(currentSongIndex >= currentAlbum.songs.length ){
                stopSong();
            }else{
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures',SongPlayer]);
})();
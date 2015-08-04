'use strict';

// song
function Song(title, artist, duration) {
	this.title = title;
	this.artist = artist;
	this.duration = duration;
	this.isPlaying = false;
}

Song.prototype.play = function() {
	this.isPlaying = true;
};

Song.prototype.stop = function() {
	this.isPlaying = false;
};

Song.prototype.toHTML = function() {
	var htmlString = '<li ';
	if(this.isPlaying ) {
	    htmlString += 'class="current"';
	}
	htmlString += '>';
	htmlString += this.title;
	htmlString += '-';
	htmlString += this.artist; 
	htmlString += '<span class="duration">';
	htmlString += this.duration;
	htmlString += '</span></li>';
	return htmlString;
};


// playlist

function Playlist() {
	this.songs = [];
	this.nowPlayingIndex = 0;
}

Playlist.prototype.add = function(song) {
	this.songs.push(song);
};

Playlist.prototype.play = function() {
	var currentSong = this.songs[this.nowPlayingIndex];
	currentSong.play();
};

Playlist.prototype.stop = function(){
	var currentSong = this.songs[this.nowPlayingIndex];
	currentSong.stop();
};

Playlist.prototype.next = function() {
	this.stop();
	this.nowPlayingIndex ++;
	if(this.nowPlayingIndex === this.songs.length) {
		this.nowPlayingIndex = 0;
	}
	this.play();
};

Playlist.prototype.renderInElement = function(list) {
	list.innerHTML = '';
	for(var i = 0; i < this.songs.length; i++) {
		list.innerHTML += this.songs[i].toHTML();
	}
};

// UI
var playlist = new Playlist();

var hereComesTheSun = new Song('Here comes the Sun', 'The Beatles', '2:54');
var walkingOnSunshine = new Song('walking on Sunshine', 'Katrina and the Waves', '3:43');
var behindBlueEye = new Song('Behind Blue Eye', 'The Who', '3:42')
playlist.add(hereComesTheSun);
playlist.add(walkingOnSunshine);
playlist.add(behindBlueEye);

var playlistElement = document.getElementById('playlist');

playlist.renderInElement(playlistElement);

var playButton = document.getElementById('play');
playButton.onclick = function() {
	playlist.play();
	playlist.renderInElement(playlistElement);
};
var nextButton = document.getElementById('next');
nextButton.onclick = function() {
	playlist.next();
	playlist.renderInElement(playlistElement);
};
var stopButton = document.getElementById('stop');
stopButton.onclick = function() {
	playlist.stop();
	playlist.renderInElement(playlistElement);
};

// New Song
var newSong = new Song();
var newSongName = document.getElementById('songName');
var newSongArtist = document.getElementById('artist');
var newSongDuration = document.getElementById('duration');
newSong.title = newSongName.value;
newSong.artist = newSongArtist.value;
newSong.duration = newSongDuration.value; 

// create a new song obj with the name, artist and duration then
// add new song obj into play list

//(function($) {
//  $(document).ready(function() {
//    function isSongNamePresent() {
//    	return $songName.val().length > 0;
//    }
//    function isArtistNamePresent() {
//    	return $artist.val().length > 0;
//    }
//    function isDurationPresent() {
//    	return $duration.val().length > 0;
//    }
//    function canAddSong() {
//    	if (isSongNamePresent || isArtistNamePresent || isDurationPresent) {
//    		return true;
//    	}
//    }
//    $addSong.click(function(event) {
//  		event.preventDefault();
//  		if (canAddSong) {
//  			nSong.title = $songName.val();
//  			nSong.artist = $artist.val();
//  			nSong.duration = $duration.val();
//  			playlist.add(nSong);
//  		}
//  	});
//  });
//})(jQuery);

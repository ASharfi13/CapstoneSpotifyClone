from app.models import db, Song, Album, User
from flask import Blueprint, request
from flask_login import login_required
import json

song_routes = Blueprint("songs", __name__)

#GET ALL RESTAURANTS at ["/api/songs"]
@song_routes.route("/")
def allSongs():
    songs = Song.query.all()

    formattedSongs = []

    for song in songs:
        newSong = {}
        newSong["id"] = song.id
        newSong["title"] = song.title
        newSong["song_url"] = song.song_url
        newSong["album_id"] = song.album_id
        newSong["artist_id"] = song.artist_id
        newSong["cover_img"] = song.cover_img
        newSong["album"] = Album.query.get(song.album_id).to_Dict()
        newSong["artist"] = User.query.get(song.artist_id).to_dict()
        newSong["createdAt"] = str(song.createdAt)
        formattedSongs.append(newSong)


    print("LOOK HERE", formattedSongs)

    return json.dumps({"songs": formattedSongs})

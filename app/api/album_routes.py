from app.models import db, Album, User
from flask import Blueprint, request
from flask_login import login_required
import json

album_routes = Blueprint("albums", __name__)

#GET ALL ALBUMS
@album_routes.route("/")
def getAllAlbums():
    albums = Album.query.all()

    formattedAlbums = []

    for album in albums:
        newAlbum = {}
        newAlbum["id"] = album.id
        newAlbum["title"] = album.title
        newAlbum["genre"] = album.genre
        newAlbum["artist_id"] = album.artist_id
        newAlbum["cover_img"] = album.cover_img
        newAlbum["songs"] = [song.to_Dict() for song in album.songs]
        newAlbum["artist"] = User.query.get(album.artist_id).to_dict()
        formattedAlbums.append(newAlbum)


    return json.dumps({"albums":formattedAlbums})


#GET ALBUM DETAILS BY ID at ["api/albums/:albumId"]
@album_routes.route("/<int:album_id>")
def getAlbumById(album_id):
    album = Album.query.get(album_id)
    print("LOOK HERE", album)
    if not album:
        return json.dumps({
            "Message": "Album Not Found"
        })
    return album.to_Dict(), 200

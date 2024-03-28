from app.models import db, Album
from flask import Blueprint, request
from flask_login import login_required
import json

album_routes = Blueprint("albums", __name__)

#GET ALL ALBUMS
@album_routes.route("/")
def getAllAlbums():
    albums = Album.query.all()
    return json.dumps({"albums":[album.to_Dict() for album in albums]})

#GET ALBUM DETAILS at ["api/albums/:albumId"]
@album_routes.route("/<int:id>")
def getAlbumById(id):
    album = Album.query.get(id)
    if not album:
        return json.dumps({
            "Message": "Album Not Found"
        })
    return json.dumps(album.to_Dict())

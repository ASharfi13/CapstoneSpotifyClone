from app.models import db, Playlist, User
from flask import Blueprint, request
from flask_login import login_required
import json


playlist_routes = Blueprint("playlists", __name__)

#GET ALL PLAYLISTS
@playlist_routes.route("/")
def allPlaylists():
    playlists = Playlist.query.all()

    formattedPlaylists = []

    for playlist in playlists:
        newPlaylist = {}

        newPlaylist["id"] = playlist.id
        newPlaylist["title"] = playlist.title
        newPlaylist["description"] = playlist.description
        newPlaylist["cover_img"] = playlist.cover_img
        newPlaylist["user_id"] = playlist.user_id
        newPlaylist["User"] = User.query.get(playlist.user_id).to_dict()
        newPlaylist["createdAt"] = str(playlist.createdAt)

        formattedPlaylists.append(newPlaylist)

    return json.dumps({
        "playlists": formattedPlaylists
    })

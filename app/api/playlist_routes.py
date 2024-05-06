from app.models import db, Playlist, User, SongPlaylist, Song
from flask import Blueprint, request
from flask_login import login_required
from app.forms.playlist_form import NewPlaylist
from app.aws_image_helpers import (upload_image_file_to_s3, get_image_unique_filename, remove_image_file_from_s3)

import json


playlist_routes = Blueprint("playlists", __name__)

#GET ALL PLAYLISTS
@playlist_routes.route("/")
# @login_required
def allPlaylists():
    playlists = Playlist.query.all()

    return json.dumps({
        "playlists": [playlist.to_Dict() for playlist in playlists]
    })

#GET ALL SONG PLAYLISTS
@playlist_routes.route("/all-songs")
# @login_required
def allPlaylistSongs():
    songPlaylists = [songPlaylist.to_Dict() for songPlaylist in SongPlaylist.query.all()]
    return json.dumps(songPlaylists)

#GET PLAYLIST BY ID
@playlist_routes.route("/<int:playlist_id>")
def getPlaylistById(playlist_id):
    playlist = Playlist.query.get(playlist_id)
    if not playlist:
        return json.dumps({
            "Error": "Playlist Not Found"
        })

    return playlist.to_Dict(), 200


# CREATE A PLAYLIST at ["/api/playlists/new"]
@playlist_routes.route("/", methods=["POST"])
@login_required
def createPlaylist():
    form = NewPlaylist()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        #Gets the form data
        title = form.title.data
        cover_img = form.cover_img.data
        description = form.description.data
        user_id = form.user_id.data

        #Generates a unique file name
        cover_img.filename = get_image_unique_filename(cover_img.filename)

        #Uploads the file to the S3 Bucket
        s3_image_upload = upload_image_file_to_s3(cover_img)

        if "url" in s3_image_upload:
            newPlaylist = Playlist(
                title = title,
                cover_img = s3_image_upload["url"],
                description = description,
                user_id = user_id
            )

            db.session.add(newPlaylist)
            db.session.commit()
            return json.dumps(newPlaylist.to_Dict()), 201
        else:
            return {"errors": "Upload Not Successful"}
    else:
        return json.dumps({ "errors": form.errors})


# DELETE PLAYLIST at ["/api/playlists/playlist_id"]
@playlist_routes.route("/<int:playlist_id>", methods=["DELETE"])
@login_required
def removePlaylist(playlist_id):
    playlist = Playlist.query.get(playlist_id)

    if not playlist:
        return json.dumps({
            "Error": "Playlist Not Found"
        })

    remove_image_file_from_s3(playlist.cover_img)

    db.session.delete(playlist)
    db.session.commit()
    return json.dumps({
        "Message":"Successfully deleted Playlist"
    }), 200


#ADD SONG TO PLAYLIST
@playlist_routes.route("/new-song", methods=["POST"])
@login_required
def addSongToPlaylist():
    #New Add contains song_id, playlist_id
    newAdd = request.json

    playlist = Playlist.query.get(newAdd["playlist_id"])
    song = Song.query.get(newAdd["song_id"])

    playlist.songs.append(song)

    # newPlaylistAdd = SongPlaylist(
    #     song_id = newAdd["song_id"],
    #     playlist_id = newAdd["playlist_id"]
    # ))

    db.session.commit()
    return json.dumps(newAdd)

#REMOVE SONG FROM PLAYLIST
@playlist_routes.route("/<int:playlist_id>/song", methods=["DELETE"])
@login_required
def removeSongFromPlaylist(playlist_id):
    song = request.json

    song_id = song["song_id"]


    # playlistSong = SongPlaylist.query.filter_by(song_id=song_id, playlist_id=playlist_id).first()
    playlist = Playlist.query.get(playlist_id)
    song = Song.query.get(song_id)

    playlist.songs.remove(song)
    db.session.commit()
    return json.dumps({
        "song_id": song_id,
        "playlist_id": playlist_id,
        "Message": "Successfully Removed Song From Playlist"
    }), 200

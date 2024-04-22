from app.models import db, Playlist, User, SongPlaylist, Song
from flask import Blueprint, request
from flask_login import login_required
from app.forms.playlist_form import NewPlaylist
from app.aws_image_helpers import (upload_image_file_to_s3, get_image_unique_filename, remove_image_file_from_s3)

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
        songIds = SongPlaylist.query.filter_by(playlist_id = playlist.id)
        songs = [Song.query.get(song.song_id).to_Dict() for song in songIds]
        newPlaylist["songs"] = songs
        newPlaylist["createdAt"] = str(playlist.createdAt)

        formattedPlaylists.append(newPlaylist)

    return json.dumps({
        "playlists": formattedPlaylists
    })

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

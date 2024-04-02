from app.models import db, Album, User
from flask import Blueprint, request
from flask_login import login_required
import json
from app.forms.album_form import NewAlbum, UpdateAlbum
from app.aws_image_helpers import (upload_image_file_to_s3, get_image_unique_filename, remove_image_file_from_s3)


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

    albumObj = {}
    albumObj["id"] = album.id
    albumObj["title"] = album.title
    albumObj["genre"] = album.genre
    albumObj["artist_id"] = album.artist_id
    albumObj["cover_img"] = album.cover_img
    albumObj["songs"] = [album.song.to_Dict() for album.song in album.songs]
    albumObj["artist"] = User.query.get(album.artist_id).to_dict()
    albumObj["created_at"] = str(album.createdAt)

    return albumObj, 200

#CREATE A NEW ALBUM at ["/api/albums/new"]
@album_routes.route("/", methods=["POST"])
@login_required
def createAlbum():
    form = NewAlbum()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        title = form.title.data
        genre = form.genre.data
        cover_img = form.cover_img.data
        artist_id = form.artist_id.data

        cover_img.filename = get_image_unique_filename(cover_img.filename)
        s3_image_upload = upload_image_file_to_s3(cover_img)

        if "url" in s3_image_upload:
            newAlbum = Album(
                title=title,
                genre=genre,
                cover_img=s3_image_upload["url"],
                artist_id=artist_id
            )

            db.session.add(newAlbum)
            db.session.commit()
            return json.dumps(newAlbum.to_Dict()), 201
        else:
            return {"Error": "Upload Not Successful"}, 400
    else:
        return json.dumps({"Error": form.errors}), 400

#EDIT AN ALBUM at ["/api/album/:album_id"]
@album_routes.route("/<int:album_id>", methods=["PUT"])
@login_required
def updateAlbum(album_id):
    album = Album.query.get(album_id)
    if not album:
        return {
            "Message": "Album Not Found"
        }, 404

    form = UpdateAlbum()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        title = form.title.data
        genre = form.genre.data

        if form.cover_img.data:
            remove_image_file_from_s3(album.cover_img)
            cover_img=form.cover_img.data
            cover_img.filename = get_image_unique_filename(cover_img.filename)
            s3_image_upload = upload_image_file_to_s3(cover_img)
            if "url" in s3_image_upload:
                album.cover_img = s3_image_upload["url"]
            else:
                return {"Error", "Song Upload Failed"}, 400

        album.title = title
        album.genre = genre

        db.session.commit()
        return json.dumps(album.to_Dict())
    else:
        return json.dumps({
            "Error": form.errors
        }), 400

#DELETE AN ALBUM at ["/api/albums/:album_id"]
@album_routes.route("/<int:album_id>", methods=["DELETE"])
@login_required
def deleteAlbum(album_id):
    album = Album.query.get(album_id)
    if not album:
        return json.dumps({
            "Message": "Album Not Found"
        }), 404
    remove_image_file_from_s3(album.cover_img)
    db.session.delete(album)
    db.session.commit()

    return json.dumps({
        "Message": "Successfully Deleted Album"
    }), 200

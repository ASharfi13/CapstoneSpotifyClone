from app.models import db, Song, Album, User
from flask import Blueprint, request
from flask_login import login_required
import json
from app.forms.song_form import NewSong
from app.aws_audio_helpers import (upload_file_to_s3, get_unique_filename, remove_file_from_s3)
from app.aws_image_helpers import (upload_image_file_to_s3, get_image_unique_filename, remove_image_file_from_s3)

song_routes = Blueprint("songs", __name__)

#REFACTOR THE NAME OF THE HELPER FUNCTIONS BETWEEN IMAGE AND AUDIO IN THE POST ROUTE FOR ADDING A NEW SONG

#GET ALL SONGS at ["/api/songs"]
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
        newSong["artist"] = User.query.get(song.artist_id).to_dict()
        newSong["createdAt"] = str(song.createdAt)
        formattedSongs.append(newSong)


    print("LOOK HERE", formattedSongs)

    return json.dumps({"songs": formattedSongs})

#GET SONG BY ID at ["/api/songs/:song_id"]
@song_routes.route("/<int:song_id>")
@login_required
def loadSong(song_id):
    song = Song.query.get(song_id)
    if not song:
        return json.dumps({
            "Message": "Song Not Found"
        }), 404

    return json.dumps(song.to_Dict())



# CREATE A NEW SONG at ["/api/songs"]
@song_routes.route("/", methods=["POST"])
@login_required
def upload_image():
    form = NewSong()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        #Get the form data
        title = form.title.data
        song_file = form.song_url.data
        cover_image_file = form.cover_img.data
        artist_id = form.artist_id.data

        print("HERE IS THE SONG AND IMAGE FILE FROM THE FORMDATA", song_file, cover_image_file)

        #Generates a unique file name
        unique_song_file_name = get_unique_filename(song_file.filename)

        unique_image_file_name = get_image_unique_filename(cover_image_file.filename)

        #Upload the file to the S3 Bucket
        s3_audio_upload = upload_file_to_s3(song_file)

        s3_image_upload = upload_image_file_to_s3(cover_image_file)

        print("LOOK HERE PLEASE, PLEASE LOOK HERE AUDIO**", s3_audio_upload)
        print("LOOK HERE PLEASE, PLEASE LOOK HERE IMAGE**", s3_image_upload)

        if "url" in s3_audio_upload and "url" in s3_image_upload:
            s3_audio_upload_url = s3_audio_upload["url"]
            s3_image_upload_url = s3_image_upload["url"]

            #Add the title and song_file_url to the DB
            newSong = Song(
                title = title,
                song_url=s3_audio_upload_url,
                cover_img=s3_image_upload_url,
                artist_id=artist_id
            )
            db.session.add(newSong)
            db.session.commit()
            return json.dumps(newSong.to_Dict()), 201
        else:
            return {"error": "Upload Not Successful"}, 400
    else:
        return json.dumps({"error": "Form Error"}), 400

#DELETE A SONG at ["/api/songs/:song_id"]
@song_routes.route("/<int:song_id>", methods=["DELETE"])
@login_required
def deleteSong(song_id):
    song = Song.query.get(song_id)
    if not song:
        return json.dumps({
            "Message": "Song Not Found"
        })
    remove_file_from_s3(song.song_url)
    remove_image_file_from_s3(song.cover_img)

    db.session.delete(song)
    db.session.commit()
    return json.dumps({
        "Message": "Successfully Deleted Song"
    })

from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField, StringField, IntegerField
from wtforms.validators import DataRequired
from app.aws_audio_helpers import ALLOWED_AUDIO_EXTENSIONS
from app.aws_image_helpers import ALLOWED_IMAGE_EXTENSIONS




class NewSong(FlaskForm):
    title = StringField("Song Title", validators=[DataRequired("Song Title is Required")])
    song_url = FileField("Audio File", validators=[FileRequired(), FileAllowed(list(ALLOWED_AUDIO_EXTENSIONS))])
    cover_img = FileField("Image File", validators=[FileRequired(), FileAllowed(ALLOWED_IMAGE_EXTENSIONS)])
    artist_id = IntegerField("Artist Id", validators=[DataRequired("Artist Id is Required")])
    album_id = IntegerField("Album Id")
    submit = SubmitField("Upload Audio File")

from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField, StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.aws_image_helpers import ALLOWED_IMAGE_EXTENSIONS

genresList = ["Hip-Hop", "Pop", "Rock", "Reggaeton", "Country", "Rap", "Indie", "Alternative", "Reggae", "House", "Punk", "Heavy Metal", "Techno", "Jazz", "RnB", "K-Pop", "Folk"]

def validate_genre(form, input):
    if input.data not in genresList:
        raise ValidationError("Invalid Genre Selection")

class NewAlbum(FlaskForm):
    title = StringField("Album Title", validators=[DataRequired("Album Title is Required")])
    genre = StringField("Album Genre", validators=[DataRequired("Album Genre is Required"), validate_genre])
    cover_img = FileField("Album Image File", validators=[FileRequired(), FileAllowed(ALLOWED_IMAGE_EXTENSIONS)])
    artist_id = IntegerField("Artist Id", validators=[DataRequired("Artist Id is Required")])
    submit = SubmitField("Create New Album")

class UpdateAlbum(FlaskForm):
    title = StringField("Album Title", validators=[DataRequired("Album Title is Required")])
    genre = StringField("Album Genre", validators=[DataRequired("Album Genre is Required"), validate_genre])
    cover_img = FileField("Album Image File", validators=[FileAllowed(ALLOWED_IMAGE_EXTENSIONS)])
    artist_id = IntegerField("Artist Id", validators=[DataRequired("Artist Id is Required")])
    submit = SubmitField("Create New Album")

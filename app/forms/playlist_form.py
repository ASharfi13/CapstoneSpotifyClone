from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField, StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired
from app.aws_image_helpers import ALLOWED_IMAGE_EXTENSIONS


class NewPlaylist(FlaskForm):
    title = StringField("Playlist Title", validators=[DataRequired("Playlist Title is Required")])
    description = TextAreaField("Description", validators=[DataRequired("Description is Required")])
    cover_img = FileField("Image File", validators=[FileRequired(), FileAllowed(ALLOWED_IMAGE_EXTENSIONS)])
    user_id = IntegerField("User Id", validators=[DataRequired("User Id is Required")])
    submit = SubmitField("Create New Playlist")

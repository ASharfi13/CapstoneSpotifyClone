from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime as dt

class Song(db.Model):
    __tablename__ = 'songs'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(20), nullable=False)
    song_url = db.Column(db.String, nullable=False)
    cover_img = db.Column(db.String, nullable=False)
    createdAt = db.Column(db.Date, default=dt.datetime.now())
    updatedAt = db.Column(db.Date, default=dt.datetime.now())

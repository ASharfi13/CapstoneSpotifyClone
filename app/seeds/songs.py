from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want

def seed_songs():
    baseCharged = Song(
        title='Base Charged', song_url='https://spotifycapstonecloneaudiofiles.s3.us-east-2.amazonaws.com/SkrillexLivesHere/BEATSMASH%2C+K+Theory+-+Astral+Plane.mp3', cover_img='https://spotifycloneimagebucketmix.s3.us-east-2.amazonaws.com/song1.jpeg', album_id=1, artist_id=2)
    coldHearted = Song(
        title='Electric Ice', song_url='https://spotifycapstonecloneaudiofiles.s3.us-east-2.amazonaws.com/SkrillexLivesHere/BraydenK+%26+Akacia+-+Cold+Hearted.mp3', cover_img='https://spotifycloneimagebucketmix.s3.us-east-2.amazonaws.com/song1.jpeg', album_id=1, artist_id=2)
    voltage = Song(
        title='Voltage', song_url='https://spotifycapstonecloneaudiofiles.s3.us-east-2.amazonaws.com/SkrillexLivesHere/Cozmoe+-+Resonate.mp3', cover_img='https://spotifycloneimagebucketmix.s3.us-east-2.amazonaws.com/song1.jpeg', album_id=1, artist_id=2)
    dubstepHush = Song (
        title="Dubstep Hush", song_url="https://spotifycapstonecloneaudiofiles.s3.us-east-2.amazonaws.com/SkrillexLivesHere/MADZI%2C+L3ss%2C+Barmuda+-+Hush.mp3", cover_img='https://spotifycloneimagebucketmix.s3.us-east-2.amazonaws.com/song1.jpeg', album_id=1, artist_id=2
    )
    bassdropAnthem = Song(
        title="BaseDrop Anthem", song_url="https://spotifycapstonecloneaudiofiles.s3.us-east-2.amazonaws.com/SkrillexLivesHere/Necrolx%2C+Hxi%2C+Qoiet+-+I%E2%80%98ll+show+you+(feat.+Youk3iv).mp3",
        cover_img="https://spotifycloneimagebucketmix.s3.us-east-2.amazonaws.com/song1.jpeg", artist_id=2, album_id=1
    )


    heartBreakJet = Song(
        title='Heartbreak + Jet Lag', song_url="https://spotifycapstonecloneaudiofiles.s3.us-east-2.amazonaws.com/Frank's+Secret/01+Heartbreak+%2B+Jet+Lag.mp3", cover_img='https://spotifycloneimagebucketmix.s3.us-east-2.amazonaws.com/undocumented.png', album_id=2, artist_id=3
    )

    summerRemains = Song(
        title='Summer Remains', song_url="https://spotifycapstonecloneaudiofiles.s3.us-east-2.amazonaws.com/Frank's+Secret/02+Summer+Remains.mp3", cover_img="https://spotifycloneimagebucketmix.s3.us-east-2.amazonaws.com/undocumented.png", album_id= 2, artist_id=3
    )

    bigEnough = Song(
        title = 'Big Enough', song_url="https://spotifycapstonecloneaudiofiles.s3.us-east-2.amazonaws.com/Frank's+Secret/08+Big+Enough.mp3", cover_img="https://spotifycloneimagebucketmix.s3.us-east-2.amazonaws.com/undocumented.png", album_id=2, artist_id=3
    )

    bestSeller = Song(
        title = 'Best Seller', song_url="https://spotifycapstonecloneaudiofiles.s3.us-east-2.amazonaws.com/Frank's+Secret/10+Best+Seller.mp3", cover_img="https://spotifycloneimagebucketmix.s3.us-east-2.amazonaws.com/undocumented.png", album_id=2, artist_id=3
    )

    bendYa = Song(
        title='Bend Ya', song_url="https://spotifycapstonecloneaudiofiles.s3.us-east-2.amazonaws.com/Frank's+Secret/22.+Mann+-+Bend+Ya+(Feat.+Frank+Ocean+%26+Kendrick+Lamar).mp3", cover_img="https://spotifycloneimagebucketmix.s3.us-east-2.amazonaws.com/undocumented.png", album_id=2, artist_id=3
    )

    gotThat = Song(
        title = 'Got That', song_url="https://spotifycapstonecloneaudiofiles.s3.us-east-2.amazonaws.com/IceJJTrax/IceJJfish+-+Got+That+(Official+Music+Video).mp3", cover_img="https://spotifycloneimagebucketmix.s3.us-east-2.amazonaws.com/iceJJCover.jpg", album_id=3, artist_id=4
    )

    iwantU = Song(
        title = 'I WANT U', song_url="https://spotifycapstonecloneaudiofiles.s3.us-east-2.amazonaws.com/IceJJTrax/IceJJFish+-+I+WANT+U+(MUSIC+VIDEO).mp3", cover_img="https://spotifycloneimagebucketmix.s3.us-east-2.amazonaws.com/iceJJCover.jpg", album_id=3, artist_id=4
    )

    myBae = Song(
        title = 'My Bae', song_url="https://spotifycapstonecloneaudiofiles.s3.us-east-2.amazonaws.com/IceJJTrax/IceJJFish+-+My+Bae+(Official+Video)+(Prod.+StunnaSezBeatz).mp3", cover_img="https://spotifycloneimagebucketmix.s3.us-east-2.amazonaws.com/iceJJCover.jpg", album_id=3, artist_id=4
    )

    ontheFloor = Song(
        title = 'On The Floor', song_url="https://spotifycapstonecloneaudiofiles.s3.us-east-2.amazonaws.com/IceJJTrax/IceJJFish+-+On+The+Floor+(Official+Music+Video)+ThatRaw.com+Presents.mp3", cover_img="https://spotifycloneimagebucketmix.s3.us-east-2.amazonaws.com/iceJJCover.jpg", album_id=3, artist_id=4
    )

    watchMeBall = Song(
        title = 'Watch Me Ball', song_url="https://spotifycapstonecloneaudiofiles.s3.us-east-2.amazonaws.com/IceJJTrax/IceJJFish+-+Watch+Me+Ball+(Music+Video)+Prod.+1MG123.mp3", cover_img="https://spotifycloneimagebucketmix.s3.us-east-2.amazonaws.com/iceJJCover.jpg", album_id=3, artist_id=4
    )

    itsLit = Song(
        title = "It's Lit", song_url="https://spotifycapstonecloneaudiofiles.s3.us-east-2.amazonaws.com/Singles/REXXO+-+Its+Lit+%5BNo+Copyright++Rap%5D.mp3", cover_img="https://spotifycloneimagebucketmix.s3.us-east-2.amazonaws.com/ItsLitCover.jpg", artist_id=5
    )

    takeAWalk = Song(
        title='Take A Walk', song_url="https://spotifycapstonecloneaudiofiles.s3.us-east-2.amazonaws.com/Singles/Royalty+free+music_+Indie+Rock+Song+-+Take+A+Walk+(background+music).mp3", cover_img="https://spotifycloneimagebucketmix.s3.us-east-2.amazonaws.com/indieRockCore.jpg", artist_id=6
    )

    wonderful = Song(
        title = 'Wonderful', song_url="https://spotifycapstonecloneaudiofiles.s3.us-east-2.amazonaws.com/Singles/David+Reilly+-+wonderland+(a).mp3", cover_img="https://spotifycloneimagebucketmix.s3.us-east-2.amazonaws.com/80sdancing.jpg", artist_id=7
    )

    timeAtLake = Song(
        title='Time At The Lake', song_url="https://spotifycapstonecloneaudiofiles.s3.us-east-2.amazonaws.com/Singles/Copyright+Free+Instrumental+Music+-+Asleep+by+Tomh.mp3", cover_img="https://spotifycloneimagebucketmix.s3.us-east-2.amazonaws.com/lakeSong.jpg", artist_id=8
    )

    tellNobody = Song(
        title="Don't Tell Nobody", song_url="https://spotifycapstonecloneaudiofiles.s3.us-east-2.amazonaws.com/Singles/'We+Won't+Tell+Nobody'+by+JOSH+LUMSDEN+++Pop+Music+With+Lyrics+(No+Copyright).mp3", cover_img="https://spotifycloneimagebucketmix.s3.us-east-2.amazonaws.com/popStars.jpg", artist_id=9
    )



    db.session.add(baseCharged)
    db.session.add(coldHearted)
    db.session.add(voltage)
    db.session.add(dubstepHush)
    db.session.add(bassdropAnthem)
    db.session.add(heartBreakJet)
    db.session.add(summerRemains)
    db.session.add(bigEnough)
    db.session.add(bestSeller)
    db.session.add(bendYa)
    db.session.add(gotThat)
    db.session.add(iwantU)
    db.session.add(myBae)
    db.session.add(ontheFloor)
    db.session.add(watchMeBall)
    db.session.add(itsLit)
    db.session.add(takeAWalk)
    db.session.add(wonderful)
    db.session.add(timeAtLake)
    db.session.add(tellNobody)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()

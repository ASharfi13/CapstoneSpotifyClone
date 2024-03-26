# Ahmed's Capstone Spotify Clone

# DB Schema
![alt text](<CaptoneSpotifyClone (2).png>)

# Features List

### 1. Songs

* Logged-In users should be able to (create) add new songs, update, and delete their songs.

### 2. Albums

* Logged-In users should be able to (create) add new albums, update, and delete their albums. Deleted albums should also result in their songs being deleted.

### 3. Likes

* Logged-In users should be able to add songs to the default "Liked Songs" playlist and remove songs from that playlist.

### 4. Playlists

* Logged-In users should be able to create, update, and delete their playlist title and cover image.

## Bonus Features

### 5. Search
* Unauthorized and unregistered users can search for songs on the application with a search bar.

### 6. Share
* Logged-In users can share songs and albums with their friends via a link. 



# User Story

## Users

### Sign Up

* As an unauthorized and unregistered user, I should have access to the `Sign Up` button on the right of the navigation bar on the landing page.
    * If I click on the `Sign Up` button I should be able to:
        * See the form modal appear on my screen.
        * Be able to fill out form entires that ask for my email, a unique username, first name, last name, and a password.
        * If I fail to provide input for any of the entries or if the input is not valid and I attempt to click the `Submit` button, I should see error validation messages in red that describe the error and what a valid input for that field should be. My initial input should still be there and I should not have to repopulate each field.
        * After successfully completing the form, I should be redirected to the landing page and my username should now appear at the top right of the navigation bar.

### Log In

* As an unauthorized and unregistered user, I should have access to the `Log In` button on the right of the navigation bar on the landing page.
    * If I click on the `Log In` button, I should be able to:
        * See the form modal appear on my screen.
        * Be able to fill out form entries that ask for my email and password.
        * If I fail to provide input for any of the entires of if the input is not valid and I attempt to click the `Submit` button, I should see error validation messages in red that describe my error and what a valid input should be.
        * After successfully completing the form, I should be redirected to the landing page and my username should now appear at the top right of the navigation bar.

### Demo User
* As an unregistered and unauthorized user, If I want to navigate the application as a guest user and don't want to create an account yet, I should be able to see a `Demo User` button underneath the `Submit` button on the `Log In` form modal.
    * If I click on the `Demo User` button, I should be able to:
        * Successfully and instantly logged-in as a Demo User and redirected to the langing page.
        * See my username on the top right of the navigation bar that when clicked shows a drop-down of navigation links.
        * Be able to access and test all features of the site that include:
            * Creating A New Song
            * Creating A New Album
            * Creating A New Playlist
            * Liking Songs & being able to view all Liked Songs
            * Updating the information on a created Song or Album
            * Delete a Song created by Demo User
            * Deleta an Album created by Demo User
            * Play songs from an Album

### Log Out
* As a logged in user, if I want to log out of my account I should be able to click on my username on the top right of the navigation bar and see a drop down menu with a link that reads, `Log Out`.
    * If I click on the `Log Out` button, I should be able to:
        * Redirected to the Landing Page and not see my username at the top right of the navigation bar, instead it will be replaced with the `Sign Up` and `Log In` buttons.

## Songs
### Viewing Songs
* As an unauthorized and unregistered user, I should be able to see a collection of "Top" songs and albums on the landing page.
    * If I were to click on a Song:
        * I should see the audio player start playing the song. I should be able to skip to the next song or go to a previous song using the `forward` and `previouos` icons on the audio player. I should be able to adjust the volume on the audio player.

### Adding a New Song
* As a logged in user, I should be able to click on my username on the top right corner of the navigation bar and see a link that says `Add New Song`.
    * If I click on that link:
        * I should be redirected to a form page that has title input and two plus buttons, where if the user clicks on the button with the music symbol they will be asked to upload an mp3 file. If the use clicks on the button with the camera icon, they will be asked to upload a cover image file.
        * If title is not provided or a file that is not an mp3/image file is uploaded, I should see the correct error validation messages and a message explaining that only mp3/image files are allowed to be uploaded.
        * Upon successful upload of a new song, I should be redirected to the "My Music" page that displays all of the songs and albums added by the user at `"/music/:username"`

### Updating A Song
* As a logged in user, I should be able to click on my username on the top right corner of the navigation bar and see a link that says `My Music`.
    * If I click on that link:
        * I should be redirected to the "My Music" page where next to the like, 'heart', button on a song card there should be a three dots button. If I click on that button, a small drop-down should appear with "Update" as an option.
        * If I click on "Update", I should be redirected to a form where I can change the title of the song or upload a new mp3 file. All the original inputs should populate the entries.
        * If title is not provided or a file that is not an mp3 file is uploaded, I should see the correct error validation messages and a message explaining that only mp3 files are allowed to be uploaded.
        * After successfuly updating the song, I should be able to click on a `Submit` button and be redirected to the "My Music" page where the newly updated song will display the updated information.

### Deleting A Song
* As a logged in user, I should be able to click on my username on the top right corner of the navigation bar and see a link that says `My Music`.
    * I should be redirected to the "My Music" page where next to the like, 'heart', button there should be a three dots button. If I click on that button, a small drop-down should appear with "Delete" as an option.
    * If I click on "Delete", a modal should appear asking if I am sure I want to delete the song. If I click on "No", the modal should disappear from the screen and the song should remain on the page. If I click on "Yes", the modal should disappear and the song should not be on the page or anywhere else on the site.

## Albums
### Viewing Albums
* As an unauthorized and unregistered user, I should be able to see a collection of "Top" songs and albums on the landing page.
    * If I were to click on an Album:
        * I should be redirected to the album details page at `"/albums/:album_id"`.
        * I should see all of the songs associated with that album and be able to click and play those songs.
        * I should be able to like any of the songs in the album by clicking the "heart" icon next to it.
    * If I own an Album, underneath all of the songs will be a plus sign where if I click on the plus button, I should be able to add a new song to the album I added.

### Adding A New Album
* As a logged in user, I should be able to click on my username on the top right corner of the navigation bar and see a link that says `Add New Album`.
    * If I click on that link:
        * I should be redirected to a form page that has a title input, a genre input that is a drop-down of various genre options, and a plus button with a camera icon where if the user clicks on the button they will be asked to upload a cover img file.
        * If title is not provided, a genre is not selected, or a file that is not an image is uploaded, I should see the correct error validation messages and a message explaining that only image files are allowed to be uploaded.
        * Upon successful upload of a new album, I should be redirected to the new Album Details page for the new album page that is empty and be able to add new songs to the Album `"/albums/:albumId"`.

### Updating An Album
* As a logged in user, I should be able to click on my username on the top right corner of the navigation bar and see a link that says `My Music`.
    * If I click on that link:
        * I should be redirected to the "My Music" page where on the Album card there should be a three dots button. If I click on that button, a small drop-down should appear with "Update" as an option.
        * If I click on "Update", I should be redirected to a form where I can change the title of the album, genre of the album, or upload a new cover img file. All of the original inputs should populate the entries.
        * If title is not provided, a genre is not selected, or a file that is not an image is uploaded, I should see the correct error validation messages and a message explaining that only image files are allowed to be uploaded.
        * After successfuly updating the album, I should be able to click on a `Submit` button and be redirected to the Album details page where the newly updated Album will display the updated information.

### Deleting An Album
* As a logged in user, I should be able to click on my username on the top right corner of the navigation bar and see a link that says `My Music`.
    * I should be redirected to the "My Music" page where on Album card there should be a three dots button. If I click on that button, a small drop-down should appear with "Delete" as an option.
    * If I click on "Delete", a modal should appear asking if I am sure I want to delete the song. If I click on "No", the modal should disappear from the screen and the album should remain on the page. If I click on "Yes", the modal should disappear and the album should not be on the page and all of the associated songs should be deleted and not be anywhere on the site.

## Likes

### Adding A Song to "Liked Songs"
* As a logged in user, I should be able to see a heart icon on each song card on every page where a song is displayed, such as the landing page, Album details page, and My Music page.
    * If I click on the heart icon:
        * I should be able to see an animation that indicates that the song was added to the default liked songs playlist.

### Viewing Liked Songs
* As a logged in user, I should be able to click on my username at the top right corner of the navigation bar and see a drop-down menu with a link that says `Liked Songs`.
    * If I click on the link:
        * I should be redirected to the Liked Songs at `"/liked_songs"` page where all of the songs that have been liked appear.

### Removing a Song from "Liked Song"
* As a logged in user, anywhere that the song cards are visible, the heart icon will be visible and if a song is "liked", the icon will be filled with color.
    * If I click on the heart icon while its filled with color, the heart icon will not be filled with color anymore to indicate that the song has been removed from the default Liked Songs playlist.

## Playlists

### Creating A New Playlist
* As a logged in user, I should be able to click on my username at the top right corner of the navigation bar and see a drop-down with a link that reads `Create New Playlist`
    * If I click on that link:
        * I should be redirected to a form page that asks for a title input and a file upload button where I can upload a cover image for the playlist.
        * If title is not provided or a file that is not an image is uploaded, I should see the correct error validation messages and a message explaining that only image files are allowed to be uploaded.
        * After successful submission of the form, I should be redirected to the new playlist details at `"/playlists/:playlistId"`.

### Viewing A Playlist
* As a logged in user, I should be able to see a side-bar with all of the created playlist names as links.
    * If I click on a playlist name:
        * I should be redirected to the Playlist details page and all of the songs for that playlist should be shown.

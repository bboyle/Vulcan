Vulcan TODO
===========

* Fixture with movie folder setup
  * include bad `metadata.json` file in fixture

* ~~Edit metadata screen (read existing data, edit and save)~~
  * ~~`date` input~~ (use a browser that supports html5 `date` input)

* Function to load all metadata
  * load all at launch
  * store metadata in client localStorage? (depends on size of collection)
  * fast searching on node server (find movies by classification, date range, recently viewed, etc.)
  * have placeholder data in case user accesses movie list before all data is loaded (user will need to refresh screen)
  * have a URL that will refresh the data (if needed), rather than requiring server restart

* Profiles
  * select a profile first
  * have a default profile
  * filter which movies are shown in the list based on profile
  * integrate profiles with OFLC classifications
  * favourites for profiles
  * last played for profiles
  * PIN/password for profiles? (could be device specific for iPhone/iPad access?)

* Support different movie types
  * precedence list: mp4, video_ts, iso?

* Launch iTunes to play iTunes content
  * expose iTunes library content (movies and tv shows), parse library.xml?
  * launch iTunes to play locked content (video with DRM)
  * launch VLC to play open content
  * poster frames for TV show episodes?

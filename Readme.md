Vulcan
======

_Vulcan_ is short for VLC + node.

I want the awesome media playback that is [VLC][vlc].
I want a custom built media centre interface.
I’ve decided to build that UI as a web app, backed by [node.js][node]


[vlc]: http://www.videolan.org/vlc/ "VideoLAN Player"
[node]: http://nodejs.org/ "node.js"


Why node?
---------

Me and javascript go way back.


Why VLC?
--------

We use a mac mini as a [HTPC][HTPC] here at home and it’s done well.
It’s a [MythTV][mythtv] front-end (the backend runs on a separate [mythbuntu][mythbuntu] box) for TV.
That’s working fine.

The DVD player is shot though, so we need to play the backups.
I usually keep backs as iso files or Video_ts folders.

Kids TV shows I backup (from DVD) into video which I catalog in iTunes.

We used to access all this content through [Front Row][FR] (with the [Sapphire plug-in][sapphire]).

I recently upgraded the ram to 2GB, and updated to OSX Lion.
You know what’s missing in Lion? _Front Row!_

Front Row was brilliant for the kids.
They could easily use “the chair” (Front Row icon) to find TV Shows they wanted to watch.

Looking for alternatives has been difficult.
Plex came close, but it stutters (or judders?) on video_ts and iso playback. Ugh.
iTunes is a bit hit and miss too, and not so easy to use as Front Row.

You know what plays everything perfectly? _VLC!_
It doesn’t ship with a [10ft interface][10ft-ui] though.

That’s where this project comes in!


[HTPC]: http://en.wikipedia.org/wiki/Home_theater_PC "Home theatre PC"
[mythtv]: http://www.mythtv.org/ "MythTV"
[mythbuntu]: http://www.mythbuntu.org/ "Mythbuntu (Ubuntu MythTV distro)"
[FR]: http://en.wikipedia.org/wiki/Front_Row_(software) "Front Row (Wikipedia)"
[sapphire]: http://appletv.nanopi.net/ "Sapphire browser"
[10ft-ui]: http://en.wikipedia.org/wiki/10-foot_user_interface "10 foot user interface"


The plan
--------

* Design front-end in HTML, JS, SVG and JPG (for poster art?)
** Organise movies, TV shows, seasons and episodes nicely
** Import metadata from iTunes where it exists (maybe other apps too? plex? miro?)
** Scrape metadata or integrate with a scraper (might hardcode my library initially)
** Include OFLC ratings and basic parental restrictions
** Fullscreen browser UI: Chrome, Safari (maybe Firefox)
** play with schema.org markup for movie data
* Figure out the HTTP API for vulcan
* Integrate with VLC
** Command line (VLC does not have to be running in background, can be launched by node)
** Play movies in the browser? (`<video>` support?)
* Remote control / second screen
** Being a web app, it should support remote controls from iPhone/iPad etc
** Link/integrate information and social services on IMDb, TVDB, wikipedia, Miso, etc.


Reference
---------

* [VLC command line interface][vlc-cli]

[vlc-cli]: http://wiki.videolan.org/VLC_command-line_help "VLC command-line help"


Media information and asset sources
-----------------------------------

* Movie data
** IMDb
** Wikipedia
* OFLC markings
** http://www.classification.gov.au/www/cob/classification.nsf/Page/ClassificationMarkings_ClassificationMarkingsDownload_ClassificationMarkingsDownloads-InternetAdvertising
* Movie posters
** http://www.impawards.com

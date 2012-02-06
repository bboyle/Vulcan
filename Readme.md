Vulcan
======

_Vulcan_ is short for VLC + node.

I want the awesome media playback that is VLC.
I want a custom built media centre interface done backed by [node.js][node]

Why node?
---------

Me and javascript go way back.

Why VLC?
--------

We use a mac mini as a HTPC here at home and it's done well.
I recently upgraded the ram to 2GB, and updated to OSX Lion.
You know what’s missing in Lion? [Front Row][FR]!

Front Row was brilliant for the kids.
They could easily use “the chair” (Front Row icon) to find TV Shows they wanted to watch.

Looking for alternatives has been difficult.
Plex came close, but it stutters (or judders?) on video_ts and iso playback. Ugh.
iTunes is a bit hit and miss too, and not so easy to use as Front Row.

You know what plays everything perfectly? [VLC][vlc].
It doesn’t have a nice [10ft interface][10ft-ui] either though.


[node]: http://nodejs.org/ "node.js"
[FR]: http://en.wikipedia.org/wiki/Front_Row_(software) "Front Row (Wikipedia)"
[vlc]: http://www.videolan.org/vlc/ "VideoLAN Player"
[10ft-ui]: http://en.wikipedia.org/wiki/10-foot_user_interface "10 foot user interface"


The plan
--------

* Design front-end in HTML, JS, SVG and JPG (posters?)
** Organise movies, TV shows, seasons and episodes nicely
** Import metadata from iTunes where it exists (maybe other apps too? plex? miro?)
** Scrape metadata or integrate with a scraper (might hardcode my library initially)
** Include OFLC ratings and basic parental restrictions
** Fullscreen browser UI: Chrome, Safari (maybe Firefox)
* Figure out the HTTP API for vulcan
* Integrate with VLC
** Command line (VLC does not have to be running in background, can be launched by node)
** Play movies in the browser? (`video` support?)

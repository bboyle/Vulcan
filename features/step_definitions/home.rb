# steps


Given /using the Vulcan media centre/ do
	@browser.goto "#{BASE_URL}/"
	assert_equal 'Vulcan media centre', @browser.title, 'Vulcan home page'
end


When /go to the home screen/ do
	@browser.goto "#{BASE_URL}/"
	# assert_equal 'Vulcan media centre', @browser.h1.text, 'h1 present'
	assert_equal 'VLC + Node', @browser.h2.text, 'h2 present'
end


Then /see movies and TV/ do
	assert_equal 'List all movies', @browser.a( :href => 'movie/list' ).text, 'Movies link present'
	assert_equal 'List all TV shows', @browser.a( :href => 'tv/list' ).text, 'TV shows link present'
end

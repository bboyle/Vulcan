require 'watir-webdriver'
# require 'watir-webdriver-performance'

require File.dirname(__FILE__) + '/lib/configuration'

BASE_URL = Configuration[ 'BASE_URL' ]


browser = Watir::Browser.new :firefox
 
Before do
	@browser = browser
	@page_type = 'PAGE'
end
 
at_exit do
	browser.close
end

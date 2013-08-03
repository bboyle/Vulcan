Feature: Vulcan home page
  As a media enthusiast
  I want a media centre
  so that I can do what I find and watch media

  Scenario: Watch movies
    Given I am using the Vulcan media centre
    When I go to the home screen
    Then I should see movies and TV

Feature: As a user, I can navigate to different pages from home page

    Scenario: As a user I can navigate to cloud from home page
      Given I am on the home page
      When I click the cloud link
      Then I am directed to the cloud page

    Scenario: As a user I can navigate to pricing from home page
      Given I am on the home page
      When I click the try it for free button
      Then I am directed to the free analytics trial page
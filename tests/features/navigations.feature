Feature: As a user, I can navigate to different pages from home page

    Scenario: As a user I can navigate to cloud from home page
      Given I am on the home page
      When I click the cloud link
      Then I am directed to the cloud page

    Scenario: As a user I can navigate to pricing from home page
      Given I am on the home page
      When I click the try it for free button
      Then I am directed to the free analytics trial page

    Scenario: As a user I can hover the pricing link and click the contact sales link
      Given I am on the home page
      When I hover the pricing link
      Then the contact sales link should be displayed
      And I click the contact sales link
      Then I am directed to the contact sales page
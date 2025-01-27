Feature: As a user, I can navigate to different pages from home page

    Scenario: As a user I can navigate to the cloud page from home page
      Given I am on the home page
      When I click on the cloud link
      Then I am directed to the cloud page

    Scenario: As a user I can navigate to the pricing page from home page
      Given I am on the home page
      When I click on the try it for free button
      Then I am directed to the free analytics trial page

    Scenario: As a user I can hover over the pricing link and click on the contact sales link
      Given I am on the home page
      When I hover over the pricing link
      Then the contact sales link should be displayed
      And I click on the contact sales link
      Then I am directed to the contact sales page

    Scenario: As a user I want to check for any broken links or images in home page
      Given I am on the home page
      Then I check for broken links
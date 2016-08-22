Feature: About
    As a user
    In order to check if the starter kit is working
    I would like to see the sample About page

  Background:
   Given I visit the url "/about"

  Scenario: Checking the Title
    Then I should see that the title is "React Starter"

  Scenario: Checking the content
    Then I should see "Lorem ipsum dolor sit amet" in the content

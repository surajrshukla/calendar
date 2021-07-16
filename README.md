# Coding Exercise - React

## Overview

Building upon this base project, implement a Monthly Calendar UI for the current month using React and Redux. The solution should implement as many of the criteria points outlined below. The solution should use mock/local data only, there should **not** be any API calls. 

## Getting Started

In the project directory, you can run:

### `npm install`

Installs dependencies.

### `npm start`

Runs the app in the development mode.

### `npm test`

Launches the test runner in the interactive watch mode.

## What needs to be done

 - User should be displayed a Monthly Calendar of the current month.
 - User should be able to add a reminder on a selected day.
	 - User can enter a description (*max 20 characters*) **and** specify a time.
	 - User can select a colour for the reminder.
- User should see my reminders for a given day ordered by time. 
- User should see a reminder displayed in the colour that I selected.
- User should be able to edit a existing reminder.
- User should be able to delete a reminder.

## Evaluation Criteria

- Design based on re-usable components.
- Redux structure for storing the calendar data, including reminders.
- Handling the overflow of reminders on a given day, possibly to the next day.
- Test cases written.

## Sample UI

You have full creative freedom with the design of the solution, but we have provided a sample Monthly Calendar display below for your inspiration. 

*The design of the final solution is considered **less crucial** than the full coverage of the above evaluation criteria.*

![sample-calendar-view](https://gitlab.com/edutest-public/coding-exercise-react/raw/master/public/sample-calendar-view.png)

## Submitting the Solution

Your solution should be submitted by forking this project, and submitting a new Merge Request **before** the communicated deadline.  
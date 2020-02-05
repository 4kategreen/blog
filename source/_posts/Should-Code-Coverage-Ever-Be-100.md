---
title: Should Unit Test Code Coverage Ever Be 100%?
date: 2019-02-14 18:25:52
tags:
- quality
- code
- screed
---
{% img /images/no.jpg 400 "No." %}

No. That's silly and unattainable.

How about you take a sensible approach to writing unit tests? 
* Ask questions about what you should be testing. Code that is:
	* Prone to break
	* Changes a lot
	* In a high traffic part of the app
* Look at things like mutation testing, like [Stryker]((stryker-mutator.io))
* Remember that test coverage isn't a number to reach, but one metric in a game of testing effectively
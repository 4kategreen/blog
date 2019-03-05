---
title: Mutation Testing: Are Your Tests Good Enough?
date: 2019-03-04 22:37:23
tags:
---
What are mutants doing near your codebase anyway? Actually, they're testing whether your tests are good enough, not seeking to destroy things. That's true despite the jargon around mutation testing: killing, surviving, and a final score. Mutation testing is a way to check whether your tests are effective at small issues in your code by changing values in your `return`, `if`, and variable declarations.

In a small project, I added mutation tests to see what they would do with a small but ~well-tested~ overly-tested service. I used [Stryker](https://stryker-mutator.io/)) and found it pretty easy to set up and run. Further, it gave me a good view of the places where things might fail, and I felt _more_ confident after reading the report.

## Questions about Mutation Testing

### I have unit tests and code coverage metrics. Why do this?
Code coverage can give you a good sense of where there are holes in your tests, but 100% code coverage is a folly. If you set a minimum code coverage percent, you'll find people trying to eke out their tests to cover another line to meet an arbitrary number.

## Resources
1. [Wikipedia](https://en.wikipedia.org/wiki/Mutation_testing)
1. [Stryker, for js, scala, and C#](https://stryker-mutator.io/)]
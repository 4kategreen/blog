---
title: Are Your Tests Good Enough? Using Mutation Testing to Test your Tests
date: 2019-03-04 22:37:23
tags:
---
What are mutants doing near your codebase anyway? Actually, they're testing whether your tests are good enough, not seeking to destroy things. That's true despite the jargon around mutation testing: killing, surviving, and a final score. Mutation testing is a way to check whether your tests are effective at catching small issues in your code by changing values in your `return`, `if`, and variable declarations.

I recently added mutation tests to see what they would do with a small authentication service. I used [Stryker](https://stryker-mutator.io/)) and found it pretty easy to set up and run. Less than a half hour. Further, it gave me a good view of the places where things might fail, and I definitely felt _more_ confident after reading the report.

Let's dig in on this type of testing.

## What is Mutation Testing?
Mutation testing assesses the value of your unit tests. To do this, it modifies your actual code and then runs the unit tests against it. It changes things like variable declarations, `return`, `switch`, and `if` statements. In my experience, it runs about 5 different "mutants" for every function or method you have unit tests against. 

Once the unit tests are run against these mutants, it evaluates the results into some categories:
* Tests that caused the unit tests to fail, the most desired outcome. "Mutant killed"
* Tests that escaped unit test notice, the least desired outcome. "Mutant survived"
* Code that caused an error based on the changes, which is neutral. 

From there it gives you a number value to keep track to. Generally, I saw that between 60% and 80% of mutants killed was indicative of good unit tests.

## Mutation Testing in Action


### I have unit tests and 100% code coverage. Why should I use mutation testing?
Code coverage can give you a good sense of where there are holes in your tests, but 100% code coverage is a folly. If you set a minimum code coverage percent, you'll find people writing bogus tests to cover another line to meet an arbitrary number.


### Is my code only good enough if all the mutants are killed off?

No! There are some mutants that reflect some version of reality. Consider the following code and one of its mutants:

```if (isGoodNumber(x) && isGoodNumber(y)) {```

becomes

```if (true) {```

There's no way your tests will kill that mutant because that reflects a reality for this line of code. 

I consider a score of 70-80% good based on my experience.

### How do I integrate the feedback provided by something like Stryker?

I suggest creating a report that shows all the unkilled mutants and seeing which of them represent an issue that you could catch with unit tests. Using Stryker, you can add the `progress` test reporter: `reporters: ["clear-text", "progress"],` to your `stryker.conf.js` file.

With my most recent foray into using mutation testing, I found that scores above 70 made sense and I didn't have anything to fix.

### What is the best place to use mutation testing?
I would use mutation testing in a larger codebase, one you are new to, or one you didn't write the tests for. It illuminates hidden issues and gives good feedback about the contents of the code and its tests.

## Recap
Mutation testing provides an alternative (or complement) to monitoring unit test code coverage. Because it produces mutants that are somewhat random, 

## Resources
1. [Wikipedia](https://en.wikipedia.org/wiki/Mutation_testing)
1. [Stryker, for js, scala, and C#](https://stryker-mutator.io/)]
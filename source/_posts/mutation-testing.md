---
title: Mutation Testing: Are Your Tests Good Enough?
date: 2019-03-04 22:37:23
tags:
---
What are mutants doing near your codebase anyway? Actually, they're testing whether your tests are good enough, not seeking to destroy things. That's true despite the jargon around mutation testing: killing, surviving, and a final score. Mutation testing is a way to check whether your tests are effective at small issues in your code by changing values in your `return`, `if`, and variable declarations.

In a small project, I added mutation tests to see what they would do with a small but ~well-tested~ overly-tested service. I used [Stryker](https://stryker-mutator.io/)) and found it pretty easy to set up and run. Further, it gave me a good view of the places where things might fail, and I felt _more_ confident after reading the report.

## Questions about Mutation Testing

### I have unit tests and code coverage metrics. Why do this?
Code coverage can give you a good sense of where there are holes in your tests, but 100% code coverage is a folly. If you set a minimum code coverage percent, you'll find people writing bogus tests to cover another line to meet an arbitrary number.

Take this bit of code:
```
class Calculator {
	constructor (float=false) {
		acceptFloat(float);
	} 

	set acceptFloat(val) {
		this.acceptFloat(val);
	}
	get acceptFloat() {
		return this.acceptFloat;
	}

	isGoodNumber(x) {
		let good = false;

		if (!acceptFloat()) {
			good = Number.isInteger(x);
		}

		return good;
	}

	add(x,y) => {
		if (isGoodNumber(x) && isGoodNumber(y)) {
			return x + y;
		} else {
			throw new TypeError('you need to use integers')
		}
	}
}
```
My baseline for code coverage is generally about 80%, though there are people out there who insist on 100%. That seems silly and means I'm going to be testing my getters and setters. That's silly because any errors there will fail on any test we write that instantiates the function or uses any properties.

Let's say you unit test the parts that matter: the `add` and `isGoodNumber` methods. The code coverage metrics would be lower than 80% purely based on line numbers, but I would say that's good enough. However, it's always in the back of my mind that I am missing something. 

Enter mutation tests.

`TODO`

### Is my code only good enough if all the mutants are killed off?

No!

### How do I integrate the feedback provided by something like Stryker?

## Resources
1. [Wikipedia](https://en.wikipedia.org/wiki/Mutation_testing)
1. [Stryker, for js, scala, and C#](https://stryker-mutator.io/)]
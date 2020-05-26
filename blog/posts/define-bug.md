---
title: What is a Bug?
date: "2019-02-19"
tags:
- quality
- bugs
---
A bug is anything that would make a user think less of your product. It's the simple. You can split hairs from there, but that's the baseline. In this post, we'll talk about what a bug is and how you should approach finding and reporting them. 

## Types of Bugs
If we define a bug as anything that detracts from your product, that doesn't mean we can leave it at that. These bugs can be categorized in many ways, but the most logical to me, is to consider what type of defect it is and how exactly it fails a user. I'm always looking for ways to expand my empathy for the users I expect to use my product, and this type of categorization helps.

With that in mind, these are the ways I sort out bugs.

### *Functionality*
Functionality bugs fail a user because we're violating the stated goals of our product.

This is the baseline for bugs for an average tester. Any one who tests software should be ready to ask questions about requirements and be ready the moment a new feature is available to test with both standard and tricky use cases.
<!-- more -->
* Does the feature work like the requirements in the ticket/story/bug/whatever? I'm assuming that the ticket is thorough enough and that the tester has the information needed and authority to make decisions about what and how to test. That's another post entirely, though.
* Does the rest of the application work with the new feature as expected?
* Regressions? Random behaviors as a side effect of this work?

### *Usability*
Usability bugs fail a user because they have expectations about how a product should act. Messing too much with their expectations will lead to a dimished view of our product.

Here's where we become great as testers. Thinking about who the product's users will be and understanding their needs will make this easier. What are their goals? What do they expect from this application? These bugs go beyond simple functionality because here, we have time, efficiency, and ease-of-use in our minds. We do need to be careful about the blind spots that both our experience with the application and our technical competence. Often we are more competent than our product's actual users, so we need to correct for that.

Things we care about here:
* Standard behavior of similar products or applications
* Would a user be confused by how this works? Remember that different users have different experience levels and approaches, so try to imagine those perpsectives when you are working.
* Easy-to-use forms. For instance, easy to tab through and use completion aids like date pickers and special fields like phone numbers and state dropdowns.

### *Look and Feel*
This is about how it looks and what that look conveys to a user. Failing here will cause a user to seek out our product if there is a better option. This isn't as important as other aspects, but the bugs here are easy to find and the fixes are usually quick.

* Does the design match the implementation?
* Also look for things that cause confusion with the fonts, colors, and layout.
* Does how this look convey the message we want to to our users.

### *Security*
Some people would say this isn't our concern, but if our concern is about our users, we need to worry about their security. This is generally hard to test, but it's worth it especially if you are testing a system that needs to be accredited. Setting up standard tests that can be reused will be especially helpful here.

Look for:
* Problems with sessions
* Data problems
* Injections, man-in-the-middle, other common attacks

## Reporting Bugs
Keeping track of the details of a bug can help you spot trends in where the bugs are coming from.

* Type of bug
* Software versions at the time it's found.
* Is it a regression? 

In the past, I've taken the stance that I cut bugs and let others worry about whether they're prioritized, but that's changed lately. If I'm going to take the time to cut a bug for you, then I will advocate for its resolution.

## Conclusion
Bugs show up from many different angles, but they generally end up in the same few categories. Understanding how each type of defect fails users can help you expand your empathy for the users you anticipate testing for.
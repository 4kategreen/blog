---
title: Does It Have To Be a Test?
date: 2019-10-30 16:26:21
categories:
- Quality
---

"I have an idea to test this." "Something is wrong here. We need to test it." "How can we test this so nothing goes wrong?"

I hear statements like this a lot when people come to me wanting to test something. Often it turns out that the problem and the solution are different from what my colleague thinks it is. My goal, as my team's lead, is to solve the problem in the most efficient way possible. My team is small and the requests for our time are numerous. I'm always trying to find ways to solve testing problems without building automation projects.

Here's how I do that.
<!-- more -->

## What's the Real Problem?
First things first, what is the real problem I'm looking to solve here? Most of us are pretty myopic about what we're trying to do. We want to make things easier for ourselves, solve a problem in a way that we already know the answer to, or solve problems that are important to us. That means that while the problem at hand may be valid, we may be only looking at the problem in a limited way.

To find the real problem, I generally ask questions to gain more context on the problem and the interests of the parties looking to solve it. Here are some of those questions:

* What caused us to decide now is the time to put a test on this problem?
* What makes the system complicated from a business logic perpsective: taxes, fees, discounts?
* What makes the system complicated from a technology perspective: system architecture, history of the codebase?
* What are some related things that we should be looking for while we're thinking about testing this?
* How did you decide that the solution you proposed is the best?

The goal here is to understand the context and start to imagine solutions.

## Automation isn't Cheap
It's not cheap to write automation. Each type of test takes time and effort for the actual development, sometimes new licenses, potentially time to learn new technology, and maintenance time after the project is done. These are the big steps I take on when I'm building automation:

1. Figure out what you're testing
1. How you're gonna test it
1. How you're gonna report the results
1. Build the first version: test, error handling, logging, and results reporting
1. Gather feedback and iterate
1. Maintenance

Because it's so complicated, I seek out the most simple solution I can. Often that isn't writing automation at all. While I always have a bunch of ideas on how to test just about anything and it's always exciting to plan out something new, we need to balance time and effort with the solution.

## What are Alternatives to Writing Automation?
I try to avoid building a large automation project if I think there are quicker, simpler ways to do the work. Some of the options are:

* Changing the product discovery and design or software development process
* Monitoring to alert us to errors and time-based issues
* Distributed tracing to track data throughout the system
* More robust testing at lower levels, such as unit or integration tests

Thinking about ways to make sure things are good enough before a project goes to production, using process and unit and integration testing, is crucial. Then, getting monitoring and tracing gives us realtime information about code once it goes into production. There are other solutions out there, limited only by creativity and the problem that needs to be solved. 

My best advice is to seek the cheapest solution, both in time and effort. All the better if it's not something you or your team has to maintain going forward.

In a forthcoming post, I'll talk about my process for planning and building automation.
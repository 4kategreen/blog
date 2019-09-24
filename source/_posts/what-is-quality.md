---
title: What is Quality in Software?
date: 2019-02-13 22:26:50
tags: 
	- code
	- quality
---
Quality is something we talk about all the time. We want our work to be good, to make money, to help others, to be awesome and admired. The word quality comes up, especially while planning our work. In the end, we say we don't test enough, we have to do hotfixes, the app breaks in ways we didn't imagine.

The dictionary says that quality, in this context, is:
{% blockquote Merriam-Webster https://www.merriam-webster.com/dictionary/quality %}
degree of excellence, superiority of kind
{% endblockquote %}

Obviously, a quality product goes way beyond just software. We apply similar standards to every item we use, every piece of art or music we consume, and even the people around us. Quality is something we all know when we see it but find it hard to explicitly define. As it relates to software directly, it:

1. works correctly, adheres to business requirements
1. works correctly, it's usable
1. is resilient
1. is reliable
1. is easy to work on

## Signs of Quality for All Stakeholders
What does quality mean to all the stakeholders of an application? Let's work from the engineering team to product and business interests ultimately to the most important stakeholder: the customer.

### Quality for the People who Work On It
At this level, we're looking for an easy-to-maintain application. We want:
* comprehensive testing at the unit and integration levels so we can fix bugs quickly. We can get into it about {% post_link Should-Code-Coverage-Ever-Be-100 code coverage %} and mocking another day, but this is very important to getting a bug fixed and deployed when the bug breaks, during business hours or not.
* robust documentation
* to be able to bring new people on with minimal trouble, so we need that documentation to include how to set up a development environment and also where to find things in the codebase. 
* the app to be reliable, to stay up. If it goes down, we want to be able to fix it fast with a fast deployment process.

Quality at this level should definitely include your future self. In my experience, the documentation I produce is actually more for myself. When there's a bug in an application I'm working on, chances are I wrote it so it'll be my brain that needs refreshing in order to fix it fast. Your future self will thank you for that hour you spent on documentation when you finish a feature.

### Quality for the Business Interests
Here, we care about whether the application works and that we can fix things quickly. Product and business teams are closely aligned with customers, though the company's bottom line is the main driver. Here, we want:

* an application that does what it's supposed to do
* a resilient application, we're protecting customer's data and have security plans in place to address failures
* a reliable application. Just as above, we want uptime and we want unplanned downtime to end fast. We also want monitoring and alerts so we can fix things fast.
* ultimately, happy customers who will pay us $$$

### Quality for our Customers
A customer's needs are simple. We don't even need to use bullet points. Customers want our application to do what it's supposed to do, quickly, as advertised. If there's a problem, they want it fixed and fast. They won't continue to pay us if these goals aren't met.

## Quality Across an Organization
I've worked in organizations who have a separate quality team and I've worked where quality is part of cross-functional teams. I've even worked where there were only engineers who were responsible for nearly everything. No matter what, the aspects of creating and maintaining quality softwware are the same. It really depends who they are assigned to.

Using the definition of quality for all stakeholders, we can establish these aspects:
1. Testing
    * Unit (many!)
    * Integration (less, but still many)
    * End-to-end (some)
    * Other testing modalities that make more sense for the application
1. Documentation
1. Continuous code integration and deployment
1. Clear business requirements that lead to clear features
1. Site reliability
    * Monitoring
    * Alerts
1. Security, both a plan and implementation in the code and in monitoring

As you can see, the list isn't long. It's a lot of work, a lot to care about, but the responsibility is shared.

## Defining Owners of Quality
This aspect of quality isn't an answer I can provide for your organization. I've seen this work well with and without a team focused on quality. What matters is defining who owns each piece of quality and how those owners are set up to succeed at their goals.
---
title: Modifying Your Code for Unit Testing
date: "2020-05-22"
tags:
- quality
- test strategy
---

If you’ve been looking around for information on unit testing and want to know a bit more, or possibly see an example of how to put it into practice, you’re in the right place.

By the end of this blog post, you should be able to:
* Look over parts of your code where you'd like to add unit tests.
* Understand how to break your code into smaller functions.
* Determine what to test.
* Start creating your tests.

We'll also cover rudimentary mocking, which is the practice of writing pretend calls to test your code against predictable values.
<!-- more -->

I originally posted this in 2018 when I worked at Fugue. You can find the original [here](https://www.fugue.co/blog/2018-04-13-modifying-your-code-for-unit-testing.html).

## Why Do Unit Tests Matter?

I'm sure you've heard this before. Unit tests matter because they make sure your code works well in isolation. Here are some examples of where unit tests show their worth:

* When you find a bug in either your code or in scenarios where your code is being used. In that case, your unit tests serve as proof the code is fixed. Add a unit test that replicates the bug, test that your code fails, and  fix your code. The new test you added should pass and remain in the suite to protect against  future failures.
* Your PM shows up with a new feature request and it requires some non-trivial changes to your current code. You're concerned about the changes breaking other parts of the code, but you have unit tests. The bugs will show up immediately while you're adding the new feature.
* Provides instant documentation. Most unit tests are meant to be human-readable so you can easily discover what’s being tested. In fact, when I’m checking out a coworker’s code, I almost immediately head to the unit tests.

## What About the Time Investment?

Like all new skills, you'll need to take some time to get used to this paradigm. Aiming to write tests for every part of your code is time-consuming and doesn't provide the highest immediate return on investment. It will take time to learn how many tests are enough, but each language has a method for determining test coverage. For Python, check out [coverage](https://coverage.readthedocs.io/en/coverage-4.5.1/). In javascript, I use [istanbul](https://istanbul.js.org/). 

Some developers say developing with unit tests is too time-consuming. In my experience, it is longer to start a project, but the return comes later. It will prove itself during code maintenance and by simplifying updates, as I highlighted above.

## Here is the Code I Wrote Without Unit Tests

Here is a small script we use to empty AWS S3 buckets to prepare it for deletion. This is a step we take because an S3 bucket needs to be empty to be deleted. A script like this is run in a few of our automated tests to deal with buckets that weren't deleted as expected after our tests are done.

<pre class="snippet-basic snippet-basic--ide line-numbers"><code class="language-python">#!/usr/bin/env python3
import subprocess

def empty_buckets():

    regions = [
        'us-east-1',
        'us-east-2',
        'us-west-1',
        'us-west-2',
        'ca-central-1',
        'eu-west-1',
        'eu-west-2',
        'eu-central-1',
        'ap-south-1',
        'ap-southeast-1',
        'ap-southeast-2',
        'ap-northeast-1',
        'ap-northeast-2',
        'sa-east-1'
    ]

    bucket_template = 'fugue-e2e-s3-%s-logging'

    for r in regions:
        bucket_name =  bucket_template % (r)
        print('Verifying logging bucket in %s exists and contains objects.' % (r))
        call = "aws --region {} s3api head-bucket --bucket {}".format(r, bucket_name)

        try:
            subprocess.check_output([call, ""], shell=True)

            print('Bucket exists. Emptying.')
            output = subprocess.check_output(["aws --region {} s3 rm s3://{} --recursive".format(r, bucket_name), ""], shell=True)
            print(output.decode('utf-8'))
        except Exception as e:
            print('Error: logging bucket in %s %s' % (r, e))</code></pre>

Let's look at the code. At line 6, I'm defining the AWS regions we want to check for deletion. At line 26 we iterate over this list to find buckets as laid out in `bucket_template`. In the `try` block on line 31, I'm checking to see if that the bucket exists. If so, I make a call to empty the bucket. If there is an error, we'll print a log with the bucket name and the error but keep going.

If I were to write unit tests for this, I'd want to verify a few things:

* My script won't die if either AWS call fails or returns malformed data.
* My script handles incorrect region names (This has happened to us even with the information coming from AWS!).
* My script keeps going if there are any errors in a specific region.

And while we're here, we can do two things to improve this:

* First, pass in the bucket template as an argument so we can use the bucket template in other places in our code.
* Second, make a call to get all regions that AWS supports so our code will work even as AWS adds new regions.

## Adding Unit Tests Without Code Changes

This script relies on the AWS CLI, but I want to be sure I can test against specific responses from the CLI. This helps me to be sure I'm testing every possibility so I know my code is solid. When you are relying on the CLI, you can’t be 100% sure you’ll get the response you want to test. However, I can do this via _mocking_, which is the practice of faking a call to an external dependency (in this case, the AWS CLI) and returning the data to test my code. Here's how I could do it in here.

<pre class="snippet-basic snippet-basic--ide line-numbers"><code class="language-python">from unittest import TestCase
from unittest.mock import patch
import empty_buckets

@patch('subprocess.check_output')
class TestEmptyBuckets(TestCase, mock_cli):
  # this sets the AWS CLI call to always return True
    mock_cli.return_value = True

    def test_bucket_exists_works_as_expected(self):
        empty_buckets()
        self.assertEqual(...)</code></pre>

But wait, I’m stuck. What should I do here? Should I test the log output? Should I query the bucket I'm emptying? That won't work because I don't want to rely on AWS to do my unit tests. So I don't know what I want to test.

Besides, for my mocking, aren't there two `subprocess.check_output` calls that return two different things? This isn't going to work. We shouldn't even move forward.

For my mocking, there are two `subprocess.check_output` calls that return two different things. There are ways to deal with this in mocking, but since we're making two different calls and expecting two different outputs means we need to rethink the approach.

## Modifying the Code to Make It Unit Testable

Writing code for unit tests means that code needs to be broken up into small parts that do one thing and that one thing is tested. Let's modify our code so each part does one thing and try to start unit testing again.

<pre class="snippet-basic snippet-basic--ide line-numbers"><code class="language-python">#!/usr/bin/env python3
import subprocess
import json

# bucket_template syntax: 'k8-logging-bucket-%s' where %s is the region
# 'k8-logging-bucket-us-east-1' or 'k8-logging-bucket-eu-west-2'
def empty_all_buckets(bucket_template):
    regions = get_regions()

    for r in regions:
        bucket_name =  bucket_template % (r)
        if (verify_bucket_exists(bucket_name, r)):
            print('Bucket exists. Emptying.')
            empty_bucket(bucket_name, r)


def get_regions():
    regions = []
    call = "aws ec2 describe-regions --query 'Regions[].{Region:RegionName}'"
    try:
        output = subprocess.check_output([call, ""], shell=True)

        formatted_output = json.loads(output)

        for r in formatted_output:
            if 'Region' in r and r['Region'] is not None:
                regions.append(r['Region'])
    except Exception as e:
        return 'Error: unable to get regions: %s' % e

    return regions


def verify_bucket_exists(bucket, region):
    call = "aws --region %s s3api head-bucket --bucket %s" % (region, bucket)

    try:
        output = subprocess.check_output([call, ""], shell=True)
        if output:
            raise Exception('does not exist')
        else:
            return True
    # if the bucket doesn't exist, there will be an error
    except Exception as e:
        return 'Error: %s %s' % (bucket, e)


def empty_bucket(bucket, region):
    call = "aws --region %s s3 rm s3://%s --recursive" % (region, bucket)
    try:
        output = subprocess.check_output([call, ""], shell=True)

        return output
    except Exception as e:
        error_message = 'Error: logging bucket in %s %s' % (region, e)

        return error_message</code></pre>

The first thing you'll notice is that the script is a little longer. I had to do error handling for each function with an AWS call. Next, I pulled out each little piece of functionality. `get_regions`, `verify_bucket_exists`, and `empty_bucket` all do one thing and do it well. This is key to unit testing. We can now write unit tests on each of those functions. The "main" function, `empty_all_buckets`, is also unit testable if I mock all three of the functions I wrote.

So let's try this again. First, I'm going to start with showing my thought process on the main function. Then, I’ll plan my unit tests and change my code to match the requirements I set forth. Finally, I'll actually write tests for the smaller functions to show the results.

## Unit Tests for `empty_all_buckets()`

For the main function, I’m  going to show my thought process _before_ I write the unit tests.

First, we need to mock each of our functions. We'll create `@patch`es for each and set return values based on our test cases. Next, we'll set our test cases. Here are my ideas:

1. Test if `bucket_template` doesn't have a spot for a region, since this function deletes the same bucket in each region. To do this, each bucket needs to be tagged with a region: `k8-logging-bucket-us-east-1`.
2. Test that the bucket template contains characters AWS doesn't accept in S3 bucket names.
3. Test that it works as expected. Always test the “happy” path.

As we go about testing this, the code will change because it's just not up to snuff in meeting these test requirements. We'd need to handle the errors I defined above and handle any other unexpected errors. This is common when rewriting code for unit tests. If you think your code is getting worse, look at your unit tests and decide if they’re meeting your needs.

## Unit Tests for `get_regions()`

For `get_regions()`, I want it to populate the region value only if there are no errors. If there are errors, I expect that it will return an empty list. Also, I want to check that the expected values are there, since AWS returns a large string that I want to format down to just a list of actual region names like I created manually the first time. So the unit tests I want are:

* Make sure it works with expected return value.
* Make sure it works if the return value is malformed (if one of the `Region` fields is missing).

<pre class="snippet-basic snippet-basic--ide line-numbers"><code class="language-python">import unittest
from unittest import TestCase
from unittest.mock import patch
from subprocess import CalledProcessError
import empty_buckets as eb

# pulled directly from AWS CLI call
expected_region_val = '[{"Region": "ap-south-1"},{"Region":"eu-west-3"}]'
malformed_region_val = '[{"Region": "ap-south-1"},{"Region":null}]'

class TestGetRegions(TestCase):
    @patch('subprocess.check_output')
    def test_get_regions_works_as_expected(self, mock_subprocess):
        mock_subprocess.return_value=expected_region_val

        regions = eb.get_regions()
        self.assertEqual(regions, ['ap-south-1', 'eu-west-3'])

    @patch('subprocess.check_output')
    def test_get_regions_works_malformed_value(self, mock_subprocess):
        mock_subprocess.return_value=malformed_region_val

        regions = eb.get_regions()
        self.assertEqual(regions, ['ap-south-1'])


if __name__ == "__main__":
    unittest.main()</code></pre>

## Unit Tests for `verify_bucket_exists()`

Testing this method is simpler because the output from the AWS call is either: no response if the bucket exists, or an error if it doesn't. Here we need tests for those two options. Then we need to verify that our function returns `True` or `False` in each case.

<pre class="snippet-basic snippet-basic--ide line-numbers"><code class="language-python">import unittest
from unittest import TestCase
from unittest.mock import patch
from subprocess import CalledProcessError
import empty_buckets as eb

class TestVerifyBucketExists(TestCase):
    @patch('subprocess.check_output')
    def test_verify_bucket_exists_true(self, mock_subprocess):
        mock_subprocess.return_value=''

        result = eb.verify_bucket_exists('sample_bucket_doesnt_matter', 'us-east-1')
        self.assertEqual(result, True)

    @patch('subprocess.check_output')
    def test_verify_bucket_exists_false(self, mock_subprocess):
        mock_subprocess.return_value='An error occurred (404) when calling the HeadBucket operation: Not Found'

        result = eb.verify_bucket_exists('sample_bucket_doesnt_matter', 'us-east-1')
        self.assertEqual(result, 'Error: sample_bucket_doesnt_matter does not exist')

if __name__ == "__main__":
    unittest.main()</code></pre>

## Unit Tests for `empty_bucket()`
Here, we're emptying buckets and logging the output. If we get any sort of errors, we'll report them.

<pre class="snippet-basic snippet-basic--ide line-numbers"><code class="language-python">import unittest
from unittest import TestCase
from unittest.mock import patch
from subprocess import CalledProcessError
import empty_buckets as eb

expected_output = 'delete: s3://mybucket/test1.txt \ndelete: s3://mybucket/test2.txt'

class TestEmptyBucket(TestCase):
    @patch('subprocess.check_output')
    def test_empty_bucket_with_output(self, mock_subprocess):
        mock_subprocess.return_value=expected_output

        result = eb.empty_bucket('sample_bucket_doesnt_matter', 'us-east-1')
        self.assertEqual(result, expected_output)

    @patch('subprocess.check_output')
    def test_empty_bucket_with_error(self, mock_subprocess):
        mock_subprocess.side_effect = CalledProcessError

        self.assertRaises(Exception, eb.empty_bucket('sample_bucket_doesnt_matter', 'us-east-1'))

if __name__ == "__main__":
    unittest.main()</code></pre>

## Recap

This is how I go about adding unit tests to an existing script. This is a pretty simple example, but it's always best to start small. It's a new skill. You're used to writing code a certain way and changing that takes effort.

Here are the things to remember when you decide to start writing unit tests for your code:

* Write separate functions that do one thing and one thing well.
* Anything inside your function that gets anything from anywhere else (API calls, other classes and functions) needs to be mocked.
* Augment your code to match the tests you think you need. Don't water down your test ideas because your code is missing something.

Good luck transitioning to writing unit testable code!

To learn more about Fugue, check out our [Product page](https://fugue.co/product/).

## Resources

### Code from this Post

https://gist.github.com/4kategreen/7e18e8effa12375fae82b6800671009b

### Mocking

#### Javascript

* [Why Sinon.js Is Perfect for Javascript Unit Test Mocking](https://spin.atomicobject.com/2017/12/11/javascript-unit-test-mocking/)
* [Unit Tests 102: Isolating your code with Mocks and Stubs](http://anzorb.com/unit-tests-102-isolating-your-code-with-mocks-and-stubs/)

#### Python

* [Python Mocking 101: Fake It Before You Make It](https://blog.fugue.co/2016-02-11-python-mocking-101.html)
* [Getting Started with Mocking in Python](https://semaphoreci.com/community/tutorials/getting-started-with-mocking-in-python)


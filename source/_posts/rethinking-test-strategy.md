---
title: Rethinking Unit Test Stategy
date: 2020-06-05
tags:
- test strategy
---

In the my [last post](https://www.kategreen.codes/2020/05/22/unit-testing/), I reposted an article from 2018 about modifying a simple script to make it more testable. It's been two years since I wrote that, and the way I evaluate testing needs for code has changed. Let's look at that script again. 

## Requirements
The script I wrote emptied AWS S3 buckets of any objects to get them ready to be deleted. AWS won't delete an S3 bucket if it has any objects (files or subdirectories) in it. Here were the requirements of my script:

1. We stored buckets in each AWS region, but they all have a similar name: `logs-${region}`. We need to delete objects in these buckets. 
2. Sometimes there wouldn't be a bucket for a region, but we need to check them all. If a bucket doesn't exist or is empty, skip it and continue.
3. Optimize for speed over quality. This is a one off script.

So, to test it, I'm not sure I need to test it to death. I need to make sure that it:
* empties every bucket that matches the naming pattern
* skips (and logs) any buckets that aren't there
* doesn't die on any errors

## Changes I'd Make
I want to make sure both the script and test(s) aren't brittle. AWS updates its regions often enough that I don't want to bury the region list too deeply. I also don't want to hardcode the bucket we're trying to empty. 

On the testing side, this will also help me write tests that won't break unless the requirements for the script change. So here are my changes:

1. Make the bucket name an argument
1. Make the region list an argument
1. Mock AWS S3 to create tests around the three basic requirements:
  * make sure buckets are empty after running the script
  * make sure it skips and logs any buckets that don't exist
  * make sure a bucket that doesn't match the pattern is not emptied.

## The Script
```
#!/usr/bin/env python3
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
            print('Error: logging bucket in %s %s' % (r, e))
```
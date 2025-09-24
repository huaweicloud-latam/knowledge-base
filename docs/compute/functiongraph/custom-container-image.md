---
title: Custom Container Image Function
layout: default
parent: FunctionGraph
grand_parent: Compute
permalink: /docs/compute/functiongraph/custom-container-image-function
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Custom Container Image Function

V1.0 – July 2024

| **Version**       | **Author**                     | **Description**      |
| ----------------- | ------------------------------ | -------------------- |
| V1.0 – 2024-07-11 | Diogo Hatz d50037923           | Initial Version      |
| V1.0 – 2024-07-11 | Wisley da Silva Paulo 00830850 | Document Review      |

# Objective

This document aims to present the procedures required to create a function in Huawei Cloud's FunctionGraph serverless service with a runtime based on a container image.

# Considerations

**<span class="underline">Important:</span>** To execute functions based on container images in FunctionGraph, the following criteria must be met:

1. An HTTP server listening on port 8000 must be configured and
be running in the created container;

2. The USER user that will run the container cannot be root. It is necessary to create a new user to run the container with a UID
other than 0, 1000, and 1002. The default UID of FunctionGraph is 1003,
therefore, if a different UID is configured, it is necessary to change
it in the function configuration in FunctionGraph;

3. The following environment variables must exist within the container: 
   1. **HOME**: Path where the function source code will be located; 
   2. **GROUP_ID**: GID of the user group that will run the container; 
   3. **GROU_NAME**: Name of the user group that will run the container; 
   4. **USER_ID**: UID of the user that will run the container; 
   5. **USER_NAME**: Name of the user that will run the container. 
   
# SWR 

To create a function based on a container image, you must first upload the image to the Huawei Cloud SWR (Software Repository for Container) repository service. **<span class="underline">Notice:</span>** For items 2.0 and 3.0 of this
document, you can also refer to the following HWC video for
SWR configuration:
<https://developer.huaweicloud.com/intl/en-us/forum/topic/02117151603960362356>.

Access the SWR service panel in the HWC console and click “Create
Organization”. Fill in the field for the organization name and
confirm its creation by clicking “OK”.

{% include image.html post=page.path file="image3.png" %}

{% include image.html post=page.path file="image4.png" %}

Once the Organization has been created, click on the button related to “Generate Login
Command” and copy the generated command that will be used to perform
Docker authentication with the SWR repository.

{% include image.html post=page.path file="image5.png" %}

{% include image.html post=page.path file="image6.png" %}

# Docker

Access the machine that has the container image locally that will run in FunctionGraph and paste the command copied in item 2.0 of this
document, related to Docker authentication with the HWC SWR service.

{% include image.html post=page.path file="image7.png" %}

After logging into the SWR repository via Docker, copy the following
command, changing the fields [image name 1:tag 1], [Image repository
address], [Organization name] and [Image name 2:tag 2] according to
the list below:

- **[Image name 1:tag 1]:** {name:tag} of the image to be
uploaded;

- **[Image repository address]:** SWR domain. It can be obtained in
the login command obtained in item 2.0 of this document;

- **[Organization name]:** Name of the organization created in item 2.0
of this document;

- **[Image name 2:tag 2]:** {name:tag} of the image that will appear in
SWR. Similar to a rename, the same name and tag can be
kept.

```shell
docker tag {Image name 1:tag 1} {Image repository address} {Organization name} {Image name 2:tag 2}
```

Example:

```shell
docker tag novo:1.0 swr.sa-brazil-1.myhuaweicloud.com/functiongraph/helloworld:1.0
```

Now upload the image with the following command:

```shell
docker push {Image repository address} {Organization name} {Image name 2:tag 2}
```

Example:

```shell
docker push swr.sa-brazil-1.myhuaweicloud.com/functiongraph/helloworld:1.0
```

{% include image.html post=page.path file="image8.png" %}

On the SWR service page in the HWC console, You can see that the image has been successfully published to the repository:

{% include image.html post=page.path file="image9.png" %}

# Agency

To delegate permissions from the SWR service to FunctionGraph, you need to create an agency with permissions over SWR. Navigate to the IAM service in the Huawei Cloud console and click the “Agencies” page.

Click “Create Agency” to create an agency.

{% include image.html post=page.path file="image10.png" %}

Give the agency a name, select the agency type as “Cloud Service”, and select the FunctionGraph service. Click “Next” to proceed.

{% include image.html post=page.path file="image11.png" %}

Delegate “SWR FullAccess” and “SWR Admin” permissions to the agency and
click “Next” and then click “OK” to finish.

{% include image.html post=page.path file="image12.png" %}

{% include image.html post=page.path file="image13.png" %}

# FunctionGraph

Access the FunctionGraph service in the Huawei Cloud console and navigate to
the Functions \> Function List page. Click “Create Function”.

{% include image.html post=page.path file="image14.png" %}

Select the “Container Image”, “HTTP Function” option, give the function a name, select the agency created in item 4.0 of this document, and
select the SWR image.

{% include image.html post=page.path file="image15.png" %}

{% include image.html post=page.path file="image16.png" %}

You can also configure additional container options, such as the
CMD startup command, execution arguments, User ID, and Group ID.

**<span class="underline">Important:</span>** The default User ID used is 1003, and the User ID corresponding to the root user on UNIX systems cannot be used. To execute functions based on container images, it is recommended to create a new user with UID = 1003
and set this user as the USER when building the image.

{% include image.html post=page.path file="image17.png" %}

Once you have created the function, click “Test” to test the created function. Confirm the example of the HTTP request received and click “Create”. Click “Test” again to test the created function.

{% include image.html post=page.path file="image18.png" %}

{% include image.html post=page.path file="image19.png" %}

{% include image.html post=page.path file="image20.png" %}

{% include image.html post=page.path file="image21.png" %}

**<span class="underline">Important:</span>** If the function execution
shows the error “runtime process is exited”, check the memory
allocated to the function in “Configuration” and “Memory(MB)”, allocating more
memory.

{% include image.html post=page.path file="image22.png" %}

Finally, just configure a trigger for the function. In this example, the
trigger that will call the FunctionGraph function will be an API Gateway from
the HWC APIG service. To create a trigger, just click on “+ Create
Trigger” and configure the APIG instance, filling in the API Group,
Environment, Security Authentication, protocol and timeout.

{% include image.html post=page.path file="image23.png" %}

{% include image.html post=page.path file="image24.png" %}

{% include image.html post=page.path file="image25.png" %}

It is worth noting that in the API configuration related to the function call,
the function in question must be explicitly specified as the API backend.

{% include image.html post=page.path file="image26.png" %}

# Example

In this example, a function written in .NET 8.0 was developed with a
trigger by HWC's API Gateway (APIG) so that, every time it is
called, the function makes a GET request to a remote HTTP server.

Calling the API via the API Gateway dashboard in the HWC console:

{% include image.html post=page.path file="image27.png" %}

Remote HTTP Server Listener:

{% include image.html post=page.path file="image28.png" %}

API Execution Result:

{% include image.html post=page.path file="image29.png" %}

# References

- FunctionGraph Documentation: <https://support.huaweicloud.com/intl/en-us/qs-functiongraph/functiongraph_04_0103.html>.
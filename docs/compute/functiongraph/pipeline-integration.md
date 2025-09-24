---
title: Pipeline Integration
layout: default
parent: FunctionGraph
grand_parent: Compute
permalink: /docs/compute/functiongraph/pipeline-integration
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Pipeline Integration

V1.0 – July 2024

| **Version**       | **Author**                     | **Description**      |
| ----------------- | ------------------------------ | -------------------- |
| V1.0 – 2024-07-16 | Diogo Hatz d50037923           | Initial Version      |
| V1.0 – 2024-07-16 | Wisley da Silva Paulo 00830850 | Document Review      |

# Objective

This document aims to present the procedures required to integrate a function from Huawei Cloud's FunctionGraph serverless service running a container image with CI/CD processes through pipelines. This way, it is possible to ensure that the container image of the FunctionGraph function is always up to date.

# Considerations

**<span class="underline">Important:</span>** To integrate FunctionGraph with pipelines, simply upload the updated image to Huawei Cloud's SWR image repository service. However, it is mandatory that both the image name and its tag are the same as those of the image that originated the FunctionGraph function, to ensure that the URL of this image is the same as that configured in the function at the time of its creation. You can also change the URL of the image associated with the function through the following API: <https://support.huaweicloud.com/intl/en-us/api-functiongraph/functiongraph_06_0111.html>. 

There are two approaches to this integration: using pipelines from HWC’s CodeArts Pipelines service or using pipelines from third-party services. Both approaches will be explored below: 

1. **CodeArts Pipeline:** In the Build task configuration, simply select the “Build Image and Push to SWR” option. The image will be built and then automatically published to the SWR repository; 
2. **Third-party pipeline:** In the final step of the pipeline, simply add an action to upload the image to the SWR repository. 
   
# SWR Organization 

Navigate to the SWR service in the Huawei Cloud console. Click the “Organizations” tab and click “Create Organization”. Give the organization a name and click “OK” to confirm the organization creation.

{% include image.html post=page.path file="image3.png" %}

{% include image.html post=page.path file="image4.png" %}

# CodeArts

To integrate a FunctionGraph function with a pipeline created in the Huawei Cloud CodeArts Pipelines service, simply create a build task in CodeArts Build according to the steps below.

## **Service Endpoint**

Navigate to the CodeArts Req service in the Huawei Cloud console. If this is your first time logging into the service, you will be prompted to create a CodeArts project. Access the settings of the created CodeArts project by clicking on “Settings” \> “General” \> “Service Endpoints” \> “Create Endpoint”. Select the service where the source code related to the Dockerfile is located.

{% include image.html post=page.path file="image5.png" %}

Select the authentication type with the repository and click on “Authorize and Confirm” to authenticate with the repository.

{% include image.html post=page.path file="image6.png" %}

## **CodeArts Build**

Once the repository endpoint has been created, navigate to the CodeArts Build service and
click on “Create Task” to create a Build task. Give the task a name, select the Code Source type where the Dockerfile source code will be located. {% include image.html post=page.path file="image7.png" %} {% include image.html post=page.path file="image8.png" %} Configure the Service Endpoint created in item 4.1 of this document, select the repository and the repository branch and click “Next”. {% include image.html post=page.path file="image9.png" %} Select the “Maven and Container” build template and click “OK”. {% include image.html post=page.path file="image10.png" %}

Delete the Maven build step from the build process.

{% include image.html post=page.path file="image11.png" %}

Click on the “Build Image and Push to SWR” build step, select the desired Docker version, the image repository as SWR, and the organization created in item 3.0 of this document.

{% include image.html post=page.path file="image12.png" %}

**<span class="underline">Important:</span>** For the image name and tag, both must be fixed, since changes to the image in FunctionGraph will only be reflected for a given name and tag pair. It is recommended to use the latest tag.

{% include image.html post=page.path file="image13.png" %}

## **CodeArts Pipelines**

Navigate to the CodeArts Pipelines service section in the Huawei Cloud console and click “Create Pipeline”. {% include image.html post=page.path file="image14.png" %}

Set a name for the pipeline, the service where the Dockerfile source code is located, and the endpoint created in item 4.1 of this document.

{% include image.html post=page.path file="image15.png" %}

Also configure the repository where the source code is located and its branch. Click “Next” to proceed and select the “Blank Template” template.

{% include image.html post=page.path file="image16.png" %}

{% include image.html post=page.path file="image17.png" %}

In “Stage\_1”, delete the existing “New Job” and create a job for Build. In the Build stage configuration, associate the task created in item 4.2 of this document and the repository where the Dockerfile source code is located.

{% include image.html post=page.path file="image18.png" %}

{% include image.html post=page.path file="image19.png" %}

{% include image.html post=page.path file="image20.png" %}

To add a trigger to the pipeline, click “Task Orchestration” above and select the “Execution Plan” option. Select the trigger type, such as code commit or merge request.

{% include image.html post=page.path file="image21.png" %}

{% include image.html post=page.path file="image22.png" %}

# Third-party pipeline

To integrate a FunctionGraph function with a third-party pipeline, simply upload the image after its build to the HWC SWR repository by adding a Docker task in the final stage of the pipeline, according to the commands executed below. Here is the documentation for the Docker “Docker@2” task on Azure as a reference:
<https://learn.microsoft.com/en-us/azure/devops/pipelines/tasks/reference/docker-v2?view=azure-pipelines&tabs=yaml>.

## **Getting a Permanent Login to SWR**

### **Generating an AK/SK**

To get permanent authentication credentials with SWR,
first log in to the Huawei Cloud console and access the
Identity and Access Management (IAM) service, click “User Groups” and then
“Create User Group”.

{% include image.html post=page.path file="image23.png" %}

Give the group a name and click “OK”.

{% include image.html post=page.path file="image24.png" %}

Click “Authorize” next to the created group, select the “SWR
Admin” policy, followed by “OK” and “Finish”.

{% include image.html post=page.path file="image25.png" %}

{% include image.html post=page.path file="image26.png" %}

{% include image.html post=page.path file="image27.png" %}

{% include image.html post=page.path file="image28.png" %}

Now to create a new user, click on “Create User”.

{% include image.html post=page.path file="image29.png" %}

Give the user a name, uncheck the “Management console
access” box, and check the “Access key” box. Click “Next” to
proceed, add the user to the group created above, and then click
“Create”.

{% include image.html post=page.path file="image30.png" %}

{% include image.html post=page.path file="image31.png" %}

Click “OK” to download the generated AK/SK key, which will be used
to create authentication credentials with Docker later.

{% include image.html post=page.path file="image32.png" %}

### **Generating Docker credentials**

Log in to any machine running the Linux operating system and
type the following command, replacing the “AK” and “SK” fields with the
AK/SK key generated in item 5.1.1 of this document.

```shell
printf "AK" | openssl dgst -binary -sha256 -hmac "SK" | od -An -vtx1 |
sed 's/\[ \\n\]//g' | sed 'N;s/\\n//'
```

{% include image.html post=page.path file="image33.png" %}

After executing the command, a key will be generated. Simply replace the
key generated in the command below in the “Login key” field and the AK in the “AK” field
to obtain the Docker authentication command with the SWR repository.

docker login -u \[Regional project name\]@\[AK\] -p \[Login key\]
\[Image repository address\]

For the Santiago region, for example, the “Regional Project Name” is
la-south-2, while the “Image repository address” is
swr.la-south-2.myhuaweicloud.com. Here is an example of the authentication command:

```shell
docker login -u la-south-2@RVHVMX\*\*\*\*\*\* -p cab4ceab4a1545\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\* swr.la-south-2.myhuaweicloud.com
```

{% include image.html post=page.path file="image34.png" %}

## **Uploading the image to SWR**

After logging in the SWR repository through Docker, copy the following
command, changing the fields \[image name 1:tag 1\], \[Image repositor
address\], \[Organization name\] and \[Image name 2:tag 2\] according to
the list below:

- **\[Image name 1:tag 1\]:** {name:tag} of the image that will be
uploaded;

- **\[Image repositor address\]:** SWR domain. It can be obtained in
the login command obtained in item 5.1.2 of this document;

- **\[Organization name\]:** Name of the organization created in item 3.0
of this document;

- **\[Image name 2:tag 2\]:** {name:tag} of the image that will appear in
the SWR. Similar to a rename, the same name and tag can be
kept.

```shell
docker tag {Image name 1:tag 1} {Image repository address} {Organization name} {Image name 2:tag 2}
```

Example:

```shell
docker tag novo:1.0 swr.la-south-2.myhuaweicloud.com/adada/serase
```

Now just upload the image with the following command:

```shell
docker push {Image repository address} {Organization name} {Image name 2:tag 2}
```

Example:

```shell
docker push swr.la-south-2.myhuaweicloud.com/adada/serase
```

{% include image.html post=page.path file="image35.png" %}

On the SWR service page in the HWC console, you can see that the
image was successfully published to the repository:

{% include image.html post=page.path file="image36.png" %}

## **Creating the pipeline task**

The final task of the pipeline itself will consist of a series of commands
executed in Docker that will follow the following workflow:

1. Log in to the Registry where the built image is located;

2. Pull the image from the original Registry;

3. Log out of the Registry;

4. Log in to Huawei's SWR repository;

5. Associate a tag with the image in item 2;

6. Push the image to Huawei's SWR repository;

7. Log out of the SWR repository;

{% include image.html post=page.path file="image37.png" %}

{% include image.html post=page.path file="image38.png" %}

# FunctionGraph

Having ensured that the name and tag of the image published to SWR via the
Pipeline is exactly the same as the image associated with the function in
FunctionGraph, any changes made to the image will be reflected in the
FunctionGraph function.

{% include image.html post=page.path file="image39.png" %}

# Example

In this example, a pipeline was created so that every time a commit is made to the master branch of the specified Test repository, the pipeline will be activated and will build the Docker image according to the Dockerfile in the repository, upload it to the Huawei Cloud SWR repository, and consequently update the FunctionGraph function.

Committing to GitHub repository:

{% include image.html post=page.path file="image40.png" %}

Pipeline triggered:

{% include image.html post=page.path file="image41.png" %}

{% include image.html post=page.path file="image42.png" %}

Build complete, pipeline completed:

{% include image.html post=page.path file="image43.png" %}

{% include image.html post=page.path file="image44.png" %}

You can see in the SWR repository that the image has been updated:

{% include image.html post=page.path file="image45.png" %}

Since the image has the same URL as the image associated with the
FunctionGraph function, the changes will be reflected in the desired function.

{% include image.html post=page.path file="image39.png" %}

# References

- FunctionGraph documentation: <https://support.huaweicloud.com/intl/en-us/api-functiongraph/functiongraph_06_0111.html>.

- SWR documentation: <https://support.huaweicloud.com/intl/en-us/usermanual-swr/swr_01_1000.html>.

- Azure Pipeline Tasks documentation: <https://learn.microsoft.com/en-us/azure/devops/pipelines/tasks/reference/docker-v2?view=azure-pipelines&tabs=yaml>.
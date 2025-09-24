---
title: Automate Resources Lifecycle
layout: default
parent: Cloud Operations Center (COC)
grand_parent: Management & Governance
permalink: /docs/management-and-governance/coc/automate-resources-lifecycle
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Automate Resources Lifecycle

V1.0 – September 2024

| **Version**       | **Author**                     | **Description**      |
| ----------------- | ------------------------------ | -------------------- |
| V1.0 – 2024-09-10 | Diogo Hatz d50037923           | Initial Version      |
| V1.0 – 2024-09-10 | Wisley da Silva Paulo 00830850 | Document Review      |

# Objective

This document aims to present the procedures required to create an automated task to periodically turn on and off resources in Huawei Cloud through the Cloud Operations Center (COC) service.

# COC

To create an automated task to turn on and off resources for an account in Huawei Cloud, first access the COC service through the HWC console and allow the delegation of permissions to the agency related to the COC service. **Note:** The agencies created for the COC service will only be used to delegate permissions to the COC service.

{% include image.html post=page.path file="image3.png" %}

{% include image.html post=page.path file="image4.png" %}

Navigate to the “Resource O&M” section and access the “Automated O&M” subsection.

{% include image.html post=page.path file="image5.png" %}

Select the “Scheduled O\&M” routine to define an automated resource power-on and power-off policy and click “Create Task”.

{% include image.html post=page.path file="image6.png" %}

{% include image.html post=page.path file="image7.png" %}

Enter information relevant to the task, such as its name and the enterprise project to which the task belongs. Additionally, enter a time zone for the periodic definition of the task. Select the “Periodic execution” option to set a date and time for the periodic execution of the function, as well as the expiration date of the function.

{% include image.html post=page.path file="image8.png" %}

{% include image.html post=page.path file="image9.png" %}

Select the task type as “Jobs” and “Common Jobs” and select the desired job. In this example, a task will be created to automatically initialize ECSs. Select the agency “ServiceLinkedAgencyForCOC” in “IAM Agency” and the region used.

{% include image.html post=page.path file="image10.png" %}

Click “+Add” to add ECS instances that will be part of the periodic task and select the respective instances.

{% include image.html post=page.path file="image11.png" %}

{% include image.html post=page.path file="image12.png" %}

After that, simply disable the Batch Policy and Manual Review options and
click “Submit” to save the created task. **Note:** The batch policy option is used to delimit distinct groups of resources for the task,
while the manual review option is used to force authorization for the execution of the task by a delimited approver.

{% include image.html post=page.path file="image13.png" %}

You can see the task status as “Enabled” in the COC console.

{% include image.html post=page.path file="image14.png" %}

# Example

After defining the task created in item 2.0 of this document, you can see that when the day and time specified in the task were reached, the ECS defined in the task was initialized.

{% include image.html post=page.path file="image15.png" %}

{% include image.html post=page.path file="image16.png" %}

You can also view the task execution status through the COC console

{% include image.html post=page.path file="image17.png" %}

{% include image.html post=page.path file="image18.png" %}

# References

- COC Documentation: <https://support.huaweicloud.com/intl/en-us/usermanual-coc/coc_um_05_03_01.html>.
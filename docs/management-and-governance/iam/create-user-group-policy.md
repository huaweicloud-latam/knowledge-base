---
title: Creating User, Group and Policy
layout: default
parent: Identity and Access Management (IAM)
grand_parent: Management & Governance
permalink: /docs/management-and-governance/iam/create-user-group-policy
---
<img width="450px" height="102px" src="https://console-static.huaweicloud.com/static/authui/20210202115135/public/custom/images/logo-en.svg">

# Creating User, Group and Policy

V1.0 – March 2023

| **Version**       | **Author**                     | **Description**      |
| ----------------- | ------------------------------ | -------------------- |
| V1.0 – 2023-03    | Gabriel Gutierrez 00817435     | Initial Version      |

# Introduction

This document presents the procedures for creating a policy, group,
and user. If you already have policies created or want to use existing
policies in the console, you can skip the "Policy Creation" step and start by creating the groups and then the users.

# Policy Creation

Access the IAM service:

{% include image.html post=page.path file="image3.png" %}

Click on “Permission” and then on “Policeis/Roles”

{% include image.html post=page.path file="image4.png" %}

Click on “Create Custom Policy”

{% include image.html post=page.path file="image5.png" %}

Set the name for the policy and start defining the policy content. Note: In the example below, we are defining permissions for a user/group with a DBA profile with exclusive access to the EDS service. **But remember to adjust according to your needs**.

{% include image.html post=page.path file="image6.png" %}

Select the service

{% include image.html post=page.path file="image7.png" %}

Specify which service features you want to allow/deny, or if you want to grant full access to the service, click "Select All."

{% include image.html post=page.path file="image8.png" %}

Keep the "All" option unless you have advanced knowledge to specify service features you want to limit.

{% include image.html post=page.path file="image9.png" %}

There is no need to add a condition except in very specific cases (if necessary, contact a partner for assistance). Fill out a description for the policy and finally click "OK."

{% include image.html post=page.path file="image10.png" %}

# Group Creation

Access the IAM service:

{% include image.html post=page.path file="image3.png" %}

Select “User Groups” and then “Create User Group”

{% include image.html post=page.path file="image11.png" %}

Set the group name, a description and click ok.

{% include image.html post=page.path file="image12.png" %}

Click on the group.

{% include image.html post=page.path file="image13.png" %}

Click “Authorize”.

{% include image.html post=page.path file="image14.png" %}

Select the policies you want to use in the group and click "Next."

{% include image.html post=page.path file="image15.png" %}

Select how the permission will be granted, for example, for a specific region or for resources deployed in a specific project. **The more restrictive the permission granted, the more secure your account will be.**

{% include image.html post=page.path file="image16.png" %}

Click "Finish"

{% include image.html post=page.path file="image17.png" %}

# User Creation

Access the service IAM:

{% include image.html post=page.path file="image3.png" %}

Click on "Users" and then on "Create User":

{% include image.html post=page.path file="image18.png" %}

Fill in the fields as instructed in the following sub-items:

Fill in the "Username" field with the standard you want to use in the console or with a standard that already exists in your infrastructure, for example, nome.ultimo

Fill in the field “Email Address” with the user’s email, use corporate email, avoid using personal email. Note: On some networks, users have difficulty accessing information such as verification codes in their corporate email. If this occurs, contact your network/security team to investigate the issue.

Filling in the "Mobile Number" is not mandatory, but recommended in case of problems receiving verification codes by email.

Select the access type according to the user's needs. However, for security reasons, avoid all users having programmatic access and the console with a standard one.

Select the "Credential Type" field to download programmatic access credentials.

Set the user's initial password or let the system generate a random password and keep the option to change the password on first access selected for security reasons. Note: If
rio has trouble changing the password the first time you log in due to the verification email, uncheck the option to change the password. The first time you grant access in person,
rio will offer your terminal when the user enters the password.

**STRONGLY** recommended that you enable MFA to protect your logs.

Click “Next”.

{% include image.html post=page.path file="image19.png" %}

Select the group with the permission set you want for the user. Note: Users can be assigned to more than one group or no group at all. If they don't belong to any group, permissions/policies must be assigned directly to the user, as shown in sections 3.4.1 to 3.4.

{% include image.html post=page.path file="image20.png" %}

Click on the user you want to directly assign policies to:

{% include image.html post=page.path file="image21.png" %}

Click “Permissions”:

{% include image.html post=page.path file="image22.png" %}

Click “Authorize”:

{% include image.html post=page.path file="image23.png" %}

Select “Select permissions,” then select all the permissions you want for the user (Note: You can use the search function to make things easier) and then click "Next":

{% include image.html post=page.path file="image24.png" %}

If "Enterprise projects" mode is enabled, select which project(s) the user will have permission to access.

{% include image.html post=page.path file="image25.png" %}

Click "Finish."

{% include image.html post=page.path file="image26.png" %}
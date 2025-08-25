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

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image3.png"
style="width:6.26806in;height:1.31319in" />

Click on “Permission” and then on “Policeis/Roles”

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image4.png"
style="width:6.26806in;height:2.04583in" />

Click on “Create Custom Policy”

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image5.png"
style="width:6.26806in;height:3.04236in" />

Set the name for the policy and start defining the policy content. Note: In the example below, we are defining permissions for a user/group with a DBA profile with exclusive access to the EDS service. **But remember to adjust according to your needs**.

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image6.png"
style="width:6.27574in;height:2.58302in" />

Select the service

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image7.png"
style="width:6.29661in;height:2.64184in" />

Specify which service features you want to allow/deny, or if you want to grant full access to the service, click "Select All."

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image8.png"
style="width:6.26806in;height:3.51597in" />

Keep the "All" option unless you have advanced knowledge to specify service features you want to limit.

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image9.png"
style="width:6.26806in;height:2.50069in" />

There is no need to add a condition except in very specific cases (if necessary, contact a partner for assistance). Fill out a description for the policy and finally click "OK."

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image10.png"
style="width:6.26806in;height:2.48194in" />

# Group Creation

Access the IAM service:

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image3.png"
style="width:6.26806in;height:1.31319in" />

Select “User Groups” and then “Create User Group”

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image11.png"
style="width:6.26806in;height:2.03681in" />

Set the group name, a description and click ok.

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image12.png"
style="width:6.26806in;height:2.08819in" />

Click on the group.

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image13.png"
style="width:6.26806in;height:2.02778in" />

Click “Authorize”.

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image14.png"
style="width:6.26806in;height:2.35069in" />

Select the policies you want to use in the group and click "Next."

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image15.png"
style="width:6.26806in;height:3.53333in" />

Select how the permission will be granted, for example, for a specific region or for resources deployed in a specific project. **The more restrictive the permission granted, the more secure your account will be.**

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image16.png"
style="width:6.26806in;height:3.50556in" />

Click "Finish"

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image17.png"
style="width:6.26806in;height:2.49167in" />

# User Creation

Access the service IAM:

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image3.png"
style="width:6.26806in;height:1.31319in" />

Click on "Users" and then on "Create User":

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image18.png"
style="width:6.26806in;height:2.05625in" />

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

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image19.png"
style="width:6.26806in;height:3.51597in" />

Select the group with the permission set you want for the user. Note: Users can be assigned to more than one group or no group at all. If they don't belong to any group, permissions/policies must be assigned directly to the user, as shown in sections 3.4.1 to 3.4.

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image20.png"
style="width:6.26806in;height:3.51667in" />

Click on the user you want to directly assign policies to:

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image21.png"
style="width:5.65117in;height:1.83071in" />

Click “Permissions”:

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image22.png"
style="width:5.6659in;height:2.38475in" />

Click “Authorize”:

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image23.png"
style="width:5.6524in;height:2.40662in" />

Select “Select permissions,” then select all the permissions you want for the user (Note: You can use the search function to make things easier) and then click "Next":

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image24.png"
style="width:5.75014in;height:3.21207in" />

If "Enterprise projects" mode is enabled, select which project(s) the user will have permission to access.

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image25.png"
style="width:5.70919in;height:3.20439in" />

Click "Finish."

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/create-user-group-policy/image26.png"
style="width:6.26806in;height:1.825in" />
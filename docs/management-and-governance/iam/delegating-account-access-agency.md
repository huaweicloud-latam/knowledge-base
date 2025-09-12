---
title: Delegating Account Access via Agency
layout: default
parent: Identity and Access Management (IAM)
grand_parent: Management & Governance
permalink: /docs/management-and-governance/iam/delegating-account-access-agency
---

# Delegating Account Access via Agency

V1.0 – March 2023

| **Version**           | **Author**               | **Description** |
|-------------------    |--------------------------|---------------- |
| V1.0 – March 17, 2023 | Gabriel Gutiérrez 817435 | Initial Release |

# INTRODUCTION

The Agency role allows you to delegate another account to implement
O&M on your resources based on the assigned permissions. You can
delegate resource access only to accounts. Accounts can then
delegate access to the IAM users under them.

By creating an Agency, you can share your resources with another
contact or delegate an individual or team to manage your resources.
You don't need to share your security credentials (such as password
and access keys) with the delegate. Instead, the delegate
can log in with their own account credentials and then
use the "Switch Role" function to log into your account and manage
your resources.

# PROCEDURE

1. In the HUAWEI CLOUD Console, open the services menu on the
left side, search for "iam," and select the "Identity and Access Management"

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/delegating-account-access-agency/image3.png"
style="width: 6.26806 in; height: 2.07361 in" />

2. In the left-hand menu, click “Agencies.”

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/delegating-account-access-agency/image4.png"
style="width: 6.26806 in; height: 2.99306 in" />

3. In the upper-right corner, click “Create Agency.”

> <img
> src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/delegating-account-access-agency/image5.png"
> style="width: 6.26806 in; height: 1.88819 in" />

4. Choose a name for the Agency (“Partner Management,” for example);
In "Delegated Account," enter the partner's account name (account ID); then click "Next."

> <img
> src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/delegating-account-access-agency/image6.png"
> style="width: 4.55746 in; height: 3.3209 in." />

5. On the next screen, search for “tenant administrator,” select the checkbox, and then click “Next.”

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/delegating-account-access-agency/image7.png"
style = "width: 6.26806 in; height: 2.92778 in." />

6. On the next screen, click “OK,” and then click “OK” again to confirm.

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/delegating-account-access-agency/image8.png"
style = "width: 6.26806 in; height: 2.91806 in." />

7. Click “Finish”

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/delegating-account-access-agency/image9.png"
style = "width: 4.70912 in; height: 1.92361 in." />

8. Return to the Agency list (step 2), hover over the name of the Agency you created, and click the icon to copy the Agency ID.

<img
src="/huaweicloud-knowledge-base/assets/images/management-and-governance/iam/delegating-account-access-agency/image10.png"
style = "width: 6.26806 in; height: 2.05417 in." />

Provide your account name, agency name, and an agency ID (copied in step 8) to the delegating party (partner). A delegating party can then switch roles to your account and manage resources.

# REFERENCES

**Delegating Resource Access to Another Account**

<https://support.huaweicloud.com/intl/en-us/usermanual-iam/iam_06_0001.html>

Accessed on March 17, 2023

**Creating an Agency (by a Delegating Party)**

<https://support.huaweicloud.com/intl/en-us/usermanual-iam/iam_06_0002.html>

Accessed on March 17, 2023
---
title: CloudEye Integration with Dataminer for Alarm Sending
layout: default
parent: Cloud Eye Service (CES)
grand_parent: Management & Governance
permalink: /docs/management-and-governance/ces/creating-and-managing-alarms
---

# Cloudeye Integration with Dataminer for Alarm Sending

V1.0 – January 2024

| **Version**       | **Author**                        | **Description** |
| ----------------- | ------------------------          | --------------- |
| V1.0 – 2023-12-20 | Gustavo Marques Scovini g50037306 | Initial Version |
| V1.0 – 2023-12-21 | Lincoln Yoshio Ito 00487338       | Document Review |

# Introduction

Proposed Scenarios for Sending Simple Message Notification (SMN) Alarms

# Scenario 1

Cloud Eye -> SMN -> ECS -> Dataminer

{% include image.html post=page.path file="image3.png" %}

In this first scenario, Simple Message Notification (SMN)
will send alarms via the public IP 119.8.132.22 to the EIP
located on Elastic Cloud Service (ECS) in our environment. ECS
will receive, process, and store these
requests. The alarm history will be recorded in the file
"alarm_history.txt," while the last alarm sent will be stored in the file
"latest_alarm.txt."

After storing this data, ECS will send the final
alarm via an HTTPS POST, using its internal IP address, to
an Endpoint configured in Oi's Dataminer. It is crucial to
provide an EndPoint, ensuring that, when the
event (alarm) occurs, it is forwarded to the Oi environment
through the already established VPN.

# Scenario 2

Cloud Eye -> SMN -> ECS -> Dataminer

{% include image.html post=page.path file="image4.png" %}

In this second scenario, Simple Message Notification (SMN) will
send alarms via the public IP address 119.8.132.22 to the
EIP allocated in Elastic Cloud Service (ECS) in our environment. ECS will
be responsible for receiving, processing, and storing these requests. The alarm history will be recorded in the "alarm_history.txt" file,
while the last alarm sent will be stored in the "latest_alarm.txt" file.
After storing this data, the server will read the "latest_alarm.txt" file and make it available via a
GET request, using the machine's private IP, port, and path
specified.

**Example:** https://192.168.0.2:8000/latest_data

Examples and Files

**Here is an example of how requests are archived and received (JSON format):**

```json
{
  "subscribe_url": "https://sa-brazil-1-console.huaweicloud.com/smn/subscription/confirm?token=bd4140f92d7941cdb34be53d74e37ac5e385f782ddea40049a8a7c80220dd8bff3d79d09478741ba9f3bf9798914312f4716a4a2ce6f46ad8e2809b1c907cfc1&topic_urn=urn:smn:sa-brazil-1:bd4140f92d7941cdb34be53d74e37ac5:alarm-testing&region=sa-brazil-1&region_id=sa-brazil-1",
  "signature": "CBvmpsXxmr/cqKv43seu5Fg6yO6be0C1NlchD5dpsCg6BJSEHamzup6bKA9U+C0WHDFGb2a+ZaHUkqZQY8iR1HFPcizCne7sMn+LqOyyoMFF1+PtCU/g3rLYyDGVPEI2BjzYPRo6ijNOVAEPTneh+hvx5/4dIca7Lj96/+RbuJCzEuifXPIXf8ljr7KsAjG9R4N9lSU97tZR573b3Yftm4y1xBTV+7NCfndXXFJTPObqYfix7wTn5STQdTMjFQZv9jLDPRjbFpsN2JJ1/Y5tFTdv74uIMRz85+VRBeTyzE/yzvSKBiEFAHgLQLQhm0dP5c6rImbbk2d62FBGvoqQ0w==",
  "topic_urn": "urn:smn:sa-brazil-1:bd4140f92d7941cdb34be53d74e37ac5:alarm-testing",
  "message_id": "5bc5cf7e988249e991446a2a2c6a1be6",
  "signature_version": "v1",
  "type": "SubscriptionConfirmation",
  "message": "You are invited to subscribe to topic: urn:smn:sa-brazil-1:bd4140f92d7941cdb34be53d74e37ac5:alarm-testing. To confirm this subscription, please visit the subscribe_url included in this message. The subscribe_url is valid only within 48 hours.",
  "signing_cert_url": "https://smn.sa-brazil-1.myhuaweicloud.com/smn/SMN_sa-brazil-1_439574c9504b45589a008b0d718fad99.pem",
  "timestamp": "2024-01-12T16:50:00Z"
}
```

```json
{
  "signature": "iQ8CZscqIfyTEH3auKurIzcoPXNw9fmq2XdhNfNy4GhzgeRZkSFjDZ0w+noDtHX55zOQLidvSjnXADgE6teFwvecjF9WG/0+UEJLIQF2X4itzHdlmFw8sWqTTAOvLUB9fZIgv57F+ustoAIJuN1b9qydCqvO85qMhCiLrcuf4GbciYYO86vjPzSP2K/TQuoKDJnS1yOA2/jQ7sZHNENF1cODiFYLnAqf05XImmiAePkDdqnW9S7qEUTcKQcwi821SRiyUpUFL75QTR6fDqH9ctymS2va0t/+UOD7HJ0xlaSWCT2vrOYqlnr69BvGWZk5ciaNda/Sb4p1ad37NGou/Q==",
  "subject": "[Critical Alarm]From Cloud Eye: The (Agent) CPU Usage of Advanced Monitoring-ECSs \"ecs-alarms\" has triggered an alarm.",
  "topic_urn": "urn:smn:sa-brazil-1:bd4140f92d7941cdb34be53d74e37ac5:alarm-testing",
  "message_id": "d3df1fb0248f48b69fb9df4676177406",
  "signature_version": "v1",
  "type": "Notification",
  "message": "{\n  \"message_type\": \"alarm\",\n  \"alarm_id\": \"al1704475580412b2a4lnr3W\",\n  \"alarm_name\": \"alarm-shop\",\n  \"alarm_status\": \"alarm\",\n  \"time\": 1705078276006,\n  \"namespace\": \"AGT.ECS\",\n  \"metric_name\": \"cpu_usage\",\n  \"dimension\": \"instance_id:ed5e8d39-9301-45ea-b11d-6ece27a09e17\",\n  \"period\": 1,\n  \"filter\": \"Raw data\",\n  \"comparison_operator\": \"\\u003e=\",\n  \"value\": 80,\n  \"unit\": \"%\",\n  \"count\": 1,\n  \"alarmValue\": [\n    {\n      \"time\": 1705078260000,\n      \"value\": 97.08\n    }\n  ],\n  \"sms_content\": \"[LA-Sao Paulo1][Critical Alarm]Dear hwstaff_intl_50037306: The (Agent) CPU Usage of Advanced Monitoring-ECSs \\\"ecs-alarms\\\" (Private IP Address: 192.168.1.130, Public IP Address: 119.8.138.180, ID: ed5e8d39-9301-45ea-b11d-6ece27a09e17),  Raw data \\u003e= 80% for 1 consecutive periods,\\nCurrent Data: 97.08%,\\nat 01 12, 2024 13:51:16 GMT-03:00 triggered an alarm,Alarm Rule Name: alarm-shop, You can log in to the Cloud Eye console to view details.\",\n  \"default_content\": \"[LA-Sao Paulo1][Critical Alarm]Dear hwstaff_intl_50037306: The (Agent) CPU Usage of Advanced Monitoring-ECSs \\\"ecs-alarms\\\" (Private IP Address: 192.168.1.130, Public IP Address: 119.8.138.180, ID: ed5e8d39-9301-45ea-b11d-6ece27a09e17),  Raw data \\u003e= 80% for 1 consecutive periods,\\nCurrent Data: 97.08%,\\nat 01 12, 2024 13:51:16 GMT-03:00 triggered an alarm,Alarm Rule Name: alarm-shop, You can log in to the Cloud Eye console to view details.\",\n  \"template_variable\": {\n    \"AccountName\": \"hwstaff_intl_50037306\",\n    \"Namespace\": \"Advanced Monitoring\",\n    \"DimensionName\": \"ECSs\",\n    \"ResourceName\": \"ecs-alarms\",\n    \"MetricName\": \"(Agent) CPU Usage\",\n    \"IsAlarm\": true,\n    \"IsCycleTrigger\": false,\n    \"AlarmLevel\": \"Critical\",\n    \"Region\": \"LA-Sao Paulo1\",\n    \"ResourceId\": \"ed5e8d39-9301-45ea-b11d-6ece27a09e17\",\n    \"PrivateIp\": \"192.168.1.130\",\n    \"PublicIp\": \"119.8.138.180\",\n    \"AlarmRule\": \"\",\n    \"CurrentData\": \"97.08%\",\n    \"CurrentDatas\": [],\n    \"AlarmTime\": \"01 12, 2024 13:51:16 GMT-03:00\",\n    \"DataPoint\": {\n      \"01 12, 2024 13:51:00 GMT-03:00\": \"97.08%\"\n    },\n    \"DataPointTime\": [\n      \"01 12, 2024 13:51:00 GMT-03:00\"\n    ],\n    \"AlarmRuleName\": \"alarm-shop\",\n    \"AlarmId\": \"al1704475580412b2a4lnr3W\",\n    \"AlarmDesc\": \"\",\n    \"MonitoringRange\": \"All resources\",\n    \"IsOriginalValue\": true,\n    \"Period\": \"\",\n    \"Filter\": \"Raw data\",\n    \"ComparisonOperator\": \"\\u003e=\",\n    \"Value\": \"80%\",\n    \"Unit\": \"%\",\n    \"Count\": 1,\n    \"EventContent\": \"\",\n    \"Link\": \"https://console.huaweicloud.com/ces/?region=sa-brazil-1#/alarm/histories?alarmId=al1704475580412b2a4lnr3W\\u0026resourceId=ed5e8d39-9301-45ea-b11d-6ece27a09e17\",\n    \"IsIEC\": false,\n    \"IsAgentEvent\": false,\n    \"IngressMaxBandwidthPerSec\": \"\",\n    \"EgressMaxBandwidthPerSec\": \"\",\n    \"WWN\": \"\",\n    \"BDF\": \"\",\n    \"TriggerInfos\": [],\n    \"AlarmPolicies\": []\n  }\n}",
  "unsubscribe_url": "https://sa-brazil-1-console.huaweicloud.com/smn/subscription/unsubscribe?region=sa-brazil-1&region_id=sa-brazil-1&subscription_urn=urn:smn:sa-brazil-1:bd4140f92d7941cdb34be53d74e37ac5:alarm-testing:df299ea12128487aa2ad22e3f0576d0b",
  "signing_cert_url": "https://smn.sa-brazil-1.myhuaweicloud.com/smn/SMN_sa-brazil-1_439574c9504b45589a008b0d718fad99.pem",
  "timestamp": "2024-01-12T16:51:26Z"
}
```

```json
{
  "signature": "AhAedaOjxGb6X+ouv7O66pj0EPRbEVzYrM2W/dwcByhNq7uVaSrCArhv3TdKGzVp7JwfH7Yn4bvFo2C1FLGOWmzdhW1hnPZy5TrnjLuCyN+upZIAaF9ROxEa9TUWXkfqHChvIZa6EbQj9uycOEHUpdyOeDqZIoTZ14wvP7thRLZ3o0cRy1lcUyGEDkViViFVYN2ItRVfEDyC3Yc/IpEbhcmhiCUWh0nzsCWhKLxOhTZsqgc2NrrhvKzvsGaSTevsAxspSbu5t1jt9K837/9SmLI6InSQLwnxhg+c0tKJR5hZ/lQq5MRPMXHa1bspyIj8lnafJGvCvTk8KpuCxVoh7A==",
  "subject": "[Critical Ok]From Cloud Eye: The (Agent) CPU Usage of Advanced Monitoring-ECSs \"ecs-gpt\" has changed to OK from Alarm.",
  "topic_urn": "urn:smn:sa-brazil-1:bd4140f92d7941cdb34be53d74e37ac5:alarm-testing",
  "message_id": "1233754afe11489fb287f6b0daba8f68",
  "signature_version": "v1",
  "type": "Notification",
  "message": "{\n  \"message_type\": \"alarm\",\n  \"alarm_id\": \"al1704475580412b2a4lnr3W\",\n  \"alarm_name\": \"alarm-shop\",\n  \"alarm_status\": \"ok\",\n  \"time\": 1704992690581,\n  \"namespace\": \"AGT.ECS\",\n  \"metric_name\": \"cpu_usage\",\n  \"dimension\": \"instance_id:69cd8177-e857-4317-9081-02c11760ab11\",\n  \"period\": 1,\n  \"filter\": \"Raw data\",\n  \"comparison_operator\": \"\\u003e=\",\n  \"value\": 80,\n  \"unit\": \"%\",\n  \"count\": 1,\n  \"alarmValue\": [\n    {\n      \"time\": 1704992640000,\n      \"value\": 0.3\n    }\n  ],\n  \"sms_content\": \"[LA-Sao Paulo1][Critical Ok]Dear hwstaff_intl_50037306: The (Agent) CPU Usage of Advanced Monitoring-ECSs \\\"ecs-gpt\\\" (Private IP Address: 172.16.1.143, Public IP Address: 119.8.143.21, ID: 69cd8177-e857-4317-9081-02c11760ab11), \\nCurrent Data: 0.30%,\\nat 01 11, 2024 14:04:50 GMT-03:00 changed to OK from Alarm,Alarm Rule Name: alarm-shop, You can log in to the Cloud Eye console to view details.\",\n  \"default_content\": \"[LA-Sao Paulo1][Critical Ok]Dear hwstaff_intl_50037306: The (Agent) CPU Usage of Advanced Monitoring-ECSs \\\"ecs-gpt\\\" (Private IP Address: 172.16.1.143, Public IP Address: 119.8.143.21, ID: 69cd8177-e857-4317-9081-02c11760ab11), \\nCurrent Data: 0.30%,\\nat 01 11, 2024 14:04:50 GMT-03:00 changed to OK from Alarm,Alarm Rule Name: alarm-shop, You can log in to the Cloud Eye console to view details.\",\n  \"template_variable\": {\n    \"AccountName\": \"hwstaff_intl_50037306\",\n    \"Namespace\": \"Advanced Monitoring\",\n    \"DimensionName\": \"ECSs\",\n    \"ResourceName\": \"ecs-gpt\",\n    \"MetricName\": \"(Agent) CPU Usage\",\n    \"IsAlarm\": false,\n    \"IsCycleTrigger\": false,\n    \"AlarmLevel\": \"Critical\",\n    \"Region\": \"LA-Sao Paulo1\",\n    \"ResourceId\": \"69cd8177-e857-4317-9081-02c11760ab11\",\n    \"PrivateIp\": \"172.16.1.143\",\n    \"PublicIp\": \"119.8.143.21\",\n    \"AlarmRule\": \"\",\n    \"CurrentData\": \"0.30%\",\n    \"CurrentDatas\": [],\n    \"AlarmTime\": \"01 11, 2024 14:04:50 GMT-03:00\",\n    \"DataPoint\": {\n      \"01 11, 2024 14:04:00 GMT-03:00\": \"0.30%\"\n    },\n    \"DataPointTime\": [\n      \"01 11, 2024 14:04:00 GMT-03:00\"\n    ],\n    \"AlarmRuleName\": \"alarm-shop\",\n    \"AlarmId\": \"al1704475580412b2a4lnr3W\",\n    \"AlarmDesc\": \"\",\n    \"MonitoringRange\": \"All resources\",\n    \"IsOriginalValue\": true,\n    \"Period\": \"\",\n    \"Filter\": \"Raw data\",\n    \"ComparisonOperator\": \"\\u003e=\",\n    \"Value\": \"80%\",\n    \"Unit\": \"%\",\n    \"Count\": 1,\n    \"EventContent\": \"\",\n    \"Link\": \"https://console.huaweicloud.com/ces/?region=sa-brazil-1#/alarm/histories?alarmId=al1704475580412b2a4lnr3W\\u0026resourceId=69cd8177-e857-4317-9081-02c11760ab11\",\n    \"IsIEC\": false,\n    \"IsAgentEvent\": false,\n    \"IngressMaxBandwidthPerSec\": \"\",\n    \"EgressMaxBandwidthPerSec\": \"\",\n    \"WWN\": \"\",\n    \"BDF\": \"\",\n    \"TriggerInfos\": [],\n    \"AlarmPolicies\": []\n  }\n}",
  "unsubscribe_url": "https://sa-brazil-1-console.huaweicloud.com/smn/subscription/unsubscribe?region=sa-brazil-1&region_id=sa-brazil-1&subscription_urn=urn:smn:sa-brazil-1:bd4140f92d7941cdb34be53d74e37ac5:alarm-testing:df299ea12128487aa2ad22e3f0576d0b",
  "signing_cert_url": "https://smn.sa-brazil-1.myhuaweicloud.com/smn/SMN_sa-brazil-1_439574c9504b45589a008b0d718fad99.pem",
  "timestamp": "2024-01-11T17:05:00Z"
}
```

**Scenario 1:** Example of a request sent by ECS to a
[Public Webhook](https://webhook-test.com/) for demonstration purposes:

{% include image.html post=page.path file="image8.png" %}

**Scenario 2:** Example of a GET request to the URL
http://192.168.1.169:8000/latest_data

{% include image.html post=page.path file="image9.png" %}

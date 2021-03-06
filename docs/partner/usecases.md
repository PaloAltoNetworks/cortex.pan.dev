---
id: use
title: Cortex Use Cases
sidebar_label: Cortex Use Cases
description: Cortex Use Cases
keywords:
  - cortex data lake
  - data lake
  - use cases
  - partners
---

There are virtually infinite scenarios for applications that consume information in Cortex Data Lake. Here are some of the most common use-cases. As new features and data are added to the Cortex API and Data Lake schema, the scenarios will continue to grow over time.

## Analytics

Apps have access to a wealth of network information, generated by the Next-Generation Firewall, including Enhanced Application Logs that carry security-relevant portions of the payload (e.g. DNS requests and responses, HTTP headers, ARP information) The powerful APIs to search and correlate real-time and historical data allows apps to quickly make sense of the behavior of network devices and point to anomalies. As soon as a Cortex app is activated and authorized by our customer, the app is immediately able to scan Cortex Data Lake and extract features to quickly tune machine learning algorithms or search for malicious behavioral patterns. Time to value is immensely reduced for the customer and vendor. Cortex XDR-Analytics (previously known as Magnifier) utilizes the same information to automatically detect and report malicious network intrusions.

## Security Incident Response

Once malicious behavior is detected by the Next-Generation Firewall or Cortex XDR-Analytics, a threat log is generated and stored in Cortex Data Lake. The Data Lake provides a single entry point for any app to access a feed of alerts that can be used to trigger a response mechanism, which can be very specific to the customer’s environment. Security orchestration, automation and response (SOAR) platforms can use the information in the Data Lake to create incidents (i.e., as soon as a high-severity threat log is generated) that can be automatically enriched with more context by running additional queries on the Data Lake (i.e., additional logs from the Next-Generation Firewall related to the same IP address or User) before determining the right follow-up action or playbook to execute. Other apps might just block an IP address or quarantine a user to prevent lateral movement or data exfiltration.

## Risk-Based Access Control

Many applications rely on past events to determine how to behave during a specific scenario. One example is user authentication and access control: depending on the user’s location, previous activity, or ongoing alerts, the mechanism can be tuned to prevent access or enforce multi-factor authentication (MFA). Cortex apps can use the wealth of information present within the Data Lake to determine a baseline of common user behavior. Once a new request comes in (user authentication, network access control, etc.), an app can determine in real-time the associated risk and define the appropriate behavior based on dynamic policies. This not only improves security, but also improves the user experience, enabling additional controls only when required.

## Visualization and Correlation

One of the key challenges of cybersecurity is the lack of visibility. Data is often scattered across multiple systems, each with its own special way to consume the data in order to visualize the relevant information and apply correlation rules. While there are technologies that perform this by retrieving and storing copies of the data, this is impractical and expensive as the same information is stored multiple times, and customers have to pay for it. With Cortex Data Lake and its APIs, apps can query and correlate all the information directly, without the need to ingest the entire set of information. Moreover, with a single API and a single entry point, it is possible to get access to the entire set of information from the network.

## ICS/SCADA/Medical and IoT Security

Securing industrial, medical and IoT devices is a complex challenge that is generating increasing demand in the industry, as several attacks target such systems and can have a dramatic impact with potentially catastrophic consequences. CISOs are responsible for and being tasked with addressing the cybersecurity challenges of these environments along several verticals (e.g., Manufacturing, Energy, Automotive, Industry 4.0, Building Management Systems, Medical, etc.) Each vertical is very different and requires specific domain expertise and knowledge. Several vendors have taken on the challenge of securing these environments in different ways, and Cortex helps them to simplify and optimize the deployment of such offerings. By leveraging the data generated by Next-Generation Firewalls (including the Enhanced Application Logs, which allow the firewalls to extract specific portions of the payload of several ICS/Medical and IoT – without storing any sensitive data like PHI) that is stored in Cortex Data Lake, these vendors allow customers to protect their ICS/Medical and IoT environments without the need to deploy additional components in their networks. Common use cases are identification and fingerprinting of devices, detection of abnormal behavior (e.g., is an insulin pump supposed to communicate to the internet, why an IP camera is sending data overseas, or why a PLC is being reprogrammed) and alerting based on static or dynamic policies.

## Threat Hunting

By accessing both the fresh and historical information available in Cortex Data Lake, threat hunters can search for specific events, such as connections to specific IP addresses or malicious URLs. Combining these searches with other Palo Alto Networks offerings, such as AutoFocus, which provides its own set of APIs, allows threat intel platforms to increase the amount of information they can provide to threat hunters in order to track down attackers and extract indicators of Compromise (IOCs) that can be blocked across organizations.

---

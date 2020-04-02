---
id: pan_cortex_xdr_nodejs_ref
title: XdrApi object reference
sidebar_label: XdrApi object reference
description: Quick reference to the XdrApi object
keywords:
  - cortex XDR
  - cortex
  - api
  - nodejs
---

[![GitHub page](https://img.shields.io/badge/GitHub-Repo-brightgreen?style=for-the-badge&logo=github)](https://github.com/PaloAltoNetworks/pan-cortex-xdr-nodejs) ![TypeScript](https://img.shields.io/badge/lang-TypeScript-blue?style=for-the-badge) ![JavaScript](https://img.shields.io/badge/lang-JavaScript-orange?style=for-the-badge)

> Quick reference to functions available in the XdrApi object and its TypeScript signature. Full TSDoc reference available in the [project repository](https://github.com/PaloAltoNetworks/pan-cortex-xdr-nodejs/tree/master/doc)

### Alert API (XdrApi.alert)
* **insParsed**

  Upload alerts from external alert sources in Cortex XDR format. Cortex XDR displays alerts that are parsed successfully in related incidents and views. You can send 600 alerts per minute. Each request can contain a maximum of 60 alerts.
```ts
insParsed: (alerts: XdrAlert[]) => Promise<InsertParsedAlertsResponse>
```
### Audit API (XdrApi.audit)
* **auditAgentReport**

  Get agent event reports.
```ts
auditAgentReport: (filters: AuditFilter[], search_from?: number | undefined, search_to?: number | undefined, sort?: AuditSort | undefined) => Promise<AgentReportResponse>
```

* **managementLogs**

  Get audit management logs.
```ts
managementLogs: (filters: ManagementFilter[], search_from?: number | undefined, search_to?: number | undefined, sort?: ManagementSort | undefined) => Promise<ManagementLogResponse>
```
* **quarantineStatus**

  Retrieve the quarantine status for a selected file.
```ts
quarantineStatus: (files: QuarantineItem[]) => Promise<QuarantineStatusResponse>
```
### Device Control API (XdrApi.deviceControl)
* **getDeviceViolations**

  Gets a list of device violations filtered by selected fields.
```ts
getDeviceViolations: (filters: ViolationFilter[], search_from?: number | undefined, search_to?: number | undefined, sort?: ViolationSort | undefined) => Promise<GetDeviceViolationsResponse>
```
### Distributions API (XdrApi.distributions)
* **create**

  Create an installation package. This is an async call that returns the distribution ID, it does not mean that the creation succeeded. To confirm the package has been created, check the status of the distribution by running the Get Distribution Status API.
```ts
create: (distributon: PackageStandalone | PackageUpgrade) => Promise<CreateDistributionResponse>
```

* **status**
  
  Check the status of the installation package.
```ts
status: (distributionId: string) => Promise<DistributionStatusResponse>
```

* **url**

  Get the distribution URL for downloading the installation package.
```ts
url: (distributionId: string, packageType: PackageType) => Promise<DistributionUrlResponse>
```
### End Point API (XdrApi.endpoint)
* **get**

  Gets a list of filtered endpoints. Response is concatenated using AND condition (OR is not supported). Maximum result set size is 100
```ts
get: (filters: EndpointFilter[], search_from?: number | undefined, search_to?: number | undefined, sort?: EndpointSortCriteria | undefined) => Promise<GetEndpointResponse>
```

* **getAll**

  Gets a list of your endpoints
```ts
getAll: () => Promise<GetAllEndpointResponse>
```

* **isolate**

  Isolate one or more endpoints in a single request
```ts
isolate: (criteria: string | EndpointFilter[]) => Promise<IsolateEndpointResponse>
```

* **unisolate**

  Unisolate one or more endpoints in a single request
```ts
unisolate: (criteria: string | EndpointFilter[]) => Promise<UnisolateEndpointResponse>
```

* **scan**

  Run a scan on selected endpoints
```ts
scan: (filters: EndpointFilter[]) => Promise<ScanEndpointResponse>
```

* **cancelScan**

  Cancel the scan of selected endpoints. A scan can only be aborted if the selected endpoints are in Pending or in Progress status.
```ts
cancelScan: (filters: EndpointFilter[]) => Promise<CancelScanEndpointResponse>
```

* **delete**

  Delete selected endpoints in the Cortex XDR app. You can delete up to 100 endpoints.
```ts
delete: (filters: EndpointFilter[]) => Promise<DeleteEndpointResponse>
```

* **policy**

  Get the policy name for a specific endpoint
``` ts
policy: (endpointId: string) => Promise<PolicyEndpointResponse>
```

* **retrieveFile**
  Retrieve files from selected endpoints. You can retrieve up to 20 files, from no more than 100 endpoints.
```ts
retrieveFile: (filters: EndpointFilter[], files: Partial<RetrieveFiles>) => Promise<FileRetrieveEndpointResponse>
```

* **quarantineFile**

  Quarantine file on selected endpoints.
```ts
quarantineFile: (filters: EndpointFilter[], filePath: string, fileHash: string) => Promise<FileQuarantineEndpointResponse>
```

* **restoreFile**

  Restore a quarantined file on a requested endpoints.
```ts
restoreFile: (fileHash: string, endpoint_id?: string | undefined) => Promise<FileRestoreEndpointResponse>
```
### Hash Exception API (XdrApi.hashException)
* **blacklistFile**

  Blacklist requested files which have not already been blacklisted or whitelisted.
```ts
blacklistFile: (hashList: string[], comment?: string | undefined) => Promise<BlacklistFileResponse>
```

* **whitelistFile**

  Whitelist requested files which have not already been blacklisted or whitelisted.
```ts
whitelistFile: (hashList: string[], comment?: string | undefined) => Promise<WhitelistFileResponse>
```
### Incident API (XdrApi.incident)
* **get**

  Get a list of incidents filtered by a list of incident IDs, modification time, or creation time.
```ts
get: (filter: IncidentFiler[], search_from?: number | undefined, search_to?: number | undefined, sort?: SortCriteria | undefined) => Promise<GetIncidentsResponse>
```

* **getExtraData**

  Get extra data fields of a specific incident including alerts and key artifacts.
```ts
getExtraData: (incidentId: string, alertsLimit: number) => Promise<GetIncidentsDetailsResponse>
```

* **updateIncident**

  Update one or more fields of a specific incident. Missing fields are ignored.
```ts
updateIncident: (incidentId: string, udpdateData: UpdateData) => Promise<UpdateIncidentResponse>
```

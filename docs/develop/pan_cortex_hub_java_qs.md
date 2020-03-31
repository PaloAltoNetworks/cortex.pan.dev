---
id: pan_cortex_hub_java_qs
title: Hub Quickstart
sidebar_label: Hub Quickstart
description: Getting started with the Jsvs CortexHub library
keywords:
  - cortex data lake
  - cortex
  - api
  - hub
  - java
---

[![GitHub page](https://img.shields.io/badge/GitHub-Repo-brightgreen?style=for-the-badge&logo=github)](https://github.com/PaloAltoNetworks/pan-cortex-hub-java) ![JAVA](https://img.shields.io/badge/lang-JAVA-ff69b4?style=for-the-badge)

Collection of `Credentials` objects to be used alongside applications leveraging
the Cortex Data Lake API [See Data Lake Quickstart](/docs/develop/pan_cortex_data_lake_java_qs)

It also provides the `HubHelper` class for quick prototyping SaaS Components to interface with Cortex hub.

## `Credentials` collection

Quick overview of available classes

### `StaticCredentials`

The most basic of them all. It just wraps a static `access_token` value

```java
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.util.Map;
import java.util.function.Function;

import com.paloaltonetworks.cortex.hub.Constants;
import com.paloaltonetworks.cortex.hub.HubCredentialsStatic;
import com.paloaltonetworks.cortex.hub.HubException;
import com.paloaltonetworks.cortex.data_lake.QueryServiceClient;

public class Example {
    final static String ACCESS_TOKEN = "eyJh....65wg";
    final static String SQL_CMD = "SELECT * from `<instance-id>.firewall.traffic` LIMIT 20";

    public static void main(String[] args) throws HubException, KeyManagementException, NoSuchAlgorithmException {
        Function<Boolean, Map.Entry<String, String>> cred = new HubCredentialsStatic(Constants.USFQDN, ACCESS_TOKEN);
        var qsc = new QueryServiceClient(cred);
        for (var page : qsc.iterable("SQL_CMD"))
            System.out.println(page.toString());
    }
}
```

### `SimpleCredentialsProvider`

A credentials object that provides a refreshed `access_token` from a known
OAuth2 `refresh_token` (plus `client_id` and `client_secret`)

Best practise to keep secrets secure is to provide them using environmental
variables.

```bash
PAN_CLIENT_ID=<client_id> \
PAN_CLIENT_SECRET=<client_secret> \
PAN_REFRESH_TOKEN=<refresh_token> \
java Example.java
```

```java
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.util.Map;
import java.util.function.Function;

import com.paloaltonetworks.cortex.hub.HubCredentialProviderSimple;
import com.paloaltonetworks.cortex.hub.HubException;
import com.paloaltonetworks.cortex.data_lake.QueryServiceClient;

public class Example {
    final static String SQL_CMD = "SELECT * from `<instance-id>.firewall.traffic` LIMIT 20";

    public static void main(String[] args)
            throws InterruptedException, HubException, KeyManagementException, NoSuchAlgorithmException {
        Function<Boolean, Map.Entry<String, String>> cred = HubCredentialProviderSimple.factory();
        System.out.println(cred.apply(true));
        var qsc = new QueryServiceClient(cred);
        for (var page : qsc.iterable(SQL_CMD))
            System.out.println(page.toString());
    }
}
```

But, if needed, you can provide the secrets programatically.

```java
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.util.Map;
import java.util.function.Function;

import com.paloaltonetworks.cortex.hub.HubCredentialProviderSimple;
import com.paloaltonetworks.cortex.hub.HubException;
import com.paloaltonetworks.cortex.data_lake.QueryServiceClient;

public class Example {
    final static String SQL_CMD = "SELECT * from `<tenant_id>.firewall.traffic` LIMIT 20";
    final static String clientId = "<client_id>";
    final static String clientSecret = "<client_secret>";
    final static String refreshToken = "<refresh_token>";

    public static void main(String[] args)
            throws InterruptedException, HubException, KeyManagementException, NoSuchAlgorithmException {
        Function<Boolean, Map.Entry<String, String>> cred = HubCredentialProviderSimple.factory(clientId, clientSecret,
                refreshToken, null);
        var qsc = new QueryServiceClient(cred);
        for (var page : qsc.iterable(SQL_CMD))
            System.out.println(page.toString());
    }
}
```

### `DevTokenCredentials`

Leverages a Token Redemption service (i.e. API Explorer)

Best practise is to provide the developer token using an environmental variable:

```bash
PAN_DEVELOPER_TOKEN=<developer_token> \
PAN_DEVELOPER_TOKEN_PROVIDER=<developer_token_provider_url> \
PAN_ENTRYPOINT=<cortex_region_fqdn> \
java Example.java
```

```java
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.util.Map;
import java.util.function.Function;
import com.paloaltonetworks.cortex.hub.HubCredentialsDevToken;
import com.paloaltonetworks.cortex.hub.HubException;
import com.paloaltonetworks.cortex.data_lake.QueryServiceClient;

public class Example {
    final static String SQL_CMD = "SELECT * from `<instance_id>.firewall.traffic` LIMIT 20";

    public static void main(String[] args) throws HubException, KeyManagementException, NoSuchAlgorithmException {
        Function<Boolean, Map.Entry<String, String>> cred = HubCredentialsDevToken.factory();
        var qsc = new QueryServiceClient(cred);
        for (var page : qsc.iterable(SQL_CMD))
            System.out.println(page.toString());
    }
}
```

You can pass the developer token programatically if needed

```java
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.util.Map;
import java.util.function.Function;

import com.paloaltonetworks.cortex.hub.Constants;
import com.paloaltonetworks.cortex.hub.HubCredentialsDevToken;
import com.paloaltonetworks.cortex.hub.HubException;
import com.paloaltonetworks.cortex.data_lake.QueryServiceClient;

public class Example {
    final static String DEVELOPER_TOKEN = "eyJ0....YBBw";
    final static String DEVELOPER_TOKEN_PROVIDER = "https://app.apiexplorer.rocks/request_token";
    final static String SQL_CMD = "SELECT * from `<instance_id>.firewall.traffic` LIMIT 20";

    public static void main(String[] args) throws HubException, KeyManagementException, NoSuchAlgorithmException {
        Function<Boolean, Map.Entry<String, String>> cred = new HubCredentialsDevToken(Constants.USFQDN,
                DEVELOPER_TOKEN, DEVELOPER_TOKEN_PROVIDER, null, null);
        var qsc = new QueryServiceClient(cred);
        for (var page : qsc.iterable(SQL_CMD))
            System.out.println(page.toString());
    }
}
```

## Credential Providers

If your application grows to the point it needs to interface with multiple data
lake instances then you'll face the need to store multiple `refresh_token`'s.

This is the moment when you can leverage the `HubCredentialProvider` abstract
class. This class provides methods to cover the full life-cycle of a OAuth2
secret:

- `addWithRefreshToken()`: To register a new data lake instance
- `addWithCode()`: To register a new data lake instance using the OAuth2 code
  (from the code grant flow)
- `revokeDatalake()`: To revoke already issued refresh token
- `getCredentialsObject(datalakeId)`: Retrieves a `Credentials` object bound to
  the data lake identifier.

`HubCredentialProvider` is meant to be subclassed. Developer doing so must
implement the following storage methods that will be triggered when needed.

- `upsertStoreItem(dlid, item)`: to store `item` as the valuer for data lake
  instance `dlid`
- `deleteStoreItem(dlid)`: remove the item for the data lake instance `dlid`
- `getStoreItem(dlid)`: retrieve the item for the data lake instance `dlid`
- `loadDb()`: perform initial database load

Subclass must call `super(opts)` with an object with configuration options. The
only two mandatory options are:

- `clientId`: OAuth2 application client_id value
- `clientSecret`: OAuth2 application client_secret value

### `FsCredProvider`

The library provides a `HubCredentialProvider` implementation that stores the
secrets in a local file using AES encryption of sensitive values. You can leverage this class for initial prototyping.

Secrets must me provided as environmental variables:

```bash
PAN_CLIENT_ID=<OAuth2 client_id> \
PAN_CLIENT_SECRET=<OAuth2 client_secret> \
PAN_SECRET=<AES Encryption key> \
java Example.java
```

```java
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;

import com.paloaltonetworks.cortex.hub.HubCredentialProvider;
import com.paloaltonetworks.cortex.hub.HubCredentialProviderFS;
import com.paloaltonetworks.cortex.hub.HubCredentialsMetadata;
import com.paloaltonetworks.cortex.hub.HubException;

public class Example {
    public static void main(String[] args)
            throws InterruptedException, HubException, KeyManagementException, NoSuchAlgorithmException {
        HubCredentialProvider<HubCredentialsMetadata> credProv = HubCredentialProviderFS.factory();
    }
}
```

Now you can register a `refresh_token` you've received (i.e. at the end of a
OAuth2 code grant flow)

```java
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.util.Map;
import java.util.function.Function;

import com.paloaltonetworks.cortex.hub.HubCredentialProvider;
import com.paloaltonetworks.cortex.hub.HubCredentialProviderFS;
import com.paloaltonetworks.cortex.hub.HubCredentialsMetadata;
import com.paloaltonetworks.cortex.hub.HubException;
import com.paloaltonetworks.cortex.data_lake.QueryServiceClient;

public class Example {
    final static String SQL_CMD = "SELECT * from `<tenant_id>.firewall.traffic` LIMIT 20";
    final static String REFRESH_TOKEN = "<refresh_token>";

    public static void main(String[] args)
            throws InterruptedException, HubException, KeyManagementException, NoSuchAlgorithmException {
        HubCredentialProvider<HubCredentialsMetadata> credProv = HubCredentialProviderFS.factory();
        Function<Boolean, Map.Entry<String, String>> cred = credProv.addWithRefreshToken("datalake-id",
                Constants.USFQDN, REFRESH_TOKEN, null, null, null);

        var qsc = new QueryServiceClient(cred);
        for (var page : qsc.iterable(SQL_CMD))
            System.out.println(page.toString());
    }
}
```

Or, if you want, you can use the CredentialProvider object to complete the
OAuth2 code grant flow for you.

```java
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.util.Map;
import java.util.function.Function;

import com.paloaltonetworks.cortex.hub.HubCredentialProvider;
import com.paloaltonetworks.cortex.hub.HubCredentialProviderFS;
import com.paloaltonetworks.cortex.hub.HubCredentialsMetadata;
import com.paloaltonetworks.cortex.hub.HubException;
import com.paloaltonetworks.cortex.data_lake.QueryServiceClient;

public class Example {
    final static String SQL_CMD = "SELECT * from `<tenant_id>.firewall.traffic` LIMIT 20";
    final static String CODE = "<OAuth2_code>";
    final static String CALLBACK_URL = "https://<my_fqdn>/auth_callback";

    public static void main(String[] args)
            throws InterruptedException, HubException, KeyManagementException, NoSuchAlgorithmException {
        HubCredentialProvider<HubCredentialsMetadata> credProv = HubCredentialProviderFS.factory();
        Function<Boolean, Map.Entry<String, String>> cred = credProv.addWithCode("datalake-id",
                Constants.USFQDN, CODE, CALLBACK_URL, null);

        var qsc = new QueryServiceClient(cred);
        for (var page : qsc.iterable(SQL_CMD))
            System.out.println(page.toString());
    }
}
```

In any case you receive at the end of the process a valid `Credentials` object
bound to the provided OAuth2 instance.

Secrets keep stored in a file named `PANCLOUD_CONFIG.json` (you can use another
file name using the option `configFile` in the static `factory()` method).

The static `factory()` methods attempts to locate the database file and, if
found, then its content is loaded as initial data. That means that you retrieve
a credentials object for a data lake instance that was registered in another
work session.

```java
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.util.Map;
import java.util.function.Function;

import com.paloaltonetworks.cortex.hub.HubCredentialProvider;
import com.paloaltonetworks.cortex.hub.HubCredentialProviderFS;
import com.paloaltonetworks.cortex.hub.HubCredentialsMetadata;
import com.paloaltonetworks.cortex.hub.HubException;
import com.paloaltonetworks.cortex.data_lake.QueryServiceClient;

public class Example {
    final static String SQL_CMD = "SELECT * from `<instance_id>.firewall.traffic` LIMIT 20";

    public static void main(String[] args)
            throws InterruptedException, HubException, KeyManagementException, NoSuchAlgorithmException {
        HubCredentialProvider<HubCredentialsMetadata> credProv = HubCredentialProviderFS.factory();
        Function<Boolean, Map.Entry<String, String>> cred = credProv.getCredentialsObject("datalake-id");

        var qsc = new QueryServiceClient(cred);
        for (var page : qsc.iterable(SQL_CMD))
            System.out.println(page.toString());
    }
}
```

## HubHelper

`HubHelper` is a class that provides two main features:

- Hooks to help onboard customers that are consuming applications through the
  Cortex hub:
  - Initial `params` parsing
  - Generation of the IDP Authentication Request URL
  - Completing the OAuth2 code grant flow
- Multi-tenancy: It automates a `HubCredentialProvider` leveraging its
  metadada capability to organize data lakes into tenants.

See code examples in the [`/examples`](https://github.com/PaloAltoNetworks/pan-cortex-hub-java/tree/master/examples) folder

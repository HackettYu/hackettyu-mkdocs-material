---
title: Python http request soap xml
description: [hackettyu'snippets] 
---

> description: [hackettyu'snippets]

```pyhton
import requests
import xmltodict
import xml
import json
import logging

logger = logging.getLogger(__name__)

def request() -> dict:
    domian = "https://example.com/"
    uri = "soap/xml/foo"
    url = f"{domian}{uri}"

    payload = """<soap-env:Envelope xmlns:soap-env="http://schemas.xmlsoap.org/soap/envelope/">
<soap-env:Header>
    </soap-env:Header>
    <soap-env:Body>
  </soap-env:Body>
</soap-env:Envelope>
    """
    headers = {
        "Content-Type": "application/xml;charset=utf-8",
        "Authorization": "Basic {{base64.encode(username:password)}}"
    }
    response = requests.request(
        "POST", url, headers=headers, data=payload.encode("utf-8"))

    response_to_dict = {}

    try:
        response_to_dict = dict(xmltodict.parse(response.text.encode("utf-8")))
        logger.info(json.dumps(response_to_dict, indent=4, sort_keys=True))

        output = response_to_dict.get("soapenv:Envelope")["Body"]
        logger.warning(output)
    except xml.parsers.expat.ExpatError as parser_error:
        logger.error(parser_error.code)

    return response_to_dict
```
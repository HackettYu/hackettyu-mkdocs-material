---
title: Python logging
description: [hackettyu'snippets] 
---

> description: [hackettyu'snippets]

```python
import logging
import logging.handlers
import sys
import os
import time
import datetime

__location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))
logFolder = os.path.join(__location__, 'logs')

if not os.path.exists(logFolder):
    os.makedirs(logFolder)

logFileName = os.path.join(logFolder, datetime.datetime.now().strftime('%Y%m%d%H%M.log'))
log = logging.getLogger(logFileName)
log.setLevel(logging.DEBUG)
fileHandler = logging.handlers.TimedRotatingFileHandler(logFileName, 'D', 1, 30)
fileHandler.suffix = "%Y%m%d%H%M.log"
formatter = logging.Formatter('%(asctime)s - %(module)s.%(funcName)s:%(lineno)d - %(levelname)s - %(message)s')
fileHandler.setFormatter(formatter)
log.addHandler(fileHandler)

handler = logging.StreamHandler(sys.stdout)
handler.setLevel(logging.DEBUG)
handler.setFormatter(formatter)
log.addHandler(handler)

while True:
    log.debug("debug debug")
    log.info("hello")
    log.warning("warn info")
    log.error("error")
    time.sleep(1)
```
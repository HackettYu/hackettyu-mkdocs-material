# [转载] 获取 github 快速 IP

> VIA:https://gist.github.com/lilydjwg/93d33ed04547e1b9f7a86b64ef2ed058

```bash
#!/usr/bin/python3

import asyncio
import time
import socket
import sys

import aiohttp

''' 获取最快的 GitHub IP '''
''' https://gist.github.com/lilydjwg/93d33ed04547e1b9f7a86b64ef2ed058 '''
class MyConnector(aiohttp.TCPConnector):
  def __init__(self, ip):
    self.__ip = ip
    super().__init__()

  async def _resolve_host(
    self, host: str, port: int,
    traces: None = None,
  ):
    return [{
      'hostname': host, 'host': self.__ip, 'port': port,
      'family': self._family, 'proto': 0, 'flags': 0,
    }]

async def test_domain(domain, ip, proto):
  if proto == 'http':
    return await test_domain_http(domain, ip)
  elif proto == 'ssh':
    return await test_domain_ssh(domain, ip)
  else:
    raise ValueError('unknown proto', proto)

async def test_domain_ssh(domain, ip):
  st = time.time()
  r, _w = await asyncio.open_connection(ip, 22)
  await r.read(1)
  return time.time() - st

async def test_domain_http(domain, ip):
  url = 'https://github.com/'
  st = time.time()
  async with aiohttp.ClientSession(connector=MyConnector(ip)) as s:
    r = await s.get(url)
    _ = await r.text()

  return time.time() - st

async def producer(q):
  items = await get_items()
  for item in items:
    await q.put(item)

  await q.put(None)

async def printer(q):
  while True:
    try:
      item = await q.get()
    except asyncio.CancelledError:
      break

    if isinstance(item[1], Exception):
      (domain, ip, proto), e = item
      print(f'{domain:21} {ip:15} {proto:4} {e!r}')
    else:
      (domain, ip, proto), t = item
      print(f'{domain:21} {ip:15} {proto:4} {t:6.2f}')

async def worker(q, ret_q):
  while True:
    item = await q.get()
    if item is None:
      await q.put(None)
      break

    try:
      t = await test_domain(*item)
    except Exception as e:
      await ret_q.put((item, e))
    else:
      await ret_q.put((item, t))

async def main():
  q = asyncio.Queue()
  ret_q = asyncio.Queue()

  futures = [worker(q, ret_q) for _ in range(40)]
  producer_fu = asyncio.ensure_future(producer(q))
  printer_fu = asyncio.ensure_future(printer(ret_q))

  await asyncio.wait(futures)
  printer_fu.cancel()
  await producer_fu
  await printer_fu

async def resolve(domain):
  loop = asyncio.get_event_loop()
  addrinfo = await loop.getaddrinfo(
    domain, None,
    family=socket.AF_INET,
    proto=socket.IPPROTO_TCP,
  )
  ips = [x[-1][0] for x in addrinfo]
  return domain, ips

async def get_items():
  domains = [
    "ams-region.github.com",
    "sea-region.github.com",
    "iad-region.github.com",
    "sin-region.github.com",
  ]
  print('Resolving domains...', flush=True, end='')
  futures = [resolve(domain) for domain in domains]
  futures, _ = await asyncio.wait(futures)
  results = [fu.result() for fu in futures]

  items = []
  for domain, ips in results:
    for ip in ips:
      items.append((domain, ip))
  print('done.')

  items += [
    ('(Tokyo)', '52.69.186.44'),
    ('(Sydney)', '52.64.108.95'),
  ]

  if len(sys.argv) == 2:
    proto = sys.argv[1]
    proto = [proto]
  else:
    proto = ['http', 'ssh']
  return [(x[0], x[1], y) for x in items for y in proto]

if __name__ == '__main__':
  import logging
  logging.getLogger().addHandler(logging.NullHandler())

  loop = asyncio.get_event_loop()
  try:
    loop.run_until_complete(main())
  except KeyboardInterrupt:
    pass
```
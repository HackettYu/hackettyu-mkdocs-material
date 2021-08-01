import requests
import re
import sys

OUTPUT = r"urls.txt"
BASE = "https://hackettyu.com"


def fetch():
    sitemap_xml = requests.get(f"{BASE}/sitemap.xml").text
    url = re.findall(r"<loc>(.*)</loc>", sitemap_xml)
    url_line = "\n".join(str(url_one) for url_one in url)
    open(OUTPUT, "w", encoding="utf-8").write(url_line)


def push():
    baidu_token = sys.argv[1]
    urls = open(OUTPUT, "rb").read()
    headers = {"Content-Type": "text/plain"}
    url = f"http://data.zz.baidu.com/urls?site={BASE}&token={baidu_token}"
    return requests.post(url, headers=headers, data=urls, timeout=5).text


if __name__ == "__main__":
    fetch()
    print(push())

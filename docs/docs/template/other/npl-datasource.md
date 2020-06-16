# 数据源

> 最近需要从文本中抽取结构化信息，用到了很多github上的包，遂整理了一下，后续会不断更新。

> 很多包非常有趣，值得收藏，满足大家的收集癖！
如果觉得有用，请分享并star，谢谢！

>> 涉及内容包括：**中英文敏感词、语言检测、中外手机/电话归属地/运营商查询、名字推断性别、手机号抽取、身份证抽取、邮箱抽取、中日文人名库、中文缩写库、拆字词典、词汇情感值、停用词、反动词表、暴恐词表、繁简体转换、英文模拟中文发音、汪峰歌词生成器、职业名称词库、同义词库、反义词库、否定词库、汽车品牌词库、汽车零件词库、连续英文切割、各种中文词向量、公司名字大全、古诗词库、IT词库、财经词库、成语词库、地名词库、历史名人词库、诗词词库、医学词库、饮食词库、法律词库、汽车词库、动物词库、中文聊天语料、中文谣言数据、百度中文问答数据集、句子相似度匹配算法集合、bert资源、文本生成&摘要相关工具、cocoNLP信息抽取工具、国内电话号码正则匹配、清华大学XLORE:中英文跨语言百科知识图谱、清华大学人工智能技术系列报告、自然语言生成、NLU太难了系列、自动对联数据及机器人、用户名黑名单列表、罪名法务名词及分类模型、微信公众号语料、cs224n深度学习自然语言处理课程、中文手写汉字识别、中文自然语言处理 语料/数据集、变量命名神器、分词语料库+代码、任务型对话英文数据集、ASR 语音数据集 + 基于深度学习的中文语音识别系统、笑声检测器、Microsoft多语言数字/单位/如日期时间识别包、中华新华字典数据库及api(包括常用歇后语、成语、词语和汉字)、文档图谱自动生成、SpaCy 中文模型、Common Voice语音识别数据集新版、神经网络关系抽取、基于bert的命名实体识别、关键词(Keyphrase)抽取包pke、基于医疗领域知识图谱的问答系统、基于依存句法与语义角色标注的事件三元组抽取、依存句法分析4万句高质量标注数据、cnocr：用来做中文OCR的Python3包、中文人物关系知识图谱项目、中文nlp竞赛项目及代码汇总、中文字符数据、speech-aligner: 从“人声语音”及其“语言文本”产生音素级别时间对齐标注的工具、AmpliGraph: 知识图谱表示学习(Python)库：知识图谱概念链接预测、Scattertext 文本可视化(python)、语言/知识表示工具：BERT & ERNIE、中文对比英文自然语言处理NLP的区别综述、Synonyms中文近义词工具包**。

**1\. textfilter: 中英文敏感词过滤**  [observerss/textfilter](https://github.com/observerss/textfilter)
```
 >>> f = DFAFilter()
 >>> f.add("sexy")
 >>> f.filter("hello sexy baby")
 hello **** baby
```
敏感词包括政治、脏话等话题词汇。其原理主要是基于词典的查找（项目中的keyword文件），内容很劲爆。。。

**2\. langid：97种语言检测** [https://github.com/saffsd/langid.py](https://github.com/saffsd/langid.py)

> pip install langid

```
>>> import langid
>>> langid.classify("This is a test")
('en', -54.41310358047485)
```

**3\. langdetect：另一个语言检测**[https://code.google.com/archive/p/language-detection/](https://code.google.com/archive/p/language-detection/)

> pip install langdetect

```
from langdetect import detect
from langdetect import detect_langs

s1 = "本篇博客主要介绍两款语言探测工具，用于区分文本到底是什么语言，"
s2 = 'We are pleased to introduce today a new technology'
print(detect(s1))
print(detect(s2))
print(detect_langs(s3))    # detect_langs()输出探测出的所有语言类型及其所占的比例
```

输出结果如下： 注：语言类型主要参考的是ISO 639-1语言编码标准，详见[ISO 639-1百度百科](https://baike.baidu.com/item/ISO%20639-1)

跟上一个语言检测比较，准确率低，效率高。


**4\. phone 中国手机归属地查询：** [ls0f/phone](https://github.com/ls0f/phone)

> 已集成到 python package [cocoNLP](https://github.com/fighting41love/cocoNLP)中，欢迎试用

```
from phone import Phone
p  = Phone()
p.find(18100065143)
#return {'phone': '18100065143', 'province': '上海', 'city': '上海', 'zip_code': '200000', 'area_code': '021', 'phone_type': '电信'}
```
支持号段: 13*,15*,18*,14[5,7],17[0,6,7,8]

记录条数: 360569 (updated:2017年4月)

作者提供了数据[phone.dat](https://github.com/lovedboy/phone/raw/master/phone/phone.dat) 方便非python用户Load数据。

**5\. phone国际手机、电话归属地查询：**[AfterShip/phone](https://github.com/AfterShip/phone)

> npm install phone

```
import phone from 'phone';
phone('+852 6569-8900'); // return ['+85265698900', 'HKG']
phone('(817) 569-8900'); // return ['+18175698900, 'USA']
```
**6\. ngender 根据名字判断性别：**[observerss/ngender](https://github.com/observerss/ngender) 基于朴素贝叶斯计算的概率

> pip install ngender

```
>>> import ngender
>>> ngender.guess('赵本山')
('male', 0.9836229687547046)
>>> ngender.guess('宋丹丹')
('female', 0.9759486128949907)
```
**7\. 抽取email的正则表达式**

> 已集成到 python package [cocoNLP](https://github.com/fighting41love/cocoNLP)中，欢迎试用

```
email_pattern = '^[*#\u4e00-\u9fa5 a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$'
emails = re.findall(email_pattern, text, flags=0)
```
**8\. 抽取phone_number的正则表达式**

> 已集成到 python package [cocoNLP](https://github.com/fighting41love/cocoNLP)中，欢迎试用

```
cellphone_pattern = '^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$'
phoneNumbers = re.findall(cellphone_pattern, text, flags=0)
```
**9\. 抽取身份证号的正则表达式**
```
IDCards_pattern = r'^([1-9]\d{5}[12]\d{3}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])\d{3}[0-9xX])$'
IDs = re.findall(IDCards_pattern, text, flags=0)
```
**10.  人名语料库：** [wainshine/Chinese-Names-Corpus](https://github.com/wainshine/Chinese-Names-Corpus)

> 人名抽取功能 python package [cocoNLP](https://github.com/fighting41love/cocoNLP)，欢迎试用

```
中文（现代、古代）名字、日文名字、中文的姓和名、称呼（大姨妈、小姨妈等）、英文->中文名字（李约翰）、成语词典
```
（可用于中文分词、姓名识别）

**11\. 中文缩写库：**[github](https://github.com/zhangyics/Chinese-abbreviation-dataset/blob/master/dev_set.txt)
```
全国人大: 全国/n 人民/n 代表大会/n
中国: 中华人民共和国/ns
女网赛: 女子/n 网球/n 比赛/vn
```
**12\. 汉语拆字词典：**[kfcd/chaizi](https://github.com/kfcd/chaizi)
```
漢字	拆法 (一)	拆法 (二)	拆法 (三)
拆	手 斥	扌 斥	才 斥
```
**13\. 词汇情感值：**[rainarch/SentiBridge](https://github.com/rainarch/SentiBridge/blob/master/Entity_Emotion_Express/CCF_data/pair_mine_result)
```
山泉水	充沛	0.400704566541	0.370067395878
视野	        宽广	0.305762728932	0.325320747491
大峡谷	惊险	0.312137906517	0.378594957281
```
**14\. 中文词库、停用词、敏感词** [dongxiexidian/Chinese](https://github.com/fighting41love/Chinese_from_dongxiexidian)

此package的敏感词库分类更细：

[反动词库](https://github.com/fighting41love/funNLP/tree/master/data/敏感词库)， [敏感词库表统计](https://github.com/fighting41love/funNLP/tree/master/data/敏感词库)， [暴恐词库](https://github.com/fighting41love/funNLP/tree/master/data/敏感词库)， [民生词库](https://github.com/fighting41love/funNLP/tree/master/data/敏感词库)， [色情词库](https://github.com/fighting41love/funNLP/tree/master/data/敏感词库)

**15\. 汉字转拼音：**[mozillazg/python-pinyin](https://github.com/mozillazg/python-pinyin)

文本纠错会用到

**16\. 中文繁简体互转：**[skydark/nstools](https://github.com/skydark/nstools/tree/master/zhtools)

**17\. 英文模拟中文发音引擎** funny chinese text to speech enginee：[tinyfool/ChineseWithEnglish](https://github.com/tinyfool/ChineseWithEnglish)
```
say wo i ni
#说：我爱你
```
相当于用英文音标，模拟中文发音。

**18\. 汪峰歌词生成器：**[phunterlau/wangfeng-rnn](https://github.com/phunterlau/wangfeng-rnn)
```
我在这里中的夜里
就像一场是一种生命的意旪
就像我的生活变得在我一样
可我们这是一个知道
我只是一天你会怎吗
```
**19\. 同义词库、反义词库、否定词库：**[guotong1988/chinese_dictionary](https://github.com/guotong1988/chinese_dictionary)

**20\. 无空格英文串分割、抽取单词：**[wordinja](https://github.com/keredson/wordninja)
```
>>> import wordninja
>>> wordninja.split('derekanderson')
['derek', 'anderson']
>>> wordninja.split('imateapot')
['im', 'a', 'teapot']
```
**21\. IP地址正则表达式：**
```
(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)
```
**22\. 腾讯QQ号正则表达式：**
```
[1-9]([0-9]{5,11})
```
**23\. 国内固话号码正则表达式：**
```
[0-9-()（）]{7,18}
```
**24\. 用户名正则表达式：**
```
[A-Za-z0-9_\-\u4e00-\u9fa5]+
```
**25\. 汽车品牌、汽车零件相关词汇：**
```
见本repo的data文件 [data](https://github.com/fighting41love/funNLP/tree/master/data)
```
**26\. 时间抽取：**

> 已集成到 python package [cocoNLP](https://github.com/fighting41love/cocoNLP)中，欢迎试用

```
在2016年6月7日9:44执行測試，结果如下

Hi，all。下周一下午三点开会

>> 2016-06-13 15:00:00-false

周一开会

>> 2016-06-13 00:00:00-true

下下周一开会

>> 2016-06-20 00:00:00-true
```
[java version]( https://github.com/shinyke/Time-NLP)

[python version](https://github.com/zhanzecheng/Time_NLP)

**27\. 各种中文词向量：** [github repo](https://github.com/Embedding/Chinese-Word-Vectors)

中文词向量大全

**28\. 公司名字大全：** [github repo](https://github.com/wainshine/Company-Names-Corpus)

**29\. 古诗词库：** [github repo](https://github.com/panhaiqi/AncientPoetry) [更全的古诗词库](https://github.com/chinese-poetry/chinese-poetry)

**30\. THU整理的词库：** [link](http://thuocl.thunlp.org/)

已整理到本repo的data文件夹中.
```
IT词库、财经词库、成语词库、地名词库、历史名人词库、诗词词库、医学词库、饮食词库、法律词库、汽车词库、动物词库
```
**31\. 中文聊天语料** [link](https://github.com/codemayq/chaotbot_corpus_Chinese)
```
该库搜集了包含:豆瓣多轮, PTT八卦语料, 青云语料, 电视剧对白语料, 贴吧论坛回帖语料,微博语料,小黄鸡语料
```
**32\. 中文谣言数据:** [github](https://github.com/thunlp/Chinese_Rumor_Dataset)
```
该数据文件中，每一行为一条json格式的谣言数据，字段释义如下：

rumorCode: 该条谣言的唯一编码，可以通过该编码直接访问该谣言举报页面。
title: 该条谣言被举报的标题内容
informerName: 举报者微博名称
informerUrl: 举报者微博链接
rumormongerName: 发布谣言者的微博名称
rumormongerUr: 发布谣言者的微博链接
rumorText: 谣言内容
visitTimes: 该谣言被访问次数
result: 该谣言审查结果
publishTime: 该谣言被举报时间
```


**33\. 情感波动分析：**[github](https://github.com/CasterWx/python-girlfriend-mood/)

词库已整理到本repo的data文件夹中.
```
本repo项目是一个通过与人对话获得其情感值波动图谱, 内用词库在data文件夹中.
```

**34\. 百度中文问答数据集**：[链接](https://pan.baidu.com/s/1QUsKcFWZ7Tg1dk_AbldZ1A) 提取码: 2dva

**35\. 句子、QA相似度匹配:MatchZoo**  [github](https://github.com/NTMC-Community/MatchZoo)

文本相似度匹配算法的集合，包含多个深度学习的方法，值得尝试。

**36\. bert资源：**

- bert论文中文翻译: [link](https://github.com/yuanxiaosc/BERT_Paper_Chinese_Translation)

+ bert原作者的slides: [link](https://pan.baidu.com/s/1OSPsIu2oh1iJ-bcXoDZpJQ)
   提取码: iarj 

+ 文本分类实践: [github](https://github.com/NLPScott/bert-Chinese-classification-task)

+ bert tutorial文本分类教程: [github](https://github.com/Socialbird-AILab/BERT-Classification-Tutorial)

+ bert pytorch实现:  [github](https://github.com/huggingface/pytorch-pretrained-BERT)

+ bert用于中文命名实体识别 tensorflow版本: [github](https://github.com/macanv/BERT-BiLSTM-CRF-NER)
+ BERT生成句向量，BERT做文本分类、文本相似度计算[github](https://github.com/terrifyzhao/bert-utils)

+ bert 基于 keras 的封装分类标注框架 Kashgari，几分钟即可搭建一个分类或者序列标注模型: [github](https://github.com/BrikerMan/Kashgari)

+ bert、ELMO的图解： [github](https://jalammar.github.io/illustrated-bert/)

+ BERT: Pre-trained models and downstream applications: [github](https://github.com/asyml/texar/tree/master/examples/bert)

**37. Texar - Toolkit for Text Generation and Beyond**: [github](https://github.com/asyml/texar)

基于Tensorflow的开源工具包，旨在支持广泛的机器学习，特别是文本生成任务，如机器翻译、对话、摘要、内容处置、语言建模等

**38. 中文事件抽取：** [github](https://github.com/liuhuanyong/ComplexEventExtraction)

中文复合事件抽取，包括条件事件、因果事件、顺承事件、反转事件等事件抽取，并形成事理图谱。

**39\. cocoNLP:** [github](https://github.com/fighting41love/cocoNLP)

人名、地址、邮箱、手机号、手机归属地 等信息的抽取，rake短语抽取算法。
> pip install cocoNLP

```
>>> from cocoNLP.extractor import extractor

>>> ex = extractor()

>>> text = '急寻特朗普，男孩，于2018年11月27号11时在陕西省安康市汉滨区走失。丢失发型短发，...如有线索，请迅速与警方联系：18100065143，132-6156-2938，baizhantang@sina.com.cn 和yangyangfuture at gmail dot com'

# 抽取邮箱
>>> emails = ex.extract_email(text)
>>> print(emails)

['baizhantang@sina.com.cn', 'yangyangfuture@gmail.com.cn']
# 抽取手机号
>>> cellphones = ex.extract_cellphone(text,nation='CHN')
>>> print(cellphones)

['18100065143', '13261562938']
# 抽取手机归属地、运营商
>>> cell_locs = [ex.extract_cellphone_location(cell,'CHN') for cell in cellphones]
>>> print(cell_locs)

cellphone_location [{'phone': '18100065143', 'province': '上海', 'city': '上海', 'zip_code': '200000', 'area_code': '021', 'phone_type': '电信'}]
# 抽取地址信息
>>> locations = ex.extract_locations(text)
>>> print(locations)
['陕西省安康市汉滨区', '安康市汉滨区', '汉滨区']
# 抽取时间点
>>> times = ex.extract_time(text)
>>> print(times)
time {"type": "timestamp", "timestamp": "2018-11-27 11:00:00"}
# 抽取人名
>>> name = ex.extract_name(text)
>>> print(name)
特朗普

```

**40\. 国内电话号码正则匹配（三大运营商+虚拟等）:** [github](https://github.com/VincentSit/ChinaMobilePhoneNumberRegex)

**41\. 清华大学XLORE:中英文跨语言百科知识图谱:** [link](https://xlore.org/download.html)  
上述链接中包含了所有实体及关系的TTL文件，更多数据将在近期发布。
概念，实例，属性和上下位关系数目

|  | 百度  |中文维基   | 英文维基  |  总数  |
|--|---|---|---|---|
|概念数量 |32,009	|	150,241|	326,518|	508,768  |
|实例数量|	1,629,591	|640,622|	1,235,178|	3,505,391  |
|属性数量|	157,370	|45,190	|26,723	|229.283  |
|InstanceOf|	7,584,931|	1,449,925|	3,032,515	|12,067,371 |
|SubClassOf|	2,784	|191,577|	555,538	|749,899  |

跨语言连接（概念/实例）

|  |  百度 | 中文维基  |  英文维基 |
|--|---|---|--|
|百度|	-|	10,216/336,890|	4,846/303,108 |
|中文维基|	10,216/336,890|	-	|28,921/454,579  |
|英文维基|	4,846/303,108	|28,921/454,579|	-  |

**42\. 清华大学人工智能技术系列报告：** [link](https://reports.aminer.cn)  
每年会出AI领域相关的报告，内容包含
  - 自然语言处理 [link](https://static.aminer.cn/misc/article/nlp.pdf)
  - 知识图谱 [link](https://www.aminer.cn/research_report/5c3d5a8709%20e961951592a49d?download=true&pathname=knowledgegraph.pdf)
  - 数据挖掘 [link](https://www.aminer.cn/research_report/5c3d5a5cecb160952fa10b76?download=true&pathname=datamining.pdf)
  - 自动驾驶 [link](https://static.aminer.cn/misc/article/selfdriving.pdf)
  - 机器翻译 [link](https://static.aminer.cn/misc/article/translation.pdf)
  - 区块链 [link](https://static.aminer.cn/misc/article/blockchain_public.pdf)
  - 机器人 [link](https://static.aminer.cn/misc/article/robotics_beta.pdf)
  - 计算机图形学 [link](https://static.aminer.cn/misc/article/cg.pdf)
  - 3D打印 [link](https://static.aminer.cn/misc/article/3d.pdf)
  - 人脸识别 [link](https://static.aminer.cn/misc/article/facerecognition.pdf)
  - 人工智能芯片 [link](https://static.aminer.cn/misc/article/aichip.pdf)
  - 等等

**43\.自然语言生成方面:**  
[Ehud Reiter教授的博客](https://ehudreiter.com)  北大万小军教授强力推荐，该博客对NLG技术、评价与应用进行了深入的探讨与反思。  
[文本生成相关资源大列表](https://github.com/ChenChengKuan/awesome-text-generation)  
[自然语言生成：让机器掌握自动创作的本领 - 开放域对话生成及在微软小冰中的实践](https://drive.google.com/file/d/1Mdna3q986k6OoJNsfAHznTtnMAEVzv5z/view)  
[文本生成控制](https://github.com/harvardnlp/Talk-Latent/blob/master/main.pdf)  

**44\.:**
[jieba](https://github.com/fxsjy/jieba)和[hanlp](https://github.com/hankcs/pyhanlp)就不必介绍了吧。

**45\.NLP太难了系列:** [github](https://github.com/fighting41love/hardNLP)

- 来到杨过曾经生活过的地方，小龙女动情地说：“我也想过过过儿过过的生活。” ​​​  
- 来到儿子等校车的地方，邓超对孙俪说：“我也想等等等等等过的那辆车。”  
- 赵敏说：我也想控忌忌己不想无忌。
- 你也想犯范范范玮琪犯过的错吗  
- 对叙打击是一次性行为？


**46\.自动对联数据及机器人:**  
[70万对联数据 link](https://github.com/wb14123/couplet-dataset)  
[代码 link](https://github.com/wb14123/seq2seq-couplet)  

上联  |下联  
--|--
殷勤怕负三春意  | 潇洒难书一字愁
如此清秋何吝酒  | 这般明月不须钱

**47\.用户名黑名单列表：** [github](https://github.com/marteinn/The-Big-Username-Blacklist)
包含了用户名禁用列表，比如: [link](https://github.com/marteinn/The-Big-Username-Blacklist/blob/master/list_raw.txt)
```
administrator
administration
autoconfig
autodiscover
broadcasthost
domain
editor
guest
host
hostmaster
info
keybase.txt
localdomain
localhost
master
mail
mail0
mail1
```

**48\.罪名法务名词及分类模型:**   [github](https://github.com/liuhuanyong/CrimeKgAssitant)  
```
包含856项罪名知识图谱, 基于280万罪名训练库的罪名预测,基于20W法务问答对的13类问题分类与法律资讯问答功能
```
**49\.微信公众号语料:** [github](https://github.com/nonamestreet/weixin_public_corpus)

3G语料，包含部分网络抓取的微信公众号的文章，已经去除HTML，只包含了纯文本。每行一篇，是JSON格式，name是微信公众号名字，account是微信公众号ID，title是题目，content是正文

**50\.cs224n深度学习自然语言处理课程：**[link](http://web.stanford.edu/class/cs224n/)  
  - 课程中模型的pytorch实现 [link](https://github.com/DSKSD/DeepNLP-models-Pytorch)
  - 面向深度学习研究人员的自然语言处理实例教程 [link](https://github.com/graykode/nlp-tutorial)


**51\.中文手写汉字识别：**[github](https://github.com/chizhanyuefeng/Chinese_OCR_CNN-RNN-CTC)

**52\.中文自然语言处理 语料/数据集：**[github](https://github.com/SophonPlus/ChineseNlpCorpus)
[竞品：THUOCL（THU Open Chinese Lexicon）中文词库](https://github.com/thunlp/THUOCL)

**53\.变量命名神器：**[github](https://github.com/unbug/codelf) [link](https://unbug.github.io/codelf/)

**54\.分词语料库+代码：**[百度网盘链接](https://pan.baidu.com/s/1MXZONaLgeaw0_TxZZDAIYQ)   
 - 提取码: pea6 
 - [keras实现的基于Bi-LSTM + CRF的中文分词+词性标注](https://github.com/GlassyWing/bi-lstm-crf)
 - [基于Universal Transformer + CRF 的中文分词和词性标注](https://github.com/GlassyWing/transformer-word-segmenter)
 - [快速神经网络分词包 java version](https://github.com/yaoguangluo/NeroParser)

**55\. NLP新书推荐《Natural Language Processing》by Jacob Eisenstein：** [link](https://github.com/jacobeisenstein/gt-nlp-class/blob/master/notes/eisenstein-nlp-notes.pdf)

**56\. 任务型对话英文数据集：**   [github](https://github.com/AtmaHou/Task-Oriented-Dialogue-Dataset-Survey)  
【最全任务型对话数据集】主要介绍了一份任务型对话数据集大全，这份数据集大全涵盖了到目前在任务型对话领域的所有常用数据集的主要信息。此外，为了帮助研究者更好的把握领域进展的脉络，我们以Leaderboard的形式给出了几个数据集上的State-of-the-art实验结果。

**57\. ASR 语音数据集 + 基于深度学习的中文语音识别系统：**  [github](https://github.com/nl8590687/ASRT_SpeechRecognition)
+ Data Sets 数据集
  * **清华大学THCHS30中文语音数据集**

    data_thchs30.tgz 
  [OpenSLR国内镜像](<http://cn-mirror.openslr.org/resources/18/data_thchs30.tgz>)
  [OpenSLR国外镜像](<http://www.openslr.org/resources/18/data_thchs30.tgz>)

    test-noise.tgz 
  [OpenSLR国内镜像](<http://cn-mirror.openslr.org/resources/18/test-noise.tgz>)
  [OpenSLR国外镜像](<http://www.openslr.org/resources/18/test-noise.tgz>)

    resource.tgz 
  [OpenSLR国内镜像](<http://cn-mirror.openslr.org/resources/18/resource.tgz>)
  [OpenSLR国外镜像](<http://www.openslr.org/resources/18/resource.tgz>)

  * **Free ST Chinese Mandarin Corpus** 

    ST-CMDS-20170001_1-OS.tar.gz 
  [OpenSLR国内镜像](<http://cn-mirror.openslr.org/resources/38/ST-CMDS-20170001_1-OS.tar.gz>)
  [OpenSLR国外镜像](<http://www.openslr.org/resources/38/ST-CMDS-20170001_1-OS.tar.gz>)

  * **AIShell-1 开源版数据集** 

    data_aishell.tgz
  [OpenSLR国内镜像](<http://cn-mirror.openslr.org/resources/33/data_aishell.tgz>)
  [OpenSLR国外镜像](<http://www.openslr.org/resources/33/data_aishell.tgz>)

  注：数据集解压方法

  ```
  $ tar xzf data_aishell.tgz
  $ cd data_aishell/wav
  $ for tar in *.tar.gz;  do tar xvf $tar; done
  ```

  * **Primewords Chinese Corpus Set 1** 

    primewords_md_2018_set1.tar.gz
  [OpenSLR国内镜像](<http://cn-mirror.openslr.org/resources/47/primewords_md_2018_set1.tar.gz>)
  [OpenSLR国外镜像](<http://www.openslr.org/resources/47/primewords_md_2018_set1.tar.gz>)


**58\. 笑声检测器：**  [github](https://github.com/ideo/LaughDetection)

**59\. Microsoft多语言数字/单位/如日期时间识别包：** [github](https://github.com/Microsoft/Recognizers-Text

**60\. chinese-xinhua 中华新华字典数据库及api，包括常用歇后语、成语、词语和汉字** [github](https://github.com/pwxcoo/chinese-xinhua)

**61\. 文档图谱自动生成** [github](https://github.com/liuhuanyong/TextGrapher)  
 - TextGrapher - Text Content Grapher based on keyinfo extraction by NLP method。输入一篇文档，将文档进行关键信息提取，进行结构化，并最终组织成图谱组织形式，形成对文章语义信息的图谱化展示

**62\. SpaCy 中文模型** [github](https://github.com/howl-anderson/Chinese_models_for_SpaCy)  
 - 包含Parser, NER, 语法树等功能。有一些英文package使用spacy的英文模型的，如果要适配中文，可能需要使用spacy中文模型。

**63\. Common Voice语音识别数据集新版**  [link](https://voice.mozilla.org/en/datasets)  
 - 包括来自42,000名贡献者超过1,400小时的语音样本，涵github

**64\. 神经网络关系抽取 pytorch**  [github](https://github.com/ShulinCao/OpenNRE-PyTorch)  
 - 暂不支持中文

**65\. 基于bert的命名实体识别 pytorch**  [github](https://github.com/Kyubyong/bert_ner)  
 - 暂不支持中文

**66\. 关键词(Keyphrase)抽取包 pke**  [github](https://github.com/boudinfl/pke)  
[pke: an open source python-based keyphrase extraction toolkit](http://aclweb.org/anthology/C16-2015)  
 - 暂不支持中文，我于近期对其进行修改，使其适配中文。
请关注我的github动态，谢谢！  

**67\. 基于医疗领域知识图谱的问答系统**  [github](https://github.com/zhihao-chen/QASystemOnMedicalGraph)  
  - 该repo参考了[github](https://github.com/liuhuanyong/QASystemOnMedicalKG)


**68\. 基于依存句法与语义角色标注的事件三元组抽取**  [github](https://github.com/liuhuanyong/EventTriplesExtraction) 

**69\. 依存句法分析4万句高质量标注数据** by 苏州大学汉语依存树库（SUCDT）
[Homepage](http://hlt.suda.edu.cn/index.php/Nlpcc-2019-shared-task)
数据下载详见homepage底部，需要签署协议，需要邮件接收解压密码。

**70\. cnocr：用来做中文OCR的Python3包，自带了训练好的识别模型** [github](https://github.com/breezedeus/cnocr)

**71\. 中文人物关系知识图谱项目** [github](https://github.com/liuhuanyong/PersonRelationKnowledgeGraph)
- 中文人物关系图谱构建
- 基于知识库的数据回标
- 基于远程监督与bootstrapping方法的人物关系抽取
- 基于知识图谱的知识问答等应用

**72\. 中文nlp竞赛项目及代码汇总** [github](https://github.com/geekinglcq/CDCS)
- 文本生成、文本摘要：Byte Cup 2018 国际机器学习竞赛
- 知识图谱：瑞金医院MMC人工智能辅助构建知识图谱大赛
- 视频识别 问答：2018之江杯全球人工智能大赛 ：视频识别&问答

**73\. 中文字符数据** [github](https://github.com/skishore/makemeahanzi)
- 简/繁体汉字笔顺
- 矢量笔画

**74\. speech-aligner: 从“人声语音”及其“语言文本”，产生音素级别时间对齐标注的工具** [github](https://github.com/open-speech/speech-aligner)

**75\. AmpliGraph: 知识图谱表示学习(Python)库：知识图谱概念链接预测** [github](https://github.com/Accenture/AmpliGraph) 
- 埃森哲出品，目前尚不支持中文


**76\. Scattertext 文本可视化(python)** [github](https://github.com/JasonKessler/scattertext)
- 很好用的工具包，简单修改后可支持中文
- 能否分析出某个类别的文本与其他文本的用词差异

**77\. 语言/知识表示工具：BERT & ERNIE** [github](https://github.com/PaddlePaddle/LARK)
- 百度出品，ERNIE也号称在多项nlp任务中击败了bert

**78\. 中文对比英文自然语言处理NLP的区别综述** [link](https://mp.weixin.qq.com/s/LQU_HJ4q74lL5oCIk7w5RA)

**79\. Synonyms中文近义词工具包** [github](https://github.com/huyingxi/Synonyms)
- Synonyms 中文近义词工具包，可以用于自然语言理解的很多任务：文本对齐，推荐算法，相似度计算，语义偏移，关键字提取，概念提取，自动摘要，搜索引擎等





基于医疗领域知识图谱的问答系统、基于依存句法与语义角色标注的事件三元组抽取、依存句法分析4万句高质量标注数据、cnocr：用来做中文OCR的Python3包，自带了训练好的识别模型、中文人物关系知识图谱项目、中文nlp竞赛项目及代码汇总、中文字符数据、speech-aligner: 从“人声语音”及其“语言文本”，产生音素级别时间对齐标注的工具、AmpliGraph: 知识图谱表示学习(Python)库：知识图谱概念链接预测、Scattertext 文本可视化(python)、语言/知识表示工具：BERT & ERNIE、中文对比英文自然语言处理NLP的区别综述、Synonyms中文近义词工具包
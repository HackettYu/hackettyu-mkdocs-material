## pandocOB
> https://pandoc.org/demos.html#try-pandoc-online
OB
### Converting a web page to markdown
- pandoc -s -r html http://www.gnu.org/software/make/ -o example12.text

### From markdown to PDF
- pandoc MANUAL.txt --pdf-engine=xelatex -o example13.pdf

### HTML slide shows
- pandoc -s --mathml -i -t dzslides SLIDES -o example16a.html
- pandoc -s --webtex -i -t slidy SLIDES -o example16b.html
- OB[M 54pandoc -s --mathjax -i -t revealjs SLIDES -o example16d.html

### Syntax highlighting of delimited code blocks
- pandoc code.text -s --highlight-style pygments -o example18a.html
- pandoc code.text -s --highlight-style kate -o example18b.html
- pandoc code.text -s --highlight-style monochrome -o example18c.html
- pandoc code.text -s --highlight-style espresso -o example18d.html
- pandoc code.text -s --highlight-style haddock -o example18e.html
- pandoc code.text -s --highlight-style tango -o example18f.html
- OApandoc code.text -s --highlight-style zenburn -o example18g.html

### Docx to markdown, including math:
- pandoc -s example30.docx -t markdown -o example35.md

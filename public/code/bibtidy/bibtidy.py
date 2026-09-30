#!/usr/bin/env python3
"""bibtidy: 整理 BibTeX 文件——去重、按年份和 key 排序、统一格式。

用法:
    python3 bibtidy.py refs.bib            # 整理后输出到屏幕
    python3 bibtidy.py refs.bib -o out.bib  # 写到新文件
    python3 bibtidy.py a.bib b.bib -o all.bib  # 合并多个文件

只用 Python 标准库，不需要安装任何东西。
"""
import argparse
import re
import sys

FIELD_ORDER = ["author", "title", "booktitle", "journal", "year", "volume",
               "number", "pages", "publisher", "doi", "url"]


def parse(text):
    """把 BibTeX 文本拆成 (类型, key, {字段: 值}) 的列表。"""
    entries = []
    for m in re.finditer(r"@(\w+)\s*\{\s*([^,\s]+)\s*,", text):
        kind, key = m.group(1).lower(), m.group(2)
        if kind in ("comment", "preamble", "string"):
            continue
        # 从这里开始数括号，找到这一条的结尾
        depth, i = 1, m.end()
        while i < len(text) and depth:
            depth += {"{": 1, "}": -1}.get(text[i], 0)
            i += 1
        body = text[m.end():i - 1]
        fields = {}
        for f in re.finditer(r"(\w+)\s*=\s*", body):
            name, j = f.group(1).lower(), f.end()
            if j < len(body) and body[j] == "{":
                depth, k = 1, j + 1
                while k < len(body) and depth:
                    depth += {"{": 1, "}": -1}.get(body[k], 0)
                    k += 1
                value = body[j + 1:k - 1]
            elif j < len(body) and body[j] == '"':
                k = body.index('"', j + 1) + 1
                value = body[j + 1:k - 1]
            else:
                value = re.match(r"[^,\n]*", body[j:]).group(0)
            fields.setdefault(name, " ".join(value.split()))
        entries.append((kind, key, fields))
    return entries


def fingerprint(fields):
    """用标题判断是不是同一篇：忽略大小写、标点和空格。"""
    return re.sub(r"[^a-z0-9]", "", fields.get("title", "").lower())


def dedupe(entries):
    seen, out, dropped = {}, [], 0
    for kind, key, fields in entries:
        fp = fingerprint(fields) or key
        if fp in seen:
            # 保留字段更全的那一条
            idx = seen[fp]
            if len(fields) > len(out[idx][2]):
                out[idx] = (kind, key, fields)
            dropped += 1
            continue
        seen[fp] = len(out)
        out.append((kind, key, fields))
    return out, dropped


def render(kind, key, fields):
    names = sorted(fields, key=lambda n: (FIELD_ORDER.index(n) if n in FIELD_ORDER else 99, n))
    width = max((len(n) for n in names), default=0)
    lines = [f"  {n.ljust(width)} = {{{fields[n]}}}" for n in names]
    return f"@{kind}{{{key},\n" + ",\n".join(lines) + "\n}\n"


def main():
    ap = argparse.ArgumentParser(description="整理 BibTeX：去重、排序、统一格式")
    ap.add_argument("files", nargs="+", help="一个或多个 .bib 文件")
    ap.add_argument("-o", "--output", help="输出文件（默认打印到屏幕）")
    args = ap.parse_args()

    entries = []
    for path in args.files:
        with open(path, encoding="utf-8") as fh:
            entries += parse(fh.read())

    entries, dropped = dedupe(entries)
    entries.sort(key=lambda e: (-int(re.sub(r"\D", "", e[2].get("year", "0")) or 0), e[1].lower()))
    result = "\n".join(render(*e) for e in entries)

    if args.output:
        with open(args.output, "w", encoding="utf-8") as fh:
            fh.write(result)
    else:
        sys.stdout.write(result)
    print(f"✓ {len(entries)} 条，去掉了 {dropped} 条重复", file=sys.stderr)


if __name__ == "__main__":
    main()

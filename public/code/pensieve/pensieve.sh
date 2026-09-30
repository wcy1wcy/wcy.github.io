#!/usr/bin/env bash
# pensieve：把想法从脑子里抽出来，存进一个文本文件。
#
# 安装：把这个文件放到任意位置，然后在 ~/.zshrc 里加一行
#   alias pensieve="bash /path/to/pensieve.sh"
#
# 用法：
#   pensieve 今天终于跑通了 baseline     记一条（自动加上时间）
#   pensieve                             看今天记了什么
#   pensieve -w                          看最近 7 天
#   pensieve -s 关键词                    搜索所有记录
#   pensieve -e                          用编辑器打开整个文件
#
# 记录存在 ~/.pensieve.md，换位置的话设置环境变量 PENSIEVE_FILE。

set -euo pipefail
FILE="${PENSIEVE_FILE:-$HOME/.pensieve.md}"
touch "$FILE"
today=$(date +%Y-%m-%d)

show_since() {
  # 打印从某一天开始的所有记录（按日期标题切分）
  awk -v since="$1" '/^## / { keep = ($2 >= since) } keep' "$FILE"
}

case "${1:-}" in
  "")
    show_since "$today"
    ;;
  -w)
    if date -v-7d >/dev/null 2>&1; then since=$(date -v-7d +%Y-%m-%d)  # macOS
    else since=$(date -d '7 days ago' +%Y-%m-%d); fi                    # Linux
    show_since "$since"
    ;;
  -s)
    shift
    grep -n -i --color=auto -- "$*" "$FILE" || echo "冥想盆里没有找到：$*"
    ;;
  -e)
    "${EDITOR:-nano}" "$FILE"
    ;;
  -h|--help)
    sed -n '2,15p' "$0" | sed 's/^# \{0,1\}//'
    ;;
  *)
    grep -q "^## $today" "$FILE" || printf '\n## %s\n\n' "$today" >> "$FILE"
    printf -- '- %s  %s\n' "$(date +%H:%M)" "$*" >> "$FILE"
    echo "✓ 已存进冥想盆"
    ;;
esac

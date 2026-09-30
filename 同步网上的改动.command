#!/bin/bash
# 双击运行：把在 GitHub 网页上做的改动同步到这台电脑
cd "$(dirname "$0")"
if git pull --rebase --autostash; then
  echo "✓ 已同步到最新。"
else
  echo "✗ 同步失败。把这个窗口的内容发给 Claude 看看。"
fi
read -n 1 -s -r -p "按任意键关闭…"

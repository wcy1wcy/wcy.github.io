#!/bin/bash
# 双击运行：把本地的改动发布到网站（先同步网上的改动，再提交、推送）
cd "$(dirname "$0")"
echo "① 先同步 GitHub 上的改动……"
if ! git pull --rebase --autostash; then
  echo "✗ 同步失败（可能网上和本地改了同一个地方）。先别慌，把这个窗口的内容发给 Claude 看看。"
  read -n 1 -s -r -p "按任意键关闭…"; exit 1
fi
if [ -z "$(git status --porcelain)" ]; then
  echo "没有新的改动，不需要发布。"
else
  echo; echo "② 这次改了这些文件："; git status --short; echo
  read -r -p "用一句话说说这次改了什么（直接回车就用默认说明）：" msg
  [ -z "$msg" ] && msg="更新网站内容 $(date '+%Y-%m-%d %H:%M')"
  git add -A && git commit -q -m "$msg" && echo "✓ 已记录：$msg"
fi
echo; echo "③ 推送到 GitHub……"
if git push; then
  echo; echo "✓ 完成！一两分钟后网站会自动更新：https://wwbosell.github.io"
  echo "  构建进度：https://github.com/wwbosell/wwbosell.github.io/actions"
else
  echo "✗ 推送失败。把这个窗口的内容发给 Claude 看看。"
fi
read -n 1 -s -r -p "按任意键关闭…"

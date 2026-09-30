#!/bin/bash
# 双击运行（第一次如果提示没有权限，见 README）
cd "$(dirname "$0")"
PORT=4321
if command -v npm >/dev/null 2>&1; then
  [ -d node_modules ] || { echo "第一次运行，正在安装依赖…"; npm install; }
  echo "网站启动中：http://localhost:$PORT  （改了文件会自动刷新；关掉这个窗口就停止）"
  npm run dev -- --port $PORT --open
elif command -v python3 >/dev/null 2>&1; then
  echo "没找到 Node.js，改用 Python 预览已构建好的版本（dist 文件夹）。"
  echo "网站地址：http://localhost:$PORT  （关掉这个窗口就停止）"
  (sleep 1 && open "http://localhost:$PORT") &
  python3 -m http.server $PORT -d dist
else
  echo "需要先安装 Node.js：https://nodejs.org （下载 LTS 版本，一路下一步即可）"
  read -n 1 -s -r -p "按任意键关闭…"
fi

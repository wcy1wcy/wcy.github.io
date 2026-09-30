#!/bin/bash
# 双击运行：在自己电脑上预览网站（第一次如果提示没有权限，见 README）
cd "$(dirname "$0")"
PORT=4321

# 端口已经有网站在跑，就直接打开浏览器
if curl -s -o /dev/null --max-time 2 "http://localhost:$PORT/"; then
  echo "预览已经在运行了：http://localhost:$PORT"
  open "http://localhost:$PORT"
  read -n 1 -s -r -p "按任意键关闭这个窗口…"; exit 0
fi

if command -v npm >/dev/null 2>&1; then
  [ -d node_modules ] || { echo "第一次运行，正在安装依赖（要一两分钟）…"; npm install; }
  echo "网站启动中：http://localhost:$PORT  （改了文件会自动刷新；关掉这个窗口就停止预览）"
  npm run dev -- --port $PORT --open
else
  echo "这台电脑还没有装 Node.js，所以没法预览最新的改动。"
  echo
  echo "装一次就好：打开 https://nodejs.org ，下载 LTS 版本，双击安装包一路“继续”。"
  echo "装完以后，再双击这个文件就能预览了。"
  echo
  if [ -f dist/index.html ] && command -v python3 >/dev/null 2>&1; then
    read -r -p "要不要先看看上一次构建好的旧版本？（y/N）" ans
    if [ "$ans" = "y" ] || [ "$ans" = "Y" ]; then
      echo "旧版本：http://localhost:$PORT  （可能不包含最近的改动；关掉这个窗口就停止）"
      (sleep 1 && open "http://localhost:$PORT") &
      python3 -m http.server $PORT -d dist
    fi
  else
    open "https://nodejs.org"
  fi
  read -n 1 -s -r -p "按任意键关闭…"
fi

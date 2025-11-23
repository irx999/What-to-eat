#!/usr/bin/env python3
import http.server
import socketserver
import os

# 定义端口
PORT = 8000

# 设置当前目录为服务器根目录
web_dir = os.path.join(os.path.dirname(__file__), '.')
os.chdir(web_dir)

# 创建处理器和服务器
Handler = http.server.SimpleHTTPRequestHandler
httpd = socketserver.TCPServer(("", PORT), Handler)

print(f"服务器已在端口 {PORT} 启动")
print(f"访问 http://localhost:{PORT} 查看应用")

try:
    # 启动服务器
    httpd.serve_forever()
except KeyboardInterrupt:
    print("\n服务器已关闭")
    httpd.shutdown()
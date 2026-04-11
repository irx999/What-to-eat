#!/usr/bin/env python3
import http.server
import os
import socketserver


def main():
    PORT = 8001

    web_dir = os.path.join(os.path.dirname(__file__), ".")
    os.chdir(web_dir)

    Handler = http.server.SimpleHTTPRequestHandler
    httpd = socketserver.TCPServer(("", PORT), Handler)

    print(f"服务器已在端口 {PORT} 启动")
    print(f"访问 http://localhost:{PORT} 查看应用")

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n服务器已关闭")
        httpd.shutdown()


if __name__ == "__main__":
    main()
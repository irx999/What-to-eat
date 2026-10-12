#!/usr/bin/env python3
"""Serve the static site locally without changing the working directory."""

from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

HOST = "127.0.0.1"
PORT = 8001
ROOT = Path(__file__).resolve().parent


def main():
    handler = partial(SimpleHTTPRequestHandler, directory=str(ROOT))
    with ThreadingHTTPServer((HOST, PORT), handler) as server:
        print(f"访问 http://{HOST}:{PORT} 查看应用（Ctrl+C 退出）")
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("\n服务器已关闭")


if __name__ == "__main__":
    main()

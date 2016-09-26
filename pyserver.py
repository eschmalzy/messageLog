from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs
import json
import os

class MyServer(BaseHTTPRequestHandler):
    #GET request
    def do_GET(self):
        #status code
        self.send_response(200)
        file = open("messages.txt", 'r')

        #query = parse_qs(urlparse(self.path).query)
        #print(query)

        #write response
        if self.path == "/chickens":
            # headers
            self.send_header("Content-Type", "text/html")
            self.end_headers()

            self.wfile.write(bytes("<p>YES</p>", "utf-8"))
        elif self.path.startswith("/canihasjson"):
            if os.path.getsize('messages.txt') > 0:
                for line in file:
                    data = line
                # headers
                self.send_header("Content-Type", "application/json")
                self.end_headers()

                print(data)
                self.wfile.write(bytes(json.dumps(data),"utf-8"))
            else:
                # headers
                self.send_header("Content-Type", "text/html")
                self.end_headers()

                print("Couldn't read from file.")
                self.wfile.write(bytes("<p>Couldn't read from file.</p>", "utf-8"))
        else:
            # headers
            self.send_header("Content-Type", "text/html")
            self.end_headers()

            self.wfile.write(bytes("<p>Hello, World!</p>", "utf-8"))
        file.close()
        return

    def do_POST(self):
        self.send_response(201)
        fileRead = open("messages.txt", "r")
        messagesLst = ""
        for lines in fileRead:
            if lines.endswith("\n"):
                messagesLst += lines
            else:
                messagesLst += lines + "\n"
        fileRead.close()


        self.send_header('Content-Type', 'text/plain')
        self.end_headers()

        length = int(self.headers['Content-Length'])
        data = self.rfile.read(length).decode('utf-8')
        parsed_data = parse_qs(data)
        print(data)
        print(parsed_data)
        messagesLst += str(parsed_data)
        file = open("messages.txt", 'w')
        file.write(messagesLst)
        file.close()

        return

def run():
        listen = ("127.0.0.1", 8080)
        server = HTTPServer(listen, MyServer)

        print("Listening......")
        server.serve_forever()

run()

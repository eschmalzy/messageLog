from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs
import json
import os
import ast

class MyServer(BaseHTTPRequestHandler):
    #GET request
    def do_GET(self):
        #status code
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', ' * ')
        file = open("messages.txt", 'r')

        #query = parse_qs(urlparse(self.path).query)
        #print(query)

        #write response
        if self.path == "/chickens":
            # headers
            self.send_header("Content-Type", "text/html")
            self.end_headers()

            self.wfile.write(bytes("<p>YES</p>", "utf-8"))
        elif self.path.startswith("/messages"):
            if os.path.getsize('messages.txt') > 0:
                # headers
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                jsonMessages = []
                for line in file:
                    line = line.rstrip("\n")
                    line = ast.literal_eval(line)
                    jsonMessages.append(line)
                print(jsonMessages)
                self.wfile.write(bytes(json.dumps(jsonMessages),"utf-8"))
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
        if self.path.endswith("/messages"):
            self.send_response(201)
            self.send_header('Access-Control-Allow-Origin', ' * ')
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

        else:
            self.send_response(404)
        return

def run():
        listen = ("127.0.0.1", 8080)
        server = HTTPServer(listen, MyServer)
        #file = open("messages.txt", 'w').close()

        print("Listening......")
        server.serve_forever()

run()

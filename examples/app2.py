import flask

app = flask.Flask(__name__)

@app.route("/")
def hello_world():
    return flask.render_template("index.html")

@app.route("/video")
def video_world():
    return flask.render_template("video.html")

if __name__ == '__main__':
    app.debug = True
    app.run()

import flask

app = flask.Flask(__name__)

@app.route("/")
def hello_world():
    return flask.render_template("index.html")

@app.route("/video")
def video_world():
    return flask.render_template("video.html")

@app.route("/videoGame")
def video_game():
    return flask.render_template("videoGame.html")

@app.route("/CarmelaGame")
def carmela_game():
    return flask.render_template("CarmelaGame.html")

if __name__ == '__main__':
    app.debug = True
    app.run()

from flask import Flask, render_template, request, redirect, url_for, session
app = Flask(__name__)

@app.route("/")
def homepage():
    return render_template("homepage.html")

@app.route("/about.html")
def about():
    return render_template("about.html")


@app.route("/signin.html")
def signin():
    return render_template("signin.html")

@app.route("/signup.html")
def signup():
    return render_template("signup.html")


@app.route("/complete.html")
def complete():
    return render_template("complete.html")

    
if __name__ == "__main__":
    app.run(debug=True)
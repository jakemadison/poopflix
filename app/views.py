from flask import Flask, render_template, jsonify, g, request
from app import app
import grab_data
import json


@app.route('/')
@app.route('/index')
def index():
    movie, link = grab_data.get_netflix_data()
    return render_template("index.html", movie=movie, link=link)


@app.route('/get_movie')
def get_stop():
    movie, link = grab_data.get_netflix_data()
    return jsonify({'result': 'success', 'movie': movie})


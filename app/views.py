from flask import Flask, render_template, jsonify, g, request
from app import app
import grab_data
import json


@app.route('/')
@app.route('/index')
def index():
    return render_template("index.html", movie='movie')


@app.route('/get_movie')
def get_stop(stop=51195):
    g.route = 0
    g.stopNumber = stop
    g.allstops = False
    return jsonify({'result': 'success', 'movie': 'movie_name'})


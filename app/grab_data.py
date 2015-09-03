import requests
import feedparser
from random import randint

def get_netflix_data():

    netflix_data = feedparser.parse('http://dvd.netflix.com/Top100RSS')

    choice = randint(0, 99)

    movie_choice = netflix_data['entries'][choice]['title']
    link = netflix_data['entries'][choice]['link']

    return movie_choice, link


if __name__ == "__main__":
    print get_netflix_data()

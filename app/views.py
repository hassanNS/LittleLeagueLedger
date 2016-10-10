from flask import render_template, flash, redirect
from app import app
from forms import LoginForm


@app.route('/')
@app.route('/index')
def index():
  user = {'nickname': 'Miguel'}
  posts = [
      {
          'author': {'nickname': 'John'},
          'body': 'Beautiful day'
      },
      {
          'author': {'nickname': 'Susan'},
          'body': 'Avengers is pretty cool'
      }
  ]

  return render_template('index.html',
                         title='Home',
                         user=user,
                         posts=posts)

@app.route('/home')
def home():
  text = "Mary had a little lamb and she was very cute"
  return render_template('home.html', text=text)


@app.route('/login', methods=['GET', 'POST'])
def login():

    return render_template('login.html',
                           title='Login') 

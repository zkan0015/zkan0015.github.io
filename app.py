from flask import Flask, render_template, request, Response
import plotly.graph_objects as go
import plotly, json
import numpy as np
import pyodbc
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
import urllib
from sqlalchemy import func
from flask import jsonify
import pandas as pd
import configparser


app = Flask(__name__)

# Set log_in name and password
#LOGIN_NAME = "TA22"
#PASSWORD = "TA@22"

#@app.before_request
#def require_basic_auth():
#    auth = request.authorization
#    if not auth or auth.username != LOGIN_NAME or auth.password != PASSWORD:
#        return Response(
#            "Unauthorized - Invalid login name or password", 401,
#            {'WWW-Authenticate': 'Basic realm="Login Required"'}        )

questions = [
    "In the last month, how often have you been upset because of something that happened unexpectedly?",
    "In the last month, how often have you felt that you were unable to control the important things in your life?",
    "In the last month, how often have you felt nervous and 'stressed'?",
    "In the last month, how often have you dealt successfully with irritating life hassles?",
    "In the last month, how often have you felt that you were effectively coping with important changes that were occurring in your life?",
    "In the last month, how often have you felt confident about your ability to handle your personal problems?",
    "In the last month, how often have you felt that things were going your way?",
    "In the last month, how often have you found that you could not cope with all the things that you had to do?",
    "In the last month, how often have you been able to control irritations in your life?",
    "In the last month, how often have you felt that you were on top of things?",
    "In the last month, how often have you been angered because of things that happened that were outside of your control?",
    "In the last month, how often have you found yourself thinking about things that you have to accomplish?",
    "In the last month, how often have you been able to control the way you spend your time?",
    "In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?"
]


def get_db_connection():
    config = configparser.ConfigParser()
    config.read('config.ini')

    server = config['database']['server']
    database = config['database']['database']
    username = config['database']['username']
    password = config['database']['password']
    driver = '{ODBC Driver 18 for SQL Server}'

    connection_string = f'DRIVER={driver};SERVER={server};DATABASE={database};UID={username};PWD={password};timeout=30'
    conn = pyodbc.connect(connection_string)
    return conn


def get_anxiety_data():
    conn = get_db_connection()
    df = pd.read_sql("SELECT * FROM AnxietyStatistics", conn)
    conn.close()
    return df

def get_depression_data():
    conn = get_db_connection()
    df = pd.read_sql("SELECT * FROM DepressionStatistics", conn)
    conn.close()
    return df





@app.route('/data', methods=['GET'])
def landing():
    anxiety_data = get_anxiety_data()
    depression_data = get_depression_data()

    fig_anxiety = go.Figure(data=[
        go.Scatter(name='Anxiety 2017-18', x=anxiety_data['AgeGroup'], y=anxiety_data['Males_2017_18'], mode='lines+markers'),
        go.Scatter(name='Anxiety 2014-15', x=anxiety_data['AgeGroup'], y=anxiety_data['Males_2014_15'], mode='lines+markers')
    ])

    fig_depression = go.Figure(data=[
        go.Scatter(name='Depression 2017-18', x=depression_data['AgeGroup'], y=depression_data['Males_2017_18'], mode='lines+markers'),
        go.Scatter(name='Depression 2014-15', x=depression_data['AgeGroup'], y=depression_data['Males_2014_15'], mode='lines+markers')
    ])

    graphJSON_anxiety = json.dumps(fig_anxiety, cls=plotly.utils.PlotlyJSONEncoder)
    graphJSON_depression = json.dumps(fig_depression, cls=plotly.utils.PlotlyJSONEncoder)

    return render_template('learnmore.html', graphJSON_anxiety=graphJSON_anxiety, graphJSON_depression=graphJSON_depression)

@app.route('/get_anxiety_data', methods=['GET'])
def get_anxiety_data_json():
    anxiety_data = get_anxiety_data()
    fig_anxiety = go.Figure(data=[
        go.Scatter(
            name='Anxiety 2017-18 (Males)',
            x=anxiety_data['AgeGroup'],
            y=anxiety_data['Males_2017_18'],
            mode='lines+markers',
            hovertemplate='%{x}, Males 2017-18 (%): %{y}<extra></extra>',
            legendgroup='2017-18 (Males)'
        ),
        go.Scatter(
            name='Anxiety 2014-15 (Males)',
            x=anxiety_data['AgeGroup'],
            y=anxiety_data['Males_2014_15'],
            mode='lines+markers',
            hovertemplate='%{x}, Males 2014-15 (%): %{y}<extra></extra>',
            legendgroup='2014-15 (Males)'
        ),
        go.Scatter(
            name='Anxiety 2017-18 (Females)',
            x=anxiety_data['AgeGroup'],
            y=anxiety_data['Females_2017_18'],
            mode='lines+markers',
            hovertemplate='%{x}, Females 2017-18 (%): %{y}<extra></extra>',
            legendgroup='2017-18 (Females)'
        ),
        go.Scatter(
            name='Anxiety 2014-15 (Females)',
            x=anxiety_data['AgeGroup'],
            y=anxiety_data['Females_2014_15'],
            mode='lines+markers',
            hovertemplate='%{x}, Females 2014-15 (%): %{y}<extra></extra>',
            legendgroup='2014-15 (Females)'
        )
    ])

    fig_anxiety.update_layout(
        width=650,  # Set the width
        height=450,  # Set the height
        paper_bgcolor='rgba(0,0,0,0)',  # Set a clear background
        plot_bgcolor='rgba(0,0,0,0)',  # Set a clear background
        modebar=dict(orientation='v', bgcolor='rgba(0,0,0,0)'),  # Remove toolbar
        modebar_remove=['pan2d', 'lasso2d', 'select2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d',
                        'hoverClosestCartesian', 'hoverCompareCartesian', 'toggleSpikelines'],
        margin=dict(l=0, r=0, t=0, b=0),
        legend=dict(font=dict(size=8))
    )
    return json.dumps(fig_anxiety, cls=plotly.utils.PlotlyJSONEncoder)


@app.route('/get_depression_data', methods=['GET'])
def get_depression_data_json():
    depression_data = get_depression_data()
    fig_depression = go.Figure(data=[
        go.Scatter(
            name='Depression 2017-18 (Males)',
            x=depression_data['AgeGroup'],
            y=depression_data['Males_2017_18'],
            mode='lines+markers',
            hovertemplate='%{x}, Males 2017-18 (%): %{y}<extra></extra>',
            legendgroup='2017-18 (Males)'
        ),
        go.Scatter(
            name='Depression 2014-15 (Males)',
            x=depression_data['AgeGroup'],
            y=depression_data['Males_2014_15'],
            mode='lines+markers',
            hovertemplate='%{x}, Males 2014-15 (%): %{y}<extra></extra>',
            legendgroup='2014-15 (Males)'
        ),
        go.Scatter(
            name='Depression 2017-18 (Females)',
            x=depression_data['AgeGroup'],
            y=depression_data['Females_2017_18'],
            mode='lines+markers',
            hovertemplate='%{x}, Females 2017-18 (%): %{y}<extra></extra>',
            legendgroup='2017-18 (Females)'
        ),
        go.Scatter(
            name='Depression 2014-15 (Females)',
            x=depression_data['AgeGroup'],
            y=depression_data['Females_2014_15'],
            mode='lines+markers',
            hovertemplate='%{x}, Females 2014-15 (%): %{y}<extra></extra>',
            legendgroup='2014-15 (Females)'
        )
    ])

    fig_depression.update_layout(
        width=650,  # Set the width
        height=450,  # Set the height
        paper_bgcolor='rgba(0,0,0,0)',  # Set a clear background
        plot_bgcolor='rgba(0,0,0,0)',  # Set a clear background
        modebar=dict(orientation='v', bgcolor='rgba(0,0,0,0)'),  # Remove toolbar
        modebar_remove=['pan2d', 'lasso2d', 'select2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d',
                        'hoverClosestCartesian', 'hoverCompareCartesian', 'toggleSpikelines'],
        margin=dict(l=0, r=0, t=0, b=0),
        legend=dict(font=dict(size=8))
    )
    return json.dumps(fig_depression, cls=plotly.utils.PlotlyJSONEncoder)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/learnmore')
def data():
    return render_template('learnmore.html')
@app.route('/calculator', methods=['GET', 'POST'])
def calculator():
    app._static_folder = "./static"
    if request.method == 'POST':
        # Indices of positively stated items
        positive_indices = [3, 4, 5, 6, 8, 9, 12]
        total_score = 0

        for i in range(len(questions)):
            response = int(request.form.get(f'question_{i}'))
            if i in positive_indices:
                response = 4 - response
            total_score += response

        return render_template('result_for_stress_calculator.html', total_score=total_score)

    return render_template('stress_calculator_new.html', questions=questions, num_questions=len(questions))


if __name__ == '__main__':
    app.run(host="0.0.0.0", port = 70, debug =True)



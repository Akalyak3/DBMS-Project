from flask import Flask, request, jsonify, render_template
import mysql.connector

app = Flask(_name_)

# MySQL connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="todo"
)

@app.route('/')
def index():
    return render_template('todo.html')

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM tasks")
    tasks = cursor.fetchall()
    cursor.close()
    return jsonify(tasks)

@app.route('/api/tasks', methods=['POST'])
def add_task():
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    cursor = db.cursor()
    cursor.execute("INSERT INTO tasks (title, description) VALUES (%s, %s)", (title, description))
    db.commit()
    cursor.close()
    return jsonify({'message': 'Task added successfully'})

if _name_ == '_main_':
    app.run(debug=True)

from flask import Flask, flash, jsonify, redirect, render_template, url_for, request
import sqlite3

app = Flask(__name__)
database_path = './database/database.db'

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/eventos')
def ver_eventos():
  connection = sqlite3.connect(database_path)
  cursor = connection.cursor()
  events = cursor.execute(f'SELECT eventId, title, description, dateTime, location, type FROM events;').fetchall()
  event_list = [
    {'id': event[0], 'title': event[1], 'description': event[2], 'dateTime': event[3], 'location': event[4], 'type': event[5]}
    for event in events
  ]
  connection.close()
  return render_template('ver_eventos.html', events=event_list)

@app.route('/evento/<id>')
def evento(id):
  connection = sqlite3.connect(database_path)
  cursor = connection.cursor()
  event_id = cursor.execute(f'SELECT eventId FROM events where eventId=?', (id,)).fetchone()
  if event_id:
    event_id = event_id[0]
    event = cursor.execute(f'SELECT eventId, title, description, dateTime, location, type FROM events where eventId=?', (event_id,)).fetchone()
    participants = cursor.execute(f'SELECT participandId, name, lastname, email, role, phone, eventId FROM participants where eventId=?', (event_id,)).fetchall()
    invitations = cursor.execute(f'SELECT invitationId, name, email, type, eventId FROM invitations where eventId=?', (event_id,)).fetchall()
    logistics = cursor.execute(f'SELECT logisticId, type, distribuitor, comments, eventId FROM logistic where eventId=?', (event_id,)).fetchall()
    event_list = [
      {'id': event[0], 'title': event[1], 'description': event[2], 'dateTime': event[3], 'location': event[4], 'type': event[5]}
    ]
    participant_list = [
      {'id': participant[0], 'name': participant[1], 'lastname': participant[2], 'email': participant[3], 'role': participant[4], 'phone': participant[5]}
      for participant in participants
    ]
    invitation_list = [
      {'id': invitation[0], 'name': invitation[1], 'email': invitation[2], 'type': invitation[3]}
      for invitation in invitations
    ]
    logistic_list = [
      {'id': logistic[0], 'type': logistic[1], 'distribuitor': logistic[2], 'comments': logistic[3]}
      for logistic in logistics
    ]
    return render_template('evento.html', events=event_list, participants=participant_list, invitations=invitation_list, logistics=logistic_list)
  else:
    return f'Error 404 :c'

@app.route('/registro/evento')
def registrar_evento():
  return render_template('registrar_eventos.html')

# @app.route('/registro/disponibilidad')
# def disponibilidad():
#   error = None
#   connection = sqlite3.connect(database_path)
#   cursor = connection.cursor()
#   titulo = request.args.get('titulo')
#   cursor.execute(f'select title from events where title = ?;', (titulo,))
#   eventData = cursor.fetchone()
#   if not eventData:
#     return redirect(request.referrer)
#   else:
#     error = f'{titulo} ya está registrado.'
#     return render_template('registrar_eventos.html', error=error)

@app.route('/registro/registrar', methods=['GET', 'POST'])
def registrar():
  connection = sqlite3.connect(database_path)
  cursor = connection.cursor()
  if (request.method == 'POST'):
    # events table
    title = request.form['title']
    event_type = request.form['eventType']
    description = request.form['description']
    location = request.form['location']
    date = request.form['date']
    hour = request.form['hour']
    dateTime = date + ' ' + hour
    print(title, description, dateTime, location, event_type)
    cursor.execute(f'INSERT INTO events(title, description, dateTime, location, type) VALUES (?, ?, ?, ?, ?);', (title, description, dateTime, location, event_type))
    # participants table
    foreign_key = cursor.execute(f'SELECT eventId FROM events where title=?;', (title,)).fetchone()
    if foreign_key:
      foreign_key = foreign_key[0]
    else:
      return f'{title} ya está registrado xd.'
    participant_name = request.form['participant-name']
    participant_lastname = request.form['participant-lastname']
    participant_email = request.form['participant-email']
    participant_phone = request.form['participant-phone']
    participant_role = request.form['participant-role']
    print(participant_name, participant_lastname, participant_email, participant_phone, participant_role)
    cursor.execute(f'INSERT INTO participants(name, lastname, email, role, phone, eventId) VALUES (?, ?, ?, ?, ?, ?)', (participant_name, participant_lastname, participant_email, participant_role, participant_phone, foreign_key))
    # invitations
    invitation_name = request.form['invitation-name']
    invitation_email = request.form['invitation-email']
    invitation_type = request.form['invitation-type']
    print(invitation_name, invitation_email, invitation_type)
    cursor.execute(f'INSERT INTO invitations(name, email, type, eventId) VALUES (?, ?, ?, ?)', (invitation_name, invitation_email, invitation_type, foreign_key))
    # logistic
    logistic_type = request.form['logistic-type']
    distribuitor = request.form['distribuitor']
    comments = request.form['comments']
    print(logistic_type, distribuitor, comments)
    cursor.execute(f'INSERT INTO logistic(type, distribuitor, comments, eventId) VALUES (?, ?, ?, ?)', (logistic_type, distribuitor, comments, foreign_key))
    connection.commit()
    connection.close()
    return redirect(url_for('ver_eventos'))
  else:
    print('not a post request')
    return '<p>no se hizo post xd</p>'

@app.route('/registro/next')
def next():
  return '<p>holi</p>'

if __name__ == "__main__":
  app.run(host='0.0.0.0', debug=True)

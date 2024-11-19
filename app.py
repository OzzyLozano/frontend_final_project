from flask import Flask, flash, redirect, render_template, url_for, request
import sqlite3

app = Flask(__name__)
database_path = './database/database.db'

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/verEventos')
def ver_eventos():
  return render_template('ver_eventos.html')

@app.route('/registro/evento')
def registrar_evento():
  return render_template('registrar_eventos.html')

@app.route('/registro/participante')
def registrar_participante():
  return render_template('registrar_participante.html')

@app.route('/registro/invitaciones')
def registrar_invitaciones():
  return render_template('registrar_invitaciones.html')

@app.route('/registro/logistica')
def registrar_logistica():
  return render_template('registrar_logistica.html')

@app.route('/registro/confirmar')
def confirmar_registro():
  return render_template('confirmar_registro.html')

# @app.route('/registro/disponibilidad')
# def disponibilidad():
#   error = None
#   connection = sqlite3.connect(database_path)
#   cursor = connection.cursor()
#   titulo = request.args.get('titulo')
#   cursor.execute(f'select title from events where title = ?;', (titulo,))
#   eventData = cursor.fetchone()
#   if not eventData:
#     return redirect(url_for('registrar_participante'))
#   else:
#     error = f'{titulo} ya está registrado.'
#     return render_template('registrar_eventos.html', error=error)

@app.route('/registro/registrar', methods=['GET', 'POST'])
def registrar():
  connection = sqlite3.connect(database_path)
  cursor = connection.cursor()
  if (request.method == 'POST'):
    title = request.form['title']
    event_type = request.form['eventType']
    description = request.form['description']
    location = request.form['location']
    date = request.form['date']
    hour = request.form['hour']
    dateTime = date + ' ' + hour
    print(title, description, dateTime, location, event_type)
    cursor.execute(f'INSERT INTO events(title, description, dateTime, location, type) VALUES (?, ?, ?, ?, ?);', (title, description, dateTime, location, event_type))
    connection.commit()
    connection.close()
    return redirect(url_for('next'))
  else:
    print('not a post request')
    return '<p>no se hizo post xd</p>'

@app.route('/regustro/next')
def next():
  return '<p>holi</p>'

if __name__ == "__main__":
  app.run(host='0.0.0.0', debug=True)

import sqlite3

path = './database.db'

connection = sqlite3.connect(path)
cursor = connection.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS
  events(
    eventId INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(40) NOT NULL UNIQUE,
    description VARCHAR(160) NOT NULL NOT NULL,
    dateTime TIMESTAMP NOT NULL,
    location VARCHAR(40) NOT NULL,
    type VARCHAR(40) NOT NULL
  )
""")
cursor.execute("""
CREATE TABLE IF NOT EXISTS
  participants(
    participandId INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(40) NOT NULL,
    lastname VARCHAR(40) NOT NULL,
    email VARCHAR(40) NOT NULL,
    role VARCHAR(40) NOT NULL,
    phone INTEGER NOT NULL,
    eventId INTEGER,
    FOREIGN KEY(eventId) REFERENCES events(eventId)
  )
""")
cursor.execute("""
CREATE TABLE IF NOT EXISTS
  invitations(
    invitationId INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(40) NOT NULL,
    email VARCHAR(40) NOT NULL,
    type VARCHAR(40) NOT NULL,
    eventId INTEGER,
    FOREIGN KEY(eventId) REFERENCES events(eventId)
  )
""")
cursor.execute("""
CREATE TABLE IF NOT EXISTS
  logistic(
    logisticId INTEGER PRIMARY KEY AUTOINCREMENT,
    type VARCHAR(40) NOT NULL,
    distribuitor VARCHAR(40) NOT NULL,
    comments VARCHAR(160) NOT NULL,
    eventId INTEGER,
    FOREIGN KEY(eventId) REFERENCES events(eventId)
  )
""")

connection.commit()
cursor.close()
connection.close()

from flask import Flask, request, jsonify
from flaskext.mysql import MySQL
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)

# Configuración de MySQL
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = ''
app.config['MYSQL_DATABASE_DB'] = 'marketing_campaign'
mysql = MySQL(app)

CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

# Ruta para obtener datos de 'ingresos'
@app.route('/ingresos', methods=['GET'])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def ingresos():
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute('''SELECT * FROM ingresos''')
    data = cursor.fetchall()
    print(data,';')
    return jsonify({"results": data})



# Ruta para obtener datos de 'vino'
@app.route('/vino', methods=['GET'])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def vino():
    conn = mysql.connect()
    cursor = conn.cursor()
    if request.methods == 'GET':
        cursor.execute('''SELECT * FROM vino''')
        data = cursor.fetchall()
    else:
        idcliente=json.loads(request.data)
        cursor.execute('''SELECT * from vino where id=%s''',(idcliente["idcliente"]))
        data = cursor.fetchall()
        
    return jsonify({"results": data})

# Ruta para obtener datos de 'fidelidad'
@app.route('/fidelidad', methods=['GET'])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def fidelidad():
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute('''SELECT * FROM fidelidad''')
    data = cursor.fetchall()
    return jsonify({"results": data})

if __name__ == "__main__":
    app.run(debug=True)

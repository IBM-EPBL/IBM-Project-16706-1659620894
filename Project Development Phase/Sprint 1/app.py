from flask import Flask, request
from flask_cors import CORS, cross_origin
import ibm_db
import json
import uuid
import datetime
from datetime import datetime, timedelta, date
import calendar

app = Flask(__name__)
cors = CORS(app)
try:
    print("Connecting")
    conn=ibm_db.connect('DATABASE=bludb;HOSTNAME=6667d8e9-9d4d-4ccb-ba32-21da3bb5aafc.c1ogj3sd0tgtu0lqde00.databases.appdomain.cloud;PORT=30376;SECURITY=SSL;SSLServerCertificate=DigiCertGlobalRootCA.crt;UID=ncv90043;PWD=l6SXXm78Bc5lPuP0','','')
    print("Successfully connected")
except Exception as e:
    print(ibm_db.conn_errormsg())
@app.route('/')
@cross_origin()
def hello():
    return 'hello'

@app.route('/login', methods = ['POST'])
@cross_origin()
def login():
    email = request.form['email']
    password = request.form['password']
    try:
        stmt = ibm_db.exec_immediate(conn, "select * from users where email = '%s' and password = '%s'" % (email,password))
        result = ibm_db.fetch_assoc(stmt)
        if result:
            response = app.response_class(
            response=json.dumps({"user_id":result['USER_ID']}),
            status=200,
            mimetype='application/json'
            )
            return response
        else:
            response = app.response_class(
            response=json.dumps('User Not Found'),
            status=404,
            mimetype='application/json'
            )
        return response
    except Exception as e:
        print(e)
        response = app.response_class(
            response=json.dumps({"message":str(e)}),
            status=400,
            mimetype='application/json'
        )
        return response



@app.route('/register', methods= ['POST'])
@cross_origin()
def register():
    name = request.form['name']
    email = request.form['email']
    password = request.form['password']
    limit = request.form['monthly_limit']
    try:
        id = "".join([n for n in str(uuid.uuid4())[:8] if n.isdigit()])
        stmt = ibm_db.exec_immediate(conn, "select * from users where email = '%s'" % (email))
        print("num rows is ",ibm_db.num_rows(stmt))
        if ibm_db.fetch_assoc(stmt):
            response = app.response_class(
            response=json.dumps({"message":'Email already exists'}),
            status=409,
            mimetype='application/json'
            )
            print("already exists")
            return response
        print("new email")
        stmt = ibm_db.exec_immediate(conn, "INSERT into users values('%s','%s','%s','%s','%s')" % (int(id),name,email,password,limit))
        print("Number of affected rows: ", ibm_db.num_rows(stmt))
        stmt = ibm_db.exec_immediate(conn, "SELECT * from users where email = '%s' and password = '%s'" % (email,password))
        result = ibm_db.fetch_assoc(stmt)
        response = app.response_class(
            response=json.dumps({"user_id":result["USER_ID"]}),
                status=200,
            mimetype='application/json'
        )
        return response
    except Exception as e:
        print(e)
        response = app.response_class(
            response=json.dumps({"user_id":None}),
            status=400,
            mimetype='application/json'
        )
        return response
    
@app.route('/expenses', methods = ['GET'])
@cross_origin()
def get_expenses():
    user_id = request.headers['user_id']
    type = None
    if request.args:
        type = request.args['type']
    try:
        sql = "SELECT e.expense_id, e.amount, e.date, c.category_name, e.expense_type, e.description FROM expense e INNER JOIN user_expense u ON e.expense_id=u.expense_id FULL JOIN category c ON e.category_id = c.category_id  where u.user_id = %s" % user_id
        if type:
            sql +=" AND e.expense_type = '%s'" % type
        sql+=" ORDER BY e.date DESC"

        stmt = ibm_db.exec_immediate(conn, sql )
        expense = ibm_db.fetch_assoc(stmt)
        expenses = []
        while expense !=False:
            exp =  {k.lower(): v for k, v in expense.items()}
            date = exp['date']
            exp['date'] = date.__str__()
            expenses.append(exp)
            expense = ibm_db.fetch_assoc(stmt)
        response = app.response_class(
            response=json.dumps(expenses),
            status=200,
            mimetype='application/json'
        )
        return response
    except Exception as e:
        response = app.response_class(
            response=json.dumps(str(e)),
            status=400,
            mimetype='application/json'
        )
        return response

if __name__ == '__main__':
    app.run(debug = True)
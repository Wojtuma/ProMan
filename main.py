from flask import Flask, render_template, url_for,request, redirect, url_for, session
from dotenv import load_dotenv
from util import json_response
import mimetypes
import queries
import hashing_utility

mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
load_dotenv()

@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/api/boards", methods=["GET"])
@json_response
def get_boards():
    """
    All the boards
    """
    return queries.get_boards()

@app.route("/api/boards/<int:board_id>", methods=["DELETE"])
@json_response
def delete_board(board_id : int):
    return queries.delete_board(board_id)

@app.route("/api/boards/", methods=["POST"])
@json_response
def create_board():
    return queries.create_board(request.json["title"])

@app.route("/api/boards/<int:board_id>/cards/")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return queries.get_cards_for_board(board_id)

@app.route("/api/boards/<int:board_id>", methods=["PUT"])
@json_response
def update_board_name(board_id : int):
    print(request.json['name'])
    board_name = request.json['name']
    queries.update_board_name(board_id, board_name)

@app.route("/api/statuses", methods=['GET'])
@json_response
def get_statuses():
    """
    Board with specific id
    """
    return queries.get_statuses()    

@app.route("/api/boards/<int:board_id>")
@json_response
def get_board(board_id: int):
    """
    Board with specific id
    """
    return queries.get_board(board_id)

@app.route("/api/cards/<int:card_id>")
@json_response
def get_card(card_id: int):
    """
    Card with specific id
    """
    return queries.get_card(card_id)

@app.route("/api/statuses/", methods=["POST"])
@json_response
def create_status():
    return queries.create_status(request.json["title"])

@app.route("/api/statuses/<int:status_id>", methods=["PUT"])
@json_response
def update_status(status_id : int):
    queries.update_status_name(status_id, request.json['name'])

@app.route("/api/statuses/<int:status_id>", methods=["DELETE"])
@json_response
def delete_status(status_id : int):
    return queries.delete_status(status_id)

@app.route("/api/cards/<int:card_id>", methods=["DELETE"])
@json_response
def delete_card(card_id : int):
    return queries.delete_card(card_id)

@app.route("/api/<int:board_id>/cards", methods=["POST"])
@json_response
def create_card(board_id : int):
    return queries.create_card(request.json['title'],board_id)

@app.route("/api/cards/<int:card_id>", methods=["PUT"])
@json_response
def update_card(card_id : int):
    status=int(request.json['status'])
    queries.update_card(card_id, request.json['name'], status)

@app.route('/api/register/', methods=["GET", "POST"])
def register():
    queries.register_user(request.method, request.form)

@app.route('/api/login/', methods=["GET", "POST"])
def login():
    login_data = {}
    if request.method == "POST":
        login_data['user_name'] = request.form['user_name']
        login_data['password'] = request.form['password']
        user_name_check = queries.check_login_user_name(login_data)
        password_check = queries.check_login_password(login_data)
        if user_name_check == False:
            pass_message = 'This user does not exist.'
            return render_template('login.html',pass_message=pass_message)
        elif password_check == False:
            pass_message = "Password incorrect. Please try again."
            return render_template("login.html", pass_message=pass_message)
        else:
            #print(f"Hi {login_data['user_name']}, you're logged in! Welcome, welcome!")
            session['username'] = request.form['user_name']
            return redirect(url_for("index"))
    if 'username' in session:
        return render_template("login.html", username=session["username"])
    else:
        return render_template("login.html")

@app.route('/logout', methods=["GET","POST"])
def logout():
    session.clear()
    return redirect(url_for("index"))

def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))



if __name__ == '__main__':
    main()
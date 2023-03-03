import data_manager
import hashing_utility
# from dotenv import load_dotenv
# load_dotenv()
def get_card_status(status_id):

    status = data_manager.execute_select(
        """
        SELECT * FROM statuses s
        WHERE s.id = %(status_id)s
        ;
        """
        , {"status_id": status_id})

    return status

def get_boards():
    boards = data_manager.execute_select(
        """
        SELECT * FROM boards s;
        """
        )
    return boards

def get_cards_for_board(board_id):
    cards = data_manager.execute_select(
        """
        SELECT * FROM cards s
        WHERE board_id = %(board_id)s
        ;
        """
        , {"board_id": board_id})
    return cards

def get_board(board_id):
    board = data_manager.execute_select(
        """
        SELECT * FROM boards
        WHERE id = %(board_id)s
        ;
        """,
        {"board_id":board_id}
        )
    return board

def get_statuses():
    return data_manager.execute_select(
        """
        SELECT * FROM statuses s;
        """,
        
        )
    

def get_card(card_id):
    card = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE id = %(card_id)s
        ;
        """,
        {"card_id":card_id}
        )
    return card

def update_board_name(board_id, name):
    return data_manager.execute_update(
        """
        UPDATE boards
        SET title = %(name)s
        WHERE id = %(board_id)s
        """
        , {"board_id": board_id, "name": name}
    )

def create_board(board_title): 
    return data_manager.execute_select(
        """
        INSERT INTO boards 
        (title)
        VALUES (%(title)s)
        RETURNING id,title;
        """,
        {"title": board_title}
    )
    
def delete_board(board_Id):
    data_manager.execute_delete(
        """
        DELETE FROM boards 
        WHERE id=(%(board_Id)s);
        """,
        {"board_Id": board_Id})

def create_status(statusTitle):
    return data_manager.execute_select(
        """
        INSERT INTO statuses 
        (title)
        VALUES (%(title)s)
        RETURNING id,title;
        """,
        {"title": statusTitle}
    )
def update_status_name(status_id, name):
    return data_manager.execute_update(
        """
        UPDATE statuses
        SET title = %(name)s
        WHERE id = %(status_id)s
        """
        , {"status_id": status_id, "name": name}
    )

def update_card(card_id, name, status):
    return data_manager.execute_update(
        """
        UPDATE cards
        SET title = %(name)s,status_id = %(status)s
        WHERE id = %(card_id)s
        """
        , {"card_id": card_id, "name": name, "status":status}
    )



def delete_status(status_Id):
    data_manager.execute_delete(
        """
        DELETE FROM statuses 
        WHERE id=(%(status_Id)s);
        """,
        {"status_Id": status_Id})
        
def delete_card(card_id):
    data_manager.execute_delete(
        """
        DELETE FROM cards 
        WHERE id=(%(card_Id)s);
        """,
        {"card_Id": card_id})


def create_card(title,board_id):
    statusId = 1
    return data_manager.execute_select(
        """
        INSERT INTO cards 
        (title, board_id, status_id,card_order)
        VALUES (%(title)s, %(board_id)s, %(status_id)s, %(card_order)s)
        RETURNING id,title,board_id,status_id;
        """,
        {"title": title,"board_id": board_id, "status_id": statusId, "card_order":statusId}
    )

def register_user(request_method, request_form):
    register_form = {}
    if request_method == 'POST':
        if request_form['password'] == request_form['repeat password']:
            register_form['user_name'] = request_form['user_name']
            register_form['password'] = request_form['password']
            hashed_password = hashing_utility.hash_password(register_form['password'])            
            compare_result = check_user(register_form)
            if (compare_result == []) :
                add_user(register_form, hashed_password)
                return None
            elif(compare_result[0]['user_name'] != request_form['user_name']) :
                add_user(register_form, hashed_password)
                return None
                return render_template("register.html", pass_message='User registered successfully')
            """else:           
                return render_template("register.html", pass_message='User with these data already exist')    
        else:
            return render_template("register.html", pass_message='passwords are not the same')"""
    """if 'username' in session:
        return render_template("register.html", username=session["username"])
    else:
        return render_template("register.html")"""

def add_user(register_form, hashed_password):
    return data_manager.execute_select(
        """
        INSERT INTO user_data (user_name, password_hash)
        VALUES (%(user_name)s,%(password)s)
        RETURNING id,user_name;
        """,
        {'user_name': register_form['user_name'], 'password' : hashed_password}
    )

def check_user(form):
    return data_manager.execute_select(
        """
        SELECT user_name
        FROM user_data
        WHERE user_name = %(user_name)s;
        """,
        {'user_name': form['user_name']}
    )

def get_password(login_username):
    return data_manager.execute_select(
        """
        SELECT password_hash
        FROM user_data
        WHERE user_name = %(user_name)s;
        """,
        {'user_name': login_username['user_name']}
    )

def check_login_password(login_data):
    query = data_manager.execute_select("""
    SELECT password_hash FROM user_data WHERE user_name = %(user_name)s
     """, {'user_name':login_data['user_name']})
    db_password = query
    if len(db_password) == 0:
        return False
    else:
        compare = hashing_utility.verify_password(login_data['password'],db_password[0]['password_hash'])
        print(compare)
        return compare

def check_login_user_name(login_data):
    query = data_manager.execute_select("""
     SELECT user_name FROM user_data WHERE user_name = '%s' 
    """ % (login_data['user_name']))

    compare_result = query
    if len(compare_result) == 0:
        return False
    else:
        return True

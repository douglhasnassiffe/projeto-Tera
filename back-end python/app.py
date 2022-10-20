from ctypes import pointer
from os import abort
from xmlrpc.client import DateTime
from flask import Flask, render_template
from flask import request
from database import cursor, connection
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app)


#CRUD BÁSICO DO USUÁRIO
@app.route("/user/<user_id>") #mostrar perfil do usuário 
def show_profile(user_id):
    body = request.json
    my_id = body["myID"]
    same_user = (my_id == user_id or user_id is None) #testa se o perfil é do próprio usuário
    cursor.execute(f"SELECT * FROM users WHERE users_id = {user_id}")
    user_profile = cursor.fetchone()
    if (user_profile is None):
        abort(404)
    cursor.execute(f"SELECT * FROM users_profile WHERE users_id = {user_id}") #query para listagem das informações adicionais do perfil
    user_extra_info = cursor.fetchall() 
    cursor.execute(f"SELECT users_id, nome FROM users u JOIN connections c ON u.users_id = c.friend_id  WHERE c.users_id = {user_id} LIMIT 6") #query para selecionar no máximo SEIS amigos para perfil do usuário
    user_connections = cursor.fetchall()
    cursor.execute(f"SELECT * FROM users_posts WHERE users_id = {user_id} ORDER BY post_date DESC LIMIT 4") #query para selecionar 4 ultimos posts do usuario
    user_posts = cursor.fetchall()
    return render_template("profile.html", user = user_profile, same_user = same_user, user_info = user_extra_info, posts = user_posts, connections =  user_connections)
    

@app.route("/user", methods=["POST"]) #criar perfil do usuário
def create_profile():
    body = request.json
    nome = body["sName"]
    s_nome = body["sSurName"]
    nasc = body["sDate"]
    email = body["sEmail"]
    senha = body["sPassword"] #PRECISA SER CRIPTOGRAFADA
    nome_art = body["sNick"]
    cidade = body["sCity"]
    profissao = body["sProfession"]
    bio = body["sBio"]
    cursor.execute(f"INSERT INTO users(nome, s_nome, nasc, cidade, nome_art, profissao, bio, email, senha) VALUES ({nome}, {s_nome}, {nasc}, {cidade}, {nome_art}, {profissao}, {bio}, {email}, {senha})")
    connection.commit()
    cursor.execute(f"SELECT * FROM users WHERE email LIKE {email}")
    usuario = cursor.fetchone()
    return render_template("profile.html", user = usuario)


@app.route("/user", methods=["PUT"]) #atualizar perfil do usuário
def update_profile():
    body = request.json
    user_id = body["myID"]
    nome = body["sName"]
    s_nome = body["sSurName"]
    nasc = body["sDate"]
    nome_art = body["sNick"]
    cidade = body["sCity"]
    profissao = body["sProfession"]
    bio = body["sBio"]
    cursor.execute(f"UPDATE users SET nome = {nome}, s_nome = {s_nome}, nasc = {nasc}, cidade = {cidade}, nome_art = {nome_art}, profissao = {profissao}, bio = {bio}) WHERE users_id = {user_id}")
    connection.commit()
    cursor.execute(f"SELECT * FROM users WHERE users_id = {user_id}")
    usuario = cursor.fetchone()
    return render_template("profile.html", user = usuario) #Retornar para página de edição (ainda não criada)

@app.route("/user", methods=["DELETE"]) #deletar conta do usuário
def delete_profile():
    body = request.json
    user_id = body["myID"]
    cursor.execute(f"DELETE FROM users WHERE users_id = {user_id}")
    connection.commit()
    return render_template("index.html")

#CRUD DAS INFORMAÇÕES EXTRAS DO PERFIL DO USUÁRIO (EXPERIENCIA, PREMIOS, FORMAÇÃO, MÚSICA(LINK))
#AS INFORMAÇÕES SÃO LISTADAS AO MOSTRAR O PERFIL DO USUÁRIO
@app.route("/profile", methods=["POST"]) #adicionar info ao perfil do usuário
def create_profile_info():
    body = request.json
    user_id = body["myID"]
    info_type = body["iType"]
    info_text = body["iText"]
    cursor.execute(f"INSERT INTO users_profile(users_id, profile_type, profile_info) VALUES ({user_id}, {info_type}, {info_text}")
    connection.commit()
    show_profile(user_id)


@app.route("/profile", methods=["DELETE"]) #deletar info ao perfil do usuário
def delete_profile_info():
    body = request.json
    user_id = body["myID"]
    info_id = body["iID"]
    cursor.execute(f"DELETE FROM users_profile WHERE users_id = {user_id} AND users_profile_id = {info_id}")
    connection.commit()
    show_profile(user_id)


@app.route("/profile", methods=["PUT"]) #editar info ao perfil do usuário
def update_profile_info():
    body = request.json
    user_id = body["myID"]
    info_id = body["iID"]
    info_text = body["iText"]
    cursor.execute(f"UPDATE  users_profile SET profile_info = {info_text} WHERE users_id = {user_id} AND users_profile_id = {info_id}")
    connection.commit()
    show_profile(user_id)

#CRUD DAS POSTAGENS DO USUÁRIO
#NÃO É PERMITIDO EDITAR POSTAGENS
@app.route("/timeline") #mostra postagens do usuário e amigos ordenadas pela data de postagem
def show_timeline():
    body = request.json
    user_id = body["myID"]
    cursor.execute(f"SELECT * FROM users_profile WHERE users_id = {user_id}")
    user = cursor.fetchone()
    cursor.execute(f"SELECT * FROM user_posts p JOIN user_connections c ON p.users_id = c.friend_id WHERE c.users_id = {user_id} OR p.users_id = {user_id} ORDER BY post_date DESC")
    post_list = cursor.fetchall()
    return render_template("feed.html", user = user, post_list = post_list)

@app.route("/post", methods=["POST"]) #postagem
def user_post():
    body = request.json
    user_id = body["myID"]
    post_date = datetime.datetime.now()
    post_text = body["pText"]
    post_type = body["pType"]
    cursor.execute(f"INSERT INTO users_posts(users_id, post_date, post_text, post_type) VALUES ({user_id}, {post_date}, {post_text}, {post_type}")
    connection.commit()
    show_timeline()


@app.route("/post/<post_id>", methods=["DELETE"]) #postagem
def delete_post(post_id):
    body = request.json
    user_id = body["myID"]
    cursor.execute(f"DELETE FROM users_posts WHERE users_id = {user_id} AND posts_id = {post_id}")
    connection.commit()
    show_timeline()

#CRUD DAS CONEXÕES DOS USUÁRIOS
#MÉTODO PUT NÃO SE APLICA

@app.route("/connect") #mostra todas as conexões do usuário
def show_connections():
    body = request.json
    user_id = body["myID"]
    cursor.execute(f"SELECT * FROM users u JOIN connections c ON u.users_id = c.friend_id WHERE c.users_id = {user_id} ORDER BY connection_date DESC")
    user_connections = cursor.fetchall()
    return ("connections.html", user_connections)

@app.route("/connect/<friend_id>", methods=["POST"]) #cria conexão entre usuários
def connect_users(friend_id):
    body = request.json
    user_id = body["myID"]
    c_date = datetime.datetime.now()
    cursor.execute(f"INSERT INTO connections(users_id, friend_id, connection_date) VALUES ({user_id},{friend_id},{c_date}")
    connection.commit()
    show_profile(friend_id)

@app.route("/connect/<friend_id>", methods=["DELETE"]) #desfaz conexão entre usuários
def disconnect_users(friend_id):
    body = request.json
    user_id = body["myID"]
    cursor.execute(f"DELETE FROM connections WHERE users_id={user_id} AND friend_id = {friend_id}")
    connection.commit()
    show_profile(friend_id)

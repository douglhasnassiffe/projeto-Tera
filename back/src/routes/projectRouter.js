import projectController from "../controllers/projectController";
import express from "express";
import authMiddleware from "../middleware/authMiddleware";
//rotas que necessitam de autenticação de token do usuário

const router = express.Router();

router.use(authMiddleware);

//adicionar rotas que necessitam de validação de token

//Funcionalidades do usuário

router.put('/', projectController.updateUser);

router.delete('/', projectController.deleteUser);

//Funcionalidades de postagem do usuário

/*
router.get('/', projectController.getAllPosts); //listagem dos posts do usuário, não precisa parametros

router.post('/', projectController.createPost); //postagem do usuario

router.post('/:postId', projectController.createComment); //comentar num post

router.delete('/:postId', projectController.deletePost); //Apagar um post


*/
//FUncionalidades de pesquisa do usuário
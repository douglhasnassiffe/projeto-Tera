import User from "../models/User.js"
import Post from "../models/Post"
import Comment from "../models/Comment"


//ATUALIZAR E APAGAR USUARIO - NECESSITA DE AUTENTICAÇÃO PRÉVIA
//QUALQUER OUTRA FUNCIONALIDADE DA PÁGINA TAMBÉM NECESSITA DE AUTENTICAÇÃO, POR SE TRATAR DE REDE SOCIAL (POSTAGEM, COMENTÁRIO, ETC)

class ProjectController {

    static updateUser = async (req, res) => {

        try{

           const { name, surName, email, birthDate, city, nickName, profession, bio } = req.body;

            const user = await User.findByIdAndUpdate(req.userId, {name, surName, email, birthDate, city, nickName, profession, bio}, { new:true });

            res.send({ user });

        }catch(err) {

            return res.status(400).send({ error: 'Error updating user'})

        }



    }

    static deleteUser = async (req, res) =>{
        try{

            const user = await User.findByIdAndRemove(req.userId);

            return res.send({ user })

        }catch(err) {

            return res.status(400).send({ error: 'Error deleting user'})
            
        }

    }

  /*
    static createPost = async (req, res) => {

        try{

            const post = await Post.create({ ...req.body, user: req.userId});

        } catch (err){
            return res.status(400).send({ error: 'Error creating post'})
        }

    }
    */
}


export default ProjectController;

// find().populate(user) vai carregar a info dentro 
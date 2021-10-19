import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
    name:{type: String, require:true},
    email:{type: String, require:true, unique: true},
    password:{type: String, require:true},
    isAdmin: {type: Boolean, default:false, require: true},
    //perfil: {type: Boolean, default:false, require: true},
    /*isAdmin */
},
{
    timestamps: true,
}
);
const Usuario = mongoose.model('Usuario',usuarioSchema);

export default Usuario;
import mongoose from 'mongoose';

const licoresSchema = new mongoose.Schema({
    name: {type: String, required:true ,unique: true},
    image: {type: String, required:true },
    brand: {type: String, required:true },
    category: {type: String, required:true },
    descripcion: {type: String, required:true },
    price: {type: Number, required:true },
    enStock: {type: Number, required:true },
    rating: {type: Number, required:true },
    numReviews: {type: Number, required:true},   
},
{
    timestamps: true,
}
);

const Licor = mongoose.model('Licor', licoresSchema);
export default Licor;

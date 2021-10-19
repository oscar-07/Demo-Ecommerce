import bcrypt from 'bcrypt';
//objeto producto
const data ={
    usuarios:[
        {
            name: 'Jose',
            email: 'osito@ejemplo.com',
            password: bcrypt.hashSync('1234',8),
            isAdmin: true,
        },
        {
            name: 'Maria',
            email: 'arriba@ejemplo.com',
            password: bcrypt.hashSync('1234',8),
            isAdmin: false,
        },

    ],

    licores:[
        {
         //   _id:'1',                    //id
            name: 'Absolut ',           //nombre
            category: 'Vodka',          //categoria
            image: '/images/absolut.jpg',  //ruta imagen
            price: 550,               //precio
            enStock: 3,             //inventario
            brand: 'Absolut Vodka',  //marca
            rating: 4.8,        //ranking
            numReviews: 10,   //opiniones
            descripcion: 'Alta Calidad',
        },
        {
         //   _id:'2',                    //id
            name: 'American ',           //nombre
            category: 'Vodka',          //categoria
            image: '/images/american.jpg',  //ruta imagen
            price: 420,               //precio
            enStock: 5,             //inventario
            brand: 'Members Mark',  //marca
            rating: 4.1,        //ranking
            numReviews: 10,   //opiniones
            descripcion: 'Alta Calidad',
        },
        {
         //   _id:'3',                    //id
            name: 'Grey goose ',           //nombre
            category: 'Vodka',          //categoria
            image: '/images/greygoose.jpg',  //ruta imagen
            price: 480,               //precio
            enStock: 6,             //inventario
            brand: 'Vodka Grey Goose',  //marca
            rating: 4.8,        //ranking
            numReviews: 10,   //opiniones
            descripcion: 'Alta Calidad',
        },
        {
         //   _id:'4',                    //id
            name: 'Oso negro ',           //nombre
            category: 'Vodka',          //categoria
            image: '/images/osonegro.jpg',  //ruta imagen
            price: 120,               //precio
            enStock: 0,             //inventario
            brand: 'OSO NEGRO',  //marca
            rating: 5,        //ranking
            numReviews: 10,   //opiniones
            descripcion: 'Alta Calidad',
        },
        {
         //   _id:'5',                    //id
            name: 'Red Label',           //nombre
            category: 'Whisky',          //categoria
            image: '/images/red_label.jpg',  //ruta imagen
            price: 440,               //precio
            enStock: 1,             //inventario
            brand: 'johnnie walker',  //marca
            rating: 4.8,        //ranking
            numReviews: 90,   //opiniones
            descripcion: 'Alta Calidad',
        },
        {
         //   _id:'6',                    //id
            name: 'Bacardi',           //nombre
            category: 'Ron',          //categoria
            image: '/images/bacardi.jpg',  //ruta imagen
            price: 990,               //precio
            enStock: 3,             //inventario
            brand: 'Carta Blanca',  //marca
            rating: 3.5,        //ranking
            numReviews: 110,   //opiniones
            descripcion: 'Alta Calidad',
        },
    ],
};
export default data;
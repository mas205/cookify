const INITIAL_STATE = [
    {
        id: 0,
        name: "Tortafritas",
        ingredientes: ["harina", "agua", "grasa", "sal"],
        descripcion: "Rica torta salada tipica de Uruguay",
        clientId: "",
        public: true,
        imgUrl: "http://4.bp.blogspot.com/_vBEy5j-4FpI/TUNJ0UC5qLI/AAAAAAAAAJY/Sg7gHL-ca6Q/s1600/%253D%253Futf-8%253FB%253FSU1HMDA4MDAtMjAxMTAxMjgtMTkyMy5qcGc%253D%253F%253D-741367"
    },
    {
        id: 1,
        name: "Dulce de leche",
        ingredientes: ["azucar", "bicarbonato de sodio", "leche"],
        descripcion: "Dulce tipico Uruguayo",
        clientId: "",
        public: true,
        imgUrl: "https://assets.epicurious.com/photos/5761cff89644034b690ea921/2:1/w_1260%2Ch_630/homemade-dulce-de-leche.jpg"
    },
    {
        id: 2,
        name: "Tira de Asado",
        ingredientes: ["tira de asado", "sal"],
        descripcion: "Corte protagonista del famoso asado Uruguayo",
        clientId: "",
        public: true,
        imgUrl: "http://www.necochea.gov.ar/wp-content/uploads/2019/02/Asado-al-asador.jpg"
    }
];

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "ADD_DISH":
            return [...state, {...action.payload, id: state[state.length-1].id+1}];
        case "EDIT_DISH":
            return state.map((dish) => {
                if (dish.id === action.payload.id) {
                    return action.payload
                }
                return dish
            });
        case "DELETE_DISH":
            return state.filter(dish => dish.id !== action.payload.id);
        default:
            return state;
    };
};
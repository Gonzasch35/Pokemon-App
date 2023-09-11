export const validation = (property, value, errors, setErrors) => {

    switch (property) {
        case 'name':

            if(value.length  < 2 || value.length > 20){
                return setErrors({...errors, name:'El nombre debe tener 2 y 20 caracteres'})
            }else if(/\d/.test(value)) {
                return setErrors({...errors, name: 'El nombre no puede contener numeros'})
            } else return setErrors({...errors, name: ''})

        case 'hp':

            if(value < 1 || value > 999) {
               return setErrors({...errors, hp: 'Debes colocar un numero entre 1 y 999'})
            } else return setErrors({...errors, hp: ''})

        case 'attack':

            if(value < 1 || value > 999) {
               return setErrors({...errors, attack: 'Debes colocar un numero entre 1 y 999'})
            } else return setErrors({...errors, attack: ''})

        case 'defense':

            if(value < 1 || value > 999) {
               return setErrors({...errors, defense: 'Debes colocar un numero entre 1 y 999'})
            } else return setErrors({...errors, defense: ''})


        case 'types': 
            if(value.length === 0) {
                setErrors({...errors, types: 'Debes seleccionar al menos un tipo'})
            } else setErrors({...errors, types: ''})
        default:
            break;
    }
}





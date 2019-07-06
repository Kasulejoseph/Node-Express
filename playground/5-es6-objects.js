// object property short hand

const name ='kasule'
const myAge = 24

const user = {
    name,
    age: myAge,
    title: 'this a title'
}

console.log(user)

// destructuring

const product = {
    price: {
        first: 'hello',
        second: 'world'
    },
    stock: undefined,
    label: {
        new: 'label is new'
    },

}
// can update the key while destructig
// can provide a default value 
const {price:new_price, label, rating=5} = product

console.log(new_price, label, rating)



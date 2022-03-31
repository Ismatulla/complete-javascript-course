'use strict';

// const bookings = []

// const createBooking = function(flightNum, numPassengers, price) {
//     const booking = {
//         flightNum,
//         numPassengers,
//         price
//     }
//     console.log(booking);
//     booking.push(booking)
// }
// createBooking('LH123')
// function returning functon 
const greet = function(greeting) {
    return function(name) {
        console.log(`${greeting} ${name}`);
    }
}

const greeterHey = greet('Hey')
greeterHey('Ismatulla')
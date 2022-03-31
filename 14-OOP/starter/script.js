'use strict';

const Car = function(make, speed) {
    this.make = make
    this.speed = speed
    console.log(`${this.make} is going at ${this.speed} km/h`);
}
const bmw = new Car("BMW", 120)
const mercedes = new Car("Mercedes", 95)
Car.prototype.accelerate = function() {
    console.log(`${this.make} speed is ${this.speed + 10} km/h`);
}
bmw.accelerate()
mercedes.accelerate()
Car.prototype.break = function() {
    console.log(this.speed - 5);
}
bmw.break()
mercedes.break()
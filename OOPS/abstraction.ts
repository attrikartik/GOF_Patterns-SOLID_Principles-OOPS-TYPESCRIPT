interface Shape{
    area():Number;
    perimeter():Number;
}

class Circle implements Shape{
    constructor(private radius:Number){}

    area(): Number {
        return Math.PI * Math.pow(this.radius.valueOf(), 2);
    }

    perimeter(): Number {
        return 2 * Math.PI * this.radius.valueOf();
    }
}

class Rectangle implements Shape{
    constructor(private width:Number, private height:Number){}

    area(): Number {
        return this.width.valueOf() * this.height.valueOf();
    }

    perimeter(): Number {
        return 2 * (this.width.valueOf() + this.height.valueOf());
    }
}


// below 2 functions demonstrate abstraction by hiding the implementation details
function calculateTotalArea(shape: Shape): Number {
    return shape.area();
}

function calculateTotalPerimeter(shape: Shape): Number {
    return shape.perimeter();
}


// client code only interacts with the abstraction i.e exposed by the functions
let circle = new Circle(5);
let rectangle = new Rectangle(4, 6);

console.log("Circle Area: ", calculateTotalArea(circle).toFixed(2));
console.log("Circle Perimeter: ", calculateTotalPerimeter(circle).toFixed(2));

let rectangleArea = calculateTotalArea(rectangle);
let rectanglePerimeter = calculateTotalPerimeter(rectangle);

console.log("Rectangle Area: ", rectangleArea);
console.log("Rectangle Perimeter: ", rectanglePerimeter);
/*--------------------------------------------------------------------------------*\
 | MIT License                                                                    |
 |                                                                                |
 | Copyright (c) 2017 Gustavo Takachi Toyota                                      |
 |                                                                                |
 | Permission is hereby granted, free of charge, to any person obtaining a copy   |
 | of this software and associated documentation files (the "Software"), to deal  |
 | in the Software without restriction, including without limitation the rights   |
 | to use, copy, modify, merge, publish, distribute, sublicense, and/or sell      |
 | copies of the Software, and to permit persons to whom the Software is          |
 | furnished to do so, subject to the following conditions:                       |
 |                                                                                |
 | The above copyright notice and this permission notice shall be included in all |
 | copies or substantial portions of the Software.                                |
 |                                                                                |
 | THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR     |
 | IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,       |
 | FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE    |
 | AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER         |
 | LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,  |
 | OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE  |
 | SOFTWARE.                                                                      |
\*--------------------------------------------------------------------------------*/

function Vec2(a, b) {
    if (!(this instanceof Vec2))
        return new Vec2(a, b);
    
    if (a === undefined) {
        this.x = 0;
        this.y = 0;
    } else if (typeof b === "number") {
        this.x = a;
        this.y = b;
    } else if (typeof a === "number") {
        this.x = a;
        this.y = a;
    } else {
        this.x = a.x;
        this.y = a.y;
    }
}

// Operation functions
Vec2.prototype.add = function (v) {
    return Vec2(this.x + v.x, this.y + v.y);
};
Vec2.prototype.sub = function (v) {
    return Vec2(this.x - v.x, this.y - v.y);
};
Vec2.prototype.mult = function (v) {
    return Vec2(this.x * v.x, this.y * v.y);
};
Vec2.prototype.div = function (v) {
    return Vec2(this.x / v.x, this.y / v.y);
};

// Common functions
Vec2.prototype.neg = function () {
    return Vec2(-this.x, -this.y);
};
Vec2.prototype.abs = function () {
    return Vec2(Math.abs(this.x), Math.abs(this.y));
};
Vec2.prototype.sign = function () {
    return Vec2(this.x < 0 ? -1 : 1, this.y < 0 ? -1 : 1);
};
Vec2.prototype.floor = function () {
    return Vec2(Math.floor(this.x), Math.floor(this.y));
};
Vec2.prototype.ceil = function () {
    return Vec2(Math.ceil(this.x), Math.ceil(this.y));
};
Vec2.prototype.fract = function () {
    return Vec2(Math.abs(this.x % 1), Math.abs(this.y % 1));
};
Vec2.prototype.mod = function (v) {
    return Vec2(this.x % v.x, this.y % v.y);
};
Vec2.prototype.min = function (v) {
    return Vec2(Math.min(this.x, v.x), Math.min(this.y, v.y));
};
Vec2.prototype.max = function (v) {
    return Vec2(Math.max(this.x, v.x), Math.max(this.y, v.y));
};
Vec2.prototype.clamp = function (min, max) {
    return Vec2(
        Math.min(Math.max(this.x, min.x), max.x),
        Math.min(Math.max(this.y, min.y), max.y)
    );
};
Vec2.prototype.mix = function (v, weight) {
    return Vec2(this.x + (v.x - this.x) * weight, this.y + (v.y - this.y) * weight);
};
Vec2.prototype.step = function (edge) {
    return Vec2(this.x < edge.x ? 0 : 1, this.y < edge.y ? 0 : 1);
};

// Geometric functions
Vec2.prototype.dot = function (v) {
    return this.x * v.x + this.y * v.y;
};
Vec2.prototype.lenSqr = function () {
    return this.dot(this);
};
Vec2.prototype.len = function () {
    return Math.sqrt(this.lenSqr());
};
Vec2.prototype.distSqr = function (v) {
    return this.sub(v).lenSqr();
};
Vec2.prototype.dist = function (v) {
    return this.sub(v).len();
};
Vec2.prototype.normal = function () {
    return this.div(this.len());
};
Vec2.prototype.faceforward = function (incident, reference) {
    return reference.dot(incident) < 0 ? Vec2(this) : this.neg();
};
Vec2.prototype.reflect = function (normal) {
    return this.sub(Vec2(2).mult(normal.dot(this)).mult(normal));
};
Vec2.prototype.refract = function (normal, eta) {
    var k = 1 - eta * eta * (1 - normal.dot(this) * normal.dot(this));
    if (k < 0)
        return Vec2();
    else
        return Vec2(eta).mult(this).sub((Vec2(eta).mult(normal.dot(this)).
            add(Vec2(Math.sqrt(k)))).mult(normal));
};

// Exponential functions
Vec2.prototype.sqrt = function () {
    return Vec2(Math.sqrt(this.x), Math.sqrt(this.y));
};
Vec2.prototype.sqr = function () {
    return this.mult(this);
};
Vec2.prototype.pow = function (exponent) {
    return Vec2(Math.pow(this.x, exponent), Math.pow(this.y, exponent));
};
Vec2.prototype.exp = function (exponent) {
    return Vec2(Math.exp(this.x, exponent), Math.exp(this.y, exponent));
};
Vec2.prototype.exp2 = function (exponent) {
    return Vec2(Math.exp2(this.x, exponent), Math.exp2(this.y, exponent));
};
Vec2.prototype.log = function (argument) {
    return Vec2(Math.log(this.x, argument), Math.log(this.y, argument));
};
Vec2.prototype.log2 = function (argument) {
    return Vec2(Math.log2(this.x, argument), Math.log2(this.y, argument));
};

// Angle functions
Vec2.prototype.sin = function () {
    return Vec2(Math.sin(this.x), Math.sin(this.y));
};
Vec2.prototype.cos = function () {
    return Vec2(Math.cos(this.x), Math.cos(this.y));
};
Vec2.prototype.tan = function () {
    return Vec2(Math.tan(this.x), Math.tan(this.y));
};
Vec2.prototype.asin = function () {
    return Vec2(Math.asin(this.x), Math.asin(this.y));
};
Vec2.prototype.acos = function () {
    return Vec2(Math.acos(this.x), Math.acos(this.y));
};
Vec2.prototype.atan = function () {
    return Vec2(Math.atan(this.x), Math.atan(this.y));
};
Vec2.prototype.angle = function () {
    return Math.atan2(this.y, this.x);
};
Vec2.prototype.rotate = function (angle) {
    return Vec2(
        this.x * Math.cos(angle) - this.y * Math.sin(angle),
        this.x * Math.sin(angle) + this.y * Math.cos(angle)
    );
};

// Comparison functions
Vec2.prototype.equal = function (v) {
    return this.x === v.x && this.y === v.y;
};
Vec2.prototype.notEqual = function (v) {
    return this.x !== v.x || this.y !== v.y;
};
Vec2.prototype.less = function (v) {
    return this.x < v.x && this.y < v.y;
};
Vec2.prototype.lessEqual = function (v) {
    return this.x <= v.x && this.y <= v.y;
};
Vec2.prototype.greater = function (v) {
    return this.x > v.x && this.y > v.y;
};
Vec2.prototype.greaterEqual = function (v) {
    return this.x >= v.x && this.y >= v.y;
};
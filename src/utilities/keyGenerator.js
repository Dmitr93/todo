export default function keyGenerator(min = 1, max = 1000) {
    return Math.floor(Math.random() * ( Math.floor(max) - Math.ceil(min))) + min + Date.now();
};

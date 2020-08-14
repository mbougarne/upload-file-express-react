module.exports = () => {

    let randomNumber = Math.random().toString()
    let randomWithDate = randomNumber.slice(randomNumber.indexOf('.') + 1) + new Date().getTime()

    return randomWithDate;
}
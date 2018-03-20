var currencies = ["EUR", "GBP", "USD"]
var rates = {}

function getRates() {
    $.ajax({
        url: 'http://data.fixer.io/api/latest?access_key=20ac94f56c25a616cb9d6e5c6e678e3c',
        dataType: 'jsonp',
        success: function(json) {
            rates.GBP = json.rates.GBP
            rates.USD = json.rates.USD
            callback()
        }
    })
}

function showConverter() {
    $("#converter").show()
}

function currencyOrder () {
    $("#to").html()
    $("#converted").text("")

    // Get selected from currency
    var selected = $("#from").val()

    if (selected) {
        var newArray = currencies.slice() // Copy array
        var index = newArray.indexOf(selected) // Find from currency
        newArray.splice(index, 1) // Remove it so it wont show on to

        // Print to currencies
        for (var i = 0; i < newArray.length; i++) {
            var _currency =newArray[i]
            var html = '<option value="'+_currency+'">'+_currency+'</option>'
            $("#to").append(html)
        }
    }
}

function convert(from, to, amount) {
    if (from === to) return amount
    else if (from === "EUR") return amount * rates[to]
    else if (to === "EUR") return amount / rates[from]
    else return amount / rates[from] * rates[to]
}

function convertAmount() {
    var from = $("#from").val()
    var to = $("#to").val()
    var amount = $("#amount").val()
    if (!from || !to) return
    var converted = convert(from, to, amount)
    $("#converted").text(converted)
}

function showDiv(){
    document.getElementById('result').style.display ="block";
}

$("#from").on("change", currencyOrder)
$("#to").on("change", convertAmount)
$("#amount").on("input", convertAmount)


$(document).ready(getRates(showConverter))

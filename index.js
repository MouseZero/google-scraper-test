const casper = require('casper').create(
  {
    pageSettings: {
      userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.59 Safari/537.36"
    }
  }
)

casper.start('http://www.google.com/', function () {
  this.fill('form', {q:'hello world'}, true)
})

casper.waitForSelector('.g > .rc > .r', function () {
  const result = this.evaluate(function () {
    var targetEl = document.querySelectorAll('.g > .rc > .r > a')
    var items = []
    for (var i=0; i<targetEl.length; i++){
      items.push({
        url: targetEl[i].getAttribute('href'),
        text: targetEl[i].text
      })
    }
    return JSON.stringify(items)
  })
  console.log(result)
})

casper.run()


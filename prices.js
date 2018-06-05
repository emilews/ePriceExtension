chrome.runtime.onInstalled.addListener(function () {
    main()
});

  function callBack(){
    console.log("Installed extension.")
  }


  
async function main(){
  fetch("https://api.coinmarketcap.com/v2/ticker/2137/").then(function(resp){
    return resp.text()
  }).then(function(data){
    response = JSON.parse(data)
    var percentage = parseFloat(response.data.quotes.USD.percent_change_1h)
    var price = response.data.quotes.USD.price
    var rank = response.data.rank
    if(percentage < 0){
      var action = "down"
    }
    if(percentage == 0){
        var action = "the same"
    }
    if(percentage > 0){
        var action = "up"
    }
    var info = {
        action: action,
        percentage: percentage,
        price: price,
        rank: rank
    }
    notify(info)
    window.setTimeout(main, 300000 )
})
}
  
async function notify(info){
  var action = info.action
  var percentage = info.percentage
  var price = info.price
  var rank = info.rank
  if(action === "the same"){
    chrome.notifications.create("01", {
      type: "basic",
      iconUrl: "etn.png",
      title: "Electroneum is " + action,
      message: "Rank: " + rank + "\n" + "Price: $" + price + "USD\n" + "Price is " + action + " since last hour"
     }, creationCallback)
     await sleep(1000)
  }else{
    chrome.notifications.create("01", {
      type: "basic",
      iconUrl: "etn.png",
      title: "Electroneum is " + action,
      message: "Rank: " + rank + "\n" + "Price: $" + price + "USD\n" + "Price is " + action + " by " + percentage + "% since last hour"
    }, creationCallback)
    await sleep(1000)
  }

}


function creationCallback(){
    console.log("")
}
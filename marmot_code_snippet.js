//initial variables
let imageLinksArray = [];
let orderTotal;
let numItems;
let appended;
let URL;

// get carts link
URL = document.querySelector('.minicart-link').href
numItems = document.querySelector('.minicart-quantity').innerText
//web scrape the cart page to get data
$.get(URL, function(response) {
  const respObj = $(response)
  orderTotal = respObj.find('.order-value')[0].innerText
  // find cartItems with class names 'cart-row' which are cartItems added to cart
  let cartItems = respObj.find('.cart-row')
  //itterate through the cartItems and get item images
    for (let i = 0; i < cartItems.length; i++){
      imageLinksArray.push($(cartItems[i]).find('.item-image').find('img')[0].src.replace('$thumb$',''))
    }
}).done(function() {
  // main function after web
  // set initial append value to false
  appended = false
  $(document).scroll(function(e){
    //check to see if scroll is past 90% of document size and if not already appended
    if (($(window).scrollTop() >= ($(document).height() - $(window).height())*0.9) && !appended){
      let alreadyAppended = document.querySelector('.mormot-challenge-overlay-parent')
        // create the main div
          const wrapperDiv = document.createElement('div')
            wrapperDiv.id = 'mormot-challenge-overlay-wrapper'
            $(wrapperDiv).css({
              'position': 'fixed',
              'background-color': 'rgba(0, 0, 0, 0.80)',
              'z-index': 4,
              'height': '100%',
              'width': '100%',
              'text-align': 'center'
            })


          const div = document.createElement('div')
            div.id = 'mormot-challenge-overlay-parent'

          const headerDiv = document.createElement('div')
            headerDiv.id = 'mormot-challenge-overlay-header',
            headerDiv.innerHTML = '<h1 style="font-size:30px; float: left;">Your Cart<h1>'
            $(headerDiv).css({
              'background-color': 'white',
              'z-index': 4,
              'padding-bottom': '8%',
              'width': '100%',
              'border-bottom': '5px solid red'
            })

        //appending main div content using functions below
          div.append(headerDiv, imagesDiv(imageLinksArray), cardOrderDetailsDiv(numItems, orderTotal), purchaseBtn(), closeBtn())
            $(div).css({
              'position': 'fixed',
              'background-color': 'white',
              'z-index': 4,
              'width': '50%',
              'text-align': 'center',
              'padding': `2%`
            })
            wrapperDiv.append(div)
          document.querySelector('#wrapper').prepend(wrapperDiv)
          appended = true
          div.style.marginLeft = `${(((parseInt($( window ).width()) - parseInt(div.clientWidth)))/2)}px`
          div.style.marginTop = `${(((parseInt($( window ).height()) - parseInt(div.clientHeight)))/2)}px`
    }
  })
})

// functions that return elements inside of main div with id 'mormot-challenge-overlay-parent'
function cardOrderDetailsDiv(numItems, orderTotal) {
  const div = document.createElement('div')
    $(div).css({
      'width': '100%',
    })
    div.innerHTML = `<h2 style='color: black; padding-bottom: 5px; font-size: 15px;'>Total Items: ${numItems}<h2> <h2 style='color: black; padding-bottom: 5px; font-size: 15px'><b>Estimated Total:</b> ${orderTotal}<h2> `
  return div
}

function imagesDiv(imageLinksArray) {
  const div = document.createElement('div')
    $(div).css({
      'text-align': 'center',
      'display': 'flex',
      'justify-content': 'center',
      'height': '50%',
      'width': '100%',
      'padding-top': '2%'
    })
  imageLinksArray.forEach((img) => {
    const image = document.createElement('img')
      image.src = img
      $(image).css({
        // 'margin': '4%',
        'border': `2px`,
        'text-align': 'center',
        'border-style': 'solid',
        'border-color': `grey`,
        'height': '40%',
        'margin': '20px',
        'width':'40%'
      })
      div.append(image)
    })
  return div
}

function closeBtn() {
  let button = document.createElement('BUTTON')
    button.innerText = 'CLOSE'
    button.className = 'mixt-button variant-4'
    $(button).css({
      'background-color': 'white',
      'vertical-align': 'text-bottom',
      'border': '2px solid #000'
    })
  // what to do on click and hover
    $(button).hover(function() {
      $(button).css({
        'background-color': 'rgb(187,38,26)'
      })
    }, function() {
      $(this).css('background-color', '')
    });

    $(button).click(function() {
      $('#mormot-challenge-overlay-wrapper').remove()
      appended = false
    })
  return button
}

function purchaseBtn() {
  let button = document.createElement('a')
    button.innerText = 'PURCHASE'
    button.className = 'mixt-button variant-4 challenge'
    $(button).css({
      'background-color': 'lightpink',
      'color': 'black',
      'vertical-align': 'text-bottom',
      'margin-right': '5px',
      'border': '2px solid #000'
    })
  // what to do on click and hover
    $(button).hover(function() {
      $(button).css({
        'background-color': 'rgb(187,38,26)'
      })
    }, function() {
    $(this).css('background-color', 'lightpink')
      })

    $(button).click(function() {
      window.location.href=URL
    })
  return button
}

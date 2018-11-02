var desserts = [
  {name: "Devil's Food Cake", price: "40", image: "http://www.notyourmotherscookbook.com/images/138494lrg.jpg"},
  {name: "French Macarons", price: "30", image: "https://www.cocoandbean.com.au/wp-content/uploads/2017/05/IMG_9155-e1535962166683.jpg"},
  {name: "Chocolate Cupcakes", price: "15", image: "https://chocolatecoveredkatie.com/wp-content/uploads/2018/03/vegan-chocolate-cupcakes.jpg"},
  {name: "Profiteroles", price: "20", image: "https://thecrumbykitchen.com/wp-content/uploads/2018/02/Strawberry-Ros%C3%A9-Profiteroles-5-684x1025.jpg"},
  {name: "Eclairs", price: "35", image: "https://www.epicurus.com/food/recipes/wp-content/uploads/2012/02/Eclairs.jpg"},
  {name: "Creme Brulee", price: "45", image: "https://static01.nyt.com/images/2017/12/13/dining/15COOKING-CREME-BRULEE1/15COOKING-CREME-BRULEE1-articleLarge.jpg"},
  {name: "Soft Baked Chocolate Chip Cookies", price: "12", image: "http://www.milkandcardamom.com/wp-content/uploads/2017/06/Chocolate-Chip-Cookies-1-480x640.jpg"}
];

var cart = localStorage.getItem('cart') 
  ? JSON.parse(localStorage.getItem('cart')) :
  {
    items: [],
    total: 0
  };

localStorage.setItem('cart', JSON.stringify(cart)); //need to stringify or else shows as object; not the actual names/values

$(document).ready(function(){
  desserts.forEach(function(dessert,index){ //products page
    var colDiv = $('<div>').addClass('col-md-4');
    var cardDiv = $('<div>').addClass('card');//addClass and attr(Attribute) do the same thing
    
    var dessertImage = $('<img>').addClass("img-responsive");
    dessertImage.attr('src', dessert.image);
    cardDiv.append(dessertImage);
    
    var cardBody = $('<div>').addClass('card-body');
    cardDiv.append(cardBody);
    
    var dessertTitle = $('<h3>').addClass('card-title').text(dessert.name);
    cardBody.append(dessertTitle);
    
    var dessertPrice = $('<p>').addClass('card-text').text("$" + dessert.price);
    cardBody.append(dessertPrice);
    
    var addToCartButton = $('<button>').addClass('btn btn-info').text('Add to Cart').attr('id',index);
    addToCartButton.click(function(event){
      //console.log(event.target.id);
      var cartItem = desserts[event.target.id];
      cartItem.quantity = 1;
      cart.items.push(cartItem);
      cart.total = cart.items.length * cartItem.price;
      $("#total").text(cart.total);
      localStorage.setItem('cart', JSON.stringify(cart)); //when add to cart button is clicked, saved to local storage, so when you refresh the data is still there
    });
    cardBody.append(addToCartButton);
    
    colDiv.append(cardDiv);
    $('#desserts-row').append(colDiv);
  });
  
  $("#total").text(cart.total);
  
  cart.items.forEach(function(item, index){
    var colDiv = $('<div>').addClass('col-md-4');
  
    var cardDiv = $('<div>').addClass('card');//addClass and attr(Attribute) do the same thing
    
    var dessertImage = $('<img>').addClass("img-responsive");
    dessertImage.attr('src', item.image);
    cardDiv.append(dessertImage);
    
    var cardBody = $('<div>').addClass('card-body');
    cardDiv.append(cardBody);
    
    var productTitle = $('<h3>').addClass('card-title').text(item.name);
    cardBody.append(productTitle);
    
    var productPrice = $('<p>').addClass('card-text').text("$"+item.price + " x ");
    cardBody.append(productPrice);
    
    var noOfProduct = $('<input type=number id=numOfProduct value=1 min=0>').bind('keyup mouseup', function(){
      item.quantity = $('#numOfProduct').val();
    });
    productPrice.append(noOfProduct);
    
    var addNewProduct =  $('<button>').addClass('btn btn-info').text('Add').attr('id',index);
    addNewProduct.click(function(event){
      for (var i=1; i<item.quantity; i++){
        var cartItem = desserts[event.target.id];
        cart.items.push(cartItem); 
      }
      
      cart.total = cart.total + (item.price * (item.quantity-1));
      
      $('#itemNo').text(cart.items.length);
      $('#total').text(cart.total);
      localStorage.setItem('cart', JSON.stringify(cart));
    });
    cardBody.append(addNewProduct);
    
    colDiv.append(cardDiv);
    $('#cart-row').append(colDiv);
  });
  
  $("#showCartBtn").click(function(){
    $("#cart").show();
    $("#menu-items").hide();
    $("#showCartBtn").hide();
  });
  
  $("#close").click(function(){
    $("#cart").hide();
    $("#menu-items").show();
    $("#showCartBtn").show();
  });

});

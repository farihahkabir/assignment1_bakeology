var desserts = [
  {name: "Devil's Food Cake", price: "400 (per slice)", image: "http://www.notyourmotherscookbook.com/images/138494lrg.jpg"},
  {name: "French Macarons", price: "1000 (per box)", image: "https://www.cocoandbean.com.au/wp-content/uploads/2017/05/IMG_9155-e1535962166683.jpg"},
  {name: "Chocolate Cupcakes", price: "150 (per pair)", image: "https://chocolatecoveredkatie.com/wp-content/uploads/2018/03/vegan-chocolate-cupcakes.jpg"},
  {name: "Profiteroles", price: "700 (per 10 pieces)", image: "https://thecrumbykitchen.com/wp-content/uploads/2018/02/Strawberry-Ros%C3%A9-Profiteroles-5-684x1025.jpg"},
  {name: "Eclairs", price: "700 (per two)", image: "https://www.epicurus.com/food/recipes/wp-content/uploads/2012/02/Eclairs.jpg"},
  {name: "Creme Brulee", price: "850 (per two)", image: "https://static01.nyt.com/images/2017/12/13/dining/15COOKING-CREME-BRULEE1/15COOKING-CREME-BRULEE1-articleLarge.jpg"},
  {name: "Meringues", price: "325 (per dozen)", image: "https://www.snowflake.co.za/images/stock/38_colour_swirl_meringues.png"},
  {name: "Red Velvet Cake", price: "1500 (per cake)", image: "https://thenovicechefblog.com/wp-content/uploads/2015/06/Red-Velvet-Dream-Cake-1-sm.png"},
  {name: "Chocolate Pudding", price: "400 (per two)", image: "https://www.honey.com/images/general/_recipePage/31161/velvety-honey-chocolate-pudding.png"},
  {name: "Soft Baked Chocolate Chip Cookies (per dozen)", price: "120", image: "http://www.milkandcardamom.com/wp-content/uploads/2017/06/Chocolate-Chip-Cookies-1-480x640.jpg"},
  {name: "Chocolate Chip Muffin", price: "400 (per muffin)", image: "https://fitfoodiefinds.com/wp-content/uploads/2016/02/healthy-banana-chocolate-chip-muffins2.png"}
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
    
    var dessertPrice = $('<p>').addClass('card-text').text("Tk." + dessert.price);
    cardBody.append(dessertPrice);
    
    var addToCartButton = $('<button>').addClass('btn btn-info').text('Add to Cart').attr('id',index);
    addToCartButton.click(function(event){
      //console.log(event.target.id);
      var cartItem = desserts[event.target.id];
      cartItem.quantity = 1;
      cart.items.push(cartItem);
      console.log(cartItem.price);
      cart.total = (parseInt(cart.total) + parseInt(cartItem.price)).toString();
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
    
    var dessertTitle = $('<h3>').addClass('card-title').text(item.name);
    cardBody.append(dessertTitle);
    
    var dessertPrice = $('<p>').addClass('card-text').text("Tk."+item.price + " x ");
    cardBody.append(dessertPrice);
    
    var noOfProduct = $('<input type=number id=numOfProduct value=1 readonly>');
    dessertPrice.append(noOfProduct);
    
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
  
  $("#checkout-btn").click(function(){
    $("#cart").hide();
    $("#menu-items").hide();
    $("#showCartBtn").hide();
    $('#close').hide();
    $('.panel').show();
    $('.form-group').show();
    $('.payment-note').show();
  });
  
  $("#backbutton").click(function(){
    $("#cart").show();
    $("#menu-items").hide();
    $("#showCartBtn").hide();
    $('#close').show();
    $('.panel').hide();
    $('.form-group').hide();
    $('.payment-note').hide();
  });

});

function submitForm(){
  alert('Submitted');
}
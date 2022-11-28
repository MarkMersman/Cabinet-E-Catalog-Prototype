let drawerID = '637c0e10fd446cd372bbff3a'
let frameID = '';
let doorID = '';
let styleID = '';
let woodID = '';

//document.getElementById("SubmitButton").addEventListener("click", function(){alert("Hello world!");});

clickAndSelect()


function clickAndSelect() {
  let cards = Array.from( document.querySelectorAll('.card') ),
      elements = []
  
  let frames = Array.from(document.querySelectorAll('.frameCard'));    
  let woods = Array.from(document.querySelectorAll('.woodCard'));    
  let doors = Array.from(document.querySelectorAll('.doorCard'));    
  let styles = Array.from(document.querySelectorAll('.styleCard'));      
  

  // Add child nodes to clickable elements
  cards.forEach(card => {
    elements = elements.concat( Array.from(card.children) )
  })

  // Attach to mouse events
  elements.forEach(element => {
    
    // click: Disable
    element.addEventListener('click', e => e.preventDefault())
    
    // mousedown: Log the timestamp
    element.addEventListener('mousedown', e => {
      let card = e.target.closest(".card")
      card.setAttribute('data-md', Date.now())
    })
    
    // mouseup: Determine whether to click
    element.addEventListener('mouseup', e => {
      
      // Only one please
      e.stopPropagation();

      let card = (e.target.classList.contains("card")) ? e.target : e.target.closest('.card'),
          then = card.getAttribute('data-md'),
          now = Date.now()

      // Allow 200ms to distinguish click from non-click
      if(now - then < 200) {             
    
        if(card.classList.contains('visited')){
            card.classList.remove('visited');
        }else if(card.classList.contains('frameCard')){
          for (var c in frames){
            if(frames[c].classList.contains('visited')){
              frames[c].classList.remove('visited')
            }            
          }
          card.classList.add('visited');
          frameID = card.getAttribute('data-value');
        }else if(card.classList.contains('woodCard')){
          for (var c in woods){
            if(woods[c].classList.contains('visited')){
              woods[c].classList.remove('visited')
            }            
          }
          card.classList.add('visited');
          woodID = card.getAttribute('data-value');
        }else if(card.classList.contains('doorCard')){
          for (var c in doors){
            if(doors[c].classList.contains('visited')){
              doors[c].classList.remove('visited')
            }            
          }
          card.classList.add('visited');
          doorID = card.getAttribute('data-value');
        }else if(card.classList.contains('styleCard')){
          for (var c in styles){
            if(styles[c].classList.contains('visited')){
              styles[c].classList.remove('visited')
            }            
          }
          card.classList.add('visited');
          styleID = card.getAttribute('data-value');
        }
        else{            
            card.classList.add('visited');              
        }  
      }  
      // Clean up
      card.removeAttribute('data-md')      
    })    
  })  
}

async function submit(){  

  
  //window.location.href = "./price.html";

  try {
    await axios.post('api/v1/price-info',
    {
      frameType: `${frameID}`,
      woodType: `${woodID}`,
      doorType: `${doorID}`,
      doorStyle: `${styleID}`,
      drawerStyle: `${drawerID}`,
      woGrain: ``,
      numDrawers: 1 
    }).then(function (response) {     
      console.log(response.data);
      var res = JSON.stringify(response.data, null, 4);
      //var newElement = `<div>${res}</div>`;
      document.getElementById("json").innerHTML = res; 
    }).catch(function (error){
      console.log(error);
    })   
  }catch (error){
    console.log(error);
  } 
  
}


window.addEventListener('click', function(event){
   if (event.target.tagName === 'I'){
       if(event.target.classList.contains('fa-beer')){
           console.log('beer icon for meme number ', event.target.id);
       } else if(event.target.classList.contains('fa-wine-glass-alt')){
        console.log('wine icon for meme number ', event.target.id);

       }
   }
   
});

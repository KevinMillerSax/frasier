$(window).on('click', function(event){
   if (event.target.tagName === 'I'){
       if(event.target.classList.contains('fa-beer')){
           function success(data){
               $(event.target).parent().siblings('.dislike-counter').text(`dislikes: ${data.dislikes.length}`);
               if(data.dislikes.includes(data.userId) && !$(event.target).hasClass('clicked-dis')){
                   $(event.target).addClass('clicked-dis');
               } else if (!data.dislikes.includes(data.userId) && $(event.target).hasClass('clicked-dis')){
                   $(event.target).removeClass('clicked-dis');
               }
           }
           let url = `/memes/${event.target.id}/dislike`;
           $.ajax({
            type: "POST",
            url: url,
            data: 'test',
            success: success,
            // dataType: dataType
          });
       } else if(event.target.classList.contains('fa-wine-glass-alt')){
        function success(data){
            $(event.target).parent().siblings('.like-counter').text(`likes: ${data.likes.length}`);
            if(data.likes.includes(data.userId) && !$(event.target).hasClass('clicked')){
                $(event.target).addClass('clicked');
            } else if (!data.likes.includes(data.userId) && $(event.target).hasClass('clicked')){
                $(event.target).removeClass('clicked');
            }
        }
        let url = `/memes/${event.target.id}/like`;
           $.ajax({
            type: "POST",
            url: url,
            data: 'test',
            success: success,
            // dataType: dataType
          });
       }
   }
   
});



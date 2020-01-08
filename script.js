// UI CONTROLLS

(function ui_controlls(){


    return {

    }
})()


// controler

const controller = (function(){

    // event listeners
    function eventListeners(){

        // event bubbleing
        const userClick = document.addEventListener('click', function(event){
            let clickedTarget = event.target;
            let clickParent = clickedTarget.parentNode;
            let section = document.querySelector('section');

            if(clickedTarget.classList.contains('clients') || clickParent.classList.contains('clients')){
                document.querySelector('.projects').classList.add('exitR');
                document.querySelector('.skills').classList.add('exitL');
                setTimeout(function(){
                    
                    document.querySelector('.projects').remove();
                    document.querySelector('.skills').remove();
                },1000)
                console.log('Clients have been clicked')
            } else if (clickedTarget.classList.contains('projects') || clickParent.classList.contains('projects')){
                document.querySelector('.clients').classList.add('exitR');
                document.querySelector('.skills').classList.add('exitL');
                document.querySelector('.projects').classList.add('upProject')
                console.log('projects have been clicked')
                setTimeout(function(){
                    document.querySelector('.projects').classList.remove('upProject');
                    document.querySelector('.clients').remove();
                    document.querySelector('.skills').remove();
                },1000)
                console.log('Clients have been clicked')
            } else if (clickedTarget.classList.contains('skills') || clickParent.classList.contains('skills')){
                document.querySelector('.clients').classList.add('exitR');
                document.querySelector('.projects').classList.add('exitL');
                document.querySelector('.skills').classList.add('upSkill')
                console.log('skills have been clicked')
                setTimeout(function(){
                    document.querySelector('.skills').classList.remove('upSkill');
                    document.querySelector('.clients').remove();
                    document.querySelector('.projects').remove();
                    document.querySelector('.skills_list').classList.add('skills_list_show');
                },1000)
                console.log('Clients have been clicked')
            }
            
        })

    }
   
    // RETURNS

    return {
        init: function(){
            eventListeners()
        }
    }


})()

controller.init();

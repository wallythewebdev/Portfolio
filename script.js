// UI CONTROLLS

let ui_controlls = (function(){

         function clone_headings(){
        // clone client - 
            let client = document.querySelector('.clients').cloneNode(true);
           
        // clone projects - 
            let projects = document.querySelector('.projects').cloneNode(true);
            
        // clone skills - 
            let skills = document.querySelector('.skills').cloneNode(true);
            

            elements.push(client, projects, skills);
            return elements;
    };

        function rebuildUI(){
            
           
            let section = document.querySelector('section');
            section.innerHTML="";

            elements.forEach(e=>{

                section.appendChild(e);

                let exitL, exitR, exitButton_show;

                

                document.querySelectorAll('.exitL').forEach(e=>{
                    e.classList.remove('exitL');
                })
                document.querySelectorAll('.exitR').forEach(e=>{
                    e.classList.remove('exitR');
                })
                document.querySelectorAll('.exitButton_show').forEach(e=>{
                        e.classList.remove('exitButton_show');
                })
            })
        }

        let elements = [];

        let subs = [];

    return {

        resetUI: function(){
            rebuildUI()
        },

        getElements: function(){
            clone_headings();
            console.log(elements)
            return elements;

        }
        
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

            if(clickedTarget.classList.contains('clients') || clickParent.classList.contains('clients') || clickParent.parentNode.classList.contains('clients')){
                if(clickedTarget.classList.contains('exitButton')){
                    console.log('reset')
                    ui_controlls.resetUI()
                    return;
                } else {
                document.querySelector('.projects').classList.add('exitR');
                document.querySelector('.skills').classList.add('exitL');
                document.querySelectorAll('.exitButton').forEach(e=>{
                    e.classList.add('exitButton_show')
                })
                

                setTimeout(function(){
                    
                    document.querySelector('.projects').remove();
                    document.querySelector('.skills').remove();
                },1000)
                console.log('Clients have been clicked')
            }
            } else if (clickedTarget.classList.contains('projects') || clickParent.classList.contains('projects') || clickParent.parentNode.classList.contains('projects')){

                if(clickedTarget.classList.contains('exitButton')){
                    console.log('reset')
                    ui_controlls.resetUI()
                    return;
                } else{
                document.querySelector('.clients').classList.add('exitR');
                document.querySelector('.skills').classList.add('exitL');
                document.querySelector('.projects').classList.add('upProject')
                document.querySelectorAll('.exitButton').forEach(e=>{
                    e.classList.add('exitButton_show')
                })
                

                console.log('projects have been clicked')
                setTimeout(function(){
                    document.querySelector('.projects').classList.remove('upProject');
                    document.querySelector('.clients').remove();
                    document.querySelector('.skills').remove();
                },1000)
                console.log('Clients have been clicked')
            }
            } else if (clickedTarget.classList.contains('skills') || clickParent.classList.contains('skills') || clickParent.parentNode.classList.contains('skills')){

                if(clickedTarget.classList.contains('exitButton')){
                    console.log('reset')
                    ui_controlls.resetUI()
                    return;
                } else {
                   
                    document.querySelector('.clients').classList.add('exitR');
                    document.querySelector('.projects').classList.add('exitL');
                    document.querySelector('.skills').classList.add('upSkill')
                    console.log('skills have been clicked')
                    document.querySelectorAll('.exitButton').forEach(e=>{
                        e.classList.add('exitButton_show')
                    })
                    

                    setTimeout(function(){
                        document.querySelector('.skills').classList.remove('upSkill');
                        document.querySelector('.clients').remove();
                        document.querySelector('.projects').remove();
                        // below needs to be a seperate function for loading in the sub section of the headers
                        // document.querySelector('.skills_list').classList.add('skills_list_show');
                    },1000)
                    console.log('Clients have been clicked');
                }

               
            } else if(clickedTarget.classList.contains('exitButton')){
                if(clickedTarget.parentNode.classList.contains('projects')){
                    console.log('Project exit was clicked')
                }
            }
            
        })

    }
   
    // RETURNS

    return {
        init: function(){
            eventListeners();
            ui_controlls.getElements();
        }
    }


})()

controller.init();

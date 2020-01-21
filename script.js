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


        function cloneClients(){
            // get the clietns and clone themm into a variable

            var clientList = document.querySelectorAll('.clients_list')[0].cloneNode(true)

            // if else for this part to stop it from shwoing again once the back button has been hit

            clientList.classList.add('clients_list_show');
            clientList.classList.remove('clients_list');

            clients.push(clientList);

        }

        function build_Clients(){
            document.querySelector('.clients').appendChild(clients[0])
        }


        function cloneProjects(){
            // get the clietns and clone themm into a variable

            var projects_list = document.querySelectorAll('.project_list')[0].cloneNode(true)

            projects_list.classList.add('project_list_show');
            projects_list.classList.remove('project_list');

            projects.push(projects_list);

        }

        function build_projects(){
            document.querySelector('.projects').appendChild(projects[0]);
        }

        function cloneSkils(){
            // get the clietns and clone themm into a variable

            var skill_list = document.querySelectorAll('.skills_list')[0].cloneNode(true)

            skills.push(skill_list);

        }

        function build_skills(){
            document.querySelector('.skills').appendChild(skills[0]);
        }



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
            // If the client section (2rd child) is still part of the rebuild NODE for the
                // headers then find that child (2nd child) and remove it
                var clientSection = document.querySelectorAll('.clients')
                    if(clientSection[0].children.length === 3){
                        clientSection[0].children[2].remove();
                    };

                // Same as the above but this time for the projects
                var projectSection = document.querySelectorAll('.projects')
                    if(projectSection[0].childElementCount === 3){
                        projectSection[0].children[2].remove();
                    };  
                    
                var skillsSection = document.querySelectorAll('.skills')
                if(skillsSection[0].children.length === 3){
                    skillsSection[0].children[2].remove();
                };  
        }

        let elements = [];

        let clients = [];

        let skills = [];

        let projects = [];

        let subs = [];

    return {

        resetUI: function(){
            rebuildUI()
        },

        getElements: function(){
            clone_headings();
            console.log(elements)
            return elements;

        },

        getClients: function(){
            cloneClients();
        },
        
        pushClients: function(){
            build_Clients();
        },

        getskills: function(){
            cloneSkils();
        },
        
        pushskills: function(){
            build_skills();
        }, 

        getProjects: function(){
            cloneProjects();
        },

        pushProjects: function(){
            build_projects();
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
                ui_controlls.pushClients();

                // add event for clicking on client so they scroll out to the side

                var clientList = document.querySelectorAll('.client');
                clientList.forEach(e=>{
                    e.addEventListener('click', ()=> {
                        if(!e.classList.contains('moveLeft')){
                            e.classList.add('moveLeft');
                        } else {
                            e.classList.remove('moveLeft')
                        }
                        
                    })

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

                ui_controlls.pushProjects();

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

                ui_controlls.pushskills();

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
                        document.querySelector('.skills_list').classList.add('skills_list_show');
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
            ui_controlls.getClients();
            ui_controlls.getskills();
            ui_controlls.getProjects();
            
        }
    }


})()

controller.init();

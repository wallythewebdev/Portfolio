

let headersArr = [];

let clientsArr = [];
let skillsArr =[]; 
let projectsArr =[];



let alt_UI = (function(){


    const clone_headings = () => [
        document.querySelector(".clients").cloneNode(true),
        document.querySelector(".projects").cloneNode(true),
        document.querySelector(".skills").cloneNode(true)
    ]
    

    /*
        @return Viod

        Clones element to be stored in an array

        this one function can be used for, clients, projects and skills

        please see INIT for it being called with each of there values
    */ 
    function UI_clone_content(elementName, storeIn){
        let div; 

        div = document.querySelector(elementName);
        div.cloneNode(true);
        storeIn.push(div);
    }

    /*
        @return viod

        adds the _show section to the class list so it is no longer hidden
        appends element to target

        -- Bug found -- If element is already open on page and is clicked again it removes 
        styles for the element - condiation satment to see if the element is already being shown and if so 
        do thing

    */ 
    function append_item(element, target, className){
        // debugger;
        
        // if _show is NOT (!) placed on the element then alt the class to show element
        if(!element[0].classList.contains(className+'_show')){
            element[0].classList.add(className+'_show')
            element[0].classList.remove(className)

        // show the exit button on the element perant (target is the parent element)
        document.querySelector(target).children[0].children[1].classList.add('exitButton_show')

        document.querySelector(target).appendChild(element[0]);

        }
    }

    /*
        @returns viod

        gets the current headers and pushes them to an array to be called on later
        wipes the current sections
        re populates the section element with the headers array elements

    */ 
    function buildHeadings(){
        // set up sections + headingElements
        let section, headingElements;
        
        section = document.querySelector('section');
        headingElements = clone_headings();

        // push headers to Arr for keeping
        headersArr.push(headingElements);

        // remove current elements
        section.innerHTML="";

        // add headings afresh to section
        headingElements.forEach(e=>{
            section.appendChild(e);
        })

    }

    function clearSection(){
        let section = document.querySelector('section');
        section.innerHTML="";
        headersArr[0].forEach(e=>{
            section.appendChild(e);
        })
    }

    function removeSubHeading(parent){
        // debugger;
        document.querySelector(`.${parent}`).children[2].classList.value=`${parent}_list`;
        document.querySelector(`.${parent}`).children[2].remove();
    }

    function move_el_to_left(){
        // debugger;

        clients = document.querySelectorAll('.client')
        
        clients.forEach(e=>{
            e.addEventListener('click', e=>{
                e.target.parentNode.children[1].classList.add('client_info_show');
            })
        })
    }

    return {

        clone_content: function(elementName, storeIn){
            UI_clone_content(elementName, storeIn);
        },

        append_content: function(element, target, className){
          
            append_item(element, target, className);
        },

        build_section_headers: function(){
            buildHeadings();
        },

        clearSection: function(){
            clearSection();
        },

        exitEvent: function(parent){
            removeSubHeading(parent);
        },

        addExitEvent: function(){
            document.querySelectorAll('.exitButton').forEach(e=>{
                e.addEventListener('click', (e)=>{
                    // parent = .clients / .projects / .skills
                    let parent = e.target.parentNode.parentNode.classList[0]
                    // document.querySelector(`.${parent}_list_show`).classList.value=`${parent}_list`;
                    alt_UI.exitEvent(parent);

                    e.target.classList.remove('exitButton_show')
                })
            })
        },

        slide_in_element: function(){
            move_el_to_left()
        },

        slide_out_element: function(){
            document.querySelectorAll('.client_info_exitButton').forEach(e=>{
                e.addEventListener('click', e=>{
                    e.target.closest('.client_info').classList.remove('client_info_show')
                })
            })
        }

    }

})()




// controler

const controller = (function(){


    function clickEvents(){
        // click event for the sub headings to be loaded in
        document.addEventListener('click', e=>{
            /*
                Below code is the result of following the trail of possible outcomes
                turnery op checks if any button on the doc is clicked appart from the 
                exit button - this allows the exit button to function without starting =
                a loop - 
            */ 
            let check; 
            check = e.target.classList[0] != 'exitButton'; // <<< if click is not on exit then run 1)
            check ? headingSelector(e) : null; // <<< 1) 
        })
    }

    function headingSelector(event){
        // debugger;
        

        let target, clients, projects, skills, exitButton;
        
        target = event.target;

        clients = target.parentNode.classList.contains('clients') || target.parentNode.parentNode.classList.contains('clients');
        projects = target.parentNode.classList.contains('projects') || target.parentNode.parentNode.classList.contains('projects');
        skills = target.parentNode.classList.contains('skills') || target.parentNode.parentNode.classList.contains('skills');

        /*
            1) add in the clients by appending them to the clients DIV
            2) add event listener to each of the clients children to animate them when clicked on

            2) is depending on 1) to be run first as 1) created the node list for 2) to accsess
        */ 
        clients ? (alt_UI.append_content(clientsArr, '.clients', 'clients_list'), // <<< 1)
        alt_UI.slide_in_element(), // <<< 2)
        alt_UI.slide_out_element()) 
        : null; 

        projects ? (alt_UI.clearSection(),
        alt_UI.append_content(projectsArr, '.projects', 'project_list')) :
        null;

        skills ? (alt_UI.clearSection(),
        alt_UI.append_content(skillsArr, '.skills', 'skills_list')): 
        null;
        
    }
   
    // RETURNS

    return {
        init: function(){
            // event Listeners
            clickEvents()

            //  clone content
            alt_UI.clone_content('.clients_list', clientsArr);
            alt_UI.clone_content('.project_list', projectsArr);
            alt_UI.clone_content('.skills_list', skillsArr);

            
            
            // wipe section
            alt_UI.build_section_headers();
            // add ExitClickEvent

            alt_UI.addExitEvent();
        }
    }


})()

controller.init();

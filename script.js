

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

    */ 
    function append_item(element, target){
        element[0].classList.value+="_show"
        document.querySelector(target).appendChild(element[0])
        
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

    return {

        clone_content: function(elementName, storeIn){
            UI_clone_content(elementName, storeIn);
        },

        append_content: function(element, target){
            append_item(element, target);
        },

        wipe_content: function(){
            buildHeadings();
        }

    }

})()




// controler

const controller = (function(){


    function clickEvents(){
        document.addEventListener('click', headingSelector)
    }

    function headingSelector(event){

        let target, clients, projects, skills, exitButton;
        
        target = event.target;

        clients = target.parentNode.classList.contains('clients') || target.parentNode.parentNode.classList.contains('clients');
        projects = target.parentNode.classList.contains('projects') || target.parentNode.parentNode.classList.contains('projects');
        skills = target.parentNode.classList.contains('skills') || target.parentNode.parentNode.classList.contains('skills');

        clients ? alt_UI.append_content(clientsArr, '.clients') : null; 
        projects ? alt_UI.append_content(projectsArr, '.projects'): null;
        skills ? alt_UI.append_content(skillsArr, '.skills'): null;
        
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
            alt_UI.wipe_content();
            
        }
    }


})()

controller.init();

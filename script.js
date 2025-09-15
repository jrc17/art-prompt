import data from "/prompt.json" with { type: "json" };

function randomPrompt(dataKey){
    let idx= Math.floor(Math.random()*data[dataKey].length)
    return idx
}

function addPrompt(promptName,setPrompt=true){
    if(checkLock(promptName)){return}
    const promptNameSection = document.getElementById(`${promptName}-section`)
    const promptSection = document.getElementById(`${promptName}-prompt-section`)
    if(setPrompt){
    const idx = randomPrompt(promptName) 
    promptSection.classList.add("active")
    promptNameSection.innerHTML = `<p>${data[promptName][idx]}</p>`

    }
    else{
        promptSection.classList.remove("active")
        promptNameSection.innerHTML = ""
    }
    
}

const allBtn = document.getElementById("all-btn");
const noneBtn = document.getElementById("none-btn");

const submitOptions = document.getElementById("submit-options");
const checkboxes = document.querySelectorAll('.options')

function setOptions(state){
    checkboxes.forEach(box=>{ 
        box.checked=state
       }) 
}

allBtn.addEventListener("click",()=>setOptions(true))       
noneBtn.addEventListener("click",()=>setOptions(false))


submitOptions.addEventListener("click",function(){    
    checkboxes.forEach(box=>{            
       
        if(box.checked){                 
            addPrompt(box.value)
           
        }
        else{
            addPrompt(box.value,false)
           
            
        }
    })
})

const refreshBtn = document.querySelectorAll(".refresh-btn");
refreshBtn.forEach(refresh=>{

    refresh.addEventListener("click",function(){
             
        addPrompt(refresh.value )
    })
})

const locks = document.querySelectorAll(".lock")

function checkLock(promptName){
    //Note:
    // Use for...of instead of forEach
    // because return in forEach only exits the callback,
    // (forEach is a function; so callback is a function within another function)
    // not the checkLock function itself

    for(const lock of locks){       
        if(promptName ===lock.value && lock.checked){            
                return true
            }                   
            
        }
        return false
}
locks.forEach(lock=>{
    lock.addEventListener("change",function(){
        const lockImg = lock.previousElementSibling;
        const lockSvg = lockImg.querySelector("svg");
        if(lock.checked){
            lockSvg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
</svg>
`
        }
        else{
            lockSvg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
</svg>
`
        }
    })
})
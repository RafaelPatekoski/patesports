let menustate = "desativado"
function menuActive(){
    if(menustate == "desativado"){
        menustate = "ativado"
        document.getElementById("menulateral").classList.add("menu-active")
        
    }else{
        menustate = "desativado"
        document.getElementById("menulateral").classList.remove("menu-active")
    }   
    
}

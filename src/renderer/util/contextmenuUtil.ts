interface Menu {
    text: string
    func: Function
}

const contextmenuUtil = (x: number, y: number, menus: Menu[]) => {
    //check is exisist
    const ifExist = document.getElementById("contextMenu");
    if (ifExist)
        ifExist.remove()


    var menuContextElement: HTMLDivElement = document.createElement('div');
    menuContextElement.id = "contextMenu"
    menuContextElement.style.width = "100px"
    menuContextElement.style.height = "100px"
    menuContextElement.style.backgroundColor = "white"
    menuContextElement.style.border = "1px solid black"
    menuContextElement.style.position = "fixed"
    menuContextElement.style.zIndex = "100"
    menuContextElement.style.left = `${x}px`
    menuContextElement.style.top = `${y}px`
    document.body.appendChild(menuContextElement)

    //handle menus
    menus.forEach(
        menu => {
            const menuElement: HTMLDivElement = document.createElement('div');
            menuElement.innerHTML = menu.text
            menuElement.style.width = "100%"
            menuContextElement.append(menuElement)
        }
    )

    /**
 * global clicke event listener
 */
    const menuContextGlobalEventListenerb = (event: MouseEvent) => {
        console.log("menuContextGlobalEventListenerb:")
        if (!menuContextElement.contains(event.target as Node)) {
            //remove current global mouse listener event
            document.removeEventListener("click", menuContextGlobalEventListenerb)
            //remove menu
            menuContextElement.remove()
        } else {
            console.log("in")
        }
    }
    /**
     * register listener
     */
    document.addEventListener("click", menuContextGlobalEventListenerb)
}

export default contextmenuUtil;
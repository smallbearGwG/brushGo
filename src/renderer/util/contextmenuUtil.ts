interface Menu {
    text: string
    func: Function
}

const menuHeight = 30

const contextmenuUtil = (x: number, y: number, menus: Menu[]) => {
    //check is exisist
    const ifExist = document.getElementById("contextMenu");
    if (ifExist)
        ifExist.remove()


    const menuContextElement: HTMLDivElement = document.createElement('div');
    menuContextElement.id = "contextMenu"
    menuContextElement.style.width = "120px"
    menuContextElement.style.height = `${menuHeight * menus.length}px`
    menuContextElement.style.backgroundColor = "white"
    menuContextElement.style.border = "1px solid #D4D7DE"
    menuContextElement.style.position = "fixed"
    menuContextElement.style.borderRadius = "3px"
    menuContextElement.style.padding = "4px 2px 4px 2px"
    // menuContextElement.style.boxShadow = "1px 1px 1px rgba(0, 0, 0, .2)"
    menuContextElement.style.zIndex = "100"
    menuContextElement.style.left = `${x}px`
    menuContextElement.style.top = `${y}px`

    menuContextElement.style.display = "flex"
    menuContextElement.style.justifyContent = "cneter"
    menuContextElement.style.alignItems = "cneter"
    menuContextElement.style.flexDirection = "column"
    // menuContextElement.style.gap = "2px"

    document.body.appendChild(menuContextElement)

    //handle menus
    menus.forEach(
        menu => {
            const menuElement: HTMLDivElement = document.createElement('div');
            menuElement.innerHTML = menu.text
            menuElement.style.width = "100%"
            menuElement.style.height = `${menuHeight}px`
            menuElement.style.boxSizing = "border-box"
            menuElement.style.padding = "5px"
            menuElement.style.backgroundColor = ""
            menuElement.style.cursor = "pointer"
            menuElement.addEventListener("mouseover", () => {
                menuElement.style.backgroundColor = "#337ecc";
                menuElement.style.color = "white";
            })
            menuElement.addEventListener("mouseleave", () => {
                menuElement.style.backgroundColor = "";
                menuElement.style.color = "";
            })
            menuElement.addEventListener("click", () => {
                menu ? menu.func() : () => { }
                //
                // click call function then remove menuContext
                //
                menuContextElement.remove()
            })

            menuContextElement.append(menuElement)
        }
    )

    /**
 * global clicke event listener
 */
    const menuContextEventRemoves = (event: MouseEvent) => {
        if (!menuContextElement.contains(event.target as Node)) {
            //remove current global mouse listener event
            document.removeEventListener("click", menuContextEventRemoves)
            document.removeEventListener("wheel", menuContextEventRemoves)
            //remove menu
            menuContextElement.remove()
        }
    }
    /**
     * register listener
     */
    document.addEventListener("click", menuContextEventRemoves)
    document.addEventListener("wheel", menuContextEventRemoves)
}

export default contextmenuUtil;
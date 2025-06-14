import { ReactNode,createContext,useContext,useState } from "react"
 type SidebarProvideProps = {
    children: ReactNode
}
type SidebarContextType = {
    isLargeOpen: boolean
    isSmallOpen: boolean
    toggle:() => void
    close:() => void
}

const SidebarContext = createContext<SidebarContextType | null>(null)

export function useSidebarContext(){
    const value = useContext(SidebarContext)
    if(value == null) throw Error("Cannot be outside of sidebar provider")
    return value
}
export function SidebarProvider({children}: SidebarProvideProps) {
    const [isLargeOpen, setIsLargeOpen] = useState(true)
    const [isSmallOpen, setIsSmallOpen] = useState(false)
    
    function isScreenSmall() {
       return window.innerWidth < 1024
    }
    function toggle() {
       if(isScreenSmall()) {
            setIsSmallOpen(s => !s)
        }else{
            setIsLargeOpen(l => !l)
        }
    }
    function close(){
        if(isScreenSmall()) {
            setIsSmallOpen(false)
        }else{
            setIsLargeOpen(false)
        }
    }
    return <SidebarContext.Provider value={{
        isLargeOpen,
        isSmallOpen,
        toggle,
        close
    }}>{children}</SidebarContext.Provider>
    
}

import logo from "../assets/stream.png";
import {ArrowLeftIcon, Bell, Menu, Mic, Search, Upload, User} from "lucide-react";
import {Button} from "../components/Button";
import { useState } from "react";
import { useSidebarContext } from "../contexts/SidebarContexts";
export function PageHeader(){
    const [showFullWidthSearch,setShowFullWidthSearch] = useState(false)
   
    return <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
    <PageHeaderFirstSection hidden = {showFullWidthSearch}/>
    <form className={`md:flex flex-grow justify-center ${showFullWidthSearch? "flex" : "hidden md:flex"}`}>
        {showFullWidthSearch && (
    <Button onClick = {() => setShowFullWidthSearch(false)} type="button" size="icon" variant="ghost" className="flex-shrink-0 ml-4 md:hidden mr-5">
            <ArrowLeftIcon/>
        </Button>
        )}
        <div className="flex flex-grow max-w-[600px]">
            <input type="search" placeholder="Search" className="rounded-l-full border border-secondary-border py-1 px-4 text-lg w-full"/>
            <Button className="rounded-r-full py-2 px-4 border-secondary border shrink-0 border-l-0">
                <Search/>
            </Button>
        </div>
        
        <Button type="button" size="icon" variant="default" className="flex-shrink-0 ml-4">
            <Mic/>
        </Button>

    </form>
    <div className={`flex-shrink-0 md:gap-2 ${showFullWidthSearch? "hidden" : "flex"}`}>
        <Button onClick = {() => setShowFullWidthSearch(true)} variant="ghost" size="icon" className="md:hidden">
            <Search/>
        </Button>
        <Button variant="ghost" size="icon" className="md:hidden">
            <Mic/>
        </Button>
        <Button variant="ghost" size="icon">
            <Upload/>
        </Button>
        <Button variant="ghost" size="icon">
            <Bell/>
        </Button>
        <Button variant="ghost" size="icon">
            <User/>
        </Button>
    </div>
    </div>
}

type PageHeaderFirstSectionProps = {
    hidden?: boolean
}
export function PageHeaderFirstSection ({hidden = false,}:PageHeaderFirstSectionProps) {
    const{toggle} = useSidebarContext()
   return <div className={`flex gap-4 items-center flex shrink-0 ${hidden}? "hidden" : "flex"}`}> 
        <Button onClick={toggle} variant ="ghost" size = "icon">
            <Menu/>
        </Button>
        <a href ="/">
        <img src={logo} className="h-10 w-30 mt-2"></img>
        </a>
    </div>
}
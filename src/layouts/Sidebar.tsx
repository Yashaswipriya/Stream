import { ChevronDown, ChevronUp, Clapperboard, Clock, Film, Flame, History, Home, Library, ListVideo, Music, Newspaper, PlaySquare, Podcast, Repeat, Shirt, ShoppingBag, Trophy } from "lucide-react";
import { Children, ElementType, ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Button, buttonStyles } from "../components/Button";
import { playlists, subscriptions } from "../data/sidebar";
import { useSidebarContext } from "../contexts/SidebarContexts";
import { PageHeaderFirstSection } from "./PageHeader";
export function Sidebar() {
     const {isLargeOpen,isSmallOpen,close} = useSidebarContext()
     const shouldShowLargeSidebar = isLargeOpen || isSmallOpen
    return (
       
        <>
        <aside className={`sidebar sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 lg:hidden ${isLargeOpen ? "lg:hidden" : "lg:flex"}`}>
            <SmallSidebarItem Icon={Home} title="Home" url="/"/>
            <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts"/>
            <SmallSidebarItem Icon={Clapperboard} title="Subscriptions" url="/subscriptions"/>
            <SmallSidebarItem Icon={Library} title="Library" url="/library"/>
        </aside>
        {isSmallOpen && (
            <div
            onClick={close}
            className="lg:hidden fixed inset-0 z-[999] bg-black/50"
            />
        )}
        {shouldShowLargeSidebar && (
        <aside className={`sidebar lg:sticky lg:block top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 w-56 fixed z-50 bg-white h-full ${isLargeOpen ? "lg:flex" : "lg:hidden"} ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}>
           <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
            <PageHeaderFirstSection/>
           </div>
            <LargeSidebarSection>
                <LargeSidebarItem isActive IconOrImgUrl={Home} title="Home" url="/"/>
                <LargeSidebarItem 
                IconOrImgUrl={Clapperboard} 
                title="Subscriptions" 
                url="/subscriptions"
                />
            </LargeSidebarSection>
            <hr/>
            <LargeSidebarSection visibleItemCount={5}>
                <LargeSidebarItem 
                IconOrImgUrl={Library} 
                title="Library"
                url="/library"               
                 />
                <LargeSidebarItem 
                IconOrImgUrl={History} 
                title="History"
                url="/history"               
                 />
                 <LargeSidebarItem 
                IconOrImgUrl={PlaySquare} 
                title="Your Videos"
                url="/your-videos"               
                 />
                 <LargeSidebarItem 
                IconOrImgUrl={Clock} 
                title="Watch Later"
                url="/playlist?list=WL"               
                 />
                 {playlists.map(playlist => (
                     <LargeSidebarItem 
                     key = {playlist.id}
                     IconOrImgUrl={ListVideo} 
                     title={playlist.name}
                     url={`/playlist?list=${playlist.id}`}               
                      />
                 ))}
            </LargeSidebarSection>
            <hr/>
            <LargeSidebarSection title="Subscriptions">
                {subscriptions.map(subscription => (
                    <LargeSidebarItem 
                    key={subscription.id}
                    IconOrImgUrl={subscription.imgUrl} 
                    title={subscription.channelName}
                    url={`/@${subscription.id}`}               
                     />
                ))}
            </LargeSidebarSection>
            <hr/>
            <LargeSidebarSection title ="Explore">
                <LargeSidebarItem 
                IconOrImgUrl={Flame}
                title="Trending"
                url="/trending"
                />
                <LargeSidebarItem
                IconOrImgUrl={ShoppingBag}
                title="Shopping"
                url="/shopping"
                />
                <LargeSidebarItem
                IconOrImgUrl={Music}
                title="Music"
                url="/music"
                />
                <LargeSidebarItem
                IconOrImgUrl={Film}
                title="Movies & Shows"
                url="/movies-tv"
                />
                <LargeSidebarItem
                IconOrImgUrl={Newspaper}
                title="News"
                url="/news"
                />
                <LargeSidebarItem
                IconOrImgUrl={Trophy}
                title="Sports"
                url="/sports"
                />
                <LargeSidebarItem
                IconOrImgUrl={Shirt}
                title="Fashion & Beauty"
                url="/fashion-beauty"
                />
                <LargeSidebarItem
                IconOrImgUrl={Podcast}
                title="Podcasts"
                url="/podcasts"
                />
            </LargeSidebarSection>
            
        </aside>
        )}
        </>
    )
}
type SmallSidebarItemProps = {
    Icon: ElementType;
    title: string;
    url: string;
}
function SmallSidebarItem({Icon, title, url}: SmallSidebarItemProps) {
    return (
        <a href={url} className={twMerge(buttonStyles({variant:"ghost"}),"py-4 px-1 flex flex-col items-center rounded-lg gap-1")}>
            <Icon className="w-6 h-6"/>
            <div className="text-sm">{title}</div>
        </a>
    )
}
type LargeSidebarSectionProps = {
    children: ReactNode
    title?: string
    visibleItemCount?: number
}
function LargeSidebarSection({children,title,visibleItemCount=Number.POSITIVE_INFINITY}: LargeSidebarSectionProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const childrenArray = Children.toArray(children).flat()
    const showExpandButton =  childrenArray.length > visibleItemCount
    const visibleChildren = isExpanded ? childrenArray : childrenArray.slice(0,visibleItemCount)
    const ButtonIcon = isExpanded ? ChevronUp : ChevronDown
    return(
        <div>
        {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
        {visibleChildren}
        {showExpandButton &&(
        <Button 
        onClick={() => setIsExpanded(e => !e)}
        variant = "ghost" className="w-full flex items-center gap-4 p-3 rounded-lg ">
            <ButtonIcon className="w-6 h-6"/>
            <div>
                {isExpanded ? "Show Less" : "Show More"}
            </div>
        </Button>
        )}
        </div>
    )
}
type LargeSidebarItemProps = {
    IconOrImgUrl: ElementType | string  
    title: string
    url: string
    isActive?: boolean
}
function LargeSidebarItem({IconOrImgUrl, title, url,isActive=false}: LargeSidebarItemProps) {
    return <a href = {url} className= { twMerge(buttonStyles({variant:"ghost"}),`w-full flex items-center gap-4 p-3 rounded-lg ${isActive ? "font-bold bg-nuetral-100 hover:bg-secondary" : undefined }`)}>
        {typeof IconOrImgUrl === "string" ? (<img src={IconOrImgUrl} className="w-6 h-6 rounded-full"/>) : (<IconOrImgUrl className="w-6 h-6"/>)}
        <div className="whitespace-nowrap overflow-hidden text-ellipsis">
            {title}
        </div>
        
    </a>
}
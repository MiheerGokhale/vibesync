import DashNavBar from "@/components/DashNavBar";

const DashBoardLayout = ({children}:{children:React.ReactNode}) => {
    return <div className="relative overflow-hidden">
    <DashNavBar />
    {children}
    </div>
}

export default DashBoardLayout;
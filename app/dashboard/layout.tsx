import DashNavBar from "@/components/DashNavBar";
import WavyBackground from "@/components/wavy-background";

const DashBoardLayout = ({children}:{children:React.ReactNode}) => {
    return <div className="overflow-hidden">
    <WavyBackground className="mt-24" >
        <DashNavBar />
        {children}
    </WavyBackground>
    </div>
}

export default DashBoardLayout;
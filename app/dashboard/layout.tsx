import DashNavBar from "@/components/DashNavBar";
import WavyBackground from "@/components/wavy-background";

const DashBoardLayout = ({children}:{children:React.ReactNode}) => {
    return <div className="relative overflow-hidden">
    <DashNavBar />
    <WavyBackground>
        {children}
    </WavyBackground>
    </div>
}

export default DashBoardLayout;
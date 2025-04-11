import Hero from "./Hero";
import NavBar from "./NavBar";
import WavyBackground from "./wavy-background";

const HomePage = () => {
    return <div className="relative overflow-hidden">
        <NavBar />
        <WavyBackground
            className="md:mt-[-30vh]"
            colors={["#FFD700","#00A3E0","#4B0082","#E0FFFF","#778899"]}>
            <Hero />
        </WavyBackground>
    </div>
}

export default HomePage;
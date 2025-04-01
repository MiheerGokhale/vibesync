import { Toaster } from "sonner"

const ToasterProvider = ({children}:{children:React.ReactNode}) =>{
    return <>
    {children}
    <Toaster 
    toastOptions={{
        style:{
            backgroundColor: "lightgreen",
            color: "darkgreen"
        }
    }} />
    </>
}

export default ToasterProvider;
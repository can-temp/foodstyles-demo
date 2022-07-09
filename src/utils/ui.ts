import { LayoutRectangle, View } from "react-native";

export async function findCoordinates<T extends View>(ref:React.RefObject<T>):Promise<LayoutRectangle>{
    return new Promise((res, rej) => {
        try{
            ref.current!.measureInWindow((x:number, y:number, width:number, height:number) => {
                res({
                    x: Math.round(x),
                    y: Math.round(y),
                    width: Math.round(width),
                    height: Math.round(height)
                });
            })
        }catch(e){
            rej(e);
        }
    })
    
}

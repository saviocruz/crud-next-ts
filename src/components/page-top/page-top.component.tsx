import { ReactNode } from "react";
//import estilos from './page-top.component.css'

type HeaderProps = {
    titulo?: string;
    desc?: string;
    children?: ReactNode;
}

export default function PageTop({ titulo, desc, children }: HeaderProps) {
    return (
        <div className="page-top">
            <div className="page-top__title">
                <h2>{titulo}</h2>
                <p>{desc}</p>
            </div>
            <div className="page-top__aside">
                {children}
            </div>
        </div>
    )
}

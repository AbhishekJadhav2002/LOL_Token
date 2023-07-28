import { ReactNode } from "react";

export type Props = {
    children: JSX.Element | JSX.Element[] | ReactNode | ReactNode[];
}

export type NODE_ENV = "development" | "production";
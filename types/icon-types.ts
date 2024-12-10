import { SVGAttributes } from "react";

type IconBaseProps = SVGAttributes<SVGElement>;

export type IconType = (props: IconBaseProps) => JSX.Element;

import React from 'react';
export declare const isTwoCNChar: any;
export declare function isString(str: any): str is string;
export declare function isUnBorderedButtonType(type?: ButtonType): boolean;
export declare function spaceChildren(children: React.ReactNode, needInserted: boolean): (number | React.JSX.Element)[] | null | undefined;
declare const ButtonTypes: readonly ["default", "primary", "dashed", "link", "text"];
export type ButtonType = typeof ButtonTypes[number];
declare const ButtonShapes: readonly ["default", "circle", "round"];
export type ButtonShape = typeof ButtonShapes[number];
declare const ButtonHTMLTypes: readonly ["submit", "button", "reset"];
export type ButtonHTMLType = typeof ButtonHTMLTypes[number];
export {};

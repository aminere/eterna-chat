interface IChatProps {
    container: HTMLElement;
    username: string;
    uid: string;
    onHidden?: () => void;
}
export declare class Chat {
    private _props;
    constructor(props: IChatProps);
    show(): void;
}
export {};

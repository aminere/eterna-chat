interface IChatProps {
    container: HTMLElement;
    username: string;
    uid: string;
    backgroundColor?: string;
    onHidden?: () => void;
}
export declare class Chat {
    private _props;
    private _currentTab;
    private _iframes;
    constructor(props: IChatProps);
    show(): void;
    hide(): void;
    postMessage(message: any, targetOrigin: string): void;
}
export {};

interface IChatProps {
    container: HTMLElement;
    username: string;
    uid: string;
    backgroundColor?: string;
    collapsible?: boolean;
    onHidden?: () => void;
    onCollapsed?: () => void;
    onExpanded?: () => void;
}
export declare class Chat {
    private _props;
    private _currentTab;
    private _iframes;
    private _collapsed;
    constructor(props: IChatProps);
    show(): void;
    hide(): void;
    postMessage(message: any, targetOrigin: string): void;
}
export {};

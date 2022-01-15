import { ReactNode, createContext, useState, useContext } from 'react';

interface SidebarState {
    isOpen: boolean;
    toggleSidebar: () => void;
    openSidebar: () => void;
    closeSidebar: () => void;
}

export const SidebarContext = createContext<SidebarState>({
    isOpen: false,
    toggleSidebar: () => null,
    openSidebar: () => null,
    closeSidebar: () => null,
});

export function SidebarStateProvider(props: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <SidebarContext.Provider
            value={{
                isOpen,
                toggleSidebar: () => {
                    setIsOpen((prev) => !prev);
                },
                closeSidebar: () => {
                    setIsOpen(false);
                },
                openSidebar: () => {
                    setIsOpen(true);
                },
            }}
        >
            {props.children}
        </SidebarContext.Provider>
    );
}

export function useSidebarState() {
    return useContext(SidebarContext);
}

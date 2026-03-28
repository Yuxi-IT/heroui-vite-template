import { isAppUA } from "../service/appUA";

function DefaultLayout({ children, header, className }: { children: React.ReactNode; header?: React.ReactNode; className?: string }) {
    return(
        <div className={className}>
            {header && (
            <div className={`fixed h-[48px] top-[10px] left-[10px] right-[10px] z-50 flex items-center gap-4 ${isAppUA() ? "pt-[50px]" : ""}`}>
                {header}
            </div>
            )}
            <div className={`pb-12 ${isAppUA() ? "pt-[28px]" : ""}`}>
                {children}
            </div>    
        </div>
    );
}
export default DefaultLayout;

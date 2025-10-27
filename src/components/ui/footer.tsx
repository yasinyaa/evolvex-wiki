export function Footer({ children }: { children: React.ReactNode}) {
    return (
        <div className="w-full flex justify-between items-center border-t-1">
            {children}
            <p className="font-thin">Happy Hacking!</p>
        </div>
    )
}
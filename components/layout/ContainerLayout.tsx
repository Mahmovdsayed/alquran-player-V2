'use client'

const ContainerLayout = ({ children }: { children: React.ReactNode }) => {
    return <>
        <div className="container mx-auto my-6 px-4">
            {children}
        </div>
    </>;
};

export default ContainerLayout;
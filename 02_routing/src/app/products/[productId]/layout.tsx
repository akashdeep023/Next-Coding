export default function ProductDetailsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
            <div
                style={{
                    backgroundColor: "lightyellow",
                    fontSize: "16px",
                    padding: "5px 5px",
                }}
            >
                <p>Product Features</p>
            </div>
        </>
    );
}

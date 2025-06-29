export default function Sidebar({ page, setPage }) {
    return (
        <aside className="w-48 bg-blue-500 text-white flex flex-col items-center py-8 min-h-screen">
            <nav className="flex flex-col gap-4 w-full">
                <button
                    className={`w-full p-2 text-lg rounded ${page === "home" ? "bg-white text-blue-500" : ""}`}
                    onClick={() => setPage("home")}
                >Home</button>
                <button
                    className={`w-full p-2 text-lg rounded ${page === "cart" ? "bg-white text-blue-500" : ""}`}
                    onClick={() => setPage("cart")}
                >
                    Cart
                </button>
            </nav>
        </aside>
    );
}
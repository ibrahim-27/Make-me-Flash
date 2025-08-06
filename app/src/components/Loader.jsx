const Loader = () => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
            <div className="relative flex items-center justify-center">
                <div className="h-20 w-20 rounded-full border-4 border-t-transparent border-blue-400 animate-spin"></div>
            </div>
        </div>
    );
};

export default Loader;
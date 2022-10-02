const LoginRegisterFormLayout = ({ children }) => {
    return (
        <div className="my-12 mx-auto max-w-sm">
            <div className="shadow-2xl bg-slate-100 p-12 rounded-xl">
                {children}
            </div>
        </div>
    )
}

export { LoginRegisterFormLayout }
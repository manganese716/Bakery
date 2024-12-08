const TextInput = ({
    label,
    id,
    register,
    rule = {},
    errors,
    type = "text",
    disable = false,
}) => {
    return (
        <div className="relative flex flex-col gap-4 text-bg_brown-400">
            <p className="text-3xl">{label}</p>
            <input
                type={type}
                disabled={disable}
                className={`h-14 w-full rounded-xl border border-black px-4 text-3xl focus:outline-none ${disable ? "bg-font-200/40" : "bg-font-200"}`}
                {...register(id, rule)}
            ></input>
            {errors[id] && (
                <p className="absolute -bottom-8 right-0 text-2xl text-btn-100">
                    {errors[id]?.message}
                </p>
            )}
        </div>
    );
};

export default TextInput;

const RadioInput = ({ title, options, id, register, rule }) => {
    return (
        <div className="text-bg_brown-400">
            <p className="mb-4 text-3xl">{title}</p>
            <div className="flex gap-5">
                {options.map((option, index) => {
                    return (
                        <div
                            key={`${id}--${index}`}
                            className="flex items-center text-3xl"
                        >
                            <label
                                htmlFor={`${id}--${index}`}
                                className="flex cursor-pointer items-center gap-2"
                            >
                                <input
                                    type="radio"
                                    id={`${id}--${index}`}
                                    name={id}
                                    value={option}
                                    className="peer hidden"
                                    {...register(id, rule)}
                                />
                                <span className="aspect-square h-[1.3rem] scale-125 appearance-none rounded-full border-2 border-[#DD9D9D9] bg-[#D9D9D9] peer-checked:bg-bg_brown-300" />
                                {option}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RadioInput;

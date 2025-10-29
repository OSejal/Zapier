export const ZapCell = ({
    name,
    index,
    onClick
} : {
    name?: string;
    index: number;
    onClick: () => void;

}) => {
    return <div onClick={onClick} className="border border-black py-8 px-8 w-[300px] flex">
        <div className="flex text-xl">
        <div className="font-bold">
            {index}
        </div>
        <div>
            {name}
        </div>
        </div>
    </div>
}
import BirthdayIcon from "./assets/icons/birthday_24px.svg?react";
import DateIcon from "./assets/icons/date_24px.svg?react";
import Person from "./assets/person.jpg";

function Card() {
    
    return <>
    <div className="flex flex-col items-start">
        <CardHeader />
        <h2 className="text-3xl bold font-bold">Markus Löffler</h2>
        <h5>Bring your ideas to life with code</h5>
        <h5>Junior Web Engineer. FullStack Developer</h5>
        <div className="flex flex-row space-x-4 mt-4">
            <Icon icon={<BirthdayIcon fill="#868e96" />} text="2001/07/31" />
            <Icon icon={<DateIcon fill="#868e96" />} text="WebDev since 2018" />
        </div>
    </div>
    </>
}



function CardHeader() {
    return (
        <div className="py-2 -mx-4">
            <img src={Person} sizes="200px" className="w-28 rounded-full p-1 bg-slate-600" />
        </div>
    )
}

function Icon({icon, text}: { icon: JSX.Element, text: string}) {
    return <div className="flex flex-row">
        {icon}
        <span style={{color: "#868e96"}}>{text}</span>
    </div>
}


export default Card;
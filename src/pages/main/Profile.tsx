import Markus from "@assets/image.png";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "@css/font.css";

import { age } from "@/ts/calc";
import ProfilePicture from "@/components/shapes/profilePicture";

const Info = ({prop, value}: {prop: string, value: string}) => (
    <Box className="flex flex-row font-bold mt-1 ml-8">
        <Typography component="span" className="flex flex-row w-full text-start">
            <Box className="w-1/3 font-bold font-serif">
                {prop}:
            </Box>
            <Box className="w-2/3 font-bold font-serif">
                {value}
            </Box>
        </Typography>
    </Box>
);


const EducationInfo = ({from, to, school, degree}: {from: string, to?: string, school?: string, degree?: string[]}) => (
    <Box className="flex flex-row font-bold mt-1 ml-8 mb-5">
        <Typography component="span" className="flex flex-col w-full text-start">
            <Box className="font-bold font-serif mt-1 text-lg">
                {to ? `${from} - ${to}` : from}
            </Box>
            {school && <Box className="font-bold font-serif mt-1">
                {school}
            </Box>}
            {degree && <Box className="font-bold font-serif mt-1">
                Abschluss: 
                {degree.map((d, index) => <Box key={index} className="font-bold font-serif">{ d}</Box>)}
            </Box>}
        </Typography>
    </Box>
);


const Section = ({children, title}: {children: React.ReactNode, title: string, className?: string}) => (
    <Box>
        <Box className="flex flex-col items-start underline ml-8 mt-3">
            <Typography variant="h5">{title}</Typography>
        </Box>
        {children}
    </Box>
);

const CV = () => {

    const val = [
        {prop: "Vorname", value: "Markus"},
        {prop: "Nachname", value: "Löffler"},
        {prop: "Geburtstag", value: "31.07.2001"},
        {prop: "Titel", value: "Full-Stack-Entwickler"},
        {prop: "Wohnsitz", value: "LK Reutlingen"},
    ];


    const education: {from: string, to: string, school: string, degree?: string[]}[] = [
        {
            from: "2019",
            to: "Juni 2022",
            school: "it.schule Stuttgart",
            degree: ["Fachinformatiker für Anwendungsentwicklung"]
        },
        {
            from: "2017",
            to: "2019",
            school: "Ferdinand-von-Steinbeis-Schule Reutlingen",
            degree: ["Fachhochschulreife", "Staatlich geprüfter informations- und kommunikationstechnischer Assistent"]
        },
        {
            from: "2011",
            to: "2017",
            school: "Geschwister-Scholl-Realschule Bad Urach",
            degree: ["Mittlere Reife"]
        },
        {
            from: "2007",
            to: "2011",
            school: "Grundschule Dettingen",
        }
    ];

    const job_education: {from: string, to: string, company: string, description: string}[] = [
        {
            from: "September 2019",
            to: "Juni 2022",
            company: "Putzmeister Gruppe",
            description: "Ausbildung zum Fachinformatiker Anwendungsentwicklung"
        }
    ];

    const job_experience: {from: string, to?: string, company?: string, titles: string[]}[] = [
        {
            from: "Juni 2022",
            to: "Juni 2024",
            titles: [
                "Dev-Ops Engineer",
                "Full-Stack Developer",
                "IT Developer / Technical Test Specialist im Bereich Software Development & Quality Assurance",
                "Infrastructure Engineer"
            ]
        }
    ];

    const interns: { date: string, company: string}[] = [
        { date: "Juni 2018", company: "Advanced UniByte GmbH, Metzingen"}
    ];




    return <Box className="container flex flex-row rounded-full w-full">
                <Box className="flex flex-col w-full flex-grow flex-shrink basis-1/2 min-w-0 rounded-full">
                    {/* Section 1, left */}
                    <Box className="w-full border-2 h-full rounded-l-lg">
                        <Section title="&ensp;Persönliche Daten &ensp;">
                            {val.map(({prop, value}, index) => <Info key={index} prop={prop} value={value} />)}
                        </Section>
                        <Section title="&ensp;Ausbilding &ensp;">
                            {education.map(({from, to, school, degree}, index) => <EducationInfo key={index} from={from} to={to} school={school} degree={degree} />)}
                        </Section>
                    </Box>

                </Box>
                <Box className="flex flex-col w-full flex-grow flex-shrink basis-1/2 min-w-0">
                    {/* Section 2, right */}
                    <Box className="w-full border-2 h-full rounded-r-lg">
                        <div className="flex flex-1 justify-end">
                            <ProfilePicture src={Markus} px={150} />
                        </div>
                        <Section title="&ensp;Ausbildung &ensp;">
                            {job_education.map(({from, to, company, description}, index) => <EducationInfo key={index} from={from} to={to} school={company} degree={[description]} />)}
                        </Section>
                        <Section title="&ensp;Berufserfahrung &ensp;">
                            {job_experience.map(({from, to, titles}, index) => <EducationInfo key={index} from={from} to={to} degree={titles} />)}
                        </Section>
                        <Section title="&ensp;Praktika&ensp;">
                            {interns.map(({date, company}, index) => <EducationInfo key={index} from={date} school={company} />)}
                        </Section>
                    </Box>
                </Box>
            </Box>
}


const Name = () => (
    <Box className="w-full h-fit flex flex-col text-center">
        <Typography variant="h1" fontFamily="Pacifico">
            Markus Löffler
        </Typography>
    </Box>
);

const Quote = () => (
    <Box>
        <Typography variant="h3" fontFamily="Roboto">
            ~A machine that turns coffee into code~
        </Typography>
    </Box>
)

const Biography = () => (
    <Box>
        <Typography variant="h5" fontFamily="Roboto">
            Herzlich Willkommen auf meinem Portfolio.
            Ich heiße Markus, bin {age(new Date("2001-07-31"))} Jahre alt und bin ein JavaScript-Freund seit {age(new Date("2018-05-31"))} Jahren.
            In meiner Freizeit spiele ich gerne Handball, lerne Japanisch (まさに、日本人) programmiere eigene Projekte und lerne viel über neue Technologien.
            Täglich lebe ich am Limit, indem ich ausschließlich Linux nutze und mich gerne selbst ins kalte Wasser schmeiße. Ich finde, das hat den besten Lerneffekt.
            Links findest du meinen Lebenslauf und unten weitere Informationen über mich. Wie z.B. meine Skill-Matrix, meine Projekte und meine Kontaktdaten.
            <br />
            <br />
            Ich liebe React, weil man den meisten Komponenten nur einmal modular schreiben, und dann immer wiederverwenden kann. Damit habe ich auch diese Website in nur wenigen Tagen erstellt. 
            <div className="flex justify-center">
                Das GitHub-Repository findet man hier --&gt; &nbsp;
                <img alt="GitHub Repository" className="cursor-pointer m-auto" onClick={() => window.open("https://github.com/MarkusLoeffler01/Portfolio", "_blank")?.focus()} src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />
            </div>
        </Typography>
    </Box>
)


const Introduction = () => (
    <Box className="container w-[50vw] flex flex-nowrap flex-col flex-start [&>*]:mb-10 m-[5%]">
        <Name />
        <Quote />
        <Biography />
    </Box>
);


const Profile = ({color: _, className: __}: {color: string, className?: string}) => {
    return <div className="flex flex-row items-stretch flex-1 w-full h-full">
        <Introduction />
        <CV />
    </div>;
}


export default Profile;
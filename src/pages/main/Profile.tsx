import Markus from "@assets/image.png";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "@css/font.css";

import { age } from "@/ts/calc";
import ProfilePicture from "@/components/shapes/profilePicture";


interface InfoProps {
    prop: string;
    value: string;
}

interface EducationInfoProps {
    from: string;
    to?: string;
    school?: string;
    degree?: string[];
}

type CombinedProps = InfoProps | EducationInfoProps;

// const Info = ({ prop, value }: { prop: string; value: string }) => (
//     <Box className="flex flex-col sm:flex-row font-bold mt-1 ml-8 text-lg">
//       <Typography component="span" className="flex flex-col sm:flex-row w-full text-start">
//         <Box className="sm:w-fit w-1/3 font-bold font-serif mr-10">
//           {prop}:
//         </Box>
//         <Box sx={{}}>

//         </Box>
//         <Box className="sm:w-fit w-2/3 font-bold font-serif">
//           {value}
//         </Box>
//       </Typography>
//     </Box>
//   );

const InfoItem = <T extends CombinedProps>({ data }: { data: T }) => {
    return (
      <Box className="flex flex-col mt-1 ml-8 mb-5">
        {'prop' in data && 'value' in data ? (
          // Rendering für InfoProps
          <Box className="flex flex-col sm:flex-row mt-1">
            <Typography component="span" className="flex flex-row w-full [&>*]:text-start [&>*]:font-serif [&>*]:font-bold">
                <Box className="sm:w-1/3 text-end mr-2 md:mr-4 lg:mr-8 xl:mr-10 text-xl">
                  {data.prop}:
                </Box>
                <Box className="sm:w-2/3">
                  {data.value}
                </Box>
            </Typography>
          </Box>
        ) : (
          // Rendering für EducationProps
          <Box className="text-start lg:text-xl">
            <Box className="font-bold font-serif mt-1 text-lg">
              {data.to ? `${data.from} - ${data.to}` : data.from}
            </Box>
            {data.school && (
              <Box className="font-bold font-serif mt-1">
                {data.school}
              </Box>
            )}
            {data.degree && data.degree.length > 0 && (
              <Box className="font-normal font-serif mt-1">
                {data.degree.map((d, index) => (
                  <Box key={index} className="mt-1 ml-4 list-disc">
                    {d}
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        )}
      </Box>
    );
  };
  


  const GeneralInfo = ({ data }: { data: { prop: string; value: string }[] }) => (
    <Box className="flex flex-row mt-1 ml-8 mb-5">
      <Box className="flex flex-col w-fit pr-4 text-right font-bold font-serif">
        {data.map(({ prop }, index) => (
          <Box className="w-fit self-end font-serif" key={index}>
            {prop}:
          </Box>
        ))}
      </Box>
      <Box className="flex flex-col text-left">
        {data.map(({ value }, index) => (
          <Typography key={index}>{value}</Typography>
        ))}
      </Box>
    </Box>
  );
  

const EducationInfo = ({
  from,
  to,
  school,
  degree,
}: {
  from: string;
  to?: string;
  school?: string;
  degree?: string[];
}) => (
  <Box className="flex flex-col font-bold mt-1 ml-8 mb-5">
    <Typography component="span" className="flex flex-col w-full text-start">
      <Box className="font-bold font-serif mt-1 text-lg">
        {to ? `${from} - ${to}` : from}
      </Box>
      {school && (
        <Box className="font-bold font-serif mt-1">
          {school}
        </Box>
      )}
      {degree && (
        <Box className="font-bold font-serif mt-1">
          Abschluss:
          {degree.map((d, index) => (
            <Box key={index} component="div" className="font-bold font-serif">
              {d}
            </Box>
          ))}
        </Box>
      )}
    </Typography>
  </Box>
);

const Section = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
}) => (
  <Box>
    <Box className="flex flex-col items-start underline ml-8 mt-3">
      <Typography variant="h5">{title}</Typography>
    </Box>
    {children}
  </Box>
);

const CV = () => {
  const val = [
    { prop: "Vorname", value: "Markus" },
    { prop: "Nachname", value: "Löffler" },
    { prop: "Geburtstag", value: "31.07.2001" },
    { prop: "Titel", value: "Full-Stack-Entwickler" },
    { prop: "Wohnsitz", value: "LK Reutlingen" },
  ];

  const education: {
    from: string;
    to: string;
    school: string;
    degree?: string[];
  }[] = [
    {
      from: "2019",
      to: "Juni 2022",
      school: "it.schule Stuttgart",
      degree: ["Fachinformatiker für Anwendungsentwicklung"],
    },
    {
      from: "2017",
      to: "2019",
      school: "Ferdinand-von-Steinbeis-Schule Reutlingen",
      degree: [
        "Fachhochschulreife",
        "Staatlich geprüfter informations- und kommunikationstechnischer Assistent",
      ],
    },
    {
      from: "2011",
      to: "2017",
      school: "Geschwister-Scholl-Realschule Bad Urach",
      degree: ["Mittlere Reife"],
    },
    {
      from: "2007",
      to: "2011",
      school: "Grundschule Dettingen",
    },
  ];

  const job_education: {
    from: string;
    to: string;
    company: string;
    description: string;
  }[] = [
    {
      from: "September 2019",
      to: "Juni 2022",
      company: "Putzmeister Gruppe",
      description: "Ausbildung zum Fachinformatiker Anwendungsentwicklung",
    },
  ];

  const job_experience: {
    from: string;
    to?: string;
    company?: string;
    titles: string[];
  }[] = [
    {
      from: "Juni 2022",
      to: "Juni 2024",
      titles: [
        "Dev-Ops Engineer",
        "Full-Stack Developer",
        "IT Developer / Technical Test Specialist im Bereich Software Development & Quality Assurance",
        "Infrastructure Engineer",
      ],
    },
  ];

  const interns: { date: string; company: string }[] = [
    { date: "Juni 2018", company: "Advanced UniByte GmbH, Metzingen" },
  ];

  return (
    <Box className="flex flex-col md:flex-row w-full flex-[2]">
      <Box className="flex flex-col w-full md:w-1/2">
        {/* Section 1, left */}
        <Box className="md:w-fit border-2 h-full rounded-l-lg md:p-2 md:pt-32">
          <Section title="&ensp;Persönliche Daten &ensp;">
            <GeneralInfo data={val} />
          </Section>
          <Section title="&ensp;Ausbildung &ensp;">
            {education.map(({ from, to, school, degree }, index) => (
            <InfoItem key={index} data={{from, to, school, degree}} />
            ))}
          </Section>
        </Box>
      </Box>
      <Box className="flex flex-col w-full md:w-1/2">
        {/* Section 2, right */}
        <Box className="w-full border-2 h-full rounded-r-lg md:p-2">
          <div className="flex justify-end md:justify-end content-end p-4">
            <ProfilePicture src={Markus} className="w-32 h-32 md:w-48 md:h-48 mr-6 mt-6 absolute md:relative lg:relative xl:relavitve 2xl:relative" />
          </div>
          <Section title="&ensp;Ausbildung &ensp;">
            {job_education.map(
              ({ from, to, company, description }, index) => (
                <EducationInfo
                  key={index}
                  from={from}
                  to={to}
                  school={company}
                  degree={[description]}
                />
              )
            )}
          </Section>
          <Section title="&ensp;Berufserfahrung &ensp;">
            {job_experience.map(({ from, to, titles }, index) => (
              <EducationInfo
                key={index}
                from={from}
                to={to}
                degree={titles}
              />
            ))}
          </Section>
          <Section title="&ensp;Praktika&ensp;">
            {interns.map(({ date, company }, index) => (
              <EducationInfo key={index} from={date} school={company} />
            ))}
          </Section>
        </Box>
      </Box>
    </Box>
  );
};

const Name = () => (
  <Box className="w-full h-fit flex flex-col text-center">
    <Typography variant="h4" fontFamily="Pacifico">
      Markus Löffler
    </Typography>
  </Box>
);

const Quote = () => (
  <Box>
    <Typography variant="h5" fontFamily="Roboto" className="text-center" sx={{
        fontSize: {
            md: "1.5rem",
            lg: "2rem",
            xl: "3rem",
        }
    }}>
      ~A machine that turns coffee into code~
    </Typography>
  </Box>
);

const Biography = () => (
    <Box>
      <Typography
        variant="body1"
        fontFamily="Roboto"
        sx={{
          fontSize: {
            md: "1rem",
            lg: "1.25rem",
            xl: "1.5rem",
          },
        }}
      >
        Herzlich Willkommen auf meinem Portfolio. Ich heiße Markus, bin{" "}
        {age(new Date("2001-07-31"))} Jahre alt und bin ein JavaScript-Freund seit{" "}
        {age(new Date("2018-05-31"))} Jahren. In meiner Freizeit spiele ich gerne
        Handball, lerne Japanisch (まさに、日本人), programmiere eigene Projekte und
        lerne viel über neue Technologien. Täglich lebe ich am Limit, indem ich
        ausschließlich Linux nutze und mich gerne selbst ins kalte Wasser
        schmeiße. Ich finde, das hat den besten Lerneffekt. Ich nutze privat
        ausschließlich Linux für meine Projekte und für meine Freizeit und bin ein
        großer Fan von Open-Source-Software. Rechts findest du meinen Lebenslauf
        und unten weitere Informationen über mich, wie z.B. meine Skill-Matrix,
        meine Projekte und meine Kontaktdaten.
        <br />
        <br />
        Ich liebe React, weil man den meisten Komponenten nur einmal modular
        schreiben und dann immer wiederverwenden kann. Damit habe ich auch diese
        Website mit nur wenig Aufwand erstellt.
      </Typography>
      {/* Das DIV wurde außerhalb des Typography-Elements platziert */}
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        mt={2}
      >
        <Typography fontFamily="Roboto">
          Das GitHub-Repository findet man hier --&gt;&nbsp;
        </Typography>
        <img
          alt="GitHub Repository"
          className="cursor-pointer"
          onClick={() =>
            window
              .open("https://github.com/MarkusLoeffler01/Portfolio", "_blank")
              ?.focus()
          }
          src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"
        />
      </Box>
    </Box>
  );

const Introduction = () => (
    /**
     * ! Flex 1 ist wichtig, um dem Lebenslauf genug Platz zu geben
     */
  <Box className="flex flex-col md:flex-row md:mr-5 flex-start" sx={{flex: "1"}}>
    <Box className="[&>*]:mb-10 m-[5%] md:mr-2">
      <Name />
      <Quote />
      <Biography />
    </Box>
  </Box>
);

const Profile = ({
  color: _,
  className: __,
}: {
  color: string;
  className?: string;
}) => {
  return (
    <div className="flex flex-col md:flex-row items-stretch flex-1 w-full h-full">
      <Introduction />
      <CV />
    </div>
  );
};

export default Profile;

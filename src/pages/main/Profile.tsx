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
              <Box className="font-bold font-serif mt-1">
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
    <Box className="flex h-fit flex-row mt-1 ml-8 mb-5">
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
  isJob = false,
}: {
  from: string;
  to?: string;
  school?: string;
  degree?: string[];
  isJob?: boolean;
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
          {isJob ? "Tätigkeit:" : "Abschluss:"}
          {degree.map((d, index) => (
            <Box key={index} component="div" className="font-bold font-serif pl-3">
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
      company: "netcare Business Solutions GmbH",
      titles: [
        "Dev-Ops Engineer",
        "Full-Stack Developer",
        "IT Developer / Technical Test Specialist im Bereich Software Development & Quality Assurance",
        "Infrastructure Engineer",
      ],
    },
    {
      from: "September 2024",
      to: "Januar 2025",
      company: "merlin.zwo GmbH",
      titles: [
        "Systementwickler",
        "Oracle Apex Entwickler"
      ]
    }
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
          <div className="w-full sm:w-fit flex justify-end md:justify-center content-end p-4">
            <ProfilePicture src={Markus} className="w-32 h-32 md:w-72 md:h-72 mr-6 mt-6 md:relative lg:relative xl:relavitve 2xl:relative" />
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
            {job_experience.map(({ from, to, titles, company }, index) => (
              <EducationInfo
                key={index}
                from={from}
                school={company}
                to={to}
                degree={titles}
                isJob={true}
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
    <Typography variant="h2" fontFamily="Pacifico">
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
        sx={{
          fontSize: {
            md: "1rem",
            lg: "1.25rem",
            xl: "1.5rem",
          },
        }}
      >
        Herzlich Willkommen auf meinem Portfolio. Ich heiße Markus, bin{" "}
        {age(new Date("2001-07-31"))} Jahre alt und beschäftige mich seit {" "}
        {age(new Date("2018-05-31"))} Jahren mit JavaScript. In meiner Freizeit mache ich gerne Sport, zeige Engegement in einer demokratischen Partei, lerne Japanisch (まさに、日本人), entwickle eigene Projekte und informiere mich über neue Technologien. 
        Ich nutze privat ausschließlich Linux für meine Projekte und bin ein großer Verfechter von Open-Source-Software.
        Die Arbeit mit React begeistert mich besonders, da ich Komponenten modular entwickeln und wiederverwenden kann. So konnte ich auch diese Website praktisch umsetzen.
        <br />
        <br />
        Anbei finden Sie meinen Lebenslauf sowie weitere Informationen über meine Fähigkeiten, meiner Arbeitsweise und Kontaktdaten. Ich freue mich darauf, mich persönlich bei Ihnen vorzustellen und mehr über die Möglichkeiten einer Zusammenarbeit zu erfahren.
      </Typography>
      {/* Das DIV wurde außerhalb des Typography-Elements platziert */}
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        mt={2}
      >
        <Typography>
          Das GitHub-Repository finden Sie hier --&gt;&nbsp;
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

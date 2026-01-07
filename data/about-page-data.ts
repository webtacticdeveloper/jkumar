import {
  Award,
  BrainCircuit,
  Eye,
  HandHeart,
  Handshake,
  HardHat,
  Leaf,
  Puzzle,
  ShieldCheck,
  Sprout,
  Target,
} from "lucide-react";


export const verticals = [
  {
    name: "Metro",
    description: "Underground & elevated systems, stations, depots",
    href: "/projects/metro",
    icon: "/images/about/metro.png",
    src: "/images/metro/1761296408714-metro1.webp",
  },
  {
    name: "Flyovers",
    description: "Urban grade separations & interchanges",
    href: "/projects/flyovers",
    icon: "/images/about/modern-bridge-road-symbol.png",
    src: "/images/flyovers/1761406809389-home-flyover.webp",
  },
  {
    name: "Bridges & Skywalks",
    description: "River and creek crossings engineered for durability",
    href: "/projects/bridges",
    icon: "/images/about/golden-gate.png",
    src: "/images/sky-walks/1761800803511-skywalk3.webp",
  },
  {
    name: "Roads",
    description: "Expressways and city roads, turnkey execution",
    href: "/projects/roads",
    icon: "/images/about/bridge.png",
    src: "/images/roads/1761732119877-home-roads1.webp",
  },
  {
    name: "Urban Infra",
    description: "Civic infrastructure, stations, skywalks",
    href: "/projects/urban-infra",
    icon: "/images/about/business.png",
    src: "/images/urban-infra/1761743358627-JKI_0857.webp",
  },
  {
    name: "Dams & Canals",
    description: "Irrigation, water works and river systems",
    href: "/projects/dams-and-canals",
    icon: "/images/about/power.png",
    src: "/images/dams-and-canals/1761803677717-DAM_NEW2.webp",
  },
];

export const values = [
  {
    name: "Excellence",
    description:
      "We strive for excellence in all aspects of our work, delivering top-tier solutions and services.",
    Icon: Award,
  },
  {
    name: "Integrity",
    description:
      "We conduct ourselves with honesty, transparency, and ethical practices, building trust with all stakeholders.",
    Icon: ShieldCheck,
  },
  {
    name: "Innovation",
    description:
      "We embrace creativity and innovation to push the boundaries of what's possible and deliver groundbreaking solutions.",
    Icon: BrainCircuit,
  },
  {
    name: "Safety",
    description:
      "We prioritize the safety and well-being of our team, clients, and the communities we serve, ensuring a secure work environment.",
    Icon: HardHat,
  },
  {
    name: "Collaboration",
    description:
      "We foster a culture of collaboration and teamwork, leveraging diverse perspectives to achieve collective success.",
    Icon: Handshake,
  },
  {
    name: "Sustainability",
    description:
      "We are committed to sustainable practices, ensuring our projects have a positive impact on the environment and communities.",
    Icon: Leaf,
  },
  {
    name: "Social Responsibility",
    description:
      "We actively engage in social initiatives, giving back to the communities we operate in and uplifting lives.",
    Icon: HandHeart,
  },
  {
    name: "Professional Growth",
    description:
      "We invest in the continuous growth and development of our team, empowering them to reach their full potential.",
    Icon: Sprout,
  },
  {
    name: "Adaptability",
    description:
      "We embrace change and adapt to new challenges and opportunities, staying agile in a dynamic industry.",
    Icon: Puzzle,
  },
];

export const missionVision = [
  {
    name: "Vision",
    description:
      "Our vision is to be a global leader in infrastructure development, setting new standards of excellence and positively impacting societies through our transformative projects.",
    Icon: Eye,
  },
  {
    name: "Mission",
    description:
      "Our mission is to revolutionize the infrastructure industry by consistently delivering innovative and sustainable solutions that enrich lives and drive progress for generations to come.",
    Icon: Target,
  },
];

export interface Award {
  id: number;
  image: string;
  description: string;
}

export const awardsData: Award[] = [
  {
    id: 1,
    image: "/images/awards/award1.webp",
    description:
      "Winner of Metro Rail Contractor of The Year 2022 Awarded By Construction Week India",
  },
  {
    id: 2,
    image: "/images/awards/award2.webp",
    description:
      "Third Fastest Growing Construction Company Award Awarded By Construction World Global Awards",
  },
  {
    id: 3,
    image: "/images/awards/award3.webp",
    description:
      "Safety Innovation Award 2024 awarded by The Institute of Engineers (India) for implementing Innovative Safety Management Systems",
  },
  {
    id: 4,
    image: "/images/awards/award4.webp",
    description:
      "20th Construction World Global Awards For Being one Of India's Top Challengers 2021-2022",
  },
  {
    id: 5,
    image: "/images/awards/award5.webp",
    description:
      "Winner of Metro Rail Contractor of The Year 2022 Awarded By Construction Week India",
  },
  {
    id: 6,
    image: "/images/awards/award6.webp",
    description:
      "Winner of Metro Rail Contractor of The Year 2020 Awarded By Construction Week India",
  },
  {
    id: 7,
    image: "/images/awards/award7.webp",
    description:
      "18th Construction World Global Awards For Being one Of India's Top Challengers 2019-2020",
  },
  {
    id: 8,
    image: "/images/awards/award8.webp",
    description:
      "17th Construction World Global Awards 2019 awarded for India's Top Challengers 2018-19",
  },
  {
    id: 9,
    image: "/images/awards/award9.webp",
    description:
      "BAI - Shirke Award for D N Nagar Corridor Awarded By Builders Association Of India - Pune",
  },
  {
    id: 10,
    image: "/images/awards/award10.webp",
    description:
      "Certificate of Appreciation Delhi Metro Rail Corporation Ltd.",
  },
  {
    id: 11,
    image: "/images/awards/award11.webp",
    description:
      "17th Construction World Global Awards For Being one Of India's Top Challengers. Awarded By First Construction Council",
  },
  {
    id: 12,
    image: "/images/awards/award12.webp",
    description:
      "Recipient of Bronze Award OSHAI Awarded for Excellence & Sustainability 2018",
  },
  {
    id: 13,
    image: "/images/awards/award13.webp",
    description:
      "Times Power Men West 2018 awarded for Visionary Entrepreneur of Infrastructure",
  },
  {
    id: 14,
    image: "/images/awards/award14.webp",
    description:
      "2nd Fastest Growing Construction Company Award Awarded By Apollo Construction World Awards",
  },
  {
    id: 15,
    image: "/images/awards/award15.webp",
    description:
      "ICI - Pune Birla Super Award For Outstanding Concrete Structure of Pune",
  },
  {
    id: 16,
    image: "/images/awards/award16.webp",
    description:
      "ICI - Pune Birla Super Award For Outstanding Concrete Structure of Pune",
  },
  {
    id: 17,
    image: "/images/awards/award17.webp",
    description:
      "Winner of Safety Innovation Award 2014 Awarded By The Institute of Engineers India - Delhi State",
  },
  {
    id: 18,
    image: "/images/awards/award18.webp",
    description:
      "9th Construction World Annual Awards 2011 awarded for Fastest Growing Construction Company",
  },
  {
    id: 19,
    image: "/images/awards/award19.webp",
    description: "Infrastructure Excellence Award 2010 Awarded By Essar Steel",
  },
  {
    id: 20,
    image: "/images/awards/award20.webp",
    description:
      "Certificate of Appreciation 2010 Mumbai Rail Vikas Corporation",
  },
  {
    id: 21,
    image: "/images/awards/award21.webp",
    description: "Udyog Ratan Award by Institute of Economic Studies",
  },
  {
    id: 22,
    image: "/images/awards/award22.webp",
    description:
      "6th Most Outstanding Bridge National Award 1999 Awarded By Indian Institution of Bridge Association",
  },
  {
    id: 23,
    image: "/images/awards/award23.webp",
    description: "Udyog Rattan Award Awarded By Institute of Economic Studies",
  },
  {
    id: 24,
    image: "/images/awards/award24.webp",
    description:
      "Times Power Men West 2018 awarded for Visionary Entrepreneur of Infrastructure",
  },
  {
    id: 25,
    image: "/images/awards/award25.webp",
    description:
      "Winner of Safety Innovation Award 2014 Awarded By The Institute of Engineers India",
  },
  {
    id: 26,
    image: "/images/awards/award26.webp",
    description: "Udyog Ratan Award by Institute of Economic Studies",
  },
  {
    id: 27,
    image: "/images/awards/award27.webp",
    description:
      "Rajiv Gandhi Shiromani Award by His Excellency Dr. A. R. Kidwai (Governor of Haryana)",
  },
];

export interface LeadershipCardProps {
  name: string;
  designation: string;
  image: string;
  description: string;
}

export const leaders: LeadershipCardProps[] = [
  {
    name: "Mr. Jagdishkumar M. Gupta",
    designation: "Executive Chairman",
    image: "/images/leader-1.webp",
    description: `J. Kumar's success story is a compelling tale of ambition, commitment, and excellence. The journey began in 1980, when the Company secured a contract amounting to ₹ 15,000 and successfully earned ₹ 2,250 from it. Today, under the leadership of Mr. Jagdish Gupta, the organization employs nearly 7,300 people and boasts work orders worth approximately ₹ 16,744 Cr When asked about the reason behind this phenomenal success, Mr. Jagdishkumar Gupta gladly attributes it to dedication and an unwavering commitment. He firmly believes that no project is too big or small, and once undertaken, it deserves one's complete dedication. Compromise and procrastination have no place in his philosophy. For him, the present moment is always the best time to undertake any valuable endeavor. Mr. Jagdishkumar Gupta takes personal responsibility for overseeing and controlling every aspect of J. Kumar's operations.`,
  },
  {
    name: "Mr. Kamal J. Gupta",
    designation: "Managing Director",
    image: "/images/leader-2.webp",
    description:
      "Mr. Kamal posses meticulous eye for detail and boasts extensive experience spanning nearly two decades. His expertise is evident in his facilitation of new ideas, adoption of cutting-edge technologies, and empowerment of technical innovations. Mr. Kamal Gupta spearheaded the implementation of Segmental construction with Overhead Launcher and Pavement Quality Concrete (PQC) utilizing sensor paver. His efforts towards team building and fostering connections have propelled J. Kumar to new heights. His experience across various sectors has provided him with valuable insights into the cost-effective execution of projects. Moreover, he has been instrumental in initiating and successfully delivering a diverse range of projects, including Flyovers, Metros, Road Over Bridges (ROBs), Express Highways, Marine works, and more. Notably, he has overseen the construction of a large multi-specialty hospital, the tallest flyover, and the fastest constructed overpass. These remarkable achievements serve as a testament to J. Kumar's outstanding capabilities",
  },
  {
    name: "Dr. Nalin J. Gupta",
    designation: "Managing Director",
    image: "/images/leader-3.webp",
    description:
      "Dr. Nalin, a Commerce graduate and esteemed member of the Indian Institution of Bridge Engineers, assumed the role of Projects Head in 1996. A staunch advocate of honesty and hard work, he firmly believes that every problem holds an undiscovered solution. With an unwavering commitment to excellence and a propensity for challenging the status quo, his disciplined approach inspires the workforce to deliver their best. Mr. Nalin embarked on his journey by establishing a single commercial RMC plant in Pune. Within a span of six years, J. Kumar's RMC Division flourished, expanding to encompass 16 RMC plants, accompanied by a unique R&D center for concrete. This center has played a pivotal role in the development of groundbreaking achievements, including concrete with strengths of up to 1250 MPa, colored concrete, floating concrete, and concrete formulations without cement and aggregate. Additionally, he pioneered the establishment of a Piling division, which commenced with a sole conventional Piling Rig and has now flourished into a fleet of 44 Hydraulic Piling Rigs. Another significant milestone under Dr. Nalin Gupta's leadership was the establishment of a Batch Mix Plant and crusher specifically tailored for BRTS projects. Presently, J. Kumar owns and operates seven TBM machines, tirelessly working on projects day and night. Thanks to Mr. Nalin's tireless efforts, J. Kumar has emerged as one of the most prominent order book companies for DMRC.",
  },
];

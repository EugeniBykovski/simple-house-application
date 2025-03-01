import {
  acmeLogo,
  apexLogo,
  celestialLogo,
  echoLogo,
  pulseLogo,
  quantumLogo,
} from "@/public/assets";

export const supportedLocales = ["en", "ru"];

export const logos = [
  { src: acmeLogo, alt: "acme logo" },
  { src: quantumLogo, alt: "quantum logo" },
  { src: echoLogo, alt: "echo logo" },
  { src: celestialLogo, alt: "celestial logo" },
  { src: pulseLogo, alt: "pulse logo" },
  { src: apexLogo, alt: "apex logo" },
];

export const advertisements = [
  {
    id: 1,
    title: "Best Product A",
    description: "The best product you need!",
    best: true,
    phone: "+48112233456",
    hourOpen: "9",
    hourClose: "19",
  },
  {
    id: 2,
    title: "Good Product B",
    description: "Highly rated by users.",
    best: false,
    phone: "+48112233456",
    hourOpen: "7",
    hourClose: "22",
  },
  {
    id: 3,
    title: "Best Product C",
    description: "A top choice for everyone.",
    best: true,
    phone: "+48112233456",
    hourOpen: "10",
    hourClose: "19",
  },
  {
    id: 4,
    title: "Regular Product D",
    description: "Affordable and reliable.",
    best: false,
    phone: "+48112233456",
    hourOpen: "9.30",
    hourClose: "20.30",
  },
  {
    id: 5,
    title: "Best Product E",
    description: "Affordable and reliable.",
    best: true,
    phone: "+48112233456",
    hourOpen: "9.30",
    hourClose: "19.30",
  },
  {
    id: 6,
    title: "Best Product F",
    description: "Reliable choice",
    best: true,
    phone: "+48112233456",
    hourOpen: "10",
    hourClose: "23",
  },
];

export const selectOptions = [
  { label: "Month", value: "month" },
  { label: "Week", value: "week" },
  { label: "Day", value: "day" },
];

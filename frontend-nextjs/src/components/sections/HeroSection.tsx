"use client";

import { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Users,
  BookOpen,
  Globe,
} from "lucide-react";

import { HOME_STATS } from "@/constants";

const SLIDES = [
{
id:1,
badge:"Éducation — Nigeria",
title:"300 enfants ont",
titleAccent:"retrouvé le chemin",
titleEnd:"de l’école",
description:"Construction d’une école primaire complète dans la région de Kano.",
image:"https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1920&q=80",
cta:"Voir le projet",
ctaHref:"/projets",
stat:{value:"300",label:"enfants scolarisés"},
accent:"text-secondary-400"
},

{
id:2,
badge:"Eau — Mali",
title:"2 500 personnes ont",
titleAccent:"accès à l’eau",
titleEnd:"potable",
description:"Installation de 12 points d’eau dans plusieurs villages.",
image:"https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=1920&q=80",
cta:"Découvrir",
ctaHref:"/projets",
stat:{value:"12",label:"points installés"},
accent:"text-blue-300"
},

{
id:3,
badge:"Impact Global",
title:"35 pays",
titleAccent:"une seule",
titleEnd:"mission",
description:"Nous agissons pour créer un changement durable.",
image:"https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80",
cta:"Notre impact",
ctaHref:"/projets",
stat:{value:"35",label:"pays"},
accent:"text-secondary-400"
},
];

const iconMap={
users:Users,
folder:BookOpen,
globe:Globe,
heart:Heart
};

export default function HeroSection(){

const [index,setIndex]=useState(0);

const [emblaRef,embla]=useEmblaCarousel(
{
loop:true,
align:"start"
},
[
Autoplay({
delay:5500,
stopOnInteraction:false
})
]
);

const previous=useCallback(()=>{
embla?.scrollPrev();
},[embla]);

const next=useCallback(()=>{
embla?.scrollNext();
},[embla]);

const select=useCallback(()=>{
if(!embla)return;
setIndex(embla.selectedScrollSnap());
},[embla]);

useEffect(()=>{

if(!embla)return;

select();

embla.on("select",select);

return ()=>{
embla.off("select",select);
};

},[embla,select]);

return(

<div>

<section
className="
relative
h-[90vh]
md:h-screen
overflow-hidden
"
>

<div
ref={emblaRef}
className="overflow-hidden h-full"
>

<div className="flex h-full">

{SLIDES.map((slide)=>(

<div
key={slide.id}
className="
relative
min-w-0
flex-[0_0_100%]
h-full
"
>

<Image
src={slide.image}
alt={slide.title}
fill
priority
sizes="100vw"
className="object-cover"
/>

<div className="absolute inset-0 bg-black/55"/>

<div className="absolute inset-0">

<div
className="
max-w-7xl
mx-auto
h-full
flex
items-center
px-6
"
>

<div
className="
max-w-3xl
pt-24
"
>

<div
className="
inline-flex
rounded-full
bg-white/10
backdrop-blur
px-4
py-2
text-white
text-sm
mb-6
"
>
{slide.badge}
</div>

<h1
className="
text-white
font-bold
leading-tight
text-4xl
sm:text-5xl
lg:text-7xl
mb-6
"
>
{slide.title}

<span
className={`${slide.accent}`}
>
{" "}
{slide.titleAccent}
</span>

{" "}
{slide.titleEnd}
</h1>

<p
className="
text-white/85
text-base
sm:text-xl
max-w-2xl
mb-8
"
>
{slide.description}
</p>

<div
className="
flex
flex-col
sm:flex-row
gap-4
"
>

<Link
href="/don"
className="
px-8
py-4
rounded-2xl
bg-secondary-600
text-white
font-bold
inline-flex
items-center
gap-2
hover:scale-105
transition
"
>
<Heart size={18}/>
Faire un don
</Link>

<Link
href={slide.ctaHref}
className="
px-8
py-4
rounded-2xl
bg-white/15
backdrop-blur
border
border-white/20
text-white
inline-flex
items-center
gap-2
hover:scale-105
transition
"
>
{slide.cta}
<ArrowRight size={18}/>
</Link>

</div>

<div
className="
mt-10
inline-flex
items-center
gap-5
bg-white/10
rounded-2xl
px-6
py-4
backdrop-blur
"
>

<div>

<div
className="
text-white
text-4xl
font-bold
"
>
{slide.stat.value}
</div>

<div
className="
text-white/70
"
>
{slide.stat.label}
</div>

</div>

</div>

</div>

</div>

</div>

</div>

))}

</div>

</div>

<button
onClick={previous}
className="
absolute
left-4
top-1/2
-translate-y-1/2
z-20
w-12
h-12
rounded-xl
bg-white/15
backdrop-blur
text-white
"
>
<ChevronLeft/>
</button>

<button
onClick={next}
className="
absolute
right-4
top-1/2
-translate-y-1/2
z-20
w-12
h-12
rounded-xl
bg-white/15
backdrop-blur
text-white
"
>
<ChevronRight/>
</button>

<div
className="
absolute
bottom-6
left-1/2
-translate-x-1/2
flex
gap-2
"
>

{SLIDES.map((_,i)=>(

<button
key={i}
onClick={()=>embla?.scrollTo(i)}
className={`
h-2
rounded-full
transition

${
i===index
?
"w-12 bg-white"
:
"w-4 bg-white/40"
}
`}
/>

))}

</div>

</section>

<section
className="
bg-primary-950
py-8
"
>

<div
className="
max-w-7xl
mx-auto
grid
grid-cols-2
lg:grid-cols-4
gap-8
px-6
"
>

{HOME_STATS.map((item)=>{

const Icon=
iconMap[
item.icon as keyof typeof iconMap
]||Heart;

return(

<div
key={item.label}
className="
flex
items-center
gap-4
"
>

<div
className="
w-14
h-14
rounded-xl
bg-white/10
flex
items-center
justify-center
"
>

<Icon
className="
text-secondary-400
"
/>

</div>

<div>

<div
className="
text-white
font-bold
text-3xl
"
>
{item.value}
</div>

<div
className="
text-white/60
text-sm
"
>
{item.label}
</div>

</div>

</div>

);

})}

</div>

</section>

</div>

);

}
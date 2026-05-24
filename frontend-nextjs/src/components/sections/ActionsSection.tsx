"use client";

import { useEffect, useState } from "react";

const actions = [
{
title:"Éducation",
image:"https://picsum.photos/900/700?1",
},
{
title:"Santé",
image:"https://picsum.photos/900/700?2",
},
{
title:"Eau potable",
image:"https://picsum.photos/900/700?3",
},
{
title:"Nutrition",
image:"https://picsum.photos/900/700?4",
},
{
title:"Protection enfance",
image:"https://picsum.photos/900/700?5",
},
{
title:"Formation",
image:"https://picsum.photos/900/700?6",
},
{
title:"Impact local",
image:"https://picsum.photos/900/700?7",
},
{
title:"Solidarité",
image:"https://picsum.photos/900/700?8",
},
{
title:"Développement",
image:"https://picsum.photos/900/700?9",
},
{
title:"Autonomisation",
image:"https://picsum.photos/900/700?10",
},
];

export default function ActionsSection(){

const [current,setCurrent]=useState(0);

const [pause,setPause]=useState(false);

const next=()=>{

setCurrent((old)=>

old>=actions.length-3
?0
:old+1

);

};

const prev=()=>{

setCurrent((old)=>

old<=0
?actions.length-3
:old-1

);

};

useEffect(()=>{

if(pause)return;

const timer=setInterval(()=>{

next();

},3500);

return()=>clearInterval(timer);

},[current,pause]);

return(

<section className="py-24 bg-white">

<div className="max-w-7xl mx-auto px-6">

<div className="text-center mb-14">

<span
className="
inline-block
bg-yellow-100
text-yellow-700
px-5
py-2
rounded-full
"
>

Nos réalisations

</span>

<h2
className="
text-5xl
font-bold
mt-5
"
>

Nos actions récentes

</h2>

<p
className="
text-gray-500
mt-4
"
>

Découvrez nos initiatives.

</p>

</div>

<div

className="
relative
"

onMouseEnter={()=>
setPause(true)
}

onMouseLeave={()=>
setPause(false)
}

>

<button

onClick={prev}

className="
absolute
left-[-20px]
top-1/2
-z-0
-translate-y-1/2

w-12
h-12

rounded-full

bg-white

shadow-xl

hover:scale-105

transition
"

>

←

</button>

<button

onClick={next}

className="
absolute
right-[-20px]
top-1/2
-z-0
-translate-y-1/2

w-12
h-12

rounded-full

bg-yellow-500

text-white

shadow-xl

hover:scale-105

transition
"

>

→

</button>

<div
className="
overflow-hidden
"
>

<div

className="
flex
gap-8
transition-transform
duration-1000
"

style={{
transform:`translateX(-${current*360}px)`
}}

>

{actions.map((item,index)=>(

<div

key={index}

className="
min-w-[340px]

rounded-[30px]

overflow-hidden

shadow-xl

bg-white

group
"

>

<div
className="
overflow-hidden
"
>

<img

src={item.image}

alt={item.title}

className="
w-full
h-[260px]

object-cover

group-hover:scale-110

transition-transform

duration-[3000ms]
"

/>

</div>

<div className="p-7">

<h3
className="
text-2xl
font-bold
mb-4
"
>

{item.title}

</h3>

<button

className="
bg-yellow-500

hover:bg-yellow-600

text-white

px-6

py-3

rounded-xl
"

>

Découvrir

</button>

</div>

</div>

))}

</div>

</div>

{/* RECTANGLES */}

<div

className="
flex

justify-center

gap-3

mt-10
"

>

{actions.map((_,i)=>(

<button

key={i}

onClick={()=>
setCurrent(i)
}

className={

`
transition-all

duration-500

${
current===i

?

"w-14 h-[6px] bg-yellow-500 rounded-md"

:

"w-8 h-[6px] bg-gray-300 rounded-md hover:bg-gray-500"
}

`

}

/>

))}

</div>

</div>

</div>

</section>

);

}
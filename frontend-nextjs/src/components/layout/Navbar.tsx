"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Heart, ChevronDown } from "lucide-react";
import { NAV_LINKS } from "@/constants";

export default function Navbar() {

const [isOpen,setIsOpen]=useState(false);

const [scrolled,setScrolled]=useState(false);

const [activeDropdown,setActiveDropdown]=useState<string|null>(null);

useEffect(()=>{

const handleScroll=()=>{

setScrolled(window.scrollY>30);

};

window.addEventListener("scroll",handleScroll);

return()=>window.removeEventListener("scroll",handleScroll);

},[]);

return(

<header

className={

`
fixed
top-0
left-0
right-0
z-50

transition-all
duration-500

${

scrolled

?

"bg-white shadow-lg py-3"

:

"bg-gradient-to-r from-primary-950/95 via-primary-900/95 to-primary-800/95 backdrop-blur-md py-4"

}

`

}

>

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

<nav className="flex items-center justify-between">

<Link
href="/"

className="
flex
items-center
gap-3
min-w-0
"

>

<div
className="
relative

w-10
h-10

sm:w-12
sm:h-12

flex-shrink-0
"
>

<Image
src="/logo.png"
alt="logo"
fill
priority
className="object-contain"
/>

</div>

<div className="min-w-0">

<h1

className={

`
font-bold

leading-none

truncate

text-lg

sm:text-xl

${
scrolled

?

"text-neutral-900"

:

"text-white"

}

`

}

>

Help

<span
className={

scrolled

?

"text-primary-600"

:

"text-secondary-400"

}

>

Funds

</span>

</h1>

<p

className={

`
text-[10px]

sm:text-xs

truncate

mt-1

${
scrolled

?

"text-neutral-400"

:

"text-white/60"

}

`

}

>

ONG Internationale

</p>

</div>

</Link>

<ul className="hidden lg:flex items-center gap-1">

{NAV_LINKS.map((link)=>(

<li
key={link.href}
className="relative"
>

{link.children?(

<div

onMouseEnter={()=>
setActiveDropdown(link.label)
}

onMouseLeave={()=>
setActiveDropdown(null)
}

>

<button

className={

`
px-4
py-2

rounded-xl

flex
items-center
gap-1

transition

${
scrolled

?

"text-neutral-700 hover:bg-primary-50"

:

"text-white hover:bg-white/10"

}

`

}

>

{link.label}

<ChevronDown size={16}/>

</button>

{

activeDropdown===link.label&&(

<div

className="
absolute
top-full
left-0

mt-3

w-56

bg-white

rounded-2xl

shadow-xl

overflow-hidden
"

>

{

link.children.map((child)=>(

<Link

key={child.href}

href={child.href}

className="
block

px-5

py-4

hover:bg-primary-50
"

>

{child.label}

</Link>

))

}

</div>

)

}

</div>

):(

<Link

href={link.href}

className={

`
px-4
py-2

rounded-xl

transition

${
scrolled

?

"text-neutral-700 hover:bg-primary-50"

:

"text-white hover:bg-white/10"

}

`

}

>

{link.label}

</Link>

)}

</li>

))}

</ul>

<div className="hidden lg:flex items-center gap-3">

<Link

href="/contact"

className="px-5 py-3 rounded-xl border border-primary-500 text-primary-600"

>

Contact

</Link>

<Link

href="/don"

className="
bg-secondary-600

text-white

px-5

py-3

rounded-xl

flex

items-center

gap-2
"

>

<Heart size={16}/>

Faire un don

</Link>

</div>

<button

onClick={()=>
setIsOpen(!isOpen)
}

className="lg:hidden"

>

{

isOpen

?

<X color="white"/>

:

<Menu color="white"/>

}

</button>

</nav>

{

isOpen&&(

<div

className="
lg:hidden

mt-4

bg-white

rounded-3xl

shadow-2xl

p-5
"

>

<div className="space-y-2">

{

NAV_LINKS.map((link)=>(

<Link

key={link.href}

href={link.href}

onClick={()=>
setIsOpen(false)
}

className="
block

px-4

py-4

rounded-xl

hover:bg-primary-50
"

>

{link.label}

</Link>

))

}

</div>

<div className="mt-6 space-y-3">

<Link

href="/contact"

className="
block

text-center

py-4

rounded-xl

border
"

>

Contact

</Link>

<Link

href="/don"

className="
block

text-center

py-4

rounded-xl

bg-secondary-600

text-white
"

>

Faire un don

</Link>

</div>

</div>

)

}

</div>

</header>

);

}
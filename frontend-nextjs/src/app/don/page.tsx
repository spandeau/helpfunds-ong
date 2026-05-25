export default function DonationPage() {
return (

<main className="pt-32 pb-20">

<div className="max-w-6xl mx-auto px-6">

<div className="text-center mb-16">

<p className="text-primary-600 font-semibold mb-3">
FAIRE UN DON
</p>

<h1 className="text-5xl font-bold mb-5">
Changez une vie aujourd’hui
</h1>

<p className="text-neutral-600 max-w-2xl mx-auto">
Votre contribution finance directement les actions sur le terrain.
</p>

</div>

<div className="grid lg:grid-cols-2 gap-10">

<div className="bg-white rounded-3xl p-8 shadow-xl">

<h2 className="text-2xl font-bold mb-6">
Montant du don
</h2>

<div className="grid grid-cols-2 gap-4">

{["10€","25€","50€","100€"].map((v)=>(

<button
key={v}
className="
p-6
rounded-2xl
border
hover:border-primary-500
hover:bg-primary-50
"
>
{v}
</button>

))}

</div>

<button
className="
mt-8
w-full
bg-secondary-600
text-white
py-5
rounded-2xl
font-bold
"
>
Continuer
</button>

</div>

<div>

<div className="bg-primary-950 rounded-3xl p-8 text-white">

<h3 className="text-3xl font-bold mb-5">
98%
</h3>

<p>
des fonds vont directement sur le terrain.
</p>

</div>

</div>

</div>

</div>

</main>

);
}
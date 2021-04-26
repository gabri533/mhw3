//creazione div cont
for (let i=0;i<contenuti.length;i++){
	const sez_div=document.createElement('div');
	sez_div.classList.add('content');
	sez_div.dataset.index=i;//segnalo i blocchi contenitori con un indice
   
	const struttura=document.querySelector('.struct');
	struttura.appendChild(sez_div);	
}

//creazione div head
for (let i=0;i<contenuti.length;i++){
	const divHead=document.createElement('div');
	divHead.classList.add('head');//aggiungo la classe head	
	
	const contenitore=document.querySelectorAll('.content');
	contenitore[i].appendChild(divHead);
	
}


//creazione contenuto dinamico
for (let i=0;i<contenuti.length;i++){
	const newH1=document.createElement('h1');
	newH1.textContent=contenuti[i].titolo;
	const preferiti= document.createElement('img');
	preferiti.src="like.png";
	preferiti.classList.add('prefe');
	
	const inte=document.querySelectorAll('.head');
	inte[i].appendChild(newH1);
	inte[i].appendChild(preferiti);
	
	const new_img=document.createElement('img');
	new_img.src=contenuti[i].immagine;
	const conte=document.querySelectorAll('.content');
	conte[i].appendChild(new_img);
	
	const descrption=document.createElement('p');
	descrption.textContent=contenuti[i].descrizione;
	descrption.classList.add('hidden');
	conte[i].appendChild(descrption);


	const testo=document.createElement('h3');
	testo.textContent="Descrizione";
	conte[i].appendChild(testo);

	const titleApi = document.createElement('h4');
	titleApi.textContent="piatti associati";
	titleApi.classList.add('hidden');
	conte[i].appendChild(titleApi);
}

let vini_preferiti=[];

//controlla quando la lista è vuota, e in tal caso scompare la sezione
function controllo_preferiti(){
	const sezione_pref=document.querySelector('#preferiti');

			
	if(vini_preferiti.length===0){
		sezione_pref.classList.add('hidden');
	} else{
		sezione_pref.classList.remove('hidden');
	}
}


function Rimuovi(){
	console.log("rimosso dai preferiti");
	console.log(vini_preferiti);
	
	const x=document.querySelector('#preferiti');
	const y=event.currentTarget.parentNode.parentNode.parentNode.parentNode;
	console.log(y);
	//controllo se l'evento è avvenuto sui preferiti
	if (x===y){
	event.currentTarget.src="like.png";
	
	const contenitori=document.querySelectorAll('.struct .content');
	for(contenitore of contenitori){
		id=event.currentTarget.parentNode.parentNode.dataset.indice;
		if(id===contenitore.dataset.indice){
			contenitore.querySelectorAll('img');
			contenitore[0].src="like.png";
		}
	}
	
	
	
	event.currentTarget.removeEventListener('click',Rimuovi);
	event.currentTarget.addEventListener('click',listaDesideri);
	const id=event.currentTarget.parentNode.parentNode.dataset.indice;
	for (vino of vini_preferiti){
		if(vino.index===id){
			const eliminaindex=vini_preferiti.indexOf(vino);
			vini_preferiti.splice(eliminaindex,1);
		}
	}
		
	}
	event.currentTarget.src="like.png";
	event.currentTarget.removeEventListener('click',Rimuovi);
	event.currentTarget.addEventListener('click',listaDesideri);
	vini_preferiti.pop(event.currentTarget.parentNode.parentNode);
	
	controllo_preferiti();
}


function listaDesideri(event){
	console.log("aggiunto ai preferiti" + event.currentTarget.parentNode.parentNode.dataset.index);
	event.currentTarget.src="remove.png";
	event.currentTarget.removeEventListener('click',listaDesideri);
	event.currentTarget.addEventListener('click',Rimuovi);
	
	const index=(event.currentTarget.parentNode.parentNode).dataset.index;
	
	
	const elemento=contenuti[index];
	//in questa mappa inseriamo il contenuto scelto come preferito
	const oggPreferito={
		titolo:elemento.titolo,
		immagine:elemento.immagine,
		ind: index
	};
	
	//inseriamo nell'array l'oggetto
	vini_preferiti.push(oggPreferito);
	console.log(vini_preferiti);
	
	//si occupa di far apparire e sparire la sezione dei preferiti
	controllo_preferiti();
		
	const contenuto= document.querySelector('#preferiti div');	
	contenuto.innerHTML='';

//tramite questo ciclo for creaiamo gli elementi da mettere nei preferiti
for (let i=0;i<vini_preferiti.length;i++){

			//creaiamo il contenitore, l'head e il content di un vino preferito
			const newContent=document.createElement('div');
			newContent.classList.add('content');			
			newContent.dataset.ind=vini_preferiti[i].ind;
			
			const sez=document.querySelector('#preferiti div');
			sez.appendChild(newContent); //appendiamo in newContent
		
			const newHead=document.createElement('div');
			newHead.classList.add('head');
		
			const contenitore=document.querySelectorAll('#preferiti .content');
			contenitore[i].appendChild(newHead); //appendiamo la newHead
			
			

			const Title=document.createElement('h1');
			Title.textContent=vini_preferiti[i].titolo;
			
			const rimuovi=document.createElement('img');
			rimuovi.src="remove.png";
			rimuovi.classList.add('prefe');
			rimuovi.addEventListener('click',Rimuovi);
			
			const head=document.querySelectorAll('.head');
			head[i].appendChild(Title);
			head[i].appendChild(rimuovi);
			
			const image=document.createElement('img');
			image.src=vini_preferiti[i].immagine;
			contenitore[i].appendChild(image);

	}
}



//descrizione
function VisualizzaMeno(){
	event.currentTarget.textContent="Descrizione";
	const showed= event.currentTarget.parentNode.querySelector('p');
	const showed2= event.currentTarget.parentNode.querySelector('h4');
	
	

	showed.classList.add('hidden');
	showed2.classList.add('hidden');
	
	
	event.currentTarget.addEventListener('click',MostraDescrizione);
	event.currentTarget.removeEventListener('click', VisualizzaMeno);	
}
function MostraDescrizione(){
	event.currentTarget.textContent="Mostra di meno";
	const showed= event.currentTarget.parentNode.querySelector('p');
	const showed2= event.currentTarget.parentNode.querySelector('h4');
	
	
	
	showed.classList.remove('hidden');
	showed2.classList.remove('hidden');
	
	
	
	event.currentTarget.removeEventListener('click',MostraDescrizione);
	event.currentTarget.addEventListener('click', VisualizzaMeno);
}




function barra_ricerca(event){
    const cerca=event.currentTarget.value.toLowerCase(); //tramite toLowerCase riconosce lettere maiuscole e minuscole uguali
	  if (cerca===''){
		  const contenitori=document.querySelectorAll('.struct .content');
  
		  for(contenitore of contenitori){
			  contenitore.classList.remove('nascondi');
		  }
		  controllo_preferiti();
		}

	  else{
        const contenitori=document.querySelectorAll('.struct .content');
        console.log(contenitori);
        for (contenitore of contenitori) {
            contenitore.classList.add('nascondi');
        }
        console.log("input" + cerca);
        for(let i=0;i<contenitori.length;i++){
         const titolo=contenitori[i].querySelector('h1').textContent.toLowerCase();
         if(titolo.indexOf(cerca)!==-1){
                contenitori[i].classList.remove('nascondi');
         }
      }
	}  
}




//event listener sulla lista desideri
const preferiti=document.querySelectorAll('.prefe');
for (preferito of preferiti){
preferito.addEventListener('click',listaDesideri);
}


//event listener descrizione
const descrizioni=document.querySelectorAll('.struct h3')
for(descrizione of descrizioni){
	
	descrizione.addEventListener('click',MostraDescrizione);
}

//event listener barra di ricerca
const barra=document.querySelector('header input');
barra.addEventListener('keyup',barra_ricerca);




const key ='9545660edbca4348afe0ac456ce0492b';
const endpoint_vino= 'https://api.spoonacular.com/food/wine/dishes';


const form = document.querySelector('.content h3');
form.addEventListener('click', search);


function search(event){
	event.preventDefault();
	for(let i=0; i<contenuti.length; i++){
    const wine_request = endpoint_vino + '?apiKey=' + key + '&wine='+ contenuti[i].code;
	fetch(wine_request).then(onResponse).then(onJSON);
	}
	event.currentTarget.removeEventListener('click', search);
}



	function onResponse(response){
		return response.json()
	}


	//richiesta
	function onJSON(json){
		console.log(json);
		const api = document.querySelectorAll('.content');
		for(let i=0; i<6; i++){
			
			
			const piatti = json.text;
			console.log(piatti);
			const caption = document.createElement('span');
			const container = document.createElement('div2');

			

			caption.textContent=piatti;
			container.appendChild(caption);
			api[i].appendChild(container);
			
		}
	}	



const endpoint_libroVino = 'http://openlibrary.org/search.json?title=Michelin+Green+Guide+Wine+Trails+of+Italy+(Green Guide/Michelin)';

//event listener al form
const form2 = document.querySelector('#api');
form2.addEventListener('click', libri);

function libri(event){
	event.preventDefault();

	//prepariamo la richiesta
	const libro_request = endpoint_libroVino;

	//fetch
	fetch(libro_request).then(onResponse2).then(onJSON2);
	
	event.currentTarget.removeEventListener('click', libri);
}
 

function onResponse2(response){
	return response.json()
}

//richiesta
function onJSON2(json){
	console.log(json)
	const api2 = document.querySelector('#api2');
	const documenti = json.docs[0];
	const title = documenti.title;
	const url = 'http://covers.openlibrary.org/b/id/8374081-L.jpg'

	const libro = document.createElement('div');
	libro.classList.add('book');
	const caption = document.createElement('span');
	caption.textContent=title;
	const img = document.createElement('img');
	img.src=url;

	libro.appendChild(img);
	libro.appendChild(caption);
	api2.appendChild(libro);
}


// funzine per nascondere la guida
function nascondi(){
	const show = event.currentTarget.parentNode.querySelector('#api2');
	show.classList.add('hidden');

	
	event.currentTarget.removeEventListener('click', nascondi);
	event.currentTarget.addEventListener('click', mostra);	
}


//funzione per mostare la guida
function mostra(){
	const show = event.currentTarget.parentNode.querySelector('#api2');
	show.classList.remove('hidden');

	event.currentTarget.removeEventListener('click', mostra);
	event.currentTarget.addEventListener('click', nascondi);	
}
const button = document.querySelector('#api');
button.addEventListener('click', mostra);	


	
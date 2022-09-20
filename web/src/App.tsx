
import {useEffect, useState  } from "react";
import * as Dialog from '@radix-ui/react-dialog';
import { GameCard } from "./components/GameCard";
import { CreateAdBanner } from "./components/CreateAdBanner";
import logoImg from './assets/logo-nlw-esports.svg';



import "./styles/main.css";
import { CreateAdModal } from "./components/CreateAdModal";
import axios from "axios";




//==============================TYPESCRIPT PARAMETERS =============================//
interface Game {
  bannerUrl: string;
  id: string;
  title: string;
  _count: {
    ads: number;
  }
}




function App() {

  //DEFINICAO DE USESTATE E CONECTANDO AOS DADOS DO TS ACIMA
  const [games, setGames] = useState<Game[]>([]);

  //PEGANDO OS DADOS DO BACKEND
  useEffect( () => {
    axios("http://localhost:3333/games")
      .then(response => {
        setGames(response.data); //ATUALIZANDO A VARIAVEL GAMES
      })
  }, [])



  /////==================================RENDERIZAÇÃO==============================//

  return(


    ////////========================LOGO===================================///
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} />

      {/*=========================== TITLE ===========================*/}
      <h1 className="text-6xl text-white font-black mt-20">Seu <span className="bg-nlw-gradient text-transparent bg-clip-text">duo</span> está aqui.</h1>

      
      {/*========================= LIST OF GAMES ===============================*/}
      <div className="grid grid-cols-6 gap-6 mt-16">

        {/* ==================PERCORRE O ARRAY DE GAMES E RETORNA CADA VALOR CORRESPONDENTE AO ENCONTRADO NO BACK ===========*/}
        {games.map(game => {
          return ( 
            <GameCard 
              bannerUrl={game.bannerUrl} 
              key={game.id}
              title={game.title} 
              adsCount={game._count.ads}
            />
          )
        })}
      </div>
      
      {/* =================COMPONENTE PRE-DEFINIDO PELA LIB "RADIX" PARA GERAR O POP-UP DE PUBLICAR ANUNCIO ===========*/}
      <Dialog.Root>
        {/* =========COMPONENTE DE IR PARA TELA DE PUBLICAR ANUNCIO =====*/}
        <CreateAdBanner />

        {/* ================ABRE A TELA DE POP-UP============ */}
        <CreateAdModal/>
      </Dialog.Root>

    </div>
    
  )
  
}

export default App

import React, { useState, useEffect } from 'react';
import AutoCombobox from './Components/AutoCombobox';
import { Card } from './Components/Card';
import CardModal from './Components/CardModal';
import LoadingModal from './Components/LoadingModal';
import { PiPrinter } from "react-icons/pi";
import { BsDownload } from "react-icons/bs";
import { useLocation, useNavigate } from 'react-router-dom';


const App: React.FC = () => {

  // const testCards: Card[] = [
  //   {
  //     id: "6e1eb937-21d4-44b1-85e7-b95995865f44",
  //     colors: ["B", "R"],
  //     name: "Hellhole Rats",
  //     image: "https://cards.scryfall.io/border_crop/front/6/e/6e1eb937-21d4-44b1-85e7-b95995865f44.jpg?1593273622",
  //     keywords: ["Haste"],
  //     type_line: "Creature — Rat",
  //     amount: 4,
  //   },
  //   {
  //     id: "4b9170f0-d332-42ba-98c7-7e99922fa3fb",
  //     colors: [],
  //     name: "Elaborate Firecannon",
  //     image: "https://cards.scryfall.io/border_crop/front/4/b/4b9170f0-d332-42ba-98c7-7e99922fa3fb.jpg?1562554825",
  //     keywords: [],
  //     type_line: "Artifact",
  //     amount: 2,
  //   },
  //   {
  //     id: "87aab031-4e44-44cd-89a7-6cffc7288cd1",
  //     colors: ["G"],
  //     name: "Strength of Night",
  //     image: "https://cards.scryfall.io/border_crop/front/8/7/87aab031-4e44-44cd-89a7-6cffc7288cd1.jpg?1562927017",
  //     keywords: ["Kicker"],
  //     type_line: "Instant",
  //     amount: 1,
  //   },
  //   {
  //     id: "4b19fdac-da3e-4ebd-ae7b-6f31a97b2a0f",
  //     colors: ["U"],
  //     name: "Circular Logic",
  //     image: "https://cards.scryfall.io/border_crop/front/4/b/4b19fdac-da3e-4ebd-ae7b-6f31a97b2a0f.jpg?1675199188",
  //     keywords: ["Madness"],
  //     type_line: "Instant",
  //     amount: 4,
  //   },
  //   {
  //     id: "a3107767-6c36-4982-8e0d-e100d5fca204",
  //     colors: ["B", "G", "R", "U", "W"],
  //     name: "Maelstrom Nexus",
  //     image: "https://cards.scryfall.io/border_crop/front/a/3/a3107767-6c36-4982-8e0d-e100d5fca204.jpg?1673305585",
  //     keywords: [],
  //     type_line: "Enchantment",
  //     amount: 3,
  //   },
  //   {
  //     id: "060b8dd4-d632-4216-87ba-355ab8a62e39",
  //     colors: ["B", "U"],
  //     name: "Skeleton Ship",
  //     image: "https://cards.scryfall.io/border_crop/front/0/6/060b8dd4-d632-4216-87ba-355ab8a62e39.jpg?1581799322",
  //     keywords: [],
  //     type_line: "Legendary Creature — Skeleton",
  //     amount: 4,
  //   },
  //   {
  //     id: "286be1fb-8ed2-4228-9df8-0ea413714778",
  //     colors: ["U"],
  //     name: "New Perspectives",
  //     image: "https://cards.scryfall.io/border_crop/front/2/8/286be1fb-8ed2-4228-9df8-0ea413714778.jpg?1591320313",
  //     keywords: [],
  //     type_line: "Enchantment",
  //     amount: 4,
  //   },
  //   {
  //     id: "5e4304f1-987b-4e4f-a321-c3263bd916de",
  //     colors: ["W"],
  //     name: "Heal",
  //     image: "https://cards.scryfall.io/border_crop/front/5/e/5e4304f1-987b-4e4f-a321-c3263bd916de.jpg?1562914731",
  //     keywords: [],
  //     type_line: "Instant",
  //     amount: 4,
  //   },
  //   {
  //     id: "00dcb25e-764b-47d6-bec4-225aaace77b0",
  //     colors: ["B"],
  //     name: "Drifting Shade",
  //     image: "https://cards.scryfall.io/border_crop/front/0/0/00dcb25e-764b-47d6-bec4-225aaace77b0.jpg?1562630489",
  //     keywords: ["Flying"],
  //     type_line: "Creature — Shade",
  //     amount: 4,
  //   },
  //   {
  //     id: "1388ce6e-8199-46c1-8ee3-71266b0929bf",
  //     colors: ["W"],
  //     name: "Sunspire Griffin",
  //     image: "https://cards.scryfall.io/border_crop/front/1/3/1388ce6e-8199-46c1-8ee3-71266b0929bf.jpg?1562782971",
  //     keywords: ["Flying"],
  //     type_line: "Creature — Griffin",
  //     amount: 4,
  //   },
  //   {
  //     id: "6c43e449-acf2-4e94-b7cf-8c84d70191da",
  //     colors: ["R", "W"],
  //     name: "Boros Battleshaper",
  //     image: "https://cards.scryfall.io/border_crop/front/6/c/6c43e449-acf2-4e94-b7cf-8c84d70191da.jpg?1562915094",
  //     keywords: [],
  //     type_line: "Creature — Minotaur Soldier",
  //     amount: 4,
  //   },

  // ]

  const defaultCard: Card = {
    id: "6e1eb937-21d4-44b1-85e7-b95995865f44",
    colors: ["B", "R"],
    name: "Hellhole Rats",
    image: "https://cards.scryfall.io/border_crop/front/6/e/6e1eb937-21d4-44b1-85e7-b95995865f44.jpg?1593273622",
    keywords: ["Haste"],
    type_line: "Creature — Rat",
    amount: 4,
  };

  const navigate = useNavigate();
  const location = useLocation();

  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [clickedCard, setClickedCard] = useState<Card>();
  const [allCards, setAllCards] = useState<Card[]>([]);
  const [chunkedCards, setChunkedCards] = useState<Card[][]>(chunkArray(allCards, 10));
  const [cardExists, setCardExists] = useState<boolean>(false);
  const [previousCardName, setPreviousCardName] = useState<string>("");
  const [cardNotFound, setCardNotFound] = useState<boolean>(false);
  const [cardModalOpen, setCardModalOpen] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken'));
  const [uploadSuccessful, setUploadSuccessful] = useState<boolean>(false);

  function chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

  const addCardToAllCards = (newCard: Card) => {
    setCardNotFound(false);
    if(newCard === null){
      setCardNotFound(true);
    }

    if (!allCards.some(card => card.id === newCard.id)) {
      setCardExists(false);
      const updatedCards = [...allCards, newCard];
      setAllCards(updatedCards);
      setChunkedCards(chunkArray(updatedCards, 10));
    } else {
      setCardExists(true);
      setTimeout(() => setCardExists(false), 3000);
      console.log("Card already exists in the list");
    }
    setPreviousCardName(newCard.name);
    setSelectedCard(null);
  };

  const removeCardFromAllCards = (cardToRemove: Card) => {
    const updatedCards = allCards.filter(card => card.id !== cardToRemove.id);
    setAllCards(updatedCards);
    setChunkedCards(chunkArray(updatedCards, 10));
  }

  const updateCardAmount = (cardToUpdate: Card, newAmount: number) => {
    const updatedCards = allCards.map(card => {
      if (card.id === cardToUpdate.id) {
        return { ...card, amount: newAmount };
      }
      return card;
    });
    setAllCards(updatedCards);
    setChunkedCards(chunkArray(updatedCards, 10));
  }

  const closeCardModal = (card: Card, newAmount: number) => {
    setCardModalOpen(false);
    updateCardAmount(card, newAmount);
  }

  const downloadPDF = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('http://localhost:5000/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          allCards,
          margins: {
            top: 0.5,
            left: 0.5,
          },
         }),
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'generated-deck.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        console.error('Error generating PDF:', response.statusText);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const toGoogleDrive = async () => {
    setIsGenerating(true);
    try {
      const accessToken = localStorage.getItem('accessToken');
      const accessRefreshToken = localStorage.getItem('refreshToken');
      if (!accessToken || !accessRefreshToken) {
        authorize();
        return;
      }
  
      const payload = {
        allCards,
        token: accessToken,
        refreshToken: accessRefreshToken,
        margins: {
          top: 0.5,
          left: 0.5,
        },
      };
  
      console.log('Payload being sent:', payload);
  
      const response = await fetch('http://localhost:5000/upload-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const data = await response.json();
        setUploadSuccessful(true);
        console.log('PDF uploaded to Google Drive successfully, File ID:', data.fileId);
      } else {
        const errorText = await response.text();
        console.error('Error uploading PDF:', response.statusText, errorText);
      }
    } catch (error) {
      console.error('Error uploading PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const authorize = () => {
    const clientId = import.meta.env.VITE_GCP_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_GCP_REDIRECT_URI;
    const scope = import.meta.env.VITE_GCP_REQUESTED_SCOPES;
    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline`;
    
    window.location.href = authUrl;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');

    if (code) {
      const fetchTokens = async () => {
        try {
          const response = await fetch('http://localhost:5000/oauth2callback', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
          });

          const data = await response.json();
          console.log('Tokens:', data);
          localStorage.setItem('accessToken', data.access_token);
          localStorage.setItem('refreshToken', data.refresh_token);
          setIsAuthenticated(true);
          navigate('/');
        } catch (error) {
          console.error('Error fetching tokens:', error);
        }
      };

      fetchTokens();
    }
  }, [location.search, navigate]);
  

  return (
  <div className="flex flex-col items-center justify-center h-screen gap-6 mx-auto">
    <div className="title-container relative flex items-center justify-center w-5/6">
      <h1 className="text-2xl font-bold">Magic: The Gathering Proxy Generator</h1>
      <button className="absolute right-0" onClick={downloadPDF} >
        <BsDownload />
      </button>
      <button className="absolute right-16" onClick={isAuthenticated ? toGoogleDrive : authorize} >
        <PiPrinter />
      </button>
    </div>
    <AutoCombobox
      selectedCard={selectedCard}
      setSelectedCard={setSelectedCard} 
      onCardSelect={addCardToAllCards} 
      setCardNotFound={setCardNotFound}
    />
    <div className="flex flex-col gap-5 w-5/6 h-5/6">
      {chunkedCards.map((chunk, chunkIndex) => (
        <div key={chunkIndex} className="flex flex-row w-full max-h-1/4 gap-5 justify-center">
          {chunk.map((card, index) => (
            <img
              key={index} 
              src={card.image} 
              className="object-contain" 
              onContextMenu={(e) => {
                e.preventDefault();
                removeCardFromAllCards(card);
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = "2px solid red";
                e.currentTarget.style.cursor = "pointer";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = "none";
              }}
              onClick={() => {setCardModalOpen(true); setClickedCard(card)}}
            />
          ))}
        </div>
      ))}
    </div>
    { cardExists && (
      <div role="alert" className="alert alert-error fixed bottom-10 right-10 w-1/6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>Error! <span className="font-bold">{previousCardName}</span> already exists in list.</span>
      </div>
    )}
    { cardNotFound && (
      <div role="alert" className="alert alert-error fixed bottom-10 right-10 w-1/6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>Error! Card not found.</span>
      </div>
    )}
    { cardModalOpen &&
      <CardModal
        card={clickedCard ?? defaultCard} 
        cardModalOpen={cardModalOpen}
        closeCardModal={closeCardModal}
      />
    }
    { isGenerating && (
      <LoadingModal loadingModalOpen={isGenerating} closeLoadingModal={() => setIsGenerating(false)} />
    )}
    { uploadSuccessful && (
      <div role="alert" className="alert alert-success fixed bottom-10 right-10 w-1/6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>Upload to Google Drive successful!</span>
      </div>
    )}
    <canvas id="canvas" style={{ display: 'none' }}></canvas>
  </div>

  );
};

export default App;

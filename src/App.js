import React, { useState, useEffect } from 'react';
import { apiTrivia } from './api';
import './App.css';

function App() {

  const [trivia, setTrivia] = useState([]);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntuacion, setPuntuacion] = useState(0);
  const [start, setStart] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [answersShown, setAnswersShown] = useState(false);
  const [titulo, setTitulo] = useState('');

  const getTrivia = async () => {
    const data = await apiTrivia();
    const toShow = data.results;
    setTrivia(toShow);
    setTitulo(toShow[preguntaActual].question);
  }

  useEffect(() => {
    getTrivia();
  }, []);

  function handleAnswerSubmit (isCorrect) {
    // Anade puntuacion
      if(isCorrect === trivia[preguntaActual].correct_answer) setPuntuacion(puntuacion + 1);

    //Cambiar a la siguiente pagina
      if(preguntaActual === trivia.length - 1){
        setIsFinished(true);
      } else {
        setPreguntaActual(preguntaActual + 1);
        setTitulo(trivia[preguntaActual + 1].question);
      }
    }

    if(start) return (
      <main className='App'>
        <div className='lado-izquierdo'>
          <div className='numero-pregunta'>
            <span> Pregunta {preguntaActual + 1} de</span> {trivia.length}
          </div>
          <div className='titulo-pregunta'>
            {titulo}
          </div>
        </div>

        <div className='lado-derecho'>
          <React.Fragment>
            <button onClick={() => {
              let resp = 'True';
              handleAnswerSubmit(resp);
              if(preguntaActual === trivia.length - 1){
                // window.location.href='/';
                setStart(false);
                setIsFinished(true)
              } else {
                setPreguntaActual(preguntaActual + 1);
              }
              }}>
              True
            </button>

            <button onClick={() => {
              let resp = 'False';
              handleAnswerSubmit(resp);
              if(preguntaActual === trivia.length - 1){
                // window.location.href='/';
                setStart(false);
                setIsFinished(true)
              } else {
                setPreguntaActual(preguntaActual + 1);
              }
              }}>
              False
            </button>
          </React.Fragment>
        </div>      
      </main>
    )  

  if(isFinished) return (
    <main className='App'>
      <div className='juego-terminado'>
        <span>Obtuviste {puntuacion} de {trivia.length}</span>
        <button onClick={() => window.location.href='/'}>Volver a jugar</button>
        <button onClick={() => {
          setIsFinished(false);
          setAnswersShown(true);
          setPreguntaActual(0);
        }}>
          Ver respuestas
        </button>
      </div>
    </main>
  )  

  if(answersShown){
    return (
      <main className='App'>
        <div className='lado-izquierdo'>
          <div className='numero-pregunta'>
            <span> Pregunta {preguntaActual + 1} de</span> {trivia.length}
          </div>
          <div className='titulo-pregunta'>
            {trivia[preguntaActual].question}
          </div>
          <div>
            {trivia[preguntaActual].correct_answer}
          </div>
          <button onClick={() => {
            if(preguntaActual === trivia.length - 1){
              window.location.href='/';
            } else {
              setPreguntaActual(preguntaActual + 1);
            }
          }}>{preguntaActual === trivia.length - 1 ? 'Volver a jugar' : 'Siguiente'}
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="App">
      <div className='lado-izquierdo'>
        <div className='numero-pregunta'>
          <h1>Welcome to the Trivia Challenge</h1>
        </div>
        <div className='titulo-pregunta'>
          <h2>You will be presented with 10 True or False questions</h2>
        </div>
        <div>
          <h2>Can you score 100%?</h2>
        </div>
        <button onClick={() => {
          setStart(true);
        }}>
          BEGIN
        </button>
      </div>
    </main>
  );
}

export default App;
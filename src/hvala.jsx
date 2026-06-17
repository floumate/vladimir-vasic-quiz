import React from 'react'
import ReactDOM from 'react-dom/client'
import BrandHeader from './components/BrandHeader'
import Star from './components/Star'
import './styles/global.css'

/*
 * Posebna thank-you stranica (zaseban URL: /hvala.html) da bi se kasnije
 * mogao postaviti meta pixel / konverzijski piksel (vidi <head> u hvala.html).
 * Ništa se ne šalje; payload je već u sessionStorage (sf1_lead_payload).
 */
function ThankYou() {
  return (
    <div className="app">
      <BrandHeader />
      <main className="app__main">
        <div className="container">
          <div className="card fade-in text-center intro">
            <div className="intro__star">
              <Star size={40} />
            </div>
            <h2 className="mt-16">Hvala - primili smo vaše podatke</h2>
            <p className="intro__lead mt-16">
              Vladimir i tim pregledaju vašu firmu i javljaju se sa konkretnim
              sledećim korakom. Proverite email - tu stiže potvrda i dalje
              instrukcije.
            </p>
          </div>
        </div>
      </main>
      <footer className="footer">
        Vladimir Vasić · BBS Capital Investment Group
      </footer>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThankYou />
  </React.StrictMode>
)

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

/** Se muestra mientras se descarga el código del simulador. */
export function CalculoSkeleton() {
  return (
    <>
      <Header />
      <main className="calc" aria-busy="true" aria-label="Cargando simulador">
        <div className="calc__head">
          <span className="skel" style={{ width: 170, height: 22 }} />
          <span className="skel" style={{ width: 'min(440px, 85%)', height: 56 }} />
          <span className="skel" style={{ width: 'min(700px, 100%)', height: 26 }} />
        </div>
        <div className="calc__grid">
          <div className="calc__form">
            {[220, 200, 240, 260].map((w, i) => (
              <div key={i} className="field-group">
                <span className="skel" style={{ width: w, height: 22 }} />
                <span className="skel" style={{ height: 52 }} />
              </div>
            ))}
          </div>
          <div className="result">
            <div className="result__main">
              <span className="skel skel--dark" style={{ width: 220, height: 24 }} />
              <span className="skel skel--dark" style={{ width: 280, height: 64 }} />
            </div>
            <div className="rows">
              {[0, 1, 2].map((i) => (
                <div key={i} className="row">
                  <span className="skel skel--dark" style={{ width: 160, height: 20 }} />
                  <span className="skel skel--dark" style={{ width: 90, height: 20 }} />
                </div>
              ))}
            </div>
            <span className="skel skel--dark" style={{ height: 68 }} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

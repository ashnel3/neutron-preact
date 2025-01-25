import PreactImage from '@assets/preact.svg'
import ViteImage from '@assets/vite.svg'
import MinimizeIcon from '@material-icons/svg/svg/minimize/round.svg'
import FullscreenIcon from '@material-icons/svg/svg/fullscreen/round.svg'
import CloseIcon from '@material-icons/svg/svg/close/round.svg'
import './App.css'

export const App = () => {
  return (
    <main>
      <header className="titlebar">
        <div className="dragarea" onMouseDown={() => neutron.DragTitleBar()}></div>
        <button id="btn-min" onClick={() => neutron.Minimize()}>
          <MinimizeIcon />
        </button>
        <button id="btn-max" onClick={() => neutron.Maximize()}>
          <FullscreenIcon />
        </button>
        <button id="btn-close" onClick={() => neutron.Close()}>
          <CloseIcon />
        </button>
      </header>
      <div className="app">
        <div>
          <a class="logo" href="https://vite.dev" target="_blank">
            <ViteImage />
          </a>
          <a class="logo" href="https://preactjs.com" target="_blank">
            <PreactImage />
          </a>
        </div>
        <h1>Vite + Preact</h1>
        <div class="card">
          <button className="btn" onClick={() => ahk.ExampleBinding()}>
            Test Bindings
          </button>
          <p>
            Edit <code>src/main/app.tsx</code> and save to test HMR
          </p>
        </div>
        <p>
          Check out{' '}
          <a
            href="https://preactjs.com/guide/v10/getting-started#create-a-vite-powered-preact-app"
            target="_blank"
          >
            create-preact
          </a>
          , the official Preact + Vite starter
        </p>
        <p class="read-the-docs">Click on the Vite and Preact logos to learn more</p>
      </div>
    </main>
  )
}

export default App

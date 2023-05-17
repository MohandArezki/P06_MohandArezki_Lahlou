<svg fill="none" viewBox="0 0 600 300" width="600" height="300" xmlns="http://www.w3.org/2000/svg">
  <foreignObject width="100%" height="100%">
    <div xmlns="http://www.w3.org/1999/xhtml">
      <style>
        @keyframes hi  {
            0% { transform: rotate( 0.0deg) }
           10% { transform: rotate(14.0deg) }
           20% { transform: rotate(-8.0deg) }
           30% { transform: rotate(14.0deg) }
           40% { transform: rotate(-4.0deg) }
           50% { transform: rotate(10.0deg) }
           60% { transform: rotate( 0.0deg) }
          100% { transform: rotate( 0.0deg) }
        }

        .container {
          background-color: black;

          width: 100%;
          height: 300px;

          display: flex;
          justify-content: center;
          align-items: center;
          color: white;

          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        }

        .hi {
          animation: hi 1.5s linear -0.5s infinite;
          display: inline-block;
          transform-origin: 70% 70%;
        }

        @media (prefers-reduced-motion) {
          .hi {
            animation: none;
          }
        }
      </style>

      <div class="container">
        <h1>Hi there, my name is Nikola <div class="hi">👋</div></h1>
      </div>
    </div>
  </foreignObject>
</svg>

<p align="center">
  <img src="assets/images/logo.png" style="background-color:#2e3136">
</p>
# A propos du projet
*Projet 06: "Développez une interface utilisateur pour une application web Python"* réalisé dans le cadre de la formation  **Développeur d'application - Python**, Openclassrooms.
*

### Objectifs

1- Récupérez les données de l'API REST [OCMovies](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR). 
2- Créer une page d'accueil, en utilisant  : HTML, CSS et Javascript vanilla.

# Configuration

1- Clonez ou téléchargez les [API OCMovies](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR).
2- Reportez-vous à la [documentation](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR#option-2-installation-and-execution-without-pipenv-using-venv-and-pip ) pour installer et démarrer le serveur localement.
4- Clonez le projet :
`git clone https://github.com/MohandArezki/OC_DevPython_P6.git`

# Usage

Pour accéder à la page, ouvrez le fichier "index.html" dans n'importe quel navigateur Web.

---
